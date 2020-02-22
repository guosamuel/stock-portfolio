import React, { useState } from 'react'

function SignUp({ history }){
  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ successfulSignUp, setSuccessfulSignUp ] = useState(false)
  const [ failedSignUp, setFailedSignUp ] = useState(false)

  const handleChange = e => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value)
        break
      case "password":
        setPassword(e.target.value)
        break
      case "name":
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
    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers:{
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        setFailedSignUp(true)
        setSuccessfulSignUp(false)
      }
      else {
        setFailedSignUp(false)
        setSuccessfulSignUp(true)
        setName("")
        setPassword("")
        setEmail("")
      }
    })
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
            <input type="text" name="name" placeholder="Name" onChange={handleChange} value={name}/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" onChange={handleChange} value={email}/>
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={password}/>
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
