import React from "react";
import Icon from "../lib/Icon";
import "../styles/header.css";
import Cart from "../components/Cart";
import { useDataHook } from "../Redux-Store/Vendors/T-shirts/Actions-Reducers";

const Header = () => {
  const { toggle, cartShow } = useDataHook();
  return (
    <>
      <div className="header-nav">
        <button onClick={toggle} id="shopping-cart">
          <Icon icon="shopping-cart"  />
        </button>
        {console.log(cartShow)}
        <div>
          <Cart />
        </div>
      </div>
    </>
  );
};

export default Header;
