import React, { useState, useEffect } from "react"
import { hot } from "react-hot-loader/root"

import "../assets/scss/main.scss"

import DirectionsList from "./DirectionsList"
import SuppliesList from "./SuppliesList"
import FetchButton from "./FetchButton"

const App = () => {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    try {
      const fetchData = await fetch("/api/v1/favorite-things")
      if (fetchData.ok) {
        const data = await fetchData.json()
        setData(data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  if (!data) {
    return (
      <>
        <FetchButton fetchData={fetchData} />
      </>
    )
  } else {
    return (
      <>
        <h1>How To {data.activity}</h1>

        <SuppliesList supplies={data.supplies} />

        <DirectionsList directions={data.directions} />

        <FetchButton fetchData={fetchData} />
      </>
    )
  }
}

export default hot(App)
