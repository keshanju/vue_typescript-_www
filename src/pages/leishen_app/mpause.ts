import "./css/mui.min0125.css";
import "./css/ls2.css";
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
    public pauseState: number = 0; //0 是运行  1是暂停

    public created() {
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.init();
    }

    public getUserinfoSuccess() {
        this.SecondsConverse();
        this.pauseState = this.userInfo.pause_status_id;
    }

    //   秒数转小时和分钟
    public SecondsConverse() {
        this.allTimes = this.userInfo.expiry_time_samp;
        if (this.allTimes <= 0) {
            this.hours == 0;
            this.minutes == 0;
            return false;
        }
        this.hours = Math.floor(this.allTimes / 3600);
        this.minutes = Math.floor((this.allTimes / 60) % 60);
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
        this.pauseState = 0;
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
        this.pauseState = 1;
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
     * 去日志
     * */
    public gotonavlist() {
        let param = "platform=" + appParam.platform + '&pageIndex=' + 4;
        JumpWeiXin.gotoNavlist(param);
    }
}

//
let vueC = new Pause({}).$mount("#app");
