import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Vue, Component } from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import HttpClient from "@/ts/net/HttpClient";
import NewsConfigModel, {
  ActivityModel,
  ActivityRequestModel,
  NewModel,
  NewsModel
} from "@/ts/models/NewsModel";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import { ExtrnalFactory } from "@/ts/factory/ExtrnalFactory";
import Util from "@/ts/utils/Util";
import { Loading } from "vant";
import GlobalConfig from './global_config';

Vue.config.productionTip = false;
Vue.use(Loading);

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(
  Util.REGION_CODE_1,
  Util.ZH_CN
);

@Component({})
class Notify extends Vue {
  public appParam: AppParamModel = AppParamModel.getInstace();
  public isLoading: boolean = false; //loading显示

  public newsList: Array<NewModel> = [];
  public http = new HttpClient();

  public created() {
    this.setBaseUrl(GlobalConfig.getWWWBaseUrl());
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

}

new Notify({  }).$mount("#app");
