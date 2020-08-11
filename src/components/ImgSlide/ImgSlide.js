import React, { useEffect, useContext } from "react";
import "swiper/swiper.scss";
import "./ImgSlide.css";

import { PostContext } from "../../contexts/PostContext";

import {
  Swiper,
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow
} from "swiper";
Swiper.use([Navigation, Pagination, Scrollbar, EffectCoverflow]);

const ImgSlide = props => {
  const { swiperData } = useContext(PostContext);

  useEffect(() => {
    var swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {swiperData.map((url, index) => (
          <div
            key={index}
            className="swiper-slide"
            style={{
              backgroundImage: `url(${url})`
            }}
          />
        ))}
      </div>
      <div className="swiper-pagination" />
    </div>
  );
};
export default ImgSlide;
