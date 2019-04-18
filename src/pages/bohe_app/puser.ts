import "@/assets/css/bohe_app.css";
import "leigod-lib-flexible";
import {Vue} from "vue-property-decorator";
import { Swipe, SwipeItem, Toast, Popup } from "vant";
import HttpClient from "@/ts/net/HttpClient";
import {IdataModel} from "@/ts/models/IdataModel";
import Component from "vue-class-component";
import {LanguageConfig} from "@/ts/utils/Language";
import AppParamModel from "@/ts/models/AppModel";
import {ActivityModel, ActivityRequestModel, NewModel, NewRequestModel} from "@/ts/models/NewsModel";
import Util from "@/ts/utils/Util";
import UserProxy from "@/ts/proxy/UserProxy";
import GlobalConfig from './global.config';
import { ExtrnalFactory } from '@/ts/factory/ExtrnalFactory';
import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';
import UserAvatarEidt from './components/UserAvatarEidt.vue';
import "babel-polyfill";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import VueI18n from "vue-i18n";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

Vue.config.productionTip = false;
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Toast);
Vue.use(Popup);

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
    components: {
        "user-edit-avatar": UserAvatarEidt
    }
})
class User extends UserProxy {

    public appParam: AppParamModel = AppParamModel.getInstace();
    public bgImg: string = 'images/bg_img.jpg';
    public notifyList: Array<NewModel> = [];
    public bannerList: Array<ActivityModel> = [];
    public user_url: string = ''; // 用户中心的url
    
    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    //////////END

    /**
     * 页面初始化，获取地址栏参数，设置根地址，初始化调用接口
     */
    public created() {
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.webUrl = GlobalConfig.getWebBaseUrl();
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.init();
        this.getNotifyList();
        this.getAcitivityLsit();
    }

    /**
     * token过期的处理
     */
    public tokenExpired() {
        LocalStorageUtil.loginOut();
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.loginExpire();
    }

    /**
     *
     */
    public mounted() {
        this.changeBg();
    }

    /**
     * 动态更换背景
     */
    public changeBg() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        const img = factory.getbackground(1);
        if (img != '') {
            this.bgImg = img;
        }
    }

    /**
     * 跳转充值
     */
    public goRecharge() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.gotoRecharge();
    }

    /**
     * 跳转公告
     */
    public goNotice() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = JumpWebUtil.getWebHeadUrl(this.webUrl,this.appParam);
        url = url + JumpWebUtil.HTML_NAME_NOTIFY;
        factory.jumpUrl(url);
    }

    /**
     * 跳转公告详情
     */
    public goNoticeDetail(id: number) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = JumpWebUtil.getWebHeadUrl(this.webUrl,this.appParam);
        url = url + JumpWebUtil.HTML_NAME_DETAILS_NOTICE + id + '.html';
        factory.jumpUrl(url);
    }

    /**
     * 跳转活动
     */
    public goActivity() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
    }

    /**
     * 跳转活动详情
     */
    public goActivityDetail(item:any) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = GlobalConfig.getWebBaseUrl() + '/' + JumpWebUtil.HTML_NAME_DETAILS_ACTIVITY;
        url = url + item.id + '.html';
        if (item.url != '') {
            url = item.url;
        }
        factory.jumpUrl(url);
    }

    /**
     *
     * @param url 请求根地址
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    public execute(): void {
    }

    /**
     * 获取公告列表
     */
    public async getNotifyList() {
        let url = HttpClient.URL_NEWS;
        let param = new NewRequestModel();
        param.page = 0;
        param.size = 5;
        param.support_type = 3;
        param.class_type = 0;
        param.region_code = this.appParam.region_code;
        this.backData = await this.http.get<NewModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.notifyList = this.backData.data.list.slice(0,4);
            for(const i in this.notifyList) {
                this.notifyList[i].date_time = Util.formatDataTime2(this.notifyList[i].publish_time_year,this.notifyList[i].publish_time_month,this.notifyList[i].publish_time_day);
            }
        }
    }

    /**
     * 获取活动详情
     */
    public async getAcitivityLsit() {
        let url = HttpClient.URL_ACTIVITY_LIST;
        let param = new ActivityRequestModel();
        param.page = 0;
        param.size = 3;
        param.type = '1'; //1专题活动
        param.plat_type = 3;//windows客户端
        param.region_code = this.appParam.region_code;
        this.backData = await this.http.get<ActivityModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.bannerList = this.backData.data.list;
            if (this.bannerList.length >= 5){
                this.bannerList = this.bannerList.slice(0,5)
            }
        }
    }

    /**
     * 编辑昵称
     */
    public clickChangeNickname() {
        // 显示编辑弹框
        this.nicknameDialogVisible = true;
    }

    /**
     * 关闭编辑昵称
     */
    public onCloseChangeNickname() {
        this.nicknameDialogVisible = false;
        this.newNickname = '';
    }

    /**
     * 修改昵称
     */
    public enterToEdit() {
        if(this.newNickname == '') return;
        this.onSaveUserInfo(this.newNickname);
        this.nicknameDialogVisible = false;
    }

    /**
     * 修改用户信息成功
     */
    public onSaveUserInfoSuccess() {
        Toast.success(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_RESETNICKNAME_SUCCESS));
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.editNicknameSuccess(this.userInfo.nickname);
    }

    /**
     * 修改用户头像
     */
    public onEditAvatar() {
        if(this.appParam != null && this.appParam.platform == 1) {
            if(this.appParam.vType == 0) return;
            let url = JumpWebUtil.getWebHeadUrl(this.webUrl,this.appParam);
            this.user_url = url + JumpWebUtil.HTML_NAME_USER + '?account_token=' + this.appParam.account_token;
            const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
            factory.jumpUrl(this.user_url);
        }else {
            this.editAvatarVisible = true;
        }
    }

    public onCloseEditAvatar() {
        this.editAvatarVisible = false;
    }

    /**
     * 上传头像
     */
    public onUploadAvatar(avatarData: string) {
        this.uploadAvatar(avatarData);
    }

    /**
     * 上传头像成功
     */
    public uploadAvatarSuccess() {
        Toast.success(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_RESETNICKNAME_SUCCESS));
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln,false);
        i18n.locale = lang.locale;
        GlobalConfig.log("切换语言:" + lang.locale);
    }
}

new User({
    i18n
}).$mount("#app");
