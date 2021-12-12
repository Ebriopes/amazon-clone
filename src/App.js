import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useStateValue } from './contexts/StateProvidder'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Header from './components/Header'
import Home from './Views/Home'
import Login from './Views/Login'
import Checkout from './Views/Checkout'
import './App.css'

function App() {
  const [, dispatch] = useStateValue()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user)

        dispatch({
          type: 'SET_USER',
          user
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [dispatch])
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route exact path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
