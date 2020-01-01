
/**
 * 路由组件出口文件
 * 所有的路由在这里定义
 */
// import Loadable from 'react-loadable';

import BasicTable from './table/BasicTable';
import Dashboard from './dashboard/Dashboard';
// import User from '@src/components/permission/user/user.js'
import User from '@src/components/permission/user/user'

import Role from '@src/components/permission/role/role'
import Menu from '@src/components/permission/menu/menu'
import Operate from '@src/components/permission/operate/operate'


export default {
    BasicTable, Dashboard, User, Role, Menu, Operate
}