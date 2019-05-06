import "../../../assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import { Component, Vue } from "vue-property-decorator";
import $ from "jquery";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "../util/LsLanguage";
import GlobalConfig from "../global.config";
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import { IdataModel } from "@/ts/models/IdataModel";
import JumpWeiXin from "../util/jump";
import Clipboard from "clipboard";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

var luck = {
  index: -1, //当前转动到哪个位置，起点位置
  count: 0, //总共有多少个位置
  timer: null, //setTimeout的ID，用clearTimeout清除
  speed: 20, //初始转动速度
  times: 0, //转动次数
  cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
  prize: -1, //中奖位置
  init: function(id) {
    if ($("#" + id).find(".hj_prize").length > 0) {
      var $luck = $("#" + id);
      var $units = $luck.find(".hj_prize");
      this.obj = $luck;
      this.count = $units.length;
      $luck.find(".hj_prize_" + this.index).addClass("active");
    }
  },

  roll: function() {
    var index = this.index;
    var count = this.count;
    var luck = this.obj;
    $(luck)
      .find(".hj_prize_" + index)
      .removeClass("active");
    index += 1;
    if (index > count - 1) {
      index = 0;
    }
    $(luck)
      .find(".hj_prize_" + index)
      .addClass("active");
    this.index = index;
    return false;
  },
  stop: function(index) {
    this.prize = index;
    return false;
  }
};

@Component
class NewActivity extends ActivityProxy {
  // http://localhost:8080/shuangdan.html?id=36&region_code=1&language=zh_CN&account_token=VxHnkvLQZFN1PVvXHgBzuZFZksgKZ0Bk5WcJYox657pvSKgzcgTgUgdb0R3wdL90
  public activity_id = 170;
  public appParam = AppParamModel.getInstace(); // 浏览器参数
  //
  public dialog_award: boolean = false; // 中奖纪录
  public dialog_guize: boolean = false; //  默认规则弹框
  public dialog_no_login = false; //未登录弹框
  public dialog_recharge = false; //提示充值
  public dialog_copy_ref_link = false; //复制剪切板
  public dialog_error = false; //错误提示
  public dialog_win = false; //中奖提醒
  //
  public sina_link =
    "https://weibo.com/p/1006066443936086/manage?from=page_100606&mod=TAB#place"; //新浪微博
  //
  public dialog_msg: string = ""; // 服务端的msg
  public refer_code_txt = "";

  /**
   *
   */
  public mounted() {
    luck.init("prize");
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
    if (this.account_token == "") {
      this.refer_code_txt = "请先登录!";
    }
  }

  /**
   * 点击查看中奖纪录
   */
  public onClickAward() {
    $("body").addClass("body_fixed");
    if (this.account_token == "") {
      //提示登录
      this.dialog_award = true;
      return;
    }
    this.dialog_award = true;
    this.getActiveRecordList(1, 6);
  }

  /**
   * 点击查看活动详情
   */
  public onClickGuize() {
    this.dialog_guize = true;
    $("body").addClass("body_fixed");
  }

  /**
   * 点击关闭活动详情
   */
  public onCloseGuize() {
    this.dialog_guize = false;
    $("body").removeClass("body_fixed");
  }

  /**
   * 点击关闭活动详情
   */
  public onCloseRecharge() {
    this.dialog_recharge = false;
    $("body").removeClass("body_fixed");
  }

