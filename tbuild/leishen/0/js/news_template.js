(function(e){function t(t){for(var o,i,u=t[0],s=t[1],c=t[2],d=0,p=[];d<u.length;d++)i=u[d],r[i]&&p.push(r[i][0]),r[i]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);l&&l(t);while(p.length)p.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,u=1;u<n.length;u++){var s=n[u];0!==r[s]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={news_template:0},a=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var l=s;a.push([24,"chunk-vendors","chunk-common"]),n()})({24:function(e,t,n){e.exports=n("ce05")},ce05:function(e,t,n){"use strict";n.r(t);var o=n("9ab4"),r=(n("76ca"),n("db4d"),n("60a3")),a=n("aaaf"),i=n("1189"),u=n("360e"),s=n("a925"),c=n("b9c5"),l=n("3435"),d=n("ebb9"),p=n("d939"),f=n("a306"),g=n("255e"),h=n("9347");r["c"].config.productionTip=!1,r["c"].use(s["a"]);c["a"].getInstace(h["a"].REGION_CODE_1,h["a"].ZH_CN);var w=l["a"].getInstance();w.init();var b=new s["a"](w),v=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.webParam=c["a"].getInstace(),t.pre_id="",t.next_id="",t.questionList=[],t.windowsDownloadUrl="",t.macDownloadUrl="",t}return o["c"](t,e),t.prototype.created=function(){this.onGetQuestionList(),this.getDownloadUrl(),this.pre_id=document.getElementById("pre_id").getAttribute("pre_id"),this.next_id=document.getElementById("next_id").getAttribute("next_id")},t.prototype.onChangeLanguage=function(e){w.changeLanguage(e),b.locale=w.locale,d["a"].log("切换语言:"+w.locale)},t.prototype.getDownloadUrl=function(){return o["a"](this,void 0,void 0,function(){var e;return o["d"](this,function(t){switch(t.label){case 0:return[4,g["a"].getInstance().download()];case 1:return e=t.sent(),this.windowsDownloadUrl=e.leigod.windows.download_url,this.macDownloadUrl=e.leigod.mac.download_url,[2]}})})},t.prototype.gotoNews=function(){p["a"].backNews()},t.prototype.goNewsdetail=function(e){var t=0;0==e?t=parseInt(this.pre_id):1==e&&(t=parseInt(this.next_id)),p["a"].gotoNewsDetails(t)},t.prototype.onGetQuestionList=function(){return o["a"](this,void 0,void 0,function(){var e,t;return o["d"](this,function(n){switch(n.label){case 0:return e=new f["k"],e.baseUrl=d["a"].getStafUrl(),e.page=1,e.size=4,e.support_type=1,e.region_code=this.webParam.region_code,[4,g["a"].getInstance().getQuestionssList(e)];case 1:return t=n.sent(),this.questionList=t.list,[2]}})})},t=o["b"]([Object(r["a"])({components:{"head-nav":a["a"],"foot-nav":i["a"],"download-box":u["a"]}})],t),t}(r["c"]);new v({i18n:b}).$mount("#app")}});