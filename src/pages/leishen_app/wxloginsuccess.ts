import "babel-polyfill";
import { Component, Vue } from "vue-property-decorator";
import Util from '@/ts/utils/Util';
import HttpClient from "@/ts/net/HttpClient";
import { FindUserIsExistModel, LoginModel } from "@/ts/models/UserModel";
import GlobalConfig from "./global.config";
import WebParamModel from "@/ts/models/WebModel";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import AppParamModel from '@/ts/models/AppModel';
import JumpWeiXin from './util/jump';
const appParam: AppParamModel = AppParamModel.getInstace(
    Util.REGION_CODE_1,
    Util.ZH_CN
);

@Component
class ThreeSuccess extends Vue {

    public code: string = '';
    public JumpUrl:string=''
    public http: HttpClient = new HttpClient();

    public created() {
        this.http.setBaseUrl(GlobalConfig.getBaseUrl())
        this.code = Util.getUrlParam('code');
        this.JumpUrl = Util.getUrlParam("state_html")+'.html';
        if (this.code != '') {
            this.threeSuccess();
        }
    }

    /**
     * 发起第三方登录成功
     */
    public async threeSuccess() {
        const url = HttpClient.URL_AUTH_OPEN_LOGIN;
        const param = {
            code: this.code,
        };
        var backData = await this.http.post(url, param);
        if (backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            const loginM: LoginModel = backData.data;
            LocalStorageUtil.addUserToken(loginM.login_info);
            LocalStorageUtil.addUserInfo(loginM.user_info);
            JumpWebUtil.mobileGotoUser(window.location.origin, this.JumpUrl,"platform=4");

        }
    }
}

new ThreeSuccess({
}).$mount('#app');
