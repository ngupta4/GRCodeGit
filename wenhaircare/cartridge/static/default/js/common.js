function params(wut,qp,dflt){ dflt=(dflt==null)?'':dflt; try{r=unescape(wut.match(new RegExp(qp+"=+([^&;]*)"))[1]);}catch(qp){r=dflt;} return r; }

jQuery(document).ready(function() {
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

	

					equalHeightname($(".product.producttile .productName"));

					equalHeightname($(".product.producttile .productName"));

					equalHeightname($(".orderWraper .whiteBg"));

					equalHeight($(".product.producttile"));

					equalHeight($(".product.producttile"));

					

					

							//Menu functions for Country popup

								$("ul#locale_selector").mouseenter(openCountry);

								$("ul#locale_selector li").click(popAndLoad);

								

								/*Kit Modal Pop ups*/

								jQuery('.kitModalPopUp').click(function() {

									jQuery("#dialogbox").remove();

									jQuery("<div/>").attr("id", "dialogbox").html("").appendTo(document.body);

									app.createDialog( {

										id : 'dialogbox',

										options : {

											bgiframe : true,

											modal : true,

											closeOnEscape : true,

											width : 500,

											height : 167,

											title : '',

											resizable : false

										}

									});

									var urlvedio = jQuery(this).attr('href');			

									jQuery('#dialogbox').load(urlvedio);

									jQuery('#dialogbox').dialog('open');

									

									s.linkTrackVars='prop10,eVar10';

									var title= $(this).attr('title');



								   // var linkObject=s.linkHandler('grdev.com','o','true');

								    s.prop10=s.pageName+'>productmodal:'+title;

								    s.eVar10=s.prop10;

									s.tl(this,'o',""); 

									

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



var menuItemGroup = new MenuItemGroup();



jQuery(document).ready(function(){

	

	jQuery(".solution").hover(function() {

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

	



// Adding active class on navigation by checking heading of the page.	

	

	if($("body h2").hasClass("categoryTitle"))

		{

			var heading =$(".categoryTitle").attr("class");

			var heading = heading.split(" "); 	

			$( ".category-nav li."+heading[1]).addClass("active");	


		}		



		if (params(location.search,'cgid','')=="ALL"){
$(".ALL").addClass("active");
}


if (location.href.indexOf('cat-special-offering')>0){
$(".special-offering").addClass("active");
}


	 

});