/*
 * Some java script logic for the application.
 * It contains all the client side script code for custom interactions.
 * The code relies on the jQuery JS library to
 * be also loaded.
 */
jQuery(document).ready(function(){
	/**
	 * Customer Reviews pagination
	 */
	if("*:has(#customerreviewhidden)"){
		initPagination();
	}
	
	
	
	
});
/** 
 * Initialization function for pagination
 */
function initPagination() {
	var num_entries = jQuery('#customerreviewhidden div.reviews').length;
    // Create content inside pagination element
    jQuery(".paginationblock").pagination(num_entries, {
    	items_per_page: 1, // Show only one item block per page
    	callback: function (page_index, jq){
	        var new_content = jQuery('#customerreviewhidden div.reviews:eq('+page_index+')').clone();
	        $('#viewresult').empty().append(new_content);
	        return false;
	    },
	    prev_text:"Previous &#8249;",
		next_text:"	&#8250; More"
   });
 }

/** 
 * 
 */
function creatOrderByAjax() {
    jQuery.ajax({
        url: app.URLs.createOrder,
        async: true,
        cache: false,
        success: function(data, textStatus){ }
    });
    return true;
}

var main = (function(jQuery){

	if (!jQuery) {
		alert(app.resources["MISSING_LIB"]);
		return null;
	}
	
	return {
		modal : {
			open : function(url, title) {
				// create the dialog container if not present already
				if(jQuery("#modalcontainer").length == 0) {
					jQuery(document.body).append("<div id=\"modalcontainer\"></div>");
				}

				// set a default title
				title = title || "Dialog";

				// finally load the dialog, set the dialog title
				app.ajax.load({
					selector: "#modalcontainer",
					url: url,
					callback: function() {
						main.modal.checkOpen();
						main.modal.setTitle(title);
					}
				});
			},
			checkOpen : function() {
				if(!jQuery("#modalcontainer").dialog("isOpen")) {
					jQuery("#modalcontainer").dialog({
						bgiframe: true,
						autoOpen: false,
						modal: true,
						overlay: {
				    		opacity: 0.5,
				     		background: "black"
						},
				    	height: 725,
				    	width: 1050,
				    	resizable: false
					});
					jQuery("#modalcontainer").dialog("open");
				}
			},
			setTitle : function(title) {
				jQuery("#modalcontainer").dialog("option", "title", title);
			}
		}
	}
})(jQuery);