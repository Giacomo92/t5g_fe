import { AUTH_SUCCESS } from '../constants/authConstants'

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
