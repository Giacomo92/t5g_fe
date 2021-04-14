// import { useState } from 'react'
import './List.css'
import Athlete from './Athlete'
// import Button from '../UI/Button'

const List = ({ addAthlete, removeAthlete, creatingOpponent, athletes }) => {
  // console.log(athletes)
  // const resPerPage = 10
  // const [page, setPage] = useState(1)

  // const AthletesResultsPage = (page) => {
  //   const start = (page - 1) * resPerPage
  //   const end = page * resPerPage
  //   return athletes.slice(start, end)
  // }

  // const inPageAthletes = AthletesResultsPage(page)

  // const paginationView = () => {
  //   const numPages = Math.ceil(athletes.length / resPerPage)
  //   console.log(numPages)

  //   // Page 1 && other pages
  //   if (page === 1 && numPages > 1) {
  //     console.log('Page 1 && Others')
  //     return
  //   }

  //   // Last page
  //   if (page === numPages && numPages > 1) {
  //     console.log('Last Page')
  //     return
  //   }

  //   // Other page
  //   if (page < numPages) {
  //     console.log('Others')
  //     return
  //   }

  //   // Page 1 && NOT other pages
  //   console.log('Only Page 1')
  // }

  // paginationView()

  return (
    <>
      <div className='List'>
        <Athlete
          addAthlete={addAthlete}
          removeAthlete={removeAthlete}
          creatingOpponent={creatingOpponent}
          athletes={athletes}
        />
      </div>
      {/* <Button clicked={nextPageHandler}>Next Page</Button> */}
    </>
  )
}

export default List
