
/**
 * 页面样式模板
 * @type {{backgroundColor: string, name: string, width: number, scale: number, height: number}}
 */
const TemplatePageStyle = {
    name: '',                                    //名称
    width: 1920,                                 //大屏宽度
    height: 1080,                                //大屏高度
    scale: 100,                                  //编辑器缩放比例
    backgroundColor: 'rgba(26,26,26,1)',         //背景色
    fitMode:'stretch'                            //stretch、raw、fitx、fity
}

export const TemplatePageData = {
    id:-1,
    name:'',
    code:'',
    thumb: '',  //缩略图
    style:TemplatePageStyle,
    widgetlist:[]
}


const TemplateWidgetStyle = {
    left: 10,    //x坐标
    top: 10,     //y坐标
    width: 300,  //宽度
    height: 300, //高度
    rotate: 0,   //旋转角度
    padding: 10, //间距
    backgroundColor: 'rgba(86,86,86,1)',     //背景色
    backgroundImage: '',                     //背景图片
    borderStyle: 'solid',                    //边框样式
    borderWidth: 0,                          //边框宽度
    borderColor: 'rgba(128,128,128,1)',      //边框颜色
    borderRadius: 0,                         //边框圆角半径
    opacity:1,                               //透明度
}


const TemplateWidgetDataConfig = {

}

const TemplateWidgetDataContent = {

}

export const TemplateWidget = {
    id:-1,
    code:'',
    name:'',    //名称
    zindex:0,
    types:'',       //部件类别
    style: TemplateWidgetStyle,      //通用样式
    dataconfig:TemplateWidgetDataConfig,
    datacontent:TemplateWidgetDataContent,
    datasource:'ds_text'
}
