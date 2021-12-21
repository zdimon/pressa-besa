import Masonry from 'react-masonry-css';
import React, { useState, useEffect, useRef } from 'react';
import { Request } from '../../Request';
import './MasonryGrid.css';
import InfiniteScroll from 'react-infinite-scroller';

export default function MasonryGrid(props) {
  const req = new Request();
  var container = document.getElementById(props.selector);
  var matches = container.querySelectorAll("img");
  var matchesArr = Array.prototype.slice.call(matches);
  const [page, setPage] = React.useState(1);
  const [articles, setArticles] = React.useState([]);

  useEffect(() => {
   
    req.get(`article/?page=${page}`)
    .then((payload) => {
      setArticles(payload.results);
    }).catch((err) => { 
    });   
    
  },[])

  const loadArticles = () => {
    
    req.get(`article/?page=${page}`)
    .then((payload) => {
      
      setArticles([...articles,...payload.results]);
      console.log(articles);
      setPage(page+1);
    }).catch((err) => { 
    });
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
return (

  <InfiniteScroll
  pageStart={0}
  loadMore={loadArticles}
  hasMore={true}
  initialLoad={false}
  loader={<div className="loader" key={0}>Loading ...</div>}
>
    <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">



      {articles.map((item,index) =>
        <div className="thumbnail-classic">
          <div className="thumbnail-classic__media">
              <a href="#">
                  <img src={item.cover_url} alt="" />
              </a>
              
          </div>

          <div className="thumbnail-modern__body">
            <div className="thumbnail-modern__body-title">
                <a href="">
                  {item.title}
                </a>
            </div>
            <div className="thumbnail-modern__body-caption">
              № {item.issue_number}
            </div>
          </div>
        
          <a href="" className="thumbnail-classic__body">
              { item.short_text }
          </a>
          
        </div>

      )}

    

  </Masonry>
  </InfiniteScroll>
)}

/*
<div className="thumbnail-classic__footer">
               
          </div>
*/