(function(n){function e(e){for(var o,r,s=e[0],l=e[1],u=e[2],f=0,g=[];f<s.length;f++)r=s[f],a[r]&&g.push(a[r][0]),a[r]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(n[o]=l[o]);c&&c(e);while(g.length)g.shift()();return i.push.apply(i,u||[]),t()}function t(){for(var n,e=0;e<i.length;e++){for(var t=i[e],o=!0,s=1;s<t.length;s++){var l=t[s];0!==a[l]&&(o=!1)}o&&(i.splice(e--,1),n=r(r.s=t[0]))}return n}var o={},a={index:0},i=[];function r(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=n,r.c=o,r.d=function(n,e,t){r.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},r.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,e){if(1&e&&(n=r(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)r.d(t,o,function(e){return n[e]}.bind(null,o));return t},r.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return r.d(e,"a",e),e},r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var c=l;i.push([7,"chunk-vendors","chunk-common"]),t()})({7:function(n,e,t){n.exports=t("9281")},9281:function(n,e,t){"use strict";t.r(e);t("4917"),t("7f7f"),t("5f5f");var o=t("f253"),a=(t("8a58"),t("e41f")),i=(t("c3a6"),t("ad06")),r=(t("cadf"),t("551c"),t("097d"),t("9ab4")),s=(t("968a"),t("eb65"),t("fdfc"),t("db4d"),t("a925")),l=t("60a3"),u=t("dfdf"),c=t("1396"),f=t("255e"),g=t("1157"),d=t.n(g),h=t("9347"),p=t("0ca7"),w=t("90ae"),b=t("7d83");l["b"].use(i["a"]),l["b"].use(a["a"]),l["b"].use(o["a"]),l["b"].config.productionTip=!1,l["b"].use(s["a"]);u["a"].getInstace(h["a"].REGION_CODE_1,h["a"].ZH_CN);var v=c["a"].getInstance();v.initNoRefresh();var y=new s["a"](v),m=function(n){function e(){var e=null!==n&&n.apply(this,arguments)||this;return e.appParam=u["a"].getInstace(),e.downUrl="",e.winDownUrl="",e.langListshow=!1,e.languageList=[],e._lanConfig=null,e.seleteLng=new w["b"],e.seleteCode="",e.langText="中文",e.showlangText="中文",e}return r["c"](e,n),e.prototype.created=function(){this.lanConfig=c["a"].getInstance(),this.getDownloadUrl(),this.onSetLanguage()},Object.defineProperty(e.prototype,"lanConfig",{get:function(){return this._lanConfig},set:function(n){this._lanConfig=n,this.languageList=this.lanConfig.getLanguageList()},enumerable:!0,configurable:!0}),e.prototype.onChangeLanguage=function(n){v.changeLanguage(n),y.locale=v.locale,this.appParam.language=n},e.prototype.onSetLanguage=function(n){void 0===n&&(n=""),""!=n&&null!=n||(n=b["a"].getLanguage()),this.seleteLng=this.lanConfig.getLanguageInfo(n,this.languageList),this.seleteCode=this.seleteLng.code},e.prototype.getDownloadUrl=function(){return r["a"](this,void 0,void 0,function(){var n;return r["d"](this,function(e){switch(e.label){case 0:return[4,f["a"].getInstance().download()];case 1:return n=e.sent(),this.downUrl=n.leigod.android.download_url,this.winDownUrl=n.leigod.windows.download_url,this.checkType(),[2]}})})},e.prototype.showLangList=function(){this.langListshow=!0},e.prototype.onCancel=function(){this.langListshow=!1},e.prototype.onConfirm=function(){this.onChangeLanguage(this.seleteCode),this.showlangText=this.langText,this.langListshow=!1},e.prototype.onChange=function(n,e,t){this.seleteCode=e.code,this.langText=e.name},e.prototype.checkType=function(){var n=this;d()(function(){var e=navigator.userAgent,t=e.indexOf("Android")>-1||e.indexOf("Adr")>-1,o=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),a=window.navigator.userAgent.toLowerCase();"micromessenger"==a.match(/MicroMessenger/i)?(d()("#downBtn").click(function(){d()(".shadow").show()}),d()(".shadow").click(function(){d()(this).hide()})):t?(d()("#downBtn").attr("href",n.downUrl),d()("#winDownBtn").attr("href",n.winDownUrl)):o&&(d()("#downBtn").attr("href","itms-services://?action=download-manifest&url=https://m.leigod.com/ios.plist"),d()("#winDownBtn").attr("href",n.winDownUrl))})},e=r["b"]([Object(l["a"])({components:{navlist:p["a"]}})],e),e}(l["b"]);new m({i18n:y}).$mount("#app")}});