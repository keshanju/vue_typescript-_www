import "../css/mui.min0125.css";
import "../css/ls2.css";
import "../css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import { Uploader, Actionsheet, Toast, Dialog } from "vant";
import UserProxy from "@/ts/proxy/UserProxy";
import GlobalConfig from "../global.config";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import AppParamModel from "@/ts/models/AppModel";
import Util from "@/ts/utils/Util";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import HeadProxy from "@/ts/proxy/HeadProxy";
import { LanguageConfig } from "@/ts/utils/Language";
//语言包
Vue.use(Uploader);
Vue.use(Actionsheet);
@Component({})
export default class UserSetting extends UserProxy {
	public pic: string = "";
	public actions: Array<Object> = [];
	public show: boolean = false;
	hproxy = new HeadProxy();
	created() {
		this.hproxy.lanConfig = LanguageConfig.getInstance();
		this.hproxy.init();
		this.actions = this.hproxy.languageList;
	}
	mounted() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
		this.getUserInfo();
	}

	onRead(file) {
		this.pic = file.content;
		// let picSize = file.file.size;
		// if (picSize > 500 * 1024) {
		//   Toast("图片大小超过500k");
		//   return false;
		// }
		this.uploadAvatar(this.pic);
	}
	//头像上传成功
	uploadAvatarSuccess() {
		let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_AVATAR_UPLOADED);
		Toast(tipMsg);
	}

	//头像上传成功
	uploadAvatarFail(data) {
		Toast(data.msg);
	}

	//token过期
	public tokenExpired(param: string = ""): void {
		let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
		Toast(tipMsg);
		setTimeout(() => {
			this.gotoLogin();
		}, 3000);
	}

	public removebind() {
		Dialog.confirm({
			title: "",
			message: "是否确定解除绑定?"
		})
			.then(() => {
				// on confirm
				this.onRemoveBing();
			})
			.catch(() => {
				// on cancel
			});
	}

	//   解除绑定成功
	onRemoveBindSuccess() {
		let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_WEIXIN_REMOVEBING_SUCCEED);
		Toast(tipMsg);
	}

	//   解除绑定失败
	onRemoveBindFaild(data) {
		Toast(data.msg);
	}

	//   去登录
	public gotoLogin() {
		JumpWebUtil.wapJump(window.location.origin, "login.html", "platform=4");
	}

	//  去忘记密码
	public gotoforget() {
		JumpWebUtil.wapJump(window.location.origin, "forgetPassword.html", "platform=4");
	}
	changeLang() {
		this.show = true;
	}
	/**
	 * 选择语言
	 */
	public onSelectLang(value: { code: string }) {
		try {
			this.hproxy.onSetLanguage(value.code);
			// 抛出自定义事件
			this.$emit("changelanguage", value.code);
			this.show = false;
		} catch (e) {}
	}
}
