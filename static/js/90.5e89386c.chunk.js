/*! For license information please see 90.5e89386c.chunk.js.LICENSE.txt */
(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[90],{462:function(t,e,r){"use strict";r.r(e),r.d(e,"scopeCss",(function(){return C}));var n=r(5),s=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)",o=new RegExp("(-shadowcsshost"+s,"gim"),c=new RegExp("(-shadowcsscontext"+s,"gim"),a=new RegExp("(-shadowcssslotted"+s,"gim"),i=/-shadowcsshost-no-combinator([^\s]*)/,u=[/::shadow/g,/::content/g],l=/-shadowcsshost/gim,h=/:host/gim,p=/::slotted/gim,f=/:host-context/gim,d=/\/\*\s*[\s\S]*?\*\//g,g=/\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g,m=/(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g,v=/([{}])/g,w=function(t,e){var r=x(t),n=0;return r.escapedString.replace(m,(function(){for(var t=[],s=0;s<arguments.length;s++)t[s]=arguments[s];var o=t[2],c="",a=t[4],i="";a&&a.startsWith("{%BLOCK%")&&(c=r.blocks[n++],a=a.substring("%BLOCK%".length+1),i="{");var u={selector:o,content:c},l=e(u);return""+t[1]+l.selector+t[3]+i+l.content+a}))},x=function(t){for(var e=t.split(v),r=[],n=[],s=0,o=[],c=0;c<e.length;c++){var a=e[c];"}"===a&&s--,s>0?o.push(a):(o.length>0&&(n.push(o.join("")),r.push("%BLOCK%"),o=[]),r.push(a)),"{"===a&&s++}return o.length>0&&(n.push(o.join("")),r.push("%BLOCK%")),{escapedString:r.join(""),blocks:n}},b=function(t,e,r){return t.replace(e,(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(t[2]){for(var n=t[2].split(","),s=[],o=0;o<n.length;o++){var c=n[o].trim();if(!c)break;s.push(r("-shadowcsshost-no-combinator",c,t[3]))}return s.join(",")}return"-shadowcsshost-no-combinator"+t[3]}))},_=function(t,e,r){return t+e.replace("-shadowcsshost","")+r},O=function(t,e,r){return e.indexOf("-shadowcsshost")>-1?_(t,e,r):t+e+r+", "+e+" "+t+r},S=function(t,e){return!function(t){return t=t.replace(/\[/g,"\\[").replace(/\]/g,"\\]"),new RegExp("^("+t+")([>\\s~+[.,{:][\\s\\S]*)?$","m")}(e).test(t)},W=function(t,e,r){for(var n,s="."+(e=e.replace(/\[is=([^\]]*)\]/g,(function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return e[0]}))),o=function(t){var n=t.trim();if(!n)return"";if(t.indexOf("-shadowcsshost-no-combinator")>-1)n=function(t,e,r){if(l.lastIndex=0,l.test(t)){var n="."+r;return t.replace(i,(function(t,e){return e.replace(/([^:]*)(:*)(.*)/,(function(t,e,r,s){return e+n+r+s}))})).replace(l,n+" ")}return e+" "+t}(t,e,r);else{var o=t.replace(l,"");if(o.length>0){var c=o.match(/([^:]*)(:*)(.*)/);c&&(n=c[1]+s+c[2]+c[3])}}return n},c=function(t){var e=[],r=0;return{content:(t=t.replace(/(\[[^\]]*\])/g,(function(t,n){var s="__ph-"+r+"__";return e.push(n),r++,s}))).replace(/(:nth-[-\w]+)(\([^)]+\))/g,(function(t,n,s){var o="__ph-"+r+"__";return e.push(s),r++,n+o})),placeholders:e}}(t),a="",u=0,h=/( |>|\+|~(?!=))\s*/g,p=!((t=c.content).indexOf("-shadowcsshost-no-combinator")>-1);null!==(n=h.exec(t));){var f=n[1],d=t.slice(u,n.index).trim();a+=((p=p||d.indexOf("-shadowcsshost-no-combinator")>-1)?o(d):d)+" "+f+" ",u=h.lastIndex}var g,m=t.substring(u);return a+=(p=p||m.indexOf("-shadowcsshost-no-combinator")>-1)?o(m):m,g=c.placeholders,a.replace(/__ph-(\d+)__/g,(function(t,e){return g[+e]}))},j=function t(e,r,n,s,o){return w(e,(function(e){var o=e.selector,c=e.content;return"@"!==e.selector[0]?o=function(t,e,r,n){return t.split(",").map((function(t){return n&&t.indexOf("."+n)>-1?t.trim():S(t,e)?W(t,e,r).trim():t.trim()})).join(", ")}(e.selector,r,n,s):(e.selector.startsWith("@media")||e.selector.startsWith("@supports")||e.selector.startsWith("@page")||e.selector.startsWith("@document"))&&(c=t(e.content,r,n,s)),{selector:o.replace(/\s{2,}/g," ").trim(),content:c}}))},k=function(t,e,r,n,s){var i=function(t,e){var r="."+e+" > ",n=[];return t=t.replace(a,(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(t[2]){for(var s=t[2].trim(),o=t[3],c=r+s+o,a="",i=t[4]-1;i>=0;i--){var u=t[5][i];if("}"===u||","===u)break;a=u+a}var l=a+c,h=""+a.trimRight()+c.trim();if(l.trim()!==h.trim()){var p=h+", "+l;n.push({orgSelector:l,updatedSelector:p})}return c}return"-shadowcsshost-no-combinator"+t[3]})),{selectors:n,cssText:t}}(t=function(t){return b(t,c,O)}(t=function(t){return b(t,o,_)}(t=t.replace(f,"-shadowcsscontext").replace(h,"-shadowcsshost").replace(p,"-shadowcssslotted"))),n);return t=function(t){return u.reduce((function(t,e){return t.replace(e," ")}),t)}(t=i.cssText),e&&(t=j(t,e,r,n)),{cssText:(t=(t=t.replace(/-shadowcsshost-no-combinator/g,"."+r)).replace(/>\s*\*\s+([^{, ]+)/gm," $1 ")).trim(),slottedSelectors:i.selectors}},C=function(t,e,r){var s=e+"-h",o=e+"-s",c=t.match(g)||[];t=function(t){return t.replace(d,"")}(t);var a=[];if(r){var i=function(t){var e="/*!@___"+a.length+"___*/",r="/*!@"+t.selector+"*/";return a.push({placeholder:e,comment:r}),t.selector=e+t.selector,t};t=w(t,(function(t){return"@"!==t.selector[0]?i(t):t.selector.startsWith("@media")||t.selector.startsWith("@supports")||t.selector.startsWith("@page")||t.selector.startsWith("@document")?(t.content=w(t.content,i),t):t}))}var u=k(t,e,s,o);return t=Object(n.e)([u.cssText],c).join("\n"),r&&a.forEach((function(e){var r=e.placeholder,n=e.comment;t=t.replace(r,n)})),u.slottedSelectors.forEach((function(e){t=t.replace(e.orgSelector,e.updatedSelector)})),t}}}]);
//# sourceMappingURL=90.5e89386c.chunk.js.map