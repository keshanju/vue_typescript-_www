(function(t){function i(i){for(var o,s,r=i[0],c=i[1],d=i[2],u=0,l=[];u<r.length;u++)s=r[u],a[s]&&l.push(a[s][0]),a[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);h&&h(i);while(l.length)l.shift()();return n.push.apply(n,d||[]),e()}function e(){for(var t,i=0;i<n.length;i++){for(var e=n[i],o=!0,r=1;r<e.length;r++){var c=e[r];0!==a[c]&&(o=!1)}o&&(n.splice(i--,1),t=s(s.s=e[0]))}return t}var o={},a={activity_2:0},n=[];function s(i){if(o[i])return o[i].exports;var e=o[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.m=t,s.c=o,s.d=function(t,i,e){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var o in t)s.d(e,o,function(i){return t[i]}.bind(null,o));return e},s.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=i,r=r.slice();for(var d=0;d<r.length;d++)i(r[d]);var h=c;n.push([3,"chunk-vendors","chunk-common"]),e()})({3:function(t,i,e){t.exports=e("dc31")},dc31:function(t,i,e){"use strict";e.r(i);e("0c67"),e("450d");var o=e("299c"),a=e.n(o),n=(e("a481"),e("46a1"),e("e5f2")),s=e.n(n),r=(e("1951"),e("eedf")),c=e.n(r),d=(e("cadf"),e("551c"),e("f751"),e("097d"),e("9ab4")),h=(e("8e56"),e("db4d"),e("c8d7")),u=e("a7a2"),l=e("60a3"),p=e("90ae"),f=e("53f9"),_=e("1831"),g=e("b9c5"),y=e("a925"),v=e("7d83"),k=e("b311"),b=e.n(k),w=(e("7514"),e("e814")),m=e.n(w),T=e("65d9"),C=e.n(T),D=e("a026"),E=e("a306"),L=e("9347"),R=e("3c6c"),x=e("1157"),S=e.n(x),U=function(){function t(){this.index=-1,this.count=0,this.timer=null,this.speed=20,this.times=0,this.cycle=50,this.prize=-1,this.obj=null}return t.prototype.init=function(t,i){if(S()("#"+t).find(i).length>0){var e=S()("#"+t),o=e.find(i);this.obj=e,this.count=o.length,e.find(".activity_prize_"+this.index).addClass("active")}},t.prototype.roll=function(){var t=this.index,i=this.count,e=this.obj;return S()(e).find(".activity_prize_"+t).removeClass("active"),t+=1,t>i-1&&(t=0),S()(e).find(".activity_prize_"+t).addClass("active"),this.index=t,!1},t.prototype.top=function(t){return this.prize=t,!1},t}(),I=function(t){function i(){var i=null!==t&&t.apply(this,arguments)||this;return i.activity_id=0,i.activityJson=null,i.account_token="",i.awardList=[],i.userInfo=v["a"].getUserInfo(),i.activityDetails=null,i.points=0,i.aCount=0,i.refer_code="邀请码",i.isBengin=!1,i.isWin=!1,i.awardInfo=null,i.awardRecordList=[],i.myReferList=[],i.clock=new E["l"],i.dialog_award=!1,i.dialog_guize=!1,i.dialog_no_login=!1,i.dialog_recharge=!1,i.dialog_copy_ref_link=!1,i.dialog_copy_ref=!1,i.dialog_error=!1,i.dialog_win=!1,i.refer_code_link="邀请链接",i.tabIndex=0,i.prize_name="",i.prize_img="",i.prize_id=-1,i.dialog_msg="",i.joinleftfix=0,i.luck=new U,i.http=new _["a"],i.imageHeadUrl="",i.userUrl="",i.webUrl="",i}return d["c"](i,t),i.prototype.execute=function(){},i.prototype.init=function(){},i.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},i.prototype.tokenExpired=function(t){void 0===t&&(t=null)},i.prototype.getActivityId=function(){var t=L["a"].getUrlParam("id");""!=t&&(this.activity_id=m()(t))},i.prototype.getAwardList=function(){return d["a"](this,void 0,void 0,function(){var t,i,e,o,a;return d["d"](this,function(n){switch(n.label){case 0:return 0==this.activity_id?[2]:(t=_["a"].URL_ACTIVITY_PRESENT_LIST,i=new E["h"],i.activity_id=this.activity_id,i.present_type=0,i.size=50,e=this,[4,this.http.post(t,i)]);case 1:if(e.backData=n.sent(),this.backData.code==_["a"].HTTP_SUCCESS_NET_CODE){for(o in this.awardList=this.backData.data.list,this.awardList)a="",""==a&&""!=this.awardList[o]["nickname"]&&(a=this.awardList[o]["nickname"]),""==a&&""!=this.awardList[o]["mobile_num"]&&(a=this.awardList[o]["mobile_num"]),""==a&&""!=this.awardList[o]["mail"]&&(a=this.awardList[o]["mail"]),""==a&&""!=this.awardList[o]["user_name"]&&(a=this.awardList[o]["user_name"]),this.awardList[o]["nickname"]=a;this.getAwardListSuccess()}return[2]}})})},i.prototype.getAwardListSuccess=function(){this.initAwardList()},i.prototype.getActivityDetail=function(){return d["a"](this,void 0,void 0,function(){var t,i,e;return d["d"](this,function(o){switch(o.label){case 0:return""==this.account_token?[2]:0==this.activity_id?[2]:(t=_["a"].URL_ACTIVITY_DETAIL+this.activity_id,i=new E["a"],i.type=1,i.id=this.activity_id,i.plat_type=1,i.region_code=v["a"].getRegionCodes(),i.account_token=this.account_token,e=this,[4,this.http.get(t,i)]);case 1:return e.backData=o.sent(),this.backData.code==_["a"].HTTP_SUCCESS_NET_CODE?(this.activityDetails=this.backData.data.detail,this.points=this.backData.data.points,this.getActivityCount()):this.backData.code==_["a"].HTTP_TOKEN_EXPIRE&&this.tokenExpired(),[2]}})})},i.prototype.getClock=function(t){var i=new Date(t.replace(/\-/g,"/")).getTime()-(new Date).getTime(),e=Math.floor(i/864e5),o=i%864e5,a=Math.floor(o/36e5),n=o%36e5,s=Math.floor(n/6e4),r=n%6e4,c=Math.round(r/1e3);c<0&&(c=0);var d={seconds:c,minutes:0,hours:0,days:0};return s<0&&(s=0),s>=0&&(d.minutes=s),a<0&&(a=0),a>=0&&(d.hours=a),e<0&&(e=0),e>=0&&(d.days=e),d},i.prototype.getActivityCount=function(){this.aCount=Math.floor(this.points/this.activityDetails.fee)},i.prototype.getReferActivitys=function(){return d["a"](this,void 0,void 0,function(){var t,i,e,o,a,n,s;return d["d"](this,function(r){switch(r.label){case 0:return""==this.account_token?[2]:(t=_["a"].URL_USER_REFER_ACTIVITY,i={account_token:this.account_token},e=this,[4,this.http.get(t,i)]);case 1:if(e.backData=r.sent(),this.backData.code==_["a"].HTTP_SUCCESS_NET_CODE){for(s in o=this.backData.data,a=null,n=null,o)if(a=o[s].activity_info,n=o[s].user_code,a.id==this.activity_id){n.length<=0?this.getRefercode(a.type):(this.refer_code=n.refer_code,this.generateRefercodeLink(this.refer_code));break}}else this.backData.code==_["a"].HTTP_TOKEN_EXPIRE&&this.tokenExpired();return[2]}})})},i.prototype.getReferList=function(t){return d["a"](this,void 0,void 0,function(){var i,e,o;return d["d"](this,function(a){switch(a.label){case 0:return""==this.account_token?[2]:(i=_["a"].URL_ACTIVITY_REFER_LIST,e=new E["k"],e.account_token=this.account_token,e.activity_id=this.activity_id,e.type=t,o=this,[4,this.http.post(i,e)]);case 1:return o.backData=a.sent(),this.backData.code==_["a"].HTTP_SUCCESS_NET_CODE?(this.myReferList=this.backData.data.list,this.getReferListSuccess()):this.backData.code==_["a"].HTTP_TOKEN_EXPIRE&&this.tokenExpired(),[2]}})})},i.prototype.getRefercode=function(t){return d["a"](this,void 0,void 0,function(){var i,e,o;return d["d"](this,function(a){switch(a.label){case 0:return i=_["a"].URL_USER_REFER,e=new R["q"],e.activity_id=this.activity_id,e.type=t,e.account_token=this.account_token,o=this,[4,this.http.post(i,e)];case 1:return o.backData=a.sent(),this.backData.code==_["a"].HTTP_SUCCESS_NET_CODE&&(this.refer_code=this.backData.data.refer_code,this.generateRefercodeLink(this.refer_code)),[2]}})})},i.prototype.generateRefercodeLink=function(t){},i.prototype.onDraw=function(t,i){return void 0===t&&(t=0),void 0===i&&(i=0),d["a"](this,void 0,void 0,function(){var e,o,a,n,s;return d["d"](this,function(r){switch(r.label){case 0:return e=_["a"].URL_ACTIVITY_DRAW,o=this.account_token,a=new E["b"],a.activity_id=this.activity_id,a.account_token=o,n=this,[4,this.http.post(e,a)];case 1:return n.backData=r.sent(),s=this,this.backData.code==_["a"].HTTP_SUCCESS_NET_CODE?(this.awardInfo=this.backData.data,setTimeout(function(){s.onDrawWin(s.backData)},t)):this.backData.code==_["a"].HTTP_TOKEN_EXPIRE?this.tokenExpired():setTimeout(function(){s.onDrawLose(s.backData)},i),[2]}})})},i.prototype.getActiveRecordList=function(t,i){return void 0===t&&(t=1),void 0===i&&(i=50),d["a"](this,void 0,void 0,function(){var e,o,a;return d["d"](this,function(n){switch(n.label){case 0:return""==this.account_token?[2]:(null==t&&(t=1),e=_["a"].URL_USER_PRIZE_LIST,o=new R["c"],o.account_token=this.account_token,o.page=t,o.size=i,a=this,[4,this.http.post(e,o)]);case 1:return a.backData=n.sent(),this.backData.code==_["a"].HTTP_SUCCESS_NET_CODE?(this.awardRecordList=this.backData.data.list,this.awardRecordListSuccess()):this.backData.code==_["a"].HTTP_TOKEN_EXPIRE&&this.tokenExpired(),[2]}})})},i.prototype.onDrawWin=function(t){var i=this;if(1==this.activityJson.choujiang_type&&(this.luck.speed=100,this.roll()),0==this.activityJson.choujiang_type&&(console.log(t),this.isBengin=!1,this.dialog_win=!0,this.prize_name=t.data.title,this.prize_id=t.data.present_id),2==this.activityJson.choujiang_type){var e=Math.ceil(3*Math.random())+5,o=0;switch(t.data.present_id){case 67:o=45*Math.random()+22.5;break;case 68:o=45*Math.random()+67.5;break;case 65:o=45*Math.random()+112.5;break;case 62:o=45*Math.random()+157.5;break;case 66:o=45*Math.random()+202.5;break;case 69:o=45*Math.random()+247.5;break;case 63:o=45*Math.random()+292.5;break;case 64:o=45*Math.random()+337.5;break}S()("#roll_table").css({transform:"rotate("+(360*e+o)+"0deg)",transition:"4s"}),setTimeout(function(){i.dialog_win=!0,i.isBengin=!1},4e3),this.prize_name=t.data.title,this.prize_id=t.data.present_id}this.points=t.data.points,this.getActivityCount(),this.getActiveRecordList()},i.prototype.getReferListSuccess=function(){},i.prototype.awardRecordListSuccess=function(){},i.prototype.onDrawLose=function(t){this.isBengin=!1,this.isWin=!1,this.dialog_error=!0,this.dialog_msg=t.msg,this.points=t.data.points,this.getActivityCount()},i.prototype.onClickAward=function(){S()("body").addClass("body_fixed"),""!=this.account_token?(this.dialog_award=!0,this.getActiveRecordList(1,6)):this.dialog_no_login=!0},i.prototype.changeTabPage=function(t){this.tabIndex=t,1==this.tabIndex&&this.getActiveRecordList()},i.prototype.onClickGuize=function(){this.dialog_guize=!0,S()("body").addClass("body_fixed")},i.prototype.onCloseGuize=function(){this.dialog_guize=!1,S()("body").removeClass("body_fixed")},i.prototype.onCloseRecharge=function(){this.dialog_recharge=!1,S()("body").removeClass("body_fixed")},i.prototype.onCloseNologin=function(){this.dialog_no_login=!1,S()("body").removeClass("body_fixed")},i.prototype.closeDialog=function(){this.isWin=!1,this.dialog_msg="",this.dialog_error=!1,this.dialog_win=!1,this.dialog_award=!1,S()("body").removeClass("body_fixed"),S()("#roll_table").css({transform:"rotate(0deg)",transition:"0s"})},i.prototype.clickFudai=function(t){return""==this.account_token?(S()("body").addClass("body_fixed"),void(this.dialog_no_login=!0)):this.points<t?(S()("body").addClass("body_fixed"),void(this.dialog_recharge=!0)):void 0},i.prototype.continueDraw=function(){this.isBengin=!1,this.isWin=!1,this.dialog_win=!1,this.dialog_msg=""},i.prototype.copyRefercodeLink=function(){if(S()("body").addClass("body_fixed"),""!=this.account_token){var t=this,i=new b.a("#copyRefercodeLink",{text:function(){return t.refer_code_link}});i.on("success",function(i){i.clearSelection(),t.dialog_error=!0,t.dialog_msg="邀请链接已复制到剪切板！快去邀请好友注册获取抽奖机会吧！"})}else this.dialog_no_login=!0},i.prototype.copyRefercode=function(){if(S()("body").addClass("body_fixed"),""!=this.account_token){var t=this,i=new b.a("#copyRefercode",{text:function(){return t.refer_code}});i.on("success",function(i){i.clearSelection(),t.dialog_error=!0,t.dialog_msg="邀请码已复制到剪切板！快去邀请好友注册获取抽奖机会吧！"})}else this.dialog_no_login=!0},i.prototype.initAwardList=function(){this.awardList.length<=3||S()(function(){setInterval(function(){var t=S()("#jilu_box");t.animate({marginTop:"-18px"},400,function(){t.find("li").eq(0).appendTo(t),t.css("margin-top","0")})},2e3)})},i.prototype.pageScroll=function(t){var i=L["a"].scroll().top;this.joinleftfix=i<t?0:1},i.prototype.onClickDraw=function(){if(!this.isBengin){if(""==this.account_token)return S()("body").addClass("body_fixed"),void(this.dialog_no_login=!0);if(this.aCount<=0)return S()("body").addClass("body_fixed"),void(this.dialog_recharge=!0);this.isBengin=!0,this.isWin=!0,this.onDraw(1e3,1e3)}},i.prototype.roll=function(){if(this.luck.times+=1,this.luck.roll(),this.luck.times>this.luck.cycle+10&&this.luck.prize==this.luck.index){clearTimeout(this.luck.timer),this.luck.prize=-1,this.luck.times=0;var t=this;setTimeout(function(){S()("body").addClass("body_fixed"),t.isBengin=!1,t.dialog_win=!0,t.dialog_msg=t.awardInfo.title},2e3)}else{if(this.luck.times<this.luck.cycle)this.luck.speed-=10;else if(this.luck.times==this.luck.cycle){var i=4;switch(this.awardInfo.present_id){case 44:i=0;break;case 45:i=2;break;case 46:i=3;break;case 47:i=1;break;case 48:i=5;break;case 49:i=4;break;default:break}this.luck.prize=i}else this.luck.times>this.luck.cycle+10&&0==this.luck.prize&&7==this.luck.index||this.luck.prize==this.luck.index+1?this.luck.speed+=110:this.luck.speed+=20;this.luck.speed<40&&(this.luck.speed=40),this.luck.timer=setTimeout(this.roll,this.luck.speed)}return!1},i=d["b"]([C.a],i),i}(D["default"]),P=I,A=e("d939");l["c"].config.productionTip=!1,l["c"].use(y["a"]),l["c"].use(c.a),l["c"].prototype.$notify=s.a;var z=p["a"].getInstance();z.init();var O=new y["a"](z),M=function(t){function i(){var i=null!==t&&t.apply(this,arguments)||this;return i.activity_id=5,i.webParam=g["a"].getInstace(),i.imageHeadUrl="",i.windowsDownloadUrl="",i.macDownloadUrl="",i.http=new _["a"],i.isUserLogin=!1,i}return d["c"](i,t),i.prototype.created=function(){return d["a"](this,void 0,void 0,function(){return d["d"](this,function(t){return this.setBaseUrl(f["a"].getBaseUrl()),this.imageHeadUrl=f["a"].getImgBaseUrl(),this.language=v["a"].getLanguage(),this.getActivityId(),this.account_token=v["a"].getUserToken().account_token,this.getReferActivitys(),""!=this.account_token&&(this.isUserLogin=!0),[2]})})},i.prototype.mounted=function(){var t=this;this.$nextTick(function(){t.$refs.headerNav.pageName="activity.html"})},i.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},i.prototype.goToLogin=function(){A["a"].backLogin()},i.prototype.onChangeLanguage=function(t){z.changeLanguage(t),O.locale=z.locale,f["a"].log("切换语言:"+z.locale),this.language=t},i.prototype.getText=function(){var t=this;this.account_token?(void 0==this.clipboard&&(t.clipboard=new b.a("#activty_detail_copyBtn",{text:function(){return document.getElementById("activty_detail_tip").innerText}})),t.clipboard.on("success",function(i){i.clearSelection(),t.$notify({title:t.$t("pvideoshow.v8"),message:t.$t("notify.y9"),type:"warning"})}),t.clipboard.e&&(t.clipboard.e.success=[t.clipboard.e.success[0]])):this.$notify({title:t.$t("pvideoshow.v8"),message:t.$t("pvideoshow.v12"),type:"warning"})},i.prototype.onDownloadConfig=function(t){var i=t.bohe.down_platform[this.webParam.from];this.windowsDownloadUrl=i.windows.download_url,this.macDownloadUrl=i.mac.download_url},i.prototype.goToActivty1=function(){window.open(window.location.href.replace("activity_2.html","activity_1.html"))},i=d["b"]([Object(l["a"])({components:{"head-nav":h["a"],"foot-nav":u["a"],"el-tooltip":a.a}})],i),i}(P);new M({i18n:O}).$mount("#app")}});