(function(t){function e(e){for(var r,i,p=e[0],s=e[1],u=e[2],l=0,f=[];l<p.length;l++)i=p[l],a[i]&&f.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);c&&c(e);while(f.length)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,p=1;p<n.length;p++){var s=n[p];0!==a[s]&&(r=!1)}r&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={pselfhelp:0},o=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var p=window["webpackJsonp"]=window["webpackJsonp"]||[],s=p.push.bind(p);p.push=e,p=p.slice();for(var u=0;u<p.length;u++)e(p[u]);var c=s;o.push([17,"chunk-vendors","chunk-common"]),n()})({17:function(t,e,n){t.exports=n("9fe8")},"9fe8":function(t,e,n){"use strict";n.r(e);var r=n("9ab4"),a=(n("3a37"),n("499a"),n("60a3")),o=n("90ae"),i=n("1831"),p=n("a306"),s=n("b890"),u=n("dfdf"),c=n("42d1"),l=(n("db4d"),n("a925"));a["c"].config.productionTip=!1,a["c"].use(l["a"]);u["a"].getInstace();var f=o["a"].getInstance();f.initNoRefresh();var h=new l["a"](f),g=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.appParam=u["a"].getInstace(),e.khdNewList=[],e.gwNewList=[],e.ydNewList=[],e.bgImg="images/bg_img.jpg",e.helpType=0,e.http=new i["a"],e}return r["c"](e,t),e.prototype.created=function(){s["a"].log("资讯log"),this.setBaseUrl(s["a"].getBaseUrl()),this.onGetNewList()},e.prototype.mounted=function(){this.changeBg()},e.prototype.onChangeLanguage=function(t){f.changeLanguage(t,!1),h.locale=f.locale,s["a"].log("切换语言:"+f.locale)},e.prototype.changeHelpType=function(t){this.helpType=t},e.prototype.changeBg=function(){var t=c["a"].getInstance().getFactory(this.appParam.platform),e=t.getbackground(1);""!=e&&(this.bgImg=e)},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.onGetNewList=function(){return r["a"](this,void 0,void 0,function(){var t,e,n;return r["d"](this,function(r){switch(r.label){case 0:return t=i["a"].URL_NEWS,e=new p["b"],e.page=0,e.size=5,e.support_type=0,e.class_type=1,e.region_code=this.appParam.region_code,n=this,[4,this.http.get(t,e)];case 1:return n.backData=r.sent(),this.backData.code==i["a"].HTTP_SUCCESS_NET_CODE&&(this.khdNewList=this.backData.data.list.filter(function(t){if(3==t.support_type)return t}),this.gwNewList=this.backData.data.list.filter(function(t){if(1==t.support_type)return t}),this.ydNewList=this.backData.data.list.filter(function(t){if(2==t.support_type)return t})),[2]}})})},e=r["b"]([a["a"]],e),e}(a["c"]);new g({i18n:h}).$mount("#app")}});