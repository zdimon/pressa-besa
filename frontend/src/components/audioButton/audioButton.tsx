import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import { Request } from '../../Request';
import Snackbar from '@material-ui/core/Snackbar';
import { useTranslation } from 'react-i18next';

export default function AudioButton(props) {

    const req = new Request();
    const [is_audio, setIsAudio] = React.useState(false);
    const [is_listen, setIsListen] = React.useState(false);
    const { t, i18n } = useTranslation();
    
    const listen = () => {
        console.log(props.id);
        setIsListen(true);
        setIsAudio(false);
    }

    useEffect(() => {
        req.post(`${props.type}/info`,{id: props.id})
          .then((payload) => {
            setIsAudio(payload.audio_converted);
          }).catch((err) => { 
          });
        }, [props.id]);
  
  return (
      <>
    {is_audio? 
        <a 
        href="#"
        onClick={listen}
        className="button button-primary audio-button">
         {t('m_listentoaudio')}
         </a>
        :
        <></>
    
    }
    {is_listen? 
        <video 
          controls
          autoPlay={true} 
          name="media">
              <source 
              src={`/static/audio/${props.type}-${props.id}.ogg`}  type="audio/ogg" />
              </video>
        :
        <></>
    }
    </>
  )
}