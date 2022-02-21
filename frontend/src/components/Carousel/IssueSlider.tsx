import * as React from "react";
import  { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
import { findDOMNode } from "react-dom";

export default function IssueSlider(props) {
  var container = document.getElementById(props.selector);
  var matches = container.querySelectorAll("img");
  var matchesArr = Array.prototype.slice.call(matches);
 
  var breakpoints = {
    320: {
      spaceBetween: -30,
      slidesPerView: 1,
      centeredSlides: true,
    },
    340: {
      spaceBetween: -40,
      
    },
    350: {
      spaceBetween: -50,
      
    },
    360: {
      spaceBetween: -60,
      
    },
    370: {
      spaceBetween: -70,
      
    },
    380: {
      spaceBetween: -80,
      
    },
    400: {
      spaceBetween: -100,
      
    },
    410: {
      spaceBetween: -110,
      
    },
    420: {
      spaceBetween: -120,
      
    },
    430: {
      spaceBetween: -130,
      
    },
    440: {
      spaceBetween: -140,
      
    },
    450: {
      spaceBetween: -150,
      
    },
    460: {
      spaceBetween: -160,
      
    },
    470: {
      spaceBetween: -170,
      
    },
    480: {
      spaceBetween: -180,
      
    },
    490: {
      spaceBetween: -190,
      
    },
    500: {
      spaceBetween: -200,
      
    },
    510: {
      spaceBetween: -210,
      
    },
    520: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  };

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  
  return (
    <section className="section bg-default section-xs">
      <div className="container">
        <div className="row row-20">
          <div className="col-12">
              <h4 className="text-uppercase">Еще <span>выпуски</span></h4>
          </div>
            <div className="col-12">
              <div className="swiper-wrap swiper-style-1">
                <Swiper
                  breakpoints={breakpoints}
                  loop={true}
                  
                  onInit={(swiper) => {
                    
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.destroy();
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  spaceBetween={20}
                  slidesPerView={1}
                  onSlideChange={() => {}}
                  onSwiper={(swiper) => {}}
                >
                  
                    {matchesArr.map((item,index) =>      
                        <SwiperSlide>
                        <div className="thumbnail-modern">
                            <div className="thumbnail-modern__media">
                                <a href={item.getAttribute('data-url')}>
                                    <img src={item.getAttribute('src')} alt="" />
                                </a>
                            </div>
                            <div className="thumbnail-modern__body">
                               
                                <div className="thumbnail-modern__body-caption">№ {item.getAttribute("data-iname")}
                                <br />
                                { item.getAttribute("data-release")?
                                  <>{item.getAttribute("data-release")}</>
                                  : <></>
                                }
                                </div>
                            </div>
                            { item.getAttribute("data-amount")?
                            <div className="thumbnail-modern__footer"> 
                            {item.getAttribute("data-amount")}
                            ₽</div>: <></>
                            }
                            
                        </div>
                        </SwiperSlide>
                  )}
                    <div className="slider-nav-wrapper">
                        <div ref={navigationPrevRef} className="slider-new-nav-prev">
                            <span className="fa fa-chevron-left"></span>
                        </div>
                        <div ref={navigationNextRef} className="slider-new-nav-next">
                            <span className="fa fa-chevron-right"></span>
                        </div>
                    </div>
                </Swiper>
              </div>
            
          </div>
      </div>
      </div>
    </section>
  );
}
