/*
* Converting css3 gradient to svg and use as background-image
* For convert need property that will store the gradient
* Asanov Ruslan //github.com/AsanovRuslan
*/
function convertGradientToSvg(u){
    /*!
     * CSS2SVG 1.5.4 -- August 14, 2013
     * Original script by Kristiana M. Hansen -- www.kmhcreative.com
     * Updates by Anthony Martinez -- www.linkedin.com/in/canthonymartinez/
     * Licensed Under Creative Commons Attribution-Sharealike 3.0 -- creativecommons.org/licenses/by-sa/3.0/
     * Permission hereby granted to use or modify in any way you see fit, as long as this notice stays intact.
     */
function I(a){var c=/((?:(?:rgb|hsl)a?\(.*?\)\s*\d{0,3}(?:\.\d+)?%?|[^"']|".*?"|'.*?')*?)([(,)]|$)/g;c.lastIndex=0;return function d(){for(var e=[];;){var b="",b=c.exec(a);"("===b[2]?(e.push(b[1].trim()+"("+d().join(",")+")"),b=c.exec(a)):e.push(b[1].trim());if(","!==b[2])return e}}()}function J(a){return!isNaN(a-0)&&null!==a&&""!==a&&!1!==a}function G(a){var c="",w="",d=h.join(),b=h.length,v=20>b?1E3:1E4,g=Math.sqrt(Math.pow(q-s,2)+Math.pow(r-t,2));J(parseFloat(h[0]))||
(h[0]="0%");J(parseFloat(h[V-1]))||(h[V-1]=d.match(/calc|px|cm|mm|in\b|pt|pc/)?g+"px":"100%");for(var n=d=0,D=0;n<M;){if(h[n].match(/\d/)){h[n].match(/calc|cm|mm|in|pt|pc/)&&(h[n]=N(h[n],g));for(var m=h[n].match(/%|px/),f=n,l=0,p=parseFloat(h[f]);l<f;)h[l].match(/\d/)||(h[l]=D+(p-D)/(f-d)*(l-d)+m),l++;d=l;D=parseFloat(h[f])}n++}if(U)return!1;x===y&&(x=y=0);k=" gradientUnits='userSpaceOnUse' x1='"+z+"%' y1='"+x+"%' x2='"+A+"%' y2='"+y+"%'";0<=z&&z<=e&&0<=x&&x<=e&&0<=A&&A<=e&&0<=y&&y<=e&&!S&&(k=k.replace(" gradientUnits='userSpaceOnUse'",
""));k.match(/gradientUnits/)||(k=k.replace(/x1='[^']+/,"x1='"+z/e).replace(/y1='[^']+/,"y1='"+x/e).replace(/x2='[^']+/,"x2='"+A/e).replace(/y2='[^']+/,"y2='"+y/e));a=H?0:a;k="<linearGradient id='g"+(a+1)+"'"+k+">\n";for(a=0;a<b;a++)d=h[a],n=parseFloat(d),d=d.match(/px/)?n/g:n/e,d=Math.round(d*v)/v,n=K(B[a]),D=B[a],D=D.match(W)?D.match(/(?:\d*(?:\.\d+)?%?,){3}0?(\.\d+)?\)/)?D.match(/(0?(\.\d+)?)\)/)[1].replace("0.","."):D.match(/transparent/)?"0":"1":"",c+="<stop offset='"+d+"' stop-color='"+n+"'",
B[a].match(W)&&(c+=" stop-opacity='"+D+"'"),c+="></stop>\n",w+="<stop offset='"+d+"'",w+=" stop-color='"+n+"'",B[a].match(W)&&(w+=" stop-opacity='"+D+"'"),w+="></stop>\n";if(X){g=c.match(/t='(\d?\.?\d+)'/g);d=[];for(b=a=g.length;b--;)g[b]=g[b].replace(/t='|'/g,"");n=parseFloat(g[a-1]);b=n-parseFloat(g[0]);for(n=1/n;a--;)d[a]=Math.round(parseFloat(g[a])*n*v)/v,d[0]=0,c=c.replace(g[a],d[a]),H&&(w=w.replace(g[a],d[a]));v=[z,x,A,y];for(g=4;g--;)v[g]=Math.round(v[g]*b*e)/e+"%";k=k.replace(/x1='[^']+/,
"x1='"+v[0]).replace(/y1='[^']+/,"y1='"+v[1]).replace(/x2='[^']+/,"x2='"+v[2]).replace(/y2='[^']+/,"y2='"+v[3]).replace("ent ","ent spreadMethod='repeat' ")}k=k.replace(/ x1='0%?'| x2='(100%|1)'| y1='0%?'| y2='0%?'/g,"").replace("'0%","'0");H?F=C=k:(C+=k,F+=k);C+=c;F+=w;c=/offset='0' | stop-opacity='1'/g;w=/'0\./g;C=C.replace(c,"").replace(w,"'.")+"</linearGradient>\n";return F=F.replace(c,"").replace(w,"'.")+"</linearGradient>\n"}function N(a,c,b,d,f,h,g){f=1;g="";a.match(/calc/)?(b=a.replace(/^calc\(|\)$/g,
"").replace(/(\*|\/)/g," $1 ").split(" "),f=b.length):d=parseFloat(a);for(h=0;h<f;h++)1<f&&(a=b[h],d=parseFloat(b[h])),a.match(/cm/)?d*=37.79527559:a.match(/mm/)?d*=3.779527559:a.match(/in/)?d*=96:a.match(/pt/)?d*=1.33333333:a.match(/pc/)?d*=16:a.match(/%/)?d=d/100*c:a.match(/px/)||(d=a),1<f&&(g+=d);return g?eval(g)+"px":d*e/e+"px"}function K(a){var c,b,d=/(\d+(\.\d+)?)|\.\d+/g;b=/[a-z]{8,}|black|white|yellow|fuchsia|magenta/i;if(a.match(/transparent/))return"#000";if(a.match(/rgba?|hsla?/)||a.match(b)){if(a.match(/rgba?/)){if(a.match(/%/))for(c=
a.match(d),b=c.length;b--;)c[b]=c[b]/e*255;c=c?c:a.match(/\d{1,3}/g);for(a=c.length;a--;)c[a]=255<c[a]?255:c[a]}else if(a.match(b)&&window.getComputedStyle){d=O.createElement("div");d.style.color=a.match(b)[0];O.body.appendChild(d);c=getComputedStyle(d,null).color;if(!c.match(/rgb/))return a;c=c.replace(/[^\d,]/g,"").split(",");O.body.removeChild(d)}else if(a.match(/hsla?/))a=a.match(d),c=T(a[0]%360/360,Math.min(a[1]/e,1),Math.min(a[2]/e,1));else return a;P=(16777216+((c[0]|0)<<16)+((c[1]|0)<<8)+
(c[2]|0)).toString(16).slice(1);a=/(\w)\1(\w)\2(\w)\3/i;P=P.match(a)?P.replace(a,"$1$2$3"):P;return"#"+P}return a}function T(a,c,b){function d(a,c,b){0>b&&(b+=1);1<b&&(b-=1);return b<1/6?a+6*(c-a)*b:.5>b?c:b<2/3?a+(c-a)*(2/3-b)*6:a}if(0===c)b=c=a=b;else{var e=.5>b?b*(1+c):b+c-b*c,f=2*b-e;b=d(f,e,a+1/3);c=d(f,e,a);a=d(f,e,a-1/3)}return[255*b,255*c,255*a]}function Q(a,b,e){a="";for(var d="<svg xmlns='http://www.w3.org/2000/svg' width='"+l+Y+"' height='"+p+Y+"'>\n";e--;)a+="<rect width='100%' height='100%' fill='url(#g"+
(e+1)+")'></rect>\n";b=d+b+a+"</svg>";b=b.replace(/\n|<\/?defs>/g,"").replace(/svg' width='.*?' height='.*?'/,"svg'");Z=ba='url("data:image/svg+xml,'+encodeURI(b).replace(/%20/g," ").replace(/#/g,"%23")+'")';H&&(R+=ba+",\n")}if(!u)return!1;var O=document;window.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var k,C,F,p,l,Z="",ba,R,X,z,x,A,y,q,r,s,t,e=100,b,E,m,V,L,B=[],h,M,Y,f,S,U,H,$,P,W=/rgba|hsla|transparent/,aa=/background-size:[^;}]+/i;S=$=k=C=H=R="";p=l=100;Y=
"%";(function(a){R=b=U=F="";if(a.match(/radial/)||a.match(/\d(r?em|ex|ch|vh|vm|vmin|vmax)/)||a.match(/#([\da-f]{4,5}|[\da-f]{1,2})\W/))return!1;a.match(aa)&&(H="yes",a.match(aa),a=a.replace(aa,""));m=I(a);f=m.length;for(H&&m.reverse();f--;){X="";h=[];m[f].match(/repeating/)&&(X="yes");if(m[f].match(/\-?\d{0,3}(\.\d+)?(deg|g?rad\b|turn)/))b=m[f].match(/\-?\d{0,3}(?:\.\d+)?(?:deg|g?rad|turn)/gi),b[1].match(/g?rad|turn/)&&(a=parseFloat(b[1]),b[1].match(/grad/)?b[1]=a/1.1111111:b[1].match(/rad/)?b[1]=
a/.0174532925199:b[1]=360*a),b=parseFloat(b[1]),m[f].match(/-(moz|webkit|o|ms)-/)||(b=90-b);else if(m[f].match(/-webkit-gradient/)){a=/left|right|\btop\b|bottom|center/g;E=4;if(m[f].match(a))for(b=m[f].match(a);E--;)b[E]=b[E].replace(/left|top/g,0).replace(/right|bottom/g,100).replace(/center/g,50);else for(b=m[f].match(/(\-?\d+\.?\d*%?)/g),b=b.slice(0,4);E--;)b[E].match(/%/)||(b[E]=b[E]/(1===E%2?p:l)*e),b[E]=parseFloat(b[E]);z=Math.round(b[0]*e)/e;x=Math.round(b[1]*e)/e;A=Math.round(b[2]*e)/e;y=
Math.round(b[3]*e)/e;S="yes";$=m[f].match(/from\(.*?\),\s*to\(.*?\),\s*color-stop/)?"yes":""}else m[f].match(/(to )?(top|left|right|bottom)/)?(b=m[f].match(/(to )?(top|left|right|bottom)\s?(top|left|right|bottom)?/gi),b[0].match(/(right|left)/)&&(b[0]=b[0].replace(/(right|left)\s(top|bottom)/g,"$2$1")),b=b[0].replace(/\s/g,"")):m[f].match("center")||(b="tobottom");m[f]=m[f].replace(/.*?{|color-stop|repeating|linear|radial|gradient|-(moz|webkit|o|ms)-|background(-image)?\:|deg|g?rad|turn|to\s|\btop\b|right|left|bottom|center|-(?!\s+\d)|^\(,|\)$| \b/gm,
"").replace(/(\)|#(?:[\da-f]{3}){1,2}(?!(?:%|px|cm|mm|in\b|pt|pc))|(?:from|to|[^blac])\(|(?:,|\()[a-z]+)(calc\([^)]+\)|\d{0,3}\.?\d*(%|px|cm|mm|in\b|pt|pc)|0?\.\d+)/ig,"$1'$2'");m[f]=m[f].replace(/[^0](\.\d+)/g,"0$1");B=m[f].match(/(?:from\(|to\()?('.*?',)?(#([\da-f]{3}){1,2}(?!%|px|cm|mm|in\b|pt|pc)|(rgb|hsl)a?\((\d{0,3}(\.\d+)?%?,?){3}[0-1]?\.?\d*\)|[a-z]{5,}|[a-eg-z]{3,})('.*?')?/gi);for(V=L=B.length;L--;)if(h[L]=B[L].replace(/.*?'|[^']*/,"'").replace(/'(.*?)'.*?,/,"$1").replace(/'/g,""),B[L]=
B[L].replace(/(from|to)\(|'.*?',?/g,""),a=O.createElement("div"),a.style.cssText="color:rgba(0,0,0,0)",a.style.color&&(a.style.cssText="color:"+B[L],!a.style.color))return!1;M=h.length;if(S){for(;M--;)h[M].match(/%/)||(h[M]=parseFloat(h[M])*e+"%");$&&(a=B.splice(1,1),B.push(a.toString()),h.splice(1,1),h.push("100%"))}if(S)G(f);else a:{var c=b;a=f;if(J(c)){var k=l/2,d=p/2,u=void 0,v=u=0,g=(c%360+360)%360,c=Math.tan((360-g)*Math.PI/180),n=d-c*k;q=r=s=t=null;0===g?(q=l,r=t=d,s="0"):90>g||270<g?u=l:90===
g?(q=s=k,r="0",t=p):180===g?(q="0",r=t=d,s=l):270===g&&(q=s=k,r=p,t="0");180<g&&(v=p);u=v+u/c;q=q?q:c*(u-n)/(Math.pow(c,2)+1);r=r?r:c*q+n;s=s?s:l-q;t=t?t:p-r;z=Math.round(s/l*1E4)/e;x=Math.round(t/p*1E4)/e;A=Math.round(q/l*1E4)/e;y=Math.round(r/p*1E4)/e}else if(z=x=y=q=r=s=t=0,A=e,"toright"===c||"left"===c)s=l;else if("totopright"===c||"bottomleft"===c)x=e,r=p,s=l;else if("totop"===c||"bottom"===c)z=x=e,q=s=l,r=p;else if("totopleft"===c||"bottomright"===c)z=x=e,A=0,q=l,r=p;else if("toleft"===c||"right"===
c)z=x=y=e,A=0,q=t=l,r=p;else if("tobottomleft"===c||"topright"===c)z=y=e,A=0,q=l,t=p;else if("tobottom"===c||"top"===c)A=0,y=e,t=p;else if("tobottomright"===c||"topleft"===c)y=e,s=l,t=p;else break a;G(a)}if(U)return!1;H&&Q(C,F,1)}H||U?(Z=R=R.replace(/,\n$|,$/g,""),out.readOnly=1):Q(C,F,m.length)})(u);return Z}
function loopStylesheet(u,I){for(var J=u.cssRules,G,N,K,T="",Q=0,O=J.length;Q!==O;Q++)if(G=J[Q],!G.media&&G.style&&G.style[I]){T=K="";N=G.style[I].split("linear-gradient");for(var k=0,C=N.length;k!==C;k++)1<N[k].length&&(""!=K&&(T=","),K+=T+convertGradientToSvg("linear-gradient"+N[k].trim().replace(/,$/,"")));G.style.backgroundImage=K}}function modifyCss(u){u=document.styleSheets;for(var I=0,J=u.length;I!==J;I++)loopStylesheet(u[I],"-pie-background")}
document.addEventListener("DOMContentLoaded",modifyCss,!1);