$(document).ready(function() {

    /* detect transit support */
    let transitFlag = true;
    if (!Modernizr.cssanimations) {
        transitFlag = false;
    }

    /* sliders init */
    let newestSlider = $('#newestSlider');
    newestSlider.slick({
        dots: false,
        infinite: true,
        arrows: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        cssEase: 'none',
        prevArrow: $('.nsp'),
        nextArrow: $('.nsn'),
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 440,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    });

    let actualArticlesSlider = $('#actualArticlesSlider');
    actualArticlesSlider.slick({
        dots: false,
        infinite: true,
        arrows: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: 'none',
        prevArrow: $('.asp'),
        nextArrow: $('.asn'),
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 440,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    });

    let booksSlider = $('#booksSlider');
    booksSlider.slick({
        dots: false,
        infinite: true,
        arrows: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        cssEase: 'none',
        prevArrow: $('.bs-prev'),
        nextArrow: $('.bs-next'),
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 440,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    });
    /* end sliders init */

    /* mobile menu */
    let burgerMenuLink = $('#burgerMenuLink');
    let mobMenuOverflow = $('#mobMenuOverflow');
    let mobMenu = $('#mobMenu');
    burgerMenuLink.on('click', function (e) {

        e.preventDefault();

        if (!mobMenu.hasClass('mob-menu-opened')) {

            mobMenu.addClass('mob-menu-opened');
            mobMenuOverflow.stop(true, true).fadeIn(300);
        }
    });
    mobMenuOverflow.on('click', function () {

        if (mobMenu.hasClass('mob-menu-opened')) {

            mobMenu.removeClass('mob-menu-opened');
            mobMenuOverflow.stop(true, true).fadeOut(300);
        }
    });
    /* end mobile menu */

    /* site header and container sizes */
    let siteHeader = $('#siteHeader');
    let siteContainer = $('#siteContainer');
    $(window).on('load', function () {

        setHeaderAndContainerSizes();
    });
    $(window).on('resize', function () {

        setHeaderAndContainerSizes();
        mobMenu.removeClass('mob-menu-opened');
        mobMenuOverflow.hide();
    });
    function setHeaderAndContainerSizes() {

        let t;
        clearTimeout(t);
        t = setTimeout(function () {

            siteContainer.css('padding-top', siteHeader.height() + 'px');

        }, 300);
    }
    /* end site header and container sizes */

    /* popup windows */
    function showForm(formElem) {
        $(".popup-overlay").fadeIn(fadeSpeed);
        $(formElem).css({
            "margin-top": "-" + ($(formElem).height() / 2) + "px",
            "top": ($(window).height() / 2) + $(window).scrollTop() + "px"
        }).fadeIn(fadeSpeed);
    }
    function hideForm() {
        $(".popup-overlay").fadeOut(fadeSpeed);
        $(".popup-wrapper").fadeOut(fadeSpeed);
    }
    /* end popup windows */
});