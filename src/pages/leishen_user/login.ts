import '@/assets/less/leishen.less';
import 'babel-polyfill';
import { Vue, Component } from 'vue-property-decorator';
import FootNavTwo from './components/FootNavTwo.vue';
import OauthLogin from './components/OauthLogin.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { Loading, Option, Select, Notification } from 'element-ui';
import { LoginProxy } from '@/ts/proxy/LoginProxy';
import GlobalConfig from './global.config';
import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import Util from '@/ts/utils/Util';
import CheckUtil from '@/ts/utils/CheckUtil';
import AppParamModel from '@/ts/models/AppModel';
import { LsLanguage } from '@/pages/leishen_user/util/LsLanguage';
import HttpClient from '@/ts/net/HttpClient';
import {
	ActivityRequestModel,
	ActivityModel,
	ActivityRequestPictureModel,
	ActivityPictureModel
} from '@/ts/models/NewsModel';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';

Vue.prototype.$notify = Notification;
Vue.use(Select);
Vue.use(Option);
Vue.use(Loading);

const jumpUrl = GlobalConfig.getSuserBaseUrl() + '/' + JumpWebUtil.HTML_NAME_LOGIN;
JumpWebUtil.checkLowBrowser(jumpUrl);

//语言包
Vue.use(VueI18n);
const webParam = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
	components: {
		'foot-nav-two': FootNavTwo,
		'oauth-login': OauthLogin
	}
})
class Login extends LoginProxy {
	public webParam = AppParamModel.getInstace(); // 浏览器参数
	public activityInfo: ActivityPictureModel = new ActivityPictureModel();
	public bannerImg: string = ''; //活动banner图片
	public activeLink: string = ''; //活动URL链接
	public imageHeadUrl: string = '';

	public created() {
		GlobalConfig.log('注册log');
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
		this.init();
        this.getActivityInfo();
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
     * 改变手机区号
     */
	public onSelectCountryCode(value: string) {
		this.country_code = value;
	}

	/**
     * 跳转忘记密码
     */
	public goForgetPwd() {
		JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_FORGETPWD);
	}

	/**
     * 跳转注册
     */
	public goRegister() {
		JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_REGISTER);
	}

	/**
     * 跳转首页
     */
	public goHome() {
		JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_INDEX);
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
   * 获取活动banner
   */
	public async getActivityInfo() {
		let url = HttpClient.URL_ACTIVITY_PICTURE_LIST;
        let param = new ActivityRequestPictureModel();
        param.plat_type = 1;        
		param.region_code = this.webParam.region_code;
		this.backData = await this.http.post(url, param);
		if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
			const activityList = this.backData.data as ActivityPictureModel[];
            this.activityInfo = activityList[0];
            if (this.activityInfo){
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
     * 点击登录
     */
	public clickLogin() {
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
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
            message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN),
            type: 'success'
        });
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
				JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(),JumpWebUtil.HTML_NAME_USER);
			}, 1000);
		}
	}

	/**
     * 登录失败
     * TODO... 此方法可以重写，处理登录失败后的ui逻辑
     */
	onLoginFaild(data: any) {
		// 错误返回
		this.setLoadingStatuas(false);
		this.$notify({
			title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
			message: data.msg,
			type: 'warning'
		});
	}

	/**
     * 改变密码
     */
	public passwordInput(type: number) {
		//TODO...需要验证输入
		this.onPasswordInput(type);
	}

	/**
     * 设置loading状态
     */
	public setLoadingStatuas(b: boolean) {
		this.isLoading = b;
		this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
	}

	/**
         * 设置第三方绑定来源类型
         */
	public setBindUrlTYype() {
		localStorage.setItem(LocalStorageUtil.STORAGES_THIRDBIND_URL_TYPE, '1');
	}
}

new Login({
	i18n
}).$mount('#app');
