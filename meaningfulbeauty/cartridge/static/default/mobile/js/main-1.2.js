*
 * All java script logic for the application.
 *
 * The code relies on the jQuery JS library to
 * be also loaded.
 */

// application initialization on dom ready
jQuery(document).ready(function(){
	app.init();
	
	$('#signInTrigger').click(function(){
		var that = jQuery(this);
		var panel = that.next();
		var top = panel.css('top');
		
		if( top == "-75px" ) {
			panel.stop().animate({'top':'0px'}, 600, function(){that.addClass('open');});
		} else {
			panel.stop().animate({'top':'-75px'}, 600, function(){that.removeClass('open');});
		}
		
	});
	
	$('#countryList').click(function(){
		var that = jQuery(this);
		var top = that.css('height');
		
		if( top == "18px" ) {
			that.stop().animate({'height': '288px','top':'-264px'}, 200, function(){});
			that.find('.hideable').css({'display':'list-item'}).click(function(){
				jQuery(this).siblings().removeClass('selected').addClass('hideable');
				jQuery(this).addClass('selected').removeClass('hideable');
				var el = jQuery('a',this);
				var href = el.attr('href');
				setTimeout(function(){
					document.location.href = href;
				},500);
				
				return true;
			});
		} else {
			that.stop().animate({'height':'18px','top':'6px'}, 200, function(){that.find('.hideable').hide();});
			that.find('.hideable').unbind('click');
		}
		
		return false;
	});
	
	var rsWidth = 319;
	if( jQuery.browser.msie && jQuery.browser.version<8 ) {
		rsWidth = 320;
	}
	jQuery('.real-stories-box .previous').live('click',function(){
		var that = jQuery(this);
		var container = jQuery('.carousel-container');
		
		var offset = container.css('left');
		if( offset.indexOf('px')>-1 )
			offset = offset.substring(0,offset.length-2) - 0;
		var lastOffset = (container.find('.before').length-1) * rsWidth;
		offset += rsWidth;
		if( offset>0 ) {
			offset = 0-lastOffset;
		}
		container.animate({'left':offset},600);
	});
	
	jQuery('.real-stories-box .next').live('click',function(){
		var that = jQuery(this);
		var container = jQuery('.carousel-container');
		
		var offset = container.css('left');
		if( offset.indexOf('px')>-1 )
			offset = offset.substring(0,offset.length-2) - 0;
		offset -= rsWidth;
		var lastOffset = (container.find('.before').length-1) * rsWidth;
		if( offset<(-1*lastOffset) ) {
			offset = 0;
		}
		container.animate({'left':offset+'px'},600);
	});
	
	//bind event handler to embed flash player on click. based on legacy functionality
	//found in /js/proactiv/global/behavior/flashSwapBehavior.js
	jQuery("div.video.addVideo div.videoPlay").live('click',function() {
		
		var obj = jQuery(this);
		var parent = obj.parent("div.video.addVideo");
		
		var videoName = parent.attr("id");
		
		parent.removeClass("addVideo");
		
		var width = "177";
		var height = "132";
		
		//looks for elements inside the div 
		var imgs = jQuery("#" + videoName).children('img');
		var divs = jQuery("#" + videoName).children('div');
		var videoLinks = jQuery("#" + videoName).children('a');
		
		var playerSrc = jQuery(videoLinks[0]).attr("href");
		var videoSrc  = jQuery(videoLinks[1]).attr("href");
		var imageSrc  = jQuery(imgs[0]).attr("src");
		var omniName  = (jQuery(videoLinks[1]).attr("title")) ? jQuery(videoLinks[1]).attr("title") : "";
		
		//flash embed ID must be different from parent div id 
		var flashName = videoName + 'name';	
		
		if(videoName == 'largePlayer' || videoName == 'homeVideo'){
			var width = "240";
			var height = "160";	
		}
		
		var embedCode = "<embed id=\"" + flashName + "\" width=\"" + width + "\" height=\"" + height + "\" flashvars=\"" +
						//following lines are flash var definitions
						"imgSrc=" + imageSrc + 
						"&videoSrc=" + videoSrc + 
						"&omnitureVidName=" +  omniName +
						//end flash vars
						"\" allowscriptaccess=\"always\" menu=\"false\" scalemode=\"noScale\" wmode=\"transparent\" quality=\"high\"" +
						" bgcolor=\"#FFFFFF\" name=\"" + flashName + "\" style=\"visibility:visible;\" src=\"" + playerSrc + "\"" +
						" type=\"application/x-shockwave-flash\">";
						
		jQuery(divs[0]).fadeOut("slow");
		jQuery(imgs[0]).fadeOut("slow",function() {
			parent.html(embedCode);
			
		});
		
	});
	
	var popupBG = $("#popupBG");
	if( popupBG.size()<1 ) {
		$('#container').after("<div id='popupBG' />");
		popupBG = $("#popupBG");
	}
	popupBG.hide();
	jQuery('.modal-image').click(function(){
		var dlgEl = jQuery("#testimonial_full");
		if( dlgEl.length<1 ) {
			dlgEl = jQuery('<div id="testimonial_full" style="position:absolute;width:700px;height:500px"></div>');
			popupBG.after(dlgEl);
		}
		popupBG.css({"background-color":"#888","top":"0","position":"absolute","width":"100%","height":"auto","opacity":"0.6"}).fadeIn('slow');

		var contents = jQuery(this).find('.modal-contents').html();
		
		dlgEl.html(contents);
		
		dlgEl.centerFull();
		dlgEl.fadeIn('slow');
		
		return false;
	});
	
	jQuery('#testimonial_full').live('click',function(){
		popupBG.fadeOut('slow');
		jQuery(this).fadeOut('slow');
	});
	
	popupBG.click(function(){
		popupBG.fadeOut('slow');
		jQuery("#testimonial_full").fadeOut('slow');
	});
});

