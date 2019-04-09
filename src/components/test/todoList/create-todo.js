import React from 'react';
import load from 'lodash';

export default class CreateTodo extends React.Component {
// export default class TodosList extends React.Component { 之前是这个class名字。不知为何
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            componentName: '组件的名字-hello'
        };
    }

    renderError() {
        if (!this.state.error) { return null; }

        return <div style={{ color: 'blue' }}>{this.state.error}</div>;
    }

    render() {
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <input type="text" placeholder="增加一个todolist?" ref="createInput" />
                <button>创建</button>
                {this.renderError()}
            </form>
        );
    }

    handleCreate(event) {
        console.log(event)
        event.preventDefault();
        console.log(event.preventDefault())


        console.log(this.refs) // 是一个对象。注册过ref的集合
        console.log(this.refs.createInput) // 是一个对象。注册过ref的集合
        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        this.setState({ error: null });
        console.log(this.state.componentName)
        this.props.createTask(task); // 父组件给子组件传送了createTask这个方法
        console.log('todos', JSON.parse(JSON.stringify(this.props.todos))) // 父组件传送了todos的属性
        this.refs.createInput.value = '';
    }

    validateInput(task) {
        if (!task) {
            return '请输入任务.';
        } else if (load.find(this.props.todos, todo => todo.task === task)) {
            return '任务已经存在.';
        } else {
            return null;
        }
    }
}
