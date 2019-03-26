// 主文件
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './main.css'
import App from './App';
import {  HashRouter, Route, Switch} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import myChart from './components/chart.js'

// 配置路由
ReactDOM.render(
  <HashRouter>
    <Switch>
    <Route exact path="/" component={App}/>
    <Route path="/myChart" component={myChart}/>
    </Switch>
  </HashRouter>
, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
