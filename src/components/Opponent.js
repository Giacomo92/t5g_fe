// https://stackoverflow.com/questions/12019966/adding-up-all-combinations-of-number-in-an-array
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../UI/Button'
import './Opponent.css'
import OpponentAthlete from './OpponentAthlete'
import axios from '../axios'
import { emptyTeam } from '../actions/athleteActions'
import { removeModify } from '../actions/gamesActions'

const Opponent = ({ team, opponent, setModal }) => {
  const auth = useSelector((state) => state.auth)
  const { user } = auth
  const gameFromStorage = JSON.parse(localStorage.getItem('Game'))

  const { isModify } = useSelector((state) => state.gamesList)
  console.log(isModify)

  const dispatch = useDispatch()

  const saveLineupsHandler = (team, opponent) => {
    const game = {
      user,
      team,
      opponent,
      status: 'to_start',
    }
    if (isModify) {
      console.log('/games/-MYEtId0sBBJuZYIbaig.json')
      console.log(`/games/${gameFromStorage._id}.json`)
      axios.put(`/games/${gameFromStorage._id}.json`, game)
      dispatch(removeModify())
    } else {
      axios.post('/games.json', game)
      localStorage.clear()
    }
    setModal(true)
    dispatch(emptyTeam())
  }

  return (
    <div className='Opponent'>
      <h1 className='OpponentHeader'>IL MIO AVVERSARIO</h1>
      {opponent.length === 5 ? (
        <>
          <div className='OpponentTeam'>
            {opponent.map((oppAthlete) => (
              <OpponentAthlete key={oppAthlete._id} opponent={oppAthlete} />
            ))}
          </div>
          <Button
            className='BtnSaveLineups'
            clicked={() => saveLineupsHandler(team, opponent)}
          >
            Salva le formazioni
          </Button>
        </>
      ) : (
        <>
          <div className='OpponentTeam'></div>
          <Button className='BtnSaveLineupsDisabled'>
            Salva le formazioni
          </Button>
        </>
      )}
    </div>
  )
}

export default withRouter(Opponent)
