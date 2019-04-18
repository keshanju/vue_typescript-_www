import "@/assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Component, Vue } from "vue-property-decorator";

import RechargeProxy from "@/ts/proxy/RechargeProxy";
import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "./util/LsLanguage";
import $ from "jquery";
import GlobalConfig from "./global.config";

import HttpClient from "@/ts/net/HttpClient";
import { PriceList, UserInfo } from "@/ts/models/UserModel";
import { IdataModel } from "@/ts/models/IdataModel";
import {
  Dialog,
  Popup,
  Toast,
  Field,
  CellGroup,
  Swipe,
  SwipeItem,
  Lazyload,
  Loading
} from "vant";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { ExtrnalFactory } from "@/ts/factory/ExtrnalFactory";
import Util from "@/ts/utils/Util";
import JumpWeiXin from "./util/jump";
import Load from "./components/Loading.vue";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import {
  ActivityModel,
  ActivityPictureModel,
  ActivityRequestPictureModel
} from "@/ts/models/NewsModel";

Vue.use(Popup);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Loading);
Vue.config.productionTip = false;
Vue.use(Lazyload);
//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(
  Util.REGION_CODE_1,
  Util.ZH_CN
);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
  components:{
    load:Load
  }
})
class Recharge extends RechargeProxy {
  public show: boolean = false; //支付弹窗
  public recommendBuyPackage: PriceList = new PriceList(); // 推荐价格的对象
  public otherBuyPackageList: Array<PriceList> = []; //其他价格列表
  public activityInfo: ActivityModel = new ActivityModel();
  public imageHeadUrl: string = "";
  public http = new HttpClient();
  public appParam: AppParamModel = AppParamModel.getInstace();
  public backData: IdataModel<any> | undefined;
  public agreement: boolean = true;
  public bannerImg: string = "";
  public activeLink = "javascript:;"; //活动链接
  public newActiveList = [];
  public newActiveobj: { img: string; url: string } = {
    img: "./images/appdefault.png",
    url: "javascript:;"
  };

  public created() {
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
    this.getUserInfo();
    this.getActivityInfo();
    this.checkEnvironment();
  }

  public setBaseUrl(url: string): void {
    this.http.setBaseUrl(url);
  }

  public checkEnvironment() {
    const self = this;
    $(function () {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var ua = window.navigator.userAgent.toLowerCase();
      // @ts-ignore
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //微信环境
        appParam.platform = 4;
      } else if (isAndroid) {
      } else if (isiOS) {
      }
    });
  }

  /**
   * 获取用户详细信息
   */
  public async getUserInfo() {
    try {
      let token = this.appParam.account_token;
      if (token == "" || token == null) {
        token = LocalStorageUtil.getUserToken().account_token;
      }
      const url = HttpClient.URL_USER_INFO;
      const param = {
        account_token: token
      };
      this.backData = await this.http.post<UserInfo>(url, param);
      if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
        this.userInfo = this.backData.data;
        await this.getUserPackage();
        this.getrenderData();
      } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
        this.tokenExpired();
      }
    } catch (e) {
      this.tokenExpired();
    }
  }

  /**
   * 获取要渲染的数据
   */
  public getrenderData() {
    this.recommendBuyPackage = this.packageList[0].price[0];
    for (let pp = 1; pp < this.packageList[0].price.length; pp++) {
      this.otherBuyPackageList.push(this.packageList[0].price[pp]);
    }
  }

  /**
   * 选择支付方式
   */
  public onChooseAndPay(type: number) {
    this.onChoosePayType(type);
    this.onPay(this.appParam.platform + 1, 2);
  }

  /**
   * 获取套餐成功
   */
  public getUserPackageSuccess() {
    this.onChoosePackageTypeA(null);
  }

  /**
   * 选择套餐
   */
  public onChoosePackageTypeA(type: any) {
    if (this.packageList.length <= 0) return;
    this.priceIndex = 0;
    this.czTypeIndex = 0;
    this.onChoosePackageType(type);
    this.priceIndex = 0; //这句代码不可以忽略，否则会选择最后一个套餐
  }

  /**
   * 点击出现支付弹窗
   */
  public gotoPay() {
    if (this.agreement) {
      if (this.appParam.platform === 4) {
        //如果是微信公众号支付
        this.onChoosePayType(6);
        this.onPay(this.appParam.platform + 1, 2);
      } else {
        this.show = !this.show;
      }
    } else {
      Toast("请选择同意会员服务条款");
    }
  }

  /**
   * 请求支付成功
   */
  onBeginpaySuccess() {
    if (this.appParam.platform === 4) {
      this.initWxConfig(this.payObj.pay_url);
    } else {
      const factory = ExtrnalFactory.getInstance().getFactory(
        this.appParam.platform
      );
      window.location.href = this.payObj.pay_url;
    }
  }

  /**
   * 初始化微信jsSDK
   */
  public async initWxConfig(payObj: any) {
    const url = HttpClient.URL_WAP_WX_SIGN;
    const param = {};
    this.backData = await this.http.post<UserInfo>(url, param);
    let data = this.backData.data;
    // @ts-ignore
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名
      jsApiList: ["closeWindow", "chooseWXPay"] // 必填，需要使用的JS接口列表
    });

    const that = this;
    // @ts-ignore
    wx.ready(function () {
      that.onWxGzhPay(payObj);
    });
  }

  /**
   * 微信公众号支付
   */
  public onWxGzhPay(payData: any) {
    // @ts-ignore
    wx.chooseWXPay({
      timestamp: payData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: payData.nonceStr, // 支付签名随机串，不长于 32 位
      package: payData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      signType: payData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: payData.paySign, // 支付签名
      success: function (res) {
        Toast("充值成功!");
      }
    });
  }

  /**
   * 请求支付失败
   */
  onBeginpayError(msg: string) {
    Toast.fail(msg);
  }

  /**
   * token过期的处理
   */
  public tokenExpired() {
    let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
    Toast(tipMsg);
    setTimeout(() => {
      this.gotologin();
    }, 3000);
  }

  //   去首页
  public gotologin() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoLogin(param);
  }

  //   去会员服务条款
  public gotoitems() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoItems(param);
  }

  /**
   * 获取活动banner
   */
  public async getActivityInfo() {
    let url = HttpClient.URL_ACTIVITY_PICTURE_LIST;
    let param = new ActivityRequestPictureModel();
    param.region_code = 1;
    param.plat_type = 2;
    this.backData = await this.http.post(url, param);
    if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
      const activityList = this.backData.data as ActivityPictureModel[];
      if (activityList.length > 0) {
        activityList.forEach(element => {
          let a: { img?: string; url?: string } = {};
          a.img = this.imageHeadUrl + element.imgs.filter((a, b) => {
            return a.key == 1; // 0 官网  1是移动端  2pc 客户端
          })[0].img_url;
          //判断是否是外链  是取url  不是链接给javaScript:;
          if (element.url_type != 0) {
            a.url = element.url;
          }
          this.newActiveList.push(a);
        });
      } else {
        this.newActiveList.push(this.newActiveobj);
      }
    }
  }

}

new Recharge({ i18n }).$mount("#app");
