(function(t){function o(o){for(var e,a,s=o[0],c=o[1],p=o[2],u=0,d=[];u<s.length;u++)a=s[u],n[a]&&d.push(n[a][0]),n[a]=0;for(e in c)Object.prototype.hasOwnProperty.call(c,e)&&(t[e]=c[e]);l&&l(o);while(d.length)d.shift()();return r.push.apply(r,p||[]),i()}function i(){for(var t,o=0;o<r.length;o++){for(var i=r[o],e=!0,s=1;s<i.length;s++){var c=i[s];0!==n[c]&&(e=!1)}e&&(r.splice(o--,1),t=a(a.s=i[0]))}return t}var e={},n={shuangdan:0},r=[];function a(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=e,a.d=function(t,o,i){a.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:i})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,o){if(1&o&&(t=a(t)),8&o)return t;if(4&o&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var e in t)a.d(i,e,function(o){return t[o]}.bind(null,e));return i},a.n=function(t){var o=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(o,"a",o),o},a.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=o,s=s.slice();for(var p=0;p<s.length;p++)o(s[p]);var l=c;r.push([35,"chunk-vendors","chunk-common"]),i()})({"2dbd":function(t,o,i){"use strict";i.r(o);i("7514"),i("8a58");var e=i("e41f"),n=i("9ab4"),r=(i("eb65"),i("fdfc"),i("db4d"),i("60a3")),a=i("1157"),s=i.n(a),c=i("a925"),p=i("1396"),l=i("82f5"),u=i("9347"),d=i("7d83"),f=i("0a56"),g=i("d939"),h=i("a123"),_=i("dfdf");r["c"].config.productionTip=!1,r["c"].use(e["a"]),r["c"].use(c["a"]);_["a"].getInstace(u["a"].REGION_CODE_1,u["a"].ZH_CN);var y=p["a"].getInstance();y.init();var v=new c["a"](y),m=function(t){function o(){var o=null!==t&&t.apply(this,arguments)||this;return o.activity_id=36,o.appParam=_["a"].getInstace(),o.joinleftfix=0,o.dialog_award=!1,o.dialog_guize=!1,o.dialog_no_login=!1,o.dialog_recharge=!1,o.dialog_copy_ref_link=!1,o.dialog_error=!1,o.dialog_win=!1,o.refer_code_txt="请登录",o.sina_link="https://weibo.com/p/1006066443936086/manage?from=page_100606&mod=TAB#place",o.dialog_msg="",o}return n["c"](o,t),o.prototype.mounted=function(){var t=this;window.onscroll=function(){t.pageScroll(930)},this.getAwardList()},o.prototype.created=function(){this.imageHeadUrl=l["a"].getImgBaseUrl(),this.account_token=d["a"].getUserToken().account_token,this.setBaseUrl(l["a"].getBaseUrl()),this.getActivityId(),this.getActivityDetail(),this.getReferActivitys()},o.prototype.onClickAward=function(){this.dialog_award=!0,this.getActiveRecordList(1,4)},o.prototype.onClickGuize=function(){this.dialog_guize=!0},o.prototype.onClickDraw=function(){this.isBengin||(this.aCount<=0?this.dialog_recharge=!0:(this.isBengin=!0,this.onDraw(0,1e3)))},o.prototype.onDrawWin=function(t){this.isWin=!0,this.points=t.data.points,this.getActivityCount();var o=this;setTimeout(function(){o.dialog_win=!0,o.dialog_msg=t.data.title},200)},o.prototype.onDrawLose=function(t){this.isBengin=!1,this.isWin=!1,this.dialog_error=!0,this.dialog_msg=t.msg,this.points=t.data.points,this.getActivityCount()},o.prototype.continueDraw=function(){this.isBengin=!1,this.isWin=!1,this.dialog_win=!1,this.dialog_msg=""},o.prototype.gotoLogin=function(){var t="platform="+this.appParam.platform;h["a"].gotoLogin(t)},o.prototype.gotoRecharge=function(){var t="platform="+this.appParam.platform;h["a"].gotoRecharge(t)},o.prototype.generateRefercodeLink=function(t){this.refer_code_txt="邀请码： "+t,this.refer_code=l["a"].getUserBaseUrl()+"/"+g["a"].HTML_NAME_REGISTER+"?refer_code="+t},o.prototype.copyRefercodeLink=function(){""!=this.account_token?(u["a"].copyToClipboard(this.refer_code),this.dialog_copy_ref_link=!0):this.dialog_no_login=!0},o.prototype.closeDialog=function(){this.dialog_msg="",this.dialog_error=!1,this.dialog_copy_ref_link=!1},o.prototype.tokenExpired=function(t){void 0===t&&(t=null),d["a"].loginOut(),this.account_token=""},o.prototype.getAwardListSuccess=function(){this.initAwardList()},o.prototype.initAwardList=function(){this.awardList.length<=14||s()(function(){setInterval(function(){var t=s()("#sd_mb_history_box ul");t.animate({marginTop:"-18px"},400,function(){t.find("li").eq(0).appendTo(t),t.css("margin-top","0")})},2e3)})},o.prototype.pageScroll=function(t){var o=u["a"].scroll().top;this.joinleftfix=o<t?0:1},o=n["b"]([Object(r["a"])({components:{"van-popup":e["a"]}})],o),o}(f["a"]);new m({i18n:v}).$mount("#app")},35:function(t,o,i){t.exports=i("2dbd")}});