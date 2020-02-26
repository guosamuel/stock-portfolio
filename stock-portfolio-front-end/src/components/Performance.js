import React from 'react'

import { connect } from 'react-redux'

function Performance({ allTransactions, getPortfolioTotal }) {
  const tickerTracker = {}
  const uniqueTransactions = []

  for (let i = allTransactions.length-1; i >= 0; i--) {
    if (!tickerTracker[allTransactions[i].ticker.toUpperCase()]) {
      tickerTracker[allTransactions[i].ticker] = true
      uniqueTransactions.push(allTransactions[i])
    }
  }

  let total = uniqueTransactions.reduce( (acc, value) => {
    return acc + parseFloat(value.bought_price)
  }, 0)

  getPortfolioTotal(total)

  const listOfTransactions = uniqueTransactions.map( (transaction, index) => {
    const { ticker, bought_price, shares } = transaction

    return (
      <tr key={index}>
        <td
          style={{
            paddingBottom: '1rem',
            paddingTop: '1rem',
            borderBottom: '1px solid black'
          }}
        >
          {ticker} - {shares} shares
        </td>
        <td
          style={{
            paddingBottom: '1rem',
            paddingTop: '1rem',
            float: 'right',
            borderBottom: '1px solid black'
          }}>
            ${parseFloat(bought_price).toFixed(2)}
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
