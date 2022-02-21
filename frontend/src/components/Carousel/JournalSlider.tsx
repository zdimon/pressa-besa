import * as React from "react";
import  { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
import { findDOMNode } from "react-dom";
import { useTranslation } from 'react-i18next';

export default function JournalSlider(props) {
  var container = document.getElementById(props.selector);
  var matches = container.querySelectorAll("img");
  var matchesArr = Array.prototype.slice.call(matches);
  const { t, i18n } = useTranslation();

  var breakpoints = {
    320: {
      spaceBetween: -30,
      slidesPerView: 1,
      centeredSlides: true,
      observeParents: true
    },
    340: {
      spaceBetween: -40,
      observeParents: true,
      slidesPerView: 1
      
    },
    350: {
      spaceBetween: -50,
      observeParents: true,
      slidesPerView: 1
    },
    360: {
      spaceBetween: -60,
      observeParents: true,
      slidesPerView: 1
    },
    370: {
      spaceBetween: -70,
      observeParents: true,
      slidesPerView: 1
    },
    380: {
      spaceBetween: -80,
      observeParents: true,
      slidesPerView: 1
    },
    400: {
      spaceBetween: -100,
      observeParents: true,
      slidesPerView: 1
    },
    410: {
      spaceBetween: -110,
      slidesPerView: 1
    },
    420: {
      spaceBetween: -120,
      slidesPerView: 1
    },
    430: {
      spaceBetween: -130,
      slidesPerView: 1
    },
    440: {
      spaceBetween: -140,
      slidesPerView: 1
    },
    450: {
      spaceBetween: -150,
      slidesPerView: 1
    },
    460: {
      spaceBetween: -160,
      slidesPerView: 1
    },
    470: {
      spaceBetween: -170,
      
    },
    480: {
      spaceBetween: -180,
      slidesPerView: 1
    },
    490: {
      spaceBetween: -190,
      slidesPerView: 1
    },
    500: {
      spaceBetween: -200,
      slidesPerView: 1
    },
    510: {
      spaceBetween: -210,
      slidesPerView: 1
    },
    520: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false
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
              <h4 className="text-uppercase">Новые <span>выпуски</span></h4>
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
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  
                    {matchesArr.map((item,index) =>      
                        <SwiperSlide>
                        <div className="thumbnail-modern">
                            <div className="thumbnail-modern__media">
                                <a href={item.getAttribute('data-url')}>
                                    <img src="/media/covers/nauka-i-tehnika/2021/19/205-282/cover.png" alt="" />
                                </a>
                            </div>
                            <div className="thumbnail-modern__body">
                                <div className="thumbnail-modern__body-title">
                                    <a href={item.getAttribute('data-url')}>
                                      {item.getAttribute("data-jname")}  
                                    </a>
                                </div>
                                <div className="thumbnail-modern__body-caption">№ {item.getAttribute("data-iname")}</div>
                            </div>
                            <div className="thumbnail-modern__footer">
                            { item.getAttribute("data-amount") !== '0,00'?  <>{item.getAttribute("data-amount")} ₽</>:
                            <>{t('m_free')}</>}
                            </div>
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
