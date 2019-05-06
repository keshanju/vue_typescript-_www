import "@/assets/less/bohe_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Vue, Component } from "vue-property-decorator";

import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "./util/LsLanguage";

import HttpClient from "@/ts/net/HttpClient";
import NewsConfigModel, { NoticeDetailRequestModel, NoticeDetailModel } from "@/ts/models/NewsModel";
import GlobalConfig from "./global.config";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Details extends Vue {
	public appParam: AppParamModel = AppParamModel.getInstace(1);
	public detailData: NoticeDetailModel = new NoticeDetailModel();
	public http = new HttpClient();
	// 根据url的id获取对应的详情数据
	created() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.getDetails();
	}
	public setBaseUrl(url: string): void {
		this.http.setBaseUrl(url);
	}
	// 获取详情的具体数据
	public async getDetails() {
		const url = HttpClient.URL_NEWS_DETAIL + this.appParam.id;
		let param = new NoticeDetailRequestModel();
		param.id = this.appParam.id;
		param.class_type = 0;
		param.support_type = 2;
		let detailDataCopy = await this.http.get<NoticeDetailRequestModel>(url, param);
		this.detailData = detailDataCopy.data;
	}
}

new Details({ i18n }).$mount("#app");
