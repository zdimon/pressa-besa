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
      spaceBetween: -20,
      freeMode: true,
      slidesPerView: 1,
      // autoplay: {
      // 	delay: 4700,
      // 	disableOnInteraction: false,
      // },
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
          spaceBetween: 10,
          slidesPerView: 1,
          centeredSlides: true
        },
        576: {
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
          slidesPerView: 4,
          spaceBetween: 20
        }
      }
    });
    var swiperNewArticles = new Swiper('.swiper-new-articles', {
      spaceBetween: 20,
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
        576: {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9pbml0cy5qcyIsImpzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFHQyxhQUFZO0FBQ1o7QUFDQSxNQUNDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBVixDQUFvQixXQUFwQixFQURiO0FBQUEsTUFFQyxXQUFXLEdBQUcsSUFBSSxJQUFKLEVBRmY7QUFBQSxNQUlDLFNBQVMsR0FBRyxDQUFDLENBQUMsUUFBRCxDQUpkO0FBQUEsTUFLQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQUQsQ0FMWjtBQUFBLE1BTUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFELENBTlY7QUFBQSxNQU9DLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBRCxDQVBWO0FBQUEsTUFTQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQU4sQ0FBZSxTQUFmLENBVGI7QUFBQSxNQVVDLElBQUksR0FBRyxTQUFTLENBQUMsT0FBVixDQUFrQixNQUFsQixNQUE4QixDQUFDLENBQS9CLEdBQW1DLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBVixDQUFnQixNQUFoQixFQUF3QixDQUF4QixDQUFELEVBQTZCLEVBQTdCLENBQTNDLEdBQThFLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFNBQWxCLE1BQWlDLENBQUMsQ0FBbEMsR0FBc0MsRUFBdEMsR0FBMkMsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsTUFBbEIsTUFBOEIsQ0FBQyxDQUEvQixHQUFtQyxFQUFuQyxHQUF3QyxLQVZ6SztBQUFBLE1BV0MsUUFBUSxHQUFHLGlFQUFpRSxJQUFqRSxDQUFzRSxTQUFTLENBQUMsU0FBaEYsQ0FYWjtBQUFBLE1BWUMsV0FBVyxHQUFHLEtBWmY7QUFBQSxNQWFDLGFBQWEsR0FBRyxLQWJqQjtBQUFBLE1BY0MsUUFBUSxHQUFHLEtBZFo7QUFBQSxNQWdCQyxPQUFPLEdBQUc7QUFDVCxJQUFBLFFBQVEsRUFBRSxDQUFDLENB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QSxNQUFNLEVBQUU7QUFGRyxPQVQ4QztBQWExRCxNQUFBLFdBQVcsRUFBRTtBQUNaLGFBQUs7QUFDSixVQUFBLFlBQVksRUFBRSxDQUFDLEVBRFg7QUFFSixVQUFBLGFBQWEsRUFBRSxDQUZYO0FBR0osVUFBQSxjQUFjLEVBQUU7QUFIWixTQURPO0FBTVosYUFBSztBQUNKLFVBQUEsYUFBYSxFQUFFLENBRFg7QUFFSixVQUFBLFlBQVksRUFBRSxFQUZWO0FBR0osVUFBQSxjQUFjLEVBQUU7QUFIWixTQU5PO0FBV1osYUFBSztBQUNKLFVBQUEsYUFBYSxFQUFFO0FBRFgsU0FYTztBQWNaLGFBQUs7QUFDSixVQUFBLGFBQWEsRUFBRTtBQURYLFNBZE87QUFpQlosY0FBTTtBQUNMLFVBQUEsYUFBYSxFQUFFLENBRFY7QUFFTCxVQUFBLFlBQVksRUFBRTtBQUZUO0FBakJNO0FBYjZDLEtBQW5DLENBQXhCO0FBcUNBLEdBN0pEO0FBOEpBLENBaFBBLEdBQUQ7OztBQ0hBOzs7Ozs7OztBQUVBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUN2RDtBQUFBLDJDQUFPLFNBQVA7QUFBQTtBQUNELENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdC8vIEdsb2JhbCBsZXRpYWJsZXNcclxuXHRsZXRcclxuXHRcdHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSxcclxuXHRcdGluaXRpYWxEYXRlID0gbmV3IERhdGUoKSxcclxuXHRcdFxyXG5cdFx0JGRvY3VtZW50ID0gJChkb2N1bWVudCksXHJcblx0XHQkd2luZG93ID0gJCh3aW5kb3cpLFxyXG5cdFx0JGh0bWwgPSAkKFwiaHRtbFwiKSxcclxuXHRcdCRib2R5ID0gJChcImJvZHlcIiksXHJcblx0XHRcclxuXHRcdGlzRGVza3RvcCA9ICRodG1sLmhhc0NsYXNzKFwiZGVza3RvcFwiKSxcclxuXHRcdGlzSUUgPSB1c2VyQWdlbnQuaW5kZXhPZihcIm1zaWVcIikgIT09IC0xID8gcGFyc2VJbnQodXNlckFnZW50LnNwbGl0KFwibXNpZVwiKVsxXSwgMTApIDogdXNlckFnZW50LmluZGV4T2YoXCJ0cmlkZW50XCIpICE9PSAtMSA/IDExIDogdXNlckFnZW50LmluZGV4T2YoXCJlZGdlXCIpICE9PSAtMSA/IDEyIDogZmFsc2UsXHJcblx0XHRpc01vYmlsZSA9IC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxcclxuXHRcdHdpbmRvd1JlYWR5ID0gZmFsc2UsXHJcblx0XHRpc05vdmlCdWlsZGVyID0gZmFsc2UsXHJcblx0XHRsaXZlZGVtbyA9IGZhbHNlLFxyXG5cdFx0XHJcblx0XHRwbHVnaW5zID0ge1xyXG5cdFx0XHRyZE5hdmJhcjogJCgnLnJkLW5hdmJhcicpLFxyXG5cdFx0fTtcclxuXHRcclxuXHRcdGlmIChwbHVnaW5zLnJkTmF2YmFyLmxlbmd0aCkge1xyXG5cdFx0bGV0XHJcblx0XHRcdG5hdmJhciA9IHBsdWdpbnMucmROYXZiYXIsXHJcblx0XHRcdGFsaWFzZXMgPSB7XHJcblx0XHRcdFx0Jy0nOiAgICAgMCxcclxuXHRcdFx0XHQnLXNtLSc6ICA1NzYsXHJcblx0XHRcdFx0Jy1tZC0nOiAgNzY4LFxyXG5cdFx0XHRcdCctbGctJzogIDk5MixcclxuXHRcdFx0XHQnLXhsLSc6ICAxMjAwLFxyXG5cdFx0XHRcdCcteHhsLSc6IDE2MDBcclxuXHRcdFx0fSxcclxuXHRcdFx0cmVzcG9uc2l2ZSA9IHt9O1xyXG5cdFx0XHJcblx0XHRmb3IgKGxldCBhbGlhcyBpbiBhbGlhc2VzKSB7XHJcblx0XHRcdGxldCBsaW5rID0gcmVzcG9uc2l2ZVthbGlhc2VzW2FsaWFzXV0gPSB7fTtcclxuXHRcdFx0aWYgKG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ2xheW91dCcpKSBsaW5rLmxheW91dCA9IG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ2xheW91dCcpO1xyXG5cdFx0XHRpZiAobmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnZGV2aWNlLWxheW91dCcpKSBsaW5rLmRldmljZUxheW91dCA9IG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ2RldmljZS1sYXlvdXQnKTtcclxuXHRcdFx0aWYgKG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ2hvdmVyLW9uJykpIGxpbmsuZm9jdXNPbkhvdmVyID0gbmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnaG92ZXItb24nKSA9PT0gJ3RydWUnO1xyXG5cdFx0XHRpZiAobmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnYXV0by1oZWlnaHQnKSkgbGluay5hdXRvSGVpZ2h0ID0gbmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnYXV0by1oZWlnaHQnKSA9PT0gJ3RydWUnO1xyXG5cdFx0XHRpZiAobmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnc3RpY2stdXAtb2Zmc2V0JykpIGxpbmsuc3RpY2tVcE9mZnNldCA9IG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ3N0aWNrLXVwLW9mZnNldCcpO1xyXG5cdFx0XHRpZiAobmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnc3RpY2stdXAnKSkgbGluay5zdGlja1VwID0gbmF2YmFyLmF0dHIoJ2RhdGEnICsgYWxpYXMgKyAnc3RpY2stdXAnKSA9PT0gJ3RydWUnO1xyXG5cdFx0XHRpZiAoaXNOb3ZpQnVpbGRlcikgbGluay5zdGlja1VwID0gZmFsc2U7XHJcblx0XHRcdGVsc2UgaWYgKG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ3N0aWNrLXVwJykpIGxpbmsuc3RpY2tVcCA9IG5hdmJhci5hdHRyKCdkYXRhJyArIGFsaWFzICsgJ3N0aWNrLXVwJykgPT09ICd0cnVlJztcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cGx1Z2lucy5yZE5hdmJhci5SRE5hdmJhcih7XHJcblx0XHRcdGFuY2hvck5hdjogICAgIWlzTm92aUJ1aWxkZXIsXHJcblx0XHRcdHN0aWNrVXBDbG9uZTogKHBsdWdpbnMucmROYXZiYXIuYXR0cihcImRhdGEtc3RpY2stdXAtY2xvbmVcIikgJiYgIWlzTm92aUJ1aWxkZXIpID8gcGx1Z2lucy5yZE5hdmJhci5hdHRyKFwiZGF0YS1zdGljay11cC1jbG9uZVwiKSA9PT0gJ3RydWUnIDogZmFsc2UsXHJcblx0XHRcdHJlc3BvbnNpdmU6ICAgcmVzcG9uc2l2ZSxcclxuXHRcdFx0Y2FsbGJhY2tzOiAgICB7XHJcblx0XHRcdFx0b25TdHVjazogICAgICAgIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGxldCBuYXZiYXJTZWFyY2ggPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5yZC1zZWFyY2ggaW5wdXQnKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYgKG5hdmJhclNlYXJjaCkge1xyXG5cdFx0XHRcdFx0XHRuYXZiYXJTZWFyY2gudmFsKCcnKS50cmlnZ2VyKCdwcm9wZXJ0eWNoYW5nZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0b25Ecm9wZG93bk92ZXI6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHJldHVybiAhaXNOb3ZpQnVpbGRlcjtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG9uVW5zdHVjazogICAgICBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy4kY2xvbmUgPT09IG51bGwpXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0bGV0IG5hdmJhclNlYXJjaCA9IHRoaXMuJGNsb25lLmZpbmQoJy5yZC1zZWFyY2ggaW5wdXQnKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYgKG5hdmJhclNlYXJjaCkge1xyXG5cdFx0XHRcdFx0XHRuYXZiYXJTZWFyY2gudmFsKCcnKS50cmlnZ2VyKCdwcm9wZXJ0eWNoYW5nZScpO1xyXG5cdFx0XHRcdFx0XHRuYXZiYXJTZWFyY2gudHJpZ2dlcignYmx1cicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0LypcclxuUmVmZXJlbmNlOiBodHRwOi8vanNmaWRkbGUubmV0L0JCM0pLLzQ3L1xyXG4qL1xyXG5cdFxyXG5cdCQoJ3NlbGVjdC5zZWxlY3QtY3VzdG9tJykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0dmFyICR0aGlzID0gJCh0aGlzKSwgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoO1xyXG5cdFx0XHJcblx0XHQkdGhpcy5hZGRDbGFzcygnc2VsZWN0LWhpZGRlbicpO1xyXG5cdFx0JHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInNlbGVjdFwiPjwvZGl2PicpO1xyXG5cdFx0JHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCI+PC9kaXY+Jyk7XHJcblx0XHRcclxuXHRcdHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnZGl2LnNlbGVjdC1zdHlsZWQnKTtcclxuXHRcdCRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoMCkudGV4dCgpKTtcclxuXHRcdFxyXG5cdFx0dmFyICRsaXN0ID0gJCgnPHVsIC8+Jywge1xyXG5cdFx0XHQnY2xhc3MnOiAnc2VsZWN0LW9wdGlvbnMnXHJcblx0XHR9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcclxuXHRcdFxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xyXG5cdFx0XHQkKCc8bGkgLz4nLCB7XHJcblx0XHRcdFx0dGV4dDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnRleHQoKSxcclxuXHRcdFx0XHRyZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxyXG5cdFx0XHR9KS5hcHBlbmRUbygkbGlzdCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGxldCAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XHJcblx0XHRcclxuXHRcdCRzdHlsZWRTZWxlY3QuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHQkKCdkaXYuc2VsZWN0LXN0eWxlZC5hY3RpdmUnKS5ub3QodGhpcykuZWFjaChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykuaGlkZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS50b2dnbGUoKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHQkbGlzdEl0ZW1zLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0JHN0eWxlZFNlbGVjdC50ZXh0KCQodGhpcykudGV4dCgpKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCR0aGlzLnZhbCgkKHRoaXMpLmF0dHIoJ3JlbCcpKTtcclxuXHRcdFx0JGxpc3QuaGlkZSgpO1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKCR0aGlzLnZhbCgpKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHQkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0JHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdCRsaXN0LmhpZGUoKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHR2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLnN3aXBlci1wb3B1bGFyLW5ld3MnLCB7XHJcblx0XHRcdHNwYWNlQmV0d2VlbjogLTIwLFxyXG5cdFx0XHRmcmVlTW9kZTogdHJ1ZSxcclxuXHRcdFx0c2xpZGVzUGVyVmlldzogMSxcclxuXHRcdFx0Ly8gYXV0b3BsYXk6IHtcclxuXHRcdFx0Ly8gXHRkZWxheTogNDcwMCxcclxuXHRcdFx0Ly8gXHRkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXHJcblx0XHRcdC8vIH0sXHJcblx0XHRcdGxvb3A6IGZhbHNlLFxyXG5cdFx0XHRuYXZpZ2F0aW9uOiB7XHJcblx0XHRcdFx0bmV4dEVsOiAnLnNsaWRlci1uYXYtbmV4dCcsXHJcblx0XHRcdFx0cHJldkVsOiAnLnNsaWRlci1uYXYtcHJldicsXHJcblx0XHRcdH0sXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzIwOiB7XHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IC0zMCxcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXHJcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDU3Njoge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXHJcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ3Njg6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ5OTI6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQxMjAwOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA1LFxyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAyMCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0dmFyIHN3aXBlckFydGljbGVzID0gbmV3IFN3aXBlcignLnN3aXBlci1wb3B1bGFyLWFydGljbGVzJywge1xyXG5cdFx0XHRzcGFjZUJldHdlZW46IDIwLFxyXG5cdFx0XHRmcmVlTW9kZTogdHJ1ZSxcclxuXHRcdFx0c2xpZGVzUGVyVmlldzogMSxcclxuXHRcdFx0YXV0b3BsYXk6IHtcclxuXHRcdFx0XHRkZWxheTogNDAwMCxcclxuXHRcdFx0XHRkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXHJcblx0XHRcdH0sXHJcblx0XHRcdGxvb3A6IGZhbHNlLFxyXG5cdFx0XHRuYXZpZ2F0aW9uOiB7XHJcblx0XHRcdFx0bmV4dEVsOiAnLnNsaWRlci1hcnRpY2xlcy1uYXYtbmV4dCcsXHJcblx0XHRcdFx0cHJldkVsOiAnLnNsaWRlci1hcnRpY2xlcy1uYXYtcHJldicsXHJcblx0XHRcdH0sXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzIwOiB7XHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDEwLFxyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMSxcclxuXHRcdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0NTc2OiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAyMCxcclxuXHRcdFx0XHRcdGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDc2ODoge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDk5Mjoge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDEyMDA6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDQsXHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IDIwLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHR2YXIgc3dpcGVyTmV3QXJ0aWNsZXMgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLW5ldy1hcnRpY2xlcycsIHtcclxuXHRcdFx0c3BhY2VCZXR3ZWVuOiAyMCxcclxuXHRcdFx0ZnJlZU1vZGU6IHRydWUsXHJcblx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXHJcblx0XHRcdGF1dG9wbGF5OiB7XHJcblx0XHRcdFx0ZGVsYXk6IDQzMDAsXHJcblx0XHRcdFx0ZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRsb29wOiBmYWxzZSxcclxuXHRcdFx0bmF2aWdhdGlvbjoge1xyXG5cdFx0XHRcdG5leHRFbDogJy5zbGlkZXItbmV3LW5hdi1uZXh0JyxcclxuXHRcdFx0XHRwcmV2RWw6ICcuc2xpZGVyLW5ldy1uYXYtcHJldicsXHJcblx0XHRcdH0sXHJcblx0XHRcdGJyZWFrcG9pbnRzOiB7XHJcblx0XHRcdFx0MzIwOiB7XHJcblx0XHRcdFx0XHRzcGFjZUJldHdlZW46IC0zMCxcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDEsXHJcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdDU3Njoge1xyXG5cdFx0XHRcdFx0c2xpZGVzUGVyVmlldzogMixcclxuXHRcdFx0XHRcdHNwYWNlQmV0d2VlbjogMjAsXHJcblx0XHRcdFx0XHRjZW50ZXJlZFNsaWRlczogZmFsc2UsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ3Njg6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQ5OTI6IHtcclxuXHRcdFx0XHRcdHNsaWRlc1BlclZpZXc6IDMsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQxMjAwOiB7XHJcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiA1LFxyXG5cdFx0XHRcdFx0c3BhY2VCZXR3ZWVuOiAyMCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblx0XHRcclxuXHR9KTtcclxufSgpKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgaW1wb3J0KCcuL2luaXRzJyk7XHJcbn0pO1xyXG5cclxuIl19
