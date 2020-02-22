import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { logout } from '../actions/userActions'

function Header({ logout }) {
  const [ hover, setHover ] = useState(false)

  const toggleHover = () => {
    setHover(!hover)
  }

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
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          style={{
            float: `right`,
            paddingRight: `1rem`,
            cursor: hover ? `pointer` : null
          }}>
            Logout
          </label>
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
