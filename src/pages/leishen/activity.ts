import '@/assets/less/leishen.less';
import "babel-polyfill";
import { Vue, Component } from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from './util/LsLanguage';
import { ActivityRequestModel, ActivityModel } from '@/ts/models/NewsModel';
import HttpClient from '@/ts/net/HttpClient';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import { IdataModel } from '@/ts/models/IdataModel';
import GlobalConfig from './global.config';
import { Pagination } from 'element-ui';
import Util from '@/ts/utils/Util';
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
class Activity extends Vue {
    public ztActivityList: Array<ActivityModel> = [];
    public zwActivityList: Array<ActivityModel> = [];
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public imageHeadUrl: string = '';
    public ztTotal: number = 0;//专题活动总条目数
    public zwTotal: number = 0;//周五活动总条目数
    public tabIndex: number = 0;

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    //////////END

    public created(){
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.getZhuantiActivityList();
        this.getZhouwuActivityList();
    }

    /**
     * 切换活动列表
     */
    public changeTabIndex(index: number){
        this.tabIndex = index;
    }

    /**
     * 跳转活动详情
     */
    public goActivityDetail(item: any) {
        if (item.url == "") {
            JumpWebUtil.gotoActivityDetails(item.id);
        } else {
            window.open(item.url);
        }
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
     * 获取专题活动列表
     */
    public async getZhuantiActivityList(page: number = 1) {
        let url = HttpClient.URL_ACTIVITY_LIST;
        let param = new ActivityRequestModel();
        param.page = page;
        param.size = 5;
        param.type = '1,7,8,9';
        param.plat_type = 1;
        param.region_code = LocalStorageUtil.getRegionCodes();
        this.backData = await this.http.get<ActivityRequestModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.ztActivityList = this.backData.data.list;
            let image = '';
            for(let i in this.ztActivityList) {
                image = this.ztActivityList[i].image;
                if(image.indexOf('http') != -1) {

                }else {
                    this.ztActivityList[i].image = this.imageHeadUrl + image;
                }
            }
            this.ztTotal = this.backData.data.total;
        }
    }

    /**
     * 获取周五活动列表
     */
    public async getZhouwuActivityList(page: number = 1) {
        let url = HttpClient.URL_ACTIVITY_LIST;
        let param = new ActivityRequestModel();
        param.page = page;
        param.size = 5;
        param.type = '10';
        param.plat_type = 1;
        param.region_code = LocalStorageUtil.getRegionCodes();
        this.backData = await this.http.get<ActivityRequestModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.zwActivityList = this.backData.data.list;
            let image = '';
            for(let i in this.zwActivityList) {
                image = this.zwActivityList[i].image;
                if(image.indexOf('http') != -1) {

                }else {
                    this.zwActivityList[i].image = this.imageHeadUrl + image;
                }
            }
            this.zwTotal = this.backData.data.total;
        }
    }

}

new Activity({
    i18n
}).$mount('#app');