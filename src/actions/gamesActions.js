import {
  GAMES_REQUEST,
  GAMES_SUCCESS,
  REMOVE_MODIFY,
  SET_MODIFY,
} from '../constants/gamesConstants'

export const getGames = (user) => (dispatch) => {
  dispatch({ type: GAMES_REQUEST })
  dispatch({ type: GAMES_SUCCESS, payload: user })
}

export const setModify = () => (dispatch) => {
  dispatch({ type: SET_MODIFY })
}

export const removeModify = () => (dispatch) => {
  dispatch({ type: REMOVE_MODIFY })
}
