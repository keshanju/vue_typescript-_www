(function(t){function n(n){for(var i,r,c=n[0],s=n[1],u=n[2],l=0,f=[];l<c.length;l++)r=c[l],o[r]&&f.push(o[r][0]),o[r]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i]);p&&p(n);while(f.length)f.shift()();return a.push.apply(a,u||[]),e()}function e(){for(var t,n=0;n<a.length;n++){for(var e=a[n],i=!0,c=1;c<e.length;c++){var s=e[c];0!==o[s]&&(i=!1)}i&&(a.splice(n--,1),t=r(r.s=e[0]))}return t}var i={},o={activitys_activitymodel:0},a=[];function r(n){if(i[n])return i[n].exports;var e=i[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=t,r.c=i,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)r.d(e,i,function(n){return t[n]}.bind(null,i));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=n,c=c.slice();for(var u=0;u<c.length;u++)n(c[u]);var p=s;a.push([0,"chunk-vendors","chunk-common"]),e()})({0:function(t,n,e){t.exports=e("7971")},7971:function(t,n,e){"use strict";e.r(n);var i=e("5176"),o=e.n(i),a=(e("cadf"),e("551c"),e("f751"),e("097d"),e("9ab4")),r=(e("eb65"),e("abfe"),e("db4d"),e("60a3")),c=e("a925"),s=e("1396"),u=e("9347"),p=e("7d83"),l=e("0a56"),f=e("2e54"),h=e("dfdf"),g=e("a123");r["c"].config.productionTip=!1,r["c"].use(c["a"]);h["a"].getInstace(u["a"].REGION_CODE_1,u["a"].ZH_CN);var d=s["a"].getInstance();d.init();var v=new c["a"](d),y=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.activity_id=0,n.activity_json=f["a"].getInstace("mobile",n.activity_id),n.appParam=h["a"].getInstace(),n}return a["c"](n,t),n.prototype.mounted=function(){var t=this;window.onscroll=function(){t.pageScroll(835)},this.luck.init("prize",".hj_prize"),this.getAwardList();var n=this;setInterval(function(){n.clock=o()({},n.getClock(n.activity_json.endtime))},1e3)},n.prototype.onDrawWin=function(t){1==this.activity_json.choujiang_type&&(this.luck.speed=100,this.roll()),0==this.activity_json.choujiang_type&&(this.isBengin=!1,this.isWin=!0,this.dialog_win=!0,this.prize_name=t.data.title,this.prize_id=t.data.present_id),this.points=t.data.points,this.getActivityCount(),this.getActiveRecordList()},n.prototype.onDrawLose=function(t){this.isBengin=!1,this.isWin=!1,this.dialog_error=!0,this.dialog_msg=t.msg,this.points=t.data.points,this.getActivityCount()},n.prototype.tokenExpired=function(t){void 0===t&&(t=null),p["a"].loginOut(),this.account_token="",this.userInfo=null,this.$refs.head.checkLogin()},n.prototype.onChangeLanguage=function(t){d.changeLanguage(t),v.locale=d.locale,this.appParam.language=t},n.prototype.gotoLogin=function(){var t="platform="+this.appParam.platform;g["a"].gotoLogin(t)},n.prototype.gotoRecharge=function(){var t="platform="+this.appParam.platform;g["a"].gotoRecharge(t)},n.prototype.gotoDuijiang=function(t){void 0===t&&(t=0)},n=a["b"]([r["a"]],n),n}(l["a"]);new y({i18n:v}).$mount("#app")},abfe:function(t,n,e){}});