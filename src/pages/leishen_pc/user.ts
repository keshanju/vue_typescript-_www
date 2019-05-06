import "@/assets/less/leishen_pc.less";
import "leigod-lib-flexible";
import "babel-polyfill";
import {Component, Vue} from "vue-property-decorator";
import AppParamModel from '@/ts/models/AppModel';
import VueI18n from "vue-i18n";
import UserProxy from '@/ts/proxy/UserProxy';
import {LsLanguage} from "@/pages/leishen_pc/util/LsLanguage";
import ResetUserinfo from './components/ResetUserinfo.vue';
import UserSafety from './components/UserSafety.vue';
import ThreeBind from './components/Threebind.vue';
import BindMobile from './components/BindMobile.vue';
import {Carousel, CarouselItem, Dialog, Loading, Message, MessageBox, Option, Select} from 'element-ui';
import NewsConfigModel, {
    ActivityPictureModel,
    ActivityRequestPictureModel,
    NewModel, NewRequestModel,
    NewsModel
} from '@/ts/models/NewsModel';
import HttpClient from '@/ts/net/HttpClient';
import Util from '@/ts/utils/Util';
import GlobalConfig from './global.config';
import {NewResetpwdRequestModel, SendVerificationCodeRequestModel, UpdateInfos, UserInfo} from '@/ts/models/UserModel';
import ConfigUtil from "@/ts/utils/ConfigUtil";
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';

Vue.config.productionTip = false;
Vue.use(Loading);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox;

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'reset-userinfo': ResetUserinfo,
        'user-safety': UserSafety,
        'three-bind': ThreeBind,
        'bind-mobile': BindMobile,
        'el-carousel': Carousel,
        'el-carousel-item': CarouselItem,
        'el-select': Select,
        'el-option': Option,
        'el-dialog': Dialog
    }
})
class User extends UserProxy {

    public serviceShow: boolean = false;//下拉框是否显示
    public shadowShow: boolean = false;//遮罩层是否显示
    public tabIndex: number = 0;//tab_nav 索引
    public appParam: AppParamModel = AppParamModel.getInstace();
    public bgImg: string = 'images/bg_img.jpg';
    public notifyList: Array<NewModel> = [];
    public bannerList: Array<ActivityPictureModel> = [];
    public newList = null;
    public newPage: number = 1;
    public total: number = 0;//资讯总条数
    public user_url: string = ''; // 用户中心的url
    public dialogTipMsg: string = '';//操作成功提示信息
    public successTipShow: boolean = false;//操作成功提示弹窗是否显示
    public downloadTipShow: boolean = false;//下载新客户端提示弹窗是否显示
    public successTipType: number = 0;//操作成功类别 0 修改账号 1 其他操作
    public imgUrlList: object = [];
    public timeHours: number = 0;//剩余时间的小时数
    public timeMinutes: number = 0;//剩余时间的分钟数
    public timeSeconds: number = 0;//剩余时间的秒数
    public timer: any = null;//倒计时计时器
    public isInit: boolean = true;//是否初次获取用户信息
    public getUserInfoCount: number = 0;//刷新用户信息倒计时
    public timeTipShow: number = 0;//暂停恢复提示是否显示
    public bannerImg: string = ''; //活动banner图片
    public windowsDownloadUrl: string = '';//windows客户端下载配置
    public macDownloadUrl: string = '';//mac客户端下载配置
    public version: number = 2;//客户端版本 0 旧版本  1 最新版
    public headShow: boolean = false;//头部是否显示
    public avatarReset: boolean = false;//用户是否修改了头像
    public nicknameReset: boolean = false;//用户是否修改了昵称
    public userinfoCount: number = 0;//获取用户信息成功改变
    public account_out: boolean = false;//未登录或者token失效
    public timer_step: number = 0;//刷新公告定时器间隔时间

    /**
     * 页面初始化，获取地址栏参数，设置根地址，初始化调用接口
     */
    public created() {
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.webUrl = GlobalConfig.getWebBaseUrl();
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.timeTipShow = parseInt(localStorage.getItem(LocalStorageUtil.STORAGES_TIME_TIP));
        //
        this.getDownloadUrl();
        this.getNotifyList();
        this.getActivityInfo();
        if(Util.getUrlParam("account_token") == '' || Util.getUrlParam("account_token") == undefined){
            this.account_out = true;
            return;
        }
        this.init();

        // this.onGetNewList(this.newPage);
    }

    public mounted() {
        window.onunload = function () {
            localStorage.removeItem(LocalStorageUtil.STORAGES_THIRDBIND_URL_TYPE);
        };
    }

    /**
     * 获取下载列表
     * @param url
     */
    public async getDownloadUrl() {
        const jsonConfig = await ConfigUtil.getInstance().download(false);
        const region_code = LocalStorageUtil.getRegionCodes();
        const language = LocalStorageUtil.getLanguage();
        this.windowsDownloadUrl = jsonConfig.leigod.windows.download_url;
        this.newList = jsonConfig.leigod[region_code][language].index_news;
        this.timer_step = jsonConfig.leigod.timer_step;
        const that = this;
        setInterval(function(){
            that.getNotifyList();
        },this.timer_step)
        //
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        this.version = factory.checkversion('');
        if (this.version < 1) {
            this.downloadTipShow = true;
        }
    }

