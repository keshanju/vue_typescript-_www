(function(t){function e(e){for(var a,n,c=e[0],r=e[1],h=e[2],p=0,_=[];p<c.length;p++)n=c[p],s[n]&&_.push(s[n][0]),s[n]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);g&&g(e);while(_.length)_.shift()();return o.push.apply(o,h||[]),i()}function i(){for(var t,e=0;e<o.length;e++){for(var i=o[e],a=!0,c=1;c<i.length;c++){var r=i[c];0!==s[r]&&(a=!1)}a&&(o.splice(e--,1),t=n(n.s=i[0]))}return t}var a={},s={forgetpwd:0},o=[];function n(e){if(a[e])return a[e].exports;var i=a[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=a,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(i,a,function(e){return t[e]}.bind(null,a));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=e,c=c.slice();for(var h=0;h<c.length;h++)e(c[h]);var g=r;o.push([7,"chunk-vendors","chunk-common"]),i()})({"3fa6":function(t,e,i){"use strict";i.r(e);i("be4f"),i("450d");var a=i("896a"),s=i.n(a),o=(i("6611"),i("e772")),n=i.n(o),c=(i("1f1a"),i("4e4b")),r=i.n(c),h=(i("46a1"),i("e5f2")),g=i.n(h),p=(i("cadf"),i("551c"),i("097d"),i("9ab4")),_=(i("76ca"),i("db4d"),i("60a3")),T=i("abf2"),E=i("a925"),d=(i("6b54"),i("4dfd")),u=i("1831"),m=i("3c6c"),l=i("9127"),O=i("9d9a"),f=i("7d83"),I=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.http=new u["a"],e.checkUserValue=0,e}return p["c"](e,t),e.prototype.onPhoneFindPassword=function(){var t=u["a"].URL_AUTH_RETRIEVE,e=new m["q"];e.phone=this.phone,e.password=l["Md5"].hashStr(this.phonePassword).toString(),e.country_code=this.countryCode,e.smscode=this.smscode,e.smscode_key=this.smsCapchaM.smscode_key,e.checkcode=this.imgCaptchaCode,e.checkcode_key=this.imgCaptchaM.key,this.onRetrieve(t,e)},e.prototype.onEmailFindPassword=function(){var t=u["a"].URL_AUTH_RETRIEVE,e=new m["h"];e.email=this.email,e.password=l["Md5"].hashStr(this.emailPassword).toString(),e.mailcode=this.emailcode,e.mailcode_key=this.emailCapchaM.emailcode_key,e.checkcode=this.imgCaptchaCode,e.checkcode_key=this.imgCaptchaM.key,this.onRetrieve(t,e)},e.prototype.onRetrieve=function(t,e){return p["a"](this,void 0,void 0,function(){var i;return p["d"](this,function(a){switch(a.label){case 0:return this.isLoading=!0,this.loadingMsg=O["a"].getTipsMsg(O["a"].KEY_LOADING),i=this,[4,this.http.post(t,e)];case 1:return i.backData=a.sent(),this.backData.code==u["a"].HTTP_SUCCESS_NET_CODE?(this.isLoading=!1,localStorage.removeItem(f["a"].STORAGES_PHONE),localStorage.removeItem(f["a"].STORAGES_EMAIL),localStorage.removeItem(f["a"].STORAGES_PHONE_PW),localStorage.removeItem(f["a"].STORAGES_EMAIL_PW),localStorage.removeItem(f["a"].STORAGES_PW),this.onFindPwdSuccess()):(this.isLoading=!1,this.onFindPwdFaild(this.backData),this.isimgVerification=1,this.onGetCaptcha()),[2]}})})},e.prototype.onFindPwdSuccess=function(){},e.prototype.onFindPwdFaild=function(t){},e.prototype.FindUserIsExist=function(t){return p["a"](this,void 0,void 0,function(){var e,i,a,s;return p["d"](this,function(o){switch(o.label){case 0:return e=u["a"].URL_USER_CHECK_PSW_ISEXIST,i={account:t},a=this,[4,this.http.post(e,i)];case 1:return a.backData=o.sent(),this.backData.code==u["a"].HTTP_SUCCESS_NET_CODE?(s=this.backData.data,[2,s.is_exist]):[2]}})})},e=p["b"]([_["a"]],e),e}(d["a"]),C=i("9453"),R=i("b971"),M=i("9347"),y=i("d939"),P=i("dfdf"),w=i("5f2d"),S=i("a306");_["c"].prototype.$notify=g.a,_["c"].use(r.a),_["c"].use(n.a),_["c"].use(s.a),_["c"].config.productionTip=!1,_["c"].use(E["a"]);P["a"].getInstace(M["a"].REGION_CODE_1,M["a"].ZH_CN);var N=w["a"].getInstance();N.init();var Y=new E["a"](N),F=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.webParam=P["a"].getInstace(),e.activityInfo=new S["a"],e.bannerImg="",e.activeLink="",e.imageHeadUrl="",e}return p["c"](e,t),e.prototype.created=function(){this.setBaseUrl(C["a"].getBaseUrl()),this.changeResignType(2),this.imageHeadUrl=C["a"].getImgBaseUrl(),this.getActivityInfo(),this.init()},e.prototype.changeResignType=function(t){this.onChangeRegisterType(t)},e.prototype.getActivityInfo=function(){return p["a"](this,void 0,void 0,function(){var t,e,i,a;return p["d"](this,function(s){switch(s.label){case 0:return t=u["a"].URL_ACTIVITY_PICTURE_LIST,e=new S["b"],e.region_code=this.webParam.region_code,i=this,[4,this.http.post(t,e)];case 1:return i.backData=s.sent(),this.backData.code==u["a"].HTTP_SUCCESS_NET_CODE&&(a=this.backData.data,this.activityInfo=a[0],this.activityInfo&&(this.bannerImg=this.activityInfo.imgs.filter(function(t,e){return 0==t.key})[0].img_url),""!=this.bannerImg&&(this.bannerImg=this.imageHeadUrl+this.bannerImg)),[2]}})})},e.prototype.onChangeLanguage=function(t){N.changeLanguage(t),Y.locale=N.locale,this.webParam.language=t},e.prototype.goHome=function(){y["a"].userGotoWeb(C["a"].getWebBaseUrl(),y["a"].HTML_NAME_INDEX)},e.prototype.goLogin=function(){y["a"].wapJump(C["a"].getUserBaseUrl(),y["a"].HTML_NAME_LOGIN)},e.prototype.goActivityDetail=function(t){1==t.url_type?window.open(t.url):y["a"].userGotoWeb(C["a"].getWebBaseUrl(),y["a"].HTML_NAME_DETAILS_ACTIVITY+t.id+".html")},e.prototype.onSelectCountryCode=function(t){this.countryCode=t},e.prototype.getCaptcha=function(){this.onGetCaptcha()},e.prototype.onSmsCode=function(){var t=!0,e="";this.smsCountDownNum>0?this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:O["a"].getTipsMsg(O["a"].KEY_WAITING),type:"warning"}):("86"==this.countryCode&&!R["a"].checkPhone(this.phone)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)),1==this.isimgVerification&&!R["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),t?this.onGetSmscode(0,1):this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"}))},e.prototype.onVoiceCode=function(){var t=!0,e="";"86"==this.countryCode&&!R["a"].checkPhone(this.phone)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)),1==this.isimgVerification&&!R["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),t?this.onGetSmscode(1,1):this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"})},e.prototype.onGetSmscodeSuccess=function(){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_SUCCESS_TITLE),message:O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMS),type:"success"}),this.smsCountDownNum=60;var t=this;M["a"].countDown(this.smsCountDownNum,1,function(e){t.smsCountDownNum=e})},e.prototype.onGetSmscodeFaild=function(t){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:t.msg,type:"warning"})},e.prototype.onEmailCode=function(){var t=!0,e="";this.smsCountDownNum>0?this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:O["a"].getTipsMsg(O["a"].KEY_WAITING),type:"warning"}):(!R["a"].checkEmail(this.email)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_ERROR),t=!1,""==this.email&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_EMPTY),t=!1)),1==this.isimgVerification&&!R["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),t?this.onGetEmailcode(1):this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"}))},e.prototype.onGetEmailcodeSuccess=function(){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_SUCCESS_TITLE),message:O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL),type:"success"}),this.emailCountDownNum=60;var t=this;M["a"].countDown(this.emailCountDownNum,1,function(e){t.emailCountDownNum=e})},e.prototype.onGetEmailcodeFaild=function(t){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:t.msg,type:"warning"})},e.prototype.clickFindPassword=function(){switch(this.resignType){case 2:this.onClickPhoneReg();break;case 3:this.onClickEmailReg();break}},e.prototype.onClickPhoneReg=function(){var t=!0,e="";"86"==this.countryCode&&!R["a"].checkPhone(this.phone)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)),1==this.isimgVerification&&!R["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),!R["a"].checkSmscode(this.smscode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMSCODE_ERROR),t=!1,""==this.smscode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMSCODE_EMPTY),t=!1)),!R["a"].checkPwd(this.phonePassword)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_ERROR),t=!1,""==this.phonePassword&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),!R["a"].checkPwdTwo(this.phonePasswordTwo,this.phonePassword)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORDTWO_ERROR),t=!1,""==this.phonePasswordTwo&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),t?this.onPhoneFindPassword():this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"})},e.prototype.onClickEmailReg=function(){var t=!0,e="";!R["a"].checkEmail(this.email)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_ERROR),t=!1,""==this.email&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_EMPTY),t=!1)),1==this.isimgVerification&&!R["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),!R["a"].checkSmscode(this.emailcode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAILCODE_ERROR),t=!1,""==this.emailcode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAILCODE_EMPTY),t=!1)),!R["a"].checkPwd(this.emailPassword)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_ERROR),t=!1,""==this.emailPassword&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),!R["a"].checkPwdTwo(this.emailPasswordTwo,this.emailPassword)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORDTWO_ERROR),t=!1,""==this.emailPasswordTwo&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),t?this.onEmailFindPassword():this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"})},e.prototype.onFindPwdSuccess=function(){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_SUCCESS_TITLE),message:O["a"].getTipsMsg(O["a"].KEY_NOTIF_FINDPWD),type:"success"});var t=this;setTimeout(function(){t.isLoading=!1,y["a"].wapJump(C["a"].getUserBaseUrl(),y["a"].HTML_NAME_LOGIN)},1500)},e.prototype.onFindPwdFaild=function(t){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:t.msg,type:"warning"})},e=p["b"]([Object(_["a"])({components:{"foot-nav-two":T["a"]}})],e),e}(I);new F({i18n:Y}).$mount("#app")},7:function(t,e,i){t.exports=i("3fa6")}});