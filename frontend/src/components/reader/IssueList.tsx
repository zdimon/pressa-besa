import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';


export default function IssueList(props) {
  const [issues, setIssues] = React.useState([]);
  const req = new Request();


  useEffect(() => {

    
    // req.post('reader/settings',{issue_id: props.issueId})
    //   .then((payload) => {
    //     setHasArticle(payload.has_articles);
    //     setIsPaid(payload.is_paid)
    //   }).catch((err) => { 
    //   });
    }, []);

  

    return (
      <> 
        <p>Issue list</p>

      </>
    )
}