import "@/assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import {Vue, Component} from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import {LsLanguage} from "./util/LsLanguage";

import HttpClient from "@/ts/net/HttpClient";
import GlobalConfig from "./global.config";
import Util from "@/ts/utils/Util";
import {LoginProxy} from "@/ts/proxy/LoginProxy";
import Countries from './components/Country.vue';

Vue.config.productionTip = false;

//语言包
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
Vue.use(VueI18n);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'country-item': Countries
    }
})

class Country extends LoginProxy {
    public appParam: AppParamModel = AppParamModel.getInstace();
    public http = new HttpClient();
    public country: {
        code:number,
        group: string,
        ico: string,
        iso_code: string,
        name: string
    }={
        code:86,
        group: '',
        ico: '',
        iso_code: '',
        name: ''
    }

    async mounted() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        await this.getAreaCodeInfoList(GlobalConfig.getWebBaseUrl());
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    public getcountry(data) {
        this.country = data;
    }


}

new Country({i18n}).$mount("#app");
