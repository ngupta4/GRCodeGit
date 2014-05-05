jQuery(document).ready(function() {	
	/*Payment Method Change method*/
	jQuery("#paymentMethodSelection").change(function() {
		if(isBankAccountSelected()){
			enableECheck();
			clearPaymentOption("ECheck");
		}else if(isCreditCardSelected()){
			enableCreditCards();
			clearPaymentOption("CreditCard");
		}else if(isPayLaterSelected()){
			enablePayLater();
		}else if(isPayPalSelected()){			
			enablePayPal();
		}
	});
	
	/*Paypal click handling*/	
	jQuery("#paywithpaypal").click(function(){
		  handleRequiredAttr( false);
		  jQuery('input[id="paymentMethod"]').attr('value',"PayPal");
		//Commenting this because the below mentioned function will be called from submit handler in airline.js
		 // beforesubmitcheck(); 
		  clearPaymentOption("CreditCard"); 
		   //Omniture link tracking code
		  s.linkTrackVars='prop56,eVar56';
		  s.prop56=campaignCode+":Paypal";
		  s.eVar56=s.prop56;
		  s.tl(this,'o',"paypal");	   
// Commenting this because the swap offer code call is made just before form submit.
//		  var plSelected = wasPayLaterSelected();
//		  if( plSelected){
//			  swapOfferCode("PayPal");
//		  }
	 	});

	
	jQuery('.pay_method_section .checkout_box_inner').click(function(){
		  handleRequiredAttr( true);
		  $('input[id="paymentMethod"]').removeClass("required");
	 });
	
	jQuery('.pay_method_section .agree_box').click(function(){
		  handleRequiredAttr( true);
		  $('input[id="paymentMethod"]').removeClass("required");
	 });
	
	$('.eCheckPaymentinfo .eCheckRouting .value span.errormessage').addClass('routingerrormsg');
	$('.eCheckPaymentinfo .eCheckAccount .value span.errormessage').addClass('accounterrormsg');

jQuery("#routing").keydown(function(){
	$(this).removeClass('errormessage');
	$('.eCheckPaymentinfo .eCheckRouting .value span.errormessage.routingerrormsg').hide();
});

jQuery("#account").keydown(function(){
	$(this).removeClass('errormessage');
	$('.eCheckPaymentinfo .eCheckAccount .value span.errormessage.accounterrormsg').hide();
});

$(".checkoutimgs select").each(function(){
	 $(this).bind('change', function(){
		 $(".agree_box .checkbox").find("span.errormessage").hide();
		 $(".card_details").find("span.errormessage").hide();
		 $(".card_details input").removeClass("errormessage");
		 $(".card_details select").removeClass("errormessage");
		 
		 $(".echeck_number").find("span.errormessage").hide();
		 $(".echeck_number input").removeClass("errormessage");
		 })
	});

});

function  enableSelectedCards(){
	var comingFrom = "onLoadNError";
	if(isPayLaterSelected()){
		enablePayLater( comingFrom);
	}else if(isCreditCardSelected()){
		enableCreditCards();
	}else if(isBankAccountSelected()){
		enableECheck();
	}else if(isPayPalSelected()){
		enablePayPal();
	}else{
		//default enable credit card
		enableCreditCards();
	}
}

/**
 * Swap offer code for paypal
 */
function swapPaypalOfferCodeandSubmit(f){	
		  jQuery.getJSON(
					app.proactiv.resources.get('updateSupplyURL'),
					{
						pid : jQuery('.coreProductID').val(),
						isKit : 'true',
						paymentMethodChange : 'true',
						paymentMethod : 'PayPal'	
					},
					function(supply) {
						if (supply.success) {
							//updateProductForPaymentMethodChange(supply,true);							
							f.submit();
						}
					}
				); 
}

