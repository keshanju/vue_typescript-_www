import "@/assets/less/bohe.less";
import "babel-polyfill";
import HeadNav from "./components/HeadNav.vue";
import FootNav from "./components/FootNav.vue";
import {LanguageConfig} from "@/ts/utils/Language";
import {Component, Vue} from "vue-property-decorator";
import GlobalConfig from "@/pages/bohe/global.config";
import WebParamModel from "@/ts/models/WebModel";
import { UserToken } from '@/ts/models/UserModel';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import VueI18n from "vue-i18n";
import {TdappModel} from "@/ts/models/TdappModel";

Vue.config.productionTip = false;
//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        "head-nav": HeadNav,
        "foot-nav": FootNav
    }
})
class About extends Vue {

    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public token: UserToken = new UserToken();
    public windowsDownloadUrl: string = '';
    public macDownloadUrl: string = '';

    public created(){
        this.token = LocalStorageUtil.getUserToken();
    }
    
    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        GlobalConfig.log('切换语言:' + lang.locale);
    }

    /**
     * 跳转注册
     */
    public goRegister() {
        JumpWebUtil.backRegister();
    }

    /**
     * 获取下载url
     * @param url
     */
    public onDownloadConfig(jsonConfig: any) {
        const downConfig = jsonConfig.bohe.down_platform[this.webParam.from];
        this.windowsDownloadUrl = downConfig.windows.download_url;
        this.macDownloadUrl = downConfig.mac.download_url;
    }

    /**
     * 下载windows客户端
     * @param ln
     */
    public windowsDownload() {
        let tdModel = new TdappModel();
        tdModel.getBrowser();
        window.location.href = this.windowsDownloadUrl;
    }
}

new About({
    i18n
}).$mount("#app");
