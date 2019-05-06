import "../css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import UserProxy from "@/ts/proxy/UserProxy";
import GlobalConfig from "../global.config";
import { CardfeeModel } from "@/ts/models/UserModel";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { Toast, Loading } from "vant";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import CheckUtil from "@/ts/utils/CheckUtil";
import JumpWeiXin from "../util/jump";
import Load from "./Loading.vue";
import AppParamModel from "@/ts/models/AppModel";
import {Tabs,Tab,Dialog} from "vant";
import Util from "@/ts/utils/Util";
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(Dialog)
Vue.use(Loading);
@Component({
  components: {
    load: Load
  }
})
export default class UserCardpas extends UserProxy {
  public cardnum: string = "";
  public cardpaw: string = "";
  public expiryDate:string=''
  private appParam: AppParamModel = AppParamModel.getInstace();
  public mounted() {
    this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.init();
  }
  public  payCDKey(){
    if (this.cd_key == "") {
      Toast('CDKEY不能为空');
      return false;
    }else{
      this.onPayCDKey()
    }
  }
  public oncharge() {
    let param = new CardfeeModel();
    param.account_token = LocalStorageUtil.getUserToken().account_token;
    if (this.cardnum == "") {
      let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_CARD_NUM_EMPTY);
      Toast(tipMsg);
      return false;
    }
    if (!CheckUtil.checkCardNum(this.cardnum)) {
      let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_CARD_NUM_ERROR);
      Toast(tipMsg);
      return false;
    }
    if (this.cardpaw == "") {
      let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_CARD_PWD_EMPTY);
      Toast(tipMsg);
      return false;
    }
    if (!CheckUtil.checkCardPwd(this.cardpaw)) {
      let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_CARD_PWD_ERROR);
      Toast(tipMsg);
      return false;
    }

    param.card_no = this.cardnum;
    param.password = this.cardpaw;
    this.onCardFee(param);
  }

  /**
   * TODO... 需要重写此方法
   * 充值成功
   */
  onCardFeeSuccess(data) {
    if(data.data.card_type.toString()=='2'){
      //如果充值卡的类型为可以暂停的充值卡，提示到期时间和有效期
      let lang=Util.getUrlParam('language')||LocalStorageUtil.getLanguage();
      this.cd_key_min=data.data.experience_minutes;
      this.cd_key_time=Util.minToDay(this.cd_key_min,lang);
      this.cdKeySuceess(this.$i18n.t('user.b67_5').toString(),this.backData.data.experience_expiry_time)
    }else{
      this.cdKeySuceess(this.$i18n.t('user.b67_5').toString())
    }

  }

  /**
   * TODO... 需要重写此方法
   * 修改用户信息失败
   * @param backData
   */
  onCardFeeError(backData) {
    Toast(backData.msg);
  }
  //CDKey支付成功
  public cdKeySuceess(msg: string, expiry_time?: string) {
    if (expiry_time) {
      //可以暂停的体验卡充值成功
      this.expiryDate = expiry_time
      Dialog.alert({
        title: '充值成功',
        message: '您获取了'+this.cd_key_time+'的体验加速时长,<br/>体验有效期到'+expiry_time
      }).then(() => {
        // on close
        setTimeout(() => {
          this.gotonavlist();
        }, 1000);
      });
    } else {
      //不可以暂停的体验卡充值成功
      Toast(msg);
      setTimeout(() => {
        this.gotonavlist();
      }, 1000);
    }
  }

  //CDKey支付失败
  public cdKeyError(msg: string) {
    Toast(msg)
  }
  //token过期
  public tokenExpired(param: string = ""): void {
    let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
    Toast(tipMsg);
    setTimeout(() => {
      this.gotoLogin();
    }, 3000);
  }

  //   去登录
  public gotoLogin() {
    let param = "platform=" + this.appParam.platform;
    JumpWeiXin.gotoLogin(param);
  }

  //   去用户列表
  public gotonavlist() {
    let param = "platform=" + this.appParam.platform;
    JumpWeiXin.gotoNavlist(param);
  }
}
