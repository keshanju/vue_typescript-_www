import '@/assets/less/leishen.less';
import "babel-polyfill";
import {Vue, Component} from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import {LsLanguage} from './util/LsLanguage';
import GlobalConfig from './global.config';
import Util from "@/ts/utils/Util";
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import {Carousel, CarouselItem} from 'element-ui';
import ConfigUtil from '@/ts/utils/ConfigUtil';

Vue.config.productionTip = false;

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
        'download-box': DownloadBox,
        'el-carousel': Carousel,
        'el-carousel-item': CarouselItem,
    }
})
class Recharge extends Vue {
    public webParam = WebParamModel.getInstace();
    public chooseIndex:number = 4;
    public activity_url: string = '';

    public created(){
        this.getActivityUrl();
    }
    /**
     * 选择套餐类型
     */
    public onChoosePrice(index: number) {
        this.chooseIndex = index;
    }

    /**
     * 获取活动url
     */
    public async getActivityUrl() {
        const jsonConfig = await ConfigUtil.getInstance().download();
        this.activity_url = jsonConfig.leigod.activity.activity_url;
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
     * 立即购买
     * @param ln 
     */
    public buyNow() {
        if (LocalStorageUtil.getUserToken().account_token != '') {
            JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER,'page=1');
        } else {
            JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_LOGIN);
        }
    }
}

new Recharge({
    i18n
}).$mount('#app');