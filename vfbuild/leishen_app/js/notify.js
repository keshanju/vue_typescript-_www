(function(t){function e(e){for(var r,a,s=e[0],u=e[1],c=e[2],l=0,f=[];l<s.length;l++)a=s[l],o[a]&&f.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);p&&p(e);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,s=1;s<n.length;s++){var u=n[s];0!==o[u]&&(r=!1)}r&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={notify:0},i=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var p=u;i.push([31,"chunk-vendors","chunk-common"]),n()})({31:function(t,e,n){t.exports=n("6c0b")},"6c0b":function(t,e,n){"use strict";n.r(e);n("ac1e");var r=n("543e"),o=n("9ab4"),i=(n("eb65"),n("fdfc"),n("db4d"),n("a925")),a=n("60a3"),s=n("dfdf"),u=n("7278"),c=n("1396"),p=n("1831"),l=n("a306"),f=n("255e"),d=n("82f5"),h=n("42d1"),g=n("9347");a["b"].config.productionTip=!1,a["b"].use(r["a"]),a["b"].use(i["a"]);s["a"].getInstace(g["a"].REGION_CODE_1,g["a"].ZH_CN);var b=c["a"].getInstance();b.initNoRefresh();var v=new i["a"](b),w=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.appParam=s["a"].getInstace(),e.isLoading=!1,e.newsList=[],e.http=new p["a"],e}return o["c"](e,t),e.prototype.created=function(){this.setBaseUrl(d["a"].getBaseUrl()),this.onGetNewsList()},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.onGetNewsList=function(){return o["a"](this,void 0,void 0,function(){var t,e;return o["d"](this,function(n){switch(n.label){case 0:return this.isLoading=!0,t=new l["i"],t.baseUrl=d["a"].getStafUrl(),t.page=1,t.size=8,t.support_type=2,t.region_code=this.appParam.region_code,[4,f["a"].getInstance().getNotifyList(t)];case 1:return e=n.sent(),this.newsList=e.list,this.isLoading=!1,[2]}})})},e.prototype.getDetail=function(t){return o["a"](this,void 0,void 0,function(){var e,n;return o["d"](this,function(r){return 4==this.appParam.platform?(e=window.location.origin+"/details.html?id="+t.id,window.location.href=e):(e=window.location.origin+"/details.html?id="+t.id,n=h["a"].getInstance().getFactory(this.appParam.platform),n.jumpUrl(e)),[2]})})},e=o["b"]([Object(a["a"])({components:{"ls-loading":u["a"]}})],e),e}(a["b"]);new w({i18n:v}).$mount("#app")}});