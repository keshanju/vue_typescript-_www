import '@/assets/css/animate.min.css';
import '@/assets/less/leishen.less';
import '@/assets/less/activity.less';
import 'babel-polyfill';
import { Component, Vue } from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from './util/LsLanguage';
import GlobalConfig from './global.config';
import Util from '@/ts/utils/Util';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { Dialog, Loading } from "element-ui";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import ActivityFactory from "@/ts/factory/activity.factory";
import {
    ActivityDetailRequestModel,
    ActivityDrawModel,
    ActivityModel,
    PresentListRequestModel
} from "@/ts/models/NewsModel";
import HttpClient from "@/ts/net/HttpClient";
import {IdataModel} from "@/ts/models/IdataModel";

Vue.config.productionTip = false;
Vue.use(Loading);

//判断是否跳转移动站点
const mUrl = GlobalConfig.getMobWebBaseUrl() + '/activitys/version5_0.html';
JumpWebUtil.checkMobile(mUrl);

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        'el-dialog': Dialog,
        'download-box': DownloadBox
    }
})
class activityModel extends ActivityProxy {

    // http://localhost:8080/shuangdan.html?id=36&region_code=1&language=zh_CN&account_token=VxHnkvLQZFN1PVvXHgBzuZFZksgKZ0Bk5WcJYox657pvSKgzcgTgUgdb0R3wdL90
    public activity_id = 187;
    public activity_json = ActivityFactory.getInstace('pc',this.activity_id);
    public webParam = WebParamModel.getInstace(); // 浏览器参数
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
     * 初始化中奖列表名单
     */
    public initAwardList() {
        this.awardList = this.awardList.concat(this.awardListTwo);
        if (this.awardList.length <= 4) return;
        $(function () {
            setInterval(function () {
                var $ul = $("#jilu_box");
                $ul.animate({
                    marginTop: "-30px"
                }, 400, function () {
                    $ul.find("li").eq(0).appendTo($ul);
                    $ul.find("li").eq(0).appendTo($ul);
                    $ul.css("margin-top", "0")
                })
            }, 2000);
        });
    }

    /**
     * 获取活动二中奖列表
     */
    public async getAwardListTwo() {
        if (this.activity_id_two == 0) return;
        let url = HttpClient.URL_ACTIVITY_PRESENT_LIST;
        let param = new PresentListRequestModel();
        param.activity_id = this.activity_id_two;
        param.present_type = 0;
        param.size = 50;
        this.backData = await this.http.post<PresentListRequestModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.awardListTwo = this.backData.data.list;
            //昵称问题
            for (var i in this.awardListTwo) {
                let name = '';
                if (name == '' && this.awardListTwo[i]['nickname'] != '') {
                    name = this.awardListTwo[i]['nickname'];
                }
                if (name == '' && this.awardListTwo[i]['mobile_num'] != '') {
                    name = this.awardListTwo[i]['mobile_num'];
                }
                if (name == '' && this.awardListTwo[i]['mail'] != '') {
                    name = this.awardListTwo[i]['mail'];
                }
                if (name == '' && this.awardListTwo[i]['user_name'] != '') {
                    name = this.awardListTwo[i]['user_name'];
                }
                this.awardListTwo[i]['nickname'] = name;
            }
        } else {
        }
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
     *
     */
    public async mounted() {
        window.onscroll = () => {
            this.pageScroll(887);
        };
        this.luck.init('prize','.kx_prize');
        await this.getAwardListTwo();
        this.getAwardList();
    }

    /**
     * 领取黄金红包
     */
    public getGoldPrizeBag() {
        if (this.account_token == '') {
            //提示登录
            $('body').addClass('body_fixed');
            this.dialog_no_login = true;
            return;
        }
        if(this.aCount_two >= 1) {
            $('body').addClass('body_fixed');
            this.dialog_prize_bag_msg = '一个黄金红包，赶紧去拆开红包吧！';
            this.dialog_prize_bag = true;
        }else {
            $('body').addClass('body_fixed');
            this.dialog_recharge_getbag = true;
        }
    }

    /**
     * 领取普通红包
     */
    public getPrizebag() {
        if (this.account_token == '') {
            //提示登录
            $('body').addClass('body_fixed');
            this.dialog_no_login = true;
            return;
        }
        if(this.aCount >= 1) {
            $('body').addClass('body_fixed');
            this.dialog_prize_bag_msg = '一个普通红包，赶紧去拆开红包吧！';
            this.dialog_prize_bag = true;
        }else {
            $('body').addClass('body_fixed');
            this.dialog_recharge_getbag = true;
        }
    }

    /**
     * 关闭领取红包提示充值弹窗
     */
    public closeRechargeGetBagDialog() {
        $('body').removeClass('body_fixed');
        this.dialog_recharge_getbag = false;
    }

    /**
     * 关闭领取红包成功弹窗
     */
    public closePrizeBagDialog() {
        $('body').removeClass('body_fixed');
        this.dialog_prize_bag = false;
        this.dialog_prize_bag_msg = '';
    }

    /**
     * 关闭领取红包成功弹窗
     */
    public goOpenPrizeBag() {
        this.closePrizeBagDialog();
        window.location.href = '#version_roll';
    }

    /**
     * 点击抽奖二
     */
    public onClickDrawTwo() {
        if (this.isBengin) return;
        if (this.account_token == '') {
            //提示登录
            $('body').addClass('body_fixed');
            this.dialog_no_login = true;
            return;
        }
        if (this.aCount_two <= 0) {
            //提示次数不足
            $('body').addClass('body_fixed');
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

    public generateRefercodeLink(refer_code: string) {
        this.refer_code_link = GlobalConfig.getUserBaseUrl() + '/' + JumpWebUtil.HTML_NAME_REGISTER + '?refer_code=' + refer_code;
    }

    /**
     * 登录
     */
    public gotoLogin() {
        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_LOGIN,'to=' + GlobalConfig.getWebBaseUrl() +'/version5_0.html');
    }

    /**
     * 充值
     */
    public gotoRecharge(index: number) {
        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER, 'page=1&package_index='+index);
    }

    /**
     * 兑奖
     */
    public gotoDuijiang(status: number = 0) {
        if (status != 3){
            JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER, 'page=7');
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
        (this.$refs.head as any).checkLogin();
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        this.webParam.language = ln;
    }
}

new activityModel({ i18n }).$mount('#app')
