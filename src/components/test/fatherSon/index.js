/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/4/13.
 */
import React from 'react';
import load from 'lodash';
import FirstSon from './son1'; // 创建和输入款的div
import Son from './son2';

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
      fatherNum: 10,
      fromSon: 20
    };
  }

  render() {
    return (
      <div>
        <h1>React 父组件 的demo</h1>
        <div>父组件的数字: {this.state.fatherNum}</div>
        <div>父组件的随机值: {this.state.fromSon}</div>
        <div>父组件调用子组件方法<button onClick={this.addChild.bind(this)}>+1</button></div>
        <FirstSon ref="child1" todos={this.state.todos} createTask={this.createTask.bind(this)} sonToFather={this.sonToFather.bind(this)}/>
        <Son
          todos={this.state.todos}
          toggleTask={this.toggleTask.bind(this)}
          saveTask={this.saveTask.bind(this)}
          deleteTask={this.deleteTask.bind(this)}
        />
      </div>
    );
  }

  getNumber() {
    return Math.ceil(Math.random()*10)
  }
  sonToFather(fromSon) { // 子组件调用这个方法
    this.setState({
      fatherNum: this.state.fatherNum + 1,
      fromSon: fromSon
    })
  }
  addChild() {
    this.refs.child1.addLeft(this.getNumber())
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
