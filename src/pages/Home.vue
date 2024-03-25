<template>
  <div class="grp-title layout-space-between">
    <div class="title">
      大屏配置系统
    </div>

  </div>
  <splitpanes class="grp-content default-theme">
    <pane size="15" class="part grp-group">
      <div class="grp-group-items">
        <el-scrollbar ref="scrollGroup">
          <div @click="setCurrentGroup(value)"
               class="grp-group-item" v-for="(value, index) in groupList"
               :key="index"
               :class="{projectSelect:currentSelectedGroup.id===value.id}">
            <div class="name" v-show="!(isRenamingGroup && value.id===currentEditingGroup.id)">{{value.name}}</div>
            <el-input class="input" v-model="currentEditingGroup.editText" placeholder="" :ref="'input_' + value.id"
                      v-show="isRenamingGroup && value.id===currentEditingGroup.id"
                      @blur="onBeforeRenameTaskGroup(value)"
                      @change="renameTaskGroup(value)" @click="$event.stopPropagation()"
                      style="width: 180px;padding-left: 23px">
            </el-input>
            <div class="icon grp-edit-taskgroup" v-show="!isRenamingGroup && index>0" @click="onShowOperateMenu($event, value);">
              <span>...</span>
            </div>
          </div>
        </el-scrollbar>
      </div>

      <div class="grp-addgroup">
        <el-button type="primary" @click="onAddGroup">
          <el-icon><CirclePlus /></el-icon>
          <span>新建分组</span>
        </el-button>
      </div>


    </pane>
    <pane size="85" class="part">
      <div class="container">
        <div class="grp-toolbar">
          <el-input style="width: 300px;margin-right: 10px"
              v-model="pageSearchText"
              placeholder="请输入搜索名称"
              prefix-icon="Search"/>
          <el-button type="primary" @click="onCreatePage" icon="CirclePlus">新建</el-button>
        </div>

        <div class="grp-content">
          <el-scrollbar>
            <el-space :wrap="true" style="padding: 10px;box-sizing: border-box;width: 100%">
              <el-card class="grp-page-item" v-for="(value, index) in filterPages" :key="index" shadow="hover">
                <div class="page-title">
                  <el-text truncated :title="value.name">{{value.name}}</el-text>
                  <div class="page-title-icons">
                    <el-button text title="编辑" @click="onOpenPage(value)"><el-icon><Edit/></el-icon></el-button>
                    <el-button text title="预览" @click="onPreviewPage(value)"><el-icon><View/></el-icon></el-button>
                    <el-button text title="删除" @click="onDeletePage(value)"><el-icon><Delete/></el-icon></el-button>
                  </div>
                </div>
                <el-image class="page-image" :src="value.thumb"/>
              </el-card>
            </el-space>
          </el-scrollbar>
        </div>




<!--        <div-->
<!--             class="grp-page-item"-->
<!--             >-->
<!--          <div class="name">{{value.name}}</div>-->

<!--        </div>-->
      </div>
    </pane>

  </splitpanes>
  <div class="grp-operate-menu"
       v-bind:style="{'left':operateMenuLeft,'top':operateMenuTop}"
       v-show="isShowOperateMenu">
    <div class="grp-operate-menu-item" @click="onRenameGroupMenuClick();">
      <span>重命名</span>
    </div>
    <div class="grp-operate-menu-item" @click="onDeleteGroup();">
      <span>删除</span>
    </div>
  </div>

  <el-dialog
      v-model="isShowAddGroupDialog"
      title="新建分组"
      width="320px"
      top="30vh"
      destroy-on-close
  >
    <el-input v-model="textNewGroup" placeholder="请输入名称"></el-input>

    <template #footer>
        <span class="dialog-footer">
         <el-button type="primary" @click="onCommitAddGroup"
         >确认</el-button
         >
        <el-button class="is-plain" @click="isShowAddGroupDialog = false">取消</el-button>
      </span>
    </template>
  </el-dialog>


  <el-dialog
      v-model="isShowDeleteGroupDialog"
      title="删除分组"
      width="20%"
      top="30vh"
      destroy-on-close
  >
    <span>是否删除当前分组?</span>
    <template #footer>
      <span class="dialog-footer">
         <el-button type="primary" @click="onCommitDeleteGroup">确认</el-button>
        <el-button class="is-plain" @click="isShowDeleteGroupDialog=false">取消</el-button>
      </span>
    </template>
  </el-dialog>


  <el-dialog
      v-model="isShowDeletePageDialog"
      title="删除大屏"
      width="20%"
      top="30vh"
      destroy-on-close
  >
    <span>是否删除当前大屏?</span>
    <template #footer>
      <span class="dialog-footer">
         <el-button type="primary" @click="onCommitDeletePage">确认</el-button>
        <el-button class="is-plain" @click="isShowDeletePageDialog = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {Splitpanes, Pane} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import {api} from "@/api/api";

