/*

 * 重新封装axios请求

 * 前端设置请求超时时间60s

 * */

import axios from 'axios'
import {
    message
} from 'antd'


let count = 0 // 每次错误的信息的时候加1.每隔一秒就清空。防止一致toast
const axiosObj = axios.create({
    baseURL: '/',
    timeout: 60 * 1000
})


function isOk(res) {
    return res && (res.code === 0 || res.code === '0')
}


function formatParams(params) { // 需要把本地的token放进去
    let token = localStorage.getItem("token")
    // console.log('本地的token、', token, params)
    if (params) {
        params = Object.assign(params, {token: token})
        let paramsArr = []
        for (let key of Object.keys(params)) {
            paramsArr.push(key + '=' + params[key])
        }
        return '?' + paramsArr.join('&')
    }
    return '?token=' + token

}


/**

 * 拦截请求promise

 * @param loadingDom 显示loading的dom

 * @param promiseObj promise对象

 * @param noTip 不显示统一错误提示

 * @returns {PromiseLike<T> | Promise<T>}

 */

function doPromise(loadingDom, promiseObj, noTip) {
    return promiseObj.then((res) => {
        if (res.data && res.data.code === '2004') { // 登录过期时最外层window弹出登录弹框
            window.showModal()
        }
        if (!noTip) { // 统一提示信息
            if (!isOk(res.data) && !isOk(res)) { // 服务端统一错误处理
                if (count === 0) { // 防止重复提示
                    count += 1
                    message.error(res.errorInfo || res.data.errorInfo || '请求出错')
                }
                setTimeout(() => {
                    count = 0
                }, 1000);

                // console.error('-----------------------------------------')

                // 服务端返回错误
                return Promise.reject(res)
            }
        }

        return Promise.resolve(res.data || {})
    }, (error) => { // axios请求超时--503-504等等会走到这边

        if (!noTip) {
            let errorMsg
            if (count === 0) {
                count += 1
                if (error.response) {
                    errorMsg = `请求失败，错误码：${error.response.status}`
                } else {
                    errorMsg = error.message
                }
                message.error(errorMsg || '请求出错')
            }

            setTimeout(() => {
                count = 0
            }, 1000);
        }

        // ajax错误

        return Promise.reject(error)

    })

}


function get({
                 url,
                 params,
                 loadingDom,
                 noTip

             }) {
    let promiseObj = axiosObj.get(url + formatParams(params))
    return doPromise(loadingDom, promiseObj, noTip)
}


function post({
                  url,
                  params,
                  data,
                  loadingDom,
                  noTip
              }) {

    let promiseObj = axiosObj.post(url + formatParams(params), data)
    return doPromise(loadingDom, promiseObj, noTip)
}

export default {
    isOk,
    get,
    post

}


