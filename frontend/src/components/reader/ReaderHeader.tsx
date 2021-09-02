import React from 'react';


export default function ReaderHeader(props) {

    const doSwitchMode = (mode) => {
        props.doSwitch(mode); 
    }

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

                                
                                     <a 
                                        style={props.mode==='image' && props.has_article? {}: {display: "none"}}
                                        onClick ={() => { doSwitchMode("text") }}
                                        href="#" className="mode-link">
                                          <img width="25" src="/static/images/txtver.jpg" />
                                          Текстовая версия
                                        </a>
                            

                                
                                     <a 
                                        style={props.mode==='text'? {}: {display: "none"}}
                                        onClick ={() => { doSwitchMode("image") }}
                                        href="#" className="mode-link">
                                          <img width="25" src="/static/images/txtver.jpg" />
                                          Постраничная версия
                                        </a>
                                
                                
                            </div>
                        </div>
                        <div className="rd-navbar-main-element">
                            <div className="rd-navbar-nav-wrap">
                                
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </nav>
        </div>
    </header>
    )
}