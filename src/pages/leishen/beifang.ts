import '@/assets/less/leishen.less';
import "babel-polyfill";
import { Vue, Component } from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import VueI18n from "vue-i18n";
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from "@/pages/leishen/util/LsLanguage";
import Util from '@/ts/utils/Util';
import ConfigUtil from '@/ts/utils/ConfigUtil';

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        'download-box': DownloadBox
    }
})
class BeiFang extends Vue {
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public windowsDownloadUrl: string = '';//windows客户端下载配置
    public macDownloadUrl: string = '';//mac客户端下载配置

    public created(){
        this.getDownloadUrl();
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        this.webParam.language = ln;
        // GlobalConfig.log('切换语言:' + lang.locale);
    }

    /**
     * 获取推荐头像列表
     * @param url
     */
    public async getDownloadUrl() {
        const jsonConfig = await ConfigUtil.getInstance().download();
        this.windowsDownloadUrl = jsonConfig.leigod.windows.download_url;
        this.macDownloadUrl = jsonConfig.leigod.mac.download_url;
    }

    /**
     * 下载windows客户端
     * @param ln 
     */
    public windowsDownload() {
        // let tdModel = new TdappModel();
        // tdModel.getBrowser();
        window.location.href = this.windowsDownloadUrl;
    }

}

new BeiFang({
    i18n
}).$mount('#app');
