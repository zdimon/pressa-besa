import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';

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


export default function TextReader(props) {

  const [open_pay_dialog, setOpenPayDialog] = React.useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [articles, setArticles] = React.useState([]);
  const [current_article, setCurrentArticle] = React.useState({});
  const [show_current, setShowCurrent] = React.useState(false);
  const [show_image, setShowImage] = React.useState(false);
  const req = new Request();

  const handleClose = () => {
    setOpenPayDialog(false);
  };

  const selectArticle = (article_id) => {

    req.post('reader/article',{article_id: article_id})
    .then((payload) => {
      setCurrentArticle(payload.payload);
      setShowCurrent(true);
      if(payload.payload.image_url === 'None'){
        setShowImage(false);
        console.log('f');
      } else { 
        setShowImage(true);
        console.log('t');
      }
    }).catch((err) => { 
    });
  }

  useEffect(() => {

    
    req.post('reader/articles',{issue_id: props.issueId})
    .then((payload) => {
      setArticles(payload.payload);
      console.log(payload.payload);
    }).catch((err) => { 
    });
  }, []);

    return (
      <>
      <section className="section bg-gradient-gray">
        <div className="container position-relative">

          <div className="row row-20" style={ show_current? {} : {"display": "none"} }>
            <div 
            
            className="col-12 col-md-4 d-flex justify-content-center">
              <div style={ show_image? {} : {"display": "none"} } className="single-card__media">
                <img src={current_article.image_url} alt={current_article.title} />
              </div>
            </div>
            <div className="col-12 col-md-8 d-flex flex-column justify-content-between">
              <div className="single-card__info">
                

                <div className="single-card__info-title">
                  {current_article.title}
                  </div>
                <div className="single-card__info-caption">
                  {current_article.text}
                </div>
                <div className="single-card__info-caption">
                  Автор: {current_article.author}
                </div>
              </div>
              
            </div>
          </div>





          <div className="articles-grid">
              {articles.map((item,index) => (
                <div className="article-thumbnail">
                    <div className="article-thumbnail__body">
                        <div className="article-thumbnail__body-caption">
                            {props.isPaid?
                               <a href="#" onClick={() => selectArticle(item.id)} >{item.title}</a>:
                               <a href="#" onClick={() => setOpenPayDialog(true)} >{item.title}</a>
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