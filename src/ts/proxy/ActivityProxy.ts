import Component from "vue-class-component";
import Vue from "vue";
import {IProxy} from "@/ts/interface/IProxy";
import HttpClient from "@/ts/net/HttpClient";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {
    ActivityDetailRequestModel,
    ActivityDrawModel,
    ActivityModel,
    PresentListRequestModel,
    referList,
    referOutput, timeClock
} from "@/ts/models/NewsModel";
import {IdataModel} from "@/ts/models/IdataModel";
import Util from "@/ts/utils/Util";
import {
    ActiveRecordListModel,
    ActiveRecordRequestModel,
    ReferCodeModel,
    ReferCodeRequestModel
} from "@/ts/models/UserModel";
import Clipboard from "clipboard";
import $ from "jquery";
import {Luck} from "@/ts/models/Luck.ts";

@Component
export default class ActivityProxy extends Vue implements IProxy {

    public activity_id = 0; // 双蛋活动id
    public activityJson = null;
    public account_token: string = ''; //token
    public awardList = []; //中奖列表
    public userInfo = LocalStorageUtil.getUserInfo(); //userInfo
    public activityDetails: ActivityModel = null; //活动详情
    public points: number = 0; //我的抽象积分
    public aCount: number = 0; // 可抽奖次数
    public refer_code: string = '邀请码'; //邀请码
    public isBengin = false; //是否开始抽奖
    public isWin = false; // 是否中奖
    public awardInfo = null; //奖品数据
    public awardRecordList = []; //我的中奖列表
    public myReferList: Array<referOutput> = [];
    public clock = new timeClock();

    // ui参数
    public dialog_award: boolean = false;// 中奖纪录
    public dialog_guize: boolean = false;//  默认规则弹框
    public dialog_no_login = false; //未登录弹框
    public dialog_recharge = false; //提示充值
    public dialog_copy_ref_link = false; //复制剪切板(推荐链接)
    public dialog_copy_ref: boolean = false;//复制剪切板(推荐码)
    public dialog_error = false; //错误提示
    public dialog_win = false; //中奖提醒
    public refer_code_link: string = '邀请链接';
    public tabIndex = 0;//tab页索引
    public prize_name: string = '';
    public prize_img: string = '';//奖品图片
    public prize_id: number = -1;//中奖id
    public dialog_msg: string = ''; // 服务端的msg
    public joinleftfix: number = 0; //用户分享页面右侧固定 0 不固定  1固定
    public luck: Luck = new Luck();

    // 公共参数
    public http: HttpClient = new HttpClient();
    public imageHeadUrl: string = '';
    public userUrl: string = '';
    public webUrl: string = '';
    public backData: IdataModel<any> | undefined;

    public execute(): void {
    }

    /**
     *
     */
    public init(): void {
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    public tokenExpired(param: string = null): void {
    }

    /**
     * 读取活动id
     */
    public getActivityId() {
        const id = Util.getUrlParam('id');
        if (id != '') this.activity_id = parseInt(id);
    }

    /**
     * 获取中奖列表
     */
    public async getAwardList() {
        if (this.activity_id == 0) return;
        let url = HttpClient.URL_ACTIVITY_PRESENT_LIST;
        let param = new PresentListRequestModel();
        param.activity_id = this.activity_id;
        param.present_type = 0;
        param.size = 50;
        this.backData = await this.http.post<PresentListRequestModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.awardList = this.backData.data.list;
            //昵称问题
            for (var i in this.awardList) {
                let name = '';
                if (name == '' && this.awardList[i]['nickname'] != '') {
                    name = this.awardList[i]['nickname'];
                }
                if (name == '' && this.awardList[i]['mobile_num'] != '') {
                    name = this.awardList[i]['mobile_num'];
                }
                if (name == '' && this.awardList[i]['mail'] != '') {
                    name = this.awardList[i]['mail'];
                }
                if (name == '' && this.awardList[i]['user_name'] != '') {
                    name = this.awardList[i]['user_name'];
                }
                this.awardList[i]['nickname'] = name;
            }
            this.getAwardListSuccess();
        } else {
        }
    }

