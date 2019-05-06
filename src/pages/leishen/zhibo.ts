import '@/assets/less/leishen.less';
import '@/assets/less/activity.less';
import 'babel-polyfill';
import { Component, Vue } from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import VueI18n from 'vue-i18n';
import { LsLanguage } from './util/LsLanguage';
import GlobalConfig from './global.config';
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import WebParamModel from "@/ts/models/WebModel";
import Util from "@/ts/utils/Util";
import { Dialog } from "element-ui";
import ActivityProxy from "@/ts/proxy/ActivityProxy";

Vue.config.productionTip = false;

//判断是否跳转移动站点
const mUrl = GlobalConfig.getMobWebBaseUrl() + '/' + 'kaixue.html';
JumpWebUtil.checkMobile(mUrl);

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        'el-dialog': Dialog
    }
})
class Zhibo extends ActivityProxy {
    public zhibo_zj: string = '';
    public zhibo_user_list = [
        '138****8956',
        '186****2258',
        '158****6395',
        '187****3369',
        '159****8869',
        '136****6621',
        '177****8695',
        '152****1485',
        '133****5523',
        '155****3628',
        '139****2485',
        '158****3324',
        '188****5184',
        '131****9981'
    ];
    public timer = null;//抽奖定时器
    public rolling: boolean = false;//是否抽奖中
    public zjDialogVisible: boolean = false;//中奖弹窗

    public clickRoll(){
        this.rolling = true;
        let n = 0;
        const that = this;
        this.timer = setInterval(()=>{
            that.zhibo_zj = that.zhibo_user_list[n];
            n++;
            if(n>=that.zhibo_user_list.length) {
                n=0;
            };
        },20)
    }

    public clickStop(){
        this.rolling = false;
        clearInterval(this.timer);
        this.zhibo_zj = '186****2945';
        this.zjDialogVisible = true;
    }
}

new Zhibo({ i18n }).$mount('#app')