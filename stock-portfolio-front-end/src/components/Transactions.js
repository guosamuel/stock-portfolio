import React from 'react'
import Layout from '../layout/Layout'

import { connect } from 'react-redux'

function Transactions({ currentUser }) {

  const listOfTransactions = currentUser.transactions.map( (transaction, index) => {
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
    currentUser: state.usersReducer.currentUser
  }
}
export default connect(mapStateToProps)(Transactions)
