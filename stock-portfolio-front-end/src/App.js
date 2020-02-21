import React from 'react';
import Login from './components/Login'
import Portfolio from './components/Portfolio'
import Transactions from './components/Transactions'
import SignUp from './components/SignUp'

import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

function App({ currentUser }) {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      { currentUser ?
        <Route path="/portfolio" component={Portfolio}/> :
        <Redirect
          to="/login"
        />}
      { currentUser ?
        <Route path="/transactions" component={Transactions}/> :
        <Redirect
          to="/login"
        />}
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.usersReducer.currentUser
  }
}

export default connect(mapStateToProps)(App);
