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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9pbml0cy5qcyIsImpzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFHQyxhQUFZO0FBQ1o7QUFDQSxNQUNDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBVixDQUFvQixXQUFwQixFQURiO0FBQUEsTUFFQyxXQUFXLEdBQUcsSUFBSSxJQUFKLEVBRmY7QUFBQSxNQUlDLFNBQVMsR0FBRyxDQUFDLENBQUMsUUFBRCxDQUpkO0FBQUEsTUFLQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQUQsQ0FMWjtBQUFBLE1BTUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFELENBTlY7QUFBQSxNQU9DLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBRCxDQVBWO0FBQUEsTUFTQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQU4sQ0FBZSxTQUFmLENBVGI7QUFBQSxNQVVDLElBQUksR0FBRyxTQUFTLENBQUMsT0FBVixDQUFrQixNQUFsQixNQUE4QixDQUFDLENBQS9CLEdBQW1DLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBVixDQUFnQixNQUFoQixFQUF3QixDQUF4QixDQUFELEVBQTZCLEVBQTdCLENBQTNDLEdBQThFLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFNBQWxCLE1BQWlDLENBQUMsQ0FBbEMsR0FBc0MsRUFBdEMsR0FBMkMsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsTUFBbEIsTUFBOEIsQ0FBQyxDQUEvQixHQUFtQyxFQUFuQyxHQUF3QyxLQVZ6SztBQUFBLE1BV0MsUUFBUSxHQUFHLGlFQUFpRSxJQUFqRSxDQUFzRSxTQUFTLENBQUMsU0FBaEYsQ0FYWjtBQUFBLE1BWUMsV0FBVyxHQUFHLEtBWmY7QUFBQSxNQWFDLGFBQWEsR0FBRyxLQWJqQjtBQUFBLE1BY0MsUUFBUSxHQUFHLEtBZFo7QUFBQSxNQWdCQyxPQUFPLEdBQUc7QUFDVCxJQUFBLFFBQVEsRUFBRSxDQUFDLENB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QUU7QUFDWixhQUFLO0FBQ0osVUFBQSxZQUFZLEVBQUUsQ0FBQyxFQURYO0FBRUosVUFBQSxhQUFhLEVBQUUsQ0FGWDtBQUdKLFVBQUEsY0FBYyxFQUFFO0FBSFosU0FETztBQU1aLGFBQUs7QUFDSixVQUFBLGFBQWEsRUFBRSxDQURYO0FBRUosVUFBQSxZQUFZLEVBQUU7QUFGVixTQU5PO0FBVVosYUFBSztBQUNKLFVBQUEsYUFBYSxFQUFFO0FBRFgsU0FWTztBQWFaLGFBQUs7QUFDSixVQUFBLGFBQWEsRUFBRTtBQURYLFNBYk87QUFnQlosY0FBTTtBQUNMLFVBQUEsYUFBYSxFQUFFO0FBRFY7QUFoQk07QUFiNkMsS0FBbkMsQ0FBeEI7QUFvQ0EsR0F6SkQ7QUEwSkEsQ0E1T0EsR0FBRDs7O0FDSEE7Ozs7Ozs7O0FBRUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3ZEO0FBQUEsMkNBQU8sU0FBUDtBQUFBO0FBQ0QsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuXG5cbihmdW5jdGlvbiAoKSB7XG5cdC8vIEdsb2JhbCBsZXRpYWJsZXNcblx0bGV0XG5cdFx0dXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLFxuXHRcdGluaXRpYWxEYXRlID0gbmV3IERhdGUoKSxcblx0XHRcblx0XHQkZG9jdW1lbnQgPSAkKGRvY3VtZW50KSxcblx0XHQkd2luZG93ID0gJCh3aW5kb3cpLFxuXHRcdCRodG1sID0gJChcImh0bWxcIiksXG5cdFx0JGJvZHkgPSAkKFwiYm9keVwiKSxcblx0XHRcblx0XHRpc0Rlc2t0b3AgPSAkaHRtbC5oYXNDbGFzcyhcImRlc2t0b3BcIiksXG5cdFx0aXNJRSA9IHVzZXJBZ2VudC5pbmRleE9mKFwibXNpZVwiKSAhPT0gLTEgPyBwYXJzZUludCh1c2VyQWdlbnQuc3BsaXQoXCJtc2llXCIpWzFdLCAxMCkgOiB1c2VyQWdlbnQuaW5kZXhPZihcInRyaWRlbnRcIikgIT09IC0xID8gMTEgOiB1c2VyQWdlbnQuaW5kZXhPZihcImVkZ2VcIikgIT09IC0xID8gMTIgOiBmYWxzZSxcblx0XHRpc01vYmlsZSA9IC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxcblx0XHR3aW5kb3dSZWFkeSA9IGZhbHNlLFxuXHRcdGlzTm92aUJ1aWxkZXIgPSBmYWxzZSxcblx0XHRsaXZlZGVtbyA9IGZhbHNlLFxuXHRcdFxuXHRcdHBsdWdpbnMgPSB7XG5cdFx0XHRyZE5hdmJhcjogJCgnLnJkLW5hdmJhcicpLFxuXHRcdH07XG5cdFxuXHRcdGlmIChwbHVnaW5zLnJkTmF2YmFyLmxlbmd0aCkge1xuXHRcdGxldFxuXHRcdFx0bmF2YmFyID0gcGx1Z2lucy5yZE5hdmJhcixcblx0XHRcdGFsaWFzZXMgPSB7XG5cdFx0XHRcdCctJzogICAgIDAsXG5cdFx0XHRcdCctc20tJzogIDU3Nixcblx0XHRcdFx0Jy1tZC0nOiAgNzY4LFxuXHRcdFx0XHQnLWxnLSc6ICA5OTIsXG5cdFx0XHRcdCcteGwtJzogIDEyMDAsXG5cdFx0XHRcdCcteHhsLSc6IDE2MDBcblx0XHRcdH0sXG5cdFx0XHRyZXNwb25zaXZlID0ge307XG5cdFx0XG5cdFx0Zm9yIChsZXQgYWxpYXMgaW4gYWxpYXNlcykge1xuXHRcdFx0bGV0IGxpbmsgPSByZXNwb25zaXZlW2FsaWFzZXNbYWxpYXNdXSA9IHt9O1xuXHRcdFx0aWYgKG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ2xheW91dCcpKSBsaW5rLmxheW91dCA9IG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ2xheW91dCcpO1xuXHRcdFx0aWYgKG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ2RldmljZS1sYXlvdXQnKSkgbGluay5kZXZpY2VMYXlvdXQgPSBuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdkZXZpY2UtbGF5b3V0Jyk7XG5cdFx0XHRpZiAobmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnaG92ZXItb24nKSkgbGluay5mb2N1c09uSG92ZXIgPSBuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdob3Zlci1vbicpID09PSAndHJ1ZSc7XG5cdFx0XHRpZiAobmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnYXV0by1oZWlnaHQnKSkgbGluay5hdXRvSGVpZ2h0ID0gbmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnYXV0by1oZWlnaHQnKSA9PT0gJ3RydWUnO1xuXHRcdFx0aWYgKG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ3N0aWNrLXVwLW9mZnNldCcpKSBsaW5rLnN0aWNrVXBPZmZzZXQgPSBuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdzdGljay11cC1vZmZzZXQnKTtcblx0XHRcdGlmIChuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdzdGljay11cCcpKSBsaW5rLnN0aWNrVXAgPSBuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdzdGljay11cCcpID09PSAndHJ1ZSc7XG5cdFx0XHRpZiAoaXNOb3ZpQnVpbGRlcikgbGluay5zdGlja1VwID0gZmFsc2U7XG5cdFx0XHRlbHNlIGlmIChuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdzdGljay11cCcpKSBsaW5rLnN0aWNrVXAgPSBuYXZiYXIuYXR0cignZGF0YScgKyBhbGlhcyArICdzdGljay11cCcpID09PSAndHJ1ZSc7XG5cdFx0fVxuXHRcdFxuXHRcdHBsdWdpbnMucmROYXZiYXIuUkROYXZiYXIoe1xuXHRcdFx0YW5jaG9yTmF2OiAgICAhaXNOb3ZpQnVpbGRlcixcblx0XHRcdHN0aWNrVXBDbG9uZTogKHBsdWdpbnMucmROYXZiYXIuYXR0cihcImRhdGEtc3RpY2stdXAtY2xvbmVcIikgJiYgIWlzTm92aUJ1aWxkZXIpID8gcGx1Z2lucy5yZE5hdmJhci5hdHRyKFwiZGF0YS1zdGljay11cC1jbG9uZVwiKSA9PT0gJ3RydWUnIDogZmFsc2UsXG5cdFx0XHRyZXNwb25zaXZlOiAgIHJlc3BvbnNpdmUsXG5cdFx0XHRjYWxsYmFja3M6ICAgIHtcblx0XHRcdFx0b25TdHVjazogICAgICAgIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRsZXQgbmF2YmFyU2VhcmNoID0gdGhpcy4kZWxlbWVudC5maW5kKCcucmQtc2VhcmNoIGlucHV0Jyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYgKG5hdmJhclNlYXJjaCkge1xuXHRcdFx0XHRcdFx0bmF2YmFyU2VhcmNoLnZhbCgnJykudHJpZ2dlcigncHJvcGVydHljaGFuZ2UnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9uRHJvcGRvd25PdmVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuICFpc05vdmlCdWlsZGVyO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvblVuc3R1Y2s6ICAgICAgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLiRjbG9uZSA9PT0gbnVsbClcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsZXQgbmF2YmFyU2VhcmNoID0gdGhpcy4kY2xvbmUuZmluZCgnLnJkLXNlYXJjaCBpbnB1dCcpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChuYXZiYXJTZWFyY2gpIHtcblx0XHRcdFx0XHRcdG5hdmJhclNlYXJjaC52YWwoJycpLnRyaWdnZXIoJ3Byb3BlcnR5Y2hhbmdlJyk7XG5cdFx0XHRcdFx0XHRuYXZiYXJTZWFyY2gudHJpZ2dlcignYmx1cicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdFxuXHQvKlxuUmVmZXJlbmNlOiBodHRwOi8vanNmaWRkbGUubmV0L0JCM0pLLzQ3L1xuKi9cblx0XG5cdCQoJ3NlbGVjdC5zZWxlY3QtY3VzdG9tJykuZWFjaChmdW5jdGlvbigpe1xuXHRcdHZhciAkdGhpcyA9ICQodGhpcyksIG51bWJlck9mT3B0aW9ucyA9ICQodGhpcykuY2hpbGRyZW4oJ29wdGlvbicpLmxlbmd0aDtcblx0XHRcblx0XHQkdGhpcy5hZGRDbGFzcygnc2VsZWN0LWhpZGRlbicpO1xuXHRcdCR0aGlzLndyYXAoJzxkaXYgY2xhc3M9XCJzZWxlY3RcIj48L2Rpdj4nKTtcblx0XHQkdGhpcy5hZnRlcignPGRpdiBjbGFzcz1cInNlbGVjdC1zdHlsZWRcIj48L2Rpdj4nKTtcblx0XHRcblx0XHR2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG5cdFx0JHN0eWxlZFNlbGVjdC50ZXh0KCR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcSgwKS50ZXh0KCkpO1xuXHRcdFxuXHRcdHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcblx0XHRcdCdjbGFzcyc6ICdzZWxlY3Qtb3B0aW9ucydcblx0XHR9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcblx0XHRcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mT3B0aW9uczsgaSsrKSB7XG5cdFx0XHQkKCc8bGkgLz4nLCB7XG5cdFx0XHRcdHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG5cdFx0XHRcdHJlbDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnZhbCgpXG5cdFx0XHR9KS5hcHBlbmRUbygkbGlzdCk7XG5cdFx0fVxuXHRcdFxuXHRcdGxldCAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XG5cdFx0XG5cdFx0JHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0JCgnZGl2LnNlbGVjdC1zdHlsZWQuYWN0aXZlJykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24oKXtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS5oaWRlKCk7XG5cdFx0XHR9KTtcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykudG9nZ2xlKCk7XG5cdFx0fSk7XG5cdFx0XG5cdFx0JGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0JHN0eWxlZFNlbGVjdC50ZXh0KCQodGhpcykudGV4dCgpKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHQkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XG5cdFx0XHQkbGlzdC5oaWRlKCk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCR0aGlzLnZhbCgpKTtcblx0XHR9KTtcblx0XHRcblx0XHQkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRcdCRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0JGxpc3QuaGlkZSgpO1xuXHRcdH0pO1xuXHRcdFxuXHRcdHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLXBvcHVsYXItbmV3cycsIHtcblx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXG5cdFx0XHRmcmVlTW9kZTogdHJ1ZSxcblx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0XHRhdXRvcGxheToge1xuXHRcdFx0XHRkZWxheTogNDAwMCxcblx0XHRcdFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxuXHRcdFx0fSxcblx0XHRcdGxvb3A6IGZhbHNlLFxuXHRcdFx0bmF2aWdhdGlvbjoge1xuXHRcdFx0XHRuZXh0RWw6ICcuc2xpZGVyLW5hdi1uZXh0Jyxcblx0XHRcdFx0cHJldkVsOiAnLnNsaWRlci1uYXYtcHJldicsXG5cdFx0XHR9LFxuXHRcdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdFx0MzIwOiB7XG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMzAsXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcblx0XHRcdFx0fSxcblx0XHRcdFx0NTc2OiB7XG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDIwXG5cdFx0XHRcdH0sXG5cdFx0XHRcdDc2ODoge1xuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdDk5Mjoge1xuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdDEyMDA6IHtcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA1LFxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9KTtcblx0XHRcblx0XHRcblx0XHR2YXIgc3dpcGVyQXJ0aWNsZXMgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLXBvcHVsYXItYXJ0aWNsZXMnLCB7XG5cdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0ZnJlZU1vZGU6IHRydWUsXG5cdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxuXHRcdFx0YXV0b3BsYXk6IHtcblx0XHRcdFx0ZGVsYXk6IDQwMDAsXG5cdFx0XHRcdGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHRsb29wOiBmYWxzZSxcblx0XHRcdG5hdmlnYXRpb246IHtcblx0XHRcdFx0bmV4dEVsOiAnLnNsaWRlci1hcnRpY2xlcy1uYXYtbmV4dCcsXG5cdFx0XHRcdHByZXZFbDogJy5zbGlkZXItYXJ0aWNsZXMtbmF2LXByZXYnLFxuXHRcdFx0fSxcblx0XHRcdGJyZWFrcG9pbnRzOiB7XG5cdFx0XHRcdDMyMDoge1xuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogLTMwLFxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXG5cdFx0XHRcdFx0Y2VudGVyZWRTbGlkZXM6IHRydWUsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdDU3Njoge1xuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDIsXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAyMFxuXHRcdFx0XHR9LFxuXHRcdFx0XHQ3Njg6IHtcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHQ5OTI6IHtcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAzLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHQxMjAwOiB7XG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogNCxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSk7XG5cdFx0XG5cdFx0XG5cdFx0dmFyIHN3aXBlck5ld0FydGljbGVzID0gbmV3IFN3aXBlcignLnN3aXBlci1uZXctYXJ0aWNsZXMnLCB7XG5cdFx0XHRzcGFjZUJldHdlZW46IDIwLFxuXHRcdFx0ZnJlZU1vZGU6IHRydWUsXG5cdFx0XHRzbGlkZXNQZXJWaWV3OiAxLFxuXHRcdFx0YXV0b3BsYXk6IHtcblx0XHRcdFx0ZGVsYXk6IDQwMDAsXG5cdFx0XHRcdGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0XHRsb29wOiBmYWxzZSxcblx0XHRcdG5hdmlnYXRpb246IHtcblx0XHRcdFx0bmV4dEVsOiAnLnNsaWRlci1uZXctbmF2LW5leHQnLFxuXHRcdFx0XHRwcmV2RWw6ICcuc2xpZGVyLW5ldy1uYXYtcHJldicsXG5cdFx0XHR9LFxuXHRcdFx0YnJlYWtwb2ludHM6IHtcblx0XHRcdFx0MzIwOiB7XG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAtMzAsXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcblx0XHRcdFx0fSxcblx0XHRcdFx0NTc2OiB7XG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDIwXG5cdFx0XHRcdH0sXG5cdFx0XHRcdDc2ODoge1xuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdDk5Mjoge1xuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdDEyMDA6IHtcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA1LFxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9KTtcblx0XHRcblx0fSk7XG59KCkpOyIsIid1c2Ugc3RyaWN0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICBpbXBvcnQoJy4vaW5pdHMnKTtcbn0pO1xuXG4iXX0=
