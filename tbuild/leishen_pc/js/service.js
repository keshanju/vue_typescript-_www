(function(t){function e(e){for(var n,a,s=e[0],p=e[1],h=e[2],u=0,d=[];u<s.length;u++)a=s[u],r[a]&&d.push(r[a][0]),r[a]=0;for(n in p)Object.prototype.hasOwnProperty.call(p,n)&&(t[n]=p[n]);c&&c(e);while(d.length)d.shift()();return o.push.apply(o,h||[]),i()}function i(){for(var t,e=0;e<o.length;e++){for(var i=o[e],n=!0,s=1;s<i.length;s++){var p=i[s];0!==r[p]&&(n=!1)}n&&(o.splice(e--,1),t=a(a.s=i[0]))}return t}var n={},r={service:0},o=[];function a(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=t,a.c=n,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(i,n,function(e){return t[e]}.bind(null,n));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],p=s.push.bind(s);s.push=e,s=s.slice();for(var h=0;h<s.length;h++)e(s[h]);var c=p;o.push([9,"chunk-vendors","chunk-common"]),i()})({9:function(t,e,i){t.exports=i("a0ad")},a0ad:function(t,e,i){"use strict";i.r(e);var n=i("9ab4"),r=(i("607d"),i("fdfc"),i("60a3")),o=i("1831"),a=i("dfdf"),s=i("42d1"),p=(i("db4d"),i("a925")),h=i("0793"),c=i("9347"),u=(i("a481"),i("4917"),i("28a5"),function(){function t(){this.WEBCHAT_BASE_URL=document.location.protocol+"//uchat.im-cc.com/webchat_new/static/",this.WEBCHAT_PC_URL="",this.WEBCHAT_IE_URL="",this.WEBCHAT_MOBILE_URL="",this.WEBCHAT_WX_URL="",this.WEBCHAT_PC_URL=this.WEBCHAT_BASE_URL+"google/index.html",this.WEBCHAT_IE_URL=this.WEBCHAT_BASE_URL+"ie8/index.html",this.WEBCHAT_MOBILE_URL=this.WEBCHAT_BASE_URL+"moblie/index.html",this.WEBCHAT_WX_URL=this.WEBCHAT_BASE_URL+"wx/index.html"}return t.prototype.pop=function(t){this.imnumber=t.imnumber,this.isstatic=t.isstatic,this.hastab=t.hastab,this.openid=t.openid,this.params=t.params,this.box=t.box},t.prototype.getReferrer=function(){var t="",e="";try{e=window.top.document.referrer}catch(t){e=""}if(""===e)t=e;else{var i=e.split("//"),n=i[1].indexOf("/");t=i[1].substring(0,n)}return t},t.prototype.show=function(){document.getElementById("adaptation").style.display="block"},t.prototype.ready=function(t){var e=this.getReferrer(),i=600,n=450;if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){var r=window.navigator.userAgent.toLowerCase();if("micromessenger"==r.match(/MicroMessenger/i))var o=this.WEBCHAT_WX_URL;else o=this.WEBCHAT_MOBILE_URL;o+="?ht="+this.imnumber,this.openid&&"0"!==this.openid&&(o+="&openid="+this.openid),this.params&&(o+="&params="+this.params),o+="&timestamp="+(new Date).getTime(),o+="&sourceURL="+e,window.location.href=o}else{if(!this.box){var a=document.createElement("div");a.style.display="none",a.style.width="600px",a.style.height="450px",a.style.overflow="hidden",a.style.margin="1% auto",a.id="adaptation";var s=document.createElement("iframe");s.src="",s.id="mainiframe",s.width="100%",s.height="100%",s.frameBorder="0",a.appendChild(s),document.body.appendChild(a)}o=this.WEBCHAT_PC_URL;if(("Microsoft Internet Explorer"==navigator.appName&&"MSIE8.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"")||"Microsoft Internet Explorer"==navigator.appName&&"MSIE9.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"")||navigator.userAgent.indexOf("Firefox")>0)&&(o=this.WEBCHAT_IE_URL),o+="?ht="+this.imnumber,this.openid&&"0"!==this.openid&&(o+="&openid="+this.openid),this.hastab&&(this.box||(document.getElementById("adaptation").style.width="900px",document.getElementById("adaptation").style.height="600px"),i=900,n=600,o+="&hastab="+this.hastab),this.params&&(o+="&params="+this.params),o+="&timestamp="+(new Date).getTime(),o+="&sourceURL="+e,this.isstatic&&"true"==this.isstatic)window.location.href=o;else if(this.box){var p="height="+n+",width="+i+",toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,top=50,left=200";window.open(o,"_blank",p)}else document.getElementById("mainiframe").src=o}null!=t&&t(this)},t.prototype.openWeb=function(t){void 0===t&&(t=!1);var e=this.getReferrer(),i=this.WEBCHAT_PC_URL;return i+="?ht="+this.imnumber,i+="&openid="+this.openid,i+="&timestamp="+(new Date).getTime(),this.openid&&"0"!==this.openid&&(i+="&openid="+this.openid),this.params&&(i+="&params="+this.params),i+="&sourceURL="+e,t&&window.open(i),i},t}()),d=u,l=function(){function t(){this.imnumber="0",this.hastab=!0,this.isstatic=!1,this.openid="0",this.params="",this.box=!0}return t}(),m=i("c665");r["c"].config.productionTip=!1,r["c"].use(p["a"]);a["a"].getInstace(c["a"].REGION_CODE_1,c["a"].ZH_CN);var f=h["a"].getInstance();f.initNoRefresh();var b=new p["a"](f),g=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.appParam=a["a"].getInstace(),e.http=new o["a"],e}return n["c"](e,t),e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.onUchat=function(){var t=new d,e=new l;e.imnumber=m["a"].UC_IM_Number,e.box=!0,t.pop(e);var i=t.openWeb(),n=s["a"].getInstance().getFactory(this.appParam.platform);n.jumpUrl(i)},e=n["b"]([r["a"]],e),e}(r["c"]);new g({i18n:b}).$mount("#app")}});