

jQuery(function(){
    
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
            var cc = value(".formfield.card_number");
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
            submission_state : app.proactiv.resources.get("GRMSubmissionStatus", "ORDERSUBMIT"),
            
            form_email  : value(".formfield.email"),
            form_dphone : value(".formfield.phone.daytime"),
            form_ephone : value(".formfield.phone.evening"),
            card_fname  : value(".cb_billing .formfield.first_name"),
            card_lname  : value(".cb_billing .formfield.last_name"),
            address     : value(".cb_billing .formfield.first.address"),
            suppadr     : value(".cb_billing .formfield.second.address"),
            address2    : value(".cb_billing .formfield.second.address"),
            city        : value(".cb_billing .formfield.city"),
            state       : value(".cb_billing .formfield.statezip"),
            zip         : value(".cb_billing .zip"),
            
            
            sameasbilling : $form.find(".cb_shipping .asbilling .checkbox input").is(":checked") ? 'y' : 'n',
            ship_fname    : value(".cb_shipping .formfield.first_name"),
            ship_lname    : value(".cb_shipping .formfield.last_name"),
            s_address     : value(".cb_shipping .formfield.first.address"),
            s_suppard     : value(".cb_shipping .formfield.second.address"),
            s_city        : value(".cb_shipping .formfield.city"),
            s_state       : value(".cb_shipping .formfield.statezip"),
            s_zip         : value(".cb_shipping .zip"),
            
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