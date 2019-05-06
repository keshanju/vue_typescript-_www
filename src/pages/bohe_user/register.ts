import '@/assets/less/bohe.less';
import {Component, Vue} from "vue-property-decorator";
import {LanguageConfig} from '@/ts/utils/Language';
import CheckUtil from '@/ts/utils/CheckUtil';
import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
import {Loading, Notification, Option, Select} from "element-ui";
import "babel-polyfill";
import WebParamModel from "@/ts/models/WebModel";
import GlobalConfig from "@/pages/bohe/global.config";
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import FootNavTwo from './components/FootNavTwo.vue';
import VueI18n from "vue-i18n";
import {RegisterProxy} from "@/ts/proxy/RegisterProxy";
import {LoginModel, LoginRequestModel} from "@/ts/models/UserModel";
import HttpClient from "@/ts/net/HttpClient";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {Md5} from "ts-md5";
import ConfigUtil from '@/ts/utils/ConfigUtil';
import Util from '@/ts/utils/Util';

Vue.prototype.$notify = Notification;
Vue.use(Select);
Vue.use(Option);
Vue.use(Loading);
Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    watch: {
        notifCount(newVal, oldVal) {
            this.$notify({
                title: vueC.notifTitle,
                message: vueC.notifMessage,
                type: vueC.notifType
            });
        }
    },
    components: {
        'foot-nav-two': FootNavTwo
    }
})

class Register extends RegisterProxy {

    public webParam = WebParamModel.getInstace(); // 浏览器参数

    created() {
        GlobalConfig.log("注册log");
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.changeResignType(0);
        //读取配置文件config.json,判断是否显示邮箱注册按钮
        this.ishowEmial();
        this.init();
    }

    /**
     * 切换注册方式
     */
    public changeResignType(type: number) {
        this.onChangeRegisterType(type);
        this.agreementChceked = false;
    }

    /**
     *  读取配置文件config.json,判断是否显示邮箱注册按钮
     * @param url
     */
    public async ishowEmial() {
        const jsonConfig = await ConfigUtil.getInstance().download();
        const region_code = LocalStorageUtil.getRegionCodes();
        if (jsonConfig != null) {
            const regConfig = jsonConfig.bohe[region_code].register;
            this.isShowEmail = Number(regConfig.is_email);
        }
    }

    /**
     * 返回首页
     * @param type
     */
    public goHome() {
        JumpWebUtil.backHome();
    }

    /**
     * 改变手机区号
     */
    public onSelectCountryCode(value: string) {
        this.countryCode = value;
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
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        //防止连续点击
        if (this.smsCountDownNum > 0) {
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_WAITING);
            this.notifCount++;//触发提示
            return;
        }
        if (this.countryCode == '86') {
            //验证手机号
            if (!CheckUtil.checkPhone(this.phone)) {
                if (this.phone == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                    this.notifCount++;//触发提示
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
                this.notifCount++;//触发提示
                return false;
            }
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
                    this.notifCount++;//触发提示
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
                this.notifCount++;//触发提示
                return false;
            }
        }
        this.onGetSmscode(0, 2);
    }

    /**
     * 获取邮件
     */
    public onEmailCode() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        //防止连续点击
        if (this.smsCountDownNum > 0) {
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_WAITING);
            this.notifCount++;//触发提示
            return;
        }
        //验证邮箱
        if (!CheckUtil.checkEmail(this.email)) {
            if (this.email == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY);
                this.notifCount++;//触发提示
                return false;
            }
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR);
            this.notifCount++;//触发提示
            return false;
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
                    this.notifCount++;//触发提示
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
                this.notifCount++;//触发提示
                return false;
            }
        }
        this.onGetEmailcode(2);
    }

    /**
     * 获取语音
     */
    public onVoiceCode() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        if (this.countryCode == '86') {
            //验证手机号
            if (!CheckUtil.checkPhone(this.phone)) {
                if (this.phone == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                    this.notifCount++;//触发提示
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
                this.notifCount++;//触发提示
                return false;
            }
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
                    this.notifCount++;//触发提示
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
                this.notifCount++;//触发提示
                return false;
            }
        }
        this.onGetSmscode(1, 2);
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
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        //验证邮箱
        if (!CheckUtil.checkEmail(this.email)) {
            if (this.email == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY);
                this.notifCount++;//触发提示
                return false;
            }
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR);
            this.notifCount++;//触发提示
            return false;
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
                    this.notifCount++;//触发提示
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
                this.notifCount++;//触发提示
                return false;
            }
        }

        //验证邮箱验证码
        if (!CheckUtil.checkSmscode(this.emailcode)) {
            if (this.emailcode == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_EMPTY);
                this.notifCount++;//触发提示
                return false;
            }
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_ERROR);
            this.notifCount++;//触发提示
            return false;
        }

        //验证密码
        if (!CheckUtil.checkPwd(this.emailPassword)) {
            if (this.phonePassword == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                this.notifCount++;//触发提示
                return false;
            }
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
            this.notifCount++;//触发提示
            return false;
        }

        //验证确认密码
        if (!CheckUtil.checkPwdTwo(this.emailPasswordTwo, this.emailPassword)) {
            if (this.phonePasswordTwo == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                this.notifCount++;//触发提示
                return false;
            }
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
            this.notifCount++;//触发提示
            return false;
        }

        //验证用户协议是否勾选
        if (!this.agreementChceked) {
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_READAGREEMENT);
            this.notifCount++;//触发提示
            return false;
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
        //加统计
        // @ts-ignore
        _hmt.push(['_trackEvent', 'register', 'success']);
        // 自动登录
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_AUTO_LOGIN);
        switch (this.resignType) {
            case 0:
                this.autoLogin(this.phone,this.phonePassword,this.countryCode);
                break;
            case 1:
                this.autoLogin(this.email,this.emailPassword,undefined);
                break;
        }
    }

    /**
     * 自动登录
     */
    public async autoLogin(phone, password,countryCode) {
        let param = new LoginRequestModel();
        param.username = phone;
        param.password = Md5.hashStr(password).toString();
        if(countryCode){
            param.country_code = countryCode;
        }
        const url = HttpClient.URL_AUTH_LOGIN;
        this.backData = await this.http.post<LoginModel>(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            const loginM: LoginModel = this.backData.data;
            LocalStorageUtil.addUserToken(loginM.login_info);
            LocalStorageUtil.addUserInfo(loginM.user_info);
            JumpWebUtil.backUser();
        } else {
        }
    }

    /**
     * 注册失败
     */
    public onRegisterFaild(data: any) {
        // 错误返回
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        this.notifMessage = data.msg;
        this.notifCount++;
    }

    /**
     * 勾选用户协议
     */
    public checkAgreement() {
        this.agreementChceked = !this.agreementChceked;
    }
}

//
let vueC = new Register({
    i18n,
}).$mount('#app');