import '@/assets/less/bohe.less';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import UserAgreement from './components/UserAgreement.vue';
import UserSafety from './components/UserSafety.vue';
import UserOrder from './components/UserOrder.vue';
import UserPrize from './components/ActiveRecord.vue';

import UserFreeDown from './components/UserFreeDown.vue';
import UserAvatarEidt from './components/UserAvatarEidt.vue';
import UserRecharge from './components/UserRecharge.vue';
import PayDialog from './components/PayDialog.vue';
import {Component, Vue} from 'vue-property-decorator';
import {LanguageConfig} from "@/ts/utils/Language";
import UserProxy from "@/ts/proxy/UserProxy";
import GlobalConfig from "@/pages/bohe/global.config";
import "babel-polyfill";
import {Button, Dialog, Form, FormItem, Input, Loading, Notification, MessageBox,Tooltip} from "element-ui";
import {
    PayModel,
    ResetpwdRequestModel,
    SetSecondPwdRequestModel,
    PayConfigModel,
    SendVerificationCodeRequestModel,
    NewResetpwdRequestModel
} from '@/ts/models/UserModel';
import {TipsMsgUtil} from "@/ts/utils/TipsMsgUtil";
import WebParamModel from "@/ts/models/WebModel";
import {TdappModel} from '@/ts/models/TdappModel.ts'
import Util from "@/ts/utils/Util";
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import VueI18n from "vue-i18n";
import UchatUtil, {UchatModels} from "@/ts/utils/UchatUtil";
import {userInfo} from "os";

Vue.prototype.$notify = Notification;
Vue.prototype.$confirm = MessageBox;
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Input);
Vue.use(Tooltip);
Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        "head-nav": HeadNav,
        "foot-nav": FootNav,
        "user-agreement": UserAgreement,
        "user-safety": UserSafety,
        "user-order": UserOrder,
        "user-prize":UserPrize,
        "user-recharge": UserRecharge,
        "user-free-down": UserFreeDown,
        "user-paydialog": PayDialog,
        "user-edit-avatar": UserAvatarEidt,
    }
})
class UserCenter extends UserProxy {

    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public payShowConfig: PayConfigModel = new PayConfigModel();
    public checkBroserVersion=new TdappModel();
    /**
     * vue初始化完成
     */
    public created() {
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.init();
    }

    /**
     * token过期的处理
     */
    public tokenExpired() {
        LocalStorageUtil.loginOut();
        JumpWebUtil.backLogin();
    }

    /**
     * 获取下载url
     * @param url 
     */
    public onDownloadConfig(jsonConfig: any) {
        this.payShowConfig = jsonConfig.bohe.pay;
    }

    /**
     * 用户信息请求成功
     */
    public getUserinfoSuccess(){
        const page = parseInt(Util.getUrlParam('page'));
        if (!isNaN(page)) {
            this.changePage(page);
        }else {
            this.changePage(this.region_code == 0 ? 0 : 4);
        }
        // 修改head
        if(this.$refs.head != null) {
            (this.$refs.head as any).checkLogin();
        }
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        this.webParam.language = ln;
        GlobalConfig.log('切换语言:' + lang.locale);
    }

    /**
     * 选择服务
     */
    public changePage(index: number) {
        this.pageIndex = index;
        switch(index) {
            case 0:
                (this.$refs.recharge as any).initA();
                break;
            case 1:
                (this.$refs.orderList as any).init();
                break;
            case 2:
                (this.$refs.safety as any).init();
                break;
            case 5:
                (this.$refs.prizeList as any).initA();
                break;
            default:
                break;
        }
    }

    /**
     * 开始支付
     */
    public onBeginPay(data: PayModel) {
        this.payObj = data;
        this.payDialogVisible = true;
    }

    /**
     * 打开支付
     */
    public onOpenPyaDialog() {
        (this.$refs.payDialogCom as any).init();
    }

    /**
     * 关闭支付弹窗
     */
    public onClosePyaDialog() {
        this.payDialogVisible = false;
        (this.$refs.payDialogCom as any).onClose();
    }

