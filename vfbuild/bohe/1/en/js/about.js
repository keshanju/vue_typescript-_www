(function(n){function e(e){for(var t,c,i=e[0],u=e[1],l=e[2],p=0,d=[];p<i.length;p++)c=i[p],r[c]&&d.push(r[c][0]),r[c]=0;for(t in u)Object.prototype.hasOwnProperty.call(u,t)&&(n[t]=u[t]);f&&f(e);while(d.length)d.shift()();return a.push.apply(a,l||[]),o()}function o(){for(var n,e=0;e<a.length;e++){for(var o=a[e],t=!0,i=1;i<o.length;i++){var u=o[i];0!==r[u]&&(t=!1)}t&&(a.splice(e--,1),n=c(c.s=o[0]))}return n}var t={},r={about:0},a=[];function c(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return n[e].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.m=n,c.c=t,c.d=function(n,e,o){c.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:o})},c.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},c.t=function(n,e){if(1&e&&(n=c(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var t in n)c.d(o,t,function(e){return n[e]}.bind(null,t));return o},c.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return c.d(e,"a",e),e},c.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var f=u;a.push([0,"chunk-vendors","chunk-common"]),o()})({0:function(n,e,o){n.exports=o("32ac")},"32ac":function(n,e,o){"use strict";o.r(e);o("cadf"),o("551c"),o("f751"),o("097d");var t=o("9ab4"),r=(o("8e56"),o("db4d"),o("c8d7")),a=o("a7a2"),c=o("90ae"),i=o("60a3"),u=o("53f9"),l=o("b9c5"),f=o("3c6c"),p=o("7d83"),d=o("d939"),s=o("a925"),w=o("c1e6");i["c"].config.productionTip=!1,i["c"].use(s["a"]);l["a"].getInstace();var g=c["a"].getInstance();g.init();var h=new s["a"](g),b=function(n){function e(){var e=null!==n&&n.apply(this,arguments)||this;return e.webParam=l["a"].getInstace(),e.token=new f["x"],e.windowsDownloadUrl="",e.macDownloadUrl="",e}return t["c"](e,n),e.prototype.created=function(){this.token=p["a"].getUserToken()},e.prototype.onChangeLanguage=function(n){g.changeLanguage(n),h.locale=g.locale,u["a"].log("切换语言:"+g.locale)},e.prototype.goRegister=function(){d["a"].backRegister()},e.prototype.onDownloadConfig=function(n){var e=n.bohe.down_platform[this.webParam.from];this.windowsDownloadUrl=e.windows.download_url,this.macDownloadUrl=e.mac.download_url},e.prototype.windowsDownload=function(){var n=new w["a"];n.getBrowser(),window.location.href=this.windowsDownloadUrl},e=t["b"]([Object(i["a"])({components:{"head-nav":r["a"],"foot-nav":a["a"]}})],e),e}(i["c"]);new b({i18n:h}).$mount("#app")}});