import { useState } from 'react'
import { useSelector } from 'react-redux'
import List from './List'
import TeamRecap from './TeamRecap'
import AthleteFilter from './AthleteFilter'

const AthleteList = ({
  addAthlete,
  removeAthlete,
  creatingOpponent,
  athletes,
}) => {
  const teamCost = useSelector((state) => state.teams)

  const [newAthletes, setNewAthletes] = useState(athletes)

  const [topToBottom, setTopToBottom] = useState(true)

  const filterByCostHandler = (
    setValue,
    newValue,
    setNameText,
    setTeamText,
    setSportText
  ) => {
    setTeamText('')
    setSportText('')
    setNameText('')
    setValue(newValue)
    const updatedAthletes = athletes.filter((ath) => ath.userCost <= newValue)
    setNewAthletes(updatedAthletes)
  }

  const filterByNameHandler = (
    setNameText,
    setTeamText,
    setSportText,
    setValue,
    e
  ) => {
    setTeamText('')
    setSportText('')
    setValue(10)
    setNameText(e.target.value)

    const updatedAthletes = athletes.filter((ath) => {
      const includes = ath.name.last_name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(e.target.value)
      return includes
    })
    setNewAthletes(updatedAthletes)
  }

  const filterByTeamHandler = (
    setNameText,
    setTeamText,
    setSportText,
    setValue,
    e
  ) => {
    setSportText('')
    setNameText('')
    setValue(10)
    setTeamText(e.target.value)

    const updatedAthletes = athletes.filter((ath) => {
      if (ath.sport_name !== 'tennis') {
        const includes = ath.next_event.team.full_name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(e.target.value)
        return includes
      } else {
        const includes = ath.country.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(e.target.value)
        return includes
      }
    })
    setNewAthletes(updatedAthletes)
  }

  const filterBySportHandler = (
    setNameText,
    setTeamText,
    setSportText,
    setValue,
    e
  ) => {
    setNameText('')
    setValue(10)
    setTeamText('')
    setSportText(e.target.value)

    const updatedAthletes = athletes.filter((ath) => {
      const includes = ath.sport_name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(e.target.value)
      return includes
    })

    setNewAthletes(updatedAthletes)
  }

  const sortByCostHandler = (setIsCost, setIsTime, setIsFPPG) => {
    setIsTime(false)
    setIsFPPG(false)
    setIsCost(true)
    setTopToBottom(!topToBottom)

    let updatedAthletes
    if (topToBottom) {
      if (newAthletes.length === 0) {
        updatedAthletes = athletes.sort((a, b) => b.userCost - a.userCost)
      } else {
        updatedAthletes = newAthletes.sort((a, b) => b.userCost - a.userCost)
      }
    } else {
      if (newAthletes.length === 0) {
        updatedAthletes = athletes.sort((a, b) => a.userCost - b.userCost)
      } else {
        updatedAthletes = newAthletes.sort((a, b) => a.userCost - b.userCost)
      }
    }

    setNewAthletes([...updatedAthletes])
  }

  const sortByTimeHandler = (setIsCost, setIsTime, setIsFPPG) => {
    setIsCost(false)
    setIsFPPG(false)
    setIsTime(true)
    setTopToBottom(!topToBottom)

    const newAthletes = athletes.map((ath) => {
      return {
        ...ath,
        startingYear: parseInt(
          ath.next_event.start_at.split(' ')[0].split('-')[0]
        ),
        startingMonth: parseInt(
          ath.next_event.start_at.split(' ')[0].split('-')[1]
        ),
        startingDay: parseInt(
          ath.next_event.start_at.split(' ')[0].split('-')[2]
        ),
        startingHour: parseInt(
          ath.next_event.start_at.split(' ')[1].split(':')[0]
        ),
        startingMinute: parseInt(
          ath.next_event.start_at.split(' ')[1].split(':')[1]
        ),
        startingSecond: parseInt(
          ath.next_event.start_at.split(' ')[1].split(':')[2]
        ),
      }
    })

    newAthletes
      .sort((a, b) => a.startingSecond - b.startingSecond)
      .sort((a, b) => a.startingMinute - b.startingMinute)
      .sort((a, b) => a.startingHour - b.startingHour)
      .sort((a, b) => a.startingDay - b.startingDay)
      .sort((a, b) => a.startingMonth - b.startingMonth)
      .sort((a, b) => a.startingYear - b.startingYear)

    console.log(newAthletes)

    let updatedAthletes
    if (topToBottom) {
      updatedAthletes = newAthletes
        .sort((a, b) => a.startingSecond - b.startingSecond)
        .sort((a, b) => a.startingMinute - b.startingMinute)
        .sort((a, b) => a.startingHour - b.startingHour)
        .sort((a, b) => a.startingDay - b.startingDay)
        .sort((a, b) => a.startingMonth - b.startingMonth)
        .sort((a, b) => a.startingYear - b.startingYear)
      // if (newAthletes.length === 0) {
      //   updatedAthletes = newAthletes.sort(
      //     (a, b) => b.next_event.start_at - a.next_event.start_at
      //   )
      // } else {
      //   updatedAthletes = newAthletes.sort(
      //     (a, b) => b.next_event.start_at - a.next_event.start_at
      //   )
      // }
    } else {
      updatedAthletes = newAthletes
        .sort((a, b) => b.startingSecond - a.startingSecond)
        .sort((a, b) => b.startingMinute - a.startingMinute)
        .sort((a, b) => b.startingHour - a.startingHour)
        .sort((a, b) => b.startingDay - a.startingDay)
        .sort((a, b) => b.startingMonth - a.startingMonth)
        .sort((a, b) => b.startingYear - a.startingYear)
      // if (newAthletes.length === 0) {
      //   updatedAthletes = athletes.sort(
      //     (a, b) => a.next_event.start_at - b.next_event.start_at
      //   )
      // } else {
      //   updatedAthletes = newAthletes.sort(
      //     (a, b) => a.next_event.start_at - b.next_event.start_at
      //   )
      // }
    }

    setNewAthletes([...updatedAthletes])
  }

  const sortByFPPGHandler = (setIsCost, setIsTime, setIsFPPG) => {
    setIsCost(false)
    setIsTime(false)
    setIsFPPG(true)
    setTopToBottom(!topToBottom)

    let updatedAthletes
    if (topToBottom) {
      if (newAthletes.length === 0) {
        updatedAthletes = athletes.sort((a, b) => b.fppg - a.fppg)
      } else {
        updatedAthletes = newAthletes.sort((a, b) => b.fppg - a.fppg)
      }
    } else {
      if (newAthletes.length === 0) {
        updatedAthletes = athletes.sort((a, b) => a.fppg - b.fppg)
      } else {
        updatedAthletes = newAthletes.sort((a, b) => a.fppg - b.fppg)
      }
    }

    setNewAthletes([...updatedAthletes])
  }

  return (
    <>
      <AthleteFilter
        athletes={newAthletes}
        filterCost={filterByCostHandler}
        filterName={filterByNameHandler}
        filterTeam={filterByTeamHandler}
        filterSport={filterBySportHandler}
        sortCost={sortByCostHandler}
        sortTime={sortByTimeHandler}
        sortFPPG={sortByFPPGHandler}
      />
      <TeamRecap teamCost={teamCost} />
      <List
        addAthlete={addAthlete}
        removeAthlete={removeAthlete}
        teamCost={teamCost}
        creatingOpponent={creatingOpponent}
        athletes={newAthletes.length === 0 ? athletes : newAthletes}
      />
    </>
  )
}

export default AthleteList
