import "@/assets/less/bohe.less";
import HeadNav from "./components/HeadNav.vue";
import FootNav from "./components/FootNav.vue";
import { LanguageConfig } from "@/ts/utils/Language";
import { Component, Vue } from "vue-property-decorator";
import WebParamModel from "@/ts/models/WebModel";
import GlobalConfig from './global.config';
import VueI18n from "vue-i18n";

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
class Protocol extends Vue {
    public webParam = WebParamModel.getInstace(); // 浏览器参数

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        GlobalConfig.log('切换语言:' + lang.locale);
    }
}

new Protocol({
    i18n
}).$mount("#app");
