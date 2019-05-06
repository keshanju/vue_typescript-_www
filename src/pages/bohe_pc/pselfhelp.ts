import '@/assets/less/bohe_pc.less';
import "leigod-lib-flexible";
import {Component, Vue} from 'vue-property-decorator';
import {LanguageConfig} from "@/ts/utils/Language";
import HttpClient from '@/ts/net/HttpClient';
import {NewModel, NewRequestModel} from '@/ts/models/NewsModel';
import {IdataModel} from '@/ts/models/IdataModel';
import GlobalConfig from './global.config';
import AppParamModel from '@/ts/models/AppModel';
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
import "babel-polyfill";
import VueI18n from "vue-i18n";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class SelfHelp extends Vue {

    public appParam: AppParamModel = AppParamModel.getInstace();
    public khdNewList: Array<NewModel> = [];
    public gwNewList: Array<NewModel> = [];
    public ydNewList: Array<NewModel> = [];
    public bgImg: string = 'images/bg_img.jpg';
    public helpType: number = 0;//0 客户端 1 官网 2 移动端

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    //////////END

    public created() {
        GlobalConfig.log("资讯log");
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.onGetNewList();
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
     * 切换帮助类型
     */
    public changeHelpType(type: number) {
        this.helpType = type;
    }

    /**
     * 动态更换背景
     */
    public changeBg() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        const img = factory.getbackground(1);
        if (img != '') {
            this.bgImg = img;
        }
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 获取资讯列表
     */
    public async onGetNewList() {
        const url = HttpClient.URL_NEWS;
        let param = new NewRequestModel();
        param.page = 0;
        param.size = 5;
        param.support_type = 0;
        param.class_type = 1;
        param.region_code = this.appParam.region_code;
        this.backData = await this.http.get<Array<NewModel>>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.khdNewList = this.backData.data.list.filter(function (item: any) {
                if (item.support_type == 3) {
                    return item;
                }
            });
            this.gwNewList = this.backData.data.list.filter(function (item: any) {
                if (item.support_type == 1) {
                    return item;
                }
            });
            this.ydNewList = this.backData.data.list.filter(function (item: any) {
                if (item.support_type == 2) {
                    return item;
                }
            });
        }
    }
}

new SelfHelp({
    i18n
}).$mount('#app');
