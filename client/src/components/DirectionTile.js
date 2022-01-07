import React from "react"

const DirectionTile = props => {

  return (
    <li className={props.className} onClick={props.setDirection}>
    {props.step}
    </li>
  )
}

export default DirectionTile
