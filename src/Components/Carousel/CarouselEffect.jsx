import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data";
import style from "./carousel.module.css";

const CarouselEffect = () => {
  return (
    <div>
    
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => {
          return <img src={imageItemLink} key={index} />;
        })}
      </Carousel>
      <div className={style.hero_img}></div>
    </div>
  );
};

export default CarouselEffect;
