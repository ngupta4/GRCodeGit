jQuery(document)
		.ready(
				function() {

					equalHeight($("#mycarousel li .producttile .gr-bg-wraper .white-bg .description"));
					equalHeightname($("#mycarousel li producttile .gr-bg-wraper .white-bg .name"));
					equalHeightname($("#mycarousel li .producttile .gr-bg-wraper .white-bg .name"));
					equalHeight($("#mycarousel li .producttile .producttilemain .white-bg"));
					equalHeight($("#mycarousel li .producttile .gr-bg-wraper .white-bg"));
					jQuery('.content-nav li div.subnav').each(
							function() {
								jQuery(this).find('div.category').each(
										function(index) {
											if (index >= 4) {
												jQuery(this).css('padding',
														'0px').addClass('cat5')
														.siblings().addClass('cat5');
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
								title : '',
								resizable : false
							}
						});
						var urlvedio = jQuery(this).attr('href');			
						jQuery('#dialogbox').load(urlvedio);
						jQuery('#dialogbox').dialog('open');
						
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
var navcount = jQuery('.category-nav li').size();
var navcount2 = navcount - 1;
jQuery('.category-nav li' + ':nth-child(' + navcount + ')').addClass('right');
jQuery('.category-nav li' + ':nth-child(' + navcount2 + ')').addClass('right');
jQuery('.category-nav li:first').addClass('first');
jQuery('.content-nav li:nth-child(2)').addClass('big');
jQuery('.content-nav li:nth-child(3)').addClass('sub3');
jQuery('.content-nav li:nth-child(4)').addClass('sub4');

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


//Dialog Util
var MBCOMMON = {};
MBCOMMON.ui = {
		
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
	                jQuery("#moreInfo").parent().css('background', '#fff').css('padding', '10px 22px 12px 35px');
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

MBCOMMON.init = function () {
    $.each(MBCOMMON.ui, function (n, v) {
        if ($(v.element).length > 0 && typeof v.init === "function") {
        	MBCOMMON.ui[n].element = $(v.element);
            v.init();
        }
    })
};

//On page ready execute from here
jQuery(document).ready(function(){
	
	MBCOMMON.init();

});