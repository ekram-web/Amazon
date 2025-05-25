import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import style from "./product.module.css";

const Product = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={style.products_container}>
      {products?.map((singleProduct) => {
        return <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true}/>;
      })}
    </section>
  );
};

export default Product;
