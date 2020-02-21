import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/userActions'
// import SignUpForm from '../components/SignUpForm'

function Login({ login, history }) {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ invalid, setInvalid ] = useState(false)

  const handleChange = e => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value)
        break
      case "password":
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
    fetch('http://localhost:3001/api/v1/auth', {
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
  }

  const handleSignUpRedirect = () => {
    history.push("/signup")
  }

  return(
    <div>
      <div className="ui one column centered grid">
          { invalid ?
          <div className="row">
              <div className="ui red message">
                Invalid Username or Password
              </div>
          </div> : null}
          <form className="ui form" onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <input type="text" name="email" placeholder="Email" onChange={handleChange} value={email}/>
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" name="password" placeholder="Password" onChange={handleChange} value={password}/>
            </div>
            <br />
            <button className="ui button" type="Login">Log In</button>
          </form>
          <div className="row">
            <button className="ui button" onClick={handleSignUpRedirect}>Sign Up</button>
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
