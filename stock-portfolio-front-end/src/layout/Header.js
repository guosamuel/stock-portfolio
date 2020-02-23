import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { logout } from '../actions/userActions'

function Header({ logout }) {
  const [ hover, setHover ] = useState(false)

  const toggleHover = () => {
    setHover(!hover)
  }

  const loggingOut = () => {
    logout()
    localStorage.removeItem("token")
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
          onClick={loggingOut}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          style={{
            float: `right`,
            paddingLeft: `0.5rem`,
            paddingRight: `0.5rem`,
            marginTop: `1rem`,
            cursor: hover ? `pointer` : null
          }}>
            Logout
          </label>
          <Link
            to="/transactions"
            style={{
              color: `black`,
              float: `right`,
              paddingLeft: `0.5rem`,
              paddingRight: `0.5rem`,
              marginTop: `1rem`,
              borderRight: `2px solid black`
            }}
          >
            Transactions
          </Link>
          <Link
          to="/portfolio"
          style={{
            color: `black`,
            float: `right`,
            paddingLeft: `0.5rem`,
            paddingRight: `0.5rem`,
            marginTop: `1rem`,
            borderRight: `2px solid black`
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
