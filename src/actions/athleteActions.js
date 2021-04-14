import {
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
import athletes from '../athletes'

const updatedAthletes = athletes.map((ath) => {
  let userCost = Math.floor(ath.next_event.cost)
  if (userCost >= 10) {
    userCost = 10
  } else if (userCost <= 1) {
    userCost = 1
  }
  return { ...ath, userCost, picked: false }
})

updatedAthletes.sort((a, b) => b.next_event.cost - a.next_event.cost)

export const listAthletes = () => (dispatch) => {
  try {
    dispatch({
      type: ATHLETE_LIST_SUCCESS,
      payload: updatedAthletes,
    })
  } catch (error) {
    dispatch({
      type: ATHLETE_LIST_FAIL,
      payload: error,
    })
  }
}

export const addToTeam = (athlete) => (dispatch) => {
  dispatch({ type: ADD_ATHLETE, payload: athlete })
}

export const removeFromTeam = (athlete) => (dispatch) => {
  dispatch({ type: REMOVE_ATHLETE, payload: athlete })
}

export const getTeam = (team) => (dispatch) => {
  dispatch({ type: GET_TEAM, payload: team })
}

export const emptyTeam = () => (dispatch) => {
  dispatch({ type: EMPTY_TEAM })
}

export const createRandomTeam = (team) => (dispatch) => {
  dispatch({ type: RANDOM_TEAM, payload: team })
}

export const createOpponentTeam = (team) => (dispatch) => {
  dispatch({ type: OPPONENT_TEAM, payload: team })
}

export const showLineupScreen = () => (dispatch) => {
  dispatch({ type: SHOW_LINEUP })
}
export const showAthleteListScreen = () => (dispatch) => {
  dispatch({ type: SHOW_ATHLETE_LIST })
}
export const showCalendarScreen = () => (dispatch) => {
  dispatch({ type: SHOW_CALENDAR })
}

export const getUserTeamCost = (userTeam) => (dispatch) => {
  const costArr = userTeam.map((ath) => {
    const updatedCost = Math.floor(ath.next_event.cost)
    if (updatedCost >= 10) return 10
    if (updatedCost === 0) return 1
    return updatedCost
  })

  let teamCost
  if (costArr.length > 0) {
    teamCost = costArr.reduce((a, b) => a + b)
    dispatch({ type: GET_TEAM_COST, payload: teamCost })
  } else {
    teamCost = 0
    dispatch({ type: GET_TEAM_COST, payload: teamCost })
  }
}
