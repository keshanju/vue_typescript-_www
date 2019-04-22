import "@/assets/less/bohe.less";
import "babel-polyfill";
import { Component, Vue } from "vue-property-decorator";
import Util from '@/ts/utils/Util';
import HttpClient from "@/ts/net/HttpClient";
import {FindUserIsExistModel, LoginModel} from "@/ts/models/UserModel";
import GlobalConfig from "./global.config";
import WebParamModel from "@/ts/models/WebModel";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import AppParamModel from "@/ts/models/AppModel";
import { Loading } from 'element-ui';
import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';

const webParam = AppParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);
Vue.use(Loading);

@Component
class ThreeSuccess extends Vue {

    public webParam = AppParamModel.getInstace(); // 浏览器参数
    public code: string = '';
    public http: HttpClient = new HttpClient();
    public isLoading: boolean = true;
    public loadingMsg: string = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
    public bindUrlType: string = '';

    public created(){
        this.http.setBaseUrl(GlobalConfig.getBaseUrl());
        this.bindUrlType = localStorage.getItem(LocalStorageUtil.STORAGES_THIRDBIND_URL_TYPE);
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
        let param = {
            code: this.code,
        };
        if (this.webParam.account_token && this.bindUrlType == '0') {
            param['account_token'] = this.webParam.account_token;
        }
        var backData = await this.http.post(url, param);
        if (backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            const loginM: LoginModel = backData.data;
            LocalStorageUtil.addUserToken(loginM.login_info);
            LocalStorageUtil.addUserInfo(loginM.user_info);
            //
            const paramArr = LocalStorageUtil.getParam(true);
            const toHtml = paramArr[0] + '';
            const page = paramArr[1] as number;
            const tid = paramArr[2] as number;
            if(window.name=='leigod_three_login'){
                //@ts-ignore
                window.opener.loginSuccess()
                window.opener = null;
                window.open("", "_self", "");
                window.close();
            }{
                if (toHtml != '') {
                    //跳转到指定页面
                    setTimeout(() => {
                        JumpWebUtil.toPage(toHtml, page, tid);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER);
                    }, 1000);
                }
            }
        } else{
            localStorage.setItem('third_bind_error','1');
            JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER);
        }
    }
}

new ThreeSuccess({
}).$mount('#app');
