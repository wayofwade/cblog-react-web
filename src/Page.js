/**
 * 总的路由文件
 * app页面为所有页面的父页面
 * app页面指向了menu目录下的文件--所以进入系统都是同样的侧边拦和header组件
 * 主有内容根据/route下面进行切换
 */
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/form/form';
import Login from './components/table/BasicTable';
import App from './components/menu/index.js' //


console.log('page的页面-----------')
export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)