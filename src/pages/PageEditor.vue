<template>
  <div class="container">
    <div class="grp-toolbar layout-space-between">

      <div style="margin-left: 30px">

        <el-popover placement="bottom-start" :width="480"
                    trigger="click">
          <template #reference>
            <el-button style="margin-right: 16px">添加</el-button>
          </template>
          <widget-list :data="widgetTree" @selected="onCreateWidget"/>

        </el-popover>
      </div>
      <div>
        <el-button @click="onSavePage">保存</el-button>
        <el-button text title="预览" @click="onPreviewPage(value)">预览</el-button>
      </div>
    </div>

    <splitpanes class="grp-content default-theme">
      <pane class="part" size="20">
        <TOC/>
      </pane>

      <!--    画布区域-->
      <pane class="part" size="60">
        <div class="container" @dragover.prevent
             @drop="handleDrop"
             @mousedown="handleMouseDown"
             @mouseup="deselectCurWidget">
          <el-scrollbar>
            <Editor />
          </el-scrollbar>
        </div>
      </pane>

      <!--    属性面板-->
      <pane class="part" size="20">
        <div class="container">
          <!--          <component v-if="curWidget" :is="curWidget.types + 'Attr'" />-->
          <el-tabs class="grp-attr container" v-if="curWidget">
            <el-tab-pane label="通用">
              <el-scrollbar>
                <CommonAttr></CommonAttr>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="数据">
              <el-scrollbar>
                <component :is="curWidget.types + 'Data'" />
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="样式">
              <el-scrollbar>
                <component :is="curWidget.types + 'Attr'" />
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
          <el-scrollbar v-else>
            <CanvasAttr></CanvasAttr>
          </el-scrollbar>
        </div>
      </pane>

    </splitpanes>

  </div>
</template>

<script>
import {Splitpanes, Pane} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import WidgetList from "@/components/WidgetList";
import Editor from "@/components/Editor";
import {api} from "@/api/api";
import {mapGetters, mapState} from "vuex";
import TOC from "@/components/TOC";
import CanvasAttr from "@/components/CanvasAttr";
import CommonAttr from "@/widgets/common/CommonAttr";
import {eventBus} from "@/utils/eventBus";


export default {
  name: "PageEditor",
  pageid:'',
  components:{
    TOC,
    Editor,
    WidgetList,
    Splitpanes,
    Pane,
    CommonAttr,
    CanvasAttr
  },
  data(){
    return {
      widgetTree: []
    }
  },

  computed: {
    ...mapState([
      'curWidget',
      'isClickWidget',
      'editor',
      'pageData',
    ])
  },

  mounted() {
    this.pageid = this.$route.query.id;
    this.$store.dispatch('getPageData', {id:this.pageid, detail:1}) //获取页面数据（样式、组件等）
    this.getWidgetTemplate();
  },
  methods:{
    onClickOutside(){
      console.log('on click outside')
      //this.unref(this.$refs.popoverRef).popperRef.delayHide()
    },
    getWidgetTemplate(){
      let that = this;
      api.getWidgetTree(function (res) {
        that.widgetTree = res.data;
      }, function (error) {
        console.log(error);
      })
    },
    handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()

      const rectInfo = this.editor.getBoundingClientRect()
      // if (index) {
      //   const component = deepCopy(componentList[index])
      let top = e.clientY - rectInfo.y;
      let left = e.clientX - rectInfo.x;
      this.createWidget(e.dataTransfer.getData('widgetid'), left, top);
    },
    handleMouseDown(e) {
      console.log('canvas mouse down')
      e.stopPropagation()
      this.$store.commit('setClickWidgetStatus', false)
      this.$store.commit('setInEditorStatus', true)
    },

    deselectCurWidget(e) {
      console.log('canvas mouse up')
      if (!this.isClickWidget) {
        this.$store.commit('setCurWidget', { widget: null, index: null })
      }

      // 0 左击 1 滚轮 2 右击
      if (e.button !== 2) {
        this.$store.commit('hideContextMenu')
      }
    },
    onCreateWidget(widgetid){
      this.createWidget(widgetid);
    },
    createWidget(widgetid, dropLeft, dropTop){
      let that = this;
      api.createWidget(widgetid, this.pageid, function (res){
        if (res.code === 0) {
          let pWidgetId = res.data.id;
          console.log('create widget...')
          //let pWidgetCode = res.code;
          that.$store.dispatch('addWidget', { widgetid: pWidgetId, left: dropLeft, top: dropTop })
          that.$store.commit('recordSnapshot')

        } else if (res.code === -2){
          that.$message.error('没有权限！')
        }
        else if (res.code === -3){
          that.$message.error('组件不存在！')
        }
        else{
          that.$message.error('创建组件失败')
        }
        // eslint-disable-next-line no-unused-vars
      }, function (error) {

      });
    },
    onSavePage(){
      let that = this;
      try{
        eventBus.emit('beforeSave');
        api.savePageData(that.pageid, JSON.stringify(that.pageData), function (res) {
          that.$message.info('保存成功！')
        }, function (error) {
          that.$message.error('保存失败！')
        })
      }
      catch (e) {
        that.$message.error(`保存失败！${e.message}`)
      }

    },

    onPreviewPage(){
      let url = this.$router.resolve({name:'preview', query:{id:this.pageid}});
      window.open(url.href, '_blank')
    }
  }


}
</script>

<style lang="scss" scoped>

//.scroll-wrap {
//  /* 设置内部容器宽度大于外部容器，使内容横向溢出 */
//  //width: calc(100% + 20px);
//  /* 隐藏纵向滚动条 */
//  /* 显示横向滚动条 */
//  overflow-x: auto;
//  /* 增加滚动条的样式 */
//}


.grp-attr {
  display: flex;
  flex-direction: column;

  ::v-deep .el-tabs__content {
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    .el-tab-pane{
      height: 100%;
    }
  }
}
</style>