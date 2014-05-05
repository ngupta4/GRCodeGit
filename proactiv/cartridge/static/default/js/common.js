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

//For handling Add to Kit Pricing for Higher Price Segments (5 and 9 presently).
var differentKitPriceSegment = $("input#semiKitAvailable").val();
if(differentKitPriceSegment == 'true')
{
	$(".diffBrandShow").show();
	$(".diffBrandHide").hide();
}
//Till here for add to kit price handling
jQuery(document)
		.ready(
				function() {
					equalHeight($(".productlisting .producttile .swatches"));
					equalHeight($("#mycarousel li .producttile .gr-bg-wraper .white-bg .description"));
					equalHeightname($("#mycarousel li producttile .gr-bg-wraper .white-bg .name"));
					equalHeightname($("#mycarousel li .producttile .gr-bg-wraper .white-bg .name"));
					equalHeight($("#mycarousel li .producttile .producttilemain .white-bg"));
					equalHeight($("#mycarousel li .producttile .gr-bg-wraper .white-bg"));
					equalHeight($(".popularKit li.kit"));
					jQuery('.content-nav li div.subnav').each(
							function() {
								jQuery(this).find('div.category').each(
										function(index) {
											if (index >= 4) {
												jQuery(this).css('padding',
														'0px').addClass('cat5')
														.siblings().addClass('cat5');
												jQuery(this).parents('li').addClass('big');
											}
										});
							});
					jQuery('#secondarynavtap li ul').each(
							function() {
								jQuery(this).find('.active').parent().css(
										'display', 'block');
								jQuery(this).find('.active').parent().parent()
										.addClass('active');
							});
					jQuery('#secondarynavtap ul li.active ul li:last').css(
							'background', 'none');
				});

// Hide Duplicate Error Messages ///////////////

jQuery("#numberId").keydown(function(){
	$(this).removeClass('errormessage');	
	//$('.creditcard .value span.errormessage').hide();
});

$(".cardtype select").each(function(){
 $(this).bind('change', function(){
	 $(".creditcard").find("span.errormessage").hide();
	 })
});

$(".expirationdate select").each(function(){
 $(this).bind('change', function(){
	 $(".expirationdate").find("span.errormessage").hide();
	 })
 });

/*jQuery('.category-nav li').each(function() {
	$(this).mouseover(function() { //NO LONGER NECESSARY BUT LEAVING IT JUST IN CASE
		var nav_in = $(this).next();
		nav_in.addClass('first');
	})
	$(this).mouseout(function() {
		var navout = $(this).next();
		navout.removeClass('first');
	})
});*/

var mycatmatches=location.href.match(/\/cat\/(\w+)/);  //FIND THE CATEGORY IF IN URL
if (mycatmatches!=null && mycatmatches.length>1){
	$("#"+mycatmatches[1]).addClass("active");
	$("#"+mycatmatches[1]).next().addClass("next");
}

if (jQuery('.category-nav li').size() > 0) {
	var navcount = jQuery('.category-nav li').size();
	var navcount2 = navcount - 1;
	jQuery('.category-nav li' + ':nth-child(' + navcount + ')').addClass('right');
	jQuery('.category-nav li' + ':nth-child(' + navcount2 + ')').addClass('right');
	jQuery('.category-nav li:first').addClass('first');
	jQuery('.content-nav li:nth-child(2)').addClass('big');
	jQuery('.content-nav li:nth-child(3)').addClass('sub3');
	jQuery('.content-nav li:nth-child(4)').addClass('sub4');
} 

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

