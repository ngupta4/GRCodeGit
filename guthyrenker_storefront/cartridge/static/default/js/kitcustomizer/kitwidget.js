function KitCustomizer() {
	var jsondata={};

    var userid;
	var loggedin;
	var memberprice;
	var kitcost;
	var savings;
	var shipping;
	var weeks;
	var widgetShowing=false;
	var maxproducts=9;
	var itemadded="false";
	var itemaddedindex=0;
	var loggedinsoft="false";
	var lastshipmentdate;
	var nextshipmentdate;
	var products=[];
	var setFrequency;
	var productToDelete;
	var trackingURL;
	this.kdManager=new KitSessionDataManager();
	
	this.kdManager.addEventListener(this.kdManager.EVENT_REFRESH, dataRefreshed);
	
	//** text to change in modals
	function rePaintWidget() {
		
		$('#kitData').html("");
		var wHTML = "";
		var semikitUnavailable = $("input#semiKitAvailable").val();
		if(typeof(products) != "undefined" && null != products && products !=''){
			
			if(semikitUnavailable != 'true'){
				wHTML += ('<div id="productData">');
				for (var ctr=0;ctr<products.length;ctr++) {
					var slot=ctr+1;
					var product=products[ctr];
					wHTML += ('<div id="slot'+slot+'" class="productImg"><img src="'+product.thumb+'"><div id="slot'+slot+'delete" class="slotdelete"><img src="'+app.URLs.kitdeletebutton+'"></div></div>');
					}
				for (ctr=products.length;ctr<maxproducts;ctr++) {
					var slot=ctr+1;
					wHTML += ('<div id="slot'+slot+'" class="productImg"><img src="'+app.URLs.kitemptyslot+'"><div id="slot'+slot+'delete" class="slotdelete"><img src="'+app.URLs.kitdeleteblank+'"></div></div>');
					}
				wHTML += ('</div>');
				wHTML += ('<div id="righttextholder">');
				wHTML += ('<span class="kitcostlabel">Your Kit Cost:</span><span class="kitcostvalue"> '+app.resources["CURRENCY_SYMBOL"]+ kitcost + ' </span><span class="plus-icon">+</span> <span id="shipping">s&h</span>');
				wHTML += ('<br/><span class="kitlinedivider"><img src="'+app.URLs.kitsmallhr+'"></span>');
				wHTML += ('<span class="kitsavelabel">Your Member Savings:</span><span class="membersavings"> '+app.resources["CURRENCY_SYMBOL"]+ savings + '</span>');
			}else{
				wHTML = ('<div id="instantaccess">'+$("input#semiKitAvailableMsg").val()+'</div>');
			}
			$('#kitData').html(wHTML);
			
			$("#kitshippingnav").css("display","block");
			$('.lastshipmentvalue').html(lastshipmentdate);
			$('.nextshipmentvalue').html(nextshipmentdate);
			
			//Code for order history next shipment date update.
			var nsdFull = new Date(nextshipmentdate);
			var nsdYear = nsdFull.getFullYear();
			var nsFullDate =  (((nsdFull.getMonth()+1)<10)?"0":"") + (nsdFull.getMonth()+1)+ "/" + (((nsdFull.getDate()+1)<10)?"0":"")+ nsdFull.getDate() +"/"+(nsdYear < "2000" ? nsdYear + 100 : nsdYear);
			$('b.updateDate').html(nsFullDate);
			$('label.updateFrequency').html(setFrequency);
			
			//To show new product added message
			$('input#weeksFreq').val(weeks);
			if (itemadded =="true") {
				window.scrollTo(0, 0);
				var leftPosition = (itemaddedindex*59+52+(parseInt(itemaddedindex/2))+(parseInt(itemaddedindex/4))).toString() + "px";  
				var topPosition =  "-64px";
				$("#itemaddedbox").css("left",leftPosition);
				$("#itemaddedbox").css("top", topPosition);
				$("#itemaddedbox").show('fast');
				var timer=setTimeout(function(){$("#itemaddedbox").hide();}, 15000);
			}else{
				$("#itemaddedbox").hide();
			}
			
			//if kit has 2 products then show pop up to add third product. 
				addThirdProductWarningShow(products.length);
		}else{
			showKitUnavailable(app.resources["KIT_PRODUCT_ERROR"]);
			$("#kitshippingnav").css("display","none");
		}
	}
	
	//if kit has 2 products then to show warning pop up to add third product and only once in session.
	function addThirdProductWarningShow(kitSize){	
		var showKitWarningPopupCookie = readCookie('showKitWarningPopup');
		var semiKit = jQuery("input#semiKitAvailable").val();
		if(showKitWarningPopupCookie == null && kitSize==2 && semiKit !='true'){
		    document.cookie ='showKitWarningPopup=true; path=/;domain='+app.resources["Cookie_Domain"];  
			jQuery('#kitthreeproductswarning').show();
			jQuery('#kitthreeproductswarning').dialog({
				bgiframe: true,
				autoOpen: true,
				modal: true,
				top:'300px',
		       	width:511,
		       	minHeight: 100,
		       	title: '',
		       	resizable: false,
		    	dialogClass : 'kitwarning'
			});
		}
    }
   
	
	this.showKit = function(){
		 $(".widget_customize_button").hide();
		 $("#widget_customize_button").hide();
		 $("#whiteborder").hide();		 
		 $("#widget_customize_close").show();
		 $('#widget_customize_background').slideDown('slow');
		 $(".widget_customize_close").show(600, "linear");		 
		 widgetShowing=true;
	}
	
	function dataRefreshed(e) {
		loggedin=$.jStorage.get("loggedin");
		memberprice=$.jStorage.get("memberprice");
		weeks=$.jStorage.get("weeks");
		kitcost=$.jStorage.get("kitcost");
		savings=$.jStorage.get("savings");
		products=$.jStorage.get("products");
		itemadded=$.jStorage.get("itemadded");
		itemaddedindex=$.jStorage.get("itemaddedindex");
		maxproducts=$.jStorage.get("maxproducts");
		loggedinsoft=$.jStorage.get("loggedinsoft");
		lastshipmentdate=$.jStorage.get("lastshipmentdate");
		nextshipmentdate=$.jStorage.get("nextshipmentdate");
		shipping=$.jStorage.get("shipping");
		trackingURL=$.jStorage.get("trackingURL");
		rePaintWidget();
		if(showKit==null){
			$("#widget_customize_background").hide();
			$("#widget_customize_close").hide();
			$(".widget_customize_close").hide();
		} else if(showKit){
			widget.showKit();
		}
		$("#previewwindow").hide();	
		$("#doctorsadvice").hide();	
		$("#adjustfrequencymain").hide();	
		$('#adjustFreqOldDateConfirmation').hide();
		$("#adjustfrequencyconfirm").hide();
		$("#limitedsupplywindow").hide();	
		$("#howtoaddwindow").hide();
		$("#shippingwindow").hide();
		$("#learnmorewindow").hide();
		$("#shipnowconfirmation").hide();
		$('#errormessagewindow').hide();
		$('#confirmwindow').hide();
		//$('#confirmwindow, #kitthreeproductswarning').hide();
		$("#overlays").hide();
		
		//$("#itemaddedbox").hide();
		addWidgetEventListeners();
		addProductEventListeners();
	}
	
	this.startWidget=function()  {
		//console.log("start widget");
		if($('#kitData').html()==''){
			var url = app.URLs.kitCustomizerShow;
			jQuery.ajax({
				type: "GET",
				async: false,
				url: url,
				data: {},
				dataType: 'json',
				success: function(data){
					showKit = true;
					if(data.errorCode == null){
						widget.kdManager.putData(data);
					}else{
						showKitUnavailable(data.errorCode);
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown){	  
					//alert(errorThrown);
				}
			});
		}
		else{
			widget.showKit();
		}
	}
	
	function showKitUnavailable(errorCode){
		
	
		$("#shipnowbtn").css("background-image","url("+app.URLs.shipnowdis+")"); 
		$("#adjustnowbtn").css("background-image","url("+app.URLs.adjustnowdis+")");
		$("#trackpackagebtn").css("background-image","url("+app.URLs.trackbtndisabled+")");		
		$("#kitshippingnav").addClass("kit-dis-button"); 

		
		// For error scenarios coming after expanding the kit, add to kit button should not work.
		$("input#kitUnavailable").val("true"); 
		$("input#kitUnavailableMsg").val(errorCode);  
		
		//for showing the error message (image) in the kit.For Semi Kit Show the SemiKitUnavailabile Message		
		var wHTML = "";		
		if($("input#semiKitAvailable").val() == 'true'){			
			wHTML = ('<div id="instantaccess">'+$("input#semiKitAvailableMsg").val()+'</div>');
		}
		else{			
			wHTML = ('<div id="instantaccess">'+errorCode+'</div>');
		}
			
		
		$('#kitData').html(wHTML);
		
		if(expandKit){
			widget.showKit();
		}
		expandKit = true;
	}

	function deleteClicked(e) {
		$('#itemaddedbox').hide();
		$('#previewwindow').hide();
		var productDeleted=false;
		var sessionExists = checkSession();
		if(sessionExists){
			for (var ctr=products.length-1;ctr>=0;ctr--) {
				var slot=ctr+1;
				var currentElement="slot"+slot+"delete";
				if ((typeof(e) == "object" && currentElement ==  e.currentTarget.id) || (typeof(e)=="string" && currentElement==e)) {
				   	if(products.length <=3) {
						showErrorMessage(app.resources["DELPRODUCT_ERROR"]);
				   	}else if( products[ctr].essentialStep != '') {
						productToDelete=products[ctr].id;
						var flag = false;
						for(var i =0 ; i<products.length; i++){
							if(i != ctr){
								if(products[i].essentialStep == products[ctr].essentialStep){
									flag = true;
									productToDelete=products[ctr].id;
									deleteConfirmBoxShow();
									productDeleted=true;
									break;
								}
							}
						}
						if(!flag){
							showDoctorsAdvise();
							productDeleted=false;	
						}
						
						//deleteConfirmBoxShow();
					}else if(products[ctr].outofstockproduct == '' || products[ctr].outofstockproduct=="true") {
						showLimitedSupplyWindow();
						productToDelete=products[ctr].id;
					}else{
						productToDelete=products[ctr].id;
						deleteConfirmBoxShow();
						productDeleted=true;
					}
					break;
				}
			} 
		}else{
			var targetPipeline = '';
			if($('#showKit').val() != "true"){
				if($('#tagetParams').val()!="null"){
					targetPipeline = $('#tagetPipeline').val()+'?showKit=true&'+$('#tagetParams').val()+'&kitcontinue=det'+e.currentTarget.id;
				} else {
					targetPipeline = $('#tagetPipeline').val()+'?showKit=true&kitcontinue=det'+e.currentTarget.id;
				}
			} else {
				if($('#tagetParams').val()!="null"){
					targetPipeline = $('#tagetPipeline').val()+'?'+$('#tagetParams').val()+'&kitcontinue=det'+e.currentTarget.id;
				} else {
					targetPipeline = $('#tagetPipeline').val()+'?kitcontinue=det'+e.currentTarget.id;
				}
			}
			app.displayLogin(targetPipeline);
			return false;
		}
	}
	
	this.checkContinuation = function(contParam){
		if(contParam.indexOf("add")>=0){
			contParam=contParam.replace("add","");
			addProduct(contParam);
		} else if(contParam.indexOf("det")>=0) {
			contParam=contParam.replace("det","");
			deleteClicked(contParam);
		} else if(contParam == "adjust"){
			adjustNowClicked();
		} else if(contParam=="ship"){
			showShipNowWindow();
		}
			
	}
	
	
	function showShipNowWindow(){
		jQuery('#shipnowconfirmation').show();
		jQuery('#shipnowconfirmation').dialog('open');
		jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
		jQuery('.ui-dialog-titlebar').addClass('shipnowconfirmation-title');
	//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
		jQuery('#shipnowconfirmation').siblings(".ui-dialog-titlebar").css('top','15px');
		jQuery('#ui-dialog-title-shipnowconfirmation').remove();
	}
	
	function adjustfrequencyconfimationpopup(){
		if(showKit != null && showKit){
			jQuery('#adjustfrequencyconfirm').show();
			jQuery('#adjustfrequencyconfirm').dialog('open');
			
			jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
		//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
			jQuery('#adjustfrequencyconfirm').siblings(".ui-dialog-titlebar").css('top','15px');
			jQuery('#ui-dialog-title-adjustfrequencyconfirm').remove();
		} 
	}
	
	function showDoctorsAdvise(){
		jQuery('#doctorsadvice').show();
		jQuery('#doctorsadvice').dialog('open');
		
		jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
	//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
		jQuery('#doctorsadvice').siblings(".ui-dialog-titlebar").css('top','15px');
		jQuery('#ui-dialog-title-doctorsadvice').remove();
	}
	
	function showLimitedSupplyWindow(){
		jQuery('#limitedsupplywindow').show();
		jQuery('#limitedsupplywindow').dialog('open');		
		jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
		jQuery('.ui-dialog-titlebar').addClass('limitedsupplywindow-title');
	//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
		jQuery('#limitedsupplywindow').siblings(".ui-dialog-titlebar").css('top','15px');
		jQuery('#ui-dialog-title-limitedsupplywindow').remove();
	}
	
	function deleteConfirmBoxShow(){
		jQuery('#confirmwindow').show();
		jQuery('#confirmwindow').dialog('open');		
		jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');
		jQuery('.ui-dialog-titlebar').addClass('confirmwindow-title'); 
	//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
		jQuery('#confirmwindow').siblings(".ui-dialog-titlebar").css('top','15px');
		jQuery('#ui-dialog-title-confirmwindow').remove();
	}

	
	/*function shipNowClickBind(){
		$('#shipnowbtn').unbind('click');
		$("#shipnowbtn").click(function() {
			//console.log("ship now clicked");
			//code for omniture
			s.linkTrackVars='pageName,prop28,eVar28';
            s.events="event28";
            s.prop28="ship now";
            s.eVar28= "ship now";
            s.pageName='brand +':myaccount:orderstatus';
            s.tl(this,'o',"Ship Now");
            shipNowButtonClicked();

			$('#itemaddedbox').hide();
			$('#previewwindow').hide();
			shipNowButtonClicked();
		});
	}*/
	
	
	var mouseLeftPosition;
	var mouseTopPosition;
	function mouseOverProduct(e) {
		for (var ctr=products.length-1;ctr>=0;ctr--) {
			var slot=ctr+1;
			var currentElement="slot"+slot;
		    if (currentElement ==  e.currentTarget.id) {
		    	mouseMovePos(e);
		    	var elementID="#"+currentElement;
				$("#previewImage").css("background-image","url("+products[ctr].productmodallink+")" );
				var productSize = products[ctr].size;
				if(products[ctr].variant=="false"){
					if(productSize != null && productSize != ''){
						productSize = '<span>' + 'Size: ' + productSize + '</span>';
					}	
				}
				$("#previewProdName").html(products[ctr].name + productSize);
				if(products[ctr].variant=="true"){
					if(products[ctr].variantName=="Color"){
						var imageURL=app.resources["SCENE_7_URL"]+products[ctr].variantValue+app.resources["SCENE_7_PRESET"];
						if(imageURL.indexOf(" ")>=0){
							imageURL.replace(" ","%20");
						}
						$("#variantType").html("Shade");
						$("#variantValue").css("top","2px");
						$("#variantValue").html("<img src='"+imageURL+"' width='15' height='15'/>" );
						
					} else {
						$("#variantType").html(products[ctr].variantName);
						$("#variantValue").css("top","0px");
						$("#variantValue").html(products[ctr].variantValue);
					}
					$("#previewVariant").show();
				} else {
					$("span#variantType").empty();
					$("span#variantValue").empty();
					$("#previewVariant").hide();
				}
				$("#previewwindow").show();	
				$("#previewwindow").mouseout(mouseOutPreview);
				$(elementID).mousemove(mouseMovePos);
				$("#itemaddedbox").hide();	
				$("#doctorsadvice").hide();	
		   }
		}
	}
	
	function mouseOutPreview(e) {
		$("span#variantType").empty();
		$("span#variantValue").empty();
		$("#previewwindow").hide();	
	}
	
function mouseMovePos(e) {
		
		mouseLeftPosition = e.pageX-180;
		mouseTopPosition = 0;
		var windowScroll = $(window).scrollTop();
		if(windowScroll > 30){
			mouseTopPosition=308;
		}	
		$("#previewwindow").css("left",mouseLeftPosition);
		$("#previewwindow").css("top",mouseTopPosition);
	}

	function hideCustomizeButton() {
		$(".widget_customize_button").hide();
		$("#widget_customize_button").hide();
		$("#whiteborder").hide();
	}	
	
	/*function hideComplete(){
		//console.log("hide complete");
		$("#widgetHeader").css("background-image","url("+app.URLs.kitheader+")" );
	}*/
	
	function addWidgetEventListeners(){
		if (typeof(loggedin) != "undefined" && !loggedin) {
			 $("#headerloginlink").click(function(){
				 //console.log("login clicked");
			 });
			 
			 $("#headerbecomeamemberlink").click(function(){
				 //console.log("become a member clicked");
			 });
		}else{
			/*$("#widget_customize_close").unbind('click');
			$("#widget_customize_close").click(function() {
				$("#itemaddedbox").hide();
				$(".widget_customize_button").show();
				$("#widget_customize_background").slideUp(400);
				$(".widget_customize_close").slideUp(400);
				$("#widget_customize_close").slideUp(400);
				$(".widget_customize_button").show(600, "linear");
				$("#widget_customize_button").show(600, "linear");
				$("#whiteborder").show();
				s.pageName = omnStorefrontName + ":kitCustomizer"
				s.channel = "kitcustomizer";
				widgetShowing=false;
			});*/
			
			/*Adding Modal PopUp for ShipNow*/
			$('#shipnowbtn').unbind('click');
			$('#shipnowbtn').click( function() {
				$('#itemaddedbox').hide();
				$('#previewwindow').hide();
				
				var sessionExists = checkSession();
				if(!sessionExists){
					shipNowButtonClicked();
				}else{
					jQuery('#shipnowconfirmation').show();
					jQuery('#shipnowconfirmation').dialog('open');
					jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
					jQuery('.ui-dialog-titlebar').addClass('shipnowconfirmation-title');
				//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
					jQuery('#shipnowconfirmation').siblings(".ui-dialog-titlebar").css('top','15px');				
					jQuery('#ui-dialog-title-shipnowconfirmation').remove();					
				}
			});
			
			
			$('#helpbuttonpaplus').click( function() {		
				$('#itemaddedbox').hide();
				$('#previewwindow').hide();
				
				jQuery('#kithelppaplus').dialog({
					bgiframe: true,
					autoOpen: true,
					modal: true,
					top:'300px',
			       	width:511,
			       	minHeight: 100,
			       	title: '',
			       	resizable: false			    	
				});
					
				jQuery('#kithelppaplus').dialog('open');
				jQuery('#kithelppaplus').show();
				
					jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
				//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
					jQuery('#kithelppaplus').siblings(".ui-dialog-titlebar").css('top','15px');
					jQuery('#ui-dialog-title-shipnowconfirmation').remove();
					
				
			});			
			
			
			/*Changes made for Confirmation Box of Ship Now Start*/
			$('#shipnowcancelbtn').unbind('click');
			$("#shipnowcancelbtn").click(function() {
				jQuery('#shipnowconfirmation').dialog('close');
			});

			$('#shipnowokbtn').unbind('click');
			$("#shipnowokbtn").click(function() {
				//console.log("learn more clicked");
				jQuery('#shipnowokbtn').dialog('close');
				jQuery('#shipnowconfirmation').dialog('close');
				shipNowButtonClicked();
			});
			
			$("#shipnowokbtn").mouseover(function() {
				$("#shipnowokbtn").css("cursor", "pointer");
			});
			/*Changes made for Confirmation Box of Ship Now END*/
			//Changes for adjustnowbutton
			$('#adjustnowbtn').unbind('click');
			$("#adjustnowbtn").click(function() {
				adjustNowClicked();
			});
			
			$('#adjustfreqolddatecancelbtn').unbind('click');
			$("#adjustfreqolddatecancelbtn").click(function() {
				jQuery('#adjustFreqOldDateConfirmation').dialog('close');
			});
			
			$('#adjustfreqolddateokbtn').unbind('click');
			$("#adjustfreqolddateokbtn").click(function() {

				jQuery('#adjustfreqolddateokbtn').dialog('close');
				jQuery('#adjustFreqOldDateConfirmation').dialog('close');
				proceedChangeFrequency($("#frequencyselect").val());
				adjustfrequencyconfimationpopup();
			});
			
			$("#adjustfreqolddateokbtn").mouseover(function() {
				$("#adjustfreqolddateokbtn").css("cursor", "pointer");
			});
			
			if(typeof(trackingURL)!='undefined' && trackingURL != ''){
				$("#trackpackagebtn").mouseover(function() {
					$("#trackpackagebtn").css("cursor", "pointer");
				});
				
				$("#trackpackagebtn").click(function() {
					//console.log("track clicked");
					$('#itemaddedbox').hide();
					$('#previewwindow').hide();
					trackPackageButtonClicked(trackingURL);
				});
			} else {
				$("#trackpackagebtn").css("background-image","url("+app.URLs.trackbtndisabled+")");
				$("#trackpackagebtn").addClass("trackDisable");
				$("#trackpackagebtn").unbind("click");
			}
			
			$("#shipnowbtn").mouseover(function() {
				$("#shipnowbtn").css("cursor", "pointer");
			});
			
			$("#adjustnowbtn").mouseover(function() {
				$("#adjustnowbtn").css("cursor", "pointer");
			});
			
			$("#doctorsadviceokbtn").mouseover(function() {
				$("#doctorsadviceokbtn").css("cursor", "pointer");
			});
			
			$("#doctorsadviceokbtn").click(function() {
				//console.log("ok clicked");
				jQuery('#doctorsadvice').dialog('close');
				deleteConfirmBoxShow();
			});
			setFrequency = $("#frequencyselect").val();
			$("#frequencyselect").change(function (e) {
				var setFrequencyIni = setFrequency;
				setFrequency=e.target.value;
				
			});	
			
			$("#frequencysavebtn").mouseover(function() {
				$("#frequencysavebtn").css("cursor", "pointer");
			});
			
			$('#frequencysavebtn').unbind('click');
			$("#frequencysavebtn").click(function() {
				//console.log("save clicked");
				showKit = null;
				
				setFrequency = $("#frequencyselect").val();
				jQuery('#adjustfrequencymain').dialog('close');
				//show confirmation box
				//send off to ajax to set frequency
				//code for omniture
                s.linkTrackVars='pageName,events,prop27,eVar27';
                s.linkTrackEvents='event27';
                s.events="event27";
                s.prop27= weeks+"weeks >" + setFrequency +"weeks";
                s.eVar27= weeks+"weeks >" + setFrequency +"weeks";
                s.pageName=brand +':myaccount:orderstatus';
                s.tl(this,'o',"Adjust Now");
                
                jQuery('.updatedweek').text(setFrequency);
                saveFrequencyButtonClicked(setFrequency);
                adjustfrequencyconfimationpopup();
			});
			
			//On pop up ok button should take to user Featured category landing page.
			$("#kitThreeOkButton a").click(function() {			
				window.location.href = app.URLs.AllCategory;	
			});
			
			$("#frequencycancelbtn").mouseover(function() {
				$("#frequencycancelbtn").css("cursor", "pointer");
			});
			
			$("#frequencycancelbtn").click(function() {
				jQuery('#adjustfrequencymain').dialog('close');
			});
			
			$("#frequencyclosebtn").mouseover(function() {
				$("#frequencyclosebtn").css("cursor", "pointer");
			});
			
			$("#frequencyclosebtn").click(function() {
				//console.log("x clicked"); sachin adjustfrequencyconfirm
				jQuery('#adjustfrequencyconfirm').dialog('close');
			});
			//added in final code
			
			$("#limitedsupplyclosebtn").mouseover(function() {
				$("#limitedsupplyclosebtn").css("cursor", "pointer");
			});
			
			$("#limitedsupplyclosebtn").click(function() {
				jQuery('#limitedsupplywindow').dialog('close');
			});
			
			//empty spots
			if(typeof(products)!="undefined" && null != products){
				for (ctr=products.length+1;ctr<=maxproducts;ctr++) {
					var name="#"+"slot"+ctr   
					$(name).click(function() {
						//console.log("empty spot clicked");
						$('#itemaddedbox').hide();
						$("#previewwindow").hide();
						jQuery('#howtoaddwindow').show();
						jQuery('#howtoaddwindow').dialog('open');
						jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');
						jQuery('.ui-dialog-titlebar').addClass('howtoaddwindow-title');  
					//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
						jQuery('#howtoaddwindow').siblings(".ui-dialog-titlebar").css('top','15px');					
						jQuery('#ui-dialog-title-howtoaddwindow').remove();
					});
				}
			}
			
			$("#howtoaddokbtn").mouseover(function() {
				$("#howtoaddokbtn").css("cursor", "pointer");
			});
			
			$("#howtoaddokbtn").click(function() {
				jQuery('#howtoaddwindow').dialog('close');
			});
			
			$("#howtoaddmoreinfobtn").mouseover(function() {
				$("#howtoaddmoreinfobtn").css("cursor", "pointer");
			});
			
			$('#howtoaddmoreinfobtn').unbind('click');
			$("#howtoaddmoreinfobtn").click(function() {
				//console.log("more clicked");
				jQuery('#howtoaddwindow').dialog('close');
				moreInfoButtonClicked();
			});
			
			$("#limitedsupplyremove").mouseover(function() {
				$("#limitedsupplyremove").css("cursor", "pointer");
			});
			
			$("#limitedsupplyremove").unbind('click');
			$("#limitedsupplyremove").click(function() {
				//console.log("remove clicked");
				deleteProduct(productToDelete);
				jQuery('#limitedsupplywindow').dialog('close');	
			});
			
			$("#shipping").click(function() {
				$('#itemaddedbox').hide();
				$("#previewwindow").hide();
				var dollarshipping = app.resources["CURRENCY_SYMBOL"]+shipping.toString();
				$("#shippingcost").html(dollarshipping);
				jQuery('#shippingwindow').show();
				jQuery('#shippingwindow').dialog('open');
				
				jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');
				jQuery('.ui-dialog-titlebar').addClass('shippingwindow-title'); 
			//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
				jQuery('#shippingwindow').siblings(".ui-dialog-titlebar").css('top','15px');	
				jQuery('#ui-dialog-title-shippingwindow').remove();
			});
			
			$("#shippingokbtn").mouseover(function() {
				$("#shippingokbtn").css("cursor", "pointer");
			});
			
			$("#shippingokbtn").click(function() {
				//console.log("ok clicked");
				jQuery('#shippingwindow').dialog('close');	
				
			});
			
			/*$('#learnmorebtn').unbind('click');
			$("#learnmorebtn").click(function() {
				//console.log("learn more clicked");
				jQuery('#learnmorewindow').dialog('close');
				learnMoreFunctionCall();
			});
			
			//$('#learnmoreokbtn').unbind('click');
			$("#learnmoreokbtn").mouseover(function() {
				$("#learnmoreokbtn").css("cursor", "pointer");
			});
			
			$("#learnmoreokbtn").click(function() {
				jQuery('#learnmorewindow').dialog('close');
			});*/
			
			$("#confirmokbtn").mouseover(function(){
				$("#confirmokbtn").css("cursor", "pointer");
			});

			$("#confirmcancelbtn").mouseover(function(){
				$("#confirmcancelbtn").css("cursor", "pointer");
			});
			
			$("#confirmokbtn").unbind('click');
			$("#confirmokbtn").click(function(){
				deleteProduct(productToDelete);
				jQuery('#confirmwindow').dialog('close');
			});
			$("#confirmcancelbtn").click(function(){
				jQuery('#confirmwindow').dialog('close');
			});
			
			//kit full message window events
			
			// dialog windows definitions
			jQuery('#adjustfrequencymain').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
		       	width:511,
		    	title: '',
		    	resizable: false		    	
			});
			
			jQuery('#adjustFreqOldDateConfirmation').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
				width:540,
				height:200,
		    	title: '',
		    	resizable: false
			});
			
			jQuery('#doctorsadvice').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
				width:540,
				height:200,
		    	title: '',
		    	resizable: false
			});
			
			jQuery('#shipnowconfirmation').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
				width:540,
				height:200,
		    	title: '',
		    	resizable: false
		    	
			});
			
			jQuery('#limitedsupplywindow').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
		       	width:511,
		       	height:150,
		    	title: '',
		    	resizable: false		    	
			});
			

			jQuery('#confirmwindow').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
		       	width:495,
		       	height:200,
		    	title: '',
		    	resizable: false		    	
			});
	  
			jQuery('#adjustfrequencymain').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
		       	width:511,
		    	title: '',
		    	resizable: false
		    	
			});
			
			jQuery('#adjustFreqOldDateConfirmation').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
				width:540,
				height:200,
		    	title: '',
		    	resizable: false
			});
			
			jQuery('#shippingwindow').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
		       	width:511,
		       	height:200,
		    	title: '',
		    	resizable: false		    	
			});
			
			jQuery('#howtoaddwindow').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
		       	width:511,
		    	title: '',
		    	resizable: false		    	
			});
			
			/*jQuery('#learnmorewindow').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
		       	width:511,
		    	title: '',
		    	resizable: false		    	
			});*/
			
			/*jQuery('#errormessagewindow').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
		       	width:511,
		       	height:150,
		    	title: '',
		    	resizable: false		    	
			});*/
			
			jQuery('#shipnowerrormessagewindow').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
		       	width:511,
		       	height:190,
		    	title: '',
		    	resizable: false		    	
			});
			
			jQuery('#adjustfrequencyconfirm').dialog({
	 			bgiframe: true,
				autoOpen: false,
				modal: true,
				top:'300px',
		       	width:511,
		       	height:200,
		    	title: '',
		    	resizable: false		    	
			});
			
			//shipNowClickBind();//binding shipping function for the click call.
		}
	}
	
	function addProductEventListeners(){
		if(typeof(products) != "undefined" && null != products && products !=''){
			for (var ctr=0;ctr<products.length;ctr++) {
				var slot=ctr+1;
				var currentElement="#slot"+slot+"delete";
				$(currentElement).unbind('click');
				$(currentElement).click(deleteClicked);
				$(currentElement).css("cursor", "pointer");
				
				currentElement="#slot"+slot;
				$(currentElement).css("cursor", "pointer");
				$(currentElement).mouseover(mouseOverProduct);
				$(currentElement).mouseout(function(){
					$("#previewwindow").hide();
				});
				$(currentElement).css("cursor", "pointer");
			}
		}
	}
	
	function adjustfrequencyconfimationpopup(){
		if(showKit != null && showKit){
			jQuery('#adjustfrequencyconfirm').show();
			jQuery('#adjustfrequencyconfirm').dialog('open');
			jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
		//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
			jQuery('#adjustfrequencyconfirm').siblings(".ui-dialog-titlebar").css('top','15px');			
			jQuery('#ui-dialog-title-adjustfrequencyconfirm').remove();
		}
	}
	//******stub functions for back-end calls
	/*
	function deleteProduct() {
		//console.log("product array index to delete=" + productToDelete);
		//alert("deleteProduct stub function called: " + productToDelete);
		//the current index in the product array for the product to delete is held in
		//productToDelete variable:
		//backend_ajax_call_to_delete_a_product(productToDelete)	
	}
	
	function moreInfoButtonClicked(){
		//alert("more info stub function");
		// stub for more info button click on the modal window when a users clicks an open spot on the kit
		// this was not currently in our spec to create, but we will create it if it doesn't already exist. We assume it will go to a page on the site or a pop-up that exists
		//call_to_bring_up_more_info_on_adding_products
	}

	function trackPackageButtonClicked(){
		//alert("track package stub function");
		// stub for more track package button click
		//call_to_to_track_current_packages
	}
	
	function shipNowButtonClicked(){
		//alert("ship now stub function called");
	}
	
	function saveFrequencyButtonClicked(){
		//alert("set frequency changed: " + setFrequency);
	}
	*/
	
} //end constructor

