import "@/assets/css/bohe_app.css";
import "leigod-lib-flexible";
import "babel-polyfill";
import { Component, Vue } from "vue-property-decorator";
import { LanguageConfig } from "@/ts/utils/Language";
import GlobalConfig from "./global.config";
import HttpClient from "@/ts/net/HttpClient";
import AppParamModel from "@/ts/models/AppModel";
import { IdataModel } from "@/ts/models/IdataModel";
import RechargeProxy from "@/ts/proxy/RechargeProxy";
import { Dialog, Popup, Toast, Field, CellGroup } from "vant";
import loading from './components/Loading.vue'

import { UserInfo, PayConfigModel } from "@/ts/models/UserModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import Util from "@/ts/utils/Util";
import VueI18n from "vue-i18n";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { ExtrnalFactory } from "@/ts/factory/ExtrnalFactory";
import $ from 'jquery'
Vue.config.productionTip = false;
Vue.use(Popup);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Field);
Vue.use(CellGroup);

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

Vue.use(Popup);
@Component({
    components:{
        loading:loading
    }
})
class Recharge extends RechargeProxy {
	public appParam: AppParamModel = AppParamModel.getInstace();
	public imageHeadUrl: string = "";
	public choosePayTypeShow: boolean = false;
	public payShowConfig: PayConfigModel = new PayConfigModel(); //支付方式显示配置

	//////////公共参数
	public http = new HttpClient();
	public backData: IdataModel<any> | undefined;
	public isLoading:boolean=true

	//////////END

	public created() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
		this.getUserInfo();
		this.checkEnvironment()
		this.isLoading=false
	}
	public checkEnvironment() {
		const self = this;
		$(function() {
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
	 * token过期的处理
	 */
	public tokenExpired() {
		LocalStorageUtil.loginOut();
		const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
		factory.loginExpire();
		// JumpWebUtil.backHome();
	}

	/**
	 * 获取下载url
	 * @param url
	 */
	public async getPayShowConfig() {
		const jsonConfig = await ConfigUtil.getInstance().download();
		this.payShowConfig = jsonConfig.bohe.pay;
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
				this.getUserPackage();
				if (this.userInfo.is_set_admin_pass == 0 && this.userInfo.package_level == 3) {
					Dialog.alert({
						title: '创建 "二级密码” 提示',
						message:
							"BOHE加速器支持Windows、Mac、ios、Android等多种版本，钻石会员可同时登录2台设备，当您的账号超过允许登录的设备数量时，管理员可进行设备“踢下线“处理, 以保障您当前设备的使用。如不设置此密码, 将没有安全保护, 多台设备的登录者都可以进行”踢下线”操作。请前往官网会员中心进行创建"
					}).then(() => {
						Dialog.close;
					});
				}
			} else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
				console.error('token Expried!')
				JumpWebUtil.backLogin();
			}
		} catch (e) {
			console.error('请求参数错误！')
			JumpWebUtil.backUser();
		}
	}
	/**
	 * 初始化微信jsSDK
	 */
	public async initWxConfig(payObj: any) {
		const url = HttpClient.URL_WAP_WX_SIGN;
		const param = {};
		this.backData = await this.http.post<UserInfo>(url, param);
		var data = this.backData.data;
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
		wx.ready(function() {
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
			success: function(res) {
				Toast("充值成功!");
			}
		});
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
		this.onChoosePackageType(type);
	}

	/**
	 * 切换语言
	 */
	public onChangeLanguage(ln: string) {
		lang.changeLanguage(ln, false);
		i18n.locale = lang.locale;
		GlobalConfig.log("切换语言:" + lang.locale);
	}

	/**
	 * 呼叫支付弹窗
	 */
	public clickPay() {
		// this.choosePayTypeShow = true;
		if (this.appParam.platform === 4) {
			//如果是微信公众号支付
			this.onChoosePayType(6);
			this.onPay(this.appParam.platform + 1, 2);
		} else {
			this.choosePayTypeShow = !this.choosePayTypeShow;
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
	 * 请求支付成功
	 */
	onBeginpaySuccess() {
		if (this.appParam.platform === 4) {
			this.initWxConfig(this.payObj.pay_url);
		} else {
			const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
			window.location.href = this.payObj.pay_url;
		}
	}

	/**
	 * 请求支付失败
	 */
	onBeginpayError(msg: string) {
		alert(msg);
	}

	/**
	 * 打开支付
	 */
	public onOpenPyaDialog() {}

	/**
	 * 支付成功
	 */
	public paySuccess() {}
}

new Recharge({
	i18n
}).$mount("#app");
