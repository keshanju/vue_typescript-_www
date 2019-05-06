import '@/assets/less/bohe.less';
import { Vue, Component } from 'vue-property-decorator';
import "babel-polyfill";
import { LanguageConfig } from "@/ts/utils/Language";
import WebParamModel from "@/ts/models/WebModel";
import VueI18n from "vue-i18n";
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
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
const webParam = WebParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        'download-box': DownloadBox
    }
})
class Activdetails extends Vue {

    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public windowsDownloadUrl: string = '';
    public macDownloadUrl: string = '';
    public details: ActivityModel = new ActivityModel();
    ///////公共参数
    // http
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    public imgBaseUrl:string
    public execute(): void {
    }

    public init(): void {
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }
    
    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imgBaseUrl=GlobalConfig.getImgBaseUrl()
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
            this.backData.data.detail.image=this.imgBaseUrl+this.backData.data.detail.image
            this.details = this.backData.data.detail as ActivityModel;
        } else {
        }
    }
    mounted(){
        this.$nextTick(()=>{
        //@ts-ignore
        this.$refs.headerNav.pageName='activity.html'
        })
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
    /**
     * 获取下载url
     * @param url
     */
    public onDownloadConfig(jsonConfig: any) {
        const downConfig = jsonConfig.bohe.down_platform[this.webParam.from];
        this.windowsDownloadUrl = downConfig.windows.download_url;
        this.macDownloadUrl = downConfig.mac.download_url;
    }
}

//
new Activdetails({
    i18n
}).$mount('#app');