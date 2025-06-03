import React, { useState, useContext } from "react";
import styles from "./signUp.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { auth } from "./../../Utility/Firebase";
// important
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { DataContext } from "./../../Utility/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const Auth = () => {

  // This component handles user authentication (sign in and sign up) using Firebase
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  // useContext is used to access the global state managed by DataContext
  const [{ user }, dispatch] = useContext(DataContext);
  // user is the current user object from the global state
  // console.log(user);

  // useNavigate and useLocation are hooks from react-router-dom 
  const navigate = useNavigate();
  const navStateData = useLocation();

  // console.log(navStateData);

  const authHandler = (e) => {
    e.preventDefault();
    // console.log(e.target.name); // signin or signup
    
    if (e.target.name == "signin") {
      // firebase auth
      setLoading({ ...loading, signIn: true });
      
      // Sign in with email and password
      signInWithEmailAndPassword(auth, email, password) 
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      

      // Sign up with email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  // console.log(password,email);

  return (
    <section className={styles.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/640px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className={styles.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={styles.login_signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={20} /> : "Sign In"}
          </button>
        </form>

        <p>
          By signing in you agree to the AMAZONE FAKE CLONE Condiotions of Use &
          Sale. Please see our privacy Notice,our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={styles.login_registerButton}
        >
          
          {loading.signUp ? (
            <ClipLoader color="#000" size={20} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>


        {error && (
            // Display error message if there is an error
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
