import React, { Suspense } from 'react'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { CircularProgress } from '@material-ui/core'

import Home from './pages/Home/Home'

const App = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
