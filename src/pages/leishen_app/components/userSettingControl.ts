import "../css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import { Uploader, Toast, Dialog, Loading,Cell, CellGroup,Button } from "vant";
import UserProxy from "@/ts/proxy/UserProxy";
import GlobalConfig from "../global.config";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import JumpWeiXin from "../util/jump";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import Util from "@/ts/utils/Util";
import { LsLanguage } from "../util/LsLanguage";
import Load from "./Loading.vue";

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(
  Util.REGION_CODE_1,
  Util.ZH_CN
);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);
Vue.use(Uploader);
Vue.use(Loading);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
@Component({
  components: {
    load: Load
  }
})
export default class UserSetting extends UserProxy {
  public pic: string = "";
  public file;
  public avatar;
  mounted() {
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
    this.getUserInfo();
  }

  /**
   * 上传头像
   * @param e
   */
  public changeImage(e) {
    let file = e.target.files[0];
    if (file) {
      this.file = file;
      let picSize = 512000; //500k
      if (this.file.size > picSize) {
        let tipMsg = TipsMsgUtil.getTipsMsg(
          TipsMsgUtil.KEY_NOTIF_PICTURE_OVERSIZE
        );
        Toast(tipMsg);
        return false;
      }
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        // 这里的this 指向reader
        that.avatar = this.result;
        that.uploadAvatar(that.avatar);
      };
    }
  }

  //头像上传成功
  uploadAvatarSuccess() {
    let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_AVATAR_UPLOADED);
    Toast(tipMsg);
    setTimeout(() => {
      this.gotonavlist();
    }, 2000);
  }

  //头像上传失败
  uploadAvatarFail(data) {
    Toast(data.msg);
  }

  //token过期
  public tokenExpired(param: string = ""): void {
    let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
    Toast(tipMsg);
    setTimeout(() => {
      this.gotoLogin();
    }, 3000);
  }

  public removebind() {
    Dialog.confirm({
      title: "",
      message: "是否确定解除绑定?"
    })
      .then(() => {
        // on confirm
        this.onRemoveBing();
      })
      .catch(() => {
        // on cancel
      });
  }

  //   解除绑定成功
  onRemoveBindSuccess() {
    let tipMsg = TipsMsgUtil.getTipsMsg(
      TipsMsgUtil.KEY_WEIXIN_REMOVEBING_SUCCEED
    );
    Toast(tipMsg);
  }

  //   解除绑定失败
  onRemoveBindFaild(data) {
    Toast(data.msg);
  }

  //   去登录
  public gotoLogin() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoLogin(param);
  }

  //  去忘记密码
  public gotoforget() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoforget(param);
  }

  //  去忘记密码
  public gotonavlist() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoNavlist(param);
  }
}
