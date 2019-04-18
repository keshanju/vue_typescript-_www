import '../assets/css/leishen.less';
import "babel-polyfill";
import {Vue, Component} from "vue-property-decorator";
import WebParamModel from "@/ts/models/WebModel";
import {TdappModel} from "@/ts/models/TdappModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import HttpClient from "@/ts/net/HttpClient";
import GlobalConfig from "../global.config";
import {Notification, Option, Select, OptionGroup} from "element-ui";
import {Md5} from "ts-md5";
import {TipsMsgUtil} from "@/ts/utils/TipsMsgUtil";
import CheckUtil from "@/ts/utils/CheckUtil";
import Util from "@/ts/utils/Util";
import {RegisterProxy} from "@/ts/proxy/RegisterProxy";
import {LoginModel, LoginRequestModel} from "@/ts/models/UserModel";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

Vue.prototype.$notify = Notification;
@Component({
    components: {
        'el-select': Select,
        'el-option': Option,
        'el-option-group': OptionGroup
    }
})
class Registerdialog extends RegisterProxy {
    public imageHeadUrl: string = '';
    public voiceShow: boolean = false;//发送语音是否显示
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
        this.changeResignType(0);
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.init();
    }

    public init(): void {
        this.referCode = Util.getUrlParam('refer_code');
        this.getAreaCodeList();
        this.getAreaCodeInfoList();
        this.onGetPackage(1);
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

        if (!flag) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: tipMsg,
                type: 'warning'
            });
            return;
        }
        this.onGetSmscode(0, 2);
    }

    /**
     * 获取短信验证码成功
     * TODO... 此方法可以重写，处理短信获取成功后的ui逻辑
     */
    onGetSmscodeSuccess() {
        this.voiceShow = true;
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
            message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS),
            type: 'success'
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
        this.onGetEmailcode(2);
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
     * 点击注册
     */
    public clickRegister() {
        switch (this.resignType) {
            case 0:
                this.onClickPhoneReg();
                break;
            case 1:
                this.onClickEmailReg();
                break;
        }
    }

    /**
     * 手机注册
     */
    onClickPhoneReg() {
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
        if (!CheckUtil.checkPwd(this.phonePassword) && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
            flag = false;
            if (this.phonePassword == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                flag = false;
            }
        }

        //验证确认密码
        if (!CheckUtil.checkPwdTwo(this.phonePasswordTwo, this.phonePassword) && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
            flag = false;
            if (this.phonePasswordTwo == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                flag = false;
            }
        }

        //用户协议
        if (!this.agreementChceked && flag) {
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

        this.onPhoneRegister();
    }

    /**
     * 邮箱注册
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
        if (!CheckUtil.checkPwd(this.emailPassword) && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
            flag = false;
            if (this.emailPassword == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                flag = false;
            }
        }

        //验证确认密码
        if (!CheckUtil.checkPwdTwo(this.emailPasswordTwo, this.emailPassword) && flag) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
            flag = false;
            if (this.emailPasswordTwo == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                flag = false;
            }
        }

        //验证用户协议是否勾选
        if (!this.agreementChceked && flag) {
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

        this.onEmaillRegister();
    }

    /**
     * 注册成功
     */
    public onRegisterSuccess() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE);
        this.notifType = "success";
        this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_REGISTER);
        this.notifCount++;
        // 自动登录
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_AUTO_LOGIN);
        switch (this.resignType) {
            case 0:
                this.autoLogin(this.phone, this.phonePassword);
                break;
            case 1:
                this.autoLogin(this.email, this.emailPassword);
                break;
        }
    }

    /**
     * 注册失败
     */
    public onRegisterFaild(data: any) {
        // 错误返回
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
            message: data.msg,
            type: 'warning'
        });
    }

    /**
     * 自动登录
     */
    public async autoLogin(phone, password) {
        let param = new LoginRequestModel();
        param.username = phone;
        param.password = Md5.hashStr(password).toString();
        param.country_code = this.countryCode;
        param.src_channel = LocalStorageUtil.getSrcChannel();

        const url = HttpClient.URL_AUTH_LOGIN;
        this.backData = await this.http.post<LoginModel>(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            const loginM: LoginModel = this.backData.data;
            LocalStorageUtil.addUserToken(loginM.login_info);
            LocalStorageUtil.addUserInfo(loginM.user_info);
            JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER);
        } else {
        }
    }

    /**
     * 跳转忘记密码
     */
    public goForgetPwd() {
        JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_FORGETPWD);
    }

    /**
     * 跳转登录
     */
    public goLogin() {
        JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_LOGIN);
    }
}

export default Registerdialog