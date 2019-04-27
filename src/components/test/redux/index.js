/*
* 测试的入口文件
* 1-这个文件引入了reducers
* 2-reducers引入了action、
* 3-action触发会引发reducers的方法调用
* 4-通过reducers调用store的值
* */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'
const store = createStore(rootReducer)
export default class ruduxIndex extends React.Component {
  render() { // 每次更新组件都是重新render。所以定义便刘昂需要在构造方法里面
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

}