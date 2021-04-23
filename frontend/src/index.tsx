import * as React from "react";
import { render } from "react-dom";
import UserMenu from './components/account/UserMenu';
import Carousel from './components/Carousel/Carousel';


const loginEl = document.getElementById("userMenu");

const carouselEl = document.getElementById("carousel");

// if(carouselEl) render(<Carousel selector="popular-jounals" />, carouselEl); 

render(<UserMenu />, loginEl);
