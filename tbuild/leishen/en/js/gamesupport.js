(function(t){function e(e){for(var i,o,r=e[0],c=e[1],h=e[2],f=0,l=[];f<r.length;f++)o=r[f],n[o]&&l.push(n[o][0]),n[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(l.length)l.shift()();return s.push.apply(s,h||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],i=!0,r=1;r<a.length;r++){var c=a[r];0!==n[c]&&(i=!1)}i&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var i={},n={gamesupport:0},s=[];function o(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=i,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(a,i,function(e){return t[e]}.bind(null,i));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var h=0;h<r.length;h++)e(r[h]);var u=c;s.push([8,"chunk-vendors","chunk-common"]),a()})({8:function(t,e,a){t.exports=a("c953")},c953:function(t,e,a){"use strict";a.r(e);a("a7cc"),a("450d");var i=a("df33"),n=a.n(i),s=(a("672e"),a("101e")),o=a.n(s),r=(a("ac6a"),a("be4f"),a("896a")),c=a.n(r),h=(a("cadf"),a("551c"),a("f751"),a("097d"),a("9ab4")),u=(a("76ca"),a("db4d"),a("60a3")),f=a("aaaf"),l=a("1189"),p=a("360e"),g=a("a925"),d=a("b9c5"),m=a("3435"),b=a("ebb9"),L=a("d939"),y=a("a306"),v=a("1831"),w=a("9347");u["b"].config.productionTip=!1,u["b"].use(c.a),u["b"].use(g["a"]);d["a"].getInstace(w["a"].REGION_CODE_1,w["a"].ZH_CN);var G=m["a"].getInstance();G.init();var k=new g["a"](G),_=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.webParam=d["a"].getInstace(),e.activityInfo=new y["d"],e.navIndex=0,e.gameList=[],e.checkGameList=[],e.showGameList=[],e.keyWords="",e.isLoading=!1,e.emptyDialogVisible=!1,e.http=new v["a"],e}return h["c"](e,t),e.prototype.execute=function(){},e.prototype.init=function(){},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.created=function(){this.setBaseUrl(b["a"].getBaseUrl()),this.getActivityInfo(),this.getGameList()},e.prototype.onChangeLanguage=function(t){G.changeLanguage(t),k.locale=G.locale,b["a"].log("切换语言:"+G.locale)},e.prototype.changeNavIndex=function(t){switch(this.navIndex=t,t){case 0:this.checkGameList=this.gameList,this.getShowGameList(1);break;case 1:this.getNewGameList();break;case 2:this.getHotGameList();break;case 3:this.getFreeGameList();break;case 4:this.getLabelGameList("手游");break;case 5:this.getLabelGameList("Steam");break;case 6:this.getLabelGameList("Origin");break;case 7:this.getLabelGameList("Uplay");break;default:break}},e.prototype.getGameList=function(){return h["a"](this,void 0,void 0,function(){var t,e,a;return h["d"](this,function(i){switch(i.label){case 0:return t=v["a"].URL_GAME,e={},this.isLoading=!0,a=this,[4,this.http.post(t,e)];case 1:return a.backData=i.sent(),this.backData.code==v["a"].HTTP_SUCCESS_NET_CODE?(this.processData(this.backData.data),this.gameList=this.backData.data,this.checkGameList=this.backData.data,this.isLoading=!1,this.getShowGameList(1)):this.isLoading=!1,[2]}})})},e.prototype.processData=function(t){t.forEach(function(t,e){var a=new Date(t.create_time).getTime(),i=(new Date).getTime();t["is_new"]=i-a<=7776e6?1:0})},e.prototype.getShowGameList=function(t){this.showGameList=this.checkGameList.slice(150*(t-1),150*t)},e.prototype.getNewGameList=function(){this.checkGameList=this.gameList.filter(function(t){return 1==t.is_new}),this.getShowGameList(1)},e.prototype.getHotGameList=function(){this.checkGameList=this.gameList.filter(function(t){return 1==t.is_hot}),this.getShowGameList(1)},e.prototype.getLabelGameList=function(t){this.checkGameList=this.gameList.filter(function(e){return null==e.game_label&&(e.game_label=""),-1!=e.game_label.indexOf(t)}),this.getShowGameList(1)},e.prototype.getFreeGameList=function(){this.checkGameList=this.gameList.filter(function(t){return 1==t.is_free}),this.getShowGameList(1)},e.prototype.searchGame=function(){var t=this,e=this.gameList.filter(function(e){return-1!=e.keywords.indexOf(t.keyWords)});this.checkGameList=e,this.getShowGameList(1)},e.prototype.getActivityInfo=function(){return h["a"](this,void 0,void 0,function(){var t,e,a;return h["d"](this,function(i){switch(i.label){case 0:return t=v["a"].URL_ACTIVITY_PICTURE_LIST,e=new y["e"],e.region_code=this.webParam.region_code,e.plat_type=1,a=this,[4,this.http.post(t,e)];case 1:return a.backData=i.sent(),this.backData.code==v["a"].HTTP_SUCCESS_NET_CODE&&this.backData.data.length>0&&(this.activityInfo=this.backData.data[0],""==this.activityInfo.url&&(this.activityInfo.url=L["a"].HTML_NAME_DETAILS_ACTIVITY_NEW+"?id="+this.activityInfo.id)),[2]}})})},e=h["b"]([Object(u["a"])({components:{"head-nav":f["a"],"foot-nav":l["a"],"download-box":p["a"],"el-pagination":o.a,"el-dialog":n.a}})],e),e}(u["b"]);new _({i18n:k}).$mount("#app")}});