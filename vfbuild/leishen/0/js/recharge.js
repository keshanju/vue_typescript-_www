(function(e){function t(t){for(var r,c,i=t[0],u=t[1],l=t[2],p=0,f=[];p<i.length;p++)c=i[p],o[c]&&f.push(o[c][0]),o[c]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);s&&s(t);while(f.length)f.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var u=n[i];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={recharge:0},a=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var s=u;a.push([27,"chunk-vendors","chunk-common"]),n()})({"0cc9":function(e,t,n){"use strict";n.r(t);n("186a"),n("450d");var r=n("301f"),o=n.n(r),a=(n("96dc"),n("9cea")),c=n.n(a),i=(n("cadf"),n("551c"),n("097d"),n("9ab4")),u=(n("76ca"),n("db4d"),n("60a3")),l=n("aaaf"),s=n("1189"),p=n("360e"),f=n("a925"),d=n("b9c5"),g=n("3435"),h=n("ebb9"),b=n("9347"),v=n("7d83"),y=n("d939"),w=n("255e");u["c"].config.productionTip=!1,u["c"].use(f["a"]);d["a"].getInstace(b["a"].REGION_CODE_1,b["a"].ZH_CN);var _=g["a"].getInstance();_.init();var m=new f["a"](_),O=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.webParam=d["a"].getInstace(),t.chooseIndex=4,t.activity_url="",t}return i["c"](t,e),t.prototype.created=function(){this.getActivityUrl()},t.prototype.onChoosePrice=function(e){this.chooseIndex=e},t.prototype.getActivityUrl=function(){return i["a"](this,void 0,void 0,function(){var e;return i["d"](this,function(t){switch(t.label){case 0:return[4,w["a"].getInstance().download()];case 1:return e=t.sent(),this.activity_url=e.leigod.activity.activity_url,[2]}})})},t.prototype.onChangeLanguage=function(e){_.changeLanguage(e),m.locale=_.locale,this.webParam.language=e},t.prototype.buyNow=function(){""!=v["a"].getUserToken().account_token?y["a"].webGotoUser(h["a"].getUserBaseUrl(),y["a"].HTML_NAME_USER,"page=1"):y["a"].webGotoUser(h["a"].getUserBaseUrl(),y["a"].HTML_NAME_LOGIN)},t=i["b"]([Object(u["a"])({components:{"head-nav":l["a"],"foot-nav":s["a"],"download-box":p["a"],"el-carousel":c.a,"el-carousel-item":o.a}})],t),t}(u["c"]);new O({i18n:m}).$mount("#app")},27:function(e,t,n){e.exports=n("0cc9")}});