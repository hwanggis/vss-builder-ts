import axios from 'axios'
import qs from 'qs'
const requests = axios.create({
  // 发送请求的时候回拼接在url参数前面
  // baseURL: config.SERVER_App,
  timeout: 60000,
  withCredentials: true,
  // headers: {
  //     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  transformRequest: [function (data, headers) {
    // 上传文件是不要处理
    if (headers['Content-Type'] === 'multipart/form-data') {
      return data
    }
    return (qs.stringify(data))
    // return urlEncodeParams(data)
  }],
  transformResponse: [function (data) {
    try {
      // data 返回数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
      return JSON.parse(data)
    } catch (err) {
      // 无法转换的数据直接原样返回
      return data
    }
  }]
})


// response 拦截器
requests.interceptors.response.use(
  // 请求成功
  // res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
  (res) => {
    return res.data || res.data
  }
)

/**
 * 将字典转变为url参数
 * @param params
 * @returns {string}
 */
function urlEncodeParams (params) {
  const paramList = []
  for (const key in params) {
    paramList.push(key + '=' + params[key])
  }
  return encodeURI(paramList.join('&'))
}

/**
 * 解析地址中的参数
 * @param url
 * @returns {{}} dict
 */
function parseParams (url) {
  let obj = {}
  const query = decodeURI(url).split('?')[1]
  if (query === undefined) {
    return obj
  }
  const queryArr = query.split('&')
  queryArr.forEach(function (item) {
    const key = item.split('=')[0]
    const value = item.split('=')[1]
    if (obj === undefined) {
      obj = {}
    }
    obj[key] = value
  })
  return obj
}

export {
  requests,
  urlEncodeParams,
  parseParams
}
