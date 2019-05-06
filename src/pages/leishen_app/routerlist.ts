import "@/assets/less/leishen_app.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import VueI18n from "vue-i18n";
import {Component, Vue} from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import {LsLanguage} from "./util/LsLanguage";
import GlobalConfig from "./global.config";
import HttpClient from "@/ts/net/HttpClient";
import Util from "@/ts/utils/Util";
import Clipboard from "clipboard";
import {Toast} from 'vant';
import ConfigUtil from "@/ts/utils/ConfigUtil";

Vue.use(Toast);

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
class RouterList extends Vue {
    public http = new HttpClient();
    public routerMoudel = {};

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.ongetrouterList()
    }


    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

     public async ongetrouterList(){
         const getRouterList = await ConfigUtil.getInstance().getRouterList();
         this.routerMoudel = getRouterList.data;
         for (let item in this.routerMoudel) {
             this.routerMoudel[item].isUpDown = false;
         }
    }
    /**
     * 查看更多
     */
    public checkMore(title: string, item: any) {
        console.log(title)
        switch (title) {
            case 'huasuo':
                item['isUpDown'] = !item['isUpDown'];
                break;
            case 'wangjian':
                item.isUpDown = !item.isUpDown;
                break;
            case 'other':
                item.isUpDown = !item.isUpDown;
                break;
            default:
                break;
        }
        // this.routerMoudel = JSON.parse(JSON.stringify(this.routerMoudel));
        this.$forceUpdate();
    }

    /**
     * 复制
     */
    public copyRouterTitle(title: string) {
        let routerTitle = title;
        let clipboard = new Clipboard("#copyRouterTitle", {
            text: function () {
                return routerTitle;
            }
        });
        clipboard.on("success", function (e) {
            e.clearSelection();
        });
        // Util.copyToClipboard(routerTitle);
        Toast.success('已复制');
    }
}

new RouterList({i18n}).$mount("#app");
