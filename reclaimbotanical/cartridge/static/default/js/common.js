jQuery(document).ready(function() {

	equalHeightname($(".product.producttile .productName"));
	equalHeightname($(".product.producttile .productName"));
	
	equalHeight($(".product.producttile"));
	equalHeight($(".product.producttile"));	
	equalHeight($(".sasTabs .kitRating"));	
	//equalHeight($(".sasTabs .kitInclude"));
	//equalHeight($(".sasTabs .bonusGifts"));	
	equalHeight($(".sasTabs .kitSummary"));
//	equalHeight($(".sasTabs .orderNowSideBySide"));
	
		
	//Menu functions for Country popup
		$("ul#locale_selector").mouseenter(openCountry);
		$("ul#locale_selector li").click(popAndLoad);

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
					width : 915,
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
			return false;
		});
		jQuery('div.ui-widget-overlay').live("click", function() {
			alert('rahul');
			jQuery('.ui-dialog-content').dialog('close');
			return false;
		});
		
		/* Function For Whats in kit pop up on SAS page and terms and condition popup on SAS page */
		jQuery('#termsConditions, #privacyPolicy').click(function() {
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
                s.prop10=s.pageName+'>modal:'+title;
                s.eVar10=s.prop10;
				s.tl(this,'o',""); 
				
				return false;
		});
		
		/*jQuery('.kitQuest').click(function() {
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
			
			s.linkTrackVars='prop10,eVar10,eVar55';
			var title= $(this).attr('title');

           // var linkObject=s.linkHandler('grdev.com','o','true');
            s.prop10=s.pageName+'>modal:'+title;
            s.eVar10=s.prop10;
            s.eVar55='products';
			s.tl(this,'o',""); 
			
			return false;
		});*/
		
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



//Makes for an awesome Country popup

 function closeCountry(){
		$(this).animate({
		top: "0",
		height: "14px"
		}, 500,
		function(){
		$(".footer .copyrightLegal li ul#locale_selector li.selected").css("backgroundImage" ,"url('../images/redesign/arrow_up.gif')");
		$(this).unbind();
		$(this).mouseenter(openCountry);
		}
		);
		return 0;
}


function openCountry(){
 		$(this).animate({
 		top: "-206px", // always the height in close country - the new height
 		height: "220px"
		}, 500,
                function(){
		$(".footer .copyrightLegal li ul#locale_selector li.selected").css("backgroundImage" ,"url('../images/redesign/arrow_down.gif')");
                $(this).unbind();
                $(this).mouseleave(closeCountry);
                }
		);
		return 0;
}

function popAndLoad(){
		$(this).addClass("selected");
		newSelection =	$(this).detach();
		
		$("ul#locale_selector li").removeClass("selected");
		$("ul#locale_selector li[class!=selected]").css("backgroundImage", "none");
		$("ul#locale_selector").prepend(newSelection);	
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


// Dialog Util
var RBCOMMON = {};
RBCOMMON.ui = {
		
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
	                        width: 750,
	                        height: 475,
	                        title: '',
	                        resizable: false
	                    }
	                });
	                var urlvedio = jQuery(this).attr('href');
	                jQuery("#moreInfo").parent().css('background', '#fff').css('padding', '7px 10px 0 8px').css('overflow', 'hidden');
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
    }
     	
};

RBCOMMON.init = function () {
    $.each(RBCOMMON.ui, function (n, v) {
        if ($(v.element).length > 0 && typeof v.init === "function") {
        	RBCOMMON.ui[n].element = $(v.element);
            v.init();
        }
    })
};

//On page ready execute from here
jQuery(document).ready(function(){
	
	RBCOMMON.init();

});