import React from "react"

const FetchButton = (props) => {
  const clickHandler = async () => {
    await props.fetchData()
  }
  return <button onClick={clickHandler}>Get Favorite Thing</button>
}

export default FetchButton
