import "@/assets/css/bohe_app.css";
import "leigod-lib-flexible";
import "babel-polyfill";
import { Component, Vue } from "vue-property-decorator";
import VueI18n from "vue-i18n";
import { LsLanguage } from "@/pages/leishen_pc/util/LsLanguage";
import { Loading } from "element-ui";
import Util from '@/ts/utils/Util';
import { ExtrnalFactory } from '@/ts/factory/ExtrnalFactory';
import AppParamModel from '@/ts/models/AppModel';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
// import { TdappModel } from '@/ts/models/TdappModel';

Vue.use(Loading);

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class ThreeSuccess extends Vue {
    public code: string = '';
    public appParam: AppParamModel = AppParamModel.getInstace();
    public isLoading: boolean = true;

    public created(){
        this.code = Util.getUrlParam('code');
        if (this.code != ''){
            this.threeSuccess();
        }
    }
    
    /**
     * 发起第三方登录成功
     */
    public threeSuccess() {
        // let tdModel = new TdappModel();
        // tdModel.getBrowser();
        // // @ts-ignore
        // TDAPP.onEvent(Util.WINDOWS_THREE_LOGIN, Util.LOGIN, tdModel);
        //登录成功
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let userinfo = {
            'code': this.code
        }
        let param = JSON.stringify(userinfo);
        let bindUrlType = localStorage.getItem(LocalStorageUtil.STORAGES_THIRDBIND_URL_TYPE);
        if (bindUrlType == '0'){
            localStorage.removeItem(LocalStorageUtil.STORAGES_THIRDBIND_URL_TYPE);
            factory.bindAccountSuccess(param);
        }else {
            localStorage.removeItem(LocalStorageUtil.STORAGES_THIRDBIND_URL_TYPE);
            factory.authorizeLoginSuccess(param);
        }
    }
}

new ThreeSuccess({
    i18n,
}).$mount('#app');