/* dropShadow plugin */ 

(function($){

	  var dropShadowZindex = 1;  //z-index counter

	  $.fn.dropShadow = function(options)
	  {
	    // Default options
	    var opt = $.extend({
	      left: 4,
	      top: 4,
	      blur: 2,
	      opacity: .5,
	      color: "black",
	      swap: false
	      }, options);
	    var jShadows = $([]);  //empty jQuery collection
	    
	    // Loop through original elements
	    this.not(".dropShadow").each(function()
	    {
	      var jthis = $(this);
	      var shadows = [];
	      var blur = (opt.blur <= 0) ? 0 : opt.blur;
	      var opacity = (blur == 0) ? opt.opacity : opt.opacity / (blur * 8);
	      var zOriginal = (opt.swap) ? dropShadowZindex : dropShadowZindex + 1;
	      var zShadow = (opt.swap) ? dropShadowZindex + 1 : dropShadowZindex;
	      
	      // Create ID for shadow
	      var shadowId;
	      if (this.id) {
	        shadowId = this.id + "_dropShadow";
	      }
	      else {
	        shadowId = "ds" + (1 + Math.floor(9999 * Math.random()));
	      }

	      // Modify original element
	      $.data(this, "shadowId", shadowId); //store id in expando
	      $.data(this, "shadowOptions", options); //store options in expando
	      jthis
	        .attr("shadowId", shadowId)
	        .css("zIndex", zOriginal);
	      if (jthis.css("position") != "absolute") {
	        jthis.css({
	          position: "relative",
	          zoom: 1 //for IE layout
	        });
	      }

	      // Create first shadow layer
	      bgColor = jthis.css("backgroundColor");
	      if (bgColor == "rgba(0, 0, 0, 0)") bgColor = "transparent";  //Safari
	      if (bgColor != "transparent" || jthis.css("backgroundImage") != "none" 
	          || this.nodeName == "SELECT" 
	          || this.nodeName == "INPUT"
	          || this.nodeName == "TEXTAREA") {   
	        shadows[0] = $("<div></div>")
	          .css("background", opt.color);                
	      }
	      else {
	        shadows[0] = jthis
	          .clone()
	          .removeAttr("id")
	          .removeAttr("name")
	          .removeAttr("shadowId")
	          .css("color", opt.color);
	      }
	      shadows[0]
	        .addClass("dropShadow")
	        .css({
	          height: jthis.outerHeight(),
	          left: blur,
	          opacity: opacity,
	          position: "absolute",
	          top: blur,
	          width: jthis.outerWidth(),
	          zIndex: zShadow
	        });
	        
	      // Create other shadow layers
	      var layers = (8 * blur) + 1;
	      for (i = 1; i < layers; i++) {
	        shadows[i] = shadows[0].clone();
	      }

	      // Position layers
	      var i = 1;      
	      var j = blur;
	      while (j > 0) {
	        shadows[i].css({left: j * 2, top: 0});           //top
	        shadows[i + 1].css({left: j * 4, top: j * 2});   //right
	        shadows[i + 2].css({left: j * 2, top: j * 4});   //bottom
	        shadows[i + 3].css({left: 0, top: j * 2});       //left
	        shadows[i + 4].css({left: j * 3, top: j});       //top-right
	        shadows[i + 5].css({left: j * 3, top: j * 3});   //bottom-right
	        shadows[i + 6].css({left: j, top: j * 3});       //bottom-left
	        shadows[i + 7].css({left: j, top: j});           //top-left
	        i += 8;
	        j--;
	      }

	      // Create container
	      var divShadow = $("<div></div>")
	        .attr("id", shadowId) 
	        .addClass("dropShadow")
	        .css({
	          left: jthis.position().left + opt.left - blur,
	          marginTop: jthis.css("marginTop"),
	          marginRight: jthis.css("marginRight"),
	          marginBottom: jthis.css("marginBottom"),
	          marginLeft: jthis.css("marginLeft"),
	          position: "absolute",
	          top: jthis.position().top + opt.top - blur,
	          zIndex: zShadow
	        });

	      // Add layers to container  
	      for (i = 0; i < layers; i++) {
	        divShadow.append(shadows[i]);
	      }
	      
	      // Add container to DOM
	      jthis.after(divShadow);

	      // Add shadow to return set
	      jShadows = jShadows.add(divShadow);

	      // Re-align shadow on window resize
	      $(window).resize(function()
	      {
	        try {
	          divShadow.css({
	            left: jthis.position().left + opt.left - blur,
	            top: jthis.position().top + opt.top - blur
	          });
	        }
	        catch(e){}
	      });
	      
	      // Increment z-index counter
	      dropShadowZindex += 2;

	    });  //end each
	    
	    return this.pushStack(jShadows);
	  };


	  $.fn.redrawShadow = function()
	  {
	    // Remove existing shadows
	    this.removeShadow();
	    
	    // Draw new shadows
	    return this.each(function()
	    {
	      var shadowOptions = $.data(this, "shadowOptions");
	      $(this).dropShadow(shadowOptions);
	    });
	  };


	  $.fn.removeShadow = function()
	  {
	    return this.each(function()
	    {
	      var shadowId = $(this).shadowId();
	      $("div#" + shadowId).remove();
	    });
	  };


	  $.fn.shadowId = function()
	  {
	    return $.data(this[0], "shadowId");
	  };


	  $(function()  
	  {
	    // Suppress printing of shadows
	    var noPrint = "<style type='text/css' media='print'>";
	    noPrint += ".dropShadow{visibility:hidden;}</style>";
	    $("head").append(noPrint);
	  });

	})(jQuery);

