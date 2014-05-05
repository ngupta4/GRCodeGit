jQuery(document).ready(function() {

	equalHeightname($(".product.producttile .productName"));
	equalHeightname($(".product.producttile .productName"));
	
	equalHeight($(".product.producttile"));
	equalHeight($(".product.producttile"));	
	equalHeight($(".sasTabs .kitRating"));	
	//equalHeight($(".sasTabs .kitInclude"));
	//equalHeight($(".sasTabs .bonusGifts"));	
	equalHeight($(".sasTabs .kitSummary"));
	equalHeight($(".sasTabs .productDetails"));
//	equalHeight($(".sasTabs .orderNowSideBySide"));
	
		
	
		/*---------------------------------------------------------------
		 * Omniture Customer Service and Sign In widget events
		 * --------------------------------------------------------------*/
		$('.omniCustomerService').click(function() {
			s.linkTrackVars='events';
			s.linkTrackEvents='event36';
			s.events="event36";	
			s.tl(this,'o',"Customer Service/QA"); 
		});
		
		$('#nav-faqs').click(function() {
			s.linkTrackVars='events';
			s.linkTrackEvents='event36';
			s.events="event36";	
			  s.tl(this,'o',"Customer Service/QA"); 
		});
		
		$('#sitemap-faqs').click(function() {
			s.linkTrackVars='events';
			s.linkTrackEvents='event36';
			s.events="event36";	
			  s.tl(this,'o',"Customer Service/QA"); 
		});
		
		
		function omnformStart(){
			s.linkTrackVars='events,prop26,eVar26';
			s.linkTrackEvents='event4';
			s.prop26="signinwidget";
		    s.eVar26=s.prop26;
		    s.events="event4";	
		    s.tl(this,'o',"signinwidget");
		}	
		jQuery('#signInTrigger').mouseup(function(){	
			if($(this).hasClass('opened')){
				
			}else{
				omnformStart();
			}
		});
		/*---------------------------------------------------------------
		 * Omniture Events Ends..
		 * --------------------------------------------------------------*/
		
});


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


function popChatBox(pageId, params) {
	inqCustData = params;
	Inq.launchChatNowByPageID(pageId);
}



//Makes for an awesome Country popup
