(function(n){function e(e){for(var r,i,c=e[0],u=e[1],s=e[2],l=0,p=[];l<c.length;l++)i=c[l],o[i]&&p.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(n[r]=u[r]);d&&d(e);while(p.length)p.shift()();return a.push.apply(a,s||[]),t()}function t(){for(var n,e=0;e<a.length;e++){for(var t=a[e],r=!0,c=1;c<t.length;c++){var u=t[c];0!==o[u]&&(r=!1)}r&&(a.splice(e--,1),n=i(i.s=t[0]))}return n}var r={},o={applinks:0},a=[];function i(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=n,i.c=r,i.d=function(n,e,t){i.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},i.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},i.t=function(n,e){if(1&e&&(n=i(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)i.d(t,r,function(e){return n[e]}.bind(null,r));return t},i.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return i.d(e,"a",e),e},i.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var s=0;s<c.length;s++)e(c[s]);var d=u;a.push([0,"chunk-vendors","chunk-common"]),t()})({0:function(n,e,t){n.exports=t("89bf")},"89bf":function(n,e,t){"use strict";t.r(e),t.d(e,"Applinks",function(){return f});t("4917"),t("cadf"),t("551c"),t("097d");var r=t("9ab4"),o=(t("3a37"),t("60a3")),a=(t("499a"),t("db4d"),t("dfdf")),i=t("1157"),c=t.n(i),u=t("90ae"),s=t("a925"),d=t("255e");o["c"].use(s["a"]);a["a"].getInstace();var l=u["a"].getInstance();l.initNoRefresh();var p=new s["a"](l),f=function(n){function e(){var e=null!==n&&n.apply(this,arguments)||this;return e.appParam=new a["a"],e.androidDownloadUrl="",e}return r["c"](e,n),e.prototype.created=function(){this.appParam.getAppParam(),this.getDownloadUrl()},e.prototype.getDownloadUrl=function(){return r["a"](this,void 0,void 0,function(){var n;return r["d"](this,function(e){switch(e.label){case 0:return[4,d["a"].getInstance().download()];case 1:return n=e.sent(),this.androidDownloadUrl=n.bohe.android.download_url,this.checkType(),[2]}})})},e.prototype.checkType=function(){var n=this;c()(function(){var e=navigator.userAgent,t=e.indexOf("Android")>-1||e.indexOf("Adr")>-1,r=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),o=window.navigator.userAgent.toLowerCase();"micromessenger"==o.match(/MicroMessenger/i)?(c()(".btn_download").click(function(){c()(".shadow").show()}),c()(".shadow").click(function(){c()(this).hide()})):t?c()(".pos_s0").attr("href",n.androidDownloadUrl):r&&c()(".pos_s0").attr("href","itms-services://?action=download-manifest&url=https://m.bohe.com/bohe_ios.plist")})},e=r["b"]([o["a"]],e),e}(o["c"]);new f({i18n:p}).$mount("#app")}});