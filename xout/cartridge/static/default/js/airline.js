
/**
 * Proactiv API
 */
app.airline = {
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
			this.container = jQuery('#' + app.airline.resources.get('cartFormID'));
			this.subTotal = this.container.find('.merchandiseTotal');
			this.taxAmount = this.container.find('.taxamount');
			this.shipping = this.container.find('.shipping');
			this.totalPrice = this.container.find('.totalPrice');
			this.quantity = null;
			
			this.changeShipment();
			this.changeQuantity();
			if (!app.airline.resources.get('paymentAlwaysVisible')) {
				this.initPayment();
			}
			this.changePaymentMethod();
			this.initBillingAddress();
			this.verifyEmail();
			this.checkCCardType();
			jQuery("#QuickViewDialog").remove();
		},
		
		upperCase: function(value){
		    return typeof value == "string" ? value.toUpperCase() : value;
		},
		
		checkPassword : function(){
			var form = jQuery('.checkoutform');
			//var url = app.airline.resources.get('verifyEmailUrl');
			var emailInput = form.find('.email input');
			var pwdVal = jQuery('.password .textinputpw').val();
			var cfrmPwdVal = jQuery('.passwordconfirm .textinputpw').val();
			if ($.trim(pwdVal) == '' && $.trim(cfrmPwdVal) == ''){
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
		},
		
		/**
		 * Validate card on basis of payment type
		 */
		checkPaymentType : function(){
			var form = jQuery('.checkoutform');
			if (document.getElementById("paymentMethod").value == "unknown" || 	document.getElementById("paymentMethod").value == "Unknown" || document.getElementById("paymentMethod").value == null ||!(document.getElementById("paymentMethod").value)){
				
					var message = app.resources["INVALID_CCNUMBER"];					
					/*removed word .value*/
					if($("#card_number  span").hasClass("errormessage")){
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
		/**
		 * Check credit card type
		 */
		checkCCardType : function(){			
			 jQuery("#creditCardNumber").blur(function(){
				 var cardNo = jQuery("#creditCardNumber").val();
				 var CreditCardType = "unknown";
					cardNo = cardNo.replace(" ", "");
					var isNotNumber = isNaN(cardNo);
					var containsDot = true;
					if(cardNo.indexOf('.') == -1){
						containsDot = false;
					}
					if((cardNo.length < 14) || isNotNumber || containsDot){
						$(".card_number").toggleClass().addClass("formfield card_number");
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
										CreditCardType = "unknown";
					               }
					               
								}
								/*changed word .value to card_number*/												        
					            $(".card_number").toggleClass().addClass("formfield card_number");
					            $(".card_number").addClass(CreditCardType);
					            $('input[id="paymentMethod"]').attr('value',CreditCardType);					            			            
			});
			 jQuery("#creditCardNumber").keydown(function(){
				 $(this).removeClass('errormessage');
				 /*removed word .value*/
				$('#card_number span.errormessage').hide();
			 })
			 
			 $(".expiration_date select").each(function(){
				 $(this).bind('change', function(){
					 $(".expiration_date").find("#paymentinfoerrors").hide();
				 })
			 })
			 
		},	
		
		/**
		 *  Verification of mail user input
		 */
		verifyEmail: function() {
			var form = jQuery('.checkoutform');
			var url = app.airline.resources.get('verifyEmailUrl');
			var emailInput = form.find('.email input'),
				confirmEmailInput = form.find('.email_confirm input');
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
			
			if(url && !app.airline.resources.get('verifyEmailLimit')){
				var verifyEmailHandler = function(e){
					if(form.find('.email input').val() && form.find('.email_confirm input').val() && form.validate().element('.email input') &&	form.validate().element('.email_confirm input')){
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
            jQuery('.shippingmethodslist select', this.container).bind('change', function() {
                jQuery('#totalshippingprice').addClass('loading');
               
                jQuery.getJSON(
                    app.airline.resources.get('updateShippingPriceUrl'),
                    {
                        shippingID : jQuery('.shippingmethodslist option:selected').val(),
                        qty : jQuery('#coreOffer .quantityselector').val() || 1
                    },
                    function(price) {
                        if (price.success) {
                            jQuery(app.airline.resources.get('shipping-price-selector')).text(price.update.shipping.stringValue);
                            jQuery(app.airline.resources.get('total-price-selector')).text(price.update.totalPrice.stringValue);
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
					
			jQuery('.quantityselector', this.container).change(function() {
				jQuery('#totalshippingprice').addClass('loading');
				
				jQuery.getJSON(
					app.airline.resources.get('updateQtyUrl'),
					{
						shippingID : jQuery('.shippingmethodslist option:checked').val(),
						pid : jQuery('#coreOffer .coreid').val(),
						qty : jQuery('#coreOffer .quantityselector').val() || 1
					},
					function(price) {
						if (price.success) {
							jQuery(app.airline.resources.get('subtotal-selector')).text(price.update.merchandiseTotal.stringValue);
							jQuery(app.airline.resources.get('shipping-price-selector')).text(price.update.shipping.stringValue);
							jQuery(app.airline.resources.get('total-price-selector')).text(price.update.totalPrice.stringValue);
						}
						
						jQuery('#totalshippingprice').removeClass('loading');
						
					}
				);
				
				 if($('.pt-checkout-refresh .upsellrecommendation .upsell-id:visible .PanelB .selectKit .sasKits li.90-Day.active').length>0){	 
					 setTimeout(function(){ $(".merchandiseTotal").append(" Per Month"); },600);
				 }
				
			});
		},
		
		/**
		 * Initialize payment
		 */
		initPayment : function() {
			var form = jQuery('.checkoutform');
			var paymentSection = form.find('.payment_info');
			var that = this;
			
			// We need to display payment section if it is not visible and if form is valid
			var validatorSettings = jQuery.extend(app.validatorSettings, {
				invalidHandler : function(form, validator) {
					// Had to use this for placing error message for agree box, because errorPlacement doesn't work on submit for some reason
					jQuery('.agree_box span.errorclient').appendTo('.agree_box .checkbox');
				},
				
				submitHandler : function(f) {
					app.airline.resources.set("GRMSubmissionStatus", "ORDERSUBMIT")
					// If payment section is hidden then display it and prevent form submit
					if (!paymentSection.is(':visible')) {
						// Display payment section and enable all input fields
						if(app.resources['RTS_ENABLED']=='true'){
							callRTS(that);
						}
						else{
							that.showPaymentSection();
						}
						
						return false;
					}else{
						//If payment section is visible, then call the below mentioned method for form submission
						beforesubmitcheck();
					}
					//email verification
					if(that.varifiedMail != form.find('.email input').val() && !that.submitActionFired){
						form.find('.email input').blur();
						that.submitActionFired = true;
						if (!that.checkPassword()) {
							return false;
						}
						//return false;
					}
					
					//debugger;
					if (!that.checkPassword()) {
						return false;
					}
					
					if (!that.checkPaymentType()) {
						return false;
					}

					// If payment section is visible then process the form normally
					jQuery('.completeBtn').attr('disabled', 'disabled');
					var payment_method = jQuery('#paymentMethod').val();
					var plSelected = wasPayLaterSelected();
					if(app.resources['RTS_ENABLED']=='true' && payment_method == 'PayPal' && plSelected){
						swapPaypalOfferCodeandSubmit(f);
					}else{
						f.submit();
					}
				}
			});
			
			// Disable all input fields in hidden payment section to prevent validation
			if (!app.airline.resources.get('paymentAlwaysVisible') && ($('#paymentMethod').val() == "") && !paymentSection.is(':visible') && !jQuery('.errormessage:visible').size()) {
				paymentSection.add('.agree_box').find(':input').attr('disabled', 'disabled');
			}
			else {
				this.showPaymentSection();
			}
			
			
			// Reinitialize the validator
			form.data('validator', '').validate(validatorSettings);
		},
		
		showPaymentSection : function() {
			jQuery('.personinfform .payment_info').add('.agree_box').show().find(':input').removeAttr('disabled');
			$('.row.actionPanel .leftSection').show();
			if( $('.vita').is(':visible')){
				$('.row.actionPanel').removeClass('fullBar');
			}else{
				$('.row.actionPanel').addClass('fullBar');
			}
			
			jQuery('.continueBtn').addClass('completeBtn');			
			if (app.airline.checkout.upperCase(jQuery('.payment_info select').val().toUpperCase()) == app.airline.resources.get('paypalPayment')) {
				jQuery('.payment_info .card_details').hide().find(':input').attr('disabled', 'disabled');				
			}
			enableSelectedCards();
		},
		
		/**
		 * Change payment method handler
		 */
		changePaymentMethod : function() {
			var handler = function() {
				if (jQuery(this).size()) {
					jQuery('#' + app.airline.resources.get('paymentSelectedMethodName')).val(jQuery(this).find(':selected').attr('class').replace('paymentmethod-', ''));
										
					if (app.airline.checkout.upperCase(jQuery(this).val()) == app.airline.resources.get('paypalPayment')) {
						jQuery('.payment_info .card_details').hide().find(':input').attr('disabled', 'disabled');
					}
					else {
						jQuery('.payment_info .card_details').show().find(':input').removeAttr('disabled');
					}
				}
			};
			
			if (app.airline.checkout.upperCase(app.airline.resources.get('typeselected')) == app.airline.resources.get('paypalPayment')) {
				handler.call(jQuery('.paymentmethodselector'));
			}
			
			jQuery('.payment_method select').change(handler);
		},
		
		/**
		 * Initialize checkbox that changes using of custom billing address
		 */
		initBillingAddress : function() {
			var checkbox = jQuery('#' + app.airline.resources.get('billingEqualsShippingCheckbox'));
			var equals = app.airline.resources.get('billingEqualsShipping');
			var shippingToggle = function() {				
				if(jQuery(this).attr('checked')){
					jQuery('.cb_shipping .checkout_box_inner :input').attr('disabled','disabled').removeClass(app.validatorSettings.errorClass).next(app.errorElement).hide();
					jQuery('.cb_shipping').hide();
				}else{
					jQuery('.cb_shipping .checkout_box_inner :input').removeAttr('disabled').removeClass(app.validatorSettings.errorClass).next(app.errorElement).hide();
					jQuery('.cb_shipping').show();
				}
			};
			// Bind click handler
			checkbox.click(shippingToggle);
			
			(equals != null && !equals) ? checkbox.removeAttr('checked') : shippingToggle.call(checkbox);
		}
		
			
	}
};




//Own Airline Model JS
var AIRLINECOMMON = {};
AIRLINECOMMON.ui = {
    selectKitPopup: {
        element: ".popupOverlay",
        init: function () {
            jQuery('.popupOverlay').click(function () {
                jQuery("#moreInfo").remove();
                jQuery("<div/>").attr("id", "moreInfo").html("").appendTo(document.body);
                app.createDialog({
                    id: 'moreInfo',
                    options: {
                        bgiframe: true,
                        modal: true,
                        closeOnEscape: true,
                        width: 480,
                        height: 512,
                        title: '',
                        resizable: false
                    }
                });
                var urlvedio = jQuery(this).attr('href');
                jQuery("#moreInfo").parent().css('background', '#fff').css('padding', '7px 10px 0 8px');
                var objtitle = jQuery("#moreInfo").siblings('.ui-dialog-titlebar');
                jQuery('#moreInfo').load(urlvedio);
                jQuery('#moreInfo').dialog('open');
                $(".ui-widget-overlay").click(function () {
                    jQuery(".ui-dialog").hide();
                    jQuery(".ui-widget-overlay").hide();
                    jQuery('#moreInfo').dialog('close');
                    
                }); //clicking background closes dialog

                return false;
            });
        }
    },
    selectFreeGiftPopup: {
        element: ".more-info-overlay",
        init: function () {
            jQuery('.more-info-overlay').click(function () {
                jQuery("#moreInfo").remove();
                jQuery("<div/>").attr("id", "moreInfo").html("").appendTo(document.body);
                app.createDialog({
                    id: 'moreInfo',
                    options: {
                        bgiframe: true,
                        modal: true,
                        closeOnEscape: true,
                        width: 746,
                        height: "auto",
                        title: '',
                        resizable: false
                    }
                });
                var urlvedio = jQuery(this).attr('href');
                jQuery("#moreInfo").parent().css('background', '#fff').css('padding', '7px 10px 0 8px');
                var objtitle = jQuery("#moreInfo").siblings('.ui-dialog-titlebar');
                jQuery('#moreInfo').load(urlvedio);
                jQuery('#moreInfo').dialog('open');

                $(".ui-widget-overlay").click(function () {
                    jQuery(".ui-dialog").hide();
                    jQuery(".ui-widget-overlay").hide();
                    jQuery('#moreInfo').dialog('close');
                }); //clicking background closes dialog

                return false;
            });
        }
    },
    TermsConditionPopup: {
        element: ".terms-condition-overlay",
        init: function () { 
            jQuery('.terms-condition-overlay').click(function () {
                jQuery("#moreInfo").remove();
                jQuery("<div/>").attr("id", "moreInfo").html("").appendTo(document.body); 
                app.createDialog({
                    id: 'moreInfo',
                    options: {
                        bgiframe: true,
                        modal: true,
                        closeOnEscape: true,
                        width: 662,
                        height: 500,
                        title: '',
                        resizable: false
                    }
                });
                var urlvedio = jQuery(this).attr('href');
                jQuery("#moreInfo").parent().css('background', '#fff').css('padding', '7px 10px 0 18px').css('overflow', 'hidden');
                var objtitle = jQuery("#moreInfo").siblings('.ui-dialog-titlebar');
                
                jQuery('#moreInfo').load(urlvedio);
                jQuery('#moreInfo').dialog('open');
                jQuery('#moreInfo').css('height','480px');
                jQuery(".ui-widget-overlay").click(function () {
                    jQuery(".ui-dialog").hide();
                    jQuery(".ui-widget-overlay").hide();
                    jQuery('#moreInfo').dialog('close');
                }); //clicking background closes dialog

                return false;
            });
        }
    },
    shippingMethodList: {
        element: ".shippingmethodslist",
        init: function () {
            jQuery('.shippingmethodslist').find('.seedetails>a').hover(function (e) {
                var margin = 5;
                var jqTooltip = jQuery(this).find('.shippingdetailspopup');
                //if we have no space in top of link show down
                if (jqTooltip.height() + jQuery(this).height() > e.clientY) {
                    jqTooltip.css({
                        top: jQuery(this).height() + margin,
                        display: 'block'
                    });
                } else {
                    jqTooltip.css({
                        top: -(jqTooltip.height() + jQuery(this).height()),
                        display: 'block'
                    });
                }
            }, function () {
                jQuery(this).find('.shippingdetailspopup').removeAttr('style');
            });
        }
    },
    cartSummaryAddButton: {
        element: ".addbutton",
        init: function () {
            $('.addbutton').click(function () {
            	$('.vita').hide();
                $(".row.actionPanel").addClass("fullBar");
                var payMethod = getPayMethod();
                jQuery.getJSON(
                    app.airline.resources.get('updateSupplyURL'), {
                        pid: jQuery('.crossSellID').val(),
                        isKit: 'false',
                        paymentMethod : payMethod
                    },
                    function (supply) {
                        if (supply.success) {
                            jQuery(app.airline.resources.get('vitaminname')).html(supply.update.ProdName.stringValue);
                            jQuery(app.airline.resources.get('vitaminsection')).html(supply.update.CartDescription.stringValue);
                            //$('.vitaminProduct').hide();
                            $('.vita').hide();
                            hidePayPal();
                            //$("#paywithpaypal").hide();
                            $('#freeOffer').show();
                            var a = $('<a />');
                            a.attr('href', 'javascript:void(0);');
                            a.attr('name', supply.update.ProdId.stringValue);
                            $(".coreidCY").attr("value", supply.update.ProdId.stringValue);
                            $("#vitPresentInCart").attr("value", true);
                            a.attr('title', 'remove');
                            a.text(' remove');
                            a.attr('class', 'remove_vitamin');
                            $('div.name.vitamin').append(a);
                            $('.remove_vitamin').live('click', function () {
                            	$(".row.actionPanel").removeClass("fullBar");
                                var prodId = $(this).attr('name');
                                jQuery.getJSON(
                                    app.airline.resources.get('removeVitaminURL'), {
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
                                            //$("#paywithpaypal").show();
                                        }
                                    }
                                );
                               
                            });
                           
                            
                        }
                    }
                );
            });
        }
    },
    removeItem: {
        element: ".remove_item",
        init: function () {
            $('.remove_item').click(function () {
                var prodId = $(this).attr('name');
                jQuery.getJSON(
                    app.airline.resources.get('removeVitaminURL'), {
                        pid: prodId
                    },
                    function (supply) {
                        if (supply.success) {
                            if (supply.update.pageReload.stringValue == 'true') {
                                //var redirectUrl = "${URLUtils.url('Checkout-Show')}";
                            	var redirectUrl = redirectUrlAirline;
                                window.location.href = redirectUrl;
                            } else {

                                if (supply.update.UpsellProd.stringValue != '') {
                                    jQuery('.upSellID').val(supply.update.UpsellProd.stringValue);
                                    $('#valueUpsellSection').addClass('block');
                                    $('#valueUpsellSection').show();
                                } else {
                                    jQuery('.upSellID').val(supply.update.CoreId.stringValue);
                                    $('#valueUpsellSection').removeClass('block');
                                    $('#valueUpsellSection').hide();
                                }
                                updateProductInfo(supply);
                                var isSelected = 'false';
                                var i;
                                var options = '';
                                var isSelected = 'false';
                                for (i = 0; i <= supply.update.ShipList.length - 1; i++) {
                                    if (supply.update.ShipList[i].selected == 'true') {
                                        options += '<option value="' + supply.update.ShipList[i].value + '" selected="selected">' + supply.update.ShipList[i].lable + '</option>';
                                        isSelected = 'true';
                                    } else {
                                        if (i == (supply.update.ShipList.length - 1) && isSelected == 'false') {
                                            options += '<option value="' + supply.update.ShipList[i].value + '" selected="selected">' + supply.update.ShipList[i].lable + '</option>';
                                        } else {
                                            options += '<option value="' + supply.update.ShipList[i].value + '">' + supply.update.ShipList[i].lable + '</option>';
                                        }
                                    }
                                }
                                $(".shipList").html(options);
                                $('#daySupply').empty();
                                var sullpyOptions = '';
                                for (i = 0; i < supply.update.daySupply.length; i++) {
                                    sullpyOptions += '<option value="' + supply.update.daySupply[i].value + '">' + supply.update.daySupply[i].label + '</option>';
                                }
                                $("#daySupply").html(sullpyOptions);
                                $('a.remove_item').attr('name', supply.update.CoreId.stringValue);
                            }
                        }
                    }
                );
                
            });
        }
    },
    removeVitamin: {
        element: ".remove_vitamin",
        init: function () {
            $('.remove_vitamin').click(function () {
                var prodId = $(this).attr('name');
                jQuery.getJSON(
                    app.airline.resources.get('removeVitaminURL'), {
                        pid: prodId
                    },
                    function (supply) {
                    	$('.free').empty();

                        if (supply.success) {
                        	$(".row.actionPanel").removeClass("fullBar");
                            $('#freeOffer').empty();
                            $('#freeDesc').empty();
                            $('.vita').show();
                            $('#freeOffer').hide();
                            $('#freeDesc').hide();
                            $('.free').hide();
                            $("#vitPresentInCart").attr("value", false);
                            showPayPal();
                            //$("#paywithpaypal").show();
                        }
                    }
                );
            });
        }
    },
    cartSummarydaySupply: {
        element: ".daySupply",
        init: function () {
            $('.daySupply').change(function () {
                var pid = $(this).val();           
                var optionval = $(this).find("option:selected").text();
                jQuery.getJSON(
                    app.airline.resources.get('updateSupplyURL'), {
                        pid: $(this).val(),
                        isKit: 'true'                       
                    },
                    function (supply) {
                        if (supply.success) {
                        	
                        	var upsellClass = "30-Day";
                    		if(optionval.indexOf("30") >= 0){
                    			upsellClass = "30-Day";
                    		}else{
                    			upsellClass = "90-Day";
                    		}
                    		
                    		$(".upsellrecommendation .upsellInline li").removeClass('active');
                           	$(".upsellrecommendation .upsellInline ."+upsellClass).addClass('active');
                           	var orderSummaryPrice = supply.update.ProductPrice.stringValue;
                            

							
                        	updateProductInfo(supply);
                            var isSelected = 'false';
                            var i;
                            var options = '';
                            var isSelected = 'false';
                            for (i = 0; i <= supply.update.ShipList.length - 1; i++) {
                                if (supply.update.ShipList[i].selected == 'true') {
                                    options += '<option value="' + supply.update.ShipList[i].value + '" selected="selected">' + supply.update.ShipList[i].lable + '</option>';
                                    isSelected = 'true';
                                } else {
                                    if (i == (supply.update.ShipList.length - 1) && isSelected == 'false') {
                                        options += '<option value="' + supply.update.ShipList[i].value + '" selected="selected">' + supply.update.ShipList[i].lable + '</option>';
                                    } else {
                                        options += '<option value="' + supply.update.ShipList[i].value + '">' + supply.update.ShipList[i].lable + '</option>';
                                    }
                                }
                            }
                            $(".shipList").html(options);

                            if ($('#valueUpsellSection').hasClass('block')) {
                                $('#valueUpsellSection').removeClass('block');
                                $('#valueUpsellSection').hide();
                            } else {
                                $('#valueUpsellSection').addClass('block');
                                $('#valueUpsellSection').show();
                            }
                            $('a.remove_item').attr('name', supply.update.CoreId.stringValue);
                            $("#coreProductID").attr("value",supply.update.CoreId.stringValue);
                            
                            var system = $('.upsell-id:visible .selectKit .sasKits li.active').attr('id'); 
                            handleFrequencyDisplay(system);
                            handleValuePackDisplay(system);
                            
                            $(".bottomPanel #prodSummary .kitPrice").empty();
                            var addPerMonth=(upsellClass=="90-Day")?" Per Month":""; /*HACK FOR PER MONTH.  THERE'S ANOTHER ONE AT THE BOTTOM.*/
                            $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryPrice+addPerMonth);
							setTimeout(function(){ $(".merchandiseTotal").append(addPerMonth); },600);
                            
                        }
                    }
                );
                

            });
        }
    },
    phoneNumberContactInfo: {
        element: "#phone1",
        init: function () {
          
            $("#phone1,#phone2,#phone3").keyup(function () {
            	$('.phone div.errormessage').hide();
            	var maxLength = $(this).attr('maxlength');
                if ($(this).val().length == maxLength) {
                    $(this).next('span').remove();
                    $(this).next().focus();
                   
                }
            });
            $("#phone1,#phone2,#phone3").keydown(function (event) {
                if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
                    return;
                } else {

                    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                    }
                }
            });

            var acc1 = $("#daytimePhone").val().substr(0, 3);
            var acc2 = $("#daytimePhone").val().substr(3, 3);
            var acc3 = $("#daytimePhone").val().substr(6, 4);
            jQuery("#phone1").val(acc1);
            jQuery("#phone2").val(acc2);
            jQuery("#phone3").val(acc3);
            
            $(".continueBtn,#paywithpaypal").click(function(){
            	if($("#phone1,#phone2,#phone3").val() === ""){
            		$("#phone1,#phone2,#phone3").addClass("errorclient");
            	}
            });
        }
    },
    emailValidation: {
        element: ".contact_info",
        init: function () {
            function validateEmail($email) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,3})?$/;
                if (emailReg.test($email)) {
                    $(".contact_info .formfield.email .success").show();
                    if ($email == "") {
                        $(".contact_info .formfield.email .success").hide();
                    }
                } else {
                    $(".contact_info .formfield.email .success").hide();
                }
            }

            $(".contact_info .formfield.email .value").append('<span class="success"></span>');
            $(".contact_info input.textinput.mail").keyup(function () {
                validateEmail($(this).val());
            })
            $(".contact_info input.textinput.mail").change(function () {
                validateEmail($(this).val());
            })


        }
    },
    billZip: {
        element: "#billZip",
        init: function () {
            $("#billZip").keydown(function () {
            	$(this).parent().find("span.errormessage").hide();
            	console.log("sss");
                var minLen = $(this).attr('minLength');
                var currLength = $(this).val().length;              
                if (currLength > minLen) {
                	$(this).parent().find("span.errormessage").hide();
                	$(this).parent().find("span.errorclient:last").hide();
                }
            });
        }
    },
    vitaminDetailLink: {
        element: ".details_link",
        init: function () {
        	jQuery(".details_link").toggle(function(event){
        		event.preventDefault();
        		jQuery(this).html('CLOSE DETAILS');
        		jQuery(".upsell_details_content").removeClass("upsell_details_inactive");
        	}, function(event){
        		event.preventDefault();
        		jQuery(this).html('OFFER DETAILS');
        		jQuery(".upsell_details_content").addClass("upsell_details_inactive");
        	});
        }
    },
    payLaterTerms: {
        element: "#paylaterLegalTerms",
        init: function () {
        	jQuery(app.airline.resources.get('PayLaterTerms')).html(jQuery('#paylaterLegalTerms').html());
        }
    }
};

function beforesubmitcheck()	{
	var textVal1 = jQuery("#phone1").val();
	var textVal2 = jQuery("#phone2").val();
	var textVal3 = jQuery("#phone3").val();
	var textval = textVal1+textVal2+textVal3;
	jQuery("input[id=daytimePhone]").val(textval);
	
	if($("#phone1,#phone2,#phone3").val() == ""){
		$("#phone2,#phone3").addClass("errormessage");
	}
	
	var email = $(".contact_info #email").attr("value");
	$(".contact_info #emailConfirm").attr("value", email);
	
}

AIRLINECOMMON.init = function () {
    $.each(AIRLINECOMMON.ui, function (n, v) {
        if ($(v.element).length > 0 && typeof v.init === "function") {
            AIRLINECOMMON.ui[n].element = $(v.element);
            v.init();
        }
    })
};

$(document).ready(function () {
    AIRLINECOMMON.init();
    jQuery("input").keydown(function(){             
		jQuery(this).parent().find('span.errormessage').hide();
	});
    
    if(jQuery.browser.msie && parseInt(jQuery.browser.version) < 10){
    	enablePlaceHolderSupport();
    	}
    	else{
    	$("input").each(
            function(){
                $(this).data('holder',$(this).attr('placeholder'));
                $(this).focus(function(){
                   $(this).attr('placeholder','');
                });
                $(this).blur(function(){
                    $(this).attr('placeholder',$(this).data('holder'));
                });

            });	 
    	}
    	
    	//selectbox placeholder color change
    	$("#paymentMethodSelection").css("color","black");			
	
		if($("#billState").val() !=""){			
				$("#billState").css("color","black");			
			}		
		if($("#creditCardMonth").val() !=""){		
				$("#creditCardMonth").css("color","black");							
			}
		
		if($("#creditCardYear").val() !=""){
				$("#creditCardYear").css("color","black");
			}
		if($("#shipState").val() !=""){
			$("#shipState").css("color","black");
		}

	
		$("SELECT").change(function(){
			if($(this).val() != ""){
					$(this).css("color","black");				
				}
		 });
		
		$("SELECT").focus(function(){									
			$(this).css("color","black");			
		
		});
		$("SELECT").mousedown(function(){									
				$(this).css("color","black");			
			
		});
});

jQuery(".details_link").click(function(){
	// Show or hide upsell description
	jQuery(this).siblings(".upselldescription").toggle();

	return false;
});

function appendUpsellProductToCookie(pid){
	var upsellID = readCookie('upsellLastID') || "";
	if(upsellID.indexOf("[" + pid + "]") == -1){
		setCookie('upsellLastID', upsellID + "[" + pid + "],");
	}
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
	}
	
	return null;
}

function setCookie(name, value, props) {
	props = props || {}
	var exp = props.expires

	if (typeof exp == "number" && exp) {
		var d = new Date()
		d.setTime(d.getTime() + exp*1000)
		exp = props.expires = d
	}

	if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

	value = encodeURIComponent(value)
	var updatedCookie = name + "=" + value

	for (var propName in props){
		updatedCookie += "; " + propName
		var propValue = props[propName]

		if(propValue !== true){ updatedCookie += "=" + propValue }
	}
	
	document.cookie = updatedCookie
}

function updateProductInfo(supply){
	jQuery(app.airline.resources.get('subtotal-selector')).text(supply.update.SubTotal.stringValue);
	jQuery(app.airline.resources.get('shipping-price-selector')).text(supply.update.ShippingPrice.stringValue);
	jQuery(app.airline.resources.get('total-price-selector')).text(supply.update.TotalPrice.stringValue);
	jQuery(app.airline.resources.get('cart-description')).html(supply.update.CartDescription.stringValue);
	jQuery(app.airline.resources.get('cart-offerCode')).html(supply.update.CoreId.stringValue);
	$(".coreid").attr("value", supply.update.CoreId.stringValue);
	$(".coreidCY").attr("value", supply.update.CoreId.stringValue);	
	updateKitQuantityDropDown(supply);
	jQuery(app.airline.resources.get('product-name')).html(supply.update.ProdName.stringValue);
	jQuery(app.airline.resources.get('hero-image')).attr('src',supply.update.HeroImage.stringValue);
	jQuery(app.airline.resources.get('hero-image')).attr('title',supply.update.HeroImage.title);
	$('.shipList').empty();
  	jQuery(app.airline.resources.get('heroName')).html(supply.update.ProdName.stringValue);
	jQuery(app.airline.resources.get('heroDesc')).html(supply.update.ShortDescription.stringValue);	
	$(".daySupply").attr("value", supply.update.CoreId.stringValue);	
	jQuery(app.airline.resources.get('PayLaterTerms')).html(supply.update.paylaterLegalTerms.stringValue);
	jQuery(app.airline.resources.get('kit-bottom-order-summary')).html(supply.update.ProdName.stringValue);
	jQuery(app.airline.resources.get('swatch-image')).attr('src',supply.update.SwatchImage.stringValue);
}

/* update the quantity dropdown (enable or disable) based on the product updated in cart */
function updateKitQuantityDropDown(supply){
	var options = '';	
	var kitNumber = parseInt(supply.update.kitQuantity.stringValue);
	 for (i = 1; i <= kitNumber ; i++) {		 	
		 		options += '<option value="' + i + '" >' + i +' '+ app.airline.resources.get('kitStringValue') + '</option>';            
         }	 
	 $(".quantityselector").html(options);
	 $(".quantityselector").attr("value", 1);
	 if(kitNumber == 1){		 
		 $(".quantityselector").attr("disabled","disabled");
	 }
	 else{
		 $(".quantityselector").removeAttr('disabled');
	 }
 }

/* upsellline.js code moved here*/
jQuery(document).ready(function() {
	
	 $('.billing_shipping .checkbox label').html('ship to billing address');
	/*  Tab focus first : start*/	
	$("#contYourOrder").keydown(function (event) {
        if (event.keyCode == 9) {
        	$("input[value='female']").focus();        	
        	scrollToAnchor('Step4');
        	 return false;
        }       
    });
	/* Tab focus first : end */	
	
	equalHeight($(".selectKit_Img"));
	equalHeight($(".sasLongDescription"));
	equalHeight($(".kitIncludes"));
	equalHeight($(".sasDes"));
	equalHeight($(".productDetailsBox"));
	equalHeight($(".leftCol"));
	equalHeight($(".giftBlock"));
	equalHeight($(".giftBlockSAS"));
	equalHeight($(".join-save"));
	equalHeight($(".frequency-with-proactiv"));
	function equalHeight(group) {
		var tallest = 0;
		group.each(function() {
			var thisHeight = $(this).height();
			if (thisHeight > tallest) {
				tallest = thisHeight;
			}
		});
		group.height(tallest);
	}
	
	$(window).scroll(function() {
		 var windowScroll 		= $(window).scrollTop();
		 var selectKitHeight 	= jQuery('.selectakitpanel').height();
		 var freeGiftHeight 	= jQuery('.freeGiftCont').height();
		 var upsellInlineHeight = jQuery('.upsellrecommendation').height();
		 var valuePackHeight 	= 0;
		 var checkoutHeight 	= jQuery('.checkoutform').height();
		 var giftUpsellHeight 	= selectKitHeight + freeGiftHeight;		 
		 valuePackHeight 	= jQuery('.valuepack').height();
			
		 
		 var valuePackSelHeight = selectKitHeight + freeGiftHeight + upsellInlineHeight;
		
		 var giftUpsellCheckoutHeight = selectKitHeight + freeGiftHeight + upsellInlineHeight + valuePackHeight;
		 	if(windowScroll < selectKitHeight) {
				$(".breadcrumb li").removeClass('active');
				$(".breadcrumb li.step1").addClass('active');
			}
		 	if(windowScroll >= selectKitHeight) {
				$(".breadcrumb li").removeClass('active');
				$(".breadcrumb li.step2").addClass('active');
			}
			if(windowScroll >= giftUpsellHeight) {
				$(".breadcrumb li").removeClass('active');
				$(".breadcrumb li.step3").addClass('active');
			}
			//Add A Value Pack!
			if(windowScroll >= valuePackSelHeight) {
				$(".breadcrumb li").removeClass('active');
				$(".breadcrumb li.step4").addClass('active');
			}			
			if(windowScroll >= giftUpsellCheckoutHeight) {
				$(".breadcrumb li").removeClass('active');
				$(".breadcrumb li.step5").addClass('active');
			}
			if(checkIfValuePackDoesNotExist()){
				if(windowScroll >= giftUpsellCheckoutHeight) {
					$(".breadcrumb li").removeClass('active');
					$(".breadcrumb li.step4").addClass('active');
				}
			}
	});
	
	var headerHeight = jQuery('.posFixed').height();	
//	$('.selectakitpanel').css('padding-top',headerHeight);
		 
	 $(".kitType > .selectKit > ul.sasKits > li").click( function(){
		    var offerid = $(this).attr("class");
			$("#coreProductID").attr("value",offerid.split(" ")[0]);		    
		    var system = $(this).attr("id");
		    $("#"+system+"Gift").siblings("div").css('display','none');
		    $("#"+system+"Gift").css('display','Block');
		    $("#"+system+"Gift"+" li:first-child").siblings().removeClass('active');
		    $("#"+system+"Gift"+" li:first-child").addClass('active');
		    $("#"+system+"Gift1Upsell").siblings("div").css('display','none');
		    $("#"+system+"Gift1Upsell").css('display','Block');
		    $("#"+system+"Gift1Upsell"+" li:first-child").siblings().removeClass('active');
		    $("#"+system+"Gift1Upsell"+" li:first-child").addClass('active');
		    var orderSummaryGiftPrice =$(this).find(".pdata .pprice").html();
		    setPriceInOrderSummary(orderSummaryGiftPrice);
		    var orderSummarykitTab =$(this).find(".pdata .pTab").html();
		    $(".bottomPanel #prodSummary .kitTab").empty();
		    $(".bottomPanel #prodSummary .kitTab").append(orderSummarykitTab);
		    handleFrequencyDisplay(system+"Gift1Upsell1");
		    handleValuePackDisplay(system+"Gift1Upsell1");		    
		    var orderSummaryKitImage = $(this).find(".pdata .pimage").html();
		    $(".bottomPanel #prodSummary .swatchImg img").attr("src",orderSummaryKitImage);
		    return false;
		});

		$(".kitType .sasKits li:first-child").addClass('active');
		$("a#step1").click(function() {
			   scrollToAnchor('Step1');
			});
		$("a.back_to_top").click(function(event) {
			   scrollToAnchor('Step1');
			   event.preventDefault()
			});
		
		/*$(".PanelB .selectGift li").click( function(){ 
			var offerid = $(this).attr("class");
		    $("#coreProductID").attr("value",offerid.split(" ")[0]);		   
		    var system = $(this).attr("id");
		    $("#"+system+"Upsell").siblings("div").css('display','none');
		    $("#"+system+"Upsell").css('display','block');
		    $("#"+system+"Upsell"+" li:first-child").siblings().removeClass('active');
		    $("#"+system+"Upsell"+" li:first-child").addClass('active');
		    
		    var orderSummaryGiftPrice =$(this).find(".pdata .pprice").html();
		    $(".bottomPanel #prodSummary .kitPrice").empty();
		    $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryGiftPrice);
		    var orderSummarykitTab =$(this).find(".pdata .pTab").html();
		    $(".bottomPanel #prodSummary .kitTab").empty();
		    $(".bottomPanel #prodSummary .kitTab").append(orderSummarykitTab);
		    
		});*/

		$(".PanelB .selectGift li:first-child").addClass('active');
		$(".upsellInline .selectKit li").click( function(){			
			var offerid = $(this).attr("class");
		    $("#coreProductID").attr("value",offerid.split(" ")[0]);		
		    var system = $(this).attr("id");
		    var orderSummaryPrice =$(this).find(".pdata .ppriceupsell").html();  
		    setPriceInOrderSummary(orderSummaryPrice);
		    handleFrequencyDisplay(system);
		    handleValuePackDisplay(system);

		});
		
		$(".frequencyPanel .selectKit li").click( function(){			
			var offerid = $(this).attr("class");
		    $("#coreProductID").attr("value",offerid.split(" ")[0]);
		    var orderSummaryPrice =$(this).find(".pdata .ppriceupsell").html();
		    $(".bottomPanel #prodSummary .kitPrice").empty();
		    $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryPrice);    
		});
		
		//valuepack li selection logic
		$(".valuepack .selectKit li").click( function(){			
			var offerid = $(this).attr("class");
		    $("#coreProductID").attr("value",offerid.split(" ")[0]);
		    var orderSummaryPrice =$(this).find(".pdata .ppriceupsell").html();
		    $(".bottomPanel #prodSummary .kitPrice").empty();
		    $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryPrice);    
		});

		$(".upsellInline .selectKit li:first-child").addClass('active');
		
		//$(".select-your-frequency .selectKit li:first-child").addClass('active');
		
		$("a#step2").click(function(event) {
			   scrollToAnchor('Step2');
			   s.linkTrackVars='prop56,eVar56';
			   s.prop56=campaignCode+":sas:freegiftbtn";
			   s.eVar56=s.prop56;
			   s.tl(this,'o',"Next Select Free Gift");
			   event.preventDefault();
			   //$('.freeGiftCont .pageTitle').css('margin-top','50px')
		});
		$("a#step3").click(function(event) {
			scrollToAnchor('Step3');
			 s.linkTrackVars='prop56,eVar56';
			 s.prop56=campaignCode+":sas:supplybtn";
			 s.eVar56=s.prop56;
			 s.tl(this,'o',"Next Select Supply");
			 event.preventDefault();
			 //$('.upsellrecommendation .pageTitle').css('margin-top','50px')
		});
		$("a#step4").click(function(event) {
		   scrollToAnchor('Step4');
		   s.linkTrackVars='prop56,eVar56';
		   var isvaluepack = $('#isValuePack').val();
		    if(isvaluepack == 'true')
			   {
			 s.prop56=campaignCode+":sas:valuepack";
			 s.eVar56=s.prop56;
			 s.tl(this,'o',"Next Add Value Pack");
			   }
			else
			{  
			   s.prop56=campaignCode+":sas:checkoutbtn";
			   s.eVar56=s.prop56;
			   s.tl(this,'o',"Next Checkout");
			}
		   
		   event.preventDefault();
			//$('.checkoutPanelB').css('margin-top','50px')
		});
		$("a#step5").click(function(event) {
			scrollToAnchor('Step5');	
			s.linkTrackVars='prop56,eVar56';
		    s.prop56=campaignCode+":sas:checkoutbtn";
		    s.eVar56=s.prop56;
		    s.tl(this,'o',"Next Checkout");
			event.preventDefault();
		});
		
			
			$(".step1 a").click(function(event) {
				   scrollToAnchor('Step1');
				   event.preventDefault();
				   //$('.selectakitpanel .pageTitle').css('margin-top','0px')
			});
			$(".step2 a").click(function(event) {
				   scrollToAnchor('Step2');
				   event.preventDefault();
				   //$('.freeGiftCont .pageTitle').css('margin-top','0px')
			});
			$(".step3 a").click(function(event) {
				   scrollToAnchor('Step3');
				   event.preventDefault();
				  // $('.upsellrecommendation .pageTitle').css('margin-top','0px')
			});
			$(".step4 a").click(function(event) {
				   scrollToAnchor('Step4');
					event.preventDefault();
				   //$('.checkoutPanelB').css('margin-top','0px')
			});
			$(".step5 a").click(function(event) {
				   scrollToAnchor('Step5');
				   event.preventDefault();
			});
			
			$('.updatecartbtn').click(function() {
						var payMethod = getPayMethod();
						jQuery.getJSON(
								app.airline.resources.get('updateSupplyURL'),
								{
									pid : jQuery('.coreProductID').val(),
									isKit : 'true',
									paymentMethod : payMethod
								},
								function(supply) {
									if (supply.success) {
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
										//jQuery(app.airline.resources.get('vitaminsection')).html(supply.update.CartDescription.stringValue);
										//$('.coreProductID').hide();
									     $("#coreProductID").attr("value",supply.update.CoreId.stringValue);								
									}
								}
							); 
				$(this).addClass('active');
			    $(this).siblings().removeClass('active');
			});
			$(".selectakitpanel .selectKit ul.sasKits li").click(function() {
                if ($(window).scrollTop() !=($("a[name='Step1']").offset().top - headerHeight))
                {

				   scrollToAnchor('Step1');
				   
                }
			});
			$(".freeGiftCont .selectGift ul li").click(function() {
                if ($(window).scrollTop() !=($("a[name='Step2']").offset().top - headerHeight))
                {

				   scrollToAnchor('Step2');
                }
			});
			$(".upsellrecommendation .selectKit ul li").click(function() {
                if ($(window).scrollTop() !=($("a[name='Step3']").offset().top - headerHeight))
                {

				   scrollToAnchor('Step3');
                }
			});
			$(".valuepack .selectKit ul li").click(function() {
                if ($(window).scrollTop() !=($("a[name='Step4']").offset().top - headerHeight))
                {

				   scrollToAnchor('Step4');
                }
			});
		
	function scrollToAnchor(aid){
	    var aTag = $("a[name='"+ aid +"']");
	    $('html,body').animate({scrollTop: aTag.offset().top - headerHeight},'1000');
	}
	
	var coreID= $(".coreid").val();
	$("#coreProductID").attr("value",coreID);
	var vitID = $(".crossSellIDAddedToCart").val();
	if( vitID != null && vitID != "undefined" && vitID != ""){
		$(".crossSellPLSwap").attr("value",$(".crossSellIDAddedToCart").val());
		$(".crossSellID").attr("value",$(".crossSellIDRegular").val());
		$("#vitPresentInCart").attr("value", true);
	}
	
	var isOneShot =$('#isOneShot').val();
	if(isOneShot == "true"){
		var oneshot_recommendation =$('.frequencyPanel .sasKits li.'+coreID).parent().find('.oneshot_product').val();
		var orderSummarykitTab =$('.frequencyPanel .sasKits li.'+coreID).find(".pdata .ppriceupsell").html();
		handleKitSelection(oneshot_recommendation,orderSummarykitTab);
		handleFrequencyDisplayOnLoad(coreID);
		
	}else{
		
		var isValuePack =$('#isValuePack').val();
		if(isValuePack == "true"){
			var valuepack_recommendation =$('.valuepack .sasKits li.'+coreID).parent().find('.valuepack_Product').val();
			var orderSummarykitTab =$('.valuepack .sasKits li.'+coreID).find(".pdata .ppriceupsell").html();
			handleKitSelection(valuepack_recommendation,orderSummarykitTab);
			handleValuePackDisplayOnLoad(coreID)
			
		}else{
			var orderSummaryGiftPrice =$(".upsellrecommendation .sasKits li."+coreID).find(".pdata .ppriceupsell").html();
			handleKitSelection(coreID,orderSummaryGiftPrice);
			handleValuePackDisplayOnLoad(coreID)
		}	
	}	
	
});

