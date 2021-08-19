import * as React from 'react';
import { Request } from '../../Request';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';


export default function RegForm() {

  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState(''); 
  const [error, setError] = React.useState(false);
  const [error_message, setErrorMessage] = React.useState('');

  const [success, setSuccess] = React.useState(false);
  const [success_message, setSuccessMessage] = React.useState('');


  const req = new Request();
  const register = () => {
    req.post('account/registration',{email})
    .then((payload) => {
      setSuccess(true);
      setSuccessMessage(payload.message);
      // if(payload.status !== 0) {
        
      // } else {
      //   window.localStorage.setItem('token', payload.token);
      // }
    }).catch((err) => {
      console.log(err.response.data)
      setError(true);
      setErrorMessage(err.response.data.email.message);
    });
  }

    return (
      <>
        <List>

          <ListItem>
              <TextField 
              error={error}
              onChange={event => setEmail(event.target.value)}
              label={error_message} 
              variant="outlined" />
          </ListItem>
          
          

          <ListItem
          style={error ? {} : { display: 'none', color: 'red'  }}
          > Ошибка входа!
          </ListItem>

          <ListItem
          style={success ? {} : { display: 'none', color: 'green' }}
          >
            {success_message}
          </ListItem>

          <ListItem>
            <Button 
              onClick={ () => register() }
              variant="contained" 
              color="secondary">
                Зарегистрироваться
            </Button>
          </ListItem>
        </List>
      </>
    )
}

