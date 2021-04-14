import { useDispatch, useSelector } from 'react-redux'
import './MenuGame.css'
import { ReactComponent as Lineup } from '../svg/shirt.svg'
import { ReactComponent as List } from '../svg/menu.svg'
import { ReactComponent as Calendar } from '../svg/calendar.svg'
import {
  showAthleteListScreen,
  showCalendarScreen,
  showLineupScreen,
} from '../actions/athleteActions'

const MenuGame = () => {
  const dispatch = useDispatch()
  const screen = useSelector((state) => state.screen)

  const showAthleteList = () => {
    dispatch(showAthleteListScreen())
  }

  const showLineup = () => {
    dispatch(showLineupScreen())
  }

  const showCalendar = () => {
    dispatch(showCalendarScreen())
  }

  let attachedClasses = ['MenuLink', 'Close']
  let attachedClassesAthleteList = []
  let attachedClassesLineup = []
  let attachedClassesCalendar = []

  if (screen.isAthleteList) {
    attachedClassesAthleteList = ['MenuLink', 'AthleteList']
  }
  if (screen.isLineup) {
    attachedClassesLineup = ['MenuLink', 'Lineup']
  }
  if (screen.isCalendar) {
    attachedClassesCalendar = ['MenuLink', 'Calendar']
  }

  return (
    <div className='MenuGame'>
      <div
        className={
          screen.isLineup
            ? attachedClassesLineup.join(' ')
            : attachedClasses.join(' ')
        }
        onClick={showLineup}
      >
        <Lineup className='MenuIcon' />
        <p>Formazione</p>
      </div>
      <div
        className={
          screen.isAthleteList
            ? attachedClassesAthleteList.join(' ')
            : attachedClasses.join(' ')
        }
        onClick={showAthleteList}
      >
        <List className='MenuIcon' />
        <p>Lista Atleti</p>
      </div>

      <div
        className={
          screen.isCalendar
            ? attachedClassesCalendar.join(' ')
            : attachedClasses.join(' ')
        }
        onClick={showCalendar}
      >
        <Calendar className='MenuIcon' />
        <p>Calendario</p>
      </div>
    </div>
  )
}

export default MenuGame
