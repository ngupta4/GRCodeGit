
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
			jQuery("#QuickViewDialog").remove();
		},
		
		upperCase: function(value){
		    return typeof value == "string" ? value.toUpperCase() : value;
		},
		
		checkPassword : function(){
			var form = jQuery('.checkoutform');
			//var url = app.proactiv.resources.get('verifyEmailUrl');
			var emailInput = form.find('.email input');
			var pwdVal = jQuery('.password .textinputpw').val();
			var cfrmPwdVal = jQuery('.passwordconfirm .textinputpw').val();
			if ($.trim(pwdVal) == '' && $.trim(cfrmPwdVal) == ''){
				return true;
			}
			var data = this.hash[emailInput.val()];
			if(data['status'] && data.status.toLowerCase() === 'active'){
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
					if($("#card_number .value span").hasClass("errormessage")){
						$("#card_number .errormessage").show();
						$("#card_number .errormessage").html(message);
					}else{
						$("#card_number .value").append('<span class="errormessage" generated="true" htmlfor="creditCardNumber">'+message+'</span>');
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
			 jQuery("#creditCardNumber").keydown( function(){
				 var cardNo = jQuery("#creditCardNumber").val();
				 var CreditCardType = "unknown";
					cardNo = cardNo.replace(" ", "");
					var isNotNumber = isNaN(cardNo);
					var containsDot = true;
					if(cardNo.indexOf('.') == -1){
						containsDot = false;
					}
					if((cardNo.length < 14) || isNotNumber || containsDot){
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
										CreditCardType = "unknown";
					               }
					               
								}
					        
					            $(".value").removeClass().addClass("value");
					            $(".value").addClass(CreditCardType);
					            $('input[id="paymentMethod"]').attr('value',CreditCardType);					            			            
			});
			/* jQuery("#creditCardNumber").keydown(function(){
				// $(this).removeClass('errormessage');
				//$('#card_number .value span.errormessage').hide();
			 })*/
			 
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
			var url = app.proactiv.resources.get('verifyEmailUrl');
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
			
			if(url && !app.proactiv.resources.get('verifyEmailLimit')){
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
            jQuery('.shippingmethodslist :select', this.container).bind('change', function() {
                jQuery('#totalshippingprice').addClass('loading');
               
                jQuery.getJSON(
                    app.proactiv.resources.get('updateShippingPriceUrl'),
                    {
                        shippingID : jQuery('.shippingmethodslist :option:selected').val(),
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
			jQuery('.quantityselector', this.container).change(function() {
				jQuery('#totalshippingprice').addClass('loading');
				
				jQuery.getJSON(
					app.proactiv.resources.get('updateQtyUrl'),
					{
						shippingID : jQuery('.shippingmethodslist :option:checked').val(),
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
				s.linkTrackVars='prop56,eVar56';
				s.prop56=campaignCode+":ChangeQty";
			    s.eVar56=s.prop56;
			    s.tl(this,'o',"qty update");
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
					app.proactiv.resources.set("GRMSubmissionStatus", "ORDERSUBMIT")
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
						//form.find('.email input').blur();
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
			if (!app.proactiv.resources.get('paymentAlwaysVisible') && ($('#paymentMethod').val() == "") && !paymentSection.is(':visible') && !jQuery('.errormessage:visible').size()) {
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
			if (app.proactiv.checkout.upperCase(jQuery('.payment_info select').val().toUpperCase()) == app.proactiv.resources.get('paypalPayment')) {
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
					jQuery('#' + app.proactiv.resources.get('paymentSelectedMethodName')).val(jQuery(this).find(':selected').attr('class').replace('paymentmethod-', ''));
										
					if (app.proactiv.checkout.upperCase(jQuery(this).val()) == app.proactiv.resources.get('paypalPayment')) {
						jQuery('.payment_info .card_details').hide().find(':input').attr('disabled', 'disabled');
					}
					else {
						jQuery('.payment_info .card_details').show().find(':input').removeAttr('disabled');
					}
				}
			};
			
			if (app.proactiv.checkout.upperCase(app.proactiv.resources.get('typeselected')) == app.proactiv.resources.get('paypalPayment')) {
				handler.call(jQuery('.paymentmethodselector'));
			}
			
			jQuery('.payment_method select').change(handler);
		},
		
		/**
		 * Initialize checkbox that changes using of custom billing address
		 */
		initBillingAddress : function() {
			var checkbox = jQuery('#' + app.proactiv.resources.get('billingEqualsShippingCheckbox'));
			var equals = app.proactiv.resources.get('billingEqualsShipping');
			var shippingToggle = function() {		
				jQuery('.cb_shipping .checkout_box_inner :input').attr('disabled', jQuery(this).attr('checked') ? 'disabled' : '').removeClass(app.validatorSettings.errorClass).next(app.errorElement).hide();
				
				if(jQuery(this).attr('checked')){
					jQuery('.cb_shipping').hide();
				}else{
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
            jQuery('.popupOverlay, .more-info-overlay').click(function () {
                jQuery("#moreInfo").remove();
                jQuery(".ui-widget-overlay-nak").remove();
                jQuery("<div/>").attr("class", "ui-widget-overlay-nak").html("").appendTo(document.body);  
                jQuery("<div/>").attr("id", "moreInfo").html("").appendTo(document.body);
                
              
                var urlvedio = jQuery(this).attr('href');
                var closethick = '<div class="closethick"><a href="javaScript:;">close</a></div>'
                var resp;
    			jQuery.ajax({
    		    	url: urlvedio,
    		    	//contentType: "ad; charset=utf-8",
    				//dataType: "json",
    		    	type: "GET",
    	            async: false,
    			    cache: false,
    	            success: function(data) {
    	            	resp = data;
    	            	
    	            //	console.log(resp);
    	            	var windowheighover= jQuery(window).height();
    	              	var windowwidthover= jQuery(window).width();
    	              	var windowheigh= jQuery(window).height()/2-308;
    	            	var windowwidth= jQuery(window).width()/2-260;
    	            //	jQuery(".ui-widget-overlay-nak").css({'width':parseInt(windowheighover)+'px','height':parseInt(windowwidthover)+'px','z-index':'9999'});
    	            	
    	            	$(window).resize(function() {
    	            	
        	            	var windowheigh= jQuery(window).height()/2-308;
        	            	var windowwidth= jQuery(window).width()/2-260;
        	            	jQuery("#moreInfo").css('top',parseInt(windowheigh)+'px');
        	            	jQuery("#moreInfo").css('left',parseInt(windowwidth)+'px');
    	            	});
    					jQuery("#moreInfo").css('top',parseInt(windowheigh)+'px');
    	            	jQuery("#moreInfo").css('left',parseInt(windowwidth)+'px');
    	            	$('#moreInfo').html(closethick+resp);
    	            	
    					//response(data);
    	            },
    	            error: function(xhr, txtStatus, e) {
    	            	//Displaying error if ajax processing failed
    	            	alert("Unable to process your request.");
    	         	}
    	         });
    			
               // jQuery("#moreInfo").parent().css('background', '#fff').css('padding', '7px 10px 0 8px');
                
               // jQuery('#moreInfo').load(urlvedio);
              
                $(".ui-widget-overlay-nak,.closethick a").click(function () {
                	jQuery("#moreInfo").remove();
                    jQuery(".ui-widget-overlay-nak").remove();
                }); //clicking background closes dialog

                return false;
            });
        }
    },
    selectFreeGiftPopup: {
        element: ".more-info-overlay",
        init: function () {
      /*      jQuery('.more-info-overlay').click(function () {
                jQuery("#moreInfo").remove();
                jQuery("<div/>").attr("id", "moreInfo").html("").appendTo(document.body);
                app.createDialog({
                    id: 'moreInfo',
                    options: {
                        bgiframe: true,
                        modal: true,
                        closeOnEscape: true,
                        width: 470,
                        height: 580,
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
                }); //clicking background closes dialog

                return false;
            });*/
        }
    },
    TermsConditionPopup: {
        element: ".checkout_bottom",
        init: function () {
            jQuery('.terms-condition-overlay').click(function () {
                jQuery("#terms-ba").remove();
                jQuery("<div/>").attr("id", "terms-ba").html("").appendTo(document.body);
                app.createDialog({
                    id: 'terms-ba',
                    options: {
                        bgiframe: true,
                        modal: true,
                        closeOnEscape: true,
                        width: 660,
                        height: 425,
                        title: 'Terms and Conditions',
                        resizable: false
                    }
                });
                var urlvedio = jQuery(this).attr('href');
                jQuery("#terms-ba").parent().css('background', '#fff').css('padding', '22px 22px 12px 35px');
                var objtitle = jQuery("#moreInfo").siblings('.ui-dialog-titlebar');
                jQuery('#terms-ba').load(urlvedio);
                jQuery('#terms-ba').dialog('open');

                $(".ui-widget-overlay").click(function () {
                    jQuery(".ui-dialog").hide();
                    jQuery(".ui-widget-overlay").hide();
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
                    app.proactiv.resources.get('updateSupplyURL'), {
                        pid: jQuery('.crossSellID').val(),
                        isKit: 'false',
                        paymentMethod : payMethod
                    },
                    function (supply) {
                        if (supply.success) {
                            jQuery(app.proactiv.resources.get('vitaminname')).html(supply.update.ProdName.stringValue);
                            jQuery(app.proactiv.resources.get('vitaminsection')).html(supply.update.CartDescription.stringValue);
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
                                            //$("#paywithpaypal").show();
                                        }
                                    }
                                );
                                s.linkTrackVars = 'prop56,eVar56';
                                s.prop56 = campaignCode + ":RemoveVitamin";
                                s.eVar56 = s.prop56;
                                s.tl(this, 'o', "remove vitamin");
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
                    app.proactiv.resources.get('removeVitaminURL'), {
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
                s.linkTrackVars = 'prop56,eVar56';
                s.prop56 = campaignCode + ":RemoveKit";
                s.eVar56 = s.prop56;
                s.tl(this, 'o', "remove kit");
            });
        }
    },
    removeVitamin: {
        element: ".remove_vitamin",
        init: function () {
            $('.remove_vitamin').click(function () {            	
                var prodId = $(this).attr('name');
                jQuery.getJSON(
                    app.proactiv.resources.get('removeVitaminURL'), {
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
                var cartid = $('#cartID').val();               
                var optionval = $(this).find("option:selected").text();              
                jQuery.getJSON(
                    app.proactiv.resources.get('updateSupplyURL'), {
                        pid: $(this).val(),
                        isKit: 'true'                       
                    },
                    function (supply) {
                        if (cartid != '100' && cartid != '102') {
                        	
                        		var upsellClass = "30-Day";
                                if(optionval.indexOf("30") >= 0){
                                	upsellClass = "30-Day";
                               }else{
                            	   upsellClass = "90-Day";
                              }
                                
                                $(".upsellrecommendation .upsellInline li").removeClass('active');
                              	$(".upsellrecommendation .upsellInline ."+upsellClass).addClass('active');                              	 
                              	var orderSummaryPrice = supply.update.ProductPrice.stringValue;
                                $(".bottomPanel #prodSummary .kitPrice").empty();
                                $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryPrice);
                            }
                        if (supply.success) {
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
                        }
                    }
                );
                s.linkTrackVars = 'prop56,eVar56';
                s.prop56 = campaignCode + ":ChangeSize";
                s.eVar56 = s.prop56;
                s.tl(this, 'o', "kit size update");

            });
        }
    },
    phoneNumberContactInfo: {
        element: "#phone1",
        init: function () {
          
            $("#phone1,#phone2,#phone3").keyup(function () {
            	 $('.phone div.errormessage').hide();
            	 //$("#phone1,#phone2,#phone3").removeClass('errormessage');
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
            
            $(".continueBtn").click(function(){
            	if($("#phone1,#phone2,#phone3").val() === ""){
            		$("#phone1,#phone2,#phone3").addClass("errormessage");
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
                    $(".contact_info .formfield.email .value .success").show();
                    if ($email == "") {
                        $(".contact_info .formfield.email .value .success").hide();
                    }
                } else {
                    $(".contact_info .formfield.email .value .success").hide();
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
                var minLen = $(this).attr('minLength');
                var currLength = $(this).val().length;
                $(this).next("span.errormessage").hide();
                $("span.errormessage.rts").hide();
                if (currLength < minLen) {
                	$(this).next("span.errormessage:last").hide();
                }
            });
        }
    },
    vitaminDetailLink: {
        element: ".details_link",
        init: function () {
        	jQuery(".details_link").toggle(function(event){
        		event.preventDefault();
        		jQuery(".upsell_details_content").removeClass("upsell_details_inactive");
        	}, function(event){
        		event.preventDefault();
        		jQuery(".upsell_details_content").addClass("upsell_details_inactive");
        	});
        }
    },
    payLaterTerms: {
        element: "#paylaterLegalTerms",
        init: function () {
        	jQuery(app.proactiv.resources.get('PayLaterTerms')).html(jQuery('#paylaterLegalTerms').html());
        }
    }

};

function beforesubmitcheck(){
	var textVal1 = jQuery("#phone1").val();
	var textVal2 = jQuery("#phone2").val();
	var textVal3 = jQuery("#phone3").val();
	var textval = textVal1+textVal2+textVal3;
	jQuery("input[id=daytimePhone]").val(textval);
	if($("#phone1,#phone2,#phone3").val() === " "){

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
	jQuery(app.proactiv.resources.get('subtotal-selector')).text(supply.update.SubTotal.stringValue);
	jQuery(app.proactiv.resources.get('shipping-price-selector')).text(supply.update.ShippingPrice.stringValue);
	jQuery(app.proactiv.resources.get('total-price-selector')).text(supply.update.TotalPrice.stringValue);
	jQuery(app.proactiv.resources.get('cart-description')).html(supply.update.CartDescription.stringValue);
	$(".coreid").attr("value", supply.update.CoreId.stringValue);
	$(".coreidCY").attr("value", supply.update.CoreId.stringValue);	
	updateKitQuantityDropDown(supply);
	jQuery(app.proactiv.resources.get('product-name')).html(supply.update.ProdName.stringValue);
	jQuery(app.proactiv.resources.get('hero-image')).attr('src',supply.update.HeroImage.stringValue);
	jQuery(app.proactiv.resources.get('hero-image')).attr('title',supply.update.HeroImage.title);
	$('.shipList').empty();
  	jQuery(app.proactiv.resources.get('heroName')).html(supply.update.ProdName.stringValue);
	jQuery(app.proactiv.resources.get('heroDesc')).html(supply.update.ShortDescription.stringValue);	
	$(".daySupply").attr("value", supply.update.CoreId.stringValue);
	jQuery(app.proactiv.resources.get('PayLaterTerms')).html(supply.update.paylaterLegalTerms.stringValue);
	jQuery(app.proactiv.resources.get('swatch-image')).attr('src',supply.update.SwatchImage.stringValue);
}

/* update the quantity dropdown (enable or disable) based on the product updated in cart */
function updateKitQuantityDropDown(supply){
	var options = '';	
	var kitNumber = parseInt(supply.update.kitQuantity.stringValue);
	 for (i = 1; i <= kitNumber ; i++) {		 	
		 		options += '<option value="' + i + '" >' + i + app.proactiv.resources.get('kitStringValue') + '</option>';            
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
/*jQuery(document).ready(function () {
	// Initialize the Checkout API	
	app.proactiv.checkout.init();
});*/

$(document).ready(function(){	
	$("input").keydown(function(){
			$(this).parent().find("span:last-child").css("display","none");
			
	});
});