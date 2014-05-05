//Hide Terms and Conditions
jQuery(".checkout_bottom .agree_box").hide();

var RTSPayReturnedMethods = jQuery("#rtsPayMethods").val().split(":");

$(document).ready(function() {
		if(null!=RTSPayReturnedMethods && 'undefined'!=RTSPayReturnedMethods && ''!=RTSPayReturnedMethods){			
			hideCartPaymentMethods();
		}
});


/*RTS Handler can be included where the RTS Call is invoked. callRTS() is the entryPoint*/

function callRTS(that){
	//if($('#continueBtnClkd').val()=='false')
	if(''==RTSPayReturnedMethods && ($('#continueBtnClkd').val()=='false') && ($("form#dwfrm_cart").valid()))
		{
		jQuery("input[id=daytimePhone]").val($("#phone1").val()+$("#phone2").val()+$("#phone3").val());
		var url = app.util.appendParamToURL(app.URLs.RTScall);
			var mydata = $("form#dwfrm_cart").serialize();

			var result = app.ajax.getJson({
				url: url,
				data: mydata,
				callback: function(data) {
					if(!data) {
						that.showPaymentSection();
							return false;
					}
					if(data.rtsresponse.RTSerrors.length > 0){
							handleRTSErrorCode(data.rtsresponse.RTSerrors);
						}else{
							processRulesofRTS(data.rtsresponse);
							that.showPaymentSection();	
							//Set the value to be true | Call RTS only for first time		
							$('#continueBtnClkd').val(true);
							display100dollarPopup(data.rtsresponse);
						}
				}
			});
			return false;
		}
	//removed the else part because the beforesubmitcheck() function will now be called from submit handler in airline.js
}

//For showing error messages, in case of error in rts API response
function handleRTSErrorCode(rtserrors){
	var billziperror = false;
	var shipziperror = false;
	for(i=0;i<rtserrors.length;i++){
		var errorCode = rtserrors[i].code;
		var errorMsg = rtserrors[i].message;
	if(errorCode=='8104'){
		$('.phone.daytime').append($('#rtsCallError').html( errorMsg).css('display','Block'));								 
		$('.phone.daytime input').addClass('errormessage');
	}else if(errorCode=='8201'){
		 jQuery("<span/>").attr("class", "errormessage rts").html( errorMsg).appendTo('.cb_billing .formfield.first_name .value');
		 $('#billFirstName').addClass('errormessage');
	}else if(errorCode=='8202'){
		 jQuery("<span/>").attr("class", "errormessage rts").html( errorMsg).appendTo('.cb_billing .formfield.last_name .value');
		 $('#billLastName').addClass('errormessage');
	}else if((errorCode=='8210'||errorCode=='8209') && !billziperror){
		billziperror = true;
		 jQuery("<span/>").attr("class", "errormessage rts").html( errorMsg).appendTo('.cb_billing .formfield.zip .zip .value');
		 $('#billZip').addClass('errormessage');
	}else if(errorCode=='8251'){
		 jQuery("<span/>").attr("class", "errormessage rts").html( errorMsg).appendTo('.cb_shipping .formfield.first_name .value');
		 $('#shipFirstName').addClass('errormessage');
	}else if(errorCode=='8252'){
		 jQuery("<span/>").attr("class", "errormessage rts").html( errorMsg).appendTo('.cb_shipping .formfield.last_name .value');
		 $('#shipLastName').addClass('errormessage');
	}else if((errorCode=='8260'||errorCode=='8259') && !shipziperror){
		shipziperror = true;
		 jQuery("<span/>").attr("class", "errormessage rts").html( errorMsg).appendTo('.cb_shipping .formfield.statezip .zip .value');
		 $('#shipZip').addClass('errormessage');
	}
	}
}


function hideCartPaymentMethods(){
	
	RTSPayReturnedMethods = jQuery("#rtsPayMethods").val().split(":");
	
	var showCC = RTSPayReturnedMethods[0];
	var showPP = RTSPayReturnedMethods[1];
	var showPL = RTSPayReturnedMethods[2];
	var showEC = RTSPayReturnedMethods[3];
	if(showPL == 'true'){
		//Logic to add Paylater option in the form
		jQuery('#paymentMethodSelection').append('<option value="plimg">'+payLaterName+'</option>');
		if(selectedImageValue !=null && selectedImageValue!='' && selectedImageValue == payLaterText ){
			jQuery('#paymentMethodSelection option[value="plimg"]').attr("selected","selected");
		}			
	}
	else{		
		if($("#paymentMethodSelection option[value='plimg']").length > 0){
			jQuery('#paymentMethodSelection option[value="plimg"]').remove();
		}
	}
	if(showCC == 'false'){
		//	Logic to remove the Credit Card option from the form
		jQuery('#paymentMethodSelection option[value="ccimg"]').remove();
	}
	if(showEC == 'false'){
		//Logic to remove the ECheck option from the form
		jQuery('#paymentMethodSelection option[value="ecimg"]').remove();

	}
	if(showPP == 'false'){
		//Logic to remove the PayPal option from the form
		jQuery('#paymentMethodSelection option[value="ppimg"]').remove();
	}		
	
}
/*This method implements the Business Rules to Hide and Show the Payment Method drop-Down*/
function processRulesofRTS(jsonObject){
	var showCC = false;
	var showPL = false;
	var showEC = false;
	var showPP = false;

	if(''!=jsonObject.payoption && null!=jsonObject.payoption)
	{
		var payOptions = jsonObject.payoption.split(",");		
		
		$(payOptions).each(function(index) {
			var CCValue = payOptions[index].replace('[','').replace(']','').replace(' ','');			
			 if(CCValue=='paylater')
			 	showPL=true;
			 else if(CCValue=='creditcard')
				showCC=true;
			 else if(CCValue=='echeck')
				showEC=true;
			 else if(CCValue=='paypal'){
			 	showPP=true;
			 }
		});
		
		jQuery("#rtsPayMethods").val(showCC+":"+showPP+":"+showPL+":"+showEC);
		jQuery("#showPopUpForBH").val(jsonObject.showPopUp);
		hideCartPaymentMethods();
		enableCreditCards();

	}
	
	//Show Terms and Conditions Check Box at bottom for Credit Card
	showBottomTandC();
	
	//Show the CC as Selected
	jQuery("#paymentMethodSelection option[value='ccimg']").attr('selected', 'selected');
	
}