jQuery('.spotlight-videos .video .video-overlay,.spotlight-videos .video a,.anyvideoPlay, .anyvideoPlaylink a').click(
					function() {
						jQuery("#VideoViewDialog").remove();
						jQuery("<div/>").attr("id", "VideoViewDialog").html("").appendTo(document.body);
						app.createDialog( {
							id : 'VideoViewDialog',
							options : {
								bgiframe : true,
								modal : true,
								closeOnEscape : false,
								width : 715,
								title : '',
								resizable : false
							}
						});
					var urlvedio = jQuery(this).attr('href');
					jQuery("#VideoViewDialog").parent().css('background','none');
					jQuery("#VideoViewDialog").addClass('ui-corner-all');
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
function closeWalkThrough() {
	jQuery('#DrWalkthrough').hide();
	jQuery('.ui-widget-overlay').dialog('close');
	window.location.href = "${URLUtils.url('Home-Show')}";
	return false;
}
function popChatBox(pageId, params) {
	inqCustData = params;
	Inq.launchChatNowByPageID(pageId);
}

function myFunction() {
	alert("Hello World!");
}
jQuery('#Mapflv area').click(
		function() {
			
	  	var url = jQuery(this).attr('href');			  			  			 
	   	var el = document.createElement("iframe");
	  	el.setAttribute('id', 'VideoViewDialogbox');
	  	document.body.appendChild(el);
	  	el.setAttribute('src', url);
	  	var horizontalPadding = 30;
	  	var verticalPadding = 30;
	  	var startWidth = 670;
	  	var startHeight = 510;
  	jQuery('#VideoViewDialogbox').dialog({
  	    	autoOpen: true,
  	        width: 687,
  	        height: 580,
  	        modal: true,
  	        resizable: false,
  	        autoResize: true,
  	        title:'',
  	        overlay: {
  	        	opacity: 0.5,
  	            background: "black"
  	        }
  	    }).width(startWidth-horizontalPadding).height(startHeight-verticalPadding);
  	jQuery("#VideoViewDialogbox").parent().css('background','none');
	jQuery("#VideoViewDialogbox").addClass('ui-corner-all');
	var objtitle = jQuery("#VideoViewDialogbox").siblings('.ui-dialog-titlebar');
	objtitle.find('.ui-dialog-titlebar-close').addClass('quickViewDialog-close').removeClass('ui-dialog-titlebar-close');

			return false;
		});


/*

These classes handle the timing of the menu nav display. For now we want to leave this here for contextual reasons.
However, at some point, we should consider moving this into app.js.

*/


function MenuItemGroup() {
	this.menuItems = new Array();
	
	this.addMenuItem = function(item) {
		this.menuItems.push(item);
		item.itemGroup = this;
	}
	
	this.stopShow = function() {
		var i = 0;
		while(this.menuItems[i]) {
			var item = this.menuItems[i];
			item.shouldDisplay = false;
		i++;
		}
	}
	
	this.removeItem = function(item) {
		//var indexconfirmation = this.menuItems.indexOf(item);		
		//this.menuItems.splice(indexconfirmation, 1);
	}
}

function MenuItem() {
	this.shouldDisplay = false;
	this.itemGroup;
	
	this.display = function(item) {
		var happy = this;
		setTimeout(function(){
			if(happy.shouldDisplay) {
				jQuery(item).find("a").addClass("hover");
				jQuery(item).addClass("hover");
		    	jQuery(item).find("div.subnav").slideDown(200)
				jQuery(item).siblings("li").find("div.subnav").hide();
			}
			
			happy.itemGroup.removeItem(happy);
		},300);
	}
	
	this.init = function() {
	
	 	menuItemArray.push(this);
	}
}


jQuery('.terms-condition-overlay').click(function () {
    jQuery("#terms-ba").remove();
    jQuery("<div/>").attr("id", "terms-ba").html("").appendTo(document.body);
    app.createDialog({
        id: 'terms-ba',
        options: {
            bgiframe: true,
            modal: true,
            closeOnEscape: true,
            width: 660,
            height: 425,
            title: 'Terms and Conditions',
            resizable: false
        }
    });
    var urlvedio = jQuery(this).attr('href');
    jQuery("#terms-ba").parent().css('background', '#fff').css('padding', '22px 22px 12px 35px');
    var objtitle = jQuery("#moreInfo").siblings('.ui-dialog-titlebar');
    jQuery('#terms-ba').load(urlvedio);
    jQuery('#terms-ba').dialog('open');

    $(".ui-widget-overlay").click(function () {
        jQuery(".ui-dialog").hide();
        jQuery(".ui-widget-overlay").hide();
    }); //clicking background closes dialog

    return false;
});
var menuItemGroup = new MenuItemGroup();

jQuery(document).ready(function(){
	common.init();
	jQuery(".content-nav li, .category-nav li, .solution, .accountnav").hover(function() {
	    var item = this;
	    var menuItem = new MenuItem();
	    menuItemGroup.addMenuItem(menuItem);
	    menuItem.shouldDisplay = true;
	    menuItem.display(item);
	    
	}, function() {
		menuItemGroup.stopShow(menuItemGroup);
		jQuery(this).find("div.subnav").slideUp(10);
		jQuery(this).find("a").removeClass("hover");
		jQuery(this).removeClass("hover");
	});
	
	jQuery(".accountnav a").hover(function(){
		var self = this;
		setTimeout(function(){
			jQuery(this).addClass("hover");
			jQuery(this).parent().addClass("hover");
			jQuery(this).find(".dropdownbox").slideDown(200);
			jQuery(".content-nav li, .category-nav li").find("div.subnav").hide();
		},300);
	});
});






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
				    // alert("upcCode " + upcCode);
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
		}


};

common.init = function () {
    $.each(common.ui, function (n, v) {
        if ($(v.element).length > 0 && typeof v.init === "function") {
        	common.ui[n].element = $(v.element);
            v.init();
        }
    })
};
