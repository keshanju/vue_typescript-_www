(function(t){function e(e){for(var i,r,s=e[0],l=e[1],c=e[2],p=0,d=[];p<s.length;p++)r=s[p],o[r]&&d.push(o[r][0]),o[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(d.length)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,s=1;s<n.length;s++){var l=n[s];0!==o[l]&&(i=!1)}i&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var i={},o={help:0},a=[];function r(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;a.push([17,"chunk-vendors","chunk-common"]),n()})({17:function(t,e,n){t.exports=n("bd45")},bd45:function(t,e,n){"use strict";n.r(e);var i=n("9ab4"),o=(n("76ca"),n("db4d"),n("dfa4"),n("60a3")),a=n("aaaf"),r=n("1189"),s=n("360e"),l=n("a925"),c=n("b9c5"),u=n("3435"),p=n("7212"),d=n("a306"),f=n("ebb9"),h=n("255e"),b=n("1831"),g=n("9347");o["c"].config.productionTip=!1,o["c"].use(l["a"]);c["a"].getInstace(g["a"].REGION_CODE_1,g["a"].ZH_CN);var w=u["a"].getInstance();w.init();var v=new l["a"](w),y=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.tabIndex=0,e.dialogVisible=!1,e.webParam=c["a"].getInstace(),e.questionList=[],e.questionDetail=new d["h"],e.firstHelpId=0,e.secondHelpId=0,e.firstHelpDetail=new d["h"],e.secondHelpDetail=new d["h"],e.joinleftfix=0,e.joinDatas=[{title:"OpenWRT开发工程师",id:"a1",link:"b1"},{title:"运营总监",id:"a2",link:"b2"},{title:"新媒体运营",id:"a3",link:"b3"},{title:"SEO主管",id:"a4",link:"b4"},{title:"官网客服",id:"a5",link:"b5"},{title:"网络推广",id:"a6",link:"b6"},{title:"Web前端开发工程师",id:"a7",link:"b7"}],e.http=new b["a"],e.swiperOption={effect:"fade",noSwiping:!0,fade:{crossFade:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}},e}return i["c"](e,t),e.prototype.created=function(){this.setBaseUrl(f["a"].getBaseUrl()),this.onGetQuestionList(),this.onDownloadConfig()},e.prototype.mounted=function(){var t=this;window.onscroll=function(){t.pageScroll(770,t.joinDatas.length+1)}},e.prototype.onChangeLanguage=function(t){w.changeLanguage(t),v.locale=w.locale,this.webParam.language=t},e.prototype.onDownloadConfig=function(){return i["a"](this,void 0,void 0,function(){var t,e,n;return i["d"](this,function(i){switch(i.label){case 0:return[4,h["a"].getInstance().download()];case 1:return t=i.sent(),this.firstHelpId=t.leigod.help.first_id,this.secondHelpId=t.leigod.help.second_id,0==this.firstHelpId?[3,3]:(e=this,[4,this.onGetHelpDetail(this.firstHelpId)]);case 2:e.firstHelpDetail=i.sent(),i.label=3;case 3:return 0==this.secondHelpId?[3,5]:(n=this,[4,this.onGetHelpDetail(this.secondHelpId)]);case 4:n.secondHelpDetail=i.sent(),i.label=5;case 5:return[2]}})})},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.openSlide=function(t){this.swiper.slideTo(t,1e3,!1),this.dialogVisible=!0},Object.defineProperty(e.prototype,"swiper",{get:function(){return this.$refs.mySwiper.swiper},enumerable:!0,configurable:!0}),e.prototype.hideSlide=function(){this.dialogVisible=!1},e.prototype.changeTabIndex=function(t){this.tabIndex=t},e.prototype.onGetQuestionList=function(){return i["a"](this,void 0,void 0,function(){var t,e;return i["d"](this,function(n){switch(n.label){case 0:return t=new d["k"],t.baseUrl=f["a"].getStafUrl(),t.page=1,t.size=4,t.support_type=1,t.region_code=this.webParam.region_code,[4,h["a"].getInstance().getQuestionssList(t)];case 1:return e=n.sent(),this.questionList=e.list,this.questionList.length>0&&this.onGetQuestionDetail(this.questionList[0].id),[2]}})})},e.prototype.onGetQuestionDetail=function(t){return i["a"](this,void 0,void 0,function(){var e,n,o,a;return i["d"](this,function(i){switch(i.label){case 0:return e=b["a"].URL_NEWS_DETAIL+t,n=new d["i"],n.id=t,n.class_type=3,n.support_type=1,o=this,[4,this.http.get(e,n)];case 1:return o.backData=i.sent(),a=this.backData.data,this.questionDetail=a,[2]}})})},e.prototype.onGetHelpDetail=function(t){return i["a"](this,void 0,void 0,function(){var e,n,o,a;return i["d"](this,function(i){switch(i.label){case 0:return e=b["a"].URL_NEWS_DETAIL+t,n=new d["i"],n.id=t,n.class_type=1,n.support_type=1,o=this,[4,this.http.get(e,n)];case 1:return o.backData=i.sent(),a=this.backData.data,[2,a]}})})},e.prototype.pageScroll=function(t,e){var n=g["a"].scroll().top;this.joinleftfix=n<t?0:1;for(var i=1;i<e;i++)if(document.getElementById("b"+i).offsetTop-250<n){for(var o=1;o<e;o++)document.getElementById("a"+o).classList.remove("join_cur");document.getElementById("a"+i).classList.add("join_cur")}},e=i["b"]([Object(o["a"])({components:{"head-nav":a["a"],"foot-nav":r["a"],swiper:p["swiper"],swiperSlide:p["swiperSlide"],"download-box":s["a"]}})],e),e}(o["c"]);new y({i18n:v}).$mount("#app")}});