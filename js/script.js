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

    $('#polygon-circle .inner-circle').css('border-width',($(window).width()*0.35156/100)+'px');

    var modalsOpeningSpeed = 300;
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
    // $.fn.fullpage.destroy();

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

    $('#main_polygon_div').css('transform', 'translate(-50%, -50%) scale(' + (1545.08066 / $(window).width()) + ')');


    var factor = 0.8;







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





});