import '@/assets/less/leishen_pc.less';
import "leigod-lib-flexible";
import {Component, Vue} from "vue-property-decorator";
import HttpClient from '@/ts/net/HttpClient';
import AppParamModel from '@/ts/models/AppModel';
import {IdataModel} from '@/ts/models/IdataModel';
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
import "babel-polyfill";
import VueI18n from "vue-i18n";
import {LsLanguage} from "@/pages/leishen_pc/util/LsLanguage";
import Util from "@/ts/utils/Util";
import UchatUtil, {UchatModels} from "@/ts/utils/UchatUtil";
import GlobalConfig from "@/pages/leishen_pc/global.config";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Service extends Vue {
    public appParam: AppParamModel = AppParamModel.getInstace();

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    //////////END

    /**
     * 设置根地址
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
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


