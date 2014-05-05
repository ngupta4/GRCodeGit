// Offer Codes
var OfferCodes = {
		core: {
			rm: {
				code: "B4SJ33",
				price: "$169.90"
			},
			dsc: {
				code: "B4SJ36",
				price: "$169.90"
			},
			dcw: {
				code: "B4SJ34",
				price: "$169.90"
			}
		},
		teen: {
			rm: {
				code: "B4SJ3A",
				price: "$179.90"
			},
			dsc: {
				code: "B4SJ3C",
				price: "$179.90"
			},
			dcw: {
				code: "B4SJ3B",
				price: "$179.90"
			}
		},
		deluxe: {
			rm: {
				code: "B4SJ3G",
				price: "$179.90"
			},
			dsc: {
				code: "B4SJ3J",
				price: "$179.90"
			},
			dcw: {
				code: "B4SJ3H",
				price: "$179.90"
			}
		}
};
var SAS = {
	cartPage: "https://proactiv.stg.dw.grdev.com/on/demandware.store/Sites-Proactiv-Site/default/COCart-AddProduct",
	descriptions: {
		core: {
			title: "Basic",
			desc: "Our basic 3-Step System."
		},
		teen: {
			title: "for Teens",
			desc: "Our basic 3-Step System, plus Deep Cleansing Wash and Advanced Blemish Treatment."
		},
		deluxe: {
			title:"Deluxe",
			desc: "Our basic 3-Step System, plus Daily Oil Control and Oil-Free Moisture with Broad Spectrum SPF 15."
		}
	},
	getDescriptionTitle: function(desc) {
		return this.descriptions[desc].title;
	},
	getDescriptionDesc: function(desc) {
		return this.descriptions[desc].desc;
	},
	setPrice: function(){
		var currProduct = jQuery('#sasNav').attr('class');
		var currGift = jQuery('#giftSelect').attr('class');
		var cartURL = SAS.cartPage + "?pid=" + OfferCodes[currProduct][currGift].code;
		jQuery('.payAmount').html(OfferCodes[currProduct][currGift].price);
		jQuery('.sasCTA').attr('href',cartURL);
	},
	toggleContents: function(desc) {
		if (desc == "core") {
			jQuery('.content li.deluxe').hide();
			jQuery('.content li.teen').hide();
		} else if (desc == "teen") {
			jQuery('.content li.deluxe').hide();
			jQuery('.content li.teen').show();
		} else if (desc == "deluxe") {
			jQuery('.content li.deluxe').show();
			jQuery('.content li.teen').hide();
		}
	},
	init: function() {
		//Nav click behaviors
		jQuery('#sasNav a').live('click',function(e){		
			e.preventDefault();
			var currClass = jQuery('#sasNav').attr('class');
			newClass = jQuery(this).attr('rel');
			jQuery("#sasNav, #sasProduct").removeClass(currClass).addClass(newClass);
			jQuery("#sasProduct .type").html(SAS.getDescriptionTitle(newClass));
			jQuery("#sasProduct .productDesc").html(SAS.getDescriptionDesc(newClass));
			SAS.toggleContents(newClass);
			SAS.setPrice();
		});
		
		//Free gift click behaviors
		jQuery('#giftSelect span').live('click',function(e){
			e.preventDefault();
			var currClass = jQuery('#giftSelect').attr('class');
			newClass = jQuery(this).attr('rel');
			jQuery("#giftSelect").removeClass(currClass).addClass(newClass);
			SAS.setPrice();
		});
		
		//set offer code to default values (deluxe with refining mask selected)
		SAS.setPrice();
	}
};
jQuery(document).ready(function(){
	SAS.init();
});