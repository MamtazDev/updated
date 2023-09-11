import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import product1 from "../../../public/assets/product1.png";
import product2 from "../../../public/assets/product2.png";
import product3 from "../../../public/assets/product3.png";
import Slider from "react-slick";

const ProductSlider = ({ images, handleImageClick }) => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    arrows: true,
    slidesToScroll: 3,
    initialSlide: 0,
    // autoplay: true,
    // speed: 3000,
    // autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="px-5 " >
      <Slider {...settings}>
        {images?.map((img, index) => (
          <div key={index} >
            <img
              onClick={() => handleImageClick(img)}
              src={img}
              alt=""
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
