/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/4/13.
 */
import React from 'react';

const todos = [
  {
    task: '学习react',
    isCompleted: false
  },
  {
    task: '吃饭',
    isCompleted: true
  }
];
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos,
      leftNum: 0,
      rightNum: 10,
      fromFather: 0 // 默认为0
    };
    this.addLeft = this.addLeft.bind(this);//手动绑定
  }
  render() { // 每次更新组件都是重新render。所以定义便刘昂需要在构造方法里面
    return (
      <div>
        <h1>React 子组件1 的demo</h1>
        <button onClick={this.addLeft}>路由跳转到表格页面</button>
        <button onClick={this.addRight.bind(this)}>路由跳转到表格页面并且传参数</button>
      </div>
    );
  }
  addLeft (fromFather) { // 路由跳转
    this.props.history.push('/table')
  }
  addRight() {
    this.props.history.push({pathname: '/table', state: {data: 'hello world from route'}})
  }
}
