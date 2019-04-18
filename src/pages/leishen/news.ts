import '@/assets/less/leishen.less';
import "babel-polyfill";
import { Vue, Component } from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import NewsOneImg from './components/NewsOneImg.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from './util/LsLanguage';
import NewsConfigModel, { NewModel, NewsModel } from '@/ts/models/NewsModel';
import HttpClient from '@/ts/net/HttpClient';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import { IdataModel } from '@/ts/models/IdataModel';
import GlobalConfig from './global.config';
import { Carousel, CarouselItem, Pagination } from 'element-ui';
import ConfigUtil from '@/ts/utils/ConfigUtil';
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
        'el-carousel': Carousel,
        'el-carousel-item': CarouselItem,
        'news-one-img': NewsOneImg,
        "el-pagination": Pagination,
        'download-box': DownloadBox
    }
})
class News extends Vue {
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public imageHeadUrl: string = '';
    public tabIndex: number = 0;//游戏列表index
    public newsList: Array<NewModel> = [];//推荐资讯列表
    public bannerNewsList: Array<NewModel> = [];//手游资讯列表
    public gameLableList = []; //游戏label
    public gameNewsList = [];//对应游戏资讯列表
    public total: number = 0;//游戏资讯总条数
    public gameLabel: string = '绝地求生';//选择的游戏

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    //////////END

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.onGetGameLabelList();
        this.onGetNewsList();
        this.onGetSyNewsList();
        this.onGetGameLabelList(this.gameLabel, 6);       
    }

    /**
     * 翻页
     */
    public changePageIndex(page: number){
        this.onGetGameLabelList(this.gameLabel, 6, page);       
    }

    /**
     * 切换游戏资讯index
     */
    public changeTabIndex(index: number) {
        this.tabIndex = index;
        if (index > 0){
            this.gameLabel = this.gameLableList[index-1].label;
        this.onGetGameLabelList(this.gameLabel,6,1);
        }
    }

    /**
     * 查看更多
     */
    public onGetMore(index: number){
        this.changeTabIndex(index)
    }

    /**
     * 跳转资讯详情
     */
    public goNewsDetail(id: number) {
        JumpWebUtil.gotoNewsDetails(id);
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
     * 推荐资讯
     */
    public async onGetNewsList() {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = 1;
        param.size = 9;
        param.support_type = 1;
        param.label = Util.NEWS_TUIJIAN;
        param.region_code = this.webParam.region_code;
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
        param.region_code = this.webParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getNewsClassifyList(param);
        this.bannerNewsList = model.list;
    }

    /**
     * 获取游戏资讯列表
     * @param label =null获取标签 !=null 对应标签的数据
     */
    public async onGetGameLabelList(label: string = null, size = 4,page: number = 1) {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = page;
        param.size = size;
        param.support_type = 1;
        param.label = label;
        param.region_code = this.webParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getNewsLabelsList(param);
        if (label == null) {
            this.gameLableList = model.list;
        } else {
            this.gameNewsList = model.list;
            this.total = model.total;
        }
    }

}

new News({
    i18n
}).$mount('#app');