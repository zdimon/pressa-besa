import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../../Request';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


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

    useEffect(() => {

        const req = new Request();
        req.post('reader/preorder',{issue_id: props.issueId})
        .then((payload) => {
          console.log(payload);
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
        console.log('closing');
      };


    const payment = () => {
        const req = new Request();
        req.post('reader/make_payment',{issue_id: props.issueId})
        .then((payload) => {
          console.log(payload);
          
        }).catch((err) => { 
        });
      
    }

return (
    <Modal
        open={props.open}
        onClose={handleClose}
    >
  <div  className={classes.paper} style={modalStyle}>
  <h2 id="simple-modal-title">Оплата выпуска</h2>
  <p >
      Стоимость покупки {cost} руб.
  </p>
  <p>
      У вас на счету {account} руб.
  </p>

  <p style={has_money? {display: "none"}: {display: "block"}} >
    <a href="/lk">Перейдите для пополнения</a>
  </p>
  <p style={has_money? {display: "block"}: {display: "none"}} >
    <a href="#" onClick={payment}>Оплатить со счета</a>
  </p>

  </div>
  </Modal>
)

}
