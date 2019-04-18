/**
 * app参数
 */
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { UserToken } from "@/ts/models/UserModel";
import { IParam } from "@/ts/interface/IParam";
import ProjectConfig from "../../../project.config";

export default class AppParamModel implements IParam {
	public static instace: AppParamModel;

	public language: string = ""; // 语言
	public region_code: number = 0; // 地区code
	public account_token: string = ""; // token
	public id: number = 0; // 详情id
	public platform: number = 0; //0window 1mac 2android 3ios 4微信公众号 5window带内核新版
	public vType: number = 0; //0未发布 1已发布
	public scale: number = 1; //缩放比例
	public src_channel: string = ""; //来源 内嵌用此字段
	public from: string = ""; //来源 官网用此字段
	public infrom: number = 0; // 0默认 1 ios（给苹果审核用的官网)
	public os_type: number = 1; //来源

	/**
	 * 单例
	 */
	public static getInstace(region_code: number = Util.REGION_CODE_0, language: string = Util.EN) {
		if (AppParamModel.instace == null) AppParamModel.instace = new AppParamModel(region_code, language);

		return AppParamModel.instace;
	}

	constructor(region_code: number, language: string) {
		this.region_code = region_code;
		this.language = language;
		this.getAppParam();
	}

	/**
	 * app端页面参数
	 */
	public getAppParam() {
        //兼容IE10问题
        if (!window.location.origin) {
            // @ts-ignore
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }

		this.id = parseInt(Util.getUrlParam("id"));
		if (isNaN(this.id)) {
			this.id = 0;
		}

		this.scale = Number(Util.getUrlParam("scale"));
		if (isNaN(this.scale) || this.scale == 0) {
			this.scale = 1;
		}

		const region_code = parseInt(Util.getUrlParam("region_code"));
		if (!isNaN(region_code)) {
			this.region_code = region_code;
		}

		let language = Util.getUrlParam("language");
		if (language === "") {
			//读取浏览器中的语言
			language = Util.getExplorerbLang();
			if (language != "" && language != null && language != "undefined" && language != "null") {
				this.language = language;
			}
		}else {
			this.language = language;
		}

		this.account_token = Util.getUrlParam("account_token");
        if(this.account_token == '') {
        	try {
                this.account_token = LocalStorageUtil.getUserToken().account_token;
			}catch (e) {
                this.account_token = '';
            }
        }

		this.platform = parseInt(Util.getUrlParam("platform"));
		if (isNaN(this.platform)) {
			this.platform = 0;
		}

		this.vType = parseInt(Util.getUrlParam("vType"));
		if (isNaN(this.vType)) {
			this.vType = 0;
		}

		this.os_type = Number(Util.getUrlParam("os_type"));
		if (isNaN(this.os_type)) {
			this.os_type = 1;
		}
		localStorage.setItem(LocalStorageUtil.STORAGES_OS_TYPE, this.os_type + "");

		//是否是ios地址
		let hostname = window.location.hostname;
		if (hostname.indexOf("ios.") != -1) {
			this.language = Util.EN;
			this.region_code = Util.REGION_CODE_1;
			this.infrom = 1;
		}

		//pc来源
		let from = Util.getUrlParam("from");
		if (from == "") {
			from = Util.getUrlParam("src_channel");
		}
		if (from == "") {
			this.from = Util.FROM_GUANWANG;
			this.src_channel = Util.FROM_GUANWANG;
		} else {
			this.from = from;
			this.src_channel = from;
		}

		//保存来源
		LocalStorageUtil.addSrcChannel(this.src_channel);
		//保存token
		const userInfo = new UserToken();
		userInfo.account_token = this.account_token;
		LocalStorageUtil.addUserToken(userInfo);
		//保存语言
		LocalStorageUtil.addLanguage(this.language);
		//保存地区
		LocalStorageUtil.addRegionCode(this.region_code);
		ProjectConfig.log("appModel:");
		ProjectConfig.log(JSON.stringify(this));
	}
}
