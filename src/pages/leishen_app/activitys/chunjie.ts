import "../../../assets/less/leishen_app.less";
import "leigod-lib-flexible";
import 'babel-polyfill';
import { Component, Vue } from 'vue-property-decorator';
import $ from "jquery";
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from '../util/LsLanguage';
import GlobalConfig from '../global.config';
import Util from '@/ts/utils/Util';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { Popup } from "vant";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import { IdataModel } from "@/ts/models/IdataModel";
import JumpWeiXin from "@/pages/leishen_app/util/jump";
import AppParamModel from "@/ts/models/AppModel";
import { timeClock } from "@/ts/models/NewsModel";
import Clipboard from "clipboard";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'van-popup': Popup
    }
})
class ShuangDan extends ActivityProxy {

    // http://localhost:8080/shuangdan.html?id=36&region_code=1&language=zh_CN&account_token=VxHnkvLQZFN1PVvXHgBzuZFZksgKZ0Bk5WcJYox657pvSKgzcgTgUgdb0R3wdL90
    public activity_id = 174;
    public activity_type = 8;
    public endtime = "2019-02-21 15:30:00";//活动结束时间
    public appParam = AppParamModel.getInstace(); // 浏览器参数
    //
    public dialog_award: boolean = false;// 中奖纪录
    public dialog_guize: boolean = false;//  默认规则弹框
    public dialog_no_login = false; //未登录弹框
    public dialog_recharge = false; //提示充值
    public dialog_copy_ref_link = false; //复制剪切板
    public dialog_error = false; //错误提示
    public dialog_win = false; //中奖提醒
    public refer_code_link = '请登录';
    public tabIndex = 0;//tab页索引
    public prize_name: string = '';
    public prize_img: string = '';//奖品图片
    public prize_id: number = -1;//中奖id
    public clock = new timeClock();

    //
    public sina_link = 'https://weibo.com/p/1006066443936086/manage?from=page_100606&mod=TAB#place'; //新浪微博
    //
    public dialog_msg: string = ''; // 服务端的msg

    /**
     *
     */
    public mounted() {
        this.getAwardList();
        const that = this;
        setInterval(function () {
            that.clock = Object.assign({}, that.getClock(that.endtime));
        }, 1000)
    }

    /**
     *
     */
    public created() {
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.account_token = LocalStorageUtil.getUserToken().account_token;
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getActivityId();
        this.getActivityDetail();
        this.getReferActivitys();
        this.getReferList(this.activity_type)
        this.getActiveRecordList();
        if (this.account_token == '') {
            this.refer_code = '请先登录!';
            this.refer_code_link = '请先登录!';
        }
    }

    /**
     * 切换tab页
     */
    public changeTabPage(index: number) {
        this.tabIndex = index;
    }

    /**
     * 点击抽奖
     */
    public onClickDraw() {
        this.dialog_win = false;
        if (this.isBengin) return;
        if (this.account_token == '') {
            //提示登录
            $('body').addClass('body_fixed');
            this.dialog_no_login = true;
            return;
        }
        if (this.aCount <= 0) {
            //提示次数不足
            $('body').addClass('body_fixed');
            this.dialog_recharge = true;
            return;
        }
        this.isBengin = true;
        this.onDraw(0, 1000);
    }

    /**
     * 中奖
     */
    public onDrawWin(backData: IdataModel<any>) {
        //计算次数
        this.points = backData.data.points;
        this.isBengin = false;
        this.dialog_win = true;//弹出奖品图片动画
        this.isWin = true;
        this.prize_name = backData.data.title;
        this.getActivityCount();
        this.getActiveRecordList();
    }

    /**
     * 未中奖
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
     * 继续抽奖
     */
    public continueDraw() {
        this.isBengin = false;
        this.isWin = false;
        this.dialog_win = false;
        this.dialog_msg = '';
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
     * 生成链接
     */
    public generateRefercodeLink(refer_code: string) {
        this.refer_code_link = GlobalConfig.getUserBaseUrl() + '/' + JumpWebUtil.HTML_NAME_REGISTER + '?refer_code=' + refer_code;
    }

    /**
     * 复制推荐链接
     */
    public copyRefercodeLink() {
        $('body').addClass('body_fixed');
        if (this.account_token == "") {
            //提示登录
            this.dialog_no_login = true;
            return;
        }
        const that = this;
        let clipboard = new Clipboard("#copyRefercodeLink", {
            text: function () {
                return that.refer_code_link;
            }
        });
        clipboard.on("success", function (e) {
            e.clearSelection();
            that.dialog_error = true;
            that.dialog_msg = '邀请链接已复制到剪切板！快去邀请好友注册充值送点亮福袋吧！';
        });
    }

    /**
     * 复制推荐码
     */
    public copyRefercode() {
        $('body').addClass('body_fixed');
        if (this.account_token == "") {
            //提示登录
            this.dialog_no_login = true;
            return;
        }
        const that = this;
        let clipboard = new Clipboard("#copyRefercode", {
            text: function () {
                return that.refer_code;
            }
        });
        clipboard.on("success", function (e) {
            e.clearSelection();
            that.dialog_error = true;
            that.dialog_msg = '邀请码已复制到剪切板！快去邀请好友注册充值送点亮福袋吧！';
        });
    }

    /**
     * 点击关闭充值提示
     */
    public onCloseRecharge() {
        this.dialog_recharge = false;
        $('body').removeClass('body_fixed');
    }

    /**
     * 关闭提示未登录弹窗
     */
    public onCloseNologin() {
        this.dialog_no_login = false;
        $("body").removeClass("body_fixed");
    }

    /**
     * 关闭dialog
     */
    public closeDialog() {
        this.dialog_msg = '';
        this.dialog_error = false;
        this.dialog_copy_ref_link = false;
        $('body').removeClass('body_fixed');
    }

    /**
     * token过期
     * @param param
     */
    public tokenExpired(param: string = null): void {
        LocalStorageUtil.loginOut();
        this.account_token = '';
    }

    /**
     * 获取中奖列表成功
     */
    public getAwardListSuccess() {
        this.initAwardList();
    }

    /**
     * 初始化中奖列表名单
     */
    public initAwardList() {
        if (this.awardList.length <= 1) return;
        $(function () {
            setInterval(function () {
                let $ul = $("#jilu_box");
                $ul.animate({}, 400, function () {
                    $ul.find("li").eq(0).detach().appendTo($ul)
                })
            }, 2000);
        });
    }

    /**
     * 实现右侧内容滚动 左侧随着高亮
     * @param h 小于这个高度 左侧成绝对定位  否则为固定定位
     * @param num 左侧列表内容数量+1
     */
    public pageScroll(h) {
        let scrT = Util.scroll().top;
        if (scrT < h) {
            this.joinleftfix = 0;
        } else {
            this.joinleftfix = 1;
        }
    }
}

new ShuangDan({ i18n }).$mount('#app')
