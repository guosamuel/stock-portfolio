import React, { useState } from 'react'

import { connect } from 'react-redux'

function Purchase({ currentUser }) {
  const [ invalid, setInvalid ] = useState(false)
  const [ inputTicker, setInputTicker ] = useState("")
  const [ inputShares, setInputShares ] = useState(1)
  const [ areSharesFormatted, setAreSharesFormatted ] = useState(true)

  const TOKEN = `Tpk_b0d2d52327d14c40b708b93e14b27f40`

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`https://sandbox.iexapis.com/stable/stock/${inputTicker}/batch?types=chart&range=1d&token=${TOKEN}`)
      .then(resp => {
        resp.status === 404 ? setInvalid(true) : setInvalid(false)
      })
  }

  const handleChange = e => {
    switch (e.target.name) {
      case "input-ticker":
        setInputTicker(e.target.value)
        break
      case "input-shares":
        let shares = parseInt(e.target.value, 10)
        setInputShares(shares)
        !shares ? setAreSharesFormatted(false) : setAreSharesFormatted(true)
        break
      default:
        setInputTicker(inputTicker)
        setInputShares(inputShares)
        break
    }
  }

  return (
    <div className="ui one column centered grid" style={{paddingTop: "10%"}}>
      <div className="row">
        <h2>Cash - ${parseFloat(currentUser.balance).toFixed(2)}</h2>
      </div>
      { invalid ?
      <div className="row">
          <div className="ui red message">
            Invalid ticker. Please try again.
          </div>
      </div> : null}
      <div>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Ticker</label>
            <input type="text" name="input-ticker" placeholder="Ticker" onChange={handleChange} value={inputTicker}/>
          </div>
          <div className="field">
            <label>Shares</label>
            <input type="number" min="1" step="1" name="input-shares" onChange={handleChange} value={inputShares}/>
          </div>
          <br />
          <button className="ui button" type="Submit" disabled={areSharesFormatted ? false : true}>Buy Shares</button>
          <br />
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.usersReducer.currentUser
  }
}

export default connect(mapStateToProps)(Purchase)
