import { Vue, Component } from 'vue-property-decorator';
import "babel-polyfill";
import Header from './components/Headnav.vue';
import Footer from './components/Footer.vue';
import { Input, Checkbox, Row, Col, Upload, Message, Cascader,Alert, MessageBox } from "element-ui";
import XmlHttpClient from '@/ts/net/XmlHttpClient';
import './less/leigodwangba.less';
import axios from "axios";
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Cascader);
 Vue.use(Alert);
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
import { RegRequestModel, SmsCaptchaRequestModel, SmsCaptchaModel, PhoneFindPwdRequestModel } from './model/userModel';
import { XmlDataModel } from '@/ts/models/IdataModel';
import { ImgCaptchaRequestModel, ImgCaptchaModel } from './model/RegModel';
import GlobalConfig from './global_config';
import CheckUtil from '@/ts/utils/CheckUtil';
import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';
import { LanguageConfig } from '@/ts/utils/Language';
import LocalStorageUtil from './LocalStorageUtil';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import Util from '@/ts/utils/Util';
import { UserUtil } from './UserUtil';
let lang = new LanguageConfig();
lang.initNoRefresh();
@Component({
    components: {
        'header-nav': Header,
        'footer-nav': Footer,
    }
})
export default class Login extends Vue {
    public username: string = '';
    public password: string = '';
    public imgCaptchaM: ImgCaptchaModel = new ImgCaptchaModel(); // 图形验证码model
    public imgCaptchaKey: string = '';//图形验证码key
    public smscode: string = ''; // 短信验证码
    public imageUrl: string = '';//上传logo图片
    public checkcode: string = ''// 图形验证码


    // 公共参数
    public xmlHttp: XmlHttpClient = new XmlHttpClient();
    backData: any;
    public smsCountDownNum: number = 0;
    isLoading: boolean;
    notifMessage: string;
    public setBaseUrl(url: string): void {
        this.xmlHttp.setBaseUrl(url);
    }

    created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.onGetCaptcha();
        this.username=localStorage.getItem('phone')
    }

    //用户注册部分
    /**
      * 获取图形验证码
      */
    public async onGetCaptcha() {
        const url = XmlHttpClient.GETCHECK_CODE;
        const param = new ImgCaptchaRequestModel();
        this.backData = await this.xmlHttp.get<ImgCaptchaModel>(url, param);
        if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
            this.imgCaptchaM = this.backData;
            this.imgCaptchaKey = this.imgCaptchaM.key;
        }
    }

    /**
     *  刷新图形验证码
    */
    public getCaptcha() {
        //TODO...需要验证输入
        this.onGetCaptcha();
    }

    /**
    * 获取短信验证码
    */
    public onSmsCode() {
        //验证手机号
        if (!CheckUtil.checkPhone(this.username)) {
            if (this.username == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                this.$message.error(this.notifMessage);
                return false;
            }
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
            this.$message.error(this.notifMessage);
            return false;
        }

        //验证图形验证码
        if (!CheckUtil.checkimgVerificatioCode(this.checkcode)) {
            if (this.checkcode == "") {
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
                this.$message.error(this.notifMessage);
                return false;
            }
            this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
            this.$message.error(this.notifMessage);
            return false;
        }
        this.GetSmscode();
    }
    /**
    * 获取短信验证码
    */
    public async GetSmscode() {
        let url = XmlHttpClient.DOSENDPWDSMS;
        let param = new SmsCaptchaRequestModel();
        param.key = this.imgCaptchaKey;
        param.tel = this.username;
        param.regcode = this.checkcode;
        //loading
        this.isLoading = true;
        //
        this.backData = await this.xmlHttp.post<SmsCaptchaModel>(url, param);
        this.isLoading = false;
        if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
            // 正确返回
            // 倒计时
            this.smsCountDownNum = 60;
            const sefl = this;
            Util.countDown(this.smsCountDownNum, 1, (n: number) => {
                sefl.smsCountDownNum = n;
            });

        } else {
            // 获取图形验证码
            this.$message.error(this.backData.msg);
            setTimeout(() => {
                this.onGetCaptcha();
            }, 500)
        }
    }
    
    /**
   * 点击找回密码
   */
    public clickFindPassword() {
            //验证手机号
            if (!CheckUtil.checkPhone(this.username)) {
                if (this.username == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                    this.$message.error(this.notifMessage);
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
                this.$message.error(this.notifMessage);
                return false;
            }
            //验证图形验证码
            if (!CheckUtil.checkimgVerificatioCode(this.checkcode)) {
                if (this.checkcode == "") {
                        this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY)
                        this.$message.error(this.notifMessage);
                        return false;
                    }
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR)
                    this.$message.error(this.notifMessage);
                    return false;
                }

            //验证短信验证码
            if (!CheckUtil.checkSmscode(this.smscode)) {
                if (this.smscode == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY)
                     this.$message.error(this.notifMessage);
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR)
                 this.$message.error(this.notifMessage);
                return false;
            }

            //验证密码
            if (!CheckUtil.checkPwd(this.password)) {
                if (this.password == "") {
                    this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY)
                     this.$message.error(this.notifMessage);
                    return false;
                }
                this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR)
                 this.$message.error(this.notifMessage);
                return false;
            }

            this.onPhoneFindPassword();

        }

      

    /**
     * 密码找回成功
     * TODO... 此方法可以重写，处理登录成功后的ui逻辑
     */
    onFindPwdSuccess() {
        this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_FINDPWD)
        this.$alert(this.notifMessage, '', {
            confirmButtonText: '返回登录',
            type: 'success',
            center: true,
            customClass:'forgetDiaBox',
            callback: action => {
                if (action === 'confirm'){
                    UserUtil.loginOut()
                    JumpWebUtil.backLogin()
                }
            }
        });
    }

    onFindPwdFaild(backData: any): any {
        this.$message.error(this.backData.msg);
    }


    /**
        * 手机号码找回密码
        */
    public onPhoneFindPassword() {
        const url = XmlHttpClient.DOCHANGEPASAWORD;
        let param = new PhoneFindPwdRequestModel();
        param.key = this.imgCaptchaKey;
        param.tel = this.username;
        param.newpassword = this.password;
        param.smscode = this.smscode;
        this.onRetrieve(url, param)
    }

    /**
   * 请求找回密码
   */
    public async onRetrieve(url: string, param: any) {
        this.isLoading = true;
        this.backData = await this.xmlHttp.post(url, param);
        if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
            this.isLoading = false;
            localStorage.removeItem(LocalStorageUtil.STORAGES_USERNAME);
            localStorage.removeItem(LocalStorageUtil.STORAGES_PW);
            this.onFindPwdSuccess()
        } else {
            this.isLoading = false;
            // 错误返回
            this.onFindPwdFaild(this.backData);
            this.onGetCaptcha();
        }
    }

}

new Login({

}).$mount('#login');