import { sin, cos, toPercent } from '@/utils/translate'
import store from "@/store";
import {divide} from "mathjs";

const shapeKeys =  ['width', 'height', 'top', 'left', 'rotate'];

const pxKeys = [
    'fontSize',
    'width',
    'height',
    'top',
    'left',
    'padding',
    'borderWidth',
    'letterSpacing',
    'borderRadius',
]


export function getShapeStyle(style) {
    const result = {};
    shapeKeys.forEach(attr => {
        if (attr !== 'rotate') {
            let value = style[attr];
            result[attr] = value + 'px'
        } else {
            result.transform = 'rotate(' + style[attr] + 'deg)'
        }
    })

    return result
}

export function getStyle(style, filter = []) {
    if (!style){
        return {};
    }
    const result = {}
    Object.keys(style).forEach(key => {
        if (!filter.includes(key)) {
            if (style[key] !== '') {
                if (key !== 'rotate') {
                    result[key] = style[key];
                    if (pxKeys.includes(key)) {
                        result[key] += 'px'
                    }

                    if (key === 'scale') {
                        let scale = divide(parseInt(result[key]), 100);
                        result['scale'] = scale;
                        //result.transform = 'scale(' + scale + ')'
                    }
                } else {
                    result.transform = key + '(' + style[key] + 'deg)'
                }
            }
        }
    })

    return result
}
export function getCanvasStyle(style) {
    if (!style){
        return {};
    }
    const result = {}
    Object.keys(style).forEach(key => {
        result[key] = style[key]
        if (pxKeys.includes(key)) {
            result[key] += 'px'
        }
        if (key === 'scale'){
            let scale = divide(parseInt(result[key]), 100);
            result['scale'] = scale;
            //result.transform = 'scale(' + scale + ')'
        }
    })

    return result
}

// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style) {
    style = { ...style }
    if (style.rotate !== 0) {
        const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate)
        const diffX = (style.width - newWidth) / 2 // 旋转后范围变小是正值，变大是负值
        style.left += diffX
        style.right = style.left + newWidth

        const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate)
        const diffY = (newHeight - style.height) / 2 // 始终是正
        style.top -= diffY
        style.bottom = style.top + newHeight

        style.width = newWidth
        style.height = newHeight
    } else {
        style.bottom = style.top + style.height
        style.right = style.left + style.width
    }

    return style
}


export function createGroupStyle(groupComponent) {
    const parentStyle = groupComponent.style
    groupComponent.data.forEach(component => {
        // component.groupStyle 的 top left 是相对于 group 组件的位置
        // 如果已存在 component.groupStyle，说明已经计算过一次了。不需要再次计算
        if (!Object.keys(component.groupStyle).length) {
            const style = { ...component.style }
            if (component.types.startsWith('SVG')) {
                component.groupStyle = getSVGStyle(style)
            } else {
                component.groupStyle = getStyle(style)
            }

            component.groupStyle.left = toPercent((style.left - parentStyle.left) / parentStyle.width)
            component.groupStyle.top = toPercent((style.top - parentStyle.top) / parentStyle.height)
            component.groupStyle.width = toPercent(style.width / parentStyle.width)
            component.groupStyle.height = toPercent(style.height / parentStyle.height)
        }
    })
}

export function transformScaleValue(value){
    let scale = store.getters.pageStyleConfig.scale;
    if (!scale){
        scale = 100;
    }
    scale = divide(scale, 100);
    return value /scale;
}