/* JS: Placeholder */

window.enablePlaceHolderSupport = function(){
	jQuery("input[placeholder]").each(function(){             
		if(jQuery(this).attr("type") != "password"){                  
		if(jQuery(this).val() == ""){
			jQuery(this).val(jQuery(this).attr("placeholder")).addClass("placeholder");
		}             
		 }else{               
				if(jQuery(this).attr("name") != ""){
					   if(jQuery(this).prev(".passsword-mask").length == 0){ 
							 if(jQuery("#account-registration").length > 0 || jQuery("#account-update").length > 0){
									var mr = "3px 0 0px";
							 }else{
									var mr = "3px 0 -27px";
							 }
							 jQuery('<div class="passsword-mask '+jQuery(this).attr("class")+'">'+jQuery(this).attr("placeholder")+'</div>').insertBefore(jQuery(this));
							 jQuery('.passsword-mask').css({"color":"#999","font-style":"italic","border":"none","margin":mr,"position":"relative","z-index":"999","padding":"0 0 0 5px"});
							 if(jQuery(this).val() != ""){
									jQuery('.passsword-mask').css('display','none');
							 }
					   }
				}
		 }
	});

	jQuery("[placeholder]").bind("click focus",function(){  
		if(jQuery(this).attr("type") != "password"){  
			if(jQuery(this).val() == jQuery(this).attr("placeholder")){
				jQuery(this).val("");
				jQuery(this).prev(".passsword-mask").css("display","none");
				 var input = this,
				 $input = $(input);
				 var hadFocus=$(input).is(":focus") 
				 if(hadFocus)$input.select(); 
				}
				jQuery(this).removeClass("placeholder");
			   }else{
					  jQuery(this).prev(".passsword-mask").css("display","none");
			   }
		}).bind("blur",function(){
			   if(jQuery(this).attr("type") != "password"){
					  if(jQuery(this).val() == ""){
							 jQuery(this).val(jQuery(this).attr("placeholder"));    
							 jQuery(this).addClass("placeholder");                  
					  }
			   }else{
					  if(jQuery(this).val() == ""){
							jQuery(this).prev(".passsword-mask").css("display","block");
					  }
			   }
		});
	jQuery(".passsword-mask").live("click",function(){
		jQuery(this).css("display","none");
		jQuery(this).next().focus();
 });
	   
	/*jQuery("form").bind("submit",function(){
	jQuery(this).find("input[type=text]").each(function(){
		   if(jQuery(this).val() == jQuery(this).attr("placeholder")){
				 jQuery(this).val("");
		   }
	});
 });*/
 
jQuery(".checkoutimgs select").change(function () {
	jQuery("#creditCardNumber").val(jQuery("#creditCardNumber").attr("placeholder"));
	jQuery(".eCheckPaymentinfo input").each(function(i){
		jQuery(this).val(jQuery(this).attr("placeholder"));	
	})
});
	
 jQuery("form").each(function(){
		var formRef = jQuery(this);
		jQuery('.continueBtn, .completeBtn #paywithpaypal,#paywithpaypal').bind("mousedown click",function(){                  
			jQuery('.billing_shipping input, .contact_info input, .paymentInformation input, .access_info .age_and_gender input').each(function(){
					 if(jQuery(this).val() == jQuery(this).attr("placeholder")){
							jQuery(this).val("");
					 }
			   });
		});
 });
}

