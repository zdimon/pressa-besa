import * as React from 'react';
import { Request } from '../../Request';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';


export default function RegForm() {

  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);

  const req = new Request();
  const register = () => {
    req.post('account/registration',{email,password})
    .then((payload) => {
      if(payload.status === 1) {
        setError(true);
      } else {
        window.localStorage.setItem('token', payload.token);
      }
    });
  }

    return (
      <>
        <List>

          <ListItem>
              <TextField 
              error={error}
              onChange={event => setEmail(event.target.value)}
              label="Email" 
              variant="outlined" />
          </ListItem>
          
          <ListItem>
              <TextField 
              error={error}
              onChange={event => setPassword(event.target.value)} 
              label="Пароль" 
              variant="outlined" />
          </ListItem>

          <ListItem
          style={error ? {} : { display: 'none' }}
          >
            <TextField
              error
              id="filled-error"
              label="Ошибка входа!"
              variant="filled"
            />
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

