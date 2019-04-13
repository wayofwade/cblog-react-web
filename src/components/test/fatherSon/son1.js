/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/4/13.
 */
/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/4/10.
 */
import React from 'react';
import load from 'lodash';

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
        <button onClick={this.addLeft}>左边加1</button>
        <button onClick={this.addRight.bind(this)}>右边加1</button>
        <button onClick={this.addFather.bind(this)}>父组件+1+随机数</button>
        <div>
          左边的数字： {this.state.leftNum}
        </div>
        <div>
          左边的数字： {this.state.rightNum}
        </div>
        <div>
          从父组件传过来的数据===>>>{this.getTodos()}
          父组件随机数：{this.state.fromFather}
        </div>
      </div>
    );
  }
  getNumber() {
    return Math.ceil(Math.random()*100)
  }
  addFather() { // 子组件调用父组件的方法
    this.props.sonToFather(this.getNumber())
  }
  getTodos() {
    return this.props.todos[0].task
  }
  addLeft (fromFather) { // 添加左边的
    this.setState({
      fromFather: fromFather
    })
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
