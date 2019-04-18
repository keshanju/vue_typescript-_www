import "@/assets/css/bohe_app.css";
import "leigod-lib-flexible";
import "babel-polyfill";
import { Component, Vue } from "vue-property-decorator";
import VueI18n from "vue-i18n";
import { LanguageConfig } from '@/ts/utils/Language';
import Util from '@/ts/utils/Util';
import { ExtrnalFactory } from '@/ts/factory/ExtrnalFactory';
import AppParamModel from '@/ts/models/AppModel';
import { TdappModel } from '@/ts/models/TdappModel';

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class ThreeSuccess extends Vue {
    public code: string = '';
    public appParam: AppParamModel = AppParamModel.getInstace();

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
        let tdModel = new TdappModel();
        tdModel.getBrowser();
        // @ts-ignore
        TDAPP.onEvent(Util.WINDOWS_THREE_LOGIN, Util.LOGIN, tdModel);
        //登录成功
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let userinfo = {
            'code': this.code
        }
        let param = JSON.stringify(userinfo);
        factory.authorizeLoginSuccess(param);
    }
}

new ThreeSuccess({
    i18n,
}).$mount('#app');