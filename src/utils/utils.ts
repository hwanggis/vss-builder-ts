/**
 * 深拷贝
 * @param target
 * @returns {*[]|*}
 */
export function deepCopy(target:any) {
    if (typeof target == 'object') {
        const result: {[key: string]: any} = Array.isArray(target) ? [] : {}
        for (const key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepCopy(target[key])
            } else {
                result[key] = target[key]
            }
        }

        return result
    }

    return target
}

/**
 * 简单拷贝对象（只拷贝可枚举的属性）
 * @param obj
 * @returns {{}|*}
 */
export function simpleCopy(obj:{[key: string]: any}){
    if (obj == null){
        return null;
    }

    if (Array.isArray(obj) || obj.constructor === Object){
        var keys = Object.keys(obj);
        if (keys.length > 0){
            var obj_result:{[key: string]: any} = {};
            // for (var k of keys){
            for (var i = 0; i < keys.length; i++){
                var k = keys[i];
                var v = obj[k];
                var obj_copy = v;
                if (Array.isArray(v)){
                    obj_copy = []
                    for (var j = 0; j < v.length; j++){
                        var vk = v[j];
                        obj_copy.push(simpleCopy(vk))
                    }
                    // for (var vk of v){
                    //     obj_copy.push(simpleCopy(vk))
                    // }
                }
                else if (v != null && v.constructor === Object){
                    obj_copy = simpleCopy(v);
                }
                obj_result[k] = obj_copy;
            }
            return obj_result;
        }
    }
    return obj;
}

export function swap(arr:Array<any>, i:number, j:number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * 根据模板格式，将数据转为模板样式
 * @param template
 * @param data
 * @returns {*}
 */
export function fix(template:{[key: string]: any}, data:{[key: string]: any}){
    if (!template){
        return null;
    }
    if (typeof template == 'object') {
        let result:{[key: string]: any} = Array.isArray(template) ? [] : {}
        for (const key in template) {
            if (data && data[key]) {
                if (typeof data[key] == 'object') {
                    result[key] = fix(template[key], data[key]);
                } else {
                    result[key] = data[key];
                }
            } else {
                result[key] = template[key];
            }
        }
        return result;
    }
    return template;
}


export function $(selector:string) {
    return document.querySelector(selector)
}

const components = ['VText', 'RectShape', 'CircleShape']
export function isPreventDrop(component:string) {
    return !components.includes(component) && !component.startsWith('SVG')
}
