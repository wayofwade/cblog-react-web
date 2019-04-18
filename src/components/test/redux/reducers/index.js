/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/4/18.
 */
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  todos,
  visibilityFilter
})