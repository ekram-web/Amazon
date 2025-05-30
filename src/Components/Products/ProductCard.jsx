import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import style from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../Utility/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const ProductCard = ({ product, flex, renderDesc, renderAdd }) => {
  // Destructuring product properties
  // This allows us to access properties like image, id, title, price, rating, and description directly
  const { image, id, title, price, rating, description } = product;

  const [state, dispatch] = useContext(DataContext);
  // Using useContext to access the global state and dispatch function from DataContext
  // state contains the current state of the application, and dispatch is used to send actions to the reducer



  // console.log(state);


  // Function to add the product to the cart
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        id,
        title,
        price,
        rating,
        description,
      },
    });
  };

  return (
    <div
      className={`${style.card_container} ${flex ? style.product_flexed : ""}`}
    >
      {/* Link to the product details page using the product id */}
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>

      <div>
        <h3>{title}</h3>
        
        {renderDesc && (
          <div style={{ width: "400px", textAlign: "justify" }}>
            {description}
          </div>
        )}


        <div className={style.rating}>

          
          <Rating value={rating?.rate || 0} precision={0.1} readOnly/>

          <small>{rating?.count}</small>

        </div>


        <div>
          <CurrencyFormat amount={price} />
        </div>

        {renderAdd && (
          <button className={style.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
