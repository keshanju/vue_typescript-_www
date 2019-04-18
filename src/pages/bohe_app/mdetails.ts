import '@/assets/css/bohe_app.css';
import "leigod-lib-flexible";
import { Vue, Component } from 'vue-property-decorator';
import { LanguageConfig } from "@/ts/utils/Language";
import HttpClient from '@/ts/net/HttpClient';
import AppParamModel from '@/ts/models/AppModel';
import GlobalConfig from './global.config';
import { IdataModel } from '@/ts/models/IdataModel';
import { NoticeDetailRequestModel, NoticeDetailModel } from '@/ts/models/NewsModel';
import "babel-polyfill";
import VueI18n from "vue-i18n";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Detail extends Vue {
    public appParam: AppParamModel = AppParamModel.getInstace();
    public imageHeadUrl: string = '';
    public detail: NoticeDetailModel = new NoticeDetailModel();

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    //////////END

    //初始化
    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.onGetDetail();
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 获取公告详情
     */
    public async onGetDetail() {
        const url = HttpClient.URL_NEWS_DETAIL + this.appParam.id;
        let param = new NoticeDetailRequestModel()
        param.class_type = 0;
        param.id = this.appParam.id;
        param.support_type = 2;

        this.backData = await this.http.get<NoticeDetailModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.detail = this.backData.data;
            (document.querySelector("#content") as any).innerHTML = this.detail.content;
        }
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln,false);
        i18n.locale = lang.locale;
        GlobalConfig.log("切换语言:" + lang.locale);
    }
}

new Detail({
    i18n
}).$mount('#app');
