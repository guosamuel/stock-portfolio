import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { logout } from '../actions/userActions'

function Header({ logout }) {

  return (
    <header
      style={{
        marginBottom: `1.45rem`,
      }}
    >
      <div>
        <h1>
          <label
          onClick={() => logout()}
          style={{
            float: `right`,
            paddingRight: `1rem`
          }}>
            Logout
          </label>
          <Link
            to="/portfolio"
            style={{
              color: `black`,
              float: `right`,
              paddingRight: `1rem`
            }}
          >
            Portfolio
          </Link>
          <Link
            to="/transactions"
            style={{
              color: `black`,
              float: `right`,
              paddingRight: `1rem`
            }}
          >
            Transactions
          </Link>
        </h1>
      </div>
    </header>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}
export default connect(null, mapDispatchToProps)(Header)
