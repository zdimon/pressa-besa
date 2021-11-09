import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import { Request } from '../../Request';
import Snackbar from '@material-ui/core/Snackbar';

export default function AudioButton(props) {

    const req = new Request();
    const [is_audio, setIsAudio] = React.useState(false);
    const [is_listen, setIsListen] = React.useState(false);
 
    
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
        }, []);
  
  return (
      <>
    {is_audio? 
        <a 
        href="#"
        onClick={listen}
        className="button button-primary audio-button">
         Слушать аудио
         </a>
        :
        <></>
    
    }
    {is_listen? 
        <video 
          controls
          autoplay 
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