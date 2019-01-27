import { combineReducers } from "redux"
import pickBy from "lodash/pickBy"
import mapValues from "lodash/mapValues"

import * as controller from './controller'
import gates from '../gates'

const gateReducers = pickBy(mapValues(gates, gate => gate.reducer))
export default combineReducers({
    ...controller,
    gates: combineReducers(gateReducers)
})
