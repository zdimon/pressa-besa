import * as React from "react";
import { render } from "react-dom";
import UserMenu from './components/account/UserMenu';
import Carousel from './components/Carousel/Carousel';
import MasonryGrid from './components/Masonry/MasonryGrid';
import TagSlider from './components/Carousel/TagSlider';
import IssueSlider from './components/Carousel/IssueSlider';

const loginEl = document.getElementById("userMenu");

const carouselEl = document.getElementById("popJournalsSlider");
if(carouselEl) render(<Carousel selector="JSpopJournalsItems" />, carouselEl); 


const masonryEl = document.getElementById("masonryGrid");
if(masonryEl) render(<MasonryGrid selector="masonryItems" />, masonryEl)

/// tag slider
const tagSliderEl = document.getElementById("tagSlider");
if(tagSliderEl) render(<TagSlider selector="tagSliderItems" />, tagSliderEl)

/// issue slider
const issueSliderEl = document.getElementById("issueSlider");
if(issueSliderEl) render(<IssueSlider selector="JSIssueItems" />, issueSliderEl)


render(<UserMenu />, loginEl);
