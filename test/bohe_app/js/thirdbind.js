(function(t){function e(e){for(var a,s,c=e[0],r=e[1],p=e[2],g=0,u=[];g<c.length;g++)s=c[g],o[s]&&u.push(o[s][0]),o[s]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);h&&h(e);while(u.length)u.shift()();return n.push.apply(n,p||[]),i()}function i(){for(var t,e=0;e<n.length;e++){for(var i=n[e],a=!0,c=1;c<i.length;c++){var r=i[c];0!==o[r]&&(a=!1)}a&&(n.splice(e--,1),t=s(s.s=i[0]))}return t}var a={},o={thirdbind:0},n=[];function s(e){if(a[e])return a[e].exports;var i=a[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=a,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(i,a,function(e){return t[e]}.bind(null,a));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=e,c=c.slice();for(var p=0;p<c.length;p++)e(c[p]);var h=r;n.push([34,"chunk-vendors","chunk-common"]),i()})({34:function(t,e,i){t.exports=i("da19")},da19:function(t,e,i){"use strict";i.r(e);i("ac1e");var a=i("543e"),o=(i("e7e5"),i("d399")),n=i("9ab4"),s=(i("3a37"),i("fdfc"),i("60a3")),c=i("90ae"),r=i("4dfd"),p=i("b890"),h=i("b971"),g=i("9d9a"),u=(i("db4d"),i("a925")),O=i("9347"),d=i("dfdf");s["c"].use(o["a"]),s["c"].use(a["a"]),s["c"].config.productionTip=!1,s["c"].use(u["a"]);d["a"].getInstace();var T=c["a"].getInstance();T.initNoRefresh();var E=new u["a"](T),_=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.appParam=d["a"].getInstace(),e}return n["c"](e,t),e.prototype.created=function(){this.setBaseUrl(p["a"].getBaseUrl()),this.changeRegisterType(4),this.init()},e.prototype.changeRegisterType=function(t){this.onChangeRegisterType(t)},e.prototype.getCaptcha=function(){this.onGetCaptcha()},e.prototype.onSmsCode=function(){if(""!=O["a"].getUrlParam("code")){if(!(this.smsCountDownNum>0))return"86"!=this.countryCode||h["a"].checkPhone(this.phone)?1!=this.isimgVerification||h["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetSmscode(0,3):""==this.imgCaptchaCode?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR)),!1):""==this.phone?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_PHONE_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_PHONE_ERROR)),!1);Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_WAITING))}},e.prototype.onGetSmscodeSuccess=function(){Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_SMS)),this.smsCountDownNum=60;var t=this;O["a"].countDown(this.smsCountDownNum,1,function(e){t.smsCountDownNum=e})},e.prototype.onGetSmscodeFaild=function(t){Object(o["a"])(t.msg)},e.prototype.onEmailCode=function(){if(""!=O["a"].getUrlParam("code")){if(!(this.emailCountDownNum>0))return h["a"].checkEmail(this.email)?1!=this.isimgVerification||h["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetEmailcode(3):""==this.imgCaptchaCode?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR)),!1):""==this.email?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_EMAIL_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_EMAIL_ERROR)),!1);Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_WAITING))}},e.prototype.onGetEmailcodeSuccess=function(){Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_EMAIL)),this.emailCountDownNum=60;var t=this;O["a"].countDown(this.smsCountDownNum,1,function(e){t.emailCountDownNum=e})},e.prototype.onGetEmailcodeFaild=function(t){Object(o["a"])(t.msg)},e.prototype.onVoiceCode=function(){if(""!=O["a"].getUrlParam("code"))return"86"!=this.countryCode||h["a"].checkPhone(this.phone)?1!=this.isimgVerification||h["a"].checkimgVerificatioCode(this.imgCaptchaCode)?void this.onGetSmscode(1,3):""==this.imgCaptchaCode?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR)),!1):""==this.phone?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_PHONE_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_PHONE_ERROR)),!1)},e.prototype.onSelectCountryCode=function(t){var e=t.target.value;this.countryCode=e},e.prototype.clickBind=function(){if(""!=O["a"].getUrlParam("code"))switch(this.resignType){case 4:this.onClickBindPhone();break;case 5:this.onClickBindEmail();break}},e.prototype.onClickBindPhone=function(){return"86"!=this.countryCode||h["a"].checkPhone(this.phone)?1!=this.isimgVerification||h["a"].checkimgVerificatioCode(this.imgCaptchaCode)?h["a"].checkSmscode(this.smscode)?void this.onBindPhone("pc"):""==this.smscode?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_SMSCODE_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_SMSCODE_ERROR)),!1):""==this.imgCaptchaCode?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR)),!1):""==this.phone?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_PHONE_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_PHONE_ERROR)),!1)},e.prototype.onClickBindEmail=function(){return h["a"].checkEmail(this.email)?1!=this.isimgVerification||h["a"].checkimgVerificatioCode(this.imgCaptchaCode)?h["a"].checkSmscode(this.emailcode)?void this.onBindEmail("pc"):""==this.emailcode?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_EMAILCODE_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_EMAILCODE_ERROR)),!1):""==this.imgCaptchaCode?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR)),!1):""==this.email?(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_EMAIL_EMPTY)),!1):(Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_EMAIL_ERROR)),!1)},e.prototype.onBindingSuccess=function(t){4==this.resignType?Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_BINDING_MOBILE)):5==this.resignType&&Object(o["a"])(g["a"].getTipsMsg(g["a"].KEY_NOTIF_BINDING_EMAIL)),this.notifCount++,this.isLoading=!0,this.loadingMsg=g["a"].getTipsMsg(g["a"].KEY_NOTIF_AUTO_LOGIN),setTimeout(function(){var e=t.data.code;window.location.href="threeSuccess.html?code="+e},1e3)},e.prototype.onBindingFaild=function(t){Object(o["a"])(t.msg)},e=n["b"]([s["a"]],e),e}(r["a"]);new _({i18n:E}).$mount("#app")}});