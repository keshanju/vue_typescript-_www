import '@/assets/less/leishen.less';
import "babel-polyfill";
import Vue from "vue";
import VueI18n from "vue-i18n";
import WebParamModel from "@/ts/models/WebModel";
import Util from "@/ts/utils/Util";
import {LsLanguage} from "@/pages/leishen/util/LsLanguage";
import Component from "vue-class-component";
import {TdappModel} from "@/ts/models/TdappModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import HttpClient from "@/ts/net/HttpClient";
import {ActivityDetailRequestModel, NewRequestModel} from "@/ts/models/NewsModel";
import GlobalConfig from "./global.config";
import {Input, Option, Radio, Select} from "element-ui";

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'el-radio': Radio,
        'el-input': Input,
        'el-select': Select,
        'el-option': Option,
    }
})
class Test extends Vue {

    public webParam = WebParamModel.getInstace();
    public browserModel = new TdappModel();
    public isDeviceWx = JumpWebUtil.isDeviceWx();
    public isDeviceAndroid = JumpWebUtil.isDeviceAndroid();
    public isDeviceIos = JumpWebUtil.isDeviceIos();

    //element
    public radio = '1';
    public options = [{
        value: '选项1',
        label: '黄金糕'
    }, {
        value: '选项2',
        label: '双皮奶'
    }];
    public value = '';

    public http: HttpClient = new HttpClient();
    public getData = null;
    public postData = null;

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
    }

    /**
     *
     */
    public async testGet() {
        let url = HttpClient.URL_GONGGAO_LIST;
        let param = new NewRequestModel();
        param.size = 1;
        param.page = 1;
        param.region_code = this.webParam.region_code;
        this.getData = await this.http.get<ActivityDetailRequestModel>(url, param);
    }

    /**
     *
     */
    public async testPost() {
        let url = HttpClient.URL_ACTIVITY_PRESENT_LIST;
        let param = {
            activity_id: 140,
            present_type: 0,
            size: 1,
            page: 1,
        }
        this.postData = await this.http.post(url, param);
    }
}

new Test({
    i18n
}).$mount('#app');