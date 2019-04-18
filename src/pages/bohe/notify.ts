import '@/assets/less/bohe.less';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import { Vue, Component } from 'vue-property-decorator';
import { LanguageConfig } from "@/ts/utils/Language";
import GlobalConfig from "@/pages/bohe/global.config";
import "babel-polyfill";
import HttpClient from '@/ts/net/HttpClient';
import { NewRequestModel, NewModel } from '@/ts/models/NewsModel';
import { IdataModel } from '@/ts/models/IdataModel';
import Util from '@/ts/utils/Util';
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
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        'el-pagination': Pagination
    }
})
class Notify extends Vue {

    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public notifyList: Array<NewModel> = [];
    public totle: number = 0;
    public page_size: number = 12;//翻页单页显示的数据条数
    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    //////////END

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getNotifyList();
    }

    /**
     * 设置根路径
     * @param url 
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
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
     * 跳转公告详情
     */
    public goNotifyDetail(id: number) {
        JumpWebUtil.gotoNoticeDetails(id);
    }

    /**
     * 获取公告列表
     */
    public async getNotifyList(page: number = 0) {
        let url = HttpClient.URL_NEWS;
        let param = new NewRequestModel();
        param.page = page;
        param.size = this.page_size;
        param.support_type = 1;
        param.class_type = 0;
        param.region_code = LocalStorageUtil.getRegionCodes();
        this.backData = await this.http.get<NewModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.totle = this.backData.data.total;
            this.notifyList = this.backData.data.list;
        }
    }
}

//
new Notify({
    i18n
}).$mount('#app');