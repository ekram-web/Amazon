import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import style from "./product.module.css";
import Loader from "../../Components/Loader/Loader";

const Product = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state to true

  // useEffect(() => {
  //   axios
  //     .get("https://fakestoreapi.com/products")
  //     .then((res) => {
  //       setProducts(res.data);
  //       // console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    
    const fetchProducts = async () => {

      // setIsLoading(true); // Set loading state to true before fetching data
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);

        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // Ensure loading state is reset . end loading (runs regardless of success/failure)...instead of writing setIsLoading(false) in both try and catch we can use finally block
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={style.products_container}>
          {products?.map((singleProduct) => (
            <ProductCard
              product={singleProduct}
              key={singleProduct.id}
              renderAdd={true}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default Product;
