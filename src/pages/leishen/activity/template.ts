import '@/assets/less/leishen.less';
import "babel-polyfill";
import { Vue, Component } from 'vue-property-decorator';
import HeadNav from '../components/HeadNav.vue';
import FootNav from '../components/FootNav.vue';
import DownloadBox from '../components/DownloadBox.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from '../util/LsLanguage';
import HttpClient from '@/ts/net/HttpClient';
import { IdataModel } from '@/ts/models/IdataModel';
import GlobalConfig from '../global.config';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import ConfigUtil from '@/ts/utils/ConfigUtil';

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace();
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
class Activity extends Vue {
    public webParam = WebParamModel.getInstace();

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        GlobalConfig.log('切换语言:' + lang.locale);
    }

    /**
     *返回活动列表
     */
    public gotoActivity() {
        JumpWebUtil.backActivity();
    }

}

new Activity({
    i18n
}).$mount('#app');