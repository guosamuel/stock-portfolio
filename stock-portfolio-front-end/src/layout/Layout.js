import React from 'react'
import Header from './Header'

function Layout({ children }) {
  return (
    <div style={{ margin: '0 auto', maxWidth: '960px' }}>
      <Header />
      <div>
        { children }
      </div>
    </div>
  )
}

export default Layout
