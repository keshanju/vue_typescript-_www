import "@/assets/less/leishen_pc.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import {Component, Vue} from "vue-property-decorator";
import AppParamModel from '@/ts/models/AppModel';
import VueI18n from "vue-i18n";
import {LsLanguage} from "@/pages/leishen_pc/util/LsLanguage";
import PayDialog from "./components/PayDialog.vue";
import GlobalConfig from "@/pages/leishen_pc/global.config";
import RechargeProxy from "@/ts/proxy/RechargeProxy";
import {Dialog, Message} from "element-ui";
import HttpClient from '@/ts/net/HttpClient';
import {UserInfo} from '@/ts/models/UserModel';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import CdKey from './components/CdKey.vue';

Vue.use(Dialog);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;
//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
    components: {
        "pay-dialog": PayDialog,
        'el-dialog': Dialog,
        'cdkey': CdKey
    }
})
class Recharge extends RechargeProxy {
    public payDialogVisible: boolean = false; //支付弹窗
    public appParam: AppParamModel = AppParamModel.getInstace();
    public imageHeadUrl: string = "";//图片根路径
    public webUrl: string = '';//网站静态资源根地址
    public serviceAgreen: boolean = false;//是否勾选会员服务条款
    public account_token: string = '';
    public account_out: boolean = false;//未登录或者token失效
    public payUserNum: number = 0;//首冲活动参与人数
    public is_in_shouchong: boolean = true;//是否在首冲活动时间内
    public start_time: string = '';//首单特惠开始时间
    public end_time: string = '';//首单特惠结束时间
    public sc_timer = null;
    public cdKeyDialogVisible: boolean = false;//cdkey弹窗
    public jiaobiao_obj = {};//角标显示配置

    public created() {
        if(Util.getUrlParam("account_token") == '' || Util.getUrlParam("account_token") == undefined){
            this.account_out = true;
        };
        this.priceIndex = Number(Util.getUrlParam('priceIndex'));
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getDownloadUrl();
        this.getUserInfo();
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.webUrl = GlobalConfig.getWebBaseUrl();
        this.onChoosePayType(2);
    }

    /**
     * 获取首冲特惠活动时间
     * @param url
     */
    public async getDownloadUrl() {
        const jsonConfig = await ConfigUtil.getInstance().download(false);
        this.start_time = jsonConfig.leigod.xianshi_activity.start_time;
        this.end_time = jsonConfig.leigod.xianshi_activity.end_time;
        this.jiaobiao_obj = jsonConfig.leigod.jiaobiao_is_show;
        this.getSystemTime();
    }

    /**
     * 获取系统时间成功
     */
    public getSystemTimeSuccess(){
        let startDate = new Date(this.start_time).getTime();
        let endDate = new Date(this.end_time).getTime();
        let nowDate = new Date(this.now_time).getTime();
        if(nowDate < startDate || nowDate > endDate) {
            this.is_in_shouchong = false;
            return;
        };
        this.payUserNum = Util.getPayUserNum(this.start_time,this.now_time,15);
        console.log(this.start_time)
        const that = this;
        this.sc_timer = setInterval(()=>{
            let num = Math.round((Math.random()*90 + 30)/60);
            that.payUserNum += num;
            let end = new Date(that.end_time).getTime();
            let now = new Date().getTime();
            if(now >= end) {
                clearInterval(that.sc_timer)
            }
        },6000)
    }

    /**
     * 套餐hover效果
     */
    public choosePriceIndex(index: number) {
        this.priceHoverIndex = index;
    }

    /**
     * 套餐hover效果
     */
    public restorePriceIndex() {
        this.priceHoverIndex = this.priceIndex;
    }

    /**
     * 未登录状态点击套餐中的立即购买
     */
    public clickLogin(index: number){
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.openLogin(index);
    }

    /**
     * 点击请求支付
     */
    public clickPay() {
        if (!this.serviceAgreen) {
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SERVICE_AGREEN),
                type: 'warning'
            });
            return;
        }
        // if (this.payType == 2) {
        //     this.onPay(this.appParam.platform + 1, 3);
        // } else {
            this.onPay(this.appParam.platform + 1);
        // }
    }

    /**
     *  关闭支付弹窗
     */
    public closePayDialog() {
        this.payDialogVisible = false;
        this.payObj.pay_url = '';
    }

    /**
     * 打开cdkey弹窗
     */
    public openCdkey(){
        this.cdKeyDialogVisible = true;
    }

    /**
     * 关闭cdkey弹窗
     */
    public closeCdkey(){
        this.cdKeyDialogVisible = false;
        (this.$refs.cdkey as any).closeCdkeyReset();
    }

    /**
     * 打开支付弹窗
     */
    public onOpenPyaDialog() {
        this.payDialogVisible = true;
    }

    /**
     * 请求支付成功
     */
    onBeginpaySuccess() {
        // paypal支付自动打开页面
        if (this.payType == 5) {
            const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
            factory.jumpUrl(this.payObj.pay_url);
        }else {
            this.payObj.payType = this.payType;
            (this.$refs.payDialogCom as any).init();
            this.payDialogVisible = true;
        }
    }

    /**
     * 请求支付失败
     * TODO... 此方法可以重写，处理请求支付成功后的ui逻辑
     */
    onBeginpayError(msg: string) {
        this.$message({
            message: msg,
            type: 'warning'
        });
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
                this.tokenExpired();
            }
        } catch (e) {
            // JumpWebUtil.backHome();
        }
    }

    /**
     * 获取套餐成功
     */
    public getUserPackageSuccess() {
        if (this.userInfo.is_switch_package == 0) {
            this.onChoosePackageTypeA(null);
        } else {
            for (var i = 0; i < this.packageList.length; i++) {
                if (this.packageList[i].include_region_codes == this.appParam.region_code + '') {
                    this.onChoosePackageTypeA(i);
                }
            }
        }
    }

    /**
     * 选择套餐类型
     */
    public onChoosePackageTypeA(type: any = null) {
        if (this.packageList.length <= 0) return;
        this.onChoosePackageType(type);
    }

    /**
     * 支付成功
     */
    public paySuccess() {

    }

    /**
     * 跳转会员服务条款
     */
    public goUserserver() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = GlobalConfig.getWebBaseUrl() + '/' + JumpWebUtil.HTML_NAME_USERSERVER;
        let search = window.location.search;
        url = url + search;
        console.log(url)
        factory.jumpUrl(url);
    }

    /**
     * token过期处理
     * @param param
     */
    public tokenExpired(param: string = ''): void {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.loginExpire();
    }
}

new Recharge({
    i18n
}).$mount("#app");