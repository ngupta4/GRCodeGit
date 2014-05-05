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
		containerId		: "content",
		ProductCache	: null,  // app.Product object ref to the current/main product
		clearDivHtml	: "<div class=\"clear\"><!-- W3C Clearing --></div>",
		currencyCodes	: {}, // holds currency code/symbol for the site

		// default dialog box settings
		dialogSettings: {
				bgiframe: true, // this is required mainly for IE6 where drop downs bleed into dialogs!!! it depends on 
				autoOpen: false,
				buttons: {},
				modal: true,
				overlay: {
		    		opacity: 0.5,
		     		background: "black"
				},
		    	height: 530,
		    	width: 800,
		    	title: '',
		    	// show: "slow", This is causing dialog to break in jquery 1.3.2 rel, show: "slide" works but not desired
		    	hide: "normal",
		    	resizable: false,
				open: function(event, ui) {
			        window.setTimeout(function() {
			            jQuery(document).unbind('mousedown.dialog-overlay')
			                            .unbind('mouseup.dialog-overlay');
			        }, 100);
			    },
			    modal: true
		},

		// default tooltip settings
		tooltipSettings: {
				delay: 0,
				showURL: false,
				extraClass: "tooltipshadow tooltipshadow02",
				top: 15,
				left: 5
		},

		// global form validator settings
		validatorSettings: {
			errorClass : 'errormessage',
			errorElement: 'span',
			
		    onfocusout: function(element) {
				if ( !this.checkable(element) ) {
					this.element(element);
				}				
			}
		},

		// app initializations called from jQuery(document).ready at the end of the file
		init: function() {
			// register initializations here
			
			// quick view dialog div
			//jQuery("<div/>").attr("id", "QuickViewDialog").html(" ").appendTo(document.body);
			
			// bonus product dialog div
			//jQuery("<div/>").attr("id", "BonusProductDialog").html(" ").appendTo(document.body);

			// micicart object initialization
			this.minicart.init();
			
			// execute unobtrusive js code
			this.execUjs();
			
			//detect flash for older videos
			//-------commented due to missing library: SWFObject
			//this.flashDetectLegacy();
			
			// renders horizontal/vertical carousels for product slots
		/*	jQuery('#horicarousel').jcarousel({
	        	scroll: 1,
				itemVisibleInCallback: app.captureCarouselRecommendations
		    });

		    jQuery('#vertcarousel').jcarousel({
		        scroll: 1,
				vertical: true,
				itemVisibleInCallback: app.captureCarouselRecommendations
		    });
		    */
		    
		},
		
		/* 
		 * This method is for invoking the Ajax request
		 * for getting the Authenticity of the current user.
		 */
		isCustomerSessionActive : function() {
			
			var resp;
			jQuery.ajax({
		    	url: app.URLs.sessionActive,
		    	contentType: "application/json; charset=utf-8",
				dataType: "json",
		    	type: "GET",
	            async: false,
			    cache: false,
	            success: function(data) {
	            	resp = data;
					//response(data);
	            },
	            error: function(xhr, txtStatus, e) {
	            	//Displaying error if ajax processing failed
	            	alert("Unable to process your request.");
	         	}
	         });
			return resp;
		},
		
		/**
		 * This method is for display the login popup
		 * when user is semi logged in 
		 */
		displayLogin : function(targetPipeline) {
			
			jQuery("#checkoutlogincontent").remove();
	    	jQuery(document.body).append("<div id=\"checkoutlogincontent\"></div>");
	    	
	    	//Building the url
	    	var loginUrl = app.URLs.divLogin;	    	
	    	if(window.location.protocol=="https:"){
	    		loginUrl = app.URLs.securedivLogin;
	    	}
	    	
	    	loginUrl = app.util.appendParamToURL(loginUrl, "pageName", targetPipeline);
	    	//alert(loginUrl);
	    		
	    	var el = document.createElement("iframe");
	    		el.setAttribute('id', 'checkoutlogin');
	    		el.setAttribute('width', '605');
	    		el.setAttribute('height', '312');
	    		el.setAttribute('frameborder', 0);
	    		el.setAttribute('src', loginUrl);
	    		
	    	jQuery('#checkoutlogincontent').append(el);	
	    	jQuery('#checkoutlogincontent').dialog({
	    		  title: "YOU ARE NOT LOGGED IN",
	    		  width: 690,
	    	      height: 420,
	    	      modal: true,
	    	      closeOnEscape: false,
	    	      overlay: {
	    	      	opacity: 0.5,
	    	          background: "black"
	    	      },
	    	      close: function(event, ui){
	    	    	  /* 
	    	    	   * If close button is clicked from the cart checkout
	    	    	   * flow, it will redirect the user to cart page.
	    	    	   */
	    	    	  
	    	    	  //app.resources["PAGE_NAME"] == "CARTPAGE"
	    	    	  if(app.resources["PAGE_NAME"] == "SHIPPINGPAGE"
	    	    		 || app.resources["PAGE_NAME"] == "BILLINGPAGE"
	    	    		 || app.resources["PAGE_NAME"] == "ORDERREVIEWPAGE"){
	    	    		  
	    	    		  //Redirecting to the cart page
	    	    		  window.location.href=app.URLs.CartShow;
	    	    	  }
	              },
	    	      open: function(event, ui){
	    	    	  $("#ui-dialog-title-checkoutlogincontent").hide();
	    	    	  $(".ui-dialog-titlebar-close").css({'right':'3px','top':'13px'});
	    	    	 // $(".ui-dialog").find("div.ui-dialog-titlebar").hide();
	    	    	  //$(".ui-dialog").find("div.ui-dialog-titlebar").find("a.ui-dialog-titlebar-close").hide();
	              }
	    	});
		},
		
		/*
		 * 
		 * Checks flash player version on browser, and disables dynamic-embedding video links
		 * (see before-after gallery page for examples)
		 * 
		 * returns: false if flashplayer version < 9, true otherwise.
		 * 
		 */
		flashDetectLegacy : function() {
			
			//remove no JS messages
			//var noJSContainers = $A($$('div.noJSMessage'));
			//var noJSText = $A($$('div.noJS'));					
			//var noJSMessages = $A(noJSContainers.concat(noJSText));		
			
			//noJSMessages.each(function(message){
			//	$(message).remove();
			//});
			
			//var inq = jQuery('inqC2CImgContainer');
			var flashInstance = jQuery('div.addVideo');	
					
			var player =  new SWFObject;
			var majorVer = player.installedVer.major;		
					
			var	message = "<p>Please upgrade your browser's Flash Player.</p>";
			var	link = "<a class='btnFlash' target='_blank' href='http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash'>Download Flash</a>";
		
			if(majorVer < 9){ 
			//if(majorVer == 9 || majorVer == 0){ /*for local testing only*/

				//if there is click to chat remove it
				//if(inq)	jQuery(inq).remove();
				
				//if there is a video player, swap stuff out to switch to non-Flash mode
				if(flashInstance) {
					jQuery('div.addVideo').each(function(){			
						jQuery(this).removeClass('addVideo');					
						
						//removes change video link from home logged-in player
						if(jQuery('.changeVideo')) jQuery('.changeVideo').parent().remove();				
						
						//changes video innerHTML to be new image and link
						jQuery(this).html("<div class='noFlashOverlay'></div><div class='noFlash'>" + message + link + "</div>" + jQuery(this).html());								
						
			   		});			
				}
				
				//flash version incompatible
				return false;
			}
			
			return true;
			
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
					if(options.cache == "undefined") options.cache = true;
					// make the server call
					jQuery.ajax({
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						url		: options.url,
						cache	: options.cache,
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
		
		accordion : {
			init: function(selector, header){
				var $accordions = jQuery( selector );

			    $accordions.accordion({
			        collapsible: true,
			        autoHeight: false,
			        active: false,
			        header: header
			    });
			},
			
			 // Get current expanded elements
		    // accordion("option", "active") - works wrong
			accordionActive: function ($accordion){
		        return $accordion.find(".ui-accordion-header").index($accordion.find(".ui-state-active"));
		    },

			expandAccordion: function ($folder){
		        
		        if($folder.hasClass("ui-accordion-header")){
		            $folder = $folder.next();
		        }if(!$folder.hasClass("ui-accordion-content")){
		            $folder = $folder.parents(".ui-accordion-content:first");
		        }
		        
		        var $parents = $folder.parents('.ui-accordion');
		        
		        for(var i = 0; i < $parents.length; i++){
		            var $parent = jQuery($parents[i]);
		            var index = $folder.parents(".ui-accordion:first").find('.ui-accordion-content').index($folder);
		            
		            
		            var currentlyActive = this.accordionActive($parent);
		            if(currentlyActive !== index){
		                $parent.accordion("activate", index);
		            }

		            $folder = $parent.parents(".ui-accordion-content:first");
		            
		        }
		    }
		},

		// loads a product into a given container div
		// params
		// 		containerId - id of the container div, if empty then global app.containerId is used
		//		source - source string e.g. search, cart etc.
		//		label - label for the add to cart button, default is Add to Cart
		//		url - url to get the product
		//		id - id of the product to get, is optional only used when url is empty
		getProduct: function(options) { // id, source, start
			var cId 		= options.containerId || app.containerId;
			var source 		= options.source || "";
			var a2cBtnLabel = options.label || null;

			// show small loading image
			jQuery("#"+cId).html(app.showProgress("productloader"));

			var productUrl = options.url ? options.url : app.util.appendParamToURL(app.URLs.getProductUrl, "pid", options.id);
						
			productUrl = app.util.appendParamToURL(productUrl, "source", source);

			app.ajax.load({selector: "#"+cId, url: productUrl, callback: function(responseText, textStatus){
				// update the Add to cart button label if one provided
				(a2cBtnLabel != null ? jQuery("#"+cId+" .addtocartbutton:last").html(a2cBtnLabel) : '');
			}});
		},

		// sub name space app.minicart.* provides functionality around the mini cart
		minicart: {
			url   : '',  // during page loading, the Demandware URL is stored here
			timer : null, // timer for automatic close of cart item view
			selectSelected : 0, // prevent the object from hiding if hovering over the qty selects, mostly an IE problem
			
			// initializations
			init: function() {
				// reset all the existing event bindings
				app.minicart.reset();
				jQuery('select').hover(function(){
					app.minicart.selectSelected = 1;
				},function(){
					//app.minicart.selectSelected = 0;
				})
				.blur(function(){
					app.minicart.selectSelected = 0;
				})
				.change(function(){
					app.minicart.selectSelected = 0;
				});
				// bind hover event to the cart total link at the top right corner
				jQuery(".minicarttotal").hover(function(e){(app.minicart.isShow() ? '': app.minicart.slide());});
			
				jQuery('.minicartcontent').mouseenter(function(e) {
					clearTimeout(app.minicart.timer);
					app.minicart.timer = null;
				
				}).mouseleave(function(e) {
					clearTimeout(app.minicart.timer);
					app.minicart.timer = null;
					// after a time out automatically close it
					app.minicart.timer = setTimeout( 'app.minicart.close()', 1000 );
				});

				// register close button event
				jQuery('.minicartcontent .minicartclose').click(function() {
					// reset all the events bindings
					app.minicart.reset();
					app.minicart.close(0);
				});
			},
			
			// returns a boolean if a minicart is visible/shown or hidden
			isShow: function() {
				return jQuery('.minicartcontent').css('display') == 'none' ? false : true;
				
			},
			
			// reset minicart
			reset: function() {
				jQuery(".minicarttotal").unbind("hover");
				jQuery('.minicartcontent').unbind("mouseenter").unbind("mouseleave");
				jQuery('.minicartcontent .minicartclose').unbind("click");
			},

			// shows the given content in the mini cart
			show: function(html) {
				jQuery('#minicart').html(html);
				
				// bind all the events
				app.minicart.init();
				
				if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
					// do nothing
					// the hook 'MiniCart.suppressSlideDown()' should have done the refresh
				}
				else {
					app.minicart.slide();
				}
			},
			
			// slide down and show the contents of the mini cart
			slide: function() {
				if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
					return;
				}
				// show the item
				jQuery('.minicartcontent').slideDown('slow',function(){
					jQuery('#minicart').addClass('showMiniCart');
				});//show("slide", { direction: "up" }, 1000);
				
				clearTimeout(app.minicart.timer);
				app.minicart.timer = null;
					
				// after a time out automatically close it
				app.minicart.timer = setTimeout( 'app.minicart.close()', 6000 );
				
			},

			//add product from clp with quantity 1
			addFromCLP: function(productID, availability, showUpsell){
				app.minicart.addFromCLPWithQuantity(productID, availability, showUpsell, 1);// quantity is fixed as user is not allowed to change it on Category Landing Page
				jQuery('#minicartOuter').addClass('minicartOuter');
			},
			
			update: function(postdata)
			{
				// get the data of the form as serialized string
				var postdata = postdata;

				var previousImageSrc = null;

				// handles successful add to cart
				var handlerFunc = function(req)	{

						// replace the content
						jQuery('#minicart').html(req);
						// bind all the events
						app.minicart.init();
						if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
							// do nothing
							// the hook 'MiniCart.suppressSlideDown()' should have done the refresh
						}
						else {
							app.minicart.slide();
							//if (typeof(callback) != undefined) callback();
						}
						
						// fire the BonusDiscountLineItemCheck event so we can check if there is a bonus discount line item
						jQuery(document).trigger(jQuery.Event("BonusDiscountLineItemCheck"));
					
					}
				// handles add to cart error
				var errFunc = function(req) {
				}

				// closes a previous mini cart
				app.minicart.close();
				
				// add the product
				jQuery.ajax({
								type	: "POST",
								url		: app.minicart.updateUrl,
								cache	: true,
								data	: postdata,
								success	: handlerFunc,
								error	: errFunc
							});
			},
			
			
			//Add product from CLP with quantity passed as argument
			addFromCLPWithQuantity: function(productID, availability, showUpsell, quantity){
				
				if(productID == null){
					alert("The following product is currently not available");
					return;
				}
				
				//upsell dialog will be shown only if product is a kit/combo. and user had not opted for not showing upsell
				if(null == readCookie('dontshowupsell') && showUpsell == "true" && availability == "true"){
					app.minicart.showUpsellDialog(productID,quantity);
				}else if(availability == "true"){
					s.linkTrackVars='events';
					s.linkTrackEvents='scAdd';
				    s.events="scAdd";
				    s.tl(this,'o',"add product");
					jQuery.ajax({
						type	: "POST",
						url		: app.minicart.url,
						cache	: true,
						data	: {"pid": productID, "Quantity": quantity},
						success	: function(response) {
							//Displaying the minicart
							app.minicart.show(response);
							
							/*
							 * If product is added from the cart page
							 * then refresh the cart page
							 */
							//alert(app.resources["PAGE_NAME"]);
							if(app.resources["PAGE_NAME"] == "CARTPAGE"){
								//Refreshing the page
								jQuery(document).trigger("refreshCart");
							}
			            },
			            error: function(xhr, txtStatus, e) {
			            	//Displaying error if ajax processing failed
			            	alert("Unable to process your request");
			         	}
					});
				}else{
					alert("The following product is currently not available");
				}
							
				
			},
			
			//to show upsell dialog
			showUpsellDialog: function(productID, quantity){
				if (jQuery("#upSellrecommendation").length == 0) {
					jQuery("<div/>").attr("id", "upSellrecommendation").appendTo(document.body);
				}
				jQuery("#upSellrecommendation").empty();
			  	app.createDialog({id: 'upSellrecommendation', options: {
									bgiframe: true,
									autoOpen: false,
									modal: true,
									overlay: {
							    	opacity: 0.5,
							     	background: "black"
									},
							    	height:530,
							    	width:817,
							    	//title:'Upsell Recommendation',
							    	resizable: false
								}});
					jQuery('#upSellrecommendation').dialog('open');
					
					var upsellurl=app.util.appendParamToURL(app.minicart.showupsell, "pid", productID);
					upsellurl=app.util.appendParamToURL(upsellurl ,"quantity",quantity);
					jQuery("#upSellrecommendation").html(app.showProgress("productloader"));
					app.ajax.load({selector: "#upSellrecommendation", url: upsellurl });
			},
			
			
			
			
			
			//Add product from Upsell, with quantity passed as argument 
			addUpsellProduct: function(productID, availability, quantity){
				app.minicart.addFromCLPWithQuantity(productID, availability, false, quantity);
				app.minicart.closeUpsellDialog();
			},
			
			closeUpsellDialog: function(){
				jQuery('#upSellrecommendation').dialog('close');
			},
			
			
			// adds a product to the mini cart
			// @params
			// progressImageSrc - source/url of the image to show when the item is being added to the cart
			// postdata - form data containing the product information to be added to mini-cart
			// callback - call back function/handler
			add: function(progressImageSrc, postdata, callback)
			{
				// get the data of the form as serialized string
				var postdata = postdata;

				// get button reference
				var addButtons = [];

				// the button to update
				var addButton = null;
				
				// it is an array of buttons, but we need only one all
				// other combinations are strange so far
				if (addButtons.length == 1)	{
					addButton = addButtons[0];
				}

				var previousImageSrc = null;

				// show progress indicator
				if (addButton != null) {
					previousImageSrc = addButton.src;
					addButton.src = progressImageSrc;
				}

				// handles successful add to cart
				var handlerFunc = function(req)	{
					// hide progress indicator
					if (addButton != null) {
						addButton.src = previousImageSrc;
					}

					// replace the content
					jQuery('#minicart').html(req);

					// bind all the events
					app.minicart.init();

					if(app.minicart.suppressSlideDown && app.minicart.suppressSlideDown()) {
						// do nothing
						// the hook 'MiniCart.suppressSlideDown()' should have done the refresh
					}
					else {
						app.minicart.slide();

						if (callback) callback();
					}
					
					// fire the BonusDiscountLineItemCheck event so we can check if there is a bonus discount line item
					jQuery(document).trigger(jQuery.Event("BonusDiscountLineItemCheck"));
				}

				// handles add to cart error
				var errFunc = function(req) {
					// hide progress indicator
					if (addButton != null) {
						addButton.src = previousImageSrc;
					}				}
				
				// closes a previous mini cart
				app.minicart.close();
				//show the uspell modal else just add the product to kit.
				if (null == readCookie('dontshowupsell') && (postdata.upsell=="true")){
					
					app.minicart.showUpsellDialog(postdata.pid, postdata.Quantity);		
					if (callback) callback();
				}else{
				// add the product
				jQuery.ajax({
								type	: "POST",
								url		: app.minicart.url,
								cache	: true,
								data	: postdata,
								success	: handlerFunc,
								error	: errFunc
							});
				}
			},

			// closes the mini cart with given delay
			close: function(delay) {
				if ( app.minicart.timer != null || delay == 0) {
					clearTimeout( app.minicart.timer );
					app.minicart.timer = null;		
					jQuery('.minicartcontent').fadeOut(); // hide with "slide" causes to fire mouse enter/leave events sometimes infinitely thus changed it to fadeOut
					jQuery('#minicartOuter').removeClass('minicartOuter');
					jQuery('#minicart').removeClass('showMiniCart');
				}
			},

			// hook which can be replaced by individual pages/page types (e.g. cart)
			suppressSlideDown: function() {
				return false;
			}
		},

		// close quick view dialog if open and refresh the page
		refreshCart: function() {
			app.quickView.close();

			// refresh without posting
			location.href = location.href;
		},

		// Product quick view object
		quickView: {
			// bind browser events
			// options
			// buttonSelector - css selector for the quickview button
			// imageSelector - css selector for product image
			// buttonLinkSelector - css selector for quickview button link (a tag)
			// productNameLinkSelector - css selector for product name link (a tag)
			bindEvents: function(options) {
				// hide quickview buttons
				jQuery(options.buttonSelector).hide();

				// hovering
				jQuery(options.imageSelector).hover(
					function(e) {
						jQuery(this).children(options.buttonSelector).show();
						return false;
					},
					function(e) {
						jQuery(this).children(options.buttonSelector).hide();
						return false;
					}
				);

				// click binding for quick view
				jQuery(options.buttonLinkSelector).click(function(e) {
					app.quickView.show({url: this.href, source: "quickview"});
					return false;
				});

				/*
				To make bookmarking and browser back-button work correctly the browser URL needs 
				to change. To force that change we do a full-page load (not AJAX) when going from 
				search result page to product detail page.
				The implementation supports loading the product detail content with AJAX: just 
				uncomment this code block to bind the event handler.
				
				// click binding for name link
				if(options.productNameLinkSelector) {
					jQuery(options.productNameLinkSelector).click(function(e) {
						app.getProduct({url: this.href, source: "search"});
						return false;
					});
				}
				*/
			},

			// show quick view dialog and send request to the server to get the product
			// options.source - source of the dialog i.e. search/cart
			// options.url - product url
			show: function(options) {
				app.createDialog({id: 'QuickViewDialog', options: {
			    	width: 856,
			    	dialogClass: 'quickview',
			    	title: '',
			    	position: "center",
			    	resizable: false
				}});
				jQuery("#QuickViewDialog").parent().css('background','none');
				jQuery("#QuickViewDialog").parent().css('position', 'Fixed').end().dialog('open');
				//var windowheigh= jQuery(window).height()/2 -265
				//jQuery("#QuickViewDialog").parent().css('top',parseInt(windowheigh)+'px').end().dialog('open');
				//jQuery("#QuickViewDialog").addClass('ui-corner-all');	
			//	var windoWidth= jQuery(window).width()/2-400
				//jQuery("#QuickViewDialog").parent().css('left',parseInt(windoWidth)+'px').end().dialog('open');
				jQuery("#QuickViewDialog").parent().css('top','10%').end().dialog('open');
				var objtitle= jQuery("#QuickViewDialog").siblings('.ui-dialog-titlebar');
				objtitle.find('.ui-dialog-titlebar-close').addClass('quickViewDialog-close').removeClass('ui-dialog-titlebar-close');
				jQuery('#QuickViewDialog').dialog('open');
				jQuery("#QuickViewDialog").css('min-height','488px');
			    app.getProduct({containerId: "QuickViewDialog", source: options.source, url: options.url, label: options.label});
			    window.onresize = function() {
			    	var windoWidth= jQuery(window).width()/2-400
					jQuery("#QuickViewDialog").parent().css('left',parseInt(windoWidth)+'px');
			    }
			},
			// close the quick view dialog
			close: function() {
				jQuery('#QuickViewDialog').dialog('close');
			}
		},
		
		// Bonus product view object
		bonusProductsView: {
			// show bonus product view dialog and send request to the server to get the 
			// bonus products
			// options.url - bonus product url
			show: function(options) {
				app.createDialog({id: 'BonusProductDialog', options: {
			    	height: 530,
			    	width: 800,
			    	dialogClass: 'quickview',
			    	title: 'Select Bonus Products',
			    	resizable: false
				}});
				
			    jQuery('#BonusProductDialog').dialog('open');	
			    jQuery("#" + "productresultarea").hide();
				app.ajax.load({selector: "#BonusProductDialog", url: options.url, callback: function(responseText, textStatus){
					
				}});				
			},
			// close the quick view dialog
			close: function() {
				jQuery('#BonusProductDialog').dialog('close');
			}
		},

		// helper method to create a dialog with the given options
		// options - dialog box options along with id of the container
		createDialog: function(options) {
			jQuery('#'+options.id).dialog(jQuery.extend({}, app.dialogSettings, options.options));
		},

		// shows tooltip popup
		// options
		// id - id of the container
		// options - tooltip popup options
		tooltip: function(options) {
			if (options.id.charAt(0) !== '#') {
				options.id = "#"+options.id;
			}
			jQuery(options.id).tooltip(jQuery.extend({}, app.tooltipSettings, options.options));
		},
		
		/**
		 * Unobtrusively build tooltips on the page.
		 * it looks for a tooltip class anchor which contains a div with tooltip-body class as the body container.
		 */
		
		// renders a progress indicator on the page; this function can be used
		// to indicate an ongoing progress to the user; the optional parameter "className"
		// can be used to attach an additional CSS class to the container
		showProgress : function(className) {
			var clazz = "loading";
			if (className) clazz += " " + className;
			return jQuery("<div class=\"" + clazz + "\"/>").append(jQuery("<img/>").attr("src", app.URLs.loadingSmallImg));
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
							phone_number.match(/^(\+?1[\-\.\s]?)?\(?(\d{3})\)?[\-\.\s]?(\d{3})[\-\.\s]?(\d{4})(.*)/);
					}
				
				eval("var phoneHandler = (typeof phone" + country + " != 'undefined') ? phone"+country+": null;");
				
			    // call the country specific phone validation handler
				return (phoneHandler && typeof phoneHandler == "function" ? phoneHandler() : true);
			}, app.resources["INVALID_PHONE"]);
			
			/**
			 * Add Age validation method to jQuery validation plugin.
			 */
			jQuery.validator.addMethod("age", function(value, element) {
				var ageregexp = /^[-]{0}\b(9|[1-9][0-9]|99)\b/;
				if (this.optional(element) && value == ''){
					return true;
					}
				return this.optional(element) || value.match(ageregexp);
			}, app.resources["INVALID_AGE"]);
			
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
			
			jQuery.validator.addMethod("routing", function(value, element) {				
				var routingregexp = /^[0-9]{9}$/;
				if (this.optional(element) && value == ''){
					return true;
				}
				
				return this.optional(element) || value.match(routingregexp);
				
			}, app.resources["INVALID_ROUTING"]);
			
			jQuery.validator.addMethod("account", function(value, element) {
				var accountregexp = /^[0-9]{4,17}$/;
				var maskedaccregexp = /^((\*?\**)(\d{4}))$/;
				if (this.optional(element) && value == ''){
					return true;
				}if(!value.match(accountregexp) && value.match(maskedaccregexp)){
					return true;
				}
				return this.optional(element) || value.match(accountregexp);
			}, app.resources["INVALID_ACCOUNT"]);
			
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

		/**
		 * grab anything inside a hidden dom element and append it to its immediate previous sibling
		 * as data attribute i.e. jQuery().data("data", hiddenStr)
		 * if the hidden data specifies json in the class then this routine would attempt to 
		 * convert the hidden data into json object before adding it as data attribute.
		 * after adding the data, the hidden span/element is removed from the DOM.
		 */
		hiddenData : function() {
			jQuery.each(jQuery(".hidden"), function() {
				var hiddenStr = jQuery(this).html();
				
				if (hiddenStr === "") {
					return;
				}
				
				// see if its a json string
				if (jQuery(this).hasClass("json")) {
					// try to parse it as a json
					try {
						hiddenStr = window["eval"]("(" + hiddenStr + ")");
					}
					catch(e) {}				
				}
				
				jQuery(this).prev().data("data", hiddenStr);
				
				jQuery(this).remove();
			});
		},
		
		/**
		 * Process country drop downs and attach a change listener so that phone field 
		 * can be validated properly based on the currently selected country.
		
		addCountryListener: function() {
			var countryHandler = function(e) {
				var selectedCountry = this.options[this.selectedIndex].value;
				// for each field of type phone in the current form, set its country as a data attribute
				// to be used while doing phone field validatiaon see app.validator addMethod.
				jQuery(this).parents("form:first").find("input.phone").each(function() {
					var data = jQuery(this).data("data");
					var currentData = (data && typeof data == 'object') ? data : {};
					currentData.country = selectedCountry;
					jQuery(this).data("data", currentData);
				});						
			}
			jQuery("select.country").change(countryHandler).each(countryHandler);
		}, */
		
		/**
		 * Unobtrusive js api calls go here.
		 */
		 execUjs: function() {
			// make global nav drop downs with superfish jquery plugin
			//jQuery('.categorymenu ul').addClass('sf-menu');			
			//jQuery('ul.sf-menu').superfish({autoArrows	: false, dropShadows : false}).find('ul').bgIframe();
			
			// process hidden data in the html markup and cnnvert it into data object(s)
			//this.hiddenData();
			
			// initialize form validator plugin
			this.validator();
			
			// process country form fields and attach listeners
			//this.addCountryListener();
			
			// process tooltips on the page
			//this.tooltipDefault();
		},
		
		// capture recommendation of each product when it becomes visible in the carousel
		captureCarouselRecommendations : function(c, li, index, state) {
			jQuery(li).find(".captureproductid").each(function() {
				dw.ac.capture({id:this.innerHTML, type:dw.ac.EV_PRD_RECOMMENDATION});
			});
		},

		//methods related for acquisition sas page
		sas : {
			
			selectFragrance : function(selectedOption){
			
				var parent = selectedOption.parent();
				jQuery(parent.parent()).find("li").removeClass("selected");
				parent.addClass("selected");
			},
		
			//this method is called from sas page tabs.
			addFragranceFromTab : function(orderButtonRef){
				var parentObj = jQuery(".theKits ."+jQuery(orderButtonRef).parent() .parent().attr("id"));
				app.sas.getValuesAndHitUrl( parentObj);
			},
			
			addFragrance : function(orderButtonRef){
				var parentObj = jQuery(orderButtonRef).parent().parent();
				app.sas.getValuesAndHitUrl( parentObj);
			},
			
			//this method will be called from old sas page.
			addFragranceFromOldSAS : function(orderButtonRef){
				var parentObj = jQuery(orderButtonRef).parent().parent().parent();
				app.sas.getValuesAndHitUrl( parentObj);
			},
			
			
			//this method will get the fragrance and kit frequency. After that hits a url for adding it to kit. 
			getValuesAndHitUrl : function(parentObj){
				
				  var fragUl = parentObj.find('.fragranceul');
				  var fragVal=  fragUl.find('li.selected').attr('val');
				  var masterpid =  parentObj.find('.kitselectionul li.selected').attr('masterID');
				  if(null == masterpid)
				  {
					  masterpid =  fragUl.attr('masterID');
				  }
				  var url = app.util.appendParamToURL(app.URLs.AcqKit, 'masterPID',masterpid);
				  window.location.href = app.util.appendParamToURL(url, 'fragVal',fragVal);
			}
		},
		
		// sub namespace app.producttile.* contains utility functions for product tiles
		producttile : {
			// initializes all product tiles contained in the current page
			initAll: function() {
				// bind quick view button toggling and click
				var quickViewOptions = {
					buttonSelector: "div.quickviewbutton",
					imageSelector: ".producttile div.productImage",
					buttonLinkSelector: ".producttile div.quickviewbutton a"
				};
				app.quickView.bindEvents(quickViewOptions);
				
				// prepare swatch palettes and thumbnails
				jQuery("div.producttile div.swatches div.invisible").hide();
				jQuery("div.producttile div.swatches a.swatch img.hiddenthumbnail").hide();
				
				// show the palette
				jQuery("div.producttile div.swatches > a").click(function(e) {
					var cont = jQuery(this).parent().find("div.palette");
					cont.show().focus();
					return false;
				});
				
				// hide the palette
				jQuery("div.producttile div.swatches div.invisible").mouseout(function(e) {
					// fix for event bubbling (http://www.quirksmode.org/js/events_mouse.html)
					if(!e) var e = window.event;
					var tg = (window.event) ? e.srcElement : e.target;
					if(tg.nodeName != 'DIV') return;
					var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
					while(reltg != tg && reltg.nodeName != 'BODY')
						reltg = reltg.parentNode
					if (reltg == tg) return;
					
					// mouseout took place when mouse actually left layer
					// handle event now
					jQuery(this).hide();
					return false;
				});
				
				// thumb nail toggling
				jQuery("div.producttile div.swatches div.palette a.swatch").bind("mouseover mouseout", function(e) {
					var swatch = jQuery(this);
					app.producttile.toggleVariationThumbnail(swatch);
				});
				
				// color swatch selection
				jQuery("div.producttile div.swatches div.palette a.swatch").click(function(e) {
					var swatch = jQuery(this);
					app.producttile.selectVariation(swatch);
					// omit following the swatch link
					return false;
				});
				
				
				jQuery("#content div.swatches div.swatchesDisplay a.swatchanchor").click(function(e) {
					var swatch = jQuery(this);
					app.producttile.selectVariation(swatch);
					// omit following the swatch link
					return false;
				});
			},

			// selects a certain variation in a product tile, replaces the current image with
			// the correct variation image, changes the link to the detail
			// page and the quick view
			selectVariation : function(swatch) {
				// get the new and the original image
				var currentImg = jQuery(swatch.parents()[3]).find(".productImage img");
				var newImg = swatch.children("img.hiddenthumbnail");
				if(!currentImg || !newImg) return;
				
				// get the anchors
				var nameAnchor = swatch.parents(".producttile").find(".name a");
				var quickViewAnchor = swatch.parents(".productImage").find(".quickviewbutton a");
				var imageAnchor = swatch.parents(".producttile").find(".productImage a");
				
				// change the link url to the detail page and quick view
				var newUrl = swatch.attr("href");
				nameAnchor.attr("href", newUrl);
				quickViewAnchor.attr("href", newUrl);
				imageAnchor.attr("href", newUrl);
				
				// remove all current markers
				jQuery(swatch.parents()[0]).find("li").removeClass("selected");
				
				// mark swatch as selected
				swatch.addClass("selected");
				
				//if addtokit is true for selected variant, then addtokit button will be displayed. otherwise it will be hidden.
				if( swatch.parents('li').attr('lang') == "addtokit"){
					nameAnchor.parents('.white-bg').find('.kitdisplay').css('display','Block');
					nameAnchor.parents('.white-bg').find('.kitpricevalue').text(swatch.parents('li').attr('kitprice'));
				}else{
					nameAnchor.parents('.white-bg').find('.kitdisplay').css('display','none');
				}
				
				nameAnchor.parents('.white-bg').find(".regularpricevalue").text(swatch.parents('li').attr('regprice'));
				nameAnchor.parents('.white-bg').find(".memberpricevalue").text(swatch.parents('li').attr('memprice') );
				nameAnchor.parents('.white-bg').find(".salespricevalue").text(swatch.parents('li').attr('salesprice') );
				
				// we just remove the markers at the images; the actual elements
				// are correct, since they were already swapped by mouse over
				currentImg.removeClass("temp original");
				newImg.removeClass("temp original");
			},

			// shows the thumb nail of a product; this function is used to
			// temporally display a new image and restore the original one
			toggleVariationThumbnail : function(swatch) {
				// get the new and the original image
				var currentImg = jQuery(swatch.parents()[3]).find(".productImage img");
				var newImg = swatch.children("img.hiddenthumbnail");
				if(!newImg || !currentImg) return;
				
				var selectedSwatch = jQuery(swatch.parents()[0]).find("a.selected");
				var selectedImg = selectedSwatch.children("img.hiddenthumbnail");

				// we do nothing in case the swatch is already selected
				if(swatch.hasClass("selected")) return;
				
				if(currentImg.hasClass("temp")) {
					// current image is just a temp image, restore original
					var newCopy = selectedImg.clone().show().removeClass("original hiddenthumbnail");
					currentImg.replaceWith(newCopy[0]);
				} else {
					// we create a copy of the swatch image, replace
					// the current and mark it with classes
					var newCopy = newImg.clone().show().addClass("temp").removeClass("hiddenthumbnail");
					currentImg.replaceWith(newCopy[0]);
				}
			}
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

		imgRotator : {
		
			/* EXAMPLE USE
			
			<script type="text/javascript">
			app.imgRotator.init(new Array( // images
				'img1.jpg',
				'img2.jpg'
				),
				'#billboards', // image container
				3500 // timeout
			);
			</script>
			<div id="billboards"></div>				
			
			*/
		
			timeoutVal : 2000, // default val
			timer : 0,	
			imgCount : 0,
			imgTotal : 0,
		
			init : function(imgList,containerObj,timeoutVal){
			
				var localObj = this;
			
				jQuery(document).ready(function(){			
					localObj.timeoutVal = timeoutVal;
					localObj.imgTotal = imgList.length;
					localObj.imgList = imgList;
					localObj.container = jQuery(containerObj);				
					localObj.container.html('<img src="" border="0" />');
					localObj.loadImg();
				});
			},
		
			loadImg : function(){
			
				var localObj = this;
				
				if(localObj.timer != 0) clearTimeout(localObj.timer);
		
				var currentImg = localObj.imgList[localObj.imgCount];
				localObj.imgCount++;
				if(localObj.imgCount == (localObj.imgTotal - 1)) localObj.imgCount = 0;
		
				localObj.container.css('display','none');	
				localObj.container.children('img').attr('src',currentImg);
				localObj.container.css('display','block');  // change to fadeIn() once upgraded jquery to 1.6+, current version has ie9 issues
				
				localObj.timer = setTimeout('app.imgRotator.loadImg()',localObj.timeoutVal);
			
			}
		
		},				

		// sub namespace app.dialog.* provides convenient functions to handle dialogs
		// note, that this code relies on single dialog modals (multi dialog, e.g. modal in modal is not supported)
		dialog : {
			// opens a dialog using the given url
			open : function(url, title) {
				// create the dialog container if not present already
				if(jQuery("#dialogcontainer").length == 0) {
					jQuery(document.body).append("<div id=\"dialogcontainer\"></div>");
				}

				// set a default title
				title = title || "Dialog";

				// finally load the dialog, set the dialog title
				app.ajax.load({
					selector: "#dialogcontainer",
					url: url,
					callback: function() {
						app.dialog.checkOpen();
						app.dialog.setTitle(title);
					}
				});
			},

			// initializes the dialog with common dialog actions, like closing upon canceling
			// use this function in the dialog rendering template to re-bind common actions
			// upon dialog reload
			init : function() {
				jQuery(document).ready(function() {
					// binds the action to all buttons defining an action through the "name" attribute
					jQuery("#dialogcontainer button").each(function() {
						jQuery(this).click(function() {
							var action = jQuery(this).attr("name");
							if(action) {
								app.dialog.submit(action);
							}
							return false;
						});
					});

					// cancel button binding
					jQuery("#dialogCancelBtn").click(function() {
						app.dialog.close();
						return false;
					});
				});
			},

			// sets the title of the dialog
			setTitle : function(title) {
				jQuery("#dialogcontainer").dialog("option", "title", title);
			},

			// checks, if the dialog is in the state "open" and sets the state if not presently set
			// this function is implicitly called by app.dialog.open(url, title) in order to initialize
			// the dialog properly; use this function to recover the "open" state of a dialog
			checkOpen : function() {
				if(!jQuery("#dialogcontainer").dialog("isOpen"))
				{
					jQuery("#dialogcontainer").dialog({
						bgiframe: true,
						autoOpen: false,
						modal: true,
						overlay: {
				    		opacity: 0.5,
				     		background: "black"
						},
				    	height: 425,
				    	width: 460,
				    	resizable: false
					});
					jQuery("#dialogcontainer").dialog("open");
				}
			},

			// closes the dialog and triggers the "close" event for the dialog
			close : function() {
				jQuery("#dialogcontainer").dialog("close");
				jQuery(document.body).trigger("dialogClosed");
			},

			// attaches the given callback function upon dialog "close" event
			onClose : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogClosed", callback);
				}
			},

			// triggers the "apply" event for the dialog
			triggerApply : function() {
				jQuery(document.body).trigger("dialogApplied");
			},

			// attaches the given callback function upon dialog "apply" event
			onApply : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogApplied", callback);
				}
			},

			// triggers the "delete" event for the dialog
			triggerDelete : function() {
				jQuery(document.body).trigger("dialogDeleted");
			},

			// attaches the given callback function upon dialog "delete" event
			onDelete : function(callback) {
				if(callback != undefined) {
					jQuery(document.body).bind("dialogDeleted", callback);
				}
			},

			// submits the dialog form with the given action
			submit : function(action) {
				// set the action
				jQuery("#dialogcontainer form").append("<input name=\"" + action + "\" type=\"hidden\" />");

				// serialize the form and get the post url
				var post = jQuery("#dialogcontainer form").serialize();
				var url = jQuery("#dialogcontainer form").attr("action");

				// post the data and replace current content with response content
		  		jQuery.ajax({
				   type: "POST",
				   url: url,
				   data: post,
				   dataType: "html",
				   success: function(data){
		  				jQuery("#dialogcontainer").empty().html(data);
				   },
				   failure: function(data) {
					   alert(app.resources["SERVER_ERROR"]);
				   }
				});
			}
		}
	}
})(jQuery);

