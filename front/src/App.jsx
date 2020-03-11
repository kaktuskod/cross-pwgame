import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import {
  LoginPage,
  MagicNumberPage,
  Page404,
} from 'src/pages'
import { SocketProvider } from '@core/context'

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/MagicNumber' component={MagicNumberPage} />
          <Route component={Page404} />
        </Switch>
      </Router>
    </SocketProvider>
  )
}

export default App