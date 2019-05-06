import '../../../assets/css/animate.min.css';
import '@/assets/less/leishen.less';
import './assets/less/wuyi.less';
import 'babel-polyfill';
import { Component, Vue } from 'vue-property-decorator';
import HeadNav from '../components/HeadNav.vue';
import FootNav from '../components/FootNav.vue';
import DownloadBox from '../components/DownloadBox.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from '../util/LsLanguage';
import GlobalConfig from '../global.config';
import Util from '@/ts/utils/Util';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { Dialog, Loading } from "element-ui";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import ActivityFactory from "@/ts/factory/activity.factory";
import {
    ActivityDetailRequestModel,
    ActivityDrawModel,
    ActivityModel,
    PresentListRequestModel
} from "@/ts/models/NewsModel";
import HttpClient from "@/ts/net/HttpClient";
import {IdataModel} from "@/ts/models/IdataModel";
import $ from "jquery";

Vue.config.productionTip = false;
Vue.use(Loading);

//判断是否跳转移动站点
const mUrl = GlobalConfig.getMobWebBaseUrl() + window.location.pathname;
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
        'el-dialog': Dialog,
        'download-box': DownloadBox
    }
})
class activityModel extends ActivityProxy {

    // http://localhost:8080/shuangdan.html?id=36&region_code=1&language=zh_CN&account_token=VxHnkvLQZFN1PVvXHgBzuZFZksgKZ0Bk5WcJYox657pvSKgzcgTgUgdb0R3wdL90
    public activity_id = 193;
    public activity_json = ActivityFactory.getInstace('pc',this.activity_id);
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public package_index: number = 3;

    /**
     *
     */
    public created() {
        this.activityJson = this.activity_json;
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.account_token = LocalStorageUtil.getUserToken().account_token;
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getActivityId();
        this.getActivityDetail();
        this.getReferActivitys();
        if (this.account_token == '') {
            this.refer_code = '请先登录!';
            this.refer_code_link = '请先登录!';
        }
    }

    /**
     * 初始化中奖列表名单
     */
    public initAwardList() {
        if (this.awardList.length <= 4) return;
        $(function () {
            setInterval(function () {
                var $ul = $("#jilu_box");
                $ul.animate({
                    marginTop: "-30px"
                }, 400, function () {
                    $ul.find("li").eq(0).appendTo($ul);
                    $ul.find("li").eq(0).appendTo($ul);
                    $ul.css("margin-top", "0")
                })
            }, 2000);
        });
    }

    /**
     *
     */
    public async mounted() {
        window.onscroll = () => {
            this.pageScroll(942);
        };
        let now_time = new Date().getTime();
        let end_time = new Date(this.activity_json.endtime).getTime();
        if(now_time >= end_time) {
            this.dialog_msg = '活动已过期!';
            this.dialog_error = true;
        }
        this.getAwardList();
    }

    public generateRefercodeLink(refer_code: string) {
        this.refer_code_link = GlobalConfig.getUserBaseUrl() + '/' + JumpWebUtil.HTML_NAME_REGISTER + '?refer_code=' + refer_code;
    }

    public changePackageIndex(index: number) {
        this.package_index = index;
    }

    /**
     * 立即邀请
     */
    public gotoInvite() {
        this.onCloseRecharge();
        window.location.href = "#step1";
    }

    /**
     * 登录
     */
    public gotoLogin() {
        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_LOGIN,'to=' + GlobalConfig.getWebBaseUrl() +'/activitys/wuyi.html');
    }

    /**
     * 充值
     */
    public gotoRecharge() {
        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER, 'page=1&package_index='+this.package_index);
    }

    /**
     * 兑奖
     */
    public gotoDuijiang(status: number = 0) {
        if (status != 3){
            JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER, 'page=7');
        }
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
