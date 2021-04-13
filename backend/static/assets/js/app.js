(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

(function () {
  // Global letiables
  var userAgent = navigator.userAgent.toLowerCase(),
      initialDate = new Date(),
      $document = $(document),
      $window = $(window),
      $html = $("html"),
      $body = $("body"),
      isDesktop = $html.hasClass("desktop"),
      isIE = userAgent.indexOf("msie") !== -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") !== -1 ? 11 : userAgent.indexOf("edge") !== -1 ? 12 : false,
      isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      windowReady = false,
      isNoviBuilder = false,
      livedemo = false,
      plugins = {
    rdNavbar: $('.rd-navbar')
  };

  if (plugins.rdNavbar.length) {
    var navbar = plugins.rdNavbar,
        aliases = {
      '-': 0,
      '-sm-': 576,
      '-md-': 768,
      '-lg-': 992,
      '-xl-': 1200,
      '-xxl-': 1600
    },
        responsive = {};

    for (var alias in aliases) {
      var link = responsive[aliases[alias]] = {};
      if (navbar.attr('data' + alias + 'layout')) link.layout = navbar.attr('data' + alias + 'layout');
      if (navbar.attr('data' + alias + 'device-layout')) link.deviceLayout = navbar.attr('data' + alias + 'device-layout');
      if (navbar.attr('data' + alias + 'hover-on')) link.focusOnHover = navbar.attr('data' + alias + 'hover-on') === 'true';
      if (navbar.attr('data' + alias + 'auto-height')) link.autoHeight = navbar.attr('data' + alias + 'auto-height') === 'true';
      if (navbar.attr('data' + alias + 'stick-up-offset')) link.stickUpOffset = navbar.attr('data' + alias + 'stick-up-offset');
      if (navbar.attr('data' + alias + 'stick-up')) link.stickUp = navbar.attr('data' + alias + 'stick-up') === 'true';
      if (isNoviBuilder) link.stickUp = false;else if (navbar.attr('data' + alias + 'stick-up')) link.stickUp = navbar.attr('data' + alias + 'stick-up') === 'true';
    }

    plugins.rdNavbar.RDNavbar({
      anchorNav: !isNoviBuilder,
      stickUpClone: plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
      responsive: responsive,
      callbacks: {
        onStuck: function onStuck() {
          var navbarSearch = this.$element.find('.rd-search input');

          if (navbarSearch) {
            navbarSearch.val('').trigger('propertychange');
          }
        },
        onDropdownOver: function onDropdownOver() {
          return !isNoviBuilder;
        },
        onUnstuck: function onUnstuck() {
          if (this.$clone === null) return;
          var navbarSearch = this.$clone.find('.rd-search input');

          if (navbarSearch) {
            navbarSearch.val('').trigger('propertychange');
            navbarSearch.trigger('blur');
          }
        }
      }
    });
  }
  /*
  Reference: http://jsfiddle.net/BB3JK/47/
  */


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
      $list.hide(); //console.log($this.val());
    });
    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });
    var swiper = new Swiper('.swiper-popular-news', {
      spaceBetween: 20,
      freeMode: true,
      slidesPerView: 1,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      loop: false,
      navigation: {
        nextEl: '.slider-nav-next',
        prevEl: '.slider-nav-prev'
      },
      breakpoints: {
        320: {
          spaceBetween: -30,
          slidesPerView: 1,
          centeredSlides: true
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3
        },
        992: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 5
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
          spaceBetween: -30,
          slidesPerView: 1,
          centeredSlides: true
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3
        },
        992: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        }
      }
    });
    var swiperNewArticles = new Swiper('.swiper-new-articles', {
      spaceBetween: 20,
      freeMode: true,
      slidesPerView: 1,
      autoplay: {
        delay: 4000,
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
        576: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3
        },
        992: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 5
        }
      }
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9pbml0cy5qcyIsImpzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFHQyxhQUFZO0FBQ1o7QUFDQSxNQUNDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBVixDQUFvQixXQUFwQixFQURiO0FBQUEsTUFFQyxXQUFXLEdBQUcsSUFBSSxJQUFKLEVBRmY7QUFBQSxNQUlDLFNBQVMsR0FBRyxDQUFDLENBQUMsUUFBRCxDQUpkO0FBQUEsTUFLQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQUQsQ0FMWjtBQUFBLE1BTUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFELENBTlY7QUFBQSxNQU9DLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBRCxDQVBWO0FBQUEsTUFTQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQU4sQ0FBZSxTQUFmLENBVGI7QUFBQSxNQVVDLElBQUksR0FBRyxTQUFTLENBQUMsT0FBVixDQUFrQixNQUFsQixNQUE4QixDQUFDLENBQS9CLEdBQW1DLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBVixDQUFnQixNQUFoQixFQUF3QixDQUF4QixDQUFELEVBQTZCLEVBQTdCLENBQTNDLEdBQThFLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFNBQWxCLE1BQWlDLENBQUMsQ0FBbEMsR0FBc0MsRUFBdEMsR0FBMkMsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsTUFBbEIsTUFBOEIsQ0FBQyxDQUEvQixHQUFtQyxFQUFuQyxHQUF3QyxLQVZ6SztBQUFBLE1BV0MsUUFBUSxHQUFHLGlFQUFpRSxJQUFqRSxDQUFzRSxTQUFTLENBQUMsU0FBaEYsQ0FYWjtBQUFBLE1BWUMsV0FBVyxHQUFHLEtBWmY7QUFBQSxNQWFDLGFBQWEsR0FBRyxLQWJqQjtBQUFBLE1BY0MsUUFBUSxHQUFHLEtBZFo7QUFBQSxNQWdCQyxPQUFPLEdBQUc7QUFDVCxJQUFBLFFBQVEsRUFBRSxDQUFDLENB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QUU7QUFDWixhQUFLO0FBQ0osVUFBQSxZQUFZLEVBQUUsQ0FBQyxFQURYO0FBRUosVUFBQSxhQUFhLEVBQUUsQ0FGWDtBQUdKLFVBQUEsY0FBYyxFQUFFO0FBSFosU0FETztBQU1aLGFBQUs7QUFDSixVQUFBLGFBQWEsRUFBRSxDQURYO0FBRUosVUFBQSxZQUFZLEVBQUU7QUFGVixTQU5PO0FBVVosYUFBSztBQUNKLFVBQUEsYUFBYSxFQUFFO0FBRFgsU0FWTztBQWFaLGFBQUs7QUFDSixVQUFBLGFBQWEsRUFBRTtBQURYLFNBYk87QUFnQlosY0FBTTtBQUNMLFVBQUEsYUFBYSxFQUFFO0FBRFY7QUFoQk07QUFiNkMsS0FBbkMsQ0FBeEI7QUFvQ0EsR0F6SkQ7QUEwSkEsQ0E1T0EsR0FBRDs7O0FDSEE7Ozs7Ozs7O0FBRUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3ZEO0FBQUEsMkNBQU8sU0FBUDtBQUFBO0FBQ0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0Ly8gR2xvYmFsIGxldGlhYmxlc1xyXG5cdGxldFxyXG5cdFx0dXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLFxyXG5cdFx0aW5pdGlhbERhdGUgPSBuZXcgRGF0ZSgpLFxyXG5cdFx0XHJcblx0XHQkZG9jdW1lbnQgPSAkKGRvY3VtZW50KSxcclxuXHRcdCR3aW5kb3cgPSAkKHdpbmRvdyksXHJcblx0XHQkaHRtbCA9ICQoXCJodG1sXCIpLFxyXG5cdFx0JGJvZHkgPSAkKFwiYm9keVwiKSxcclxuXHRcdFxyXG5cdFx0aXNEZXNrdG9wID0gJGh0bWwuaGFzQ2xhc3MoXCJkZXNrdG9wXCIpLFxyXG5cdFx0aXNJRSA9IHVzZXJBZ2VudC5pbmRleE9mKFwibXNpZVwiKSAhPT0gLTEgPyBwYXJzZUludCh1c2VyQWdlbnQuc3BsaXQoXCJtc2llXCIpWzFdLCAxMCkgOiB1c2VyQWdlbnQuaW5kZXhPZihcInRyaWRlbnRcIikgIT09IC0xID8gMTEgOiB1c2VyQWdlbnQuaW5kZXhPZihcImVkZ2VcIikgIT09IC0xID8gMTIgOiBmYWxzZSxcclxuXHRcdGlzTW9iaWxlID0gL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxyXG5cdFx0d2luZG93UmVhZHkgPSBmYWxzZSxcclxuXHRcdGlzTm92aUJ1aWxkZXIgPSBmYWxzZSxcclxuXHRcdGxpdmVkZW1vID0gZmFsc2UsXHJcblx0XHRcclxuXHRcdHBsdWdpbnMgPSB7XHJcblx0XHRcdHJkTmF2YmFyOiAkKCcucmQtbmF2YmFyJyksXHJcblx0XHR9O1xyXG5cdFxyXG5cdFx0aWYgKHBsdWdpbnMucmROYXZiYXIubGVuZ3RoKSB7XHJcblx0XHRsZXRcclxuXHRcdFx0bmF2YmFyID0gcGx1Z2lucy5yZE5hdmJhcixcclxuXHRcdFx0YWxpYXNlcyA9IHtcclxuXHRcdFx0XHQnLSc6ICAgICAwLFxyXG5cdFx0XHRcdCctc20tJzogIDU3NixcclxuXHRcdFx0XHQnLW1kLSc6ICA3NjgsXHJcblx0XHRcdFx0Jy1sZy0nOiAgOTkyLFxyXG5cdFx0XHRcdCcteGwtJzogIDEyMDAsXHJcblx0XHRcdFx0Jy14eGwtJzogMTYwMFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRyZXNwb25zaXZlID0ge307XHJcblx0XHRcclxuXHRcdGZvciAobGV0IGFsaWFzIGluIGFsaWFzZXMpIHtcclxuXHRcdFx0bGV0IGxpbmsgPSByZXNwb25zaXZlW2FsaWFzZXNbYWxpYXNdXSA9IHt9O1xyXG5cdFx0XHRpZiAobmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnbGF5b3V0JykpIGxpbmsubGF5b3V0ID0gbmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnbGF5b3V0Jyk7XHJcblx0XHRcdGlmIChuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdkZXZpY2UtbGF5b3V0JykpIGxpbmsuZGV2aWNlTGF5b3V0ID0gbmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnZGV2aWNlLWxheW91dCcpO1xyXG5cdFx0XHRpZiAobmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnaG92ZXItb24nKSkgbGluay5mb2N1c09uSG92ZXIgPSBuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdob3Zlci1vbicpID09PSAndHJ1ZSc7XHJcblx0XHRcdGlmIChuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdhdXRvLWhlaWdodCcpKSBsaW5rLmF1dG9IZWlnaHQgPSBuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdhdXRvLWhlaWdodCcpID09PSAndHJ1ZSc7XHJcblx0XHRcdGlmIChuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdzdGljay11cC1vZmZzZXQnKSkgbGluay5zdGlja1VwT2Zmc2V0ID0gbmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnc3RpY2stdXAtb2Zmc2V0Jyk7XHJcblx0XHRcdGlmIChuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdzdGljay11cCcpKSBsaW5rLnN0aWNrVXAgPSBuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdzdGljay11cCcpID09PSAndHJ1ZSc7XHJcblx0XHRcdGlmIChpc05vdmlCdWlsZGVyKSBsaW5rLnN0aWNrVXAgPSBmYWxzZTtcclxuXHRcdFx0ZWxzZSBpZiAobmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnc3RpY2stdXAnKSkgbGluay5zdGlja1VwID0gbmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnc3RpY2stdXAnKSA9PT0gJ3RydWUnO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRwbHVnaW5zLnJkTmF2YmFyLlJETmF2YmFyKHtcclxuXHRcdFx0YW5jaG9yTmF2OiAgICAhaXNOb3ZpQnVpbGRlcixcclxuXHRcdFx0c3RpY2tVcENsb25lOiAocGx1Z2lucy5yZE5hdmJhci5hdHRyKFwiZGF0YS1zdGljay11cC1jbG9uZVwiKSAmJiAhaXNOb3ZpQnVpbGRlcikgPyBwbHVnaW5zLnJkTmF2YmFyLmF0dHIoXCJkYXRhLXN0aWNrLXVwLWNsb25lXCIpID09PSAndHJ1ZScgOiBmYWxzZSxcclxuXHRcdFx0cmVzcG9uc2l2ZTogICByZXNwb25zaXZlLFxyXG5cdFx0XHRjYWxsYmFja3M6ICAgIHtcclxuXHRcdFx0XHRvblN0dWNrOiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0bGV0IG5hdmJhclNlYXJjaCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLnJkLXNlYXJjaCBpbnB1dCcpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRpZiAobmF2YmFyU2VhcmNoKSB7XHJcblx0XHRcdFx0XHRcdG5hdmJhclNlYXJjaC52YWwoJycpLnRyaWdnZXIoJ3Byb3BlcnR5Y2hhbmdlJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRvbkRyb3Bkb3duT3ZlcjogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuICFpc05vdmlCdWlsZGVyO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0b25VbnN0dWNrOiAgICAgIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLiRjbG9uZSA9PT0gbnVsbClcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRsZXQgbmF2YmFyU2VhcmNoID0gdGhpcy4kY2xvbmUuZmluZCgnLnJkLXNlYXJjaCBpbnB1dCcpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRpZiAobmF2YmFyU2VhcmNoKSB7XHJcblx0XHRcdFx0XHRcdG5hdmJhclNlYXJjaC52YWwoJycpLnRyaWdnZXIoJ3Byb3BlcnR5Y2hhbmdlJyk7XHJcblx0XHRcdFx0XHRcdG5hdmJhclNlYXJjaC50cmlnZ2VyKCdibHVyJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHQvKlxyXG5SZWZlcmVuY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvQkIzSksvNDcvXHJcbiovXHJcblx0XHJcblx0JCgnc2VsZWN0LnNlbGVjdC1jdXN0b20nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLCBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGg7XHJcblx0XHRcclxuXHRcdCR0aGlzLmFkZENsYXNzKCdzZWxlY3QtaGlkZGVuJyk7XHJcblx0XHQkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwic2VsZWN0XCI+PC9kaXY+Jyk7XHJcblx0XHQkdGhpcy5hZnRlcignPGRpdiBjbGFzcz1cInNlbGVjdC1zdHlsZWRcIj48L2Rpdj4nKTtcclxuXHRcdFxyXG5cdFx0dmFyICRzdHlsZWRTZWxlY3QgPSAkdGhpcy5uZXh0KCdkaXYuc2VsZWN0LXN0eWxlZCcpO1xyXG5cdFx0JHN0eWxlZFNlbGVjdC50ZXh0KCR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcSgwKS50ZXh0KCkpO1xyXG5cdFx0XHJcblx0XHR2YXIgJGxpc3QgPSAkKCc8dWwgLz4nLCB7XHJcblx0XHRcdCdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcclxuXHRcdH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpO1xyXG5cdFx0XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mT3B0aW9uczsgaSsrKSB7XHJcblx0XHRcdCQoJzxsaSAvPicsIHtcclxuXHRcdFx0XHR0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxyXG5cdFx0XHRcdHJlbDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnZhbCgpXHJcblx0XHRcdH0pLmFwcGVuZFRvKCRsaXN0KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0bGV0ICRsaXN0SXRlbXMgPSAkbGlzdC5jaGlsZHJlbignbGknKTtcclxuXHRcdFxyXG5cdFx0JHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdCQoJ2Rpdi5zZWxlY3Qtc3R5bGVkLmFjdGl2ZScpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS5oaWRlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLnRvZ2dsZSgpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdCRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHQkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xyXG5cdFx0XHQkbGlzdC5oaWRlKCk7XHJcblx0XHRcdC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdCQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0JGxpc3QuaGlkZSgpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLXBvcHVsYXItbmV3cycsIHtcclxuXHRcdFx0c3BhY2VCZXR3ZWVuOiAyMCxcclxuXHRcdFx0ZnJlZU1vZGU6IHRydWUsXHJcblx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXHJcblx0XHRcdGF1dG9wbGF5OiB7XHJcblx0XHRcdFx0ZGVsYXk6IDQwMDAsXHJcblx0XHRcdFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRsb29wOiBmYWxzZSxcclxuXHRcdFx0bmF2aWdhdGlvbjoge1xyXG5cdFx0XHRcdG5leHRFbDogJy5zbGlkZXItbmF2LW5leHQnLFxyXG5cdFx0XHRcdHByZXZFbDogJy5zbGlkZXItbmF2LXByZXYnLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRicmVha3BvaW50czoge1xyXG5cdFx0XHRcdDMyMDoge1xyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMzAsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ1NzY6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDIwXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ3Njg6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ5OTI6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQxMjAwOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA1LFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdHZhciBzd2lwZXJBcnRpY2xlcyA9IG5ldyBTd2lwZXIoJy5zd2lwZXItcG9wdWxhci1hcnRpY2xlcycsIHtcclxuXHRcdFx0c3BhY2VCZXR3ZWVuOiAyMCxcclxuXHRcdFx0ZnJlZU1vZGU6IHRydWUsXHJcblx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXHJcblx0XHRcdGF1dG9wbGF5OiB7XHJcblx0XHRcdFx0ZGVsYXk6IDQwMDAsXHJcblx0XHRcdFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRsb29wOiBmYWxzZSxcclxuXHRcdFx0bmF2aWdhdGlvbjoge1xyXG5cdFx0XHRcdG5leHRFbDogJy5zbGlkZXItYXJ0aWNsZXMtbmF2LW5leHQnLFxyXG5cdFx0XHRcdHByZXZFbDogJy5zbGlkZXItYXJ0aWNsZXMtbmF2LXByZXYnLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRicmVha3BvaW50czoge1xyXG5cdFx0XHRcdDMyMDoge1xyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMzAsXHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ1NzY6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDIwXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ3Njg6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ5OTI6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQxMjAwOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA0LFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHR2YXIgc3dpcGVyTmV3QXJ0aWNsZXMgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLW5ldy1hcnRpY2xlcycsIHtcclxuXHRcdFx0c3BhY2VCZXR3ZWVuOiAyMCxcclxuXHRcdFx0ZnJlZU1vZGU6IHRydWUsXHJcblx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXHJcblx0XHRcdGF1dG9wbGF5OiB7XHJcblx0XHRcdFx0ZGVsYXk6IDQwMDAsXHJcblx0XHRcdFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRsb29wOiBmYWxzZSxcclxuXHRcdFx0bmF2aWdhdGlvbjoge1xyXG5cdFx0XHRcdG5leHRFbDogJy5zbGlkZXItbmV3LW5hdi1uZXh0JyxcclxuXHRcdFx0XHRwcmV2RWw6ICcuc2xpZGVyLW5ldy1uYXYtcHJldicsXHJcblx0XHRcdH0sXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzIwOiB7XHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IC0zMCxcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXHJcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDU3Njoge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMjBcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDc2ODoge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDk5Mjoge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDEyMDA6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDUsXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0XHRcclxuXHR9KTtcclxufSgpKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgaW1wb3J0KCcuL2luaXRzJyk7XHJcbn0pO1xyXG5cclxuIl19
