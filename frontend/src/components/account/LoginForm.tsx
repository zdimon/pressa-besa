import * as React from 'react';
import { Request } from '../../Request';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';

const AuthLink = {
  paddingLeft: "10px",
  paddingTop: "5px"
}


export default function LoginForm({clickCallback}) {

  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);

  const req = new Request();
  const login = () => {
    
    req.post('account/login',{email,password})
    .then((payload) => {
      if(payload.status === 1) {
        setError(true);
      } else {
        clickCallback(payload.token);
        document.location.reload();
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
              onClick={ () => login() }
              variant="contained" 
              color="secondary">
                Войти
            </Button>
            <div>
            <a style={AuthLink} href="/login/google-oauth2/">
              <img src="/static/images/enter_google.png" />
            </a>
            <a style={AuthLink} href="/login/twitter/">
              <img src="/static/images/enter_twitter.png" />
            </a>
            
            <a style={AuthLink} href="/login/vk-oauth2/">
              <img src="/static/images/enter_vk.png" />
            </a>

            <a style={AuthLink} href="/login/mailru-oauth2/">
              <img src="/static/images/enter_mail.png" />
            </a>
            <a style={AuthLink} href="/login/odnoklassniki-oauth2/">
              <img src="/static/images/enter_classmates.png" />
            </a>
            </div>
          </ListItem>

        </List>
      </>
    )
}

