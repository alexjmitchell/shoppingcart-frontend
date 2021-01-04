import React from "react"
import SizeButton from "./size-button"
import "../styles/size-buttons.css"

const SizeButtons = props => {
  const sizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"]

  let buttons = sizes.map((size, index) => (
    <SizeButton key={index} size={size} />
  ))

  return (
    <div>
      <h2>Sizes:</h2>
      <div className="button-container">{buttons}</div>
    </div>
  )
}

export default SizeButtons
