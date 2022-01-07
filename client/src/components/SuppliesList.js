import React, { useState, useEffect } from 'react'

import SupplyTile from "./SupplyTile"

const SuppliesList = (props) => {
  const supplyTiles = props.supplies.map(supply => {
    return (
      <SupplyTile
        item={supply.item}
        key={supply.id}
        id={supply.id}
      />
    )
  })

  return (
    <div>
      <h3>Supplies:</h3>
      <ul>{supplyTiles}</ul>
    </div>
  )
}

export default SuppliesList
