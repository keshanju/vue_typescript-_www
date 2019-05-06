import "../../../assets/less/leishen_app.less";
import "leigod-lib-flexible";
import 'babel-polyfill';
import {Component, Vue} from 'vue-property-decorator';
import $ from "jquery";
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import {LsLanguage} from '../util/LsLanguage';
import GlobalConfig from '../global.config';
import Util from '@/ts/utils/Util';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {Popup} from "vant";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import {IdataModel} from "@/ts/models/IdataModel";
import JumpWeiXin from "@/pages/leishen_app/util/jump";
import AppParamModel from "@/ts/models/AppModel";

Vue.config.productionTip = false;
Vue.use(Popup);

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
    public activity_id = 36;
    public appParam = AppParamModel.getInstace(); // 浏览器参数
    //
    public dialog_award: boolean = false;// 中奖纪录
    public dialog_guize: boolean = false;//  默认规则弹框
    public dialog_no_login = false; //未登录弹框
    public dialog_recharge = false; //提示充值
    public dialog_copy_ref_link = false; //复制剪切板
    public dialog_error = false; //错误提示
    public dialog_win = false; //中奖提醒
    public refer_code_txt = '请登录';
    //
    public sina_link = 'https://weibo.com/p/1006066443936086/manage?from=page_100606&mod=TAB#place'; //新浪微博
    //
    public dialog_msg: string = ''; // 服务端的msg

    /**
     *
     */
    public mounted() {
        window.onscroll = () => {
            this.pageScroll(930);
        };
        this.getAwardList();
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
    }

    /**
     * 点击查看中奖纪录
     */
    public onClickAward() {
        this.dialog_award = true;
        this.getActiveRecordList(1, 4);
    }

    /**
     * 点击查看活动详情
     */
    public onClickGuize() {
        this.dialog_guize = true;
    }

    /**
     * 点击抽奖
     */
    public onClickDraw() {
        if (this.isBengin) return;
        if (this.aCount <= 0) {
            //提示次数不足
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
        //播放奖品动画
        this.isWin = true;
        //计算次数
        this.points = backData.data.points;
        this.getActivityCount();
        //弹出提示
        const that = this;
        setTimeout(function () {
            that.dialog_win = true;
            that.dialog_msg = backData.data.title;
        }, 200);
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
        this.refer_code_txt = '邀请码： ' + refer_code;
        this.refer_code = GlobalConfig.getUserBaseUrl() + '/' + JumpWebUtil.HTML_NAME_REGISTER + '?refer_code=' + refer_code;
    }

    /**
     * 复制链接
     */
    public copyRefercodeLink() {
        if (this.account_token == '') {
            //提示登录
            this.dialog_no_login = true;
            return;
        }
        Util.copyToClipboard(this.refer_code);
        this.dialog_copy_ref_link = true;
    }

    /**
     * 关闭dialog
     */
    public closeDialog() {
        this.dialog_msg = '';
        this.dialog_error = false;
        this.dialog_copy_ref_link = false;
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
        if (this.awardList.length <= 14) return;
        $(function () {
            setInterval(function () {
                var $ul = $("#sd_mb_history_box ul");
                $ul.animate({
                    marginTop: "-18px"
                }, 400, function () {
                    $ul.find("li").eq(0).appendTo($ul)
                    $ul.css("margin-top", "0")
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

new ShuangDan({i18n}).$mount('#app')
