(function(t){function i(i){for(var s,a,h=i[0],g=i[1],r=i[2],T=0,p=[];T<h.length;T++)a=h[T],o[a]&&p.push(o[a][0]),o[a]=0;for(s in g)Object.prototype.hasOwnProperty.call(g,s)&&(t[s]=g[s]);c&&c(i);while(p.length)p.shift()();return n.push.apply(n,r||[]),e()}function e(){for(var t,i=0;i<n.length;i++){for(var e=n[i],s=!0,h=1;h<e.length;h++){var g=e[h];0!==o[g]&&(s=!1)}s&&(n.splice(i--,1),t=a(a.s=e[0]))}return t}var s={},o={register:0},n=[];function a(i){if(s[i])return s[i].exports;var e=s[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=t,a.c=s,a.d=function(t,i,e){a.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,i){if(1&i&&(t=a(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(a.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)a.d(e,s,function(i){return t[i]}.bind(null,s));return e},a.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(i,"a",i),i},a.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},a.p="/";var h=window["webpackJsonp"]=window["webpackJsonp"]||[],g=h.push.bind(h);h.push=i,h=h.slice();for(var r=0;r<h.length;r++)i(h[r]);var c=g;n.push([4,"chunk-vendors","chunk-common"]),e()})({"09e7":function(t,i,e){"use strict";e.r(i);e("6b54"),e("c5f6"),e("be4f"),e("450d");var s=e("896a"),o=e.n(s),n=(e("6611"),e("e772")),a=e.n(n),h=(e("1f1a"),e("4e4b")),g=e.n(h),r=(e("46a1"),e("e5f2")),c=e.n(r),T=(e("cadf"),e("551c"),e("f751"),e("097d"),e("9ab4")),p=(e("8e56"),e("60a3")),f=e("90ae"),_=e("b971"),u=e("9d9a"),E=(e("db4d"),e("b9c5")),C=e("53f9"),d=e("d939"),M=e("dfe7"),O=e("a925"),R=e("4dfd"),l=e("3c6c"),m=e("1831"),I=e("7d83"),P=e("9127"),Y=e("255e");p["c"].prototype.$notify=c.a,p["c"].use(g.a),p["c"].use(a.a),p["c"].use(o.a),p["c"].config.productionTip=!1,p["c"].use(O["a"]);E["a"].getInstace();var N=f["a"].getInstance();N.init();var y=new O["a"](N),w=function(t){function i(){var i=null!==t&&t.apply(this,arguments)||this;return i.webParam=E["a"].getInstace(),i}return T["c"](i,t),i.prototype.created=function(){C["a"].log("注册log"),this.setBaseUrl(C["a"].getBaseUrl()),this.changeResignType(0),this.ishowEmial(),this.init()},i.prototype.changeResignType=function(t){this.onChangeRegisterType(t),this.agreementChceked=!1},i.prototype.ishowEmial=function(){return T["a"](this,void 0,void 0,function(){var t,i,e;return T["d"](this,function(s){switch(s.label){case 0:return[4,Y["a"].getInstance().download()];case 1:return t=s.sent(),i=I["a"].getRegionCodes(),null!=t&&(e=t.bohe[i].register,this.isShowEmail=Number(e.is_email)),[2]}})})},i.prototype.goHome=function(){d["a"].backHome()},i.prototype.onSelectCountryCode=function(t){this.countryCode=t},i.prototype.getCaptcha=function(){this.onGetCaptcha()},i.prototype.onSmsCode=function(){return this.notifTitle=u["a"].getTipsMsg(u["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning",this.smsCountDownNum>0?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_WAITING),void this.notifCount++):"86"!=this.countryCode||_["a"].checkPhone(this.phone)?1!=this.isimgVerification||_["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetSmscode(0,2):""==this.imgCaptchaCode?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),this.notifCount++,!1):""==this.phone?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PHONE_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PHONE_ERROR),this.notifCount++,!1)},i.prototype.onEmailCode=function(){return this.notifTitle=u["a"].getTipsMsg(u["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning",this.smsCountDownNum>0?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_WAITING),void this.notifCount++):_["a"].checkEmail(this.email)?1!=this.isimgVerification||_["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetEmailcode(2):""==this.imgCaptchaCode?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),this.notifCount++,!1):""==this.email?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_EMAIL_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_EMAIL_ERROR),this.notifCount++,!1)},i.prototype.onVoiceCode=function(){return this.notifTitle=u["a"].getTipsMsg(u["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning","86"!=this.countryCode||_["a"].checkPhone(this.phone)?1!=this.isimgVerification||_["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetSmscode(1,2):""==this.imgCaptchaCode?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),this.notifCount++,!1):""==this.phone?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PHONE_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PHONE_ERROR),this.notifCount++,!1)},i.prototype.clickRegister=function(){switch(this.resignType){case 0:this.onClickPhoneReg();break;case 1:this.onClickEmailReg();break}},i.prototype.onClickPhoneReg=function(){var t=!0,i="";"86"==this.countryCode&&!_["a"].checkPhone(this.phone)&&t&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)),1==this.isimgVerification&&!_["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),!_["a"].checkSmscode(this.smscode)&&t&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_SMSCODE_ERROR),t=!1,""==this.smscode&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_SMSCODE_EMPTY),t=!1)),!_["a"].checkPwd(this.phonePassword)&&t&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PASSWORD_ERROR),t=!1,""==this.phonePassword&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),!_["a"].checkPwdTwo(this.phonePasswordTwo,this.phonePassword)&&t&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PASSWORDTWO_ERROR),t=!1,""==this.phonePasswordTwo&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),!this.agreementChceked&&t&&(i=u["a"].getTipsMsg(u["a"].KEY_NOTIF_READAGREEMENT),t=!1),t?this.onPhoneRegister():this.$notify({title:u["a"].getTipsMsg(u["a"].KEY_NOTIF_ERROR_TITLE),message:i,type:"warning"})},i.prototype.onClickEmailReg=function(){return this.notifTitle=u["a"].getTipsMsg(u["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning",_["a"].checkEmail(this.email)?1!=this.isimgVerification||_["a"].checkimgVerificatioCode(this.imgCaptchaCode)?_["a"].checkSmscode(this.emailcode)?_["a"].checkPwd(this.emailPassword)?_["a"].checkPwdTwo(this.emailPasswordTwo,this.emailPassword)?this.agreementChceked?void this.onEmaillRegister():(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_READAGREEMENT),this.notifCount++,!1):""==this.phonePasswordTwo?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PASSWORD_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PASSWORDTWO_ERROR),this.notifCount++,!1):""==this.phonePassword?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PASSWORD_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_PASSWORD_ERROR),this.notifCount++,!1):""==this.emailcode?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_EMAILCODE_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_EMAILCODE_ERROR),this.notifCount++,!1):""==this.imgCaptchaCode?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),this.notifCount++,!1):""==this.email?(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_EMAIL_EMPTY),this.notifCount++,!1):(this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_EMAIL_ERROR),this.notifCount++,!1)},i.prototype.onRegisterSuccess=function(){switch(this.notifTitle=u["a"].getTipsMsg(u["a"].KEY_NOTIF_SUCCESS_TITLE),this.notifType="success",this.notifMessage=u["a"].getTipsMsg(u["a"].KEY_NOTIF_REGISTER),this.notifCount++,_hmt.push(["_trackEvent","register","success"]),this.isLoading=!0,this.loadingMsg=u["a"].getTipsMsg(u["a"].KEY_NOTIF_AUTO_LOGIN),this.resignType){case 0:this.autoLogin(this.phone,this.phonePassword,this.countryCode);break;case 1:this.autoLogin(this.email,this.emailPassword,void 0);break}},i.prototype.autoLogin=function(t,i,e){return T["a"](this,void 0,void 0,function(){var s,o,n,a;return T["d"](this,function(h){switch(h.label){case 0:return s=new l["i"],s.username=t,s.password=P["Md5"].hashStr(i).toString(),e&&(s.country_code=e),o=m["a"].URL_AUTH_LOGIN,n=this,[4,this.http.post(o,s)];case 1:return n.backData=h.sent(),this.isLoading=!1,this.backData.code==m["a"].HTTP_SUCCESS_NET_CODE&&(a=this.backData.data,I["a"].addUserToken(a.login_info),I["a"].addUserInfo(a.user_info),d["a"].backUser()),[2]}})})},i.prototype.onRegisterFaild=function(t){this.notifTitle=u["a"].getTipsMsg(u["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning",this.notifMessage=t.msg,this.notifCount++},i.prototype.checkAgreement=function(){this.agreementChceked=!this.agreementChceked},i=T["b"]([Object(p["a"])({watch:{notifCount:function(t,i){this.$notify({title:K.notifTitle,message:K.notifMessage,type:K.notifType})}},components:{"foot-nav-two":M["a"]}})],i),i}(R["a"]),K=new w({i18n:y}).$mount("#app")},4:function(t,i,e){t.exports=e("09e7")}});