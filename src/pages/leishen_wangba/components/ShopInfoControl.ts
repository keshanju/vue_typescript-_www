import { Vue, Component } from "vue-property-decorator";
import { UserInfoModel } from "../model/userModel";
import LocalStorageUtil from "../LocalStorageUtil";
@Component({})
export default class Shopinfo extends Vue {
  public localUserInfo: UserInfoModel;
  public face_image_url: string = "";
  public username: string = "";
  public business_status: string = "0"; //0 未审核 1 已审核成功 2 已驳回重审
  public my_onlines: string = ""; //在线电脑数量
  public my_alerts: string = ""; //告警数量
  public qualityStatus: number = 0; //审核状态码
  public qualityStatusInfo: string = ""; //审核状态说明
  public qualityCompleteStatus: string = ""; //审核状态 wait success
  public isBohuiStatus: number = 0; //是否是驳回状态 是显示驳回信息  否则不显示   0 不显示 1显示
  public isBohuiInfo: string = ""; //驳回信息

  init() {
    let info = localStorage.getItem(LocalStorageUtil.STORAGES_USER_INFO);
    if (!info) {
      return;
    }
    this.localUserInfo = JSON.parse(info) as UserInfoModel;

    this.face_image_url = this.localUserInfo.face_image_url;
    this.username = this.localUserInfo.title;
    this.business_status = this.localUserInfo.business_status;
    this.my_onlines = this.localUserInfo.my_onlines;
    this.my_alerts = this.localUserInfo.my_alerts;
    this.isBohuiInfo = '驳回原因:'+this.localUserInfo.business_check_info;

    // 审核状态
    switch (this.business_status) {
      case "0":
        this.qualityStatus = 4;
        this.qualityStatusInfo = "待完成";
        this.qualityCompleteStatus = "wait";
        break;
      case "1":
        this.qualityStatus = 5;
        this.qualityStatusInfo = "审核成功";
        this.qualityCompleteStatus = "success";
        break;
      case "2":
        this.qualityStatus = 4;
        this.qualityStatusInfo = "驳回重审";
        this.qualityCompleteStatus = "wait";
        this.isBohuiStatus=1;
        break;
      case "3":
        this.qualityStatus = 4;
        this.qualityStatusInfo = "账号冻结";
        this.qualityCompleteStatus = "wait";
        break;
    }
  }
  mounted() {
    this.init();
  }
  /**
 * 重新申请
 */
  public gotoApply() {
    window.location.href =
      "reg.html?regstep=2&regToken=" +
      LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
  }
  /**
   * 跳转修改资料
   */
  private gotoEditInfo() {
    (this.$root as any).curNavIndex = 4;
  }
  /**
   * 跳转壁纸设置
   */
  private gotoSetWallPaper() {
    (this.$root as any).curNavIndex = 2;
  }
}
