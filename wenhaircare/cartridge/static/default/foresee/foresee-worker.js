if (typeof(FSR) == "undefined") {
(function(config){var q=!0,P=null;
(function(ra){function Fa(){8<u?ea(z):0<u&&fa(z);u=z=0}function Ga(a,e){var b=0;do b|=a&1,a>>=1,b<<=1;while(0<--e);return b>>1}function t(a,e){u>16-e?(z|=a<<u,ea(z),z=a>>16-u,u+=e-16):(z|=a<<u,u+=e)}function Ha(a,e){var b,d=0,c=0,f=0,ga=0,g,k;if(0!=G){do{0==(d&7)&&(ga=ha[f++]);b=sa[d++]&255;if(0==(ga&1))H(b,a);else if(g=Z[b],H(g+256+1,a),k=ta[g],0!=k&&(b-=ua[g],t(b,k)),b=va[c++],g=(256>b?Q[b]:Q[256+(b>>7)])&255,H(g,e),k=$[g],0!=k)b-=ia[g],t(b,k);ga>>=1}while(d<G)}H(256,a)}function aa(a,e){sa[G++]=
e;0==a?A[e].a++:(a--,A[Z[e]+256+1].a++,I[(256>a?Q[a]:Q[256+(a>>7)])&255].a++,va[ja++]=a,V|=ba);ba<<=1;0==(G&7)&&(ha[wa++]=V,V=0,ba=1);if(2<R&&0==(G&4095)){var b=8*G,d=g-B,c;for(c=0;30>c;c++)b+=I[c].a*(5+$[c]);if(ja<parseInt(G/2)&&b>>3<parseInt(d/2))return q}return 8191==G||8192==ja}function ka(a){var e,b,d,c;c=g-B;ha[wa]=V;xa(w);xa(x);Ia(A,w.c);Ia(I,x.c);xa(J);for(d=18;3<=d&&0==o[Ja[d]].b;d--);K+=3*(d+1)+14;e=K+3+7>>3;b=W+3+7>>3;b<=e&&(e=b);if(c+4<=e&&0<=B){t(0+a,3);Fa();ea(c);ea(~c);for(d=0;d<c;d++)fa(f[B+
d])}else if(b==e)t(2+a,3),Ha(L,S);else{t(4+a,3);c=w.c+1;e=x.c+1;d+=1;t(c-257,5);t(e-1,5);t(d-4,4);for(b=0;b<d;b++)t(o[Ja[b]].b,3);Ka(A,c-1);Ka(I,e-1);Ha(A,I)}La();0!=a&&Fa()}function Ka(a,e){var b,d=-1,c,g=a[0].b,f=0,m=7,k=4;0==g&&(m=138,k=3);for(b=0;b<=e;b++)if(c=g,g=a[b+1].b,!(++f<m&&c==g)){if(f<k){do H(c,o);while(0!=--f)}else 0!=c?(c!=d&&(H(c,o),f--),H(16,o),t(f-3,2)):10>=f?(H(17,o),t(f-3,3)):(H(18,o),t(f-11,7));f=0;d=c;0==g?(m=138,k=3):c==g?(m=6,k=3):(m=7,k=4)}}function Ia(a,e){var b,d=-1,c,g=
a[0].b,f=0,m=7,k=4;0==g&&(m=138,k=3);a[e+1].b=65535;for(b=0;b<=e;b++)if(c=g,g=a[b+1].b,!(++f<m&&c==g))(f<k?o[c].a+=f:0!=c?(c!=d&&o[c].a++,o[16].a++):10>=f?o[17].a++:o[18].a++,f=0,d=c,0==g)?(m=138,k=3):c==g?(m=6,k=3):(m=7,k=4)}function xa(a){var e=a.g,b=a.h,d=a.k,c,g=-1,f=d;M=0;X=573;for(c=0;c<d;c++)0!=e[c].a?(j[++M]=g=c,C[c]=0):e[c].b=0;for(;2>M;)c=j[++M]=2>g?++g:0,e[c].a=1,C[c]=0,K--,b!=P&&(W-=b[c].b);a.c=g;for(c=M>>1;1<=c;c--)ya(e,c);do c=j[1],j[1]=j[M--],ya(e,1),b=j[1],j[--X]=c,j[--X]=b,e[f].a=
e[c].a+e[b].a,C[f]=C[c]>C[b]+1?C[c]:C[b]+1,e[c].b=e[b].b=f,j[1]=f++,ya(e,1);while(2<=M);j[--X]=j[1];f=a.g;c=a.n;var d=a.l,b=a.c,m=a.o,k=a.h,y,l,la,i,h=0;for(l=0;15>=l;l++)r[l]=0;f[j[X]].b=0;for(a=X+1;573>a;a++)if(y=j[a],l=f[f[y].b].b+1,l>m&&(l=m,h++),f[y].b=l,!(y>b))r[l]++,la=0,y>=d&&(la=c[y-d]),i=f[y].a,K+=i*(l+la),k!=P&&(W+=i*(k[y].b+la));if(0!=h){do{for(l=m-1;0==r[l];)l--;r[l]--;r[l+1]+=2;r[m]--;h-=2}while(0<h);for(l=m;0!=l;l--)for(y=r[l];0!=y;)c=j[--a],c>b||(f[c].b!=l&&(K+=(l-f[c].b)*f[c].a,f[c].a=
l),y--)}Ma(e,g)}function Ma(a,e){var b=Array(16),d=0,c;for(c=1;15>=c;c++)d=d+r[c-1]<<1,b[c]=d;for(d=0;d<=e;d++)c=a[d].b,0!=c&&(a[d].a=Ga(b[c]++,c))}function ya(a,e){for(var b=j[e],d=e<<1;d<=M;){d<M&&Na(a,j[d+1],j[d])&&d++;if(Na(a,b,j[d]))break;j[e]=j[d];e=d;d<<=1}j[e]=b}function La(){var a;for(a=0;286>a;a++)A[a].a=0;for(a=0;30>a;a++)I[a].a=0;for(a=0;19>a;a++)o[a].a=0;A[256].a=1;V=G=ja=wa=K=W=0;ba=1}function Oa(a,e,b){var d,c,f;for(d=0;n!=P&&d<b;){c=b-d;c>n.f&&(c=n.f);for(f=0;f<c;f++)a[e+d+f]=n.r[n.p+
f];n.p+=c;n.f-=c;d+=c;0==n.f&&(c=n,n=n.next,c.next=T,T=c)}if(d==b)return d;if(p<s){c=b-d;c>s-p&&(c=s-p);for(f=0;f<c;f++)a[e+d+f]=U[p+f];p+=c;d+=c;s==p&&(s=p=0)}return d}function Va(a,e){var b;if(!za){if(!N){u=z=0;var d,c;if(0==S[0].b){w.g=A;w.h=L;w.n=ta;w.l=257;w.k=286;w.o=15;w.c=0;x.g=I;x.h=S;x.n=$;x.l=0;x.k=30;x.o=15;x.c=0;J.g=o;J.h=P;J.n=Wa;J.l=0;J.k=19;J.o=7;for(c=d=J.c=0;28>c;c++){ua[c]=d;for(b=0;b<1<<ta[c];b++)Z[d++]=c}Z[d-1]=c;for(c=d=0;16>c;c++){ia[c]=d;for(b=0;b<1<<$[c];b++)Q[d++]=c}for(d>>=
7;30>c;c++){ia[c]=d<<7;for(b=0;b<1<<$[c]-7;b++)Q[256+d++]=c}for(b=0;15>=b;b++)r[b]=0;for(b=0;143>=b;)L[b++].b=8,r[8]++;for(;255>=b;)L[b++].b=9,r[9]++;for(;279>=b;)L[b++].b=7,r[7]++;for(;287>=b;)L[b++].b=8,r[8]++;Ma(L,287);for(b=0;30>b;b++)S[b].b=5,S[b].a=Ga(b,5);La()}for(b=0;8192>b;b++)D[32768+b]=0;Aa=Ba[R].A;Pa=Ba[R].w;Qa=Ba[R].z;B=g=0;i=Ra(f,0,65536);if(0>=i)N=q,i=0;else{for(N=!1;262>i&&!N;)Ca();for(b=E=0;2>b;b++)E=(E<<5^f[b]&255)&8191}n=P;p=s=0;3>=R?(v=2,h=0):(h=2,ca=0);ma=!1}za=q;if(0==i)return ma=
q,0}if((b=Oa(a,0,e))==e)return e;if(ma)return b;if(3>=R)for(;0!=i&&n==P;){na();0!=O&&32506>=g-O&&(h=Sa(O),h>i&&(h=i));if(3<=h)if(c=aa(g-Y,h-3),i-=h,h<=Aa){h--;do g++,na();while(0!=--h);g++}else g+=h,h=0,E=f[g]&255,E=(E<<5^f[g+1]&255)&8191;else c=aa(0,f[g]&255),i--,g++;c&&(ka(0),B=g);for(;262>i&&!N;)Ca()}else for(;0!=i&&n==P;){na();v=h;Ta=Y;h=2;0!=O&&(v<Aa&&32506>=g-O)&&(h=Sa(O),h>i&&(h=i),3==h&&4096<g-Y&&h--);if(3<=v&&h<=v){c=aa(g-1-Ta,v-3);i-=v-1;v-=2;do g++,na();while(0!=--v);ca=0;h=2;g++;c&&(ka(0),
B=g)}else 0!=ca?aa(0,f[g-1]&255)&&(ka(0),B=g):ca=1,g++,i--;for(;262>i&&!N;)Ca()}0==i&&(0!=ca&&aa(0,f[g-1]&255),ka(1),ma=q);return b+Oa(a,b+0,e-b)}function Ca(){var a,e,b=65536-i-g;if(-1==b)b--;else if(65274<=g){for(a=0;32768>a;a++)f[a]=f[a+32768];Y-=32768;g-=32768;B-=32768;for(a=0;8192>a;a++)e=D[32768+a],D[32768+a]=32768<=e?e-32768:0;for(a=0;32768>a;a++)e=D[a],D[a]=32768<=e?e-32768:0;b+=32768}N||(a=Ra(f,g+i,b),0>=a?N=q:i+=a)}function Sa(a){var e=Qa,b=g,d,c=v,i=32506<g?g-32506:0,h=g+258,m=f[b+c-1],
k=f[b+c];v>=Pa&&(e>>=2);do if(d=a,!(f[d+c]!=k||f[d+c-1]!=m||f[d]!=f[b]||f[++d]!=f[b+1])){b+=2;d++;do;while(f[++b]==f[++d]&&f[++b]==f[++d]&&f[++b]==f[++d]&&f[++b]==f[++d]&&f[++b]==f[++d]&&f[++b]==f[++d]&&f[++b]==f[++d]&&f[++b]==f[++d]&&b<h);d=258-(h-b);b=h-258;if(d>c){Y=a;c=d;if(258<=d)break;m=f[b+c-1];k=f[b+c]}}while((a=D[a&32767])>i&&0!=--e);return c}function Ra(a,e,b){var d;for(d=0;d<b&&Da<oa.length;d++)a[e+d]=oa.charCodeAt(Da++)&255;return d}function Na(a,e,b){return a[e].a<a[b].a||a[e].a==a[b].a&&
C[e]<=C[b]}function H(a,e){t(e[a].a,e[a].b)}function na(){E=(E<<5^f[g+3-1]&255)&8191;O=D[32768+E];D[g&32767]=O;D[32768+E]=g}function ea(a){a&=65535;8190>p+s?(U[p+s++]=a&255,U[p+s++]=a>>>8):(fa(a&255),fa(a>>>8))}function fa(a){U[p+s++]=a;if(8192==p+s&&0!=s){var e;T!=P?(a=T,T=T.next):a=new Xa;a.next=P;a.f=a.p=0;n==P?n=pa=a:pa=pa.next=a;a.f=s-p;for(e=0;e<a.f;e++)a.r[e]=U[p+e];s=p=0}}function Xa(){this.next=P;this.f=0;this.r=Array(8192);this.p=0}function F(a,e,b){this.w=a;this.A=e;this.z=b}function Ea(){this.n=
this.h=this.g=P;this.c=this.o=this.k=this.l=0}function da(){this.b=this.a=0}_4c={j:{}};var T,n,pa,za,U=P,s,p,ma,f,va,sa,D,z,u,B,E,O,Ta,ca,h,v,g,Y,N,i,Qa,Aa,R,Pa,A,I,L,S,o,w,x,J,r,j,M,X,C,Z,Q,ua,ia,ha,G,ja,wa,V,ba,K,W,oa,Da,ta=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],$=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],Wa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],Ja=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Ba=[new F(0,0,0),new F(4,4,4),new F(4,5,8),new F(4,
6,32),new F(4,4,16),new F(8,16,32),new F(8,16,128),new F(8,32,256),new F(32,128,1024),new F(32,258,4096)];_4c.j.t={};var Ua=_4c.j.t;Ua.v=function(a){var e;oa=a;Da=0;"undefined"==typeof e&&(e=6);(a=e)?1>a?a=1:9<a&&(a=9):a=6;R=a;N=za=!1;if(U==P){T=n=pa=P;U=Array(8192);f=Array(65536);va=Array(8192);sa=Array(32832);D=Array(65536);A=Array(573);for(a=0;573>a;a++)A[a]=new da;I=Array(61);for(a=0;61>a;a++)I[a]=new da;L=Array(288);for(a=0;288>a;a++)L[a]=new da;S=Array(30);for(a=0;30>a;a++)S[a]=new da;o=Array(39);
for(a=0;39>a;a++)o[a]=new da;w=new Ea;x=new Ea;J=new Ea;r=Array(16);j=Array(573);C=Array(573);Z=Array(256);Q=Array(512);ua=Array(29);ia=Array(30);ha=Array(1024)}for(var b=Array(1024),d=[];0<(a=Va(b,b.length));){var c=Array(a);for(e=0;e<a;e++)c[e]=String.fromCharCode(b[e]);d[d.length]=c.join("")}oa=P;return d.join("")};_4c.j.s={};var qa=_4c.j.s;qa.B=1E5;qa.send=function(a,e){var b={e:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",F:function(a){for(var c="",d,e,f,g,h,i,j=0,a=b.q(a);j<
a.length;)d=a.charCodeAt(j++),e=a.charCodeAt(j++),f=a.charCodeAt(j++),g=d>>2,d=(d&3)<<4|e>>4,h=(e&15)<<2|f>>6,i=f&63,isNaN(e)?h=i=64:isNaN(f)&&(i=64),c=c+this.e.charAt(g)+this.e.charAt(d)+this.e.charAt(h)+this.e.charAt(i);return c},D:function(a){for(var c="",d,e,f,g,h,i=0,a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");i<a.length;)d=this.e.indexOf(a.charAt(i++)),e=this.e.indexOf(a.charAt(i++)),g=this.e.indexOf(a.charAt(i++)),h=this.e.indexOf(a.charAt(i++)),d=d<<2|e>>4,e=(e&15)<<4|g>>2,f=(g&3)<<6|h,c+=String.fromCharCode(d),
64!=g&&(c+=String.fromCharCode(e)),64!=h&&(c+=String.fromCharCode(f));return c=b.u(c)},q:function(a){for(var a=a.replace(/\r\n/g,"\n"),b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):(127<d&&2048>d?b+=String.fromCharCode(d>>6|192):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128)),b+=String.fromCharCode(d&63|128))}return b},u:function(a){for(var b="",c=0,d=c1=c2=0;c<a.length;)d=a.charCodeAt(c),128>d?(b+=String.fromCharCode(d),c++):191<d&&224>d?(c2=
a.charCodeAt(c+1),b+=String.fromCharCode((d&31)<<6|c2&63),c+=2):(c2=a.charCodeAt(c+1),c3=a.charCodeAt(c+2),b+=String.fromCharCode((d&15)<<12|(c2&63)<<6|c3&63),c+=3);return b}};if(!d)var d=function(a){function b(a,c){var d=a.charCodeAt(c);if(255<d)throw base64.G();return d}if(1!==arguments.length)throw new SyntaxError("Not enough arguments");var c,d,e=[],a=""+a,f=a.length-a.length%3;if(0===a.length)return a;for(c=0;c<f;c+=3)d=b(a,c)<<16|b(a,c+1)<<8|b(a,c+2),e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>
18)),e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>12&63)),e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>6&63)),e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d&63));switch(a.length-f){case 1:d=b(a,c)<<16;e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>18)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>12&63)+"==");break;case 2:d=
b(a,c)<<16|b(a,c+1)<<8,e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>18)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>12&63)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>6&63)+"=")}return e.join("")};a.method||(a.method="POST");a.url||(a.url="www.foresee.com");a.data||(a.data={});a.contentType||(a.contentType="application/x-www-form-urlencoded");a.C=function(a){return function(b,c){var d={};d.i=a;
d.status=b;d.rt=c;ra.postMessage(d)}}(e);var c="";if(1E3<a.data.length)for(var f=qa.B,g=parseInt(a.data.length/f)+1,h=0;h<g;h++)c+="_CMP_"+d(Ua.v(b.q(a.data.substring(h*f,(h+1)*f))));else c=a.data;d=new XMLHttpRequest;d.open(a.method,a.url,q);d.setRequestHeader("Accept","*/*");d.setRequestHeader("Content-Type",a.contentType);d.onreadystatechange=function(a,b){return function(){4==b.readyState&&a.C(b.status,b.responseText)}}(a,d,this);d.send(c)};ra.addEventListener("message",function(a){var e=a.data;
switch(e.m){case "CORS":qa.send(e.d,e.d.i);break;default:ra.postMessage(a.data)}})})(self,{});})({});
}