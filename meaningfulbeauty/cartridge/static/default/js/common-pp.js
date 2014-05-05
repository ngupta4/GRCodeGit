function getCookie(c_name) {
	if (document.cookie.length>0){
  		c_start=document.cookie.indexOf(c_name + "=");
  		if (c_start!=-1) {
    		c_start=c_start + c_name.length+1;
    		c_end=document.cookie.indexOf(";",c_start);
    		if (c_end==-1) c_end=document.cookie.length;
    		return unescape(document.cookie.substring(c_start,c_end));
    	}
  	}
	return "";
}

jQuery(document).ready(function() {

	equalHeightname($(".product.producttile .productName"));
	equalHeightname($(".product.producttile .productName"));
	equalHeight($(".product.producttile"));
	equalHeight($(".product.producttile"));
	
	
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
						resizable : false,
						dialogClass : 'videoPopUp'
					}
				});
/* PA+ video pop up rendering on IE 9 : inline css removed */
				var urlvedio = jQuery(this).attr('href');
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
							width : 580,
							height : 370,
							title : '',
							resizable : false,
							dialogClass: "videoPopUp"
						}
					});
					
					var urlvedio = jQuery(this).attr('href');
					
/* PA+ video pop up rendering on IE 9 : inline css removed */
					var objtitle = jQuery("#VideoViewDialog").siblings('.ui-dialog-titlebar');
					objtitle.find('.ui-dialog-titlebar-close').addClass('quickViewDialog-close').addClass('quickViewDialog-closebox').removeClass('ui-dialog-titlebar-close');
					jQuery('#VideoViewDialog').load(urlvedio);
					jQuery('#VideoViewDialog').dialog('open');
					return false;
				});
					

			jQuery('.panelb-firstpromo-home').click(function() {			
				jQuery("#compare-table-popup").remove();
				jQuery("<div/>").attr("id", "compare-table-popup").html("").appendTo(document.body);
				app.createDialog( {
					id : 'compare-table-popup',
					options : {
						bgiframe : true,
						modal : true,
						closeOnEscape : true,
						width : 660,
						height : 550,
						title : '',
						position: "top",
						resizable : false
					}
				});
			
				var url = jQuery(this).attr('href');
				jQuery("#compare-table-popup").parent()
				.css('background','#fff')
				.css('border-radius','10px')
				.css('-moz-border-radius','10px')
				.css('-webkit-border-radius','10px')
				.css('padding','0px');
				var objtitle = jQuery("#compare-table-popup").siblings('.ui-dialog-titlebar');
				objtitle.find('.ui-dialog-titlebar-close').addClass('quickViewDialog-close').addClass('quickViewDialog-closebox').removeClass('ui-dialog-titlebar-close');
				jQuery('#compare-table-popup').load(url);
				jQuery("#compare-table-popup").siblings().find('.quickViewDialog-close span.ui-icon').css("top","3px").css("right","8px");
				jQuery('#compare-table-popup').dialog('open');		
				return false;
				});
		
		
		
		jQuery('.overlayOpen').click(				
				
				function() {
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

					var objtitle = jQuery("#overlayOpenSas").siblings('.ui-dialog-titlebar');
					objtitle.find('.ui-dialog-titlebar-close').addClass('wen_close').removeClass('ui-dialog-titlebar-close');
					jQuery('#overlayOpenSas').load(urlvedio);
					jQuery('#overlayOpenSas').dialog('open');
					return false;
				});	
		
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
 		top: "-326px", // always the height in close country - the new height
 		height: "340px"
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

$(document).ready(function(){				
	
	// dropdown placeholder color 
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
		
	// hide server-side error msg when clint side msg come
		$("input").keydown(function(){
		/*added word .errorclient*/			
			$(this).parent().find("span.errorclient:last-child").hide();
			$(this).parent().find("span.errormessage:last-child").hide();
		});
		
		$(".email input").keydown(function(){			
			$('.email .errorclient').hide();
		});
	
});


