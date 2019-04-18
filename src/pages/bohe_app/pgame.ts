import '@/assets/css/bohe_app.css';
import "leigod-lib-flexible";
import {Component, Vue} from 'vue-property-decorator';
import {LanguageConfig} from "@/ts/utils/Language";
import HttpClient from '@/ts/net/HttpClient';
import {NewModel, NewRequestModel, NewsModel} from '@/ts/models/NewsModel';
import {IdataModel} from '@/ts/models/IdataModel';
import GlobalConfig from './global.config';
import AppParamModel from '@/ts/models/AppModel';
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
import "babel-polyfill";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import Util from '@/ts/utils/Util';
import VueI18n from "vue-i18n";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Game extends Vue {
    public chinaNewList: Array<NewModel> = [];
    public mobilNewList: Array<NewModel> = [];
    public newListSub3: Array<NewModel> = [];
    public appParam: AppParamModel = AppParamModel.getInstace();
    public bgImg: string = 'images/bg_img.jpg';
    public imageHeadUrl: string = '';
    public webUrl: string = '';

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    //////////END

    public created() {
        let self = this;
        GlobalConfig.log("资讯log");
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.webUrl = GlobalConfig.getWebBaseUrl();
        this.onGetNewList(Util.NEWS_LAST ,3,function(data){
            self.newListSub3 = data.data.list;
        });
        this.onGetNewList(Util.NEWS_CHINA , 5, function (data) {
            self.chinaNewList = data.data.list;
        });
        this.onGetNewList(Util.NEWS_HOT , 5, function (data) {
            self.mobilNewList = data.data.list;
        });
    }

    public mounted() {
        this.changeBg();
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln, false);
        i18n.locale = lang.locale;
        GlobalConfig.log('切换语言:' + lang.locale);
    }

    /**
     * 动态更换背景
     */
    public changeBg() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        const img = factory.getbackground(2);
        if (img != '') {
            this.bgImg = img;
        }
    }

    /**
     * 跳转资讯
     */
    public goNews() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = JumpWebUtil.getWebHeadUrl(this.webUrl,this.appParam);
        url = url + JumpWebUtil.HTML_NAME_NEWS; 
        factory.jumpUrl(url);
    }

    /**
     * 跳转资讯详情
     */
    public goNewsDetail(id: number) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = JumpWebUtil.getWebHeadUrl(this.webUrl,this.appParam);
        url = url + JumpWebUtil.HTML_NAME_DETAILS_NEWS + id + '.html';
        factory.jumpUrl(url);
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 获取资讯列表
     */
    public async onGetNewList(type: string , size: number , fn) {
        const url = HttpClient.URL_NEWS;
        let param = new NewRequestModel();
        param.page = 0;
        param.size = size;
        param.support_type = 3;
        param.class_type = 2;
        param.label = type;
        param.region_code = this.appParam.region_code;
        this.backData = await this.http.get<Array<NewsModel>>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            fn(this.backData);
        }
    }
}

new Game({
    i18n
}).$mount('#app');
