(function(e){function t(t){for(var i,n,c=t[0],r=t[1],h=t[2],p=0,d=[];p<c.length;p++)n=c[p],a[n]&&d.push(a[n][0]),a[n]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);g&&g(t);while(d.length)d.shift()();return s.push.apply(s,h||[]),o()}function o(){for(var e,t=0;t<s.length;t++){for(var o=s[t],i=!0,c=1;c<o.length;c++){var r=o[c];0!==a[r]&&(i=!1)}i&&(s.splice(t--,1),e=n(n.s=o[0]))}return e}var i={},a={mreg:0},s=[];function n(t){if(i[t])return i[t].exports;var o=i[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=i,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=t,c=c.slice();for(var h=0;h<c.length;h++)t(c[h]);var g=r;s.push([24,"chunk-vendors","chunk-common"]),o()})({24:function(e,t,o){e.exports=o("50ab")},"50ab":function(e,t,o){"use strict";o.r(t);o("6b54"),o("c5f6"),o("8a58");var i=o("e41f"),a=(o("3c32"),o("417e")),s=(o("ac1e"),o("543e")),n=(o("e7e5"),o("d399")),c=(o("5f5f"),o("f253")),r=(o("bda7"),o("5e46")),h=(o("da3c"),o("0b33")),g=(o("cadf"),o("551c"),o("f751"),o("097d"),o("9ab4")),p=o("60a3"),d=(o("968a"),o("4dfd")),u=o("9347"),_=o("82f5"),E=o("b971"),T=o("9d9a"),l=o("a925"),f=o("dfdf"),O=o("1396"),m=o("a123"),C=o("255e"),M=o("7d83"),R=o("7278"),P=o("6821f"),I=o.n(P),N=o("a773");p["c"].use(h["a"]),p["c"].use(r["a"]),p["c"].use(c["a"]),p["c"].use(n["a"]),p["c"].use(s["a"]),p["c"].use(a["a"]),p["c"].use(i["a"]),p["c"].use(l["a"]);var w=f["a"].getInstace(u["a"].REGION_CODE_1,u["a"].ZH_CN),y=O["a"].getInstance();y.initNoRefresh();new l["a"](y);var Y=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.appParam=f["a"].getInstace(),t.AreaCodeshow=!1,t.region_code=1,t.agreementChceked=!0,t.showVioceCode=0,t.state_html=u["a"].getUrlParam("state_html")||"",t.logincode=u["a"].getUrlParam("code")||"",t.country={code:"",group:"",ico:"",iso_code:"",name:""},t}return g["c"](t,e),t.prototype.created=function(){this.setBaseUrl(_["a"].getBaseUrl()),this.init(),this.registerIsCaptcha()},t.prototype.init=function(){return g["a"](this,void 0,void 0,function(){return g["d"](this,function(e){switch(e.label){case 0:return[4,this.getAreaCodeInfoList(_["a"].getWebBaseUrl())];case 1:return e.sent(),this.country=this.country_code,this.countryCode=this.country.code,this.getDownloadUrl(),this.onGetPackage(1),this.getReferCode(),[2]}})})},t.prototype.getReferCode=function(){this.referCode=u["a"].getUrlParam("refer_code")},t.prototype.getcode=function(){return g["a"](this,void 0,void 0,function(){var e;return g["d"](this,function(t){switch(t.label){case 0:return[4,C["a"].getInstance().getRegincode()];case 1:return e=t.sent(),this.region_code=e,M["a"].addRegionCode(this.region_code),[2]}})})},t.prototype.getDownloadUrl=function(){return g["a"](this,void 0,void 0,function(){var e,t,o;return g["d"](this,function(i){switch(i.label){case 0:return[4,C["a"].getInstance().download()];case 1:return e=i.sent(),t=M["a"].getRegionCodes(),null!=e&&(o=e.leigod[t].register,this.isShowEmail=Number(o.is_email)),[2]}})})},t.prototype.changeAreaCode=function(){this.AreaCodeshow=!0},t.prototype.cancleAreaCode=function(){this.AreaCodeshow=!1},t.prototype.getcountry=function(e){this.country=e,this.countryCode=e.code,this.AreaCodeshow=!1},t.prototype.changeResignType=function(e){this.resignType=e,this.isimgVerification=0,this.registerIsCaptcha()},t.prototype.onCheckAreaCode=function(e){this.countryCode=e,this.AreaCodeshow=!1},t.prototype.getCaptcha=function(){this.onGetCaptcha()},t.prototype.onSmsCode=function(){var e=!0,t="";"86"==this.countryCode?!E["a"].checkPhone(this.phone)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_ERROR),e=!1,""==this.phone&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_EMPTY),e=!1)):""==this.phone&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_EMPTY),e=!1),1==this.isimgVerification&&!E["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),e=!1,""==this.imgCaptchaCode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),e=!1)),e?this.onGetSmscode(0,2):Object(n["a"])(t)},t.prototype.onVoiceCode=function(){return this.notifTitle=T["a"].getTipsMsg(T["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning","86"!=this.countryCode||E["a"].checkPhone(this.phone)?1!=this.isimgVerification||E["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetSmscode(1,2):""==this.imgCaptchaCode?(this.notifMessage=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),Object(n["a"])(this.notifMessage),!1):(this.notifMessage=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),Object(n["a"])(this.notifMessage),!1):""==this.phone?(this.notifMessage=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_EMPTY),Object(n["a"])(this.notifMessage),!1):(this.notifMessage=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_ERROR),Object(n["a"])(this.notifMessage),!1)},t.prototype.onGetSmscodeSuccess=function(){Object(n["a"])(T["a"].getTipsMsg(T["a"].KEY_NOTIF_SMS)),this.smsCountDownNum=60;var e=this;u["a"].countDown(this.smsCountDownNum,1,function(t){e.smsCountDownNum=t}),this.showVioceCode=1},t.prototype.onGetSmscodeFaild=function(e){Object(n["a"])(e.msg)},t.prototype.onEmailCode=function(){var e=!0,t="";!E["a"].checkEmail(this.email)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAIL_ERROR),e=!1,""==this.email&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAIL_EMPTY),e=!1)),1==this.isimgVerification&&!E["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),e=!1,""==this.imgCaptchaCode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),e=!1)),e?this.onGetEmailcode(2):Object(n["a"])(t)},t.prototype.onGetEmailcodeSuccess=function(){Object(n["a"])(T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAIL)),this.emailCountDownNum=60;var e=this;u["a"].countDown(this.emailCountDownNum,1,function(t){e.emailCountDownNum=t})},t.prototype.onGetEmailcodeFaild=function(e){Object(n["a"])(e.msg)},t.prototype.clickRegister=function(){switch(this.resignType){case 0:this.onClickPhoneReg();break;case 1:this.onClickEmailReg();break}},t.prototype.onClickPhoneReg=function(){var e=!0,t="";if("86"==this.countryCode&&!E["a"].checkPhone(this.phone)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_ERROR),e=!1,""==this.phone&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PHONE_EMPTY),e=!1)),1==this.isimgVerification&&!E["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),e=!1,""==this.imgCaptchaCode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),e=!1)),!E["a"].checkSmscode(this.smscode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_SMSCODE_ERROR),e=!1,""==this.smscode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_SMSCODE_EMPTY),e=!1)),!E["a"].checkPwd(this.phonePassword)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_ERROR),e=!1,""==this.phonePassword&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_EMPTY),e=!1)),!E["a"].checkPwdTwo(this.phonePasswordTwo,this.phonePassword)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORDTWO_ERROR),e=!1,""==this.phonePasswordTwo&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_EMPTY),e=!1)),!this.agreementChceked&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_READAGREEMENT),e=!1),e){var o=5;this.onPhoneRegister(o)}else Object(n["a"])(t)},t.prototype.onClickEmailReg=function(){var e=!0,t="";if(!E["a"].checkEmail(this.email)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAIL_ERROR),e=!1,""==this.email&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAIL_EMPTY),e=!1)),1==this.isimgVerification&&!E["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),e=!1,""==this.imgCaptchaCode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),e=!1)),!E["a"].checkSmscode(this.emailcode)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAILCODE_ERROR),e=!1,""==this.emailcode&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_EMAILCODE_EMPTY),e=!1)),!E["a"].checkPwd(this.emailPassword)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_ERROR),e=!1,""==this.phonePassword&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_EMPTY),e=!1)),!E["a"].checkPwdTwo(this.emailPasswordTwo,this.emailPassword)&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORDTWO_ERROR),e=!1,""==this.phonePasswordTwo&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_PASSWORD_EMPTY),e=!1)),!this.agreementChceked&&e&&(t=T["a"].getTipsMsg(T["a"].KEY_NOTIF_READAGREEMENT),e=!1),e){var o=5;this.onEmaillRegister(o)}else Object(n["a"])(t)},t.prototype.onRegisterSuccess=function(){var e=this;this.notifTitle=T["a"].getTipsMsg(T["a"].KEY_NOTIF_REGISTER),Object(n["a"])(this.notifTitle),this.phonePassword&&(localStorage.setItem(M["a"].STORAGES_PHONE,this.phone),localStorage.setItem(M["a"].STORAGES_PHONE_PW,I()(this.phonePassword).toString())),this.emailPassword&&(localStorage.setItem(M["a"].STORAGES_EMAIL,this.email),localStorage.setItem(M["a"].STORAGES_EMAIL_PW,I()(this.emailPassword).toString())),setTimeout(function(){e.gotologin()},3e3)},t.prototype.onRegisterFaild=function(e){Object(n["a"])(e.msg)},t.prototype.gotologin=function(){var e="";e=this.logincode?"platform="+w.platform+"&code="+this.logincode+"&state_html="+this.state_html:"platform="+w.platform,m["a"].gotoLogin(e)},t.prototype.gotoitems=function(){var e="platform="+w.platform;m["a"].gotoItems(e)},t=g["b"]([Object(p["a"])({components:{load:R["a"],"country-item":N["a"]}})],t),t}(d["a"]);new Y({}).$mount("#app")}});