import React, { useState, useEffect } from 'react'

import DirectionTile from "./DirectionTile"

const DirectionsList = (props) => {

const [selectedDirectionId, setSelectedDirectionId] = useState(null)

  const directionTiles = props.directions.map(direction => {

    const setSelectedDirectionClosure = () => {
        console.log(direction.id)
        setSelectedDirectionId(direction.id)
    }

    let directionClassName = ""
    if (direction.id === selectedDirectionId) {
      directionClassName = "selected"
    }

    return (
      <DirectionTile
        className={directionClassName}
        step={direction.step}
        key={direction.id}
        id={direction.id}
        setDirection={setSelectedDirectionClosure}
      />
    )
  })

  return (
    <div>
      <h3>Directions:</h3>
      <ol>{directionTiles}</ol>
    </div>
  )
}

export default DirectionsList
