(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

(function () {
  var plugins = {
    rdNavbar: $('.rd-navbar')
  };

  if (plugins.rdNavbar.length) {
    plugins.rdNavbar.RDNavbar({
      stickUpClone: plugins.rdNavbar.attr("data-stick-up-clone") ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false
    });
  }

  $('select.select-custom').each(function () {
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;
    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');
    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }

    var $listItems = $list.children('li');
    $styledSelect.click(function (e) {
      e.stopPropagation();
      $('div.select-styled.active').not(this).each(function () {
        $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
    });
    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
    });
    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });
  });
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
        resizeObserver: true
      },
      350: {
        spaceBetween: -50,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      360: {
        spaceBetween: -60,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      370: {
        spaceBetween: -70,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      380: {
        spaceBetween: -80,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      400: {
        spaceBetween: -100,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      410: {
        spaceBetween: -110,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      420: {
        spaceBetween: -120,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      430: {
        spaceBetween: -130,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      440: {
        spaceBetween: -140,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      450: {
        spaceBetween: -150,
        observeParents: true,
        observeSlideChildren: true,
        observer: true
      },
      460: {
        spaceBetween: -160,
        observeParents: true,
        observeSlideChildren: true,
        observer: true
      },
      470: {
        spaceBetween: -170,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      480: {
        spaceBetween: -180,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      490: {
        spaceBetween: -190,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      500: {
        spaceBetween: -200,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
      },
      510: {
        spaceBetween: -210,
        observeParents: true,
        observeSlideChildren: true,
        observer: true,
        resizeObserver: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9pbml0cy5qcyIsImpzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFDQyxhQUFZO0FBQ1osTUFDQyxPQUFPLEdBQUc7QUFDVCxJQUFBLFFBQVEsRUFBRSxDQUFDLENBQUMsWUFBRDtBQURGLEdBRFg7O0FBS0MsTUFBSSxPQUFPLENBQUMsUUFBUixDQUFpQixNQUFyQixFQUE2QjtBQUM3QixJQUFBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLFFBQWpCLENBQTBCO0FBQ3pCLE1BQUEsWUFBWSxFQUFHLE9BQU8sQ0FBQyxRQUFSLENBQWlCLElBQWpCLENBQXNCLHFCQUF0QixDQUFELEdBQWlELE9BQU8sQ0FBQyxRQUFSLENBQWlCLElBQWpCLENBQXNCLHFCQUF0QixNQUFpRCxNQUFsRyxHQUEyRztBQURoRyxLQUExQjtBQUdBOztBQUdELEVBQUEsQ0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEIsSUFBMUIsQ0FBK0IsWUFBVTtBQUN4QyxRQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBRCxDQUFiO0FBQUEsUUFBcUIsZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxRQUFSLENBQWlCLFFBQWpCLEVBQTJCLE1BQWxFO0FBRUEsSUFBQSxLQUFLLENBQUMsUUFBTixDQUFlLGVBQWY7QUFDQSxJQUFBLEtBQUssQ0FBQyxJQUFOLENBQVcsNEJBQVg7QUFDQSxJQUFBLEtBQUssQ0FBQyxLQUFOLENBQVksbUNBQVo7QUFFQSxRQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsSUFBTixDQUFXLG1CQUFYLENBQXBCO0FBQ0EsSUFBQSxhQUFhLENBQUMsSUFBZCxDQUFtQixLQUFLLENBQUMsUUFBTixDQUFlLFFBQWYsRUFBeUIsRUFBekIsQ0FBNEIsQ0FBNUIsRUFBK0IsSUFBL0IsRUFBbkI7QUFFQSxRQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBRCxF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O0FBR0osUUFBQSxjQUFjLEVBQUU7QUFIWixPQTFFTztBQStFWixXQUFLO0FBQ0osUUFBQSxhQUFhLEVBQUU7QUFEWCxPQS9FTztBQWtGWixXQUFLO0FBQ0osUUFBQSxhQUFhLEVBQUU7QUFEWCxPQWxGTztBQXFGWixZQUFNO0FBQ0wsUUFBQSxhQUFhLEVBQUUsQ0FEVjtBQUVMLFFBQUEsWUFBWSxFQUFFO0FBRlQ7QUFyRk07QUFaNkMsR0FBbkMsQ0FBeEI7QUF1R0EsQ0E1YUEsR0FBRDs7O0FDREE7Ozs7Ozs7O0FBRUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3ZEO0FBQUEsMkNBQU8sU0FBUDtBQUFBO0FBQ0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uICgpIHtcblx0bGV0XG5cdFx0cGx1Z2lucyA9IHtcblx0XHRcdHJkTmF2YmFyOiAkKCcucmQtbmF2YmFyJyksXG5cdFx0fTtcblx0XG5cdFx0aWYgKHBsdWdpbnMucmROYXZiYXIubGVuZ3RoKSB7XG5cdFx0cGx1Z2lucy5yZE5hdmJhci5SRE5hdmJhcih7XG5cdFx0XHRzdGlja1VwQ2xvbmU6IChwbHVnaW5zLnJkTmF2YmFyLmF0dHIoXCJkYXRhLXN0aWNrLXVwLWNsb25lXCIpKSA/IHBsdWdpbnMucmROYXZiYXIuYXR0cihcImRhdGEtc3RpY2stdXAtY2xvbmVcIikgPT09ICd0cnVlJyA6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cdCAgXG5cdFxuXHQkKCdzZWxlY3Quc2VsZWN0LWN1c3RvbScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLCBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGg7XG5cdFx0XG5cdFx0JHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcblx0XHQkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwic2VsZWN0XCI+PC9kaXY+Jyk7XG5cdFx0JHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCI+PC9kaXY+Jyk7XG5cdFx0XG5cdFx0dmFyICRzdHlsZWRTZWxlY3QgPSAkdGhpcy5uZXh0KCdkaXYuc2VsZWN0LXN0eWxlZCcpO1xuXHRcdCRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoMCkudGV4dCgpKTtcblx0XHRcblx0XHR2YXIgJGxpc3QgPSAkKCc8dWwgLz4nLCB7XG5cdFx0XHQnY2xhc3MnOiAnc2VsZWN0LW9wdGlvbnMnXG5cdFx0fSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cdFx0XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuXHRcdFx0JCgnPGxpIC8+Jywge1xuXHRcdFx0XHR0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxuXHRcdFx0XHRyZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxuXHRcdFx0fSkuYXBwZW5kVG8oJGxpc3QpO1xuXHRcdH1cblx0XHRcblx0XHRsZXQgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xuXHRcdFxuXHRcdCRzdHlsZWRTZWxlY3QuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdCQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykuaGlkZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLnRvZ2dsZSgpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdCRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdCRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xuXHRcdFx0JGxpc3QuaGlkZSgpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdCQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0JHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkbGlzdC5oaWRlKCk7XG5cdFx0fSk7XG5cdH0pO1xuXHRcblx0dmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItcG9wdWxhci1uZXdzJywge1xuXHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0Ly8gYXV0b3BsYXk6IHtcblx0XHQvLyBcdGRlbGF5OiA0NzAwLFxuXHRcdC8vIFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxuXHRcdC8vIH0sXG5cdFx0bG9vcDogdHJ1ZSxcblx0XHRuYXZpZ2F0aW9uOiB7XG5cdFx0XHRuZXh0RWw6ICcuc2xpZGVyLW5hdi1uZXh0Jyxcblx0XHRcdHByZXZFbDogJy5zbGlkZXItbmF2LXByZXYnLFxuXHRcdH0sXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDMyMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0zMCxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0MzQwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTQwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdDM1MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC01MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWVcblx0XHRcdH0sXG5cdFx0XHQzNjA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtNjAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0MzcwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTcwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZVxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQzODA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtODAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0NDAwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTEwMCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWVcblx0XHRcdH0sXG5cdFx0XHQ0MTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTEwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdDQyMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMjAsICAgXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDMwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTEzMCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWVcdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ0MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNDAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDUwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE1MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ2MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNjAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ0NzA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTcwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZVx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDgwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE4MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWVcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ0OTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTkwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZVx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUwMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0yMDAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NTEwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTIxMCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWVcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ1MjA6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAyMCxcblx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdDc2ODoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxuXHRcdFx0fSxcblx0XHRcdDk5Mjoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxuXHRcdFx0fSxcblx0XHRcdDEyMDA6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogNSxcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAyMCxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSk7XG5cdFxuXHRcblx0dmFyIHN3aXBlckFydGljbGVzID0gbmV3IFN3aXBlcignLnN3aXBlci1wb3B1bGFyLWFydGljbGVzJywge1xuXHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0ZnJlZU1vZGU6IHRydWUsXG5cdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRhdXRvcGxheToge1xuXHRcdFx0ZGVsYXk6IDQwMDAsXG5cdFx0XHRkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXG5cdFx0fSxcblx0XHRsb29wOiBmYWxzZSxcblx0XHRuYXZpZ2F0aW9uOiB7XG5cdFx0XHRuZXh0RWw6ICcuc2xpZGVyLWFydGljbGVzLW5hdi1uZXh0Jyxcblx0XHRcdHByZXZFbDogJy5zbGlkZXItYXJ0aWNsZXMtbmF2LXByZXYnLFxuXHRcdH0sXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDMyMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IDAsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdDM0MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0MzUwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTIwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQzNjA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDM3MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC00MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0MzgwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTUwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ0MDA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtNjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQxMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC03MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDIwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTgwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ0MzA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtOTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ0MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ1MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ2MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ3MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ4MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ5MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUwMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUxMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xODAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUyMDoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0NzY4OiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXG5cdFx0XHR9LFxuXHRcdFx0OTkyOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHR9LFxuXHRcdFx0MTIwMDoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA0LFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcblx0XG5cdFxuXHR2YXIgc3dpcGVyTmV3QXJ0aWNsZXMgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLW5ldy1hcnRpY2xlcycsIHtcblx0XHRmcmVlTW9kZTogdHJ1ZSxcblx0XHRzbGlkZXNQZXJWaWV3OiAxLFxuXHRcdGF1dG9wbGF5OiB7XG5cdFx0XHRkZWxheTogNDMwMCxcblx0XHRcdGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSwgXG5cdFx0fSwgXG5cdFx0bG9vcDogZmFsc2UsXG5cdFx0bmF2aWdhdGlvbjoge1xuXHRcdFx0bmV4dEVsOiAnLnNsaWRlci1uZXctbmF2LW5leHQnLFxuXHRcdFx0cHJldkVsOiAnLnNsaWRlci1uZXctbmF2LXByZXYnLFxuXHRcdH0sXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDMyMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0zMCxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0MzQwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTQwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQzNTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtNTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDM2MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC02MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0MzcwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTcwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQzODA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtODAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQwMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQxMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQyMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQzMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ0MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ1MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ2MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ3MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ4MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xODAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ5MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xOTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUwMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0yMDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUxMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0yMTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUyMDoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0NzY4OiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHR9LFxuXHRcdFx0OTkyOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHR9LFxuXHRcdFx0MTIwMDoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA1LFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcbn0oKSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIGltcG9ydCgnLi9pbml0cycpO1xufSk7ICBcblxuICAgIl19
