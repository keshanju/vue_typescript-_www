import '@/assets/less/leishen.less';
import "babel-polyfill";
import { Vue, Component } from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import VueI18n from "vue-i18n";
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from './util/LsLanguage';
// import { LsLanguage } from "@/pages/leishen/util/LsLanguage";
import Util from '@/ts/utils/Util';

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
class CancelPause extends Vue {
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public joinleftfix: Number = 0; //加入我们页面左侧固定 0 不固定  1固定

    public mounted() {
        window.onscroll = () => {
            this.pageScroll(930);
        };
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
     * 实现右侧内容滚动 左侧随着高亮
     * @param h 小于这个高度 左侧成绝对定位  否则为固定定位
     * @param num 左侧列表内容数量+1
     */
    public pageScroll(h) {
        let scrT = Util.scroll().top;
        if (scrT < h) {
            this.joinleftfix = 0;
        } else {
            this.joinleftfix = 1;
        }
    }
}

new CancelPause({
    i18n
}).$mount('#app');