(function($){
	jQuery.fn.centerVertical = function(){
		var windowHeight = jQuery(window).height();
		var scrollTop = jQuery(window).scrollTop();
		jQuery(this).each(function(){
			var that = jQuery(this);
			var height = that.height();
			var newTop = scrollTop;
			if( windowHeight > height ) {
				newTop = (windowHeight-height)/2+scrollTop;
			}
			that.css('top',newTop);
		});
		return this;
	};
	jQuery.fn.centerHorizontal = function(){
		var windowWidth = jQuery(window).width();
		var scrollLeft = jQuery(window).scrollLeft();
		jQuery(this).each(function(){
			var that = jQuery(this);
			var width = that.width();
			var newLeft = scrollLeft;
			if( windowWidth > width ) {
				newLeft = (windowWidth-width)/2+scrollLeft;
			}
			that.css('left',newLeft);
		});
		return this;
	};
	jQuery.fn.centerFull = function(){
		return this.centerVertical().centerHorizontal();
	};
})(jQuery);

jQuery(function(){
	jQuery("p.emailFriendHeader").bind("click",function(){
		var emailIndex=jQuery("p.emailFriendHeader").index(this);
		if(!jQuery(".emailFriendFeature:eq("+emailIndex+")").hasClass("activ")) {
			jQuery(this).parent(".emailFriendFeature").addClass("activ");
			jQuery(this).unbind("mouseover");
			jQuery(this).unbind("mouseout")
		} else {
			if(jQuery(".emailFriendFeature:eq("+emailIndex+").activ").length>0) {
				jQuery(this).parent(".emailFriendFeature").removeClass("activ");
				jQuery("p.emailFriendHeader").bind("mouseover",function(){
					jQuery(this).parent(".emailFriendFeature").addClass("activhover");
				});
				jQuery("p.emailFriendHeader").bind("mouseout",function(){
					jQuery(this).parent(".emailFriendFeature").removeClass("activhover");
				})
			}
		}
	});
	jQuery("p.emailFriendHeader").bind("mouseover",function(){
		jQuery(this).parent(".emailFriendFeature").addClass("activhover");
	});
	jQuery("p.emailFriendHeader").bind("mouseout",function(){
		jQuery(this).parent(".emailFriendFeature").removeClass("activhover");
	});
	jQuery("#SaS .selectKit li.tab").click(function(){
		var that = jQuery(this);
		var panelsParent = jQuery("#SaS .selectedKit .theKits")
		var myID = this.id;
		
		if( that.hasClass("activated") ) {
			return false;
		} else {
			that.addClass("activated").siblings().removeClass("activated");
			panelsParent.find("."+myID).show().siblings().hide();
		}
	});
	jQuery('.dialog .tabs a').live('click',function(){
		var that = jQuery(this);
		if( that.hasClass('selected') ) return false;
		
		that.parents('.tabs').find('a').removeClass('selected');
		that.addClass('selected');
		if( this.id == 'tabDirections' ) {
			jQuery('#directionsContent').addClass('selectedTab').siblings().removeClass('selectedTab');
		} else {
			jQuery('#ingredientsContent').addClass('selectedTab').siblings().removeClass('selectedTab');
		}
		
		return false;
	});
	jQuery('.dialog .proactiv_close').live('click',function(){
		jQuery(this).parents('.dialogContainer').hide();
		jQuery('#popupBG').fadeOut('fast');
	});
	var popupBG = $("#popupBG");
	if( popupBG.size()<1 ) {
		$('#container').after("<div id='popupBG' />");
		popupBG = $("#popupBG");
	}
	popupBG.hide();
	
	//store last content asset ID
	var lastHref="";
	//open SAS popup
	jQuery('.openOverlay').live('click',function(){
		var href = this.href;
		if( href.indexOf('?')>-1 ) href+="&format=dialog";
		if( href.length<2 ) return false;
		
		var bgheight = "0";
		if ($(window).height() > $("body").height()) {
			bgheight = $(window).height();
		} else {
			bgheight = $("body").height();
		}
		popupBG.css({"background-color":"#888","top":"0","position":"absolute","width":"100%","height":"200%","opacity":"0.6","z-index":"600"}).fadeIn('slow');
		var assetID = this.id+"-body";
		var dlgEl = jQuery("#"+assetID);
		var windowHeight = jQuery(window).height();
		if( dlgEl.length < 1 ) {
			$("#popupBG").after("<div id='"+assetID+"' class='dialogContainer' style='position:absolute;' />");
			dlgEl = jQuery("#"+assetID);
		}
		
		//if (href!=lastHref) {
			dlgEl.load(href, function(){
				jQuery(this).centerFull();
				jQuery(this).fadeIn('slow');

				$("#popupBG").click(function(){ jQuery("#"+assetID).hide(); }); //clicking background closes dialog

			});
		//} else {
			//dlgEl.centerFull();
			//dlgEl.fadeIn('slow');
		
		//}
		
		//lastHref = href;
		return false;
		
	});
	
	jQuery('.giftOption').live('click',function(){
		var that = jQuery(this);
		var rID = this.id;
		if( that.hasClass('giftSelected') ) {
			return false;
		} else {
			that.addClass('giftSelected').siblings().removeClass('giftSelected');
			jQuery('.kitPriceBox .'+rID).addClass('selected').siblings().removeClass('selected');
		}
		return false;
	});
	
	jQuery('.openMe').live('click',function(){
		if( jQuery(this).parents('.activePanel').size()>0 ) return false;
		
		jQuery('.activePanel .panel_body').animate({height:0},800);
		jQuery(this).parents('.panel').find('.panel_body').animate({height:159},800);
		jQuery('.activePanel .openMe p').hide();
		jQuery('.activePanel').removeClass('activePanel');
		jQuery('p', this).show();
		jQuery(this).parents('.panel').addClass('activePanel');
	});
	jQuery('.panel p a').live('click',function(){document.location=this.href;});
	
	var ThumbArea = {
		numPages : -1,
		currentPage : 0,
		doMove : function(scrollPosition) {
			jQuery("#thumbMask").animate({"left":scrollPosition},250);
			//return new Effect.Move("scrollerContent",{x:scrollPosition,mode:"absolute",duration:0.25});
		},
		refreshPaginationControls : function(el){
			var context=el.parents('.thumbArea');
			var controls={back:context.find("a.previous"),next:context.find("a.next")};
			
			controls.back.css({'visibility':"visible"});
			controls.next.css({'visibility':"visible"});
			if(this.currentPage==0){
				controls.back.css({'visibility':"hidden"});
			} else {
				if(this.numPages==(this.currentPage+1)){
					controls.next.css({'visibility':"hidden"});
				}
			}
			context[0].className="thumbArea s"+this.currentPage;
		}
	};
	jQuery('.thumbArea .previous,.thumbArea .next,.thumbArea .setController li').live('click',function(){
		var theElement=jQuery(this);
		var className=this.className;
		var viewPort=$(".smScroller");
		var scrollContainer=$("#thumbMask");
		var itemsToScroll=scrollContainer.find("ul");
		var pageWidth=viewPort.width()+5;
		var contentWidth=0;
		itemsToScroll.each(function(){
			contentWidth+=jQuery(this).width();
		});
		ThumbArea.numPages=Math.ceil(contentWidth/pageWidth);

		switch(className){
		case "next":
			if((ThumbArea.currentPage+1)<ThumbArea.numPages){
				ThumbArea.currentPage++;
				ThumbArea.doMove(ThumbArea.currentPage*-pageWidth);
			} else {
				ThumbArea.currentPage = 0;
				ThumbArea.doMove(ThumbArea.currentPage*-pageWidth);
			}
			break;
		case "previous":
			if(ThumbArea.currentPage!=0){
				ThumbArea.currentPage--;
				ThumbArea.doMove(ThumbArea.currentPage*-pageWidth);
			} else {
				ThumbArea.currentPage = ThumbArea.numPages-1;
				ThumbArea.doMove(ThumbArea.currentPage*-pageWidth);
			}
			break;
		default:
			var clickedPage = theElement.prevAll('li').size();
			if(ThumbArea.currentPage!=clickedPage){
				ThumbArea.currentPage = clickedPage;
				ThumbArea.doMove(ThumbArea.currentPage*-pageWidth);
			}
			break;
		}
		ThumbArea.refreshPaginationControls(theElement);
		
		return false;
	});
	
});

