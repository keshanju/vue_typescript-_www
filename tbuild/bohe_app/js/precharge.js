(function(t){function e(e){for(var i,s,c=e[0],p=e[1],r=e[2],u=0,g=[];u<c.length;u++)s=c[u],n[s]&&g.push(n[s][0]),n[s]=0;for(i in p)Object.prototype.hasOwnProperty.call(p,i)&&(t[i]=p[i]);l&&l(e);while(g.length)g.shift()();return o.push.apply(o,r||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],i=!0,c=1;c<a.length;c++){var p=a[c];0!==n[p]&&(i=!1)}i&&(o.splice(e--,1),t=s(s.s=a[0]))}return t}var i={},n={precharge:0},o=[];function s(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=i,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(a,i,function(e){return t[e]}.bind(null,i));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],p=c.push.bind(c);c.push=e,c=c.slice();for(var r=0;r<c.length;r++)e(c[r]);var l=p;o.push([14,"chunk-vendors","chunk-common"]),a()})({14:function(t,e,a){t.exports=a("bb02")},"5f6c":function(t,e,a){},"648f":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZBNjRGNUYwQjdDNzExRTg5MEJCRkQ1NTJERTFFMTg1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZBNjRGNUYxQjdDNzExRTg5MEJCRkQ1NTJERTFFMTg1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkE2NEY1RUVCN0M3MTFFODkwQkJGRDU1MkRFMUUxODUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkE2NEY1RUZCN0M3MTFFODkwQkJGRDU1MkRFMUUxODUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz76SEekAAABbElEQVR42mI0WHqXYSAACxJbA4izgFgCi7r/QDwdiA/gMcsbiOPxyL8A4mlAfAPZYhOoodx4NP4jYHEeELsR8GgSEDsA8RmYxe1QS88D8WqoJcjgD1QcH8gFYn8gZsIiBxILBWJDqF2uMIsNoHQxEO8nM9puAXE3HvmTQLwXiPUZkFzHCqV/0zA9/YLSbAw4goUuYNRiulu8C4gfA/E1Gtp1DWrHLuQCJIwOnnwHxHIjN45BQV0HxLZ0tvcwyOJ8IBais8VGIItdgNiUzhafZoHWSOdHXAGiDMTWdLAPZIcKssU7QSkNiNVoaKka1I7tyBaLADEjEIvR0GIxqB2io9XiyLL4E5SWp6Fd8sh2werjrUCcAcTzgLgEiP+iafoLbbquwWNwIrQnwohFjhmItaDsbcgWV0ALEVekNjY68CNgcTC0R4IP7AbicmSLPwKxOxBbAbEUju7LPiK6J3Y4fAwCT4H4OLQfxgAQYAAYWz1dvrK4MAAAAABJRU5ErkJggg=="},"6b9a":function(t,e,a){t.exports=a.p+"img/paypal_logo.png"},"6c08":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAFhklEQVRoQ+2ZbWxTZRTH/+e2Ywsvoshw9lZFkQ8YpxgiEcfWjhgj0cQw3O2MEQJIMIZIlA8YIYEARjSAItFEFExAIbsV8CUSMl92bx2EGMSACkEUlLTd2AQMDse27v5NFzrGtt7eW9ZFIv3Y55z/+T3nnD5vFVylH7lKuXENfKArlzHjE95l3uDh9cUeD8aRHCOEkgtIgh2iKMcTxLd1mu9kphi24EE9NgfgakCuzyTUX+MEKESNCBbUaurRdLppwQN6fI2AL/YXkFsdku0CedkIqav78u0TPKjHXwL4qttgubCnUDMr/eGe2r3Ap2yP32Z18DcAnlyAuNUkeCb/gvfWmhlF57v79gIPVEfXisgLbgPk0p6CRWal+ro9uB49JJDiKwDZDVFe6/InRgJWr1K70if3GSH/pAzgsUYBCl0JX2bMVwzNvyT11RT9T9VCazR7vU7PBkNTb7YFD1bHmiEYkn2gnIA3G5o67H8ITh4E5BO7aljCSETzf5OyKfm0aVjehbaFmSpI4TSB3JPG7soyTnKzGfLPzASRzXhAj24WyNM5AXcGdK3Hu+fpylolpUTgBwHP9V0B2WJo6sbUWHBrfCS81sfpqkXAJ5CxGarZP+BCTK4NqXuctY69VaA6tlEEswcE3D7jdgjyq6Gpz1zaVSnBcLwJwI0DAp5tpgksNTV1eco/EI6XChlxoNc/reIgUC8TEhbFc2dEKzrRBe78zH8F4MQpgDuhiAnmGYY2qqETgJTScMNIgRQBHbcL+YBAyih4UHDpMk4wbGp+LQX98OaGIa0FiZMCGeEgEVmDrzIO+xZjmVgOgnSalG2L3aJ4OIOQ6QLcB8tTbFQV/dS12ujRxYCsdKiXBTgx3wipbycDBPXGocJECcHxhJxRxIq3WzhWF1KPQYTpIILbo35jur/rhPiQfmZ4O1tOiuC6nIAT2GlqasXkj/66wZvXvBTAs4Dk9xGsGeB+ilKjdFi7aqv8B+2AyqrjZSIMCzAqN+CWMjG/TQ63FiT22hyA+vohHhHBmib4tvysSVtfcJU6PadYX6IIpxIICHA/AG+aiThvFRLnzJA6vKw6NlsRdO2EDjN08XeL9WZIfd6JT2f7SEuFEE+RKBe57P3GBTh4yNT89waqYxtEMNdJ8O42BGqk0PeoUS4Jt75BvbEIbJ8JwWMAkle2FscXCYLHTc0/JhiOLgFlhcvgu3HeN82YJRdSfuV6fcBCx3siyjvtg/I27nm88G8nmhM+jw8e2sISU1O/7G7f65bf/eqmeGR0a1teu1dpS/ZsxhUguckAXGZq6sruq0yZ3lAs7Ki7pMG/SFnvzeO6ryv8p51MoKeNLTjBDabmn1eq10/0wNple6Yg91mKLIxUqnu7BynX4xMI66u+nvEI/CPEBwmvd23d9JuOu5mAPXhym4aUR0K+SKleX+ihlbyCjYdwDAFVIEdJHFCEO2o1/xc9AwfCseeEXJtmCe0yT1ZKhDuE8qbTU6cteFKZ5FmKzI9o6lanGSnZ1uTL87QlV6JHnPqk7AicAOX9/FZlXc/XK9seD+jR02nOD/stYIXi4QGjQo312imXUSkfF59EQRXAuZmynGlCBJogWJ1IDPpwz5OFcQc9Hv0RInfbCRNsAeV3ETZ2VgUYIcRYiBRkAnI7nnx2BuQNU/Nd9lLQ++3Q+VHTLUPW9iTeMkPqAttWmbz91B3ejsQv/5XX2iSsZcldkSrfEVvw5GCwOrYKgkVZp6gfHUlsMkPqnIw93gleSy+bYp8JZGo/MriWIril+aw65/t50u4IPGUUCMdmXVyHB+w/oIux/7CI5ZGQuindbDP+65a8YrUVJCpBGe06ZW4dFJBQvjOfKNptdzFJymYEdxt7oOyvgQ9UplNx/gXneplN8TNzTwAAAABJRU5ErkJggg=="},"8b10":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYyMDFBQzg3QjdDMjExRTg5Njk4OTlCMkUwMTBCNzI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYyMDFBQzg4QjdDMjExRTg5Njk4OTlCMkUwMTBCNzI2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjIwMUFDODVCN0MyMTFFODk2OTg5OUIyRTAxMEI3MjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjIwMUFDODZCN0MyMTFFODk2OTg5OUIyRTAxMEI3MjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5fVoarAAADwklEQVR42uyZaUhUURTHx6VUKFuspDIraDMKUpEohKIIwQorMEoJWsiKgvpShBG0GC20gEGFRgQJBm1kxERl21h9KFskGsMvVhpqUVmmZKX9L/wnHtN9982b996Y4YEfzJs53Pe/y7nn3DthnZ2dru5o4a5uaj3CQ22RC92bu6dwk7OTCjLAFDABDAN9QAdoAW9BDXgIykFVVwrvD9aCPDBa4RcF4tipbH73EpwExexYSNZ4BNjEEdxrIFrPJoLD4DXYYGdM6TWUwKk+AgbZ8J6B4CioAMOdEj6WL5jhwNKcBiq5nGwVHg9ugZEObgjxnM0ku4SLz+e5TGT2EZSB5wG02wrc4L5i6Yi2+tohfA1I1/GrYHBmgWRwStFmLRgHMtneVh2/MWCPVeExYKfCTwj9ws+iKruk8D0H6jXPFxW+64Jdlj7hi8Bghd8cEKZ5TlH4zgS9Nc+pBnlkvZUENM/AbylH5hoYAZYrfNPAM8aLyKqrdPy+gXYwy4rwlAB8p5NATOwY2zXPYnndBZcZL9WcYRGksZyVRlBnVniiQ1ufEFzKIBQxsgwc4qzESPyb2THRwbPgq5HwSAdE11Go2GUKwBKWESrrB+aSg8y2+2R1ji84P9ks+jFHdTLwgtwARPubWELbwCswW094tY2iX3DEdoFCEG2xPVE6X2eF+pdwj02iW1nS5oPVNlexx8AKf+ElDCSrVsBSdqMDMSPyyAlm7j/CvYxkK9YEilgKy+wdq8IBDDiZ3QNDWV64Jb+LxHZcdEJbq2zhVAdrpUxkiYrfRYH2mUH3Q+IjOt3AnWi3TjtTRXbWCq9hoRWsXQWLFb9nasoKsf57SXxyOKpRBjGS679/lzCK9wch/BFHQ5VN34A2LheZZbMuitJJUD5Ll52ADnDkf5oQ/Z2C4gz8ohWitYfzGAOfBL0zZxGLnwYTwiNcobMI1anbYyKjxrLSawmR8HqV8EmSc2GjwVVEZYiEe1TFlXaHuMMUfpulaDJvskZxtH05we3Q7YC/nTYSfpOCPX6H5nIiqwjzNZ1xwm6I2j5csWZXcmsyU8d8ADscFC3q9TzVTZYo+h8E2XihTrq2au08QtaqhFuxXzw0eGwWnaMdEKcu9sWMZRjcvwRq79nWBdUVnJ3WxhN+Fk8xwdoZ7mquUAn3WRn3+CxeWTQrfEWZ8RQ80Xw3X3VYdto62IEyvlPcCI8HQ1hQNTHoqjhT4tCwgLcDScTbFcL9R9XrL0RyrSGu+a7wuJb2Lwg328li6Tmu55/lHuH/ufDfAgwAwbDA/yJrFUYAAAAASUVORK5CYII="},bb02:function(t,e,a){"use strict";a.r(e);a("e17f");var i=a("2241"),n=(a("ac1e"),a("543e")),o=(a("e7e5"),a("d399")),s=(a("cadf"),a("551c"),a("097d"),a("9ab4")),c=(a("3a37"),a("499a"),a("27b8")),p=a("60a3"),r=a("90ae"),l=a("dfdf"),u=a("5207"),g=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pay_shadow"},[i("div",{staticClass:"pop"},[i("div",{staticClass:"pay_main"},[i("span",[i("a",[i("img",{staticStyle:{cursor:"pointer"},attrs:{src:a("93a4")},on:{click:t.onClosePay}})])]),i("div",{staticClass:"pay_main_left"},[i("p",{directives:[{name:"show",rawName:"v-show",value:1==t.payobj.payType,expression:"payobj.payType == 1"}],staticClass:"pay_main_tit"},[t._m(0),t._v(t._s(t.$t("precharge.m7"))+"\n                ")]),i("p",{directives:[{name:"show",rawName:"v-show",value:2==t.payobj.payType,expression:"payobj.payType == 2"}],staticClass:"pay_main_tit"},[t._m(1),t._v(t._s(t.$t("precharge.m8"))+"\n                ")]),1==t.payobj.payType||2==t.payobj.payType?i("div",[i("div",[i("iframe",{attrs:{frameborder:"0",height:"156px;",width:"156px;",scrolling:"no",src:t.payobj.pay_url}})]),i("div",{staticClass:"sao"},[i("img",{attrs:{src:a("648f")}}),i("p",{directives:[{name:"show",rawName:"v-show",value:1==t.payobj.payType,expression:"payobj.payType == 1"}]},[t._v(t._s(t.$t("precharge.m23")))]),i("p",{directives:[{name:"show",rawName:"v-show",value:2==t.payobj.payType,expression:"payobj.payType == 2"}]},[t._v(t._s(t.$t("precharge.m24")))]),i("p",[t._v(t._s(t.$t("precharge.m25")))])]),i("p",{staticClass:"shixiao",staticStyle:{"margin-bottom":"20px"}},[t._v(t._s(t.$t("precharge.m26")))])]):t._e(),5==t.payobj.payType?i("div",{staticStyle:{width:"156px",height:"290px","text-align":"center"}},[i("img",{staticStyle:{"margin-top":"50px"},attrs:{src:a("6b9a")}}),i("div",{staticClass:"btn_common btn_z_blue_type",staticStyle:{"margin-top":"40px"}},[i("a",{attrs:{href:t.payobj.pay_url}},[t._v(t._s(t.$t("precharge.m27")))])])]):t._e()])])])])},h=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("i",[i("img",{attrs:{src:a("8b10")}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("i",[i("img",{attrs:{src:a("6c08")}})])}],y=a("3c6c"),A=a("1831"),b=a("7d83"),d=a("d939"),I=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.updateInvoiceTimer=null,e.isUpdateInvoice=!1,e.invoiceNum=2,e.http=new A["a"],e}return s["c"](e,t),e.prototype.init=function(){this.timingUpdateInvoiceState(),console.log(this.payobj)},e.prototype.execute=function(){},e.prototype.setBaseUrl=function(t){this.http.setBaseUrl(t)},e.prototype.timingUpdateInvoiceState=function(){this.isUpdateInvoice=!0;var t=this;this.updateInvoiceTimer=setInterval(function(){t.startUpdateInvoiceState()},1e3*this.invoiceNum)},e.prototype.startUpdateInvoiceState=function(){this.isUpdateInvoice&&this.updateInvoiceState()},e.prototype.updateInvoiceState=function(){return s["a"](this,void 0,void 0,function(){var t,e,a,i;return s["d"](this,function(n){switch(n.label){case 0:return t=A["a"].URL_USER_INVOICE_STATE,e=b["a"].getUserToken().account_token,a=new y["c"],a.account_token=e,a.invoice_id=this.payobj.invoice_id,[4,this.http.post(t,a)];case 1:return i=n.sent(),i.code==A["a"].HTTP_SUCCESS_NET_CODE?1==i.data.status&&(this.onCleanInvoiceState(),this.paySuccess()):i.code==A["a"].HTTP_TOKEN_EXPIRE&&(b["a"].loginOut(),d["a"].backHome()),[2]}})})},e.prototype.paySuccess=function(){},e.prototype.onCleanInvoiceState=function(){console.log("删除订单定时器"),this.isUpdateInvoice=!1,clearInterval(this.updateInvoiceTimer)},s["b"]([Object(p["b"])()],e.prototype,"payobj",void 0),e=s["b"]([p["a"]],e),e}(p["c"]),w=I,m=a("b890"),v=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return s["c"](e,t),e.prototype.created=function(){this.setBaseUrl(m["a"].getBaseUrl())},e.prototype.paySuccess=function(){this.onClose(),this.$emit("paysuccess")},e.prototype.onClose=function(){this.onCleanInvoiceState()},e.prototype.onClosePay=function(){this.onCleanInvoiceState(),this.$emit("closepaydialog")},s["b"]([Object(p["b"])()],e.prototype,"payobj",void 0),e=s["b"]([p["a"]],e),e}(w),E=v,T=E,f=(a("e52b"),a("2877")),S=Object(f["a"])(T,g,h,!1,null,null,null);S.options.__file="PayDialog.vue";var C=S.exports,j=a("42d1"),U=a("9d9a"),N=(a("db4d"),a("9347")),Y=a("a925"),R=a("c1e6"),B=a("255e");p["c"].config.productionTip=!1,p["c"].use(Y["a"]);l["a"].getInstace();var D=r["a"].getInstance();D.initNoRefresh();var P=new Y["a"](D);p["c"].use(o["a"]),p["c"].use(n["a"]);var M=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.appParam=l["a"].getInstace(),e.payDialogVisible=!1,e.bgImg="images/bg_img.jpg",e.imageHeadUrl="",e.setSecondPasswordShow=!0,e.webUrl="",e.payShowConfig=new y["d"],e}return s["c"](e,t),e.prototype.created=function(){this.setBaseUrl(m["a"].getBaseUrl()),this.getUserInfo(),this.imageHeadUrl=m["a"].getImgBaseUrl(),this.webUrl=m["a"].getWebBaseUrl()},e.prototype.mounted=function(){this.changeBg(),this.getPayShowConfig()},e.prototype.getPayShowConfig=function(){return s["a"](this,void 0,void 0,function(){var t;return s["d"](this,function(e){switch(e.label){case 0:return[4,B["a"].getInstance().download()];case 1:return t=e.sent(),this.payShowConfig=t.bohe.pay,[2]}})})},e.prototype.getUserInfo=function(){return s["a"](this,void 0,void 0,function(){var t,e,a,i;return s["d"](this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),t=this.appParam.account_token,e=A["a"].URL_USER_INFO,a={account_token:t},i=this,[4,this.http.post(e,a)];case 1:return i.backData=n.sent(),this.backData.code==A["a"].HTTP_SUCCESS_NET_CODE?(this.userInfo=this.backData.data,this.getUserPackage()):this.backData.code==A["a"].HTTP_TOKEN_EXPIRE&&d["a"].backHome(),[3,3];case 2:return n.sent(),d["a"].backHome(),[3,3];case 3:return[2]}})})},e.prototype.closeSecondPasswordNotice=function(){this.setSecondPasswordShow=!0},e.prototype.goSetSecondPwd=function(){var t=j["a"].getInstance().getFactory(this.appParam.platform),e=d["a"].getWebHeadUrl(this.webUrl,this.appParam);e=e+d["a"].HTML_NAME_USER+"?page=2&account_token="+this.appParam.account_token,t.jumpUrl(e)},e.prototype.getUserPackageSuccess=function(){this.onChoosePackageTypeA(null);var t=new R["a"];t.getBrowser(),TDAPP.onEvent(N["a"].WINDOWS_GET_PACKAGE,N["a"].PAY,t)},e.prototype.onChoosePackageTypeA=function(t){if(void 0===t&&(t=null),!(this.packageList.length<=0))return 3==t?(this.czTypeIndex=t,void(this.isShow=2)):void this.onChoosePackageType(t)},e.prototype.changeBg=function(){var t=j["a"].getInstance().getFactory(this.appParam.platform),e=t.getbackground(0);""!=e&&(this.bgImg=e)},e.prototype.onChangeLanguage=function(t){D.changeLanguage(t,!1),P.locale=D.locale,m["a"].log("切换语言:"+D.locale)},e.prototype.clickPay=function(){this.onPay(this.appParam.platform+1)},e.prototype.onBeginpaySuccess=function(){var t=new R["a"];if(t.pay_type=this.payType,t.package_name=this.payObj.package_title,t.getBrowser(),TDAPP.onEvent(N["a"].WINDOWS_CLICK_PAY,N["a"].PAY,t),5==this.payType){var e=j["a"].getInstance().getFactory(this.appParam.platform);e.jumpUrl(this.payObj.pay_url)}this.payObj.payType=this.payType,this.payDialogVisible=!0,this.$refs.payDialogCom.init()},e.prototype.onBeginpayError=function(t){Object(o["a"])(t)},e.prototype.onOpenPyaDialog=function(){this.payDialogVisible=!0},e.prototype.onClosePyaDialog=function(){this.payDialogVisible=!1},e.prototype.paySuccess=function(){var t=this,e=new R["a"];e.pay_type=this.payType,e.getBrowser(),TDAPP.onEvent(N["a"].WINDOWS_CLICK_PAY_SUCCESS,N["a"].PAY,e),this.payDialogVisible=!1,i["a"].alert({title:U["a"].getTipsMsg(U["a"].KEY_NOTIF_SUCCESS_TITLE),message:U["a"].getTipsMsg(U["a"].KEY_NOTIF_PAY_PACKAGE_SUCCESS)}).then(function(){i["a"].close(),t.packageList[t.czTypeIndex].package_level==N["a"].PACKAGE_LEVEL_2&&0==t.userInfo.is_set_admin_pass&&(t.setSecondPasswordShow=!1)});var a=j["a"].getInstance().getFactory(this.appParam.platform);a.rechargeSuccess()},e=s["b"]([Object(p["a"])({components:{explain:u["a"],"user-paydialog":C}})],e),e}(c["a"]);new M({i18n:P}).$mount("#app")},e52b:function(t,e,a){"use strict";var i=a("5f6c"),n=a.n(i);n.a}});