    /**
     * TODO... 需要重写
     */
    public getAwardListSuccess() {
        this.initAwardList();
    }

    /**
     * 获取抽奖活动详情
     */
    public async getActivityDetail() {
        if (this.account_token == '') return;
        if (this.activity_id == 0) {
            return;
        }
        let url = HttpClient.URL_ACTIVITY_DETAIL + this.activity_id;
        let param = new ActivityDetailRequestModel();
        param.type = 1;
        param.id = this.activity_id;
        param.plat_type = 1;
        param.region_code = LocalStorageUtil.getRegionCodes();
        param.account_token = this.account_token;
        this.backData = await this.http.get<ActivityDetailRequestModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.activityDetails = this.backData.data.detail as ActivityModel;
            this.points = this.backData.data.points;
            this.getActivityCount();
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        }
    }

    /**
     * 获取活动的倒数计时的方法
     * endTime是活动结束时间（字符串），例子：2019-01-29 15:30:00
     */
    public getClock(endTime) {
        let diff = new Date(endTime.replace(/\-/g, '/')).getTime() - new Date().getTime();//时间差的毫秒数
        //计算出相差天数
        let days = Math.floor(diff / (24 * 3600 * 1000));

        //计算出小时数
        let leave1 = diff % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000));

        //计算相差秒数
        let leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000);
        if (seconds < 0) seconds = 0;
        let returnStr = {seconds: seconds, minutes: 0, hours: 0, days: 0}

        if (minutes < 0) minutes = 0;
        if (minutes >= 0) {
            returnStr.minutes = minutes;
        }
        if (hours < 0) hours = 0;
        if (hours >= 0) {
            returnStr.hours = hours;
        }
        if (days < 0) days = 0;
        if (days >= 0) {
            returnStr.days = days;
        }
        return returnStr;
    }

    /**
     * 获取我的抽奖次数
     */
    public getActivityCount() {
        this.aCount = Math.floor(this.points / this.activityDetails.fee);
    }

    /**
     * 获取用户可生成推荐码
     */
    public async getReferActivitys() {
        if (this.account_token == '') return;
        const url = HttpClient.URL_USER_REFER_ACTIVITY;
        let param = {
            account_token: this.account_token
        }
        this.backData = await this.http.get(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            const list = this.backData.data;
            let info = null;
            let user_code = null;
            for (var i in list) {
                info = list[i].activity_info;
                user_code = list[i].user_code;
                if (info.id == this.activity_id) {
                    if (user_code.length <= 0) {
                        //需要重新生成推荐码
                        this.getRefercode(info.type);
                    } else {
                        this.refer_code = user_code.refer_code;
                        this.generateRefercodeLink(this.refer_code);
                    }
                    break;
                }
            }
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        }
    }

    /**
     * 获取用户已经邀请的用户的列表
     */
    public async getReferList(activity_type: number) {
        if (this.account_token == '') return;
        const url = HttpClient.URL_ACTIVITY_REFER_LIST;
        let param = new referList()
        param.account_token = this.account_token
        param.activity_id = this.activity_id
        param.type = activity_type
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.myReferList = this.backData.data.list;
            this.getReferListSuccess()
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        }
    }

    /**
     * 生成用户推荐码
     */
    public async getRefercode(type: number) {
        const url = HttpClient.URL_USER_REFER;
        let param = new ReferCodeRequestModel();
        param.activity_id = this.activity_id;
        param.type = type;
        param.account_token = this.account_token;
        this.backData = await this.http.post<ReferCodeModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.refer_code = this.backData.data.refer_code;
            this.generateRefercodeLink(this.refer_code);
        }
    }

    /**
     * 生成链接
     * TODO... 需要重写此方法，生成对应项目的链接
     */
    public generateRefercodeLink(refer_code: string) {
    }

    /**
     * 发送抽奖请求
     * @param delay_win 成功延迟时间
     * @param delay_lose 失败延迟显示
     */
    public async onDraw(delay_win: number = 0, delay_lose: number = 0) {
        const url = HttpClient.URL_ACTIVITY_DRAW;
        const token = this.account_token;
        let param = new ActivityDrawModel();
        param.activity_id = this.activity_id;
        param.account_token = token;
        this.backData = await this.http.post(url, param);
        const that = this;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.awardInfo = this.backData.data;
            setTimeout(function () {
                that.onDrawWin(that.backData);
            }, delay_win);
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            setTimeout(function () {
                that.onDrawLose(that.backData);
            }, delay_lose);
        }
    }

    /**
     * 用户活动 - 奖品列表
     */
    public async getActiveRecordList(page: number = 1, size: number = 50) {
        if (this.account_token == '') return;
        if (page == null) page = 1;
        const url = HttpClient.URL_USER_PRIZE_LIST;
        let param = new ActiveRecordRequestModel();
        param.account_token = this.account_token;
        param.page = page;
        param.size = size;
        this.backData = await this.http.post<ActiveRecordListModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.awardRecordList = this.backData.data.list;
            this.awardRecordListSuccess()
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        }
    }

    /**
     * 中奖
     * TODO... 需要重写此方法
     */
    public onDrawWin(backData: IdataModel<any>) {
        //播放奖品动画
        if (this.activityJson.choujiang_type == 1) {
            this.luck.speed = 100;
            this.roll();
        }
        ;
        if (this.activityJson.choujiang_type == 0) {
            console.log(backData)
            this.isBengin = false;
            this.dialog_win = true;//弹出奖品图片动画
            this.prize_name = backData.data.title;
            this.prize_id = backData.data.present_id;
        }
        ;
        if(this.activityJson.choujiang_type == 2) {
            let num = Math.ceil(Math.random()*3) + 5;
            let angel = 0;
            switch(backData.data.present_id){
                case 67:
                    angel = Math.random()*45 + 22.5;
                    break;
                case 68:
                    angel = Math.random()*45 + 67.5;
                    break;
                case 65:
                    angel = Math.random()*45 + 112.5;
                    break;
                case 62:
                    angel = Math.random()*45 + 157.5;
                    break;
                case 66:
                    angel = Math.random()*45 + 202.5;
                    break;
                case 69:
                    angel = Math.random()*45 + 247.5;
                    break;
                case 63:
                    angel = Math.random()*45 + 292.5;
                    break;
                case 64:
                    angel = Math.random()*45 + 337.5;
                    break;
            }
            $('#roll_table').css({'transform':'rotate('+(360*num + angel)  +'0deg)','transition':'4s'});
            setTimeout(()=>{
                this.dialog_win = true;//弹出奖品图片动画
                this.isBengin = false;
            },4000);
            this.prize_name = backData.data.title;
            this.prize_id = backData.data.present_id;
        }

        //计算次数
        this.points = backData.data.points;
        this.getActivityCount();
        this.getActiveRecordList();
    }

    /**
     * 推荐列表
     * TODO... 需要重写此方法
     */
    public getReferListSuccess() {

    }

    /**
     * 本人中奖列表
     * TODO... 需要重写此方法
     */
    public awardRecordListSuccess() {
    }

    /**
     * 未中奖
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

    //ui层逻辑

    /**
     * 点击查看中奖纪录
     */
    public onClickAward() {
        $('body').addClass('body_fixed');
        if (this.account_token == '') {
            //提示登录
            this.dialog_no_login = true;
            return;
        }
        this.dialog_award = true;
        this.getActiveRecordList(1, 6);
    }

    /**
     * 切换tab页
     */
    public changeTabPage(index: number) {
        this.tabIndex = index;
        if (this.tabIndex == 1) {
            this.getActiveRecordList();
        }
    }

    /**
     * 点击查看活动详情
     */
    public onClickGuize() {
        this.dialog_guize = true;
        $('body').addClass('body_fixed');
    }

    /**
     * 点击关闭活动详情
     */
    public onCloseGuize() {
        this.dialog_guize = false;
        $('body').removeClass('body_fixed');
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
        $('body').removeClass('body_fixed');
    }

    /**
     * 关闭dialog
     */
    public closeDialog() {
        this.isWin = false;
        this.dialog_msg = '';
        this.dialog_error = false;
        this.dialog_win = false;
        this.dialog_award = false;
        $('body').removeClass('body_fixed');
        $('#roll_table').css({'transform':'rotate(0deg)','transition':'0s'});
    }

    /**
     * 点击展示福袋提示
     */
    public clickFudai(index: number) {
        if (this.account_token == '') {
            //提示登录
            $('body').addClass('body_fixed');
            this.dialog_no_login = true;
            return;
        }
        ;
        if (this.points < index) {
            //提示次数不足
            $('body').addClass('body_fixed');
            this.dialog_recharge = true;
            return;
        }
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
            that.dialog_msg = '邀请链接已复制到剪切板！快去邀请好友注册获取抽奖机会吧！';
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
        // Util.copyToClipboard(this.refer_code);
        const that = this;
        let clipboard = new Clipboard("#copyRefercode", {
            text: function () {
                return that.refer_code;
            }
        });
        clipboard.on("success", function (e) {
            e.clearSelection();
            that.dialog_error = true;
            that.dialog_msg = '邀请码已复制到剪切板！快去邀请好友注册获取抽奖机会吧！';
        });
    }

    /**
     * 初始化中奖列表名单
     */
    public initAwardList() {
        if (this.awardList.length <= 3) return;
        $(function () {
            setInterval(function () {
                var $ul = $("#jilu_box");
                $ul.animate({
                    marginTop: "-18px"
                }, 400, function () {
                    $ul.find("li").eq(0).appendTo($ul);
                    $ul.css("margin-top", "0")
                })
            }, 2000);
        });
    }

    /**
     * @param h 小于这个高度 登录分享模块成绝对定位  否则为固定定位
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

    /**
     * 点击抽奖
     */
    public onClickDraw() {
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
        this.isWin = true;//播放动画
        this.onDraw(1000, 1000);
    }

    public roll() {
        this.luck.times += 1;
        this.luck.roll();
        if (this.luck.times > this.luck.cycle + 10 && this.luck.prize == this.luck.index) {
            clearTimeout(this.luck.timer);
            this.luck.prize = -1;
            this.luck.times = 0;
            const that = this;
            setTimeout(function () {
                $('body').addClass('body_fixed');
                that.isBengin = false;
                that.dialog_win = true;
                that.dialog_msg = that.awardInfo.title;
            }, 2000);
        } else {
            if (this.luck.times < this.luck.cycle) {
                this.luck.speed -= 10;
            } else if (this.luck.times == this.luck.cycle) {
                var index = 4;
                switch (this.awardInfo.present_id) {
                    case 44:
                        index = 0;
                        break;
                    case 45:
                        index = 2;
                        break;
                    case 46:
                        index = 3;
                        break;
                    case 47:
                        index = 1;
                        break;
                    case 48:
                        index = 5;
                        break;
                    case 49:
                        index = 4;
                        break;
                    default:
                        break;
                }
                this.luck.prize = index;//最终中奖位置
            } else {
                if ((this.luck.times > this.luck.cycle + 10 && this.luck.prize == 0 && this.luck.index == 7) || this.luck.prize == this.luck.index + 1) {
                    this.luck.speed += 110;
                } else {
                    this.luck.speed += 20;
                }
            }
            if (this.luck.speed < 40) {
                this.luck.speed = 40;
            }
            ;

            this.luck.timer = setTimeout(this.roll, this.luck.speed);
        }
        return false;
    }
}
