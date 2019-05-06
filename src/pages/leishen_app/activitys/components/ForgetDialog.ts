import { Component, Vue } from "vue-property-decorator";
import { Popup, Checkbox, Picker, Tab, Tabs, Toast,Loading } from "vant";
import { RegisterProxy } from "@/ts/proxy/RegisterProxy";
import Util from "@/ts/utils/Util";
import GlobalConfig from "../../global.config";
import CheckUtil from "@/ts/utils/CheckUtil";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import { LsLanguage } from "@/pages/leishen_app/util/LsLanguage";
import JumpWeiXin from "../../util/jump";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import Load from "../../components/Loading.vue";
import Md5 from 'md5';
import Countries from '../../components/Country.vue';
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Picker);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Checkbox);
Vue.use(Popup);

//语言
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(
  Util.REGION_CODE_1,
  Util.ZH_CN
);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
  components: {
    'load': Load,
    'country-item': Countries
  }
})
export default class RegisterDialog extends RegisterProxy {
  
}
