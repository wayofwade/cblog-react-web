// 主文件 启动：npm run start
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/main.css'
import 'antd/dist/antd.css';
import App from './components/app/App';
import {  HashRouter, Route, Switch} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import myChart from './components/chart.js'
import table from './components/table/table.js'
import tableWithBtn from './components/table/tableWithBtn.js'
import form from './components/form/form.js'
import todoList from './components/test/todoList/app.js'
import number from './components/test/addNumber/number.js'
import myMenu from './components/menu/menu.js'
import fatherSon from './components/test/fatherSon/index.js'
import testRoute from './components/test/route/index.js'

// 配置路由
ReactDOM.render(
  <HashRouter>
    <Switch>
    <Route exact path="/" component={App}/>
    <Route path="/myChart" component={myChart}/>
    <Route path="/table" component={table}/>
    <Route path="/tableWithBtn" component={tableWithBtn}/>
    <Route path="/form" component={form}/>
    <Route path="/todoList" component={todoList}/>
    <Route path="/number" component={number}/>
    <Route path="/myMenu" component={myMenu}/>
    <Route path="/fatherSon" component={fatherSon}/>
    <Route path="/testRoute" component={testRoute}/>
    </Switch>
  </HashRouter>
, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
