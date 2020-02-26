import React, { useState } from 'react'

import { connect } from 'react-redux'

import { TOKEN } from '../constants/Constants'

function Performance({ allTransactions, getPortfolioTotal }) {
  const [ allOpeningPrices, setAllOpeningPrices ] = useState(null)
  const openingPrices = {}
  const uniqueTransactions = []
  console.log("IN THE PERFORMANCE COMPONENT", allTransactions)
  //***
  /***
  This section was used to find the unique tickers. The list of transactions
  are already sorted by purchase date, from earliest to latest.
  ***/

  const tickerTracker = {}

  for (let i = allTransactions.length-1; i >= 0; i--) {
    if (!tickerTracker[allTransactions[i].ticker.toUpperCase()]) {
      tickerTracker[allTransactions[i].ticker] = true
      uniqueTransactions.push(allTransactions[i])
    }
  }

  //***

  const uniqueTickers = uniqueTransactions.map( transaction => transaction.ticker )
  const symbols = uniqueTickers.join()

  /***
  Unable to fetch with the URL in a batch if symbols does not exists.
  Included allOpeningPrices in the boolean condition because without that
  condition, the code will cause an infinite loop in fetching from the URL.
  ***/
  if (symbols && !allOpeningPrices) {
    fetch(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=chart&range=1d&token=${TOKEN}`)
      .then(resp => resp.json())
      .then(resp => {
        for (let ticker in resp) {
          openingPrices[ticker] = resp[ticker].chart[0].open
        }
        setAllOpeningPrices(openingPrices)
      })
      .catch(error => alert(`The following error occured: ${error}`))
  }

  let total = uniqueTransactions.reduce( (acc, value) => {
    return acc + parseFloat(value.bought_price)
  }, 0)

  getPortfolioTotal(total)

  const listOfTransactions = uniqueTransactions.map( (transaction, index) => {
    const { ticker, bought_price, shares } = transaction
    /***
    Needed the ternary for openingPrice because the initial state is at null.
    This updates after the fetch is complete to the appropriate values.
    ***/
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
