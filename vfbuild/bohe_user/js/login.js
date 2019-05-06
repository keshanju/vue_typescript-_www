(function(t){function e(e){for(var i,s,r=e[0],c=e[1],u=e[2],h=0,l=[];h<r.length;h++)s=r[h],n[s]&&l.push(n[s][0]),n[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);p&&p(e);while(l.length)l.shift()();return a.push.apply(a,u||[]),o()}function o(){for(var t,e=0;e<a.length;e++){for(var o=a[e],i=!0,r=1;r<o.length;r++){var c=o[r];0!==n[c]&&(i=!1)}i&&(a.splice(e--,1),t=s(s.s=o[0]))}return t}var i={},n={login:0},a=[];function s(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=i,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(o,i,function(e){return t[e]}.bind(null,i));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var u=0;u<r.length;u++)e(r[u]);var p=c;a.push([2,"chunk-vendors","chunk-common"]),o()})({2:function(t,e,o){t.exports=o("d943")},d943:function(t,e,o){"use strict";o.r(e);var i=o("e814"),n=o.n(i),a=(o("be4f"),o("450d"),o("896a")),s=o.n(a),r=(o("6611"),o("e772")),c=o.n(r),u=(o("1f1a"),o("4e4b")),p=o.n(u),h=(o("46a1"),o("e5f2")),l=o.n(h),g=(o("cadf"),o("551c"),o("f751"),o("097d"),o("9ab4")),_=(o("8e56"),o("60a3")),d=o("90ae"),f=(o("6b54"),o("1831")),y=o("7d83"),T=o("3c6c"),S=o("9d9a"),E=o("6821f"),O=o.n(E),m=o("255e"),P=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.errorMsg="",e.loginType=0,e.country_code_list=[],e.countryCode={code:"",group:"",ico:"",iso_code:"",name:""},e.country_code="",e.phone="",e.email="",e.phonePassword="",e.emailPassword="",e.isKeepPw=!1,e.isPwMd5=!1,e.areaCodeList=[],e.areaCodeListArr=[],e.username="",e.commonPsaaword="",e.http=new f["a"],e.isLoading=!1,e.loadingMsg="",e.notifTitle=S["a"].getTipsMsg(S["a"].KEY_NOTIF_SUCCESS_TITLE),e.notifMessage="",e.notifType="success",e.notifNum=0,e}return g["c"](e,t),e.prototype.init=function(){var t=localStorage.getItem(y["a"].STORAGES_PHONE);null!=t&&"undefined"!=t&&(this.phone=t,this.username=t);var e=localStorage.getItem(y["a"].STORAGES_EMAIL);null!=e&&"undefined"!=e&&(this.email=e,this.username=e),this.changeLoginType(0)},e.prototype.execute=function(){},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.getAreaCodeList=function(){return g["a"](this,void 0,void 0,function(){var t,e,o,i,n;return g["d"](this,function(a){switch(a.label){case 0:return t=f["a"].URL_AUTH_COUNTRY,e={},o=this,[4,this.http.get(t,e)];case 1:if(o.backData=a.sent(),this.backData.code==f["a"].HTTP_SUCCESS_NET_CODE)for(n in this.country_code=this.backData.data.now_country,i=localStorage.getItem(y["a"].STORAGES_PHONE_REGION),null!=i&&void 0!=i&&(this.country_code=i),this.backData.data.list_country)this.areaCodeList.push(this.backData.data.list_country[n]);return[2]}})})},e.prototype.getAreaCodeInfoList=function(t){return g["a"](this,void 0,void 0,function(){var e,o,i,n,a,s,r,c,u;return g["d"](this,function(p){switch(p.label){case 0:return[4,m["a"].getInstance().getRegincode(t)];case 1:return e=p.sent(),o=this,[4,m["a"].getInstance().getCounteyCode(t)];case 2:if(o.backData=p.sent(),this.backData.code==f["a"].HTTP_SUCCESS_NET_CODE){for(this.countryCode=this.backData.data.list_country.filter(function(t){return t.code==e.mobile_code})[0],i=localStorage.getItem(y["a"].STORAGES_PHONE_REGION),null!=i&&"undefined"!=i&&(this.countryCode=this.backData.data.list_country.filter(function(t){return t.code==i})[0]),this.country_code=this.countryCode.code,this.areaCodeListArr=this.backData.data.list_country,n=0,a=[],s={label:"",options:[]},r=0;r<this.areaCodeListArr.length;r++)r==this.areaCodeListArr.length-1?(c={label:"",options:[]},c.label=this.areaCodeListArr[r].group,c.options=this.areaCodeListArr.slice(n,r+1),a.push(c)):this.areaCodeListArr[r].group!=this.areaCodeListArr[r+1].group&&(u={label:"",options:[]},u.label=this.areaCodeListArr[r].group,u.options=this.areaCodeListArr.slice(n,r+1),a.push(u),n=r+1);s.options=this.backData.data.top_country,a.unshift(s),this.country_code_list=a}return[2]}})})},e.prototype.changeLoginType=function(t){this.loginType=t;var e=null;0!=t||this.isPwMd5||(e=localStorage.getItem(y["a"].STORAGES_PHONE_PW),null==e&&(e="")),1!=t||this.isPwMd5||(e=localStorage.getItem(y["a"].STORAGES_EMAIL_PW),null==e&&(e="")),this.isKeepPw=""!=e,this.isPwMd5=!1,0==t&&(this.phonePassword=e),1==t&&(this.emailPassword=e)},e.prototype.onPasswordInput=function(t){if(0==t){var e=localStorage.getItem(y["a"].STORAGES_PHONE_PW);if(this.phonePassword==e)return}if(1==t){e=localStorage.getItem(y["a"].STORAGES_EMAIL_PW);if(this.emailPassword==e)return}this.isPwMd5=!0},e.prototype.onPhoneLogin=function(){var t=f["a"].URL_AUTH_LOGIN,e=this.phonePassword;this.isPwMd5&&(e=O()(this.phonePassword).toString());var o=new T["i"];o.country_code=this.country_code,o.username=this.phone,o.password=e,o.src_channel=y["a"].getSrcChannel(),localStorage.setItem(y["a"].STORAGES_PHONE,this.phone),localStorage.setItem(y["a"].STORAGES_USERNAME,this.phone),localStorage.setItem(y["a"].STORAGES_PHONE_REGION,this.country_code),this.isKeepPw?(localStorage.setItem(y["a"].STORAGES_PHONE_PW,e),localStorage.setItem(y["a"].STORAGES_PW,e)):(localStorage.removeItem(y["a"].STORAGES_PHONE_PW),localStorage.removeItem(y["a"].STORAGES_PHONE_REGION)),this.loginIn(t,o)},e.prototype.onEmaillLogin=function(){var t=f["a"].URL_AUTH_LOGIN,e=this.emailPassword;this.isPwMd5&&(e=O()(this.emailPassword).toString());var o=new T["i"];o.username=this.email,o.password=e,o.src_channel=y["a"].getSrcChannel(),localStorage.setItem(y["a"].STORAGES_EMAIL,this.email),localStorage.setItem(y["a"].STORAGES_USERNAME,this.email),this.isKeepPw?(localStorage.setItem(y["a"].STORAGES_EMAIL_PW,e),localStorage.setItem(y["a"].STORAGES_PW,e)):localStorage.removeItem(y["a"].STORAGES_EMAIL_PW),this.loginIn(t,o)},e.prototype.loginIn=function(t,e){return g["a"](this,void 0,void 0,function(){var o,i;return g["d"](this,function(n){switch(n.label){case 0:return this.isLoading=!0,this.loadingMsg=S["a"].getTipsMsg(S["a"].KEY_LOADING),o=this,[4,this.http.post(t,e)];case 1:return o.backData=n.sent(),this.backData.code==f["a"].HTTP_SUCCESS_NET_CODE?(this.isLoading=!1,i=this.backData.data,y["a"].addUserToken(i.login_info),y["a"].addUserInfo(i.user_info),this.onLoginSuccess()):(this.isLoading=!1,this.onLoginFaild(this.backData)),[2]}})})},e.prototype.onLoginSuccess=function(){},e.prototype.onLoginFaild=function(t){},e=g["b"]([_["a"]],e),e}(_["c"]),w=o("53f9"),I=o("b971"),b=(o("db4d"),o("b9c5")),v=o("d939"),k=o("dfe7"),R=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"third_login_head"},[o("p",{staticClass:"third_login_title"},[t._v(t._s(t.$t("login.l26")))])]),o("p",{staticClass:"third_login_msg"},[t._v(t._s(t.$t("login.l27")))]),o("ul",{staticClass:"third_login"},[o("li",{staticClass:"third_login_type"},[o("a",{attrs:{href:"https://open.weixin.qq.com/connect/qrconnect?appid=wxa2f4d7b57bb97e5a&redirect_uri=https://api.bohe.com/api/auth/open/wx&response_type=code&scope=snsapi_login&state="+t.webParam.region_code+"_0_"+t.languageType+"_1&connect_redirect=1#wechat_redirect"}},[o("i",{staticClass:"third_login_wechat third_login_icon"})])]),o("li",{staticClass:"third_login_type"},[o("a",{attrs:{href:"https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101502267&redirect_uri=https://api.bohe.com/api/auth/open/qq&state="+t.webParam.region_code+"_0_"+t.languageType+"_1&scope=get_user_info"}},[o("i",{staticClass:"third_login_qq third_login_icon"})])]),o("li",{staticClass:"third_login_type"},[o("a",{attrs:{href:"https://api.weibo.com/oauth2/authorize?client_id=1072947333&response_type=code&state="+t.webParam.region_code+"_0_"+t.languageType+"_1&redirect_uri=https://api.bohe.com/api/auth/open/sina"}},[o("i",{staticClass:"third_login_weibo third_login_icon"})])]),0==t.webParam.region_code?o("li",{staticClass:"third_login_type"},[o("a",{on:{click:t.onClickOpenFacebook}},[o("i",{staticClass:"third_login_facebook third_login_icon"})])]):t._e(),0==t.webParam.region_code?o("li",{staticClass:"third_login_type"},[t._m(0)]):t._e()])])},A=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("a",{attrs:{id:"googleBtn"}},[o("i",{staticClass:"third_login_google third_login_icon"})])}],L=function(){function t(){this.open_id="",this.state="",this.open_type=0}return t.OPEN_TYPE_GOOGLE=8,t.OPEN_TYPE_TWITTER=9,t.OPEN_TYPE_FACEBOOK=10,t}(),C=(function(){function t(){}}(),o("65d9")),M=o.n(C),N=o("1157"),G=o.n(N),U=o("463f"),F=(o("386d"),o("28a5"),function(){function t(){this.authorize_url="https://api.twitter.com/oauth/authenticate?oauth_token=",this.step1_method="POST",this.step1_url="https://twitter.com/oauth/request_token",this.step1_nonce=Math.ceil(100*Math.random()).toString(),this.step1_timestamp=Math.floor((new Date).getTime()/1e3).toString()}return t.prototype.init=function(t,e){var o=this.getOAuthStr(t,e),i=null,n=new XMLHttpRequest;n.withCredentials=!0,n.addEventListener("readystatechange",function(){4===this.readyState&&console.log(this.responseText)}),n.open("POST","https://twitter.com/oauth/request_token"),n.setRequestHeader("Authorization",o),n.setRequestHeader("cache-control","no-cache"),n.send(i)},t.prototype.getSignature=function(t,e){this.step1_nonce,this.step1_timestamp;var o="";return o},t.prototype.getOAuthStr=function(t,e){var o=this.getSignature(t,e),i='OAuth oauth_consumer_key=\\"'+t+'\\",oauth_signature_method=\\"HMAC-SHA1\\"';return i+=',oauth_timestamp=\\"'+this.step1_timestamp+'\\",oauth_nonce=\\"'+this.step1_nonce,i+='\\",oauth_version=\\"1.0\\",oauth_signature=\\"'+o+'\\"',i},t.prototype.closePopup=function(){this.popup&&!this.popup.closed&&this.popup.close()},t.prototype.getUrlQueryObject=function(t){var e,o={};if(!t)return!1;for(var i=t.slice(1).split("&"),n=0;n<i.length;n++)e=i[n].split("="),o[e[0]]=e[1];return o},t.prototype.sendError=function(t,e){var o={success:!1,message:t||"Some Error Occurred"};"function"===typeof e&&e(o)},t.prototype.getOAuthToken=function(t){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4!=this.readyState);else{if(0===this.status)return t("Internet Disconnected/Connection Timeout");try{var e=JSON.parse(this.response);t(null,e)}catch(o){t(o.message)}}},e.open("GET",this.request_url,!0),e.send()},t.prototype.authorize=function(t){if(!this.popup)return t("Popup Not initialized");this.popup.location.href=this.authorize_url+this.oauth_token;var e=function e(){setTimeout(function(){return this.popup.closed?t(null,this.getUrlQueryObject(this.popup.location.search)):e()},25)};e()},t.prototype.connect=function(t){if(!this.request_url)return this.sendError("Request URL not provided",t);this.popup=window.open(null,"_blank","height=400,width=800,left=250,top=100,resizable=yes",!0),this.getOAuthToken(function(e,o){return e?(this.closePopup(),this.sendError(e,t)):o.success?(this.oauth_token=o.oauth_token,void this.authorize(function(e,o){return e?(this.closePopup(),this.sendError(e,t)):o&&o.oauth_token?o.oauth_token!==this.oauth_token?this.sendError("Invalid OAuth Token received from Twitter.",t):void t({success:!0,oauth_token:o.oauth_token,oauth_verifier:o.oauth_verifier}):(this.closePopup(),this.sendError("OAuth Token not Found",t))})):(this.closePopup(),this.sendError(o.message,t))})},t}()),Y=F,D=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.facebookIsInit=!1,e.googleIsInit=!1,e.twitterUtil=null,e.http=new f["a"],e.isLoading=!1,e}return g["c"](e,t),e.prototype.execute=function(){},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.init=function(){},e.prototype.initFaceBookSdk=function(t){U["a"].log("facebook初始化...");var e=this;G()(document).ready(function(){G.a.ajaxSetup({cache:!0}),G.a.getScript("https://connect.facebook.net/en_US/sdk.js",function(){FB.init({appId:t,version:"v3.2"}),U["a"].log("facebook初始化完成!"),e.facebookIsInit=!0,e.sdkInitSuccess(L.OPEN_TYPE_FACEBOOK)})})},e.prototype.onOpenFacebook=function(){if(this.facebookIsInit){var t=this;FB.login(function(e){e.authResponse?(U["a"].log("face登录成功!",e),t.loginSuccess(e.authResponse.userID,L.OPEN_TYPE_FACEBOOK)):alert("login error!")})}},e.prototype.initTwitterSdk=function(t,e){null==this.twitterUtil&&(this.twitterUtil=new Y),this.twitterUtil.init(t,e)},e.prototype.initGoogleSdk=function(t){U["a"].log("google sdk初始化...");var e=this;G()(document).ready(function(){G.a.ajaxSetup({cache:!0}),G.a.getScript("https://apis.google.com/js/api:client.js",function(){gapi.load("auth2",function(){e.googleAuth2=gapi.auth2.init({client_id:t,cookiepolicy:"single_host_origin",scope:"profile"}),e.onOpenGoogle(document.getElementById("googleBtn")),U["a"].log("google初始化完成!"),e.googleIsInit=!0,e.sdkInitSuccess(L.OPEN_TYPE_GOOGLE)})})})},e.prototype.sdkInitSuccess=function(t){},e.prototype.onOpenGoogle=function(t){var e=this;this.googleAuth2.attachClickHandler(t,{},function(t){var o=e.googleAuth2.currentUser.get().getBasicProfile();U["a"].log("google登录成功!",o),e.loginSuccess(o.getId(),L.OPEN_TYPE_GOOGLE)},function(t){console.log(t)})},e.prototype.loginSuccess=function(t,e){},e.prototype.autoForeignlogin=function(t,e){return g["a"](this,void 0,void 0,function(){var o;return g["d"](this,function(i){return o=t,o+="?open_id="+e.open_id,o+="&state="+e.state,o+="&open_type="+e.open_type,window.location.href=o,[2]})})},e=g["b"]([M.a],e),e}(_["c"]),H=D,K=o("c494"),B=o("9347"),j=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.webParam=b["a"].getInstace(),e.base_url="",e.languageType="",e.facebook_appId="182452479351836",e.twitter_appId="15926672",e.twitter_secret="MVA4G99tUJ1FRpierp3I5KLmknBTxQqMMXv5FhV7hLOKf",e.google_appId="356035932087-e3rp0iottdavj4b09sgjo9kmc3887ov8.apps.googleusercontent.com",e}return g["c"](e,t),e.prototype.created=function(){this.languageType=B["a"].getLanguageType(this.webParam.language),this.setBaseUrl(K["a"].getBaseUrl()),this.base_url=K["a"].getBaseUrl(),this.webParam.region_code==B["a"].REGION_CODE_0&&(this.initFaceBookSdk(this.facebook_appId),this.initTwitterSdk(this.twitter_appId,this.twitter_secret),this.initGoogleSdk(this.google_appId))},e.prototype.onClickOpenFacebook=function(){this.facebookIsInit&&this.onOpenFacebook()},e.prototype.onClickOpenGoogle=function(){},e.prototype.loginSuccess=function(t,e){if(""!=t&&null!=t){U["a"].log("授权userId:"+t);var o=new L;o.open_id=t,o.open_type=e,o.state=this.webParam.region_code+"_0"+this.languageType;var i=K["a"].getBaseUrl()+f["a"].URL_AUTH_FOREIGN_LOGIN;this.autoForeignlogin(i,o)}else alert("authorization failed!!")},e=g["b"]([_["a"]],e),e}(H),q=j,W=q,x=o("2877"),z=Object(x["a"])(W,R,A,!1,null,null,null),$=z.exports,J=o("a925");_["c"].prototype.$notify=l.a,_["c"].use(p.a),_["c"].use(c.a),_["c"].use(s.a),_["c"].config.productionTip=!1,_["c"].use(J["a"]);b["a"].getInstace();var Q=d["a"].getInstance();Q.init();var X=new J["a"](Q),V=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.webParam=b["a"].getInstace(),e}return g["c"](e,t),e.prototype.created=function(){w["a"].log("注册log"),this.setBaseUrl(w["a"].getBaseUrl()),this.init()},e.prototype.mounted=function(){},e.prototype.goHome=function(){v["a"].backHome()},e.prototype.onChangeLoginType=function(t){this.changeLoginType(t)},e.prototype.onLogin=function(){var t=!0,e="";if(0==this.loginType){if("86"==this.country_code&&!I["a"].checkPhone(this.phone)&&t&&(e=S["a"].getTipsMsg(S["a"].KEY_NOTIF_PHONE_ERROR),t=!1,""==this.phone&&(e=S["a"].getTipsMsg(S["a"].KEY_NOTIF_PHONE_EMPTY),t=!1)),this.isPwMd5?""==this.phonePassword&&(e=S["a"].getTipsMsg(S["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1):!I["a"].checkRemberPwd(this.phonePassword)&&t&&(e=S["a"].getTipsMsg(S["a"].KEY_NOTIF_PASSWORD_ERROR),t=!1,""==this.phonePassword&&(e=S["a"].getTipsMsg(S["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),!t)return void this.$notify({title:S["a"].getTipsMsg(S["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"});this.setLoadingStatuas(!0),this.onPhoneLogin()}else{if(!I["a"].checkEmail(this.email)&&t&&(I["a"].checkAccount(this.email)||(e=S["a"].getTipsMsg(S["a"].KEY_NOTIF_ACCOUNT_ERROR),t=!1),""==this.email&&(e=S["a"].getTipsMsg(S["a"].KEY_NOTIF_ACCOUNT_EMPTY),t=!1)),this.isPwMd5?""==this.emailPassword&&(e=S["a"].getTipsMsg(S["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1):!I["a"].checkRemberPwd(this.emailPassword)&&t&&(e=S["a"].getTipsMsg(S["a"].KEY_NOTIF_PASSWORD_ERROR),t=!1,""==this.emailPassword&&(e=S["a"].getTipsMsg(S["a"].KEY_NOTIF_PASSWORD_EMPTY),t=!1)),!t)return void this.$notify({title:S["a"].getTipsMsg(S["a"].KEY_NOTIF_ERROR_TITLE),message:e,type:"warning"});this.setLoadingStatuas(!0),this.onEmaillLogin()}},e.prototype.onLoginSuccess=function(){this.notifTitle=S["a"].getTipsMsg(S["a"].KEY_NOTIF_SUCCESS_TITLE),this.notifType="success",this.notifMessage=S["a"].getTipsMsg(S["a"].KEY_NOTIF_LOGIN),this.notifNum++;this.isLoading=!0;var t=B["a"].getUrlParam("to");if(""!=t){var e=n()(B["a"].getUrlParam("page"));setTimeout(function(){v["a"].toPage(t,e)},1e3)}else setTimeout(function(){v["a"].backUser()},1e3)},e.prototype.onLoginFaild=function(t){this.notifTitle=S["a"].getTipsMsg(S["a"].KEY_NOTIF_ERROR_TITLE),this.notifType="warning",this.notifMessage=t.msg,this.notifNum++},e.prototype.passwordInput=function(t){this.onPasswordInput(t)},e.prototype.onSelectCountryCode=function(t){this.country_code=t},e.prototype.setLoadingStatuas=function(t){this.isLoading=t,this.loadingMsg=S["a"].getTipsMsg(S["a"].KEY_LOADING)},e=g["b"]([Object(_["a"])({watch:{notifNum:function(t,e){this.$notify({title:Z.notifTitle,message:Z.notifMessage,type:Z.notifType})}},components:{"foot-nav-two":k["a"],"oauth-login":$}})],e),e}(P),Z=new V({i18n:X}).$mount("#app")}});