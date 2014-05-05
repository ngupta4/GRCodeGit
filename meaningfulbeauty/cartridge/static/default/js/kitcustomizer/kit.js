var showKit = null;

function checkSession(){
	var resultJSONObj = app.isCustomerSessionActive();
	var flag;
	app.resources["IS_USER_AUTHENTICATED"] = resultJSONObj.user.authenticated;
	if(app.resources["IS_USER_AUTHENTICATED"]=="false"){
		flag = false;
	} else{
		flag = true;
	}
	return flag;
}

function learnMorePageClicked(){
	$('#itemaddedbox').hide();
	$('#previewwindow').hide();
	jQuery('#learnmorewindow').show();
	jQuery('#learnmorewindow').dialog('open');
	
	jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
	jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
	jQuery('.ui-dialog-titlebar').css('top','15px');
	jQuery('#ui-dialog-title-learnmorewindow').remove();
}

function addProduct(pid){
	s.linkTrackVars='events,prop25,eVar25,products';
	s.linkTrackEvents='event22,event23';
    s.events="event22,event23";
    s.products= pid;
    s.prop25="0";
    s.eVar25= "+1";
    s.tl(this,'o',"add product");
	var instantaccess = $("input#instantaccess").val();
	if(instantaccess=='true'){
		var sessionExists = checkSession();
		if(sessionExists){
			showKit = null;
			var url = app.URLs.kitaddProduct;
			jQuery.ajax({
				type: "GET",
				async: false,
				url: url,
				data: {pID : pid},
				dataType: 'json',
				success: function(data){
					if(data.errorCode == null){
						showKit = true;
						widget.kdManager.putData(data);
					}else{
						showErrorMessage(data.errorCode);
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown){	  
					//alert(errorThrown);
				}
			});
		} else {
			var targetPipeline = '';
			if($('#showKit').val() != "true"){
				if($('#tagetParams').val() != "null"){
					targetPipeline = $('#tagetPipeline').val()+'?showKit=true&'+$('#tagetParams').val()+'&kitcontinue=add'+pid;
				} else {
					targetPipeline = $('#tagetPipeline').val()+'?showKit=true&kitcontinue=add'+pid;
				}
			} else {
				if($('#tagetParams').val() != "null"){
					targetPipeline = $('#tagetPipeline').val()+'?'+$('#tagetParams').val()+'&kitcontinue=add'+pid;
				} else {
					targetPipeline = $('#tagetPipeline').val()+'?kitcontinue=add'+pid;
				}
			}
			
			app.displayLogin(targetPipeline);
		}
	}else{
		showErrorMessage(app.resources["INSTANT_ACCESS_ADD"]);
	}
}

function deleteProduct(pid){
	s.linkTrackVars='events,prop25,eVar25,products';
	s.linkTrackEvents='event24';
    s.events="event24";
    s.products= pid;
    s.prop25="-1";
    s.eVar25= "-1";
    s.tl(this,'o',"Delete Product");
	showKit = null;
	//$('#confirmokbtn').unbind('click');
	var url = app.URLs.kitdeleteProduct;
	jQuery.ajax({
		type: "GET",
		async: false,
		url: url,
		data: {pID : pid},
		dataType: 'json',
		success: function(data){
			if(data.errorCode == null){
				showKit = true;
				widget.kdManager.putData(data);
			}else
				showErrorMessage(data.errorCode);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){	  
			//alert(errorThrown);
		}
	});
	
}

function shipNowButtonClicked(){
	$('#itemaddedbox').hide();
	$("#previewwindow").hide();
	s.linkTrackVars='pageName,prop28,eVar28';
	s.linkTrackEvents='event28';
    s.events="event28";
    s.prop28="ship now";
    s.eVar28= "ship now";
    s.pageName='mb:myaccount:orderstatus';
    s.tl(this,'o',"Ship Now");
    var sessionExists = checkSession();
	showKit = null;
	var instantaccess = $("input#instantaccess").val();
	if(instantaccess=="true"){
		if(sessionExists){
			var url = app.URLs.kitShipNow;
			jQuery.ajax({
				type: "GET",
				async: true,
				url: url,
				data: {},
				dataType: 'json',
				success: function(data){
					//widget.shipNowClickBind();
					if(data.errorCode == null){
						showKit = true;
						widget.kdManager.putData(data);
						showErrorMessage(app.resources["SHIP_NOW_SUCCESS"]);
					} else 
						showErrorMessage(data.errorCode);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown){	  
					//alert(errorThrown);
				}
			});
		} else {
			var targetPipeline = '';
			if($('#showKit').val() != "true"){
				if($('#tagetParams').val() != "null"){
					targetPipeline = $('#tagetPipeline').val()+'?showKit=true&'+$('#tagetParams').val()+'&kitcontinue=ship';
				} else {
					targetPipeline = $('#tagetPipeline').val()+'?showKit=true&kitcontinue=ship';
				}
			} else {
				if($('#tagetParams').val() != "null"){
					targetPipeline = $('#tagetPipeline').val()+'?'+$('#tagetParams').val()+'&kitcontinue=ship';
				} else {
					targetPipeline = $('#tagetPipeline').val()+'?kitcontinue=ship';
				}
			}
			app.displayLogin(targetPipeline);
		}
	}else{
		showErrorMessage(app.resources["INSTANT_ACCESS_ADD"]);
	}
}

function saveFrequencyButtonClicked(weeks){
	showKit = null;
	var url = app.URLs.kitChangeFrequency;
	jQuery.ajax({
		type: "GET",
		async: false,
		url: url,
		data: {weeks:weeks},
		dataType: 'json',
		success: function(data){
			if(data.errorCode == null){
				showKit = true;
				widget.kdManager.putData(data);
			}else{
				showErrorMessage(data.errorCode);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){	  
			//alert(errorThrown);
		}
	});
}

function showErrorMessage(error){
	if(error == app.resources["ADDPRODUCT_ERROR"]){
		$('#itemaddedbox').hide();
		$("#previewwindow").hide();
		//$('#overlays').show();
		jQuery('#kitfullmessagewindow').show();
		jQuery('#kitfullmessagewindow').dialog('open');
		
		jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
		jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
		jQuery('.ui-dialog-titlebar').css('top','15px');
		jQuery('#ui-dialog-title-kitfullmessagewindow').remove();
	} else if(error == app.resources["SHIP_NOW_DUPLICATE"]){
		$('#itemaddedbox').hide();
		$("#previewwindow").hide();
		//$('#overlays').show();
		$('#shipnowerrortext').html(error);
		jQuery('#shipnowerrormessagewindow').show();
		jQuery('#shipnowerrormessagewindow').dialog('open');
		
		jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
		jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
		jQuery('.ui-dialog-titlebar').css('top','15px');
		jQuery('#ui-dialog-title-shipnowerrormessagewindow').remove();	
		
		addEventListeners();
	}else{
		$('#itemaddedbox').hide();
		$('#errortext').html(error);
		$('#errormessagewindow').show();
		jQuery('#errormessagewindow').show();
		jQuery('#errormessagewindow').dialog('open');
		
		jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
		jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
		jQuery('.ui-dialog-titlebar').css('top','15px');
		jQuery('#ui-dialog-title-errormessagewindow').remove();
		
		addEventListeners();
	}
}

function addEventListeners(){
	$('#errorokbtn').mouseover(function(){
		$('#errorokbtn').css("cursor", "pointer");
	});
	$('#errorokbtn').click(function(){
		jQuery('#errormessagewindow').dialog('close');
	});
	
	$('#shipnowerrorokbtn').mouseover(function(){
		$('#shipnowerrorokbtn').css("cursor", "pointer");
	});
	$('#shipnowerrorokbtn').click(function(){
		jQuery('#shipnowerrormessagewindow').dialog('close');
	});
}

function learnMoreFunctionCall() {
	var url = app.URLs.kitLearnMore;
	window.open(url, '_blank');
}

function trackPackageButtonClicked(url){
	/*var trackURL = app.util.appendParamToURL(app.URLs.redirectHost, "Location", url);
	alert(trackURL);*/
	window.open(url, '_blank');
}

function moreInfoButtonClicked(){
	var url = app.URLs.kitLearnMore;
	window.open(url, '_blank');
}

function adjustNowClicked(){
	$('#itemaddedbox').hide();
	$('#previewwindow').hide();
	var instantaccess = $("input#instantaccess").val();
	if(instantaccess=="true"){
		var sessionExists = checkSession();
		if(sessionExists){
			jQuery('#adjustfrequencymain').show();
			jQuery('#adjustfrequencymain').dialog('open');
			
			jQuery('.ui-widget-content').parent().removeClass('ui-corner-all');  
			jQuery('.ui-dialog-titlebar').parent().wrapInner('<div class="wapper-dialog ui-corner-all">');
			jQuery('.ui-dialog-titlebar').css('top','15px');
			jQuery('#ui-dialog-title-adjustfrequencymain').remove();
		} else {
			var targetPipeline = '';
			if($('#showKit').val() != "true"){
				if($('#tagetParams').val() != "null"){
					targetPipeline = $('#tagetPipeline').val()+'?showKit=true&'+$('#tagetParams').val()+'&kitcontinue=adjust';
				} else {
					targetPipeline = $('#tagetPipeline').val()+'?showKit=true&kitcontinue=adjust';
				}
			} else {
				if($('#tagetParams').val() != "null"){
					targetPipeline = $('#tagetPipeline').val()+'?'+$('#tagetParams').val()+'&kitcontinue=adjust';
				} else {
					targetPipeline = $('#tagetPipeline').val()+'?kitcontinue=adjust';
				}
			}
			app.displayLogin(targetPipeline);
		}
	}else{
		showErrorMessage(app.resources["INSTANT_ACCESS_ADD"]);
	}
}

function showBazaarInstantError(){
	showErrorMessage(app.resources["INSTANT_REVIEW"]);
}