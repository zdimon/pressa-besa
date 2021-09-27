import React, { useState, useEffect } from 'react';
import { Request } from '../../Request';
import Snackbar from '@material-ui/core/Snackbar';


export default function SubscriptionBlock(props) {

    const [message, setMessage] = React.useState('');
    const [term, setTerm] = React.useState(1);
    const [subId, setSubId] = React.useState(0);
    const [options, setOptions] = React.useState([]);
    const [showLkButton, setshowLkButton] = React.useState(false);

    const [state, setState] = React.useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClose = () => {
      setState({ ...state, open: false });
    };


    useEffect(() => {

      const req = new Request();
      req.post('reader/subscription/detail',{journal_id: props.journalId})
      .then((payload) => {
        // console.log(payload.payload);
        if(payload.payload[0]){
          setTerm(payload.payload[0].months);
          setSubId(payload.payload[0].id);
        }
        setOptions(payload.payload);
      }).catch((err) => { 
      });
    }, []);

    const doBuy = () => {
      if(window.localStorage.getItem('token')) {
        const req = new Request();
        req.post('reader/buy/subscription',{subscription_id: subId})
        .then((payload) => {
          console.log(payload);
          setMessage(payload.message);
          setState({ ...state, open: true});
          if(payload.status === 2) {
            setshowLkButton(true);
          }
        }).catch((err) => { 
        });
           
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

    const doSetTerm = (event) => {
      setTerm(event.target.value);
      setSubId(event.target.value);

    }
  
  return (
    <>
     
        <div className="card-info__subscription-header">
            <span>ЭЛЕКТРОННАЯ ПОДПИСКА</span>
            <button 
            onClick={doBuy}
            className="button-primary button button-sm" >Подписаться</button>
            

        </div>
        <div className="card-info__subscription-body" onChange={doSetTerm.bind(this)}>
            {
              options.map((el) => (
                <div className="form-wrap">
                  {el.months===term?
                  <input
                    checked={true}
                   className="custom-radio" value={el.id} type="radio" id={`radio-${el.id}`} name="subscription" />
                   :
                   <input
                  className="custom-radio" value={el.id} type="radio" id={`radio-${el.id}`} name="subscription" />}                   
                  <label htmlFor={`radio-${el.id}`}>{el.desc}</label>
                </div>                
              ))
            }
           
        </div>

        <Snackbar
            open={open}
            onClose={handleClose}
            message={message}
            autoHideDuration={2000}
        />

      
    </>
  )
}