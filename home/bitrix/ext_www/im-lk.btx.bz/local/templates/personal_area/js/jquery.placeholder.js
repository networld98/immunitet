(function($) {

	if ( !Modernizr.input.placeholder) {

		var placeholderElement = $('input[placeholder],textarea[placeholder]');

		placeholderElement.each(function() {
			
			if ( $(this).val() != "" ) {
				return;
			};

			var placeholder = $(this).attr('placeholder');


			$(this).val($(this).attr('placeholder')).addClass('placeholder');


			$(this)
				.on('focus', function() {
			
					if ( $(this).val() == placeholder ) {
						$(this).val('').removeClass('placeholder');
					};	

				})
				.on('blur', function() {
					
					if ( $(this).val() == "" || $(this).val() == placeholder ) {
						$(this).val($(this).attr('placeholder')).addClass('placeholder');
					};
					
				});


		});

		$('form').on('submit', function() {
			
			$(this).find('[placeholder]').each(function() {
				if ( $(this).val() == $(this).attr('placeholder')) {
					$(this).val('');
				};
			});
			
		});

	};

})(jQuery);