import React, { useState } from 'react'

import { EMAIL, PASSWORD, NAME } from '../constants/Constants'

function SignUp({ history }){
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  //***
  // This section is for keeping the state of UI messages when the user signs up
  const [ successfulSignUp, setSuccessfulSignUp ] = useState(false)
  const [ failedSignUp, setFailedSignUp ] = useState(false)
  //***

  const handleChange = e => {
    switch (e.target.name) {
      case EMAIL:
        setEmail(e.target.value)
        break
      case PASSWORD:
        setPassword(e.target.value)
        break
      case NAME:
        setName(e.target.value)
        break
      default:
        setEmail(email)
        setPassword(password)
        setName(name)
        break
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetch('https://stock-portfolio-back-end.herokuapp.com/api/v1/users', {
      method: 'POST',
      headers:{
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    .then(resp => resp.json())
    .then(data => {
      clearUIMessages()
      if (data.error) {
        setFailedSignUp(true)
      }
      else {
        setSuccessfulSignUp(true)
        setName("")
        setPassword("")
        setEmail("")
      }
    })
    .catch(error => alert(`The following error occurred: ${error}`))
  }

  const clearUIMessages = () => {
    setSuccessfulSignUp(false)
    setFailedSignUp(false)
  }

  const handleLoginRedirect = () => {
    history.push("/login")
  }

  return(
    <div className="ui one column centered grid" style={{ paddingTop: "10%"}}>
      { successfulSignUp ?
        <div className="row">
            <div className="ui success message">
              <div className="header">
                Thank you for signing up!
              </div>
              <p>You may now log in with the email you registered with.</p>
            </div>
        </div> : null}
      { failedSignUp ?
        <div className="row">
            <div className="ui error message">
              <div className="header">
                There was an error with your submission.
                <br/ >
                Below are the potential errors:
              </div>
              <ul className="ui list">
                <li>You must fill out all input fields in the sign up form.</li>
                <li>The email you have chosen is already taken.</li>
              </ul>
            </div>
        </div> : null}
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input type="text" name={NAME} placeholder="Name" onChange={handleChange} value={name}/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name={EMAIL} placeholder="Email" onChange={handleChange} value={email}/>
          </div>
          <div className="field">
            <label>Password</label>
            <input type={PASSWORD} name={PASSWORD} placeholder="Password" onChange={handleChange} value={password}/>
          </div>
          <button className="ui button" type="Login">Submit Sign Up Form</button>
        </form>
        <div className="row">
          <button className="ui button" onClick={handleLoginRedirect}>Back To Log In Page</button>
        </div>
    </div>
  )

}

export default SignUp
