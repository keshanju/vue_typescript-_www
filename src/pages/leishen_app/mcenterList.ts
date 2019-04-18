import "./css/mui.min0125.css";
import "./css/ls2.css";
import "./css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import UserProxy from "@/ts/proxy/UserProxy";
import GlobalConfig from "./global.config";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import Util from "@/ts/utils/Util";
import NavList from "./components/NavList.vue";
import Load from "./components/Loading.vue";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "./util/LsLanguage";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import { Toast, Loading } from "vant";
import JumpWeiXin from "./util/jump";
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
  components: {
    navlist: NavList,
    load: Load
  }
})
class User extends UserProxy {
  public package_level: number = 200; //200超级会员 201 海外会员
  public package_name: string = "超级会员"; //200超级会员 201 海外会员
  public showIndex: number = 0; //用户中心显示索引

  public mounted() {
    this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.init();
  }

  // 确认用户套餐类型
  public onCheckPackageNname() {
    this.package_level = LocalStorageUtil.getUserInfo().package_level;
    if (
      this.package_level != null &&
      this.package_level == Util.PACKAGE_LEVEL_200
    ) {
      this.package_name = "超级会员";
    } else if (
      this.package_level != null &&
      this.package_level == Util.PACKAGE_LEVEL_201
    ) {
      this.package_name = "海外会员";
    }
  }
  //获取用户信息成功
  public getUserinfoSuccess() {
    this.onCheckPackageNname();
  }

  //token过期
  public tokenExpired(param: string = ""): void {
    let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
    Toast(tipMsg);
    setTimeout(() => {
      this.gotologin();
    }, 3000);
  }
  //获取用户信息失败
  public getUserinfoFail(data) {
    let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
    Toast(tipMsg);
    setTimeout(() => {
      this.gotologin();
    }, 3000);
  }

  // 切换用户中心页面
  public changeUserIndex(index: number) {
    this.showIndex = index;
    this.$emit("changeshow", this.showIndex);
  }

  //跳转

  /**
   * 去充值
   *  */

  public gotoRecharge() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoRecharge(param);
  }

  /**去暂停
   *  */

  public gotopause() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoPause(param);
  }

  /**
   * 去公告
   * */

  public gotonotify() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoNotify(param);
  }
  /**
   * 去用户资料
   * */

  public gotoinfos() {
    let param = "platform=" + appParam.platform + "&pageIndex=" + 1;
    JumpWeiXin.gotoCenter(param);
  }
  /**
   * 去卡密
   * */

  public gotocardpsw() {
    let param = "platform=" + appParam.platform + "&pageIndex=" + 2;
    JumpWeiXin.gotoCenter(param);
  }
  /**
   * 去订单
   * */

  public gotonorders() {
    let param = "platform=" + appParam.platform + "&pageIndex=" + 3;
    JumpWeiXin.gotoCenter(param);
  }
  /**
   * 去会员服务
   * */

  public gotoitems() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoItems(param);
  }
  /**
   * 去设置
   * */

  public gotosetting() {
    let param = "platform=" + appParam.platform + "&pageIndex=" + 4;
    JumpWeiXin.gotoCenter(param);
  }

  /**
   * 去登录
   * */

  public gotologin() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoLogin(param);
  }
}
//
let vueC = new User({}).$mount("#app");
