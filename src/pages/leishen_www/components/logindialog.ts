import '../assets/css/leishen.less';
import "babel-polyfill";
import {Vue, Component} from "vue-property-decorator";
import WebParamModel from "@/ts/models/WebModel";
import {TdappModel} from "@/ts/models/TdappModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import HttpClient from "@/ts/net/HttpClient";
import GlobalConfig from "../global.config";
import {Notification, Option, Select, OptionGroup} from "element-ui";
import {LoginProxy} from "@/ts/proxy/LoginProxy";
import {TipsMsgUtil} from "@/ts/utils/TipsMsgUtil";
import CheckUtil from "@/ts/utils/CheckUtil";
import Util from "@/ts/utils/Util";

Vue.prototype.$notify = Notification;
@Component({
    components: {
        'el-select': Select,
        'el-option': Option,
        'el-option-group': OptionGroup
    }
})
class Logingdialog extends LoginProxy {
    public imageHeadUrl: string = '';

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
     * 改变手机区号
     */
    public onSelectCountryCode(value) {
        this.countryCode = value;
        this.country_code = value.code;
    }

    /**
     * 改变密码
     */
    public passwordInput(type: number) {
        //TODO...需要验证输入
        this.onPasswordInput(type);
    }

    /**
     * 点击登录
     */
    public clickLogin() {
        let flag = true;
        let tipMsg = '';
        if (this.loginType == 0) {
            if (this.country_code == '86') {
                //验证手机号
                if (!CheckUtil.checkPhone(this.phone) && flag) {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
                    flag = false;
                    if (this.phone == '') {
                        tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                        flag = false;
                    }
                }
            }

            if (this.isPwMd5) {
                //验证密码
                if (this.phonePassword == '') {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                    flag = false;
                }
            } else {
                //验证记住的密码
                if (!CheckUtil.checkRemberPwd(this.phonePassword) && flag) {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
                    flag = false;
                    if (this.phonePassword == '') {
                        tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                        flag = false;
                    }
                }
            }
            if (!flag) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: tipMsg,
                    type: 'warning'
                });
                return;
            }
            this.setLoadingStatuas(true);
            this.onPhoneLogin();
        } else {
            //验证邮箱/账号
            if (!CheckUtil.checkEmail(this.email) && flag) {
                if (!CheckUtil.checkAccount(this.email)) {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ACCOUNT_ERROR);
                    flag = false;
                }
                if (this.email == '') {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ACCOUNT_EMPTY);
                    flag = false;
                }
            }
            if (this.isPwMd5) {
                if (this.emailPassword == '') {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                    flag = false;
                }
            } else {
                //验证记住的密码
                if (!CheckUtil.checkRemberPwd(this.emailPassword) && flag) {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
                    flag = false;
                    if (this.emailPassword == '') {
                        tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                        flag = false;
                    }
                }
            }

            if (!flag) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: tipMsg,
                    type: 'warning'
                });
                return;
            }
            this.setLoadingStatuas(true);
            this.onEmaillLogin();
        }
    }


    /**
     * 登录成功
     * TODO... 此方法可以重写，处理登录成功后的ui逻辑
     */
    onLoginSuccess() {
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
            message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN),
            type: 'success'
        });
        let self = this;
        this.isLoading = true;
        //读取to参数跳转到对应的页面
        const toHtml = Util.getUrlParam('to');
        if (toHtml != '') {
            //跳转到指定页面
            const page = parseInt(Util.getUrlParam('page'));
            const tid = parseInt(Util.getUrlParam('id'));
            setTimeout(() => {
                JumpWebUtil.toPage(toHtml, page, tid);
            }, 1000);
        } else {
            setTimeout(() => {
                if(window.location.href.indexOf('localhost:')>-1){
                    let url=window.location.protocol+'//'+window.location.host
                    JumpWebUtil.wapJump(url, JumpWebUtil.HTML_NAME_USER);
                }else{
                    JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER);
                }
            }, 1000);
        }
    }

    /**
     * 登录失败
     * TODO... 此方法可以重写，处理登录失败后的ui逻辑
     */
    onLoginFaild(data: any) {
        // 错误返回
        this.setLoadingStatuas(false);
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
            message: data.msg,
            type: 'warning'
        });
    }


    /**
     * 设置loading状态
     */
    public setLoadingStatuas(b: boolean) {
        this.isLoading = b;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
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
}
export default Logingdialog