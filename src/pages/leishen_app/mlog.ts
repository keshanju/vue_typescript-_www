import "./css/mui.min0125.css";
import "./css/ls2.css";
import "./css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import UserProxy from "@/ts/proxy/UserProxy";
import GlobalConfig from "./global.config";
import Util from "@/ts/utils/Util";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "./util/LsLanguage";
import { pauseLogModel, pauseLogNeedModel } from "@/ts/models/UserModel";
import { Toast } from "vant";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import JumpWeiXin from "./util/jump";
import Load from "./components/Loading.vue";
import { Loading } from "vant";
Vue.use(Loading);
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
  components:{
    load:Load
  }
})
class Logs extends UserProxy {
  public pauseTimeList: pauseLogNeedModel[] = [];
  pauseStatus: string = "暂停"; //0 暂停 1 恢复
  time: string = ""; //操作暂停恢复时间
  pauseYears: string = ""; //年
  pauseMonths: string = ""; //月
  pauseDays: string = ""; //日
  pauseHMS: string = ""; //时分秒

  public created() {
    this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.init();
  }
  //获取用户信息成功
  public getUserinfoSuccess() {
    this.onPauseLogs();
  }
  // 获取暂停日志成功
  public onPauseLogSuccess(data: { data: pauseLogModel[] }) {
    let time;
    for (const item of data.data) {
      let list: pauseLogNeedModel = new pauseLogNeedModel();
      if (item.status == 0) {
        this.pauseStatus = "恢复";
        time = item.resume_time;
      } else {
        this.pauseStatus = "暂停";
        time = item.pause_time;
      }
      let TimeArr = time.split(" ")[0];
      this.pauseHMS = time.split(" ")[1]; //获取时分秒
      this.pauseYears = TimeArr.split("-")[0];
      this.pauseMonths = TimeArr.split("-")[1];
      this.pauseDays = TimeArr.split("-")[2];
      list.pauseStatus = this.pauseStatus;
      list.pauseYears = this.pauseYears;
      list.pauseMonths = this.pauseMonths;
      list.pauseDays = this.pauseDays;
      list.pauseHMS = this.pauseHMS;
      this.pauseTimeList.push(list);
    }
  }

  /**
   * 获取日志失败
   * TODO... 需要重写此方法
   */
  public onPauseLogFaild(data: any) {
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
    let param = "platform=" + appParam.platform + "&pageIndex=" + 4;
    JumpWeiXin.gotoLogin(param);
  }
}
//
let vueC = new Logs({}).$mount("#app");
