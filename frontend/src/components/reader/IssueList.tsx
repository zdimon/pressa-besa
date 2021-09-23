import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';


export default function IssueList(props) {
  const [pages, setPages] = React.useState([]);
  const req = new Request();


  useEffect(() => {

    
    req.post('reader/pages',{issue_id: props.issueId})
      .then((payload) => {
        setPages(payload.payload);
      }).catch((err) => { 
      });
    }, []);

  

    return (
      <> 
        <section className="section bg-gradient-gray">
          <div className="container position-relative">
            <div className="list-tails">
              <ul>
                {
                  pages.map((el) => 
                    <li><img src={el.file_low} /></li>
                  )
                }
              </ul>
            </div>
          </div>
        </section>
      </>
    )
}