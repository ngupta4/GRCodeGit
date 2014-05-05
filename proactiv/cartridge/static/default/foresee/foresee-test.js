var $$FSR = {
    'timestamp': 'September 28, 2012 @ 11:07 AM',
    'version': '15.1.6',
    'enabled': true,
    'sessionreplay': true,
    'auto': true,
    'encode': false,
    'files': '/foresee/',
    //'swf_files': '__swf_files_' needs to be sef when foresee-transport.swf is not located at 'files'
    'id': '6sJmheP5LU9igNllgCIbDg==',
    'definition': 'foresee-surveydef.js',
    'embedded': false,
    'replay_id': 'proactiv.com',
    'renderer': 'W3C', // or "ASRECORDED"
    'layout': 'CENTERFIXED', // or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
    'pools': [{
        path: '.',
        sp: 10 // CHANGE ONLY WHEN INCLUDING SESSION REPLAY
    }],
    'sites': [{
        path: /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
    }, {
        path: '.',
        domain: 'default'
    }],
    storageOption: 'cookie'
};
// -------------------------------- DO NOT MODIFY ANYTHING BELOW THIS LINE ---------------------------------------------
if (typeof(FSR) == "undefined") {
(function(config){var m=void 0,n=!0,o=null,t=!1;
(function(U,Q){function M(a,b,c){b=b||p;if(b.querySelectorAll&&(!d.p||!(8>=BROWSER.version&&-1<a.indexOf("nth"))))return N(b.querySelectorAll(a));if(!c&&l.$&&!l.Prototype)return l.$(a,b);for(var a=a.split(","),c=[],e=a.length-1;0<=e;e--){var f=a[e].replace(/^\s\s*/,"").replace(/\s\s*$/,"").replace(/\*=/g,"=").replace(/\>/g," > ").replace(/\s+/g," ");if(-1<f.indexOf(" ")){for(var f=f.split(" "),i=[b],H=t,g=0;g<f.length;g++)if(">"==f[g])H=n;else{for(var j=[],h=i.length-1;0<=h;h--)j=j.concat(O(f[g],
i[h],H));i=j;H=t}c=c.concat(d.qa(i))}else c=c.concat(O(f,b))}return c}function O(a,b,c){var e=[];if(0<a.length){var f,i,g,h,j=/[\.:\[#]/g,k=[];if(j.test(a))for(var j=a.match(j),l=0;l<j.length;l++){var q=a.indexOf(j[l]);k.push({N:a.substr(0,q),Ca:j[l]});a=a.substr(q)}k.push({N:a});a=k[0].N.toUpperCase();for(j=k.length-1;1<=j;j--)l=k[j-1].Ca,q=k[j].N,"["==l?i=q.substr(1,q.length-2).split("="):"."==l?g=q.substr(1):"#"==l?f=q.substr(1):":"==l&&(h=parseInt(q.replace(":nth-child(","").replace(")","")));
0==a.length&&(a="*");if(c)for(j=b.childNodes.length-1;0<=j;j--)c=b.childNodes[j],1==c.nodeType&&("*"==a||c.tagName==a)&&e.push(c);else e=N(b.getElementsByTagName(a));if(f||i||g||h)for(j=e.length-1;0<=j;j--)(h&&d.ta(e[j])!=h-1||g&&-1==e[j].className.indexOf(g)||f&&e[j].id!=f||i&&0>e[j].getAttribute(i[0]).indexOf(i[1]))&&e.splice(j,1)}return e}function N(a){var b=[],c,e=0;for(c=b.length=a.length;e<c;e++)b[e]=a[e];return b}function F(a,b){var c,e,d,i,g=r,h,j=b[a];j&&("object"===typeof j&&"function"===
typeof j.toJSON)&&(j=j.toJSON(a));"function"===typeof s&&(j=s.call(b,a,j));switch(typeof j){case "string":return I(j);case "number":return isFinite(j)?""+j:"null";case "boolean":case "null":return""+j;case "object":if(!j)return"null";r+=z;h=[];if("[object Array]"===Object.prototype.toString.apply(j)){i=j.length;for(c=0;c<i;c+=1)h[c]=F(c,j)||"null";d=0===h.length?"[]":r?"[\n"+r+h.join(",\n"+r)+"\n"+g+"]":"["+h.join(",")+"]";r=g;return d}if(s&&"object"===typeof s){i=s.length;for(c=0;c<i;c+=1)"string"===
typeof s[c]&&(e=s[c],(d=F(e,j))&&h.push(I(e)+(r?": ":":")+d))}else for(e in j)Object.prototype.hasOwnProperty.call(j,e)&&(d=F(e,j))&&h.push(I(e)+(r?": ":":")+d);d=0===h.length?"{}":r?"{\n"+r+h.join(",\n"+r)+"\n"+g+"}":"{"+h.join(",")+"}";r=g;return d}}function I(a){J.lastIndex=0;return J.test(a)?'"'+a.replace(J,function(a){var c=R[a];return"string"===typeof c?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}var d={},l=l=this,p=l.document;d.ea=864E5;d.p=!!p.attachEvent;var A=
Object.prototype.hasOwnProperty,u=[],B=t,y,u=[],B=t;d.i=function(a){return o!==a&&m!==a};d.qa=function(a){for(var b=a.length-1;0<=b;b--)for(var c=b-1;0<=c;c--)a[c]==a[b]&&a.splice(b,1);return a};d.ta=function(a){for(var b=a.parentNode.childNodes,c,e=count=0;(c=b.item(e++))&&c!=a;)1==c.nodeType&&count++;return count};d.K=function(a){return"[object Array]"==Object.prototype.toString.call(a)};d.ba=function(a){if(a){if(a.length)for(var b=a.length-1;0<=b;b--)a[b]=o;for(var c in a)if(b=typeof a[c],"function"==
b||"object"==b)a[c]=o}};d.o=function(a){return"function"==typeof a};d.Ya=function(a){return"object"==typeof a};d.trim=function(a){return a.toString().replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")};d.Ta=function(a){var b=a.getAttribute?a.getAttribute("id"):a.id;b&&!d.Za(b)&&(b=a.attributes.id.value);return b};d.ua=function(a){return a.toString().replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")};d.h=function(){var a=arguments,b=a[0]||{},c=1,e=a.length,f,i,g;"object"!==typeof b&&!d.o(b)&&(b={});e===c&&(b=this,
--c);for(;c<e;c++)if((f=a[c])!=o)for(i in f)g=f[i],b!==g&&g!==m&&(b[i]=g);return b};d.w=function(){};d.now=function(){return+new Date};d.shift=function(a){return a.splice(0,1)[0]};d.U=function(a,b){for(var c in b)if(b[c]===a)return c;return-1};d.W=function(){return p.location.protocol};d.Wa=function(a,b){return-1!=d.U(a,b)};d.Qa=function(a){return p.getElementById(a)};d.Ra=function(a,b,c){for(var e=a.split("."),b=b[d.shift(e)],f=c,i;b!=o&&0<e.length;)b=b[d.shift(e)];if(b){e=a.split(".");for(i;e.length&&
(i=d.shift(e));)f=f[i]?f[i]:f[i]={};e=a.split(".");f=c;for(i;e.length&&(i=d.shift(e));)0<e.length?f=f[i]:f[i]=b}};d.L=function(){return p.location.href};d.t=function(a){return encodeURIComponent(a)};d.V=function(a){return decodeURIComponent(a)};d.ra=function(){return p.referrer};d.$a={};d.ya=function(a,b){var b=b||d.w,c=p.createElement("script");c.type="text/javascript";d.p?c.onreadystatechange=function(){("loaded"==this.readyState||"complete"==this.readyState)&&b("ok")}:c.onload=function(){b("ok")};
c.onerror=function(){b("error")};c.src=0==d.U("//",a)?d.W()+a:a;d.S.appendChild(c)};d.r=function(a){var b,c;c||(c=l);c=c.document;c=c.readyState;b=b||1;if(d.o(a)&&(a=function(a,b){return function(){setTimeout(function(a){return function(){a.call(d.D);a=o}}(a),b);a=o}}(a,b),c&&("complete"==c||"loaded"==c||"interactive"==c))){B=n;for(u.push(a);a=d.shift(u);)a&&a.call(d.D);return}if(!B&&d.o(a))u.push(a);else if(B&&d.o(a))a.call(d.D);else if(!d.o(a))for(B=n;0<u.length;)(a=d.shift(u))&&a.call(d.D);a=c=
c=c=o};p.addEventListener?y=function(){p.removeEventListener("DOMContentLoaded",y,t);d.r(o)}:d.p&&(y=function(){"complete"===p.readyState&&(p.detachEvent("onreadystatechange",y),d.r(o))});t||(p.addEventListener?p.addEventListener("DOMContentLoaded",y,t):d.p&&p.attachEvent("onreadystatechange",y));d.match=function(a){for(var b=t,c=[["urls",d.L()],["referrers",d.ra()],["userAgents",l.navigator.userAgent]],e=0;e<c.length;e++)for(var f=c[e],i=a[f[0]]||[],h=0;h<i.length;h++)d.V(f[1]).match(i[h])&&(b=n);
if(b)return n;i=a.cookies||[];for(e=0;e<i.length;e++)if(f=i[e],c=g.a.aa(f.name))if(c.match(f.value||"."))b=n;if(b)return n;b=g.d("fsr.ipo",g.c("fsr.ipo"));if(a=a.variables){e=0;for(f=a.length;e<f;e++)if(i=a[e].name,c=a[e].value,!(i==G.ipexclude&&1==b.get("value"))){d.K(i)||(i=[i],c=[c]);for(var k,h=n,j=0,p=i.length;j<p;j++){try{if(k=(new Function("return "+i[j]))(),k===m||k===o)k=""}catch(r){k=""}var q;if(q=k||""===k){a:{q=k;var s=c[j];d.K(s)||(s=[s]);for(var u=0,v=s.length;u<v;u++)if((q+"").match(s[u])){q=
n;break a}q=t}q=!q}if(q){h=t;break}}if(h)return n}}return t};d.S=o;d.r(function(){d.S=p.getElementsByTagName("head")[0]||p.documentElement});d.startTime=d.now();var G={},h=d.h({replay_id:"sitecom",site:{domain:"site.com"},renderer:"W3C",layout:"",swf_files:"/"},Q||{});d.Aa=function(){for(var a={},b=arguments,c=0,e=b.length;c<e;c++){var f=b[c];if(d.v(f))for(var i in f){var g=f[i],h=a[i];a[i]=h&&d.v(g)&&d.v(h)?d.Aa(h,g):d.P(g)}}return a};d.P=function(a){var b;if(d.v(a)){b={};for(var c in a)b[c]=d.P(a[c])}else if(d.K(a)){b=
[];c=0;for(var e=a.length;c<e;c++)b[c]=d.P(a[c])}else b=a;return b};d.v=function(a){if(!a||("[object Object]"!==Object.prototype.toString.call(a)||a.nodeType||a.setInterval)||a.constructor&&!A.call(a,"constructor")&&!A.call(a.constructor.prototype,"isPrototypeOf"))return t;for(var b in a);return b===m||A.call(a,b)||!A.call(a,b)&&A.call(Object.prototype,b)};d.G=function(){u=h=o;d=l=l.FSR=o};d.Va=function(a){var b=d.now(),c;do c=d.now();while(c-b<a)};l.FSR=d;l.FSR.opts=h;l.FSR.prop=G;d.f={};d.f.na=
{};var k=d.f.na;k.Sa=function(){for(var a=BROWSER.Pa.replace(/[\s\\\/\.\(\);:]/gim,""),b="",c=d.now()+"",e=0;e<a.length-1;e+=a.length/7)b+=Number(a.charCodeAt(Math.round(e))%16).toString(16);7<b.length&&(b=b.substr(b.length-7));return b+"-"+a.length+c.substr(c.length-6)+"-xxxx-xxxx-xxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})};k.cb=function(a,b){return a+Math.random()*(b-a)};k.Fa=function(a){var b="";if(a)for(var c in a)b+=(0!=b.length?"&":"")+
c+"="+d.t(a[c]);return b};k.hash=function(a){a=a.split("_");return 3*a[0]+1357+""+(9*a[1]+58)};k.bb=function(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");a=RegExp("[\\?&+]"+a+"=([^&#]*)").exec(d.L());return a==o?t:a[1]};k.sa=function(a){return a.js_files||a.files};k.Oa=function(a,b){for(var c=0;c<document.styleSheets.length;c++)if(!document.styleSheets[c].href||-1==document.styleSheets[c].href.indexOf("foresee-dhtml.css")){var e=document.styleSheets[c].cssRules?document.styleSheets[c].cssRules:
document.styleSheets[c].rules;if(e)for(var d=0;d<e.length;d++)e[d].cssText&&(e[d].cssText.match(a)&&e[d].selectorText)&&S(M(e[d].selectorText),b)}};d.f.ga={};var v=d.f.ga;d.f.da={};var w=d.f.da;w.Na=function(a,b){var c,e,f;d.i(a.length)||(a=[a]);c=0;for(e=a.length;c<e;c++){f=a[c];var i=f.className||"";RegExp("\\b"+b+"\\b").test(i)||(f.className=(""==i?"":i+" ")+b)}};w.eb=function(a,b){var c,e,f;d.i(a.length)||(a=[a]);c=0;for(e=a.length;c<e;c++)f=a[c],f.className&&(f.className=f.className.replace(RegExp("\\b"+
b+"\\b"),""))};w.pa=function(a,b){if(a){d.i(a.length)||(a=[a]);for(var c=0;c<a.length;c++)for(var e in b)-1=="zIndex".indexOf(e)&&"number"==typeof b[e]&&(b[e]+="px"),a[c].style[e]=b[e]}return a};var S=w.pa;w.outerHTML=function(a){if(d.i(a.outerHTML))return a.outerHTML;var b={TEXTAREA:n},c={HR:n,BR:n,IMG:n,INPUT:n},e=[],f="",i=a.nodeName;switch(a.nodeType){case 1:f=f+"<"+i.toLowerCase();if(b[i])switch(i){case "TEXTAREA":for(b=0;b<a.attributes.length;b++)if("value"!=a.attributes[b].nodeName.toLowerCase())f+=
" "+a.attributes[b].nodeName.toUpperCase()+'="'+a.attributes[b].nodeValue+'"';else var g=a.attributes[b].nodeValue;f=f+">"+g+("</"+i+">")}else{for(b=a.attributes.length-1;0<=b;b--)g=a.attributes[b].nodeName.toLowerCase(),-1<"style,class,id".indexOf(g.toLowerCase())&&(f+=" "+g+'="'+a.attributes[b].nodeValue+'"');f+=">";c[i]||(f+=a.innerHTML,f+="</"+i.toLowerCase()+">")}break;case 3:f+=a.nodeValue;break;case 8:f+="<\!--"+a.nodeValue+"--\>"}e.push(f);return e.join("")};for(var K={},C=["onload","onerror",
"onabort"],x=0;x<C.length;x++)K[C[x]]=function(){this.Ba(0==arguments.callee.xa?1:0);this.z=t},K[C[x]].xa=x;v.k=function(a,b){this.options=d.h({},a);this.z=t;this.event=b;this.Q=0;return this};v.k.prototype.Ba=function(a){if(this.z)switch(this.z=t,this.status=a,a){case 1:(this.options.onSuccess||d.w)(m);break;case 0:this.event?this.Ga():(this.options.onFailure||d.w)(m);break;case -1:(this.options.onError||d.w)(m)}};v.k.prototype.Ga=function(){if(3>this.Q)this.T();else this.onFailure()};v.k.prototype.oa=
function(a){var b;this.z=n;a=k.Fa(d.h(a,{uid:d.now()}));a=d.W()+"//"+this.options.host+this.options.path+this.options.url+"?"+a;b=d.h({},K,b);for(var c=new Image,e=0;e<C.length;e++){var f=C[e];c[f]=function(){var a=arguments.callee;a.n.onload=a.n.onerror=a.n.onabort=o;a.wa.call(a.self,a.n);a.n=o};c[f].wa=b[f];c[f].n=c;c[f].self=this}c.src=a};v.k.prototype.send=function(a){this.Ha=a;this.T()};v.k.prototype.T=function(){var a;this.Q++;a=d.h({event:this.event,ver:this.Q},this.Ha,a);this.oa(a)};d.f.ja=
{};var g=d.f.ja;g.u=function(a){return a+(h.site.cookie?"."+h.site.cookie:"")};g.I=function(a){var b=g.u("fsr.s"),b=g.d(b,g.c(b));return a?d.i(m)?b.set(a,m):b.get(a):b};g.c=function(a,b){var c;c="window"==h.storageOption?function(){var a=arguments.callee;return new g.Ma(a.Z,a.X||{})}:function(){var a=arguments.callee;return new g.a(a.Z,d.h({path:"/",domain:a.M.site.domain,secure:a.M.site.secure,encode:a.M.encode},a.X||{}))};c.Z=a;c.M=h;c.X=b;return c};var P={};g.d=function(a,b){var c=P[a];return c!=
o?c:c=P[a]=new b};k.b={};k.b.l={};k.b.A=function(a,b,c,e){var f=k.b.l;if(a){f[b]||(f[b]=[]);f[b].push({H:a,C:c});if("unload"==b){if(d.i(d.s)){d.s.push(c);return}d.s=[]}"propertychange"!=b&&a.addEventListener?a.addEventListener(b,c,!e):a.attachEvent&&a.attachEvent("on"+b,c)}};k.b.Ia=function(a,b,c,e,f){var i=k.b;if(f){if(a.getAttribute("_fsr"+b))return t;a.setAttribute("_fsr"+b,"true")}else if(f=i.l[b])for(i=f.length-1;0<=i;i--){if(d.p)try{f[i].H.toString()}catch(g){f.splice(i,1);continue}if(f[i].H==
a&&(e||f[i].C==c))return t}k.b.A(a,b,c)};k.b.Ja=function(a,b,c){k.b.A(a,b,c,n)};k.b.ma=function(a,b,c){try{"propertychange"!=b&&a.removeEventListener?a.removeEventListener(b,c):a.detachEvent&&a.detachEvent("on"+b,c)}catch(d){}};x=k.b.A;k.b.fa=function(){for(var a=d.s.length-1;0<=a;a--)try{d.s[a].call()}catch(b){}d.ba(d.s);k.b.ia();d.G()};x(l,"unload",k.b.fa);k.b.ia=function(){if(d){var a=k.b,b;for(b in a.l){for(var c=a.l[b],e={};e=c.pop();)a.ma(e.H,b,e.C),d.ba(e);delete a.l[b]}}};k.b.R=function(){this.O=
[]};k.b.R.prototype.va=function(){for(var a=0;a<this.O.length;a++){var b=this.O[a];b.C.apply(this,arguments);b.ab&&(this.O.splice(a,1),a--)}};var T=k.b.R,D={};d.stringify=function(a,b,c){var d;l.Prototype&&(d=Array.prototype.toJSON,delete Array.prototype.toJSON);if(!l.JSON||"function"!==typeof l.JSON.stringify){var f;z=r="";if("number"===typeof c)for(f=0;f<c;f+=1)z+=" ";else"string"===typeof c&&(z=c);if((s=b)&&"function"!==typeof b&&("object"!==typeof b||"number"!==typeof b.length))throw Error("_4c.stringify");
a=F("",{"":a})}else a=l.JSON.stringify(a,b,c);l.Prototype&&(Array.prototype.toJSON=d);return a};var L=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,J=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,r,z,R={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},s;l.JSON?D=l.JSON:function(){function a(a){return 10>a?"0"+a:a}"function"!==
typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+a(this.getUTCMonth()+1)+"-"+a(this.getUTCDate())+"T"+a(this.getUTCHours())+":"+a(this.getUTCMinutes())+":"+a(this.getUTCSeconds())+"Z":o},Boolean.prototype.toJSON=function(){return this.valueOf()},Number.prototype.toJSON=function(){return this.valueOf()},String.prototype.toJSON=function(){return this.valueOf()});"function"!==typeof D.parse&&(D.parse=function(a,c){function d(a,
b){var f,g,h=a[b];if(h&&typeof h==="object")for(f in h)if(Object.prototype.hasOwnProperty.call(h,f)){g=d(h,f);g!==m?h[f]=g:delete h[f]}return c.call(a,b,h)}var f,a=""+a;L.lastIndex=0;L.test(a)&&(a=a.replace(L,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){f=(new Function("return "+
a))();return typeof c==="function"?d({"":f},""):f}throw new SyntaxError("JSON.parse");})}();k.Ka=D;w.ha={};try{Array.prototype.slice.call(document.getElementsByTagName("html")),makeArray=function(a){return Array.prototype.slice.call(a)}}catch(V){}g.a=function(a,b){a||(a="STORAGE");this.J=a.replace(/[- ]/g,"");this.q=b||{};this.data={};this.ka=new T;this.Ea=4E3};g.a.prototype.set=function(a,b){this.B();this.g[a]=b;this.F()};g.a.prototype.get=function(a){this.B();return a?this.g[a]:this.g};g.a.prototype.G=
function(a){this.B();delete this.g[a];this.F()};g.a.prototype.j=function(){this.g={};var a=this.q.duration;this.q.duration=-1;this.F();a?this.q.duration=a:delete this.q.duration};g.a.prototype.B=function(){this.g={};try{var a=g.a.aa(this.J);a&&0<a.length&&(this.g=D.parse(a),d.i(this.g)||(this.g={}))}catch(b){this.g={}}};g.a.prototype.F=function(){var a=d.stringify(this.g);this.J.length+d.t(a).length>this.Ea&&this.ka.va(this);g.a.write(this.J,a,this.q)};g.a.aa=function(a){return(a=l.document.cookie.match("(?:^|;)\\s*"+
d.ua(a)+"=([^;]*)"))?d.V(a[1]):o};g.a.write=function(a,b,c){var b=!c||!d.i(c.encode)||c.encode?d.t(b):b,a=d.t(a),e;for(e in c)if(c[e]){var f=c[e],b=b+(";"+("duration"===e?"expires":e));switch(e){case "duration":b+="="+(new Date(d.now()+f*d.ea)).toGMTString();default:b+="="+f}}l.document.cookie=a+"="+b;return a.length+b.length+2};g.a.j=function(a,b){g.a.write(a,"",d.h(b,{duration:-1}))};g.a.Xa=function(){};g.a.isSupported=function(){return n};d.f.la={};var E=d.f.la;E.Ua=function(a,b){for(var c=a.name,
d=[a.site,a.section,b,g.I("q"),g.I("l")],f=0;f<d.length;f++)c+=d[f]?"-"+d[f]:"";return c};E.za=function(a){d.ya(k.sa(h.site)+(h.definition||"foresee-surveydef.js"),function(b){"ok"===b&&d.surveydefs&&(d.h(G,d.properties),h.ca=h.surveydefs=d.surveydefs,a())})};E.log=function(a,b){if(G.events.enabled){var c=g.I(),e=c.get("sd");d.i(e)||(e=c.get("cd"));var e=h.ca[e],f=new Date;(new v.k(E.La.event,"logit")).send({cid:h.id,rid:c.get("rid")||"",cat:e.name,sec:e.section||"",type:c.get("q")||"",site:h.site.name||
"",lang:c.get("l")||d.$S.locale||"",msg:a,param:b,tms:f.getTime(),tmz:6E4*f.getTimezoneOffset()})}};M=w.ha;d.r(function(){for(var a=h.sites,b=0,c=a.length;b<c;b++){var e;"[object Array]"!==typeof a[b].path&&(a[b].path=[a[b].path]);for(var f=0,g=a[b].path.length;f<g;f++)if(e=d.L().match(a[b].path[f])){h.siteid=b;h.site=h.sites[b];h.site.domain?"default"==h.site.domain&&(h.site.domain=o):h.site.domain=e[0];h.site.secure||(h.site.secure=o);h.site.name||(h.site.name=e[0]);f="files js_files image_files html_files css_files swf_files".split(" ");
for(b=0;b<f.length;b++)h.site[f[b]]||h[f[b]]&&(h.site[f[b]]=h[f[b]]);break}if(e)break}});d.e=function(a){d.h(this,{options:d.h({},a)});h.controller=this};d.e.prototype.load=function(){var a=this;E.za(function(){a.Da()})};d.e.m=function(a){for(var b=document.getElementsByTagName("input"),c=[],d=0;d<b.length;d++)b[d].type==a.type&&(a.name?b[d].name==a.name&&c.push(b[d]):c.push(b[d]));return c};d.e.prototype.Da=function(){for(var a=g.d("fsr.sp",g.c("fsr.sp")),b=[],c=h.ca,e=0;e<c.length;e++)if(!(c[e].site&&
c[e].site!=h.site.name)){var f=c[e].criteria;if(d.i(f.sp)){var i=m;b.push(this.Y(c[e].name,c[e].section||i,m,a,f.sp,f.lf))}for(var f=f.locales||[],k=0,l=f.length;k<l;k++)i=m,b.push(this.Y(c[e].name,c[e].section||i,f[k].locale,a,f[k].sp,f[k].lf))}e='<table><tr><td class="names">&nbsp;</td><td colspan="2">Sampling Percentage</td><td>&nbsp;</td><td>Loyalty Factor</td></tr>';a=0;for(c=b.length;a<c;a++)i=b[a],f=i.input,e+="<tr>",e+='<td class="names">'+i.names+"</td>",e+='<td><input type="text" name="'+
f.name+'" value="'+f.value+'" size="'+f.size+'" maxlength="'+f.maxlength+'"></td>',e+="<td>"+i.percentage+"</td>",e+="<td>&nbsp;</td>",e+="<td>"+i.loyaltyFactor+"</td>",e+="</tr>";document.getElementById("controls").innerHTML=e+"</table>";if(1==g.d("fsr.ipo",g.c("fsr.ipo")).get("value")){b=d.e.m({type:"checkbox",name:"ipo"});for(e=0;e<b.length;e++)b.checked=n}if(1==g.d("fsr.pool",g.c("fsr.pool")).get("value")){b=d.e.m({type:"checkbox",name:"pool"});for(e=0;e<b.length;e++)b.checked=n}};d.e.prototype.Y=
function(a,b,c,d,f,g){var h=a;b&&(h+="-"+b,a+="-"+b);c&&(h+=" ("+c+")",a+="-"+c);return{names:h+":",input:{name:a,value:d.get(a)||"",size:3,maxlength:3},percentage:"("+f+")",loyaltyFactor:g}};d.e.prototype.set=function(){for(var a=d.e,b=g.d("fsr.sp",g.c("fsr.sp",{duration:1})),c=a.m({type:"text"}),e=0;e<c.length;e++){var f=c[e];""!=f.value?b.set(f.name,f.value):b.G(f.name)}b=a.m({type:"checkbox",name:"ipo"})[0];a=a.m({type:"checkbox",name:"pool"})[0];b.checked?g.d("fsr.ipo",g.c("fsr.ipo")).set("value",
b.checked?1:0):g.d("fsr.ipo",g.c("fsr.ipo")).j();a.checked?g.d("fsr.pool",g.c("fsr.pool")).set("value",a.checked?1:0):g.d("fsr.pool",g.c("fsr.pool")).j()};d.e.prototype.clear=function(){var a=g,b=a.d;b("fsr.sp",g.c("fsr.sp")).j();b("fsr.ipo",a.c("fsr.ipo")).j();b("fsr.pool",a.c("fsr.pool")).j();a.a.j(a.u("fsr.r"),{path:"/",domain:h.site.domain,secure:h.site.secure});a.a.j(a.u("fsr.s"),{path:"/",domain:h.site.domain,secure:h.site.secure});a.a.j(a.u("fsr.p"),{path:"/",domain:h.site.domain,secure:h.site.secure});
a=document.getElementsByTagName("input");for(b=0;b<a.length;b++){var c=a[b];"text"==c.type?c.value="":"checkbox"==c.type&&(c.checked=t)}};d.r(function(){var a=new d.e;h.controller.set=a.set;h.controller.clear=a.clear;a.load()})})(window,$$FSR);})({});
}