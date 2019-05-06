import { Vue, Component } from "vue-property-decorator";
import "babel-polyfill";
import Header from "./components/Headnav.vue";
import Footer from "./components/Footer.vue";
import {
  Input,
  Checkbox,
  Row,
  Col,
  Upload,
  Message,
  Cascader,
  Loading,
  Select,
  Option
} from "element-ui";
import XmlHttpClient from "@/ts/net/XmlHttpClient";
import "./less/leigodwangba.less";
import {
  RegRequestModel,
  SmsCaptchaRequestModel,
  SmsCaptchaModel,
  RegBackModel,
  ImproveRequestModel,
  UserInfoModel
} from "./model/userModel";
import { ImgCaptchaRequestModel, ImgCaptchaModel } from "./model/RegModel";
import GlobalConfig from "./global_config";
import CheckUtil from "@/ts/utils/CheckUtil";
import netbarCheckUtil from "./netbarCheckUtil";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import { LanguageConfig } from "@/ts/utils/Language";
import LocalStorageUtil from "./LocalStorageUtil";
import Util from "@/ts/utils/Util";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import { UserUtil } from "./UserUtil";
import XmlToJsonUtil from "@/ts/utils/XmlToJsonUtil";
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Cascader);
Vue.use(Loading);
Vue.use(Select);
Vue.use(Option);
Vue.prototype.$message = Message;

LocalStorageUtil.addLanguage(Util.ZH_CN);
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();

@Component({
  components: {
    "header-nav": Header,
    "footer-nav": Footer
  }
})
export default class Login extends UserUtil {
  public username: string = "";
  public password: string = "";
  public imgCaptchaM: ImgCaptchaModel = new ImgCaptchaModel(); // 图形验证码model
  public imgCaptchaKey: string = ""; //图形验证码key
  public smscode: string = ""; // 短信验证码
  public groupid: string = "61714"; //用户类型

  public checkcode: string = ""; // 图形验证码
  public isAgree: boolean = false; //同意用户协议

  public reg_step: number = parseInt(Util.getUrlParam("regstep")) || 1; //注册到第几步
  private options: any[] = [];
  public improveInfo = new ImproveRequestModel();
  public imageUrl: string = ""; //上传logo图片
  public improveAddress = []; //地址(省市)
  public improveDetailAddress: string = ""; //详细地址
  public improveLicensePic: string = ""; //展示的营业执照照片
  public logoImgurl = ""; //上传logo图片的地址
  public licenseImgurl = ""; //上传营业执照图片的地址
  public usertoken = { token: "" };
  public netbar = 100; //最大连接数 也是网吧规模

  // 公共参数
  public xmlHttp: XmlHttpClient = new XmlHttpClient();
  protected xmlParse = new XmlToJsonUtil();

  backData: any;
  public smsCountDownNum: number = 0;
  isLoading: boolean = false;
  notifMessage: string;
  public setBaseUrl(url: string): void {
    this.xmlHttp.setBaseUrl(url);
  }

  mounted() {
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.onGetCaptcha();
    this.changeUploadUrl();
    this.onGetProvince();
    this.isFromUser();
  }

  /**
   * 判断是否是用户中心跳转过来的  如果是那么自动填写已知信息
   */
  public isFromUser() {
    if (Util.getUrlParam("regToken")) {
      let info: UserInfoModel = JSON.parse(
        localStorage.getItem(LocalStorageUtil.STORAGES_USER_INFO)
      );
      this.improveInfo.title = info.title;
      this.netbar = info.number;
      this.improveInfo.locked_ip = info.locked_ip;
      this.improveDetailAddress = info.address;
      this.improveInfo.tel = info.tel;
      this.improveInfo.qq = info.qq;
      this.improveInfo.business_manager = info.business_manager;
      this.improveInfo.business_weixin = info.business_weixin;
      this.improveInfo.business_id = info.business_id;
      this.improveLicensePic = info.business_license;
    }
  }

  /**
   * 上传图片基本设置
   * token
   */
  onGetToken() {
    let token =
      Util.getUrlParam("regToken") || LocalStorageUtil.getCookie("regToken");
    this.usertoken.token = token;
  }

  changeUploadUrl() {
    this.logoImgurl =
      GlobalConfig.getBaseUrl() + "api.aspx?op=" + XmlHttpClient.DO_SERVEFACE;
    this.licenseImgurl =
      GlobalConfig.getBaseUrl() +
      "api.aspx?op=" +
      XmlHttpClient.DO_SAVE_BUSINESSLICENCE;
  }

