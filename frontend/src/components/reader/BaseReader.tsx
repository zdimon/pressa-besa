import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';
import ReaderHeader from './ReaderHeader';
import ImageReader from './ImageReader';
import TextReader from './TextReader';
import IssueList from './IssueList';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



import { useTranslation } from 'react-i18next';




export default function BaseReader(props) {

  const [has_article, setHasArticle] = React.useState(false);
  const [is_paid, setIsPaid] = React.useState(false);
  const [issueId, setIssueId] = React.useState(props.issueId);
  const [settings, setSettings] = React.useState({});
  const req = new Request();
  const { t, i18n }  = useTranslation();

  const changeIssue = (issueId) => {
    setIssueId(issueId);
  }

  const markIsPaid = () => {
    setIsPaid(true)
  }

  useEffect(() => {

    
    req.post('reader/settings',{issue_id: props.issueId})
      .then((payload) => {
        setHasArticle(payload.has_articles);
        setIsPaid(payload.is_paid);
        setSettings(payload);
      }).catch((err) => { 
      });
    }, []);


    return (
      <> 
        <Router>
        <ReaderHeader issueId={props.issueId} has_article={has_article}> </ReaderHeader>
        
       
          <Switch>
            <Route name="image" path="/image-reader/:issue_id">
              <ImageReader 
                handleIsPaid={markIsPaid} 
                isPaid={is_paid} 
                settings={settings}
                issueId={props.issueId}>
              </ImageReader>
            </Route>
            <Route name="text" path="/text-reader/:issue_id">
              <TextReader 
              handleIsPaid={markIsPaid}
              isPaid={is_paid} 
              issueId={issueId}
              settings={settings}
              changeIssue={changeIssue}
              ></TextReader>
            </Route>
            <Route name="list" path="/list-reader/:issue_id">
              <IssueList 
                issueId={issueId}              
                handleIsPaid={markIsPaid}
                isPaid={is_paid} />
            </Route>
          </Switch>
        </Router>

      </>
    )
}