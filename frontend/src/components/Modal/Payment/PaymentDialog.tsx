import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../../Request';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import SubscribeButton from '../../Subscription/SubscribeButton';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #FE0000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  

export default function PaymentDialog(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    
    const [open_pay_dialog, setOpenPayDialog] = React.useState(false);
    const [has_money, setHasMoney] = React.useState(false);
    const [account, setAccount] = React.useState(0);
    const [cost, setCost] = React.useState(0);
    const [message_success, setMessageSuccess] = React.useState('');
    const [message_error, setMessageError] = React.useState('');
    const { t, i18n } = useTranslation();

    useEffect(() => {

        const req = new Request();
        req.post('reader/preorder',{issue_id: props.issueId})
        .then((payload) => {
          if(payload.account >= payload.cost ) {
              setHasMoney(true);
              console.log('has money')
          }
          setAccount(payload.account);
          setCost(payload.cost);
        }).catch((err) => { 
        });
      }, []);
   
    const handleClose = () => {
        props.handleClose();
      };




    const payment = () => {
        const req = new Request();
        req.post('reader/make_payment',{issue_id: props.issueId})
        .then((payload) => {
          console.log(payload);
          if(payload.status===0) {
            setMessageSuccess(payload.message);
            props.handleIsPaid();
          } else {
            setMessageError(payload.message);
          }
        }).catch((err) => { 
           
        });
      
    }

return (
    <Modal
        open={props.open}
        onClose={handleClose}
    >
  <div  className={classes.paper} style={modalStyle}>
  <h2 id="simple-modal-title">{t('t_payment')}</h2>
  <p >
      {t('m_cost')} {cost} {t('m_rub')}.
  </p>
  <p>
      {t('m_on_account')} {account} {t('m_rub')}.
  </p>

  <p style={has_money? {display: "none"}: {display: "block"}} >
    <a href="/lk/index">{t('m_proceed')}</a>
  </p>
  <p style={has_money? {display: "block"}: {display: "none"}} >
    <a href="#" onClick={payment}>{t('m_pay_from_account')}</a>
  </p>
  <p>
    <SubscribeButton />
  </p>
  <p className="color-green">{message_success}</p>
  <p className="color-red">{message_error}</p>

  </div>
  </Modal>
)

}
