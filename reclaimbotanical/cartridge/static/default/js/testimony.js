jQuery(function(){

	var textVal1 = $("#phone1").val();
    var textVal2 = $("#phone2").val();
    var textVal3 = $("#phone3").val();
    var textval = textVal1+textVal2+textVal3;

    jQuery("input[id=phoneNo]").val(textval);
    
	var validatorSettings = jQuery.extend(app.validatorSettings, {
		groups : {
			gender : genders.join(' ')
		},
		errorPlacement : function(error, element) {
			if (element.attr('name') == genders[0] || element.attr('name') == genders[1]) {
				element.removeClass('errorclient');
				element.parents('.value').append(error);
			}
		}
	});
	
	jQuery('.testimonial-form').data('validator', '').validate(validatorSettings);
});