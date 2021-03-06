import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'

import { TOKEN } from '../constants/Constants'

function Performance({ allTransactions, getPortfolioTotal }) {
  const [ allOpeningPrices, setAllOpeningPrices ] = useState(null)
  const openingPrices = {}
  const uniqueTransactions = []

  //****************************************************************************

  /***
  This section below was used to find the unique tickers. The list of transactions
  are already sorted by purchase date, from earliest to latest.
  ***/

  const tickerTracker = {}

  for (let i = allTransactions.length-1; i >= 0; i--) {
    if (!tickerTracker[allTransactions[i].ticker.toUpperCase()]) {
      tickerTracker[allTransactions[i].ticker.toUpperCase()] = true
      uniqueTransactions.push(allTransactions[i])
    }
  }

  //****************************************************************************

  const uniqueTickers = uniqueTransactions.map( transaction => transaction.ticker )
  const symbols = uniqueTickers.join()

  /***
  Unable to fetch with the URL in a batch if symbols does not exists.
  Included allOpeningPrices in the boolean condition because without that
  condition, the code will cause an infinite loop in fetching from the URL.
  This effectively acts as a componentDidMount lifecycle method.
  ***/
  if (symbols && !allOpeningPrices) {
    fetch(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=chart&range=1d&token=${TOKEN}`)
      .then(resp => resp.json())
      .then(resp => {
        for (let ticker in resp) {
          openingPrices[ticker.toUpperCase()] = resp[ticker.toUpperCase()].chart[0].open
        }
        setAllOpeningPrices(openingPrices)
      })
      .catch(error => alert(`The following error occured: ${error}`))
  }

  /***
  This useEffect is effectively a componentDidUpdate lifecycle method. The purpose
  behind this is when the user continuously add stocks on the portfolio pages,
  the page optimistically renders to reflect their most recent unique stock while
  applying the appropriate color font to it.
  ***/
  useEffect( () => {
    if (allOpeningPrices) {
      let ticker = uniqueTransactions[0].ticker.toUpperCase()
      fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/batch?types=chart&range=1d&token=${TOKEN}`)
        .then(resp => resp.json())
        .then(resp => {
          let openingPrice = resp.chart[0].open
          let updatedOpeningPrices = {...allOpeningPrices}
          updatedOpeningPrices[ticker] = openingPrice
          setAllOpeningPrices(updatedOpeningPrices)
        })
        .catch(error => alert(`The following error occured: ${error}`))
    }

  }, [uniqueTransactions.length])

  let total = uniqueTransactions.reduce( (acc, stock) => {
    return acc + (parseFloat(stock.bought_price) * stock.shares)
  }, 0)

  getPortfolioTotal(total)

  const listOfTransactions = uniqueTransactions.map( (transaction, index) => {
    const { ticker, bought_price, shares } = transaction
    /***
    Needed the ternary for openingPrice because the initial state is at null.
    openingPrice updates after the initial fetch is completed to retrieve the
    appropriate values.
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
