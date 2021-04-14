import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import MenuGame from './MenuGame'
import AthleteList from './AthleteList'
import Lineup from './Lineup'
import Calendar from './Calendar'
import Header from '../UI/Header'
import Button from '../UI/Button'
import { ReactComponent as Checked } from '../svg/correct-mark.svg'
import {
  listAthletes,
  addToTeam,
  removeFromTeam,
  createRandomTeam,
  createOpponentTeam,
  getTeam,
  getUserTeamCost,
} from '../actions/athleteActions'
import './Modify.css'

import { authUser } from '../actions/authActions'
import Modal from '../UI/Modal'

const Modify = ({ history }) => {
  const game = JSON.parse(localStorage.getItem('Game'))
  const user = 'MindTheGap'
  const dispatch = useDispatch()

  const [modal, setModal] = useState(false)

  const athleteList = useSelector((state) => state.athleteList)
  const { athletes } = athleteList

  const teams = useSelector((state) => state.teams)
  const { userTeam } = teams

  const updatedAthletes = athletes.map((athlete) => {
    athlete.picked = false
    let athleteInTeam = userTeam.find((ath) => ath._id === athlete._id)
    if (athleteInTeam) {
      athlete.picked = true
    }
    return athlete
  })

  const screen = useSelector((state) => state.screen)

  const [team, setTeam] = useState([])
  const [opponentTeam, setOpponentTeam] = useState([])

  console.log(team)
  console.log(opponentTeam)

  useEffect(() => {
    dispatch(listAthletes())
    dispatch(authUser(user))
    setTeam(game.team)
    if (team.length === 5) {
      setOpponentTeam(game.opponent)
      dispatch(createOpponentTeam(game.opponent))
    } else {
      setOpponentTeam([])
      dispatch(createOpponentTeam([]))
    }
    dispatch(createRandomTeam(game.team))

    if (localStorage.getItem('userTeam')) {
      const team = JSON.parse(localStorage.getItem('userTeam'))
      setTeam(team)
      dispatch(getTeam(team))
    }
  }, [dispatch])

  const addAthleteOnTeamHandler = (athlete) => {
    const updatedTeam = [...team]
    updatedTeam.push(athlete)
    setTeam(updatedTeam)
    dispatch(addToTeam(athlete))
    // localStorage.setItem('userTeam', JSON.stringify(updatedTeam))
  }

  const removeAthleteFromTeamHandler = (athlete) => {
    const updatedTeam = [...team]
    const newTeam = updatedTeam.filter((ath) => {
      return ath._id !== athlete._id
    })
    setTeam(newTeam)
    dispatch(removeFromTeam(athlete))
    // localStorage.setItem('userTeam', JSON.stringify(newTeam))
    if (updatedTeam.length === 5) {
      setOpponentTeam([])
      dispatch(createOpponentTeam([]))
    }
  }

  const creatingOpponent = (team) => {
    const teamEventArr = team.map((ath) => ath.next_event.name)

    // 1) Getting athletes with a common event with those of the athletes selected by the user
    const commonEventAth = updatedAthletes.filter((ath) =>
      teamEventArr.includes(ath.next_event.name)
    )

    // 2) Removing athletes already selected by the user
    const possibleOpponent = commonEventAth.filter((ath) => ath.picked !== true)

    const updatedPossibleOpponent = possibleOpponent.map((ath) => {
      let deltaCost
      if (ath.next_event.cost >= 10) {
        deltaCost = ath.next_event.cost - 10
      } else if (ath.next_event.cost < 1) {
        deltaCost = 0
      } else {
        deltaCost = ath.next_event.cost % 1
      }

      return { ...ath, deltaCost }
    })

    // Ordering possible opponents by price
    const opponentTeamSortByDeltaCost = updatedPossibleOpponent.sort(
      (a, b) => b.deltaCost - a.deltaCost
    )

    let budget = 25
    let updatedOpponentTeamSort

    for (let i = 0; i < opponentTeamSortByDeltaCost.length; i++) {
      if (opponentTeam.length === 5) return
      if (opponentTeam.length === 0) {
        opponentTeam.push(opponentTeamSortByDeltaCost[i])
        budget = budget - opponentTeamSortByDeltaCost[i].userCost
      } else if (opponentTeam.length === 1) {
        if (opponentTeam[0].userCost === 10) {
          updatedOpponentTeamSort = opponentTeamSortByDeltaCost
            .filter((ath) => ath.userCost !== 10)
            .filter((ath) => ath.next_event.cost >= 1)
          i = 0
          if (updatedOpponentTeamSort[i].userCost < budget - 3) {
            opponentTeam.push(updatedOpponentTeamSort[i])
            budget = budget - updatedOpponentTeamSort[i].userCost
          }
        } else {
          updatedOpponentTeamSort = opponentTeamSortByDeltaCost.filter(
            (ath) => ath.next_event.cost >= 1
          )
          i = 1
          console.log(i)
          console.log(updatedOpponentTeamSort)
          if (updatedOpponentTeamSort[i].userCost < budget - 3) {
            opponentTeam.push(updatedOpponentTeamSort[i])
            budget = budget - updatedOpponentTeamSort[i].userCost
          }
        }
      } else if (opponentTeam.length === 2) {
        if (updatedOpponentTeamSort[i].userCost < budget - 2) {
          opponentTeam.push(updatedOpponentTeamSort[i])
          budget = budget - updatedOpponentTeamSort[i].userCost
        }
      } else if (opponentTeam.length === 3) {
        if (updatedOpponentTeamSort[i].userCost < budget - 1) {
          opponentTeam.push(updatedOpponentTeamSort[i])
          budget = budget - updatedOpponentTeamSort[i].userCost
        }
      } else {
        if (updatedOpponentTeamSort[i].userCost < budget) {
          opponentTeam.push(updatedOpponentTeamSort[i])
          budget = budget - updatedOpponentTeamSort[i].userCost
        }
      }
    }
    setOpponentTeam(opponentTeam)
  }

  const createRandomUserTeamHandler = () => {
    updatedAthletes.map((ath) => (ath.picked = false))
    let randomUserTeam = []
    let athlete
    setOpponentTeam([])

    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * updatedAthletes.length)
      athlete = updatedAthletes[randomNumber]
      athlete.picked = true
      randomUserTeam.push(athlete)
    }

    const userCostSum = randomUserTeam
      .map((ath) => {
        return ath.userCost
      })
      .reduce((a, b) => a + b)

    if (userCostSum === 25) {
      setTeam(randomUserTeam)
      localStorage.setItem('userTeam', JSON.stringify(randomUserTeam))
      localStorage.setItem('teamCost', JSON.stringify(userCostSum))
      creatingOpponent(team)
      dispatch(createRandomTeam(randomUserTeam))
    } else {
      randomUserTeam.map((ath) => (ath.picked = false))
      createRandomUserTeamHandler()
    }
  }

  useEffect(() => {
    if (team.length === 5) {
      dispatch(createOpponentTeam(opponentTeam))
    }

    dispatch(getUserTeamCost(team))
  }, [dispatch, team, opponentTeam])

  if (team.length === 5) {
    creatingOpponent(team)
  }

  let modalContent = (
    <>
      <div className='ModalFirstRow'>
        <div className='ModalPentagon'>
          <Checked className='ModalCheckedIcon' />
          <div className='ModalPentagonExt'></div>
          <div className='ModalPentagonInt'></div>
        </div>
      </div>
      <div className='ModalSecondRow'>
        <p className='ModalSecondRowTitle'>Formazioni salvate con successo!</p>
        <p className='ModalSecondRowSubTitle'>
          Vai alla pagina PARTITA per seguire il live o modificare la
          formazione.
        </p>
      </div>
      <div className='ModalThirdRow'>
        <Button className='BtnGoToGames' clicked={() => history.push('/games')}>
          Vai alla pagina Partita
        </Button>
      </div>
    </>
  )

  console.log(game)

  const hourEvent =
    game.firstEvent.startingHour.toString().length === 1
      ? `0${game.firstEvent.startingHour}`
      : game.firstEvent.startingHour

  const minuteEvent =
    game.firstEvent.startingMinute.toString().length === 1
      ? `0${game.firstEvent.startingMinute}`
      : game.firstEvent.startingMinute

  const dayEvent =
    game.firstEvent.startingDay.toString().length === 1
      ? `0${game.firstEvent.startingDay}`
      : game.firstEvent.startingDay

  const monthEvent =
    game.firstEvent.startingMonth.toString().length === 1
      ? `0${game.firstEvent.startingMonth}`
      : game.firstEvent.startingMonth

  const yearEvent = game.firstEvent.startingYear.toString().slice(-2)

  const subtitle = `${hourEvent}.${minuteEvent} | vs PC | ${dayEvent}.${monthEvent}.${yearEvent}`

  return (
    <>
      {modal ? (
        <Modal page='Avviso' title='Avviso' subtitle='Salvataggio Formazioni'>
          {modalContent}
        </Modal>
      ) : (
        <div className='Modify'>
          <Container fluid='sm'>
            <Header
              page='Game'
              title='Modifica la formazione'
              subtitle={subtitle}
              className='HeaderHome'
              clicked={() => history.goBack()}
            />
            <MenuGame />
            {screen.isAthleteList && (
              <AthleteList
                team={team}
                addAthlete={addAthleteOnTeamHandler}
                removeAthlete={removeAthleteFromTeamHandler}
                creatingOpponent={creatingOpponent}
                athletes={updatedAthletes}
              />
            )}
            {screen.isLineup && (
              <Lineup
                team={team}
                opponent={opponentTeam}
                createRandomUserTeam={createRandomUserTeamHandler}
                setModal={setModal}
                bannerContent={
                  'Ricorda che cambiando la tua formazione, si modificherà anche la formazione avversaria.'
                }
              />
            )}
            {screen.isCalendar && <Calendar />}
          </Container>
        </div>
      )}
    </>
  )
}

export default Modify
