import AppParamModel from "@/ts/models/AppModel";
import Util from "@/ts/utils/Util";
import '@/assets/less/leishen_pc.less';
import "leigod-lib-flexible";
import "babel-polyfill";
import {Component, Vue} from "vue-property-decorator";
import VueI18n from "vue-i18n";
import {LsLanguage} from "@/pages/leishen_pc/util/LsLanguage";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import {ExtrnalFactory} from "@/ts/factory/ExtrnalFactory";

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class Loginbanner extends Vue{
    public appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);
    public login_banner: string = '';//banner图链接
    public login_banner_link: string = '';//banner图点击跳转地址

    /**
     * 初始化
     */
    public created(){
        this.getDownloadUrl();
    }

    /**
     * 获取下载列表
     * @param url
     */
    public async getDownloadUrl() {
        const jsonConfig = await ConfigUtil.getInstance().download(false);
        this.login_banner = jsonConfig.leigod.login_banner.img_url;
        this.login_banner_link = jsonConfig.leigod.login_banner.link_url;
    }

    /**
     * banner点击跳转
     */
    public goLinkUrl(){
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.jumpUrl(this.login_banner_link);
    }
}

new Loginbanner({
    i18n
}).$mount("#app");