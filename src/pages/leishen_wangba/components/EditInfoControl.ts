import { Vue, Component } from "vue-property-decorator";
import LocalStorageUtil from "../LocalStorageUtil";
import XmlHttpClient from "@/ts/net/XmlHttpClient";
import AvatarEdit from "./UserAvatarEdit.vue";
import {
  UploadAvatarRequestModel,
  UserInfoModel,
  ImproveRequestModel,
  onloadImproveRequestModel
} from "../model/userModel";
import GlobalConfig from "../global_config";
import { UserUtil } from "../UserUtil";
import XmlToJsonUtil from "@/ts/utils/XmlToJsonUtil";
import { Input, Upload, Message } from "element-ui";
import CheckUtil from "@/ts/utils/CheckUtil";
import netbarCheckUtil from "../netbarCheckUtil";
Vue.use(Input);
Vue.use(Upload);
Vue.prototype.$message = Message;
@Component({
  components: {
    avataredit: AvatarEdit
  }
})
export default class EditInfo extends UserUtil {
  public isLoading: boolean;
  public userInfo: UserInfoModel = JSON.parse(
    localStorage.getItem(LocalStorageUtil.STORAGES_USER_INFO)
  ) as UserInfoModel;
  public usertoken = { token: "" }; //token
  public improveLogoPic: string = ""; //头像地址
  public uploadLogoImgurl = ""; //头像上传的后台接口
  public userInfoForm = new onloadImproveRequestModel();

  //公共参数
  protected xmlParse = new XmlToJsonUtil();
  public xmlHttp: XmlHttpClient = new XmlHttpClient(); //xml 封装
  //设置地址
  public setBaseUrl(url: string): void {
    this.xmlHttp.setBaseUrl(url);
  }

  /**
   * 上传图片基本设置
   * token
   */
  onGetToken() {
    let token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
    this.usertoken.token = token;
  }

  changeUploadUrl() {
    this.uploadLogoImgurl =
      GlobalConfig.getBaseUrl() + "api.aspx?op=" + XmlHttpClient.DO_SERVEFACE;
  }

  mounted() {
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.improveLogoPic = this.userInfo.face_image_url;
    this.onGetToken();
    this.changeUploadUrl();
    this.formdataInit();
  }

  /**
   * 初始化表单信息
   */
  private formdataInit() {
    this.userInfoForm.title = this.userInfo.title;
    this.userInfoForm.tel = this.userInfo.tel;
    this.userInfoForm.locked_ip = this.userInfo.locked_ip;
    this.userInfoForm.qq = this.userInfo.qq;
    this.userInfoForm.mail = this.userInfo.mail;
  }

  /**
   * 提交网吧设置资料
   */
  public changeInfo() {
    let token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
    this.userInfoForm.token = token;
    if (this.userInfoForm.mail != "") {
      if (!CheckUtil.checkEmail(this.userInfoForm.mail)) {
        this.$message.error("邮箱格式错误");
        return false;
      }
    }
    if (this.netBarcheckip(this.userInfoForm.locked_ip)) {
      this.onUserModi(this.userInfoForm);
    }
  }

  /**
   * 完善用户资料成功
   * @param data
   */
  onUserModiSuccess(data) {
    this.userInfo.title = this.userInfoForm.title;
    this.userInfo.tel = this.userInfoForm.tel;
    this.userInfo.locked_ip = this.userInfoForm.locked_ip;
    this.userInfo.qq = this.userInfoForm.qq;
    this.userInfo.mail = this.userInfoForm.mail;
    this.addUserInfo(this.userInfo);

    this.$message({
      showClose: true,
      message: "信息修改成功",
      type: "success",
      onClose: () => {
        //初始化所有信息
        (this.$root as any).init();
        (this.$root.$refs["headnav"] as any).changePortraitInfo();
        (this.$root as any).curNavIndex = 1;
      }
    });
  }
  /**
   * 完善用户资料失败
   * @param data
   */
  onUserModiFail(data) {
    this.$message.error(data.msg);
  }

  /**
   * logo上传
   * @param res 响应数据
   * @param file 文件
   */
  logoSuccess(res, file) {
    res = this.xmlParse.parseXML(res);
    let data = res.xml.items;
    if (data.result == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.$message.success("头像上传成功");
      //更新缓存的头像
      this.userInfo.face_image_url = URL.createObjectURL(file.raw);
      this.addUserInfo(this.userInfo);
      //初始化所有信息
      (this.$root as any).init();
      (this.$root.$refs["headnav"] as any).changePortraitInfo();
    } else if (data.result == XmlHttpClient.HTTP_TOKEN_EXPIRE) {
      this.tokenexpire();
    } else if (data.code != XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.$message.error("图片有损坏,请更换图片");
      return false;
    }
    this.improveLogoPic = URL.createObjectURL(file.raw);
  }

  //头像上传之前 限制图片大小
  beforelogoUpload(file) {
    const isLt300K = file.size / 1024 < 300;
    if (!isLt300K) {
      this.$message.error("上传头像图片大小不能超过 300K!");
    }
    return isLt300K;
  }

  /**
   * 验证ip
   * @param ip
   */
  public netBarcheckip(ip) {
    let valdata = ip.split(/[\n,]/);
    let flag = true;
    for (const item of valdata) {
      if (item == "") {
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
