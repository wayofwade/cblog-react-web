import axiosObj from '@src/axios/dataRequest'


const role = {

    /**

     * 添加和修改角色

     * @param {*} params

     */

    addRole(params) {

        return axiosObj.post({

            url: '/localApi/permission/role/add',

            data: params,

        })

    },

    /**

     * 删除和恢复

     * @param {*} params

     */

    delRole(params) {

        return axiosObj.post({

            method: 'post',

            url: '/localApi/permission/role/del',

            params: params

        })

    },

    /**

     * 查询列表

     * @param {*} form

     */

    getRoleList(form) {

        let url = ('/localApi/permission/role/list')

        return axiosObj.post({

            url: url,

            data: form

        })

    },

    /**

     * 查询含有uid的角色列表

     * @param {*} form

     */

    getRoleListWithUid(form) {

        let url = ('/localApi/permission/role/listWithUid')

        return axiosObj.post({

            url: url,

            data: form

        })

    }

}

export default role