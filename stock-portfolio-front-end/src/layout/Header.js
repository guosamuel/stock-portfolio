import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header
      style={{
        marginBottom: `1.45rem`,
      }}
    >
      <div>
        <h1>
          <Link
            to="/portfolio"
            style={{
              float: `right`,
              paddingRight: `1rem`
            }}
          >
            Portfolio
          </Link>
          <Link
            to="/transactions"
            style={{
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

export default Header
