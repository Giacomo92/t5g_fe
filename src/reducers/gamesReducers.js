import {
  GAMES_REQUEST,
  GAMES_SUCCESS,
  SET_MODIFY,
  REMOVE_MODIFY,
} from '../constants/gamesConstants'

export const gamesListReducer = (state = { games: [] }, action) => {
  switch (action.type) {
    case GAMES_REQUEST:
      return { loading: true, games: [] }
    case GAMES_SUCCESS:
      return { loading: false, games: action.payload }
    case SET_MODIFY: {
      return { ...state, isModify: true }
    }
    case REMOVE_MODIFY: {
      return { ...state, isModify: false }
    }

    default:
      return state
  }
}
