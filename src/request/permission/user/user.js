/**
 * Created by Administrator on 2019/10/13.
 */
import axiosObj from '@/axios/dataRequest'


const user = {
    getUsers(params) {
        return axiosObj.post({
            url: '/localApi/permission/user/list',
            data: params
        })
    },
    addUser(data){
        return axiosObj.post({
            url: '/localApi/permission/user/add',
            data: data
        })
    },
    delUser(data){
        return axiosObj.post({
            url: '/localApi/permission/user/del',
            params: data
        })
    },
}


export default user