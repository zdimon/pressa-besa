import Masonry from 'react-masonry-css';
import './MasonryGrid.css';
export default function MasonryGrid(props) {
  var container = document.getElementById(props.selector);
  console.log(container);
  var matches = container.querySelectorAll("img");
  var matchesArr = Array.prototype.slice.call(matches);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
return (
    <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
      {matchesArr.map((item,index) =>
        <div className="thumbnail-classic">
          <div className="thumbnail-classic__media">
              <a href={item.getAttribute('data-url')}>
                  <img src={item.getAttribute('src')} alt="" />
              </a>
              
          </div>

          <div className="thumbnail-modern__body">
            <div className="thumbnail-modern__body-title">
                <a href={item.getAttribute('data-url')}>
                  {item.getAttribute('data-journal-name')}
                </a>
            </div>
            <div className="thumbnail-modern__body-caption">№ {item.getAttribute('data-issue-name')}</div>
          </div>
        
          <a href={item.getAttribute('data-url')} className="thumbnail-classic__body">
              {item.getAttribute('alt')}
          </a>
          
        </div>

      )}
    </Masonry>
)}

/*
<div className="thumbnail-classic__footer">
               
          </div>
*/