    /**
     * 用户信息请求成功
     */
    public getUserinfoSuccess() {
        //屏蔽剩余时间功能
        this.remainTimer(this.userInfo.expiry_time_samp);
        this.formatTime(this.userInfo.expiry_time_samp);
        this.tabIndex = 0;
        this.userinfoCount++;
        //屏蔽老用户绑定账号提示
        // if (this.userInfo.master_account == 0 && this.userInfo.mobile == '' && this.isInit) {
        //     (this.$refs.safety as any).bindAccountShow();
        //     this.isInit = false;
        // }
    }

    /**
     * 下载最新版本
     */
    public downloadNow() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.jumpUrl(this.windowsDownloadUrl);
    }

    /**
     * 刷新用户信息
     */
    public reGetUserInfo() {
        if (this.getUserInfoCount > 0) return;
        this.getUserInfo();
        this.getUserInfoCount = 10;
        const sefl = this;
        Util.countDown(this.getUserInfoCount, 1, (n: number) => {
            sefl.getUserInfoCount = n;
        });
    }

    /**
     * 前往充值
     */
    public goRecharge() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.gotoRecharge();
    }

    /**
     * 打开官网
     */
    public goHome() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.jumpUrl('www.leigod.com');
    }

    /**
     * 关闭暂停恢复提示(屏蔽)
     */
    public closeTimeTip() {
        this.timeTipShow = 1;
        localStorage.setItem(LocalStorageUtil.STORAGES_TIME_TIP, "1")
    }

    /**
     * 剩余时间倒计时(屏蔽)
     */
    public remainTimer(time: number) {
        if (this.userInfo.pause_status_id != 0) {
            this.remainTimerStop();
            return;
        }
        ;
        if (time <= 0 || time == null || isNaN(time)) {
            this.timeHours = 0;
            this.timeMinutes = 0;
            this.timeSeconds = 0;
            return;
        }
        if (this.timer != null) clearInterval(this.timer);
        this.timer = setInterval(() => {
            time--;
            if (time == 0) {
                clearInterval(this.timer);
                return;
            }
            this.formatTime(time);
        }, 1000)
    }

    /**
     * 格式化时间(屏蔽)
     * @param h
     * @param m
     * @param s
     */
    public formatTime(time: number) {
        if (time <= 0) {
            this.timeHours = 0;
            this.timeMinutes = 0;
            this.timeSeconds = 0;
            return;
        }
        this.timeHours = Math.floor(time / 3600);
        this.timeMinutes = Math.floor(time % 3600 / 60);
        this.timeSeconds = time % 60;
    }

    /**
     * 关闭剩余时间倒计时(屏蔽)
     */
    public remainTimerStop() {
        clearInterval(this.timer);
    }

    /**
     * 打开/关闭下拉功能窗口
     */
    public onServiceShow() {
        this.serviceShow = !this.serviceShow;
        if (this.serviceShow) {
            this.shadowShow = true;
        } else {
            this.shadowShow = false;
        }
    }

    /**
     * 关闭下拉窗
     */
    public onCloseService(){
        const headNav = document.getElementById('head');
        const userService = document.getElementById('user_info');
        const shadowBox = document.getElementById('shadow_box');
        headNav.classList.remove('nav_box_show');
        userService.style.display = 'none';
        shadowBox.style.display = 'none';
        this.serviceShow = false;
        this.shadowShow = false;
    }

    /**
     * 暂停计时(屏蔽)
     */
    public onSuspended() {
        this.onTimeSuspended();
    }

    /**
     * 暂停计时成功(屏蔽)
     */
    public onTimeSuspendedSuccess() {
        this.successTipShow = true;
        this.dialogTipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_TIME_SUSPEND_SUCCESS);
        this.successTipType = 1;
        this.remainTimerStop();
    }

    /**
     * 暂停计时失败(屏蔽)
     */
    public onTimeSuspendedFaild(data: any) {
        this.$message({
            message: data.msg,
            type: 'warning'
        });
    }

    /**
     * 恢复计时(屏蔽)
     */
    public onRestore() {
        this.onTimeRestore();
    }

    /**
     * 恢复计时成功(屏蔽)
     */
    public onTimeRestoreSuccess() {
        this.successTipShow = true;
        this.dialogTipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_TIME_RESTORE_SUCCESS);
        this.successTipType = 1;
        this.remainTimer(this.userInfo.expiry_time_samp);
    }

    /**
     * 恢复计时失败(屏蔽)
     */
    public onTimeRestoreFaild(data: any) {
        this.$message({
            message: data.msg,
            type: 'warning'
        });
    }

    /**
     * 切换tab页
     */
    public changeTabIndex(index: number) {
        this.tabIndex = index;
    }

    /**
     * 获取公告列表
     */
    public async getNotifyList() {
        let url = HttpClient.URL_NEWS;
        let param = new NewRequestModel();
        param.page = 1;
        param.size = 5;
        param.class_type = 0;
        param.support_type = 3;
        param.region_code = this.appParam.region_code;
        this.backData = await this.http.get(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.notifyList = this.backData.data.list;
        } else {
        }
    }

    /**
     * 获取活动banner
     */
    public async getActivityInfo() {
        let url = HttpClient.URL_ACTIVITY_PICTURE_LIST;
        let param = new ActivityRequestPictureModel();
        param.region_code = this.appParam.region_code;
        param.plat_type = 3;
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.bannerList = this.backData.data as ActivityPictureModel[];
            for (var i = 0; i < this.bannerList.length; i++) {
                let imgUrl = this.bannerList[i].imgs.filter((item) => {
                    return item.key == 2;
                })[0].img_url;
                this.bannerList[i]['imgUrl'] = imgUrl;
            }
        }
    }

    /**
     * 获取资讯列表
     */
    public async onGetNewList(page: number = 1, size: number = 2) {
        let url = HttpClient.URL_NEWS;
        let param = new NewRequestModel();
        param.class_type = 2;
        param.page = page;
        param.size = 2;
        param.support_type = 3;
        param.label = Util.NEWS_HOT;
        param.region_code = this.appParam.region_code;
        this.backData = await this.http.get(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.newList = this.backData.data.list;
            this.total = this.backData.data.total;
        } else {
        }
    }

    /**
     * 资讯翻页
     */
    public changeNewListIndex(index: number) {
        if (index > this.total / 2 || index <= 0) return;
        this.newPage = index;
        this.onGetNewList(index, 2)
    }

    /**
     * 上传用户信息
     */
    public onUploadUserInfo(data: UpdateInfos) {
        if (this.updateInfos.nickname != this.userInfo.nickname) {
            this.nicknameReset = true;
        }
        if (data.nickname) this.updateInfos.nickname = data.nickname;
        if (data.address) this.updateInfos.address = data.address;
        if (data.sex) this.updateInfos.sex = data.sex;
        if (data.birthday) this.updateInfos.birthday = data.birthday;
        if (data.user_url != '') {
            this.avatarReset = true;
            this.uploadAvatar(data.user_url);
        } else {
            this.saveUserInfo(data);
        }
    }

    /**
     * 修改用户信息成功
     */
    onSaveUserInfosSuccess() {
        (this.$refs.resetuserinfo as any).resetInfoSuccess();
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        if (this.nicknameReset) {
            factory.editNicknameSuccess(this.updateInfos.nickname);
        };
        if (this.avatarReset) {
            factory.editAvatarUrlSuccess(this.updateInfos.user_url);
        }
    }

    /**
     * 发送修改密码验证码
     */
    public onSendVerificationCode() {
        let param = new SendVerificationCodeRequestModel();
        param.account_token = this.appParam.account_token;
        this.onSendVerification(param)
    }

    /**
     * 发送修改密码验证码成功
     */
    public onSendVerificationSuccess(data: any) {
        (this.$refs.safety as any).sendVerifySuccessBack(data)
    }

    /**
     * 修改密码
     */
    public onResetPwd(param: NewResetpwdRequestModel) {
        this.onResetPasswordNew(param)
    }

    /**
     * 修改密码成功
     */
    public onResetPasswordSuccess(data: any) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.updatepassword();
        (this.$refs.safety as any).resetPwdBack(data);
    }

    /**
     * 修改密码失败
     */
    public onResetPasswordFaild(data: any) {
        (this.$refs.safety as any).resetPwdBack(data)
    }

    /**
     * 关闭操作成功提示框
     */
    public successTipClose() {
        this.successTipShow = false;
    }

    /**
     * 跳转公告详情
     */
    public goNoticeDetail(id: number) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = GlobalConfig.getWebBaseUrl() + '/' + JumpWebUtil.HTML_NAME_DETAILS_NOTICE;
        url = url + id + '.html';
        factory.jumpUrl(url);
    }

    /**
     * 跳转活动详情
     */
    public goActivityDetail(item: any) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = GlobalConfig.getWebBaseUrl() + '/' + JumpWebUtil.HTML_NAME_DETAILS_ACTIVITY;
        url = url + item.id + '.html';
        if (item.url != '') {
            url = item.url;
        }
        factory.jumpUrl(url);
    }

    /**
     * 跳转配置页面
     */
    public goNewsDetail(url: string) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.jumpUrl(url);
    }

    /**
     * 跳转资讯列表
     */
    public goNews() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = GlobalConfig.getWebBaseUrl() + '/' + JumpWebUtil.HTML_NAME_NEWS;
        let search = window.location.search;
        url = url + search;
        factory.jumpUrl(url);
    }

    /**
     * 跳转公告列表
     */
    public goNotifys() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let url = GlobalConfig.getWebBaseUrl() + '/' + JumpWebUtil.HTML_NAME_NOTIFY;
        let search = window.location.search;
        url = url + search;
        factory.jumpUrl(url);
    }

    /**
     * token过期处理
     * @param param
     */
    public tokenExpired(param: string = ''): void {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.loginExpire();
    }
}

new User({
    i18n
}).$mount("#app");