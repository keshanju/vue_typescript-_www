import '@/assets/less/leishen.less';
import "babel-polyfill";
import {Component, Vue} from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import {LsLanguage} from './util/LsLanguage';
import GlobalConfig from './global.config';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import {ActivityDetailRequestModel, ActivityModel} from "@/ts/models/NewsModel";
import HttpClient from "@/ts/net/HttpClient";
import {IdataModel} from "@/ts/models/IdataModel";
import {IProxy} from "@/ts/interface/IProxy";
import Util from "@/ts/utils/Util";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        'download-box': DownloadBox
    }
})
class Activity extends Vue implements IProxy {

    public webParam = WebParamModel.getInstace();
    public details: ActivityModel = new ActivityModel();
    ///////公共参数
    // http
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    public execute(): void {
    }

    public init(): void {
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getActivityDetails(this.webParam.id);
    }

    /**
     * 获取活动详情
     */
    public async getActivityDetails(id: number) {
        let url = HttpClient.URL_ACTIVITY_DETAIL + id;
        let param = new ActivityDetailRequestModel();
        param.type = 1;
        param.id = id;
        param.plat_type = 1;
        param.region_code = this.webParam.region_code;
        this.backData = await this.http.get<ActivityDetailRequestModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.details = this.backData.data.detail as ActivityModel;
        } else {
        }
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        GlobalConfig.log('切换语言:' + lang.locale);
    }

    /**
     *返回活动列表
     */
    public gotoActivity() {
        JumpWebUtil.backActivity();
    }
}

new Activity({
    i18n
}).$mount('#app');