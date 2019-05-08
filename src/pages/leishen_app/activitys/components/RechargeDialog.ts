import "@/assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import {Component, Vue} from "vue-property-decorator";
import RechargeProxy from "@/ts/proxy/RechargeProxy";
import AppParamModel from "@/ts/models/AppModel";
import GlobalConfig from "../../global.config";
import HttpClient from "@/ts/net/HttpClient";
import {UserInfo, PayRequestModel, PayModel} from "@/ts/models/UserModel";
import {IdataModel} from "@/ts/models/IdataModel";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {ExtrnalFactory} from "@/ts/factory/ExtrnalFactory";
import Util from "@/ts/utils/Util";
import {TipsMsgUtil} from "@/ts/utils/TipsMsgUtil";
import {Popup, Toast, Loading} from "vant";

Vue.use(Popup);
Vue.use(Toast);
Vue.use(Loading);

Vue.config.productionTip = false;

const appParam: AppParamModel = AppParamModel.getInstace(
    Util.REGION_CODE_1,
    Util.ZH_CN
);

@Component({})
export default class RechargeDialog extends RechargeProxy {
    //  新增参数
    public show: boolean = false; //支付方式弹窗
    public discountshow: boolean = false;//优惠券选择弹窗
    public isGetUserInfo: boolean = false;//阻止多次获取用户信息

    //  默认传递的套餐、价格ID
    public price_id: number = 10;
    public package_id: number = 2;

    public http = new HttpClient();
    public appParam: AppParamModel = AppParamModel.getInstace();
    public backData: IdataModel<any> | undefined;

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
    }

    /**
     * 设置数据请求相关接口BASEURL的方法，初始化时调用
     * @param url
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 获取用户详细信息
     */
    public async getUserInfo() {
        try {
            if (this.isGetUserInfo) return;//获取用户信息成功后，不再重复获取
            let token = this.appParam.account_token;
            if (token == "" || token == null) {
                token = LocalStorageUtil.getUserToken().account_token;
            }
            const url = HttpClient.URL_USER_INFO;
            const param = {
                account_token: token
            };
            this.backData = await this.http.post<UserInfo>(url, param);
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.userInfo = this.backData.data;
                await this.getUserPackage();
            } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
                this.tokenExpired();
            }
        } catch (e) {
            this.tokenExpired();
        }
    }

    /**
     * 获取套餐成功
     * TODO... 需重写此方法
     */
    public getUserPackageSuccess() {
        this.isGetUserInfo = true;
    }

    /**
     * 选择支付方式
     */
    public onChooseAndPay(type: number) {
        this.onChoosePayType(type);//1微信， 2支付宝
        this.onPay(this.appParam.platform + 1, 2);
    }

    /**
     * 默认微信支付方式
     * @param from 订单来源
     * @param plan 平台类型
     * @param price_id
     * @param package_id
     */
    public defaultPay(from: number, plan: number, price_id: number, package_id: number) {
        this.price_id = price_id;
        this.package_id = package_id;
        this.payType = 1;
        this.onPay(from, plan)
    }

    /**
     * from 订单来源 0官网 1PC客户端 2IOS客户端 3Android客户端 4Apple 5注册赠送订单  6mac客户端 7微信公众号(备注：转换后的值)
     * plan 支付返回的二维码显示方式 1官网二维码 2移动端需要的二维码 3官网pc端支付宝打开的控制台页面
     * 请求支付
     */
    public async onPay(from: number = 0, plan: number = 1) {
        let that = this;
        if (this.packageList == null || this.packageList.length <= 0) return;
        this.isLoading = true;
        const url = HttpClient.URL_USER_PACKAGE_BUY;
        const token = LocalStorageUtil.getUserToken().account_token;
        let param = new PayRequestModel();
        param.account_token = token;
        param.invoice_from = param.switchFrom(from);
        param.package_id = this.package_id;
        param.pay_type = this.payType;
        param.price_id = this.price_id;
        param.pay_plat = plan;
        param.src_channel = LocalStorageUtil.getSrcChannel();
        param.os_type = localStorage.getItem(LocalStorageUtil.STORAGES_OS_TYPE);
        if (this.zheCode != "" && this.zheCode != null) {
            param.discount_code = this.zheCode;
        }
        //
        this.backData = await this.http.post<PayModel>(url, param);
        this.isLoading = false;
        this.payObj.pay_url = '';
        //
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.payObj = this.backData.data;
            this.onBeginpaySuccess();
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else if (this.backData.code == HttpClient.HTTP_ERROR_WX_NOBIND) {
            this.onBeginpayError('系统检测到您未绑定公众号，将自动为您跳转至登录页进行绑定...');
            setTimeout(function () {
                that.gotologin();
            }, 2000)
        } else {
            this.onBeginpayError(this.backData.msg);
        }
    }

    /**
     * 请求支付成功
     */
    public onBeginpaySuccess() {
        if (this.appParam.platform === 4) {
            this.initWxConfig(this.payObj.pay_url);
        } else {
            const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
            window.location.href = this.payObj.pay_url;
        }
    }

    /**
     * 请求支付失败
     */
    public onBeginpayError(msg: string) {
        Toast.fail(msg);
    }

    /**
     * 初始化微信jsSDK
     */
    public async initWxConfig(payObj: any) {
        const url = HttpClient.URL_WAP_WX_SIGN;
        const param = {};
        this.backData = await this.http.post<UserInfo>(url, param);
        let data = this.backData.data;
        if (!data.appId) {
            Toast('微信服务器繁忙，请稍后...')
        }
        // @ts-ignore
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: (data.timestamp).toString(), // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: ["closeWindow", "chooseWXPay"] // 必填，需要使用的JS接口列表
        });

        const that = this;
        // @ts-ignore
        wx.ready(function () {
            that.onWxGzhPay(payObj);
        });
    }

    /**
     * 微信公众号支付
     */
    public onWxGzhPay(payData: any) {
        // @ts-ignore
        wx.chooseWXPay({
            timestamp: payData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: payData.nonceStr, // 支付签名随机串，不长于 32 位
            package: payData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: payData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: payData.paySign, // 支付签名
            success: function (res) {
                Toast("充值成功!");
            }
        });
    }

    /**
     * token过期的处理
     */
    public tokenExpired() {
        let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
        Toast(tipMsg);
        setTimeout(() => {
            this.gotologin();
        }, 3000);
    }

    /**
     *  去登录
     */
    public gotologin() {
        this.$emit("tologin")
    }
}
