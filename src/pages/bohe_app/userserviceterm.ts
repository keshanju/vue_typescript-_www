import "./css/mui.min0125.css";
import "./css/ls2.css";
import "./css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import loading from './components/Loading.vue'

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
		loading:loading
	}
})
class User extends Vue {
	public isLoading:boolean=true
	mounted(){
		this.$nextTick(()=>{
			this.isLoading=false
		})
	}
}
new User({
	i18n
}).$mount("#app");
