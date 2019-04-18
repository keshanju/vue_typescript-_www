import "./css/mui.min0125.css";
import "./css/ls2.css";
import "./css/wap.less";
import { Actionsheet, Picker, Tab, Tabs, Toast } from "vant";
import loading from './components/Loading.vue'
import { LoginProxy } from "@/ts/proxy/LoginProxy";
import GlobalConfig from "./global.config";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import CheckUtil from "@/ts/utils/CheckUtil";
import Util from "@/ts/utils/Util";
import { Component, Vue } from "vue-property-decorator";
import { LoginRequestModel } from "@/ts/models/UserModel";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { Md5 } from "ts-md5";
import HttpClient from "@/ts/net/HttpClient";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import { LanguageConfig } from "@/ts/utils/Language";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Picker);
Vue.use(Toast);
Vue.use(Actionsheet);

//语言
Vue.use(VueI18n);
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);


@Component
class Login extends LoginProxy {
	public appParam: AppParamModel = AppParamModel.getInstace(1);
	public AreaCodeshow: boolean = false; //区域号码显示
	public code: string = ""; //微信公众号
	public bangding: boolean = true; //微信公众号
	public region_code: number = 0;
	public platform: number = 4; //平台类型
	public isLoading:boolean=true

	public created() {
		//根据不同的regioncode显示不同的语言
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.init();
		// this.getcode();
		this.onCheckPlatType();
		this.isLoading=false
	}
	//   获取regincode
	public async getcode() {
		let regincode = await ConfigUtil.getInstance().getRegincode();
		this.region_code = regincode;
		LocalStorageUtil.addRegionCode(this.region_code);
	}
	//判断平台类型 微信公众号还是手机端
	onCheckPlatType() {
		this.platform = this.appParam.platform;
	}
	/**
	 * 切换登录方式
	 */
	public changeLoginType(index) {
		this.loginType = index;
	}

	//  呼出区域选择列表
	public changeAreaCode() {
		this.AreaCodeshow = true;
	}

	// 选择区号
	onCheckAreaCode(value) {
		this.country_code = value;
		this.AreaCodeshow = false;
	}

	/**
	 * 点击登录
	 */
	public onLogin() {
		//验证用户名
		if (this.loginType == 0) {
			this.onPhoneLogin();
		} else if (this.loginType == 1) {
			//验证邮箱
			if (!CheckUtil.checkEmail(this.email)) {
				if (this.email == "") {
					this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY);
					Toast(this.notifMessage);
					return false;
				}
				this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR);
				Toast(this.notifMessage);
				return false;
			}

			this.onEmaillLogin();
		}
	}

	/**
	 * 登录成功
	 * TODO... 此方法可以重写，处理登录成功后的ui逻辑
	 */
	onLoginSuccess() {
		this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN);
		Toast(this.notifTitle);
		setTimeout(() => {
			JumpWebUtil.wapJump(window.location.origin, "usercenter.html");
		}, 3000);
	}

	/**
	 * 登录失败
	 * TODO... 此方法可以重写，处理登录失败后的ui逻辑
	 */
	onLoginFaild(data: any) {
		// 错误返回
		Toast(data.msg);
	}

	/**
	 * 改变密码
	 */
	public passwordInput(type: number) {
		//TODO...需要验证输入
		this.onPasswordInput(type);
	}

	/**
	 * 改变手机区号
	 */
	public onSelectCountryCode(value: string) {
		this.country_code = value;
	}

	/**
	 * 手机登录
	 */
	public onPhoneLogin() {
		const url = HttpClient.URL_LOGIN_BIND;
		let password = this.phonePassword;
		if (this.bangding) {
			this.code = Util.getUrlParam("code");
		}
		if (this.isPwMd5) {
			password = Md5.hashStr(this.phonePassword).toString();
		}
		let param = new LoginRequestModel();
		param.country_code = this.country_code;
		param.username = this.phone;
		param.password = password;
		param.code = this.code;
		param.src_channel = LocalStorageUtil.getSrcChannel();

		localStorage.setItem(LocalStorageUtil.STORAGES_PHONE, this.phone);
		localStorage.setItem(LocalStorageUtil.STORAGES_USERNAME, this.phone);
		if (this.isKeepPw) {
			localStorage.setItem(LocalStorageUtil.STORAGES_PHONE_PW, password);
			localStorage.setItem(LocalStorageUtil.STORAGES_PW, password);
		} else {
			localStorage.removeItem(LocalStorageUtil.STORAGES_PHONE_PW);
		}
		this.loginIn(url, param);
	}

	/**
	 * 邮箱登录
	 */
	public onEmaillLogin() {
		const url = HttpClient.URL_LOGIN_BIND;
		let password = this.emailPassword;
		if (this.bangding) {
			this.code = Util.getUrlParam("code");
		}
		if (this.isPwMd5) {
			password = Md5.hashStr(this.emailPassword).toString();
		}
		let param = new LoginRequestModel();
		param.username = this.email;
		param.password = password;
		param.code = this.code;
		param.src_channel = LocalStorageUtil.getSrcChannel();
		localStorage.setItem(LocalStorageUtil.STORAGES_EMAIL, this.email);
		localStorage.setItem(LocalStorageUtil.STORAGES_USERNAME, this.email);
		if (this.isKeepPw) {
			localStorage.setItem(LocalStorageUtil.STORAGES_EMAIL_PW, password);
			localStorage.setItem(LocalStorageUtil.STORAGES_PW, password);
		} else {
			localStorage.removeItem(LocalStorageUtil.STORAGES_EMAIL_PW);
		}
		this.loginIn(url, param);
	}
	/**
	 * 点击注册
	 */
	gotoRegister() {
		JumpWebUtil.wapJump(window.location.origin, "register.html", "platform=4");
	}
	/**
	 * 点击忘记密码
	 */
	gotoforgetPassword() {
		JumpWebUtil.wapJump(window.location.origin, "forgetPassword.html", "platform=4");
	}
}

//
let vueC = new Login({ i18n }).$mount("#app");
