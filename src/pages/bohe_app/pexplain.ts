import '@/assets/css/bohe_app.css';
import "leigod-lib-flexible";
import {Component, Vue} from 'vue-property-decorator';
import {LanguageConfig} from '@/ts/utils/Language';
import GlobalConfig from './global.config';
import HttpClient from '@/ts/net/HttpClient';
import AppParamModel from '@/ts/models/AppModel';
import {IdataModel} from '@/ts/models/IdataModel';
import Explain from "./components/Explain.vue"
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

@Component({
    components: {
        'explain': Explain
    }
})
class ExplainPage extends Vue {
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
        const img = factory.getbackground(0);
        if (img != '') {
            this.bgImg = img;
        }
    }
}

new ExplainPage({
    i18n
}).$mount('#app');