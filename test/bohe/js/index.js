(function(t){function e(e){for(var n,i,s=e[0],c=e[1],u=e[2],l=0,h=[];l<s.length;l++)i=s[l],a[i]&&h.push(a[i][0]),a[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);p&&p(e);while(h.length)h.shift()();return r.push.apply(r,u||[]),o()}function o(){for(var t,e=0;e<r.length;e++){for(var o=r[e],n=!0,s=1;s<o.length;s++){var c=o[s];0!==a[c]&&(n=!1)}n&&(r.splice(e--,1),t=i(i.s=o[0]))}return t}var n={},a={index:0},r=[];function i(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=n,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(o,n,function(e){return t[e]}.bind(null,n));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var p=c;r.push([15,"chunk-vendors","chunk-common"]),o()})({15:function(t,e,o){t.exports=o("70a7")},"70a7":function(t,e,o){"use strict";o.r(e);o("0c67"),o("450d");var n=o("299c"),a=o.n(n),r=o("9ab4"),i=(o("8e56"),o("c8d7")),s=o("a7a2"),c=o("5889"),u=o("60a3"),p=o("90ae"),l=o("53f9"),h=(o("db4d"),o("b9c5")),f=o("a306"),d=o("1831"),g=o("d939"),w=o("7d83"),b=o("3c6c"),y=o("463f"),v=o("a925"),_=o("c1e6");u["c"].config.productionTip=!1,u["c"].use(a.a),u["c"].use(v["a"]);h["a"].getInstace();var k=p["a"].getInstance();k.init();var D=new v["a"](k),m=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.webParam=h["a"].getInstace(),e.newsList=[],e.notifyList=[],e.activityList=[],e.imageHeadUrl="",e.token=new b["v"],e.windowsDownloadUrl="",e.macDownloadUrl="",e.checkBtn=0,e.browserTipShow=!1,e.http=new d["a"],e}return r["c"](e,t),e.prototype.created=function(){this.debugInfo(),this.setBaseUrl(l["a"].getBaseUrl()),this.imageHeadUrl=l["a"].getImgBaseUrl(),this.getNotifyList(),this.getNewsList(),this.getActivityList(),this.token=w["a"].getUserToken(),this.checkBrowserVersion()},e.prototype.checkBrowserVersion=function(){var t=new _["a"];t.getBrowser(),9==t.browser_version&&(this.browserTipShow=!0)},e.prototype.closeBrowserTip=function(){this.browserTipShow=!1},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.onDownloadConfig=function(t){var e=t.bohe.down_platform[this.webParam.from];this.windowsDownloadUrl=e.windows.download_url,this.macDownloadUrl=e.mac.download_url},e.prototype.windowsDownload=function(){var t=new _["a"];t.getBrowser(),window.location.href=this.windowsDownloadUrl},e.prototype.onChangeLanguage=function(t){k.changeLanguage(t),D.locale=k.locale,this.webParam.language=t,l["a"].log("切换语言:"+k.locale)},e.prototype.changeCheckBtn=function(t){this.checkBtn=t},e.prototype.goNotifyDetail=function(t){g["a"].gotoNoticeDetails(t)},e.prototype.goNotify=function(){g["a"].backNotice()},e.prototype.goNewsDetail=function(t){g["a"].gotoNewsDetails(t)},e.prototype.goNews=function(){g["a"].backNews()},e.prototype.goAbout=function(){g["a"].backAbout()},e.prototype.goRegister=function(){g["a"].backRegister()},e.prototype.getNotifyList=function(){return r["a"](this,void 0,void 0,function(){var t,e,o;return r["d"](this,function(n){switch(n.label){case 0:return t=d["a"].URL_NEWS,e=new f["e"],e.page=0,e.size=8,e.support_type=1,e.class_type=0,e.region_code=w["a"].getRegionCodes(),o=this,[4,this.http.get(t,e)];case 1:return o.backData=n.sent(),this.backData.code==d["a"].HTTP_SUCCESS_NET_CODE&&(this.notifyList=this.backData.data.list),[2]}})})},e.prototype.getNewsList=function(){return r["a"](this,void 0,void 0,function(){var t,e,o;return r["d"](this,function(n){switch(n.label){case 0:return t=d["a"].URL_NEWS,e=new f["e"],e.page=0,e.size=8,e.support_type=1,e.class_type=2,e.region_code=w["a"].getRegionCodes(),o=this,[4,this.http.get(t,e)];case 1:return o.backData=n.sent(),this.backData.code==d["a"].HTTP_SUCCESS_NET_CODE&&(this.newsList=this.backData.data.list),[2]}})})},e.prototype.getActivityList=function(){return r["a"](this,void 0,void 0,function(){var t,e,o;return r["d"](this,function(n){switch(n.label){case 0:return t=d["a"].URL_ACTIVITY_LIST,e=new f["c"],e.page=0,e.size=5,e.type=1,e.plat_type=1,e.region_code=w["a"].getRegionCodes(),o=this,[4,this.http.get(t,e)];case 1:return o.backData=n.sent(),this.backData.code==d["a"].HTTP_SUCCESS_NET_CODE&&(this.activityList=this.backData.data.list.slice(0,1)),[2]}})})},e.prototype.debugInfo=function(){var t="";t+="bohe##",t+="当前环境:"+y["a"].server_type+"##",t+="服务器地址:"+l["a"].getBaseUrl()+"##",t+="图片地址:"+l["a"].getImgBaseUrl()+"##",t+="网站地址"+l["a"].getWebBaseUrl(),y["a"].log(t)},e=r["b"]([Object(u["a"])({components:{"head-nav":i["a"],"foot-nav":s["a"],"download-box":c["a"]}})],e),e}(u["c"]);new m({i18n:D}).$mount("#app")}});