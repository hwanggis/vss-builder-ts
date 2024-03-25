<template>
  <div ref="container" class="container">
    <div
        id="editor"
        class="container"
        style="transform-origin:0 0"
        :style="{
            ...getCanvasStyle(pageStyleConfig)
        }"
    >
      <component   v-for="(item, index) in widgetlist" :key="item.id"
                   :is="item.types"
                   :id="'component' + item.id"
                   class="component"
                   :style="getStyle(item.style)"
                   :dataconfig="item.dataconfig"
                   :datacontent = "item.datacontent"
                   :element="item"
      />
    </div>
  </div>
</template>

<script>


import {mapGetters} from "vuex";
import {getStyle, getCanvasStyle} from '@/utils/style'

export default {
  computed: {
    ...mapGetters(['pageStyleConfig', 'widgetlist'])
  },
  mounted() {
    this.pageid = this.$route.query.id;
    this.code = this.$route.query.code;
    let params = {detail:1};
    if (this.pageid !== null){
      params['id'] = this.pageid
    }
    if (this.code){
      params['code'] = this.code;
    }
    this.$store.dispatch('getPageData', params).then(function (res) {
      
    }); //获取页面数据（样式、组件等）
  },
  methods:{
    getStyle,
    getCanvasStyle,
  }
}
</script>

<style scoped>

</style>