import GlobalConfig from "../global.config";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import ProjectConfig from "../../../../project.config";

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
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }

  //   去登录
  public static gotoLogin(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_LOGIN;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }
  //   微信公众号自动登录跳转
  public static gotoWXLogin(param: string) {
    if(ProjectConfig.server_type === 3){
      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcde8e099ce962bf6&redirect_uri=https://webapi.leigod.com/wap/auth&response_type=code&scope=snsapi_userinfo&state=mcenterList&connect_redirect=1#wechat_redirect'
    }else{
      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd5fa154bd470f21a&redirect_uri=https://dev-api1.leigod.com/wap/auth&response_type=code&scope=snsapi_userinfo&state=mcenterList&connect_redirect=1#wechat_redirect'
    }
  }

  // 忘记密码
  public static gotoforget(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_FORGET;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }

  // 用户中心导航
  public static gotoNavlist(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_NAVLIST;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }
  // 用户中心
  public static gotoCenter(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_USERCENTER;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }
  // 跳转到用户活动
  public static gotoActitvity(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_USERCENTER;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);

  }
  // 充值
  public static gotoRecharge(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_RECHARGE;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }
  // 公告
  public static gotoNotify(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_NOTICY;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }
  // 会员服务条款
  public static gotoItems(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_ITEMS;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }
  // 日志
  public static gotoLogs(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_LOGS;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }
  // 首页
  public static gotoIndex(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_INDEX;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }
  // 暂停
  public static gotoPause(param: string) {
    let userhost = window.location.origin;
    let pagehtml = JumpWeiXin.WEIXIN_PAUSE;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }
  // 去活动
  public static gotoActive(pagehtml:string,param: string) {
    let userhost = window.location.origin;
    JumpWebUtil.mobileGotoUser(userhost, pagehtml, param);
  }




}
