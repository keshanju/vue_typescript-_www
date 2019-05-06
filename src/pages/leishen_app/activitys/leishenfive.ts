import "../../../assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import { Component, Vue } from "vue-property-decorator";
import $ from "jquery";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "../util/LsLanguage";
import GlobalConfig from "../global.config";
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import { IdataModel } from "@/ts/models/IdataModel";
import JumpWeiXin from "../util/jump";
import Clipboard from "clipboard";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component
class Leishen5_0 extends Vue {
    public appParam = AppParamModel.getInstace(); // 浏览器参数

    /**
     * 充值
     */
    public gotoRecharge() {
        let param = "platform=" + this.appParam.platform;
        JumpWeiXin.gotoRecharge(param);
    }

}

new Leishen5_0({ i18n }).$mount("#app");