function handleFrequencyDisplay(system){
		if(checkIfFrequencyPanelDoesNotExist()){
			return;
		}
		var offerid = $("#coreProductID").val();
		$("#"+system+"oneshot").siblings("div").css('display','none');
	    $("#"+system+"oneshot").css('display','Block');
	    if($(".frequencyPanel .selected li.active").hasClass("oneShot")){
	    	$("#"+system+"oneshot"+" li:oneShot").siblings().removeClass('active');
	    	$("#"+system+"oneshot"+" li.oneShot").addClass('active');
	    	offerid = $("#"+system+"oneshot"+" li.oneShot").attr("class");
	    }else{
	    	$("#"+system+"oneshot"+" li:first-child").siblings().removeClass('active');	    	
	    	$("#"+system+"oneshot"+" li:first-child").addClass('active');	    	
	    	offerid = $("#"+system+"oneshot"+" li:first-child").attr("class");
	    }
	    $("#coreProductID").attr("value",offerid.split(" ")[0]);
	    $("#"+system+"oneshot").siblings("div").removeClass('selected');
	    $("#"+system+"oneshot").addClass('selected');
	    
		var orderSummarykitTab =$('.frequencyPanel .sasKits li.'+offerid.split(" ")[0]).find(".pdata .ppriceupsell").html();
		setPriceInOrderSummary(orderSummarykitTab);
	
}

