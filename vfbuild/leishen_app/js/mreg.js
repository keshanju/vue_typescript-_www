(function(e){function t(t){for(var o,n,r=t[0],c=t[1],h=t[2],p=0,_=[];p<r.length;p++)n=r[p],a[n]&&_.push(a[n][0]),a[n]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);g&&g(t);while(_.length)_.shift()();return s.push.apply(s,h||[]),i()}function i(){for(var e,t=0;t<s.length;t++){for(var i=s[t],o=!0,r=1;r<i.length;r++){var c=i[r];0!==a[c]&&(o=!1)}o&&(s.splice(t--,1),e=n(n.s=i[0]))}return e}var o={},a={mreg:0},s=[];function n(t){if(o[t])return o[t].exports;var i=o[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=o,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var h=0;h<r.length;h++)t(r[h]);var g=c;s.push([29,"chunk-vendors","chunk-common"]),i()})({29:function(e,t,i){e.exports=i("50ab")},"50ab":function(e,t,i){"use strict";i.r(t);i("c5f6"),i("3208");var o=i("c0b2"),a=(i("3c32"),i("417e")),s=(i("e7e5"),i("d399")),n=(i("5f5f"),i("f253")),r=(i("bda7"),i("5e46")),c=(i("da3c"),i("0b33")),h=i("9ab4"),g=i("60a3"),p=(i("3a9e"),i("9788"),i("968a"),i("4dfd")),_=i("9347"),d=i("82f5"),u=i("b971"),T=i("9d9a"),E=i("a925"),f=i("dfdf"),O=i("1396"),l=i("a123"),C=i("255e"),m=i("7d83");g["b"].use(c["a"]),g["b"].use(r["a"]),g["b"].use(n["a"]),g["b"].use(s["a"]),g["b"].use(a["a"]),g["b"].use(o["a"]),g["b"].use(E["a"]);var M=f["a"].getInstace(_["a"].REGION_CODE_1,_["a"].ZH_CN),R=O["a"].getInstance();R.initNoRefresh();new E["a"](R);var P=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.appParam=f["a"].getInstace(),t.AreaCodeshow=!1,t.region_code=1,t.showVioceCode=0,t.state_html=_["a"].getUrlParam("state_html")||"",t.logincode=_["a"].getUrlParam("code")||"",t}return h["c"](t,e),t.prototype.created=function(){this.setBaseUrl(d["a"].getBaseUrl()),this.init(),this.registerIsCaptcha()},t.prototype.init=function(){this.getAreaCodeList(),this.getDownloadUrl(),this.onGetPackage(1),this.getReferCode()},t.prototype.getReferCode=function(){this.referCode=_["a"].getUrlParam("refer_code")},t.prototype.getcode=function(){return h["a"](this,void 0,void 0,function(){var e;return h["d"](this,function(t){switch(t.label){case 0:return[4,C["a"].getInstance().getRegincode()];case 1:return e=t.sent(),this.region_code=e,m["a"].addRegionCode(this.region_code),[2]}})})},t.prototype.getDownloadUrl=function(){return h["a"](this,void 0,void 0,function(){var e,t,i;return h["d"](this,function(o){switch(o.label){case 0:return[4,C["a"].getInstance().download()];case 1:return e=o.sent(),t=m["a"].getRegionCodes(),null!=e&&(i=e.leigod[t].register,this.isShowEmail=Number(i.is_email)),[2]}})})},t.prototype.changeAreaCode=function(){this.AreaCodeshow=!0},t.prototype.cancleAreaCode=function(){this.AreaCodeshow=!1},t.prototype.changeResignType=function(e){this.resignType=e,this.isimgVerification=0,this.registerIsCaptcha(),this.agreementChceked=!1},t.prototype.onCheckAreaCode=function(e){this.countryCode=e,this.AreaCodeshow=!1},t.prototype.getCaptcha=function(){this.onGetCaptcha()},t.prototype.onSmsCode=function(){var e=!0,t="";"86"==this.countryCode&&!u["a"].checkPhone(this.phone)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_ERROR),e=!1,""==this.phone&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_EMPTY),e=!1)),1==this.isimgVerification&&!u["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),e=!1,""==this.imgCaptchaCode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),e=!1)),e?this.onGetSmscode(0,2):Object(s["a"])(t)},t.prototype.onVoiceCode=function(){return this.notifTitle=T["a"].getTipsMsg(T["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning","86"!=this.countryCode||u["a"].checkPhone(this.phone)?1!=this.isimgVerification||u["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetSmscode(1,2):""==this.imgCaptchaCode?(this.notifMessage=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),Object(s["a"])(this.notifMessage),!1):(this.notifMessage=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),Object(s["a"])(this.notifMessage),!1):""==this.phone?(this.notifMessage=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_EMPTY),Object(s["a"])(this.notifMessage),!1):(this.notifMessage=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_ERROR),Object(s["a"])(this.notifMessage),!1)},t.prototype.onGetSmscodeSuccess=function(){Object(s["a"])(T["a"].getTipsMsg(T["a"].KEY_NOTIF_SMS)),this.smsCountDownNum=60;var e=this;_["a"].countDown(this.smsCountDownNum,1,function(t){e.smsCountDownNum=t}),this.showVioceCode=1},t.prototype.onGetSmscodeFaild=function(e){Object(s["a"])(e.msg)},t.prototype.onEmailCode=function(){var e=!0,t="";!u["a"].checkEmail(this.email)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAIL_ERROR),e=!1,""==this.email&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAIL_EMPTY),e=!1)),1==this.isimgVerification&&!u["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),e=!1,""==this.imgCaptchaCode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),e=!1)),e?this.onGetEmailcode(2):Object(s["a"])(t)},t.prototype.onGetEmailcodeSuccess=function(){Object(s["a"])(T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAIL)),this.emailCountDownNum=60;var e=this;_["a"].countDown(this.emailCountDownNum,1,function(t){e.emailCountDownNum=t})},t.prototype.onGetEmailcodeFaild=function(e){Object(s["a"])(e.msg)},t.prototype.clickRegister=function(){switch(this.resignType){case 0:this.onClickPhoneReg();break;case 1:this.onClickEmailReg();break}},t.prototype.onClickPhoneReg=function(){var e=!0,t="";if("86"==this.countryCode&&!u["a"].checkPhone(this.phone)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_ERROR),e=!1,""==this.phone&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_EMPTY),e=!1)),1==this.isimgVerification&&!u["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),e=!1,""==this.imgCaptchaCode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),e=!1)),!u["a"].checkSmscode(this.smscode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_SMSCODE_ERROR),e=!1,""==this.smscode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_SMSCODE_EMPTY),e=!1)),!u["a"].checkPwd(this.phonePassword)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_ERROR),e=!1,""==this.phonePassword&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_EMPTY),e=!1)),!u["a"].checkPwdTwo(this.phonePasswordTwo,this.phonePassword)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORDTWO_ERROR),e=!1,""==this.phonePasswordTwo&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_EMPTY),e=!1)),!this.agreementChceked&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_READAGREEMENT),e=!1),e){var i=5;this.onPhoneRegister(i)}else Object(s["a"])(t)},t.prototype.onClickEmailReg=function(){var e=!0,t="";if(!u["a"].checkEmail(this.email)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAIL_ERROR),e=!1,""==this.email&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAIL_EMPTY),e=!1)),1==this.isimgVerification&&!u["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),e=!1,""==this.imgCaptchaCode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),e=!1)),!u["a"].checkSmscode(this.emailcode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAILCODE_ERROR),e=!1,""==this.emailcode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAILCODE_EMPTY),e=!1)),!u["a"].checkPwd(this.emailPassword)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_ERROR),e=!1,""==this.phonePassword&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_EMPTY),e=!1)),!u["a"].checkPwdTwo(this.emailPasswordTwo,this.emailPassword)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORDTWO_ERROR),e=!1,""==this.phonePasswordTwo&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_EMPTY),e=!1)),!this.agreementChceked&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_READAGREEMENT),e=!1),e){var i=5;this.onEmaillRegister(i)}else Object(s["a"])(t)},t.prototype.onRegisterSuccess=function(){var e=this;this.notifTitle=T["a"].getTipsMsg(T["a"].KEY_NOTIF_REGISTER),Object(s["a"])(this.notifTitle),setTimeout(function(){e.gotologin()},3e3)},t.prototype.onRegisterFaild=function(e){Object(s["a"])(e.msg)},t.prototype.gotologin=function(){var e="";e=this.logincode?"platform="+M.platform+"&code="+this.logincode+"&state_html="+this.state_html:"platform="+M.platform,l["a"].gotoLogin(e)},t.prototype.gotoitems=function(){var e="platform="+M.platform;l["a"].gotoItems(e)},t=h["b"]([Object(g["a"])({})],t),t}(p["a"]);new P({}).$mount("#app")}});