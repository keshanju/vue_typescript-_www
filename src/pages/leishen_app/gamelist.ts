import "@/assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import {Vue, Component} from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import {LsLanguage} from "./util/LsLanguage";
import HttpClient from "@/ts/net/HttpClient";
import {NewModel, NewsRequestModel} from "@/ts/models/NewsModel";
import GlobalConfig from "./global.config";
import {ExtrnalFactory} from "@/ts/factory/ExtrnalFactory";
import Util from "@/ts/utils/Util";
import {Loading, List, Cell, Tab, Tabs, PullRefresh} from 'vant';
import Load from './components/Loading.vue';

Vue.config.productionTip = false;
Vue.use(Loading);
Vue.use(List);
Vue.use(Cell);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'load': Load
    }
})
class Notify extends Vue {
    public appParam: AppParamModel = AppParamModel.getInstace();
    public isLoading: boolean = false;//loading显示
    private loading = false;
    private listIndex = 0;
    private showmask = true; //数据没加载完成 出现的蒙版

    public newsList: Array<NewModel> = [];
    public http = new HttpClient();

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    private gameList = [
        {
            loading: false,
            finish: false,
            count: 0,
            list: [],
            showNoPic: false,//显示隐藏无公告的图
            label: '绝地求生'
        },
        {
            loading: false,
            finish: false,
            count: 0,
            list: [],
            showNoPic: false,//显示隐藏无公告的图
            label: '英雄联盟'
        },
        {
            loading: false,
            finish: false,
            count: 0,
            list: [],
            showNoPic: false,//显示隐藏无公告的图
            label: '彩虹六号'
        },
        {
            loading: false,
            finish: false,
            count: 0,
            list: [],
            showNoPic: false,//显示隐藏无公告的图
            label: 'DOTA2'
        },
        {
            loading: false,
            finish: false,
            count: 0,
            list: [],
            showNoPic: false,//显示隐藏无公告的图
            label: '战地5'
        },
        {
            loading: false,
            finish: false,
            count: 0,
            list: [],
            showNoPic: false,//显示隐藏无公告的图
            label: '魔兽世界'
        },
        {
            loading: false,
            finish: false,
            count: 0,
            list: [],
            showNoPic: false,//显示隐藏无公告的图
            label: 'CSGO'
        },
        {
            loading: false,
            finish: false,
            count: 0,
            list: [],
            showNoPic: false,//显示隐藏无公告的图
            label: '堡垒之夜'
        },
        {
            loading: false,
            finish: false,
            count: 0,
            list: [],
            showNoPic: false,//显示隐藏无公告的图
            label: '无限法则'
        },
    ]

    /**
     * 最新资讯
     */
    public async onGetNewsList(label: string, page: number = 1) {
        this.isLoading = true;
        let param = new NewsRequestModel();
        param.page = page;
        param.size = 40;
        param.class_type = 2;
        param.support_type = 0;
        param.region_code = this.appParam.region_code;
        param.label = label;
        this.getNotifyList(param);
    }

    /**
     * 获取新闻公告
     * @param param
     */
    public async getNotifyList(param: NewsRequestModel) {
        try {
            this.isLoading = true;
            const url = HttpClient.URL_NEWS;
            let d = await this.http.get(url, param);
            this.isLoading = false;
            if (d.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.ongetNewsSuccess(d);
            } else {
                this.ongetNewsFaild(d);
            }
        } catch (e) {
        }
    }

    /**
     * 获取新闻成功
     * @param d
     */
    public ongetNewsSuccess(d) {
        if (d.data.list.length === 0) {
            this.gameList[this.listIndex].finish = true;
            this.showmask = false;
        }
        d.data.list.forEach((item, index) => {
            this.gameList[this.listIndex].list.push(item);
        });
        if (this.gameList[this.listIndex].list.length == 0) {
            this.gameList[this.listIndex].showNoPic = true;
        }
        this.loading = false;
    }

    /**
     * 获取新闻失败
     * @param d
     */
    public ongetNewsFaild(d) {

    }

    /**
     * 加载公告数据
     * @param label
     */
    public loadList(index) {
        this.showmask = true;
        // 异步更新数据
        const list = this.gameList[index];
        setTimeout(() => {
            list.count++;
            this.onGetNewsList(list.label, list.count);
        }, 500);
    }


    /**
     * 点击公告的时候，进行的跳转
     */
    public async getDetail(item) {
        if (this.appParam.platform == 4) {
            const url = window.location.origin + "/details.html?id=" + item.id;
            window.location.href = url;
        } else {
            const url = window.location.origin + "/details.html?id=" + item.id;
            const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
            factory.jumpUrl(url);
        }
    }
}

new Notify({i18n}).$mount("#app");
