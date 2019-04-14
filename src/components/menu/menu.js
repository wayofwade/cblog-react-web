/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/4/10.
 */
import { Menu, Icon } from 'antd';
import React from 'react';
import {  HashRouter, Route, Switch} from 'react-router-dom'
import todoList from '../../components/test/todoList/app.js'
import number from '../../components/test/addNumber/number.js'
import table from '../../components/table/table.js'
import form from '../../components/form/form.js'
import './menu.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const todos = [ // 组件内定义的全局变量
  {
    task: '学习react',
    isCompleted: false
  },
  {
    task: '吃饭',
    isCompleted: true
  }
];

export default class App extends React.Component { // 组件
  constructor(props) { // 构造方法
    super(props);

    this.state = {
      todos
    };
  }
  handleClick = (e) => { // 点击的方法
    console.log('click ', e);
    let pathname = e.key
    this.props.history.push({pathname: '/myMenu' + pathname, state: {data: 'hello world from route'}})
  }
  render() { // 渲染的方法
    return (
      <div className="main-div">
        <div className="left">
          <Menu
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
              <MenuItemGroup key="g1" title="Item 1">
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup key="g2" title="Item 2">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>配置了路由的</span></span>}>
              <Menu.Item key="/table2">跳转到table</Menu.Item>
              <Menu.Item key="/form2">跳转到form</Menu.Item>
              <Menu.Item key="/number2">跳转到number2</Menu.Item>
              <Menu.Item key="/todoList2">跳转到todoList2</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="right">
          <Route path="/myMenu/todoList2" component={todoList}/>
          <Route path="/myMenu/number2" component={number}/>
          <Route path="/myMenu/table2" component={table}/>
          <Route path="/myMenu/form2" component={form}/>
        </div>
      </div>
    );
  }
}
