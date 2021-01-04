import React from "react"
import '../styles/Cart-Cards.css'
import { removeCartItem, useDataHook } from '../Redux-Store/Vendors/T-shirts/Actions-Reducers'
import { useDispatch  } from 'react-redux'

const Card = props => {
  const dispatch = useDispatch()
  const handleClick = (id) => {
    dispatch(removeCartItem(id))
  }
  const { cartItems, total } = useDataHook()

  return (
    <div className="card-container">
      {props.cart.map((cartItem, i) => (
        <div key={"cart-card-" + i} className="cart-display">
          <img src={`/assets/${cartItem.sku}_2.jpg`} alt={cartItem.title} className="card-image"/>
          <div className="cart-card-details">
            <h6>{cartItem.title}</h6>
            <p className="card-price">
              {cartItem.currencyFormat}&nbsp;{cartItem.price.toFixed(2)}
            </p>
            <p>Quantity: 1</p>
            <button onClick={event => handleClick(cartItem.id)}>-</button>
          </div>
        </div>
      ))}
      {/* <div>
        {cartItems.map(product => <p>{total(product.price)}</p>)}
      </div> */}
    </div>
  )
}

export default Card
