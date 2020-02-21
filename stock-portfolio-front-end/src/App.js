import React from 'react';
import Login from './components/Login'
import Portfolio from './components/Portfolio'

import { connect } from 'react-redux'

function App({ currentUser }) {
  return (
    <div className="App">
      { currentUser ? <Portfolio /> : <Login />}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.usersReducer.currentUser
  }
}

export default connect(mapStateToProps)(App);
