import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';
import ReaderHeader from './ReaderHeader';
import ImageReader from './ImageReader';
import TextReader from './TextReader';


export default function BaseReader(props) {
  const [mode, setMode] = React.useState('image');
  const [has_article, setHasArticle] = React.useState(false);
  const [is_paid, setIsPaid] = React.useState(false);
  const req = new Request();


  useEffect(() => {

    
    req.post('reader/settings',{issue_id: props.issueId})
      .then((payload) => {
        setHasArticle(payload.has_articles);
        setIsPaid(payload.is_paid)
      }).catch((err) => { 
      });
    }, []);

  const switchMode = (mode) => {
    setMode(mode);
  }

    return (
      <> 
        <ReaderHeader doSwitch={switchMode} mode={mode} has_article={has_article}> </ReaderHeader>
        {
          mode === 'image'?
          <ImageReader isPaid={is_paid} issueId={props.issueId}></ImageReader>:
          <TextReader isPaid={is_paid} issueId={props.issueId}></TextReader>
        }
        
      </>
    )
}