jQuery(document).ready(function () {

    // execute unobtrusive js code
    app.execUjs();

    enableDisableSaveButton(false);

    // used when creating a new credit card
    $("#numberId").keydown(function () {
        enableDisableSaveButton(true);
    });

    // used when creating a new Echeck
    $("#routing").keydown(function () {
        enableDisableSaveButton(true);
    });

    $("#account").keydown(function () {
        enableDisableSaveButton(true);
    });

    var selectedCCId = jQuery("select[name=" + selectedCreditCardID +"]").val();

    if (selectedCCId == "" || selectedCCId == null) {
        changeFieldsOnChangeContinuity("");
    }
    var customerContinuityMethod = customerContinuityPaymentMethod;
    // handles edit mode on page load
    
    if (pageMode == "edit") {
        jQuery("input[name=" + newCreditCardNumber + "]").attr("disabled", "disabled");
        jQuery("select[name=" + newCreditCardType + "]").attr("disabled", "disabled");
        changeCCFieldsVisibility(true);
        changeEcheckFieldsOnChangeContinuity("disabled");
        changeSaveButtonVisibility(true);
    }

    if (pageMode == "save") {
        changeCCFieldsVisibility(true);
        changeSaveButtonVisibility(true);
        changeEcheckFieldsOnChangeContinuity("disabled");
    }
    jQuery(".month select").change(function () {
        enableDisableSaveButton(true);
    });
    jQuery(".year select").change(function () {
        enableDisableSaveButton(true);
    });
    //end of edit mode code

    // Handle page load on continuity mode
    if (pageMode == "changeContinuityMethod" && errorOnMethod != "creditCardError") {
        jQuery("input[name=" + newCreditCardNumber + "]").attr("disabled", "disabled");
        jQuery("select[name=" + newCreditCardMonth + "]").attr("disabled", "disabled");
        jQuery("select[name=" + newCreditCardYear + "]").attr("disabled", "disabled");
        //changeCCFieldsVisibility(true);
        //changeSaveButtonVisibility(true);	
    }

    // end of the continuity mode



    jQuery("#saveButtonId").click(function (event) {
        var val = jQuery("select[name=" + newCreditCardType + "]").val();
        var val1 = jQuery("select[name=" + newCreditCardMonth + "]").val();
        var val2 = jQuery("select[name=" + newCreditCardYear + "]").val();
        if (val == "") {
            jQuery(".cardtypeerror").text(cardTypeMissing);

            if ((val1 != "" && val2 != "") && (val == "")) {

                jQuery(".cardtypeerror").text(cardTypeMissing);

                event.preventDefault();
            }
        }

    });

    jQuery('#applyBtn').click(function () {
        action = creditcardsCreateAction;
        jQuery('#formaction').append("<input name='" + action + "' type='hidden' />");

        var post = jQuery('#CreditCardForm').serialize();
        jQuery.ajax({
            type: "POST",
            url: app.URLs.submitDialogURL,
            data: post,
            dataType: 'html',
            success: function (data) {
                jQuery("#dialogcontainer").empty().html(data);
            },
            failure: function (data) {
                //	alert("${Resource.msg('global.serverconnection','locale',null)}");		
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                jQuery('#confirmationcontainer').show();
                jQuery('#confirmationcontainer').dialog({
                    bgiframe: true,
                    autoOpen: false,
                    modal: true,
                    height: 100,
                    width: 300,
                    resizable: false
                });
                jQuery('#confirmationcontainer').dialog('option', 'title', jQuery('#dialogcontainer').dialog('option', 'title'));
                jQuery('#confirmationcontainer').dialog('open');
            }
        });
    });

    jQuery('#confirmBtn').unbind("click").click(function () {
        jQuery('.confirmationcontainer').dialog('close');
        jQuery('#dialogcontainer').dialog('close');
    });

    //changes the selection of the given form select to the given value

    function changeFormSelection(selectElem, selectedValue) {
        if (!selectElem) return;
        var options = selectElem.options;
        if (options.length > 0) {
            // find index of value to select
            var idx = 0;
            for (var i = 0; i < options.length; i++) {
                if (options[i].value != selectedValue) continue;
                idx = i;
                break;
            }
            selectElem.selectedIndex = idx;
        }
    }


    jQuery(".cardtype select").change(function () {
        var val = jQuery("select[name=" + newCreditCardType + "]").val();
     
        if (val != "") {
            jQuery(".cardtypeerror").text('');
            changeFieldsOnChangeContinuity("");
            changeEcheckFieldsOnChangeContinuity("disabled");
            enableDisableSaveButton(true);
        } else {
            jQuery(".cardtypeerror").text(cardTypeMissing);
        }

    });

    // display the credit card details on select of the credit card from list
    jQuery(".creditcardlist select").change(function () {

        var cardUUID = jQuery(this).val();

        // If Continuity Card is Credit Card

        if (cardUUID != null && cardUUID != "" && cardUUID != "AddNewEcheckMethod") {
            // load card details
            var url = app.util.appendParamToURL(selectCreditCardURL, 'creditCardUUID', cardUUID);
            
            var result = app.ajax.getJson({
                url: url,
                callback: function (data) {
                    if (!data || !data.creditCard) {
                        return false;
                    }

                    if (data.creditCard.customerPaymentMethod != "3") {
                        // If customer payment method in drop down is Credit Card
                        populateFieldsForCCSelected(data);
                        changeFieldsOnChangeContinuity("disabled");
                        changeCCFieldsVisibility(true);
                        changeEcheckVisibility(false);
                        changeSaveButtonVisibility(true);
                        changeAccountDetailsVisibility(false);
                        $('span.errormessage').hide();
                        jQuery(".cardtypeerror").text('');
                    } else { // If customer payment method in drop down is Checking or Savings
                        changeAccountDetailsVisibility(true);
                        changeEcheckVisibility(false);
                        changeCCFieldsVisibility(false);
                        changeSaveButtonVisibility(false);
                    }

                }
            });

            jQuery(".newLableMsg h3").text("");
            var custCCId = custdefaultCreditCardID;
            if (cardUUID != custCCId) {
                enableDisableSaveButton(true);
            } else {
                enableDisableSaveButton(false);
            }



        } else {

            if (cardUUID == "") {
                // If Drop down value is Add new Credit Card
                changeFieldsOnChangeContinuity("");
                clearCreditCardFieldsOnAddNewPayment();
                changeCCFieldsVisibility(true);
                changeEcheckVisibility(false);
                changeSaveButtonVisibility(true);
                changeAccountDetailsVisibility(false);
                $('span.errormessage').hide();

            } else if (cardUUID == "AddNewEcheckMethod") {
                // If Drop down value is Add new Bank Type
                //jQuery(' .errormessage').hide();  
                changeFieldsOnChangeContinuity("disabled");
                changeEcheckFieldsOnChangeContinuity("");
                clearFieldsOnAddNewEcheck("");
                changeEcheckVisibility(true);
                changeCCFieldsVisibility(false);
                changeSaveButtonVisibility(true);
                changeAccountDetailsVisibility(false);
            }
        }
        //hide the displayContiDupError
        jQuery('.displayContiDupError').hide();
    });

    function populateFieldsForCCSelected(data) {
        // fill the form / clear the former cvn input
        jQuery("input[name=" + newCreditCardOwner + "]").val(data.creditCard.holder);
        jQuery("input[name=" + newCreditCardNumber + "]").val(data.creditCard.maskedNumber);
        changeFormSelection(jQuery("select[name=" + newCreditCardType + "]")[0], data.creditCard.type);
        changeFormSelection(jQuery("select[name=" + newCreditCardMonth + "]")[0], data.creditCard.expirationMonth);
        changeFormSelection(jQuery("select[name=" + newCreditCardYear + "]")[0], data.creditCard.expirationYear);
        enableDisableSaveButton(true);
    }

    function changeFieldsOnChangeContinuity(attrVal) {
        // fill the form / clear the former cvn input
        jQuery("input[name=" + newCreditCardNumber + "]").attr("disabled", attrVal);
        jQuery("select[name=" + newCreditCardType + "]").attr("disabled", attrVal);
        jQuery("select[name=" + newCreditCardMonth + "]").attr("disabled", attrVal);
        jQuery("select[name=" + newCreditCardYear + "]").attr("disabled", attrVal);
    }

    // For Enable Disable Echeck field

    function changeEcheckFieldsOnChangeContinuity(attrVal) {

        jQuery("input[name=" + newCreditCardRouting + "]").attr("disabled", attrVal);
        jQuery("input[name=" + newCreditCardAccount + "]").attr("disabled", attrVal);
//      jQuery("select[name=" + newCreditCardBankAccountType + "]").attr("disabled", attrVal);
    }

    // Clear the Form Fields for Echeck

    function clearFieldsOnAddNewEcheck() {
        jQuery("input[name=" + newCreditCardAccount + "]").val("");
        jQuery("input[name=" + newCreditCardRouting + "]").val("");
//      changeFormSelection(jQuery("select[name=" + newCreditCardBankAccountType + "]")[0], '');
    }

    function clearCreditCardFieldsOnAddNewPayment() {
        // making the fields editable
        changeFieldsOnChangeContinuity("");

        // clearing the fields of the form
        jQuery("input[name=" + newCreditCardOwner + "]").val("");
        jQuery("input[name=" + newCreditCardNumber + "]").val("");
        changeFormSelection(jQuery("select[name=" + newCreditCardType + "]")[0], '');
        changeFormSelection(jQuery("select[name=" + newCreditCardMonth + "]")[0], '');
        changeFormSelection(jQuery("select[name=" + newCreditCardYear + "]")[0], '');
    }


    function changeEcheckVisibility(attrVal) {
        // Hide Show visibility of Payment Method 
        if (attrVal) {
            jQuery(' .echeck_number').show().find(':input').removeAttr('disabled');            
        } else {
            jQuery(' .echeck_number').hide().find(':input').attr('disabled', 'disabled');            
        }
    }
    
    function changeCCFieldsVisibility(attrVal) {
        // Hide Show visibility of Echeck Method
        if (attrVal) {
            jQuery(' .creditcard').show();
        } else {
            jQuery(' .creditcard').hide();
            jQuery("select[name=" + newCreditCardType + "]").attr("disabled", "disabled");
        }
    }


    function changeSaveButtonVisibility(attrVal) {
        // Hide Show visibility of save and cancel Button
        if (attrVal) {
            jQuery(' .savePayment').show();
        } else {
            jQuery(' .savePayment').hide();
        }
    }


    function changeAccountDetailsVisibility(attrVal) {
        // Hide Show visibility of save and cancel Button
        if (attrVal) {
            jQuery(' .populateEcheck').show();
        } else {
            jQuery(' .populateEcheck').hide();
        }
    }

    //Enables save button if enable=true, else disables save button.

    function enableDisableSaveButton(enable) {
        if (enable) {
        	jQuery("#saveButtonId").removeAttr("disabled");
            jQuery("#saveButtonId").removeClass("blue-btn-dis");
        } else {
            jQuery("#saveButtonId").attr("disabled", "disabled");
            jQuery("#saveButtonId").addClass("blue-btn-dis");
        }
    }

    if (errorOnMethod == "null") {
        // To Handle for Customer Payment Continuity method as PayLater/PayPal
        if (pageMode == "changeContinuityMethod" && (customerContinuityMethod == "1" || customerContinuityMethod == "2")) {
            changeFieldsOnChangeContinuity("");
            clearCreditCardFieldsOnAddNewPayment();
            changeCCFieldsVisibility(true);
            changeEcheckVisibility(false);
            changeSaveButtonVisibility(true);
            changeAccountDetailsVisibility(false);
        }
        // To Handle for Customer Payment Continuity method as CreditCard
        else if (pageMode == "changeContinuityMethod" && customerContinuityMethod == "0") {
            changeCCFieldsVisibility(true);
            changeSaveButtonVisibility(true);
        }
        // To Handle for Customer Payment Continuity method as Bank Account
        else if (pageMode == "changeContinuityMethod" && customerContinuityMethod == "3" && duplicateBankAccount == "true") {
            changeAccountDetailsVisibility(false);
            changeEcheckVisibility(true);
            changeCCFieldsVisibility(false);
            changeSaveButtonVisibility(true);
        }
    }
    // To Handle which type of error Coming for Echeck/CreditCard From API and Form
    else if (errorOnMethod == "eCheckError") {
        // To Handle which type of error Coming for Echeck from API
    	if(parseInt(echeckAttemptError) == parseInt(echeckMaxAttempt)){
    		changeFieldsOnChangeContinuity("");
            clearCreditCardFieldsOnAddNewPayment();
            changeCCFieldsVisibility(true);
     	    changeEcheckVisibility(false);
   			changeSaveButtonVisibility(true);
            changeAccountDetailsVisibility(false);
            //$('span.errormessage').hide();
    		}else{
            changeEcheckVisibility(true);
            changeCCFieldsVisibility(false);
            changeSaveButtonVisibility(true);
            changeAccountDetailsVisibility(false);
    	}
        //changeFieldsOnAddNewEcheck();
        //$("#dwfrm_paymentinstruments_creditcards_newcreditcard_defaultCreditCardID option:last").attr('selected','selected');

    } else if (errorOnMethod == "creditCardError") {
        // To Handle which type of error Coming for CreditCard from API
        changeEcheckFieldsOnChangeContinuity("disabled");
        changeCCFieldsVisibility(true);
        //changeEcheckVisibility(false);
        changeSaveButtonVisibility(true);
        changeAccountDetailsVisibility(false);
    } else if (errorOnMethod == "creditCardFormError") {
        // To Handle which type of error Coming for Echeck from Forms
        changeFieldsOnChangeContinuity("");
        changeEcheckFieldsOnChangeContinuity("disabled");
        changeCCFieldsVisibility(true);
        changeSaveButtonVisibility(true);
        changeAccountDetailsVisibility(false);
    }


});