jQuery(document).ready(function() {
    if($("#billState").val() !=""){                 
                 $("#billState").addClass("dropdown");                  
           }
    if($("#creditCardMonth").val() !=""){    
                 $("#creditCardMonth").addClass("dropdown");
           }
    
    if($("#creditCardYear").val() !=""){
                 $("#creditCardYear").addClass("dropdown");
           }
    if($("#shipState").val() !=""){
        $("#shipState").addClass("dropdown");
  }
    


    $("SELECT").change(function(){
           if($(this).val() != ""){
                        $(this).addClass("dropdown");                     
                 }
    });
    
    
    $("SELECT").mousedown(function(){                                                        
                 $(this).addClass("dropdown");                
           
    });
    
    $("SELECT").focus(function(){                                                        
        $(this).addClass("dropdown");                
  
    });

	
	/*  Tab focus first : start*/	
	$("#contYourOrder").keydown(function (event) {
        if (event.keyCode == 9) {
        	$("input[value='female']").focus();        	
        	scrollToAnchor('Step4');
        	 return false;
        }       
    });
	/* Tab focus first : end */	
	
	equalHeight($(".selectKit_Img"));
	equalHeight($(".kitIncludes"));
	equalHeight($(".sasDes"));
	equalHeight($(".productDetailsBox"));
	equalHeight($(".sasLongDescription"));
	equalHeight($(".leftCol"));
	equalHeight($(".giftBlock"));
	equalHeight($(".giftBlockSAS"));
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
	
	
	$(window).scroll(function() {
		 var windowScroll = $(window).scrollTop();
		 var selectKitHeight = jQuery('.selectakitpanel').height();
		 var freeGiftHeight = jQuery('.freeGiftCont').height();
		 var upsellInlineHeight = jQuery('.upsellrecommendation').height();
		 var checkoutHeight = jQuery('.checkoutform').height();
		 var giftUpsellHeight = selectKitHeight + freeGiftHeight;
		 var giftUpsellCheckoutHeight = selectKitHeight + freeGiftHeight + upsellInlineHeight;
		 	if(windowScroll < selectKitHeight) {
				$(".breadcrumb li").removeClass('active');
				$(".breadcrumb li.step1").addClass('active');
			}
		 	if(windowScroll >= selectKitHeight) {
				$(".breadcrumb li").removeClass('active');
				$(".breadcrumb li.step2").addClass('active');
			}
			if(windowScroll >= giftUpsellHeight) {
				$(".breadcrumb li").removeClass('active');
				$(".breadcrumb li.step3").addClass('active');
			}
			if(windowScroll >= giftUpsellCheckoutHeight) {
				$(".breadcrumb li").removeClass('active');
				$(".breadcrumb li.step4").addClass('active');
			}
	});
	
	var headerHeight = jQuery('.posFixed').height();
	$('.selectakitpanel').css('padding-top',headerHeight);
		 
	 $(".kitType > .selectKit > ul.sasKits > li").click( function(){
		 	var offerid = $(this).attr("class");
			$("#coreProductID").attr("value",offerid.split(" ")[0]);
		    $(this).addClass('active');
		    $(this).siblings().removeClass('active');
		    var system = $(this).attr("id");
		    $("#"+system+"Gift").siblings("div").css('display','none');
		    $("#"+system+"Gift").css('display','Block');
		    $("#"+system+"Gift"+" li:first-child").siblings().removeClass('active');
		    $("#"+system+"Gift"+" li:first-child").addClass('active');
		    $("#"+system+"Gift1Upsell").siblings("div").css('display','none');
		    $("#"+system+"Gift1Upsell").css('display','Block');
		    $("#"+system+"Gift1Upsell"+" li:first-child").siblings().removeClass('active');
		    $("#"+system+"Gift1Upsell"+" li:first-child").addClass('active');
		    
		    var orderSummaryGiftPrice =$(this).find(".pdata .pprice").html();
		    $(".bottomPanel #prodSummary .kitPrice").empty();
		    $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryGiftPrice);
		    var orderSummarykitTab =$(this).find(".pdata .pTab").html();
		    $(".bottomPanel #prodSummary .kitTab").empty();
		    $(".bottomPanel #prodSummary .kitTab").append(orderSummarykitTab);
	    	var freeExtras = $(this).find(".pdata .pTabDetails").html();
	    	$(".bottomPanel .freeExtrasStrip").html(freeExtras);
		    return false;
		});

		$(".kitType .sasKits li:first-child").addClass('active');
		$("a#step1").click(function() {
			   scrollToAnchor('Step1');
			});
		
		$(".PanelB .selectGift li").click( function(){ 
			var offerid = $(this).attr("class");
		    $("#coreProductID").attr("value",offerid.split(" ")[0]);
		    $(this).addClass('active');
		    $(this).siblings().removeClass('active');
		    var system = $(this).attr("id");
		    $("#"+system+"Upsell").siblings("div").css('display','none');
		    $("#"+system+"Upsell").css('display','block');
		    $("#"+system+"Upsell"+" li:first-child").siblings().removeClass('active');
		    $("#"+system+"Upsell"+" li:first-child").addClass('active');
		    
		    var orderSummaryGiftPrice =$(this).find(".pdata .pprice").html();
		    $(".bottomPanel #prodSummary .kitPrice").empty();
		    $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryGiftPrice);
		    var orderSummarykitTab =$(this).find(".pdata .pTab").html();
		    $(".bottomPanel #prodSummary .kitTab").empty();
		    $(".bottomPanel #prodSummary .kitTab").append(orderSummarykitTab);
		    
		});

		$(".PanelB .selectGift li:first-child").addClass('active');
		$(".upsellInline .selectKit li").click( function(){ 
			var offerid = $(this).attr("class");
		    $("#coreProductID").attr("value",offerid.split(" ")[0]);
		    $(this).addClass('active');
		    $(this).siblings().removeClass('active');
		    
		    var orderSummaryPrice =$(this).find(".pdata .ppriceupsell").html();
		    $(".bottomPanel #prodSummary .kitPrice").empty();
		    $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryPrice);    
		});

		$(".upsellInline .selectKit li:first-child").addClass('active');
		$("a#step2").click(function() {
			   scrollToAnchor('Step2');
			   s.linkTrackVars='prop56,eVar56';
			   s.prop56=campaignCode+":SelectFreeGift";
			   s.eVar56=s.prop56;
			   s.tl(this,'o',"Next Select Free Gift");
			   //$('.freeGiftCont .pageTitle').css('margin-top','50px')
			});
			$("a#step4").click(function() {
			   scrollToAnchor('Step4');
				s.linkTrackVars='prop56,eVar56';
				s.prop56=campaignCode+":Checkout";
				s.eVar56=s.prop56;
				s.tl(this,'o',"Next Checkout");
				//$('.checkoutPanelB').css('margin-top','50px')
			});
			$("a#step3").click(function() {
				scrollToAnchor('Step3');
				 s.linkTrackVars='prop56,eVar56';
				 s.prop56=campaignCode+":SelectSupply";
				 s.eVar56=s.prop56;
				 s.tl(this,'o',"Next Select Supply");
				 //$('.upsellrecommendation .pageTitle').css('margin-top','50px')
				});
			$(".step1 a").click(function() {
				   scrollToAnchor('Step1');
				   s.linkTrackVars='prop56,eVar56';
				   s.prop56=campaignCode+":SelectSystem";
				   s.eVar56=s.prop56;
				   s.tl(this,'o',"Select a System");
				   //$('.selectakitpanel .pageTitle').css('margin-top','0px')
			});
			$(".step2 a").click(function() {
				   scrollToAnchor('Step2');
				   s.linkTrackVars='prop56,eVar56';
				   s.prop56=campaignCode+":SelectFreeGift";
				   s.eVar56=s.prop56;
				   s.tl(this,'o',"Select a Free Gift");
				   //$('.freeGiftCont .pageTitle').css('margin-top','0px')
			});
			$(".step3 a").click(function() {
				   scrollToAnchor('Step3');
				   s.linkTrackVars='prop56,eVar56';
				   s.prop56=campaignCode+":SelectSupply";
				   s.eVar56=s.prop56;
				   s.tl(this,'o',"Select Supply");
				  // $('.upsellrecommendation .pageTitle').css('margin-top','0px')
			});
			$(".step4 a").click(function() {
				   scrollToAnchor('Step4');
				   s.linkTrackVars='prop56,eVar56';
				   s.prop56=campaignCode+":Checkout";
				   s.eVar56=s.prop56;
				   s.tl(this,'o',"Checkout");
				   //$('.checkoutPanelB').css('margin-top','0px')
			});
			
			$('.updatecartbtn').click(function() {
				var payMethod = getPayMethod();
				jQuery.getJSON(
						app.proactiv.resources.get('updateSupplyURL'),
						{
							pid : jQuery('.coreProductID').val(),
							isKit : 'true',
							paymentMethod : payMethod
						},
						function(supply) {
							if (supply.success) {
								updateProductInfo(supply);
								var isSelected = 'false';
						    	var i;
						      	var  options ='';
						      	var isSelected = 'false';
						        for(i=0;i<=supply.update.ShipList.length-1; i++){
						        	if(supply.update.ShipList[i].selected=='true'){
			   			        	    options += '<option value="'+ supply.update.ShipList[i].value + '" selected="selected">' +supply.update.ShipList[i].lable + '</option>';
			   			        	    isSelected='true';
						        	}
						        	else{
							        	if(i==(supply.update.ShipList.length-1) && isSelected == 'false'){
				   			        	    options += '<option value="'+ supply.update.ShipList[i].value + '" selected="selected">' +supply.update.ShipList[i].lable + '</option>';			        	
							        	}
							        	else{
								        	 options += '<option value="'+ supply.update.ShipList[i].value + '">' +supply.update.ShipList[i].lable + '</option>';			        	
							        	}		
						        	}
						        }
						         $(".shipList").html(options);
						         $('#daySupply').empty();
							      	var  sullpyOptions ='';
							        for(i=0;i<supply.update.daySupply.length; i++){
							        	sullpyOptions += '<option value="'+ supply.update.daySupply[i].value + '">' +supply.update.daySupply[i].label + '</option>';			        	
							         }
							     $("#daySupply").html(sullpyOptions);
								//jQuery(app.proactiv.resources.get('vitaminsection')).html(supply.update.CartDescription.stringValue);
								//$('.coreProductID').hide();
							     $("#coreProductID").attr("value",supply.update.CoreId.stringValue);
							     //console.log(supply.update.CoreId.stringValue);
							}
						}
					); 
			});
			$(".selectakitpanel .selectKit ul.sasKits li").click(function() {
				   scrollToAnchor('Step1');				   
			});
			$(".freeGiftCont .selectGift ul li").click(function() {
				   scrollToAnchor('Step2');				   
			});
			$(".upsellrecommendation .selectKit ul li").click(function() {
				   scrollToAnchor('Step3');				   
			});			
		
	function scrollToAnchor(aid){
	    var aTag = $("a[name='"+ aid +"']");
	    $('html,body').animate({scrollTop: aTag.offset().top - headerHeight},'slow');
	}
	
	var coreID= $(".coreid").val();
	$("#coreProductID").attr("value",coreID);
	var vitID = $(".crossSellIDAddedToCart").val();
	if( vitID != null && vitID != "undefined" && vitID != ""){
		$(".crossSellPLSwap").attr("value",$(".crossSellIDAddedToCart").val());
		$(".crossSellID").attr("value",$(".crossSellIDRegular").val());
		$("#vitPresentInCart").attr("value", true);
	}
	var has_upsell =$('#has-upsell').val();
    var orderSummaryGiftPrice =$(".upsellrecommendation .sasKits li."+coreID).find(".pdata .ppriceupsell").html();
    $(".bottomPanel #prodSummary .kitPrice").empty();
    $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryGiftPrice);
	if(has_upsell == "true"){
		$('.freeGiftCont .freeGiftID').hide();
		$('.freeGiftCont .selectFeeGift li.'+coreID).parents('.freeGiftID').show();
		
		$(".freeGiftCont .selectFeeGift li.updatecartbtn").removeClass('active');
		$(".freeGiftCont .selectFeeGift li."+coreID).addClass('active');
		var orderSummarykitTab =$('.freeGiftCont .selectFeeGift li.'+coreID).find(".pdata .pTab").html();
		$(".bottomPanel #prodSummary .kitTab").empty();
	    $(".bottomPanel #prodSummary .kitTab").append(orderSummarykitTab);
		$('.upsellrecommendation .upsell-id').hide();	
		 $('.upsellrecommendation .sasKits li.'+coreID).parents('.upsell-id').show();	
		$(".upsellrecommendation .sasKits li."+coreID).addClass('active');	
		var freegiftid = $('.freeGiftSelector.PanelB .selectKit li.'+coreID).parent().find('.free_GiftID').text();
		$(".selectakitpanel .sasKits li").removeClass('active');
		$(".selectakitpanel .sasKits li."+freegiftid).addClass('active');
	}
	else{
		$(".upsellrecommendation .sasKits li").removeClass('active');
		$(".upsellrecommendation .sasKits li."+coreID).addClass('active');
		$('.upsellrecommendation .upsell-id').hide();	
		$('.upsellrecommendation .sasKits li.'+coreID).parents('.upsell-id').show();	
		
		var upsell_recommendation =$('.upsellrecommendation .sasKits li.'+coreID).parent().find('.recommend_Product').val();
		$('.freeGiftCont .freeGiftID').hide();
		$('.freeGiftCont .selectFeeGift li.'+upsell_recommendation).parents('.freeGiftID').show();
		$(".freeGiftCont .selectFeeGift li.updatecartbtn").removeClass('active');
		$(".freeGiftCont .selectFeeGift li."+upsell_recommendation).addClass('active');
		var upsellkitTab =$('.freeGiftCont .selectFeeGift li.'+upsell_recommendation).find(".pdata .pTab").html();
		$(".bottomPanel #prodSummary .kitTab").empty();
	    $(".bottomPanel #prodSummary .kitTab").append(upsellkitTab);
		var freegiftid = $('.freeGiftSelector.PanelB .selectKit li.'+upsell_recommendation).parent().find('.free_GiftID').text();
		$(".selectakitpanel .sasKits li").removeClass('active');
		$(".selectakitpanel .sasKits li."+freegiftid).addClass('active');
		
	}
	
});

/* JS: Placeholder */

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
		jQuery('.continueBtn, .completeBtn, #paywithpaypal').bind("mousedown click",function(){                  
			jQuery('.billing_shipping input, .contact_info input, .paymentInformation input, .access_info .age_and_gender input').each(function(){
					 if(jQuery(this).val() == jQuery(this).attr("placeholder")){
							jQuery(this).val("");
					 }
			   });
		});
 });
 

  
}

/* JS: Placeholder */