import "./css/wap.less";
import {Popup, Picker, Tab, Tabs, Toast, Icon, Loading, Checkbox, Field} from "vant";
import {LoginProxy} from "@/ts/proxy/LoginProxy";
import GlobalConfig from "./global.config";
import {TipsMsgUtil} from "@/ts/utils/TipsMsgUtil";
import Util from "@/ts/utils/Util";
import {Component, Vue} from "vue-property-decorator";
import {LoginRequestModel} from "@/ts/models/UserModel";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {Md5} from "ts-md5";
import HttpClient from "@/ts/net/HttpClient";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import {LsLanguage} from "@/pages/leishen_app/util/LsLanguage";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import JumpWeiXin from "./util/jump";
import $ from "jquery";
import Load from "./components/Loading.vue";
import Countries from './components/Country.vue';


Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Picker);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Popup);
Vue.use(Checkbox);
Vue.use(Field);

//语言
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(
    Util.REGION_CODE_1,
    Util.ZH_CN
);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
    components: {
        load: Load,
        'country-item': Countries
    }
})
class Login extends LoginProxy {
    public AreaCodeshow: boolean = false; //区域号码显示
    public code: string = ""; //绑定微信公众号code
    public bangding: boolean = true; //微信公众号
    public region_code: number = 0;
    public platform: number = 4; //平台类型
    public state_html = Util.getUrlParam("state_html");
    public logincode = Util.getUrlParam("code");

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
    }

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.init();
        this.checkEnvironment();

        // this.getcode();
        // this.onCheckPlatType();
    }

    //   获取regincode
    public async getcode() {
        let regincode = await ConfigUtil.getInstance().getRegincode();
        this.region_code = regincode;
        LocalStorageUtil.addRegionCode(this.region_code);
    }

    public mounted() {
    }

    /**
     * 获取选中的国家信息
     * @param data
     */
    public getcountry(data) {
        this.country = data;
        this.country_code = data.code;
        this.AreaCodeshow = false;
    }

    /**
     * 初始化界面
     */
    public async init() {
        let phone = localStorage.getItem(LocalStorageUtil.STORAGES_PHONE);
        let phonepsw = localStorage.getItem(LocalStorageUtil.STORAGES_PHONE_PW);
        let email = localStorage.getItem(LocalStorageUtil.STORAGES_EMAIL);
        let emailpsw = localStorage.getItem(LocalStorageUtil.STORAGES_EMAIL_PW);
        if (phone) {
            this.phone = phone;
            this.phonePassword = phonepsw;
        }
        if (email) {
            this.email = email;
            this.emailPassword = emailpsw;
        }
        await this.getAreaCodeInfoList(GlobalConfig.getWebBaseUrl());
        this.country=this.countryCode
        this.country_code=this.countryCode.code
        this.changeLoginType(0);
    }

    public checkEnvironment() {
        const self = this;
        $(function () {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            var ua = window.navigator.userAgent.toLowerCase();
            // @ts-ignore
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //微信环境
                appParam.platform = 4;
            } else if (isAndroid) {
                appParam.platform = 2;
            } else if (isiOS) {
                appParam.platform = 3;
            } else {
                appParam.platform = 0;
            }
        });
    }

    /**
     * 切换登录方式
     */
    public changeLoginType(index) {
        this.loginType = index;
    }

    //  呼出区域选择列表
    public changeAreaCode() {
        this.AreaCodeshow = true;
    }



    //判断平台类型 微信公众号还是手机端
    onCheckPlatType() {
        this.platform = appParam.platform;
    }

    /**
     * 点击登录
     */
    public onLogin() {
        //验证用户名
        if (this.loginType == 0) {
            if (this.phone == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY
                );
                Toast(this.notifMessage);
                return false;
            }
            if (this.phonePassword == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY
                );
                Toast(this.notifMessage);
                return false;
            }
            this.onPhoneLogin();
        } else if (this.loginType == 1) {
            //验证邮箱
            if (this.email == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY
                );
                Toast(this.notifMessage);
                return false;
            }

            if (this.emailPassword == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY
                );
                Toast(this.notifMessage);
                return false;
            }

            this.onEmaillLogin();
        }
    }

    /**
     * 登录成功
     * TODO... 此方法可以重写，处理登录成功后的ui逻辑
     */
    onLoginSuccess() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN);
        Toast(this.notifTitle);
        setTimeout(() => {
            let html = this.state_html + ".html";
            if (this.state_html) {
                this.gotoActives(html);
            } else {
                this.gotoNavlist();
            }
        }, 2000);
    }

    /**
     * 登录失败
     * TODO... 此方法可以重写，处理登录失败后的ui逻辑
     */
    onLoginFaild(data: any) {
        // 错误返回
        Toast(data.msg);
    }

    /**
     * 改变密码
     */
    public passwordInput(type: number) {
        //TODO...需要验证输入
        this.onPasswordInput(type);
    }

    /**
     * 改变手机区号
     */
    public onSelectCountryCode(value: string) {
        this.country_code = value;
    }


    /**
     * 手机登录
     */
    public onPhoneLogin() {
        const url = HttpClient.URL_LOGIN_BIND;
        let password = this.phonePassword;
        if (this.bangding) {
            this.code = Util.getUrlParam("code");
        }
        if (this.isPwMd5) {
            password = Md5.hashStr(this.phonePassword).toString();
        }
        let param = new LoginRequestModel();
        param.country_code = this.country_code;
        param.username = this.phone;
        param.password = password;
        param.code = this.code;
        param.src_channel = LocalStorageUtil.getSrcChannel();

        localStorage.setItem(LocalStorageUtil.STORAGES_PHONE, this.phone);
        localStorage.setItem(LocalStorageUtil.STORAGES_USERNAME, this.phone);
        localStorage.setItem(LocalStorageUtil.STORAGES_PHONE_PW, password);
        localStorage.setItem(LocalStorageUtil.STORAGES_PW, password);
        this.loginIn(url, param);
    }

    /**
     * 邮箱登录
     */
    public onEmaillLogin() {
        const url = HttpClient.URL_LOGIN_BIND;
        let password = this.emailPassword;
        if (this.bangding) {
            this.code = Util.getUrlParam("code");
        }
        if (this.isPwMd5) {
            password = Md5.hashStr(this.emailPassword).toString();
        }
        let param = new LoginRequestModel();
        param.username = this.email;
        param.password = password;
        param.code = this.code;
        param.src_channel = LocalStorageUtil.getSrcChannel();
        localStorage.setItem(LocalStorageUtil.STORAGES_EMAIL, this.email);
        localStorage.setItem(LocalStorageUtil.STORAGES_USERNAME, this.email);
        localStorage.setItem(LocalStorageUtil.STORAGES_EMAIL_PW, password);
        localStorage.setItem(LocalStorageUtil.STORAGES_PW, password);
        this.loginIn(url, param);
    }

    //   去注册
    public gotoReg() {
        let param = "";
        if (this.logincode) {
            param =
                "platform=" +
                appParam.platform +
                "&code=" +
                this.logincode +
                "&state_html=" +
                this.state_html;
        } else {
            param = "platform=" + appParam.platform;
        }
        JumpWeiXin.gotoReg(param);
    }

    // 忘记密码
    public gotoforget() {
        let param = "";
        if (this.logincode) {
            param =
                "platform=" +
                appParam.platform +
                "&code=" +
                this.logincode +
                "&state_html=" +
                this.state_html;
        } else {
            param = "platform=" + appParam.platform;
        }
        JumpWeiXin.gotoforget(param);
    }

    // 去用户列表
    public gotoNavlist() {
        let param = "platform=" + appParam.platform;
        JumpWeiXin.gotoNavlist(param);
    }

    // 去活动
    public gotoActives(activehtml) {
        let param = "platform=" + appParam.platform;
        JumpWeiXin.gotoActive(activehtml, param);
    }
}

//
let vueC = new Login({}).$mount("#app");
