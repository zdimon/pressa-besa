import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';
import  { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
import { Controller } from 'swiper';
import Fancybox from './fancybox';
import PaymentDialog from '../Modal/Payment/PaymentDialog';



export default function ImageReader(props) {

  const [pages, setPages] = React.useState([]);
  const [open_pay_dialog, setOpenPayDialog] = React.useState(false);

  const paymentDialogref = React.useRef(null)

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  const markIsPaid = () => {
    props.handleIsPaid();
  }

  var breakpoints = {
    250: {
      slidesPerView: 2,
    },
    300: {
      slidesPerView: 3,
    },
    400: {
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 4,
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
  };


    useEffect(() => {

      const req = new Request();
      req.post('reader/pages',{issue_id: props.issueId})
      .then((payload) => {
        setPages(payload.payload);
      }).catch((err) => { 
      });
    }, []);


    const openPaymentDialog = () => {
      if(window.localStorage.getItem('token')) {
        setOpenPayDialog(true);
      } else {
        
        var el = document.getElementById('js-login-header-link');
        el.dispatchEvent(
          new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true,
              buttons: 1
          })
        )
      }
      
    }

    const closePaymentDialog = () => {
      setOpenPayDialog(false);
    }

  
    return (
      <>
      <section className="section">
        <div className="container position-relative">
          <div className="justify-content-center row">
            <div className="col-xl-5 lox-md-7">
              <div className="multiply-slider-wrap">
                <div className="gallery-top">
                
                <Swiper
                        spaceBetween={0}
                        centeredSlides={true}
                        slidesPerView={1} 
                        loopedSlides={8}
                        loop={false}    
                        navigation={{
                          prevEl: navigationPrevRef.current,
                          nextEl: navigationNextRef.current,
                        }} 
                        onSwiper={setFirstSwiper}
                      >
                    <div className="swiper-wrapper">
                          {pages.map((item,index) =>
                            <SwiperSlide>
                                <div data-background="static/images/preloader.gif">
                                  
                                  {props.isPaid? 
                                      <Fancybox options={{ infinite: false }}>
                                        <img   
                                        className="swiper-lazy"    
                                        data-fancybox="gallery"      
                                        data-src={item.file_hight} 
                                        src={item.file_middle} alt="" />
                                      </Fancybox>:
                                    <img 
                                    onClick={() => openPaymentDialog()}                              
                                    src={item.file_middle} alt="" />                            
                                  }
                                
                                
                                </div>
                                
                            </SwiperSlide>
                          )}                  
                      

                    
                  </div>
                  <div ref={navigationNextRef} className="swiper-button-next swiper-button-white"></div>
                  <div ref={navigationPrevRef}  className="swiper-button-prev swiper-button-white"></div>
                </Swiper>
                  </div>
                </div>
              </div>
            </div>                       

              <div className="gallery-thumbs swiper-thumbs">
                
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={8} 
                    loop={false}    
                    loopedSlides={8}
                    modules={[Controller]}
                    centeredSlides={true}
                    breakpoints={breakpoints}
                  > 

                    {pages.map((item,index) =>
                      <SwiperSlide>
        
                          {props.isPaid? 
                            <Fancybox options={{ infinite: false }}>
                                    <img      
                                    data-fancybox="gallery"      
                                    data-src={item.file_hight} 
                                    src={item.file_low} alt="" />
                              </Fancybox>:
                              <img 
                              onClick={() => openPaymentDialog()}                              
                              src={item.file_low} alt="" />                            
                          }

                      </SwiperSlide>
                    )}

                  </Swiper>
                
              </div>
          
          
        </div>
      </section>
      <PaymentDialog 
      handleClose={closePaymentDialog} 
      handleIsPaid={markIsPaid}
      open={open_pay_dialog} 
      issueId={props.issueId}>

      </PaymentDialog>
            
      </>
    )
}