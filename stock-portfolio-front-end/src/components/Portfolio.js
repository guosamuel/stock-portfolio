import React, { useState, useEffect } from 'react'
import Layout from '../layout/Layout'
import Purchase from './Purchase'
import Performance from './Performance'

import { connect } from 'react-redux'
import { getAllTransactions } from '../actions/transactionActions'

function Portfolio({ currentUser, getAllTransactions }) {
  const [ portfolioTotal, setPortfolioTotal ] = useState(0)

  useEffect( () => {
    fetch(`https://stock-portfolio-back-end.herokuapp.com/api/v1/transactions`, {
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

  const getPortfolioTotal = total => {
    setPortfolioTotal(total.toFixed(2))
  }

  return (
    <Layout>
      <h1>Portfolio $({portfolioTotal})</h1>
      <div className= "ui grid">
        <div className="eight wide column" style={{paddingTop: "5%"}}>
          <Performance getPortfolioTotal={getPortfolioTotal}/>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllTransactions: transactions => dispatch(getAllTransactions(transactions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
