import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  athleteListReducer,
  teamsReducer,
  screenReducer,
} from './reducers/athleteReducers'

import { authReducer } from './reducers/authReducers'

import { gamesListReducer } from './reducers/gamesReducers'

const reducer = combineReducers({
  athleteList: athleteListReducer,
  teams: teamsReducer,
  screen: screenReducer,

  auth: authReducer,
  gamesList: gamesListReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
