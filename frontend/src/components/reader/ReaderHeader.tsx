import React, { useState, useEffect, useRef } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RegForm from '../account/RegForm';
import LoginForm from '../account/LoginForm';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import LangSwitcher from '../i18n/LangSwitcher';


export default function ReaderHeader(props) {

    const location = useLocation();
    const [showPanel, setShowPanel] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const doLogin = (token) => {
        setShowPanel(false);
        window.localStorage.setItem('token',token);
      }    

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <>
        <header className="section page-header">
        <div className="rd-navbar-wrap">
            <nav className="rd-navbar rd-navbar-classic" data-layout="rd-navbar-static" data-sm-layout="rd-navbar-static"
                 data-md-layout="rd-navbar-static" data-md-device-layout="rd-navbar-static" data-lg-layout="rd-navbar-static"
                 data-lg-device-layout="rd-navbar-static" data-xl-layout="rd-navbar-static"
                 data-xl-device-layout="rd-navbar-static" data-lg-stick-up-offset="46px" data-xl-stick-up-offset="46px"
                 data-xxl-stick-up-offset="46px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
                <div className="rd-navbar-main-outer">
                    <div className="rd-navbar-main">
                        <div className="rd-navbar-panel mobi-navbar-panel" >
                            <div className="rd-nav-aside">
                                
                            </div>
                            <div className="rd-nav-panel-main">
                               
                                <div className="right-links-wrapper">
                                    <div className="rd-navbar-logo">
                                        <a className="brand hide-in-mobile" href="/" >
                                        <img src="/static/images/brand.svg" />
                                        </a>
                                        <a className="brand show-in-mobile hidden" href="/" >
                                        <img src="/static/images/brand-short.svg" />
                                        </a>
                                    </div>
                                    <div className="nav-riader-links" >
                                        { location.pathname.includes("image-reader") && props.has_article && (
                                        <Link 
                                        to={{ 
                                                pathname: `/text-reader/${props.issueId}`
                                            }}>
                                            <img className="fa-icon" src="/static/images/text.svg" />
                                            <span className="hide-in-mobile">
                                                Текстовая версия
                                            </span>
                                            </Link>
                                        )}
                                            
                                            { location.pathname.includes("text-reader") && (
                                            <Link to={{
                                                pathname: `/image-reader/${props.issueId}`
                                                }} >
                                            <img className="fa-icon" src="/static/images/pdf.svg" />
                                            <span className="hide-in-mobile">PDF версия</span>
                                            </Link>
                                            )}
                                    </div>
                                </div>                        
                    
                            <div className="right-rider-menu">
                              <Link to={`/list-reader/${props.issueId}`}>
                                  <img className="fa-icon" src="/static/images/list.svg" />
                              </Link>  
                              { window.localStorage.getItem('token') &&
                                (<a 
                                   aria-controls="user-menu" aria-haspopup="true" 
                                   onClick={handleClick} 
                                   href="#">
                                    <img className="fa-icon" src="/static/images/user.svg" />
                                </a> 
                              ) 
                              }

                              { !window.localStorage.getItem('token') &&
                                (<a 
                                    id="js-login-header-link"
                                    href="#" 
                                    onClick={ () => {setShowPanel(true)}}  
                                    className="rd-nav-options__login">
                                                                                                        <img className="fa-icon" src="/static/images/user.svg" /> 
                                          
                                    </a>
                              ) 
                              }
                                <LangSwitcher selector="ru"/>
                            </div>

                                
                            </div>
                        </div>

                        
                        
                    </div>
                </div>
            </nav>
        </div>
    </header>

     <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Закладки</MenuItem>
        <MenuItem onClick={handleClose}>Моя коллекция</MenuItem>
        <MenuItem onClick={handleClose}>Профиль</MenuItem>
      </Menu>


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