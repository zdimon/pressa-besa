import * as React from "react";
import { render } from "react-dom";
import UserMenu from './components/account/UserMenu';
import Carousel from './components/Carousel/Carousel';
import MasonryGrid from './components/Masonry/MasonryGrid';
import TagSlider from './components/Carousel/TagSlider';
import IssueSlider from './components/Carousel/IssueSlider';
import SubscribeButton from './components/Subscription/SubscribeButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import LangSwitcher from './components/i18n/LangSwitcher';
import AddBookmark from './components/bookmarks/bookmarks';
import ImageReader from './components/reader/ImageReader';
import BuyButton from './components/buyButton/buyButton';


import 'swiper/css/bundle'

// swiper core styles
import 'swiper/css'

// modules styles
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import TextReader from './components/reader/TextReader';
import BaseReader from './components/reader/BaseReader';




// Login forms
const loginEls = document.getElementsByClassName("userMenu");
[].forEach.call(loginEls, function (el) {
    render(<UserMenu />, el )
});
/////////////


/// journal slider

const carouselEl = document.getElementById("popJournalsSlider");
if(carouselEl) render(<Carousel selector="JSpopJournalsItems" />, carouselEl); 


const masonryEl = document.getElementById("masonryGrid");
if(masonryEl) render(<MasonryGrid selector="masonryItems" />, masonryEl)

/// tag slider
const tagSliderEl = document.getElementById("tagSlider");
console.log(tagSliderEl);
if(tagSliderEl) render(<TagSlider selector="tagSliderItems" />, tagSliderEl)

/// issue slider
const issueSliderEl = document.getElementById("issueSlider");
if(issueSliderEl) render(<IssueSlider selector="JSIssueItems" />, issueSliderEl)

// subscription
const buttonEls = document.getElementsByClassName("js-subscribe-button");
[].forEach.call(buttonEls, function (el) {
    render(<SubscribeButton />, el )
});
/////////////////

 
// lang switcher
const swEls = document.getElementsByClassName("js-lang-switcher");
[].forEach.call(swEls, function (el) {
    render(<LangSwitcher selector={el.getAttribute("data-lang")}/>, el)
}); 
 
/////////////////


// bookmarks
const bmEls = document.getElementsByClassName("js-bookmark");
[].forEach.call(bmEls, function (el) {
    render(<AddBookmark  
        issueId={el.getAttribute('data-issue')} 
        page={el.getAttribute('data-page')} 
        />, el)
}); 
 
/////////////////

/// base reader
const baseReaderEl = document.getElementById("js-base-reader");
if(baseReaderEl) render(<BaseReader issueId={baseReaderEl.getAttribute('data-issue-id')}/>, baseReaderEl)


/// image reader
const readerEl = document.getElementById("js-image-reader");
if(readerEl) render(<ImageReader issueId={readerEl.getAttribute('data-issue-id')}/>, readerEl)


/// text reader
const txtreaderEl = document.getElementById("js-text-reader");
if(txtreaderEl) render(<TextReader issueId={txtreaderEl.getAttribute('data-issue-id')}/>, txtreaderEl)


/// buy button
const bbtnEl = document.getElementById("js-buy-button");
if(bbtnEl) render(<BuyButton />, bbtnEl)