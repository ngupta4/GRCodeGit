/*
 * All java script logic for the application.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 */

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


		// app initializations called from jQuery(document).ready at the end of the file
		init: function() {

			// execute unobtrusive js code
			this.execUjs();
			
			
		},
	
		// sub namespace app.ajax.* contains application specific ajax components
		ajax: {
			Success: "success",
			currentRequests: {}, // request cache

			// ajax request to get json response
			// @param - reqName - String - name of the request
			// @param - async - boolean - asynchronous or not
			// @param - url - String - uri for the request
			// @param - data - name/value pair data request
			// @param - callback - function - callback function to be called
			getJson: function(options) {
				var thisAjax = this;

				// do not bother if the request is already in progress
				// and let go null reqName
				if (!options.reqName || !this.currentRequests[options.reqName]) {
					this.currentRequests[options.reqName] = true;
					if(options.async == "undefined") options.async = true;
					// make the server call
					jQuery.ajax({
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						url		: options.url,
						cache	: true,
						async	: options.async,
						data	: options.data,

						success: function(response, textStatus) {
							thisAjax.currentRequests[options.reqName] = false;

							if (!response.Success) {
								// handle failure
							}

							options.callback(response, textStatus);
						},

						error: function(request, textStatus, error) {
							if (textStatus === "parsererror") {								
								alert(app.resources["BAD_RESPONSE"]);
							}
							
							options.callback({Success: false, data:{}});
						}
					});
				}
			},

			// ajax request to load html response in a given container
			// @param - reqName - String - name of the request
			// @param - url - String - uri for the request
			// @param - data - name/value pair data request
			// @param - callback - function - callback function to be called
			// @param - selector - string - id of the container div/span (#mycontainer) - it must start with '#'
			load: function(options) {

				var thisAjax = this;

				// do not bother if the request is already in progress
				// and let go null reqname
				if (!options.reqName || !this.currentRequests[options.reqName]) {
					this.currentRequests[options.reqName] = true;
					// make the server call
					jQuery.ajax({
						dataType: "html",
						url		: options.url,
						cache	: true,
						data	: options.data,

						success: function(response, textStatus) {
							thisAjax.currentRequests[options.reqName] = false;
							
							if (options.selector) {
								jQuery(options.selector).html(response);
							}

							(options.callback != undefined ? options.callback(response, textStatus): null)
						},

						error: function(request, textStatus, error) {
							if (textStatus === "parsererror") {								
								alert(app.resources["BAD_RESPONSE"]);
							}

							options.callback(null, textStatus);
						}
					});
				}
			}
		},

	
		/**
		 * Unobtrusive js api calls go here.
		 */
		 execUjs: function() {
			
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
				var currentCookie = document.cookie;
				document.cookie = "Enabled=true";
				var cookieValid = document.cookie;
				var result = false;

				if(cookieValid.indexOf("Enabled=true") != -1) {
					result = true;
				}

				document.cookie = currentCookie;
				return result;
			}
		}
	}
})(jQuery);

// application initialization on dom ready
jQuery(document).ready(function(){
	app.init();
});
