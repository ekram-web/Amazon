import React from "react";
import { Carousel } from "react-responsive-carousel";

// css for react-responsive-carousel from npm documentation "usage" section
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data";
import style from "./carousel.module.css";

const CarouselEffect = () => {
  return (
    <div>
    
      <Carousel
        autoPlay={true} // automaticaly starts playing the carousel
        infiniteLoop={true} // allows the carousel to loop infinitely
        showIndicators={false} // hides the indicators (dots) at the bottom of the carousel
        showThumbs={false}//> // hides the thumbnails below the main image
      >
        {img?.map((imageItemLink, index) => {
          return <img src={imageItemLink} key={index} />;
        })}
      </Carousel>
      
      {/* fade at the bottom of the banner images */}
      <div className={style.hero_img}></div>
    </div>
  );
};

export default CarouselEffect;
