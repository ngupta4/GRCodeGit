var $$FSR = {
   'timestamp': 'May 15, 2012 @ 12:46 PM',
   'version': '12.2.6',
   'enabled': true,
   'sessionreplay': true,
   'auto' : true,
   'encode' : false,
   'files': '/foresee-wen/',
   //'swf_files': '__swf_files_' needs to be sef when foresee-transport.swf is not located at 'files'
   'id': '6sJmheP5LU9igNllgCIbDg==',
   'definition': 'foresee-surveydef.js',
   'embedded': false,
   'replay_id': 'grdev.com',
   'renderer':'W3C',	// or "ASRECORDED"
   'layout':'CENTERFIXED',	// or "LEFTFIXED" or "LEFTSTRETCH" or "CENTERSTRETCH"
   'sites': [
      {
      name: 'wen',
         path: /\w+-?\w+\.(com|org|edu|gov|net|co\.uk)/
      },
      {
      name: 'wen',
         path: '.',
         domain: 'default'
      }
   ],
   storageOption: 'cookie'
};
// -------------------------------- DO NOT MODIFY ANYTHING BELOW THIS LINE ---------------------------------------------
if (typeof(FSR) == "undefined") {
(function(config){var p=void 0,q=!0,t=null,v=!1;
(function(H){function u(a,c){return(c?a.get(c):a)||""}function F(a){return[a||f.d.l(),(a||f.d.l()).get("cp")||{}]}function W(a,c,b){var e=function(a,c){return function(b){c.call(a,b)}}(a,b);"beforeunload"==c?a.onbeforeunload=a.onbeforeunload?function(a,c,b){return function(){var d;d=a.apply(c,[]);b.apply(c,[]);if(d)return d}}(a.onbeforeunload,a,b):b:"mouseenter"===c?a.attachEvent?a.attachEvent("on"+c,e):a.addEventListener("mouseover",m.ya.xb(b),v):"mouseleave"===c?a.attachEvent?a.attachEvent("on"+
c,e):a.addEventListener("mouseout",m.ya.yb(b),v):(X++,a.attachEvent?a.attachEvent("on"+c,e):a.addEventListener(c,e,v))}function Q(a,c){if(""===a&&c)return c;var d=a.split(" "),e=b.shift(d),h;if("#"==e.charAt(0)){var g=b.Ja(e.substring(1));h=g?[g]:[]}else{h="."!==e.charAt(0)?e.split(".")[0]:"*";var s=e.split("."),f=t;-1!=b.j("[",h)&&(f=h,h=h.substr(0,b.j("[",h)));for(var g=function(a){var c=arguments.callee,d;if(!(d=!c.bb)){d=c.La;if(a.className.length==0)d=v;else{for(var e=a.className.split(" "),
h=d.length,g=0;g<d.length;g++)b.Va(d[g],e)&&h--;d=h==0}}if(d&&(!c.ab||Y(a,c.attributes)))return a},i=[],j=0;j<c.length;j++)for(var R=c[j].getElementsByTagName(h),k=0;k<R.length;k++)i.push(R[k]);s&&b.shift(s);h=[];g.La=s;if(f!=t)var I=b.j("[",f),I=f.substring(I+1,f.lastIndexOf("]")).split("][");g.attributes=f!=t?I:t;g.bb=-1!=b.j(".",e)&&0<s.length;g.ab=f!=t;for(e=0;e<i.length;e++)g(i[e])&&h.push(i[e])}return Q(d.join(" "),h)}function Y(a,c){function d(a){var c="";b.k(["!","*","~","$","^"],function(d,
e){if(-1!=b.j(e,a))return c=e,v});return c}for(var e=q,h=0;h<c.length;h++){var g=c[h].split("="),s=b.shift(g),g=2<g.length?g.join("="):g[0],f=d(s)+"=",i=function(a,c){var b=a.match(c);return b&&0<b.length},s="="!=f?s.substring(0,s.length-1):s,s=a.getAttribute(s);switch(f){case "=":e&=s===g;break;case "!=":e&=s!==g;break;case "*=":e&=i(s,g);break;case "~=":e&=i(s,RegExp("\\b"+g+"\\b","g"));break;case "^=":e&=i(s,RegExp("^"+g));break;case "$=":e&=i(s,RegExp(g+"$"));break;default:e=v}}return e}function b(a){i=
b.n(i,a)}var i={},w={},j=j=this,n=j.document;b.S=!j.opera&&!!n.attachEvent;b.ja=864E5;var D=Object.prototype.hasOwnProperty,J=Object.prototype.toString,E=[],G=v,S=v,B;b.I=function(a){return t!==a&&p!==a};b.q=function(a){return"[object Function]"===J.call(a)};b.R=function(a){return"[object Array]"===J.call(a)};b.t=function(a){return"string"===typeof a};b.Wa=function(a){return"number"===typeof a};b.C=function(a){if(!a||("[object Object]"!==J.call(a)||a.nodeType||a.setInterval)||a.constructor&&!D.call(a,
"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return v;for(var c in a);return c===p||D.call(a,c)||!D.call(a,c)&&D.call(Object.prototype,c)};b.n=function(){var a=arguments[0]||{},c=1,d=arguments.length,e,h,g;"object"!==typeof a&&!b.q(a)&&(a={});d===c&&(a=this,--c);for(;c<d;c++)if((e=arguments[c])!=t)for(h in e)g=e[h],a!==g&&g!==p&&(a[h]=g);return a};b.ga=function(a){var c;if(b.C(a)){c={};for(var d in a)c[d]=b.ga(a[d])}else if(b.R(a)){c=[];d=0;for(var e=a.length;d<e;d++)c[d]=b.ga(a[d])}else c=
a;return c};b.J=function(){for(var a={},c=0,d=arguments.length;c<d;c++){var e=arguments[c];if(b.C(e))for(var h in e){var g=e[h],f=a[h];a[h]=f&&b.C(g)&&b.C(f)?b.J(f,g):b.ga(g)}}return a};b.U=function(){};b.now=function(){return+new Date};b.j=function(a,c){if(b.R(c)||b.C(c)){for(var d in c)if(c[d]===a)return d;return-1}return(""+c).indexOf(a)};b.Va=function(a,c){return-1!=b.j(a,c)};b.k=function(a,c){var d,e=0,h=a.length;if(h===p||b.q(a))for(d in a){if(c.call(a[d],d,a[d])===v)break}else for(d=a[0];e<
h&&c.call(d,e,d)!==v;d=a[++e]);return a};b.Ja=function(a){return n.getElementById(a)};b.trim=function(a){return a.toString().replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")};b.Pa=function(a){return a.toString().replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")};b.shift=function(a){return a.splice(0,1)[0]};b.Bb=function(a,c,d){for(var e=a.split("."),c=c[b.shift(e)],h=d,g;c!=t&&0<e.length;)c=c[b.shift(e)];if(c){e=a.split(".");for(g;e.length&&(g=b.shift(e));)h=h[g]?h[g]:h[g]={};e=a.split(".");h=d;for(g;e.length&&
(g=b.shift(e));)0<e.length?h=h[g]:h[g]=c}};b.$a=function(){return n.location.href};b.Cb=function(){return n.referrer};b.X=function(){return n.location.protocol};b.Q=function(a){return encodeURIComponent(a)};b.Na=function(a){return decodeURIComponent(a)};b.P=this;b.w=function(a,c){var d=j.document.readyState,c=c||1;if(b.q(a)&&(a=function(a,c,b){return function(){setTimeout(function(a,c){return function(){c.call(a)}}(a,c),b)}}(b.P,a,c),d&&("complete"==d||"loaded"==d))){G=q;for(E.push(a);d=b.shift(E);)d&&
d.call(b.P);return}if(!G&&b.q(a))E.push(a);else if(G&&b.q(a))a.call(b.P);else if(!b.q(a))for(G=q;0<E.length;)(d=b.shift(E))&&d.call(b.P)};b.ka=t;b.w(function(){b.ka=n.getElementsByTagName("head")[0]||n.documentElement});b.Ya=function(a,c){var c=c||b.U,d=n.createElement("script");d.type="text/javascript";b.S?d.onreadystatechange=function(){("loaded"==this.readyState||"complete"==this.readyState)&&c("ok")}:d.onload=function(){c("ok")};d.onerror=function(){c("error")};d.src=0==b.j("//",a)?b.X()+a:a;
b.ka.appendChild(d)};b.Fb=function(a){var c=b.now(),d;do d=b.now();while(d-c<a)};n.addEventListener?B=function(){n.removeEventListener("DOMContentLoaded",B,v);b.w(t)}:b.S&&(B=function(){"complete"===n.readyState&&(n.detachEvent("onreadystatechange",B),b.w(t))});S||(S=q,n.addEventListener?(n.addEventListener("DOMContentLoaded",B,v),H.addEventListener("load",b.w,v)):b.S&&(n.attachEvent("onreadystatechange",B),H.attachEvent("onload",b.w)));b.Ib={};b.startTime=b.now();j.FSR=b;j.FSR.opts=i;j.FSR.prop=
w;b.d={};b.d.Ca={};var k=b.d.Ca,x;x||(x={});(function(){function a(a){return a instanceof Date?isFinite(this.valueOf())?this.getUTCFullYear()+"-"+c(this.getUTCMonth()+1)+"-"+c(this.getUTCDate())+"T"+c(this.getUTCHours())+":"+c(this.getUTCMinutes())+":"+c(this.getUTCSeconds())+"Z":t:a.valueOf()}function c(a){return a<10?"0"+a:a}function b(a){g.lastIndex=0;return g.test(a)?'"'+a.replace(g,function(a){var c=j[a]||j[a.charCodeAt(0)];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+
'"':'"'+a+'"'}function e(c,h){var g,j,l,m,o=f,n,r=h[c];r&&(typeof r==="object"&&(r instanceof Date||r instanceof Date||r instanceof Boolean||r instanceof String||r instanceof Number))&&(r=a(r));typeof k==="function"&&(r=k.call(h,c,r));switch(typeof r){case "string":return b(r);case "number":return isFinite(r)?""+r:"null";case "boolean":case "null":return""+r;case "object":if(!r)return"null";f=f+i;n=[];if(Object.prototype.toString.apply(r)==="[object Array]"){m=r.length;for(g=0;g<m;g=g+1)n[g]=e(g,
r)||"null";l=n.length===0?"[]":f?"[\n"+f+n.join(",\n"+f)+"\n"+o+"]":"["+n.join(",")+"]";f=o;return l}if(k&&typeof k==="object"){m=k.length;for(g=0;g<m;g=g+1)if(typeof k[g]==="string"){j=k[g];(l=e(j,r))&&n.push(b(j)+(f?": ":":")+l)}}else for(j in r)if(Object.prototype.hasOwnProperty.call(r,j))(l=e(j,r))&&n.push(b(j)+(f?": ":":")+l);l=n.length===0?"{}":f?"{\n"+f+n.join(",\n"+f)+"\n"+o+"}":"{"+n.join(",")+"}";f=o;return l}}var h=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200b-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
g=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200b-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,f,i,j={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\",8203:""},k;if(typeof x.stringify!=="function")x.stringify=function(a,c,b){var d;i=f="";if(typeof b==="number")for(d=0;d<b;d=d+1)i=i+" ";else typeof b==="string"&&(i=b);if((k=c)&&typeof c!=="function"&&(typeof c!=="object"||typeof c.length!=="number"))throw Error("JSON.stringify");return e("",
{"":a})};if(typeof x.parse!=="function")x.parse=function(a,c){function b(a,d){var e,h,g=a[d];if(g&&typeof g==="object")for(e in g)if(Object.prototype.hasOwnProperty.call(g,e)){h=b(g,e);h!==p?g[e]=h:delete g[e]}return c.call(a,d,g)}var d,a=""+a;h.lastIndex=0;h.test(a)&&(a=a.replace(h,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){d=(new Function("return "+a))();return typeof c==="function"?b({"":d},""):d}throw new SyntaxError("JSON.parse");}})();b.d.JSON=x;b.d.Fa={};var f=b.d.Fa;b.d.xa={};var m=b.d.xa;k.Sa=function(){for(var a=j.navigator.userAgent.replace(/[\s\\\/\.\(\);:]/gim,""),c="",d=b.now()+"",e=0;e<a.length-1;e=e+a.length/7)c=c+Number(a.charCodeAt(Math.round(e))%16).toString(16);c.length>7&&(c=c.substr(c.length-7));return c+"-"+a.length+d.substr(d.length-6)+"-xxxx-xxxx-xxxxx".replace(/[xy]/g,
function(a){var c=Math.random()*16|0;return(a=="x"?c:c&3|8).toString(16)})};k.s={};k.s.u=function(){this.M=[]};k.s.u.prototype.nb=function(a){this.M[this.M.length]={eb:v,Ka:a}};k.s.u.prototype.Y=function(){for(var a=0;a<this.M.length;a++){var c=this.M[a];c.Ka.apply(this,arguments);if(c.eb){this.M.splice(a,1);a--}}};b.d.la={};var l=b.d.la;l.G=[];l.zb=function(a,c,d){if(a.SR&&a.SR.updatedAt)for(var e=0;e<l.G.length;e++){var h=l.G[e];if(h.ua.SR&&h.ua.SR.updatedAt==a.SR.updatedAt){if(b.now()-h.tb<1500)return h.mb;
l.G.splice(e,1);break}}c=b.d.JSON.stringify(a,c,d);l.G[l.G.length]={ua:a,mb:c,tb:b.now()};return c};var K=1,L=9,M=Array.prototype.slice;m.Ba=function(a,c){c=c||n;if(a.nodeType&&a.nodeType===L){a=n.body;if(a===t)return[n]}if(a.nodeType&&a.nodeType===K)return[a];if(a.z&&b.t(a.z))return M.call(a,0);c&&(c=m.g.Ga(c));if(b.R(a))return a;if(b.t(a)){for(var d=[],e=0;e<c.length;e++)d=d.concat(Q(a,[c[e]]));return d}return t};f.v={};f.v.pb={host:"survey.foreseeresults.com",path:"/survey",url:"/display"};f.v.Ab=
{host:"controller.4seeresults.com",path:"/fsrSurvey",url:"/OTCImg",ob:3};f.v.event={host:"events.foreseeresults.com",path:"/rec",url:"/process"};f.v.domain={host:"survey.foreseeresults.com",path:"/survey",url:"/FSRImg",ob:3};f.v.Lb={host:"replaycontroller.4seeresults.com",path:"/images",enabled:v};l.h=function(a,c){a||(a=k.Sa());this.$=a.replace(/[- ]/g,"");this.K=c||{};this.data={};this.Ea=new k.s.u;this.lb=4E3};l.h.prototype.set=function(a,c){this.V();this.p[a]=c;this.W()};l.h.prototype.get=function(a){this.V();
return a?this.p[a]:this.p};l.h.prototype.oa=function(a){this.V();delete this.p[a];this.W()};l.h.prototype.T=function(){this.p={};var a=this.K.duration;this.K.duration=-1;this.W();a?this.K.duration=a:delete this.K.duration};l.h.prototype.V=function(){try{var a=l.h.ca(this.$);this.p=a?b.d.JSON.parse(a):{}}catch(c){this.p={}}if(!this.p)this.p={}};l.h.prototype.W=function(){var a=b.d.JSON.stringify(this.p);this.$.length+b.Q(a).length>this.lb&&this.Ea.Y(this);l.h.write(this.$,a,this.K)};l.h.ca=function(a){return(a=
j.document.cookie.match("(?:^|;)\\s*"+b.Pa(a)+"=([^;]*)"))?b.Na(a[1]):t};l.h.write=function(a,c,d){var e=!d||!b.I(d.encode)||d.encode?b.Q(c):c,a=b.Q(a);b.k(d,function(a,c){if(c!=t){var d;a:switch(a){case "duration":d="="+(new Date(b.now()+c*b.ja)).toGMTString();break a;case "secure":d="";break a;default:d="="+c}e=e+(";"+(a==="duration"?"expires":a)+d)}});j.document.cookie=a+"="+e;return a.length+e.length+2};l.h.T=function(a,c){l.h.write(a,"",b.n(c,{duration:-1}))};l.h.Gb=function(){};l.h.isSupported=
function(){return q};var T={};f.Da=function(a,c){function d(a){this.L=a()}var e=T[a];if(e!=t)return e;d.prototype.set=function(a,c){if(b.C(a))for(var d in a)this.L.set(d,a[d]);else this.L.set(a,c)};d.prototype.get=function(a){return this.L.get(a)};d.prototype.pa=function(a){this.L.oa(a)};d.prototype.oa=function(){this.L.T()};return e=T[a]=new d(c)};j.FSR._storage=function(a,c,d){a=b.Mb.la(a);if(d===p&&b.t(c))return a.get(c);d!==p?a.set(c,d):c!==p&&a.set(c);return a.Db()};b.d.ma={};var o=b.d.ma;m.g=
function(a,c){return new m.g.prototype.sa(a,c)};var U=Array.prototype.push,M=Array.prototype.slice,K=1,L=9;m.g.J=function(a,c){var d=a.length,e=0;if(b.Wa(c.length))for(var f=c.length;e<f;e++)a[d++]=c[e];else for(;c[e]!==p;)a[d++]=c[e++];a.length=d;return a};m.g.Jb=function(a,c){var d=c||[];a!=t&&(a.length==t||b.t(a)||b.q(a)||!b.q(a)&&a.setInterval?U.call(d,a):m.g.J(d,a));return d};m.g.wb=function(a,c){var b={};b[a]=c;return b};m.g.Ha=function(a){a=b.trim(a).toLowerCase();return b.j("<option",a)==
0?"SELECT":b.j("<li",a)==0?"UL":b.j("<tr",a)==0?"TBODY":b.j("<td",a)==0?"TR":"DIV"};m.g.Ga=function(a){a.setInterval||a.nodeType&&(a.nodeType===K||a.nodeType===L)?a=[a]:b.t(a)?a=m.g(a).ea():a.z&&b.t(a.z)&&(a=a.ea());return a};m.g.Eb=function(a,c,b){for(var e=[],f,b=!!b,g=0,i=a.length;g<i;g++){f=!!c(a[g],g);b!==f&&e.push(a[g])}return e};m.g.prototype.sa=function(a,c){this.length=0;this.z="_4cCommonDom.Query";if(!a)return this;if(a.setInterval||a.nodeType){this[0]=a;this.length=1}else{var d=[];if(a.z&&
b.t(a.z))d=a.ea();else if(b.R(a))d=a;else if(b.t(a)&&b.j("<",b.trim(a))==0&&b.j(">",b.trim(a))!=-1){var e=m.g.Ha(a),e=n.createElement(e);e.innerHTML=a;b.S?d.push(e.firstChild):d.push(e.removeChild(e.firstChild))}else{if(b.j(",",a)!=-1){d=a.split(",");for(e=0;e<d.length;e++)d[e]=b.trim(d[e])}else d=[a];for(var e=[],f=0;f<d.length;f++)e=e.concat(m.Ba(d[f],c));d=e}U.apply(this,d)}return this};m.g.prototype.k=function(a){return b.k(this,a)};m.g.prototype.ea=function(){return M.call(this,0)};m.g.prototype.constructor=
m.g;m.g.prototype.sa.prototype=m.g.prototype;j.FSR._query=function(a,c){return m.g(a,c)};k.i={};k.i.Kb=function(a,c){return a+Math.random()*(c-a)};k.i.O=function(a,c,d){var e="";a&&b.k(a,function(a,g){e=e+((e.length!=0?"&":"")+(c?c+"["+a+"]":a)+"="+(d?g:b.Q(g)))});return e};k.i.hash=function(a){a=a.split("_");return a[0]*3+1357+""+(a[1]*9+58)};k.i.D=function(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");a=RegExp("[\\?&+]"+a+"=([^&#]*)").exec(b.$a());return a==t?v:a[1]};k.i.Oa=function(a){return a.js_files||
a.files};f.d={};f.d.Z=function(a){return a+(i.site.cookie?"."+i.site.cookie:"")};f.d.l=function(a,c){var d=f.d.Z("fsr.s"),d=f.Da(d,f.d.Ta(d));return a?b.I(c)?d.set(a,c):d.get(a):d};f.d.Ua=function(a,c){var d=a.name;b.k([a.site,a.section,c,f.d.l("q"),f.d.l("l")],function(a,c){d=d+(c?"-"+c:"")});return d};f.d.Za=function(a){b.Ya(k.i.Oa(i.site)+(i.definition||"foresee-surveydef.js"),function(c){if("ok"===c){b.n(w,b.properties);i.da=i.surveydefs=b.surveydefs;a()}})};f.d.log=function(a,c){if(w.events.enabled){var d=
f.d.l(),e=d.get("sd");b.I(e)||(e=d.get("cd"));var e=i.da[e],h=new Date;(new y.A(f.v.event,"logit")).send({cid:i.id,rid:d.get("rid")||"",cat:e.name,sec:e.section||"",type:d.get("q")||"",site:i.site.name||"",lang:d.get("l")||b.$S.locale||"",msg:a,param:c,tms:h.getTime(),tmz:h.getTimezoneOffset()*6E4})}};f.d.Ta=function(a){var c;switch(i.storageOption){case "window":c=function(){var a=arguments.callee;return new l.vb(a.ta,a.ra||{})};break;default:c=function(){var a=arguments.callee;return new l.h(a.ta,
b.n({path:"/",domain:a.aa.site.domain,secure:a.aa.site.secure,encode:a.aa.encode},a.ra||{}))}}c.ta=a;c.aa=i;c.ra=p;return c};b.d.za={};var y=b.d.za,z=navigator.userAgent,A=[{F:z,B:"Chrome",o:"Chrome"},{F:navigator.vendor,B:"Apple",o:"Safari",ha:"Version"},{fb:H.opera,o:"Opera"},{F:z,B:"Firefox",o:"Firefox"},{F:z,B:"Netscape",o:"Netscape"},{F:z,B:"MSIE",o:"Explorer",ha:"MSIE"},{F:z,B:"Gecko",o:"Mozilla",ha:"rv"}],N;o.f={fa:z};o.f.platform=(navigator.platform.match(/mac|win32|linux|iphone|ipad|ipod|blackberry|wince|android/i)||
["other"])[0].toLowerCase();o.f.fa.match(/android/i)&&(o.f.platform="android");o.f.fa.match(/windows phone/i)&&(o.f.platform="winmobile");"other"==o.f.platform&&j.orientation!=p&&(o.f.platform="mobile");o.f.type=function(){for(var a=0;a<A.length;a++){var c=A[a].F,d=A[a].fb;N=A[a].ha||A[a].o;if(c&&b.j(A[a].B,c)!=-1||d)return A[a].o}return"unknown"}();o.f.version=function(){var a="unknown";b.k([z,navigator.appVersion],function(c,d){var e=b.j(N,d);if(e!=-1){a=parseFloat(d.substring(e+N.length+1));return v}});
return a}();o.f.Qa=function(){try{var a;a=navigator.plugins["Shockwave Flash"]?navigator.plugins["Shockwave Flash"].description:(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")||"0 r0";a=a.match(/\d+/g);return parseInt(a[0]||"0."+a[1]||0)}catch(c){return"0 r0"}}();o.f.name=o.f.type;o.f.ba="Unknown";b.k([["win32","Windows"],["mac","Mac"],["linux","Linux"],["iphone","iOS"],["ipad","iOS"],["ipad","iOS"],["android","Android"],["blackberry","Blackberry"],["winmobile","Windows Phone"]],
function(a,c){if(o.f.platform===c[0])o.f.ba=c[1]});"blackberry"==o.f.platform&&!o.f.fa.match(/applewebkit/i)&&(o.f.platform="other");var X=100;m.g.prototype.bind=function(a,c){return this.k(function(){W(this,a,c)})};var O={},V=["onload","onerror","onabort"];b.k(V,function(a,c){O[c]=function(){this.cb(arguments.callee.o==0?1:0);this.r=v};O[c].o=a});y.A=function(a,c){this.options=b.n({},a);this.r=v;this.event=c;this.ia=0;return this};y.A.prototype.cb=function(a){if(this.r){this.r=v;this.status=a;switch(a){case 1:(this.options.onSuccess||
b.U)(p);break;case 0:this.event?this.qb():(this.options.onFailure||b.U)(p);break;case -1:(this.options.onError||b.U)(p)}}};y.A.prototype.qb=function(){if(this.ia<3)this.na();else this.onFailure()};y.A.prototype.Ia=function(a){var c;this.r=q;var d=this,a=k.i.O(b.n(a,{uid:b.now()})),a=b.X()+"//"+this.options.host+this.options.path+this.options.url+"?"+a;c=b.n({},O,c);var e=new Image;b.k(V,function(a,b){e[b]=function(){var a=arguments.callee;a.H.onload=a.H.onerror=a.H.onabort=t;a.Ra.call(a.self,a.H);
a.H=t};e[b].Ra=c[b];e[b].H=e;e[b].self=d});e.src=a};y.A.prototype.send=function(a){this.sb=a;this.na()};y.A.prototype.na=function(){var a;this.ia++;a=b.n({event:this.event,ver:this.ia},this.sb,a);this.Ia(a)};f.m={};f.m.set=function(a,c,b){b=F(b);b[1][a]=c;b[0].set("cp",b[1])};f.m.get=function(a,c){return F(c)[0][a]};f.m.pa=function(a,c){var b=F(c);delete b[1][a];b[0].set("cp",b[1])};f.m.append=function(a,c,b){b=F(b);b[1][a]=b[1][a]?b[1][a]+","+c:c;b[0].set("cp",b[1])};f.m.O=function(a){var a=a||f.d.l(),
c=a.get("sd");b.I(c)||(c=a.get("cd"));c=i.da[c];a={browser:o.f.name+" "+o.f.version,os:o.f.ba,pv:a.get("pv"),url:u(a,"c"),ref_url:u(a,"ru"),locale:u(a,"l"),site:u(i.site.name),section:u(c.section),referrer:u(a,"r"),terms:u(a,"st"),sessionid:u(a,"rid"),replay_id:u(a,"mid"),flash:o.f.Qa};FSR.d.ma.f.ba.match(/android|IOS|blackberry|firefox/i)&&(a.screen=screen.width+"x"+screen.height);if(w.meta.user_agent)a.user_agent=navigator.userAgent;if(w.analytics.google){var d=l.h.ca("__utma"),c=l.h.ca("__utmz");
if(d&&d!=""){d=d.split(".");a.first=d[2];a.last=d[3];a.current=d[4];a.visits=d[5]}if(c&&c!=""){var e=[];b.k(["utmgclid","utmcsr","utmccn","utmcmd","utmctr"],function(a,b){e.push(RegExp(b+"=([^\\|]*)"))});if(d=c.match(e[0])){a.source="Google";a.campaign="Google Adwords";a.medium="cpc"}else{if(d=c.match(e[1]))a.source=d[1];if(d=c.match(e[2]))a.campaign=d[1];if(d=c.match(e[3]))a.medium=d[1]}if(d=c.match(e[4]))a.keyword=d[1]}}c=f.d.l("cp")||{};a=b.n({},c,a||{});return k.i.O(a,"cpp")};j.FSR.CPPS=f.m;j.FSR.CPPS.set=
f.m.set;j.FSR.CPPS.get=f.m.get;j.FSR.CPPS.erase=f.m.pa;j.FSR.CPPS.append=f.m.append;b.qualifier={};var Z=m.g,C;b.w(function(){i.qualifierState={};i.siteid=k.i.D("siteid");i.site=i.sites[i.siteid];i.site.name||(i.site.name=k.i.D("name"));i.site.domain||(i.site.domain=k.i.D("domain"));i.site.domain=="default"&&(i.site.domain=t);b.k(["files","js_files","image_files","html_files","css_files","swf_files"],function(a,b){i.site[b]||i[b]&&(i.site[b]=i[b])});C=i.qualifierState;C.canceled=v});b.e=function(a){b.n(this,
{options:b.n({},a),r:v,N:t});i.controller=this;this.ub()};b.e.loaded=new k.s.u;b.e.Aa=new k.s.u;b.e.jb=new k.s.u;b.e.va=new k.s.u;b.e.prototype.ub=function(){P.qa&&b.k([["loaded",b.e.loaded],["initialized",b.e.Hb],["QualifierCanceled",b.e.Aa],["qualifierShown",b.e.jb],["surveyShown",b.e.va]],function(a,c){b.q(P.qa[c[0]])&&c[1].nb(P.qa[c[0]])})};b.e.prototype.load=function(){if(this.r)return this;this.r=q;var a=this;f.d.Za(function(){a.kb()})};b.e.prototype.kb=function(){b.e.loaded.Y()};b.e.prototype.ib=
function(){this.Ma();this.Xa()};b.e.prototype.Ma=function(){var a=f.d.l(),c=a.get("sd");b.I(c)||(c=a.get("cd"));a=i.da[c];a.idx=c;a.survey=b.J(w.survey,a.survey||{});a.cancel=b.J(w.cancel,a.cancel||{});this.N=a};b.e.prototype.Xa=function(){C.canceled?this.gb():this.hb()};b.e.prototype.hb=function(){b.e.va.Y(this.N,f.d.l());var a=f.v.pb,c=this.N.survey,d=(j.screen.width-c.width)/2,e=(j.screen.height-c.height)/2,h=b.X(),g=a.host,l=a.path,m=new Date-0+"_"+Math.round(Math.random()*1E13),n=k.i.hash(m),
o=f.d.l("c")||"",m=k.i.O({sid:f.d.Ua(this.N,k.i.D("when")),cid:i.id,pattern:o,a:m,b:n,c:b.ja,version:i.version}),n=f.m.O(),a=h+"//"+g+l+a.url+"?"+m+"&"+n;f.d.log("400",f.d.l("c"));this.pop(a,d,e,c.width,c.height)};b.e.prototype.gb=function(){var a=this.N.cancel;this.page(a);a=a.url+"?siteid="+k.i.D("siteid")+"&domain="+k.i.D("domain");f.d.log("500");this.pop(a)};b.e.prototype.pop=function(a,b,d,e,f){var g=arguments.length;setTimeout(function(){if(g>1){j.moveTo(b,d);j.resizeTo(e,f)}j.focus();n.location.href=
a},0)};b.e.prototype.page=function(a){var b=f.d.l("l");if(b)for(var d=a.locales||[],e=0,h=d.length;e<h;e++)if(d[e].locale==b){a.url=d[e].url;break}};b.e.prototype.rb=function(){if(this.r)this.r=v};j.FSR.qualified=function(){i.controller.ib()};j.FSR.qualify=function(a){C.canceled=v;if(a){C.qid=a;f.d.l("q",a)}};j.FSR.cancel=function(){C.canceled=q};j.FSR.reset=function(){l.h.T(f.d.Z("fsr.r"),{path:"/",domain:i.site.domain,secure:i.site.secure});l.h.T(f.d.Z("fsr.s"),{path:"/",domain:i.site.domain,secure:i.site.secure})};
b.w(function(){(new b.e).load();Z(j).bind("unload",function(){i.controller.rb()})});b.e.wa={};var P=b.e.wa})(window,{});})({});
}FSR($$FSR);