jQuery(document).ready(function() {

	/*  Tab focus first : start*/	
	$("#contYourOrder").keydown(function (event) {
        if (event.keyCode == 9) {
        	$("input[value='female']").focus();        	
        	scrollToAnchor('Step4');
        	 return false;
        }       
    });
	
	var headerHeight = jQuery('.posFixeded').height();
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
			   scrollToAnchor('Step3');
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
								updateProductInfoTabinline(supply);
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
						         $('.daySupplytabcontainer').empty();
							      	var  supplyOptions ='';
							        for(i=0;i<supply.update.daySupply.length; i++){
							        	if(i==0){supplyOptions += '<label><input class="daySupplytab" type="radio" name="daySupplytab" value="'+ supply.update.daySupply[i].value + '" supplyname="' +supply.update.daySupply[i].label +'" checked="checked" />'
								        	+supply.update.daySupply[i].label+'</label>';}
							        	else{
							        		supplyOptions += '<label><input class="daySupplytab" type="radio" name="daySupplytab" value="'+ supply.update.daySupply[i].value + '" supplyname="' +supply.update.daySupply[i].label +'" />'
								        	+supply.update.daySupply[i].label+'</label>';
							        	}
							        	
							         }
							     $(".daySupplytabcontainer").html(supplyOptions);
								//jQuery(app.proactiv.resources.get('vitaminsection')).html(supply.update.CartDescription.stringValue);
								//$('.coreProductID').hide();
							     $("#coreProductID").attr("value",supply.update.CoreId.stringValue);
							     //console.log(supply.update.CoreId.stringValue);
							}
						}
					); 
			});
			// Buttons for NAk Test
			$(".back-to-supply").click(function() {
				scrollToAnchor('Step3');
			});	
			$(".back-to-system").click(function() {
				scrollToAnchor('Step1');
			});
			$(".kit-buttons .buttons-container .order-now").click(function() {
				scrollToAnchor('Step3');				
			});
			$(".selectKit .selectKit_Img").click(function() {
				scrollToAnchor('Step3');				
			});
			$(".order-summary-right .back_to_top").click(function() {
				$('html,body').animate({scrollTop: 0},'slow');				
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
	}
	
	
/* Supply radio button cart summary */
	$( ".daySupplytab" ).live( "change", function() {

		var pid = $(this).val();               
        var cartid = $('#cartID').val();
        
        var optionval = $(this).attr("supplyname");

        jQuery.getJSON(
            app.proactiv.resources.get('updateSupplyURL'), {
                pid: $(this).val(),
                isKit: 'true'                       
            },
            function (supply) {
                if (cartid != '100' && cartid != '102') {
                	
                		var upsellClass = "30-Day";
                        if(optionval.indexOf("30") >= 0){
                        	upsellClass = "30-Day";
                       }else{
                    	   upsellClass = "90-Day";
                      }
                        
                        $(".upsellrecommendation .upsellInline li").removeClass('active');
                      	$(".upsellrecommendation .upsellInline ."+upsellClass).addClass('active');                              	 
                      	var orderSummaryPrice = supply.update.ProductPrice.stringValue;
                        $(".bottomPanel #prodSummary .kitPrice").empty();
                        $(".bottomPanel #prodSummary .kitPrice").append(orderSummaryPrice);
                    }
                if (supply.success) {
                	updateProductInfoTabinline(supply);

                    if ($('#valueUpsellSection').hasClass('block')) {
                        $('#valueUpsellSection').removeClass('block');
                        $('#valueUpsellSection').hide();
                    } else {
                        $('#valueUpsellSection').addClass('block');
                        $('#valueUpsellSection').show();
                    }
                    $('a.remove_item').attr('name', supply.update.CoreId.stringValue);
                    $("#coreProductID").attr("value",supply.update.CoreId.stringValue);
                }
            }
        );
        s.linkTrackVars = 'prop56,eVar56';
        s.prop56 = campaignCode + ":ChangeSize";
        s.eVar56 = s.prop56;
        s.tl(this, 'o', "kit size update");

    
	
	});

	
});
function updateProductInfoTabinline(supply){
	jQuery(app.proactiv.resources.get('subtotal-selector')).text(supply.update.SubTotal.stringValue);
	jQuery(app.proactiv.resources.get('shipping-price-selector')).text(supply.update.ShippingPrice.stringValue);
	jQuery(app.proactiv.resources.get('total-price-selector')).text(supply.update.TotalPrice.stringValue);
	jQuery(app.proactiv.resources.get('cart-description')).html(supply.update.CartDescription.stringValue);
	$(".coreid").attr("value", supply.update.CoreId.stringValue);
	$(".coreidCY").attr("value", supply.update.CoreId.stringValue);	
	updateKitQuantityDropDown(supply);
	jQuery(app.proactiv.resources.get('product-name')).html(supply.update.ProdName.stringValue);
	jQuery(app.proactiv.resources.get('hero-image')).attr('src',supply.update.HeroImage.stringValue);
	jQuery(app.proactiv.resources.get('hero-image')).attr('title',supply.update.HeroImage.title);
  	jQuery(app.proactiv.resources.get('heroName')).html(supply.update.ProdName.stringValue);
	jQuery(app.proactiv.resources.get('heroDesc')).html(supply.update.ShortDescription.stringValue);	
	jQuery(app.proactiv.resources.get('PayLaterTerms')).html(supply.update.paylaterLegalTerms.stringValue);
	jQuery(app.proactiv.resources.get('swatch-image')).attr('src',supply.update.SwatchImage.stringValue);
}