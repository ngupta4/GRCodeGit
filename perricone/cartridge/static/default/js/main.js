var main = (function(jQuery){

	if (!jQuery) {
		alert(app.resources["MISSING_LIB"]);
		return null;
	}
	
	return {
		modal : {
			open : function(reference, title) {
				// create the dialog container if not present already
				if(jQuery("#modalcontainer").length == 0) {
					jQuery(document.body).append("<div id=\"modalcontainer\"><center></center></div>");
				}

				// set a default title
				title = title || "";
				
				//add reference to dialog
				jQuery("#modalcontainer center").html(reference);
				
				main.modal.checkOpen();
				main.modal.setTitle(title);
				
				//this resets the dialog to not 
				//jump to the top of the page
				jQuery(".ui-dialog-titlebar-close").removeAttr("href");
				jQuery("#modalcontainer").bind("dialogbeforeclose",function(event,ui) { 
					jQuery("#modalcontainer center").empty();
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
				    	height: 400,
				    	width:800,
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