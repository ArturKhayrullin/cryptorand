/*POLYGON ANIMATION*/
var motionPath;
var overallTime = 5000;
var point1 = overallTime * 0.09000;
var point2 = overallTime * 0.25000;
var point3 = overallTime * 0.41200;
var point4 = 0.58000 * overallTime;
var point5 = overallTime * 0.75200;
var point6 = overallTime * (0.92000);
var timesArray = ['', point1, point2, point3, point4, point5, point6];
var i = 0;
var previousDirection = 'down';

/*MODALS SPEED*/
var modalsOpeningSpeed = 700;
/*LOADER TIME*/
var loaderTime = 5000;
var loaderPath;
var loaderPathMotion;
$(document).ready(function() {

    $('#wrapper').fullpage({
        navigation: true,
        navigationPosition: 'left',
        scrollingSpeed: 1000,
        onLeave: function(index, nextIndex, direction) {
            console.log('Going from ' + index + ' to ' + nextIndex);

            if (previousDirection != direction)
                motionPath.reverse();


            motionPath.play();
            setTimeout(function() {
                motionPath.pause();
                motionPath.seek(timesArray[nextIndex]);
            }, Math.abs(timesArray[nextIndex] - timesArray[index]));



            previousDirection = direction;
        }
    });


    var timerCounter = 0;

    loaderPath = anime.path('#loader-path');


    /*MOBILE ONLY CODE*/
    if ($(window).width() <= 1024) {
        $('.menu-get-in-touch').addClass('button');
        $('.loader-svg-container').css('transform', 'scale(' + ($(window).width() + 8) / ($('.loader-svg-container').width() / 1.8355) + ') translateX(-20%)');
	    
	    loaderPathMotion = anime({
	        targets: '#loader-circle',
	        translateX: loaderPath('x'),
	        translateY: loaderPath('y'),
	        rotate: loaderPath('angle'),
	        easing: 'linear',
	        duration: loaderTime*3,
	        loop: false,
	        autoplay: false,
	    });

	    loaderPathMotion.seek(3050);
	    loaderPathMotion.play();

	    var pathTimeout = setTimeout(function() {
	    	
	    }, loaderTime)

	    var loaderTimer = setInterval(function() {
	        $('#loader-percentage-value').html(++timerCounter);
	        if (timerCounter >= 100) {
	            clearInterval(loaderTimer);

	            $('#loader').animate({
	                    opacity: 0
	                },
	                modalsOpeningSpeed,
	                function() {
	                    $(this).css('display', 'none');
	                    loaderPathMotion.pause();
	                });
	        }
	    }, loaderTime / 100);    
    }

    /*DESKTOP ONLY CODE*/

    if ($(window).width() > 1024) {
        /*BACKGROUND POLYGONS SIZE*/

        $('#main_polygon_div').css('transform', 'translate(-50%, -50%) scale(' + (($(window).height() * 0.50312) / 487.15) + ')');
        $('.loader-svg-container').css('transform', 'scale(' + ($(window).width() + 8) / ($('.loader-svg-container').width()) + ')');
	    loaderPathMotion = anime({
	        targets: '#loader-circle',
	        translateX: loaderPath('x'),
	        translateY: loaderPath('y'),
	        rotate: loaderPath('angle'),
	        easing: 'linear',
	        duration: loaderTime*1.2,
	        loop: false,
	        autoplay: true,
	    });

	    var loaderTimer = setInterval(function() {
	        $('#loader-percentage-value').html(++timerCounter);
	        if (timerCounter >= 100) {
	            clearInterval(loaderTimer);

	            $('#loader').animate({
	                    opacity: 0
	                },
	                modalsOpeningSpeed,
	                function() {
	                    $(this).css('display', 'none');
	                });
	        }
	    }, loaderTime / 100);        
    
    }







    $('.modal-opener').click(function() {
        var button = $(this);
        if ($('.opened').length > 0) {
            $('.opened').animate({
                    opacity: 0
                },
                modalsOpeningSpeed,
                function() {

                    $(this).removeClass('opened').hide(0, function() {
                        console.log('opened hidden');
                        $.fn.fullpage.setAllowScrolling(true);
                        $('#' + $(button).attr('data-modal')).addClass('opened').show(0, function() {
                            console.log('opened shown')
                            $('#' + $(button).attr('data-modal')).animate({ opacity: 1 }, modalsOpeningSpeed);
                        });

                    });


                });
        } else {
            $('#' + $(button).attr('data-modal')).addClass('opened').show(0, function() {
                console.log('opened shown')
                $('#' + $(button).attr('data-modal')).animate({ opacity: 1 }, modalsOpeningSpeed);
            });
        }

        $.fn.fullpage.setAllowScrolling(false);

    });

    $('.menu-opener').click(function() {
        $('.menu').show(0, function() {
            $(this).animate({
                    opacity: 1
                },
                modalsOpeningSpeed,
                function() {
                    $(this).addClass('opened');
                    $.fn.fullpage.setAllowScrolling(false);
                });
        })
    });

    $('.close').click(function() {
        var modal = $(this).closest('.modal, .menu');
        $(modal).animate({
                opacity: 0
            },
            modalsOpeningSpeed,
            function() {
                $(modal).removeClass('opened').hide();
                $.fn.fullpage.setAllowScrolling(true);
            });
    });

    $('#scroll-down-arrow').click(function() {
        $.fn.fullpage.moveSectionDown();
    });

    $('.logo').click(function(e) {
        e.preventDefault();
        $.fn.fullpage.moveTo(1);
    });

    var scrollPercentage;

    $(".menu-wrapper").mousewheel(function(event) {

        event.preventDefault();
        this.scrollLeft -= (event.deltaY * event.deltaFactor);

        scrollPercentage = Math.round(100 * $(this).scrollLeft() / ($('.menu-content').width() - $(this).width()));
        console.log(scrollPercentage);

        $('.menu-bar-handle').css('left', scrollPercentage + '%').css('transform', 'translateX(-' + scrollPercentage + '%)');
        $('.menu-graph').css('left', -9 * (scrollPercentage / 100) + '%');

    });

    $('.slide-opener').click(function() {
        var slideToScrollTo = $(this).attr('data-slide');
        $('.menu').animate({
                opacity: 0
            },
            modalsOpeningSpeed,
            function() {
                $(this).hide(0, function() {
                    $(this).removeClass('opened');
                    $.fn.fullpage.setAllowScrolling(true);
                    $.fn.fullpage.moveTo(slideToScrollTo);
                })
            });
    });






    var path = anime.path('#main_polygon path');

    motionPath = anime({
        targets: '.polygon #polygon-circle',
        translateX: path('x'),
        translateY: path('y'),
        rotate: path('angle'),
        easing: 'linear',
        duration: overallTime,
        loop: false,
        autoplay: false,
    });

    motionPath.seek(point1);









    function hasTouch() {
        return 'ontouchstart' in document.documentElement ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;
    }


    if ($(window).width() <= 1024) {
        if (hasTouch()) { // remove all :hover stylesheets
            try { // prevent exception on browsers not supporting DOM styleSheets properly
                for (var si in document.styleSheets) {
                    var styleSheet = document.styleSheets[si];
                    if (!styleSheet.rules) continue;

                    for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                        if (!styleSheet.rules[ri].selectorText) continue;

                        if (styleSheet.rules[ri].selectorText.match(':hover')) {
                            styleSheet.deleteRule(ri);
                        }
                    }
                }
            } catch (ex) {
                console.log(ex);
            }
        }



    }


});