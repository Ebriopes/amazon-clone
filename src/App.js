import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './Views/Home';
import Login from './Views/Login';
import Checkout from './Views/Checkout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home/>
        </Route>
        <Route exact path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