function showIframeInPopup( overlayId,modalId,url,height,width,noScroll,urlAfterClose ){
	jQuery("#"+modalId).remove();
	jQuery("#"+overlayId).remove();
	jQuery("body").append('<div id="'+overlayId+'"></div><div id="'+modalId+'"><div class="closeModal">CLOSE</div></div>');
	jQuery("#"+overlayId).css("opacity",0.6);
	jQuery("#"+modalId).append('<iframe src ="'+url+'" width="'+(width?width:"98%")+'" height="'+(height?height:400)+'"'+(noScroll?' SCROLLING="no"':' SCROLLING="yes"')+' FRAMEBORDER="0" MARGINWIDTH="0"  MARGINHEIGHT="0" ></iframe>');
	
	jQuery("#"+overlayId+",#"+modalId).fadeIn("fast");
	jQuery("#"+overlayId+",div.closeModal").click(function(){
		if(urlAfterClose){
			window.location=urlAfterClose;
		}
		jQuery("#"+overlayId+",#"+modalId).fadeOut("fast");
	});
}


function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}		

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


function fsOmniPopupCount() {
  // friendly exit page name = loggin status + omni page name
  // login status
  var loginStatus = "foresee:";
  var reportSuite = "";
  var fsPageName = "";

  if(typeof getCookie == 'function') {
	loginStatus += (getCookie('loggedin') > 0) ? "loggedin:" : "notloggedin:";
  }
	  
  reportSuite = s_account;
  fsPageName = omnPageName;
	 
  var friendName = loginStatus + fsPageName;
  var s=s_gi(reportSuite);
  s.linkTrackVars='events';
  s.linkTrackEvents='event8';
  s.events='event8';
  s.tl(this,'o',friendName);
  
  // reset all omniture vars, so next omniture will not pick it up.
  s.linkTrackVars='';
  s.linkTrackEvents='';
  s.events='';
  }


