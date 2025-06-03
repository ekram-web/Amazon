import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import stayle from "./orders.module.css";
import { DataContext } from "../../Utility/DataProvider/DataProvider.jsx";
import { db } from "../../Utility/Firebase.js";
import ProductCard from "./../../Components/Products/ProductCard.jsx";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // console.log("Fetching orders for user:", user.uid);
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshot);
          // console.log("Snapshot size:", snapshot.size);
          // console.log("Snapshot docs:", snapshot.docs);
          setOrders(
            snapshot.docs.map((doc) => ({
              id:doc.id,
              data:doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <LayOut>
      <section className={stayle.container}>
        <div className={stayle.orders_container}>
          <h2>Your Orders</h2>

          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>you don't have orders yet.</div>
          )}

          {/* ordered items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
