(function(t){function e(e){for(var s,o,g=e[0],c=e[1],r=e[2],p=0,_=[];p<g.length;p++)o=g[p],a[o]&&_.push(a[o][0]),a[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);T&&T(e);while(_.length)_.shift()();return n.push.apply(n,r||[]),i()}function i(){for(var t,e=0;e<n.length;e++){for(var i=n[e],s=!0,g=1;g<i.length;g++){var c=i[g];0!==a[c]&&(s=!1)}s&&(n.splice(e--,1),t=o(o.s=i[0]))}return t}var s={},a={bindmobile:0},n=[];function o(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=s,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(i,s,function(e){return t[e]}.bind(null,s));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var g=window["webpackJsonp"]=window["webpackJsonp"]||[],c=g.push.bind(g);g.push=e,g=g.slice();for(var r=0;r<g.length;r++)e(g[r]);var T=c;n.push([0,"chunk-vendors","chunk-common"]),i()})({0:function(t,e,i){t.exports=i("1a6e")},"1a6e":function(t,e,i){"use strict";i.r(e);i("c5f6"),i("be4f"),i("450d");var s=i("896a"),a=i.n(s),n=(i("6611"),i("e772")),o=i.n(n),g=(i("1f1a"),i("4e4b")),c=i.n(g),r=(i("46a1"),i("e5f2")),T=i.n(r),p=(i("cadf"),i("551c"),i("097d"),i("9ab4")),_=(i("76ca"),i("db4d"),i("60a3")),E=i("abf2"),h=i("a925"),u=i("4dfd"),d=i("9453"),O=i("9d9a"),f=i("b971"),l=i("9347"),I=i("3c6c"),m=i("7d83"),M=i("d939"),C=i("dfdf"),R=i("5f2d"),y=i("255e");_["c"].prototype.$notify=T.a,_["c"].use(c.a),_["c"].use(o.a),_["c"].use(a.a),_["c"].use(h["a"]);C["a"].getInstace(l["a"].REGION_CODE_1,l["a"].ZH_CN);var N=R["a"].getInstance();N.init();var Y=new h["a"](N),F=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.webParam=C["a"].getInstace(),e.bindUrlType="",e}return p["c"](e,t),e.prototype.onChangeLanguage=function(t){N.changeLanguage(t),Y.locale=N.locale,this.webParam.language=t},e.prototype.created=function(){this.setBaseUrl(d["a"].getBaseUrl()),this.changeResignType(4),this.token=m["a"].getUserToken().account_token,this.bindUrlType=localStorage.getItem(m["a"].STORAGES_THIRDBIND_URL_TYPE),this.init()},e.prototype.init=function(){this.referCode=l["a"].getUrlParam("refer_code"),this.getAreaCodeList(),this.onGetPackage(1)},e.prototype.changeResignType=function(t){this.onChangeRegisterType(t),this.agreementChceked=!1},e.prototype.getDownloadUrl=function(){return p["a"](this,void 0,void 0,function(){var t,e,i;return p["d"](this,function(s){switch(s.label){case 0:return[4,y["a"].getInstance().download()];case 1:return t=s.sent(),e=m["a"].getRegionCodes(),null!=t&&(i=t.leigod[e].register,this.isShowEmail=Number(i.is_email)),[2]}})})},e.prototype.goHome=function(){M["a"].userGotoWeb(d["a"].getWebBaseUrl(),M["a"].HTML_NAME_INDEX)},e.prototype.onSelectCountryCode=function(t){this.countryCode=t},e.prototype.getCaptcha=function(){this.onGetCaptcha()},e.prototype.onSmsCode=function(){var t=!0,e="";this.smsCountDownNum>0?this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:O["a"].getTipsMsg(O["a"].KEY_WAITING),type:"warning"}):("86"==this.countryCode&&!f["a"].checkPhone(this.phone)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)),1==this.isimgVerification&&!f["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),t?this.onGetSmscode(0,3):this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"}))},e.prototype.onGetSmscodeSuccess=function(){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_SUCCESS_TITLE),message:O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMS),type:"warning"}),this.smsCountDownNum=60;var t=this;l["a"].countDown(this.smsCountDownNum,1,function(e){t.smsCountDownNum=e})},e.prototype.onGetSmscodeFaild=function(t){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:t.msg,type:"warning"})},e.prototype.onEmailCode=function(){var t=!0,e="";this.smsCountDownNum>0?this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:O["a"].getTipsMsg(O["a"].KEY_WAITING),type:"warning"}):(!f["a"].checkEmail(this.email)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_ERROR),t=!1,""==this.email&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_EMPTY),t=!1)),1==this.isimgVerification&&!f["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),t?this.onGetEmailcode(3):this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"}))},e.prototype.onGetEmailcodeSuccess=function(){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_SUCCESS_TITLE),message:O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL),type:"success"}),this.emailCountDownNum=60;var t=this;l["a"].countDown(this.emailCountDownNum,1,function(e){t.emailCountDownNum=e})},e.prototype.onGetEmailcodeFaild=function(t){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:t.msg,type:"warning"})},e.prototype.sendVerifyCode=function(){var t=new I["s"];t.account_token=this.token,this.onSendVerification(t)},e.prototype.onSendVerificationSuccess=function(t){this.verify_key=t.data.verify_key,this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_SUCCESS_TITLE),message:O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMS),type:"success"}),this.verifyCountDownNum=60;var e=this;l["a"].countDown(this.verifyCountDownNum,1,function(t){e.verifyCountDownNum=t})},e.prototype.onSendVerificationFaild=function(t){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:t.msg,type:"warning"})},e.prototype.onVoiceCode=function(){var t=!0,e="";"86"==this.countryCode&&!f["a"].checkPhone(this.phone)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)),1==this.isimgVerification&&!f["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),t?this.onGetSmscode(1,3):this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"})},e.prototype.clickRegister=function(){switch(this.resignType){case 4:this.onClickBindPhone();break;case 5:this.onClickEmailReg();break}},e.prototype.bindDefaultAccount=function(){var t="";if(!f["a"].checkSmscode(this.verify_code))return t=O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMSCODE_ERROR),""==this.smscode&&(t=O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMSCODE_EMPTY)),void this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:t,type:"warning"});this.onBindDefaultAccount()},e.prototype.onClickBindPhone=function(){var t=!0,e="";"86"==this.countryCode&&!f["a"].checkPhone(this.phone)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)),1==this.isimgVerification&&!f["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),!f["a"].checkSmscode(this.smscode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMSCODE_ERROR),t=!1,""==this.smscode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMSCODE_EMPTY),t=!1)),"4"==this.bind_status&&!f["a"].checkPwd(this.phonePassword)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_ERROR),t=!1,""==this.phonePassword&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),"4"==this.bind_status&&!this.agreementChceked&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_READAGREEMENT),t=!1),t?this.onBindPhone():this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"})},e.prototype.onClickEmailReg=function(){var t=!0,e="";!f["a"].checkEmail(this.email)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_ERROR),t=!1,""==this.email&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_EMPTY),t=!1)),1==this.isimgVerification&&!f["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),!f["a"].checkSmscode(this.emailcode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAILCODE_ERROR),t=!1,""==this.emailcode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAILCODE_EMPTY),t=!1)),"4"==this.bind_status&&!f["a"].checkPwd(this.emailPassword)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_ERROR),t=!1,""==this.phonePassword&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),"4"==this.bind_status&&!this.agreementChceked&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_READAGREEMENT),t=!1),t?this.onBindEmail():this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"})},e.prototype.onBindingSuccess=function(t){var e="";"0"==this.bindUrlType?e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_BINDING):4==this.resignType?e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_BINDING_MOBILE):5==this.resignType&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_BINDING_EMAIL)),this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_SUCCESS_TITLE),message:e,type:"success"});var i=t.data;m["a"].addUserToken(i.login_info),m["a"].addUserInfo(i.user_info),this.isLoading=!0,this.loadingMsg=O["a"].getTipsMsg(O["a"].KEY_NOTIF_AUTO_LOGIN),setTimeout(function(){M["a"].wapJump(d["a"].getUserBaseUrl(),M["a"].HTML_NAME_USER)},1e3)},e.prototype.onBindingFaild=function(t){this.$notify({title:O["a"].getTipsMsg(O["a"].KEY_NOTIF_ERROR_TITLE),message:t.msg,type:"warning"})},e=p["b"]([Object(_["a"])({components:{"foot-nav-two":E["a"]}})],e),e}(u["a"]);new F({i18n:Y}).$mount("#app")}});