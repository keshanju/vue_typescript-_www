import '@/assets/css/bohe_app.css';
import "leigod-lib-flexible";
import RechargeProxy from '@/ts/proxy/RechargeProxy';
import {Component, Vue} from 'vue-property-decorator';
import {LanguageConfig} from '@/ts/utils/Language';
import AppParamModel from '@/ts/models/AppModel';
import Explain from "./components/Explain.vue"
import PayDialog from './components/PayDialog.vue';
import GlobalConfig from './global.config';
import {Dialog, Loading, Toast} from "vant";
import {ExtrnalFactory} from "@/ts/factory/ExtrnalFactory";
import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
import "babel-polyfill";
import HttpClient from '@/ts/net/HttpClient';
import { UserInfo, PayConfigModel } from '@/ts/models/UserModel';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import Util from '@/ts/utils/Util';
import VueI18n from "vue-i18n";
import { TdappModel } from '@/ts/models/TdappModel';
import ConfigUtil from "@/ts/utils/ConfigUtil";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

Vue.use(Toast);
Vue.use(Loading);

@Component({
    components: {
        'explain': Explain,
        "user-paydialog": PayDialog
    }
})
class Recharge extends RechargeProxy {

    public appParam: AppParamModel = AppParamModel.getInstace();
    public payDialogVisible: boolean = false;
    public bgImg: string = 'images/bg_img.jpg';
    public imageHeadUrl: string = "";
    public setSecondPasswordShow: boolean = true;//是否关闭二级密码提示
    public webUrl: string = '';
    public payShowConfig: PayConfigModel = new PayConfigModel();//支付方式显示配置

    public created() {
        this.changeBg();
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getUserInfo();
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.webUrl = GlobalConfig.getWebBaseUrl();
    }

    /**
     * token过期的处理
     */
    public tokenExpired() {
        LocalStorageUtil.loginOut();
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.loginExpire();
    }

    /**
     *
     */
    public mounted() {
        this.getPayShowConfig();
    }

    /**
     * 获取下载url
     * @param url
     */
    public async getPayShowConfig() {
        const jsonConfig = await ConfigUtil.getInstance().download();
        this.payShowConfig = jsonConfig.bohe.pay;
    }

    /**
     * 获取用户详细信息
     */
    public async getUserInfo() {
        try {
            let token = this.appParam.account_token;
            const url = HttpClient.URL_USER_INFO;
            const param = {
                account_token: token,
            };
            this.backData = await this.http.post<UserInfo>(url, param);
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.userInfo = this.backData.data;
                this.getUserPackage();
            } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
                JumpWebUtil.backHome();
            }
        } catch (e) {
            JumpWebUtil.backHome();
        }
    }

    /**
     * 关闭二级密码提示
     */
    public closeSecondPasswordNotice() {
        this.setSecondPasswordShow = true;
    }

    /**
     * 跳转设置二级密码
     * @param type 
     */
    public goSetSecondPwd(){
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = JumpWebUtil.getWebHeadUrl(this.webUrl, this.appParam);
        url = url + JumpWebUtil.HTML_NAME_USER + '?page=2' + '&account_token=' + this.appParam.account_token;
        factory.jumpUrl(url);
    }

    /**
     * 获取套餐成功
     */
    public getUserPackageSuccess() {
        this.onChoosePackageTypeA(null);
        let tdModel = new TdappModel();
        // @ts-ignore
        TDAPP.onEvent(Util.WINDOWS_GET_PACKAGE, Util.PAY, tdModel);
    }

    /**
     * 选择套餐类型
     */
    public onChoosePackageTypeA(type: any = null) {
        if (this.packageList.length <= 0) return;
        if (type == 3) {
            this.czTypeIndex = type;
            this.isShow = 2;
            return;
        }
        this.onChoosePackageType(type);
    }

    /**
     * 动态更换背景
     */
    public changeBg() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        const img = factory.getbackground(0);
        if (img != '') {
            this.bgImg = img;
        }
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln, false);
        i18n.locale = lang.locale;
        GlobalConfig.log('切换语言:' + lang.locale);
    }

    /**
     * 点击支付
     */
    clickPay() {
        this.onPay(this.appParam.platform + 1);
    }

    /**
     * 请求支付成功
     */
    onBeginpaySuccess() {
        let tdModel = new TdappModel();
        tdModel.pay_type = this.payType;
        tdModel.package_name = this.payObj.package_title;
        tdModel.getBrowser();
        // @ts-ignore
        TDAPP.onEvent(Util.WINDOWS_CLICK_PAY, Util.PAY, tdModel);
        // paypal支付自动打开页面
        if(this.payType == 5) {
            const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
            factory.jumpUrl(this.payObj.pay_url);
        }
        this.payObj.payType = this.payType;
        this.payDialogVisible = true;
        (this.$refs.payDialogCom as any).init();
    }

    /**
     * 请求支付失败
     */
    onBeginpayError(msg: string) {
        Toast(msg);
    }

    /**
     * 打开支付
     */
    public onOpenPyaDialog() {
        this.payDialogVisible = true;
    }

    /**
     * 关闭支付弹窗
     */
    public onClosePyaDialog() {
        this.payDialogVisible = false;
    }

    /**
     * 支付成功
     */
    public paySuccess() {
        let tdModel = new TdappModel();
        tdModel.pay_type = this.payType;
        tdModel.getBrowser();
        // @ts-ignore
        TDAPP.onEvent(Util.WINDOWS_CLICK_PAY_SUCCESS, Util.PAY, tdModel);
        this.payDialogVisible = false;
        Dialog.alert({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
            message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PAY_PACKAGE_SUCCESS)
        }).then(() => {
            Dialog.close();
            if (this.packageList[this.czTypeIndex].package_level == Util.PACKAGE_LEVEL_2 && this.userInfo.is_set_admin_pass == 0){
                this.setSecondPasswordShow = false;
            }
        });
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.rechargeSuccess();
    }
}

new Recharge({
    i18n
}).$mount('#app');