(function(t){function e(e){for(var r,a,s=e[0],u=e[1],c=e[2],l=0,d=[];l<s.length;l++)a=s[l],o[a]&&d.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);p&&p(e);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,s=1;s<n.length;s++){var u=n[s];0!==o[u]&&(r=!1)}r&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={usernotify:0},i=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var p=u;i.push([43,"chunk-vendors","chunk-common"]),n()})({"3d97":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var r=n("9ab4"),o=(n("b26b"),n("fdfc"),n("db4d"),n("a925")),i=n("60a3"),a=n("dfdf"),s=n("d6fc"),u=n("e681"),c=n("1831"),p=n("a306"),l=n("b890"),d=n("42d1"),f=n("7d83");i["c"].config.productionTip=!1,i["c"].use(o["a"]);var h=u["a"].getInstance();h.initNoRefresh();var g=new o["a"](h),b=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.appParam=a["a"].getInstace(1),e.isLoading=!0,e.newsList=[],e.http=new c["a"],e}return r["c"](e,t),e.prototype.created=function(){this.setBaseUrl(l["a"].getBaseUrl()),this.onGetNewsList(),this.isLoading=!1},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.onGetNewsList=function(){return r["a"](this,void 0,void 0,function(){var t,e,n;return r["d"](this,function(r){switch(r.label){case 0:return this.isLoading=!0,t=c["a"].URL_NEWS,e=new p["b"],e.page=1,e.size=8,e.support_type=2,e.class_type=0,e.region_code=f["a"].getRegionCodes(),[4,this.http.get(t,e)];case 1:return n=r.sent(),this.isLoading=!1,n.code==c["a"].HTTP_SUCCESS_NET_CODE&&(this.newsList=n.data.list),[2]}})})},e.prototype.getDetail=function(t){return r["a"](this,void 0,void 0,function(){var e,n;return r["d"](this,function(r){return 4==this.appParam.platform?(e=window.location.origin+"/user_details.html?id="+t.id,window.location.href=e):(e=window.location.origin+"/user_details.html?id="+t.id,n=d["a"].getInstance().getFactory(this.appParam.platform),n.jumpUrl(e)),[2]})})},e=r["b"]([Object(i["a"])({components:{"ls-loading":s["a"]}})],e),e}(i["c"]);new b({i18n:g}).$mount("#app")},43:function(t,e,n){t.exports=n("3d97")}});