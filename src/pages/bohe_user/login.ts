import '@/assets/less/bohe.less';
import {Component, Vue} from "vue-property-decorator";
import {LanguageConfig} from '@/ts/utils/Language';
import {LoginProxy} from '@/ts/proxy/LoginProxy';
import GlobalConfig from "@/pages/bohe/global.config";
import CheckUtil from '@/ts/utils/CheckUtil';
import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
import {Loading, Notification, Option, Select} from "element-ui";
import "babel-polyfill";
import WebParamModel from "@/ts/models/WebModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import FootNavTwo from './components/FootNavTwo.vue';
import OauthLogin from './components/OauthLogin.vue';
import Util from "@/ts/utils/Util";
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
        notifNum(newVal, oldVal) {
            this.$notify({
                title: vueC.notifTitle,
                message: vueC.notifMessage,
                type: vueC.notifType
            });
        }
    },
    components: {
        'foot-nav-two': FootNavTwo,
        'oauth-login': OauthLogin,
    }
})

class Login extends LoginProxy {
    public webParam = WebParamModel.getInstace(); // 浏览器参数

    public created() {
        GlobalConfig.log("注册log");
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.init();
    }

    public mounted() {
    }

    /**
     * 返回首页
     * @param type
     */
    public goHome() {
        JumpWebUtil.backHome();
    }

    /**
     * 切换登录方式
     */
    public onChangeLoginType(type: number) {
        this.changeLoginType(type);
    }

   	/**
     * 点击登录
     */
	public onLogin() {
		let flag = true;
		let tipMsg = '';
		if (this.loginType == 0) {
			if (this.country_code == '86') {
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

			if (this.isPwMd5) {
				//验证密码
				if (this.phonePassword == '') {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
					flag = false;
				}
			} else {
				//验证记住的密码
				if (!CheckUtil.checkRemberPwd(this.phonePassword) && flag) {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
					flag = false;
					if (this.phonePassword == '') {
						tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
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
			this.setLoadingStatuas(true);
			this.onPhoneLogin();
		} else {
			//验证邮箱/账号
			if (!CheckUtil.checkEmail(this.email) && flag) {
				if (!CheckUtil.checkAccount(this.email)) {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ACCOUNT_ERROR);
					flag = false;
				}
				if (this.email == '') {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ACCOUNT_EMPTY);
					flag = false;
				}
			}
			if (this.isPwMd5) {
				if (this.emailPassword == '') {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
					flag = false;
				}
			} else {
				//验证记住的密码
				if (!CheckUtil.checkRemberPwd(this.emailPassword) && flag) {
					tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
					flag = false;
					if (this.emailPassword == '') {
						tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
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
			this.setLoadingStatuas(true);
			this.onEmaillLogin();
		}
	}

    /**
     * 登录成功
     * TODO... 此方法可以重写，处理登录成功后的ui逻辑
     */
    onLoginSuccess() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE);
        this.notifType = "success";
        this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN);
        this.notifNum++;
        let self = this;
        this.isLoading = true;
        //读取to参数跳转到对应的页面
        const toHtml = Util.getUrlParam('to');
        if (toHtml != '') {
            const page = parseInt(Util.getUrlParam('page'));
            setTimeout(() => {
                JumpWebUtil.toPage(toHtml, page);
            }, 1000);
        } else {
            setTimeout(() => {
                JumpWebUtil.backUser();
            }, 1000);
        }
    }

    /**
     * 登录失败
     * TODO... 此方法可以重写，处理登录失败后的ui逻辑
     */
    onLoginFaild(data: any) {
        // 错误返回
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        this.notifMessage = data.msg;
        this.notifNum++;
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
     * 设置loading状态
     */
    public setLoadingStatuas(b: boolean) {
        this.isLoading = b;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
    }
}

//
let vueC = new Login({
    i18n,
}).$mount('#app');
