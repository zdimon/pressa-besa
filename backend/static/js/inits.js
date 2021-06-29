"use strict";
(function () {
	let
		plugins = {
			rdNavbar: $('.rd-navbar'),
		};
	
		if (plugins.rdNavbar.length) {
		plugins.rdNavbar.RDNavbar({
			stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone")) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
		});
	}
	      
	

	
	var swiper = new Swiper('.swiper-popular-news', {
		slidesPerView: 1,
		resizeObserver: true,
		observeParents: true,
		observeSlideChildren: true,
		observer: true,
		// autoplay: {
		// 	delay: 4700,
		// 	disableOnInteraction: false,
		// },
		loop: true,
		navigation: {
			nextEl: '.slider-nav-next',
			prevEl: '.slider-nav-prev',
		},
		breakpoints: {
			320: {
				spaceBetween: -30,
				slidesPerView: 1,
				centeredSlides: true,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true
			},
			340: {
				spaceBetween: -40,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 1,
			},
			350: {
				spaceBetween: -50,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 1,
			},
			360: {
				spaceBetween: -60,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 1,
			},
			370: {
				spaceBetween: -70,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 1,
				
			},
			380: {
				spaceBetween: -80,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 1,
			},
			400: {
				spaceBetween: -100,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 1,
			},
			410: {
				spaceBetween: -110,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 1,
			},
			420: {
				spaceBetween: -120,   
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 1,			
			},
			430: {
				spaceBetween: -130,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 1,				
			},
			440: {
				spaceBetween: -140,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 1,			
			},
			450: {
				spaceBetween: -150,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				slidesPerView: 2,			
			},
			460: {
				spaceBetween: -160,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				slidesPerView: 2,

			},
			470: {
				spaceBetween: -170,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 2,				
			},
			480: {
				spaceBetween: -180,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 2,			
			},
			490: {
				spaceBetween: -190,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 2,			
			},
			500: {
				spaceBetween: -200,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 2			
			},
			510: {
				spaceBetween: -210,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				resizeObserver: true,
				slidesPerView: 2			
			},
			520: {
				slidesPerView: 2,
				spaceBetween: 20,
				centeredSlides: false,
				slidesPerView: 2
			},
			768: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 5,
				spaceBetween: 20,
			},
		},
	});

	
	var swiperArticles = new Swiper('.swiper-popular-articles', {
		spaceBetween: 20,
		freeMode: true,
		slidesPerView: 1,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		loop: false,
		navigation: {
			nextEl: '.slider-articles-nav-next',
			prevEl: '.slider-articles-nav-prev',
		},
		breakpoints: {
			320: {
				spaceBetween: 0,
				slidesPerView: 1,
				centeredSlides: true,
			},
			340: {
				spaceBetween: -10,
				
			},
			350: {
				spaceBetween: -20,
				
			},
			360: {
				spaceBetween: -30,
				
			},
			370: {
				spaceBetween: -40,
				
			},
			380: {
				spaceBetween: -50,
				
			},
			400: {
				spaceBetween: -60,
				
			},
			410: {
				spaceBetween: -70,
				
			},
			420: {
				spaceBetween: -80,
				
			},
			430: {
				spaceBetween: -90,
				
			},
			440: {
				spaceBetween: -100,
				
			},
			450: {
				spaceBetween: -120,
				
			},
			460: {
				spaceBetween: -130,
				
			},
			470: {
				spaceBetween: -140,
				
			},
			480: {
				spaceBetween: -150,
				
			},
			490: {
				spaceBetween: -160,
				
			},
			500: {
				spaceBetween: -170,
				
			},
			510: {
				spaceBetween: -180,
				
			},
			520: {
				slidesPerView: 2,
				spaceBetween: 20,
				centeredSlides: false,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},
	});
	
	
	var swiperNewArticles = new Swiper('.swiper-new-articles', {
		freeMode: true,
		slidesPerView: 1,
		autoplay: {
			delay: 4300,
			disableOnInteraction: false, 
		}, 
		loop: false,
		navigation: {
			nextEl: '.slider-new-nav-next',
			prevEl: '.slider-new-nav-prev',
		},
		breakpoints: {
			320: {
				spaceBetween: -30,
				slidesPerView: 1,
				centeredSlides: true,
			},
			340: {
				spaceBetween: -40,
				
			},
			350: {
				spaceBetween: -50,
				
			},
			360: {
				spaceBetween: -60,
				
			},
			370: {
				spaceBetween: -70,
				
			},
			380: {
				spaceBetween: -80,
				
			},
			400: {
				spaceBetween: -100,
				
			},
			410: {
				spaceBetween: -110,
				
			},
			420: {
				spaceBetween: -120,
				
			},
			430: {
				spaceBetween: -130,
				
			},
			440: {
				spaceBetween: -140,
				
			},
			450: {
				spaceBetween: -150,
				
			},
			460: {
				spaceBetween: -160,
				
			},
			470: {
				spaceBetween: -170,
				
			},
			480: {
				spaceBetween: -180,
				
			},
			490: {
				spaceBetween: -190,
				
			},
			500: {
				spaceBetween: -200,
				
			},
			510: {
				spaceBetween: -210,
				
			},
			520: {
				slidesPerView: 2,
				spaceBetween: 20,
				centeredSlides: false,
			},
			768: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 5,
				spaceBetween: 20,
			},
		},
	});
}());

