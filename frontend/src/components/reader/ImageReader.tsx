import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';
import  { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);


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
            <div className="swiper gallery-thumbs swiper-thumbs">
              <div className="swiper-wrapper">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={4} 
                  loop={true}       
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