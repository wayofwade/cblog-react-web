import axiosObj from '@src/axios/dataRequest'


const menu = {

    /**
     * 添加和修改角色
     * @param {*} params
     */
    addMenu(params) {
        return axiosObj.post({
            url: '/localApi/permission/menu/add',
            data: params,
        })
    },

    /**
     * 删除和恢复
     * @param {*} params
     */
    delMenu(params) {
        return axiosObj.post({
            method: 'post',
            url: '/localApi/permission/menu/del',
            params: params
        })
    },

    /**
     * 查询列表
     * @param {*} form
     */

    getMenuList(form) {
        let url = ('/localApi/permission/menu/list')
        return axiosObj.post({
            url: url,
            data: form
        })
    },


    /**
     * 获取前端所有的菜单-父子层级关系的
     * @param {*} form
     */

    getMenuMapList(form) {
        let url = ('/localApi/permission/menu/menuList')
        return axiosObj.get({
            url: url,
            params: form
        })
    },

    /**

     * 获取前端所有的菜单-纯粹的菜单
     * @param {*} form
     */

    getAllList(form) {
        let url = ('/localApi/permission/menu/allList')
        return axiosObj.post({
            url: url,
            data: form
        })
    }
}

export default menu