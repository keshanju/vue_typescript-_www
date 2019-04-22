import {Component, Vue} from 'vue-property-decorator';
import OauthLogin from './OauthLogin.vue';
import {Loading, Notification, Option, Select, OptionGroup} from 'element-ui';
import {LoginProxy} from '@/ts/proxy/LoginProxy';
import GlobalConfig from '../global.config';
import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
import CheckUtil from '@/ts/utils/CheckUtil';
import {ActivityPictureModel} from '@/ts/models/NewsModel';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
Vue.prototype.$notify = Notification;
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Loading);

@Component({
    components: {
        'oauth-login': OauthLogin
    }
})
export default  class Login extends LoginProxy {
    public activityInfo: ActivityPictureModel = new ActivityPictureModel();
    public bannerImg: string = ''; //活动banner图片
    public activeLink: string = ''; //活动URL链接
    public imageHeadUrl: string = '';

    public created() {
        GlobalConfig.log('注册log');
        LocalStorageUtil.saveParam();
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
     * 跳转忘记密码
     */
    public goForgetPwd() {
        this.$emit('toforget')
    }

    /**
     * 跳转注册
     */
    public goRegister() {
        this.$emit('toregister')
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
        //成功完成支付
        this.$emit('logined')
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
     * 改变密码
     */
    public passwordInput(type: number) {
        //TODO...需要验证输入
        this.onPasswordInput(type);
    }

    /**
     * 设置loading状态
     */
    public setLoadingStatuas(b: boolean) {
        this.isLoading = b;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
    }

    /**
     * 设置第三方绑定来源类型
     */
    public setBindUrlTYype() {
        LocalStorageUtil.addthreeBindSource('1')
    }
}
