(function(t){function e(e){for(var n,s,a=e[0],u=e[1],p=e[2],l=0,h=[];l<a.length;l++)s=a[l],i[s]&&h.push(i[s][0]),i[s]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);c&&c(e);while(h.length)h.shift()();return r.push.apply(r,p||[]),o()}function o(){for(var t,e=0;e<r.length;e++){for(var o=r[e],n=!0,a=1;a<o.length;a++){var u=o[a];0!==i[u]&&(n=!1)}n&&(r.splice(e--,1),t=s(s.s=o[0]))}return t}var n={},i={threelogin:0},r=[];function s(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=n,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(o,n,function(e){return t[e]}.bind(null,n));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=e,a=a.slice();for(var p=0;p<a.length;p++)e(a[p]);var c=u;r.push([23,"chunk-vendors","chunk-common"]),o()})({23:function(t,e,o){t.exports=o("861e")},"861e":function(t,e,o){"use strict";o.r(e);o("cadf"),o("551c"),o("097d");var n=o("9ab4"),i=(o("3a37"),o("499a"),o("65d9")),r=o.n(i),s=o("1831"),a=o("60a3"),u=function(){function t(){this.open_id="",this.state="",this.open_type=0}return t.OPEN_TYPE_GOOGLE=8,t.OPEN_TYPE_TWITTER=9,t.OPEN_TYPE_FACEBOOK=10,t}(),p=(function(){function t(){}}(),o("1157")),c=o.n(p),l=o("463f"),h=(o("386d"),o("28a5"),function(){function t(){this.authorize_url="https://api.twitter.com/oauth/authenticate?oauth_token="}return t.prototype.init=function(t,e){this.popup=window,this.api_key=t,this.request_url=e},t.prototype.closePopup=function(){this.popup&&!this.popup.closed&&this.popup.close()},t.prototype.getUrlQueryObject=function(t){var e,o={};if(!t)return!1;for(var n=t.slice(1).split("&"),i=0;i<n.length;i++)e=n[i].split("="),o[e[0]]=e[1];return o},t.prototype.sendError=function(t,e){var o={success:!1,message:t||"Some Error Occurred"};"function"===typeof e&&e(o)},t.prototype.getOAuthToken=function(t){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4!=this.readyState);else{if(0===this.status)return t("Internet Disconnected/Connection Timeout");try{var e=JSON.parse(this.response);t(null,e)}catch(e){t(e.message)}}},e.open("GET",this.request_url,!0),e.send()},t.prototype.authorize=function(t){if(!this.popup)return t("Popup Not initialized");this.popup.location.href=this.authorize_url+this.oauth_token;var e=function e(){setTimeout(function(){return this.popup.closed?t(null,this.getUrlQueryObject(this.popup.location.search)):e()},25)};e()},t.prototype.connect=function(t){if(!this.request_url)return this.sendError("Request URL not provided",t);this.popup=window.open(null,"_blank","height=400,width=800,left=250,top=100,resizable=yes",!0),this.getOAuthToken(function(e,o){return e?(this.closePopup(),this.sendError(e,t)):o.success?(this.oauth_token=o.oauth_token,void this.authorize(function(e,o){return e?(this.closePopup(),this.sendError(e,t)):o&&o.oauth_token?o.oauth_token!==this.oauth_token?this.sendError("Invalid OAuth Token received from Twitter.",t):void t({success:!0,oauth_token:o.oauth_token,oauth_verifier:o.oauth_verifier}):(this.closePopup(),this.sendError("OAuth Token not Found",t))})):(this.closePopup(),this.sendError(o.message,t))})},t}()),f=h,g=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.facebookIsInit=!1,e.googleIsInit=!1,e.twitterUtil=null,e.http=new s["a"],e.isLoading=!1,e}return n["c"](e,t),e.prototype.execute=function(){},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.init=function(){},e.prototype.initFaceBookSdk=function(t){l["a"].log("facebook初始化...");var e=this;c()(document).ready(function(){c.a.ajaxSetup({cache:!0}),c.a.getScript("https://connect.facebook.net/en_US/sdk.js",function(){FB.init({appId:t,version:"v3.2"}),l["a"].log("facebook初始化完成!"),e.facebookIsInit=!0,e.sdkInitSuccess(u.OPEN_TYPE_FACEBOOK)})})},e.prototype.onOpenFacebook=function(){if(this.facebookIsInit){var t=this;FB.login(function(e){e.authResponse?(l["a"].log("face登录成功!",e),t.loginSuccess(e.authResponse.userID,u.OPEN_TYPE_FACEBOOK)):alert("login error!")})}},e.prototype.initTwitterSdk=function(t,e){null==this.twitterUtil&&(this.twitterUtil=new f),this.twitterUtil.init(t,e)},e.prototype.initGoogleSdk=function(t){l["a"].log("google sdk初始化...");var e=this;c()(document).ready(function(){c.a.ajaxSetup({cache:!0}),c.a.getScript("https://apis.google.com/js/api:client.js",function(){gapi.load("auth2",function(){e.googleAuth2=gapi.auth2.init({client_id:t,cookiepolicy:"single_host_origin",scope:"profile"}),e.onOpenGoogle(document.getElementById("googleBtn")),l["a"].log("google初始化完成!"),e.googleIsInit=!0,e.sdkInitSuccess(u.OPEN_TYPE_GOOGLE)})})})},e.prototype.sdkInitSuccess=function(t){},e.prototype.onOpenGoogle=function(t){var e=this;this.googleAuth2.attachClickHandler(t,{},function(t){var o=e.googleAuth2.currentUser.get().getBasicProfile();l["a"].log("google登录成功!",o),e.loginSuccess(o.getId(),u.OPEN_TYPE_GOOGLE)},function(t){console.log(t)})},e.prototype.loginSuccess=function(t,e){},e.prototype.autoForeignlogin=function(t,e){return n["a"](this,void 0,void 0,function(){var o;return n["d"](this,function(n){return o=t,o+="?open_id="+e.open_id,o+="&state="+e.state,o+="&open_type="+e.open_type,window.location.href=o,[2]})})},e=n["b"]([r.a],e),e}(a["c"]),d=g,_=o("b890"),y=o("dfdf"),k=o("9347"),O=o("42d1"),E=(o("db4d"),function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.appParam=y["a"].getInstace(),e.languageType="",e.facebook_appId="182452479351836",e.twitter_appId="15926672",e.twitter_secret="MVA4G99tUJ1FRpierp3I5KLmknBTxQqMMXv5FhV7hLOKf",e.google_appId="356035932087-e3rp0iottdavj4b09sgjo9kmc3887ov8.apps.googleusercontent.com",e}return n["c"](e,t),e.prototype.created=function(){this.setBaseUrl(_["a"].getBaseUrl());var t=parseInt(k["a"].getUrlParam("open_type"));switch(t){case u.OPEN_TYPE_GOOGLE:this.initGoogleSdk(this.google_appId);break;case u.OPEN_TYPE_TWITTER:this.initTwitterSdk(this.twitter_appId,this.twitter_secret);break;case u.OPEN_TYPE_FACEBOOK:this.initFaceBookSdk(this.facebook_appId);break;default:break}this.languageType=k["a"].getLanguageType(this.appParam.language)},e.prototype.sdkInitSuccess=function(t){switch(t){case u.OPEN_TYPE_GOOGLE:this.onClickOpenGoogle();break;case u.OPEN_TYPE_TWITTER:break;case u.OPEN_TYPE_FACEBOOK:this.onOpenFacebook();break;default:break}},e.prototype.onClickOpenFacebook=function(){this.facebookIsInit&&this.onOpenFacebook()},e.prototype.onClickOpenGoogle=function(){this.googleIsInit&&document.getElementById("googleBtn").click()},e.prototype.loginSuccess=function(t,e){if(""!=t&&null!=t){l["a"].log("授权userId:"+t);var o=new u;o.open_id=t,o.open_type=e,o.state=this.appParam.region_code+"_1_"+this.languageType;var n=O["a"].getInstance().getFactory(this.appParam.platform),i=JSON.stringify(o);n.foreignLoginJump(i)}},e=n["b"]([a["a"]],e),e}(d));e["default"]=E;(new E).$mount("#app")}});