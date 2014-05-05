//Check for and set serialization cookie if needed
	if(!getCookie('mcpc')) {
		//set cookie
		u = new Date().getTime().toString() + Math.floor((Math.random()*10000000)+1).toString();
		u = u.substr(0,20);
		setCookie('mcpc', u, 365*3);
		window.scSerial = u;
	}
	else {
		window.scSerial = getCookie('mcpc');
	};	
	
//set cookie		
function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}	
	
//get cookie
function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
		{
		return unescape(y);
		}
	  }
}


