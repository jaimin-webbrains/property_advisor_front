import { combineReducers } from 'redux'
import role from './Role/reducer'
import user from './user/reducer'
import geolocation from './geolocation/reducer'

export default combineReducers({
  role,
  user,
  geolocation
})