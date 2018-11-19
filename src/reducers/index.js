import { combineReducers } from "redux"

import * as alpha from './alpha'
import * as controller from './controller'

export default combineReducers({...alpha, ...controller})