function enableCreditCards(){
	jQuery('.payment_info .card_details').show().find(':input').removeAttr('disabled');
	jQuery('.payment_info .echeck_number').hide().find(':input').attr('disabled','disabled');
	var plSelected = wasPayLaterSelected();
	setPayOptionAsSelected('ccimg');
	jQuery('div.agree_box p').show();
	jQuery('div.agree_box div.checkbox label').html(" ");
	jQuery('#termsAndConditionCreditCard').show();
	jQuery('#termsAndConditionPayLater').hide();
	jQuery('#termsAndConditionBankAccount').hide();
	jQuery('#termsAndConditionPayPal').hide();
	jQuery('.paypal_number').hide();
	jQuery('.payLater_number').hide();
	jQuery('#agreeTermsPL').hide();
	jQuery('.checkout_bottom').removeClass('PayLater');
	jQuery('#termsAndConditionPLForBHCustomer').hide();
	// for mandatory sign
	jQuery('div.agree_box div.checkbox span.requiredindicator').hide();
	//Swap offer code only if Previous payment method was PayLater.
	
	if( plSelected){
		swapOfferCode("CreditCard");
	}
	
	if(jQuery('#termsAndConditionTabinline')){
		jQuery('#termsAndConditionTabinline').show();
	}
}


function enableECheck(){
	jQuery('input[id="paymentMethod"]').attr('value',app.resources['ECHECK_METHOD_ID']);
	jQuery(".payment_info .echeck_number").show().find(':input').removeAttr('disabled');
	var plSelected = wasPayLaterSelected();
	setPayOptionAsSelected('ecimg');
	jQuery('.payment_info .card_details').hide().find(':input').attr('disabled','disabled');
	
	//jQuery('div.agree_box p').hide();
	jQuery('div.agree_box div.checkbox label').html(" ");
	jQuery('#termsAndConditionCreditCard').hide();
	jQuery('#termsAndConditionPayLater').hide();
	jQuery('#termsAndConditionBankAccount').show();
	jQuery('#termsAndConditionPayPal').hide();
	jQuery('.paypal_number').hide();
	jQuery('.payLater_number').hide();
	jQuery('#agreeTermsPL').hide();
	jQuery('.checkout_bottom').removeClass('PayLater');
	jQuery('#termsAndConditionPLForBHCustomer').hide();
	// for mandatory sign
	jQuery('div.agree_box div.checkbox span.requiredindicator').hide();
//Swap offer code only if Previous payment method was PayLater.
	if( plSelected){
		swapOfferCode("ECheck");
	}
}

function enablePayLater( comingFrom){	
	//Always swap offer codes for paylater
	if( comingFrom != "onLoadNError"){
		swapOfferCode('PayLater');
	}
	else{
		showPayLaterSection();
	}
}

function showPayLaterSection(){
	jQuery('input[id="paymentMethod"]').attr('value',app.resources['PAYLATER_METHOD_ID']);
	jQuery('.payment_info .card_details').hide().find(':input').attr('disabled','disabled');
	jQuery('.payment_info .echeck_number').hide().find(':input').attr('disabled','disabled');
	setPayOptionAsSelected('plimg');
	var showPopUpBH = jQuery('#showPopUpForBH');	
	if(showPopUpBH.val()=='true'){		
		jQuery('#termsAndConditionPLForBHCustomer').show();
	}
	else{ 
		jQuery('#termsAndConditionPayLater').show();
	}
	jQuery('div.agree_box div.checkbox label').html("Agree to Terms and Conditions below ");
	jQuery('div.agree_box div.checkbox span.requiredindicator').show();
	//jQuery('div.agree_box p').hide();
	jQuery('#termsAndConditionCreditCard').hide();
	jQuery('#termsAndConditionBankAccount').hide();
	jQuery('#termsAndConditionPayPal').hide();
	jQuery('.paypal_number').hide();
	jQuery('.payLater_number').show();
	jQuery('#agreeTermsPL').show();
	jQuery('.checkout_bottom').addClass('PayLater');
	jQuery('#dwfrm_personinf_agree').removeAttr('checked');
}