function setPriceInOrderSummary(orderSummarykitTab){
	$(".bottomPanel #prodSummary .kitPrice").empty();
    $(".bottomPanel #prodSummary .kitPrice").append(orderSummarykitTab);
}
function handleFrequencyDisplayOnLoad(coreID){
	if(checkIfFrequencyPanelDoesNotExist()){
		return;
	}
	$(".frequencyPanel .oneshot-id").siblings("div").css('display','none');
	$('.frequencyPanel .oneshot-id li.'+coreID).parents('.oneshot-id').show().addClass("selected");
	$(".frequencyPanel .oneshot-id li").removeClass('active');
	$('.frequencyPanel .oneshot-id li.'+coreID).addClass("active");
}


function checkIfFrequencyPanelDoesNotExist(){
	if($(".frequencyPanel").children("div").size() == 0){
			return true;
	}
	else{
			return false;
	}
}
//Value Pack Function
function handleValuePackDisplayOnLoad(coreID){
	if(checkIfValuePackDoesNotExist()){
		return;
	}
	$(".valuepack .valuepack-id").siblings("div").css('display','none');
	$('.valuepack .valuepack-id li.'+coreID).parents('.valuepack-id').show().addClass("selected");
	$(".valuepack .valuepack-id li").removeClass('active');
	$('.valuepack .valuepack-id li.'+coreID).addClass("active");
}
function checkIfValuePackDoesNotExist(){
	if($(".valuepack").children("div").size() == 0){
			return true;
	}
	else{
			return false;
	}
}
function handleValuePackDisplay(system){
	if(checkIfValuePackDoesNotExist()){
		return;
	}
	var offerid = $("#coreProductID").val();
	$("#"+system+"ValuePack").siblings("div").css('display','none');
    $("#"+system+"ValuePack").css('display','Block');
    if($(".valuepack .selected li.active").hasClass("noThanks")){
    	$("#"+system+"ValuePack"+" li").siblings().removeClass('active');
    	$("#"+system+"ValuePack"+" li.noThanks").addClass('active');
    	offerid = $("#"+system+"ValuePack"+" li.noThanks").attr("class");
    }else{
    	$("#"+system+"ValuePack"+" li:first-child").siblings().removeClass('active');	    	
    	$("#"+system+"ValuePack"+" li:first-child").addClass('active');	    	
    	offerid = $("#"+system+"ValuePack"+" li:first-child").attr("class");
    }
    $("#coreProductID").attr("value",offerid.split(" ")[0]);
    $("#"+system+"ValuePack").siblings("div").removeClass('selected');
    $("#"+system+"ValuePack").addClass('selected');
    
	var orderSummarykitTab =$('.valuepack .sasKits li.'+offerid.split(" ")[0]).find(".pdata .ppriceupsell").html();
	setPriceInOrderSummary(orderSummarykitTab);

}