  /**
   * 点击抽奖
   */
  public onClickDraw() {
    if (this.isBengin) return;
    if (this.account_token == "") {
      //提示登录
      $("body").addClass("body_fixed");
      this.dialog_no_login = true;
      return;
    }
    if (this.aCount <= 0) {
      //提示次数不足
      $("body").addClass("body_fixed");
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
    this.getActivityCount();
    //播放奖品动画
    luck.speed = 100;
    this.roll();
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
    this.dialog_msg = "";
  }

  /**
   * 登录
   */
  public gotoLogin() {
    this.checkEnvironment();
    if (this.appParam.platform == 4) {
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcde8e099ce962bf6&redirect_uri=https://webapi.leigod.com/wap/auth&response_type=code&scope=snsapi_userinfo&state=hanjia&connect_redirect=1#wechat_redirect";
    } else {
      let param = "platform=" + this.appParam.platform;
      JumpWeiXin.gotoLogin(param);
    }
  }

  /**
   * 判断环境
   */
  public checkEnvironment() {
    if (JumpWebUtil.isDeviceWx()) {
      //微信环境
      this.appParam.platform = 4;
    } else if (JumpWebUtil.isDeviceAndroid()) {
      this.appParam.platform = 2;
    } else if (JumpWebUtil.isDeviceIos()) {
      this.appParam.platform = 3;
    } else {
      this.appParam.platform = 0;
    }
  }

  /**
   * 充值
   */
  public gotoRecharge() {
    if (this.account_token == "") {
      //提示登录
      $("body").addClass("body_fixed");
      this.dialog_no_login = true;
      return;
    } else {
      let param = "platform=" + this.appParam.platform;
      JumpWeiXin.gotoRecharge(param);
    }
  }

  /**
   * 生成链接
   */
  public generateRefercodeLink(refer_code: string) {
    this.refer_code_txt = "邀请码： " + refer_code;
    this.refer_code = refer_code;
  }

  /**
   * 复制链接
   */
  public copyRefercodeLink() {
    $("body").addClass("body_fixed");
    if (this.account_token == "") {
      //提示登录
      this.dialog_no_login = true;
      return;
    }
    // Util.copyToClipboard(this.refer_code);
    const that = this;
    var clipboard = new Clipboard("#copyBtn", {
      text: function() {
        return that.refer_code;
      }
    });
    clipboard.on("success", function(e) {
      e.clearSelection();
      that.dialog_copy_ref_link = true;
    });
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
    this.dialog_msg = "";
    this.dialog_error = false;
    this.dialog_copy_ref_link = false;
    this.dialog_win = false;
    this.dialog_award = false;
    $("body").removeClass("body_fixed");
  }

  /**
   * token过期
   * @param param
   */
  public tokenExpired(param: string = null): void {
    LocalStorageUtil.loginOut();
    this.account_token = "";
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
    if (this.awardList.length <= 5) return;
    $(function() {
      setInterval(function() {
        var $ul = $("#jilu_box");
        $ul.animate({}, 400, function() {
          $ul
            .find("li")
            .eq(0)
            .appendTo($ul);
        });
      }, 2000);
    });
  }

  public roll() {
    luck.times += 1;
    luck.roll();
    if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
      clearTimeout(luck.timer);
      luck.prize = -1;
      luck.times = 0;
      const that = this;
      setTimeout(function() {
        $("body").addClass("body_fixed");
        that.isBengin = false;
        that.dialog_win = true;
        that.dialog_msg = that.awardInfo.title;
      }, 2000);
    } else {
      if (luck.times < luck.cycle) {
        luck.speed -= 10;
      } else if (luck.times == luck.cycle) {
        var index = 0;
        switch (this.awardInfo.present_id) {
          case 31:
            index = 0;
            break;
          case 33:
            index = 2;
            break;
          case 34:
            index = 5;
            break;
          case 35:
            index = 3;
            break;
          case 36:
            index = 1;
            break;
          case 37:
            index = 4;
            break;
          default:
            break;
        }
        luck.prize = index; //最终中奖位置
      } else {
        if (
          (luck.times > luck.cycle + 10 &&
            luck.prize == 2 &&
            luck.index == 3) ||
          luck.prize == luck.index + 1
        ) {
          luck.speed += 110;
        } else {
          luck.speed += 20;
        }
      }
      if (luck.speed < 40) {
        luck.speed = 40;
      }

      luck.timer = setTimeout(this.roll, luck.speed);
    }
    return false;
  }
}

new NewActivity({ i18n }).$mount("#app");
