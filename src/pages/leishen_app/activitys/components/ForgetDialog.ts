import {Component, Vue} from "vue-property-decorator";
import {Popup, Checkbox, Picker, Tab, Tabs, Toast, Loading} from "vant";
import {FindpwdProxy} from "@/ts/proxy/FindpwdProxy";
import Util from "@/ts/utils/Util";
import GlobalConfig from "../../global.config";
import CheckUtil from "@/ts/utils/CheckUtil";
import {TipsMsgUtil} from "@/ts/utils/TipsMsgUtil";
import AppParamModel from "@/ts/models/AppModel";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import Load from "../../components/Loading.vue";
import Countries from '../../components/Country.vue';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Picker);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Checkbox);
Vue.use(Popup);

const appParam: AppParamModel = AppParamModel.getInstace(
    Util.REGION_CODE_1,
    Util.ZH_CN
);

@Component({
    components: {
        load: Load,
        'country-item': Countries
    }
})
export default class ForgetDialog extends FindpwdProxy {
    public AreaCodeshow: boolean = false; //区域列表是否显示
    public region_code: number = 1;
    public tabactive: number = 0;
    public regtype: number = 2;
    public showVioceCode = 0;
    public state_html = Util.getUrlParam("state_html") || "";
    public logincode = Util.getUrlParam("code") || "";
    public country: {//国家信息
        code: string,
        group: string,
        ico: string,
        iso_code: string,
        name: string
    } = {
        code: '',
        group: '',
        ico: '',
        iso_code: '',
        name: ''
    };

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.init();
        this.registerIsCaptcha();
        this.changeResignType();
    }

    public async init() {
        await this.getAreaCodeInfoList(GlobalConfig.getWebBaseUrl());
        this.country = this.country_code;
    }

    /**
     * 跳转到登录
     */
    public goLogin() {
        this.$emit('tologin');
    }

    /**
     * 切换找回密码方式
     */
    public changeResignType() {
        if (this.tabactive == 0) {
            this.regtype = 2;
        } else if (this.tabactive == 1) {
            this.regtype = 3;
        }
        this.onChangeRegisterType(this.regtype);
        this.imgCaptchaCode = "";
    }

    //   获取regincode
    public async getcode() {
        let regincode = await ConfigUtil.getInstance().getRegincode();
        this.region_code = regincode;
        LocalStorageUtil.addRegionCode(this.region_code);
    }


    //  呼出区域选择列表
    public changeAreaCode() {
        this.AreaCodeshow = true;
    }

    //  关闭区域选择列表
    public cancleAreaCode() {
        this.AreaCodeshow = false;
    }

    /**
     * 获取选中的国家信息
     * @param data
     */
    public getcountry(data) {
        this.country = data;
        this.countryCode = data.code;
        this.AreaCodeshow = false;
    }

    /**
     * 获取图形验证码
     */
    public getCaptcha() {
        this.onGetCaptcha();
    }

    /**
     * 获取短信验证码
     */
    public onSmsCode() {
        let flag = true;
        let tipMsg = "";
        if (this.countryCode == "86") {
            //验证手机号
            if (!CheckUtil.checkPhone(this.phone) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
                flag = false;
                if (this.phone == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                    flag = false;
                }
            }
        } else {
            if (this.phone == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                flag = false;
            }
        }

        //验证图形验证码
        if (this.isimgVerification == 1) {
            if (!CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR
                );
                flag = false;
                if (this.imgCaptchaCode == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(
                        TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY
                    );
                    flag = false;
                }
            }
        }

        if (!flag) {
            Toast(tipMsg);
            return;
        }
        this.onGetSmscode(0, 1);
    }

    /**
     * 获取语音
     */
    public onVoiceCode() {
        let flag = true;
        let tipMsg = "";
        if (this.countryCode == "86") {
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
                tipMsg = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR
                );
                flag = false;
                if (this.imgCaptchaCode == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(
                        TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY
                    );
                    flag = false;
                }
            }
        }

        if (!flag) {
            Toast(tipMsg);
            return;
        }
        this.onGetSmscode(1, 1);
    }

    /**
     * 获取短信验证码成功
     * TODO... 此方法可以重写，处理短信获取成功后的ui逻辑
     */
    onGetSmscodeSuccess() {
        Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS));
        //倒计时
        this.smsCountDownNum = 60;
        const sefl = this;
        Util.countDown(this.smsCountDownNum, 1, (n: number) => {
            sefl.smsCountDownNum = n;
        });

        this.showVioceCode = 1;
    }

    /**
     * 获取短信验证码失败
     */
    onGetSmscodeFaild(data: any) {
        Toast(data.msg);
    }

    /**
     * 获取邮件
     */
    public onEmailCode() {
        let flag = true;
        let tipMsg = "";

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
                tipMsg = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR
                );
                flag = false;
                if (this.imgCaptchaCode == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(
                        TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY
                    );
                    flag = false;
                }
            }
        }

        if (!flag) {
            Toast(tipMsg);
            return;
        }
        this.onGetEmailcode(1);
    }

    /**
     * 获取邮箱验证码成功
     * TODO... 此方法可以重写，处理邮件发送成功后的ui逻辑
     */
    onGetEmailcodeSuccess() {
        Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL));
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
        Toast(data.msg);
    }

    /**
     * 点击重置密码
     */
    public clickFindPassword() {
        switch (this.resignType) {
            case 2:
                this.onClickPhoneReg();
                break;
            case 3:
                this.onClickEmailReg();
                break;
        }
    }

    /**
     * 手机找回密码
     */
    onClickPhoneReg() {
        let flag = true;
        let tipMsg = "";
        if (this.countryCode == "86") {
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
                tipMsg = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR
                );
                flag = false;
                if (this.imgCaptchaCode == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(
                        TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY
                    );
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
        if (
            !CheckUtil.checkPwdTwo(this.phonePasswordTwo, this.phonePassword) &&
            flag
        ) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
            flag = false;
            if (this.phonePasswordTwo == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                flag = false;
            }
        }

        if (!flag) {
            Toast(tipMsg);
            return;
        }

        this.onPhoneFindPassword();
    }

    /**
     * 邮箱找回密码
     */
    onClickEmailReg() {
        let flag = true;
        let tipMsg = "";
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
                tipMsg = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR
                );
                flag = false;
                if (this.imgCaptchaCode == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(
                        TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY
                    );
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
            if (this.phonePassword == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                flag = false;
            }
        }

        //验证确认密码
        if (
            !CheckUtil.checkPwdTwo(this.emailPasswordTwo, this.emailPassword) &&
            flag
        ) {
            tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
            flag = false;
            if (this.phonePasswordTwo == "") {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                flag = false;
            }
        }

        if (!flag) {
            Toast(tipMsg);
            return;
        }

        this.onEmailFindPassword();
    }

    /**
     * 密码找回成功
     */
    onFindPwdSuccess() {
        Toast(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_FINDPWD));
        let self = this;
        setTimeout(() => {
            self.isLoading = false;
            this.goLogin();
        }, 1000);
    }

    /**
     * 密码找回失败
     */
    onFindPwdFaild(data: any) {
        // 错误返回
        Toast(data.msg);
    }
}
