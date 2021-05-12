import * as React from "react";
import  { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
import { findDOMNode } from "react-dom";
import './TagSlider.scss';

// https://swiperjs.com/react

export default function TagSlider(props) {
    var container = document.getElementById(props.selector);
    var matches = container.querySelectorAll("a");
    var matchesArr = Array.prototype.slice.call(matches);
    var breakpoints = {
        320: {
          spaceBetween: 20,
          slidesPerView: 3,
          centeredSlides: true,
        },
        500: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
        800: {
            spaceBetween: 20,
            slidesPerView: 6,
        }
    }
    return (
        <Swiper
       
        spaceBetween={20}
        slidesPerView={'auto'} 
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
          {matchesArr.map((item,index) =>      
                    
                        <SwiperSlide>
                                <a href={item.getAttribute('href')} className="button button-primary">
                                    {item.innerHTML}
                                </a>
                        </SwiperSlide>
                   
          )}
     
      </Swiper>
    )
}