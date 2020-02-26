import React, { useState } from 'react'

import { connect } from 'react-redux'

function Performance({ allTransactions, getPortfolioTotal }) {
  const [ allOpeningPrices, setAllOpeningPrices ] = useState(null)
  const tickerTracker = {}
  const openingPrices = {}
  const uniqueTransactions = []
  const TOKEN = `Tpk_b0d2d52327d14c40b708b93e14b27f40`

  // For loop was to find all unique stocks
  for (let i = allTransactions.length-1; i >= 0; i--) {
    if (!tickerTracker[allTransactions[i].ticker.toUpperCase()]) {
      tickerTracker[allTransactions[i].ticker] = true
      uniqueTransactions.push(allTransactions[i])
    }
  }

  const uniqueTickers = uniqueTransactions.map( transaction => transaction.ticker )
  const symbols = uniqueTickers.join()

  // Unable to fetch information symbols does not exist
  if (symbols && !allOpeningPrices) {
    fetch(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=chart&range=1d&token=${TOKEN}`)
      .then(resp => resp.json())
      .then(resp => {
        for (let ticker in resp) {
          openingPrices[ticker] = resp[ticker].chart[0].open
        }
        setAllOpeningPrices(openingPrices)
      })
  }

  let total = uniqueTransactions.reduce( (acc, value) => {
    return acc + parseFloat(value.bought_price)
  }, 0)

  getPortfolioTotal(total)

  const listOfTransactions = uniqueTransactions.map( (transaction, index) => {
    const { ticker, bought_price, shares } = transaction
    const openingPrice = allOpeningPrices ? allOpeningPrices[ticker] : null
    const boughtPrice = parseFloat(bought_price)
    let color

    if (boughtPrice < openingPrice) {
      color = "red"
    } else if (boughtPrice === openingPrice) {
      color = "grey"
    } else if (boughtPrice > openingPrice) {
      color = "green"
    } else {
      color = "black"
    }

    return (
      <tr key={index}>
        <td
          style={{
            paddingBottom: '1rem',
            paddingTop: '1rem',
            borderBottom: '1px solid black',
            color: color
          }}
        >
          {ticker} - {shares} shares ${parseFloat(bought_price).toFixed(2)}
        </td>
      </tr>
    )
  })

  return (
    <div>
      <table>
        <tbody>
          {listOfTransactions}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    allTransactions: state.transactionsReducer.transactions
  }
}
export default connect(mapStateToProps)(Performance)
