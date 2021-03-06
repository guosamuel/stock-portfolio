import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/userActions'
import { EMAIL, PASSWORD } from '../constants/Constants'

function Login({ login, history }) {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ invalid, setInvalid ] = useState(false)

  const handleChange = e => {
    switch (e.target.name) {
      case EMAIL:
        setEmail(e.target.value)
        break
      case PASSWORD:
        setPassword(e.target.value)
        break
      default:
        setEmail(email)
        setPassword(password)
        break
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetch('https://stock-portfolio-back-end.herokuapp.com/api/v1/auth', {
      method: 'POST',
      headers:{
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        setEmail("")
        setPassword("")
        setInvalid(true)
      }
      else {
        const { user, token } = data;
        localStorage.setItem('token', token);
        login(user)
        history.push("/portfolio")
      }
    })
    .catch(error => alert(`The following error occured: ${error}`))
  }

  const handleSignUpRedirect = () => {
    history.push("/signup")
  }

  return(
    <div>
      <div className="ui one column centered grid" style={{paddingTop: "10%"}}>
          { invalid ?
          <div className="row">
              <div className="ui red message">
                Invalid Username or Password
              </div>
          </div> : null}
          <div>
            <form className="ui form" onSubmit={handleSubmit}>
              <div className="field">
                <label>Email</label>
                <input type="text" name={EMAIL} placeholder="Email" onChange={handleChange} value={email}/>
              </div>
              <div className="field">
                <label>Password</label>
                <input type={PASSWORD} name={PASSWORD} placeholder="Password" onChange={handleChange} value={password}/>
              </div>
              <br />
              <button className="ui button" type="Login">Log In</button>
            </form>
            <br />
            <div className="row">
              <button className="ui button" onClick={handleSignUpRedirect}>Sign Up</button>
            </div>
          </div>
      </div>
    </div>
  )

}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user))
  }
}

export default connect(null, mapDispatchToProps)(Login)
