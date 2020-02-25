import React, { useState } from 'react'

import { connect } from 'react-redux'

function Purchase({ currentUser }) {
  const [ invalidTicker, setInvalidTicker ] = useState(false)
  const [ insufficientFunds, setInsufficientFunds] = useState(false)
  const [ successfulPurchase, setSuccessfulPurchase ] = useState(false)
  const [ inputTicker, setInputTicker ] = useState("")
  const [ inputShares, setInputShares ] = useState(1)
  const [ areSharesFormatted, setAreSharesFormatted ] = useState(true)
  const [ balance, setBalance ] = useState(parseFloat(currentUser.balance))

  const TOKEN = `Tpk_b0d2d52327d14c40b708b93e14b27f40`

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`https://sandbox.iexapis.com/stable/stock/${inputTicker}/batch?types=chart&range=1d&token=${TOKEN}`)
      .then(resp => {
        resp.status === 404 ? setInvalidTicker(true) : setInvalidTicker(false)
        return resp.json()
      })
      .then(resp => {
        let currentPrice = resp.chart[resp.chart.length-1].average
        let cost = currentPrice * inputShares
        console.log("balance", typeof balance)
        console.log("cost", typeof cost)
        if (balance >= cost) {
          setInvalidTicker(false)
          setInsufficientFunds(false)
          setSuccessfulPurchase(true)
          setBalance(balance - cost)
        } else {
          setInsufficientFunds(true)
          setSuccessfulPurchase(false)
        }
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
        <h2>Cash - ${balance.toFixed(2)}</h2>
      </div>
      { invalidTicker ?
      <div className="row">
          <div className="ui red message">
            Invalid ticker. Please try again.
          </div>
      </div> : null}
      { insufficientFunds ?
      <div className="row">
          <div className="ui red message">
            Insufficient funds. Please lower the amount of shares for this ticker.
          </div>
      </div> : null}
      { successfulPurchase ?
      <div className="row">
          <div className="ui green message">
            Purchase Successful
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
