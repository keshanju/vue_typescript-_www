import "@/assets/less/leishen_pc.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import {Component, Vue} from "vue-property-decorator";
import AppParamModel from '@/ts/models/AppModel';
import VueI18n from "vue-i18n";
import {LsLanguage} from "@/pages/leishen_pc/util/LsLanguage";
import {Carousel, CarouselItem} from 'element-ui';
import NewsConfigModel, {NewModel, NewsModel} from "@/ts/models/NewsModel";
import GlobalConfig from "@/pages/leishen_pc/global.config";
import HttpClient from "@/ts/net/HttpClient";
import {IdataModel} from "@/ts/models/IdataModel";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import Util from "@/ts/utils/Util";
import {IProxy} from "@/ts/interface/IProxy";
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';

Vue.config.productionTip = false;

Vue.use(Carousel)
//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'el-carousel': Carousel,
        'el-carousel-item': CarouselItem
    }
})
class News extends Vue implements IProxy {

    public bannerList: Array<NewModel> = [];
    public newsList: Array<NewModel> = [];
    public newListIndex: number = 0;
    public gameLableList = []; //游戏label
    public gameNewsList = []; // 游戏资讯列表
    public tabIndex: number = 0;//游戏列表index

    public imageHeadUrl: string = '';
    public webUrl: string = '';
    public appParam: AppParamModel = AppParamModel.getInstace();

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    //////////END

    public execute(): void {
    }

    public init(): void {
    }

    public created() {
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.webUrl = GlobalConfig.getWebBaseUrl();
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        //
        this.onGetNewsList();
        this.onGetGameLabelList();
        this.onGetSyNewsList();
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 最新资讯
     */
    public async onGetNewsList() {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = 1;
        param.size = 4;
        param.support_type = 3;
        param.label = Util.NEWS_TUIJIAN
        param.region_code = this.appParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getNewsClassifyList(param);
        this.newsList = model.list;
    }

    /**
     * 手游资讯
     */
    public async onGetSyNewsList() {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = 1;
        param.size = 4;
        param.support_type = 1;
        param.label = Util.NEWS_MOBIL;
        param.region_code = this.appParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getNewsClassifyList(param);
        this.bannerList = model.list;
    }

    /**
     * 获取游戏资讯列表
     * @param label =null获取标签 !=null 对应标签的数据
     */
    public async onGetGameLabelList(label: string = null, size = 9) {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = 1;
        param.size = size;
        param.support_type = 3;
        param.label = label;
        param.region_code = this.appParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getNewsLabelsList(param);
        if (label == null) {
            this.gameLableList = model.list;
            this.changeTabIndex(this.tabIndex);
        } else {
            this.gameNewsList = model.list;
        }
    }

    /**
     * 点击切换游戏列表
     * @param {number} index
     */
    public changeTabIndex(index: number) {
        this.tabIndex = index;
        const label = this.gameLableList[this.tabIndex].label;
        this.onGetGameLabelList(label, 5);
    }

    /**
     * banner跳转
     */
    public bannerGoDetail(id: number) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = GlobalConfig.getWebBaseUrl() + '/' + JumpWebUtil.HTML_NAME_DETAILS_NEWS;
        url = url + id + '.html';
        factory.jumpUrl(url);
    }

    /**
     * 跳转banner资讯详情
     */
    public goActivityDetail(item: any) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = GlobalConfig.getWebBaseUrl() + '/' + JumpWebUtil.HTML_NAME_DETAILS_NEWS;
        url = url + item.id + '.html';
        if (item.url != '') {
            url = item.url;
        }
        factory.jumpUrl(url);
    }

    /**
     * 跳转资讯详情
     */
    public goNewsDetail(id: number) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = GlobalConfig.getWebBaseUrl() + '/' + JumpWebUtil.HTML_NAME_DETAILS_NEWS;
        url = url + id + '.html';
        factory.jumpUrl(url);
    }
}

new News({
    i18n
}).$mount("#app");