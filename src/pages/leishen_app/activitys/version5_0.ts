import '@/assets/less/leishen_app.less';
import './assets/less/version5_0.less';
import 'babel-polyfill';
import { Component, Vue } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';
import { LsLanguage } from '../util/LsLanguage';
import GlobalConfig from '../global.config';
import Util from '@/ts/utils/Util';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import ActivityFactory from "@/ts/factory/activity.factory";
import AppParamModel from "@/ts/models/AppModel";
import JumpWeiXin from "@/pages/leishen_app/util/jump";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import {ActivityDetailRequestModel, ActivityDrawModel, ActivityModel} from "@/ts/models/NewsModel";
import HttpClient from "@/ts/net/HttpClient";
import {IdataModel} from "@/ts/models/IdataModel";
import Load from "../components/Loading.vue";
import {Loading} from "vant";

Vue.config.productionTip = false;
Vue.use(Loading);

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components:{
        'loading': Load
    }
})
class activityModel extends ActivityProxy {

    // http://localhost:8080/shuangdan.html?id=36&region_code=1&language=zh_CN&account_token=VxHnkvLQZFN1PVvXHgBzuZFZksgKZ0Bk5WcJYox657pvSKgzcgTgUgdb0R3wdL90
    public activity_id = 187;
    public activity_json = ActivityFactory.getInstace('mobile',this.activity_id);
    public appParam = AppParamModel.getInstace(); // 浏览器参数
    public activityDetails_two: ActivityModel = null; //活动二详情
    public points_two: number = 0; //我的活动二抽象积分
    public aCount_two: number = 0; // 活动二可抽奖次数
    public activity_id_two: number = 188;// 活动二ID
    public awardListTwo = []; //活动二中奖列表
    public dialog_prize_bag: boolean = false;//领取红包成功弹窗
    public dialog_prize_bag_msg: string = '';//领取红包成功弹窗提示内容
    public dialog_recharge_getbag: boolean = false;//领红包提示充值弹窗
    /**
     *
     */
    public created() {
        this.activityJson = this.activity_json;
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.account_token = LocalStorageUtil.getUserToken().account_token;
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getActivityId();
        this.getActivityDetail();
        this.getActivityTwoDetail();
        this.getReferActivitys();
        if (this.account_token == '') {
            this.refer_code = '请先登录!';
            this.refer_code_link = '请先登录!';
        }
    }

    /**
     *
     */
    public mounted() {
        window.onscroll = () => {
            this.pageScroll(835);
        };
    }


    /**
     * 领取黄金红包
     */
    public getGoldPrizeBag() {
        if (this.account_token == '') {
            //提示登录
            this.dialog_no_login = true;
            return;
        }
        if(this.aCount_two >= 1) {
            this.dialog_prize_bag_msg = '一个黄金红包，赶紧去拆开红包吧！';
            this.dialog_prize_bag = true;
        }else {
            this.dialog_recharge_getbag = true;
        }
    }

    /**
     * 领取普通红包
     */
    public getPrizebag() {
        if (this.account_token == '') {
            //提示登录
            this.dialog_no_login = true;
            return;
        }
        if(this.aCount >= 1) {
            this.dialog_prize_bag_msg = '一个普通红包，赶紧去拆开红包吧！';
            this.dialog_prize_bag = true;
        }else {
            this.dialog_recharge_getbag = true;
        }
    }

    /**
     * 关闭领取红包提示充值弹窗
     */
    public closeRechargeGetBagDialog() {
        this.dialog_recharge_getbag = false;
    }

    /**
     * 关闭领取红包成功弹窗
     */
    public closePrizeBagDialog() {
        this.dialog_prize_bag = false;
        this.dialog_prize_bag_msg = '';
        let aa = document.querySelector('#version_roll');
        aa.scrollIntoView();
    }

    /**
     * 点击抽奖二
     */
    public onClickDrawTwo() {
        if (this.isBengin) return;
        if (this.account_token == '') {
            //提示登录
            this.dialog_no_login = true;
            return;
        }
        if (this.aCount_two <= 0) {
            //提示次数不足
            this.dialog_recharge = true;
            return;
        }
        this.isBengin = true;
        this.isWin = true;//播放动画
        this.onDrawTwo(1000, 1000);
    }

