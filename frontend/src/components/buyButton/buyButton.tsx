import React, { useState } from 'react';
import { render } from "react-dom";
import { Request } from '../../Request';
import Snackbar from '@material-ui/core/Snackbar';

export default function BuyButton(props) {

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const [message, setMessage] = React.useState('');

    const handleClose = () => {
      setState({ ...state, open: false });
    };

    const doBuy = () => {
      if(window.localStorage.getItem('token')) {
        const req = new Request();
        req.post('reader/make_payment',{issue_id: props.issueId})
        .then((payload) => {
          console.log(payload);
          setMessage(payload.message);
          setState({ ...state, open: true});
          
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
  
  return (
    <>
        <a 
        href="#" 
        onClick={doBuy}
        className="button button-primary button-sm">Купить</a>
        <Snackbar
            open={open}
            onClose={handleClose}
            message={message}
            autoHideDuration={2000}
        />
    </>
  )
}