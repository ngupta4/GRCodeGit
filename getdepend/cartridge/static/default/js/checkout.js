/**
 * This js file is used only on cart, shipping and
 * billing page. It handles all the client side operations
 * which are happening on these pages.
*/

//Global variables
var shippingMethods;
var oldPopupDialog = null;

CheckoutUtils = {

	enhanceDOM : function(root) {
		
		var base = root||document.body;
	
		if (jQuery(".carttable").length > 0) {
			CheckoutUtils.shoppingCart.init();
		}
		if (jQuery(".checkoutshipping").length > 0) {
			CheckoutUtils.singleShippingLoad();
		}
		if (jQuery(".checkoutbilling").length > 0) {
			CheckoutUtils.billingLoad();
		}
		if (jQuery(".checkoutOrderReview").length > 0) {
			CheckoutUtils.orderReviewLoad();
		}
	},
	
	/*
	 * This function is for displaying the loading
	 * pop up
	 */
	showLoadingPopup: function(){
		
		var message = jQuery("<div class='wait' />").append(jQuery("<img/>").attr("src", app.URLs.loadingSmallImg));
		
		
		var dialog = jQuery("<div></div>").html(message).dialog({
			autoOpen: false,
			modal: true,
            draggable: false,
            resizable: false,
            closeOnEscape: false,
            width: 300,
            open: function(event, ui){
				//Hide : IE6 hack for select box only
		    	//if($.browser.msie){
		    	//	$(document).find("select").css('visibility','hidden'); 
		    	//}
				jQuery(".ui-dialog").find("div.ui-dialog-titlebar").hide();
				//jQuery(".ui-widget-content").css('background','none');
				//$(".ui-dialog").find("div.ui-dialog-titlebar").find("a.ui-dialog-titlebar-close").hide();
            }
		});
		//Showing the dialog now
		dialog.dialog('open');
		oldPopupDialog = dialog;
	},
    
    
    /* 
	 * This method is for closing the
	 * instance of opened loading popup
	 */
   // closeLoadingPopUp : function(dialog){
		
		//dialog.dialog("destroy");  //Do not use dialog.dialog("close"); 
		
		//Showing the select box if IE
		//if($.browser.msie){
		//	$(document).find("select").css("visibility", "visible"); 
		//}
	//},
	
	//updates the order summary based on a possibly recalculated 
	//basket after a shipping promotion has been applied
	updateSummary : function() {
		var url = app.URLs.summaryRefreshURL;

		// indicate progress
		app.showProgress(jQuery("#rightcolumn"));

		// load the updated summary area
		jQuery("#rightcolumn").load( url, function() { 
			// hide edit shipping method link 
			jQuery("#rightcolumn").fadeIn("fast"); 
			jQuery('.checkoutminisummary .minishipment .header a').hide(); 
			jQuery('.ordertotalstable .ordershipping .label a').hide(); 
		});
	},
		
	//changes the selection of the given form select to the given value
	changeFormSelection : function(selectElem, selectedValue) {
		if(!selectElem) return;
		var options = selectElem.options;
		if(options.length > 0) {
			// find index of value to select
			var idx = 0;
			for(var i=0; i<options.length; i++) {
				if(options[i].value != selectedValue) continue;
				idx = i; break;
			}
			selectElem.selectedIndex = idx;
		}
	},
	
	//Main entry point for the cart page
	shoppingCart : {
		
		init : function(){
			
			//Assigning the page name to globle variable
			app.resources["PAGE_NAME"] = "CARTPAGE"; 
		              
			/*
		     * IE8 & IE9 fix for change property of select box
		     */
			var change = "change";  //Mozila supports change
			if(jQuery.browser.msie){
				if(jQuery.browser.version == "8"){
					//IE8 supports propertychange
					change = "propertychange";
				}else if(jQuery.browser.version == "9"){
					//IE9 supports change
					change = "change";
				}
			}
			//alert(jQuery.browser.msie + jQuery.browser.version);
			/*
			 * POP_UP_DIV is defined in appresources.isml and is fetched whenever a Cart-COStart pipeline
			 * is called and user is not authenticated. This flag is just a check for "View Cart" button on minicart.
			 * As we donot want to open a div on opening shopping bag simply. These changes has been done for artifact:  #11257
			 * */
			if(app.resources["IS_USER_AUTHENTICATED"] == "false" && app.resources["POP_UP_DIV"] == "true"){
			
				var targetPipline = "Cart-COStart";
				//Display login
				app.displayLogin(targetPipline);
			}
			
			jQuery("button.continue").click(function() {
				
				//Check if user has active session
				var resultJSONObj = app.isCustomerSessionActive();
				//alert(JSON.stringify(resultJSONObj));
				
				app.resources["IS_USER_AUTHENTICATED"] = resultJSONObj.user.authenticated;
				
				//If user is not authenticated
				if(app.resources["IS_USER_AUTHENTICATED"] == "false"){
					
					var targetPipline = "Cart-COStart";
					
					//Display login
					app.displayLogin(targetPipline);
					
					//Stop the form submission
					return false;
				}else{
					
					//Start form submission
					return true;
				}
			});
			
			var previousQty = "";
			previousQty=$('.selectQuantity').attr('value');
			jQuery("td.quantitycolumn .selectQuantity").bind(change, function(e) {
								
				//Quantity select box
				var selectQtyObj = jQuery(this);
				
				//Quantity
				var quantity = selectQtyObj.val();
				
				//Product id
				var pid = selectQtyObj.prev("input.pid").val();
				//alert(pid + " : " + selectQtyObj.val());
				
				
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
				//Updating the cart page
				CheckoutUtils.shoppingCart.updateCart(pid, quantity);
				
			});
			
			//Enabling the quantity select boxes 
			CheckoutUtils.shoppingCart.disableCart(false);
		},
		
		/** 
		 * This method is for enabling and disabling the 
		 * quantity drop down box when changing the quantity 
		 * from on the cart page
		 */ 
		disableCart: function(isDisable){
			
			//Getting all select boxes
			var quantityObjs = jQuery(".carttable").find(".selectQuantity");
			//alert(quantityObjs.length);
			if(quantityObjs.length >= 1){
				quantityObjs.each( function(){
					jQuery(this).attr("disabled", isDisable);
				});
			}
			
		},
				
		/** 
		 * This method is for updating the 
		 * cart when changing the quantity from quantity
		 * drop down box on the cart page
		 */ 
		updateCart: function(productID, quantity){
			
			//Disabling the quantity select boxes 
			CheckoutUtils.shoppingCart.disableCart(true);
			
			//Displaying the loading popup
			CheckoutUtils.showLoadingPopup();
			
			//Updating the basket
			jQuery.ajax({
				type	: "POST",
				url		: app.URLs.UpdateProductQty,
				cache	: true,
				data	: {"pid": productID, "qty": quantity},
				success	: function(response) {
					//alert(JSON.stringify(response));
					//Refreshing the page
					jQuery(document).trigger("refreshCart");
	            },
	            error: function(xhr, txtStatus, e) {
	            	
	            	//closing the loading popup
					CheckoutUtils.closeLoadingPopUp(oldPopupDialog);
	            	
					//Enabling the quantity select boxes 
					CheckoutUtils.shoppingCart.disableCart(false);
					
	            	//Displaying error if ajax processing failed
	            	alert("Unable to process your request");
	         	}
			});
		}
		
	},
	
	//Main entry point for the shipping address load
	singleShippingLoad : function() {
		
		//Assigning the page name to globle variable
		app.resources["PAGE_NAME"] = "SHIPPINGPAGE";
		
		
		//alert("Is user authenticated: " + app.resources["IS_USER_AUTHENTICATED"]);
		//If user is not authenticated
		if(app.resources["IS_USER_AUTHENTICATED"] == "false"){
			
			var targetPipline = "COShipping-Start";
			//Display login
			app.displayLogin(targetPipline);
		}
		
		//Disabling the country field - USA only
		jQuery(app.resources["SHIP_COUNTRY"]).attr("disabled", true);
		
		//On the page load if default address is selected
		if(jQuery(".addresslist select").val() != ""){
			//Disable the save address check box
			jQuery(app.resources["SHIP_SAVE_ADDRESS"]).attr("checked", false);
			//jQuery(app.resources["SHIP_SAVE_ADDRESS"]).attr("disabled", true);
			//jQuery("div.addressoptions").css("visibility", "hidden");
			jQuery("div.addressoptions").hide();
		}
		
		// select address from list
		jQuery(".addresslist select").change(function() {
			
			var addressID = jQuery(this).val(),
			address = null,
			form = null;
					
			//update the selected shipping id form field
			jQuery(app.resources["SHIP_ADDRESS_ID"]).val(addressID);
						
			if (addressID.indexOf("??") > 0) {
				// we have address in the select data attr			
				address = jQuery(this).data("data")[addressID];
			}
			
			if(!addressID || addressID == ""){
				form = jQuery(".addressform");
				CheckoutUtils.clearAddressForm(form);
			}else{
				CheckoutUtils.updateAddressFormShipping(addressID, address);
			}
			
			return false;
		});
		
		//Updating the shipping method
		CheckoutUtils.updateShippingMethodList();
		
		CheckoutUtils.updateStateLabel(jQuery(app.resources["SHIP_COUNTRY"]).val(), false);
		
		jQuery(app.resources["SHIP_CITY"]).change(function() {
			CheckoutUtils.updateShippingMethodList();
		});
		jQuery(app.resources["SHIP_ZIP"]).change(function() {
			CheckoutUtils.updateShippingMethodList();
		});
		
		
		//Populating the day phone number on load if it is available
		if(jQuery(app.resources["SHIP_PHONE"]).val()!= ""){
			var day_phone_1= jQuery(app.resources["SHIP_PHONE"]).val().substr(0,3);
			var day_phone_2= jQuery(app.resources["SHIP_PHONE"]).val().substr(3,3);
			var day_phone_3= jQuery(app.resources["SHIP_PHONE"]).val().substr(6,4);
			jQuery("input#day_phone_1").val(day_phone_1);
			jQuery("input#day_phone_2").val(day_phone_2);
			jQuery("input#day_phone_3").val(day_phone_3);
		}
		
		//Populating the evening phone number on load if it is available
		if(jQuery(app.resources["SHIP_EVENING_PHONE"]).val()!= ""){
			var eve_phone_1= jQuery(app.resources["SHIP_EVENING_PHONE"]).val().substr(0,3);
			var eve_phone_2= jQuery(app.resources["SHIP_EVENING_PHONE"]).val().substr(3,3);
			var eve_phone_3= jQuery(app.resources["SHIP_EVENING_PHONE"]).val().substr(6,4);
			jQuery("input#eve_phone_1").val(eve_phone_1);
			jQuery("input#eve_phone_2").val(eve_phone_2);
			jQuery("input#eve_phone_3").val(eve_phone_3);
		}
		
		//Setting the day phone to hidden fields
		jQuery(app.resources["SHIP_SAVE"]).click(function(){
			
			//Check if user has active session
			var resultJSONObj = app.isCustomerSessionActive();
			//alert(JSON.stringify(resultJSONObj));
			
			app.resources["IS_USER_AUTHENTICATED"] = resultJSONObj.user.authenticated;
			//alert("Is user authenticated: " + app.resources["IS_USER_AUTHENTICATED"]);
			
			//If user is not authenticated
			if(app.resources["IS_USER_AUTHENTICATED"] == "false"){
				
				var targetPipline = "COShipping-Start";
				
				//Display login
				app.displayLogin(targetPipline);
				
				//Stop the form submission
				return false;
				
			}else{
				
				var day_phone_1 = jQuery("input#day_phone_1").val();
				var day_phone_2 = jQuery("input#day_phone_2").val();
				var day_phone_3 = jQuery("input#day_phone_3").val();
				jQuery(app.resources["SHIP_PHONE"]).val(day_phone_1 + day_phone_2 + day_phone_3);
				
				var eve_phone_1 = jQuery("input#eve_phone_1").val();
				var eve_phone_2 = jQuery("input#eve_phone_2").val();
				var eve_phone_3 = jQuery("input#eve_phone_3").val();
				jQuery(app.resources["SHIP_EVENING_PHONE"]).val(eve_phone_1 + eve_phone_2 + eve_phone_3);
				
				var isDayPhoneMandatory = false;
				var dayPhone = jQuery.trim(jQuery(app.resources["SHIP_PHONE"]).val());
				var evePhone = jQuery.trim(jQuery(app.resources["SHIP_EVENING_PHONE"]).val());
				
				var isValidPhone = CheckoutUtils.isValidPhoneNumbers(dayPhone, evePhone, isDayPhoneMandatory);
				//alert(isValidPhone);
				
				return isValidPhone;
			}
			
		});
		              
	},
	
	
	/**
	 * Make an AJAX request to the server to retrieve the list of applicable shipping methods
	 * based on the merchandise in the cart and the currently entered shipping address 
	 * (the address may be only partially entered).  If the list of applicable shipping methods 
	 * has changed because new address information has been entered, then issue another AJAX 
	 * request which updates the currently selected shipping method (if needed) and also updates
	 * the UI.  In particular, the list of available shipping methods and the right hand summary
	 * must change.
	 */
	updateShippingMethodList : function() {
		
		//Check if user has active session
		var resultJSONObj = app.isCustomerSessionActive();
		//alert(JSON.stringify(resultJSONObj));
		
		app.resources["IS_USER_AUTHENTICATED"] = resultJSONObj.user.authenticated;
		//alert("Is user authenticated: " + app.resources["IS_USER_AUTHENTICATED"]);
		
		//If user is not authenticated
		if(app.resources["IS_USER_AUTHENTICATED"] == "false"){
			
			var targetPipline = "Cart-COStart";
			
			//Display login
			app.displayLogin(targetPipline);
			
			//Stop the form submission
			return false;
			
		}else {
		
			var url = CheckoutUtils.getShippingMethodURL(app.URLs.ShippingMethodsJSON);
			var result = app.ajax.getJson({
				
				url: url,
				callback: function(data) {
					if(!data) {
						alert("Couldn't get list of applicable shipping methods.");
						return false;
					}
					if (shippingMethods != null && shippingMethods.toString() == data.toString())
					{
						// No need to update the UI.  The list has not changed.
						return true;
					}
	
					// We need to update the UI.  The list has changed.
					// Cache the array of returned shipping methods.
					shippingMethods = data;
			
					url = CheckoutUtils.getShippingMethodURL(app.URLs.ShippingMethodsList);
	
					// indicate progress
					app.showProgress(jQuery("#shippingmethodform"));
	
					// load the shipping method form
					jQuery("#shippingmethodform").load( url, function() {
						jQuery("#shippingmethodform").fadeIn("fast");
	
						// rebind the radio buttons onclick function to a handler.
						jQuery(app.resources["SHIP_shippingMethodID"]).click(function() {
							
							//Check if user has active session
							var resultJSONObj = app.isCustomerSessionActive();
							//alert(JSON.stringify(resultJSONObj));
							
							app.resources["IS_USER_AUTHENTICATED"] = resultJSONObj.user.authenticated;
							//alert("Is user authenticated: " + app.resources["IS_USER_AUTHENTICATED"]);
							
							//If user is not authenticated
							if(app.resources["IS_USER_AUTHENTICATED"] == "false"){
								
								var targetPipline = "COShipping-Start";
								
								//Display login
								app.displayLogin(targetPipline);
								
								//Stop the form submission
								return false;
								
							}else{
								//Select shipping method
								var selectedMethodID = jQuery(this).val();
								CheckoutUtils.selectShippingMethod(selectedMethodID);
							}
						});
	
						// activate the tooltips in the newly loaded AJAX section
						app.tooltipDefault();
						
						// update the summary
						CheckoutUtils.updateSummary();
					});
				}
			});
		}
		
	},
	
	/**
	 * Helper method which constructs a URL for an AJAX request using the 
	 * entered address information as URL request parameters.
	 */
	getShippingMethodURL : function(url) {
		var countryCode = jQuery(app.resources["SHIP_COUNTRY"]).val();
		var stateCode = jQuery(app.resources["SHIP_STATE_US"]).val();
		var postalCode = jQuery(app.resources["SHIP_ZIP"]).val();
		var city = jQuery(app.resources["SHIP_CITY"]).val();

		url = app.util.appendParamToURL(url, "countryCode", countryCode);
		url = app.util.appendParamToURL(url, "stateCode", stateCode);
		url = app.util.appendParamToURL(url, "postalCode", postalCode);
		url = app.util.appendParamToURL(url, "city", city);

		return url;
	},

	//selects a shipping method for the default shipment
	//and updates the summary section on the right hand side
	selectShippingMethod : function(shippingMethodID) {
		// nothing entered
		if(!shippingMethodID) {
			return;
		}
		// attempt to set shipping method
		var url = CheckoutUtils.getShippingMethodURL(app.URLs.GetShippingMethodsList);
		url = app.util.appendParamToURL(url, "shippingMethodID", shippingMethodID);
		var result = app.ajax.getJson({
			url: url,
			callback: function(data) {
				CheckoutUtils.updateSummary();
				if(!data || !data.shippingMethodID) {
					alert("Couldn't select shipping method.");
					return false;
				}
				// display promotion in UI and update the summary section,
				// if some promotions were applied
				jQuery(".shippingpromotions").empty();
				if(data.shippingPriceAdjustments && data.shippingPriceAdjustments.length > 0) {
					for(var i=0; i<data.shippingPriceAdjustments.length; i++) {
						var spa = data.shippingPriceAdjustments[i];
						jQuery(".shippingpromotions").append("<div>"+app.resources["SHIP_QualifiesFor"]+" " + spa.calloutMessage + "<\/div>");
					}
				}
			}
		});
	},
	//updates the state label depending on the given contry code
	//if the flag updateSelection is set to true the state selection
	//changes to the first possible select option based on the country
	updateStateLabel : function(countryCode, updateSelection) {
		var label = app.resources["SHIP_STATE_LABEL"]+"";
		if(countryCode == "CA") {
			label = app.resources["SHIP_PROVINCE_LABEL"]+"";
		}
		
		jQuery("div.state > .label > .labeltext").html(label);

		if(updateSelection) {
			var initialOption = "##";
			if(countryCode == "US") {
				initialOption = "";
			} else if(countryCode == "CA") {
				initialOption = "AB";
			}
			this.changeFormSelection(jQuery(app.resources["SHIP_STATE_US"])[0], initialOption);
		}
	},

	
	//shipping page logic
	//checkout gift message counter
	//init gift message box
	initGiftMessageBox : function() {
		// show gift message box, if shipment is gift
		if(jQuery("input.isgiftno:checked").length == 1) jQuery(".giftmessagetext").hide();
		else jQuery(".giftmessagetext").show();

		// init left character count and max characters
		var max = 250;
		var text = jQuery(".giftmessagetext span.caption").html();
		jQuery(".giftmessagetext span.caption").html( text.replace("XXX", "<span class=\"count\"><\/span>").replace("YYY", max) );
		jQuery(".giftmessagetext span.caption").css({ display: "block" });
		jQuery(".giftmessagetext span.caption").show();
		var count = jQuery(".giftmessagetext textarea").val().length;
		var left = max - count;
		jQuery(".giftmessagetext span.count").text(left);
	},
	
	//updates the options in the states field according to the selection in the country field
	updateStateOptions : function(countrySelection) {
		var newOptions = null;
		switch (countrySelection) {
		case 'US':
			newOptions = jQuery(app.resources["SHIP_STATE_US"]).children().clone();
			break;
		case 'CA':
			newOptions = jQuery(app.resources["SHIP_STATE_CA"]).children().clone();
			break;
		case 'DE':
			newOptions = jQuery(app.resources["SHIP_STATE_DE"]).children().clone();
			break;
		default:
			return;
		}
		if (newOptions != null) {
			jQuery(app.resources["SHIP_STATE_US"]).children().remove();
			jQuery(app.resources["SHIP_STATE_US"]).append(newOptions);
			jQuery(app.resources["SHIP_STATE_US"]).attr("disabled", false);
		}
	},
	
	//updates the options in the states field according to the selection in the country field
	updateStateOptionsBilling : function(countrySelection) {
		var newOptions = null;
		switch (countrySelection) {
		case 'US':
			newOptions = jQuery(app.resources["BILL_STATE_US"]).children().clone();
			break;
		case 'CA':
			newOptions = jQuery(app.resources["BILL_STATE_CA"]).children().clone();
			break;
		case 'DE':
			newOptions = jQuery(app.resources["BILL_STATE_DE"]).children().clone();
			break;
		default:
			return;
		}
	
		if (newOptions != null) {
			jQuery(app.resources["BILL_STATE_US"]).children().remove();
			jQuery(app.resources["BILL_STATE_US"]).append(newOptions);
			jQuery(app.resources["BILL_STATE_US"]).attr("disabled", false);
		}
	},
	
	
	/**
	 * BEGIN BILLING LOAD
	 * loads billing address, Gift Certificates, Coupon and Payment methods 
	*/
	billingLoad : function() {
		
		//Assigning the page name to globle variable
		app.resources["PAGE_NAME"] = "BILLINGPAGE";
		
		//alert("Is user authenticated: " + app.resources["IS_USER_AUTHENTICATED"]);
		//If user is not authenticated
		if(app.resources["IS_USER_AUTHENTICATED"] == "false"){
			
			var targetPipline = "COBilling-Start";
			//Display login
			app.displayLogin(targetPipline);
		}
		
		//Disabling the country field - USA only
		jQuery(app.resources["BILL_COUNTRY"]).attr("disabled", true);
		
		//On the page load if default address is selected
  		if(jQuery(".addresslist select").val() != ""){
  			//Disable the save address check box
  			jQuery(app.resources["BILL_SAVE_ADDRESS"]).attr("checked", false);
  			//jQuery(app.resources["BILL_SAVE_ADDRESS"]).attr("disabled", true);
  			jQuery("div.addressoptions").hide();
  		}
		
  		//On the page load if default credit card is selected
  		if(jQuery(".creditcardlist select").val() != ""){
  			
  			//Disable the save credit card check box
  			jQuery(app.resources["BILL_SAVE_CREDIT_CARD"]).attr("checked", false);
  			//jQuery(app.resources["BILL_SAVE_CREDIT_CARD"]).attr("disabled", true);
  			jQuery("div.savePaymentToProfile").hide();
  		
  			//Disable credit card form
  			CheckoutUtils.disableCreditCardForm();
  			
  		}
  		
		jQuery(".addresslist select").change(function() {
			
			var addressID = jQuery(this).val(),
				address = null,
				form = null;
			
			if (addressID.indexOf("??") > 0) {
				// we have address in the select data attr			
				address = jQuery(this).data("data")[addressID];
			}
			
			if(!addressID || addressID == ""){
				form = jQuery("div.addressformtags");
				CheckoutUtils.clearAddressFormBilling(form);
			}else{
				CheckoutUtils.updateAddressFormBilling(addressID, address);
			}
			
			return false;
		});
		
		//If same as shipping is selected
		if($('div.sameasshipping input:checkbox').attr('checked')){
			var form = jQuery("div.addressformtags");
			CheckoutUtils.getShippingAddress(form);
		}
		
		jQuery("div.sameasshipping input:checkbox").click(function() {
			
			var form = jQuery("div.addressformtags");
			if(this.checked){
				CheckoutUtils.getShippingAddress(form);
				
			}else{
				jQuery("div.addresslist select").attr("disabled", false).val("");
				CheckoutUtils.enableDisableAddressFormBilling(form);
				CheckoutUtils.clearAddressFormBilling(form);
				
				//enabling the day phone when same as shipping checkbox is not clicked
				jQuery("input#day_phone_1").attr("disabled", false);
				jQuery("input#day_phone_2").attr("disabled", false);
				jQuery("input#day_phone_3").attr("disabled", false);
			}
		});

		
		// update state label upon entering page
		CheckoutUtils.updateStateLabelBilling(jQuery(app.resources["BILL_COUNTRY"]).val(), false);

		// bind payment method change handler
		CheckoutUtils.bindPaymentMethodChangeHandler();

		// initialize payment method selection
		CheckoutUtils.initPaymentMethodSelection();

		// select credit card from list
		CheckoutUtils.bindCreditCardPopulationHandler();
		
		
		//Populating the day phone number on load if it is available
		if(jQuery(app.resources["BILL_PHONE"]).val()!= ""){
			var day_phone_1= jQuery(app.resources["BILL_PHONE"]).val().substr(0,3);
			var day_phone_2= jQuery(app.resources["BILL_PHONE"]).val().substr(3,3);
			var day_phone_3= jQuery(app.resources["BILL_PHONE"]).val().substr(6,4);
			jQuery("input#day_phone_1").val(day_phone_1);
			jQuery("input#day_phone_2").val(day_phone_2);
			jQuery("input#day_phone_3").val(day_phone_3);
		}
		
		//Populating the evening phone number on load if it is available
		if(jQuery(app.resources["BILL_EVENING_PHONE"]).val()!= ""){
			var eve_phone_1= jQuery(app.resources["BILL_EVENING_PHONE"]).val().substr(0,3);
			var eve_phone_2= jQuery(app.resources["BILL_EVENING_PHONE"]).val().substr(3,3);
			var eve_phone_3= jQuery(app.resources["BILL_EVENING_PHONE"]).val().substr(6,4);
			jQuery("input#eve_phone_1").val(eve_phone_1);
			jQuery("input#eve_phone_2").val(eve_phone_2);
			jQuery("input#eve_phone_3").val(eve_phone_3);
		}
		
		
		// handle whole form submit (bind click to continue checkout button)
		// append form fields of current payment form to this submit
		// in order to validate the payment method form inputs too
		jQuery(app.resources["BILL_SAVE"]).live('click', function(event) {
			
			// enable billing address form
			CheckoutUtils.enableAddressFormBilling();
			
			//Enable CC form
			CheckoutUtils.enableCreditCardForm();
			
			//Start: day and evening phone manipulation
			var day_phone_1 = jQuery("input#day_phone_1").val();
			var day_phone_2 = jQuery("input#day_phone_2").val();
			var day_phone_3 = jQuery("input#day_phone_3").val();
			jQuery(app.resources["BILL_PHONE"]).val(day_phone_1 + day_phone_2 + day_phone_3);
			
			var eve_phone_1 = jQuery("input#eve_phone_1").val();
			var eve_phone_2 = jQuery("input#eve_phone_2").val();
			var eve_phone_3 = jQuery("input#eve_phone_3").val();
			jQuery(app.resources["BILL_EVENING_PHONE"]).val(eve_phone_1 + eve_phone_2 + eve_phone_3);
			//End: day and evening phone manipulation
			
			//var isDayPhoneMandatory = true;
			//var dayPhone = jQuery.trim(jQuery(app.resources["BILL_PHONE"]).val());
			//var evePhone = jQuery.trim(jQuery(app.resources["BILL_EVENING_PHONE"]).val());
			//var isValidPhone = CheckoutUtils.isValidPhoneNumbers(dayPhone, evePhone, isDayPhoneMandatory);
			
			var selectedPaymentMethodID = jQuery(app.resources["BILL_PAYMENT_METHOD_ID_SELECTED"]).val();
			
			// payment method could be absent if the total is 0 (perhaps because of promotion(s)
			// - 0 is needed otherwise the expression won't return a valid number in non-default locales e.g. in de_DE (decimal point is , which doesn't work)
			//if(!selectedPaymentMethodID && ${pdict.Basket.getTotalGrossPrice() - 0} > 0) return false;

			// reset payment insturment flag, false when order total is 0 (becuase of promotion perhaps)
			var resetPayIns = true;
			
			// get the main form
			var mainForm = jQuery(app.resources["BILL_NAME"]);

			// set the payment method at the main form
			mainForm.append("<input type='hidden' name='"+app.resources["BILL_METHOD_ID_NAME"]+"' />");		

			// determine if the order total was paid using gift cert or a promotion
			if (jQuery(".giftcertused").css("display") == "none") {
				jQuery(app.resources["BILL_HTML_NAME"]).val(selectedPaymentMethodID);
				
				// append inputs of payment method form as hidden elements to main form (all inputs except checkboxes)
				jQuery("#PaymentMethod_" + selectedPaymentMethodID + " form :input").filter(":not(:checkbox)").each(function(i, elem) {
					var input = jQuery(this);
					mainForm.append("<input type=\"hidden\" name=\"" + input.attr("name") + "\" />");
					jQuery(app.resources["BILL_HTML_NAME_PART"] + input.attr("name") + "]").val(input.val());
				});
				// checkboxes are only appended if checked
				jQuery("#PaymentMethod_" + selectedPaymentMethodID + " form :checkbox:checked").each(function(i, elem) {
					var input = jQuery(this);
					mainForm.append("<input type=\"hidden\" name=\"" + input.attr("name") + "\" />");
					jQuery(app.resources["BILL_HTML_NAME_PART"] + input.attr("name") + "]").val(input.val());
				});
			}
			else {
				// determine if the order total was paid using gift cert or it was 0 because of promotion(s)
				jQuery(".giftcertpi").length > 0 ? jQuery(app.resources["BILL_HTML_NAME"]).val(app.resources["BILL_GC"]) : (resetPayIns=false);
			}
			// reset the remaining payment forms (synchronous) only when a method is specified i.e. there is no payment method when order total is 0 perhaps due to promotion(s)
			if (resetPayIns) {
				app.ajax.getJson({
					url: app.util.appendParamToURL(app.URLs.ResetPaymentForms, "paymentMethodID", selectedPaymentMethodID),
					async: false,
					callback: function(data) {}
				});
			}

			
			//Check if user has active session
			var resultJSONObj = app.isCustomerSessionActive();
			//alert(JSON.stringify(resultJSONObj));
			
			app.resources["IS_USER_AUTHENTICATED"] = resultJSONObj.user.authenticated;
			//alert("Is user authenticated: " + app.resources["IS_USER_AUTHENTICATED"]);
			
			//If user is not authenticated
			if(app.resources["IS_USER_AUTHENTICATED"] == "false"){
				
				var targetPipline = "COBilling-Start";
				//Display login
				app.displayLogin(targetPipline);
				
				//Stop the form submission
				return false;
				
			}else{
				// submit the main form
				mainForm.submit();
			}
			
		});

	},
	
	
	/*
	 * Begin Order Review Load.
	*/
	orderReviewLoad : function() {
		
		//Assigning the page name to globle variable
		app.resources["PAGE_NAME"] = "ORDERREVIEWPAGE";
		
		
		jQuery("button.continuecheckout").click(function() {
			
			//Check if user has active session
			var resultJSONObj = app.isCustomerSessionActive();
			//alert(JSON.stringify(resultJSONObj));
			
			app.resources["IS_USER_AUTHENTICATED"] = resultJSONObj.user.authenticated;
			//alert("Is user authenticated: " + app.resources["IS_USER_AUTHENTICATED"]);
			
			//If user is not authenticated
			if(app.resources["IS_USER_AUTHENTICATED"] == "false"){
				
				var targetPipline = "Cart-COStart";
				//Display login
				app.displayLogin(targetPipline);
				
				//Stop the form submission
				return false;
			}else{
				//Start form submission
				return true;
			}
		});
		
	},
	
	
	/*
	 * This function is for validating the day and 
	 * evening phone numbers.
	 */
	isValidPhoneNumbers: function(dayPhone, evePhone, isDayPhoneMandatory) {
		
		var isValidPhone = true;
		var phoneErrorMsg = jQuery("div.phoneErrorMsg");
		var ePhoneErrorMsg = jQuery("div.ePhoneErrorMsg");
		
		//Hidding the error messages
		phoneErrorMsg.hide();
		ePhoneErrorMsg.hide();
		
		if(isDayPhoneMandatory){
			
			if(dayPhone.length == 0){
				isValidPhone = false;
				phoneErrorMsg.show();
				phoneErrorMsg.empty().append(app.resources["PHONE_MISSING"]);
			}else if(dayPhone.length == 10){
				if(isNaN(dayPhone)){
					isValidPhone = false;
					phoneErrorMsg.show();
					phoneErrorMsg.empty().append(app.resources["PHONE_INVALID"]);
				}
			}else{
				isValidPhone = false;
				phoneErrorMsg.show();
				phoneErrorMsg.empty().append(app.resources["PHONE_INVALID"]);
			}
			
		}else{
			//Check for evening phone
			if(dayPhone.length >= 1){
				if(dayPhone.length == 10){
					if(isNaN(dayPhone)){
						isValidPhone = false;
						phoneErrorMsg.show();
						phoneErrorMsg.empty().append(app.resources["PHONE_INVALID"]);
					}
				}else{
					isValidPhone = false;
					phoneErrorMsg.show();
					phoneErrorMsg.empty().append(app.resources["PHONE_INVALID"]);
				}
			}
		}
		
		//Check for evening phone
		if(evePhone.length >= 1){
			if(evePhone.length == 10){
				if(isNaN(evePhone)){
					isValidPhone = false;
					ePhoneErrorMsg.show();
					ePhoneErrorMsg.empty().append(app.resources["PHONE_INVALID"]);
				}
			}else{
				isValidPhone = false;
				ePhoneErrorMsg.show();
				ePhoneErrorMsg.empty().append(app.resources["PHONE_INVALID"]);
			}
		}
		
		return isValidPhone;
	},
	
	//begin Billing payment logic
	//updates the credit card form with the attributes of a given card
	populateCreditCardForm : function(cardID) {
		
		// load card details
		var url = app.util.appendParamToURL(app.URLs.billingSelectCC, "creditCardUUID", cardID);
		var result = app.ajax.getJson({
			url: url,
			callback: function(data) {
				if(!data || !data.creditCard) {
					alert(app.resources["CC_LOAD_ERROR"]);
					return false;
				}
				// fill the form / clear the former cvn input
				jQuery(app.resources["BILL_CC_OWNER"]).val(data.creditCard.holder);
				CheckoutUtils.changeFormSelection(jQuery(app.resources["BILL_CC_TYPE"])[0], data.creditCard.type);
				jQuery(app.resources["BILL_CC_NUMBER"]).val(data.creditCard.maskedNumber);
				CheckoutUtils.changeFormSelection(jQuery(app.resources["BILL_CC_MONTH"])[0], data.creditCard.expirationMonth);
				CheckoutUtils.changeFormSelection(jQuery(app.resources["BILL_CC_YEAR"])[0], data.creditCard.expirationYear);
				jQuery(app.resources["BILL_CC_CVN"]).val("");
				
				// remove error messaging
				jQuery("div.ccTypeError").remove();
				jQuery("#PaymentMethod_CREDIT_CARD span.errormessage").remove();
				jQuery("#PaymentMethod_CREDIT_CARD input.errormessage").removeClass("errormessage");
				jQuery("#PaymentMethod_CREDIT_CARD .errorlabel").removeClass("errorlabel");
			}
		});
	},

	//changes the payment method form
	changePaymentMethod : function(paymentMethodID) {
	
		jQuery(".paymentform").hide();
		jQuery("#PaymentMethod_" + paymentMethodID).show();
		if( jQuery("#PaymentMethod_" + paymentMethodID).length == 0 )
		{
			jQuery("#PaymentMethod_Custom").show();
		}

		// ensure checkbox of payment method is checked
		jQuery("#is-" + paymentMethodID).attr("checked", true);
	},

	//initializes the payment method forms
	initPaymentMethodSelection : function(paymentMethodID) {
		// get selected payment method from payment method form
		var paymentMethodID = jQuery(app.resources["BILL_PAYMENT_METHOD_ID_SELECTED"]).val();
		if( !paymentMethodID )
		{
			// if necessary fall back to default payment method (first non-gift-certificate method)
		    paymentMethodID = "CREDIT_CARD";
		}

		// show payment method section
		this.changePaymentMethod(paymentMethodID);
	},

	//binds click event for every radio button change of payment methods
	bindPaymentMethodChangeHandler : function() {
	
		// bind payment method change handler
		jQuery(app.resources["BILL_PAYMENT_METHOD_ID"]).click(function() {
			var selectedID = jQuery(this).val();
			CheckoutUtils.changePaymentMethod(selectedID);
		});
	},

	//binds the existing credit card selection handler
	bindCreditCardPopulationHandler : function() {
		
		// select credit card from list
		jQuery(".creditcardlist select").change(function() {
			
			var cardUUID = jQuery(this).val();
			
			//Clean error messages
			CheckoutUtils.cleanCreditCardFormErrorMessages();
			
			if(cardUUID){
				
				jQuery(app.resources["BILL_CC_DEFAULT_ID"]).val(cardUUID);
	  			
				CheckoutUtils.populateCreditCardForm(cardUUID);
				
				//Disable the save credit card check box
	  			jQuery(app.resources["BILL_SAVE_CREDIT_CARD"]).attr("checked", false);
	  			//jQuery(app.resources["BILL_SAVE_CREDIT_CARD"]).attr("disabled", true);
	  			jQuery("div.savePaymentToProfile").hide();
	  			
	  			//Disable CC form
	  			CheckoutUtils.disableCreditCardForm();
	  			
			} else{
				
				//Enable CC form
				CheckoutUtils.enableCreditCardForm();
				
				//clear the form input
				jQuery(app.resources["BILL_CC_DEFAULT_ID"]).val('');
				jQuery(app.resources["BILL_CC_OWNER"]).val('');
				CheckoutUtils.changeFormSelection(jQuery(app.resources["BILL_CC_TYPE"])[0], '');
				jQuery(app.resources["BILL_CC_NUMBER"]).val('');
				CheckoutUtils.changeFormSelection(jQuery(app.resources["BILL_CC_MONTH"])[0], '');
				CheckoutUtils.changeFormSelection(jQuery(app.resources["BILL_CC_YEAR"])[0], '');
				//jQuery(app.resources["BILL_CC_YEAR"]).val(app.constants.CURRENT_YEAR);
				jQuery(app.resources["BILL_CC_CVN"]).val('');
				
				//Enable the save credit card check box
				jQuery("div.savePaymentToProfile").show();
	  			jQuery(app.resources["BILL_SAVE_CREDIT_CARD"]).attr("checked", true);
	  			//jQuery(app.resources["BILL_SAVE_CREDIT_CARD"]).attr("disabled", false);
	  			
	  			//remove error messaging
				jQuery("div.ccTypeError").remove();
			}
			return false;
		});
	},

	//end Billing payment logic
	//updates the state label depending on the given contry code
	//if the flag updateSelection is set to true the state selection
	//changes to the first possible select option based on the country
	updateStateLabelBilling : function(countryCode, updateSelection) {
		var label = app.resources["SHIP_STATE_LABEL"]+"";
		if(countryCode == "CA") {
			label = app.resources["SHIP_PROVINCE_LABEL"]+"";
		}
		jQuery("div.state > .label > .labeltext").html(label);

		if(updateSelection) {
			var initialOption = "##";
			if(countryCode == "US") {
				initialOption = "";
			} else if(countryCode == "CA") {
				initialOption = "AB";
			}
			CheckoutUtils.changeFormSelection(jQuery(app.resources["BILL_STATE_US"])[0], initialOption);
		}

		if (countryCode == '') {
			jQuery(app.resources["BILL_STATE_US"]).attr("disabled","disabled");
		} else {
			jQuery(app.resources["BILL_STATE_US"]).removeAttr("disabled");
		}
	},

	
	/* 
	 * This method is for cleaning the error messages
	 * from the shipping and billing page
	 */
	cleanAddressFormErrorMessages : function() {

		//Removing the error messages
		jQuery("div.phoneErrorMsg").hide();
		jQuery("div.ePhoneErrorMsg").hide();
		
		//Hiding the errore messages
		jQuery("div.addressform").find("span.errormessage").each( function(){
			jQuery(this).hide();
		});
		
		//Removing the red color from inputs
		jQuery("div.addressform").find(':input').each( function(){
			if(jQuery(this).hasClass("errormessage")){
				jQuery(this).removeClass("errormessage");
			}
		});
	},
	
	//This method is for clearing the address form
	//of the shipping page.
	clearAddressForm : function(formObj) {
		
		// Clear the form
		jQuery(app.resources["SHIP_FIRST_NAME"]).val('');
		jQuery(app.resources["SHIP_LAST_NAME"]).val('');
		jQuery(app.resources["SHIP_ADDRESS1"]).val('');
		jQuery(app.resources["SHIP_ADDRESS2"]).val('');
		jQuery(app.resources["SHIP_CITY"]).val('');
		jQuery(app.resources["SHIP_ZIP"]).val('');
		jQuery(app.resources["SHIP_STATE_US"]).val('');
		
		jQuery(app.resources["SHIP_PHONE"]).val('');
		jQuery("input#day_phone_1").val('');
		jQuery("input#day_phone_2").val('');
		jQuery("input#day_phone_3").val('');
		
		jQuery(app.resources["SHIP_EVENING_PHONE"]).val('');
		jQuery("input#eve_phone_1").val('');
		jQuery("input#eve_phone_2").val('');
		jQuery("input#eve_phone_3").val('');
		
		//Enable the save address check box
		jQuery("div.addressoptions").show();
		jQuery(app.resources["SHIP_SAVE_ADDRESS"]).attr("checked", true);
		//jQuery(app.resources["SHIP_SAVE_ADDRESS"]).attr("disabled", false);
		
		
		//Cleaning the error messages
		CheckoutUtils.cleanAddressFormErrorMessages();
		
		// Check if the list of shipping methods needs to change
		CheckoutUtils.updateShippingMethodList();
		
		// update the order summary to reflect the correct tax rate for this state
		CheckoutUtils.updateSummary(jQuery(app.resources["SHIP_STATE_US"]).val());
	},
	
	
	/**
	 * This method is for clearing the address form
	 * of the billing page. 
	*/
	clearAddressFormBilling : function(formObj) {
		
		// Clear the form		
		jQuery(app.resources["BILL_ADDRESS_ID"]).val('');
		jQuery(app.resources["BILL_FIRST_NAME"]).val('');
		jQuery(app.resources["BILL_LAST_NAME"]).val('');
		jQuery(app.resources["BILL_ADDRESS1"]).val('');
		jQuery(app.resources["BILL_ADDRESS2"]).val('');
		jQuery(app.resources["BILL_CITY"]).val('');
		jQuery(app.resources["BILL_ZIP"]).val('');
		jQuery(app.resources["BILL_STATE_US"]).val('');
		
		jQuery(app.resources["BILL_PHONE"]).val('');
		jQuery("input#day_phone_1").val('');
		jQuery("input#day_phone_2").val('');
		jQuery("input#day_phone_3").val('');
		
		jQuery(app.resources["BILL_EVENING_PHONE"]).val('');
		jQuery("input#eve_phone_1").val('');
		jQuery("input#eve_phone_2").val('');
		jQuery("input#eve_phone_3").val('');
		
		//Enable the save address check box
		jQuery("div.addressoptions").show();
		jQuery(app.resources["BILL_SAVE_ADDRESS"]).attr("checked", true);
		//jQuery(app.resources["BILL_SAVE_ADDRESS"]).attr("disabled", false);
		
		//Removing the error messages
		jQuery("div.phoneErrorMsg").remove();
		jQuery("div.ePhoneErrorMsg").remove();
		
		//Cleaning the error messages
		CheckoutUtils.cleanAddressFormErrorMessages();
	},
	
	//This method is for updating the 
	//current address from of shipping page
	updateAddressFormShipping : function(addressID, address) {
		
		var updateAddressFormFields = function(data, addressID) {
			
			// fill the form		
			jQuery(app.resources["SHIP_FIRST_NAME"]).val(data.address.firstName);
			jQuery(app.resources["SHIP_LAST_NAME"]).val(data.address.lastName);
			jQuery(app.resources["SHIP_ADDRESS1"]).val(data.address.address1);
			jQuery(app.resources["SHIP_ADDRESS2"]).val(data.address.address2);
			jQuery(app.resources["SHIP_CITY"]).val(data.address.city);
			jQuery(app.resources["SHIP_ZIP"]).val(data.address.postalCode);
			jQuery(app.resources["SHIP_STATE_US"]).val(data.address.stateCode);
			jQuery(app.resources["SHIP_COUNTRY"]).val(data.address.countryCode);
			
			jQuery(app.resources["SHIP_PHONE"]).val(data.address.phone);
			var day_phone_1= jQuery(app.resources["SHIP_PHONE"]).val().substr(0,3);
			var day_phone_2= jQuery(app.resources["SHIP_PHONE"]).val().substr(3,3);
			var day_phone_3= jQuery(app.resources["SHIP_PHONE"]).val().substr(6,4);
			jQuery("input#day_phone_1").val(day_phone_1);
			jQuery("input#day_phone_2").val(day_phone_2);
			jQuery("input#day_phone_3").val(day_phone_3);
			
			jQuery(app.resources["SHIP_EVENING_PHONE"]).val(data.address.eveningPhone);
			var eve_phone_1= jQuery(app.resources["SHIP_EVENING_PHONE"]).val().substr(0,3);
			var eve_phone_2= jQuery(app.resources["SHIP_EVENING_PHONE"]).val().substr(3,3);
			var eve_phone_3= jQuery(app.resources["SHIP_EVENING_PHONE"]).val().substr(6,4);
			jQuery("input#eve_phone_1").val(eve_phone_1);
			jQuery("input#eve_phone_2").val(eve_phone_2);
			jQuery("input#eve_phone_3").val(eve_phone_3);
			
			//Disable the save address check box
			jQuery(app.resources["SHIP_SAVE_ADDRESS"]).attr("checked", false);
			//jQuery(app.resources["SHIP_SAVE_ADDRESS"]).attr("disabled", true);
			jQuery("div.addressoptions").hide();
			
			//Cleaning the error messages
			CheckoutUtils.cleanAddressFormErrorMessages();
		}
		
		if ( address && typeof address == 'object' ){
			
			// we have address data as json
			updateAddressFormFields( address, addressID );
		}
		else { 
			// Get address details
			var url = app.URLs.GetAddressDetails;
			url = app.util.appendParamToURL(url, "addressID", addressID);
			
			var result = app.ajax.getJson({
				url: url,
				callback: function(data) {
					if(!data || !data.address) {
						alert(app.resources["SHIP_AddressLoadError"]);
						return false;
					}
					// fill the form
					updateAddressFormFields( data, addressID );
					// remove error messaging
					jQuery("#addressform span.errormessage").remove();
					jQuery("#addressform input.errormessage").removeClass("errormessage");
					jQuery("#addressform .errorlabel").removeClass("errorlabel");

					// Check if the list of shipping methods needs to change
					CheckoutUtils.updateShippingMethodList();
				}
			});
		}

		// update the order summary to reflect the correct tax rate for this state
		CheckoutUtils.updateSummary(jQuery(app.resources["SHIP_STATE_US"]).val());
	},
	
	/**
	 * This method is for updating the 
	 * current address form of billing page 
	*/
	updateAddressFormBilling : function(addressID, address) {
		
		var updateAddressFormFields = function(data, addressID) {
			// fill the form		
			jQuery(app.resources["BILL_ADDRESS_ID"]).val(addressID);
			jQuery(app.resources["BILL_FIRST_NAME"]).val(data.address.firstName);
			jQuery(app.resources["BILL_LAST_NAME"]).val(data.address.lastName);
			jQuery(app.resources["BILL_ADDRESS1"]).val(data.address.address1);
			jQuery(app.resources["BILL_ADDRESS2"]).val(data.address.address2);
			jQuery(app.resources["BILL_CITY"]).val(data.address.city);
			jQuery(app.resources["BILL_ZIP"]).val(data.address.postalCode);
			jQuery(app.resources["BILL_STATE_US"]).val(data.address.stateCode);
			
			jQuery(app.resources["BILL_PHONE"]).val(data.address.phone);
			var day_phone_1= jQuery(app.resources["BILL_PHONE"]).val().substr(0,3);
			var day_phone_2= jQuery(app.resources["BILL_PHONE"]).val().substr(3,3);
			var day_phone_3= jQuery(app.resources["BILL_PHONE"]).val().substr(6,4);
			jQuery("input#day_phone_1").val(day_phone_1);
			jQuery("input#day_phone_2").val(day_phone_2);
			jQuery("input#day_phone_3").val(day_phone_3);
			
			jQuery(app.resources["BILL_EVENING_PHONE"]).val(data.address.eveningPhone);
			var eve_phone_1= jQuery(app.resources["BILL_EVENING_PHONE"]).val().substr(0,3);
			var eve_phone_2= jQuery(app.resources["BILL_EVENING_PHONE"]).val().substr(3,3);
			var eve_phone_3= jQuery(app.resources["BILL_EVENING_PHONE"]).val().substr(6,4);
			jQuery("input#eve_phone_1").val(eve_phone_1);
			jQuery("input#eve_phone_2").val(eve_phone_2);
			jQuery("input#eve_phone_3").val(eve_phone_3);
			
			jQuery(app.resources["BILL_COUNTRY"]).val(data.address.countryCode);
			
			//Disable the save address check box
  			jQuery(app.resources["BILL_SAVE_ADDRESS"]).attr("checked", false);
  			//jQuery(app.resources["BILL_SAVE_ADDRESS"]).attr("disabled", true);
  			jQuery("div.addressoptions").hide();
  			
  			//Removing the error messages
  			jQuery("div.phoneErrorMsg").remove();
  			jQuery("div.ePhoneErrorMsg").remove();
  			
  			//Cleaning the error messages
			CheckoutUtils.cleanAddressFormErrorMessages();
		}
		
		if ( address && typeof address == 'object' ){
			// we have address data as json
			updateAddressFormFields( address, addressID );
		}
		else { 
			// Get address details
			var url = app.URLs.GetAddressDetails;
			url = app.util.appendParamToURL(url, "addressID", addressID);
			
			var result = app.ajax.getJson({
				url: url,
				callback: function(data) {
					if(!data || !data.address) {
						alert(app.resources["BILL_AddressLoadError"]);
						return false;
					}
					// fill the form
					updateAddressFormFields( data, addressID );
					// remove error messaging
					jQuery("#addressform span.errormessage").remove();
					jQuery("#addressform input.errormessage").removeClass("errormessage");
					jQuery("#addressform .errorlabel").removeClass("errorlabel");

					// Check if the list of shipping methods needs to change
					//CheckoutUtils.updateShippingMethodList();
				}
			});
		}

		// update the order summary to reflect the correct tax rate for this state
		CheckoutUtils.updateSummary(jQuery(app.resources["BILL_STATE_US"]).val());
	},
	
	
	/**
	 * Getting the shipment address
	 */
	getShippingAddress : function(formBilling) {
		
		// Get address details
		var url = app.URLs.GetShipmentAddressJSON;
		
		var result = app.ajax.getJson({
			url: url,
			callback: function(data) {
			 			
			 //alert(JSON.stringify(data));
			 if(!data || !data.address) {
					alert(app.resources["BILL_AddressLoadError"]);
					return false;
			 }
			 // fill the form
			 var addressID = null;
			 CheckoutUtils.updateAddressFormBilling(addressID, data);	
			 
			 if(app.resources["PROFILE_ShippingSameAsBilling"] == "true" && jQuery.trim(app.resources["BILL_DEFAULT_ADDRESS_ID"]) != ""){
				//Disabling the address list
				 jQuery("div.addresslist select").attr("disabled", true).val(app.resources["BILL_DEFAULT_ADDRESS_ID"]);
			 }else{
				 //Disabling the address list
				 jQuery("div.addresslist select").attr("disabled", true).val(data.address.ID);
			 }
			 
			 //Disabling the billing address tags
			 CheckoutUtils.enableDisableAddressFormBilling(formBilling);
			
			 	//If same as shipping then
			 	if(jQuery.trim(jQuery("input#day_phone_1").val()) != ""
					&& jQuery.trim(jQuery("input#day_phone_2").val()) != "" 
					&& jQuery.trim(jQuery("input#day_phone_3").val()) != ""){
					
					jQuery("input#day_phone_1").attr("disabled", true);
					jQuery("input#day_phone_2").attr("disabled", true);
					jQuery("input#day_phone_3").attr("disabled", true);
					
				}else{
					jQuery("input#day_phone_1").attr("disabled", false);
					jQuery("input#day_phone_2").attr("disabled", false);
					jQuery("input#day_phone_3").attr("disabled", false);
				}
			 
			}
		}); 
	},
	
	
	/**
	 * Enable, Disable the address form of billing page
	 */
	enableDisableAddressFormBilling : function(formBilling) {
		
		formBilling.find(':input').each( function(){
			
			var element = jQuery(this);
			//alert("Type: " + element + " Class:" + element.attr("class"));
			if(element.hasClass("country") || element.hasClass("phone") || element.hasClass("day_phone") || element.hasClass("checkinput")){
				//alert("Type: " + element + " Class:" + element.attr("class"));
				if(element.hasClass("phone") && jQuery.trim(element.val()) != ""){
					element.attr("disabled", !this.disabled);
				}
			}else{
				element.attr("disabled", !this.disabled);
			}
			
		});
			
	},
	
	/**
	 * enable the address form of billing page
	 */
	enableAddressFormBilling : function() {
		
		var formBilling = jQuery("div.addressformtags");
		formBilling.find(':input').each( function(){
			var element = jQuery(this);
			if(element.hasClass("country") || element.hasClass("phone") || element.hasClass("checkinput")){
				//Do nothing
			}else{
				element.attr('disabled', false);
			}
		});
	},
	
	
	/**
	 * Enable credit card form of billing page
	 */
	enableCreditCardForm : function() {
		jQuery(app.resources["BILL_CC_TYPE"]).attr('disabled', false);
		jQuery(app.resources["BILL_CC_NUMBER"]).attr('disabled', false);
		jQuery(app.resources["BILL_CC_MONTH"]).attr('disabled', false);
		jQuery(app.resources["BILL_CC_YEAR"]).attr('disabled', false);
	},
	
	/**
	 * Disable credit card form of billing page
	 */
	disableCreditCardForm : function() {
		jQuery(app.resources["BILL_CC_TYPE"]).attr('disabled', true);
		jQuery(app.resources["BILL_CC_NUMBER"]).attr('disabled', true);
		jQuery(app.resources["BILL_CC_MONTH"]).attr('disabled', true);
		jQuery(app.resources["BILL_CC_YEAR"]).attr('disabled', true);
	},
	
	/* 
	 * This method is for cleaning the error messages
	 * from the CC page
	 */
	cleanCreditCardFormErrorMessages : function() {
		jQuery("div.invalidCC").hide();
		jQuery("div.creditcardpayment").find("span.errormessage").each( function(){
			var errorMsg = jQuery(this);
			errorMsg.hide();
		});
	}
	
	
}//end of CheckoutUtils



//On page ready execute from here
jQuery(document).ready(function(){
	
	//Getting the doc body
	var base = document.body;
	CheckoutUtils.enhanceDOM(base);
});