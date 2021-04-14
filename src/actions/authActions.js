import { AUTH_SUCCESS } from '../constants/authConstants'

export const authUser = (user) => (dispatch) => {
  dispatch({ type: AUTH_SUCCESS, payload: user })
}
