import "@/assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Component, Vue } from "vue-property-decorator";
import { Collapse, CollapseItem } from "vant";
import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "./util/LsLanguage";

import GlobalConfig from "./global.config";
import HttpClient from "@/ts/net/HttpClient";
import NewsConfigModel, { NewModel, NewsModel, NoticeDetailModel, NoticeDetailRequestModel } from "@/ts/models/NewsModel";

import { IdataModel } from "@/ts/models/IdataModel";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import Util from "@/ts/utils/Util";

Vue.config.productionTip = false;
Vue.use(Collapse);
Vue.use(CollapseItem);

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Help extends Vue {
	public appParam: AppParamModel = AppParamModel.getInstace();
	public activeName: string = ""; // 默认展开项
	public accordion: Boolean = false; // 是否开启手风琴模式

	public backData: IdataModel<any> | undefined;
	public newsList: Array<NewModel> = [];
	public newsCopyList: Array<NewModel> = [];
	public http = new HttpClient();

	public created() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.onGetNewsList();
	}

	public setBaseUrl(url: string): void {
		this.http.setBaseUrl(url);
	}

	/**
	 * 最新资讯
	 */
	public async onGetNewsList() {
		let param = new NewsConfigModel();
		param.baseUrl = GlobalConfig.getStafUrl();
		param.page = 1;
		param.size = 4;
		param.support_type = 2;
		param.region_code = this.appParam.region_code;
		const model: NewsModel = await ConfigUtil.getInstance().getHelpsList(param);
		this.newsList = model.list;
		this.changeCollapse(this.newsList[0].id);
		this.activeName = this.newsList[0].id;
	}

	/**
	 * 点击colapse的时候,请求详细数据同时加载数据
	 */
	public async changeCollapse(id) {
		for (let pp = 0; pp < this.newsList.length; pp++) {
			if (this.newsList[pp].id === id) {
				if (this.newsList[pp].content === undefined) {
					let detailData = await this.getDetail(id);
					this.newsCopyList = this.newsList.slice();
					this.newsCopyList[pp].content = detailData.content;
					this.newsList = this.newsCopyList.slice();
				}
			}
		}
	}

	/**
	 * 发送请求，获取请求详细数据
	 */
	public async getDetail(id) {
		const url = HttpClient.URL_NEWS_DETAIL + id;
		let param = new NoticeDetailRequestModel();
		param.id = id;
		param.class_type = 1;
		param.support_type = 2;
		this.backData = await this.http.get<NoticeDetailModel>(url, param);
		let detail: NoticeDetailModel = this.backData.data as NoticeDetailModel;
		return detail;
	}
}

new Help({ i18n }).$mount("#app");
