import "./css/mui.min0125.css";
import "./css/ls2.css";
import "./css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import UserProxy from "@/ts/proxy/UserProxy";
import GlobalConfig from "./global.config";
import NavList from "./components/NavList.vue";
import headerNav from "./components/HeadNav.vue";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import { LanguageConfig } from "@/ts/utils/Language";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import { Toast } from "vant";
import loading from './components/Loading.vue'
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
//语言包
Vue.use(VueI18n);
AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);
@Component({
	components: {
		navlist: NavList,
		"header-nav": headerNav,
		loading:loading
	}
})
class User extends UserProxy {
	// public package_level: number = 200; //200超级会员 201 海外会员
	public package_name: string = "超级会员"; //200超级会员 201 海外会员
	public showIndex: number = 0; //用户中心显示索引
	public showCharge: boolean = false;
	public actions: Array<Object> = [];
	public showLang: boolean = false;
	public isLoading:boolean=true
	public appParam: AppParamModel = AppParamModel.getInstace(1);

	async created() {
		this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.init();
		this.isLoading=false
		if (this.region_code !== 1) {
			this.showCharge = true;
		}
	}
	/**
	 * 切换语言
	 */
	public onChangeLanguage(ln: string) {
		lang.changeLanguage(ln, false, true);
		i18n.locale = lang.locale;
		if(ln==='en'){
			window.location.href=window.location.href.replace('language=zh_CN','language=en')
		}else if(ln==='zh_CN'){
			window.location.href=window.location.href.replace('language=en','language=zh_CN')
		}
	}
	// 确认用户套餐类型
	public onCheckPackageNname() {
		this.package_name = this.userInfo.package_title;
	}
	//获取用户信息成功
	public getUserinfoSuccess() {
		this.onCheckPackageNname();
	}
	/**
	 * 去充值
	 *  */

	public gotoRecharge() {
		// 只能微信支付
		window.location.href = window.location.origin + "/mrecharge.html?platform=4&region_code=0&language=en";
		// JumpWebUtil.wapJump(window.location.origin, "mrecharge.html", "platform=4&region_code=0");
	}
	// 去官方公告
	gotoNotify() {
		JumpWebUtil.wapJump(window.location.origin, "usernotify.html", "platform=4");
	}
	// 用户资料-pageIndex=1
	gotouserOperate(num: number) {
		JumpWebUtil.wapJump(window.location.origin, "useroperate.html", "platform=4&pageIndex=" + num.toString());
	}
	// 用户协议
	gotoAgreement() {
		JumpWebUtil.wapJump(window.location.origin, "userserviceterm.html", "platform=4");
	}
	//token过期
	public tokenExpired(param: string = ""): void {
		let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
		Toast(tipMsg);
		const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
		factory.loginExpire();
	}
	//获取用户信息失败
	public getUserinfoFail() {
		let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
		Toast(tipMsg);
		// setTimeout(() => {
		// 	JumpWebUtil.wapJump(window.location.origin, "login.html");
		// }, 3000);
	}

	// 切换用户中心页面
	public changeUserIndex(index: number) {
		this.showIndex = index;
		this.$emit("changeshow", this.showIndex);
	}
}
//
let vueC = new User({ i18n }).$mount("#app");
