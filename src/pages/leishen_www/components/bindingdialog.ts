import '../assets/css/leishen.less';
import "babel-polyfill";
import {Vue, Component} from "vue-property-decorator";
import WebParamModel from "@/ts/models/WebModel";
import {TdappModel} from "@/ts/models/TdappModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import HttpClient from "@/ts/net/HttpClient";
import GlobalConfig from "../global.config";
import {Notification, Option, Select, OptionGroup} from "element-ui";
import {TipsMsgUtil} from "@/ts/utils/TipsMsgUtil";
import CheckUtil from "@/ts/utils/CheckUtil";
import Util from "@/ts/utils/Util";
import {BindingProxy} from "@/ts/proxy/BindingProxy";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {LoginModel, SendVerificationCodeRequestModel} from "@/ts/models/UserModel";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import {RegisterProxy} from "@/ts/proxy/RegisterProxy";

Vue.prototype.$notify = Notification;
@Component({
    components: {
        'el-select': Select,
        'el-option': Option,
        'el-option-group': OptionGroup
    }
})
class Bingdingdialog extends RegisterProxy {
    public bindUrlType: string = '';
    public imageHeadUrl: string = '';
    public checkReferCode: boolean = false;//是否勾选推荐码

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
        this.changeResignType(4);
        this.token = LocalStorageUtil.getUserToken().account_token;
        this.bindUrlType = localStorage.getItem(LocalStorageUtil.STORAGES_THIRDBIND_URL_TYPE);
        this.init();
        console.log(this.bind_status)
    }

    public init(): void {
        this.referCode = Util.getUrlParam('refer_code');
        this.getAreaCodeList();
        this.getAreaCodeInfoList();
        this.onGetPackage(1);
    }

    /**
     * 获取配置文件
     * @param url
     */
    public async getDownloadUrl() {
        const jsonConfig = await ConfigUtil.getInstance().download();
        const region_code = LocalStorageUtil.getRegionCodes();
        if (jsonConfig != null) {
            const regConfig = jsonConfig.leigod[region_code].register;
            this.isShowEmail = Number(regConfig.is_email);
        }
    }

    /**
     * 切换注册方式
     */
    public changeResignType(type: number) {
        this.onChangeRegisterType(type);
        this.agreementChceked = false;
    }

    /**
     * 改变手机区号
     */
    public onSelectCountryCode(value) {
        this.country_code = value;
        this.countryCode = value.code;
    }

    /**
     * 获取图形验证码
     */
    public getCaptcha() {
        //TODO...需要验证输入
        this.onGetCaptcha();
    }

    /**
     * 获取短信验证码
     */
    public onSmsCode() {
        let flag = true;
        let tipMsg = '';
        //防止连续点击
        if (this.smsCountDownNum > 0) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_WAITING),
                type: 'warning'
            });
            return;
        }
        if (this.countryCode == '86') {
            //验证手机号
            if (!CheckUtil.checkPhone(this.phone) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
                flag = false;
                if (this.phone == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                    flag = false;
                }
            }
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
                flag = false;
                if (this.imgCaptchaCode == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
                    flag = false;
                }
            }
        }

        if(!flag){
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: tipMsg,
                type: 'warning'
            });
            return;
        }
        this.onGetSmscode(0, 3);
    }

    /**
     * 获取短信验证码成功
     * TODO... 此方法可以重写，处理短信获取成功后的ui逻辑
     */
    onGetSmscodeSuccess() {
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
            message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS),
            type: 'warning'
        });
        //倒计时
        this.smsCountDownNum = 60;
        const sefl = this;
        Util.countDown(this.smsCountDownNum, 1, (n: number) => {
            sefl.smsCountDownNum = n;
        });
    }

    /**
     * 获取短信验证码失败
     */
    onGetSmscodeFaild(data: any) {
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
            message: data.msg,
            type: 'warning'
        });
    }

    /**
     * 获取邮件
     */
    public onEmailCode() {
        let flag = true;
        let tipMsg = '';
        //防止连续点击
        if (this.smsCountDownNum > 0) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_WAITING),
                type: 'warning'
            });
            return;
        }
        //验证邮箱
        if (!CheckUtil.checkEmail(this.email) && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR);
            flag = false;
            if (this.email == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY);
                flag = false;
            }
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
                flag = false;
                if (this.imgCaptchaCode == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
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
        this.onGetEmailcode(3);
    }

    /**
     * 获取邮箱验证码成功
     * TODO... 此方法可以重写，处理邮件发送成功后的ui逻辑
     */
    onGetEmailcodeSuccess() {
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
            message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL),
            type: 'success'
        });
        //倒计时
        this.emailCountDownNum = 60;
        const sefl = this;
        Util.countDown(this.emailCountDownNum, 1, (n: number) => {
            sefl.emailCountDownNum = n;
        });
    }

    /**
     * 获取邮箱验证码失败
     * TODO... 此方法可以重写，处理邮件获取失败后的ui逻辑
     */
    onGetEmailcodeFaild(data: any) {
        // 错误返回
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
            message: data.msg,
            type: 'warning'
        });
    }

    /**
     * 发送已登录账号验证码
     */
    public sendVerifyCode(){
        let param = new SendVerificationCodeRequestModel();
        param.account_token = this.token;
        this.onSendVerification(param);
    }

    /**
     * 发送已登录账号验证码成功
     */
    onSendVerificationSuccess(data: any) {
        this.verify_key = data.data.verify_key;
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
            message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS),
            type: 'success'
        });
        //倒计时
        this.verifyCountDownNum = 60;
        const sefl = this;
        Util.countDown(this.verifyCountDownNum, 1, (n: number) => {
            sefl.verifyCountDownNum = n;
        });
    }

    /**
     * 发送已登录账号验证码失败
     */
    onSendVerificationFaild(data: any) {
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
            message: data.msg,
            type: 'warning'
        });
    }

    /**
     * 点击绑定(未登录状态)
     */
    public clickRegister() {
        switch (this.resignType) {
            case 4:
                this.onClickBindPhone();
                break;
            case 5:
                this.onClickEmailReg();
                break;
        }
    }

    /**
     * 绑定已登录账号
     */
    public bindDefaultAccount(){
        let tipMsg = '';
        //验证短信验证码
        if (!CheckUtil.checkSmscode(this.verify_code)) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR);
            if (this.smscode == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY);
            }
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: tipMsg,
                type: 'warning'
            });
            return;
        }

        this.onBindDefaultAccount('',"4")
    }

    /**
     * 绑定手机
     */
    onClickBindPhone() {
        let flag = true;
        let tipMsg = '';
        if (this.countryCode == '86') {
            //验证手机号
            if (!CheckUtil.checkPhone(this.phone) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
                flag = false;
                if (this.phone == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                    flag = false;
                }
            }
        }
        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
                flag = false;
                if (this.imgCaptchaCode == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
                    flag = false;
                }
            }
        }

        //验证短信验证码
        if (!CheckUtil.checkSmscode(this.smscode) && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR);
            flag = false;
            if (this.smscode == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY);
                flag = false;
            }
        }

        //验证密码
        if (this.bind_status == '4' && !CheckUtil.checkPwd(this.phonePassword) && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
            flag = false;
            if (this.phonePassword == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                flag = false;
            }
        }

        //用户协议
        if (this.bind_status == '4' && !this.agreementChceked && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_READAGREEMENT);
            flag = false;
        }

        if (!flag) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: tipMsg,
                type: 'warning'
            });
            return;
        }

        this.onBindPhone('','4');
    }

    /**
     * 绑定邮箱
     */
    onClickEmailReg() {
        let flag = true;
        let tipMsg = '';
        //验证邮箱
        if (!CheckUtil.checkEmail(this.email) && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR);
            flag = false;
            if (this.email == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY);
                flag = false;
            }
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
                flag = false;
                if (this.imgCaptchaCode == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
                    flag = false;
                }
            }
        }

        //验证邮箱验证码
        if (!CheckUtil.checkSmscode(this.emailcode) && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_ERROR);
            flag = false;
            if (this.emailcode == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_EMPTY);
                flag = false;
            }
        }

        //验证密码
        if (this.bind_status == '4' && !CheckUtil.checkPwd(this.emailPassword) && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
            flag = false;
            if (this.phonePassword == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                flag = false;
            }
        }

        //验证用户协议是否勾选
        if (this.bind_status == '4' && !this.agreementChceked && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_READAGREEMENT);
            flag = false;
        }

        if (!flag) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: tipMsg,
                type: 'warning'
            });
            return;
        }

        this.onBindEmail('','4');
    }

    /**
     * 绑定成功
     */
    public onBindingSuccess(data: any) {
        let tipMsg = '';
        if (this.bindUrlType == '0') {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING);
        }else {
            if (this.resignType == 4) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_MOBILE);
            } else if (this.resignType == 5) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_EMAIL);
            }
        }
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
            message: tipMsg,
            type: 'success'
        });
        const loginM: LoginModel = data.data;
        LocalStorageUtil.addUserToken(loginM.login_info);
        LocalStorageUtil.addUserInfo(loginM.user_info);
        // 自动登录
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_AUTO_LOGIN);
        if(window.name=='leigod_three_login'){
            // @ts-ignore
            window.opener.loginSuccess()
            window.opener = null;
            window.open("", "_self", "");
            window.close();
        }else{
            setTimeout(() => {
                JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER);
            }, 1000);
        }
    }

    /**
     * 注册失败
     */
    public onBindingFaild(data: any) {
        // 错误返回
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
            message: data.msg,
            type: 'warning'
        });
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

export default Bingdingdialog