// application initialization on dom ready
jQuery(document).ready(function(){
	app.init();
	var quickViewOptions = {
			buttonSelector: " div.quickviewbutton",
			imageSelector: "div.product div.productImage",
			buttonLinkSelector: " div.quickviewbutton a",
			productNameLinkSelector: "div.product div.name a"
		};

		app.quickView.bindEvents(quickViewOptions);
	$('#signInTrigger').click(function(){
		$(".loginDrawer").slideToggle('slow');
		$("#signInTrigger").toggleClass("opened");
	});
	
	$('#countryList').click(function(){
		var that = jQuery(this);
		var top = that.css('height');
		
		if( top == "18px" ) {
			that.stop().animate({'height': '288px','top':'-264px'}, 200, function(){});
			that.find('.hideable').css({'display':'list-item'}).click(function(){
				jQuery(this).siblings().removeClass('selected').addClass('hideable');
				jQuery(this).addClass('selected').removeClass('hideable');
				var el = jQuery('a',this);
				var href = el.attr('href');
				setTimeout(function(){
					document.location.href = href;
				},500);
				
				return true;
			});
		} else {
			that.stop().animate({'height':'18px','top':'6px'}, 200, function(){that.find('.hideable').hide();});
			that.find('.hideable').unbind('click');
		}
		
		return false;
	});
	
	var rsWidth = 319;
	if( jQuery.browser.msie && jQuery.browser.version<8 ) {
		rsWidth = 320;
	}
	jQuery('.real-stories-box .previous').live('click',function(){
		var that = jQuery(this);
		var container = jQuery('.carousel-container');
		
		var offset = container.css('left');
		if( offset.indexOf('px')>-1 )
			offset = offset.substring(0,offset.length-2) - 0;
		var lastOffset = (container.find('.before').length-1) * rsWidth;
		offset += rsWidth;
		if( offset>0 ) {
			offset = 0-lastOffset;
		}
		container.animate({'left':offset},600);
	});
	
	jQuery('.real-stories-box .next').live('click',function(){
		var that = jQuery(this);
		var container = jQuery('.carousel-container');
		
		var offset = container.css('left');
		if( offset.indexOf('px')>-1 )
			offset = offset.substring(0,offset.length-2) - 0;
		offset -= rsWidth;
		var lastOffset = (container.find('.before').length-1) * rsWidth;
		if( offset<(-1*lastOffset) ) {
			offset = 0;
		}
		container.animate({'left':offset+'px'},600);
	});
	
	//bind event handler to embed flash player on click. based on legacy functionality
	jQuery("div.video.addVideo div.videoPlay").live('click',function() {
		
		var obj = jQuery(this);
		var parent = obj.parent("div.video.addVideo");
		
		var videoName = parent.attr("id");
		
		parent.removeClass("addVideo");
		
		var width = "177";
		var height = "132";
		
		//looks for elements inside the div 
		var imgs = jQuery("#" + videoName).children('img');
		var divs = jQuery("#" + videoName).children('div');
		var videoLinks = jQuery("#" + videoName).children('a');
		
		var playerSrc = jQuery(videoLinks[0]).attr("href");
		var videoSrc  = jQuery(videoLinks[1]).attr("href");
		var imageSrc  = jQuery(imgs[0]).attr("src");
		var omniName  = (jQuery(videoLinks[1]).attr("title")) ? jQuery(videoLinks[1]).attr("title") : "";
		
		//flash embed ID must be different from parent div id 
		var flashName = videoName + 'name';	
		
		if(videoName == 'largePlayer' || videoName == 'homeVideo'){
			var width = "240";
			var height = "160";	
		}
		
		var embedCode = "<embed id=\"" + flashName + "\" width=\"" + width + "\" height=\"" + height + "\" flashvars=\"" +
						//following lines are flash var definitions
						"imgSrc=" + imageSrc + 
						"&videoSrc=" + videoSrc + 
						"&omnitureVidName=" +  omniName +
						//end flash vars
						"\" allowscriptaccess=\"always\" menu=\"false\" scalemode=\"noScale\" wmode=\"transparent\" quality=\"high\"" +
						" bgcolor=\"#FFFFFF\" name=\"" + flashName + "\" style=\"visibility:visible;\" src=\"" + playerSrc + "\"" +
						" type=\"application/x-shockwave-flash\">";
						
		jQuery(divs[0]).fadeOut("slow");
		jQuery(imgs[0]).fadeOut("slow",function() {
			parent.html(embedCode);
			
		});
		
	});
	
	var popupBG = $("#popupBG");
	if( popupBG.size()<1 ) {
		$('#container').after("<div id='popupBG' />");
		popupBG = $("#popupBG");
	}
	popupBG.hide();
	jQuery('.modal-image').click(function(){
		var dlgEl = jQuery("#testimonial_full");
		if( dlgEl.length<1 ) {
			dlgEl = jQuery('<div id="testimonial_full" style="position:absolute;width:700px;height:500px"></div>');
			popupBG.after(dlgEl);
		}
		popupBG.css({"background-color":"#888","top":"0","position":"absolute","width":"100%","height":document.height+"px","opacity":"0.6"}).fadeIn('slow');

		var contents = jQuery(this).find('.modal-contents').html();
		
		dlgEl.html(contents);
		
		dlgEl.centerFull();
		dlgEl.fadeIn('slow');
		
		return false;
	});
	
	jQuery('#testimonial_full').live('click',function(){
		popupBG.fadeOut('slow');
		jQuery(this).fadeOut('slow');
	});
	
	popupBG.click(function(){
		popupBG.fadeOut('slow');
		jQuery("#testimonial_full").fadeOut('slow');
	});
});

