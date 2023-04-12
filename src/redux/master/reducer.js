import { combineReducers } from 'redux'
import role from './Role/reducer'
import user from './user/reducer'

export default combineReducers({
  role,
  user
})