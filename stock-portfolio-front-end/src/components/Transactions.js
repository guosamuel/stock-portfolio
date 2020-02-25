import React, { useEffect } from 'react'
import Layout from '../layout/Layout'

import { connect } from 'react-redux'
import { getAllTransactions } from '../actions/transactionActions'

function Transactions({ currentUser, getAllTransactions, allTransactions }) {

  useEffect( () => {
    fetch(`http://localhost:3001/api/v1/transactions`, {
      headers: {
        email: currentUser.email
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        getAllTransactions(resp.transactions)
      })
      .catch(error => alert(`The following error occured: ${error}`))
  }, [])

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
    currentUser: state.usersReducer.currentUser,
    allTransactions: state.transactionsReducer.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTransactions: transactions => dispatch(getAllTransactions(transactions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
