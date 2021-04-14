import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Play from './components/Play'
import Games from './components/Games'
import AthleteDetails from './components/AthleteDetails'
import SingleGameOpen from './components/SingleGameOpen'
import Modify from './components/Modify'

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route path='/' exact component={Play} />
          <Route path='/games' exact component={Games} />
          <Route path='/athlete/:id' component={AthleteDetails} />
          <Route path='/games/:id' exact component={SingleGameOpen} />
          <Route path='/games/:id/modify' component={Modify} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
