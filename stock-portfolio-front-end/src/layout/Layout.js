import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div style={{ margin: '0 auto', maxWidth: '960px' }}>
      <Header />
      <div>
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default Layout
