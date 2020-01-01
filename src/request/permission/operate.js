import axiosObj from '@src/axios/dataRequest'


const operate = {

    /**
     * 添加和修改角色
     * @param {*} params
     */

    addOperate(params) {
        return axiosObj.post({
            url: '/localApi/permission/opt/add',
            data: params,
        })
    },

    /**
     * 删除和恢复
     * @param {*} params
     */
    delOpt(params) {
        return axiosObj.post({
            method: 'post',
            url: '/localApi/permission/opt/del',
            params: params
        })
    },

    /**
     * 查询列表
     * @param {*} form
     */
    getOptList(form) {
        let url = ('/localApi/permission/opt/list')
        return axiosObj.post({
            url: url,
            data: form
        })
    },

    getOptBtns(form) {
        let url = ('/localApi/permission/opt/btnList')
        return axiosObj.get({
            url: url,
            params: form
        })
    }

}

export default operate