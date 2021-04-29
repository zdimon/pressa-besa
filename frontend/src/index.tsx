import * as React from "react";
import { render } from "react-dom";
import UserMenu from './components/account/UserMenu';
import Carousel from './components/Carousel/Carousel';
import MasonryGrid from './components/Masonry/MasonryGrid';

const loginEl = document.getElementById("userMenu");

const carouselEl = document.getElementById("carousel");

// if(carouselEl) render(<Carousel selector="popular-jounals" />, carouselEl); 
const masonryEl = document.getElementById("masonryGrid");
if(masonryEl) render(<MasonryGrid selector="masonryItems" />, masonryEl)

render(<UserMenu />, loginEl);
