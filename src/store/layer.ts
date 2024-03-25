/*
 * @Author: WH
 * @Date: 2024-03-24 19:08:47
 * @Description: 
 * @LastEditTime: 2024-03-24 19:32:24
 * @LastEditors:  
 */
import { swap } from '@/utils/utils'
import toast from '@/utils/toast'

export const layerStore = defineStore("layer", {
    getters: {},
    actions: {
        upComponent(state, index) {
            console.log('up...')
            // const { curWidgetIndex } = state;
            const { widgetlist } = this.getters;
            // 上移图层 index，表示元素在数组中越往后
            if (index < widgetlist.length - 1) {
                swap(widgetlist, index, index + 1)
                state.curWidgetIndex = index + 1
            } else {
                toast('已经到顶了')
            }
        },

        downComponent(state, index) {
            // const { curWidgetIndex } = state;
            const { widgetlist } = this.getters;
            // 下移图层 index，表示元素在数组中越往前
            if (index > 0) {
                swap(widgetlist, index, index - 1)
                state.curWidgetIndex = index - 1
            } else {
                toast('已经到底了')
            }
        },

        topComponent(state, index) {
            const { widgetlist } = this.getters;
            // 置顶
            if (index < widgetlist.length - 1) {
                let widget = widgetlist[index];
                widgetlist.splice(index, 1)
                widgetlist.push(widget)
            } else {
                toast('已经到顶了')
            }
        },

        bottomComponent(state, index) {
            const { widgetlist } = this.getters;
            // 置底
            if (index > 0) {
                let widget = widgetlist[index];
                widgetlist.splice(index, 1)
                widgetlist.unshift(widget)
            } else {
                toast('已经到底了')
            }
        },
    },
});
