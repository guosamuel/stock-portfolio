import React, { useState } from 'react'

import { connect } from 'react-redux'
import { updateBalance } from '../actions/userActions'
import { addTransaction } from '../actions/transactionActions'

import { TOKEN, INPUT_TICKER, INPUT_SHARES } from '../constants/Constants'

function Purchase({ currentUser, updateBalance, addTransaction }) {
  //***
  // This section is for keeping the state of UI messages when the user purchases
  // stocks.
  const [ invalidTicker, setInvalidTicker ] = useState(false)
  const [ insufficientFunds, setInsufficientFunds] = useState(false)
  const [ successfulPurchase, setSuccessfulPurchase ] = useState(false)
  const [ serverError, setServerError ] = useState(false)
  //***
  const [ inputTicker, setInputTicker ] = useState("")
  const [ inputShares, setInputShares ] = useState(1)
  const [ areSharesFormatted, setAreSharesFormatted ] = useState(true)
  const [ balance, setBalance ] = useState(parseFloat(currentUser.balance))


  const handleTransaction = (cost, currentPrice) => {
    fetch(`http://localhost:3001/api/v1/transactions`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        email: currentUser.email,
        bought_price: currentPrice,
        ticker: inputTicker,
        shares: inputShares,
        cost
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      clearUIMessages()
      if (resp.error) {
        setServerError(true)
      } else {
        setSuccessfulPurchase(true)
        addTransaction({
          ticker: inputTicker.toUpperCase(),
          shares: inputShares,
          bought_price: currentPrice
        })
      }
    })
    .catch(error => alert(`The following error occurred: ${error}`))
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`https://cloud.iexapis.com/stable/stock/${inputTicker}/batch?types=chart&range=1d&token=${TOKEN}`)
      .then(resp => {
        resp.status === 404 ? setInvalidTicker(true) : setInvalidTicker(false)
        return resp.json()
      })
      .then(resp => {
        let currentPrice = resp.chart[resp.chart.length-1].average
        let cost = currentPrice * inputShares
        clearUIMessages()
        if (balance >= cost) {
          let updatedBalance = balance - cost
          setBalance(updatedBalance)
          updateBalance(updatedBalance)
          handleTransaction(cost, currentPrice)
        } else {
          setInsufficientFunds(true)
        }
      })
      .catch(error => alert(`The following error occurred: ${error}`))
  }

  const clearUIMessages = () => {
    setInvalidTicker(false)
    setInsufficientFunds(false)
    setSuccessfulPurchase(false)
    setServerError(false)
  }

  const handleChange = e => {
    switch (e.target.name) {
      case INPUT_TICKER:
        setInputTicker(e.target.value)
        break
      case INPUT_SHARES:
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
      { serverError ?
      <div className="row">
          <div className="ui yellow message">
            An error occurred on the server side. Please try again or purchase another stock.
          </div>
      </div> : null}
      <div>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Ticker</label>
            <input type="text" name={INPUT_TICKER} placeholder="Ticker" onChange={handleChange} value={inputTicker}/>
          </div>
          <div className="field">
            <label>Shares</label>
            <input type="number" min="1" step="1" name={INPUT_SHARES} onChange={handleChange} value={inputShares}/>
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

const mapDispatchToProps = dispatch => {
  return {
    updateBalance: updatedBalance => dispatch(updateBalance(updatedBalance)),
    addTransaction: transaction => dispatch(addTransaction(transaction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase)
