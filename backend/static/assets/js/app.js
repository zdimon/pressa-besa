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
  swiper.on('resize', function () {
    this.update();
    console.log('resizing swiper!!!!');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9pbml0cy5qcyIsImpzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQUNDLGFBQVk7QUFDWixNQUNDLE9BQU8sR0FBRztBQUNULElBQUEsUUFBUSxFQUFFLENBQUMsQ0FBQyxZQUFEO0FBREYsR0FEWDs7QUFLQyxNQUFJLE9BQU8sQ0FBQyxRQUFSLENBQWlCLE1BQXJCLEVBQTZCO0FBQzdCLElBQUEsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsUUFBakIsQ0FBMEI7QUFDekIsTUFBQSxZQUFZLEVBQUcsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsSUFBakIsQ0FBc0IscUJBQXRCLENBQUQsR0FBaUQsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsSUFBakIsQ0FBc0IscUJBQXRCLE1BQWlELE1BQWxHLEdBQTJHO0FBRGhHLEtBQTFCO0FBR0E7O0FBR0QsRUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQixJQUExQixDQUErQixZQUFVO0FBQ3hDLFFBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFELENBQWI7QUFBQSxRQUFxQixlQUFlLEdBQUcsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkIsTUFBbEU7QUFFQSxJQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsZUFBZjtBQUNBLElBQUEsS0FBSyxDQUFDLElBQU4sQ0FBVyw0QkFBWDtBQUNBLElBQUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxtQ0FBWjtBQUVBLFFBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsbUJBQVgsQ0FBcEI7QUFDQSxJQUFBLGFBQWEsQ0FBQyxJQUFkLENBQW1CLEtBQUssQ0FBQyxRQUFOLENBQWUsUUFBZixFQUF5QixFQUF6QixDQUE0QixDQUE1QixFQUErQixJQUEvQixFQUFuQjtBQUVBLFFBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFELEVBQVc7QUFDdkIsZUFBUztBQURjLEtBQVgsQ0FBRCxDQUVULFdBRlMsQ0FFRyxhQUZILENBQVo7O0FBSUEsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxlQUFwQixFQUFxQyxDQUFDLEVBQXRDLEVBQTBDO0FBQ3pDLE1BQUEsQ0FBQyxDQUFDLFFBQUQsRUFBVztBQUNYLFFBQUEsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFOLENBQWUsUUFBZixFQUF5QixFQUF6QixDQUE0QixDQUE1QixFQUErQixJQUEvQixFQURLO0FBRVgsUUFBQSxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQU4sQ0FBZSxRQUFmLEVBQXlCLEVBQXpCLENBQTRCLENBQTVCLEVBQStCLEdBQS9CO0FBRk0sT0FBWCxDQUFELENBR0csUUFISCxDQUdZLEtBSFo7QUFJQTs7QUFFRCxRQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsUUFBTixDQUFlLElBQWYsQ0FBakI7QUFFQSxJQUFBLGFBQWEsQ0FBQyxLQUFkLENBQW9CLFVBQVMsQ0FBVCxFQUFZO0FBQy9CLE1BQUEsQ0FBQyxDQUFDLGVBQUY7QUFDQSxNQUFBLENBQUMsQ0FBQywwQkFBRCxDQUFELENBQThCLEdBQTlCLENBQWtDLElBQWxDLEVBQXdDLElBQXhDLENBQTZDLFlBQVU7QUFDdEQsUUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsV0FBUixDQUFvQixRQUFwQixFQUE4QixJQUE5QixDQUFtQyxtQkFBbkMsRUFBd0QsSUFBeEQ7QUFDQSxPQUZEO0FBR0EsTUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsV0FBUixDQUFvQixRQUFwQixFQUE4QixJQUE5QixDQUFtQyxtQkFBbkMsRUFBd0QsTUFBeEQ7QUFDQSxLQU5EO0FBUUEsSUFBQSxVQUFVLENBQUMsS0FBWCxDQUFpQixVQUFTLENBQVQsRUFBWTtBQUM1QixNQUFBLENBQUMsQ0FBQyxlQUFGO0FBQ0EsTUFBQSxhQUFhLENBQUMsSUFBZCxDQUFtQixDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsSUFBUixFQUFuQixFQUFtQyxXQUFuQyxDQUErQyxRQUEvQztBQUNBLE1BQUEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsSUFBUixDQUFhLEtBQWIsQ0FBVjtBQUNBLE1BQUEsS0FBSyxDQUFDLElBQU47QUFDQSxLQUxEO0FBT0EsSUFBQSxDQUFDLENBQUMsUUFBRCxDQUFELENBQVksS0FBWixDQUFrQixZQUFXO0FBQzVCLE1BQUEsYUFBYSxDQUFDLFdBQWQsQ0FBMEIsUUFBMUI7QUFDQSxNQUFBLEtBQUssQ0FBQyxJQUFOO0FBQ0EsS0FIRDtBQUlBLEdBMUNEO0FBNENBLE1BQUksTUFBTSxHQUFHLElBQUksTUFBSixDQUFXLHNCQUFYLEVBQW1DO0FBQy9DLElBQUEsYUFBYSxFQUFFLENBRGdDO0FBRS9DLElBQUEsY0FBYyxFQUFFLElBRitCO0FBRy9DLElBQUEsY0FBYyxFQUFFLElBSCtCO0FBSS9DLElBQUEsb0JBQW9CLEVBQUUsSUFKeUI7QUFLL0MsSUFBQSxRQUFRLEVBQUUsSUFMcUM7QUFNL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFBLElBQUksRUFBRSxJQVZ5QztBQVcvQyxJQUFBLFVBQVUsRUFBRTtBQUNYLE1BQUEsTUFBTSxFQUFFLGtCQURHO0FBRVgsTUFBQSxNQUFNLEVBQUU7QUFGRyxLQVhtQztBQWUvQyxJQUFBLFdBQVcsRUFBRTtBQUNaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDLEVBRFg7QUFFSixRQUFBLGFBQWEsRUFBRSxDQUZYO0FBR0osUUFBQSxjQUFjLEVBQUUsSUFIWjtBQUlKLFFBQUEsY0FBYyxFQUFFLElBSlo7QUFLSixRQUFBLG9CQUFvQixFQUFFLElBTGxCO0FBTUosUUFBQSxRQUFRLEVBQUUsSUFOTjtBQU9KLFFBQUEsY0FBYyxFQUFFO0FBUFosT0FETztBQVVaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDLEVBRFg7QUFFSixRQUFBLGNBQWMsRUFBRSxJQUZaO0FBR0osUUFBQSxvQkFBb0IsRUFBRSxJQUhsQjtBQUlKLFFBQUEsUUFBUSxFQUFFLElBSk47QUFLSixRQUFBLGNBQWMsRUFBRSxJQUxaO0FBTUosUUFBQSxhQUFhLEVBQUU7QUFOWCxPQVZPO0FBa0JaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDLEVBRFg7QUFFSixRQUFBLGNBQWMsRUFBRSxJQUZaO0FBR0osUUFBQSxvQkFBb0IsRUFBRSxJQUhsQjtBQUlKLFFBQUEsUUFBUSxFQUFFLElBSk47QUFLSixRQUFBLGNBQWMsRUFBRSxJQUxaO0FBTUosUUFBQSxhQUFhLEVBQUU7QUFOWCxPQWxCTztBQTBCWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQyxFQURYO0FBRUosUUFBQSxjQUFjLEVBQUUsSUFGWjtBQUdKLFFBQUEsb0JBQW9CLEVBQUUsSUFIbEI7QUFJSixRQUFBLFFBQVEsRUFBRSxJQUpOO0FBS0osUUFBQSxjQUFjLEVBQUUsSUFMWjtBQU1KLFFBQUEsYUFBYSxFQUFFO0FBTlgsT0ExQk87QUFrQ1osV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUMsRUFEWDtBQUVKLFFBQUEsY0FBYyxFQUFFLElBRlo7QUFHSixRQUFBLG9CQUFvQixFQUFFLElBSGxCO0FBSUosUUFBQSxRQUFRLEVBQUUsSUFKTjtBQUtKLFFBQUEsY0FBYyxFQUFFLElBTFo7QUFNSixRQUFBLGFBQWEsRUFBRTtBQU5YLE9BbENPO0FBMkNaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDLEVBRFg7QUFFSixRQUFBLGNBQWMsRUFBRSxJQUZaO0FBR0osUUFBQSxvQkFBb0IsRUFBRSxJQUhsQjtBQUlKLFFBQUEsUUFBUSxFQUFFLElBSk47QUFLSixRQUFBLGNBQWMsRUFBRSxJQUxaO0FBTUosUUFBQSxhQUFhLEVBQUU7QUFOWCxPQTNDTztBQW1EWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQyxHQURYO0FBRUosUUFBQSxjQUFjLEVBQUUsSUFGWjtBQUdKLFFBQUEsb0JBQW9CLEVBQUUsSUFIbEI7QUFJSixRQUFBLFFBQVEsRUFBRSxJQUpOO0FBS0osUUFBQSxjQUFjLEVBQUUsSUFMWjtBQU1KLFFBQUEsYUFBYSxFQUFFO0FBTlgsT0FuRE87QUEyRFosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUMsR0FEWDtBQUVKLFFBQUEsY0FBYyxFQUFFLElBRlo7QUFHSixRQUFBLG9CQUFvQixFQUFFLElBSGxCO0FBSUosUUFBQSxRQUFRLEVBQUUsSUFKTjtBQUtKLFFBQUEsY0FBYyxFQUFFLElBTFo7QUFNSixRQUFBLGFBQWEsRUFBRTtBQU5YLE9BM0RPO0FBbUVaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDLEdBRFg7QUFFSixRQUFBLGNBQWMsRUFBRSxJQUZaO0FBR0osUUFBQSxvQkFBb0IsRUFBRSxJQUhsQjtBQUlKLFFBQUEsUUFBUSxFQUFFLElBSk47QUFLSixRQUFBLGNBQWMsRUFBRSxJQUxaO0FBTUosUUFBQSxhQUFhLEVBQUU7QUFOWCxPQW5FTztBQTJFWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQyxHQURYO0FBRUosUUFBQSxjQUFjLEVBQUUsSUFGWjtBQUdKLFFBQUEsb0JBQW9CLEVBQUUsSUFIbEI7QUFJSixRQUFBLFFBQVEsRUFBRSxJQUpOO0FBS0osUUFBQSxjQUFjLEVBQUUsSUFMWjtBQU1KLFFBQUEsYUFBYSxFQUFFO0FBTlgsT0EzRU87QUFtRlosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUMsR0FEWDtBQUVKLFFBQUEsY0FBYyxFQUFFLElBRlo7QUFHSixRQUFBLG9CQUFvQixFQUFFLElBSGxCO0FBSUosUUFBQSxRQUFRLEVBQUUsSUFKTjtBQUtKLFFBQUEsY0FBYyxFQUFFLElBTFo7QUFNSixRQUFBLGFBQWEsRUFBRTtBQU5YLE9BbkZPO0FBMkZaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDLEdBRFg7QUFFSixRQUFBLGNBQWMsRUFBRSxJQUZaO0FBR0osUUFBQSxvQkFBb0IsRUFBRSxJQUhsQjtBQUlKLFFBQUEsUUFBUSxFQUFFLElBSk47QUFLSixRQUFBLGFBQWEsRUFBRTtBQUxYLE9BM0ZPO0FBa0daLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDLEdBRFg7QUFFSixRQUFBLGNBQWMsRUFBRSxJQUZaO0FBR0osUUFBQSxvQkFBb0IsRUFBRSxJQUhsQjtBQUlKLFFBQUEsUUFBUSxFQUFFLElBSk47QUFLSixRQUFBLGFBQWEsRUFBRTtBQUxYLE9BbEdPO0FBMEdaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDLEdBRFg7QUFFSixRQUFBLGNBQWMsRUFBRSxJQUZaO0FBR0osUUFBQSxvQkFBb0IsRUFBRSxJQUhsQjtBQUlKLFFBQUEsUUFBUSxFQUFFLElBSk47QUFLSixRQUFBLGNBQWMsRUFBRSxJQUxaO0FBTUosUUFBQSxhQUFhLEVBQUU7QUFOWCxPQTFHTztBQWtIWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQyxHQURYO0FBRUosUUFBQSxjQUFjLEVBQUUsSUFGWjtBQUdKLFFBQUEsb0JBQW9CLEVBQUUsSUFIbEI7QUFJSixRQUFBLFFBQVEsRUFBRSxJQUpOO0FBS0osUUFBQSxjQUFjLEVBQUUsSUFMWjtBQU1KLFFBQUEsYUFBYSxFQUFFO0FBTlgsT0FsSE87QUEwSFosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUMsR0FEWDtBQUVKLFFBQUEsY0FBYyxFQUFFLElBRlo7QUFHSixRQUFBLG9CQUFvQixFQUFFLElBSGxCO0FBSUosUUFBQSxRQUFRLEVBQUUsSUFKTjtBQUtKLFFBQUEsY0FBYyxFQUFFLElBTFo7QUFNSixRQUFBLGFBQWEsRUFBRTtBQU5YLE9BMUhPO0FBa0laLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDLEdBRFg7QUFFSixRQUFBLGNBQWMsRUFBRSxJQUZaO0FBR0osUUFBQSxvQkFBb0IsRUFBRSxJQUhsQjtBQUlKLFFBQUEsUUFBUSxFQUFFLElBSk47QUFLSixRQUFBLGNBQWMsRUFBRSxJQUxaO0FBTUosUUFBQSxhQUFhLEVBQUU7QUFOWCxPQWxJTztBQTBJWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQyxHQURYO0FBRUosUUFBQSxjQUFjLEVBQUUsSUFGWjtBQUdKLFFBQUEsb0JBQW9CLEVBQUUsSUFIbEI7QUFJSixRQUFBLFFBQVEsRUFBRSxJQUpOO0FBS0osUUFBQSxjQUFjLEVBQUUsSUFMWjtBQU1KLFFBQUEsYUFBYSxFQUFFO0FBTlgsT0ExSU87QUFrSlo7QUFDQyxRQUFBLGFBQWEsRUFBRSxDQURoQjtBQUVDLFFBQUEsWUFBWSxFQUFFLEVBRmY7QUFHQyxRQUFBLGNBQWMsRUFBRTtBQUhqQiwwQkFJZ0IsQ0FKaEIsQ0FsSlk7QUF3SlosV0FBSztBQUNKLFFBQUEsYUFBYSxFQUFFO0FBRFgsT0F4Sk87QUEySlosV0FBSztBQUNKLFFBQUEsYUFBYSxFQUFFO0FBRFgsT0EzSk87QUE4SlosWUFBTTtBQUNMLFFBQUEsYUFBYSxFQUFFLENBRFY7QUFFTCxRQUFBLFlBQVksRUFBRTtBQUZUO0FBOUpNO0FBZmtDLEdBQW5DLENBQWI7QUFtTEEsRUFBQSxNQUFNLENBQUMsRUFBUCxDQUFVLFFBQVYsRUFBbUIsWUFBWTtBQUM5QixTQUFLLE1BQUw7QUFDQSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVkscUJBQVo7QUFDRSxHQUhIO0FBS0EsTUFBSSxjQUFjLEdBQUcsSUFBSSxNQUFKLENBQVcsMEJBQVgsRUFBdUM7QUFDM0QsSUFBQSxZQUFZLEVBQUUsRUFENkM7QUFFM0QsSUFBQSxRQUFRLEVBQUUsSUFGaUQ7QUFHM0QsSUFBQSxhQUFhLEVBQUUsQ0FINEM7QUFJM0QsSUFBQSxRQUFRLEVBQUU7QUFDVCxNQUFBLEtBQUssRUFBRSxJQURFO0FBRVQsTUFBQSxvQkFBb0IsRUFBRTtBQUZiLEtBSmlEO0FBUTNELElBQUEsSUFBSSxFQUFFLEtBUnFEO0FBUzNELElBQUEsVUFBVSxFQUFFO0FBQ1gsTUFBQSxNQUFNLEVBQUUsMkJBREc7QUFFWCxNQUFBLE1BQU0sRUFBRTtBQUZHLEtBVCtDO0FBYTNELElBQUEsV0FBVyxFQUFFO0FBQ1osV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBRFY7QUFFSixRQUFBLGFBQWEsRUFBRSxDQUZYO0FBR0osUUFBQSxjQUFjLEVBQUU7QUFIWixPQURPO0FBTVosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQU5PO0FBVVosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQVZPO0FBY1osV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQWRPO0FBa0JaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDO0FBRFgsT0FsQk87QUFzQlosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQXRCTztBQTBCWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQztBQURYLE9BMUJPO0FBOEJaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDO0FBRFgsT0E5Qk87QUFrQ1osV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQWxDTztBQXNDWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQztBQURYLE9BdENPO0FBMENaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDO0FBRFgsT0ExQ087QUE4Q1osV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQTlDTztBQWtEWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQztBQURYLE9BbERPO0FBc0RaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDO0FBRFgsT0F0RE87QUEwRFosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQTFETztBQThEWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQztBQURYLE9BOURPO0FBa0VaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDO0FBRFgsT0FsRU87QUFzRVosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQXRFTztBQTBFWixXQUFLO0FBQ0osUUFBQSxhQUFhLEVBQUUsQ0FEWDtBQUVKLFFBQUEsWUFBWSxFQUFFLEVBRlY7QUFHSixRQUFBLGNBQWMsRUFBRTtBQUhaLE9BMUVPO0FBK0VaLFdBQUs7QUFDSixRQUFBLGFBQWEsRUFBRTtBQURYLE9BL0VPO0FBa0ZaLFdBQUs7QUFDSixRQUFBLGFBQWEsRUFBRTtBQURYLE9BbEZPO0FBcUZaLFlBQU07QUFDTCxRQUFBLGFBQWEsRUFBRSxDQURWO0FBRUwsUUFBQSxZQUFZLEVBQUU7QUFGVDtBQXJGTTtBQWI4QyxHQUF2QyxDQUFyQjtBQTBHQSxNQUFJLGlCQUFpQixHQUFHLElBQUksTUFBSixDQUFXLHNCQUFYLEVBQW1DO0FBQzFELElBQUEsUUFBUSxFQUFFLElBRGdEO0FBRTFELElBQUEsYUFBYSxFQUFFLENBRjJDO0FBRzFELElBQUEsUUFBUSxFQUFFO0FBQ1QsTUFBQSxLQUFLLEVBQUUsSUFERTtBQUVULE1BQUEsb0JBQW9CLEVBQUU7QUFGYixLQUhnRDtBQU8xRCxJQUFBLElBQUksRUFBRSxLQVBvRDtBQVExRCxJQUFBLFVBQVUsRUFBRTtBQUNYLE1BQUEsTUFBTSxFQUFFLHNCQURHO0FBRVgsTUFBQSxNQUFNLEVBQUU7QUFGRyxLQVI4QztBQVkxRCxJQUFBLFdBQVcsRUFBRTtBQUNaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDLEVBRFg7QUFFSixRQUFBLGFBQWEsRUFBRSxDQUZYO0FBR0osUUFBQSxjQUFjLEVBQUU7QUFIWixPQURPO0FBTVosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQU5PO0FBVVosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQVZPO0FBY1osV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQWRPO0FBa0JaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDO0FBRFgsT0FsQk87QUFzQlosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQXRCTztBQTBCWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQztBQURYLE9BMUJPO0FBOEJaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDO0FBRFgsT0E5Qk87QUFrQ1osV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQWxDTztBQXNDWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQztBQURYLE9BdENPO0FBMENaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDO0FBRFgsT0ExQ087QUE4Q1osV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQTlDTztBQWtEWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQztBQURYLE9BbERPO0FBc0RaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDO0FBRFgsT0F0RE87QUEwRFosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQTFETztBQThEWixXQUFLO0FBQ0osUUFBQSxZQUFZLEVBQUUsQ0FBQztBQURYLE9BOURPO0FBa0VaLFdBQUs7QUFDSixRQUFBLFlBQVksRUFBRSxDQUFDO0FBRFgsT0FsRU87QUFzRVosV0FBSztBQUNKLFFBQUEsWUFBWSxFQUFFLENBQUM7QUFEWCxPQXRFTztBQTBFWixXQUFLO0FBQ0osUUFBQSxhQUFhLEVBQUUsQ0FEWDtBQUVKLFFBQUEsWUFBWSxFQUFFLEVBRlY7QUFHSixRQUFBLGNBQWMsRUFBRTtBQUhaLE9BMUVPO0FBK0VaLFdBQUs7QUFDSixRQUFBLGFBQWEsRUFBRTtBQURYLE9BL0VPO0FBa0ZaLFdBQUs7QUFDSixRQUFBLGFBQWEsRUFBRTtBQURYLE9BbEZPO0FBcUZaLFlBQU07QUFDTCxRQUFBLGFBQWEsRUFBRSxDQURWO0FBRUwsUUFBQSxZQUFZLEVBQUU7QUFGVDtBQXJGTTtBQVo2QyxHQUFuQyxDQUF4QjtBQXVHQSxDQWxjQSxHQUFEOzs7QUNEQTs7Ozs7Ozs7QUFFQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDdkQ7QUFBQSwyQ0FBTyxTQUFQO0FBQUE7QUFDRCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24gKCkge1xuXHRsZXRcblx0XHRwbHVnaW5zID0ge1xuXHRcdFx0cmROYXZiYXI6ICQoJy5yZC1uYXZiYXInKSxcblx0XHR9O1xuXHRcblx0XHRpZiAocGx1Z2lucy5yZE5hdmJhci5sZW5ndGgpIHtcblx0XHRwbHVnaW5zLnJkTmF2YmFyLlJETmF2YmFyKHtcblx0XHRcdHN0aWNrVXBDbG9uZTogKHBsdWdpbnMucmROYXZiYXIuYXR0cihcImRhdGEtc3RpY2stdXAtY2xvbmVcIikpID8gcGx1Z2lucy5yZE5hdmJhci5hdHRyKFwiZGF0YS1zdGljay11cC1jbG9uZVwiKSA9PT0gJ3RydWUnIDogZmFsc2UsXG5cdFx0fSk7XG5cdH1cblx0ICAgICAgXG5cdFxuXHQkKCdzZWxlY3Quc2VsZWN0LWN1c3RvbScpLmVhY2goZnVuY3Rpb24oKXtcblx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLCBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGg7XG5cdFx0XG5cdFx0JHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcblx0XHQkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwic2VsZWN0XCI+PC9kaXY+Jyk7XG5cdFx0JHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCI+PC9kaXY+Jyk7XG5cdFx0XG5cdFx0dmFyICRzdHlsZWRTZWxlY3QgPSAkdGhpcy5uZXh0KCdkaXYuc2VsZWN0LXN0eWxlZCcpO1xuXHRcdCRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoMCkudGV4dCgpKTtcblx0XHRcblx0XHR2YXIgJGxpc3QgPSAkKCc8dWwgLz4nLCB7XG5cdFx0XHQnY2xhc3MnOiAnc2VsZWN0LW9wdGlvbnMnXG5cdFx0fSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cdFx0XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuXHRcdFx0JCgnPGxpIC8+Jywge1xuXHRcdFx0XHR0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxuXHRcdFx0XHRyZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxuXHRcdFx0fSkuYXBwZW5kVG8oJGxpc3QpO1xuXHRcdH1cblx0XHRcblx0XHRsZXQgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xuXHRcdFxuXHRcdCRzdHlsZWRTZWxlY3QuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdCQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykuaGlkZSgpO1xuXHRcdFx0fSk7XG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLnRvZ2dsZSgpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdCRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdCRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xuXHRcdFx0JGxpc3QuaGlkZSgpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdCQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0JHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkbGlzdC5oaWRlKCk7XG5cdFx0fSk7XG5cdH0pO1xuXHRcblx0dmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItcG9wdWxhci1uZXdzJywge1xuXHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0Ly8gYXV0b3BsYXk6IHtcblx0XHQvLyBcdGRlbGF5OiA0NzAwLFxuXHRcdC8vIFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxuXHRcdC8vIH0sXG5cdFx0bG9vcDogdHJ1ZSxcblx0XHRuYXZpZ2F0aW9uOiB7XG5cdFx0XHRuZXh0RWw6ICcuc2xpZGVyLW5hdi1uZXh0Jyxcblx0XHRcdHByZXZFbDogJy5zbGlkZXItbmF2LXByZXYnLFxuXHRcdH0sXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDMyMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0zMCxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0MzQwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTQwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdH0sXG5cdFx0XHQzNTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtNTAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxuXHRcdFx0fSxcblx0XHRcdDM2MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC02MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0XHR9LFxuXHRcdFx0MzcwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTcwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0MzgwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTgwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdH0sXG5cdFx0XHQ0MDA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTAwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdH0sXG5cdFx0XHQ0MTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTEwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdH0sXG5cdFx0XHQ0MjA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTIwLCAgIFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ0MzA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMTMwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ0MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNDAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ1MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNTAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDYwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE2MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcblxuXHRcdFx0fSxcblx0XHRcdDQ3MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNzAsXG5cdFx0XHRcdG9ic2VydmVQYXJlbnRzOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDgwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE4MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDkwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTE5MCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NTAwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTIwMCxcblx0XHRcdFx0b2JzZXJ2ZVBhcmVudHM6IHRydWUsXG5cdFx0XHRcdG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxuXHRcdFx0XHRvYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0cmVzaXplT2JzZXJ2ZXI6IHRydWUsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDJcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ1MTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMjEwLFxuXHRcdFx0XHRvYnNlcnZlUGFyZW50czogdHJ1ZSxcblx0XHRcdFx0b2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IHRydWUsXG5cdFx0XHRcdG9ic2VydmVyOiB0cnVlLFxuXHRcdFx0XHRyZXNpemVPYnNlcnZlcjogdHJ1ZSxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMlx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUyMDoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDJcblx0XHRcdH0sXG5cdFx0XHQ3Njg6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcblx0XHRcdH0sXG5cdFx0XHQ5OTI6IHtcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcblx0XHRcdH0sXG5cdFx0XHQxMjAwOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDUsXG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0pO1xuXHRzd2lwZXIub24oJ3Jlc2l6ZScsZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0Y29uc29sZS5sb2coJ3Jlc2l6aW5nIHN3aXBlciEhISEnKTtcblx0ICB9KVxuXHRcblx0dmFyIHN3aXBlckFydGljbGVzID0gbmV3IFN3aXBlcignLnN3aXBlci1wb3B1bGFyLWFydGljbGVzJywge1xuXHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0ZnJlZU1vZGU6IHRydWUsXG5cdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRhdXRvcGxheToge1xuXHRcdFx0ZGVsYXk6IDQwMDAsXG5cdFx0XHRkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXG5cdFx0fSxcblx0XHRsb29wOiBmYWxzZSxcblx0XHRuYXZpZ2F0aW9uOiB7XG5cdFx0XHRuZXh0RWw6ICcuc2xpZGVyLWFydGljbGVzLW5hdi1uZXh0Jyxcblx0XHRcdHByZXZFbDogJy5zbGlkZXItYXJ0aWNsZXMtbmF2LXByZXYnLFxuXHRcdH0sXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDMyMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IDAsXG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdDM0MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0MzUwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTIwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQzNjA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDM3MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC00MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0MzgwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTUwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ0MDA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtNjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQxMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC03MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0NDIwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTgwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQ0MzA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtOTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ0MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ1MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ2MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ3MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ4MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ5MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUwMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUxMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xODAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUyMDoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0NzY4OiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXG5cdFx0XHR9LFxuXHRcdFx0OTkyOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHR9LFxuXHRcdFx0MTIwMDoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA0LFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcblx0XG5cdFxuXHR2YXIgc3dpcGVyTmV3QXJ0aWNsZXMgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLW5ldy1hcnRpY2xlcycsIHtcblx0XHRmcmVlTW9kZTogdHJ1ZSxcblx0XHRzbGlkZXNQZXJWaWV3OiAxLFxuXHRcdGF1dG9wbGF5OiB7XG5cdFx0XHRkZWxheTogNDMwMCxcblx0XHRcdGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSwgXG5cdFx0fSwgXG5cdFx0bG9vcDogZmFsc2UsXG5cdFx0bmF2aWdhdGlvbjoge1xuXHRcdFx0bmV4dEVsOiAnLnNsaWRlci1uZXctbmF2LW5leHQnLFxuXHRcdFx0cHJldkVsOiAnLnNsaWRlci1uZXctbmF2LXByZXYnLFxuXHRcdH0sXG5cdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdDMyMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0zMCxcblx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0MzQwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTQwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQzNTA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtNTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDM2MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC02MCxcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0MzcwOiB7XG5cdFx0XHRcdHNwYWNlQmV0d2VlbjogLTcwLFxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQzODA6IHtcblx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtODAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQwMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQxMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQyMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQzMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xMzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ0MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ1MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ2MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNjAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ3MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xNzAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ4MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xODAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDQ5MDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0xOTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUwMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0yMDAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUxMDoge1xuXHRcdFx0XHRzcGFjZUJldHdlZW46IC0yMTAsXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdDUyMDoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXG5cdFx0XHR9LFxuXHRcdFx0NzY4OiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHR9LFxuXHRcdFx0OTkyOiB7XG5cdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHR9LFxuXHRcdFx0MTIwMDoge1xuXHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA1LFxuXHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9KTtcbn0oKSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIGltcG9ydCgnLi9pbml0cycpO1xufSk7ICBcblxuICAgIl19
