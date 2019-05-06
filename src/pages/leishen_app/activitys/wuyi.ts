import '@/assets/less/leishen_app.less';
import './assets/less/wuyi.less';
import 'babel-polyfill';
import {Component, Vue} from 'vue-property-decorator';
import $ from 'jquery';
import GlobalConfig from '../global.config';
import Util from '@/ts/utils/Util';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import ActivityFactory from "@/ts/factory/activity.factory";
import AppParamModel from "@/ts/models/AppModel";
import JumpWeiXin from "@/pages/leishen_app/util/jump";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import LoginDialog from "./components/LoginDialog.vue";
import RechargeDialog from "./components/RechargeDialog.vue";

import {Popup } from "vant";
Vue.use(Popup );

Vue.config.productionTip = false;

const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);

@Component({
    components: {
        "login-dialog": LoginDialog,
        "recharge-dialog": RechargeDialog
    }
})
class activityModel extends ActivityProxy {
    public activity_id = 193;
    public activity_json = ActivityFactory.getInstace('mobile', this.activity_id);
    public appParam = AppParamModel.getInstace(); // 浏览器参数

    //  新增参数
    public show_login: boolean = false;//登录弹框
    public show_recharge: boolean = false;//支付弹窗
    public price_id:number = 10;//价格id
    public package_id:number = 2;//套餐id

    public created() {
        this.activityJson = this.activity_json;
        this.account_token = LocalStorageUtil.getUserToken().account_token;
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getActivityId();
        this.getActivityDetail();
        this.getReferActivitys();
        this.checkEnvironment();//获取当前设备环境
        if (this.account_token == '') {
            this.show_login = true;
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
            this.show_login = true;
        } else {
            let param = "platform=" + this.appParam.platform + "&pageIndex=5";
            JumpWeiXin.gotoCenter(param);
        }
    }

    /**
     * 登录
     */
    public gotoLogin() {
        this.show_login = true;
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
            this.show_login = false;
            //需要重新刷新页面，重新获取用户信息，以及对应的活动积分
            // document.execCommand("Refresh");
            window.location.reload();
        }
    }

    /**
     * 默认充值
     */
    public gotoRecharge() {
        if (this.account_token == '') {
            // 提示登录
            this.show_login = true;
        } else {
            //  如果不是微信环境，直接走原先的移动端充值逻辑
            if (this.appParam.platform != 4) {
                this.dialog_recharge = false;
                this.show_recharge = !this.show_recharge;
                $('body').removeClass('body_fixed');
            } else {
                //  如果是微型环境，直接调用子组件的原生微信支付方法
                this.wechatPay(this.appParam.platform + 1, 2);
            }
        }
    }

    /**
     * 微信支付
     */
    public wechatPay(from: number, plan: number) {
        (this.$refs.to_recharge as any).defaultPay(from, plan, this.price_id, this.package_id);
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

new activityModel({}).$mount('#app')
