import '@/assets/less/bohe.less';
import "@/assets/css/bhactivity.css";
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import {LanguageConfig} from "@/ts/utils/Language";
import "babel-polyfill";
import $ from "jquery";
import {Loading, Notification} from "element-ui";
import VueI18n from "vue-i18n";
import {Vue, Component} from 'vue-property-decorator';
import HttpClient from "@/ts/net/HttpClient";
import {IdataModel} from "@/ts/models/IdataModel";
import GlobalConfig from "@/pages/bohe/global.config";
import {
    ActivityDetailRequestModel,
    ActivityDrawModel,
    GetAwardRespondModel, PresentListRequestModel, PresentListResponseModel, PresentRequestModel, PresentRespondModel
} from "@/ts/models/NewsModel";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import Util from "@/ts/utils/Util";
import {UserToken} from "@/ts/models/UserModel";
import {TipsMsgUtil} from "@/ts/utils/TipsMsgUtil";
import ProjectConfig from "../../../project.config";
import WebParamModel from "@/ts/models/WebModel";

Vue.config.productionTip = false;//语言包
Vue.prototype.$notify = Notification;
Vue.use(Loading);

//
const webParam = WebParamModel.getInstace();
Vue.use(VueI18n);
let lang = LanguageConfig.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav
    }
})
export class Activity extends Vue {
    public openType: number = 0; //0关闭, 1打开
    public present_id: number = 0; //礼品固定id
    public token: UserToken = new UserToken();
    public userPoint: number = 0; //用户积分
    public fee: number = 0; //抽奖所需积分
    public presentInfo: PresentRespondModel = new PresentRespondModel();
    public awardInfo: GetAwardRespondModel = new GetAwardRespondModel();
    public awardList: Array<PresentListResponseModel> = [];

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getAwardList();
        this.token = LocalStorageUtil.getUserToken();
    }

    async mounted() {
        if (this.token) {
            await this.getActivityDetail(9);//活动id,过期后需要更新
        } else {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: "参加本次活动请先登录!",
                type: "warning"
            });
            return;
        }
    }

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    //////////END
    /**
     * 设置根路径
     * @param url
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 获取中奖列表
     */
    public async getAwardList() {
        let url = HttpClient.URL_ACTIVITY_PRESENT_LIST;
        let param = new PresentListRequestModel();
        param.activity_id = 9;
        param.size = 50;
        this.backData = await this.http.post<PresentListRequestModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.awardList = this.backData.data.data;
            this.initAwardList();
        }
    }

    public initAwardList() {
        $(function () {
            setInterval(function () {
                var $ul = $(".jfhd_awardname_border ul");
                $ul.animate({
                    marginTop: "-21px"
                }, 400, function () {
                    $ul.find("li").eq(0).appendTo($ul)
                    $ul.css("margin-top", "0")
                })
            }, 2000)
        });
    }

    /**
     * 获取抽奖活动详情
     */
    public async getActivityDetail(id: number) {
        const token = LocalStorageUtil.getUserToken().account_token;
        let url = HttpClient.URL_ACTIVITY_DETAIL + id;
        let param = new ActivityDetailRequestModel();
        param.type = 1;
        param.id = 9;
        param.plat_type = 1;
        param.region_code = LocalStorageUtil.getRegionCodes();
        param.account_token = token;
        this.backData = await this.http.get<ActivityDetailRequestModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.fee = this.backData.data.detail.fee;
            this.userPoint = this.backData.data.points;
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE),
                type: "warning"
            });
            return;
        }
    }

    /**
     * 获取礼品详细信息(备用)
     */
    public async getPresent() {
        const url = HttpClient.URL_PRESENT_INFO;
        let param = new PresentRequestModel();
        param.activity_id = 9;
        this.backData = await this.http.get<PresentRequestModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.presentInfo = this.backData.data;
        }
    }

    /**
     * 抽奖请求
     */
    public async startRoll() {
        const url = HttpClient.URL_ACTIVITY_DRAW;
        const token = LocalStorageUtil.getUserToken().account_token;
        let param = new ActivityDrawModel();
        param.activity_id = 9;
        param.account_token = token;
        this.backData = await this.http.post<ActivityDrawModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.awardInfo = this.backData.data;
            setTimeout(() => {
                this.present_id = this.backData.data.present_id;
                this.openType = 1; //提示中奖弹框
            }, 1000)
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_LOGIN_FAILURE),
                type: "warning"
            });
            return;
        } else {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: TipsMsgUtil.getTipsMsg(this.backData.msg),
                type: "warning"
            });
        }
    }

    /**
     * 点击关闭弹框
     */
    public closeAwardModel() {
        this.openType = 0;
    }

    /**
     * 点击开始抽奖
     */
    public async clkDraw() {
        if (this.token) {
            if (this.userPoint < this.fee) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: "您的积分不足,请先购买套餐获取积分",
                    type: "warning"
                });
                return;
            }
            this.startRoll();
        } else {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: "亲,请先登录!",
                type: "warning"
            });
            return;
        }
    }

}

new Activity({i18n}).$mount("#app");


