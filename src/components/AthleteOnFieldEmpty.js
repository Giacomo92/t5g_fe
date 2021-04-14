import { useDispatch } from 'react-redux'
import './AthleteOnFieldEmpty.css'
import { showAthleteListScreen } from '../actions/athleteActions'

const AthleteOnFieldEmpty = () => {
  const dispatch = useDispatch()
  return (
    <div className='AthleteOnFieldEmpty'>
      <div className='Pentagon'>
        <div className='PentagonOut'></div>
        <div className='PentagonIn'>
          <div
            className='AddPlayerBtn'
            onClick={() => dispatch(showAthleteListScreen())}
          >
            +
          </div>
        </div>
      </div>
    </div>
  )
}

export default AthleteOnFieldEmpty
