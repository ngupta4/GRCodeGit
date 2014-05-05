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

	equalHeight($(".product.producttile .productName"));			
	equalHeight($(".productlisting .producttile .white-bg .description"));
	equalHeight($(".productlisting .producttile .swatches"));
	equalHeight($(".product.producttile .white-bg"));
	var eqhight=$(".product.producttile .white-bg").height();
	$(".product.producttile .white-bg .quickviewbutton").height(eqhight);
	
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
						height : 650,
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
				s.linkTrackVars='prop10,eVar10';
					var title= jQuery(this).attr('title');
		            s.prop10=s.pageName+'>videomodal:'+title;
		            s.eVar10=s.prop10;
					s.tl(this,'o',""); 
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
							width : 825,
							height : 618,
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
					s.linkTrackVars='prop10,eVar10';
					var title= jQuery(this).attr('title');
		            s.prop10=s.pageName+'>videomodal:'+title;
		            s.eVar10=s.prop10;
					s.tl(this,'o',""); 
					return false;
				});
		
		jQuery('.video-overlay-home-adam').click(function() {
			jQuery("#VideoViewDialog").remove();
			jQuery("<div/>").attr("id", "VideoViewDialog").html("").appendTo(document.body);
			app.createDialog( {
				id : 'VideoViewDialog',
				options : {
					bgiframe : true,
					modal : true,
					closeOnEscape : true,
					width : 980,
					height : 618,
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
			s.linkTrackVars='prop10,eVar10';
			var title= jQuery(this).attr('title');
            s.prop10=s.pageName+'>videomodal:'+title;
            s.eVar10=s.prop10;
			s.tl(this,'o',""); 
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
 		height: "36	0px"
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
	common.init();
		
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
		jQuery('.continueBtn, .completeBtn, #paywithpaypal,.orngBtnSmall').bind("mousedown click",function(){ 
					jQuery('.billing_shipping input, .contact_info input, .paymentInformation input, .access_info .age_and_gender input, #emailGroup input').each(function(){
					 if(jQuery(this).val() == jQuery(this).attr("placeholder")){
							jQuery(this).val("");							
					 }
			   });
		});
 });

}
 

 
var common = {};
common.ui = {
		searchresult :{
			element : ".searchresultsheader, .faq_titlebar",
			init : function(){
				var  queryParm=pageUrl.split("q="); 
				jQuery("#products .image .resultsClickTracking").click(function(){
					s.linkTrackVars='pageName,products,prop42,eVar42';
				    s.linkTrackEvents='prodView';
				    s.events="prodView";
				    s.prop42=queryParm[1] + ":" + $(this).attr("href") + ":quickView";
				    s.eVar42= s.prop42;
				    pageName = brand+":cat:" + "${pdict.Product.primaryCategory.ID}" + ":"+ "${pdict.Product.custom.catalogDisplayName}";
				    s.products = $(this).attr("title");
				    s.tl(this,'o',"Quick View");
				   
				  });	
				jQuery("#video .resultsClickTracking").click(function(){					
					s.linkTrackVars='pageName,prop42,eVar42';
				    s.prop42=queryParm[1] + ":" + $(this).attr("href") + ":video";
				    s.eVar42= s.prop42;
				    pageName = brand+":cat:" + "${pdict.Product.primaryCategory.ID}" + ":"+ "${pdict.Product.custom.catalogDisplayName}";
				    s.products = $(this).attr("title");
				    s.tl(this,'o',"Clicked URL");
				   
				  });
				jQuery("#articles .resultsClickTracking").click(function(){
					s.linkTrackVars='pageName,prop42,eVar42';
				    s.prop42=queryParm[1] + ":" + $(this).attr("href") + ":article";
				    s.eVar42= s.prop42;
				    pageName = brand+":cat:" + "${pdict.Product.primaryCategory.ID}" + ":"+ "${pdict.Product.custom.catalogDisplayName}";
				    s.products = $(this).attr("title");
				    s.tl(this,'o',"Clicked URL");
				   
				  });
				
				jQuery("#products .image .quickviewbutton,#products .name").click(function(){
				
					 s.linkTrackVars='prop42,eVar42';
					var pageUrl= document.URL
					 var urlproduct=$(this).find("a").attr("href");
					    s.prop42=queryParm[1] + ":" + $(this).find("a").attr("href") + ":PDP";
					    s.eVar42= s.prop42;
					    s.tl(this,'o',"Clicked URL");	
					    window.location = urlproduct;				
				});
			}
		},
		resultpage :{
			element : "#search, #mycarousel , .pt_productsearchresult",
			init : function(){
				jQuery(".quickviewbutton a").click(function(){
					var upcCode = $(this).siblings(".productUPC").val();
					s.linkTrackVars='pageName,products,prop10,eVar10';
				    s.linkTrackEvents='prodView';
				    s.events="prodView";
				    pageName = brand+":cat:" + "${pdict.Product.primaryCategory.ID}" + ":"+ "${pdict.Product.custom.catalogDisplayName}";
				    s.products =upcCode;
					var title= $(this).attr('title');
		            s.prop10=s.pageName+'>productmodal:'+title;
		            s.eVar10=s.prop10; 
				    s.tl(this,'o',"Quick View");
				  });	
				jQuery(".quickviewbutton").click(function(){
					 var urlproduct= $(this).find("a").attr("href");
					 window.location = urlproduct;
				
				});
			}
		},
		searchresult :{
			element : ".pt_productdetails .productdetail-center .variationattributes",
			init : function(){			
				$('.price-area').addClass('variation-price');
			}},
		celebrity :{
		element : "#celebrity-carousel",
		init : function(){
			$('#celebrity-carousel-scroll').bxSlider({
	            displaySlideQty:5, 
	            moveSlideQty:1, 
	            infiniteLoop: false,
	            onBeforeSlide: function(currentSlide, totalSlides){
	            	
	            },
	            onNextSlide: function(currentSlide, totalSlides){
	            	
	            },  
	            onAfterSlide: function(currentSlide, totalSlides){
	            	if(totalSlides == (currentSlide+5)){
	            		$("#celebrity-carousel .bx-wrapper .bx-next").hide();
	            	}else{
	            		$("#celebrity-carousel .bx-wrapper .bx-next").show();
	            	}
	            	
	            	if(currentSlide == 0){
	            		$("#celebrity-carousel .bx-wrapper .bx-prev").hide();
	            	}else{
	            		$("#celebrity-carousel .bx-wrapper .bx-prev").show();
	            	}
	            }
	        });
		}},
		ooyalaplayer :{
			element:".video-ooyalaplayer",
			init : function(){
			// create dailog for celebrity stroies
						jQuery('.video-ooyalaplayer').click(
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
											height : 650,
											title : '',
											resizable : false,
											dialogClass : 'videoPopUp',
											
											// close the quick view dialog
											close: function() {
												ooPlayer.destroy();
											}
										}
										
									});
					/* PA+ video pop up rendering on IE 9 : inline css removed */
									var urlvedio = jQuery(this).attr('href');
									var objtitle = jQuery("#VideoViewDialog").siblings('.ui-dialog-titlebar');
									objtitle.find('.ui-dialog-titlebar-close').addClass('quickViewDialog-close').removeClass('ui-dialog-titlebar-close');
									jQuery('#VideoViewDialog').load(urlvedio);
									jQuery('#VideoViewDialog').dialog('open');
									s.linkTrackVars='prop10,eVar10';
										var title= jQuery(this).attr('title');
							            s.prop10=s.pageName+'>videomodal:'+title;
							            s.eVar10=s.prop10;
										s.tl(this,'o',""); 
									return false;
							});
			
		}}


};

common.init = function () {
    $.each(common.ui, function (n, v) {
        if ($(v.element).length > 0 && typeof v.init === "function") {
        	common.ui[n].element = $(v.element);
            v.init();
        }
    })
};

