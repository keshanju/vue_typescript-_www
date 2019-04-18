import "@/assets/less/leishen_pc.less";
import "leigod-lib-flexible";
import { Component, Vue } from "vue-property-decorator";
import { LsLanguage } from "@/pages/leishen_pc/util/LsLanguage";
import { RegisterProxy } from "@/ts/proxy/RegisterProxy";
import GlobalConfig from "@/pages/leishen_pc/global.config";
import CheckUtil from '@/ts/utils/CheckUtil';
import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';
import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Select, Option } from 'element-ui';
import { Loading, Toast } from "vant";
import Util from '@/ts/utils/Util';
import AppParamModel from '@/ts/models/AppModel';
import { SendVerificationCodeRequestModel } from '@/ts/models/UserModel';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import ConfigUtil from '@/ts/utils/ConfigUtil';

Vue.use(Toast);
Vue.use(Loading);
Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'el-select': Select,
        'el-option': Option
    }
})
class ThirdBind extends RegisterProxy {
    public appParam: AppParamModel = AppParamModel.getInstace();
    public bindUrlType: string = '';

    created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.token = LocalStorageUtil.getUserToken().account_token;
        this.bindUrlType = localStorage.getItem(LocalStorageUtil.STORAGES_THIRDBIND_URL_TYPE);
        this.changeRegisterType(4);
        this.init();
    }
    
    public init(): void {
        this.referCode = Util.getUrlParam('refer_code');
        this.getAreaCodeList();
        this.getDownloadUrl();
        this.onGetPackage(1);
    }

    /**
     * 切换绑定方式
     */
    public changeRegisterType(type: number) {
        this.onChangeRegisterType(type);
    }

    /**
     * 获取配置文件
     * @param url
     */
    public async getDownloadUrl() {
        const jsonConfig = await ConfigUtil.getInstance().download(false);
        const region_code = LocalStorageUtil.getRegionCodes();
        if (jsonConfig != null) {
            const regConfig = jsonConfig.leigod[region_code].register;
            this.isShowEmail = Number(regConfig.is_email);
        }
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
        if (Util.getUrlParam('code') == '') return;
        //防止连续点击
        if (this.smsCountDownNum > 0) {
            Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_WAITING))
            return;
        }
        if (this.countryCode == '86') {
            //验证手机号
            if (!CheckUtil.checkPhone(this.phone)) {
                if (this.phone == "") {
                    Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY))
                    return false;
                }
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR))
                return false;
            }
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY))
                    return false;
                }
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR))
                return false;
            }
        }
        this.onGetSmscode(0, 3);
    }

    /**
     * 获取短信验证码成功
     */
    public onGetSmscodeSuccess() {
        Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS))
        //倒计时
        this.smsCountDownNum = 60;
        const sefl = this;
        Util.countDown(this.smsCountDownNum, 1, (n: number) => {
            sefl.smsCountDownNum = n;
        });
    }

    /**
     * 获取短信验证码失败
     * TODO... 此方法可以重写，处理短信获取失败后的ui逻辑
     */
    public onGetSmscodeFaild(data: any) {
        Toast(data.msg);
    }

    /**
     * 获取邮件
     */
    public onEmailCode() {
        if (Util.getUrlParam('code') == '') return;
        //防止连续点击
        if (this.emailCountDownNum > 0) {
            Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_WAITING))
            return;
        }
        //验证邮箱
        if (!CheckUtil.checkEmail(this.email)) {
            if (this.email == "") {
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY))
                return false;
            }
            Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR))
            return false;
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY))
                    return false;
                }
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR))
                return false;
            }
        }
        this.onGetEmailcode(3);
    }

    /**
     * 获取邮箱验证码成功
     */
    public onGetEmailcodeSuccess() {
        Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL))
        //倒计时
        this.emailCountDownNum = 60;
        const sefl = this;
        Util.countDown(this.smsCountDownNum, 1, (n: number) => {
            sefl.emailCountDownNum = n;
        });
    }

    /**
     * 获取邮箱验证码失败
     * TODO... 此方法可以重写，处理短信获取失败后的ui逻辑
     */
    public onGetEmailcodeFaild(data: any) {
        Toast(data.msg);
    }

    /**
     * 发送已登录账号验证码
     */
    public sendVerifyCode() {
        let param = new SendVerificationCodeRequestModel();
        param.account_token = this.token;
        this.onSendVerification(param);
    }

    /**
     * 发送已登录账号验证码成功
     */
    onSendVerificationSuccess(data: any) {
        this.verify_key = data.data.verify_key;
        Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS));
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
        Toast(data.msg);
    }

    /**
     * 获取语音
     */
    public onVoiceCode() {
        if (Util.getUrlParam('code') == '') return;
        if (this.countryCode == '86') {
            //验证手机号
            if (!CheckUtil.checkPhone(this.phone)) {
                if (this.phone == "") {
                    Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY))
                    return false;
                }
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR))
                return false;
            }
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY))
                    return false;
                }
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR))
                return false;
            }
        }
        this.onGetSmscode(1, 3);
    }

    /**
   * 改变手机区号
   */
    public onSelectCountryCode(value: any) {
        var v = value.target.value; // 选中索引
        this.countryCode = v;
    }

    /**
     * 点击绑定
     */
    public clickBind() {
        if (Util.getUrlParam('code') == '') return;
        switch (this.resignType) {
            case 4:
                this.onClickBindPhone();
                break;
            case 5:
                this.onClickBindEmail();
                break;
        }
    }

    /**
     * 绑定已登录账号
     */
    public bindDefaultAccount() {
        let tipMsg = '';
        //验证短信验证码
        if (!CheckUtil.checkSmscode(this.verify_code)) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR);
            if (this.verify_code == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY);
            }
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: tipMsg,
                type: 'warning'
            });
            return;
        }

        this.onBindDefaultAccount('pc')
    }

    /**
     * 绑定手机
     */
    public onClickBindPhone() {
        if (this.countryCode == '86') {
            //验证手机号
            if (!CheckUtil.checkPhone(this.phone)) {
                if (this.phone == "") {
                    Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY))
                    return false;
                }
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR))
                return false;
            }
        }
        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY))
                    return false;
                }
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR))
                return false;
            }
        }

        //验证短信验证码
        if (!CheckUtil.checkSmscode(this.smscode)) {
            if (this.smscode == "") {
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY))
                return false;
            }
            Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR))
            return false;
        }
        this.onBindPhone('pc',this.appParam.os_type + '');
    }

    /**
     * 绑定邮箱
     */
    public onClickBindEmail() {
        //验证邮箱
        if (!CheckUtil.checkEmail(this.email)) {
            if (this.email == "") {
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY))
                return false;
            }
            Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR))
            return false;
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode)) {
                if (this.imgCaptchaCode == "") {
                    Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY))
                    return false;
                }
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR))
                return false;
            }
        }

        //验证邮箱验证码
        if (!CheckUtil.checkSmscode(this.emailcode)) {
            if (this.emailcode == "") {
                Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_EMPTY))
                return false;
            }
            Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_ERROR))
            return false;
        }
        this.onBindEmail('pc', this.appParam.os_type + '');
    }

    /**
     * 绑定成功
     */
    public onBindingSuccess(data: any) {
        if (this.resignType == 4) {
            Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_MOBILE))
        } else if (this.resignType == 5) {
            Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_EMAIL))
        };
        // 自动登录
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_AUTO_LOGIN);
        setTimeout(() => {
            let code = data.data.code;
            window.location.href = 'threeSuccess.html?code=' + code;
        }, 1000);
    }

    /**
     * 绑定失败
     */
    public onBindingFaild(data: any) {
        // 错误返回
        Toast(data.msg)
    }

    /**
     * 返回用户中心
     */
    public windowBack (){
        window.history.go(-3);
    }
}

//
new ThirdBind({
    i18n,
}).$mount('#app');
