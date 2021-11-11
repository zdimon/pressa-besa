import * as React from 'react';
import { Request } from '../../Request';
import Snackbar from '@material-ui/core/Snackbar';

export default function NewsSubscriptionForm() {

    const [message, setMessage] = React.useState('');
    const [email, setEmail] = React.useState('');

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal, open } = state;

    const doSubscribe = () => {
          const req = new Request();
          req.post('announce/subscribe',{email: email})
          .then((payload) => {
            console.log(payload);
            setMessage(payload.message);
            setState({ ...state, open: true});
          }).catch((err) => { 
          });
    }

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleClose = () => {
        setState({ ...state, open: false });
      };

  return (
    <div className="mail-form">
        <div className="form-wrap">
            <input 
            onChange={handleChange}
            type="text" 
            className="form-input" 
            placeholder="Введите ваш e-mail" />
            <div className="form-button">
                <button 
                onClick={doSubscribe}
                className="button button-primary">
                    Подписаться
                    <span className="fa fa-angle-right"></span>
                </button>
            </div>
        </div>
        <Snackbar
            open={open}
            onClose={handleClose}
            message={message}
            autoHideDuration={2000}
        />
    </div>

  );
}