function handleKitSelection(coreID,orderSummarykitTab){
	var has_upsell =$('#has-upsell').val();
	var orderSummaryKitName =$(".upsellrecommendation .sasKits li."+coreID).find(".pdata .pname").html();
    $(".kitType .bottomPanel #prodSummary .kitName").empty();
    $(".kitType .bottomPanel #prodSummary .kitName").append(orderSummaryKitName);
	setPriceInOrderSummary(orderSummarykitTab);
	var orderSummaryKitImage =$(".upsellrecommendation .sasKits li."+coreID).find(".pdata .pimage").html();
    $(".kitType .bottomPanel #prodSummary .swatchImg img").empty();
    $(".bottomPanel #prodSummary .swatchImg img").attr("src",orderSummaryKitImage);
	if(has_upsell == "true"){
		$('.freeGiftCont .freeGiftID').hide();
		$('.freeGiftCont .selectFeeGift li.'+coreID).parents('.freeGiftID').show();
		$(".freeGiftCont .selectFeeGift li.updatecartbtn").removeClass('active');
		$(".freeGiftCont .selectFeeGift li."+coreID).addClass('active');
		var orderSummarykitTab =$('.freeGiftCont .selectFeeGift li.'+coreID).find(".pdata .pTab").html();
		$(".bottomPanel #prodSummary .kitTab").empty();
	    $(".bottomPanel #prodSummary .kitTab").append(orderSummarykitTab);
		$('.upsellrecommendation .upsell-id').hide();	
		$('.upsellrecommendation .sasKits li.'+coreID).parents('.upsell-id').show();	
		$(".upsellrecommendation .sasKits li."+coreID).addClass('active');	
		var freegiftid = $('.freeGiftSelector.PanelB .selectKit li.'+coreID).parent().find('.free_GiftID').text();
		$(".selectakitpanel .sasKits li").removeClass('active');
		$(".selectakitpanel .sasKits li."+freegiftid).addClass('active');
	}
	else{
		$(".upsellrecommendation .sasKits li").removeClass('active');
		$(".upsellrecommendation .sasKits li."+coreID).addClass('active');
		$('.upsellrecommendation .upsell-id').hide();	
		$('.upsellrecommendation .sasKits li.'+coreID).parents('.upsell-id').show();	
		var upsell_recommendation =$('.upsellrecommendation .sasKits li.'+coreID).parent().find('.recommend_Product').val();
		$('.freeGiftCont .freeGiftID').hide();
		$('.freeGiftCont .selectFeeGift li.'+upsell_recommendation).parents('.freeGiftID').show();
		$(".freeGiftCont .selectFeeGift li.updatecartbtn").removeClass('active');
		$(".freeGiftCont .selectFeeGift li."+upsell_recommendation).addClass('active');
		var upsellkitTab =$('.freeGiftCont .selectFeeGift li.'+upsell_recommendation).find(".pdata .pTab").html();
		$(".bottomPanel #prodSummary .kitTab").empty();
	    $(".bottomPanel #prodSummary .kitTab").append(upsellkitTab);
		var freegiftid = $('.freeGiftSelector.PanelB .selectKit li.'+upsell_recommendation).parent().find('.free_GiftID').text();
		$(".selectakitpanel .sasKits li").removeClass('active');
		$(".selectakitpanel .sasKits li."+freegiftid).addClass('active');
	}	
}
/* upsellcode end here */


$(function(){
$('.ninty-day').bind('click',function(){  /*HACK FOR PER MONTH.  THERE'S ANOTHER ONE SOMEWHERE ABOVE*/
	$(".bottomPanel #prodSummary .kitPrice").append(" Per Month");
	setTimeout(function(){ $(".merchandiseTotal").append(" Per Month"); },600);
 })
  $(".valuepack .selectKit li").bind('click',function(){
	 if($('.pt-checkout-refresh .upsellrecommendation .upsell-id:visible .PanelB .selectKit .sasKits li.90-Day.active').length>0){	 
		 $(".bottomPanel #prodSummary .kitPrice").append(" Per Month");
		 setTimeout(function(){ if($(".merchandiseTotal").text().indexOf("Month")<=0){$(".merchandiseTotal").append(" Per Month");} },600);
	 }
 })
   $(".selectFeeGift .selectKit li").bind('click',function(){
	 if($('.pt-checkout-refresh .upsellrecommendation .upsell-id:visible .PanelB .selectKit .sasKits li.90-Day.active').length>0){
		 setTimeout(function(){ if($(".merchandiseTotal").text().indexOf("Month")<=0){$(".merchandiseTotal").append(" Per Month");} },600);
		 
	 }
 })
});