$(function() {
	$('.my_button').click(function() {
        $('.my_cont').slideUp('normal');
        if ($(this).next().is(':hidden')) {
            $(this).next().slideDown('normal');
        }
    });

    $(".my_cont").hide();
});

$(function(){
    $('.fs-modal-btn').on('click', function(){
        $('.fs-popup__overlay').show();
        $('.fs-popup').show();
    });
    $('.fs-close').on('click', function(){
        $('.fs-popup__overlay').hide();
        $('.fs-popup').hide();
    });
    $('input[name="form_date_26"]').click(function () {
        $('img.calendar-icon').trigger('click');
    });
});
