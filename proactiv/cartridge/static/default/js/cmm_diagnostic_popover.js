document.writeln('<style>#DrWalkthrough #myContent{ margin-left:15px; }</style>');

function params(wut,qp,dflt){ dflt=(dflt==null)?'':dflt; try{r=unescape(wut.match(new RegExp(qp+"=+([^&;]*)"))[1]);}catch(qp){r=dflt;} return r; }

var diagnosticPopup=function(){
	this.write=function(){ //CREATE THE POPOVER DIV
		var myhtml='<div id="diagnostic-container" style="width:613px; height:323px; position:absolute; top:-500px; z-index:10000;"><div id="diagnostic-popover" style="width:743px; height:391px; background:url(/on/demandware.static/Sites-Proactiv-Site/-/default/v1377726707995/images/diagnostic/popup-background.png) no-repeat; position:relative;"><a href="#" id="diagnostic-no-button"><img src="/on/demandware.static/Sites-Proactiv-Site/-/default/v1377726707995/images/diagnostic/button-no.png" alt="No Thanks" style="position:absolute; top:235px; left:75px;" /></a><a href="#" id="diagnostic-start-button"><img src="/on/demandware.static/Sites-Proactiv-Site/-/default/v1377726707995/images/diagnostic/button-start.png" alt="Start" style="position:absolute; top:235px; left:338px;" /></a></div></div>';
		$(myhtml).appendTo("body");
	}

	this.setCookie=function(){ //PLANT THE COOKIE FOR THIS TIME TOMORROW
		var thisTimeTomorrow=new Date();
		thisTimeTomorrow.setDate(thisTimeTomorrow.getDate()+1);
		document.cookie="shownDiagnosticPopup=true; expires="+thisTimeTomorrow.toGMTString()+";path=/;";
	}
	this.checkCookie=function(){ //CHECK FOR COOKIE OR QUERY PARAM AND MAKE SURE NOT IN CART
		return ((params(document.cookie,'shownDiagnosticPopup','false')=='false' || params(location.search,'showdiagnosticpopup','false')=='true') && location.href.match(/cart/gi)==null);
	}

	this.show=function(){ //SHOW THE POPUP
		var topStop=Math.round(($(window).height()-$("#diagnostic-container").height())/2)+$(document).scrollTop()+'px';
		$("#diagnostic-container").animate({ 'top':topStop },2500);
		document.getElementById("diagnostic-container").style.left=Math.round(($(window).width()-$("#diagnostic-container").width())/2)+'px';
		this.setCookie();
		s.tl(this,'o','dt_tool_open_popover');
		s_objectID='dt_tool_open_popover';
	}
	this.bind=function(){ //BIND CLICKS TO NO THANKS AND START
		$("#diagnostic-no-button").click(function(e){ //BIND THE NO THANKS BUTTON
			e.preventDefault();
try{ /*Omniture*/
s.linkTrackVars='prop56,eVar56'; s.prop56="diagnostic_tool_nothanksbutton"; s.eVar56=s.prop56; s.tl(this,'o','proactiv:'+s.pageName+':nothanksbutton'); s_objectID='dt_nothanksbutton';
}catch(e){}
			$("#diagnostic-container").hide();
		});
		$("#diagnostic-start-button").click(function(e){ //BIND THE START BUTTON
			e.preventDefault();
try{ /*Omniture*/
s.linkTrackVars='prop56,eVar56'; s.prop56="diagnostic_tool_startbutton"; s.eVar56=s.prop56; s.tl(this,'o','proactiv:'+s.pageName+':startbutton'); s_objectID='dt_startbutton';
}catch(e){}
			$("#diagnostic-container").hide();

//STOLE THIS PART FROM THE PAGE
	jQuery("#DrWalkthrough").remove();
	jQuery("<div/>").attr("id", "DrWalkthrough").html("").appendTo(document.body);
	app.createDialog({id: 'DrWalkthrough', options: {
		bgiframe: true,
		modal: true,
		height:816,
	   	width: 825,
		title:'',
	   	resizable: false
	}});
	jQuery("#DrWalkthrough").parent().css('background','none');
	jQuery("#DrWalkthrough").addClass('ui-corner-all');
	var objtitle= jQuery("#DrWalkthrough").siblings('.ui-dialog-titlebar');
	objtitle.find('.ui-dialog-titlebar-close').addClass('drwalkthrough-close').removeClass('ui-dialog-titlebar-close');
	jQuery('#DrWalkthrough').dialog('open');

if (!(/msie 10/i.test(navigator.userAgent))){ //IE10 DOESN'T LIKE THE MODAL DIALOG WITH THIS VERSION OF JQUERY
	jQuery('#DrWalkthrough').load("/on/demandware.store/Sites-Proactiv-Site/default/DrWalkthrough-Launch?uci=US-PA-C-DI-GR-53162");
} else {
	jQuery('#DrWalkthrough').load('/on/demandware.store/Sites-Proactiv-Site/default/Page-Show?cid=popup-drwalkthrough&uci=US-PA-C-DI-GR-53162');
}

	return false;


//END OF STOLEN PART			

		});
	}
	this.init=function(){
		if (this.checkCookie()){
			this.write();
			setTimeout(function(){ poppy.show(); },3000);
			this.bind();
		}
	}

}


var poppy=new diagnosticPopup();
$(window).load(function(){
poppy.init();
});