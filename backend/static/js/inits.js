"use strict";


(function () {
	// Global letiables
	let
		userAgent = navigator.userAgent.toLowerCase(),
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
			rdNavbar: $('.rd-navbar'),
		};
	
		if (plugins.rdNavbar.length) {
		let
			navbar = plugins.rdNavbar,
			aliases = {
				'-':     0,
				'-sm-':  576,
				'-md-':  768,
				'-lg-':  992,
				'-xl-':  1200,
				'-xxl-': 1600
			},
			responsive = {};
		
		for (let alias in aliases) {
			let link = responsive[aliases[alias]] = {};
			if (navbar.attr('data' + alias + 'layout')) link.layout = navbar.attr('data' + alias + 'layout');
			if (navbar.attr('data' + alias + 'device-layout')) link.deviceLayout = navbar.attr('data' + alias + 'device-layout');
			if (navbar.attr('data' + alias + 'hover-on')) link.focusOnHover = navbar.attr('data' + alias + 'hover-on') === 'true';
			if (navbar.attr('data' + alias + 'auto-height')) link.autoHeight = navbar.attr('data' + alias + 'auto-height') === 'true';
			if (navbar.attr('data' + alias + 'stick-up-offset')) link.stickUpOffset = navbar.attr('data' + alias + 'stick-up-offset');
			if (navbar.attr('data' + alias + 'stick-up')) link.stickUp = navbar.attr('data' + alias + 'stick-up') === 'true';
			if (isNoviBuilder) link.stickUp = false;
			else if (navbar.attr('data' + alias + 'stick-up')) link.stickUp = navbar.attr('data' + alias + 'stick-up') === 'true';
		}
		
		plugins.rdNavbar.RDNavbar({
			anchorNav:    !isNoviBuilder,
			stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
			responsive:   responsive,
			callbacks:    {
				onStuck:        function () {
					let navbarSearch = this.$element.find('.rd-search input');
					
					if (navbarSearch) {
						navbarSearch.val('').trigger('propertychange');
					}
				},
				onDropdownOver: function () {
					return !isNoviBuilder;
				},
				onUnstuck:      function () {
					if (this.$clone === null)
						return;
					
					let navbarSearch = this.$clone.find('.rd-search input');
					
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
	
	$('select.select-custom').each(function(){
		var $this = $(this), numberOfOptions = $(this).children('option').length;
		
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
		
		let $listItems = $list.children('li');
		
		$styledSelect.click(function(e) {
			e.stopPropagation();
			$('div.select-styled.active').not(this).each(function(){
				$(this).removeClass('active').next('ul.select-options').hide();
			});
			$(this).toggleClass('active').next('ul.select-options').toggle();
		});
		
		$listItems.click(function(e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass('active');
			$this.val($(this).attr('rel'));
			$list.hide();
			//console.log($this.val());
		});
		
		$(document).click(function() {
			$styledSelect.removeClass('active');
			$list.hide();
		});
		
		var swiper = new Swiper('.swiper-popular-news', {
			spaceBetween: 20,
			freeMode: true,
			slidesPerView: 1,
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			loop: false,
			navigation: {
				nextEl: '.slider-nav-next',
				prevEl: '.slider-nav-prev',
			},
			breakpoints: {
				320: {
					spaceBetween: -30,
					slidesPerView: 1,
					centeredSlides: true,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 5,
					
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
					spaceBetween: -30,
					slidesPerView: 1,
					centeredSlides: true,
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
			},
		});
		
		
		var swiperNewArticles = new Swiper('.swiper-new-articles', {
			spaceBetween: 20,
			freeMode: true,
			slidesPerView: 1,
			autoplay: {
				delay: 4000,
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
				576: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 5,
					
				},
			},
		});
		
	});
}());