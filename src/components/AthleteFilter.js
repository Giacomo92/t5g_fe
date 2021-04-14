import { useState, useRef } from 'react'
import './AthleteFilter.css'
import { ReactComponent as Filter } from '../svg/filter.svg'
import { ReactComponent as Cost } from '../svg/money.svg'
import { ReactComponent as Time } from '../svg/clock.svg'
import { ReactComponent as FPPG } from '../svg/graph.svg'
import ReactSlider from 'react-slider'

const AthleteFilter = ({
  filterCost,
  filterName,
  filterTeam,
  filterSport,
  sortCost,
  sortTime,
  sortFPPG,
}) => {
  const [open, setOpen] = useState(false)
  const filterEl = useRef(null)
  const [value, setValue] = useState(10)
  const [nameText, setNameText] = useState('')
  const [teamText, setTeamText] = useState('')
  const [sportText, setSportText] = useState('')
  const [isCost, setIsCost] = useState(true)
  const [isTime, setIsTime] = useState(false)
  const [isFPPG, setIsFPPG] = useState(false)

  const toggleFilter = () => {
    setOpen(!open)

    if (filterEl.current.style.maxHeight) {
      filterEl.current.style.maxHeight = null
    } else {
      filterEl.current.style.maxHeight = filterEl.current.scrollHeight + 'px'
    }
  }

  let attachedClasses = ['Sorting', 'NotSelected']
  let attachedClassesCost = []
  let attachedClassesTime = []
  let attachedClassesFPPG = []

  if (isCost) {
    attachedClassesCost = ['Sorting', 'Cost']
  }
  if (isTime) {
    attachedClassesTime = ['Sorting', 'Time']
  }
  if (isFPPG) {
    attachedClassesFPPG = ['Sorting', 'FPPG']
  }

  return (
    <div className='AthleteFilter' ref={filterEl}>
      <div className='Collapsible' onClick={toggleFilter}>
        <Filter className='FilterIcon' />
        <p>Cerca atleti</p>
      </div>
      <div className='Filter'>
        <div className='FilterFirstRow'>
          <input
            type='text'
            placeholder='Cerca per nome'
            value={nameText}
            onChange={(e) =>
              filterName(setNameText, setTeamText, setSportText, setValue, e)
            }
          />
        </div>
        <div className='FilterSecondRow'>
          <input
            type='text'
            placeholder='Cerca per squadra'
            value={teamText}
            onChange={(e) =>
              filterTeam(setNameText, setTeamText, setSportText, setValue, e)
            }
          />
          <input
            type='text'
            placeholder='Cerca per sport'
            value={sportText}
            onChange={(e) =>
              filterSport(setNameText, setTeamText, setSportText, setValue, e)
            }
          />
        </div>
        <div className='FilterThirdRow'>
          <p>Filtro prezzo: {value === 10 ? 'Tutti' : value + ' cr'}</p>
          <ReactSlider
            className='horizontal-slider'
            thumbClassName='thumb'
            trackClassName='track'
            minDistance={0}
            marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            min={1}
            max={10}
            value={value}
            onChange={(newValue) =>
              filterCost(
                setValue,
                newValue,
                setNameText,
                setTeamText,
                setSportText
              )
            }
          />
        </div>
        <div className='FilterFourthRow'>
          <p className='SortingBy'>Ordina per:</p>
          <div className='SortingContainer'>
            <div
              className={
                isCost
                  ? attachedClassesCost.join(' ')
                  : attachedClasses.join(' ')
              }
              onClick={() => sortCost(setIsCost, setIsTime, setIsFPPG)}
            >
              <Cost
                style={{
                  height: '25px',
                  width: '25px',
                  fill: isCost ? '#fff' : '#2ed099',
                }}
              />
              <p>Costo</p>
            </div>
            <div
              className={
                isTime
                  ? attachedClassesTime.join(' ')
                  : attachedClasses.join(' ')
              }
              onClick={() => sortTime(setIsCost, setIsTime, setIsFPPG)}
            >
              <Time
                style={{
                  height: '23px',
                  width: '23px',
                  fill: isTime ? '#fff' : '#2ed099',
                }}
              />
              <p>Ora Inizio</p>
            </div>
            <div
              className={
                isFPPG
                  ? attachedClassesFPPG.join(' ')
                  : attachedClasses.join(' ')
              }
              onClick={() => sortFPPG(setIsCost, setIsTime, setIsFPPG)}
            >
              <FPPG
                style={{
                  height: '23px',
                  width: '23px',
                  fill: isFPPG ? '#fff' : '#2ed099',
                }}
              />
              <p>FPPG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AthleteFilter
