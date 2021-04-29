import Masonry from 'react-masonry-css';
import './MasonryGrid.css';
export default function MasonryGrid(props) {
  var container = document.getElementById(props.selector);
  console.log(container);
  var matches = container.querySelectorAll("img");
  var matchesArr = Array.prototype.slice.call(matches);
return (
    <Masonry
    breakpointCols={3}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
      {matchesArr.map((item,index) =>
        <div className="thumbnail-classic">
          <div className="thumbnail-classic__media">
              <a href="{{ item.get_absolute_url }}">
                  <img src={item.getAttribute('src')} alt="" />
              </a>
              <span className="label">ежемесячные</span>
          </div>
          <a href="" className="thumbnail-classic__body">
              
          </a>
          <div className="thumbnail-classic__footer">
               {item.getAttribute('alt')}
          </div>
        </div>

      )}
    </Masonry>
)}