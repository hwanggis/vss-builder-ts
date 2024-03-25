/*
 * @Author: WH
 * @Date: 2024-03-24 19:39:15
 * @Description: 
 * @LastEditTime: 2024-03-24 19:40:39
 * @LastEditors:  
 */
export const composeStore = defineStore("compose", {
    getters: {},
    state: () => {
        return {
            areaData: { // 选中区域包含的组件以及区域位移信息
                style: {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                },
                components: [],
            },
            editor: null,
        }
    },
});
