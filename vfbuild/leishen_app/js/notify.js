(function(t){function e(e){for(var i,a,r=e[0],c=e[1],u=e[2],d=0,f=[];d<r.length;d++)a=r[d],o[a]&&f.push(o[a][0]),o[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);l&&l(e);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,r=1;r<n.length;r++){var c=n[r];0!==o[c]&&(i=!1)}i&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},o={notify:0},s=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var u=0;u<r.length;u++)e(r[u]);var l=c;s.push([27,"chunk-vendors","chunk-common"]),n()})({27:function(t,e,n){t.exports=n("6c0b")},"6c0b":function(t,e,n){"use strict";n.r(e);n("ab71");var i=n("58e6"),o=(n("bda7"),n("5e46")),s=(n("da3c"),n("0b33")),a=(n("c194"),n("7744")),r=(n("2994"),n("2bdd")),c=(n("ac1e"),n("543e")),u=(n("cadf"),n("551c"),n("f751"),n("097d"),n("9ab4")),l=(n("eb65"),n("fdfc"),n("db4d"),n("a925")),d=n("60a3"),f=n("dfdf"),p=n("1396"),h=n("1831"),g=n("a306"),b=n("82f5"),w=n("42d1"),v=n("9347"),y=n("7278");d["c"].config.productionTip=!1,d["c"].use(c["a"]),d["c"].use(r["a"]),d["c"].use(a["a"]),d["c"].use(s["a"]),d["c"].use(o["a"]),d["c"].use(i["a"]),d["c"].use(l["a"]);f["a"].getInstace(v["a"].REGION_CODE_1,v["a"].ZH_CN);var m=p["a"].getInstance();m.initNoRefresh();var N=new l["a"](m),L=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.appParam=f["a"].getInstace(),e.isLoading=!1,e.loading=!1,e.listIndex=0,e.showmask=!0,e.newsList=[],e.http=new h["a"],e.gameList=[{loading:!1,finish:!1,count:0,list:[],showNoPic:!1,label:"维护公告"},{loading:!1,finish:!1,count:0,list:[],showNoPic:!1,label:"线路公告"},{loading:!1,finish:!1,count:0,list:[],showNoPic:!1,label:"故障公告"},{loading:!1,finish:!1,count:0,list:[],showNoPic:!1,label:"新游公告"}],e}return u["c"](e,t),e.prototype.created=function(){this.setBaseUrl(b["a"].getBaseUrl())},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.onGetNewsList=function(t,e){return void 0===e&&(e=1),u["a"](this,void 0,void 0,function(){var n;return u["d"](this,function(i){return this.isLoading=!0,n=new g["f"],n.page=e,n.size=40,n.support_type=2,n.region_code=this.appParam.region_code,n.label=t,this.getNotifyList(n),[2]})})},e.prototype.getNotifyList=function(t){return u["a"](this,void 0,void 0,function(){var e,n;return u["d"](this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),this.isLoading=!0,e=h["a"].URL_NEWS,[4,this.http.get(e,t)];case 1:return n=i.sent(),this.isLoading=!1,n.code==h["a"].HTTP_SUCCESS_NET_CODE?this.ongetNewsSuccess(n):this.ongetNewsFaild(n),[3,3];case 2:return i.sent(),[3,3];case 3:return[2]}})})},e.prototype.ongetNewsSuccess=function(t){var e=this;0===t.data.list.length&&(this.gameList[this.listIndex].finish=!0,this.showmask=!1),t.data.list.forEach(function(t,n){e.gameList[e.listIndex].list.push(t)}),0==this.gameList[this.listIndex].list.length&&(this.gameList[this.listIndex].showNoPic=!0),this.loading=!1},e.prototype.ongetNewsFaild=function(t){},e.prototype.loadList=function(t){var e=this;this.showmask=!0;var n=this.gameList[t];setTimeout(function(){n.count++,e.onGetNewsList(n.label,n.count)},500)},e.prototype.getDetail=function(t){return u["a"](this,void 0,void 0,function(){var e,n;return u["d"](this,function(i){return 4==this.appParam.platform?(e=window.location.origin+"/details.html?id="+t.id,window.location.href=e):(e=window.location.origin+"/details.html?id="+t.id,n=w["a"].getInstance().getFactory(this.appParam.platform),n.jumpUrl(e)),[2]})})},e=u["b"]([Object(d["a"])({components:{load:y["a"]}})],e),e}(d["c"]);new L({i18n:N}).$mount("#app")}});