/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/4/18.
 */
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('进入到reduce里的ADD_TODO', action)
        let res = [
            ...state,
            {
                id: action.id,
                text: action.text,
                completed: false
            }
        ]
        console.log('进入到reduce里的ADD_TODO.res的值', res)
        return res
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}

export default todos