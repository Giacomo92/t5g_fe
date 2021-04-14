import {
  ATHLETE_LIST_REQUEST,
  ATHLETE_LIST_SUCCESS,
  ATHLETE_LIST_FAIL,
  ADD_ATHLETE,
  REMOVE_ATHLETE,
  RANDOM_TEAM,
  OPPONENT_TEAM,
  GET_TEAM,
  SHOW_LINEUP,
  SHOW_ATHLETE_LIST,
  SHOW_CALENDAR,
  GET_TEAM_COST,
  EMPTY_TEAM,
} from '../constants/athleteConstants'

export const athleteListReducer = (state = { athletes: [] }, action) => {
  switch (action.type) {
    case ATHLETE_LIST_REQUEST:
      return { loading: true, athletes: [] }
    case ATHLETE_LIST_SUCCESS:
      return { loading: false, athletes: action.payload }
    case ATHLETE_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const teamsReducer = (
  state = { userTeam: [], opponentTeam: [], teamCost: 0 },
  action
) => {
  switch (action.type) {
    case ADD_ATHLETE:
      const athlete = action.payload
      return {
        ...state,
        userTeam: [...state.userTeam, athlete],
        teamCost: state.teamCost + athlete.userCost,
      }

    case REMOVE_ATHLETE:
      const updatedTeam = [...state.userTeam]
      const athleteRem = updatedTeam.find(
        (ath) => ath._id === action.payload._id
      )
      athleteRem.picked = false
      const newTeam = updatedTeam.filter((ath) => {
        return ath._id !== action.payload._id
      })
      return {
        ...state,
        userTeam: newTeam,
        opponentTeam: [],
        athleteRem,
        teamCost: state.teamCost + athleteRem.userCost,
      }

    case RANDOM_TEAM:
      return { ...state, userTeam: action.payload }

    case OPPONENT_TEAM:
      return { ...state, opponentTeam: action.payload }

    case GET_TEAM:
      return { ...state, userTeam: action.payload }

    case EMPTY_TEAM:
      return { ...state, userTeam: [], opponentTeam: [], teamCost: 0 }

    case GET_TEAM_COST:
      return { ...state, teamCost: action.payload }

    default:
      return state
  }
}

export const screenReducer = (
  state = { isLineup: true, isAthleteList: false, isCalendar: false },
  action
) => {
  switch (action.type) {
    case SHOW_LINEUP:
      return { isLineup: true, isAthleteList: false, isCalendar: false }
    case SHOW_ATHLETE_LIST:
      return { isLineup: false, isAthleteList: true, isCalendar: false }
    case SHOW_CALENDAR:
      return { isLineup: false, isAthleteList: false, isCalendar: true }
    default:
      return state
  }
}
