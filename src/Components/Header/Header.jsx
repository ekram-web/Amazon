import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import style from "./header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../Utility/DataProvider/DataProvider";

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // is the same with
  //const [state, dispatch] = useContext(DataContext);
  // const { user, basket } = state; // destructuring state to get user and basket

  // console.log(basket);
  // console.log(basket.length); //how many different products are in the cart
  //this does not consider the quantity of each item

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // console.log(totalItem); // how many total items are in the cart including quantity

  return (
    <section className={style.fixed}>
      <section>
        <div className={style.header_container}>
          <div className={style.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />{" "}
            </Link>

            <div className={style.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={style.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={38} />
          </div>

          <div className={style.order_container}>
            <Link to="" className={style.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Flag_of_the_United_States_%28fixed%29.svg/640px-Flag_of_the_United_States_%28fixed%29.svg.png"
                alt=""
              />

              <select>
                <option value="">EN</option>
              </select>
            </Link>

            {/* if user is not logged in, redirect to /auth */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                {/* // if user is logged in, show their email and sign out option */}
                    <p>Hello{user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                  {/* // if user is not logged in, show "Hello, Sign In"  */}
                    <span>Account & Lists</span>
                    <p>Hello, Sign In</p>
                  </>
                )}
              </div>
            </Link>

            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={style.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