var expandKit = true;
var widget=new KitCustomizer();

$(document).ready(function(){
	
	$("#widget_customize_button, #widgetHeader.kitclosewidget").unbind('click');
	$("#widget_customize_button, #widgetHeader.kitclosewidget").click(function() {
			widget.startWidget();		
	});
	
	$("#widget_customize_close").unbind('click');
	$("#widget_customize_close").click(function() {
		$("#itemaddedbox").hide();
		$("#widget_customize_background").slideUp(400);
		
		setTimeout(function(){
			$(".widget_customize_close").slideUp(400);
			$("#widget_customize_close").hide();
			$("#widget_customize_button").show();
			$(".widget_customize_button").show(400, "linear");
			$("#whiteborder").show();
			s.pageName = omnStorefrontName + ":kitCustomizer"
			s.channel = "kitcustomizer";
			widgetShowing=false;
		},410);
	});
	
	jQuery('#learnmorewindow').dialog({
			bgiframe: true,
		autoOpen: false,
		modal: true,
		top:'300px',
       	width:511,
    	title: '',
    	dialogClass:"margintop",
    	resizable: false		    	
	});
	
	jQuery('#questionmark, .contentasset .tooltip').click( function() {
		$('#itemaddedbox').hide();
		$('#previewwindow').hide();
		$("#widgetHeader.kitclosewidget").unbind('click');
		jQuery('#learnmorewindow').show();
		jQuery('#learnmorewindow').dialog('open');
		jQuery('#learnmorewindow').siblings('.ui-dialog-titlebar').css('top','15px');
		jQuery('.ui-widget-cotnent').parent().removeClass('ui-corner-all');
		jQuery('.ui-dialog-titlebar').addClass('learnmorewindow-title'); 
	//	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');		
		jQuery('#ui-dialog-title-learnmorewindow').remove();
		
	});
		
	$('#learnmoreokbtn').unbind('click');
	$("#learnmoreokbtn, .ui-dialog-titlebar-close").click(function() {
		jQuery('#learnmorewindow').dialog('close');
		$("#widgetHeader.kitclosewidget").bind( "click", function( event ) {
			widget.startWidget();	
		});
	});

	$('#learnmorebtn').unbind('click');
	$("#learnmorebtn").click(function() {
		//console.log("learn more clicked");
		jQuery('#learnmorewindow').dialog('close');
		learnMoreFunctionCall();
	});
	
	//$('#learnmoreokbtn').unbind('click');
	$("#learnmorebtn").mouseover(function() {
		$("#learnmorebtn").css("cursor", "pointer");
	});
	
	jQuery('#kitfullmessagewindow').dialog({
			bgiframe: true,
		autoOpen: false,
		modal: true,
		top:'300px',
       	width:511,
       	height:170,
    	title: '',
    	dialogClass:"kitFullMessageWindow-outer",
    	resizable: false		    	
	});
	
	jQuery('#errormessagewindow').dialog({
			bgiframe: true,
		autoOpen: false,
		modal: true,
		top:'300px',
       	width:511,
       	height:165,
    	title: '',
    	resizable: false		    	
	});
	
	$("#kitfullokbtn").mouseover(function(){
		$("#kitfullokbtn").css("cursor", "pointer");
	});
	$("#kitfullokbtn").click(function(){
		//deleteProduct(productToDelete);
		jQuery('#kitfullmessagewindow').dialog('close');
	});
		
	//	if kit has 2 products then warning pop up to add third product with kit widget open. 
		var showKitWarningPopupCookie = readCookie('showKitWarningPopup');	
		if(null == showKitWarningPopupCookie && typeof(kitLength) != "undefined" && kitLength==2){
			var semikitAvailable = $("input#semiKitAvailable").val();
			if(semikitAvailable == 'false'){
				expandKit = false; //incase there is an error response from server do not expand kit.
				$("#widget_customize_button").trigger('click');
			}
			else{
				expandKit = false;
			}
		}
		
	// executing action (triggered in soft login) after user login.
	if($("input#showKit").val() == "true"){
		widget.startWidget();
		var contParam = $("input#contParam").val();
		if(contParam != null && contParam != '')
			widget.checkContinuation(contParam);
	}
});



// We call our anonymous function immediately
