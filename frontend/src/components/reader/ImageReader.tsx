import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';
import  { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);
import { Controller } from 'swiper';
import Fancybox from './fancybox';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



export default function ImageReader(props) {

  const [pages, setPages] = React.useState([]);
  const [open_pay_dialog, setOpenPayDialog] = React.useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  var breakpoints = {
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
  };


    useEffect(() => {

      const req = new Request();
      req.post('reader/pages',{issue_id: props.issueId})
      .then((payload) => {
        
        setPages(payload.payload);
        console.log(payload.payload);
      }).catch((err) => { 
      });
    }, []);


    const handleClose = () => {
      setOpenPayDialog(false);
    };
  
    return (
      <>
      <section className="section bg-gradient-gray">
        <div className="container position-relative">
          <div className="multiply-slider-wrap">
            <div className="swiper gallery-top">

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
                    modules={[Controller]}
                    onSwiper={setFirstSwiper}
                    controller={{ control: secondSwiper }}
                  >
                <div className="swiper-wrapper">
                      {pages.map((item,index) =>
                        <SwiperSlide>
                            <div className="swiper-slide">
                              
                              {props.isPaid? 
                                  <Fancybox options={{ infinite: false }}>
                                    <img       
                                    data-fancybox="gallery"      
                                    data-src={item.file_middle} 
                                    src={item.file_middle} alt="" />
                                  </Fancybox>:
                                <img 
                                onClick={() => setOpenPayDialog(true)}                              
                                src={item.file_middle} alt="" />                            
                              }
                            
                            <p>Страница {item.page}</p>
                            </div>
                        </SwiperSlide>
                      )}                  
                  

                </div>
                <div ref={navigationPrevRef} className="swiper-button-next swiper-button-white"></div>
                <div ref={navigationNextRef}  className="swiper-button-prev swiper-button-white"></div>
              </Swiper>
            </div>

            <div class="swiper-thumbs">
              <div className="swiper gallery-thumbs">
                <div className="swiper-wrapper">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={4} 
                    loop={false}    
                    slideToClickedSlide={true}
                    touchRatio={0.2}
                    loopedSlides={8}
                    centeredSlides={true}
                    modules={[Controller]}
                    onSwiper={setSecondSwiper}
                    controller={{ control: firstSwiper }}
                    breakpoints={breakpoints}
                  > 

                    {pages.map((item,index) =>
                      <SwiperSlide>
                          <div className="swiper-slide">
                          {props.isPaid? 
                            <Fancybox options={{ infinite: false }}>
                              <img                                            data-fancybox="gallery"      
                                    data-src={item.file_middle}  
                                    src={item.file_low} alt="" />
                              </Fancybox>:
                              <img 
                              onClick={() => setOpenPayDialog(true)}                              
                              src={item.file_low} alt="" />                            
                          }
                          </div>
                      </SwiperSlide>
                    )}

                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            <Modal
            open={open_pay_dialog}
            onClose={handleClose}
            >
          <div  className={classes.paper} style={modalStyle}>
          <h2 id="simple-modal-title">Вы не оплатили выпуск</h2>
          <p id="simple-modal-description">
            <a href="/lk">Перейдите для оплаты</a>
          </p>
          
          </div>
          </Modal>

      </>
    )
}