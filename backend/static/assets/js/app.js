(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var plugins = {
    rdNavbar: $('.rd-navbar')
  };

  if (plugins.rdNavbar.length) {
    plugins.rdNavbar.RDNavbar({
      stickUpClone: plugins.rdNavbar.attr("data-stick-up-clone") ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false
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
      prevEl: '.slider-nav-prev'
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
        slidesPerView: 1
      },
      350: {
        spaceBetween: -50,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 1
      },
      360: {
        spaceBetween: -60,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 1
      },
      370: {
        spaceBetween: -70,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 1
      },
      380: {
        spaceBetween: -80,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 1
      },
      400: {
        spaceBetween: -100,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 1
      },
      410: {
        spaceBetween: -110,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 1
      },
      420: {
        spaceBetween: -120,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 1
      },
      430: {
        spaceBetween: -130,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 1
      },
      440: {
        spaceBetween: -140,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 1
      },
      450: {
        spaceBetween: -150,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        slidesPerView: 2
      },
      460: {
        spaceBetween: -160,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        slidesPerView: 2
      },
      470: {
        spaceBetween: -170,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 2
      },
      480: {
        spaceBetween: -180,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 2
      },
      490: {
        spaceBetween: -190,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true,
        slidesPerView: 2
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
      520: _defineProperty({
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false
      }, "slidesPerView", 2),
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });
  var swiperArticles = new Swiper('.swiper-popular-articles', {
    spaceBetween: 20,
    freeMode: true,
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    loop: false,
    navigation: {
      nextEl: '.slider-articles-nav-next',
      prevEl: '.slider-articles-nav-prev'
    },
    breakpoints: {
      320: {
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true
      },
      340: {
        spaceBetween: -10
      },
      350: {
        spaceBetween: -20
      },
      360: {
        spaceBetween: -30
      },
      370: {
        spaceBetween: -40
      },
      380: {
        spaceBetween: -50
      },
      400: {
        spaceBetween: -60
      },
      410: {
        spaceBetween: -70
      },
      420: {
        spaceBetween: -80
      },
      430: {
        spaceBetween: -90
      },
      440: {
        spaceBetween: -100
      },
      450: {
        spaceBetween: -120
      },
      460: {
        spaceBetween: -130
      },
      470: {
        spaceBetween: -140
      },
      480: {
        spaceBetween: -150
      },
      490: {
        spaceBetween: -160
      },
      500: {
        spaceBetween: -170
      },
      510: {
        spaceBetween: -180
      },
      520: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
  var swiperNewArticles = new Swiper('.swiper-new-articles', {
    freeMode: true,
    slidesPerView: 1,
    autoplay: {
      delay: 4300,
      disableOnInteraction: false
    },
    loop: false,
    navigation: {
      nextEl: '.slider-new-nav-next',
      prevEl: '.slider-new-nav-prev'
    },
    breakpoints: {
      320: {
        spaceBetween: -30,
        slidesPerView: 1,
        centeredSlides: true
      },
      340: {
        spaceBetween: -40
      },
      350: {
        spaceBetween: -50
      },
      360: {
        spaceBetween: -60
      },
      370: {
        spaceBetween: -70
      },
      380: {
        spaceBetween: -80
      },
      400: {
        spaceBetween: -100
      },
      410: {
        spaceBetween: -110
      },
      420: {
        spaceBetween: -120
      },
      430: {
        spaceBetween: -130
      },
      440: {
        spaceBetween: -140
      },
      450: {
        spaceBetween: -150
      },
      460: {
        spaceBetween: -160
      },
      470: {
        spaceBetween: -170
      },
      480: {
        spaceBetween: -180
      },
      490: {
        spaceBetween: -190
      },
      500: {
        spaceBetween: -200
      },
      510: {
        spaceBetween: -210
      },
      520: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false
      },
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });
})();

$('#js-select-lang').on('change', function () {
  console.log('ddd');
});

},{}],2:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

document.addEventListener('DOMContentLoaded', function () {
  Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./inits'));
  });
});

},{"./inits":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9pbml0cy5qcyIsImpzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQUNDLGFBQVk7QUFDWixNQUNDLE9BQU8sR0FBRztBQUNULElBQUEsUUFBUSxFQUFFLENBQUMsQ0FBQyxZQUFEO0FBREYsR0FEWDs7QUFLQyxNQUFJLE9BQU8sQ0FBQyxRQUFSLENBQWlCLE1BQXJCLEVBQTZCO0FBQzdCLElBQUEsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsUUFBakIsQ0FBMEI7QUFDekIsTUFBQSxZQUFZLEVBQUcsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsSUFBakIsQ0FBc0IscUJBQXRCLENBQUQsR0FBaUQsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsSUFBakIsQ0FBc0IscUJBQXRCLE1BQWlELE1BQWxHLEdBQTJHO0FBRGhHLEtBQTFCO0FBR0E7O0FBS0QsTUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFKLENBQVcsc0JBQVgsRUFBbUM7QUFDL0MsSUFBQSxhQUFhLEVBQUUsQ0FEZ0M7QUFFL0MsSUFBQSxjQUFjLEVBQUUsSUFGK0I7QUFHL0MsSUFBQSxjQUFjLEVBQUUsSUFIK0I7QUFJL0MsSUFBQSxvQkFBb0IsRUFBRSxJQUp5QjtBQUsvQyxJQUFBLFFBQVEsRUFBRSxJQUxxQztBQU0vQztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUEsSUFBSSxFQUFFLElBVnlDO0FBVy9DLElBQUEsVUFBVSxFQUFFO0FBQ1gsTUFBQSxNQUFNLEVBQUUsa0JBREc7QUFFWCxNQUFBLE1BQU0sRUFBRTtBQUZHLEtBWG1DO0FBZS9DLElBQUEsV0FBVyxFQUFFO0FBQ1osV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUMsRUFEWDtBQUVKLFFBQUEsYUFBYSxFQUFFLENBRlg7QUFHSixRQUFBLGNBQWMsRUFBRSxJQUhaO0FBSUosUUFBQSxjQUFjLEVBQUUsSUFKWjtBQUtKLFFBQUEsb0JBQW9C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UixDQUFZLEtBQVo7QUFDQSxDQUZEOzs7QUN4WkE7Ozs7Ozs7O0FBRUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3ZEO0FBQUEsMkNBQU8sU0FBUDtBQUFBO0FBQ0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uICgpIHtcblx0bGV0XG5cdFx0cGx1Z2lucyA9IHtcblx0XHRcdHJkTmF2YmFyOiAkKCcucmQtbmF2YmFyJyksXG5cdFx0fTtcblx0XG5cdFx0aWYgKHBsdWdpbnMucmROYXZiYXIubGVuZ3RoKSB7XG5cdFx0cGx1Z2lucy5yZE5hdmJhci5SRE5hdmJhcih7XG5cdFx0XHRzdGlja1VwQ2xvbmU6IChwbHVnaW5zLnJkTmF2YmFyLmF0dHIoXCJkYXRhLXN0aWNrLXVwLWNsb25lXCIpKSA/IHBsdWdpbnMucmROYXZiYXIuYXR0cihcImRhdGEtc3RpY2stdXAtY2xvbmVcIikgPT09ICd0cnVlJyA6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cdCAgICAgIFxuXHRcblxuXHRcblx0dmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItcG9wdWxhci1uZXdzJywge1xuXHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0Ly8gYXV0b3BsYXk6IHtcblx0XHQvLyBcdGRlbGF5OiA0NzAwLFxuXHRcdC8vIFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxuXHRcdC8vIH0sXG5cdFx0bG9vcDogdHJ1ZSxcblx0XHRuYXZpZ2F0aW9uOiB7XG5cdFx0XHRuZXh0RWw6ICcuc2xpZGVyLW5hdi1uZXh0Jyxcblx0XHRcdHByZXZFbDogJy5zbGlkZXItbmF2LXByZXYnLFxuXHRcdH0sXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDMyMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0zMCxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0MzQwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTQwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdH0sXG5cdFx0XHQzNTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtNTAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxuXHRcdFx0fSxcblx0XHRcdDM2MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC02MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0XHR9LFxuXHRcdFx0MzcwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTcwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0MzgwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTgwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdH0sXG5cdFx0XHQ0MDA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTAwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdH0sXG5cdFx0XHQ0MTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTEwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdH0sXG5cdFx0XHQ0MjA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTIwLCAgIFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ0MzA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTMwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ0MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNDAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ1MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNTAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDYwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE2MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcblxuXHRcdFx0fSxcblx0XHRcdDQ3MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNzAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDgwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE4MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDkwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE5MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NTAwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTIwMCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDJcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ1MTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMjEwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMlx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUyMDoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDJcblx0XHRcdH0sXG5cdFx0XHQ3Njg6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcblx0XHRcdH0sXG5cdFx0XHQ5OTI6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcblx0XHRcdH0sXG5cdFx0XHQxMjAwOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDUsXG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0pO1xuXG5cdFxuXHR2YXIgc3dpcGVyQXJ0aWNsZXMgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLXBvcHVsYXItYXJ0aWNsZXMnLCB7XG5cdFx0c3BhY2VCZXR3ZWVuOiAyMCxcblx0XHRmcmVlTW9kZTogdHJ1ZSxcblx0XHRzbGlkZXNQZXJWaWV3OiAxLFxuXHRcdGF1dG9wbGF5OiB7XG5cdFx0XHRkZWxheTogNDAwMCxcblx0XHRcdGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcblx0XHR9LFxuXHRcdGxvb3A6IGZhbHNlLFxuXHRcdG5hdmlnYXRpb246IHtcblx0XHRcdG5leHRFbDogJy5zbGlkZXItYXJ0aWNsZXMtbmF2LW5leHQnLFxuXHRcdFx0cHJldkVsOiAnLnNsaWRlci1hcnRpY2xlcy1uYXYtcHJldicsXG5cdFx0fSxcblx0XHRicmVha3BvaW50czoge1xuXHRcdFx0MzIwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogMCxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0MzQwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTEwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQzNTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDM2MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0zMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0MzcwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTQwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQzODA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtNTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQwMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC02MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDEwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTcwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ0MjA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtODAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQzMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC05MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDQwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTEwMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDUwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTEyMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDYwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTEzMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDcwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE0MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDgwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE1MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDkwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE2MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NTAwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE3MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NTEwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE4MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NTIwOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHQ3Njg6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcblx0XHRcdH0sXG5cdFx0XHQ5OTI6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcblx0XHRcdH0sXG5cdFx0XHQxMjAwOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDQsXG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0pO1xuXHRcblx0XG5cdHZhciBzd2lwZXJOZXdBcnRpY2xlcyA9IG5ldyBTd2lwZXIoJy5zd2lwZXItbmV3LWFydGljbGVzJywge1xuXHRcdGZyZWVNb2RlOiB0cnVlLFxuXHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0YXV0b3BsYXk6IHtcblx0XHRcdGRlbGF5OiA0MzAwLFxuXHRcdFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLCBcblx0XHR9LCBcblx0XHRsb29wOiBmYWxzZSxcblx0XHRuYXZpZ2F0aW9uOiB7XG5cdFx0XHRuZXh0RWw6ICcuc2xpZGVyLW5ldy1uYXYtbmV4dCcsXG5cdFx0XHRwcmV2RWw6ICcuc2xpZGVyLW5ldy1uYXYtcHJldicsXG5cdFx0fSxcblx0XHRicmVha3BvaW50czoge1xuXHRcdFx0MzIwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTMwLFxuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHQzNDA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtNDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDM1MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC01MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0MzYwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTYwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQzNzA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtNzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDM4MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC04MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDAwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTEwMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDEwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTExMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDIwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTEyMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDMwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTEzMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDQwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE0MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDUwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE1MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDYwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE2MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDcwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE3MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDgwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE4MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDkwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE5MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NTAwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTIwMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NTEwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTIxMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NTIwOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHQ3Njg6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcblx0XHRcdH0sXG5cdFx0XHQ5OTI6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcblx0XHRcdH0sXG5cdFx0XHQxMjAwOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDUsXG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0pO1xufSgpKTtcblxuJCgnI2pzLXNlbGVjdC1sYW5nJykub24oJ2NoYW5nZScsKCkgPT4ge1xuXHRjb25zb2xlLmxvZygnZGRkJyk7XG59KSIsIid1c2Ugc3RyaWN0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICBpbXBvcnQoJy4vaW5pdHMnKTtcbn0pOyAgXG5cbiAgICJdfQ==
