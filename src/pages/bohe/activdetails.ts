
import { Vue, Component } from 'vue-property-decorator';
import "babel-polyfill";
import { LanguageConfig } from "@/ts/utils/Language";
import WebParamModel from "@/ts/models/WebModel";
import VueI18n from "vue-i18n";
import ConfigUtil from '@/ts/utils/ConfigUtil';
Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component
class Activdetails extends Vue {

    public webParam = WebParamModel.getInstace(); // 浏览器参数
 
    public async created() {
    }
}

//
new Activdetails({
    i18n
}).$mount('#app');