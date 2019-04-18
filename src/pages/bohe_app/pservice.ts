import '@/assets/css/bohe_app.css';
import "leigod-lib-flexible";
import {Component, Vue} from "vue-property-decorator";
import HttpClient from '@/ts/net/HttpClient';
import AppParamModel from '@/ts/models/AppModel';
import GlobalConfig from './global.config';
import {IdataModel} from '@/ts/models/IdataModel';
import {LanguageConfig} from '@/ts/utils/Language';
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
import "babel-polyfill";
import VueI18n from "vue-i18n";
import UchatUtil, {UchatModels} from "@/ts/utils/UchatUtil";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Service extends Vue {
    public appParam: AppParamModel = AppParamModel.getInstace();
    public bgImg: string = 'images/bg_img.jpg';
    public imageHeadUrl: string = '';

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    //////////END

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
    }

    public mounted() {
        this.changeBg();
    }

    /**
     * 跳转联系客服
     */
    public contactUs() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.gotoServiceCenter();
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
     * 设置根地址
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
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

    /**
     * 聊天
     */
    public onUchat() {
        const chat = new UchatUtil();
        const mod = new UchatModels();
        mod.imnumber = GlobalConfig.UC_IM_Number;
        mod.box = true;
        chat.pop(mod);
        const url = chat.openWeb();
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.jumpUrl(url);
    }
}

new Service({
    i18n
}).$mount("#app");


