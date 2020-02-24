import React from 'react'
import Layout from '../layout/Layout'
import Purchase from './Purchase'

function Portfolio() {
  return (
    <Layout>
      <h1>Portfolio</h1>
      <div className= "ui grid">
        <div className="eight wide column" style={{paddingTop: "5%"}}>
          <p>Derp</p>
        </div>
        <div className="eight wide column" style={{paddingTop: "5%"}}>
          <Purchase />
        </div>
      </div>
    </Layout>
  )
}

export default Portfolio
