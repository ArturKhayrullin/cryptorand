$(document).ready(function() {
    $('#wrapper').fullpage({
        navigation: true,
        navigationPosition: 'left'
    });

    var modalsOpeningSpeed=300;
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
    			modalsOpeningSpeed, function() {
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
    		modalsOpeningSpeed, function() {
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
      	this.scrollLeft -= (event.deltaY*event.deltaFactor);
    	
      	scrollPercentage = Math.round(100 * $(this).scrollLeft() / ($('.menu-content').width() - $(this).width()));
      	console.log(scrollPercentage);

      	$('.menu-bar-handle').css('left',scrollPercentage+'%').css('transform','translateX(-'+scrollPercentage+'%)');

   });

    $('.slide-opener').click(function() {
    	var slideToScrollTo=$(this).attr('data-slide');
    	$('.menu').animate({
    		opacity: 0},
    		modalsOpeningSpeed, function() {
    		$(this).hide(0, function() {
    			$(this).removeClass('opened');
    			$.fn.fullpage.setAllowScrolling(true);
    			$.fn.fullpage.moveTo(slideToScrollTo);
    		})
    	});
    });


});