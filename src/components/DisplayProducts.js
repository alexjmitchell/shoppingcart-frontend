import React from "react"
import { addCartItem } from "../Redux-Store/Vendors/T-shirts/Actions-Reducers"
import { useDispatch } from "react-redux"

export default function DisplayProducts(props) {
  const dispatch = useDispatch()



  console.log("cart Items ------->", props.cartItems)
  const handleClick = (product) => {
    dispatch(addCartItem(product))
  }

  return (
    <div className="products-container">
      {props.goods.map((product, i) => (
        <div key={"product-" + i} className="products">
          <p className={product.isFreeShipping === true ? "free" : "not-free"}>
            Free Shipping
          </p>
          <img src={`/assets/${product.sku}_1.jpg`} alt={product.title} />
          <p>{product.title}</p>
          <p>
            {product.currencyFormat}&nbsp;{product.price.toFixed(2)}
          </p>
          <p
            className={
              product.installments === 0
                ? "no-installments"
                : "has-installments"
            }
          >{`${product.installments} payments of ${product.currencyFormat} ${(
            product.price / product.installments
          ).toFixed(2)}`}</p>
          <button onClick={event => handleClick(product)} className="add-to-cart-button">Add to Cart</button>
        </div>
      ))}
    </div>
  )
}
