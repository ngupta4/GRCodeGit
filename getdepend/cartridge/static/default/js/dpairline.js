/**
 * GetDepend API
 */
app.getdepend = {
    /**
     * Resource variables handling
     */
    resources: {
        /**
         * Set variable value
         * If first argument is an object then method will iterate through its properties and add them as variables
         */
        set: function (key, value) {
            if (typeof key == 'object') {
                for (var prop in key) {
                    if (!key.hasOwnProperty(prop)) continue;

                    this.set(prop, key[prop]);
                }
            } else {
                this['_' + key] = value;
            }
        },

        /**
         * Get variable value
         */
        get: function (key, defaultValue) {
            return this['_' + key] || defaultValue;
        }
    },

    /**
     * Checkout API
     */
    checkout: {
        container: null,
        subTotal: null,
        taxAmount: null,
        shipping: null,
        quantity: null,
        totalPrice: null,
        //email verification flag
        varifiedMail: null,
        submitActionFired: false,
        hash: {},
        /**
         * Initialize checkout API
         */
        init: function () {
            this.container = jQuery('#' + app.getdepend.resources.get('cartFormID'));
            this.subTotal = this.container.find('.merchandiseTotal');
            this.taxAmount = this.container.find('.taxamount');
            this.shipping = this.container.find('.shipping');
            this.totalPrice = this.container.find('.totalPrice');
            this.quantity = null;

            this.changeShipment();
            this.changeQuantity();
            if (!app.getdepend.resources.get('paymentAlwaysVisible')) {
                this.initPayment();
            }
            this.changePaymentMethod();
            this.initBillingAddress();
            this.verifyEmail();
            this.checkCCardType();
            jQuery("#QuickViewDialog").remove();
        },

        upperCase: function (value) {
            return typeof value == "string" ? value.toUpperCase() : value;
        },

        checkPassword: function () {
            var form = jQuery('.checkoutform');
            //var url = app.getdepend.resources.get('verifyEmailUrl');
            var emailInput = form.find('.email input');
            var pwdVal = jQuery('.password .textinputpw').val();
            var cfrmPwdVal = jQuery('.passwordconfirm .textinputpw').val();
            if ($.trim(pwdVal) == '' && $.trim(cfrmPwdVal) == '') {
                return true;
            }
            var data = this.hash[emailInput.val()];
            if (data['status'] && data.status.toLowerCase() == 'active') {
                var emailField = jQuery('.email'),
                    errorField = emailField.find('span.errorclient');
                var message = data.message != '' ? data.message : app.URLs.msgWithLoginURL;
                if (!errorField.length) {
                    jQuery('<span class="errorclient" genereted_="true" htmlfor="' + emailField.find('input').attr('id') + '">').append('<strong>' + message + '</strong>').appendTo(emailField);
                } else {
                    errorField.html('<strong>' + message + '</strong>').show();
                }
                return false;
            } else {
                return true;
            }
        },

        /**
         * Validate card on basis of payment type
         */
        checkPaymentType: function () {
            var form = jQuery('.checkoutform');
            if (document.getElementById("paymentMethod").value == "unknown" || document.getElementById("paymentMethod").value == "Unknown" || document.getElementById("paymentMethod").value == null || !(document.getElementById("paymentMethod").value)) {

                var message = app.resources["INVALID_CCNUMBER"];
                if ($("#card_number .value span").hasClass("errormessage")) {
                    $("#card_number .errormessage").show();
                    $("#card_number .errormessage").html(message);
                } else {
                    $("#card_number .value").append('<span class="errormessage" generated="true" htmlfor="creditCardNumber">' + message + '</span>');
                }
                return false;
            } else {
                return true;
            }

        },
        /**
         * Check credit card type
         */
        checkCCardType: function () {
            jQuery("#creditCardNumber").blur(function () {
                var cardNo = jQuery("#creditCardNumber").val();
                var CreditCardType = "unknown";
                cardNo = cardNo.replace(" ", "");
                var isNotNumber = isNaN(cardNo);
                var containsDot = true;
                if (cardNo.indexOf('.') == -1) {
                    containsDot = false;
                }
                if ((cardNo.length < 14) || isNotNumber || containsDot) {
                    $(".value").removeClass().addClass("value");
                    $('input[id="paymentMethod"]').attr('value', "");
                    return;
                }

                var first_two_digits = cardNo.substring(0, 2);
                switch (first_two_digits) {
                case "34":
                    CreditCardType = "Amex";
                    break;
                case "37":
                    CreditCardType = "Amex";
                    break;
                case "51":
                    CreditCardType = "MasterCard";
                    break;
                case "52":
                    CreditCardType = "MasterCard";
                    break;
                case "53":
                    CreditCardType = "MasterCard";
                    break;
                case "54":
                    CreditCardType = "MasterCard";
                    break;
                case "55":
                    CreditCardType = "MasterCard";
                    break;
                default:
                    CreditCardType = "unknown";
                }
                if (CreditCardType == "unknown") {
                    var first_four_digits = cardNo.substring(0, 4);
                    switch (first_four_digits) {
                    case "6011":
                        CreditCardType = "Discover";
                        break;
                    default:
                        CreditCardType = "unknown";
                    }
                }
                if (CreditCardType == "unknown") {
                    var first_digit = cardNo.substring(0, 1);
                    switch (first_digit) {
                    case "4":
                        CreditCardType = "Visa";
                        break;
                    default:
                        CreditCardType = "unknown";
                    }

                }

                $(".value").removeClass().addClass("value");
                $(".value").addClass(CreditCardType);
                $('input[id="paymentMethod"]').attr('value', CreditCardType);
            });
            jQuery("#creditCardNumber").keydown(function () {
                $(this).removeClass('errormessage');
                $('#card_number .value span.errormessage').hide();
            })

            $(".expiration_date select").each(function () {
                $(this).bind('change', function () {
                    $(".expiration_date").find("#paymentinfoerrors").hide();
                })
            })

        },

        /**
         *  Verification of mail user input
         */
        verifyEmail: function () {
            var form = jQuery('.checkoutform');
            var url = app.getdepend.resources.get('verifyEmailUrl');
            var emailInput = form.find('.email input'),
                confirmEmailInput = form.find('.email_confirm input');
            //var hash = {};
            var checkout = this;

            function checkStatus(data) {

                if (data.status.toLowerCase() == 'active') {
                    var emailField = jQuery('.email'),
                        errorField = emailField.find('span.errorclient');
                    if (!errorField.length) {
                        //jQuery('<span class="errorclient" genereted_="true" htmlfor="'+emailField.find('input').attr('id')+'">').append('<strong>'+data.message+'</strong>').appendTo(emailField);
                    } else {
                        //errorField.html('<strong>'+data.message+'</strong>').show();
                    }
                    return false;
                } else {
                    return true;

                }
            }

            //jQuery('.password .textinputpw').blur(checkout.checkPassword);

            if (url && !app.getdepend.resources.get('verifyEmailLimit')) {
                var verifyEmailHandler = function (e) {
                    if (form.find('.email input').val() && form.validate().element('.email input') && app.getdepend.resources.get('verifyEmailFlag')) {
                        //debugger;
                        if (typeof checkout.hash[emailInput.val()] === 'undefined') {
                            jQuery.ajax({
                                type: "POST",
                                aync: false,
                                dataType: "json",
                                url: url,
                                data: {
                                    mail: emailInput.val()
                                },
                                success: function (data) {
                                    try {
                                        checkout.varifiedMail = emailInput.val();
                                        //debugger;
                                        if (Object.prototype.toString.call(data) === '[object Object]' && data['status']) {
                                            checkout.hash[emailInput.val()] = data;
                                            if (!checkStatus(data)) {
                                                return;
                                            }
                                        }
                                        //verification call error
                                        checkout.varifiedMail = emailInput.val();

                                    } catch (e) {

                                    }
                                },
                                error: function () {
                                    //debugger;
                                }
                            });
                        } else {
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
        changeShipment: function () {
            jQuery('.shippingmethodslist :select', this.container).bind('change', function () {
                jQuery('#totalshippingprice').addClass('loading');

                jQuery.getJSON(
                    app.getdepend.resources.get('updateShippingPriceUrl'), {
                        shippingID: jQuery('.shippingmethodslist :option:selected').val(),
                        qty: jQuery('#coreOffer .quantityselector').val() || 1
                    },
                    function (price) {
                        if (price.success) {
                            jQuery(app.getdepend.resources.get('shipping-price-selector')).text(price.update.shipping.stringValue);
                            jQuery(app.getdepend.resources.get('total-price-selector')).text(price.update.totalPrice.stringValue);
                        }

                        jQuery('#totalshippingprice').removeClass('loading');
                    }
                );
            });
        },

        /**
         * Change cart product quantity handler
         */
        changeQuantity: function () {
            jQuery('.quantityselector', this.container).change(function () {
                jQuery('#totalshippingprice').addClass('loading');

                jQuery.getJSON(
                    app.getdepend.resources.get('updateQtyUrl'), {
                        shippingID: jQuery('.shippingmethodslist :option:checked').val(),
                        pid: jQuery('#coreOffer .coreid').val(),
                        qty: jQuery('#coreOffer .quantityselector').val() || 1
                    },
                    function (price) {
                        if (price.success) {
                            jQuery(app.getdepend.resources.get('subtotal-selector')).text(price.update.merchandiseTotal.stringValue);
                            jQuery(app.getdepend.resources.get('shipping-price-selector')).text(price.update.shipping.stringValue);
                            jQuery(app.getdepend.resources.get('total-price-selector')).text(price.update.totalPrice.stringValue);
                        }

                        jQuery('#totalshippingprice').removeClass('loading');

                    }
                );
                s.linkTrackVars = 'prop56,eVar56';
                s.prop56 = campaignCode + ":ChangeQty";
                s.eVar56 = s.prop56;
                s.tl(this, 'o', "qty update");
            });
        },

        /**
         * Initialize payment
         */
        initPayment: function () {
            var form = jQuery('.checkoutform');
            var paymentSection = form.find('.payment_info');
            var that = this;

            // We need to display payment section if it is not visible and if form is valid
            var validatorSettings = jQuery.extend(app.validatorSettings, {
                invalidHandler: function (form, validator) {
                    // Had to use this for placing error message for agree box, because errorPlacement doesn't work on submit for some reason
                    jQuery('.agree_box span.errorclient').appendTo('.agree_box .checkbox');
                },

                submitHandler: function (f) {
                    app.getdepend.resources.set("GRMSubmissionStatus", "ORDERSUBMIT")
                    // If payment section is hidden then display it and prevent form submit
                    if (!paymentSection.is(':visible')) {
                        // Display payment section and enable all input fields
                        if (app.resources['RTS_ENABLED'] == 'true') {
                            callRTS(that);
                        } else {
                            that.showPaymentSection();
                        }

                        return false;
                    } else {
                        //If payment section is visible, then call the below mentioned method for form submission
                        beforesubmitcheck();
                    }

                    //email verification
                    if (that.varifiedMail != form.find('.email input').val() && !that.submitActionFired) {
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
                    if (app.resources['RTS_ENABLED'] == 'true' && payment_method == 'PayPal' && plSelected) {
                        swapPaypalOfferCodeandSubmit(f);
                    } else {
                        f.submit();
                    }
                }
            });

            // Disable all input fields in hidden payment section to prevent validation
            if (!app.getdepend.resources.get('paymentAlwaysVisible') && ($('#paymentMethod').val() == "") && !paymentSection.is(':visible') && !jQuery('.errormessage:visible').size()) {
                paymentSection.add('.agree_box').find(':input').attr('disabled', 'disabled');
            } else {
                this.showPaymentSection();
            }

            // Reinitialize the validator
            form.data('validator', '').validate(validatorSettings);
        },

        showPaymentSection: function () {
            jQuery('.personinfform .payment_info').add('.agree_box').show().find(':input').removeAttr('disabled');
            $('.row.actionPanel .leftSection').show();
            if ($('.vita').is(':visible')) {
                $('.row.actionPanel').removeClass('fullBar');
            } else {
                $('.row.actionPanel').addClass('fullBar');
            }

            jQuery('.continueBtn').addClass('completeBtn');
            if (app.getdepend.checkout.upperCase(jQuery('.payment_info select').val().toUpperCase()) == app.getdepend.resources.get('paypalPayment')) {
                jQuery('.payment_info .card_details').hide().find(':input').attr('disabled', 'disabled');
            }
            enableSelectedCards();
        },

        /**
         * Change payment method handler
         */
        changePaymentMethod: function () {
            var handler = function () {
                if (jQuery(this).size()) {
                    jQuery('#' + app.getdepend.resources.get('paymentSelectedMethodName')).val(jQuery(this).find(':selected').attr('class').replace('paymentmethod-', ''));

                    if (app.getdepend.checkout.upperCase(jQuery(this).val()) == app.getdepend.resources.get('paypalPayment')) {
                        jQuery('.payment_info .card_details').hide().find(':input').attr('disabled', 'disabled');
                    } else {
                        jQuery('.payment_info .card_details').show().find(':input').removeAttr('disabled');
                    }
                }
            };

            if (app.getdepend.checkout.upperCase(app.getdepend.resources.get('typeselected')) == app.getdepend.resources.get('paypalPayment')) {
                handler.call(jQuery('.paymentmethodselector'));
            }

            jQuery('.payment_method select').change(handler);
        },

        /**
         * Initialize checkbox that changes using of custom billing address
         */
        initBillingAddress: function () {
            var checkbox = jQuery('#' + app.getdepend.resources.get('billingEqualsShippingCheckbox'));
            var equals = app.getdepend.resources.get('billingEqualsShipping');
            var shippingToggle = function () {
                jQuery('.cb_shipping .checkout_box_inner :input').attr('disabled', jQuery(this).attr('checked') ? 'disabled' : '').removeClass(app.validatorSettings.errorClass).next(app.errorElement).hide();

                if (jQuery(this).attr('checked')) {
                    jQuery('.cb_shipping').hide();
                } else {
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
                        width: 600,
                        height: 525,
                        title: 'Terms & Conditions',
                        resizable: false
                    }
                });
                var urlvedio = jQuery(this).attr('href');
                jQuery("#moreInfo").parent().addClass("terms-condition-popup");
                jQuery("#moreInfo").parent().css('background', '#fff').css('padding', '18px 22px 20px').css('overflow', 'inherit');
                var objtitle = jQuery("#moreInfo").siblings('.ui-dialog-titlebar');
                jQuery('#moreInfo').load(urlvedio);
                jQuery('#moreInfo').dialog('open');

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
                    app.getdepend.resources.get('updateSupplyURL'), {
                        pid: jQuery('.crossSellID').val(),
                        isKit: 'false',
                        paymentMethod: payMethod
                    },
                    function (supply) {
                        if (supply.success) {
                            jQuery(app.getdepend.resources.get('vitaminname')).html(supply.update.ProdName.stringValue);
                            jQuery(app.getdepend.resources.get('vitaminsection')).html(supply.update.CartDescription.stringValue);
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
                                    app.getdepend.resources.get('removeVitaminURL'), {
                                        pid: prodId
                                    },
                                    function (supply) {
                                        if (supply.success) {
                                            $('.name.vitamin').html('');
                                            $('.shortDescription.vitamin').html('');
                                            //$('.vitaminProduct').show();
                                            var coreidVal = jQuery('.coreid').val();
                                            $(".coreidCY").attr("value", coreidVal);
                                            $(".crossSellIDAddedToCart").attr("value", "");
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
                    app.getdepend.resources.get('removeVitaminURL'), {
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
                    app.getdepend.resources.get('removeVitaminURL'), {
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
                    app.getdepend.resources.get('updateSupplyURL'), {
                        pid: $(this).val(),
                        isKit: 'true'
                    },
                    function (supply) {

                        /*  if ($('.upsellInline .selectKit').find('li').hasClass(pid)) {
                                $('.upsellInline .sasKits li.' + pid).parent().find('li').removeClass('active');
                                $('.upsellInline .sasKits li.' + pid).addClass('active');
                                var orderSummaryPrice = $('.upsellInline .selectKit').find("." + pid + " .pdata .ppriceupsell").html();
                                $(".bottomPanel #prodSummary .kitPrice").empty();
                                $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryPrice);
                            }

*/

                        if (supply.success) {
			  var upsellClass = "30-Day";
                            if (optionval.indexOf("30") >= 0) {
                                upsellClass = "30-Day";
                            } else {
                                upsellClass = "90-Day";
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

                            if ($('#valueUpsellSection').hasClass('block')) {
                                $('#valueUpsellSection').removeClass('block');
                                $('#valueUpsellSection').hide();
                            } else {
                                $('#valueUpsellSection').addClass('block');
                                $('#valueUpsellSection').show();
                            }
                            $('a.remove_item').attr('name', supply.update.CoreId.stringValue);
                            $("#coreProductID").attr("value", supply.update.CoreId.stringValue);
                            $(".upsell-id li.updatecartbtn").removeClass('active');
                            $(".upsell-id ." + pid).addClass('active');
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
                $("#phone1,#phone2,#phone3").removeClass('errormessage');
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
                $("span.errormessage.rts").hide();
                if (currLength > minLen) {
                    $(this).next("span.errormessage:last").hide();
                }
            });
        }
    },
    vitaminDetailLink: {
        element: ".details_link",
        init: function () {
            jQuery(".details_link").toggle(function (event) {
                event.preventDefault();
                jQuery(".upsell_details_content").removeClass("upsell_details_inactive");
            }, function (event) {
                event.preventDefault();
                jQuery(".upsell_details_content").addClass("upsell_details_inactive");
            });
        }
    },
    payLaterTerms: {
        element: "#paylaterLegalTerms",
        init: function () {
            jQuery(app.getdepend.resources.get('PayLaterTerms')).html(jQuery('#paylaterLegalTerms').html());
        }
    }
};

function beforesubmitcheck() {
    var textVal1 = jQuery("#phone1").val();
    var textVal2 = jQuery("#phone2").val();
    var textVal3 = jQuery("#phone3").val();
    var textval = textVal1 + textVal2 + textVal3;
    jQuery("input[id=daytimePhone]").val(textval);

    if ($("#phone1,#phone2,#phone3").val() == "") {
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

jQuery(".details_link").click(function () {
    // Show or hide upsell description
    jQuery(this).siblings(".upselldescription").toggle();
    return false;
});

function appendUpsellProductToCookie(pid) {
    var upsellID = readCookie('upsellLastID') || "";
    if (upsellID.indexOf("[" + pid + "]") == -1) {
        setCookie('upsellLastID', upsellID + "[" + pid + "],");
    }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function setCookie(name, value, props) {
    props = props || {}
    var exp = props.expires

    if (typeof exp == "number" && exp) {
        var d = new Date()
        d.setTime(d.getTime() + exp * 1000)
        exp = props.expires = d
    }

    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString()
    }

    value = encodeURIComponent(value)
    var updatedCookie = name + "=" + value

    for (var propName in props) {
        updatedCookie += "; " + propName
        var propValue = props[propName]

        if (propValue !== true) {
            updatedCookie += "=" + propValue
        }
    }

    document.cookie = updatedCookie
}

function updateProductInfo(supply) {
    jQuery(app.getdepend.resources.get('subtotal-selector')).text(supply.update.SubTotal.stringValue);
    jQuery(app.getdepend.resources.get('shipping-price-selector')).text(supply.update.ShippingPrice.stringValue);
    jQuery(app.getdepend.resources.get('total-price-selector')).text(supply.update.TotalPrice.stringValue);
    jQuery(app.getdepend.resources.get('cart-description')).html(supply.update.CartDescription.stringValue);
    $(".coreid").attr("value", supply.update.CoreId.stringValue);
    $(".coreidCY").attr("value", supply.update.CoreId.stringValue);
    updateKitQuantityDropDown(supply);
    jQuery(app.getdepend.resources.get('product-name')).html(supply.update.ProdName.stringValue);
    jQuery(app.getdepend.resources.get('hero-image')).attr('src', supply.update.HeroImage.stringValue);
    jQuery(app.getdepend.resources.get('hero-image')).attr('title', supply.update.HeroImage.title);
    $('.shipList').empty();
    jQuery(app.getdepend.resources.get('heroName')).html(supply.update.ProdName.stringValue);
    jQuery(app.getdepend.resources.get('heroDesc')).html(supply.update.ShortDescription.stringValue);
    $(".daySupply").attr("value", supply.update.CoreId.stringValue);
    jQuery(app.getdepend.resources.get('PayLaterTerms')).html(supply.update.paylaterLegalTerms.stringValue);
    jQuery(app.getdepend.resources.get('kit-bottom-order-summary')).html(supply.update.ProdName.stringValue);
}

/* update the quantity dropdown (enable or disable) based on the product updated in cart */

function updateKitQuantityDropDown(supply) {
    var options = '';
    var kitNumber = parseInt(supply.update.kitQuantity.stringValue);
    if( (supply.update.pantSupply !=null)  && (supply.update.pantSupply.length > 0) )	  
	        {
	    	    for (i = 0; i < supply.update.pantSupply.length; i++) {
	    	        if ('null' != supply.update.pantSupply[i].value) {
	    	        	options += '<option value="' + supply.update.pantSupply[i].value + '">' + supply.update.pantSupply[i].label + '</option>';
	    	        }
	    	    }
	    	}
    $(".quantityselector").html(options);
    $(".quantityselector").attr("value", 1);
    if (kitNumber == 1) {
        $(".quantityselector").attr("disabled", "disabled");
    } else {
        $(".quantityselector").removeAttr('disabled');
    }
}

/* upsellline.js code moved here*/
jQuery(document).ready(function () {
    app.getdepend.checkout.init();
    AIRLINECOMMON.init();
    
    
    
    $("input").keydown(function () {
        $(this).parent().find("span:last-child").css("display", "none");

    });
    if (jQuery.browser.msie && parseInt(jQuery.browser.version) < 10) {
        enablePlaceHolderSupport();
    } else {
        $("input").each(
            function () {
                $(this).data('holder', $(this).attr('placeholder'));
                $(this).focus(function () {
                    $(this).attr('placeholder', '');
                });
                $(this).blur(function () {
                    $(this).attr('placeholder', $(this).data('holder'));
                });

            });
    }
    if ($("#billState").val() != "") {
        $("#billState").addClass("dropdown");
    }
    if ($("#creditCardMonth").val() != "") {
        $("#creditCardMonth").addClass("dropdown");
    }

    if ($("#creditCardYear").val() != "") {
        $("#creditCardYear").addClass("dropdown");
    }

    $("SELECT").change(function () {
        if ($(this).val() != "") {
            $(this).addClass("dropdown");
        }
    });

    $("SELECT").mousedown(function () {
        $(this).addClass("dropdown");

    });

    // hide two error message on person information section 
    $("input").keydown(function () {
        $(this).parent().find("span:last-child").hide();
    });

    $(window).scroll(function () {
        var windowScroll = $(window).scrollTop();
        var selectKitHeight = jQuery('.selectakitpanel').height();
        var freeGiftHeight = jQuery('.freeGiftCont').height();
        var upsellInlineHeight = jQuery('.upsellrecommendation').height();
        var checkoutHeight = jQuery('.checkoutform').height();
        var giftUpsellHeight = selectKitHeight + freeGiftHeight;
        var giftUpsellCheckoutHeight = selectKitHeight + freeGiftHeight + upsellInlineHeight;
        
    });

    var headerHeight = jQuery('.posFixed').height();
    queryString = "";
    /*$("a#step1").click(function () {
      //  scrollToAnchor('Step1');
    });*/
	newURLString = window.location.href ;
    $("a.select-orange-btn").click(function (event) {
     	if(newURLString.indexOf("?")>-1)
     		{
     		var i = newURLString.indexOf("?");
     		newURLString= newURLString.substring(0,i+1);
     		}
         newURLString = newURLString + queryString;
    	window.location.href = newURLString;
    });
  
     $("a#step4").click(function () {
        s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":sas:nextbtn3";
        s.eVar56 = s.prop56;
        s.tl(this, 'o', s.prop56);         
    });
    
    $(".step1 a").click(function () {      
        s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":SelectSystem";
        s.eVar56 = s.prop56;
        s.tl(this, 'o', "Select a System");
        //$('.selectakitpanel .pageTitle').css('margin-top','0px')
    });
    $(".step2 a").click(function () {       
        s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":SelectAProduct";
        s.eVar56 = s.prop56;
        s.tl(this, 'o', "Select a Product");
        //$('.freeGiftCont .pageTitle').css('margin-top','0px')
    });
    $(".step3 a").click(function () {      
        s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":SelectSupply";
        s.eVar56 = s.prop56;
        s.tl(this, 'o', "Select Supply");
        // $('.upsellrecommendation .pageTitle').css('margin-top','0px')
    });
    $(".step4 a").click(function () {      
        s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":Checkout";
        s.eVar56 = s.prop56;
        s.tl(this, 'o', "Checkout");
        
    });

    function scrollToAnchor(aid) {
        var aTag = $("a[name='" + aid + "']");
        //$('html,body').animate({scrollTop: aTag.offset().top - headerHeight},'slow');
        $('html,body').animate({
            scrollTop: aTag.offset().top
        }, 1000);
        $('.pantcount-container').hide("slow");
    }

    $(".upsellrecommendation .upsell-id ul li:last-child").css('margin-right', '0px');

    // For Master product Selection
    $(".kitType .sasKits>li").click(function () {
    	var LiUrl = $(this).find("a.select-orange-btn").attr("href");
    	window.location.replace(LiUrl);
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var system = $(this).attr("id");
        $(".genderSelection").css('display', 'none');
        $(".genderSelectionProduct").css('display', 'none');
      	$(".gender-size-box").css('display', 'none');
        $(".upsell-id").hide();
        $("#" + system + "genderSelection").css('display', 'block');
        $("#" + system + "subsys1Product").css('display', 'block');
        $("#" + system + "genderBox").css('display', 'block');
        $("#" + system + "genderBox .sizeChartTable").removeClass('active');
        $("#" + system + "genderBox .sizeChartTable:first").addClass('active');
        $("#" + system + "genderSelection" + " li:first-child").siblings().removeClass('active');
        $("#" + system + "genderSelection" + " li:first-child").addClass('active');
        $("#" + system + "subsys1Product" + " li:first-child").siblings().removeClass('active');
        $("#" + system + "subsys1Product" + " li:first-child").addClass('active');
        $("#" + system + "subsys1Product1Upsell").css('display', 'block');
        $("#" + system + "subsys1Product1Upsell" + " li:first-child").siblings().removeClass('active');
        $("#" + system + "subsys1Product1Upsell" + " li:first-child").addClass('active');
        //Offer Selection Omniture
        s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":sas:offerbtn";

        s.eVar56 = s.prop56;
        s.tl(this, 'o', s.eVar56);
    });

    // For Free gift Selection
    $(".PanelB .selectGift li").click(function () {

        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var system = $(this).attr("id");
        $("#" + system + "Upsell").siblings("div").css('display', 'none');
        $("#" + system + "Upsell").css('display', 'block');
        $("#" + system + "Upsell" + " li:first-child").siblings().removeClass('active');
        $("#" + system + "Upsell" + " li:first-child").addClass('active');
    });

    //Gender Click Event
    $(".genderSelection li").click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var systemGender = $(this).attr("id");
        var systemGenderVal = $(this).attr("class");
        var systemVal = systemGenderVal.split(" ")[0]; /*system1genderSelectionfemalesizeTable*/
        var systemurl = systemGenderVal.split(" ")[2];
        
        //size list display logic
        $(".genderSelectionProduct").css('display', 'none');
        $("." + systemGender + "Product").css('display', 'block');
        $("." + systemGender + "Product" + " li").removeClass('active');
        $("." + systemGender + "Product" + " li:first-child").addClass('active');

        //size Chart display logic
        var sytemid = $(this).parents('.genderSelection').attr("id");
        var sizegender = $("#" + systemGender + ".active a").attr("class");
        $(".sizeChartTable").removeClass('active');
        $("#" + sytemid + sizegender + "sizeTable." + sizegender).addClass('active');

        //upsell Recommendation display logic
        $(".upsellrecommendation .upsell-id li").removeClass('active');
        $(".upsellrecommendation .upsell-id").css('display', 'none');
        $(".upsellrecommendation .upsell-id" + " ." + systemVal).addClass('active');
        $(".upsellrecommendation .upsell-id" + " ." + systemVal).parent().parent().css('display', 'block');
        
        var systemupsell = systemGenderVal.split(" ")[0]; /*system1genderSelectionfemalesizeTable*/
        var systemurl = systemGenderVal.split(" ")[2];

        //size chart display logic
        $(".genderSelectionProduct").css('display', 'none');
        $("." + systemGender + "Product").css('display', 'block');
        $("." + systemGender + "Product" + " li").removeClass('active');
        $("." + systemGender + "Product" + " li:first-child").addClass('active');
        var offerid = $(this).attr("class");        
        queryString = offerid.split(" ")[2];
        if(newURLString.indexOf(app.resources["CAMPAIGN_GENDER"])>-1)
 		{       
 		var i = newURLString.indexOf(app.resources["CAMPAIGN_GENDER"]);
 		newURLString= newURLString.substring(0,i);
 		var newURLString2 = newURLString + queryString + app.resources["CAMPAIGN_CHECKOUT"] ;
 		newURLString = newURLString + queryString;	
 		}       
    	$('.bottomPanel.select-supply .medOrngBtn').attr("href",newURLString);      
        $('.bottomPanel.checkout.supply .medOrngBtn').attr("href",newURLString2);
        
        //Gender Selection Omniture
        s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":sas:genderbtn";

        s.eVar56 = s.prop56;
        s.tl(this, 'o', s.eVar56);
    });

    //Size list Click Event
    $(".gender-size-box li").click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var system = $(this).attr("id");
        var systemGenderVal =  $(this).attr("class");       
        var systemurl = systemGenderVal.split(" ")[2];
        
        $(".upsellrecommendation .upsell-id").css('display', 'none');
        $("#" + system + "Upsell").css('display', 'block');
        $("#" + system + "Upsell" + " li").removeClass('active');
        $("#" + system + "Upsell" + " li:first-child").addClass('active');
        
        var offerid = $(this).attr("class");        
        queryString = offerid.split(" ")[2];
         if(newURLString.indexOf(app.resources["CAMPAIGN_GENDER"])>-1)
 		{       
 		var i = newURLString.indexOf(app.resources["CAMPAIGN_GENDER"]);
 		newURLString= newURLString.substring(0,i);
 		var newURLString2 = newURLString + queryString + app.resources["CAMPAIGN_CHECKOUT"] ;
 		newURLString = newURLString + queryString;	
 		}
    	$('.bottomPanel.select-supply .medOrngBtn').attr("href",newURLString);      
        $('.bottomPanel.checkout.supply .medOrngBtn').attr("href",newURLString2);
       
        //Size Selection Omniture
        s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":sas:sizebtn";

        s.eVar56 = s.prop56;
        s.tl(this, 'o', s.eVar56);

    });

    //Upsell Recommendation Click Event
    $(".upsellrecommendation .upsell-id li.updatecartbtn").click(function () {  	
        var offerid = $(this).attr("class");
        queryString = offerid.split(" ")[2];    
        if(newURLString.indexOf(app.resources["CAMPAIGN_SUPPLY"])>-1)
 		{     
        var i = newURLString.indexOf(app.resources["CAMPAIGN_SUPPLY"]);
        newURLString= newURLString.substring(0,i);
        newURLString = newURLString + queryString + app.resources["CAMPAIGN_CHECKOUT"]  ;
 		}    	 
    	$(this).addClass('active');
        $(this).siblings().removeClass('active');
    	 
    	$('.bottomPanel.panelB a').attr("href",newURLString);
    });
    
    $('.upsellrecommendation .upsell-id li.updatecartbtn').click(function (){
    	//Supply Selection Omniture
    	s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":sas:supplybtn";
        s.eVar56 = s.prop56;
        s.tl(this, 'o', s.eVar56);
    });

    $('.updatecartbtn').click(function () {
        var offerid = $(this).attr("class");       
		$("#coreProductID").attr("value", offerid.split(" ")[0]);
        $('.pantcount-container').hide("slow");

        var orderSummaryGiftPrice = $(this).find(".pdata .pprice").html();
        $(".bottomPanel #prodSummary .kitPrice").empty();
        $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryGiftPrice);
        var orderSummarykitTab = $(this).find(".pdata .pTab").html();
        $(".bottomPanel #prodSummary .kitTab").empty();
        $(".bottomPanel #prodSummary .kitTab").append(orderSummarykitTab);

        var payMethod = getPayMethod();
        jQuery.getJSON(
            app.getdepend.resources.get('updateSupplyURL'), {
                pid: jQuery('.coreProductID').val(),
                isKit: 'true',
                paymentMethod: payMethod
            },
            function (supply) {
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
                    $('#daySupply').empty();
                    var sullpyOptions = '';
                    for (i = 0; i < supply.update.daySupply.length; i++) {
                        if ('null' != supply.update.daySupply[i].value) {
                            sullpyOptions += '<option value="' + supply.update.daySupply[i].value + '">' + supply.update.daySupply[i].label + '</option>';
                        }
                    }
                    $("#daySupply").html(sullpyOptions);
                    //jQuery(app.getdepend.resources.get('vitaminsection')).html(supply.update.CartDescription.stringValue);
                    //$('.coreProductID').hide();
                    $("#coreProductID").attr("value", supply.update.CoreId.stringValue);
                }
            }
        );

    });
  
    var coreID = $(".coreid").val();
    $("#coreProductID").attr("value", coreID);
    var vitID = $(".crossSellIDAddedToCart").val();
    if (vitID != null && vitID != "undefined" && vitID != "") {
        $(".crossSellPLSwap").attr("value", $(".crossSellIDAddedToCart").val());
        $(".crossSellID").attr("value", $(".crossSellIDRegular").val());
        $("#vitPresentInCart").attr("value", true);
    }
    var has_upsell = $('#has-upsell').val();
    var btmSumPrice = $('#subTotal').text();
    $(".bottomPanel #prodSummary .kitPrice").empty();
    $(".bottomPanel #prodSummary .kitPrice").append(btmSumPrice);
 
    
    if (has_upsell == "true") {
        $(".upsell-id ." + coreID).addClass('active');
        $(".upsell-id ." + coreID).parent().parent().css('display', 'block');
        var upsell_recommendation = $('.recommend_Product').val();
        var Dgender = $(".coregender").val();
        var mid = $(".selectakitpanel .sasKits li." + upsell_recommendation + " span.selected").text();
        var Dsize = $(".coresize").val();        
        $(".selectakitpanel .sasKits li").removeClass('active');
        $(".selectakitpanel .sasKits li." + upsell_recommendation).addClass('active');
        var genderid = $(".selectakitpanel .sasKits li." + upsell_recommendation).attr('id');
        $(".genderSelectionProduct").css('display', 'none');
        $("#" + genderid + "genderSelection").addClass('active');
        $("#" + genderid + "genderSelection .gender li." + Dgender).addClass('active');
        $("#" + genderid + "genderBox").addClass('active');
        $("#" + genderid + "genderBox ." + mid + "." + Dgender).css('display', 'block');
        $("#" + genderid + "genderBox ." + mid + "." + Dgender + " ." + Dsize).addClass('active');
        $("#" + genderid + "genderBox.active .sizeChartTable" + "." + Dgender).addClass('active');

    } else {
        $(".upsell-id ." + coreID).addClass('active');
        $(".upsell-id ." + coreID).parent().parent().css('display', 'block');
        var upsell_recommendation = $('.recommend_Product').val();
         var Dgender = $(".coregender").val();
        var mid = $(".selectakitpanel .sasKits li." + upsell_recommendation + " span.selected").text();
        var Dsize =$(".coresize").val();               
        $(".selectakitpanel .sasKits li").removeClass('active');
        $(".selectakitpanel .sasKits li." + upsell_recommendation).addClass('active');

        var genderid = $(".selectakitpanel .sasKits li." + upsell_recommendation).attr('id');
        $(".genderSelectionProduct").css('display', 'none');
        $("#" + genderid + "genderSelection").addClass('active');

        $("#" + genderid + "genderSelection .gender li." + Dgender).addClass('active');
        $("#" + genderid + "genderBox").addClass('active');
        $("#" + genderid + "genderBox ." + mid + "." + Dgender).css('display', 'block');
        $("#" + genderid + "genderBox ." + mid + "." + Dgender + " ." + Dsize).addClass('active');
        $("#" + genderid + "genderBox.active .sizeChartTable" + "." + Dgender).addClass('active');

    }

    equalHeight($(".giftBlockSAS"));
    equalHeight($(".selectKit_Img"));
    //equalHeight($(".upsellrecommendation .giftImage"));
    equalHeight($(".upsellrecommendation .giftBlockUpsell"));
    equalHeight($(".sasLongDescription .sasDes"));
    equalHeight($(".supplyLongDescription"));
    equalHeight($(".selectKit.freeGiftSelector.PanelB .sasDes h4"));    

    function equalHeight(group) {
        var tallest = 0;
        group.each(function () {
            var thisHeight = $(this).height();
            if (thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        group.height(tallest);
    }
   
});

/* JS: Placeholder */

window.enablePlaceHolderSupport = function () {
    jQuery("input[placeholder]").each(function () {
        if (jQuery(this).attr("type") != "password") {
            if (jQuery(this).val() == "") {
                jQuery(this).val(jQuery(this).attr("placeholder")).addClass("placeholder");
            }
        } else {
            if (jQuery(this).attr("name") != "") {
                if (jQuery(this).prev(".passsword-mask").length == 0) {
                    if (jQuery("#account-registration").length > 0 || jQuery("#account-update").length > 0) {
                        var mr = "3px 0 0px";
                    } else {
                        var mr = "3px 0 -38px";
                    }
                    jQuery('<div class="passsword-mask ' + jQuery(this).attr("class") + '">' + jQuery(this).attr("placeholder") + '</div>').insertBefore(jQuery(this));
                    jQuery('.passsword-mask').css({
                        "color": "#999",
                        "font-style": "italic",
                        "border": "none",
                        "margin": mr,
                        "position": "relative",
                        "z-index": "999",
                        "padding": "0 0 0 5px"
                    });
                    if (jQuery(this).val() != "") {
                        jQuery('.passsword-mask').css('display', 'none');
                    }
                }
            }
        }
    });

    jQuery("[placeholder]").bind("click focus", function () {
        if (jQuery(this).attr("type") != "password") {
            if (jQuery(this).val() == jQuery(this).attr("placeholder")) {
                jQuery(this).val("");
                jQuery(this).prev(".passsword-mask").css("display", "none");
                var input = this,
                    $input = $(input);
                var hadFocus = $(input).is(":focus")
                if (hadFocus) $input.select();
            }
            jQuery(this).removeClass("placeholder");
        } else {
            jQuery(this).prev(".passsword-mask").css("display", "none");
        }
    }).bind("blur", function () {
        if (jQuery(this).attr("type") != "password") {
            if (jQuery(this).val() == "") {
                jQuery(this).val(jQuery(this).attr("placeholder"));
                jQuery(this).addClass("placeholder");
            }
        } else {
            if (jQuery(this).val() == "") {
                jQuery(this).prev(".passsword-mask").css("display", "block");
            }
        }
    });
    jQuery(".passsword-mask").live("click", function () {
        jQuery(this).css("display", "none");
        jQuery(this).next().focus();
    });

    jQuery(".checkoutimgs select").change(function () {
        jQuery("#creditCardNumber").val(jQuery("#creditCardNumber").attr("placeholder"));
        jQuery(".eCheckPaymentinfo input").each(function (i) {
            jQuery(this).val(jQuery(this).attr("placeholder"));
        })
    });

    jQuery("form").each(function () {
        var formRef = jQuery(this);
        jQuery('.continueBtn, .completeBtn, #paywithpaypal').bind("mousedown click", function () {
            jQuery('.billing_shipping input, .contact_info input, .paymentInformation input, .access_info .age_and_gender input').each(function () {
                if (jQuery(this).val() == jQuery(this).attr("placeholder")) {
                    jQuery(this).val("");
                }
            });
        });
    });

}
/* JS: Placeholder :End*/

/* upsellcode end here */