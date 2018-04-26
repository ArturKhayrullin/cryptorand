$(document).ready(function() {
    $('#wrapper').fullpage({
        navigation: true,
        navigationPosition: 'left'
    });

    var modalsOpeningSpeed=300;
    $('.modal-opener').click(function() {
        var button = $(this);
        if ($('.modal.opened').length > 0) {
            $('.modal.opened').animate({
                    opacity: 0
                },
                modalsOpeningSpeed,
                function() {

                    $(this).removeClass('opened').hide(0, function() {
                        console.log('opened hidden');
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

    });

    $('.modal .close').click(function() {
    	var modal = $(this).closest('.modal');
    	$(modal).animate({
    		opacity: 0
    		},
    		modalsOpeningSpeed, function() {
    			$(modal).removeClass('opened').hide();
    	});
    });

    $('#scroll-down-arrow').click(function() {
    	$.fn.fullpage.moveSectionDown();
    });

    $('.logo').click(function(e) {
    	e.preventDefault();
    	$.fn.fullpage.moveTo(1);
    })
});