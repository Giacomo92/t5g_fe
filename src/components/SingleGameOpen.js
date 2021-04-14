import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './SingleGameOpen.css'
import Header from '../UI/Header'
import AthleteSingleGameLeft from './AthleteSingleGameLeft'
import AthleteSingleGameRight from './AthleteSingleGameRight'
import Modal from '../UI/Modal'
import Button from '../UI/Button'
import { setModify } from '../actions/gamesActions'

const SingleGameOpen = ({ match, history }) => {
  const dispatch = useDispatch()
  const game = JSON.parse(localStorage.getItem('Game'))
  const [modal, setModal] = useState(false)

  console.log(match)

  // const gamesList = useSelector((state) => state.gamesList)
  // const { games } = gamesList

  // const game = games.find((ath) => ath._id === match.params.id)

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

  let sportsIcon
  let sportIcon

  sportsIcon = game.sportsArr.map((sport) => {
    const randomNumber = Math.random() * 1000
    sportIcon = (
      <img
        key={sport + randomNumber}
        className='SingleGameOpenIconSport'
        src={process.env.PUBLIC_URL + `/images/icons/sport_white/${sport}.png`}
        alt={sport}
      />
    )
    return sportIcon
  })

  const goingBackToGames = () => {
    localStorage.clear()
    history.push('/games')
  }

  const modifyLineup = () => {
    dispatch(setModify())
    history.push(`${match.url}/modify`)
  }

  let modalContent = (
    <>
      <div className='ModalModifyLineupFirstRow'>
        <p className='ModalModifyLineupP1'>ATTENZIONE</p>
        <p className='ModalModifyLineupP2'> Hai già accettato la sfida.</p>
        <p className='ModalModifyLineupP3'>
          Se modifiche la formazione, dovrai salvarla prima dell'inizio della
          sfida. In caso contrario varrà l'ultima formazione salvata.
        </p>
        <p className='ModalModifyLineupP4'>
          Ricorda che modificando la tua formazione, cambierà anche la
          formazione avversaria.
        </p>
      </div>
      <div className='ModalModifyLineupSecondRow'>
        <Button className='BtnGoToGames' clicked={modifyLineup}>
          Modifica formazione
        </Button>
      </div>
    </>
  )

  return (
    <>
      {modal ? (
        <Modal
          page='Game'
          title='Avviso'
          subtitle='Modifica Formazioni'
          clicked={() => setModal(false)}
        >
          {modalContent}
        </Modal>
      ) : (
        <div className='SingleGameOpen'>
          <Header
            page='Game'
            title='Partita'
            clicked={goingBackToGames}
            subtitle={subtitle}
            className='HeaderSingleGameOpen'
          />
          <div className='SingleGameOpenFirstRow'>
            <p className='SingleGameOpenUsername'>{game.user}</p>
            <div
              className='SingleGameOpenModifyOrResult'
              onClick={() => setModal(true)}
            >
              Modifica
            </div>
            <p className='SingleGameOpenOpponent'>PC</p>
          </div>
          <div className='SingleGameOpenSecondRow'>{sportsIcon}</div>
          <div className='SingleGameOpenContainerAthletes'>
            <div className='SingleGameOpenContainerAthletesFirstRow'>
              <AthleteSingleGameLeft athlete={game.team[0]} />
              <AthleteSingleGameRight athlete={game.opponent[0]} />
            </div>
            <div className='SingleGameOpenContainerAthletesSecondRow'>
              <AthleteSingleGameLeft athlete={game.team[1]} />
              <AthleteSingleGameRight athlete={game.opponent[1]} />
            </div>
            <div className='SingleGameOpenContainerAthletesThirdRow'>
              <AthleteSingleGameLeft athlete={game.team[2]} />
              <AthleteSingleGameRight athlete={game.opponent[2]} />
            </div>
            <div className='SingleGameOpenContainerAthletesFourthRow'>
              <AthleteSingleGameLeft athlete={game.team[3]} />
              <AthleteSingleGameRight athlete={game.opponent[3]} />
            </div>
            <div className='SingleGameOpenContainerAthletesFifthRow'>
              <AthleteSingleGameLeft athlete={game.team[4]} />
              <AthleteSingleGameRight athlete={game.opponent[4]} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SingleGameOpen
