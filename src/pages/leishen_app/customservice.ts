import "@/assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import { Vue, Component } from "vue-property-decorator";
import VueI18n from "vue-i18n";
import { LsLanguage } from "./util/LsLanguage";
import UchatUtil, { UchatModels } from "@/ts/utils/UchatUtil";
import GlobalConfig from "./global.config";
import { ExtrnalFactory } from "@/ts/factory/ExtrnalFactory";
import AppParamModel from "@/ts/models/AppModel";
import Util from "@/ts/utils/Util";

let lang = LsLanguage.getInstance();
lang.initNoRefresh();
//语言包
Vue.use(VueI18n);

const i18n = new VueI18n(lang);
@Component
class custom extends Vue {
    public appParam: AppParamModel = AppParamModel.getInstace();

	created() {
        if(this.appParam.region_code == 1){
            this.onUchat();
        }
	}

	/**
	 * 聊天
	 */
	public onUchat() {
		const chat = new UchatUtil();
		const mod = new UchatModels();
		mod.imnumber = GlobalConfig.UC_IM_Number;
		mod.box = true;
		chat.pop(mod);
		const url = chat.openWeb();
		window.location.replace(url);
	}
}
new custom({ i18n }).$mount("#app");
