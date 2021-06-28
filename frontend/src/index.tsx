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

const loginEl = document.getElementById("userMenu");
if(loginEl) render(<UserMenu />, loginEl);

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
const sw = document.getElementById("js-lang-switcher");
if(sw) render(<LangSwitcher selector={sw.getAttribute("data-lang")}/>, sw)
 
/////////////////


