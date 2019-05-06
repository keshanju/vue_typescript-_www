import '@/assets/less/leishen.less';
import '@/assets/less/activity.less';
import 'babel-polyfill';
import { Component, Vue } from 'vue-property-decorator';
import $ from "jquery";
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from './util/LsLanguage';
import GlobalConfig from './global.config';
import Util from '@/ts/utils/Util';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { Dialog } from "element-ui";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import { IdataModel } from "@/ts/models/IdataModel";
import ActivityFactory from "@/ts/factory/activity.factory";
import {timeClock} from "@/ts/models/NewsModel";

Vue.config.productionTip = false;

//判断是否跳转移动站点
const mUrl = GlobalConfig.getMobWebBaseUrl() + '/' + 'hanjia.html';
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
class activityModel extends ActivityProxy {

    // http://localhost:8080/shuangdan.html?id=36&region_code=1&language=zh_CN&account_token=VxHnkvLQZFN1PVvXHgBzuZFZksgKZ0Bk5WcJYox657pvSKgzcgTgUgdb0R3wdL90
    public activity_id = 170;
    public activity_json = ActivityFactory.getInstace('pc',this.activity_id);
    public webParam = WebParamModel.getInstace(); // 浏览器参数

    /**
     *
     */
    public mounted() {
        window.onscroll = () => {
            this.pageScroll(835);
        };
        this.luck.init('prize','.hj_prize');
        this.getAwardList();
        const that = this;
        setInterval(function(){
            that.clock = Object.assign({}, that.getClock(that.activity_json.endtime));
        },1000)
    }

    /**
     * 中奖
     */
    public onDrawWin(backData: IdataModel<any>) {
        //播放奖品动画
        if(this.activity_json.choujiang_type == 1){
            this.luck.speed = 100;
            this.roll();
        };
        if(this.activity_json.choujiang_type == 0){
            this.isBengin = false;
            this.isWin = true;
            this.dialog_win = true;//弹出奖品图片动画
            this.prize_name = backData.data.title;
            this.prize_id = backData.data.present_id;
        };

        //计算次数
        this.points = backData.data.points;
        this.getActivityCount();
        this.getActiveRecordList();
    }

    /**
     * 未中奖
     */
    public onDrawLose(backData: IdataModel<any>) {
        this.isBengin = false;
        this.isWin = false;
        //提示
        this.dialog_error = true;
        this.dialog_msg = backData.msg;
        //计算次数
        this.points = backData.data.points;
        this.getActivityCount();
    }

    /**
     * token过期
     * @param param
     */
    public tokenExpired(param: string = null): void {
        LocalStorageUtil.loginOut();
        this.account_token = '';
        this.userInfo = null;
        (this.$refs.head as any).checkLogin();
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        this.webParam.language = ln;
    }
}

new activityModel({ i18n }).$mount('#app')