const DefaultGroup = {name:'默认组', id:""};

export default {
  name: "Home",
  components:{
    Splitpanes,
    Pane,
  },
  data(){
    return {
      groupList:[],
      pageList:[],
      isShowOperateMenu:false,
      operateMenuLeft: 0,//工程组列表操作面板x坐标
      operateMenuTop: 0,  //工程组列表操作面板y坐标
      isRenamingGroup: false,
      currentEditingGroup:{},
      currentSelectedGroup: '',
      pageSearchText:'',
      isShowAddGroupDialog:false,
      isShowDeleteGroupDialog:false,
      isShowDeletePageDialog:false,
      textNewGroup:'',
      currentEditingPage:{},
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    currentSelectedGroup(newValue, oldValue) {
      this.getPageList();
    },
  },
  computed:{
    filterPages(){
      return this.pageList.filter(p => p.name.indexOf(this.pageSearchText) >= 0);
    }
  },
  created() {
    this.currentSelectedGroup = DefaultGroup;
  },
  mounted() {
    document.addEventListener('click', (e) => {
      this.isShowOperateMenu = false;
    });

    this.getPageGroupList();
  },
  methods:{
    onAddGroup(){
      this.isShowAddGroupDialog = true;
    },
    onCommitAddGroup(){
      let newGroupText = this.textNewGroup.trim();
      if (newGroupText === '') {
        this.$message.error('名称不能为空')
        return;
      }
      let that = this;
      api.addPageGroup(newGroupText, function (res){
        if (res.code === 0) {
          that.$message.success('新建分组成功');
          that.isShowAddGroupDialog = false;
          that.getPageGroupList();
        } else if (res.code === -3){
          that.$message.error('已经具有相同名称的分组！')
        }
        else{
          that.$message.error('新建分组失败')
        }
        // eslint-disable-next-line no-unused-vars
      }, function (error) {

      });
    },
    onDeleteGroup(){
      if (!this.currentEditingGroup){
        return;
      }
      this.isShowDeleteGroupDialog = true;
    },
    onCommitDeleteGroup() {
      if (this.isRenamingGroup) {
        return;
      }
      if(this.currentEditingGroup) {
        let that = this;
        api.dletePageGroup(this.currentEditingGroup.id, function (res) {
          if (res.code === 0) {
            that.$message.success('删除成功')
            that.isShowDeleteGroupDialog = false;
            that.getPageGroupList();
          } else if (res.code === -1){
            that.$message.error('当前分组下有大屏，无法删除！')
          }
          else{
            that.$message.error('删除失败')
          }
        }, function () {
        })

      }
    },

    getPageGroupList(){
      console.log('get group list')
      let that = this;
      api.getPageGroupList(function (res){
        that.groupList = [DefaultGroup].concat(res.data);
      }, function (error){
        console.log(error);
      });
    },
    getPageList(){
      let that = this;
      let groupid = '';
      if (this.currentSelectedGroup){
        groupid = this.currentSelectedGroup.id;
      }
      api.getPageList(groupid, function (res){
        that.pageList = res.data;
      }, function (error){
        console.log(error);
      });
    },
    /**
     * 展开工程组操作面板
     * @param e
     * @param value
     */
    onShowOperateMenu(e, value) {
      let scrollTop = this.$refs['scrollGroup'].wrapRef.scrollTop;
      this.isShowOperateMenu = true;
      e.stopPropagation(); //阻止冒泡，不选中工程组
      //选中当前工程组
      let x = e.currentTarget.offsetLeft
      let y = e.currentTarget.offsetTop + 100;
      this.operateMenuLeft = x + 'px';
      this.operateMenuTop = y - scrollTop + 'px';

      // value.isEditing = true;
      if (!value.editText){
        value.editText = value.name;
      }
      this.currentEditingGroup = value;
    },
    /**
     * 点击工程组重命名
     */
    onRenameGroupMenuClick() {
      this.isRenamingGroup = true;
      let id = this.currentEditingGroup.id;
      this.$nextTick(() => {
        let ref_id = 'input_' + id;
        this.$refs[ref_id][0].focus();
      })
    },
    onBeforeRenameTaskGroup(value) {
      let editText = this.currentEditingGroup.editText.trim();
      if (editText === '') {
        this.$message.error('名称不能为空')
        return;
      }
      if (value.name === editText) {
        this.isRenamingGroup = false;
      }
    },
    /**
     * 监听工程组重命名值
     */
    renameTaskGroup(value) {
      var that = this;
      let editText = this.currentEditingGroup.editText.trim();
      if (!editText) {
        that.$message.error('名称为空')
      }
      api.renamePageGroup(this.currentEditingGroup.id, editText, function (res) {
        if (res.data > 0) {
          that.currentEditingGroup.name = editText;
          that.isRenamingGroup = false;
          that.$message.success('修改成功');
        } else {
          that.$message.error('修改失败')
        }
      }, function () {
        that.$message.error('修改失败')
      })

    },

    /**
     * 工程组列表点击事件
     * @param value
     */
    setCurrentGroup(value) {
      if (this.isRenamingGroup) {
        return;
      }
      if (this.currentSelectedGroup.id === value.id) {
        return;
      }
      //选中当前工程组
      this.currentSelectedGroup = value;
    },
    onCreatePage(){
      let that = this;
      api.createPage(function (res) {
        if (res.code === 0) {
          that.onOpenPage(res.data);
        }
        else{
          that.$message.error('新建失败')
        }
      }, function () {
      })
    },
    onDeletePage(value){
      this.currentEditingPage = value;
      this.isShowDeletePageDialog = true;
    },
    onCommitDeletePage() {
      if(this.currentEditingPage) {
        let that = this;
        api.deletePage(this.currentEditingPage.id, function (res) {
          if (res.code === 0) {
            that.$message.success('删除成功')
            that.isShowDeletePageDialog = false;
            that.getPageList();
          }
          else{
            that.$message.error('删除失败')
          }
        }, function () {
        })

      }
    },
    onOpenPage(page){
      console.log('edit...')
      let url = this.$router.resolve({name:'editor', query:{id:page.id}});
      window.open(url.href, '_blank')
    },
    onPreviewPage(page){
      let url = this.$router.resolve({name:'preview', query:{code:page.code}});
      window.open(url.href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
//$dark:#263238;
//$darkHover:#464646;
//
//$light:#fff;

.grp-group{
  position: relative;
  min-width: 200px;
  background-color: $colorDark !important;
  box-sizing: border-box;
  padding-top: 10px;
}

.grp-group-items{
  position: absolute;
  top: 15px;
  bottom: 60px;
  left: 0px;
  right: 0px;
}
.grp-addgroup{
  position: absolute;
  bottom: 10px;
  width: 100%;
}

.grp-page-item {
  width: 300px;
  height: 200px;
  position: relative;
}
.page-image{
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
  top: 60px;
}
.page-title{
  position: absolute;;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 60px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.page-title-icons{
  flex-shrink: 0;
  width: 100px;
}
.page-title-icons .el-button{
  width: 30px;
  height: 30px;
  margin-left: 0px;
}


.grp-group-item {
  color: #fff;
  font-size: 14px;
  text-align: left;

  min-height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.projectSelect {
  color: #13A9EA !important;
}
.grp-group-item .icon {
  visibility: hidden;
}

.grp-group-item:hover .icon {
  visibility: visible;
}

.grp-group-item:hover {
  background-color: $colorHover;
}

.grp-group-item .name {
  padding-left: 20px;
  word-break: break-all;
  word-wrap: break-word
}

.grp-group-item .icon {
  font-size: 18px;
  font-weight: 700;
  height: 26px;
  width: 26px;
  line-height: 18px;
  margin-right: 10px;
  color: #fff !important;
  text-align: center;
}

.grp-group-item .icon:hover {
  background-color: $colorHover;
}

.grp-operate-menu {
  position: absolute;
  color: #fff;
  background-color: #1C1C1C;
  z-index: 30;
}

.grp-operate-menu-item {
  display: flex;
  align-items: center;
  padding: 5px 20px;
  cursor: pointer;
}

.grp-operate-menu-item:hover {
  background-color: $colorHover;
}

</style>