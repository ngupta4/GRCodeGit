jQuery.extend({
    parseJSON: function( data ) {
        if ( typeof data !== "string" || !data ) {
            return null;
        }    
        data = jQuery.trim( data );    
        if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {    
            return window.JSON && window.JSON.parse ?
                window.JSON.parse( data ) :
                (new Function("return " + data))();    
        } else {
            jQuery.error( "Invalid JSON: " + data );
        }
    }
});

function initCaptcha(mycallback){
	// show captcha if required
	// always execute callback
	var cont = jQuery('#recaptcha_container').html();
	if(cont){
		var config = jQuery.parseJSON(cont.replace(/<!-- | -->/g,''));
		function showCaptcha(){
			var options = {
				theme   : config.theme || "clean",
				custom_theme_widget: 'recaptcha_widget',
				lang    : config.locale
		    };
			if(mycallback){
				options.callback = mycallback;
			}
			Recaptcha.create(config.publickey,
				    "recaptcha_container",
				    options
			);
		}
		// Include Script Elements
		var h  = document.getElementsByTagName('HEAD')[0];
		var s1  = document.createElement('SCRIPT');
		s1.type = 'text/javascript';
			s1.src  = "https://www.google.com/recaptcha/api/js/recaptcha_ajax.js";
		s1.onreadystatechange = function () {if (this.readyState == 'complete' || this.readyState == 'loaded') showCaptcha();};
		s1.onload = function () {showCaptcha();};
		h.appendChild(s1);
		// end captcha code
	}else{
		if(mycallback){
			mycallback();
		}
	}
}

jQuery(function(){
	initCaptcha();
});