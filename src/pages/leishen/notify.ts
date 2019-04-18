import '@/assets/less/leishen.less';
import "babel-polyfill";
import { Vue, Component } from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from './util/LsLanguage';
import NewsConfigModel, { NewModel, NewsModel } from '@/ts/models/NewsModel';
import HttpClient from '@/ts/net/HttpClient';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import { IdataModel } from '@/ts/models/IdataModel';
import GlobalConfig from './global.config';
import { Pagination } from 'element-ui';
import ConfigUtil from '@/ts/utils/ConfigUtil';
import Util from "@/ts/utils/Util";
import JumpWebUtil from '@/ts/utils/JumpWebUtil';

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        "el-pagination": Pagination,
        'download-box': DownloadBox
    }
})
class Notify extends Vue {
    public notifyList: Array<NewModel> = [];
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public imageHeadUrl: string = '';
    public total: number = 0;//公告总条目数
    public tabIndex: number = 0;

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    //////////END

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.getNotifyList();
    }

    /**
     * 切换活动列表
     */
    public changeTabIndex(index: number) {
        this.tabIndex = index;
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        this.webParam.language = ln;
        // GlobalConfig.log('切换语言:' + lang.locale);
    }

    /**
     * 设置根路径
     * @param url 
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
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
    public async getNotifyList(page: number = 1) {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = page;
        param.size = 6;
        param.support_type = 1;
        param.region_code = this.webParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getNotifyList(param);
        this.notifyList = model.list;
        this.total = model.total;
    }

}

new Notify({
    i18n
}).$mount('#app');