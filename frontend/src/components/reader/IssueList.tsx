import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';
import Fancybox from './fancybox';
import PaymentDialog from '../Modal/Payment/PaymentDialog';

export default function IssueList(props) {
  const [pages, setPages] = React.useState([]);
  const req = new Request();
  const [open_pay_dialog, setOpenPayDialog] = React.useState(false);

  const closePaymentDialog = () => {
    setOpenPayDialog(false);
  }

  const markIsPaid = () => {
    props.handleIsPaid();
  }

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

  useEffect(() => {

    
    req.post('reader/pages',{issue_id: props.issueId})
      .then((payload) => {
        setPages(payload.payload);
      }).catch((err) => { 
      });
    }, []);

  

    return (
      <> 
        <section className="section bg-gradient-gray">
          <div className="container position-relative">
            <div className="list-tails">
              <ul>

                
                {
                  pages.map((item) => 
                    <li>
                    { props.isPaid? 
                      <Fancybox options={{ infinite: false }}>
                        <img   
                        className="swiper-lazy"    
                        data-fancybox="gallery"      
                        data-src={item.file_hight} 
                        src={item.file_low} alt="" />
                      </Fancybox>:
                    <img 
                    onClick={() => openPaymentDialog()}                              
                    src={item.file_low} alt="" />                            
                    }
                    </li>
                  )
                }
              </ul>
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