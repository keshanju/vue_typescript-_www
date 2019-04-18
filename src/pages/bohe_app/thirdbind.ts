import "@/assets/css/bohe_app.css";
import "./css/mui.min0125.css";
import "./css/ls2.css";
import "./css/wap.less";
import "leigod-lib-flexible";
import { Component, Vue } from "vue-property-decorator";
import { LanguageConfig } from '@/ts/utils/Language';
import { RegisterProxy } from "@/ts/proxy/RegisterProxy";
import GlobalConfig from "@/pages/bohe_app/global.config";
import CheckUtil from '@/ts/utils/CheckUtil';
import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';
import "babel-polyfill";
import VueI18n from "vue-i18n";
import { Loading, Toast } from "vant";
import { Select,Option } from "element-ui";
import Util from '@/ts/utils/Util';
import AppParamModel from '@/ts/models/AppModel';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import ConfigUtil from '@/ts/utils/ConfigUtil';
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Select);
Vue.use(Option);
Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class ThirdBind extends RegisterProxy {
    public appParam: AppParamModel = AppParamModel.getInstace();

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
        // var v = value.target.value; // 选中索引
        this.countryCode = value;
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
        this.onBindPhone('pc');
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
        this.onBindEmail('pc');
    }

    /**
     * 绑定成功
     */
    public onBindingSuccess(data: any) {
        if (this.resignType == 4) {
            Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_MOBILE))
        } else if (this.resignType == 5) {
            Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_EMAIL))
        }
        this.notifCount++;
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
}

//
new ThirdBind({
    i18n,
}).$mount('#app');
