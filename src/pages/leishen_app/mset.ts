import "@/assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Component, Vue } from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "./util/LsLanguage";
import GlobalConfig from "./global.config";
import HttpClient from "@/ts/net/HttpClient";
import Util from "@/ts/utils/Util";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Mset extends Vue {

    public http = new HttpClient();

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }
}

new Mset({ i18n }).$mount("#app");
