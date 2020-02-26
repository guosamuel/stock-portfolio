import React from 'react'

import { connect } from 'react-redux'

function Performance({ allTransactions }) {
  console.log("I AM IN THE PERFORMANCE", allTransactions)
  return (
    <h1>Ta-da</h1>
  )
}

const mapStateToProps = state => {
  return {
    allTransactions: state.transactionsReducer.transactions
  }
}
export default connect(mapStateToProps)(Performance)
