(function(app){
	if (app){
		app.Product = function(response) {
			var getAddToCartBtn = function(thisProduct) {
				var addToCartBtn = jQuery(thisProduct.containerId+" .addtocartbutton:last").click(function(e) {
					alert(thisProduct.containerId);
					if (model.master || model.variant) {
						if (thisProduct.selectedVar == null) {
							return false;
						}
						
						// it is necessary to update the option id to be variant-specific
						jQuery(thisProduct.containerId+" .product_options:last select").each(function(){
							 var value = thisProduct.selectedOptions[this.id];
							 var newId = this.id.replace(thisProduct.pid, thisProduct.selectedVar.id);
							 thisProduct.selectedOptions[newId] = value; 
							 delete thisProduct.selectedOptions[this.id];
							});
													
						thisProduct.selectedOptions.pid = thisProduct.selectedVar.id;
						thisProduct.selectedOptions.masterPid = thisProduct.pid;						
					}
					else {
						// check if we are adding a bundle/productset to the cart
						if (model.bundle || model.productSet) {							
							var subProducts = thisProduct.subProducts;
							var comma 		= ",";
							var tempQty 	= "";
							var subproduct 	= null;
							
							thisProduct.selectedOptions.childPids = "";
														
							if (model.productSet) {
								thisProduct.selectedOptions.Quantity = "";
							}
							
							// process each individual products in the set/bundle
							// and prepare product.selectedOptions for final submission
							for (var i = 0; i < subProducts.length; i++) {
								subproduct = subProducts[i];
								
								if (i == subProducts.length - 1) {
									comma = ""; // at the end of the list
								}
								
								// see if any of the sub products are variations, if so then get the selected variation id
								// from selectedVar property and make it a comma separated list
								if (subproduct.variant || subproduct.master) {									
									if (subproduct.selectedVar == null) {
										return false;
									}
									thisProduct.selectedOptions.childPids += subproduct.selectedVar.id+comma;
								}
								else {
									thisProduct.selectedOptions.childPids += subproduct.pid+comma;
								}
								
								var tempPid = subproduct.selectedOptions.pid;
								subproduct.selectedOptions.pid = null;
								// merge selected options of sub product with the main product
								thisProduct.selectedOptions = jQuery.extend({}, thisProduct.selectedOptions, subproduct.selectedOptions);
								subproduct.selectedOptions.pid = tempPid;
								
								// if it is a product set then sub products can have their separate qty
								if (model.productSet) {
									tempQty += subproduct.selectedOptions.Quantity+comma;
								}
							}
						}
						
						// if it is a product set then sub products can have their separate qty
						// tempQty is a comma separated list of qty for each product in the set
						if (model.productSet) {
							thisProduct.selectedOptions.Quantity = tempQty;
						}

						// make sure the pid which gets submitted is for the main product
						thisProduct.selectedOptions.pid = thisProduct.pid;
					}

					if (model.bundle) {
						thisProduct.selectedOptions.Quantity = 1; // hard coded qty=1 when we the product is a bundle
					}
					else if (!model.productSet) {
						// grab the user entered qty
						thisProduct.selectedOptions.Quantity = jQuery(thisProduct.containerId+" .quantityinput:last").val();
					}
					
					// if it is not a productset then make sure qty is specified greater than 0
					if (model.productSet || thisProduct.selectedOptions.Quantity > 0) {
						// disable a2c button
						addToCartBtn.attr("disabled", "true");
						
						// close the quick view when user clicks A2C.
						app.quickView.close();
						
						// find if there is a handler bound to AddToCart event e.g. cart -> edit details or wishlist -> edit details etc.
						// then fire it otherewise call app.minicart.add to add the selected product to the cart and show minicart
						var event = jQuery.Event("AddToCart");
						event.selectedOptions = thisProduct.selectedOptions;
						
						(jQuery.event.global["AddToCart"] == undefined || jQuery.event.global["AddToCart"] == null) ? app.minicart.add( "", thisProduct.selectedOptions, function(){addToCartBtn.removeAttr("disabled")} ) : jQuery(document).trigger(event);
					}
					return false;
				} );

				return addToCartBtn;
			}
		}
	}else{
		alert("app is undefined");
	}
})(app);