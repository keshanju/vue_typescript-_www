import { Vue, Component } from "vue-property-decorator";
import "babel-polyfill";
import "./less/leigodwangba.less";
import GlobalConfig from "./global_config";
import XmlHttpClient from "@/ts/net/XmlHttpClient";
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "./LocalStorageUtil";
import {
  UserInfoModel,
  WallPaperModel,
  OnlineModel,
  ImproveRequestModel,
  onloadImproveRequestModel
} from "./model/userModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import { XmlDataModel } from "@/ts/models/IdataModel";

@Component
export class UserUtil extends Vue {
  public xmlHttp: XmlHttpClient = new XmlHttpClient();
  public isLoading: boolean; //
  public backData: XmlDataModel | undefined;
  public userInfo: UserInfoModel = new UserInfoModel();
  public localUserInfo: UserInfoModel;
  public face_image_url: string = ""; //默认头像
  public username = ""; //用户名
  public curNavIndex: number = 1;
  public editAvatarVisible: boolean = false; //修改头像
  public isPerfectinfo: boolean = true; //是否完善了资料填写
  public setBaseUrl(url: string): void {
    this.xmlHttp.setBaseUrl(url);
  }

  public init() {
    let info = localStorage.getItem(LocalStorageUtil.STORAGES_USER_INFO);
    this.localUserInfo = JSON.parse(info) as UserInfoModel;
    this.changePortrait();
    this.username = this.localUserInfo.title;
  }
  /**
   * 如果用户未完成完善资料 那么去完善资料页面
   */
  public gotoRegInfo(d) {
    if (d.business_id) {
    } else {
      window.location.href =
        "reg.html?regstep=2&regToken=" +
        LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
    }
  }

  /**
   * 处理显示头像
   */
  public changePortrait() {
    if (this.localUserInfo.face_image_url == "") {
      this.face_image_url = "./images/wangba_default1.png";
    } else {
      this.face_image_url = this.localUserInfo.face_image_url;
    }
  }

  /**
   * 获取用户详细信息
   */
  public async getUserInfo() {
    try {
      this.isLoading = true;
      let token = Util.getUrlParam("account_token");
      if (token == "") {
        token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
      }
      const url = XmlHttpClient.URL_WBOP_GETUSERINFO;
      const param = {
        token: token
      };
      let d = await this.xmlHttp.post<UserInfoModel>(url, param);
      this.isLoading = false;
      if (d.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
        // 存储用户信息
        this.userInfo.username = d.username;
        this.userInfo.expiretime = d.expiretime;
        if (
          d.face_image_url == "" ||
          d.face_image_url == null ||
          d.face_image_url == undefined
        ) {
          this.userInfo.face_image_url = "./images/wangba_default.png";
        } else {
          this.userInfo.face_image_url = d.face_image_url;
        }
        this.userInfo.business_status = d.business_status;
        this.userInfo.my_onlines = d.my_onlines;
        this.userInfo.my_alerts = d.my_alerts;
        this.userInfo.title = d.title;
        this.userInfo.tel = d.tel;
        this.userInfo.locked_ip = d.locked_ip;
        this.userInfo.qq = d.qq;
        this.userInfo.mail = d.mail;
        this.userInfo.address = d.address;
        this.userInfo.number = d.number;
        this.userInfo.business_manager = d.business_manager;
        this.userInfo.business_id = d.business_id;
        this.userInfo.business_license = d.business_license;
        this.userInfo.business_weixin = d.business_weixin;
        this.userInfo.business_check_info = d.business_check_info;

        this.addUserInfo(this.userInfo);
        this.getInfoSuccess(d);
      } else if (d.code == XmlHttpClient.HTTP_TOKEN_EXPIRE) {
        this.tokenexpire();
      }
    } catch (e) {
      this.network();
    }
  }

  //获取用户信息成功
  getInfoSuccess(d) {
    this.gotoRegInfo(d);
    (this.$refs["shopinfo"] as any).init();
    (this.$refs["headnav"] as any).changePortraitInfo();
  }

  /**
   * 保存用户信息
   * @param userInfo
   */
  public addUserInfo(userInfo: UserInfoModel) {
    localStorage.setItem(
      LocalStorageUtil.STORAGES_USER_INFO,
      JSON.stringify(userInfo)
    );
    LocalStorageUtil.setCookie(
      LocalStorageUtil.STORAGES_USER_INFO,
      JSON.stringify(userInfo),
      -1
    );
  }

  /**
   * 退出
   */
  public async LoginOut() {
    this.isLoading = true;
    const token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
    const url = XmlHttpClient.DO_LOGINOUT;
    const param = {
      token: token
    };
    let d = await this.xmlHttp.post<XmlDataModel>(url, param);
    this.isLoading = false;
    if (
      d.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE ||
      d.code == XmlHttpClient.HTTP_TOKEN_EXPIRE
    ) {
      UserUtil.loginOut();
      JumpWebUtil.backHome();
    } else {
      //退出登录失败
      this.$message({
        showClose: true,
        message: d.msg,
        type: "error"
      });
    }
  }

