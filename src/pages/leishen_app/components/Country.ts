import "../../../assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Vue, Component } from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "../util/LsLanguage";

import HttpClient from "@/ts/net/HttpClient";
import GlobalConfig from "../global.config";
import Util from "@/ts/utils/Util";
import {LoginProxy} from "@/ts/proxy/LoginProxy";
import $ from "jquery";

Vue.config.productionTip = false;

//语言包
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
Vue.use(VueI18n);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
export default class  extends LoginProxy {
    public appParam: AppParamModel = AppParamModel.getInstace();
    public http = new HttpClient();
    public MobileCountryList=[];
    // 根据url的id获取对应的详情数据
    async mounted() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        await this.getAreaCodeInfoList(GlobalConfig.getWebBaseUrl());
        this.mobileContryCode()
    }
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }
    // 处理成移动端可用的数据
    public mobileContryCode(){
        for (let item of this.country_code_list) {
            if(item.label==""){
                item.label='Hot';
            }
           this.MobileCountryList.push(item)
        }
    }

  public pushcountry(countryInfo){
      this.$emit("getcountry",countryInfo)
  }

}

