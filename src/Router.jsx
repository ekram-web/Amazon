import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import SignIn from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment.jsx";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes.jsx";

// import { CheckoutProvider } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



const Routing = () => {

  const stripePromise = loadStripe(
    "pk_test_51RVYhTGhBFOqfNNBvlUosErKolYnuXal7pHKb3ZU2v2gKu600paWAEQy9SGHopMAcNXu2qrNrnjT84U9iiQIVfND00WWNUAkug"
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<SignIn />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoutes
              msg={"you must login first to pay"}
              redirect={"/payment"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoutes>
          }
        />
   
        <Route path="/productdetial" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoutes
              msg={"you must login first to see your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoutes>
          }
        />


      </Routes>
    </Router>
  );
};

export default Routing;

// This code sets up the routing for a React application using React Router. It defines routes for various pages such as Landing, SignIn, Payment, Orders, Cart, Results, and ProductDetail. Each route is associated with a specific component that will be rendered when the route is accessed. The Router component wraps the Routes to enable navigation throughout the application.