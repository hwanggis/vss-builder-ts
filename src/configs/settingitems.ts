/*
 * @Author: WH
 * @Date: 2023-09-18 20:18:48
 * @Description: 
 * @LastEditTime: 2023-09-18 20:30:07
 * @LastEditors:  
 */
import {borderStyleOptions, textAlignOptions, verticalAlignOptions} from "@/utils/attr";

export const SettingTypes = {
    Color:"colorpicker",
    Input:"input",
    InputNumber:"input.number",
    InputNumberFloat:"input.number.float",
    Thumb:"thumb",
    Select:"select"
}

export const SettingItemConfig = {
    "color":{
        "name":"颜色",
        "type":SettingTypes.Color
    },
    "borderColor":{
        "name":"边框颜色",
        "type":SettingTypes.Color
    },
    "backgroundColor":{
        "name":"背景颜色",
        "type":SettingTypes.Color
    },
    "name":{
        "name":"名称",
        "type":SettingTypes.Input
    },
    "scale":{
        "name":"缩放（百分比）",
        "type":SettingTypes.InputNumber
    },
    "left":{
        "name":"x 坐标",
        "type":SettingTypes.InputNumber
    },
    "top":{
        "name":"y 坐标",
        "type":SettingTypes.InputNumber
    },
    "rotate":{
        "name":"旋转角度",
        "type":SettingTypes.InputNumber
    },
    "width":{
        "name":"宽（像素）",
        "type":SettingTypes.InputNumber
    },
    "height":{
        "name":"高（像素）",
        "type":SettingTypes.InputNumber
    },
    "thumb":{
        "name":"缩略图",
        "type":SettingTypes.Thumb
    },
    "borderWidth":{
        "name":"边框宽度",
        "type":SettingTypes.InputNumber
    },
    "borderRadius":{
        "name":"边框半径",
        "type":SettingTypes.InputNumber
    },
    "borderStyle":{
        "name":"边框风格",
        "type":SettingTypes.Select
    },
    "letterSpacing":{
        "name":"字间距",
        "type":SettingTypes.InputNumber
    },
    "lineHeight":{
        "name":"行高",
        "type":SettingTypes.InputNumber
    },
    "fontWeight":{
        "name":"字体粗细",
        "type":SettingTypes.InputNumber
    },
    "fontSize":{
        "name":"字体大小",
        "type":SettingTypes.InputNumber
    },
    "padding":{
        "name":"边距",
        "type":SettingTypes.InputNumber,
    },
    "opacity":{
        "name":"不透明度",
        "type":SettingTypes.InputNumberFloat,
        "step":0.1
    },
    "textAlign":{
        "name":"左右对齐",
        "type":SettingTypes.Select
    },
    "verticalAlign":{
        "name":"上下对齐",
        "type":SettingTypes.Select
    },
}

export const getSelectOptions = function (key){
    switch (key) {
        case 'textAlign':
            return textAlignOptions;
        case 'borderStyle':
            return borderStyleOptions;
        case 'verticalAlign':
            return verticalAlignOptions;

    }
    return [];
}