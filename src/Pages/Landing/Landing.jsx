import React from "react";
import CarouselEffect from "../../Components/Carousel/CarouselEffect";
import Categories from "../../Components/Category/Categories";
import Product from "../../Components/Products/Product";
import LayOut from "../../Components/LayOut/LayOut";

const Landing = () => {
  return (
    <LayOut>
      <CarouselEffect />
      <Categories />
      <Product />
    </LayOut>
  );
};

export default Landing;
