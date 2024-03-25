import { TemplatePageData } from "@/configs/template";
import { fix } from "@/utils/utils";

export const mainstore = defineStore("main", {
    state: () => {
        return {
            editMode: 'edit', // 编辑器模式 edit preview
            pageData: TemplatePageData,
            isInEdiotr: false, // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
            curWidget: null,
            curWidgetIndex: null,
            curWidgetHelper:null,
            // 点击画布时是否点中组件，主要用于取消选中组件用。
            // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
            isClickWidget: false,
        }
    },
    getters:{
        pageStyleConfig:(state) =>{
            let styleConfig = {...state.pageData.style, name:state.pageData.name, thumb:state.pageData.thumb};
            return styleConfig
        },
        widgetlist:(state) => {
            return state.pageData.widgetlist;
        }
    },

    actions:{
        aceSetCanvasData(value: any) {
            this.pageData.style = value;
        },


        setClickWidgetStatus(status: boolean) {
            this.isClickWidget = status
        },

        setEditMode(mode: string) {
            this.editMode = mode
        },

        setInEditorStatus(status: boolean) {
            this.isInEdiotr = status
        },

        setCanvasStyle(state: { pageData: { style: any; }; }, style: any) {
            state.pageData.style = fix(state.pageData.style, style);
        },

        setCurWidget(state: { curWidget: any; curWidgetIndex: any; }, { widget, index }: any) {
            state.curWidget = widget
            state.curWidgetIndex = index
        },

        setShapeStyle({ curWidget }, { top, left, width, height, rotate }) {
            if (top) curWidget.style.top = Math.round(top)
            if (left) curWidget.style.left = Math.round(left)
            if (width) curWidget.style.width = Math.round(width)
            if (height) curWidget.style.height = Math.round(height)
            if (rotate) curWidget.style.rotate = Math.round(rotate)
        },

        setShapeSingleStyle({ curWidget }, { key, value }) {
            curWidget.style[key] = value
        },

        setPageData(state: { pageData: any; }, data: any){
            state.pageData = data;
        },

        setWidgetList(state: { pageData: { widgetlist: any; }; }, data: any){
            state.pageData.widgetlist = data;
        },

        setWidgetData(state: { pageData: { widgetlist: string | any[]; }; }, {id, dataconfig, datacontent, style}: any){
            for(let i = 0; i < state.pageData.widgetlist.length; i++){
                let widget = state.pageData.widgetlist[i];
                if (id === widget.id){
                    if (dataconfig){
                        widget.dataconfig = dataconfig;
                    }
                    if (datacontent){
                        widget.datacontent = datacontent;
                    }
                    if (style){
                        widget.style = style;
                    }
                }
            }
        },


        addComponent(state: { pageData: { widgetlist: any[]; }; }, { component, index }: any) {
            if (index !== undefined) {
                state.pageData.widgetlist.splice(index, 0, component)
            } else {
                state.pageData.widgetlist.push(component)
            }
        },


        /**
         * 删除组件
         * @param state
         * @param index
         */
        deleteWidget(state: { curWidgetIndex: null; curWidget: null; pageData: { widgetlist: any[]; }; }, index: string | undefined) {
            if (index === undefined) {
                index = state.curWidgetIndex
            }

            if (index === state.curWidgetIndex) {
                state.curWidgetIndex = null
                state.curWidget = null
            }

            if (/\d/.test(index)) {
                state.pageData.widgetlist.splice(index, 1)
            }
        },
        getPageData(context: { commit: (arg0: string, arg1: any) => void; }, {code, id, detail}: any){
            console.log('fetch page data from server ...');
            return new Promise((resolve, reject) => {
                try{
                    let param = code;
                    let func = 'getPageDataByCode'
                    if (!code){
                        param = id;
                        func = 'getPageData'
                    }
                    if (detail){
                        detail = 1;
                    }
                    else{
                        detail = 0;
                    }
                    api[func](param, detail, function (res: { code: number; data: unknown; }){
                        if (res.code === 0) {
                            ConverterFactory.CreateConverter('page').then(function (cv: { toClient: (arg0: any) => Promise<any>; }) {
                                cv.toClient(res.data).then(function (pageData: any) {
                                    context.commit('setPageData', pageData);
                                    resolve(res.data);
                                });

                            });
                        }
                        // eslint-disable-next-line no-unused-vars
                    }, function (error: any) {
                        reject(error)
                    });
                }
                catch (e) {
                    reject(e);
                }
            });
        },
        addWidget(context: { state: { pageData: { widgetlist: any[]; }; }; }, { widgetid, index, left, top }: any) {
            console.log('add widget from server ...')
            api.getWidgetInfo(widgetid, function (res: { code: number; data: { types: any; }; }){
                if (res.code === 0) {
                    ConverterFactory.CreateConverter(res.data.types).then(function (cv: { toClient: (arg0: any) => Promise<any>; }) {
                        cv.toClient(res.data).then(function (component: { style: { left: any; top: any; }; }) {
                            if (left !== undefined){
                                component.style.left = left;
                            }
                            if (top !== undefined){
                                component.style.top = top;
                            }
                            if (index !== undefined) {
                                context.state.pageData.widgetlist.splice(index, 0, component)
                            } else {
                                context.state.pageData.widgetlist.push(component)
                            }
                        });
                    });

                }
                // eslint-disable-next-line no-unused-vars
            }, function (error: any) {

            });
        },
        /**
         * 删除组件
         * @param state
         * @param index
         */
        async deleteWidget(context: { state: any; }, {index}: any) {
            let state = context.state;
            if (index === undefined) {
                index = state.curWidgetIndex
            }

            if (index === state.curWidgetIndex) {
                state.curWidgetIndex = null
                state.curWidget = null
            }
            return new Promise((resolve, reject)=>{
                if (/\d/.test(index)) {
                    let objWidget = state.pageData.widgetlist[index];
                    api.deleteWidget(objWidget.id, function (res: { code: unknown; }) {
                        if (res.code === 0){
                            state.pageData.widgetlist.splice(index, 1);
                        }
                        resolve(res.code);
                    }, function (error: any) {
                        resolve(-1);
                    });

                }
                else{
                    resolve(-2);
                }
            });
        },
    }
});