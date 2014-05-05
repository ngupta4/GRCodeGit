var retentioncommon = {};
retentioncommon.ui = {
		reuseable:{
			
			setprop: function(e){
				
				DialogData.url=e.url;
				DialogData.height=e.height;
				DialogData.width=e.width;
				DialogData.closebuttonclass=e.closebuttonclass;
				DialogData.wrapperClass=e.wrapperClass;
				DialogData.element="#"+e.element;
				
				
				},
		
			 exec : function(){	
					
					
					if(DialogData.url != "" && DialogData.url != "undifined" ){
						
						jQuery("#newdialogbox").remove();
						jQuery("<div/>").attr("id", "newdialogbox").html("").appendTo(document.body);
						
						jQuery("#newdialogbox").dialog({
							bgiframe: true,
							autoOpen: false,
							modal: true,
							resizable: false,
							draggable: false,
							autoResize: false,
							height: DialogData.height,			
							width: DialogData.width,
							dialogClass:DialogData.wrapperClass
							
						});
						
						
						jQuery("#newdialogbox").css("width", DialogData.width+'px');
						jQuery("#newdialogbox").css("max-height", DialogData.height);
						jQuery("#newdialogbox").css("overflow-y", "scroll");
						jQuery("#newdialogbox").css("overflow-x", "hidden");
						jQuery("#newdialogbox").siblings('.ui-dialog-titlebar').find(".ui-dialog-titlebar-close").addClass(DialogData.closebuttonclass);
						jQuery("#newdialogbox").load(DialogData.url);					
						jQuery("#newdialogbox").dialog('open');
						
						
					}
					
					else{
							
							jQuery(DialogData.element).dialog({
								bgiframe: true,
								autoOpen: false,
								modal: true,
								resizable: false,
								draggable: false,
								autoResize: false,
								height: DialogData.height,			
								width: DialogData.width,
								dialogClass:DialogData.wrapperClass
							});
							
							jQuery(DialogData.element).siblings('.ui-dialog-titlebar').find(".ui-dialog-titlebar-close").addClass(DialogData.closebuttonclass);
							jQuery(DialogData.element).show();
							jQuery(DialogData.element).dialog('open');
							
					}
						
					jQuery(DialogData.element).dialog('open');
				}
			
		},
		
	
		newDialog :{		
		   element : ".newDialog",
			  init : function(){			
				  jQuery('.newDialog').click( function() {
						var _self=jQuery(this);
						var DialogDataurl=_self.attr('href');
						var DialogDataheight=_self.attr('data-height');
						var DialogDatawidth=_self.attr('data-width');
						var DialogDatatitle=_self.attr('data-tittle');
						var DialogDataclosebuttonclass=_self.attr('data-closebuttonclass');
						var DialogDatawrapperClass=_self.attr('data-wrapperClass');						
						var DialogDataelement="#"+_self.attr('id');						
						DialogDatawidth= parseInt(DialogDatawidth);
						DialogDataheight =parseInt(DialogDataheight);
						
						jQuery("#newdialogbox").remove();
						jQuery("<div/>").attr("id", "newdialogbox").html("").appendTo(document.body);
							jQuery("#newdialogbox").dialog({
								bgiframe: true,
								autoOpen: false,
								modal: true,
								resizable: false,
								draggable: false,
								autoResize: false,
								height: DialogDataheight,
								title:DialogDatatitle,
								width: DialogDatawidth,
								dialogClass:DialogDatawrapperClass
								
							});
							
								
							jQuery("#newdialogbox").load(DialogDataurl);					
							jQuery("#newdialogbox").dialog('open');	
							
					return false
					});
				}		
		},
		
		phonenumber :{
			element : "#eve_phone_1",
			init : function(){
			
				jQuery("#eve_phone_1,#eve_phone_2,#eve_phone_3,#day_phone_1,#day_phone_2,#day_phone_3").keyup(function () {
					var maxLength = $(this).attr('maxlength');
					if($(this).val().length == maxLength) {
						$(this).next().focus();
					}
				});
		 	}

			},
		
	
		quantitylilinks :{
			element : "#minicart",
			init : function(){
				
				// creating object for dialog properties
				DialogData=new Object();
				
				//click event on mini-cart icon 
				jQuery(".minicarttotalIcon").click(function() {
                    window.location.href = shoppingCartURL;
				});
				
			}	
		}		
	
};

retentioncommon.init = function () {
    $.each(retentioncommon.ui, function (n, v) {
        if ($(v.element).length > 0 && typeof v.init === "function") {
        	retentioncommon.ui[n].element = $(v.element);
            v.init();
        }
    })
};




jQuery(document).ready(function() {	
	retentioncommon.init();
	
});