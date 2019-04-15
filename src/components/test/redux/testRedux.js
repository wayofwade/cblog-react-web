/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/4/15.
 */
import React from 'react';
import load from 'lodash';
import store from './index.js'

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
      rightNum: 10
    };
    this.addLeft = this.addLeft.bind(this);//手动绑定
  }
  render() { // 每次更新组件都是重新render。所以定义便刘昂需要在构造方法里面
    return (
      <div>
        <h1>测试redux</h1>
        <button onClick={this.addLeft}>左边加1以及redux + 1</button>
        <button onClick={this.addRight.bind(this)}>右边加1 redux - 1</button>
        <div>
          左边的数字： {this.state.leftNum}
        </div>
        <div>
          左边的数字： {this.state.rightNum}
        </div>
      </div>
    );
  }

  addLeft () { // 添加左边的
    console.log('hello add num')
    store.dispatch({ type: 'INCREMENT' })
    console.log('redux的值',store.getState())
    console.log(this.state)
    let num = this.state.leftNum + 1
    if (num > 10) {
      this.setState({
        rightNum: this.state.rightNum + 2
      })
    }
    this.setState({
      leftNum: num
    })
  }
  addRight() {
    // DECREMENT
    store.dispatch({ type: 'DECREMENT' })
    console.log('redux的值',store.getState())
    this.setState({
      rightNum: this.state.rightNum + 10
    })
  }
  toggleTask(task) {
    const foundTodo = load.find(this.state.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({ todos: this.state.todos });
  }

  createTask(task) {
    console.log('子组件调用父组件的方法了')
    this.state.todos.push({
      task,
      isCompleted: false
    });
    this.setState({ todos: this.state.todos });
  }

  saveTask(oldTask, newTask) {
    const foundTodo = load.find(this.state.todos, todo => todo.task === oldTask);
    foundTodo.task = newTask;
    this.setState({ todos: this.state.todos });
  }

  deleteTask(taskToDelete) {
    load.remove(this.state.todos, todo => todo.task === taskToDelete);
    this.setState({ todos: this.state.todos });
  }
}
