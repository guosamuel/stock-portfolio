import React, { useState } from 'react'

function Purchase() {
  const [ invalid, setInvalid ] = useState(false)
  const [ inputTicker, setInputTicker ] = useState("")
  const [ inputShares, setInputShares ] = useState(1)

  const handleSubmit = e => {
    e.preventDefault()
    console.log("derp")
  }

  const handleChange = e => {
    switch (e.target.name) {
      case "input-ticker":
        setInputTicker(e.target.value)
        break
      case "input-shares":
        setInputShares(e.target.value)
        break
      default:
        setInputTicker(inputTicker)
        setInputShares(inputShares)
        break
    }
  }

  return (
    <div className="ui one column centered grid" style={{paddingTop: "10%"}}>
      { invalid ?
      <div className="row">
          <div className="ui red message">
            Invalid ticker. Please try again.
          </div>
      </div> : null}
      <div>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Ticker</label>
            <input type="text" name="input-ticker" placeholder="Ticker" onChange={handleChange} value={inputTicker}/>
          </div>
          <div className="field">
            <label>Shares</label>
            <input type="number" name="input-shares" onChange={handleChange} value={inputShares}/>
          </div>
          <br />
          <button className="ui button" type="Submit">Buy Shares</button>
        </form>
      </div>
    </div>
  )
}

export default Purchase
