import './assets/css/leishen.less';
import "babel-polyfill";
import {Component, Vue} from "vue-property-decorator";
import VueI18n from "vue-i18n";
import WebParamModel from "@/ts/models/WebModel";
import Util from "@/ts/utils/Util";
import {LsLanguage} from "@/pages/leishen/util/LsLanguage";
import {TdappModel} from "@/ts/models/TdappModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import HttpClient from "@/ts/net/HttpClient";
import GlobalConfig from "./global.config";
import LoginDialog from './components/LoginDialog.vue';
import RegisterDialog from './components/RegisterDialog.vue';
import ForgetPwd from './components/ForgetPwd.vue';

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'login-dialog': LoginDialog,
        'register-dialog': RegisterDialog,
        'forget-pwd': ForgetPwd
    }
})
class Index extends Vue {
    public webParam = WebParamModel.getInstace();
    public browserModel = new TdappModel();
    public isDeviceWx = JumpWebUtil.isDeviceWx();
    public isDeviceAndroid = JumpWebUtil.isDeviceAndroid();
    public isDeviceIos = JumpWebUtil.isDeviceIos();
    public http: HttpClient = new HttpClient();

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
    }
}

new Index({
    i18n
}).$mount('#app');
