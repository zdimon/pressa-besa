import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import AddBookmark from '../bookmarks/bookmarks';
import PaymentDialog from '../Modal/Payment/PaymentDialog';
import  { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";
import SubscribeButton from '../Subscription/SubscribeButton';
import ReactHtmlParser from 'react-html-parser'; 
import AudioButton from '../audioButton/audioButton';
import { useParams } from "react-router-dom";

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


export default function TextReader(props) {

  const { article_id } = useParams();
  const [open_pay_dialog, setOpenPayDialog] = React.useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [articles, setArticles] = React.useState([]);

  const [current_article, setCurrentArticle] = React.useState({});

  const [current_tag, setCurrentTag] = React.useState(false);
  const [issues, setIssues] = React.useState([]);
  const [show_current, setShowCurrent] = React.useState(false);
  const [show_image, setShowImage] = React.useState(false);

  const [issueId, setIssueId] = React.useState(props.issueId);

  const [current_issue, setCurrentIssue] = React.useState({});

  const [reader_url, setReaderUrl] = React.useState('image-reader');

  const req = new Request();

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

  const handleClose = () => {
    setOpenPayDialog(false);
  };

  const closePaymentDialog = () => {
    setOpenPayDialog(false);
  }

  const changeIssue = (issue_id) => {
    props.changeIssue(issue_id);
    setIssueId(issue_id);
  }

  const markIsPaid = () => {
    props.handleIsPaid();
  }

  const filterArticles = (key: string) => {
    req.post('reader/articles/filter',{key: key})
    .then((payload) => {
      setArticles(payload.payload);
      setCurrentTag(key);
    }).catch((err) => { 
    });
  }

  const getArticle = (article_id) => {
    req.post('reader/article',{article_id: article_id})
    .then((payload) => {
      setCurrentArticle(payload.payload);
      setShowCurrent(true);
      if(payload.payload.image_url === 'None'){
        setShowImage(false);
      } else { 
        setShowImage(true);
      }
    }).catch((err) => { 
    });    
  }


  const getAnnounce = (announce_id) => {
    req.post('announce/info',{id: announce_id})
    .then((payload) => {
      let data = {
        "title": payload.name,
        "text": payload.text,
        "image_url": payload.image_url
      }
      setCurrentArticle(data);
      setShowCurrent(true);
      if(payload.image_url === 'None'){
        setShowImage(false);
      } else { 
        setShowImage(true);
      }
    }).catch((err) => { 
    });    
  }


  const selectArticle = (article_id) => {
    getArticle(article_id);
  }

  const goBack = () => {
    setShowCurrent(false);
  }

  useEffect(() => {
   
    if(props.type === 'article'){
      getArticle(article_id);
    }
    if(props.type === 'announce'){
      getAnnounce(article_id);
    }
    
  },[])

  useEffect(() => {

    
 
      const req = new Request();
      req.post('reader/issue/list',{issue_id: props.issueId})
      .then((payload) => {
        setIssues(payload.payload);
      }).catch((err) => { 
      });
   

    req.post('reader/articles',{issue_id: props.issueId})
    .then((payload) => {
      setArticles(payload.payload);
      console.log(payload.payload.length);
      if(payload.payload.length===0){
        setReaderUrl('image-reader')
      } else {
        setReaderUrl('text-reader');
      }
    }).catch((err) => { 
    });

    req.post('reader/settings',{issue_id: props.issueId})
    .then((payload) => {
      setCurrentIssue(payload);
     }).catch((err) => { 
    });


  }, [issueId]);

    return (
      <>
      <section className="section section-xs bg-default single-card">
		    <div className="container container-md">
			    <div className="row row-20">
            { show_image?
              <div className="col-12 col-md-4 d-flex justify-content-center">
                <div className="single-card__media">
                  <img src={current_article.image_url} alt="" />
                </div>
              </div>
             : <></>}
				    <div className="col-12 col-md-8 d-flex flex-column justify-content-between">
					    <div className="single-card__info">
              { show_current?
						    <div className="single-card__info-group">
							    <div className="single-card__info-details">
								    <div className="single-card__info-details-media">
									    <a href="{% url 'journal-detail' name_slug=item.issue.journal.name_slug %}">
									    <img src={current_issue.issue_cover} alt="" width="100" />
									    </a>
								    </div>
								    <div className="single-card__info-details-caption">
									    <div className="single-card__info-details-title">
                         {current_issue.journal_name}
									    </div>
									    <div className="single-card__info-details-release">
										    Выпуск:  {current_issue.issue_name} {current_issue.released}
									    </div>
									     <SubscribeButton />
                       <AudioButton type="article" id={current_issue.id} />
								    </div>
							    </div>
							    <div className="single-card__info-marker">
                    <AddBookmark  
                    issueId={current_issue.issue_id} 
                    type="issue" 
                    />
							    </div>
						    </div>
                : <div></div>
                }
						    <div className="single-card__info-title">
                  <h2 className="article-title">
                    {current_article.title}
                  </h2>
                </div>
						    <div className="single-card__info-caption">
                  { ReactHtmlParser (current_article.text) }

                  <div className="font-bold">
                    {current_article.author}
                  </div>

						    </div>
					    </div>
				    </div>
			    </div>
		    </div>


        <div className="container position-relative">

          <section className="section">
          <div className="col-12">
                <h4 className="text-uppercase">Статьи <span>выпуска</span></h4>
          </div>
          </section>

          
          <div className="articles-grid">
              {articles.map((item,index) => (
                <div className="article-thumbnail">
                <div className="article-thumbnail__header">
                <ul className="article-thumbnail__header-list">
                        {item.tags.map((el) => (
                          <li>
                             <a 
                             href="#"
                             className="color-red"
                             onClick={() => filterArticles(el) }>
                               #{el}
                              </a>
                          </li>
                        ))}
                </ul>
                   <div className="article-thumbnail__header-marker" >
                   <AddBookmark  
                    articleId={item.id} 
                    page={item.page}
                    type="article" 
                    />
                </div>
                </div>
                
                    <div className="article-thumbnail__body">
                        <div className="article-thumbnail__body-caption">
                            {props.isPaid?
                               <a href="#" onClick={() => selectArticle(item.id)} >{item.title}</a>:
                               <a href="#" onClick={() => {
                                if(!localStorage.getItem("token"))
                                {
                                  var el = document.getElementById('js-login-header-link');
                                  el.dispatchEvent(
                                    new MouseEvent('click', {
                                        view: window,
                                        bubbles: true,
                                        cancelable: true,
                                        buttons: 1
                                    })
                                  )
                                  return true;
                                } else {
                                  return setOpenPayDialog(true)
                                }
                               }} >{item.title}</a>
                            }
                            <p>
                                {item.short_text}
                            </p>
                        </div>
                        <div className="article-thumbnail__body-media">
                            <img src={item.cover_url} alt="" />
                        </div>
                    </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container position-relative">
          <br />
            <div className="col-12">
                <h4 className="text-uppercase">Еще <span>выпуски</span></h4>
            </div>

          <Swiper
              spaceBetween={10}
              slidesPerView={8} 
              loop={false}  
              breakpoints={breakpoints}  
            > 

              {issues.map((item,index) =>
                <SwiperSlide>
                    <div className="swiper-slide">
                      <Link to={{
                          pathname: `/${reader_url}/${item.id}`
                      }} >
                        <img 
                        onClick={() => changeIssue(item.id)}
                        src={item.common_cover} alt="" />
                      </Link>
                      
                    </div>
                </SwiperSlide>
              )}

            </Swiper>
            <br />
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