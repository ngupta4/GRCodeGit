jQuery(document).ready(function() {

	equalHeightname($(".product.producttile .productName"));
	equalHeightname($(".product.producttile .productName"));
	equalHeight($(".product.producttile"));
	equalHeight($(".product.producttile"));	
	
	equalHeight($(".sasTabs .kitInclude"));
	equalHeight($(".sasTabs .kitRating"));
	equalHeight($(".sasTabs .kitSummary"));
	equalHeight($(".sasTabs .productDetails"));
	equalHeight($(".sasTabs"));
	//Menu functions for Country popup
	
	$("ul#locale_selector").click(function() {
		
			$(this).animate({
		 		top: "-294px", // always the height in close country - the new height
		 		height: "308px"
				}, 500,
		                function(){
				$(".footer .copyrightLegal li ul#locale_selector li.selected").css("backgroundImage" ,"url('../images/redesign/arrow_down.gif')");
		              //  $(this).unbind();
		                $(this).mouseleave(closeCountry);
		                }
				);
				return 0;
			})

	
	//Makes for an awesome Country popup

	 function closeCountry(){
			$(this).animate({top: "0",height: "14px"}, 500,	function(){
				$(".footer .copyrightLegal li ul#locale_selector li.selected").css("backgroundImage" ,"url('../images/redesign/arrow_up.gif')");
			});
			return 0;
	}

	
	
		jQuery('.spotlight-videos .video .video-overlay,.spotlight-videos .video a,.anyvideoPlay, .anyvideoPlaylink a').click(
				
				
			function() {
				jQuery("#VideoViewDialog").remove();
				jQuery("<div/>").attr("id", "VideoViewDialog").html("").appendTo(document.body);
				app.createDialog( {
					id : 'VideoViewDialog',
					options : {
						bgiframe : true,
						modal : true,
						closeOnEscape : true,
						width : 687,
						height : 620,
						title : '',
						resizable : false
					}
				});
				var urlvedio = jQuery(this).attr('href');
				jQuery("#VideoViewDialog").parent()
				.css('background','none')
				.css('border-radius','10px')
				.css('-moz-border-radius','10px')
				.css('-webkit-border-radius','10px');

				var objtitle = jQuery("#VideoViewDialog").siblings('.ui-dialog-titlebar');
				objtitle.find('.ui-dialog-titlebar-close').addClass('quickViewDialog-close').removeClass('ui-dialog-titlebar-close');
				jQuery('#VideoViewDialog').load(urlvedio);
				jQuery('#VideoViewDialog').dialog('open');
				return false;
				
				
			});
				
		jQuery('.video-overlay-home').click(
		function() {
			jQuery("#VideoViewDialog").remove();
			jQuery("<div/>").attr("id", "VideoViewDialog").html("").appendTo(document.body);
			app.createDialog( {
				id : 'VideoViewDialog',
				options : {
					bgiframe : true,
					modal : true,
					closeOnEscape : true,
					width : 975,
					height : 618,
					title : '',
					resizable : false
				}
			});
			var urlvedio = jQuery(this).attr('href');
			jQuery("#VideoViewDialog").parent().css('background','#fff').css('padding','10px');
			var objtitle = jQuery("#VideoViewDialog").siblings('.ui-dialog-titlebar');
			jQuery('#VideoViewDialog').load(urlvedio);
			jQuery('#VideoViewDialog').dialog('open');
			s.linkTrackVars='prop10,eVar10';
			var title= jQuery(this).attr('id');

           // var linkObject=s.linkHandler('grdev.com','o','true');
            s.prop10=s.pageName+'>videomodal:'+title;
            s.eVar10=s.prop10;
			s.tl(this,'o',""); 
			return false;
		});
		
		jQuery('div.ui-widget-overlay').live("click", function() {
			jQuery('.ui-dialog-content').dialog('close');
			return false;
		});
		
		/* Function For Whats in kit pop up on SAS page and terms and condition popup on SAS page */
		jQuery('#termsConditions').click(function() {
				jQuery("#dialogbox").remove();
				jQuery("<div/>").attr("id", "dialogbox").html("").appendTo(document.body);
				app.createDialog( {
					id : 'dialogbox',
					options : {
						bgiframe : true,
						modal : true,
						closeOnEscape : true,
						width : 810,
						height : 590,
						title : 'Terms & Conditions',
						resizable : false
					}
				});
				jQuery("#dialogbox").siblings('.ui-dialog-titlebar').addClass('titlebar-heading');
			
				var urlvedio = jQuery(this).attr('href');			
				jQuery('#dialogbox').load(urlvedio);
				jQuery('#dialogbox').dialog('open');
				
				s.linkTrackVars='prop10,eVar10';
				var title= $(this).attr('title');

               // var linkObject=s.linkHandler('grdev.com','o','true');
                s.prop10=s.pageName+'>modal:'+title;
                s.eVar10=s.prop10;
				s.tl(this,'o',""); 
				
				return false;
		});
		jQuery('#privacyPolicy').click(function() {
			jQuery("#dialogbox").remove();
			jQuery("<div/>").attr("id", "dialogbox").html("").appendTo(document.body);
			app.createDialog( {
				id : 'dialogbox',
				options : {
					bgiframe : true,
					modal : true,
					closeOnEscape : true,
					width : 810,
					height : 590,
					title : 'Privacy Policy',
					resizable : false
				}
			});
			jQuery("#dialogbox").siblings('.ui-dialog-titlebar').addClass('titlebar-heading');
			var urlvedio = jQuery(this).attr('href');			
			jQuery('#dialogbox').load(urlvedio);
			jQuery('#dialogbox').dialog('open');
			
			s.linkTrackVars='prop10,eVar10';
			var title= $(this).attr('title');

           // var linkObject=s.linkHandler('grdev.com','o','true');
            s.prop10=s.pageName+'>modal:'+title;
            s.eVar10=s.prop10;
			s.tl(this,'o',""); 
			
			return false;
	});
		jQuery('.kitQuest').click(function() {
			jQuery("#dialogbox").remove();
			jQuery("<div/>").attr("id", "dialogbox").html("").appendTo(document.body);
			app.createDialog( {
				id : 'dialogbox',
				options : {
					bgiframe : true,
					modal : true,
					closeOnEscape : true,
					width : 810,
					height : 660,
					title : '',
					resizable : false
				}
			});
			var urlvedio = jQuery(this).attr('href');			
			jQuery('#dialogbox').load(urlvedio);
			jQuery('#dialogbox').dialog('open');
			
			s.linkTrackVars='prop10,eVar10';
			var title= $(this).attr('title');

           // var linkObject=s.linkHandler('grdev.com','o','true');
            s.prop10=s.pageName+'>productmodal:'+title;
            s.eVar10=s.prop10;
			s.tl(this,'o',""); 
			
			return false;
	});
		
		/*Kit Modal Pop ups*/
		jQuery('.kitModalPopUp').click(function() {
			jQuery("#dialogbox").remove();
			jQuery("<div/>").attr("id", "dialogbox").html("").appendTo(document.body);
			app.createDialog( {
				id : 'dialogbox',
				options : {
					bgiframe : true,
					modal : true,
					closeOnEscape : true,
					width : 500,
					height : 167,
					title : '',
					resizable : false
				}
			});
			var urlvedio = jQuery(this).attr('href');			
			jQuery('#dialogbox').load(urlvedio);
			jQuery('#dialogbox').dialog('open');
			
			s.linkTrackVars='prop10,eVar10';
			var title= $(this).attr('title');

           // var linkObject=s.linkHandler('grdev.com','o','true');
            s.prop10=s.pageName+'>productmodal:'+title;
            s.eVar10=s.prop10;
			s.tl(this,'o',""); 
			
			return false;
	});
		/* Function For Whats in kit pop up on SAS page and terms and condition popup on SAS page: end 
		 * 
		 * 
		 * 
		 * 	jQuery('#termsConditions').click(function() {
			jQuery("#dialogbox").remove();
			jQuery("<div/>").attr("id", "dialogbox").html("").appendTo(document.body);
			app.createDialog( {
				id : 'dialogbox',
				options : {
					bgiframe : true,
					modal : true,
					closeOnEscape : true,
					width : 800,
					height : 620,
					title : '',
					resizable : false
				}
			});
			var urlvedio = jQuery(this).attr('href');
			console.log(urlvedio);
			jQuery('#dialogbox').load(urlvedio);
			jQuery('#dialogbox').dialog('open');				
			return false;
	});
		 * */
		
		jQuery('.overlayOpen').click(function() {
			jQuery("#overlayOpenSas").remove();
			jQuery("<div/>").attr("id", "overlayOpenSas").html("").appendTo(document.body);
			app.createDialog( {
				id : 'overlayOpenSas',
				options : {
					bgiframe : true,
					modal : true,
					closeOnEscape : true,
					width : 710,
					height : 'auto',
					title : '',
					resizable : false
				}
			});
			var urlvedio = jQuery(this).attr('href');
			jQuery("#overlayOpenSas").parent()
			.css('background','#fff')
			.css('border-radius','10px')
			.css('-moz-border-radius','10px')
			.css('-webkit-border-radius','10px')
			.css('padding','10px')
			.attr("id", "sasPopup");

			jQuery('#overlayOpenSas').load(urlvedio);
			jQuery('#overlayOpenSas').dialog('open');
			return false;
		});	
		
		/*---------------------------------------------------------------
		 * Omniture Customer Service and Sign In widget events
		 * --------------------------------------------------------------*/
		$('.omniCustomerService').click(function() {
			s.linkTrackVars='events';
			s.linkTrackEvents='event36';
			s.events="event36";	
			s.tl(this,'o',"Customer Service/QA"); 
		});
		
		$('#nav-faqs').click(function() {
			s.linkTrackVars='events';
			s.linkTrackEvents='event36';
			s.events="event36";	
			  s.tl(this,'o',"Customer Service/QA"); 
		});
		
		$('#sitemap-faqs').click(function() {
			s.linkTrackVars='events';
			s.linkTrackEvents='event36';
			s.events="event36";	
			  s.tl(this,'o',"Customer Service/QA"); 
		});
		
		
		function omnformStart(){
			s.linkTrackVars='events,prop26,eVar26';
			s.linkTrackEvents='event4';
			s.prop26="signinwidget";
		    s.eVar26=s.prop26;
		    s.events="event4";	
		    s.tl(this,'o',"signinwidget");
		}	
		jQuery('#signInTrigger').mouseup(function(){	
			if($(this).hasClass('opened')){
				
			}else{
				omnformStart();
			}
		});
		/*---------------------------------------------------------------
		 * Omniture Events Ends..
		 * --------------------------------------------------------------*/
		
});
jQuery('.category-nav li').each(function() {
	$(this).mouseover(function() {
		var nav_in = $(this).next();
		nav_in.addClass('first');
	})
	$(this).mouseout(function() {
		var navout = $(this).next();
		navout.removeClass('first');
	})
})

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

function equalHeightname(group) {
	var tallestname = 0;
	group.each(function() {
		var thisHeightname = $(this).height();
		if (thisHeightname > tallestname) {
			tallestname = thisHeightname;
		}
	});
	group.height(tallestname);
}
jQuery('div.ui-widget-overlay').live("click", function() {
	jQuery('.ui-dialog-content').dialog('close');
	return false;
});


function popChatBox(pageId, params) {
	inqCustData = params;
	Inq.launchChatNowByPageID(pageId);
}




function winbackerromessage(){
	if (!document.getElementById("promoSubmitErr") && document.getElementById("systemSelect")) {
		var err = document.createElement("div");
		jQuery(err).css({
			position:"relative",
			top:"0px",
			fontWeight:"bold",
			fontSize:"12px",
			color:"red",
			marginLeft:"0px",
			float:"left"
		});
		err.id = "promoSubmitErr";
		err.innerHTML = app.resources["WINBACK_ERRORMESSAGE"];
		jQuery("#systemSelect").after(err);
	}
	
}

