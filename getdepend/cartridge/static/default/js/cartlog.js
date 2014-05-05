
    var previousQty = "";

jQuery(function(){
	previousQty=$('.quantityselector').attr('value');
	jQuery('.quantityselector').change(function(){
		var currentQty=$(this).attr('value');
		s.linkTrackVars='events';
		if(currentQty > previousQty){
			s.linkTrackEvents='scAdd';
		    s.events="scAdd";
		}
		else if (currentQty < previousQty){
			 s.linkTrackEvents='scRemove';
	    	 s.events="scRemove";
		 }
	    s.tl(this,'o',"Qty Update"); 
	    previousQty=currentQty;
	});
	
    jQuery(".continueBtn").click(function(){
    	
    	
    	if(!GRMCartLogEnabled) return;
        
        var $form = jQuery(this).parents("form:first");
        
        var value = function(name){
            var $element = $form.find(name).find("input,select");
            return $element.is(':disabled')? "" : $element.val();
        };
        
        var gender = function(){
            if($form.find(".formfield.gender input[value='male']").is(":checked")){
                return "male";
            }
            
            if($form.find(".formfield.gender input[value='female']").is(":checked")){
                return "female";
            }
            
            return "";
        };
        
        var creditCardName = function(){
            var cc = value(".cardNumber.formfield, .formfield.card_number");
            if(cc.length < 8){
                return cc;
            }else{
                var matches = cc.match(/^(....)(.*)(....)$/)
                return matches[1] + matches[2].replace(/./g, "*") + matches[3];
            }
        };
        
        var creditCardMonth = function(){
            var month = value(".formfield.expiration_date .month") + "";
            return month.length == 1? "0" + month : month; 
        };
        
        
        var logData = {
            submission_state : app.getdepend.resources.get("GRMSubmissionStatus", "ORDERSUBMIT"),
            
            form_email  : value(".formfield.email"),
            form_dphone : value(".formfield.phone.daytime"),
            form_ephone : value(".formfield.phone.evening"),
            card_fname  : value(".cbBilling .formfield.firstName"),
            card_lname  : value(".cbBilling .formfield.lastName"),
            address     : value(".cbBilling .formfield.first.address"),
            suppadr     : value(".cbBilling .formfield.second.address"),
            address2    : value(".cbBilling .formfield.second.address"),
            city        : value(".cbBilling .formfield.city"),
            state       : value(".cbBilling .formfield.statezip"),
            zip         : value(".cbBilling .zip"),
            
            
            sameasbilling : $form.find(".cartShipping .asbilling .checkbox input").is(":checked") ? 'y' : 'n',
            ship_fname    : value(".cartShipping .formfield.firstName"),
            ship_lname    : value(".cartShipping .formfield.lastName"),
            s_address     : value(".cartShipping .formfield.first.address"),
            s_suppard     : value(".cartShipping .formfield.second.address"),
            s_city        : value(".cartShipping .formfield.city"),
            s_state       : value(".cartShipping .formfield.statezip"),
            s_zip         : value(".cartShipping .zip"),
            
            formpwd : value(".formfield.password"),
            retypformpwd: value(".formfield.passwordconfirm"),
            age: value(".formfield.age"),
            gender: gender(),
            
            paytype     : $form.find(".paymentmethodselector").val(),
            card_number : creditCardName(),
            card_month  : creditCardMonth(), 
            card_year   : value(".formfield.expiration_date .year")
        };
        
        jQuery.ajax({url   : app.URLs.cartLogUrl,
                     data  : logData,
                     async : false});
    });
});