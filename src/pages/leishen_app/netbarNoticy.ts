import "@/assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Vue, Component } from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import LsLoading from "./components/Loading.vue";
import { LsLanguage } from "./util/LsLanguage";
import HttpClient from "@/ts/net/HttpClient";
import NewsConfigModel, {
  ActivityModel,
  ActivityRequestModel,
  NewModel,
  NewsModel
} from "@/ts/models/NewsModel";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import GlobalConfig from "./global.config";
import { ExtrnalFactory } from "@/ts/factory/ExtrnalFactory";
import Util from "@/ts/utils/Util";
import { Loading } from "vant";

Vue.config.productionTip = false;
Vue.use(Loading);

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(
  Util.REGION_CODE_1,
  Util.ZH_CN
);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
  components: {
    "ls-loading": LsLoading
  }
})
class Notify extends Vue {
  public appParam: AppParamModel = AppParamModel.getInstace();
  public isLoading: boolean = false; //loading显示

  public newsList: Array<NewModel> = [];
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
    this.isLoading = true;
    let param = new NewsConfigModel();
    param.baseUrl = GlobalConfig.getStafUrl();
    param.page = 1;
    param.size = 8;
    param.support_type = 3;
    param.region_code = this.appParam.region_code;
    const model: NewsModel = await ConfigUtil.getInstance().getNotifyList(
      param
    );
    this.newsList = model.list;
    this.isLoading = false;
  }
  /**
   * 点击公告的时候，进行的跳转
   */
  public async getDetail(item) {
    if (this.appParam.platform == 4) {
      const url = window.location.origin + "/details.html?id=" + item.id;
      window.location.href = url;
    } else {
      const url = window.location.origin + "/details.html?id=" + item.id;
      const factory = ExtrnalFactory.getInstance().getFactory(
        this.appParam.platform
      );
      factory.jumpUrl(url);
    }
  }
}

new Notify({ i18n }).$mount("#app");
