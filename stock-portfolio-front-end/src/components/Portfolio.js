import React, { useEffect } from 'react'
import Layout from '../layout/Layout'
import Purchase from './Purchase'
import Performance from './Performance'

import { connect } from 'react-redux'
import { getAllTransactions } from '../actions/transactionActions'

function Portfolio({ currentUser, getAllTransactions, allTransactions }) {

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

  return (
    <Layout>
      <h1>Portfolio</h1>
      <div className= "ui grid">
        <div className="eight wide column" style={{paddingTop: "5%"}}>
          <Performance />
        </div>
        <div className="eight wide column" style={{paddingTop: "5%"}}>
          <Purchase />
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
