import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from 'firebase'
import logo from 'images/logo.png'
import './Login.css'

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = e => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then(auth => {
        if (auth) {
          history.push('/')
        }
      })
      .catch(error => alert(error.message))
  }

  const register = e => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then(auth => {
        if (auth) {
          history.push('/')
        }
      })
      .catch(error => alert(error.message))
  }

  return (
    <div className="login">
      <Link to="/">
        <img className="login_logo" alt="login" src={logo} />
      </Link>
      <div className="login_container">
        <h1>Sign-In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="login_signInButton" onClick={signIn}>
            Sign-In
          </button>
        </form>
        <p>
          By Sign-In you agree to the AMAZON FAKE CLONE conditions of use &
          sale. Please see our Privacy Notice, our Cookies Notice and our
          interest Bassed Ads Notice
        </p>
        <button className="login_registerButton" onClick={register}>
          Create your Amanaz account
        </button>
      </div>
    </div>
  )
}

export default Login
