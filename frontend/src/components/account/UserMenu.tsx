import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RegForm from './RegForm';
import LoginForm from './LoginForm';
import { config } from '../../config';

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
        <a href="/lk" className="rd-nav-options__login">
          <img className="fa-icon" src="/static/images/user.svg" />
        </a>
        
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
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8 9C5.475 9 3.42857 6.98555 3.42857 4.5C3.42857 2.01445 5.475 0 8 0C10.525 0 12.5714 2.01445 12.5714 4.5C12.5714 6.98555 10.525 9 8 9ZM4.8 10.125H5.39643C6.18929 10.4836 7.07143 10.6875 8 10.6875C8.92857 10.6875 9.80714 10.4836 10.6036 10.125H11.2C13.85 10.125 16 12.2414 16 14.85V16.3125C16 17.2441 15.2321 18 14.2857 18H1.71429C0.767858 18 0 17.2441 0 16.3125V14.85C0 12.2414 2.15 10.125 4.8 10.125Z" fill=""/>
							</svg>
              &nbsp;
              <span id="js-login-header-link" className="rd-nav-options__login-title" >
              Вход
              </span>
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