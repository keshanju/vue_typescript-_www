(function(e){function t(t){for(var a,r,c=t[0],u=t[1],s=t[2],l=0,f=[];l<c.length;l++)r=c[l],o[r]&&f.push(o[r][0]),o[r]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);p&&p(t);while(f.length)f.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,c=1;c<n.length;c++){var u=n[c];0!==o[u]&&(a=!1)}a&&(i.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},o={activity_wuyi:0},i=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var p=u;i.push([4,"chunk-vendors","chunk-common"]),n()})({"23b9":function(e,t,n){},4:function(e,t,n){e.exports=n("a054")},a054:function(e,t,n){"use strict";n.r(t);n("a7cc"),n("450d");var a=n("df33"),o=n.n(a),i=(n("7514"),n("be4f"),n("896a")),r=n.n(i),c=(n("cadf"),n("551c"),n("f751"),n("097d"),n("9ab4")),u=(n("d16e"),n("76ca"),n("23b9"),n("db4d"),n("60a3")),s=n("aaaf"),p=n("1189"),l=n("360e"),f=n("a925"),d=n("b9c5"),g=n("3435"),h=n("ebb9"),b=n("9347"),v=n("7d83"),y=n("0a56"),_=n("d939"),w=n("2e54"),k=n("1157"),m=n.n(k);u["b"].config.productionTip=!1,u["b"].use(r.a);var U=h["a"].getMobWebBaseUrl()+"/activity/wuyi.html";_["a"].checkMobile(U),u["b"].use(f["a"]);d["a"].getInstace(b["a"].REGION_CODE_1,b["a"].ZH_CN);var x=g["a"].getInstance();x.init();var M=new f["a"](x),O=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.activity_id=189,t.activity_json=w["a"].getInstace("pc",t.activity_id),t.webParam=d["a"].getInstace(),t.package_index=3,t}return c["c"](t,e),t.prototype.created=function(){this.activityJson=this.activity_json,this.imageHeadUrl=h["a"].getImgBaseUrl(),this.account_token=v["a"].getUserToken().account_token,this.setBaseUrl(h["a"].getBaseUrl()),this.getActivityId(),this.getActivityDetail(),this.getReferActivitys(),""==this.account_token&&(this.refer_code="请先登录!",this.refer_code_link="请先登录!")},t.prototype.initAwardList=function(){this.awardList.length<=4||m()(function(){setInterval(function(){var e=m()("#jilu_box");e.animate({marginTop:"-30px"},400,function(){e.find("li").eq(0).appendTo(e),e.find("li").eq(0).appendTo(e),e.css("margin-top","0")})},2e3)})},t.prototype.mounted=function(){return c["a"](this,void 0,void 0,function(){return c["d"](this,function(e){return this.getAwardList(),[2]})})},t.prototype.generateRefercodeLink=function(e){this.refer_code_link=h["a"].getUserBaseUrl()+"/"+_["a"].HTML_NAME_REGISTER+"?refer_code="+e},t.prototype.changePackageIndex=function(e){this.package_index=e},t.prototype.gotoLogin=function(){_["a"].webGotoUser(h["a"].getUserBaseUrl(),_["a"].HTML_NAME_LOGIN,"to="+h["a"].getWebBaseUrl()+"/version5_0.html")},t.prototype.gotoRecharge=function(){_["a"].webGotoUser(h["a"].getUserBaseUrl(),_["a"].HTML_NAME_USER,"page=1&package_index="+this.package_index)},t.prototype.gotoDuijiang=function(e){void 0===e&&(e=0),3!=e&&_["a"].webGotoUser(h["a"].getUserBaseUrl(),_["a"].HTML_NAME_USER,"page=7")},t.prototype.tokenExpired=function(e){void 0===e&&(e=null),v["a"].loginOut(),this.account_token="",this.userInfo=null,this.$refs.head.checkLogin()},t.prototype.onChangeLanguage=function(e){x.changeLanguage(e),M.locale=x.locale,this.webParam.language=e},t=c["b"]([Object(u["a"])({components:{"head-nav":s["a"],"foot-nav":p["a"],"el-dialog":o.a,"download-box":l["a"]}})],t),t}(y["a"]);new O({i18n:M}).$mount("#app")}});