  //用户注册部分
  /**
   * 获取图形验证码
   */
  public async onGetCaptcha() {
    const url = XmlHttpClient.GETCHECK_CODE;
    const param = new ImgCaptchaRequestModel();
    this.backData = await this.xmlHttp.get<ImgCaptchaModel>(url, param);
    if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.imgCaptchaM = this.backData;
      this.imgCaptchaKey = this.imgCaptchaM.key;
    }
  }

  /**
   *  刷新图形验证码
   */
  public getCaptcha() {
    //TODO...需要验证输入
    this.onGetCaptcha();
  }

  /**
   * 获取短信验证码
   */
  public onSmsCode() {
    //验证手机号
    if (!CheckUtil.checkPhone(this.username)) {
      if (this.username == "") {
        this.notifMessage = TipsMsgUtil.getTipsMsg(
          TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY
        );
        this.$message.error(this.notifMessage);
        return false;
      }
      this.notifMessage = TipsMsgUtil.getTipsMsg(
        TipsMsgUtil.KEY_NOTIF_PHONE_ERROR
      );
      this.$message.error(this.notifMessage);
      return false;
    }

    //验证图形验证码
    if (!CheckUtil.checkimgVerificatioCode(this.checkcode)) {
      if (this.checkcode == "") {
        this.notifMessage = TipsMsgUtil.getTipsMsg(
          TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY
        );
        this.$message.error(this.notifMessage);
        return false;
      }
      this.notifMessage = TipsMsgUtil.getTipsMsg(
        TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR
      );
      this.$message.error(this.notifMessage);
      return false;
    }
    this.GetSmscode();
  }
  /**
   * 获取短信验证码
   */
  public async GetSmscode() {
    let url = XmlHttpClient.DOSENDREGSMS;
    let param = new SmsCaptchaRequestModel();
    param.key = this.imgCaptchaKey;
    param.tel = this.username;
    param.regcode = this.checkcode;
    //loading
    this.isLoading = true;
    //
    this.backData = await this.xmlHttp.post<SmsCaptchaModel>(url, param);
    this.isLoading = false;
    if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      // 正确返回
      // 倒计时
      this.smsCountDownNum = 60;
      const sefl = this;
      Util.countDown(this.smsCountDownNum, 1, (n: number) => {
        sefl.smsCountDownNum = n;
      });
    } else {
      // 获取图形验证码
      this.$message.error(this.backData.msg);
      setTimeout(() => {
        this.onGetCaptcha();
      }, 500);
    }
  }
  //点击注册
  public submitRegOne() {
    //验证手机号
    if (!CheckUtil.checkPhone(this.username)) {
      if (this.username == "") {
        this.notifMessage = TipsMsgUtil.getTipsMsg(
          TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY
        );
        this.$message.error(this.notifMessage);
        return false;
      }
      this.notifMessage = TipsMsgUtil.getTipsMsg(
        TipsMsgUtil.KEY_NOTIF_PHONE_ERROR
      );
      this.$message.error(this.notifMessage);
      return false;
    }

    //验证图形验证码
    if (!CheckUtil.checkimgVerificatioCode(this.checkcode)) {
      if (this.checkcode == "") {
        this.notifMessage = TipsMsgUtil.getTipsMsg(
          TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY
        );
        this.$message.error(this.notifMessage);
        return false;
      }
      this.notifMessage = TipsMsgUtil.getTipsMsg(
        TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR
      );
      this.$message.error(this.notifMessage);
      return false;
    }

    //验证短信验证码
    if (!CheckUtil.checkSmscode(this.smscode)) {
      if (this.smscode == "") {
        this.notifMessage = TipsMsgUtil.getTipsMsg(
          TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY
        );
        this.$message.error(this.notifMessage);
        return false;
      }
      this.notifMessage = TipsMsgUtil.getTipsMsg(
        TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR
      );
      this.$message.error(this.notifMessage);
      return false;
    }

    //验证密码
    if (!CheckUtil.checkPwd(this.password)) {
      if (this.password == "") {
        this.notifMessage = TipsMsgUtil.getTipsMsg(
          TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY
        );
        this.$message.error(this.notifMessage);
        return false;
      }
      this.notifMessage = TipsMsgUtil.getTipsMsg(
        TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR
      );
      this.$message.error(this.notifMessage);
      return false;
    }
    this.onPhoneRegister();
  }

  /**
   * 注册
   */
  public onPhoneRegister() {
    const url = XmlHttpClient.URL_WBOP_DO_REG;
    let param = new RegRequestModel();
    param.username = this.username;
    param.tel = this.username;
    param.key = this.imgCaptchaKey;
    param.checkcode = this.checkcode;
    param.password = this.password;
    param.groupid = this.groupid;
    param.smscode = this.smscode;
    param.number = this.netbar;
    
    this.onRegister(url, param);
  }

  /**
   * 请求注册
   */
  public async onRegister(url: string, param: any) {
    this.isLoading = true;
    this.backData = await this.xmlHttp.post<RegBackModel>(url, param);
    if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.isLoading = false;
      let token = this.backData.token;
      LocalStorageUtil.setCookie("regToken", token);
      this.reg_step = 2; //去完善资料页面
      this.improveInfo.tel = this.username;
    } else {
      this.isLoading = false;
      this.$message.error(this.backData.msg);
      setTimeout(() => {
        this.onGetCaptcha();
      }, 500);
    }
  }

  //完善信息页面
  /**
   * 获取省市信息
   */
  public async onGetProvince() {
    const w = await ConfigUtil.getInstance().getProvince();
    this.options = w;
  }

  public selectProvince() {
    let province = this.improveAddress
      .join("")
      .replace("市辖区", "")
      .replace("县", "");
    this.improveInfo.address = province;
  }

  /**
   * logo上传
   * @param res 响应数据
   * @param file 文件
   */
  logoAvatarSuccess(res, file) {
    res = this.xmlParse.parseXML(res);
    let data = res.xml.items;
    if (data.result == XmlHttpClient.HTTP_TOKEN_EXPIRE) {
      this.$message.error("填写超时,请联系客服处理");
    } else if (data.code != XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.$message.error("图片有损坏,请更换图片");
      return false;
    }
    this.imageUrl = URL.createObjectURL(file.raw);
  }

  //头像上传之前 限制图片大小
  beforeAvatarUpload(file) {
    this.onGetToken();
    const isLt300K = file.size / 1024 < 300;
    if (!isLt300K) {
      this.$message.error("上传头像图片大小不能超过 300K!");
    }
    return isLt300K;
  }

  /**
   * 营业执照上传成功
   * @param res 响应数据
   * @param file 文件
   */
  licenseSuccess(res, file) {
    res = this.xmlParse.parseXML(res);
    let data = res.xml.items;
    if (data.result == XmlHttpClient.HTTP_TOKEN_EXPIRE) {
      this.$message.error("填写超时,请联系客服处理");
    } else if (data.code != XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.$message.error("图片有损坏,请更换图片");
      return false;
    }
    this.improveLicensePic = data.url + "?n=" + new Date();
  }

  //营业执照上传成功之前 限制图片大小
  beforeLicenseUpload(file) {
    this.onGetToken();
    const isLt2M = file.size / 1024 < 2048;
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2M!");
    }
    return isLt2M;
  }

  //上一步
  public backPre() {
    this.reg_step = 1;
  }

  /**
   * 提交网吧设置资料
   */
  public submitRegTwo() {
    this.onGetToken();
    this.improveInfo.token = this.usertoken.token;
    this.improveInfo.address += this.improveDetailAddress;
    this.improveInfo.business_license = this.improveLicensePic;
    this.improveInfo.number = this.netbar;
    if (
      !this.improveInfo.title  ||
      !this.improveInfo.locked_ip ||
      !this.improveInfo.address ||
      !this.improveInfo.business_id ||
      !this.improveInfo.business_license  ||
      !this.improveInfo.business_manager 
    ) {
      this.$message.error("请完善信息");
      return false;
    }
    if (this.netBarcheckip(this.improveInfo.locked_ip)) {
      this.onModi(this.improveInfo);
    }
  }

  /**
   * 完善用户资料成功
   * @param data
   */
  onModiSuccess(data) {
    this.reg_step = 3;
  }
  /**
   * 完善用户资料失败
   * @param data
   */
  onModiFail(data) {
    this.$message.error(data.msg);
  }

  /**
   * 验证ip
   * @param ip
   */
  public netBarcheckip(ip) {
    let valdata = ip.split(/[\n,]/);
    let flag = true;
    for (const item of valdata) {
      if (item==""){
         continue;
      }
      if (!netbarCheckUtil.checkIP(item)) {
        this.$message.error(
          "ip格式不正确，正确格式为多个ip'英文'逗号分割，例如192.168.1.1, 192.168.1.2"
        );
        flag = false;
        break;
      }
    }
    return flag;
  }
}

new Login({}).$mount("#login");
