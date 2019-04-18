import '../assets/css/leishen.less';
import "babel-polyfill";
import {Vue, Component} from "vue-property-decorator";
import WebParamModel from "@/ts/models/WebModel";
import {TdappModel} from "@/ts/models/TdappModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import HttpClient from "@/ts/net/HttpClient";
import {ActivityDetailRequestModel, NewRequestModel} from "@/ts/models/NewsModel";
import GlobalConfig from "../global.config";
import {Notification, Option, Select, OptionGroup} from "element-ui";
import {TipsMsgUtil} from "@/ts/utils/TipsMsgUtil";
import CheckUtil from "@/ts/utils/CheckUtil";
import Util from "@/ts/utils/Util";
import {BindingProxy} from "@/ts/proxy/BindingProxy";

Vue.prototype.$notify = Notification;
@Component({
    components: {
        'el-select': Select,
        'el-option': Option,
        'el-option-group': OptionGroup
    }
})
class Bingdingdialog extends BindingProxy {
    public getData = null;
    public postData = null;
    public imageHeadUrl: string = '';
    public tabIndex:number = 0; // 默认登录方式

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
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.init();
    }

    /**
     * 切换登录方式
     * @param index
     */
    public changeTab(index) {
        this.tabIndex = index;
    }

    /**
     * 跳转忘记密码
     */
    public goForgetPwd() {
        JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_FORGETPWD);
    }

    /**
     * 跳转注册
     */
    public goRegister() {
        JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_REGISTER);
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

export default Bingdingdialog