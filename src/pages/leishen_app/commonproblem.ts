import './css/wap.less'
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import {Vue, Component} from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import {LsLanguage} from "./util/LsLanguage";
import {Collapse, CollapseItem} from 'vant';

Vue.use(Collapse);
Vue.use(CollapseItem);
import GlobalConfig from "./global.config";
import Util from "@/ts/utils/Util";
import UchatUtil, {UchatModels} from "@/ts/utils/UchatUtil";

Vue.config.productionTip = false;

//语言包
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
Vue.use(VueI18n);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Commonproblem extends Vue {
    public appParam: AppParamModel = AppParamModel.getInstace();
    private active = 1;

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
        window.location.href=url;
    }
}

new Commonproblem({i18n}).$mount("#app");
