(function(t){function e(e){for(var n,i,s=e[0],c=e[1],u=e[2],l=0,f=[];l<s.length;l++)i=s[l],o[i]&&f.push(o[i][0]),o[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);p&&p(e);while(f.length)f.shift()();return r.push.apply(r,u||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,s=1;s<a.length;s++){var c=a[s];0!==o[c]&&(n=!1)}n&&(r.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},o={news:0},r=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var p=c;r.push([21,"chunk-vendors","chunk-common"]),a()})({21:function(t,e,a){t.exports=a("6c5e")},"6c5e":function(t,e,a){"use strict";a.r(e);a("672e"),a("450d");var n=a("101e"),o=a.n(n),r=(a("cadf"),a("551c"),a("097d"),a("9ab4")),i=(a("8e56"),a("c8d7")),s=a("a7a2"),c=a("228b"),u=a("90ae"),p=a("60a3"),l=a("a306"),f=a("1831"),h=a("9347"),d=a("53f9"),g=a("b9c5"),b=a("d939"),v=a("a925"),w=a("7d83");p["c"].config.productionTip=!1,p["c"].use(v["a"]);g["a"].getInstace();var y=u["a"].getInstance();y.init();var _=new v["a"](y),S=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.webParam=g["a"].getInstace(),e.newsList=[],e.newsListTop=[],e.imageHeadUrl="",e.total=0,e.page_size=5,e.http=new f["a"],e}return r["c"](e,t),e.prototype.created=function(){this.setBaseUrl(d["a"].getBaseUrl()),this.getNewsList(),this.getChinaNewsList()},e.prototype.onChangeLanguage=function(t){y.changeLanguage(t),_.locale=y.locale},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t),this.imageHeadUrl=d["a"].getImgBaseUrl()},e.prototype.goNewsDetail=function(t){b["a"].gotoNewsDetails(t)},e.prototype.getChinaNewsList=function(t){return void 0===t&&(t=0),r["a"](this,void 0,void 0,function(){var e,a,n;return r["d"](this,function(o){switch(o.label){case 0:return e=f["a"].URL_NEWS,a=new l["e"],a.page=t,a.size=this.page_size,a.support_type=1,a.class_type=2,a.label=h["a"].NEWS_CHINA,a.region_code=w["a"].getRegionCodes(),n=this,[4,this.http.get(e,a)];case 1:return n.backData=o.sent(),this.backData.code==f["a"].HTTP_SUCCESS_NET_CODE&&(this.total=this.backData.data.total,this.newsList=this.backData.data.list),[2]}})})},e.prototype.getNewsList=function(t){return void 0===t&&(t=0),r["a"](this,void 0,void 0,function(){var e,a,n;return r["d"](this,function(o){switch(o.label){case 0:return e=f["a"].URL_NEWS,a=new l["e"],a.page=t,a.size=4,a.support_type=1,a.class_type=2,a.label=h["a"].NEWS_LAST,a.region_code=w["a"].getRegionCodes(),n=this,[4,this.http.get(e,a)];case 1:return n.backData=o.sent(),this.backData.code==f["a"].HTTP_SUCCESS_NET_CODE&&(this.newsListTop=this.backData.data.list),[2]}})})},e=r["b"]([Object(p["a"])({components:{"head-nav":i["a"],"foot-nav":s["a"],"details-news":c["a"],"el-pagination":o.a}})],e),e}(p["c"]);new S({i18n:_}).$mount("#app")}});