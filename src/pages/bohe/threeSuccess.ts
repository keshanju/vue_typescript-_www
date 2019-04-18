import "@/assets/less/bohe.less";
import "babel-polyfill";
import { Component, Vue } from "vue-property-decorator";
import Util from '@/ts/utils/Util';
import HttpClient from "@/ts/net/HttpClient";
import {FindUserIsExistModel, LoginModel} from "@/ts/models/UserModel";
import GlobalConfig from "@/pages/bohe/global.config";
import WebParamModel from "@/ts/models/WebModel";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";

const webParam = WebParamModel.getInstace();

@Component
class ThreeSuccess extends Vue {

    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public code: string = '';
    public http: HttpClient = new HttpClient();

    public created(){
        this.http.setBaseUrl(GlobalConfig.getBaseUrl())
        this.code = Util.getUrlParam('code');
        if (this.code != ''){
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
            JumpWebUtil.backUser();
        }
    }
}

new ThreeSuccess({
}).$mount('#app');