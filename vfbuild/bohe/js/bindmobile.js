(function(t){function i(i){for(var s,a,h=i[0],g=i[1],r=i[2],f=0,p=[];f<h.length;f++)a=h[f],o[a]&&p.push(o[a][0]),o[a]=0;for(s in g)Object.prototype.hasOwnProperty.call(g,s)&&(t[s]=g[s]);c&&c(i);while(p.length)p.shift()();return n.push.apply(n,r||[]),e()}function e(){for(var t,i=0;i<n.length;i++){for(var e=n[i],s=!0,h=1;h<e.length;h++){var g=e[h];0!==o[g]&&(s=!1)}s&&(n.splice(i--,1),t=a(a.s=e[0]))}return t}var s={},o={bindmobile:0},n=[];function a(i){if(s[i])return s[i].exports;var e=s[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=t,a.c=s,a.d=function(t,i,e){a.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,i){if(1&i&&(t=a(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(a.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)a.d(e,s,function(i){return t[i]}.bind(null,s));return e},a.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(i,"a",i),i},a.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},a.p="/";var h=window["webpackJsonp"]=window["webpackJsonp"]||[],g=h.push.bind(h);h.push=i,h=h.slice();for(var r=0;r<h.length;r++)i(h[r]);var c=g;n.push([16,"chunk-vendors","chunk-common"]),e()})({16:function(t,i,e){t.exports=e("571d")},"571d":function(t,i,e){"use strict";e.r(i);e("c5f6"),e("be4f"),e("450d");var s=e("896a"),o=e.n(s),n=(e("6611"),e("e772")),a=e.n(n),h=(e("1f1a"),e("4e4b")),g=e.n(h),r=(e("46a1"),e("e5f2")),c=e.n(r),f=e("9ab4"),p=(e("8e56"),e("60a3")),T=e("90ae"),u=e("4dfd"),_=e("53f9"),E=e("b971"),C=e("9d9a"),d=(e("db4d"),e("b9c5")),M=e("d939"),l=e("827d"),O=e("a925"),m=e("9347"),I=e("7d83"),R=e("255e");p["c"].prototype.$notify=c.a,p["c"].use(g.a),p["c"].use(a.a),p["c"].use(o.a),p["c"].config.productionTip=!1,p["c"].use(O["a"]);d["a"].getInstace();var y=T["a"].getInstance();y.init();var N=new O["a"](y),P=function(t){function i(){var i=null!==t&&t.apply(this,arguments)||this;return i.webParam=d["a"].getInstace(),i}return f["c"](i,t),i.prototype.created=function(){this.setBaseUrl(_["a"].getBaseUrl()),this.changeRegisterType(4),this.init(),this.ishowEmial()},i.prototype.ishowEmial=function(){return f["a"](this,void 0,void 0,function(){var t,i,e;return f["d"](this,function(s){switch(s.label){case 0:return[4,R["a"].getInstance().download()];case 1:return t=s.sent(),i=I["a"].getRegionCodes(),null!=t&&(e=t.bohe[i].register,this.isShowEmail=Number(e.is_email)),[2]}})})},i.prototype.goHome=function(){M["a"].backHome()},i.prototype.changeRegisterType=function(t){this.onChangeRegisterType(t)},i.prototype.getCaptcha=function(){this.onGetCaptcha()},i.prototype.onSmsCode=function(){if(this.notifTitle=C["a"].getTipsMsg(C["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning",""!=m["a"].getUrlParam("code")&&null!=m["a"].getUrlParam("code"))return this.smsCountDownNum>0?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_WAITING),void this.notifCount++):"86"!=this.countryCode||E["a"].checkPhone(this.phone)?1!=this.isimgVerification||E["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetSmscode(0,3):""==this.imgCaptchaCode?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),this.notifCount++,!1):""==this.phone?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_PHONE_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_PHONE_ERROR),this.notifCount++,!1)},i.prototype.onEmailCode=function(){if(this.notifTitle=C["a"].getTipsMsg(C["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning",""!=m["a"].getUrlParam("code")&&null!=m["a"].getUrlParam("code"))return this.smsCountDownNum>0?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_WAITING),void this.notifCount++):E["a"].checkEmail(this.email)?1!=this.isimgVerification||E["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetEmailcode(3):""==this.imgCaptchaCode?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),this.notifCount++,!1):""==this.email?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_EMAIL_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_EMAIL_ERROR),this.notifCount++,!1)},i.prototype.onVoiceCode=function(){if(this.notifTitle=C["a"].getTipsMsg(C["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning",""!=m["a"].getUrlParam("code")&&null!=m["a"].getUrlParam("code"))return"86"!=this.countryCode||E["a"].checkPhone(this.phone)?1!=this.isimgVerification||E["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetSmscode(1,3):""==this.imgCaptchaCode?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),this.notifCount++,!1):""==this.phone?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_PHONE_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_PHONE_ERROR),this.notifCount++,!1)},i.prototype.onSelectCountryCode=function(t){this.countryCode=t},i.prototype.clickBind=function(){if(""!=m["a"].getUrlParam("code")&&null!=m["a"].getUrlParam("code"))switch(this.resignType){case 4:this.onClickBindPhone();break;case 5:this.onClickBindEmail();break}},i.prototype.onClickBindPhone=function(){return this.notifTitle=C["a"].getTipsMsg(C["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning","86"!=this.countryCode||E["a"].checkPhone(this.phone)?1!=this.isimgVerification||E["a"].checkimgVerificatioCode(this.imgCaptchaCode)?E["a"].checkSmscode(this.smscode)?void this.onBindPhone():""==this.smscode?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_SMSCODE_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_SMSCODE_ERROR),this.notifCount++,!1):""==this.imgCaptchaCode?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),this.notifCount++,!1):""==this.phone?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_PHONE_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_PHONE_ERROR),this.notifCount++,!1)},i.prototype.onClickBindEmail=function(){return this.notifTitle=C["a"].getTipsMsg(C["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning",E["a"].checkEmail(this.email)?1!=this.isimgVerification||E["a"].checkimgVerificatioCode(this.imgCaptchaCode)?E["a"].checkSmscode(this.emailcode)?void this.onBindEmail():""==this.emailcode?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_EMAILCODE_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_EMAILCODE_ERROR),this.notifCount++,!1):""==this.imgCaptchaCode?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),this.notifCount++,!1):""==this.email?(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_EMAIL_EMPTY),this.notifCount++,!1):(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_EMAIL_ERROR),this.notifCount++,!1)},i.prototype.onBindingSuccess=function(t){this.notifTitle=C["a"].getTipsMsg(C["a"].KEY_NOTIF_SUCCESS_TITLE),this.notifType="success";var i=t.data;I["a"].addUserToken(i.login_info),I["a"].addUserInfo(i.user_info),4==this.resignType?this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_BINDING_MOBILE):5==this.resignType&&(this.notifMessage=C["a"].getTipsMsg(C["a"].KEY_NOTIF_BINDING_EMAIL)),this.notifCount++,this.isLoading=!0,this.loadingMsg=C["a"].getTipsMsg(C["a"].KEY_NOTIF_AUTO_LOGIN),setTimeout(function(){M["a"].backUser()},1e3)},i.prototype.onBindingFaild=function(t){this.notifTitle=C["a"].getTipsMsg(C["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning",this.notifMessage=t.msg,this.notifCount++},i=f["b"]([Object(p["a"])({watch:{notifCount:function(t,i){this.$notify({title:Y.notifTitle,message:Y.notifMessage,type:Y.notifType})}},components:{"foot-nav-two":l["a"]}})],i),i}(u["a"]),Y=new P({i18n:N}).$mount("#app")}});