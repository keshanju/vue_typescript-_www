(function(t){function e(e){for(var o,n,c=e[0],r=e[1],h=e[2],d=0,g=[];d<c.length;d++)n=c[d],a[n]&&g.push(a[n][0]),a[n]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);p&&p(e);while(g.length)g.shift()();return s.push.apply(s,h||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],o=!0,c=1;c<i.length;c++){var r=i[c];0!==a[r]&&(o=!1)}o&&(s.splice(e--,1),t=n(n.s=i[0]))}return t}var o={},a={mforget:0},s=[];function n(e){if(o[e])return o[e].exports;var i=o[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=o,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=e,c=c.slice();for(var h=0;h<c.length;h++)e(c[h]);var p=r;s.push([15,"chunk-vendors","chunk-common"]),i()})({15:function(t,e,i){t.exports=i("45de")},"45de":function(t,e,i){"use strict";i.r(e);i("3208");var o=i("c0b2"),a=(i("ac1e"),i("543e")),s=(i("3c32"),i("417e")),n=(i("e7e5"),i("d399")),c=(i("5f5f"),i("f253")),r=(i("bda7"),i("5e46")),h=(i("da3c"),i("0b33")),p=(i("cadf"),i("551c"),i("097d"),i("9ab4")),d=(i("3a9e"),i("9788"),i("968a"),i("db4d"),i("60a3")),g=i("a925"),_=(i("6b54"),i("4dfd")),u=i("1831"),E=i("3c6c"),T=i("9127"),O=i("9d9a"),C=i("7d83"),l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.http=new u["a"],e.checkUserValue=0,e}return p["c"](e,t),e.prototype.onPhoneFindPassword=function(){var t=u["a"].URL_AUTH_RETRIEVE,e=new E["k"];e.phone=this.phone,e.password=T["Md5"].hashStr(this.phonePassword).toString(),e.country_code=this.countryCode,e.smscode=this.smscode,e.smscode_key=this.smsCapchaM.smscode_key,e.checkcode=this.imgCaptchaCode,e.checkcode_key=this.imgCaptchaM.key,this.onRetrieve(t,e)},e.prototype.onEmailFindPassword=function(){var t=u["a"].URL_AUTH_RETRIEVE,e=new E["d"];e.email=this.email,e.password=T["Md5"].hashStr(this.emailPassword).toString(),e.mailcode=this.emailcode,e.mailcode_key=this.emailCapchaM.emailcode_key,e.checkcode=this.imgCaptchaCode,e.checkcode_key=this.imgCaptchaM.key,this.onRetrieve(t,e)},e.prototype.onRetrieve=function(t,e){return p["a"](this,void 0,void 0,function(){var i;return p["d"](this,function(o){switch(o.label){case 0:return this.isLoading=!0,this.loadingMsg=O["a"].getTipsMsg(O["a"].KEY_LOADING),i=this,[4,this.http.post(t,e)];case 1:return i.backData=o.sent(),this.backData.code==u["a"].HTTP_SUCCESS_NET_CODE?(this.isLoading=!1,localStorage.removeItem(C["a"].STORAGES_PHONE),localStorage.removeItem(C["a"].STORAGES_EMAIL),localStorage.removeItem(C["a"].STORAGES_PHONE_PW),localStorage.removeItem(C["a"].STORAGES_EMAIL_PW),localStorage.removeItem(C["a"].STORAGES_PW),this.onFindPwdSuccess()):(this.isLoading=!1,this.onFindPwdFaild(this.backData),this.isimgVerification=1,this.onGetCaptcha()),[2]}})})},e.prototype.onFindPwdSuccess=function(){},e.prototype.onFindPwdFaild=function(t){},e.prototype.FindUserIsExist=function(t){return p["a"](this,void 0,void 0,function(){var e,i,o,a;return p["d"](this,function(s){switch(s.label){case 0:return e=u["a"].URL_USER_CHECK_PSW_ISEXIST,i={account:t},o=this,[4,this.http.post(e,i)];case 1:return o.backData=s.sent(),this.backData.code==u["a"].HTTP_SUCCESS_NET_CODE?(a=this.backData.data,[2,a.is_exist]):[2]}})})},e=p["b"]([d["a"]],e),e}(_["a"]),m=i("b971"),f=i("9347"),P=i("82f5"),M=i("1396"),R=i("dfdf"),I=i("255e"),S=i("a123"),w=i("7278");d["c"].use(h["a"]),d["c"].use(r["a"]),d["c"].use(c["a"]),d["c"].use(n["a"]),d["c"].use(s["a"]),d["c"].use(a["a"]),d["c"].use(o["a"]),d["c"].use(g["a"]);var y=R["a"].getInstace(f["a"].REGION_CODE_1,f["a"].ZH_CN),N=M["a"].getInstance();N.initNoRefresh();new g["a"](N);var F=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.AreaCodeshow=!1,e.region_code=1,e.tabactive=0,e.regtype=2,e.showVioceCode=0,e}return p["c"](e,t),e.prototype.created=function(){this.setBaseUrl(P["a"].getBaseUrl()),this.init(),this.registerIsCaptcha(),this.changeResignType()},e.prototype.changeResignType=function(){0==this.tabactive?this.regtype=2:1==this.tabactive&&(this.regtype=3),console.log(this.regtype),this.onChangeRegisterType(this.regtype),this.imgCaptchaCode=""},e.prototype.getcode=function(){return p["a"](this,void 0,void 0,function(){var t;return p["d"](this,function(e){switch(e.label){case 0:return[4,I["a"].getInstance().getRegincode()];case 1:return t=e.sent(),this.region_code=t,C["a"].addRegionCode(this.region_code),[2]}})})},e.prototype.changeAreaCode=function(){this.AreaCodeshow=!0},e.prototype.cancleAreaCode=function(){this.AreaCodeshow=!1},e.prototype.onCheckAreaCode=function(t){this.countryCode=t,this.AreaCodeshow=!1},e.prototype.getCaptcha=function(){this.onGetCaptcha()},e.prototype.onSmsCode=function(){var t=!0,e="";"86"==this.countryCode?!m["a"].checkPhone(this.phone)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)):""==this.phone&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_EMPTY),t=!1),1==this.isimgVerification&&!m["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),t?this.onGetSmscode(0,1):Object(n["a"])(e)},e.prototype.onVoiceCode=function(){var t=!0,e="";"86"==this.countryCode&&!m["a"].checkPhone(this.phone)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)),1==this.isimgVerification&&!m["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),t?this.onGetSmscode(1,1):Object(n["a"])(e)},e.prototype.onGetSmscodeSuccess=function(){Object(n["a"])(O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMS)),this.smsCountDownNum=60;var t=this;f["a"].countDown(this.smsCountDownNum,1,function(e){t.smsCountDownNum=e}),this.showVioceCode=1},e.prototype.onGetSmscodeFaild=function(t){Object(n["a"])(t.msg)},e.prototype.onEmailCode=function(){var t=!0,e="";!m["a"].checkEmail(this.email)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_ERROR),t=!1,""==this.email&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_EMPTY),t=!1)),1==this.isimgVerification&&!m["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),t?this.onGetEmailcode(1):Object(n["a"])(e)},e.prototype.onGetEmailcodeSuccess=function(){Object(n["a"])(O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL)),this.emailCountDownNum=60;var t=this;f["a"].countDown(this.emailCountDownNum,1,function(e){t.emailCountDownNum=e})},e.prototype.onGetEmailcodeFaild=function(t){Object(n["a"])(t.msg)},e.prototype.clickFindPassword=function(){switch(this.resignType){case 2:this.onClickPhoneReg();break;case 3:this.onClickEmailReg();break}},e.prototype.onClickPhoneReg=function(){var t=!0,e="";"86"==this.countryCode&&!m["a"].checkPhone(this.phone)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)),1==this.isimgVerification&&!m["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),!m["a"].checkSmscode(this.smscode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMSCODE_ERROR),t=!1,""==this.smscode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_SMSCODE_EMPTY),t=!1)),!m["a"].checkPwd(this.phonePassword)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_ERROR),t=!1,""==this.phonePassword&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),!m["a"].checkPwdTwo(this.phonePasswordTwo,this.phonePassword)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORDTWO_ERROR),t=!1,""==this.phonePasswordTwo&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),t?this.onPhoneFindPassword():Object(n["a"])(e)},e.prototype.onClickEmailReg=function(){var t=!0,e="";!m["a"].checkEmail(this.email)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_ERROR),t=!1,""==this.email&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAIL_EMPTY),t=!1)),1==this.isimgVerification&&!m["a"].checkimgVerificatioCode(this.imgCaptchaCode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_ERROR),t=!1,""==this.imgCaptchaCode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_IMGCAPTCHACODE_EMPTY),t=!1)),!m["a"].checkSmscode(this.emailcode)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAILCODE_ERROR),t=!1,""==this.emailcode&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_EMAILCODE_EMPTY),t=!1)),!m["a"].checkPwd(this.emailPassword)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_ERROR),t=!1,""==this.phonePassword&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),!m["a"].checkPwdTwo(this.emailPasswordTwo,this.emailPassword)&&t&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORDTWO_ERROR),t=!1,""==this.phonePasswordTwo&&(e=O["a"].getTipsMsg(O["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),t?this.onEmailFindPassword():Object(n["a"])(e)},e.prototype.onFindPwdSuccess=function(){var t=this;Object(n["a"])(O["a"].getTipsMsg(O["a"].KEY_NOTIF_FINDPWD));var e=this;setTimeout(function(){e.isLoading=!1,t.gotologin()},1500)},e.prototype.onFindPwdFaild=function(t){Object(n["a"])(t.msg)},e.prototype.gotologin=function(){var t="platform="+y.platform;S["a"].gotoLogin(t)},e=p["b"]([Object(d["a"])({components:{load:w["a"]}})],e),e}(l);new F({}).$mount("#app")}});