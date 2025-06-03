import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut.jsx";
import { DataContext } from "../../Utility/DataProvider/DataProvider.jsx";
import styles from "./payment.module.css";
import ProductCard from "../../Components/Products/ProductCard.jsx";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat.jsx";
import { axiosInstance } from "../../Api/axios.js";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/Firebase.js";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type.js";

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // 1.backend || functions ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payments/create?total=${total * 100}`,
      });
      // console.log(response.data)
      const clientSecret = response.data?.clientSecret;

      // 2.client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      //  console.log(paymentIntent);

      // 3.after the confirmation --> order firebase store database save, clear basket

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      // console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={styles.payment_header}>Checkout ({totalItem}) items</div>
      {/* Payment method  */}
      <section className={styles.payment}>
        {/* address  */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago,IL</div>
          </div>
        </div>
        <hr />
        {/* product  */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />


        {/* card form  */}
        <div className={styles.flex}>
          <h3>Payment method</h3>
          <div className={styles.payment_card_container}>
            <div className={styles.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                <div className={styles.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