function enablePayPal(){	
	jQuery('input[id="paymentMethod"]').attr('value',"PayPal");
	jQuery('.payment_info .card_details').hide().find(':input').attr('disabled','disabled');
	jQuery('.payment_info .echeck_number').hide().find(':input').attr('disabled','disabled');
	var plSelected = wasPayLaterSelected();
	setPayOptionAsSelected('ppimg')
	//jQuery('div.agree_box p').hide();
	jQuery('#termsAndConditionCreditCard').hide();
	jQuery('#termsAndConditionPayLater').hide();
	jQuery('#termsAndConditionBankAccount').hide();
	jQuery('#termsAndConditionPayPal').show();
	jQuery('.paypal_number').show();
	jQuery('.payLater_number').hide();
	jQuery('#agreeTermsPL').hide();
	jQuery('.checkout_bottom').removeClass('PayLater');
	jQuery('#termsAndConditionPLForBHCustomer').hide();
//Swap offer code only if Previous payment method was PayLater.
	if( plSelected){
		swapOfferCode("PayPal");
	}
	jQuery('#dwfrm_personinf_agree').removeAttr('checked');
}


function handleRequiredAttr(attrVal){
	if( attrVal){
		jQuery('.pay_method_section .checkout_box_inner').find(':input').addClass('required');
		jQuery('.pay_method_section .agree_box').find(':input').addClass('required');
		$("#paymentMethodSelection").removeClass('required');
	}else{
		jQuery('.pay_method_section .checkout_box_inner').find(':input').removeClass('required');
		jQuery('.pay_method_section .agree_box').find(':input').removeClass('required');
	}
}

// Function to do an ajax call for swapping offer codes in case of Pay Later payment method.
function swapOfferCode(payMethod){	
	jQuery.getJSON(
			app.proactiv.resources.get('updateSupplyURL'),
			{
				pid : jQuery('.coreProductID').val(),
				isKit : 'true',
				paymentMethodChange : 'true',
				paymentMethod : payMethod	
			},
			function(supply) {
				if (supply.success) {
					swapFreeVitaminOfferCode(payMethod);
					updateProductForPaymentMethodChange(supply);
				}
			}
		);
}



//Function to do an ajax call for swapping offer codes in case of Pay Later payment method.
function swapFreeVitaminOfferCode(payMethod){
	
	var vitID = $("#vitPresentInCart").val();
	if( vitID != null && vitID != "undefined" && vitID == "true"){
		jQuery.getJSON(
				app.proactiv.resources.get('updateSupplyURL'),
				{
					pid : jQuery('.crossSellPLSwap').val(),
					isKit : 'false',
					paymentMethodChange : 'true',
					paymentMethod : payMethod	
				},
				function(supply) {
					if (supply.success) {
						updateProductInfoForVit(supply);
					}
				}
			); 
	}
}



function updateProductInfoForVit(supply){
	jQuery(app.proactiv.resources.get('vitaminname')).html(supply.update.ProdName.stringValue);
	jQuery(app.proactiv.resources.get('vitaminsection')).html(supply.update.CartDescription.stringValue);
	var a = $('<a />');
    a.attr('href', 'javascript:void(0);');
    a.attr('name', supply.update.ProdId.stringValue);
    $(".coreidCY").attr("value", supply.update.ProdId.stringValue);
    a.attr('title', 'remove');
    a.text(' remove');
    a.attr('class', 'remove_vitamin');
    $('div.name.vitamin').append(a);
    $(".crossSellPLSwap").attr("value",supply.update.ProdId.stringValue);
    $('.remove_vitamin').live('click', function () {
    	$(".row.actionPanel").removeClass("fullBar");
        var prodId = $(this).attr('name');
        jQuery.getJSON(
            app.proactiv.resources.get('removeVitaminURL'), {
                pid: prodId
            },
            function (supply) {
                if (supply.success) {
                    $('.name.vitamin').html('');
                    $('.shortDescription.vitamin').html('');
                    //$('.vitaminProduct').show();
                    var coreidVal = jQuery('.coreid').val();
                    $(".coreidCY").attr("value", coreidVal);
                    $(".crossSellIDAddedToCart").attr("value","");
                    $("#vitPresentInCart").attr("value", false);
                    $('.vita').show();
                    showPayPal();
                }
            }
        );
        s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":RemoveVitamin";
        s.eVar56 = s.prop56;
        s.tl(this, 'o', "remove vitamin");
    });
}


