import '@/assets/less/bohe.less';
import { Component, Vue } from "vue-property-decorator";
import { LanguageConfig } from '@/ts/utils/Language';
import { RegisterProxy } from "@/ts/proxy/RegisterProxy";
import GlobalConfig from "@/pages/bohe/global.config";
import CheckUtil from '@/ts/utils/CheckUtil';
import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';
import { Select, Option, Loading, Notification } from "element-ui";
import "babel-polyfill";
import WebParamModel from "@/ts/models/WebModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import FootNavTwo from './components/FootNavTwo.vue';
import VueI18n from "vue-i18n";
import Util from '@/ts/utils/Util';
import { LoginModel } from '@/ts/models/UserModel';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import ConfigUtil from '@/ts/utils/ConfigUtil';

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
class Bindmobile extends RegisterProxy {
    public webParam = WebParamModel.getInstace(); // 浏览器参数

    created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.changeRegisterType(4);
        this.init();

          //读取配置文件config.json,判断是否显示邮箱注册按钮
          this.ishowEmial();
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
     * 切换绑定方式
     */
    public changeRegisterType(type: number) {
        this.onChangeRegisterType(type);
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
        if (Util.getUrlParam('code') == '' || Util.getUrlParam('code') == null) return;
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
        this.onGetSmscode(0, 3);
    }

    /**
     * 获取邮件
     */
    public onEmailCode() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        if (Util.getUrlParam('code') == '' || Util.getUrlParam('code') == null) return;
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
        this.onGetEmailcode(3);
    }

    /**
     * 获取语音
     */
    public onVoiceCode() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        if (Util.getUrlParam('code') == '' || Util.getUrlParam('code') == null) return;
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
        this.onGetSmscode(1, 3);
    }

    /**
   * 改变手机区号
   */
    public onSelectCountryCode(value: string) {
        this.countryCode = value;
    }

    /**
     * 点击绑定
     */
    public clickBind() {
        if (Util.getUrlParam('code') == '' || Util.getUrlParam('code') == null) return;
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
     * 绑定手机
     */
    public onClickBindPhone() {
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

        //验证短信验证码
        if (!CheckUtil.checkSmscode(this.smscode)) {
            if (this.smscode == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY);
                this.notifCount++;//触发提示
                return false;
            }
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR);
            this.notifCount++;//触发提示
            return false;
        }
        this.onBindPhone();
    }

    /**
     * 绑定邮箱
     */
    public onClickBindEmail() {
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
        this.onBindEmail();
    }

    /**
     * 绑定成功
     */
    public onBindingSuccess(data: any) {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE);
        this.notifType = "success";
        const loginM: LoginModel = data.data;
        LocalStorageUtil.addUserToken(loginM.login_info);
        LocalStorageUtil.addUserInfo(loginM.user_info);
        if (this.resignType == 4) {
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_MOBILE);
        } else if (this.resignType == 5){
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_EMAIL);
        }
        this.notifCount++;
        // 自动跳转个人中心
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_AUTO_LOGIN);
        setTimeout(() => {
            JumpWebUtil.backUser();
        }, 1000);
    }

    /**
     * 绑定失败
     */
    public onBindingFaild(data: any) {
        // 错误返回
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        this.notifMessage = data.msg;
        this.notifCount++;
    }
}

//
let vueC = new Bindmobile({
    i18n,
}).$mount('#app');
