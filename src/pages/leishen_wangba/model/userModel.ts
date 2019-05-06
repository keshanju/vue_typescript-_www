import { XmlDataModel } from "@/ts/models/IdataModel";

//注册需要的参数
export class RegRequestModel {
  username: string;
  tel: string;
  password: string;
  key: string; //获取验证码的同时会返回key,用于跟之前的验证码信息前后关联
  checkcode?: string; //图形验证码
  smscode?: string; //短信验证码
  groupid: string; //用户组ID
  number?: number; //连接数
}
//注册返回的值
export class RegBackModel extends XmlDataModel {
  token: string = "";
}
//完善用户资料传的值
export class ImproveRequestModel {
  token: string = ""; //用户令牌
  title?: string = ""; //网吧名称
  locked_ip?: string = ""; //网吧Ip
  qq?: string = ""; //QQ
  tel?: string = ""; //联系电话
  mail?: string = ""; //电子邮件
  address?: string = ""; //地址
  business_id?: string = ""; //营业执照号码
  business_license?: string = ""; //营业执照图片
  business_manager?: string = ""; //负责人姓名
  business_weixin?: string = ""; //微信
  number?: number = 1;
}
export class onloadImproveRequestModel {
  token: string = ""; //用户令牌
  title?: string = ""; //网吧名称
  locked_ip?: string = ""; //网吧Ip
  qq?: string = ""; //QQ
  tel?: string = ""; //联系电话
  mail?: string = ""; //电子邮件
}

//发送短信验证码需要的参数
export class SmsCaptchaRequestModel {
  key: string = "";
  tel: string = "";
  regcode: string = "";
}
//发送短信验证码返回值
export class SmsCaptchaModel extends XmlDataModel {}

//忘记密码需要的参数
export class PhoneFindPwdRequestModel {
  key: string = "";
  tel: string = "";
  newpassword: string = "";
  smscode: string = "";
}

//忘记密码返回值
export class PhoneFindPwdModel extends XmlDataModel {}

//登录请求接口
export class LoginRequestModel {
  mini_username: string;
  mini_password: string;
  checkcode?: string;
  bindweixin?: number; //1绑定,仅在微信公众环境有效
}
/**
 * 登录成功返回参数
 */
export class LoginModel extends XmlDataModel {
  public token?: string;
}
//壁纸
export class WallPaperModel extends XmlDataModel {
  wallpapercount: number; //壁纸列表数量
  wallpapers; //壁纸详情列表，仅在wallpapercount大于0时候存在
}
//壁纸列表模型
export class WallPaperListModel {
  id = "";
  image_src = ""; //壁纸地址
  status = 0; // 0 正常 1
  timestp = "";
  image_size = ""; //图片尺寸 1920*1080....
}

//获取用户信息返回的值
export class UserInfoModel extends XmlDataModel {
  public username: string = ""; //用户名
  public expiretime: string = ""; //到期时间
  public face_image_url: string = ""; //默认头像
  public business_status: string = ""; //0 未审核 1 已审核成功 2 已驳回重审
  public my_onlines: string = ""; //在线电脑数量
  public my_alerts: string = ""; //告警数量
  public title: string = ""; //网吧名称
  public tel: string = ""; //联系电话
  public locked_ip: string = ""; //绑定ip
  public qq: string = ""; //qq
  public mail: string = ""; //mail
  public number: number = 1; //网吧规模
  public business_manager: string = ""; //网吧负责人
  public business_id: string = ""; //营业执照id
  public business_license: string = ""; //营业执照图片
  public business_weixin: string = ""; //微信
  public address: string = ""; //地址
  public business_check_info: string = ""; //驳回原因
  public business_free: string = "0"; //会员类型  0付费用户  1壁纸免费用户
}

//壁纸
export class UploadAvatarRequestModel {
  token: string; //名称
  image: File; //头像图片
}

//获取在线列表
export class OnlineModel extends XmlDataModel {
  onlinecount?: number; //在线列表数量
  onlines?; //在线终端详情列表，仅在onlinecount大于0时候存在
}

//在线列表模型
export class OnlineListModel {
  id = ""; //用户id
  lastlogin = ""; //最后登录时间
  lastcomm = ""; //活跃时间
  recvx = ""; //接受流量
  sendx = ""; //发送流量
  hardid? = ""; //硬件id
  public_ip? = ""; //公网ip
  ip? = ""; //ip
  game? = ""; //游戏
}
