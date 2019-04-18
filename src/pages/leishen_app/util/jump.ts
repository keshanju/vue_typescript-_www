import GlobalConfig from "../global.config";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";

export default class JumpWeiXin {
  //微信公众号跳转地址
  public static WEIXIN_REG = "mreg.html"; // 注册
  public static WEIXIN_LOGIN = "mlogin.html"; // 登陆
  public static WEIXIN_FORGET = "mforget.html"; // 忘记密码
  public static WEIXIN_NAVLIST = "mcenterList.html"; // 用户中心导航
  public static WEIXIN_USERCENTER = "mmy_center.html"; //用户中心
  public static WEIXIN_RECHARGE = "recharge.html"; // 充值
  public static WEIXIN_PAUSE = "mpause.html"; // 暂停恢复
  public static WEIXIN_NOTICY = "notify.html"; // 公告
  public static WEIXIN_ITEMS = "mhuiyuanfuwu.html"; // 会员服务条款
  public static WEIXIN_LOGS = "mlog.html"; // 日志
  public static WEIXIN_INDEX = "index.html"; // 首页

  //   去注册
  public static gotoReg(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_REG;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }

  //   去登录
  public static gotoLogin(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_LOGIN;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }

  // 忘记密码
  public static gotoforget(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_FORGET;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }

  // 用户中心导航
  public static gotoNavlist(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_NAVLIST;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }
  // 用户中心
  public static gotoCenter(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_USERCENTER;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }
  // 充值
  public static gotoRecharge(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_RECHARGE;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }
  // 公告
  public static gotoNotify(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_NOTICY;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }
  // 会员服务条款
  public static gotoItems(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_ITEMS;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }
  // 日志
  public static gotoLogs(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_LOGS;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }
  // 首页
  public static gotoIndex(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_INDEX;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }
  // 暂停
  public static gotoPause(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_PAUSE;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }
  // 去活动
  public static gotoActive(pagehtml:string,param: string) {
    let userhost = window.location.origin;
    JumpWebUtil.wapJump(userhost, pagehtml, param);
  }



  
}
