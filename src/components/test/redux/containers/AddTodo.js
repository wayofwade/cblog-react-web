/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/4/18.
 */
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions' // actions的主文件

const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value)) // 类似于vuex的dispatch
          input.value = ''
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">添加todo的方法</button>
      </form>
    </div>
  )
}

export default connect()(AddTodo)