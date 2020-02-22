import React, { useState, useEffect } from 'react'
import Layout from '../layout/Layout'
import { CircleLoader } from "react-spinners"
import { css } from "@emotion/core";

function Transactions() {
  const [ loading, setLoading ] = useState(true)

  const override = css`
  display: block;
  margin: 25% auto;
  `;

  useEffect(() => {
    setTimeout(() => setLoading(false), 10000)
    // fetch("http://localhost:8080/users", {
    //   method: "GET",
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     username: JSON.stringify({
    //       username: props.username
    //     })
    //   },
    //
    // })
    // .then(resp => resp.json())
    // .then(data => {
    //   // the props.userInfo will be here when the api is able to properly communicate
    //   // with the databse. For the time being, continue using the dummy data
    //   setLoading(false)
    // })
    // .catch(error => alert(error))
    // props.userInfo({firstName: "Asuna", lastName: "Yuuki"})
  }, [])

  return (
    <div>
      { loading ? <CircleLoader css={override} loading={loading} size={150}/> :
      <Layout>
        <h1>Transactions</h1>
      </Layout> }
    </div>
  )
}

export default Transactions
