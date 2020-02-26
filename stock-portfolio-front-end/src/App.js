import React, { useState, useEffect } from 'react';
import Login from './components/Login'
import Portfolio from './components/Portfolio'
import Transactions from './components/Transactions'
import SignUp from './components/SignUp'

import { connect } from 'react-redux'
import { login } from './actions/userActions'
import { Route, Switch, Redirect } from 'react-router-dom'

import { CircleLoader } from "react-spinners"
import { css } from "@emotion/core";

function App({ currentUser, login, history }) {
  const [ loading, setLoading ] = useState(true)

  const override = css`
  display: block;
  margin: 25% auto;
  `;

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      fetch("http://localhost:3001/api/v1/current_user", {
        headers: {
          Authorization: token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        const { user, error } = data
        if (error) {
          alert(error)
        }
        else {
          login(user)
          history.push("/portfolio")
        }
      })
      .catch(error => alert(`The following error occurred: ${error}`))
    }

    setLoading(false)
  }, [])

  return (
    <div>
      { loading ?
        <CircleLoader css={override} loading={loading} size={150}/> :
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
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
        </Switch>
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.usersReducer.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
