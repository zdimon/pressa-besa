import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RegForm from './RegForm';
import LoginForm from './LoginForm';
import { config } from '../../config';
import LkMenu from './LkMenu';


export default function UserMenu() {

  const [token, setToken] = React.useState(window.localStorage.getItem('token'));
  const [value, setValue] = React.useState(0);
  const [showPanel, setShowPanel] = React.useState(false);

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
    window.location.href = `${config.serverDomain}logout/`;
  }

  const doLogin = (token) => {
    setShowPanel(false);
    setToken(token);
    window.localStorage.setItem('token',token);
  }
    
  if (token) {
    return (
      <>
        <LkMenu />
        
        <a 
        href="#" 
        onClick={ () => {logout()}}
        className="rd-nav-options__login">

              <span className="rd-nav-options__login-title" id="js-logout-header-link">
                <img className="fa-icon" src="/static/images/logout.svg" />
              </span>
        </a>
      </>
    );
  } else {
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <>

        <a 
        href="#" 
        onClick={ () => {setShowPanel(true)}}  
        className="rd-nav-options__login">
              <img className="fa-icon" src="/static/images/user.svg" />
        </a>

        
       
        <Drawer anchor="right" open={showPanel} onClose={() => {
            setShowPanel(false)
        }}>

          <Tabs 
          value={value}
          onChange={handleChange} 
          >
            <Tab label="Вход"  />
            <Tab label="Регистрация" />
          </Tabs>

          <div hidden={value !== 1} >
            <RegForm  />
          </div>

          <div hidden={value !== 0} >
            <LoginForm clickCallback={doLogin} />
          </div>

        </Drawer>
      </>
    )
  }

}