function updateProductForPaymentMethodChange(supply,dontDisplayPLSection){	
	updateProductInfo(supply);
	var isSelected = 'false';
	var i;
  	var  options ='';
  	var isSelected = 'false';
    for(i=0;i<=supply.update.ShipList.length-1; i++){
    	if(supply.update.ShipList[i].selected=='true'){
       	    options += '<option value="'+ supply.update.ShipList[i].value + '" selected="selected">' +supply.update.ShipList[i].lable + '</option>';
       	    isSelected='true';
    	}
    	else{
        	if(i==(supply.update.ShipList.length-1) && isSelected == 'false'){
	        	    options += '<option value="'+ supply.update.ShipList[i].value + '" selected="selected">' +supply.update.ShipList[i].lable + '</option>';			        	
        	}
        	else{
	        	 options += '<option value="'+ supply.update.ShipList[i].value + '">' +supply.update.ShipList[i].lable + '</option>';			        	
        	}		
    	}
    }
     $(".shipList").html(options);
     $('#daySupply').empty();
      	var  sullpyOptions ='';
        for(i=0;i<supply.update.daySupply.length; i++){
        	sullpyOptions += '<option value="'+ supply.update.daySupply[i].value + '">' +supply.update.daySupply[i].label + '</option>';			        	
         }
     $("#daySupply").html(sullpyOptions);
	//jQuery(app.proactiv.resources.get('vitaminsection')).html(supply.update.CartDescription.stringValue);
	//$('.coreProductID').hide();    
     $("#coreProductID").attr("value",supply.update.CoreId.stringValue);  
     
     //Will not Show the Payment Section if Payment Method is PayPal (for Defect #17071)     
     var showPLSection = true;
     if(dontDisplayPLSection)
    	 showPLSection = false; 
     if(showPLSection && isPayLaterSelected()){    	 
    	 showPayLaterSection();
     }
}



function wasPayLaterSelected(){
	var plSelected = jQuery("#paymentMethodSelection option[value='plimg']").hasClass('selected');
	return plSelected;
}

function isPayLaterSelected(){
	var selectedPayment = $('#paymentMethodSelection :selected').val();
	var plSelected = (selectedPayment == "plimg");
	return plSelected;
}

function isCreditCardSelected(){
	var selectedPayment = $('#paymentMethodSelection :selected').val();
	var ccSelected = (selectedPayment == "ccimg");
	return ccSelected;
}

function isBankAccountSelected(){
	var selectedPayment = $('#paymentMethodSelection :selected').val();
	var ecSelected = (selectedPayment == "ecimg");
	return ecSelected;
}

function isPayPalSelected(){
	var selectedPayment = $('#paywithpaypal').val();
	var ppSelected = (selectedPayment == "ppimg");
	return ppSelected;
}

function getPayMethod(){
	var payMethod = 'Others';
	if( isPayLaterSelected()){
		payMethod = 'PayLater';
	}
	return payMethod;
}


/*This method will set the option with value as optionVal as selected. Also add the class selected 
	for tracking previously selected Payment method.	
*/
function setPayOptionAsSelected(optionVal){
	jQuery("#paymentMethodSelection option[value='"+optionVal+"']").attr('selected', 'selected');
	$('#paymentMethodSelection').find(':option').addClass('selected').removeClass('selected');
	jQuery("#paymentMethodSelection option[value='"+optionVal+"']").addClass('selected');
}


function clearPaymentOption(payMethod){
	if(payMethod=="CreditCard")
	{
		jQuery('#dwfrm_personinf_agree').removeAttr('checked');
		jQuery('#creditCardNumber').attr('value',"");
		jQuery('#creditCardMonth').attr("selectedIndex",0);
		jQuery('#creditCardYear').attr("selectedIndex",0);
		jQuery(".pt-checkout-refresh .personinfform .card_number .value").removeClass("Visa MasterCard Discover Amex");
	}
	else (payMethod=="ECheck")
	{
		jQuery('#dwfrm_personinf_agree').removeAttr('checked');
		jQuery('#routing').attr('value',"");
		jQuery('#account').attr('value',"");
	}
}

function showPayPal(){
	$("#paywithpaypal").show();
	//$('#paymentMethodSelection').append('<option value="ppimg">PayPal</option>');
}

function hidePayPal(){
	$("#paywithpaypal").hide();
	//$('#paymentMethodSelection option[value="ppimg"]').remove();
}