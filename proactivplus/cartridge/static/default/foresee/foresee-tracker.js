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
(function(config){var n=void 0,q=!0,r=null,v=!1;function x(){return function(){}}
(function(Z,U){function w(a,b){return(b?a.get(b):a)||""}function K(a){return[a||g.e(),(a||g.e()).get("cp")||{}]}function V(a){var b;b=b||o;if(b.querySelectorAll&&(!d.r||!(8>=s.version&&-1<a.indexOf("nth"))))return R(b.querySelectorAll(a));if(l.$&&!l.Prototype)return l.$(a,b);for(var a=a.split(","),c=[],f=a.length-1;0<=f;f--){var e=a[f].replace(/^\s\s*/,"").replace(/\s\s*$/,"").replace(/\*=/g,"=").replace(/\>/g," > ").replace(/\s+/g," ");if(-1<e.indexOf(" ")){for(var e=e.split(" "),i=[b],g=v,h=0;h<
e.length;h++)if(">"==e[h])g=q;else{for(var k=[],j=i.length-1;0<=j;j--)k=k.concat(S(e[h],i[j],g));i=k;g=v}c=c.concat(d.Va(i))}else c=c.concat(S(e,b))}return c}function S(a,b,c){var f=[];if(0<a.length){var e,i,g,h,k=/[\.:\[#]/g,j=[];if(k.test(a))for(var k=a.match(k),l=0;l<k.length;l++){var m=a.indexOf(k[l]);j.push({ea:a.substr(0,m),ob:k[l]});a=a.substr(m)}j.push({ea:a});a=j[0].ea.toUpperCase();for(k=j.length-1;1<=k;k--)l=j[k-1].ob,m=j[k].ea,"["==l?i=m.substr(1,m.length-2).split("="):"."==l?g=m.substr(1):
"#"==l?e=m.substr(1):":"==l&&(h=parseInt(m.replace(":nth-child(","").replace(")","")));0==a.length&&(a="*");if(c)for(k=b.childNodes.length-1;0<=k;k--)c=b.childNodes[k],1==c.nodeType&&("*"==a||c.tagName==a)&&f.push(c);else f=R(b.getElementsByTagName(a));if(e||i||g||h)for(k=f.length-1;0<=k;k--)(h&&d.Xa(f[k])!=h-1||g&&-1==f[k].className.indexOf(g)||e&&f[k].id!=e||i&&0>f[k].getAttribute(i[0]).indexOf(i[1]))&&f.splice(k,1)}return f}function R(a){var b=[],c,d=0;for(c=b.length=a.length;d<c;d++)b[d]=a[d];
return b}function W(a,b){var c=[],d;for(d in a)a.hasOwnProperty(d)&&(c[d]=b(a[d]));return c}function L(a,b){var c,d,e,i,g=t,h,k=b[a];k&&("object"===typeof k&&"function"===typeof k.toJSON)&&(k=k.toJSON(a));"function"===typeof y&&(k=y.call(b,a,k));switch(typeof k){case "string":return N(k);case "number":return isFinite(k)?""+k:"null";case "boolean":case "null":return""+k;case "object":if(!k)return"null";t+=E;h=[];if("[object Array]"===Object.prototype.toString.apply(k)){i=k.length;for(c=0;c<i;c+=1)h[c]=
L(c,k)||"null";e=0===h.length?"[]":t?"[\n"+t+h.join(",\n"+t)+"\n"+g+"]":"["+h.join(",")+"]";t=g;return e}if(y&&"object"===typeof y){i=y.length;for(c=0;c<i;c+=1)"string"===typeof y[c]&&(d=y[c],(e=L(d,k))&&h.push(N(d)+(t?": ":":")+e))}else for(d in k)Object.prototype.hasOwnProperty.call(k,d)&&(e=L(d,k))&&h.push(N(d)+(t?": ":":")+e);e=0===h.length?"{}":t?"{\n"+t+h.join(",\n"+t)+"\n"+g+"}":"{"+h.join(",")+"}";t=g;return e}}function N(a){O.lastIndex=0;return O.test(a)?'"'+a.replace(O,function(a){var c=
X[a];return"string"===typeof c?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}var d={},l=l=this,o=l.document;d.ka=864E5;d.r=!!o.attachEvent;var F=Object.prototype.hasOwnProperty,z=[],G=v,C,z=[],G=v;d.l=function(a){return r!==a&&n!==a};d.Va=function(a){for(var b=a.length-1;0<=b;b--)for(var c=b-1;0<=c;c--)a[c]==a[b]&&a.splice(b,1);return a};d.Xa=function(a){for(var b=a.parentNode.childNodes,c,d=count=0;(c=b.item(d++))&&c!=a;)1==c.nodeType&&count++;return count};d.aa=function(a){return"[object Array]"==
Object.prototype.toString.call(a)};d.Ca=function(a){if(a){if(a.length)for(var b=a.length-1;0<=b;b--)a[b]=r;for(var c in a)if(b=typeof a[c],"function"==b||"object"==b)a[c]=r}};d.t=function(a){return"function"==typeof a};d.Rb=function(a){return"object"==typeof a};d.trim=function(a){return a.toString().replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")};d.Mb=function(a){var b=a.getAttribute?a.getAttribute("id"):a.id;b&&!d.Sb(b)&&(b=a.attributes.id.value);return b};d.Ya=function(a){return a.toString().replace(/([-.*+?^${}()|[\]\/\\])/g,
"\\$1")};d.j=function(){var a=arguments,b=a[0]||{},c=1,f=a.length,e,i,g;"object"!==typeof b&&!d.t(b)&&(b={});f===c&&(b=this,--c);for(;c<f;c++)if((e=a[c])!=r)for(i in e)g=e[i],b!==g&&g!==n&&(b[i]=g);return b};d.P=x();d.now=function(){return+new Date};d.shift=function(a){return a.splice(0,1)[0]};d.pa=function(a,b){for(var c in b)if(b[c]===a)return c;return-1};d.W=function(){return o.location.protocol};d.Ob=function(a,b){return-1!=d.pa(a,b)};d.Gb=function(a){return o.getElementById(a)};d.Ib=function(a,
b,c){for(var f=a.split("."),b=b[d.shift(f)],e=c,i;b!=r&&0<f.length;)b=b[d.shift(f)];if(b){f=a.split(".");for(i;f.length&&(i=d.shift(f));)e=e[i]?e[i]:e[i]={};f=a.split(".");e=c;for(i;f.length&&(i=d.shift(f));)0<f.length?e=e[i]:e[i]=b}};d.ya=function(){return o.location.href};d.M=function(a){return encodeURIComponent(a)};d.ra=function(a){return decodeURIComponent(a)};d.Wa=function(){return o.referrer};d.Tb={};d.hb=function(a,b){var b=b||d.P,c=o.createElement("script");c.type="text/javascript";d.r?c.onreadystatechange=
function(){("loaded"==this.readyState||"complete"==this.readyState)&&b("ok")}:c.onload=function(){b("ok")};c.onerror=function(){b("error")};c.src=0==d.pa("//",a)?d.W()+a:a;d.la.appendChild(c)};d.G=function(a){var b,c;c||(c=l);c=c.document;c=c.readyState;b=b||1;if(d.t(a)&&(a=function(a,b){return function(){setTimeout(function(a){return function(){a.call(d.U);a=r}}(a),b);a=r}}(a,b),c&&("complete"==c||"loaded"==c||"interactive"==c))){G=q;for(z.push(a);a=d.shift(z);)a&&a.call(d.U);return}if(!G&&d.t(a))z.push(a);
else if(G&&d.t(a))a.call(d.U);else if(!d.t(a))for(G=q;0<z.length;)(a=d.shift(z))&&a.call(d.U);a=c=c=c=r};o.addEventListener?C=function(){o.removeEventListener("DOMContentLoaded",C,v);d.G(r)}:d.r&&(C=function(){"complete"===o.readyState&&(o.detachEvent("onreadystatechange",C),d.G(r))});v||(o.addEventListener?o.addEventListener("DOMContentLoaded",C,v):d.r&&o.attachEvent("onreadystatechange",C));d.match=function(a){for(var b=v,c=[["urls",d.ya()],["referrers",d.Wa()],["userAgents",l.navigator.userAgent]],
f=0;f<c.length;f++)for(var e=c[f],i=a[e[0]]||[],h=0;h<i.length;h++)d.ra(e[1]).match(i[h])&&(b=q);if(b)return q;i=a.cookies||[];for(f=0;f<i.length;f++)if(e=i[f],c=g.g.F(e.name))if(c.match(e.value||"."))b=q;if(b)return q;b=g.ma("fsr.ipo",g.wa("fsr.ipo"));if(a=a.variables){f=0;for(e=a.length;f<e;f++)if(i=a[f].name,c=a[f].value,!(i==u.ipexclude&&1==b.get("value"))){d.aa(i)||(i=[i],c=[c]);for(var j,h=q,k=0,m=i.length;k<m;k++){try{if(j=(new Function("return "+i[k]))(),j===n||j===r)j=""}catch(p){j=""}var o;
if(o=j||""===j){a:{o=j;var s=c[k];d.aa(s)||(s=[s]);for(var t=0,w=s.length;t<w;t++)if((o+"").match(s[t])){o=q;break a}o=v}o=!o}if(o){h=v;break}}if(h)return q}}return v};d.la=r;d.G(function(){d.la=o.getElementsByTagName("head")[0]||o.documentElement});d.startTime=d.now();var u={},h=d.j({replay_id:"sitecom",site:{domain:"site.com"},renderer:"W3C",layout:"",swf_files:"/"},U||{});d.C=function(){for(var a={},b=arguments,c=0,f=b.length;c<f;c++){var e=b[c];if(d.N(e))for(var i in e){var g=e[i],h=a[i];a[i]=
h&&d.N(g)&&d.N(h)?d.C(h,g):d.ga(g)}}return a};d.ga=function(a){var b;if(d.N(a)){b={};for(var c in a)b[c]=d.ga(a[c])}else if(d.aa(a)){b=[];c=0;for(var f=a.length;c<f;c++)b[c]=d.ga(a[c])}else b=a;return b};d.N=function(a){if(!a||("[object Object]"!==Object.prototype.toString.call(a)||a.nodeType||a.setInterval)||a.constructor&&!F.call(a,"constructor")&&!F.call(a.constructor.prototype,"isPrototypeOf"))return v;for(var b in a);return b===n||F.call(a,b)||!F.call(a,b)&&F.call(Object.prototype,b)};d.L=function(){z=
h=r;d=l=l.FSR=r};d.Nb=function(a){var b=d.now(),c;do c=d.now();while(c-b<a)};l.FSR=d;l.FSR.opts=h;l.FSR.prop=u;d.m={};d.m.Ja={};var A=d.m.Ja;d.m.Pa={};var j=d.m.Pa;j.Kb=function(){for(var a=s.oa.replace(/[\s\\\/\.\(\);:]/gim,""),b="",c=d.now()+"",f=0;f<a.length-1;f+=a.length/7)b+=Number(a.charCodeAt(Math.round(f))%16).toString(16);7<b.length&&(b=b.substr(b.length-7));return b+"-"+a.length+c.substr(c.length-6)+"-xxxx-xxxx-xxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:
b&3|8).toString(16)})};j.Wb=function(a,b){return a+Math.random()*(b-a)};j.v=function(a,b,c){var f="";if(a)for(var e in a)f+=(0!=f.length?"&":"")+(b?b+"["+e+"]":e)+"="+(c?val:d.M(a[e]));return f};j.hash=function(a){a=a.split("_");return 3*a[0]+1357+""+(9*a[1]+58)};j.ca=function(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");a=RegExp("[\\?&+]"+a+"=([^&#]*)").exec(d.ya());return a==r?v:a[1]};j.sa=function(a,b){return a[b]||a.files};j.Fb=function(a,b){for(var c=0;c<document.styleSheets.length;c++)if(!document.styleSheets[c].href||
-1==document.styleSheets[c].href.indexOf("foresee-dhtml.css")){var d=document.styleSheets[c].cssRules?document.styleSheets[c].cssRules:document.styleSheets[c].rules;if(d)for(var e=0;e<d.length;e++)d[e].cssText&&(d[e].cssText.match(a)&&d[e].selectorText)&&Y(V(d[e].selectorText),b)}};for(var P={},H=["onload","onerror","onabort"],m=0;m<H.length;m++)P[H[m]]=function(){this.kb(0==arguments.callee.eb?1:0);this.p=v},P[H[m]].eb=m;A.s=function(a,b){this.options=d.j({},a);this.p=v;this.event=b;this.ha=0;return this};
A.s.prototype.kb=function(a){if(this.p)switch(this.p=v,this.status=a,a){case 1:(this.options.onSuccess||d.P)(n);break;case 0:this.event?this.vb():(this.options.onFailure||d.P)(n);break;case -1:(this.options.onError||d.P)(n)}};A.s.prototype.vb=function(){if(3>this.ha)this.na();else this.onFailure()};A.s.prototype.Qa=function(a){var b;this.p=q;a=j.v(d.j(a,{uid:d.now()}));a=d.W()+"//"+this.options.host+this.options.path+this.options.url+"?"+a;b=d.j({},P,b);for(var c=new Image,f=0;f<H.length;f++){var e=
H[f];c[e]=function(){var a=arguments.callee;a.B.onload=a.B.onerror=a.B.onabort=r;a.$a.call(a.self,a.B);a.B=r};c[e].$a=b[e];c[e].B=c;c[e].self=this}c.src=a};A.s.prototype.send=function(a){this.xb=a;this.na()};A.s.prototype.na=function(){var a;this.ha++;a=d.j({event:this.event,ver:this.ha},this.xb,a);this.Qa(a)};d.m.La={};var g=d.m.La;g.va=function(a){return a+(h.site.cookie?"."+h.site.cookie:"")};g.e=function(a,b){var c=g.va("fsr.s"),c=g.ma(c,g.wa(c));return a?d.l(b)?c.set(a,b):c.get(a):c};g.wa=function(a){var b;
b="window"==h.storageOption?function(){var a=arguments.callee;return new g.Db(a.za,a.ua||{})}:function(){var a=arguments.callee;return new g.g(a.za,d.j({path:"/",domain:a.ba.site.domain,secure:a.ba.site.secure,encode:a.ba.encode},a.ua||{}))};b.za=a;b.ba=h;b.ua=n;return b};var T={};g.ma=function(a,b){var c=T[a];return c!=r?c:c=T[a]=new b};d.m.Na={};var p=d.m.Na;p.ab=function(a,b){for(var c=a.name,d=[a.site,a.section,b,g.e("q"),g.e("l")],e=0;e<d.length;e++)c+=d[e]?"-"+d[e]:"";return c};p.ib=function(a){d.hb(j.sa(h.site,
"js_files")+(h.definition||"foresee-surveydef.js"),function(b){"ok"===b&&d.surveydefs&&(d.j(u,d.properties),h.fa=h.surveydefs=d.surveydefs,a())})};p.log=function(a,b){if(u.events.enabled){var c=g.e(),f=c.get("sd");d.l(f)||(f=c.get("cd"));var f=h.fa[f],e=new Date;(new A.s(p.o.event,"logit")).send({cid:h.id,rid:c.get("rid")||"",cat:f.name,sec:f.section||"",type:c.get("q")||"",site:h.site.name||"",lang:c.get("l")||d.$S.locale||"",msg:a,param:b,tms:e.getTime(),tmz:6E4*e.getTimezoneOffset()})}};d.m.Ha=
{};m=d.m.Ha;m.Eb=function(a,b){var c,f,e;d.l(a.length)||(a=[a]);c=0;for(f=a.length;c<f;c++){e=a[c];var i=e.className||"";RegExp("\\b"+b+"\\b").test(i)||(e.className=(""==i?"":i+" ")+b)}};m.Xb=function(a,b){var c,f,e;d.l(a.length)||(a=[a]);c=0;for(f=a.length;c<f;c++)e=a[c],e.className&&(e.className=e.className.replace(RegExp("\\b"+b+"\\b"),""))};m.Ua=function(a,b){if(a){d.l(a.length)||(a=[a]);for(var c=0;c<a.length;c++)for(var f in b)-1=="zIndex".indexOf(f)&&"number"==typeof b[f]&&(b[f]+="px"),a[c].style[f]=
b[f]}return a};var Y=m.Ua;m.outerHTML=function(a){if(d.l(a.outerHTML))return a.outerHTML;var b={TEXTAREA:q},c={HR:q,BR:q,IMG:q,INPUT:q},f=[],e="",i=a.nodeName;switch(a.nodeType){case 1:e=e+"<"+i.toLowerCase();if(b[i])switch(i){case "TEXTAREA":for(b=0;b<a.attributes.length;b++)if("value"!=a.attributes[b].nodeName.toLowerCase())e+=" "+a.attributes[b].nodeName.toUpperCase()+'="'+a.attributes[b].nodeValue+'"';else var g=a.attributes[b].nodeValue;e=e+">"+g+("</"+i+">")}else{for(b=a.attributes.length-1;0<=
b;b--)g=a.attributes[b].nodeName.toLowerCase(),-1<"style,class,id".indexOf(g.toLowerCase())&&(e+=" "+g+'="'+a.attributes[b].nodeValue+'"');e+=">";c[i]||(e+=a.innerHTML,e+="</"+i.toLowerCase()+">")}break;case 3:e+=a.nodeValue;break;case 8:e+="<\!--"+a.nodeValue+"--\>"}f.push(e);return f.join("")};j.Ga=function(){function a(a){return-1<c.toLowerCase().indexOf(a.toLowerCase())}var b={i:"",h:"",version:0,xa:v},c=b.oa=l.navigator.userAgent;/Opera[\/\s](\d+\.\d+)/.test(c)?b.h="Opera":/MSIE (\d+\.\d+);/.test(c)?
b.h="IE":/Navigator[\/\s](\d+\.\d+)/.test(c)?b.h="Netscape":/Chrome[\/\s](\d+\.\d+)/.test(c)?b.h="Chrome":/Safari[\/\s](\d+\.\d+)/.test(c)?(b.h="Safari",/Version[\/\s](\d+\.\d+)/.test(c),b.version=new Number(RegExp.$1)):/Firefox[\/\s](\d+\.\d+)/.test(c)&&(b.h="Firefox");a("Windows")?b.i="Windows":a("OS X")?b.i="Mac":a("Linux")?b.i="Linux":a("Mac")&&(b.i="Mac");a("Android")?b.i="Android":a("iPod")?b.i="iPod":a("iPad")?b.i="iPad":a("iPhone")?b.i="iPhone":(a("blackberry")||a("playbook")||a("BB10"))&&
a("applewebkit")?(b.i="Blackberry",b.h="Safari"):a("Windows Phone")&&(b.i="Winphone");""==b.i&&(b.i=l.orientation!=n?"Mobile":"Other");if(""==b.h)b.h="Unknown";else if(!b.Ra||0==b.Ra)b.version=parseFloat(new Number(RegExp.$1));b.xa="IE"==b.h&&8<=b.version;"IE"==b.h&&(8>b.version&&a("Trident"))&&(b.xa=q);return b}();var s=j.Ga;j.f={};j.f.w={};j.f.J=function(a,b,c,f){var e=j.f.w;if(a){e[b]||(e[b]=[]);e[b].push({X:a,K:c});if("unload"==b){if(d.l(d.I)){d.I.push(c);return}d.I=[]}"propertychange"!=b&&a.addEventListener?
a.addEventListener(b,c,!f):a.attachEvent&&a.attachEvent("on"+b,c)}};j.f.zb=function(a,b,c,f,e){var i=j.f;if(e){if(a.getAttribute("_fsr"+b))return v;a.setAttribute("_fsr"+b,"true")}else if(e=i.w[b])for(i=e.length-1;0<=i;i--){if(d.r)try{e[i].X.toString()}catch(g){e.splice(i,1);continue}if(e[i].X==a&&(f||e[i].K==c))return v}j.f.J(a,b,c)};j.f.Ab=function(a,b,c){j.f.J(a,b,c,q)};j.f.Oa=function(a,b,c){try{"propertychange"!=b&&a.removeEventListener?a.removeEventListener(b,c):a.detachEvent&&a.detachEvent("on"+
b,c)}catch(d){}};var D=j.f.J;j.f.Ia=function(){for(var a=d.I.length-1;0<=a;a--)try{d.I[a].call()}catch(b){}d.Ca(d.I);j.f.Ka();d.L()};D(l,"unload",j.f.Ia);j.f.Ka=function(){if(d){var a=j.f,b;for(b in a.w){for(var c=a.w[b],f={};f=c.pop();)a.Oa(f.X,b,f.K),d.Ca(f);delete a.w[b]}}};j.f.R=function(){this.H=[]};j.f.R.prototype.sb=function(a){this.H[this.H.length]={lb:v,K:a}};j.f.R.prototype.A=function(){for(var a=0;a<this.H.length;a++){var b=this.H[a];b.K.apply(this,arguments);b.lb&&(this.H.splice(a,1),
a--)}};var I=j.f.R,D={width:"1",height:"1",id:"_"+(""+Math.random()).slice(9),allowfullscreen:q,allowscriptaccess:"always",quality:"high",version:[3,0],jb:r,Za:r,ia:v,Sa:v};l.attachEvent&&l.attachEvent("onunload",function(){__flash_unloadHandler=x();__flash_savedUnloadHandler=x()});var M=d.j(d.Jb,{Hb:D,bb:function(){var a,b;try{b=navigator.plugins["Shockwave Flash"].description.slice(16)}catch(c){try{b=(a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"))&&a.GetVariable("$version")}catch(d){try{b=
(a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"))&&a.GetVariable("$version")}catch(e){}}}return(b=/(\d+)[^\d]+(\d+)[^\d]*(\d*)/.exec(b))?[b[1],b[3]]:[0,0]},T:function(a){if(a===r||a===n)return r;var b=typeof a;"object"==b&&a.push&&(b="array");switch(b){case "string":return a=a.replace(RegExp('(["\\\\])',"g"),"\\$1"),a=a.replace(/^\s?(\d+\.?\d*)%/,"$1pct"),'"'+a+'"';case "array":return"["+W(a,function(a){return M.T(a)}).join(",")+"]";case "function":return'"function()"';case "object":var b=
[],c;for(c in a)a.hasOwnProperty(c)&&b.push('"'+c+'":'+M.T(a[c]));return"{"+b.join(",")+"}"}return(""+a).replace(/\s/g," ").replace(/\'/g,'"')},Lb:function(a,b){var a=d.j({},a),c='<object width="'+a.width+'" height="'+a.height+'" id="'+a.id+'" name="'+a.id+'"';a.Sa&&(a.src+=(-1!=a.src.indexOf("?")?"&":"?")+Math.random());c=a.ia||!d.r?c+(' data="'+a.src+'" type="application/x-shockwave-flash"'):c+' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';c+=">";if(a.ia||d.r)c+='<param name="movie" value="'+
a.src+'" />';a.width=a.height=a.id=a.ia=a.src=r;a.jb=a.version=a.Za=r;for(var f in a)a[f]&&(c+='<param name="'+f+'" value="'+a[f]+'" />');f="";if(b){for(var e in b)if(b[e]){var i=b[e];f+=e+"="+(/function|object/.test(typeof i)?M.T(i):i)+"&"}f=f.slice(0,-1);c+='<param name="flashvars" value=\''+f+"' />"}return c+"</object>"},isSupported:function(a){return B[0]>a[0]||B[0]==a[0]&&B[1]>=a[1]}}),B=d.ja=M.bb();d.cb=B!=r&&0<B.length&&0<parseFloat(B[0]);d.cb||(B=d.ja=[0,0]);var J={};d.stringify=function(a,
b,c){var d;if(l.Prototype){d=Array.prototype.toJSON;delete Array.prototype.toJSON}if(!l.JSON||typeof l.JSON.stringify!=="function"){var e;E=t="";if(typeof c==="number")for(e=0;e<c;e=e+1)E=E+" ";else typeof c==="string"&&(E=c);if((y=b)&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number"))throw Error("_4c.stringify");a=L("",{"":a})}else a=l.JSON.stringify(a,b,c);if(l.Prototype)Array.prototype.toJSON=d;return a};var Q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
O=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,t,E,X={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},y;l.JSON?J=l.JSON:function(){function a(a){return a<10?"0"+a:a}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+a(this.getUTCMonth()+1)+"-"+a(this.getUTCDate())+"T"+a(this.getUTCHours())+":"+a(this.getUTCMinutes())+
":"+a(this.getUTCSeconds())+"Z":r};Boolean.prototype.toJSON=function(){return this.valueOf()};Number.prototype.toJSON=function(){return this.valueOf()};String.prototype.toJSON=function(){return this.valueOf()}}if(typeof J.parse!=="function")J.parse=function(a,c){function d(a,b){var e,g,h=a[b];if(h&&typeof h==="object")for(e in h)if(Object.prototype.hasOwnProperty.call(h,e)){g=d(h,e);g!==n?h[e]=g:delete h[e]}return c.call(a,b,h)}var e,a=""+a;Q.lastIndex=0;Q.test(a)&&(a=a.replace(Q,function(a){return"\\u"+
("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){e=(new Function("return "+a))();return typeof c==="function"?d({"":e},""):e}throw new SyntaxError("JSON.parse");}}();j.Bb=J;m.Cb={};try{Array.prototype.slice.call(document.getElementsByTagName("html")),makeArray=function(a){return Array.prototype.slice.call(a)}}catch($){}g.g=
function(a,b){a||(a="STORAGE");this.Z=a.replace(/[- ]/g,"");this.D=b||{};this.data={};this.Ma=new I;this.rb=4E3};g.g.prototype.set=function(a,b){this.S();this.n[a]=b;this.V()};g.g.prototype.get=function(a){this.S();return a?this.n[a]:this.n};g.g.prototype.L=function(a){this.S();delete this.n[a];this.V()};g.g.prototype.fb=function(){this.n={};var a=this.D.duration;this.D.duration=-1;this.V();a?this.D.duration=a:delete this.D.duration};g.g.prototype.S=function(){this.n={};try{var a=g.g.F(this.Z);if(a&&
a.length>0){this.n=J.parse(a);if(!d.l(this.n))this.n={}}}catch(b){this.n={}}};g.g.prototype.V=function(){var a=d.stringify(this.n);this.Z.length+d.M(a).length>this.rb&&this.Ma.A(this);g.g.write(this.Z,a,this.D)};g.g.F=function(a){return(a=l.document.cookie.match("(?:^|;)\\s*"+d.Ya(a)+"=([^;]*)"))?d.ra(a[1]):r};g.g.write=function(a,b,c){var b=!c||!d.l(c.encode)||c.encode?d.M(b):b,a=d.M(a),f;for(f in c)if(c[f]){var e=c[f],b=b+(";"+(f==="duration"?"expires":f));switch(f){case "duration":b=b+("="+(new Date(d.now()+
e*d.ka)).toGMTString());default:b=b+("="+e)}}l.document.cookie=a+"="+b;return a.length+b.length+2};g.g.fb=function(a,b){g.g.write(a,"",d.j(b,{duration:-1}))};g.g.Pb=x();g.g.isSupported=function(){return q};p.q={};p.q.set=function(a,b,c,d){c=K(d);c[1][a]=b;c[0].set("cp",c[1])};p.q.get=function(a,b){return K(b)[0][a]};p.q.ta=function(a,b){var c=K(b);delete c[1][a];c[0].set("cp",c[1])};p.q.append=function(a,b,c,d){d=K(d);d[1][a]=d[1][a]?d[1][a]+","+b:b;if(c){b=d[1][a].split(",");c=b.length>c?b.length-
c:0;d[1][a]=b.splice(c,b.length-1-c+1).join()}d[0].set("cp",d[1])};p.q.v=function(a){var a=a||g.e(),b=a.get("sd");d.l(b)||(b=a.get("cd"));b=h.fa[b];a={browser:s.h+" "+s.version,os:s.i.match(/ipod|ipad|iphone/i)?"iOS":s.i,pv:a.get("pv"),url:w(a,"c"),ref_url:w(a,"ru"),locale:w(a,"l"),site:w(h.site.name),section:w(b.section),referrer:w(a,"r"),terms:w(a,"st"),sessionid:w(a,"rid"),replay_id:w(a,"mid"),flash:d.ja.join(".")};s.i.match(/android|ipod|ipad|iphone|blackberry|firefox/i)&&(a.screen=screen.width+
"x"+screen.height);if(u.meta.user_agent)a.user_agent=s.oa;if(u.analytics.google){var c=g.g.F("__utma"),b=g.g.F("__utmz");if(c&&c!=""){c=c.split(".");a.first=c[2];a.last=c[3];a.current=c[4];a.visits=c[5]}if(b&&b!=""){var f,c=[];f=["utmgclid","utmcsr","utmccn","utmcmd","utmctr"];for(var e=0;e<f.length;e++)c.push(RegExp(f[e]+"=([^\\|]*)"));if(b.match(c[0])){a.source="Google";a.campaign="Google Adwords";a.medium="cpc"}else{if(f=b.match(c[1]))a.source=f[1];if(f=b.match(c[2]))a.campaign=f[1];if(f=b.match(c[3]))a.medium=
f[1]}if(f=b.match(c[4]))a.keyword=f[1]}}b=g.e("cp");c=g.e("meta");a=d.j({},b||{},a||{},c||{});return j.v(a,"cpp")};m=p.q;l.FSR.CPPS=m;m.set=m.set;m.get=m.get;m.erase=m.ta;m.append=m.append;D={};l.ForeSee=D;D.CPPS=m;m.fsr$set=m.set;m.fsr$get=m.get;m.fsr$erase=m.ta;m.fsr$append=m.append;p.o={};p.o.ub={host:"survey.foreseeresults.com",path:"/survey",url:"/display"};p.o.Vb={host:"i.4see.mobi",path:"/e",url:"/initialize"};p.o.Ub={host:"i.4see.mobi",path:"/e",url:"/recordHeartbeat"};p.o.qa={host:"controller.4seeresults.com",
path:"/fsrSurvey",url:"/OTCImg",tb:3};p.o.event={host:"events.foreseeresults.com",path:"/rec",url:"/process"};p.o.domain={host:"survey.foreseeresults.com",path:"/survey",url:"/FSRImg",tb:3};p.o.Yb={host:"replaycontroller.4seeresults.com",path:"/images",enabled:q};d.G(function(){h.siteid=j.ca("siteid");h.site=h.sites[h.siteid];h.site.name||(h.site.name=j.ca("name"));h.site.domain||(h.site.domain=j.ca("domain"));h.site.domain=="default"&&(h.site.domain=r);for(var a=["files","js_files","image_files",
"html_files","css_files","swf_files"],b=0;b<a.length;b++){var c=a[b];h.site[c]||h[c]&&(h.site[c]=h[c])}});d.d=function(a){d.j(this,{options:d.j({},a),Ea:v,p:v,z:r,u:r,O:r,k:r});h.controller=this;this.yb()};d.d.loaded=new I;d.d.Fa=new I;d.d.Aa=new I;d.d.Da=new I;d.d.prototype.yb=function(){if(d.d.Q.Y)for(var a=[["loaded",d.d.loaded],["initialized",d.d.Qb],["trackerCanceled",d.d.Fa],["qualifierShown",d.d.Aa],["surveyShown",d.d.Da]],b=0;b<a.length;b++){var c=a[b];d.t(d.d.Q.Y[c[0]])&&c[1].sb(d.d.Q.Y[c[0]])}};
d.d.prototype.load=function(){if(s.h!="Chrome"&&!(s.h=="Firefox"&&s.version>=4)&&!(s.h=="Safari"&&s.version>=5)){var a=document.getElementById("hide");if(a)a.style.display="block"}if(this.p)return this;this.p=q;p.ib(function(a){return function(){a.pb()}}(this))};d.d.prototype.pb=function(){d.d.loaded.A();g.e("t","1");this.qb();this.z=this.Ba();this.O=d.now();this.u=setInterval(function(a){return function(){a.qa()}}(this),500)};d.d.prototype.wb=function(){if(this.p){g.e().L("t");clearInterval(this.u);
this.p=v;if(!this.Ea){g.e("rc",q);d.d.Fa.A(this.k,g.e());p.log("201")}}};d.d.prototype.qa=function(){var a=this.Ba(),b=g.e("fo")||0,c=g.e("to")||u.tracker.timeout,f=u.tracker.pause||6;if(a==this.z){try{if(l.opener.document)return}catch(e){}if(this.paused!="1"){if((d.now()-this.O)/1E3>=c){clearInterval(this.u);this.da()}}else if((d.now()-this.O)/1E3>f){clearInterval(this.u);this.da()}}else if(b!=0){clearInterval(this.u);this.da(b!=1)}else{this.z=a;this.O=d.now();this.paused=0;if(this.z=="paused"||
this.z=="suspended")this.paused=1}};d.d.prototype.da=function(a){this.Ea=q;this.Ta();this.gb(a||this.k.pop.pu)};d.d.prototype.Ta=function(){var a=g.e(),b=a.get("sd");d.l(b)||(b=a.get("cd"));a=h.fa[b];a.idx=b;a.survey=d.C(u.survey,a.survey||{});a.qualifier=d.C(u.qualifier,a.qualifier||{});a.pop=d.C(u.pop,a.pop||{});a.tracker=d.C(u.tracker,a.tracker||{});this.k=a};d.d.prototype.gb=function(a){g.e("s",1);this.k.pop.what!="qualifier"?this.nb(a):this.mb(a)};d.d.prototype.nb=function(a){d.d.Da.A(this.k,
g.e());p.log("400",g.e("c")||"");var b=p.o.ub,c=this.k.survey,f=(l.screen.width-c.width)/2,e=(l.screen.height-c.height)/2,i=d.W(),m=b.host,o=b.path,k=new Date-0+"_"+Math.round(Math.random()*1E13),s=j.hash(k),t=g.e("c")||"",k={sid:p.ab(this.k,this.k.pop.later),cid:h.id,pattern:t,a:k,b:s,c:d.ka,version:h.version},s=p.q.v(),k=j.v(k);this.pop(i+"//"+m+o+b.url+"?"+k+"&"+s,f,e,c.width,c.height,a)};d.d.prototype.mb=function(a){d.d.Aa.A(this.k,g.e());p.log("300",g.e("c")||"");var b=this.k.qualifier;this.page(b);
var c=(l.screen.width-b.width)/2,f=(l.screen.height-b.height)/2,e=j.sa(h.site,"html_files")+(b.url.pop||b.url),i={siteid:h.siteid,name:h.site.name,domain:h.site.domain};this.k.pop.later&&(i.when=this.k.pop.later);i=j.v(i);this.pop(e+("?"+i),c,f,b.width,b.height,a)};d.d.prototype.pop=function(a,b,c,d,e,h){var j=this.k.tracker;if(!h&&s.h==="Chrome"&&j.alert&&j.alert.enabled){this.page(j.alert);alert(j.alert.message)}setTimeout(function(){l.moveTo(b,c);l.resizeTo(d,e);if(h){l.blur();try{l.opener.focus()}catch(j){}}else l.focus();
g.e().L("t");clearInterval(this.u);o.location.href=a},0)};d.d.prototype.page=function(a){var b=g.e("l");if(b)for(var c=a.locales||[],d=0,e=c.length;d<e;d++)if(c[d].locale==b){c[d].url&&(a.url=c[d].url);c[d].message&&(a.message=c[d].message);c[d].accept&&(a.accept=c[d].accept);c[d].decline&&(a.decline=c[d].decline);c[d].width&&(a.width=c[d].width);c[d].height&&(a.height=c[d].height);break}};d.d.prototype.Ba=function(){return g.g.F(g.va("fsr.a"))};d.d.prototype.qb=function(){o.cookie="fsr.a"+(h.site.cookie?
"."+h.site.cookie:"")+"="+d.now()+";path=/"+(h.site.domain?";domain="+h.site.domain+";":";")+(h.site.secure?"secure":"")};d.G(function(){(new d.d).load();j.f.J(l,"unload",function(){h.controller.wb()})});d.d.Q={Y:{loaded:x(),trackerCanceled:x(),qualifierShown:x(),surveyShown:x()}}})(window,$$FSR);})({});
}