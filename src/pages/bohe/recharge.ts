import "@/assets/less/bohe.less";
import "babel-polyfill";
import HeadNav from "./components/HeadNav.vue";
import FootNav from "./components/FootNav.vue";
import { LanguageConfig } from "@/ts/utils/Language";
import { Component, Vue } from "vue-property-decorator";
import GlobalConfig from '../bohe/global.config';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import Util from '@/ts/utils/Util';
import WebParamModel from "@/ts/models/WebModel";
import { UserToken } from '@/ts/models/UserModel';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
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
class Recharge extends Vue {

    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public language: string = LocalStorageUtil.getLanguage();
    public region_code: number = LocalStorageUtil.getRegionCodes(); //地区:1 国内 0 国际
    public czTypeIndex: number = 0; //充值index
    public token: UserToken = new UserToken();
    public checkIndex: number = 3;//选中的套餐index

    public created(){
        this.onChoosePackageType(2);
        this.token = LocalStorageUtil.getUserToken();
    }

    /**
     * 立即购买
     * @param ln 
     */
    public buyNow(){
        if(this.token){
            JumpWebUtil.backUser();
        }else{
            JumpWebUtil.backLogin();
        }
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
     * 选择套餐类型
     */
    public onChoosePackageType(type: number = 0) {
        this.czTypeIndex = type;
    }
}

new Recharge({
    i18n
}).$mount("#app");
