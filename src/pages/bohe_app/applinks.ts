import "@/assets/css/bohe_app.css";
import {Component, Vue} from "vue-property-decorator";
import "leigod-lib-flexible";
import "babel-polyfill";
import AppParamModel from "@/ts/models/AppModel";
import $ from "jquery";
import {LanguageConfig} from '@/ts/utils/Language';
import VueI18n from "vue-i18n";
import ConfigUtil from "@/ts/utils/ConfigUtil";
//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component
export class Applinks extends Vue {
    /**
     * 获取地址栏参数region_code
     */
    public appParam: AppParamModel = AppParamModel.getInstace();
    public androidDownloadUrl: string = '';
    public created() {
        this.appParam.getAppParam();
        this.getDownloadUrl();
    }

    /**
     * 获取下载url
     * @param url
     */
    public async getDownloadUrl() {
        const jsonConfig = await ConfigUtil.getInstance().download();
        this.androidDownloadUrl = jsonConfig.bohe.android.download_url;
        this.checkType();
    }

    public checkType() {
        const self = this;
        $(function () {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            var ua = window.navigator.userAgent.toLowerCase();
            // @ts-ignore
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //微信环境
                $(".btn_download").click(function () {
                    $(".shadow").show();
                });
                $(".shadow").click(function () {
                    $(this).hide();
                });
            } else if (isAndroid) {
                // alert(self.androidDownloadUrl);
                $(".pos_s0").attr("href", self.androidDownloadUrl);
            } else if (isiOS) {
                $(".pos_s0").attr(
                    "href",
                    "itms-services://?action=download-manifest&url=https://m.bohe.com/bohe_ios.plist"
                );
            }
        });
    }
}

//
new Applinks({
    i18n
}).$mount("#app");
