import "./css/mui.min0125.css";
import "./css/ls2.css";
import "./css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import UserProxy from "@/ts/proxy/UserProxy";
import Util from "@/ts/utils/Util";
import UserInfo from "./components/UserInfo.vue";
import UserCardpas from "./components/UserCardpas.vue";
import UserSetting from "./components/UserSetting.vue";
import loading from './components/Loading.vue'

import UserOrder from "./components/UserOrder.vue";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import { LanguageConfig } from "@/ts/utils/Language";

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(1);
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);
@Component({
	components: {
		"user-info": UserInfo,
		"user-cardpsw": UserCardpas,
		"user-setting": UserSetting,
		"user-orders": UserOrder,
		loading:loading
	}
})
class User extends UserProxy {
	public showIndex: string = Util.getUrlParam("pageIndex"); //用户中心显示索引
	public isLoading:boolean=true
	/**
	 * 切换语言
	 */
	public onChangeLanguage(ln: string) {
		lang.changeLanguage(ln, false, true);
		// 页面再次加载即可
		i18n.locale = lang.locale;
	}
	mounted(){
		this.$nextTick(()=>{
			this.isLoading=false
		})
	}
}
//
let vueC = new User({
	i18n
}).$mount("#app");
