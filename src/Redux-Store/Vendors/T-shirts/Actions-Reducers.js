import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Axios from "axios"

// Action Names/Variables -----------------------------//

const DISPLAY_PRODUCTS = "products/DISPLAY_PRODUCTS"
const SIZES = "product/SIZES"
const ADD_TO_CART = "cart/ADD_TO_CART"
const DISPLAY_CART_PRODUCTS = "cart/DISPLAY_CART_PRODUCTS"
const TOGGLE_CART_SHOW = "cart/TOGGLE_CART_SHOW"
const OPEN_CART = "cart/OPEN_CART"
const CLOSE_CART = "cart/CLOSE_CART"
const GET_TOTAL = "cart/GET_TOTAL"

// Reducer ----------------------------------------//

const initialState = {
  products: [],
  selectedShirtSize: "M",
  cartProducts: [],
  cartShow: false,
  total: ""
}

export default function tshirtReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_PRODUCTS:
      return { ...state, products: action.payload }
    case SIZES:
      return { ...state, selectedShirtSize: state }
    case DISPLAY_CART_PRODUCTS:
      return { ...state, cartProducts: action.payload }
    case ADD_TO_CART:
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload]
      }
    case OPEN_CART:
      return { ...state, cartShow: true }
    case CLOSE_CART:
      return { ...state, cartShow: false }
    case TOGGLE_CART_SHOW:
      return { ...state, cartShow: !state.cartShow }
    case GET_TOTAL:
      return { ...state, total: action.payload }
    default:
      return state
  }
}

// Action Creators ------------------------//

const getTotalPrice = prices => {
  prices.reduce((a, b) => (a + b.price).toFixed(2), 0)
}

const openCart = () => {
  return {
    type: OPEN_CART
  }
}

const closeCart = () => {
  return {
    type: CLOSE_CART
  }
}

const getProductData = () => {
  return action => {
    Axios.get("/products").then(response => {
      action({
        type: DISPLAY_PRODUCTS,
        payload: response.data
      })
    })
  }
}

const getCartProductData = () => {
  return action => {
    Axios.get("/cartProducts").then(response => {
      action({
        type: DISPLAY_CART_PRODUCTS,
        payload: response.data
      })
    })
  }
}

export const addCartItem = payload => {
  return action => {
    Axios.post("/cartProducts", {
      title: payload.title,
      sku: payload.sku,
      price: payload.price,
      currencyFormat: payload.currencyFormat,
      description: payload.description,
      style: payload.style,
      productId: payload.id,
      count: 1
    }).then(response => {
      action({
        type: ADD_TO_CART,
        payload
      })
    })
  }
}

export const removeCartItem = id => {
  return dispatch => {
    Axios.delete("/cartProducts/" + id).then(response => {
      dispatch(getCartProductData())
    })
  }
}

const toggleCartShow = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_CART_SHOW
    })
  }
}
// Custom Hook -----------------------------------//

export const useDataHook = () => {
  const dispatch = useDispatch()
  const items = useSelector(appState => appState.tshirtReducer.products)
  const shirtSize = useSelector(
    appState => appState.tshirtReducer.selectedShirtSize
  )
  const cartShow = useSelector(appState => appState.tshirtReducer.cartShow)
  const cartItems = useSelector(appState => appState.tshirtReducer.cartProducts)
  const cart = useSelector(appState => appState.tshirtReducer.cartShow)
  const open = () => dispatch(openCart())
  const close = () => dispatch(closeCart())
  const toggle = () => dispatch(toggleCartShow())
  const total = prices => dispatch(getTotalPrice(prices))

  useEffect(() => {
    const fetch = () =>
      dispatch(getProductData(), dispatch(getCartProductData()))
    fetch()
  }, [dispatch])

  return {
    items,
    shirtSize,
    cartItems,
    cart,
    close,
    open,
    toggle,
    total,
    cartShow
  }
}