    /**
     * 支付成功
     */
    public paySuccess() {
        this.payDialogVisible = false;
        this.$confirm(
            TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PAY_PACKAGE_SUCCESS),
            '',
            {
                confirmButtonText: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_BUTTON_BACK),
                type: 'success',
                showCancelButton: false,
            }).then(() => {
            window.location.reload();
        }).catch(() => {
            window.location.reload();
        });
    }

    /**
     * 修改密码
     * 换用新的修改密码接口
     */
    public onResetPwd(param: NewResetpwdRequestModel) {
        this.onResetPasswordNew(param);
    }

    /**
     * 修改密码成功
     */
    public onResetPasswordSuccess(data: any) {
        (this.$refs.safety as any).resetPwdBack(data)
    }

    /**
     * 修改密码失败
     */
    public onResetPasswordFaild(data: any) {
        (this.$refs.safety as any).resetPwdBack(data)
    }

    /**
     * 发送修改二级密码验证码
     */
    public onSendVerificationCode(param: SendVerificationCodeRequestModel) {
        this.onSendVerification(param)
    }

    /**
     * 发送修改二级密码验证码成功
     */
    public onSendVerificationSuccess(data: any) {
        (this.$refs.safety as any).sendVerifySuccessBack(data)
    }

    /**
     * 发送修改二级密码验证码失败
     */
    public onSendVerificationFaild(data: any) {
        (this.$refs.safety as any).sendVerifyFaildBack(data)
    }

    /**
     * 修改二级密码
     */
    public onSetSecondPwd(param: SetSecondPwdRequestModel) {
        this.onSetSecondPassword(param)
    }

    /**
     * 修改二级密码成功
     */
    public onSetSecondPasswordSuccess(data: any) {
        (this.$refs.safety as any).setSecondPwdSuccessBack(data)
    }

    /**
     * 修改二级密码失败
     */
    public onSetSecondPasswordFaild(data: any) {
        (this.$refs.safety as any).setSecondPwdFaildBack(data)
    }

    /**
     * 打开修改昵称弹窗
     */
    public nicknameDialogOpen() {
        this.nicknameDialogVisible = true;
    }

    /**
     * 关闭修改昵称弹窗
     */
    public nicknameDialogClose() {
        this.nicknameDialogVisible = false;
    }

    /**
     * 修改用户昵称
     */
    public saveUserNickname() {
        if(this.newNickname.length<2){
            this.$notify({
                title: '提示',
                message: '新昵称的长度不能小于2!',
                type: 'warning'
            });
        }else{
            this.onSaveUserInfo(this.newNickname);
        }
    }
    /**
     * 修改用户昵称失败
     */
    public onSaveUserInfoError(backData){
        //这里提示要改为中英文翻译的；
        this.$notify({
            title: '提示',
            message: backData.error.nickname,
            type: 'warning'
        });
    }
    /**
     * 修改用户昵称成功
     */
    onSaveUserInfoSuccess() {
        this.nicknameDialogVisible = false;
        (this.$refs.head as any).checkLogin();
    }

    /**
     * 打开退出登录弹窗
     */
    public loginOutDialogOpen() {
        this.loginOutDialogVisible = true;
    }

    /**
     * 关闭退出登录弹窗
     */
    public loginOutDialogClose() {
        this.loginOutDialogVisible = false;
    }

    /**
     * 退出登录
     */
    public loginOut() {
        this.onLoginOut();
    }

    /**
     * 修改用户头像
     */
    public onEditAvatar() {
        if(this.checkBroserVersion.isLowVersion()){
            //这里提示要改为中英文翻译的；
            this.$notify({
                title: '您使用的浏览器版本过低',
                message: 'IE版本不能低于IE10，或者使用谷歌/火狐浏览器',
                type: 'warning'
            });
        }else{
            this.editAvatarVisible = true;
            this.$nextTick(()=>{
                //@ts-ignore
                this.$refs.userEditAvatar.cropperImg(this.userInfo.avatar)
            })
        }
    }
    /**
     * 修改用户头像
     */
    closedAvatarDailog(){
        //@ts-ignore
        this.$refs.userEditAvatar.destroyCropper()
    }

    /**
     * 上传头像
     */
    public onUploadAvatar(avatarData: string) {
        this.uploadAvatar(avatarData);
    }

    /**
     * 聊天
     */
    public onUchat() {
        const chat = new UchatUtil();
        const mod = new UchatModels();
        mod.imnumber = GlobalConfig.UC_IM_Number;
        mod.box = true;
        chat.pop(mod);
        chat.ready(null);
    }
}

//
new UserCenter({
    i18n
}).$mount('#app');