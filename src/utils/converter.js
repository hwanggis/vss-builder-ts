import {fix} from "@/utils/utils";
import {TemplatePageData, TemplateWidget} from "@/configs/template";


/**
 * 转换器
 */
export class Converter{
    constructor() {
    }

    /**
     * 修复对象
     * @param obj
     * @returns {*}
     */
    fix(obj){
        return obj;
    }

    /**
     * 将前端数据格式转成服务端格式
     * @param obj
     * @returns {*}
     */
    async toServer(obj){
        return obj;
    }

    /**
     * 将服务端获取的数据转成前端格式
     * @param obj
     * @returns {*}
     */
    async toClient(obj){
        console.log('client...')
        if (!obj){
            return fix(TemplateWidget, {});
        }
        if (typeof obj.style === 'string'){
            obj.style = JSON.parse(obj.style);
        }
        if (typeof obj.dataconfig === 'string'){
            obj.dataconfig = JSON.parse(obj.dataconfig);
        }
        if (typeof obj.datacontent === 'string'){
            obj.datacontent = JSON.parse(obj.datacontent);
        }
        let objWidget = fix(TemplateWidget, obj);
        objWidget.style = fix(objWidget.style, obj.style);
        objWidget.dataconfig = obj.dataconfig;
        objWidget.datacontent = obj.datacontent;
        return objWidget;
    }
}

/**
 * 大屏转换器
 */
export class PageConverter extends Converter{

    async toClient(data) {
        if (typeof data.style === 'string') {
            data.style = JSON.parse(data.style);
        }
        let scale = data.style.scale ? data.style.scale : 100;
        scale = scale > 10 ? scale : 100 * scale;
        data.style.scale = scale;

        let objPage = fix(TemplatePageData, data);
        objPage.style = fix(fix(objPage.style, data), data.style); //先中服务端data中拥有style的属性填充style；再用data.style的属性填充style完成样式转换
        if (data.widgetlist) {
            let lstWidget = [];
            for (let i = 0; i < data.widgetlist.length; i++) {
                let objWidgetServer = data.widgetlist[i];
                await ConverterFactory.CreateConverter(objWidgetServer.types).then(function (cv) {
                    cv.toClient(objWidgetServer).then(function (objWidget) {
                        objWidget.zindex = i;
                        lstWidget.push(objWidget);
                    });

                });
            }
            objPage.widgetlist = lstWidget;
        }

        return objPage
    }

    async toServer(obj) {
        return super.toServer(obj);
    }
}

/**
 * 转换器工厂，根据不同类别的部件创建不同转换器
 */
export class ConverterFactory {
    static _Cache = {
        'page': new PageConverter(),
        'default':new Converter()
    };

    static CreateConverter(name){
        let that = this;
        return new Promise((resolve, reject) => {
            if (!that._Cache[name]){
                import(`@/widgets/${name}/converter`).then(function (res){
                    that._Cache[name] = new res.default();
                    resolve(that._Cache[name]);
                }).catch(function (e) {
                    resolve(that._Cache['default']);
                })
            }
            else{
                resolve(that._Cache[name]);
            }
        });
    }

}
