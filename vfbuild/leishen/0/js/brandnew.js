(function(n){function e(e){for(var t,i,l=e[0],c=e[1],u=e[2],d=0,f=[];d<l.length;d++)i=l[d],r[i]&&f.push(r[i][0]),r[i]=0;for(t in c)Object.prototype.hasOwnProperty.call(c,t)&&(n[t]=c[t]);s&&s(e);while(f.length)f.shift()();return a.push.apply(a,u||[]),o()}function o(){for(var n,e=0;e<a.length;e++){for(var o=a[e],t=!0,l=1;l<o.length;l++){var c=o[l];0!==r[c]&&(t=!1)}t&&(a.splice(e--,1),n=i(i.s=o[0]))}return n}var t={},r={brandnew:0},a=[];function i(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=n,i.c=t,i.d=function(n,e,o){i.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:o})},i.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},i.t=function(n,e){if(1&e&&(n=i(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var t in n)i.d(o,t,function(e){return n[e]}.bind(null,t));return o},i.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return i.d(e,"a",e),e},i.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},i.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var s=c;a.push([13,"chunk-vendors","chunk-common"]),o()})({13:function(n,e,o){n.exports=o("966a")},"966a":function(n,e,o){"use strict";o.r(e);o("cadf"),o("551c"),o("097d");var t=o("9ab4"),r=(o("76ca"),o("db4d"),o("60a3")),a=o("aaaf"),i=o("1189"),l=o("360e"),c=o("a925"),u=o("b9c5"),s=o("3435"),d=o("9347"),f=o("255e"),p=o("c1e6"),w=o("7d83"),g=o("d939"),b=o("ebb9");r["c"].use(c["a"]);u["a"].getInstace(d["a"].REGION_CODE_1,d["a"].ZH_CN);var h=s["a"].getInstance();h.init();var v=new c["a"](h),y=function(n){function e(){var e=null!==n&&n.apply(this,arguments)||this;return e.webParam=u["a"].getInstace(),e.joinleftfix=0,e.windowsDownloadUrl="",e.macDownloadUrl="",e}return t["c"](e,n),e.prototype.created=function(){this.getDownloadUrl()},e.prototype.mounted=function(){var n=this;window.onscroll=function(){n.pageScroll(930)}},e.prototype.onChangeLanguage=function(n){h.changeLanguage(n),v.locale=h.locale,this.webParam.language=n},e.prototype.pageScroll=function(n){var e=d["a"].scroll().top;this.joinleftfix=e<n?0:1},e.prototype.getDownloadUrl=function(){return t["a"](this,void 0,void 0,function(){var n;return t["d"](this,function(e){switch(e.label){case 0:return[4,f["a"].getInstance().download()];case 1:return n=e.sent(),this.windowsDownloadUrl=n.leigod.windows.download_url,this.macDownloadUrl=n.leigod.mac.download_url,[2]}})})},e.prototype.windowsDownload=function(){var n=new p["a"];n.getBrowser(),window.location.href=this.windowsDownloadUrl},e.prototype.buyNow=function(){""!=w["a"].getUserToken().account_token?g["a"].webGotoUser(b["a"].getUserBaseUrl(),g["a"].HTML_NAME_USER,"page=1"):g["a"].webGotoUser(b["a"].getUserBaseUrl(),g["a"].HTML_NAME_LOGIN)},e=t["b"]([Object(r["a"])({components:{"head-nav":a["a"],"foot-nav":i["a"],"download-box":l["a"]}})],e),e}(r["c"]);new y({i18n:v}).$mount("#app")}});