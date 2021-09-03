import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';
import ReaderHeader from './ReaderHeader';
import ImageReader from './ImageReader';
import TextReader from './TextReader';
import IssueList from './IssueList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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
        <Router>
        <ReaderHeader issueId={props.issueId} doSwitch={switchMode}  mode={mode} has_article={has_article}> </ReaderHeader>
        
       
          <Switch>
            <Route name="image" path="/image-reader/:issue_id">
            <ImageReader isPaid={is_paid} issueId={props.issueId}></ImageReader>
            </Route>
            <Route name="text" path="/text-reader/:issue_id">
            <TextReader isPaid={is_paid} issueId={props.issueId}></TextReader>
            </Route>
            <Route name="list" path="/list-reader/:issue_id">
              <IssueList />
            </Route>
          </Switch>
        </Router>

      </>
    )
}