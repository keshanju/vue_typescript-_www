import "@/assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Vue, Component } from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "@/pages/leishen_pc/util/LsLanguage";
import Util from "@/ts/utils/Util";

Vue.config.productionTip = false;

//语言
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Protocol extends Vue {

}

new Protocol({ i18n }).$mount("#app");
