(function(e){function t(t){for(var o,i,s=t[0],u=t[1],c=t[2],p=0,f=[];p<s.length;p++)i=s[p],r[i]&&f.push(r[i][0]),r[i]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,s=1;s<n.length;s++){var u=n[s];0!==r[u]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={login:0},a=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=u;a.push([3,"chunk-vendors","chunk-common"]),n()})({3:function(e,t,n){e.exports=n("de28")},de28:function(e,t,n){"use strict";n.r(t);n("0fb7"),n("450d");var o=n("f529"),r=n.n(o),a=(n("be4f"),n("896a")),i=n.n(a),s=(n("f4f9"),n("c2cc")),u=n.n(s),c=(n("7a0f"),n("0f6c")),l=n.n(c),p=(n("560b"),n("dcdc")),f=n.n(p),d=(n("10cb"),n("f3ad")),h=n.n(d),g=(n("cadf"),n("551c"),n("f751"),n("097d"),n("9ab4")),b=n("60a3"),m=(n("db4d"),n("8487")),S=n("f164"),v=(n("78fc"),n("dd13")),y=n("a888"),w=n("9b4d"),O=n("2c64"),_=n("9d9a");b["b"].use(h.a),b["b"].use(f.a),b["b"].use(l.a),b["b"].use(u.a),b["b"].use(i.a),b["b"].prototype.$message=r.a;var E=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.username="",t.password="",t.isKeepPw=!1,t.isLoading=!1,t.xmlHttp=new y["a"],t}return g["c"](t,e),t.prototype.setBaseUrl=function(e){this.xmlHttp.setBaseUrl(e)},t.prototype.created=function(){console.log("登录log"),this.setBaseUrl(v["a"].getBaseUrl()),this.init()},t.prototype.init=function(){var e=localStorage.getItem(w["a"].STORAGES_USERNAME);null!=e&&"undefined"!=e&&(this.username=e);var t=localStorage.getItem(w["a"].STORAGES_PW);null!=t&&"undefined"!=t&&(this.password=t,this.isKeepPw=!0)},t.prototype.onlogin=function(){var e=y["a"].URL_WBOP_DO_LOGIN,t=new O["b"];t.mini_username=this.username,t.mini_password=this.password,localStorage.setItem(w["a"].STORAGES_USERNAME,this.username),this.isKeepPw?localStorage.setItem(w["a"].STORAGES_PW,this.password):localStorage.removeItem(w["a"].STORAGES_PW),this.loginIn(e,t)},t.prototype.loginIn=function(e,t){return g["a"](this,void 0,void 0,function(){var n,o,r;return g["d"](this,function(a){switch(a.label){case 0:return this.isLoading=!0,this.loadingMsg=_["a"].getTipsMsg(_["a"].KEY_LOADING),n=this,[4,this.xmlHttp.post(e,t)];case 1:return n.backData=a.sent(),this.backData.code==y["a"].HTTP_SUCCESS_NET_CODE?(this.isLoading=!1,o=this.backData,r=o.token+"",w["a"].setCookie(w["a"].STORAGES_TOKEN,r),this.onLoginSuccess()):(this.isLoading=!1,this.onLoginFaild(this.backData)),[2]}})})},t.prototype.onLoginSuccess=function(){window.location.href="user.html"},t.prototype.onLoginFaild=function(e){this.$message({message:e.msg,type:"error"})},t=g["b"]([Object(b["a"])({components:{"header-nav":m["a"],"footer-nav":S["a"]}})],t),t}(b["b"]);t["default"]=E,new E({}).$mount("#login")}});