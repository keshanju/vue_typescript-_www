import "./css/mui.min0125.css";
import "./css/ls2.css";
import "./css/wap.less";
import "babel-polyfill";
import { Component, Vue } from "vue-property-decorator";
import { Actionsheet, Checkbox, Picker, Tab, Tabs, Toast } from "vant";
import VueI18n from "vue-i18n";
import { FindpwdProxy } from "@/ts/proxy/FindpwdProxy";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import CheckUtil from "@/ts/utils/CheckUtil";
import Util from "@/ts/utils/Util";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import GlobalConfig from "./global.config";
import { LanguageConfig } from "@/ts/utils/Language";
import AppParamModel from "@/ts/models/AppModel";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Picker);
Vue.use(Toast);
Vue.use(Checkbox);
Vue.use(Actionsheet);
//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);


@Component
class ForgetPwd extends FindpwdProxy {
	public AreaCodeshow: boolean = false; //区域列表是否显示
	public appParam: AppParamModel = AppParamModel.getInstace();
	public regtype: number = 2; //默认通过手机号找回密码
	public showVioceCode = 0; //是否显示语音验证码 0 不显示  1显示
	public langWidth:string='100px'

	public created() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.init();
		this.registerIsCaptcha();
		this.changeResignType(0);
		if(this.appParam.language!=='en'){
			this.langWidth='240px'
		}
	}
	/**
	 * 切换找回密码方式
	 */
	public changeResignType(type: number) {
		if (type == 0) {
			this.regtype = 2;
		  } else if (type == 1) {
			this.regtype = 3;
		  }
		  this.onChangeRegisterType(this.regtype);
		  this.imgCaptchaCode = "";
	}

	//  呼出区域选择列表
	public changeAreaCode() {
		this.AreaCodeshow = true;
	}

	// 选择区号
	onCheckAreaCode(value) {
		this.countryCode = value;
		this.AreaCodeshow = false;
	}
	gotologin() {
		JumpWebUtil.wapJump(window.location.origin, "login.html");
	}
	/**
	 * 切换语言
	 */
	// public onChangeLanguage(ln: string) {
	//     lang.changeLanguage(ln);
	//     i18n.locale = lang.locale;
	//     this.webParam.language = ln;
	//     // GlobalConfig.log('切换语言:' + lang.locale);
	// }

	/**
	 * 获取图形验证码
	 */
	public getCaptcha() {
		this.onGetCaptcha();
	}

	/**
	 * 获取短信验证码
	 */
	public onSmsCode() {
		let flag = true;
		let tipMsg = "";

		if (this.countryCode == "86") {
			//验证手机号
			if (!CheckUtil.checkPhone(this.phone) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
				flag = false;
				if (this.phone == "") {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
					flag = false;
				}
			}
		}

		//验证图形验证码
		if (this.isimgVerification == 1) {
			if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
				flag = false;
				if (this.imgCaptchaCode == "") {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
					flag = false;
				}
			}
		}

		if (!flag) {
			Toast(tipMsg);
			return;
		}
		this.onGetSmscode(0, 1);
	}

	/**
	 * 获取语音
	 */
	public onVoiceCode() {
		let flag = true;
		let tipMsg = "";
		if (this.countryCode == "86") {
			//验证手机号
			if (!CheckUtil.checkPhone(this.phone) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
				flag = false;
				if (this.phone == "") {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
					flag = false;
				}
			}
		}

		//验证图形验证码
		if (this.isimgVerification == 1) {
			if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
				flag = false;
				if (this.imgCaptchaCode == "") {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
					flag = false;
				}
			}
		}

		if (!flag) {
			Toast(tipMsg);
			return;
		}
		this.onGetSmscode(1, 1);
	}

	/**
	 * 获取短信验证码成功
	 * TODO... 此方法可以重写，处理短信获取成功后的ui逻辑
	 */
	onGetSmscodeSuccess() {
		Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS));
		//倒计时
		this.smsCountDownNum = 60;
		const sefl = this;
		Util.countDown(this.smsCountDownNum, 1, (n: number) => {
			sefl.smsCountDownNum = n;
		});
		this.showVioceCode = 1;
	}

	/**
	 * 获取短信验证码失败
	 */
	onGetSmscodeFaild(data: any) {
		Toast(data.msg);
	}

	/**
	 * 获取邮件
	 */
	public onEmailCode() {
		let flag = true;
		let tipMsg = "";

		//验证邮箱
		if (!CheckUtil.checkEmail(this.email) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR);
			flag = false;
			if (this.email == "") {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY);
				flag = false;
			}
		}

		//验证图形验证码
		if (this.isimgVerification == 1) {
			if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
				flag = false;
				if (this.imgCaptchaCode == "") {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
					flag = false;
				}
			}
		}

		if (!flag) {
			Toast(tipMsg);
			return;
		}
		this.onGetEmailcode(1);
	}

	/**
	 * 获取邮箱验证码成功
	 * TODO... 此方法可以重写，处理邮件发送成功后的ui逻辑
	 */
	onGetEmailcodeSuccess() {
		Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL));
		//倒计时
		this.emailCountDownNum = 60;
		const sefl = this;
		Util.countDown(this.emailCountDownNum, 1, (n: number) => {
			sefl.emailCountDownNum = n;
		});
	}

	/**
	 * 获取邮箱验证码失败
	 * TODO... 此方法可以重写，处理邮件获取失败后的ui逻辑
	 */
	onGetEmailcodeFaild(data: any) {
		// 错误返回
		Toast(data.msg);
	}

	/**
	 * 点击重置密码
	 */
	public clickFindPassword() {
		switch (this.resignType) {
			case 2:
				this.onClickPhoneReg();
				break;
			case 3:
				this.onClickEmailReg();
				break;
		}
	}

	/**
	 * 手机找回密码
	 */
	onClickPhoneReg() {
		let flag = true;
		let tipMsg = "";
		if (this.countryCode == "86") {
			//验证手机号
			if (!CheckUtil.checkPhone(this.phone) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
				flag = false;
				if (this.phone == "") {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
					flag = false;
				}
			}
		}
		//验证图形验证码
		if (this.isimgVerification == 1) {
			if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
				flag = false;
				if (this.imgCaptchaCode == "") {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
					flag = false;
				}
			}
		}

		//验证短信验证码
		if (!CheckUtil.checkSmscode(this.smscode) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR);
			flag = false;
			if (this.smscode == "") {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY);
				flag = false;
			}
		}

		//验证密码
		if (!CheckUtil.checkPwd(this.phonePassword) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
			flag = false;
			if (this.phonePassword == "") {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
				flag = false;
			}
		}

		//验证确认密码
		if (!CheckUtil.checkPwdTwo(this.phonePasswordTwo, this.phonePassword) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
			flag = false;
			if (this.phonePasswordTwo == "") {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
				flag = false;
			}
		}

		if (!flag) {
			Toast(tipMsg);
			return;
		}

		this.onPhoneFindPassword();
	}

	/**
	 * 邮箱找回密码
	 */
	onClickEmailReg() {
		let flag = true;
		let tipMsg = "";
		//验证邮箱
		if (!CheckUtil.checkEmail(this.email) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR);
			flag = false;
			if (this.email == "") {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY);
				flag = false;
			}
		}

		//验证图形验证码
		if (this.isimgVerification == 1) {
			if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
				flag = false;
				if (this.imgCaptchaCode == "") {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
					flag = false;
				}
			}
		}

		//验证邮箱验证码
		if (!CheckUtil.checkSmscode(this.emailcode) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_ERROR);
			flag = false;
			if (this.emailcode == "") {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_EMPTY);
				flag = false;
			}
		}

		//验证密码
		if (!CheckUtil.checkPwd(this.emailPassword) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
			flag = false;
			if (this.phonePassword == "") {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
				flag = false;
			}
		}

		//验证确认密码
		if (!CheckUtil.checkPwdTwo(this.emailPasswordTwo, this.emailPassword) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
			flag = false;
			if (this.phonePasswordTwo == "") {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
				flag = false;
			}
		}

		if (!flag) {
			Toast(tipMsg);
			return;
		}

		this.onEmailFindPassword();
	}

	/**
	 * 密码找回成功
	 */
	onFindPwdSuccess() {
		Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_FINDPWD));
		let self = this;
		setTimeout(() => {
			JumpWebUtil.wapJump(window.location.origin, "login.html");
		}, 1500);
	}

	/**
	 * 密码找回失败
	 */
	onFindPwdFaild(data: any) {
		// 错误返回
		Toast(data.msg);
	}
}

new ForgetPwd({ i18n }).$mount("#app");
