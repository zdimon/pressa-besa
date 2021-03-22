import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RegForm from './RegForm';
import LoginForm from './LoginForm';


export default function UserMenu() {

  const [token, setToken] = React.useState(window.localStorage.getItem('token'));
  const [value, setValue] = React.useState(0);
  const [showPanel, setShowPanel] = React.useState(false);

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
  }

  const doLogin = (token) => {
    setShowPanel(false);
    setToken(token);
    window.localStorage.setItem('token',token);
  }
    
  if (token) {
    return (
      <>
        <a 
        href="#" 
        onClick={ () => {logout()}}
        className="user-link">
          Выход
        </a>
      </>
    );
  } else {
    const handleChange = (event, newValue) => {
      setValue(newValue);
      console.log(newValue);
    };
    return (
      <>
        <a 
        href="#" 
        onClick={ () => {setShowPanel(true)}}  
        className="user-link">
          Вход
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