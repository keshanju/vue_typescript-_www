import "./css/mui.min0125.css";
import "./css/ls2.css";
import "./css/wap.less";
import { Vue, Component } from 'vue-property-decorator';
import UserProxy from '@/ts/proxy/UserProxy';
import Util from '@/ts/utils/Util';
import UserInfo from "./components/UserInfo.vue";
import UserCardpas from "./components/UserCardpas.vue";
import UserSetting from "./components/UserSetting.vue";
import UserOrder from "./components/UserOrder.vue";
import AppParamModel from '@/ts/models/AppModel';
import { LsLanguage } from './util/LsLanguage';
import NavList from './components/NavList.vue';
import VueI18n from "vue-i18n";

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);
@Component({
  components: {
    "user-info": UserInfo,
    "user-cardpsw": UserCardpas,
    "user-setting": UserSetting,
    "user-orders": UserOrder,
    "navlist":NavList
  }
})
class User extends UserProxy {
  public showIndex: string = Util.getUrlParam("pageIndex"); //用户中心显示索引

}
//
let vueC = new User({

}).$mount("#app");