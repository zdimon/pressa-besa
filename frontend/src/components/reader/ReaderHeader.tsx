import React, { useState, useEffect, useRef } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { useLocation } from 'react-router-dom';


export default function ReaderHeader(props) {
    const [mode, setMode] = React.useState('image');
    const doSwitchMode = (mode) => {
        props.doSwitch(mode); 
    }
    const location = useLocation();
    useEffect(() => {

        if(location.pathname.includes("text-reader")){
            setMode('text');
            console.log('text');
        }

        if(location.pathname.includes("image-reader")){
            setMode('image');
            console.log('image');
        }

        if(location.pathname.includes("list-reader")){
            setMode('text');
        }
       
        }, []);

    return (
        <header className="section page-header">
        <div className="rd-navbar-wrap">
            <nav className="rd-navbar rd-navbar-classic" data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fixed"
                 data-md-layout="rd-navbar-fixed" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static"
                 data-lg-device-layout="rd-navbar-static" data-xl-layout="rd-navbar-static"
                 data-xl-device-layout="rd-navbar-static" data-lg-stick-up-offset="46px" data-xl-stick-up-offset="46px"
                 data-xxl-stick-up-offset="46px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
                <div className="rd-navbar-main-outer">
                    <div className="rd-navbar-main">
                        <div className="rd-navbar-panel" >
                            <div className="rd-nav-aside">
                                
                            </div>
                            <div className="rd-nav-panel-main">
                               
                                
                                <div className="rd-navbar-logo">
                                    <a className="brand" href="/" >
                                    <img src="/static/images/brand.svg" />
                                    </a>
                                </div>

                                       { mode === 'image' && (
                                       <Link 
                                       to={{ 
                                            pathname: `/text-reader/${props.issueId}`
                                           }}>
                                          <img width="25" height="25" src="/static/images/txtver.jpg" />
                                          Текстовая версия
                                        </Link>
                                       )}
                                        
                                       
                                        <Link to={{
                                            pathname: `/image-reader/${props.issueId}`
                                            }} >
                                          <img width="25" src="/static/images/txtver.jpg" />
                                          Постраничная версия
                                        </Link>
                                
                                
                            </div>
                        </div>
                        <div className="rd-navbar-main-element">
                            <div className="rd-navbar-nav-wrap">
                              <Link to="/list-reader/{props.issueId}">
                                  <img src="/static/images/list-icon.jpg" />
                              </Link>  

                              <a href="/lk">
                                  <img src="/static/images/user-icon.jpg" />
                              </a>  

                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </nav>
        </div>
    </header>
    )
}