import { Vue, Component } from "vue-property-decorator";
import JumpWeiXin from "../util/jump";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import Util from "@/ts/utils/Util";
import { LsLanguage } from "../util/LsLanguage";
//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(
  Util.REGION_CODE_1,
  Util.ZH_CN
);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);
@Component({})
export default class NavList extends Vue {
  public pageindex: number = 0;
  public pageName: string = ""; // 当前的页面

  mounted() {
    this.getPageIndex();
  }
  /**
   * 通过地址栏获取当前页面
   */
  public getPageIndex() {
    const href = window.location.href;
    const arr = href.split("/");
    this.pageName = arr[arr.length - 1].split("?")[0];
    if (this.pageName == "") {
      this.pageName = "index.html";
    }
  }
  /**
   * 去用户导航列表
   * */
  public gotonavlist() {
    let param = "platform=" + appParam.platform + "&pageIndex=" + 1;
    JumpWeiXin.gotoNavlist(param);
  }
  /**去暂停
   *  */
  public gotopause() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoPause(param);
  }
  /**去首页
   *  */
  public gotoindex() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoIndex(param);
  }

  /**
   * 去充值
   *  */
  public gotoRecharge() {
    let param = "platform=" + appParam.platform;
    JumpWeiXin.gotoRecharge(param);
  }
}
