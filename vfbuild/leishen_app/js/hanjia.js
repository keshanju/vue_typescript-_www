(function(e){function t(t){for(var o,r,s=t[0],c=t[1],d=t[2],l=0,f=[];l<s.length;l++)r=s[l],n[r]&&f.push(n[r][0]),n[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);p&&p(t);while(f.length)f.shift()();return a.push.apply(a,d||[]),i()}function i(){for(var e,t=0;t<a.length;t++){for(var i=a[t],o=!0,s=1;s<i.length;s++){var c=i[s];0!==n[c]&&(o=!1)}o&&(a.splice(t--,1),e=r(r.s=i[0]))}return e}var o={},n={hanjia:0},a=[];function r(t){if(o[t])return o[t].exports;var i=o[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=o,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(i,o,function(t){return e[t]}.bind(null,o));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var p=c;a.push([3,"chunk-vendors","chunk-common"]),i()})({3:function(e,t,i){e.exports=i("4af2")},"4af2":function(e,t,i){"use strict";i.r(t);i("7514"),i("cadf"),i("551c"),i("097d");var o=i("9ab4"),n=(i("eb65"),i("fdfc"),i("db4d"),i("60a3")),a=i("1157"),r=i.n(a),s=i("a925"),c=i("dfdf"),d=i("1396"),p=i("82f5"),l=i("9347"),f=i("7d83"),u=i("0a56"),h=i("a123"),g=i("b311"),_=i.n(g),y=i("d939");n["b"].config.productionTip=!1,n["b"].use(s["a"]);c["a"].getInstace(l["a"].REGION_CODE_1,l["a"].ZH_CN);var m=d["a"].getInstance();m.init();var b=new s["a"](m),v={index:-1,count:0,timer:null,speed:20,times:0,cycle:50,prize:-1,init:function(e){if(r()("#"+e).find(".hj_prize").length>0){var t=r()("#"+e),i=t.find(".hj_prize");this.obj=t,this.count=i.length,t.find(".hj_prize_"+this.index).addClass("active")}},roll:function(){var e=this.index,t=this.count,i=this.obj;return r()(i).find(".hj_prize_"+e).removeClass("active"),e+=1,e>t-1&&(e=0),r()(i).find(".hj_prize_"+e).addClass("active"),this.index=e,!1},stop:function(e){return this.prize=e,!1}},w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.activity_id=170,t.appParam=c["a"].getInstace(),t.joinleftfix=0,t.dialog_award=!1,t.dialog_guize=!1,t.dialog_no_login=!1,t.dialog_recharge=!1,t.dialog_copy_ref_link=!1,t.dialog_error=!1,t.dialog_win=!1,t.sina_link="https://weibo.com/p/1006066443936086/manage?from=page_100606&mod=TAB#place",t.dialog_msg="",t.refer_code_txt="",t}return o["c"](t,e),t.prototype.mounted=function(){v.init("prize"),this.getAwardList()},t.prototype.created=function(){this.imageHeadUrl=p["a"].getImgBaseUrl(),this.account_token=f["a"].getUserToken().account_token,this.setBaseUrl(p["a"].getBaseUrl()),this.getActivityId(),this.getActivityDetail(),this.getReferActivitys(),""==this.account_token&&(this.refer_code_txt="请先登录!")},t.prototype.onClickAward=function(){r()("body").addClass("body_fixed"),""!=this.account_token?(this.dialog_award=!0,this.getActiveRecordList(1,6)):this.dialog_award=!0},t.prototype.onClickGuize=function(){this.dialog_guize=!0,r()("body").addClass("body_fixed")},t.prototype.onCloseGuize=function(){this.dialog_guize=!1,r()("body").removeClass("body_fixed")},t.prototype.onCloseRecharge=function(){this.dialog_recharge=!1,r()("body").removeClass("body_fixed")},t.prototype.onClickDraw=function(){if(!this.isBengin){if(""==this.account_token)return r()("body").addClass("body_fixed"),void(this.dialog_no_login=!0);if(this.aCount<=0)return r()("body").addClass("body_fixed"),void(this.dialog_recharge=!0);this.isBengin=!0,this.onDraw(0,1e3)}},t.prototype.onDrawWin=function(e){this.points=e.data.points,this.getActivityCount(),v.speed=100,this.roll()},t.prototype.onDrawLose=function(e){this.isBengin=!1,this.isWin=!1,this.dialog_error=!0,this.dialog_msg=e.msg,this.points=e.data.points,this.getActivityCount()},t.prototype.continueDraw=function(){this.isBengin=!1,this.isWin=!1,this.dialog_win=!1,this.dialog_msg=""},t.prototype.gotoLogin=function(){if(this.checkEnvironment(),4==this.appParam.platform)window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcde8e099ce962bf6&redirect_uri=https://webapi.leigod.com/wap/auth&response_type=code&scope=snsapi_userinfo&state=hanjia&connect_redirect=1#wechat_redirect";else{var e="platform="+this.appParam.platform;h["a"].gotoLogin(e)}},t.prototype.checkEnvironment=function(){y["a"].isDeviceWx()?this.appParam.platform=4:y["a"].isDeviceAndroid()?this.appParam.platform=2:y["a"].isDeviceIos()?this.appParam.platform=3:this.appParam.platform=0},t.prototype.gotoRecharge=function(){if(""==this.account_token)return r()("body").addClass("body_fixed"),void(this.dialog_no_login=!0);var e="platform="+this.appParam.platform;h["a"].gotoRecharge(e)},t.prototype.generateRefercodeLink=function(e){this.refer_code_txt="邀请码： "+e,this.refer_code=e},t.prototype.copyRefercodeLink=function(){if(r()("body").addClass("body_fixed"),""!=this.account_token){var e=this,t=new _.a("#copyBtn",{text:function(){return e.refer_code}});t.on("success",function(t){t.clearSelection(),e.dialog_copy_ref_link=!0})}else this.dialog_no_login=!0},t.prototype.onCloseNologin=function(){this.dialog_no_login=!1,r()("body").removeClass("body_fixed")},t.prototype.closeDialog=function(){this.dialog_msg="",this.dialog_error=!1,this.dialog_copy_ref_link=!1,this.dialog_win=!1,this.dialog_award=!1,r()("body").removeClass("body_fixed")},t.prototype.tokenExpired=function(e){void 0===e&&(e=null),f["a"].loginOut(),this.account_token=""},t.prototype.getAwardListSuccess=function(){this.initAwardList()},t.prototype.initAwardList=function(){this.awardList.length<=5||r()(function(){setInterval(function(){var e=r()("#jilu_box");e.animate({},400,function(){e.find("li").eq(0).appendTo(e)})},2e3)})},t.prototype.roll=function(){if(v.times+=1,v.roll(),v.times>v.cycle+10&&v.prize==v.index){clearTimeout(v.timer),v.prize=-1,v.times=0;var e=this;setTimeout(function(){r()("body").addClass("body_fixed"),e.isBengin=!1,e.dialog_win=!0,e.dialog_msg=e.awardInfo.title},2e3)}else{if(v.times<v.cycle)v.speed-=10;else if(v.times==v.cycle){var t=0;switch(this.awardInfo.present_id){case 31:t=0;break;case 33:t=2;break;case 34:t=5;break;case 35:t=3;break;case 36:t=1;break;case 37:t=4;break;default:break}v.prize=t}else v.times>v.cycle+10&&2==v.prize&&3==v.index||v.prize==v.index+1?v.speed+=110:v.speed+=20;v.speed<40&&(v.speed=40),v.timer=setTimeout(this.roll,v.speed)}return!1},t=o["b"]([n["a"]],t),t}(u["a"]);new w({i18n:b}).$mount("#app")}});