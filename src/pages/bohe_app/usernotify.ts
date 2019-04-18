import "@/assets/less/bohe_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Vue, Component } from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import LsLoading from "./components/Loading.vue";
import { LsLanguage } from "./util/LsLanguage";
import HttpClient from "@/ts/net/HttpClient";
import NewsConfigModel, { ActivityModel, ActivityRequestModel, NewModel, NewRequestModel, NewsModel } from "@/ts/models/NewsModel";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import GlobalConfig from "./global.config";
import { ExtrnalFactory } from "@/ts/factory/ExtrnalFactory";
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
	components: {
		"ls-loading": LsLoading
	}
})
class Notify extends Vue {
	public appParam: AppParamModel = AppParamModel.getInstace(1);
	public isLoading: boolean = true; //loading显示

	public newsList: Array<NewModel> = [];
	public http = new HttpClient();

	public created() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.onGetNewsList();
		this.isLoading=false
	}

	public setBaseUrl(url: string): void {
		this.http.setBaseUrl(url);
	}

	/**
	 * 最新公告
	 */
	public async onGetNewsList() {
		this.isLoading = true;
		let url = HttpClient.URL_NEWS;
		let param = new NewRequestModel();
		param.page = 1;
		param.size = 8;
		param.support_type = 2;
		param.class_type = 0;
		param.region_code = LocalStorageUtil.getRegionCodes();
		const backData = await this.http.get<NewModel>(url, param);
		this.isLoading = false;
		if (backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
			this.newsList = backData.data.list;
		}
	}
	/**
	 * 点击公告的时候，进行的跳转
	 */
	public async getDetail(item) {
		if(this.appParam.platform == 4) {
			const url = window.location.origin + "/user_details.html?id=" + item.id;
			window.location.href=url;
		}else {
			const url = window.location.origin + "/user_details.html?id=" + item.id;
			const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
			factory.jumpUrl(url);
		}
	}
}

new Notify({ i18n }).$mount("#app");
