import '../../../assets/less/leishen_app.less';
import '@/assets/less/activity.less';
import 'babel-polyfill';
import { Component, Vue } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';
import { LsLanguage } from '../util/LsLanguage';
import Util from '@/ts/utils/Util';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import { IdataModel } from "@/ts/models/IdataModel";
import ActivityFactory from "@/ts/factory/activity.factory";
import AppParamModel from "@/ts/models/AppModel";
import $ from "jquery";
import JumpWeiXin from "@/pages/leishen_app/util/jump";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component
class activityModel extends ActivityProxy {

    // http://localhost:8080/shuangdan.html?id=36&region_code=1&language=zh_CN&account_token=VxHnkvLQZFN1PVvXHgBzuZFZksgKZ0Bk5WcJYox657pvSKgzcgTgUgdb0R3wdL90
    public activity_id = 0;
    public activity_json = ActivityFactory.getInstace('mobile',this.activity_id);
    public appParam = AppParamModel.getInstace(); // 浏览器参数

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
        this.appParam.language = ln;
    }


    /**
     * 登录
     */
    public gotoLogin() {
        let param = "platform=" + this.appParam.platform;
        JumpWeiXin.gotoLogin(param);
    }

    /**
     * 充值
     */
    public gotoRecharge() {
        let param = "platform=" + this.appParam.platform;
        JumpWeiXin.gotoRecharge(param);
    }

    /**
     * 兑奖
     */
    public gotoDuijiang(status: number = 0) {

    }


}

new activityModel({ i18n }).$mount('#app')
