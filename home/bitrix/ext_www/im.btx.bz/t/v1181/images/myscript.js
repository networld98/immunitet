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
	
	$('.fs-btn').on('click', function(){
	
		setTimeout(function(){
			function formsStepChange(){
				var currentStep = $('.fs-progress__current').text() * 1;
			    if (currentStep == 1) { 
			        $('.fs-wrapper').addClass('first-step');
			        $('.fs-wrapper').removeClass('second-step');
			    }
			    else if (currentStep == 2) {
			        $('.fs-wrapper').addClass('second-step');
			        $('.fs-wrapper').removeClass('third-step');
			        $('.fs-prev').prependTo('.fs-controls');
			    }
				else if (currentStep == 3) {
			        $('.fs-wrapper').addClass('third-step');
			        $('.fs-prev').prependTo('.fs-submit__wrapper');
					$('input.fs-submit.fs-btn2').on('click', function(){
						setTimeout(function(){
							$('.fs-wrapper').addClass('final-step');
						},500);
					});
				}
			};
			
			$('.fs-wrapper').on('click', function(){
				setTimeout(formsStepChange, 100);
			});
			
			
			$('.fs-input input.fs-input__field.init-calendar').attr('placeholder', 'Выберите дату');
			$('.fs-selectbox__selected .fs-selectbox__text').text('Выберите вид услуги');
			$('input[name="phone"]').attr('placeholder', '+7 (000) 000-00-00');
			$('input[name="phone"]').mask('+7 (***) ***-**-**');
		}, 1000);
	});
	
	$('a[href="/zapis-na-priyem"]').addClass('popup-fs').attr('href', 'javascript:void(0);');
	$('.popup-fs').on('click', function(){
		$('.fs-btn').trigger('click');
	});
	
});

$(function(){
});