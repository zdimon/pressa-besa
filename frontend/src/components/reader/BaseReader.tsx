import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';
import ReaderHeader from './ReaderHeader';
import ImageReader from './ImageReader';
import TextReader from './TextReader';


export default function BaseReader(props) {
  const [mode, setMode] = React.useState('image');
  
  const switchMode = (mode) => {
    setMode(mode);
  }

    return (
      <> 
        <ReaderHeader doSwitch={switchMode} mode={mode}> </ReaderHeader>
        {
          mode === 'image'?
          <ImageReader issueId={props.issueId}></ImageReader>:
          <TextReader issueId={props.issueId}></TextReader>
        }
        
      </>
    )
}