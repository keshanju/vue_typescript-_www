import '@/assets/less/bohe.less';
import {LanguageConfig} from '@/ts/utils/Language';
import CheckUtil from '@/ts/utils/CheckUtil';
import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
import {Loading, Notification, Option, Select} from "element-ui";
import GlobalConfig from "@/pages/bohe/global.config";
import {Component, Vue} from "vue-property-decorator";
import {FindpwdProxy} from '@/ts/proxy/FindpwdProxy';
import "babel-polyfill";
import WebParamModel from "@/ts/models/WebModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import FootNavTwo from './components/FootNavTwo.vue';
import VueI18n from "vue-i18n";

Vue.prototype.$notify = Notification;
Vue.use(Select);
Vue.use(Option);
Vue.use(Loading);
Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    watch: {
        notifCount(newVal, oldVal) {
            this.$notify({
                title: vueC.notifTitle,
                message: vueC.notifMessage,
                type: vueC.notifType
            });
        }
    },
    components: {
        'foot-nav-two': FootNavTwo
    }
})

class Findpwd extends FindpwdProxy {

    public webParam = WebParamModel.getInstace(); // 浏览器参数

    created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.changeResignType(2);
        this.init();
    }

    /**
     * 切换找回密码方式
     */
    public changeResignType(type: number) {
        this.onChangeRegisterType(type)
    }


    /**
     * 改变手机区号
     */
    public onSelectCountryCode(value: string) {
        this.countryCode = value;
    }

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
		let tipMsg = '';
		//防止连续点击
		if (this.smsCountDownNum > 0) {
			this.$notify({
				title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
				message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_WAITING),
				type: 'warning'
			});
			return;
		}
		if (this.countryCode == '86') {
			//验证手机号
			if (!CheckUtil.checkPhone(this.phone) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
				flag = false;
				if (this.phone == '') {
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
				if (this.imgCaptchaCode == '') {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
					flag = false;
				}
			}
		}

		if (!flag) {
			this.$notify({
				title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
				message: tipMsg,
				type: 'warning'
			});
			return;
		}
		this.onGetSmscode(0, 1);
	}

    /**
     * 获取邮件
     */
    public onEmailCode() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        //验证邮箱
        if (!CheckUtil.checkEmail(this.email)) {
            if (this.email == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY
                );
                this.notifCount++;
                return false;
            }
            this.notifMessage = TipsMsgUtil.getTipsMsg(
                TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR
            );
            this.notifCount++;
            return false;
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(
                        TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY
                    );
                    this.notifCount++;
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR
                );
                this.notifCount++;
                return false;
            }
        }
        this.onGetEmailcode(1);
    }

    /**
     * 获取语音
     */
    public onVoiceCode() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        if (this.countryCode == '86') {
            //验证手机号
            if (!CheckUtil.checkPhone(this.phone)) {
                if (this.phone == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                    this.notifCount++;//触发提示
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
                this.notifCount++;//触发提示
                return false;
            }
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY)
                    this.notifCount++;
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR)
                this.notifCount++;
                return false;
            }
        }
        this.onGetSmscode(1, 1);
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
        let tipMsg = '';
		if (this.countryCode == '86') {
			//验证手机号
			if (!CheckUtil.checkPhone(this.phone) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
				flag = false;
				if (this.phone == '') {
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
				if (this.imgCaptchaCode == '') {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
					flag = false;
				}
			}
		}

		//验证短信验证码
		if (!CheckUtil.checkSmscode(this.smscode) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR);
			flag = false;
			if (this.smscode == '') {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY);
				flag = false;
			}
		}

		//验证密码
		if (!CheckUtil.checkPwd(this.phonePassword) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
			flag = false;
			if (this.phonePassword == '') {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
				flag = false;
			}
		}

		//验证确认密码
		if (!CheckUtil.checkPwdTwo(this.phonePasswordTwo, this.phonePassword) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
			flag = false;
			if (this.phonePasswordTwo == '') {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
				flag = false;
			}
		}

		if (!flag) {
			this.$notify({
				title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
				message: tipMsg,
				type: 'warning'
			});
			return;
		}

		this.onPhoneFindPassword();
	}

	/**
     * 邮箱找回密码
     */
	onClickEmailReg() {
		let flag = true;
		let tipMsg = '';
		//验证邮箱
		if (!CheckUtil.checkEmail(this.email) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR);
			flag = false;
			if (this.email == '') {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY);
				flag = false;
			}
		}

		//验证图形验证码
		if (this.isimgVerification == 1) {
			if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
				flag = false;
				if (this.imgCaptchaCode == '') {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
					flag = false;
				}
			}
		}

		//验证邮箱验证码
		if (!CheckUtil.checkSmscode(this.emailcode) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_ERROR);
			flag = false;
			if (this.emailcode == '') {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_EMPTY);
				flag = false;
			}
		}

		//验证密码
		if (!CheckUtil.checkPwd(this.emailPassword) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
			flag = false;
            if (this.emailPassword == '') {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
				flag = false;
			}
		}

		//验证确认密码
		if (!CheckUtil.checkPwdTwo(this.emailPasswordTwo, this.emailPassword) && flag) {
			tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
			flag = false;
            if (this.emailPasswordTwo == '') {
				tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
				flag = false;
			}
		}

		if (!flag) {
			this.$notify({
				title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
				message: tipMsg,
				type: 'warning'
			});
			return;
		}

		this.onEmailFindPassword();
	}

    /**
     * 密码找回成功
     */
    onFindPwdSuccess() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE);
        this.notifType = "success";
        this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_FINDPWD)
        this.notifCount++;
        let self = this;
        setTimeout(() => {
            self.isLoading = false;
            JumpWebUtil.backLogin();
        }, 1500)
    }

    /**
     * 密码找回失败
     */
    onFindPwdFaild(data: any) {
        // 错误返回
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        this.notifMessage = data.msg;
        this.notifCount++;
    }
}

//
let vueC = new Findpwd({
    i18n,
}).$mount('#app');