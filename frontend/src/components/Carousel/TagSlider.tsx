import * as React from "react";
import  { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
import { findDOMNode } from "react-dom";

// https://swiperjs.com/react

export default function TagSlider(props) {
    var container = document.getElementById(props.selector);
    var matches = container.querySelectorAll("a");
    var matchesArr = Array.prototype.slice.call(matches);
    return (
        <Swiper
        spaceBetween={10}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
          {matchesArr.map((item,index) =>      
                        <SwiperSlide>
                            <a href="" className="button button-primary">
                                {item.innerHTML}
                            </a>
                        </SwiperSlide>
          )}
     
      </Swiper>
    )
}