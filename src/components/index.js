
/**
 * 路由组件出口文件
 * 所有的路由在这里定义
 */
// import Loadable from 'react-loadable';

import BasicTable from './table/BasicTable';
import Dashboard from './dashboard/Dashboard';
// import User from '@src/components/permission/user/user.js'
import User from './permission/user/user.js'

import Role from '@/components/permission/role/role'


export default {
    BasicTable, Dashboard, User, Role
}