

var app = (function(jQuery){

	if (!jQuery) {
		alert(app.resources["MISSING_LIB"]);
		return null;
	}
	// Global dw private data goes here	

	// dw scope public
	return {
		URLs			: {}, // holds dw specific urls, check htmlhead.isml for some examples
		resources		: {},  // resource strings used in js
		constants		: {}, // platform constants, initialized in htmlhead.isml
		containerId		: "content",
		ProductCache	: null,  // app.Product object ref to the current/main product
		clearDivHtml	: "<div class=\"clear\"><!-- W3C Clearing --></div>",
		currencyCodes	: {}, // holds currency code/symbol for the site


		// global form validator settings
		validatorSettings: {
			errorClass : 'errormessage',
			errorElement: 'span',
			
		    onfocusout: function(element) {
				if ( !this.checkable(element) ) {
					this.element(element);
				}				
			},
			errorPlacement: function(error, element) {
    			error.insertAfter( element.parent("div") );
  			}
		},
		
		// validation plugin intialization
		validator: function() {
			// override default required field message
			var oldmessage = jQuery.validator.messages.required;
			jQuery.validator.messages.required = function($1, ele, $3) {
				var data = jQuery(ele).attr("requiredmesage");
				
				if(data!=null){
					return data;
				}else{
					return oldmessage;
				}
			};
			
			//override default equaltomessage field message
			var oldequalTo = jQuery.validator.messages.equalTo;
			jQuery.validator.messages.equalTo = function($1, ele, $3) {
				var data = jQuery(ele).attr("equaltomessage");
				if(data!=null){
					return data;
				}else{
					return oldequalTo;
				}
			};
			
			/**
			 * Add phone validation method to jQuery validation plugin.
			 * Text fields must have 'phone' css class to be validated as phone
			 * phoneUS is copied from http://docs.jquery.com/Plugins/Validation/CustomMethods/phoneUS
			 */
			jQuery.validator.addMethod("phone", function(phone_number, element) {
				// find out the country code
				var data 	= jQuery(element).data("data");
				var country = (data && data.country && data.country != "") ? data.country : "US"; // default to US phone validation
				
				// preserve this instance
				var that = this;
				
				// country specific phone validation handlers
				var phoneCA,
					phoneUS = phoneCA = function() {
						phone_number = phone_number.replace(/\s+/g, ""); 
						return that.optional(element) || phone_number.length > 9 &&
							phone_number.match(/^\d+$/);
					}
				
				eval("var phoneHandler = (typeof phone" + country + " != 'undefined') ? phone"+country+": null;");
				
			    // call the country specific phone validation handler
				return (phoneHandler && typeof phoneHandler == "function" ? phoneHandler() : true);
			}, app.resources["INVALID_PHONE"]);
			
			/**
			 * Add email validation method to jQuery validation plugin.
			 * Text fields must have 'mail' css class to be validated as email
			 */
			jQuery.validator.addMethod("mail", function(value, element) {
				var emailregexp = /^[a-z0-9!#$%&amp;&apos;*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;&apos;*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}|aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)$/i;
				if (this.optional(element) && value == ''){
					return true;
				}
				
				return this.optional(element) || value.match(emailregexp);
			}, app.resources["INVALID_EMAIL"]);

			/**
			 * Add registration zipcode validation method to jQuery validation plugin.
			 * Text fields must have 'ZipCode' css class to be validated as zip
			 */
			/*jQuery.validator.addMethod("ZipCode", function(value, element) {
				var zipregexp = /^[0-9]+$/;
				if (this.optional(element) && value == ''){
					return true;
				}
				
				return this.optional(element) || value.match(zipregexp);
			}, app.resources["INVALID_ZIP"]);
			*/
			/**
			 * Add credit cart validation method to jQuery validation plugin.
			 * Text fields must have 'number' css class to be validated as Credit Cart.
			 * Matches Visa, MasterCard and Discover in 4-4-4-4/4 4 4 4/4444 format and 
			 * Amex in 4-6-5/4 6 5/465 format. 
			 * Includes checks for prefixes( 4 for visa, 51-55 for MasterCard, 37/34 for Amex and 6011 for Discover).
			 */
			jQuery.validator.addMethod("number", function(value, element) {
				var creditcardregexp = /^((4\d{3})|(5[1-5]\d{2})|(6011))(-?\s?\d{4}){3}|(3[4,7])\d{2}-?\s?\d{6}-?\s?\d{5}$/;
				var maskedccregexp = /^((\*?\*{11})(\d{4}))$/;
				if (this.optional(element) && value == ''){
					return true;
				}
				if(!value.match(creditcardregexp) && value.match(maskedccregexp)){
					return true;
				}
				return this.optional(element) || value.match(creditcardregexp);
			}, app.resources["INVALID_CCNUMBER"]);
			
			jQuery.validator.addMethod("maskednumber", function(value, element) {
				var maskedccregexp = /^((\*?\*{11})(\d{4}))$/;
				if (this.optional(element) && value == ''){
					return true;
				}
				return this.optional(element) || !value.match(maskedccregexp);
			}, app.resources["INVALID_MASKEDCCNUMBER"]); 
			
			
			/**
			 * Add zip/postal code validation method to jQuery validation plugin.
			 * Text fields must have 'zip' css class to be validated as zip/postal code
			 */
			jQuery.validator.addMethod("zip", function(value, element) {
				// find out the country code
				var data 	= jQuery(element).data("data");
				var country = (data && data.country && data.country != "") ? data.country : "UNDEFINED"; // default to US phone validation
				// preserve this instance
				var that = this;
				
				var codeUS = function(){
					return that.optional(element) || value.match(/^(?!0{5})(\d{5})(?!-?0{4})(-?\d{4})?$/);
				};
				var codeCA = function(){
					return that.optional(element) || value.match(/^([AaBbCcEeGgHhJjKkLlMmNnPpRrSsTtVvXxYy]\d[A-Za-z]\s?\d[A-Za-z]\d)$/);
				};
				var codeUNDEFINED = function(){
					return that.optional(element) || value.match(/^(?!0{5})(\d{5})(?!-?0{4})(-?\d{4})?$/);
				};
				
				window["eval"]("var codeHandler = (typeof code" + country + " != 'undefined') ? code"+country+": null;");
			    // call the country specific zip validation handler
				return (codeHandler && typeof codeHandler == "function" ? codeHandler() : true);
			}, app.resources["INVALID_ZIP"]);

			/**
			 * Add positive number validation method to jQuery validation plugin.
			 * Text fields must have 'positivenumber' css class to be validated as positivenumber
			 * it validates a number and throws error if it is below 0 or if it is not a number.
			 */
			jQuery.validator.addMethod("positivenumber", function(value, element) {
				if (value == '') return true;				
				return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value) && Number(value) >= 0;
			}, ""); // "" should be replaced with error message if needed
			
			// register form validator for form elements
			// except for those which are marked "suppress"
			jQuery.each(jQuery("form:not(.suppress)"), function() {
				jQuery(this).validate(app.validatorSettings);
			});
		},
		// sub namespace app.util.* contains utility functions
		util : {
			// disables browser auto completion for the given element
			disableAutoComplete : function(elemId) {
				jQuery("#"+elemId).attr("autocomplete", "off");
			},

			// trims a prefix from a given string, this can be used to trim
			// a certain prefix from DOM element IDs for further processing on the ID
			trimPrefix : function(str, prefix) {
				return str.substring(prefix.length);
			},

			// appends the parameter with the given name and
			// value to the given url and returns the changed url
			appendParamToURL : function(url, name, value) {
				var c = "?";
				if(url.indexOf(c) != -1) {
					c = "&";
				}
				return url + c + name + "=" + encodeURIComponent(value);
			},

			// dynamically loads a CSS file
			loadCSSFile : function(url) {
				var elem = document.createElement("link");
				elem.setAttribute("rel", "stylesheet");
				elem.setAttribute("type", "text/css");
				elem.setAttribute("href", url);

				if(typeof elem != "undefined") {
					document.getElementsByTagName("head")[0].appendChild(elem);
					app.util.loadedCSSFiles.push(url);
				}
			},

			// array to keep track of the dynamically loaded CSS files
			loadedCSSFiles : [],

			// removes all dynamically loaded CSS files
			clearDynamicCSS : function() {
				for(var i=0; i<app.util.loadedCSSFiles.length; i++) {
					app.util.unloadCSSFile(app.util.loadedCSSFiles[i]);
				}
			},

			// dynamically unloads a CSS file
			unloadCSSFile : function(url) {
				var candidates = document.getElementsByTagName("link");
				for(var i=candidates.length; i>=0; i--) {
					if(candidates[i] && candidates[i].getAttribute("href") != null && candidates[i].getAttribute("href").indexOf(url) != -1) {
						candidates[i].parentNode.removeChild(candidates[i]);
					}
				}
			},

			// checks if cookies are enabled
			cookiesEnabled : function() {
				
				var test_cookie_name = "dwTestCookie";
				document.cookie = test_cookie_name + "=OK";
				
				// first we'll split this cookie up into name/value pairs
				// note: document.cookie only returns name=value, not the other components
				var all_cookies = document.cookie.split( ';' );
				var temp_cookie = '';
				var cookie_name = '';
				var cookie_value = '';
				var cookie_found = false; // set boolean t/f default f

				for ( i = 0; i < all_cookies.length; i++ )
				{
					// now we'll split apart each name=value pair
					temp_cookie = all_cookies[i].split( '=' );

					// and trim left/right whitespace while we're at it
					cookie_name = temp_cookie[0].replace(/^\s+|\s+$/g, '');

					// if the extracted name matches the session cookie name 
					if ( cookie_name == test_cookie_name )
					{
						// we need to handle case where cookie has no value but exists (no = sign, that is):
						if ( temp_cookie.length > 1 )
						{
							cookie_value = unescape( temp_cookie[1].replace(/^\s+|\s+$/g, '') );
						}

						if (cookie_value.length > 0)
						{
							cookie_found = true;
							document.cookie = test_cookie_name +"=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
							break;
						}
					}
					temp_cookie = null;
					cookie_name = '';
				}
				return cookie_found;
			},
			
			/**
			 * IE 6 multiple button submit issue work around.
			 * when a form has multiple buttons of submit type, then IE 6 submits all of them
			 * whenever form is submitted. e.g. Remove on cart page would remove the wrong item
			 * (always first item in the cart) because IE 6 submits all form data which includes all 
			 * remove links!!!
			 * the workaorund is to disable all buttons except the one which is being clicked.
			 * it should only be called for IE 6 (check out htmlhead.isml for usage)
			 */
			ie6ButtonFix: function() {
				jQuery('button').click(function(){
		        	// disable all buttons
		        	jQuery(this.form).find('button').attr("disabled", true);
		        	// enable the one being clicked
		            jQuery(this).attr("disabled", false);
			    });
			}
		},
		init : function() {
			jQuery(document).ready(function() {
				//something
			});
		},


	}
})(jQuery);



// application initialization on dom ready
jQuery(document).ready(function(){
	app.init();
	app.validator();
});


function createCookie(name,value,days) {
    if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/"; }

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}