  /**
   * 获取壁纸配置文件
   */
  public async getWallpaper() {
    let url = XmlHttpClient.GET_WALLPAPER_LIST;
    let token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
    let param = { token: token };
    this.backData = await this.xmlHttp.post<WallPaperModel>(url, param);
    if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.getWallpaperSuccess(this.backData);
    } else if ((this.backData.code = XmlHttpClient.HTTP_TOKEN_EXPIRE)) {
      this.tokenexpire();
    } else {
      this.getWallpaperFail(this.backData);
    }
  }
  /**
   * 获取壁纸配置文件成功
   */
  public getWallpaperSuccess(data) {}
  /**
   * 获取壁纸配置文件失败
   */
  public getWallpaperFail(data) {}

  /**
   * 登录过期处理
   */
  public tokenexpire() {
    this.$message({
      showClose: true,
      duration: 2000,
      message: "登录失效,请重新登录",
      type: "error",
      onClose: function() {
        UserUtil.loginOut();
        window.location.href = "login.html";
      }
    });
  }
  /**
   * 网络错误
   */
  public network() {
    this.$message({
      showClose: true,
      duration: 2000,
      message: "网络错误,请稍后重试",
      type: "error",
      onClose: function() {
        UserUtil.loginOut();
        window.location.href = "login.html";
      }
    });
  }

  /**
   * 获取在线列表
   */
  public async onGetOnlineList() {
    let url = XmlHttpClient.URL_WBOP_GETONLINE_LIST;
    let token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
    let param = { token: token };
    this.backData = await this.xmlHttp.post<OnlineModel>(url, param);
    if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.getOnlineSuccess(this.backData);
    } else if ((this.backData.code = XmlHttpClient.HTTP_TOKEN_EXPIRE)) {
      this.tokenexpire();
    } else {
      this.getOnlineFail(this.backData);
    }
  }

  /**
   * 获取在线列表成功
   * @param data
   */
  public getOnlineSuccess(data) {}

  /**
   * 获取在线列表失败
   * @param data
   */
  public getOnlineFail(data) {}

  /**
   * 踢用户下线
   */
  public async onOffLine(sessionid) {
    let url = XmlHttpClient.URL_DO_OFFLINE;
    let token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
    let param = { token: token, sessionid: sessionid };
    this.backData = await this.xmlHttp.post<OnlineModel>(url, param);
    if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.offLineSuccess(this.backData);
    } else if ((this.backData.code = XmlHttpClient.HTTP_TOKEN_EXPIRE)) {
      this.tokenexpire();
    } else {
      this.offlineFail(this.backData);
    }
  }
  /**
   * 踢用户下线成功
   * @param data
   */
  public offLineSuccess(data) {}
  /**
   * 踢用户下线失败
   * @param data
   */
  public offlineFail(data) {}

  /**
   * 退出登录
   */
  public static loginOut() {
    localStorage.removeItem(LocalStorageUtil.STORAGES_USER_INFO);
    localStorage.removeItem(LocalStorageUtil.STORAGES_TOKEN);
    LocalStorageUtil.removeCookie(LocalStorageUtil.STORAGES_TOKEN);
    LocalStorageUtil.removeCookie(LocalStorageUtil.STORAGES_USER_INFO);
    LocalStorageUtil.removeCookie("regToken");
  }

  /**
   * 上传头像
   */
  public async onSaveUserface(file) {
    let url = XmlHttpClient.DO_SERVEFACE;
    let token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
    let param = { token: token, image: file };
    this.backData = await this.xmlHttp.post<XmlDataModel>(url, param);
    if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.onSaveUserfaceSuccess(this.backData);
    } else if ((this.backData.code = XmlHttpClient.HTTP_TOKEN_EXPIRE)) {
      this.tokenexpire();
    } else {
      this.onSaveUserfaceFail(this.backData);
    }
  }
  /**
   * 上传头像成功
   * @param data
   */
  onSaveUserfaceSuccess(data: XmlDataModel) {}

  /**
   * 上传头像失败
   * @param data
   */
  onSaveUserfaceFail(data: XmlDataModel) {}

  /**
   * 完善用户资料
   */
  public async onModi(param: ImproveRequestModel) {
    let url = XmlHttpClient.DO_MODI;
    this.backData = await this.xmlHttp.post<XmlDataModel>(url, param);
    if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.onModiSuccess(this.backData);
    } else if (this.backData.code == XmlHttpClient.HTTP_TOKEN_EXPIRE) {
      this.tokenexpire();
    } else {
      this.onModiFail(this.backData);
    }
  }
  /**
   * 完善用户资料成功
   * @param data
   */
  onModiSuccess(data) {}
  /**
   * 完善用户资料失败
   * @param data
   */
  onModiFail(data) {}

  /**
   * 用户中心完善用户资料
   */
  public async onUserModi(param: onloadImproveRequestModel) {
    let url = XmlHttpClient.DO_MODI;
    this.backData = await this.xmlHttp.post<XmlDataModel>(url, param);
    if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.onUserModiSuccess(this.backData);
    } else if (this.backData.code == XmlHttpClient.HTTP_TOKEN_EXPIRE) {
      this.tokenexpire();
    } else {
      this.onUserModiFail(this.backData);
    }
  }
  /**
   * 用户中心完善用户资料成功
   * @param data
   */
  onUserModiSuccess(data) {}
  /**
   * 用户中心完善用户资料失败
   * @param data
   */
  onUserModiFail(data) {}
}