    /**
     * 发送抽奖二请求
     * @param delay_win 成功延迟时间
     * @param delay_lose 失败延迟显示
     */
    public async onDrawTwo(delay_win: number = 0, delay_lose: number = 0) {
        const url = HttpClient.URL_ACTIVITY_DRAW;
        const token = this.account_token;
        let param = new ActivityDrawModel();
        param.activity_id = this.activity_id_two;
        param.account_token = token;
        this.backData = await this.http.post(url, param);
        const that = this;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.awardInfo = this.backData.data;
            setTimeout(function () {
                that.onDrawWinTwo(that.backData);
            }, delay_win);
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            setTimeout(function () {
                that.onDrawLoseTwo(that.backData);
            }, delay_lose);
        }
    }

    /**
     * 活动一中奖
     * TODO... 需要重写此方法
     */
    public onDrawWin(backData: IdataModel<any>) {
        this.isBengin = false;
        this.dialog_win = true;//弹出奖品图片动画
        this.prize_name = backData.data.title;
        this.prize_id = backData.data.present_id;

        //计算次数
        this.points = backData.data.points;
        this.getActivityCount();
        this.getActiveRecordList();
    }

    /**
     * 活动一未中奖
     * TODO... 需要重写此方法
     */
    public onDrawLose(backData: IdataModel<any>) {
        this.isBengin = false;
        this.isWin = false;
        //提示
        this.dialog_error = true;
        this.dialog_msg = backData.msg;
        //计算次数
        this.points = backData.data.points;
        this.getActivityCount();
    }

    /**
     * 活动二中奖
     * TODO... 需要重写此方法
     */
    public onDrawWinTwo(backData: IdataModel<any>) {
        this.isBengin = false;
        this.dialog_win = true;//弹出奖品图片动画
        this.prize_name = backData.data.title;
        this.prize_id = backData.data.present_id;

        //计算次数
        this.points_two = backData.data.points;
        this.aCount_two = Math.floor(this.points_two / this.activityDetails_two.fee);
    }

    /**
     * 活动二未中奖
     * TODO... 需要重写此方法
     */
    public onDrawLoseTwo(backData: IdataModel<any>) {
        this.isBengin = false;
        this.isWin = false;
        //提示
        this.dialog_error = true;
        this.dialog_msg = backData.msg;
        //计算次数
        this.points_two = backData.data.points;
        this.aCount_two = Math.floor(this.points_two / this.activityDetails_two.fee);
    }

    /**
     * 生产推荐码
     * @param refer_code
     */
    public generateRefercodeLink(refer_code: string) {
        this.refer_code_link = GlobalConfig.getUserBaseUrl() + '/' + JumpWebUtil.HTML_NAME_REGISTER + '?refer_code=' + refer_code;
    }

    /**
     * 获取抽奖活动二详情
     */
    public async getActivityTwoDetail() {
        if (this.account_token == '') return;
        if (this.activity_id_two == 0) {
            return;
        }
        let url = HttpClient.URL_ACTIVITY_DETAIL + this.activity_id_two;
        let param = new ActivityDetailRequestModel();
        param.type = 1;
        param.id = this.activity_id_two;
        param.plat_type = 1;
        param.region_code = LocalStorageUtil.getRegionCodes();
        param.account_token = this.account_token;
        this.backData = await this.http.get<ActivityDetailRequestModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.activityDetails_two = this.backData.data.detail as ActivityModel;
            this.points_two = this.backData.data.points;
            this.aCount_two = Math.floor(this.points_two / this.activityDetails_two.fee);
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        }
    }

    /**
     * 兑奖
     */
    public gotoDuijiang() {
        let param = "platform=" + appParam.platform + "&pageIndex=" + 5;
        JumpWeiXin.gotoCenter(param);
    }

    /**
     * 登录
     */
    public gotoLogin() {
        let param = "platform=" + this.appParam.platform;
        JumpWeiXin.gotoLogin(param);
    }

    /**
     * 充值
     */
    public gotoRecharge() {
        let param = "platform=" + this.appParam.platform;
        JumpWeiXin.gotoRecharge(param);
    }

    /**
     * token过期
     * @param param
     */
    public tokenExpired(param: string = null): void {
        LocalStorageUtil.loginOut();
        this.account_token = '';
        this.userInfo = null;
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        this.appParam.language = ln;
    }


}

new activityModel({ i18n }).$mount('#app')
