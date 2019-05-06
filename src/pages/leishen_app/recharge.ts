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
import { PriceList, UserInfo, PayRequestModel, PayModel, UserRechargeInfo } from "@/ts/models/UserModel";
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
import { UserInfoModel } from '../leishen_wangba/model/userModel';

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
  public discountshow: boolean = false;//优惠券选择弹窗
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
  public newPackagepriceList=[];//获取新的套餐价格数组
  public newPackageList:UserRechargeInfo;//获取新的套餐数组
  public choosePricepayArr=[]//后台读取推荐套餐放进数组第一个  其余的套餐按顺序放进改数组  用户选择价格套餐时读这个数组
  public packageid=0;//获取新的套餐数组
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
        await this.getUserDiscount();
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
    this.recommendBuyPackage = this.newPackagepriceList.filter((item)=>{
      return item.price_is_recommend == 1;
    })[0];
    this.otherBuyPackageList = this.newPackagepriceList.filter((item)=>{
        return item.price_is_recommend != 1;
    });
    this.choosePricepayArr.push(this.recommendBuyPackage);
    this.choosePricepayArr=this.choosePricepayArr.concat(this.otherBuyPackageList);
    this.onChoosePrice(0)

  }

    /**
     * 选择优惠券
     */
    public checkDiscount(item: any) {
      this.discountshow = false;
      this.zheCode = item.discount_code;
    }

    /**
     * 不使用优惠券
     */
    public clearDiscount() {
        this.discountshow = false;
        this.zheCode = '';
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
    if(this.userInfo.is_switch_package==0){
      this.packageList.forEach((element,index) => {
        if (element.package_id == this.userInfo.package_id) {
          (this.newPackageList as any)=this.packageList[index];
          this.newPackagepriceList = element.price;
          this.is_change_price = element.is_change_price;
        }
      });
    }else{
      this.packageList.forEach((element,index) => {

        if (element.billing_type == 1 && element.include_region_codes == LocalStorageUtil.getRegionCodes() + '') {
          (this.newPackageList as any) = this.packageList[index];
          this.newPackagepriceList = element.price;
          this.is_change_price = element.is_change_price;
        }
      });
    }

    // this.onChoosePackageTypeA(null);
  }

  /**
    * 选择套餐
    * @param type
    */
  public onChoosePrice(type: any = null) {
    if (type == null) type = this.priceIndex;
    this.priceIndex = type;
    this.choosePrice = this.choosePricepayArr[this.priceIndex].price_num;
    this.discountList = this.userDiscountList.filter((item)=> {
        return item.price_ids.indexOf(this.choosePricepayArr[this.priceIndex].price_id) != -1;
    });
    if(this.discountList.length == 0) {
        this.zheCode = '';
    }else {
        this.zheCode = this.discountList[0].discount_code;
    }
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
   * plan 支付返回的二维码显示方式 1官网二维码 2移动端需要的二维码 3官网pc端支付宝打开的控制台页面
   * 请求支付
   */
  public async onPay(from: number = 0, plan: number = 1) {
    let that=this;
    if (this.packageList == null || this.packageList.length <= 0) return;
    this.isLoading = true;
    let priceObj = this.choosePricepayArr[this.priceIndex];
    const url = HttpClient.URL_USER_PACKAGE_BUY;
    const token = LocalStorageUtil.getUserToken().account_token;
    let param = new PayRequestModel();
    param.account_token = token;
    param.invoice_from = param.switchFrom(from);
    param.package_id = this.newPackageList.package_id;
    param.pay_type = this.payType;
    param.price_id = priceObj.price_id;
    param.pay_plat = plan;
    param.src_channel = LocalStorageUtil.getSrcChannel();
    param.os_type = localStorage.getItem(LocalStorageUtil.STORAGES_OS_TYPE);
    if (this.zheCode != "" && this.zheCode != null) {
      param.discount_code = this.zheCode;
    }
    //
    this.backData = await this.http.post<PayModel>(url, param);
    this.isLoading = false;
    this.payObj.pay_url = '';
    //
    if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
      this.payObj = this.backData.data;
      this.onBeginpaySuccess();
    } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
      this.tokenExpired();
    }else if(this.backData.code == HttpClient.HTTP_ERROR_WX_NOBIND){
      this.onBeginpayError('系统检测到您未绑定公众号，将自动为您跳转至登录页进行绑定...');
      setTimeout(function () {
        that.gotologin(1);
      },2000)
    } else {
      this.onBeginpayError(this.backData.msg);
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
      if (!data.appId) {
          Toast('微信服务器繁忙，请稍后...')
      }
    // @ts-ignore
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: (data.timestamp).toString(), // 必填，生成签名的时间戳
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

  //   去登录
  public gotologin(n:number=0) {//0表示正常跳转  1表示执行微信公众号的自动登录跳转

    let param = "platform=" + appParam.platform;
     if(n==1){
       JumpWeiXin.gotoWXLogin(param)
     }else{
       JumpWeiXin.gotoLogin(param);
     }
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