/* dropShadow plugin */ 

(function($){

	  var dropShadowZindex = 1;  //z-index counter

	  $.fn.dropShadow = function(options)
	  {
	    // Default options
	    var opt = $.extend({
	      left: 4,
	      top: 4,
	      blur: 2,
	      opacity: .5,
	      color: "black",
	      swap: false
	      }, options);
	    var jShadows = $([]);  //empty jQuery collection
	    
	    // Loop through original elements
	    this.not(".dropShadow").each(function()
	    {
	      var jthis = $(this);
	      var shadows = [];
	      var blur = (opt.blur <= 0) ? 0 : opt.blur;
	      var opacity = (blur == 0) ? opt.opacity : opt.opacity / (blur * 8);
	      var zOriginal = (opt.swap) ? dropShadowZindex : dropShadowZindex + 1;
	      var zShadow = (opt.swap) ? dropShadowZindex + 1 : dropShadowZindex;
	      
	      // Create ID for shadow
	      var shadowId;
	      if (this.id) {
	        shadowId = this.id + "_dropShadow";
	      }
	      else {
	        shadowId = "ds" + (1 + Math.floor(9999 * Math.random()));
	      }

	      // Modify original element
	      $.data(this, "shadowId", shadowId); //store id in expando
	      $.data(this, "shadowOptions", options); //store options in expando
	      jthis
	        .attr("shadowId", shadowId)
	        .css("zIndex", zOriginal);
	      if (jthis.css("position") != "absolute") {
	        jthis.css({
	          position: "relative",
	          zoom: 1 //for IE layout
	        });
	      }

	      // Create first shadow layer
	      bgColor = jthis.css("backgroundColor");
	      if (bgColor == "rgba(0, 0, 0, 0)") bgColor = "transparent";  //Safari
	      if (bgColor != "transparent" || jthis.css("backgroundImage") != "none" 
	          || this.nodeName == "SELECT" 
	          || this.nodeName == "INPUT"
	          || this.nodeName == "TEXTAREA") {   
	        shadows[0] = $("<div></div>")
	          .css("background", opt.color);                
	      }
	      else {
	        shadows[0] = jthis
	          .clone()
	          .removeAttr("id")
	          .removeAttr("name")
	          .removeAttr("shadowId")
	          .css("color", opt.color);
	      }
	      shadows[0]
	        .addClass("dropShadow")
	        .css({
	          height: jthis.outerHeight(),
	          left: blur,
	          opacity: opacity,
	          position: "absolute",
	          top: blur,
	          width: jthis.outerWidth(),
	          zIndex: zShadow
	        });
	        
	      // Create other shadow layers
	      var layers = (8 * blur) + 1;
	      for (i = 1; i < layers; i++) {
	        shadows[i] = shadows[0].clone();
	      }

	      // Position layers
	      var i = 1;      
	      var j = blur;
	      while (j > 0) {
	        shadows[i].css({left: j * 2, top: 0});           //top
	        shadows[i + 1].css({left: j * 4, top: j * 2});   //right
	        shadows[i + 2].css({left: j * 2, top: j * 4});   //bottom
	        shadows[i + 3].css({left: 0, top: j * 2});       //left
	        shadows[i + 4].css({left: j * 3, top: j});       //top-right
	        shadows[i + 5].css({left: j * 3, top: j * 3});   //bottom-right
	        shadows[i + 6].css({left: j, top: j * 3});       //bottom-left
	        shadows[i + 7].css({left: j, top: j});           //top-left
	        i += 8;
	        j--;
	      }

	      // Create container
	      var divShadow = $("<div></div>")
	        .attr("id", shadowId) 
	        .addClass("dropShadow")
	        .css({
	          left: jthis.position().left + opt.left - blur,
	          marginTop: jthis.css("marginTop"),
	          marginRight: jthis.css("marginRight"),
	          marginBottom: jthis.css("marginBottom"),
	          marginLeft: jthis.css("marginLeft"),
	          position: "absolute",
	          top: jthis.position().top + opt.top - blur,
	          zIndex: zShadow
	        });

	      // Add layers to container  
	      for (i = 0; i < layers; i++) {
	        divShadow.append(shadows[i]);
	      }
	      
	      // Add container to DOM
	      jthis.after(divShadow);

	      // Add shadow to return set
	      jShadows = jShadows.add(divShadow);

	      // Re-align shadow on window resize
	      $(window).resize(function()
	      {
	        try {
	          divShadow.css({
	            left: jthis.position().left + opt.left - blur,
	            top: jthis.position().top + opt.top - blur
	          });
	        }
	        catch(e){}
	      });
	      
	      // Increment z-index counter
	      dropShadowZindex += 2;

	    });  //end each
	    
	    return this.pushStack(jShadows);
	  };


	  $.fn.redrawShadow = function()
	  {
	    // Remove existing shadows
	    this.removeShadow();
	    
	    // Draw new shadows
	    return this.each(function()
	    {
	      var shadowOptions = $.data(this, "shadowOptions");
	      $(this).dropShadow(shadowOptions);
	    });
	  };


	  $.fn.removeShadow = function()
	  {
	    return this.each(function()
	    {
	      var shadowId = $(this).shadowId();
	      $("div#" + shadowId).remove();
	    });
	  };


	  $.fn.shadowId = function()
	  {
	    return $.data(this[0], "shadowId");
	  };


	  $(function()  
	  {
	    // Suppress printing of shadows
	    var noPrint = "<style type='text/css' media='print'>";
	    noPrint += ".dropShadow{visibility:hidden;}</style>";
	    $("head").append(noPrint);
	  });

	})(jQuery);

