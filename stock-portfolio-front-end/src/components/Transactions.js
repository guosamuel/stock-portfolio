import React from 'react'
import Layout from '../layout/Layout'

import { connect } from 'react-redux'

function Transactions({ allTransactions }) {

  const listOfTransactions = allTransactions.map( (transaction, index) => {
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
          BUY ({ticker}) - {shares} shares @ {parseFloat(bought_price).toFixed(2)}
        </td>
      </tr>
    )
  })

  return (
    <Layout>
      <h1>Transactions</h1>
      <br />
      <h3>Note: Transactions are displayed from least to most recent, top to bottom.</h3>
      <br />
      <table>
        <tbody>
          {listOfTransactions}
        </tbody>
      </table>
    </Layout>
  )
}


const mapStateToProps = state => {
  return {
    allTransactions: state.transactionsReducer.transactions
  }
}

export default connect(mapStateToProps)(Transactions)
