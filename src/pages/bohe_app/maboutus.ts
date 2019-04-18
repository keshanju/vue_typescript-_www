import '@/assets/css/bohe_app.css';
import "leigod-lib-flexible";
import "babel-polyfill";
import {Component, Vue} from 'vue-property-decorator';
import {LanguageConfig} from '@/ts/utils/Language';
import GlobalConfig from './global.config';
import HttpClient from '@/ts/net/HttpClient';
import AppParamModel from '@/ts/models/AppModel';
import {IdataModel} from '@/ts/models/IdataModel';
import VueI18n from "vue-i18n";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class AboutUs extends Vue {

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
}

new AboutUs({
    i18n
}).$mount('#app');
