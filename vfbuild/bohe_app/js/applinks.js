(function(n){function e(e){for(var r,i,c=e[0],s=e[1],u=e[2],l=0,f=[];l<c.length;l++)i=c[l],o[i]&&f.push(o[i][0]),o[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(n[r]=s[r]);d&&d(e);while(f.length)f.shift()();return a.push.apply(a,u||[]),t()}function t(){for(var n,e=0;e<a.length;e++){for(var t=a[e],r=!0,c=1;c<t.length;c++){var s=t[c];0!==o[s]&&(r=!1)}r&&(a.splice(e--,1),n=i(i.s=t[0]))}return n}var r={},o={applinks:0},a=[];function i(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=n,i.c=r,i.d=function(n,e,t){i.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},i.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},i.t=function(n,e){if(1&e&&(n=i(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)i.d(t,r,function(e){return n[e]}.bind(null,r));return t},i.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return i.d(e,"a",e),e},i.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var d=s;a.push([0,"chunk-vendors","chunk-common"]),t()})({0:function(n,e,t){n.exports=t("89bf")},"89bf":function(n,e,t){"use strict";t.r(e),t.d(e,"Applinks",function(){return h});t("4917"),t("cadf"),t("551c"),t("097d");var r=t("9ab4"),o=(t("3a37"),t("60a3")),a=(t("fdfc"),t("db4d"),t("dfdf")),i=t("1157"),c=t.n(i),s=t("90ae"),u=t("a925"),d=t("255e"),l=t("d6fc");o["c"].use(u["a"]);a["a"].getInstace();var f=s["a"].getInstance();f.initNoRefresh();var p=new u["a"](f),h=function(n){function e(){var e=null!==n&&n.apply(this,arguments)||this;return e.appParam=a["a"].getInstace(),e.androidDownloadUrl="",e.isLoading=!0,e}return r["c"](e,n),e.prototype.created=function(){this.appParam.getAppParam(),this.getDownloadUrl(),this.isLoading=!1},e.prototype.getDownloadUrl=function(){return r["a"](this,void 0,void 0,function(){var n;return r["d"](this,function(e){switch(e.label){case 0:return[4,d["a"].getInstance().download()];case 1:return n=e.sent(),this.androidDownloadUrl=n.bohe.android.download_url,this.checkType(),[2]}})})},e.prototype.checkType=function(){var n=this;c()(function(){var e=navigator.userAgent,t=e.indexOf("Android")>-1||e.indexOf("Adr")>-1,r=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),o=window.navigator.userAgent.toLowerCase();"micromessenger"==o.match(/MicroMessenger/i)?(c()(".btn_download").click(function(){c()(".shadow").show()}),c()(".shadow").click(function(){c()(this).hide()})):t?c()(".pos_s0").attr("href",n.androidDownloadUrl):r&&c()(".pos_s0").attr("href","itms-services://?action=download-manifest&url=https://m.bohe.com/bohe_ios.plist")})},e=r["b"]([Object(o["a"])({components:{loading:l["a"]}})],e),e}(o["c"]);new h({i18n:p}).$mount("#app")}});