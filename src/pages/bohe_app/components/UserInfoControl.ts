import "../css/mui.min0125.css";
import "../css/ls2.css";
import "../css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import UserProxy from "@/ts/proxy/UserProxy";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import HttpClient from "@/ts/net/HttpClient";
import { UpdateInfos, UserInfo } from "@/ts/models/UserModel";
import CheckUtil from "@/ts/utils/CheckUtil";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import Util from "@/ts/utils/Util";
// import { LanguageConfig } from "@/ts/utils/Language";
import GlobalConfig from "../global.config";
import { Toast } from "vant";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
//语言包
Vue.use(VueI18n);
// const appParam: AppParamModel = AppParamModel.getInstace();
// let lang = LanguageConfig.getInstance();
// lang.initNoRefresh();
// const i18n = new VueI18n(lang);
@Component({})
export default class Infos extends UserProxy {
	public nickname: string = "";
	public qq: string = "";
	public mobile: string = "";
	public email: string = "";
	public address: string = "";
	public updateInfos: UpdateInfos = new UpdateInfos(); //需要上传的用户信息
	public appParam: AppParamModel = AppParamModel.getInstace();

	mounted() {
		this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.init();
	}
	init() {
		this.getUserInfo();
		this.nickname = LocalStorageUtil.getUserInfo().nickname;
		this.mobile = LocalStorageUtil.getUserInfo().mobile;
		this.email = LocalStorageUtil.getUserInfo().email;
		this.address = LocalStorageUtil.getUserInfo().address;
		this.qq = LocalStorageUtil.getUserInfo().mobile_contact_number;
	}

	/**
	 * 修改用户信息
	 */
	public async onSaveUserInfo() {
		this.isLoading = true;
		const token = LocalStorageUtil.getUserToken().account_token;
		const url = HttpClient.URL_USER_EDIT;
		let params = new UpdateInfos();
		if (this.nickname != "") {
			params.nickname = this.nickname;
		}
		if (this.qq != "") {
			params.mobile_contact_number = this.qq + "";
		}
		if (this.address != "") {
			params.address = this.address;
		}
		params.account_token = token;

		this.backData = await this.http.post<UserInfo>(url, params);
		this.isLoading = false;
		if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
			if (this.nickname != "") {
				this.userInfo.nickname = this.nickname;
			}
			UserInfo.updateUserInfo(this.userInfo);
			this.onSaveUserInfoSuccess();
		} else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
			this.tokenExpired();
		} else {
			this.onSaveUserInfoError(this.backData);
		}
	}

	/**
	 * TODO... 需要重写此方法
	 * 修改用户信息成功
	 */
	onSaveUserInfoSuccess() {
		let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_RESETNICKNAME_SUCCESS);
		Toast(tipMsg);
		setTimeout(()=>{
		window.history.back();
		},1000)
	}

	/**
	 * TODO... 需要重写此方法
	 * 修改用户信息失败
	 * @param backData
	 */
	onSaveUserInfoError(backData) {
		Toast(backData.msg);
	}

	//token过期
	public tokenExpired(param: string = ""): void {
		let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
		Toast(tipMsg);
		const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
    	factory.loginExpire();
	}
}
