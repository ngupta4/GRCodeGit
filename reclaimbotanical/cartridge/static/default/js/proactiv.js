/**
 * Proactiv API
 */
app.proactiv = {
	/**
	 * Resource variables handling
	 */
	resources : {
		/**
		 * Set variable value
		 * If first argument is an object then method will iterate through its properties and add them as variables
		 */
		set : function(key, value) {
			if (typeof key == 'object') {
				for (var prop in key) {
					if (!key.hasOwnProperty(prop)) continue;
					
					this.set(prop, key[prop]);
				}
			}
			else {
				this['_' + key] = value;
			}
		},
		
		/**
		 * Get variable value
		 */
		get : function(key, defaultValue) {
			return this['_' + key] || defaultValue;
		}
	},

	/**
	 * Checkout API
	 */
	checkout : {
		container : null,
		subTotal : null,
		taxAmount : null,
		shipping : null,
		quantity : null,
		totalPrice : null,
		//email verification flag
		varifiedMail: null,
		submitActionFired: false,
		hash : {},
		
		/**
		 * Initialize checkout API
		 */
		init : function() {
			this.container = jQuery('#' + app.proactiv.resources.get('cartFormID'));
			this.subTotal = this.container.find('.merchandiseTotal');
			this.taxAmount = this.container.find('.taxamount');
			this.shipping = this.container.find('.shipping');
			this.totalPrice = this.container.find('.totalPrice');
			this.quantity = null;
			
			this.changeShipment();
			this.changeQuantity();
			if (!app.proactiv.resources.get('paymentAlwaysVisible')) {
				this.initPayment();
			}
			this.changePaymentMethod();
			this.initBillingAddress();
			this.verifyEmail();
			this.checkCCardType();
		},
		
		upperCase: function(value){
		    return typeof value == "string" ? value.toUpperCase() : value;
		},
		
		/*checkPassword : function(){
			var form = jQuery('.checkoutform');
			//var url = app.proactiv.resources.get('verifyEmailUrl');
			var emailInput = form.find('.email input');
			var pwdVal = jQuery('.password .textinputpw').val();
			var cfrmPwdVal = jQuery('.passwordconfirm .textinputpw').val();
			if (pwdVal.trim() == '' && cfrmPwdVal.trim() == '') {
				return true;
			}
			var data = this.hash[emailInput.val()];
			if(data['status'] && data.status.toLowerCase() == 'active'){
				var emailField = jQuery('.email'),
				errorField = emailField.find('span.errorclient');	
				var message = data.message != '' ? data.message: app.URLs.msgWithLoginURL;
				if(!errorField.length){
					jQuery('<span class="errorclient" genereted_="true" htmlfor="'+emailField.find('input').attr('id')+'">').append('<strong>'+message+'</strong>').appendTo(emailField);
				}else{
					errorField.html('<strong>'+message+'</strong>').show();
				}
				return false;
			}else{
				return true;
			
			}
		},*/
		
		/**
		 *  Verification of mail user input
		 */
		verifyEmail: function() {
			var form = jQuery('.checkoutform');
			var url = app.proactiv.resources.get('verifyEmailUrl');
			var emailInput = form.find('.email input'),
				confirmEmailInput = form.find('.emailConfirm input');
			//var hash = {};
			var checkout = this;
			
			function checkStatus(data){
				
				if(data.status.toLowerCase() == 'active'){
					var emailField = jQuery('.email'),
						errorField = emailField.find('span.errorclient');					
					if(!errorField.length){
						//jQuery('<span class="errorclient" genereted_="true" htmlfor="'+emailField.find('input').attr('id')+'">').append('<strong>'+data.message+'</strong>').appendTo(emailField);
					}else{
						//errorField.html('<strong>'+data.message+'</strong>').show();
					}
					return false;
				}else{
					return true;
				
				}
			}
			
			//jQuery('.password .textinputpw').blur(checkout.checkPassword);
			
			if(url && !app.proactiv.resources.get('verifyEmailLimit')){
				var verifyEmailHandler = function(e){
					if(form.find('.email input').val() && form.find('.emailConfirm input').val() && form.validate().element('.email input') &&	form.validate().element('.emailConfirm input')){
						//debugger;
						if(typeof checkout.hash[emailInput.val()] === 'undefined'){
							jQuery.ajax({
								type: "POST",
								aync: false,
								dataType: "json",
								url: url,
								data: {mail: emailInput.val()},
								success: function(data){							
										try{
											checkout.varifiedMail = emailInput.val();			
											//debugger;
											if( Object.prototype.toString.call(data) === '[object Object]' && data['status']){
												checkout.hash[emailInput.val()] = data;
												if(!checkStatus(data)){
													return; 
												}
											}
												//verification call error
											checkout.varifiedMail = emailInput.val();
																			
										}catch(e){
										
										}
									},
								error: function (){
										//debugger;
									}
								});
						}else{
							//debugger;
							checkStatus(checkout.hash[emailInput.val()]);
							checkout.varifiedMail = emailInput.val();
						}
					}
				};				
				emailInput.blur(verifyEmailHandler);
				confirmEmailInput.blur(verifyEmailHandler);
			}
		},
		/**
		 * Change shipping method handler
		 */
		changeShipment : function() {
			jQuery('.shippingmethodslist :select', this.container).bind('click', function() {
				jQuery('#totalshippingprice').addClass('loading');
				
				jQuery.getJSON(
					app.proactiv.resources.get('updateShippingPriceUrl'),
					{
						shippingID : jQuery('.shippingmethodslist :select:selected').val(),
						qty : jQuery('#coreOffer .quantityselector').val() || 1
					},
					function(price) {
						if (price.success) {
							jQuery(app.proactiv.resources.get('shipping-price-selector')).text(price.update.shipping.stringValue);
							jQuery(app.proactiv.resources.get('total-price-selector')).text(price.update.totalPrice.stringValue);
						}
						
						jQuery('#totalshippingprice').removeClass('loading');
					}
				);
			});
		},
		
		/**
		 * Change cart product quantity handler
		 */
		changeQuantity : function() {
			jQuery("#qtyincrease.active").click(function() {
				var qty=parseInt(($(".quantityselector").val()), 10);
				if(qty<($(".quantityselector").attr('max')))
				{
					qty=qty+1;
					$(".quantityselector").val(qty);
					
				jQuery('#totalshippingprice').addClass('loading');
				
				jQuery.getJSON(
					app.proactiv.resources.get('updateQtyUrl'),
					{
						shippingID : jQuery('.shippingmethodslist :select:selected').val(),
						pid : jQuery('#coreOffer .coreid').val(),
						qty : jQuery('#coreOffer .quantityselector').val() || 1
					},
					function(price) {
						if (price.success) {
							jQuery(app.proactiv.resources.get('subtotal-selector')).text(price.update.merchandiseTotal.stringValue);
							jQuery(app.proactiv.resources.get('shipping-price-selector')).text(price.update.shipping.stringValue);
							jQuery(app.proactiv.resources.get('total-price-selector')).text(price.update.totalPrice.stringValue);
						}
						
						jQuery('#totalshippingprice').removeClass('loading');
					}
				);
				}
			});
			jQuery("#qtydecrease.active").click(function() {
				var qty=parseInt(($(".quantityselector").val()), 10);
				if(qty>($(".quantityselector").attr('min')))
				{
					qty=qty-1;
					$(".quantityselector").val(qty);
					
				jQuery('#totalshippingprice').addClass('loading');
				
				jQuery.getJSON(
					app.proactiv.resources.get('updateQtyUrl'),
					{
						shippingID : jQuery('.shippingmethodslist :select:selected').val(),
						pid : jQuery('#coreOffer .coreid').val(),
						qty : jQuery('#coreOffer .quantityselector').val() || 1
					},
					function(price) {
						if (price.success) {
							jQuery(app.proactiv.resources.get('subtotal-selector')).text(price.update.merchandiseTotal.stringValue);
							jQuery(app.proactiv.resources.get('shipping-price-selector')).text(price.update.shipping.stringValue);
							jQuery(app.proactiv.resources.get('total-price-selector')).text(price.update.totalPrice.stringValue);
						}
						
						jQuery('#totalshippingprice').removeClass('loading');
					}
				);
				}
			});
			jQuery('.quantityselector', this.container).change(function() {
				jQuery('#totalshippingprice').addClass('loading');
				
				jQuery.getJSON(
					app.proactiv.resources.get('updateQtyUrl'),
					{
						shippingID : jQuery('.shippingmethodslist :select:selected').val(),
						pid : jQuery('#coreOffer .coreid').val(),
						qty : jQuery('#coreOffer .quantityselector').val() || 1
					},
					function(price) {
						if (price.success) {
							jQuery(app.proactiv.resources.get('subtotal-selector')).text(price.update.merchandiseTotal.stringValue);
							jQuery(app.proactiv.resources.get('shipping-price-selector')).text(price.update.shipping.stringValue);
							jQuery(app.proactiv.resources.get('total-price-selector')).text(price.update.totalPrice.stringValue);
						}
						
						jQuery('#totalshippingprice').removeClass('loading');
					}
				);
			});
		},
		
		/**
		 * Initialize payment
		 */
		initPayment : function() {
			var form = jQuery('.checkoutform');
			var paymentSection = form.find('.paymentInfo');
			var that = this;
			
			// We need to display payment section if it is not visible and if form is valid
			var validatorSettings = jQuery.extend(app.validatorSettings, {
				
				
				submitHandler : function(f) {
					app.proactiv.resources.set("GRMSubmissionStatus", "ORDERSUBMIT")
					// If payment section is hidden then display it and prevent form submit
					if (!paymentSection.is(':visible')) {
						// Display payment section and enable all input fields
						that.showPaymentSection();
						
						return false;
					}
					
					//email verification
					if(that.varifiedMail != form.find('.email input').val() && !that.submitActionFired){
						form.find('.email input').blur();
						that.submitActionFired = true;
						/*if (!that.checkPassword()) {
							return false;
						}*/
						//return false;
					}
					
					//debugger;
					/*if (!that.checkPassword()) {
						return false;
					}*/
					
					if (!that.checkPaymentType()) {
						return false;
					}
					// If payment section is visible then process the form normally
					
					f.submit();
				}
			});
			
			if (!app.proactiv.resources.get('paymentAlwaysVisible') && !paymentSection.find('select').val() && !paymentSection.is(':visible') && !jQuery('.errormessage:visible').size()) {
				paymentSection.add('.agreeBox').find(':input').attr('disabled', 'disabled');
			}
			else {
				this.showPaymentSection();
			}
			
			
			// Reinitialize the validator
			form.data('validator', '').validate(validatorSettings);
		},
		
		showPaymentSection : function() {
			//jQuery('.personInfform .paymentInfo').show();
			jQuery('.personInfform .paymentInfo').add('.agreeBox').show().find(':input').removeAttr('disabled');
			jQuery('.continueBtn').addClass('completBtn');
			
			if (app.proactiv.checkout.upperCase(jQuery('.paymentInfo select').val().toUpperCase()) == app.proactiv.resources.get('paypalPayment')) {
				jQuery('.paymentInfo .carddetails').hide().find(':input').attr('disabled', 'disabled');				
			}
		},
		
		/**
		 * Change payment method handler
		 */
		changePaymentMethod : function() {
			var handler = function() {
				if (jQuery(this).size()) {
					jQuery('#' + app.proactiv.resources.get('paymentSelectedMethodName')).val(jQuery(this).find(':selected').attr('class').replace('paymentmethod-', ''));
										
					if (app.proactiv.checkout.upperCase(jQuery(this).val()) == app.proactiv.resources.get('paypalPayment')) {
						jQuery('.paymentInfo .carddetails').hide().find(':input').attr('disabled', 'disabled');
					}
					else {
						jQuery('.paymentInfo .carddetails').show().find(':input').removeAttr('disabled');
					}
				}
			};
			
			if (app.proactiv.checkout.upperCase(app.proactiv.resources.get('typeselected')) == app.proactiv.resources.get('paypalPayment')) {
				handler.call(jQuery('.paymentmethodselector'));
			}
			
			jQuery('.paymentMethod select').change(handler);
		},
		
		/**
         * Check credit card type
         */
		checkPaymentType : function(){
			var form = jQuery('.checkoutform');
			
			if (document.getElementById("paymentMethod").value == "unknown" || 	document.getElementById("paymentMethod").value == "Unknown" || document.getElementById("paymentMethod").value == null ||!(document.getElementById("paymentMethod").value)){
					var message = app.resources["INVALID_CCNUMBER"];					
					if($("#card_number span").hasClass("errormessage")){
						$("#card_number .errormessage").show();
						$("#card_number .errormessage").html(message);
					}else{
						$("#card_number").append('<span class="errormessage" generated="true" htmlfor="creditCardNumber">'+message+'</span>');
					}
				return false;					
				}else{					
				return true;
			}
					
				
		},
		
         checkCCardType : function(){                    
                jQuery("#creditCardNumber").keyup(function(){
                      var cardNo = jQuery("#creditCardNumber").val();
                      var CreditCardType = "unknown";
                         cardNo = cardNo.replace(" ", "");
                         var isNotNumber = isNaN(cardNo);
                         var containsDot = true;
                         if(cardNo.indexOf('.') == -1){
                        	 containsDot = false;
                         }
                         if((cardNo.length < 14) || containsDot || isNotNumber){
	                         $(".value").removeClass().addClass("value");
	                         $('input[id="paymentMethod"]').attr('value',"");
	                         return;                                  
                         }
                             
                             var first_two_digits=cardNo.substring(0, 2);
                             switch(first_two_digits){
                                    case "34":
                                   CreditCardType = "Amex"; break;
                                   case "37":
                                   CreditCardType = "Amex"; break;    
                                   case "51":
                                   CreditCardType = "MasterCard"; break;
                                   case "52":
                                   CreditCardType = "MasterCard"; break;
                                   case "53":
                                   CreditCardType = "MasterCard"; break;
                                   case "54":
                                   CreditCardType = "MasterCard"; break;
                                   case "55":
                                   CreditCardType = "MasterCard"; break;
                                   default:  
                                      CreditCardType = "unknown";
                             }
                             if(CreditCardType == "unknown")
                                    {
                                    var first_four_digits=cardNo.substring(0, 4);
                                   switch(first_four_digits){   
                                      case "6011":
                                         CreditCardType = "Discover"; break;
                                    default:  
                                                  CreditCardType = "unknown";
                                   }
                                    }          
                                         if(CreditCardType == "unknown")
                                                  {  
                                           var first_digit=cardNo.substring(0, 1);
                                            switch(first_digit){
                                               case "4":
                                                 CreditCardType = "Visa"; break;
                                           default:  
                                                                CreditCardType = "Unknown";
                                            }
                                            
                                                  }
                                     
                                         $(".value").removeClass().addClass("value");
                                         $(".value").addClass(CreditCardType);
                                         $('input[id="paymentMethod"]').attr('value',CreditCardType);                                                                         
                });
         
         },

		
		/**
		 * Initialize checkbox that changes using of custom billing address
		 */
		initBillingAddress : function() {
			var checkbox = jQuery('#' + app.proactiv.resources.get('billingEqualsShippingCheckbox'));
			var equals = app.proactiv.resources.get('billingEqualsShipping');
			var shippingToggle = function() {
				jQuery('.cartShipping .checkoutBoxInner :input').attr('disabled', jQuery(this).attr('checked') ? 'disabled' : '').removeClass(app.validatorSettings.errorClass).next(app.errorElement).hide();
				var checkboxcheck=checkbox.is(':checked');					
				if(checkboxcheck == true  ){
				jQuery('#shippingBox').hide();
				jQuery('.checkoutBoxInner').addClass('inputbg');
				jQuery('#cartwenhaircare-wstone .billingShipping .checkoutBoxInner').slideUp();

				}
				else {
				jQuery('#shippingBox').show();
				jQuery('.checkoutBoxInner').removeClass('inputbg');
				jQuery('#cartwenhaircare-wstone .billingShipping .checkoutBoxInner').slideDown();

				}

			};

			// Bind click handler
			checkbox.click(shippingToggle);
			(equals != null && equals=='false') ? checkbox.removeAttr('checked') : shippingToggle.call(checkbox);
		}
	}
};