(function($){
	jQuery.fn.centerVertical = function(){
		var windowHeight = jQuery(window).height();
		var scrollTop = jQuery(window).scrollTop();
		jQuery(this).each(function(){
			var that = jQuery(this);
			var height = that.height();
			var newTop = scrollTop;
			if( windowHeight > height ) {
				newTop = (windowHeight-height)/2+scrollTop;
			}
			that.css('top',newTop);
		});
		return this;
	};
	jQuery.fn.centerHorizontal = function(){
		var windowWidth = jQuery(window).width();
		var scrollLeft = jQuery(window).scrollLeft();
		jQuery(this).each(function(){
			var that = jQuery(this);
			var width = that.width();
			var newLeft = scrollLeft;
			if( windowWidth > width ) {
				newLeft = (windowWidth-width)/2+scrollLeft;
			}
			that.css('left',newLeft);
		});
		return this;
	};
	jQuery.fn.centerFull = function(){
		return this.centerVertical().centerHorizontal();
	};
})(jQuery);

jQuery(function(){
	jQuery("p.emailFriendHeader").bind("click",function(){
		var emailIndex=jQuery("p.emailFriendHeader").index(this);
		if(!jQuery(".emailFriendFeature:eq("+emailIndex+")").hasClass("activ")) {
			jQuery(this).parent(".emailFriendFeature").addClass("activ");
			jQuery(this).unbind("mouseover");
			jQuery(this).unbind("mouseout")
		} else {
			if(jQuery(".emailFriendFeature:eq("+emailIndex+").activ").length>0) {
				jQuery(this).parent(".emailFriendFeature").removeClass("activ");
				jQuery("p.emailFriendHeader").bind("mouseover",function(){
					jQuery(this).parent(".emailFriendFeature").addClass("activhover");
				});
				jQuery("p.emailFriendHeader").bind("mouseout",function(){
					jQuery(this).parent(".emailFriendFeature").removeClass("activhover");
				})
			}
		}
	});
	jQuery("p.emailFriendHeader").bind("mouseover",function(){
		jQuery(this).parent(".emailFriendFeature").addClass("activhover");
	});
	jQuery("p.emailFriendHeader").bind("mouseout",function(){
		jQuery(this).parent(".emailFriendFeature").removeClass("activhover");
	});
	jQuery("#SaS .selectKit li.tab").click(function(){
		var that = jQuery(this);
		var panelsParent = jQuery("#SaS .selectedKit .theKits")
		var myID = this.id;
		
		if( that.hasClass("activated") ) {
			return false;
		} else {
			that.addClass("activated").siblings().removeClass("activated");
			panelsParent.find("."+myID).show().siblings().hide();
		}
	});
	jQuery('.dialog .tabs a').live('click',function(){
		var that = jQuery(this);
		if( that.hasClass('selected') ) return false;
		
		that.parents('.tabs').find('a').removeClass('selected');
		that.addClass('selected');
		if( this.id == 'tabDirections' ) {
			jQuery('#directionsContent').addClass('selectedTab').siblings().removeClass('selectedTab');
		} else {
			jQuery('#ingredientsContent').addClass('selectedTab').siblings().removeClass('selectedTab');
		}
		
		return false;
	});

	
	jQuery('.dialog .wen_close').live('click',function(){
		jQuery(this).parents('.dialogContainer').hide();
		jQuery('#popupBG').fadeOut('fast');
	});
	var popupBG = $("#popupBG");
	if( popupBG.size()<1 ) {
		$('#container').after("<div id='popupBG' />");
		popupBG = $("#popupBG");
	}
	popupBG.hide();
	
	//store last content asset ID
	var lastHref="";
	//open SAS popup
	jQuery('.openOverlay').live('click',function(){
		var href = this.href;
		if( href.indexOf('?')>-1 ) href+="&format=dialog";
		if( href.length<2 ) return false;
		
		var bgheight = "0";
		if ($(window).height() > $("body").height()) {
			bgheight = $(window).height();
		} else {
			bgheight = $("body").height();
		}
		popupBG.css({"width":"100%","height":bgheight+"px","opacity":"0.6"}).fadeIn('slow');
		var assetID = this.id+"-body";
		var dlgEl = jQuery("#"+assetID);
		var windowHeight = jQuery(window).height();
		if( dlgEl.length < 1 ) {
			$("#popupBG").after("<div id='"+assetID+"' class='dialogContainer' style='position:absolute;' />");
			dlgEl = jQuery("#"+assetID);
		}
		
		//if (href!=lastHref) {
			dlgEl.load(href, function(){
				jQuery(this).centerFull();
				jQuery(this).fadeIn('slow');
			});
		//} else {
			//dlgEl.centerFull();
			//dlgEl.fadeIn('slow');
		
		//}
		
		//lastHref = href;
		return false;
		
	});
	
	jQuery('.giftOption').live('click',function(){
		var that = jQuery(this);
		var rID = this.id;
		if( that.hasClass('giftSelected') ) {
			return false;
		} else {
			that.addClass('giftSelected').siblings().removeClass('giftSelected');
			jQuery('.kitPriceBox .'+rID).addClass('selected').siblings().removeClass('selected');
		}
		return false;
	});
	
	jQuery('.openMe').live('click',function(){
		if( jQuery(this).parents('.activePanel').size()>0 ) return false;
		
		jQuery('.activePanel .panel_body').animate({height:0},800);
		jQuery(this).parents('.panel').find('.panel_body').animate({height:159},800);
		jQuery('.activePanel .openMe p').hide();
		jQuery('.activePanel').removeClass('activePanel');
		jQuery('p', this).show();
		jQuery(this).parents('.panel').addClass('activePanel');
	});
	jQuery('.panel p a').live('click',function(){document.location=this.href;});
	
	var ThumbArea = {
		numPages : -1,
		currentPage : 0,
		doMove : function(scrollPosition) {
			jQuery("#thumbMask").animate({"left":scrollPosition},250);
			//return new Effect.Move("scrollerContent",{x:scrollPosition,mode:"absolute",duration:0.25});
		},
		refreshPaginationControls : function(el){
			var context=el.parents('.thumbArea');
			var controls={back:context.find("a.previous"),next:context.find("a.next")};
			
			controls.back.css({'visibility':"visible"});
			controls.next.css({'visibility':"visible"});
			if(this.currentPage==0){
				controls.back.css({'visibility':"hidden"});
			} else {
				if(this.numPages==(this.currentPage+1)){
					controls.next.css({'visibility':"hidden"});
				}
			}
			context[0].className="thumbArea s"+this.currentPage;
		}
	};
	jQuery('.thumbArea .previous,.thumbArea .next,.thumbArea .setController li').live('click',function(){
		var theElement=jQuery(this);
		var className=this.className;
		var viewPort=$(".smScroller");
		var scrollContainer=$("#thumbMask");
		var itemsToScroll=scrollContainer.find("ul");
		var pageWidth=viewPort.width()+5;
		var contentWidth=0;
		itemsToScroll.each(function(){
			contentWidth+=jQuery(this).width();
		});
		ThumbArea.numPages=Math.ceil(contentWidth/pageWidth);

		switch(className){
		case "next":
			if((ThumbArea.currentPage+1)<ThumbArea.numPages){
				ThumbArea.currentPage++;
				ThumbArea.doMove(ThumbArea.currentPage*-pageWidth);
			} else {
				ThumbArea.currentPage = 0;
				ThumbArea.doMove(ThumbArea.currentPage*-pageWidth);
			}
			break;
		case "previous":
			if(ThumbArea.currentPage!=0){
				ThumbArea.currentPage--;
				ThumbArea.doMove(ThumbArea.currentPage*-pageWidth);
			} else {
				ThumbArea.currentPage = ThumbArea.numPages-1;
				ThumbArea.doMove(ThumbArea.currentPage*-pageWidth);
			}
			break;
		default:
			var clickedPage = theElement.prevAll('li').size();
			if(ThumbArea.currentPage!=clickedPage){
				ThumbArea.currentPage = clickedPage;
				ThumbArea.doMove(ThumbArea.currentPage*-pageWidth);
			}
			break;
		}
		ThumbArea.refreshPaginationControls(theElement);
		
		return false;
	});
	
});

function showIframeInPopup( overlayId,modalId,url,height,width,noScroll,urlAfterClose ){
	jQuery("#"+modalId).remove();
	jQuery("#"+overlayId).remove();
	jQuery("body").append('<div id="'+overlayId+'"></div><div id="'+modalId+'"><div class="closeModal">CLOSE</div></div>');
	jQuery("#"+overlayId).css("opacity",0.6);
	jQuery("#"+modalId).append('<iframe src ="'+url+'" width="'+(width?width:"98%")+'" height="'+(height?height:400)+'"'+(noScroll?' SCROLLING="no"':' SCROLLING="yes"')+' FRAMEBORDER="0" MARGINWIDTH="0"  MARGINHEIGHT="0" ></iframe>');
	
	jQuery("#"+overlayId+",#"+modalId).fadeIn("fast");
	jQuery("#"+overlayId+",div.closeModal").click(function(){
		if(urlAfterClose){
			window.location=urlAfterClose;
		}
		jQuery("#"+overlayId+",#"+modalId).fadeOut("fast");
	});
}


function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}		

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