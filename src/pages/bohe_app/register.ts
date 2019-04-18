import { Component, Vue } from "vue-property-decorator";
import { Actionsheet, Checkbox, Picker, Tab, Tabs, Toast } from "vant";
import loading from './components/Loading.vue'
import "./css/mui.min0125.css";
import "./css/ls2.css";
import "./css/wap.less";
import { RegisterProxy } from "@/ts/proxy/RegisterProxy";
import Util from "@/ts/utils/Util";
import GlobalConfig from "./global.config";
import CheckUtil from "@/ts/utils/CheckUtil";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { LanguageConfig } from "@/ts/utils/Language";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import ConfigUtil from '@/ts/utils/ConfigUtil';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Picker);
Vue.use(Toast);
Vue.use(Checkbox);
Vue.use(Actionsheet);

//语言
Vue.use(VueI18n);
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Register extends RegisterProxy {
	public AreaCodeshow: boolean = false;
	public showVioceCode = 0; //是否显示语音验证码 0 不显示  1显示
	public langWidth:string='100px'
	public isLoading:boolean=true
	public appParam: AppParamModel = AppParamModel.getInstace(1)
	public created() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.init();
		this.registerIsCaptcha();
		this.isLoading=false
		if(this.appParam.language!=='en'){
			this.langWidth='240px'
		}
		 //读取配置文件config.json,判断是否显示邮箱注册按钮
		 this.ishowEmial();
	}
	   /**
     *  读取配置文件config.json,判断是否显示邮箱注册按钮
     * @param url
     */
    public async ishowEmial() {
        const jsonConfig = await ConfigUtil.getInstance().download();
        const region_code = LocalStorageUtil.getRegionCodes();
        if (jsonConfig != null) {
            const regConfig = jsonConfig.bohe[region_code].register;
            this.isShowEmail = Number(regConfig.is_email);
        }
    }
	public init(): void {
		this.getAreaCodeList();
		// this.onGetPackage(1);
		this.onGetPackage(2);
	}

	//  呼出区域选择列表
	public changeAreaCode() {
		this.AreaCodeshow = true;
	}
	/**
	 * 获取语音
	 */
	public onVoiceCode() {
		this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
		this.notifType = "warning";
		if (this.countryCode == "86") {
			//验证手机号
			if (!CheckUtil.checkPhone(this.phone)) {
				if (this.phone == "") {
					this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
					Toast(this.notifMessage);
					return false;
				}
				this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
				Toast(this.notifMessage);
				return false;
			}
		}
	}
	//切换注册类型
	public changeResignType(index) {
		this.resignType = index;
		this.isimgVerification = 0; //切换后图形验证码还原
		this.registerIsCaptcha();
		this.agreementChceked = false; //同意会员条款重置
	}

	// 选择区号
	onCheckAreaCode(value) {
		this.countryCode = value;
		this.AreaCodeshow = false;
	}
	//   去会员服务条款
	public gotoitems() {
		let url = window.location.origin;
		JumpWebUtil.wapJump(url, "userserviceterm.html", "platform=4");
		// JumpWeiXin.gotoItems(param);
	}
	/**
	 * 获取图形验证码
	 */
	public getCaptcha() {
		//TODO...需要验证输入
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
					Toast(tipMsg);
					flag = false;
				}
			}
		}

		if (!flag) {
			Toast(tipMsg);
			return;
		}
		this.onGetSmscode(0, 2);
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
		this.onGetEmailcode(2);
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
	 * 点击注册
	 */
	public clickRegister() {
		switch (this.resignType) {
			case 0:
				this.onClickPhoneReg();
				break;
			case 1:
				this.onClickEmailReg();
				break;
		}
	}

	/**
	 * 手机注册
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

		//用户协议
		if (!this.agreementChceked && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_READAGREEMENT);
			flag = false;
		}

		if (!flag) {
			Toast(tipMsg);
			return;
		}

        const os_type = 5;
		this.onPhoneRegister(os_type);
	}

	/**
	 * 邮箱注册
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

		//验证用户协议是否勾选
		if (!this.agreementChceked && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_READAGREEMENT);
			flag = false;
		}

		if (!flag) {
			Toast(tipMsg);
			return;
		}

        const os_type = 5;
		this.onEmaillRegister(5);
	}

	/**
	 * 注册成功
	 */
	public onRegisterSuccess() {
		this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_REGISTER);
		Toast(this.notifTitle);
		setTimeout(() => {
			JumpWebUtil.wapJump(window.location.origin, "login.html");
		}, 3000);
	}

	/**
	 * 注册失败
	 */
	public onRegisterFaild(data: any) {
		// 错误返回
		Toast(data.msg);
	}
}

let vueC = new Register({ i18n }).$mount("#app");
