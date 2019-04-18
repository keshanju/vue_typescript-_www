import "@/assets/less/bohe.less";
import HeadNav from "./components/HeadNav.vue";
import FootNav from "./components/FootNav.vue";
import DetailsNews from "./components/DetailsNews.vue";
import { LanguageConfig } from "@/ts/utils/Language";
import { Component, Vue } from "vue-property-decorator";
import { NewModel, NewRequestModel } from '@/ts/models/NewsModel';
import HttpClient from '@/ts/net/HttpClient';
import { IdataModel } from '@/ts/models/IdataModel';
import Util from '@/ts/utils/Util';
import GlobalConfig from './global.config';
import WebParamModel from "@/ts/models/WebModel";
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import { Pagination } from 'element-ui';
import VueI18n from "vue-i18n";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

Vue.config.productionTip = false;
//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        "head-nav": HeadNav,
        "foot-nav": FootNav,
        "details-news": DetailsNews,
        'el-pagination': Pagination
    }
})
class News extends Vue {

    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public newsList: Array<NewModel> = [];
    public newsListTop: Array<NewModel> = [];
    public imageHeadUrl: string = '';
    public total: number = 0;
    public page_size: number = 5;//翻页单页显示的数据条数
    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    //////////END

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getNewsList();
        this.getChinaNewsList();
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
    }

    /**
     * 设置根路径
     * @param url 
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
    }

    /**
     * 跳转资讯详情
     */
    public goNewsDetail(id: number) {
        JumpWebUtil.gotoNewsDetails(id);
    }

    /**
     * 获取资讯国服列表
     */
    public async getChinaNewsList(page: number = 0) {
        let url = HttpClient.URL_NEWS;
        let param = new NewRequestModel();
        param.page = page;
        param.size = this.page_size;
        param.support_type = 1;
        param.class_type = 2;
        param.label = Util.NEWS_CHINA;
        param.region_code = LocalStorageUtil.getRegionCodes();
        this.backData = await this.http.get<NewModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.total = this.backData.data.total;
            this.newsList = this.backData.data.list;
        }
    }

    /**
     * 获取最新资讯列表
     */
    public async getNewsList(page: number = 0) {
        let url = HttpClient.URL_NEWS;
        let param = new NewRequestModel();
        param.page = page;
        param.size = 4;
        param.support_type = 1;
        param.class_type = 2;
        param.label = Util.NEWS_LAST;
        param.region_code = LocalStorageUtil.getRegionCodes();
        this.backData = await this.http.get<NewModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.newsListTop = this.backData.data.list;
        }
    }
}

new News({
    i18n
}).$mount("#app");
