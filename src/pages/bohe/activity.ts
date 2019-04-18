import '@/assets/less/bohe.less';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import { Vue, Component } from 'vue-property-decorator';
import { LanguageConfig } from "@/ts/utils/Language";
import GlobalConfig from "@/pages/bohe/global.config";
import "babel-polyfill";
import HttpClient from '@/ts/net/HttpClient';
import { ActivityRequestModel, ActivityModel, NewModel, NewRequestModel, NewsModel } from '@/ts/models/NewsModel';
import { IdataModel } from '@/ts/models/IdataModel';
import WebParamModel from "@/ts/models/WebModel";
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import { Pagination, Tooltip } from 'element-ui';
import VueI18n from "vue-i18n";
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import Util from '@/ts/utils/Util';

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
        'el-pagination': Pagination,
        'el-tooltip': Tooltip,
        'download-box': DownloadBox
    }
})
class ActivityList extends Vue {

    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public activityList: Array<ActivityModel> = [];
    public hotNewList: Array<NewModel> = [];
    public imageHeadUrl: string = '';
    public totle: number = 0;
    public page_size: number = 6;//翻页单页显示的数据条数
    public windowsDownloadUrl: string = '';
    public macDownloadUrl: string = '';
    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    //////////END

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.getActivityList();
        this.onGetNewList();
    }

    /**
     * 设置根路径
     * @param url 
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
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

    /**
     * 下载windows客户端
     * @param ln
     */
    public windowsDownload() {
        window.location.href = this.windowsDownloadUrl;
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
     * 跳转活动详情
     */
    public goActivityDetail(item) {
        if (item.url_type == 1) {
            window.open(item.url);
        } else {
            JumpWebUtil.gotoActivityDetails(item.id);
        }
    }

    /**
         * 跳转资讯页
         */
    public goNews() {
        JumpWebUtil.backNews();
    }

    /**
     * 跳转资讯详情
     */
    public gonewsdetail(id: number) {
        JumpWebUtil.gotoNewsDetails(id);
    }

    /**
     * 获取活动列表
     */
    public async getActivityList(page: number = 1) {
        let url = HttpClient.URL_ACTIVITY_LIST;
        let param = new ActivityRequestModel();
        param.page = page;
        param.size = this.page_size;
        param.type = 0;
        param.plat_type = 1;
        // 临时添加的
        param.region_code = 0;
        this.backData = await this.http.get<ActivityModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.totle = this.backData.data.total;
            this.activityList = this.backData.data.list;
            for (var i = 0; i < this.activityList.length;i++){
                let date = new Date();
                let time = date.getTime();
                let date1 = new Date(this.activityList[i].end_time);
                let time1 = date1.getTime();
                if (time1 > time){
                    this.activityList[i]['time_status'] = 1;
                } else {
                    this.activityList[i]['time_status'] = 0;
                }
            }
        }
    }

    /**
     * 获取资讯列表
     */
    public async onGetNewList() {
        const url = HttpClient.URL_NEWS;
        let param = new NewRequestModel();
        param.page = 0;
        param.size = 8;
        param.support_type = 1;
        param.class_type = 2;
        param.region_code = LocalStorageUtil.getRegionCodes();
        param.label = Util.NEWS_HOT;
        this.backData = await this.http.get<NewsModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.hotNewList = this.backData.data.list;
        }
    }
}

//
new ActivityList({
    i18n
}).$mount('#app');