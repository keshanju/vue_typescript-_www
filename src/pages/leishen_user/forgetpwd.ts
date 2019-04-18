import '@/assets/less/leishen.less';
import 'babel-polyfill';
import { Vue, Component } from 'vue-property-decorator';
import FootNavTwo from './components/FootNavTwo.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { Loading, Notification, Option, Select } from 'element-ui';
import { FindpwdProxy } from '@/ts/proxy/FindpwdProxy';
import GlobalConfig from './global.config';
import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';
import CheckUtil from '@/ts/utils/CheckUtil';
import Util from '@/ts/utils/Util';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import AppParamModel from "@/ts/models/AppModel";
import {LsLanguage} from "@/pages/leishen_user/util/LsLanguage";
import HttpClient from '@/ts/net/HttpClient';
import { ActivityRequestModel, ActivityModel, ActivityRequestPictureModel, ActivityPictureModel } from '@/ts/models/NewsModel';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';

Vue.prototype.$notify = Notification;
Vue.use(Select);
Vue.use(Option);
Vue.use(Loading);
Vue.config.productionTip = false;

const jumpUrl = GlobalConfig.getSuserBaseUrl() + '/' + JumpWebUtil.HTML_NAME_FORGETPWD;
JumpWebUtil.checkLowBrowser(jumpUrl);

//语言包
Vue.use(VueI18n);
const webParam = AppParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
	components: {
		'foot-nav-two': FootNavTwo
	}
})
class ForgetPwd extends FindpwdProxy {
    public webParam = AppParamModel.getInstace(); // 浏览器参数
    public activityInfo: ActivityPictureModel = new ActivityPictureModel();
    public bannerImg: string = ''; //活动banner图片
    public activeLink: string = ''; //活动URL链接
    public imageHeadUrl: string = '';

	public created() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.changeResignType(2);
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.getActivityInfo();
		this.init();
	}

	/**
     * 切换找回密码方式
     */
	public changeResignType(type: number) {
		this.onChangeRegisterType(type);
    }
    
    /**
   * 获取活动banner
   */
    public async getActivityInfo() {
        let url = HttpClient.URL_ACTIVITY_PICTURE_LIST;
        let param = new ActivityRequestPictureModel();
        param.plat_type = 1
        param.region_code = this.webParam.region_code;
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            const activityList = this.backData.data as ActivityPictureModel[];
            this.activityInfo = activityList[0];
            if (this.activityInfo) {
                this.bannerImg = this.activityInfo.imgs.filter((a, b) => {
                    return a.key == 0; // 0 官网  1是移动端  2pc 客户端
                })[0].img_url;
            }

            //给banner  赋值
            if (this.bannerImg != '') {
                this.bannerImg = this.imageHeadUrl + this.bannerImg;
            }
        }
    }

	/**
     * 切换语言
     */
	public onChangeLanguage(ln: string) {
		lang.changeLanguage(ln);
		i18n.locale = lang.locale;
		this.webParam.language = ln;
		// GlobalConfig.log('切换语言:' + lang.locale);
    }
    
    /**
     * 跳转首页
     */
    public goHome() {
        JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_INDEX);
    }

    /**
     * 跳转登录
     */
    public goLogin() {
        JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_LOGIN);
    }

    /**
     * 跳转活动详情
     */
    public goActivityDetail(item: any) {
        if (item.url_type == 1) {
            window.open(item.url);
        } else {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_DETAILS_ACTIVITY + item.id + '.html');
        }
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
     * 获取语音
     */
	public onVoiceCode() {
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

		if (!flag) {
			this.$notify({
				title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
				message: tipMsg,
				type: 'warning'
			});
			return;
		}
		this.onGetSmscode(1, 1);
	}

	/**
     * 获取短信验证码成功
     * TODO... 此方法可以重写，处理短信获取成功后的ui逻辑
     */
	onGetSmscodeSuccess() {
		this.$notify({
			title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
			message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS),
			type: 'success'
		});
		//倒计时
		this.smsCountDownNum = 60;
		const sefl = this;
		Util.countDown(this.smsCountDownNum, 1, (n: number) => {
			sefl.smsCountDownNum = n;
		});
	}

	/**
     * 获取短信验证码失败
     */
	onGetSmscodeFaild(data: any) {
		this.$notify({
			title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
			message: data.msg,
			type: 'warning'
		});
	}

	/**
     * 获取邮件
     */
	public onEmailCode() {
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

		if (!flag) {
			this.$notify({
				title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
				message: tipMsg,
				type: 'warning'
			});
			return;
		}
		this.onGetEmailcode(1);
	}

	/**
     * 获取邮箱验证码成功
     * TODO... 此方法可以重写，处理邮件发送成功后的ui逻辑
     */
	onGetEmailcodeSuccess() {
		this.$notify({
			title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
			message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL),
			type: 'success'
		});
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
		this.$notify({
			title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
			message: data.msg,
			type: 'warning'
		});
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
		this.$notify({
			title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
			message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_FINDPWD),
			type: 'success'
		});
		let self = this;
		setTimeout(() => {
			self.isLoading = false;
            JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_LOGIN);
		}, 1500);
	}

	/**
     * 密码找回失败
     */
	onFindPwdFaild(data: any) {
		// 错误返回
		this.$notify({
			title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
			message: data.msg,
			type: 'warning'
		});
	}
}

new ForgetPwd({
	i18n
}).$mount('#app');