function display100dollarPopup(jsonObject){
	//Display 100 $ Pop-Up or not
	if(null!=jsonObject.showPopUp && ''!=jsonObject.showPopUp && 'undefined'!=jsonObject.showPopUp)
	{
		var showPopUp = jsonObject.showPopUp;
		if(showPopUp=='true'){
			jQuery('#dialogbox-payLater100Dollar').dialog({
				bgiframe: true,
				autoOpen: false,
				modal: true,
		    	top:0,
		    	width:500,
		    	height:300,
		    	title: '',
		    	resizable: false
			});
						
			jQuery('#dialogbox-payLater100Dollar').show();
			jQuery('#dialogbox-payLater100Dollar').dialog('open');
			jQuery("#dialogbox-payLater100Dollar").siblings().css("display","none");
			jQuery("#dialogbox-payLater100Dollar").parent().addClass("popup-bg-layout");
		}
	}
}

function display100dollarTerms(){
	jQuery('#dialogbox-paylater100dollTerms').dialog({
		bgiframe: true,
		autoOpen: false,
		modal: true,
    	top:0,
    	width:500,
    	height:280,
    	title: '',
    	resizable: false
	});
				
	jQuery('#dialogbox-paylater100dollTerms').show();
	jQuery('#dialogbox-paylater100dollTerms').dialog('open');	
	jQuery("#dialogbox-paylater100dollTerms").parent().addClass("popup-bg-layout"); 	
}


function displayTnC(){
	jQuery('#dialogbox-paylaterTnC').dialog('close');
	jQuery('#dialogbox-paylaterTnC').dialog({
		bgiframe: true,
		autoOpen: false,
		modal: true,
    	top:0,
    	width:500,
    	height:245,
    	title: '',
    	resizable: false
	});
				
	jQuery('#dialogbox-paylaterTnC').show();
	jQuery('#dialogbox-paylaterTnC').dialog('open');
}


function showBottomTandC(){
	jQuery(".checkout_bottom .agree_box").show();
}


/*This method is to show the terms and conditions at the bottom of page for PayLater*/
$('#paymentMethod').change(function() {    
    var item=$(this);
    if(item.val()=='PayLater'){
    	//Disable QTY DropDown
    	jQuery('#coreOffer .quantityselector').hide();
    	jQuery('#coreOffer .quantitycolumn').prepend('<select id="temQty" disabled><option>1</option></select>');
    	
    	jQuery('.payment_info .card_details').hide().find(':input').attr('disabled','disabled');

    	
    	jQuery('#termsAndConditionPayLater').show();
    	jQuery('div.checkbox label').html("Agree to Terms and Conditions below");
    	jQuery('div.agree_box p').hide();
    }else{
    	jQuery('#coreOffer .quantityselector').show();
    	jQuery('#temQty').hide();
    	
    	jQuery('#termsAndConditionPayLater').hide();
    	jQuery('div.checkbox label').html("Agree to terms");
    	jQuery('div.agree_box p').show();
    }
});




function quantityHandler(){
	var qty = jQuery('#coreOffer .quantityselector').val();
	//If PayLater is in RTSResponse and QTY>1
	if(showPL && qty>1){
		//Remove the PayLater Option from the dropDown
		var dropdownElement = jQuery("select[name='dwfrm_personinf_creditcard_type']");
		dropdownElement.find("option[value='PayLater']").remove();
		
		jQuery('div.checkbox label').html("Agree to terms");
    	jQuery('div.agree_box p').show();
    	jQuery('#termsAndConditionPayLater').hide();
    	
    	//Also update it in the DW Form
		var url = app.util.appendParamToURL(app.URLs.PaymentFormUpdate,"showPL","false");
		url = app.util.appendParamToURL(url, "showCC", showCC);
		url = app.util.appendParamToURL(url, "showEC", showEC);
		url = app.util.appendParamToURL(url, "showPP", showPP);
		$.get(url ,function(transport) {	
		},"text");
	}else if(showPL && qty==1){
		//Display PayLater Option Again in DropDown as well as Form.
		var dropdownElement = jQuery("select[name='dwfrm_personinf_creditcard_type']");
		var newOption = $('<option value="PayLater" class="paymentmethod-PayLater">PayLater</option>');
		$(dropdownElement).append(newOption);
		
		//Also update it in the DW Form
		var url = app.util.appendParamToURL(app.URLs.PaymentFormUpdate,"showPL","true");
		url = app.util.appendParamToURL(url, "showCC", showCC);
		url = app.util.appendParamToURL(url, "showEC", showEC);
		url = app.util.appendParamToURL(url, "showPP", showPP);
		$.get(url ,function(transport) {	
		},"text");
	}
}


