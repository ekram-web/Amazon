import React, { useContext } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Utility/DataProvider/DataProvider';
import ProductCard from '../../Components/Products/ProductCard';
import CurrencyFormat from './../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import style from './cart.module.css'
import { Type } from '../../Utility/action.type';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Cart = () => {

  
  const [{basket,user},dispatch]=useContext(DataContext)
  const total = basket.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)
  // 

  const increment = (item)=>{
    // Check if the item already exists in the basket
    dispatch({
      type:Type.ADD_TO_BASKET,
      item
    })
  }
  const decrement = (id)=>{
    // Find the item in the basket and decrement its amount
    dispatch({
      type:Type.REMOVE_FROM_BASKET,
      id
    })
  }

  return (
    // This code defines a Cart component that displays the user's shopping basket, allowing them to increment or decrement the quantity of items in the basket. It also calculates the total price of the items in the basket and provides a link to proceed to checkout.
    <LayOut>
      <section className={style.container}>
        <div className={style.cart_container}>
          <h2>Hello</h2>
              <h3>Your shoping basket</h3>
              <hr />
              {
                basket?.length==0?(<p>Opps ! No item in your cart</p>):(basket?.map((item,i)=>{
                  return <section className={style.cart_product}>
                    <ProductCard   key={i}     
                    product={item}      
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                    />
                    <div className={style.btn_container}>
                      <button className={style.btn} onClick={()=>increment(item)}><IoIosArrowUp size={20}/></button>
                      <span>{item.amount}</span>
                      <button className={style.btn} onClick={()=>decrement(item.id)}><IoIosArrowDown size={20}/></button>
                    </div>
                  </section> 
                    
                  })
              )
          }
        </div>

        {basket?.length !==0 && (
          <div className={style.subtotal}>
            <div>
              
                <p>Subtotal({basket?.length} items)</p>
                <CurrencyFormat amount={total}/>
              </div>
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/payment">Continue to checkout</Link>
            </div>
          
        )}
      </section>
    </LayOut>
  )
}

export default Cart