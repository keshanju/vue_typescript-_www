import '@/assets/less/leishen.less';
import "babel-polyfill";
import {Component, Vue} from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import ActivityBox from './components/ActivityBox.vue';
import VueI18n from "vue-i18n";
import WebParamModel from '@/ts/models/WebModel';
import {Carousel, CarouselItem, MessageBox, Tooltip} from 'element-ui';
import {LsLanguage} from "@/pages/leishen/util/LsLanguage";
import NewsConfigModel, {
    ActivityPictureModel,
    ActivityRequestPictureModel,
    NewModel,
    NewsModel
} from '@/ts/models/NewsModel';
import HttpClient from '@/ts/net/HttpClient';
import {IdataModel} from '@/ts/models/IdataModel';
import {TdappModel} from '@/ts/models/TdappModel';
import Util from '@/ts/utils/Util';
import GlobalConfig from './global.config';
import ProjectConfig from '../../../project.config';
import ConfigUtil from "@/ts/utils/ConfigUtil";
import JumpWebUtil from '@/ts/utils/JumpWebUtil';

Vue.prototype.$alert = MessageBox;

//判断是否跳转移动站点
const mUrl = GlobalConfig.getMobWebBaseUrl() + '/' + JumpWebUtil.HTML_NAME_INDEX;
JumpWebUtil.autoJump(mUrl,null);

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
        'el-carousel': Carousel,
        'el-carousel-item': CarouselItem,
        'el-tooltip': Tooltip,
        'activity-box': ActivityBox
    }
})
class Index extends Vue {
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public hotNewsList: Array<NewModel> = [];
    public hotNewsTotal: number = 0;
    public hotNewsIndex: number = 1;
    public lastNewsList: Array<NewModel> = [];
    public notifyList: Array<NewModel> = [];
    public activityList: ActivityPictureModel = new ActivityPictureModel();
    public tuiguangNewsList: Array<NewModel> = [];
    public imageHeadUrl: string = '';
    public windowsDownloadUrl: string = '';//windows客户端下载配置
    public macDownloadUrl: string = '';//mac客户端下载配置
    public checkBtn: number = 0;
    public browserTipShow: boolean = false;
    public activeLink: string = ''; //活动URL链接
    public bannerImg: string = ''; //活动banner图片
    public activityId:string = '';

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    //////////END

    public created() {
        this.debugInfo(); //debug信息
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        //
        this.getDownloadUrl();
        this.getNotifyList();
        this.getHotNewsList(this.hotNewsIndex);
        this.getLastNewsList();
        this.checkBrowserVersion();
        this.getTuiguangNewsList();
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
     * 获取下载列表
     * @param url
     */
    public async getDownloadUrl() {
        const jsonConfig = await ConfigUtil.getInstance().download();
        const downConfig = jsonConfig.leigod.down_platform[this.webParam.from];
        this.windowsDownloadUrl = downConfig.windows.download_url;
        this.macDownloadUrl = downConfig.mac.download_url;
        this.activityId = jsonConfig.leigod.activity.activity_id;
        this.getActivityInfo();
    }

    /**
     * 检测用户浏览器版本
     */
    public checkBrowserVersion() {
        let browserInfo = new TdappModel();
        this.browserTipShow = browserInfo.isLowVersion();
    }

    /**
     * 关闭浏览器版本过低提示
     */
    public closeBrowserTip() {
        this.browserTipShow = false;
    }

    /**
     * 设置根路径
     * @param url
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 下载windows客户端
     * @param ln
     */
    public windowsDownload() {
        window.location.href = this.windowsDownloadUrl;
    }

    /**
     * 跳转资讯详情
     */
    public goNewsDetail(id: number) {
        JumpWebUtil.gotoNewsDetails(id);
    }

    /**
     * 跳转资讯
     */
    public goNews() {
        JumpWebUtil.backNews();
    }

    /**
     * 跳转公告
     */
    public goNotify() {
        JumpWebUtil.backNotice();
    }

    /**
     * 跳转公告详情
     */
    public goNotifyDetail(id: number) {
        JumpWebUtil.gotoNoticeDetails(id);
    }

    /**
     * 跳转活动
     */
    public goActivity() {
        JumpWebUtil.backActivity();
    }

    /**
     * 跳转活动详情
     */
    public goActivityDetail(item: any) {
        if (item.url_type == 1) {
            window.open(item.url);
        } else {
            JumpWebUtil.gotoActivityDetails(item.id);
        }
    }

    /**
     * 跳转注册
     */
    public goRegister() {
        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_REGISTER);
    }

    /**
     * 获取公告列表
     */
    public async getNotifyList() {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = 1;
        param.size = 4;
        param.support_type = 1;
        param.region_code = this.webParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getNotifyList(param);
        this.notifyList = model.list;
    }

    /**
     * 获取热点资讯列表
     */
    public async getHotNewsList(page = 1) {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = page;
        param.size = 3;
        param.support_type = 1;
        param.label = Util.NEWS_HOT;
        param.region_code = this.webParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getNewsClassifyList(param);
        this.hotNewsList = model.list;
        this.hotNewsTotal = model.total;
    }

    /**
     * 翻页
     */
    public changeHotNews(page: number) {
        if (page > this.hotNewsTotal / 3 + 1 || page <= 0) return;
        this.hotNewsIndex = page;
        this.getHotNewsList(page);
    }

    /**
     * 获取推广资讯列表
     */
    public async getTuiguangNewsList(page = 1) {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = page;
        param.size = 3;
        param.support_type = 1;
        param.label = Util.NEWS_TUIGUANG;
        param.region_code = this.webParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getNewsClassifyList(param);
        this.tuiguangNewsList = model.list;
    }

    /**
     * 获取推荐资讯列表
     */
    public async getLastNewsList() {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = 1;
        param.size = 4;
        param.support_type = 1;
        param.label = Util.NEWS_TUIJIAN;
        param.region_code = this.webParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getNewsClassifyList(param);
        this.lastNewsList = model.list;
    }

    /**
     * 获取活动banner
     */
    public async getActivityInfo() {
        let url = HttpClient.URL_ACTIVITY_PICTURE_LIST;
        let param = new ActivityRequestPictureModel();
        param.activity_id = this.activityId;
        param.region_code = this.webParam.region_code;
        param.plat_type = 1;
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            const activityList = this.backData.data as ActivityPictureModel[];
            if (activityList == null || activityList.length <= 0) return;
            //
            this.activityList = activityList[0];
            this.bannerImg = this.activityList.imgs.filter((a, b) => {
                return a.key == 3; // 0 官网登录页  1是移动端  2pc 客户端  3 官网首页  4官网用户中心
            })[0].img_url;

            //给banner  赋值
            if (this.bannerImg != '') {
                this.bannerImg = this.imageHeadUrl + this.bannerImg;
            }
        }
    }

    /**
     * 打印环境信息
     */
    public debugInfo() {
        let txt = '';
        txt += 'bohe' + '##';
        txt += '当前环境:' + ProjectConfig.server_type + '##';
        txt += '服务器地址:' + GlobalConfig.getBaseUrl() + '##';
        txt += '图片地址:' + GlobalConfig.getImgBaseUrl() + '##';
        txt += '网站地址' + GlobalConfig.getWebBaseUrl();
        ProjectConfig.log(txt);
    }
}

new Index({
    i18n
}).$mount('#app');