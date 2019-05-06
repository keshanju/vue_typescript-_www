import "./css/wap.less";
import {Component, Vue} from "vue-property-decorator";
import UserProxy from "@/ts/proxy/UserProxy";
import GlobalConfig from "./global.config";
import Util from "@/ts/utils/Util";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import {LsLanguage} from "./util/LsLanguage";
import {Dialog, Toast} from "vant";
import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
import NavList from "./components/NavList.vue";
import JumpWeiXin from './util/jump';

Vue.use(Dialog);

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(
    Util.REGION_CODE_1,
    Util.ZH_CN
);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
    components: {
        navlist: NavList
    }
})
class Pause extends UserProxy {

    public allTimes: number = 0; //总时间
    public hours: number = 0; //小时
    public minutes: number = 0; //分钟
    public seconds: number = 0; //秒
    public pauseState: number = 1; //0 是运行  1是暂停
    public startAnimal: number = 1; //0关闭  1是开始
    private timer: any;
    private flag = true;//体验时间到期 定时器里面就重置为false，避免一直调用用户信息接口。
    private showRechargeBtn = false;//付费用户低于20小时显示去充值按钮  非付费用户低于30分钟显示去充值按钮  同时变色


    public created() {
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.init();
    }

    public getUserinfoSuccess() {
        this.SecondsConverse();
        this.pauseState = this.userInfo.pause_status_id;
        if (this.pauseState == 0) {
            this.startAnimal = 1;
            clearInterval(this.timer);
            this.cutdownTime()
        } else {
            this.startAnimal = 0;
            clearInterval(this.timer)
        }
        if (this.allTimes <= 0) {
            this.startAnimal = 0;
            clearInterval(this.timer)
        }
    }

    //呼出温馨提示弹窗
    private showTips() {
        Dialog.alert({
            title: '温馨提示',
            confirmButtonText: "朕知道了",
            message: '若您在使用微信公众号提供的时间”暂停/恢复”功能后，客户端中的”暂停/恢复”按钮状态出现不同步的情况，您只需重启客户端即可恢复正常。'
        }).then(() => {
            // on close
        });
    }


    //   秒数转小时和分钟
    public SecondsConverse() {
        if (this.userInfo.expiry_time_samp <= 0) {
            this.userInfo.expiry_time_samp = 0
        }
        this.allTimes = this.userInfo.expiry_time_samp + this.userInfo.experience_time;
        this.IspayUser()
        if (this.allTimes <= 0) {
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.startAnimal = 0;
            clearInterval(this.timer);
            return false;
        } else {
            this.hours = Math.floor(this.allTimes / 3600);
            this.minutes = Math.floor((this.allTimes / 60) % 60);
            this.seconds = this.allTimes - this.hours * 3600 - this.minutes * 60;

        }
    }

    //判断是否为付费用户 是则低于20小时 给提示  不是则低于30分钟给提示
    private IspayUser() {
        if (this.userInfo.is_pay_user == 1 && this.allTimes < 72000) {
            this.showRechargeBtn = true;
        } else {
            if (this.allTimes < 1800) {
                this.showRechargeBtn = true;
            } else {
                this.showRechargeBtn = false;
            }
        }
    }

    /**
     * 目标时间是否过期
     * @param time
     * @constructor
     */
    private IsExperience(time): boolean {
        let nowTime = new Date().getTime();
        let targetTime = new Date(time).getTime();
        if (targetTime - nowTime > 0) {
            console.log('未过期')
            return false;
        } else {
            return true;
            console.log('过期')
        }

    }

    /**
     * 倒计时
     */
    private cutdownTime() {
        this.timer = setInterval(() => {
            if (this.IsExperience(this.userInfo.experience_expiry_time) && this.flag) {
                this.getUserInfo();
                this.flag = false;
            }

            this.allTimes--;
            if (!this.showRechargeBtn) {
                this.IspayUser()
            }
            this.seconds--;
            if (this.seconds <= 0) {
                this.seconds = 59;
                this.minutes--;
            }
            if (this.minutes < 0) {
                this.minutes = 59
                this.hours--;
            }
            if (this.hours < 0) {
                this.hours = 0;
                this.minutes = 0;
                this.seconds = 0;
                this.startAnimal = 0;
                clearInterval(this.timer);
            }
        }, 1000)

    }

    //点击暂停恢复
    changePauseState() {
        if (this.pauseState == 0) {
            Dialog.confirm({
                title: "",
                message: "您确定要暂停使用时间吗?",
                confirmButtonText: "确认暂停"
            }).then(() => {
                this.onTimeSuspended();
            })
                .catch(() => {
                    // on cancel
                });
        } else {
            Dialog.confirm({
                title: "",
                message: "您确定要恢复使用时间吗?",
                confirmButtonText: "确认恢复"
            })
                .then(() => {
                    // on confirm
                    this.onTimeRestore();
                })
                .catch(() => {
                    // on cancel
                });
        }
    }

    //暂停成功
    onTimeSuspendedSuccess() {
        let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PAUSE_SUCCESS);
        Toast(tipMsg);
        this.pauseState = 1;
        this.startAnimal = 0;
        clearInterval(this.timer)
    }

    //暂停失败
    onTimeSuspendedFaild(data) {
        Toast(data.msg);
    }

    /**
     * 恢复计时成功
     * TODO... 需要重写此方法
     */
    public onTimeRestoreSuccess() {
        let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_RESTORE_SUCCESS);
        Toast(tipMsg);
        this.pauseState = 0;
        clearInterval(this.timer);
        this.cutdownTime();
        this.startAnimal = 1;

    }

    /**
     * 恢复计时失败
     * TODO... 需要重写此方法
     */
    public onTimeRestoreFaild(data: any) {
        Toast(data.msg);
    }

    //token过期
    public tokenExpired(param: string = ""): void {
        let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
        Toast(tipMsg);
        setTimeout(() => {
            this.gotologin();
        }, 3000);
    }

    /**
     * 去登录
     * */
    public gotologin() {
        let param = "platform=" + appParam.platform + '&pageIndex=' + 4;
        JumpWeiXin.gotoLogin(param);
    }

    /**
     * 去日志
     * */
    public gotologs() {
        let param = "platform=" + appParam.platform + '&pageIndex=' + 4;
        JumpWeiXin.gotoLogs(param);
    }

    /**
     * 去导航
     * */
    public gotonavlist() {
        let param = "platform=" + appParam.platform + '&pageIndex=' + 4;
        JumpWeiXin.gotoNavlist(param);
    }

    /**
     * 去充值
     *  */

    public gotoRecharge() {
        let param = "platform=" + appParam.platform;
        JumpWeiXin.gotoRecharge(param);
    }
}

//
let vueC = new Pause({}).$mount("#app");
