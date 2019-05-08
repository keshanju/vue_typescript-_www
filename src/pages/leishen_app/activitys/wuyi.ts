import "../css/wap.less";
import '@/assets/less/leishen_app.less';
import './assets/less/wuyi.less';
import 'babel-polyfill';
import {Component, Vue} from 'vue-property-decorator';
import $ from 'jquery';
import GlobalConfig from '../global.config';
import Util from '@/ts/utils/Util';
import VueI18n from "vue-i18n";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import ActivityFactory from "@/ts/factory/activity.factory";
import AppParamModel from "@/ts/models/AppModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import LoginDialog from "./components/LoginDialog";
import RegisterDialog from "./components/RegisterDialog";
import ForgetDialog from "./components/ForgetDialog";
import RechargeDialog from "./components/RechargeDialog";
import RewardDialog from "./components/RewardDialog";

import {Popup} from "vant";
import {LsLanguage} from "@/pages/leishen_app/util/LsLanguage";

Vue.use(Popup);

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);

@Component({
    components: {
        "login-dialog": LoginDialog,
        "register-dialog": RegisterDialog,
        "forget-dialog": ForgetDialog,
        "recharge-dialog": RechargeDialog,
        "reward-dialog": RewardDialog
    }
})
class activityModel extends ActivityProxy {
    public activity_id = 193;
    public activity_json = ActivityFactory.getInstace('mobile', this.activity_id);
    public appParam = AppParamModel.getInstace(); // 浏览器参数

    //  新增参数
    public isLoading: boolean = false; //loading
    public show_login: boolean = false;//登录弹框
    public show_dialog: boolean = false;//登录弹框
    public showType: number = 1;//组件显示次序，1登录 2注册 3忘记密码
    public show_recharge: boolean = false;//支付弹窗
    public show_reward: boolean = false;//兑奖弹窗
    public price_id: number = 10;//价格id
    public package_id: number = 2;//套餐id

    public created() {
        this.activityJson = this.activity_json;
        this.account_token = LocalStorageUtil.getUserToken().account_token;
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getActivityId();
        this.getActivityDetail();
        this.getReferActivitys();
        this.checkEnvironment();//获取当前设备环境
        if (this.account_token == '') {
            this.refer_code = '请先登录!';
            this.refer_code_link = '请先登录!';
        }
    }

    public mounted() {
        this.getAwardList();
        let now_time = new Date().getTime();
        let end_time = new Date(this.activity_json.endtime).getTime();
        if (now_time >= end_time) {
            this.dialog_msg = '活动已过期!';
            this.dialog_error = true;
        }
    }
    /**
     * 设置组件的名字
     */
    get activComponent() {
        switch (this.showType) {
            case 1:
                return 'login-dialog';
                break;
            case 2:
                return 'register-dialog';
                break;
            case 3:
                return 'forget-dialog';
                break;
        }
    }

    /**
     * 跳转到登录界面
     */
    public toLogin(){
        this.showType=1;
    }

    /**
     * 跳转到注册界面
     */
    public toRegister(){
        this.showType=2;
    }

    /**
     * 跳转到忘记密码界面
     */
    public toForgetPwd(){
        this.showType=3;
    }

    /**
     * 检测当前页面环境，微信，手机浏览器（Android+iOS）
     */
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
            } else if (isiOS) {
            }
        });
    }

    /**
     * 选择套餐类型，点击页面相关套餐赋值传参
     */
    public chooserPayType(price_id: number, package_id: number) {
        this.price_id = price_id;
        this.package_id = package_id;
    }

    /**
     * 立即邀请
     */
    public gotoInvite() {
        this.onCloseRecharge();
        window.location.href = "#step1";
    }

    /**
     * 生成推荐码
     * @param refer_code
     */
    public generateRefercodeLink(refer_code: string) {
        this.refer_code_link = GlobalConfig.getUserBaseUrl() + '/' + JumpWebUtil.HTML_NAME_REGISTER + '?refer_code=' + refer_code;
    }

    /**
     * 前往活动记录+去兑奖
     */
    public gotoRecord() {
        if (this.account_token == '') {
            //提示登录
            this.dialog_no_login = true;
            return;
        } else {
            this.show_reward = true;
            (this.$refs.to_reward  as any).loadList();
        }
    }

    /**
     * 登录
     */
    public gotoLogin() {
        this.show_dialog = true;
        this.dialog_no_login = false;
        $('body').removeClass('body_fixed');
    }

    /**
     * 登录成功，父组件事件
     * @param data
     */
    public alreadyLogin(data) {
        if (data == 0) {
            // 关闭登录弹窗
            this.show_dialog = false;
            //需要重新刷新页面，重新获取用户信息，以及对应的活动积分
            // document.execCommand("Refresh");
            window.location.reload();
        }
    }

    /**
     * 默认充值
     */
    public async gotoRecharge() {
        if (this.account_token == '') {
            //提示登录
            this.dialog_no_login = true;
            return;
        } else {
            await (this.$refs.to_recharge as any).getUserInfo();
            //  如果不是微信环境，直接走原先的移动端充值逻辑
            if (this.appParam.platform != 4) {
                this.dialog_recharge = false;
                this.show_recharge = !this.show_recharge;
                $('body').removeClass('body_fixed');
            } else {
                //  如果是微信环境，直接调用子组件的原生微信支付方法
                (this.$refs.to_recharge as any).defaultPay(this.appParam.platform + 1, 2, this.price_id, this.package_id);
            }
        }
    }

    /**
     * token过期
     * @param param
     */
    public tokenExpired(param: string = null): void {
        LocalStorageUtil.loginOut();
        this.account_token = '';
        this.userInfo = null;
        this.show_login = true;
    }

}

new activityModel({i18n}).$mount('#app')
