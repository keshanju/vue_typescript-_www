import "../css/mui.min0125.css";
import "../css/ls2.css";
import "../css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import UserProxy from '@/ts/proxy/UserProxy';
import GlobalConfig from '../global.config';
import { CardfeeModel } from '@/ts/models/UserModel';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import { Toast } from 'vant';
import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';
import CheckUtil from '@/ts/utils/CheckUtil';
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
import AppParamModel from '@/ts/models/AppModel';
@Component({})
export default class UserCardpas extends UserProxy {
  public cardnum: string = "";
  public cardpaw: string = "";
  public appParam: AppParamModel = AppParamModel.getInstace();

  public mounted() {
    this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.init();
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
    onCardFeeSuccess() {
    let tipMsg = TipsMsgUtil.getTipsMsg(
      TipsMsgUtil.KEY_NOTIF_CARD_RECHARGE_SUCCESS
    );
    Toast(tipMsg);
  }

  /**
   * TODO... 需要重写此方法
   * 修改用户信息失败
   * @param backData
   */
  onCardFeeError(backData) {
    Toast(backData.msg);
  }

  //token过期
  public tokenExpired(param: string = ""): void {
    let tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE);
    Toast(tipMsg);
    const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
    factory.loginExpire();
  }
}