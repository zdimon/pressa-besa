import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';
import  { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
import { Controller } from 'swiper';


/*
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 10,
		slidesPerView: 4.5,
		speed: 500,
		loop: true,
		slideToClickedSlide: true,
		touchRatio: 0.2,
		loopedSlides: 8,
		centeredSlides: true,
		breakpoints: {
			576: {
				slidesPerView: 5,
			},
			768: {
				slidesPerView: 5,
			},
			992: {
				slidesPerView: 6,
			},
			1200: {
				slidesPerView: 7,
			},
		},
	});
*/

export default function ImageReader(props) {

  const [pages, setPages] = React.useState([]);


  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

    useEffect(() => {

      const req = new Request();
      req.post('reader/pages',{issue_id: props.issueId})
      .then((payload) => {
        console.log(payload);
        setPages(payload.payload)
      }).catch((err) => {
        console.log(err);
        
      });
    }, []);

  
    return (
    
      <section className="section section-xl bg-gradient-gray">
        <div className="container position-relative">
          <div className="multiply-slider-wrap">
            <div className="swiper gallery-top">

            <Swiper
                    spaceBetween={0}
                    centeredSlides={true}
                    slidesPerView={1} 
                    loop={true}    
                    navigation={{
                      prevEl: navigationPrevRef.current,
                      nextEl: navigationNextRef.current,
                    }} 
                    modules={[Controller]}
                    onSwiper={setFirstSwiper}
                    controller={{ control: secondSwiper }}
                  >
                <div className="swiper-wrapper">
                      {pages.map((item,index) =>
                        <SwiperSlide>
                            <div className="swiper-slide">
                              <a href="assets/img/slider-img-1.jpg" className="swiper-slide-fancy" data-fancybox="images">
                              <img src={item.file_middle} alt="" />
                            </a>
                            <p>Страница {item.page}</p>
                            </div>
                        </SwiperSlide>
                      )}                  
                  

                </div>
                <div ref={navigationPrevRef} className="swiper-button-next swiper-button-white"></div>
                <div ref={navigationNextRef}  className="swiper-button-prev swiper-button-white"></div>
              </Swiper>
            </div>


            <div className="swiper gallery-thumbs swiper-thumbs">
              <div className="swiper-wrapper">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={4} 
                  loop={true}    
                  modules={[Controller]}
                  onSwiper={setSecondSwiper}
                  controller={{ control: firstSwiper }}
                > 

                  {pages.map((item,index) =>
                    <SwiperSlide>
                        <div className="swiper-slide">
                          <img src={item.file_low} alt="" />
                        </div>
                    </SwiperSlide>
                  )}

                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}