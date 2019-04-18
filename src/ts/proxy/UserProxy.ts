import {Component, Vue} from "vue-property-decorator";
import {IProxy} from "@/ts/interface/IProxy";
import HttpClient from "@/ts/net/HttpClient";
import {IdataModel} from "@/ts/models/IdataModel";
import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';
import {
    CardfeeModel,
    NewResetpwdRequestModel,
    pauseLogRequestModel,
    PayModel,
    removeBindRequestModel,
    ResetpwdRequestModel,
    SendVerificationCodeModel,
    SendVerificationCodeRequestModel,
    SetSecondPwdRequestModel,
    TimeSuspendedRequestModel,
    UpdateInfos,
    UploadAvatarRequestModel,
    UserInfo,
    CDKeyModel,
    CDKeyResult
} from "../models/UserModel";
import LocalStorageUtil from "../utils/LocalStorageUtil";
import Util from "../utils/Util";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";

@Component
export default class UserProxy extends Vue implements IProxy {
    public userInfo: UserInfo = new UserInfo();
    public isLoading: boolean = false; //loading
    public payObj: PayModel = new PayModel(); //
    public payType: number = 0; //
    public payStatuas: number = 0; //支付状态
    public payDialogVisible: boolean = false; //支付弹窗
    public pageIndex: number = 0;
    public getOrderListCount: number = 0;
    public nicknameDialogVisible: boolean = false; //更改昵称弹窗
    public loginOutDialogVisible: boolean = false; //退出登录弹窗
    public newNickname: string = ""; //昵称
    public editAvatarVisible: boolean = false; //修改头像
    public imageHeadUrl: string = "";
    public webUrl: string = "";
    public region_code: number = LocalStorageUtil.getRegionCodes();
    public isGuest: boolean = false; // 是否是游客
    public updateInfos: UpdateInfos = new UpdateInfos(); //需要上传的用户信息
    public cd_key: string = ""//CDKey码
    public cd_key_min: number = 0//根据CDKEY获取的分钟数
    public cd_key_time: string = ""//根据CDKEY获取的分钟数转化为**天**小时**分钟
    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    //////////END

    public init(): void {
        this.getUserInfo();
    }

    public execute(): void {
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * TODO... 需要重写此方法
     * token过期处理
     * @param param
     */
    public tokenExpired(param: string = ""): void {
    }

    /**
     * 获取用户详细信息
     */
    public async getUserInfo() {
        try {
            this.isLoading = true;
            let token = Util.getUrlParam("account_token");
            if (token == "") {
                token = LocalStorageUtil.getUserToken().account_token;
            }
            const url = HttpClient.URL_USER_INFO;
            const param = {
                account_token: token
            };
            this.backData = await this.http.post<UserInfo>(url, param);
            this.isLoading = false;

            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.userInfo = this.backData.data;
                UserInfo.getUserName(this.userInfo);
                UserInfo.getUserAvatar(this.userInfo);
                UserInfo.updateUserInfo(this.userInfo);
                this.isGuest = Util.isGuest(this.userInfo.nickname);
                this.getUserinfoSuccess();
            } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
                this.tokenExpired();
            } else {
                this.getUserinfoFail(this.backData);
            }
        } catch (e) {

        }
    }

    /**
     * TODO... 需要重写此方法
     * 用户信息请求成功回调
     */
    getUserinfoSuccess() {
    }

    /**
     * TODO... 需要重写此方法
     * 用户信息请求失败回调
     */
    getUserinfoFail(data) {
    }

    /**
     * 修改密码
     */
    public async onResetPassword(param: ResetpwdRequestModel) {
        this.isLoading = true;
        const url = HttpClient.URL_USER_PASSWORD;
        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.onResetPasswordSuccess(this.backData);
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.onResetPasswordFaild(this.backData);
        }
    }

    /**
     * 修改密码(新接口)
     */
    public async onResetPasswordNew(param: NewResetpwdRequestModel) {
        this.isLoading = true;
        const url = HttpClient.URL_USER_PASSWORD_CODE;
        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.onResetPasswordSuccess(this.backData);
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.onResetPasswordFaild(this.backData);
        }
    }

    /**
     * TODO... 需要重写此方法
     * 修改密码成功
     */
    onResetPasswordSuccess(data: any) {
    }

    /**
     * TODO... 需要重写此方法
     * 修改密码失败
     */
    onResetPasswordFaild(data: any) {
    }

    /**
     * 发送修改二级密码验证码
     */
    public async onSendVerification(param: SendVerificationCodeRequestModel) {
        this.isLoading = true;
        const url = HttpClient.URL_USER_VERIFY_CODE;
        this.backData = await this.http.post<SendVerificationCodeModel>(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.onSendVerificationSuccess(this.backData);
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.onSendVerificationFaild(this.backData);
        }
    }

    /**
     * TODO... 需要重写此方法
     * 发送修改二级密码验证码成功
     */
    onSendVerificationSuccess(data: any) {
    }

    /**
     * TODO... 需要重写此方法
     * 发送修改二级密码验证码失败
     */
    onSendVerificationFaild(data: any) {
    }

    /**
     * 修改二级密码
     */
    public async onSetSecondPassword(param: SetSecondPwdRequestModel) {
        this.isLoading = true;
        const url = HttpClient.URL_USER_MANAGE;
        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.onSetSecondPasswordSuccess(this.backData);
            this.userInfo.is_set_admin_pass = 1;
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.onSetSecondPasswordFaild(this.backData);
        }
    }

    /**
     * TODO... 需要重写此方法
     * 修改二级密码成功
     */
    public onSetSecondPasswordSuccess(data: any) {
    }

    /**
     * TODO... 需要重写此方法
     * 修改二级密码失败
     */
    public onSetSecondPasswordFaild(data: any) {
    }

    /**
     * 修改用户信息(昵称  头像)
     */
    public async onSaveUserInfo(nickname: string = "", avatar_url: string = "") {
        this.isLoading = true;
        const token = LocalStorageUtil.getUserToken().account_token;
        const url = HttpClient.URL_USER_EDIT;
        let param: any = {
            account_token: token
        };
        if (nickname != "" && nickname != null) {
            param["nickname"] = nickname;
        }
        if (avatar_url != "" && avatar_url != null) {
            param["user_url"] = avatar_url;
        }
        this.backData = await this.http.post<UserInfo>(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            if (nickname != "") {
                this.userInfo.nickname = nickname;
            }
            if (avatar_url != "") {
                this.userInfo.avatar = this.imageHeadUrl + avatar_url;
            }
            UserInfo.updateUserInfo(this.userInfo);
            this.onSaveUserInfoSuccess();
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.onSaveUserInfoError(this.backData);
        }
    }

    /**
     * TODO... 需要重写此方法
     * 修改用户信息成功
     */
    onSaveUserInfoSuccess() {
    }

    /**
     * TODO... 需要重写此方法
     * 修改用户信息失败
     * @param backData
     */
    onSaveUserInfoError(backData) {
    }

    /**
     * 批量修改用户信息
     */
    public async saveUserInfo(updateInfo: UpdateInfos) {
        this.isLoading = true;
        const token = LocalStorageUtil.getUserToken().account_token;
        const url = HttpClient.URL_USER_EDIT;
        let param = new UpdateInfos();
        param.account_token = token;
        if (updateInfo.nickname != "" && updateInfo.nickname != null) {
            param["nickname"] = updateInfo.nickname;
        }
        if (updateInfo.user_url != "" && updateInfo.user_url != null) {
            param.user_url = updateInfo.user_url;
        }
        if (updateInfo.sex != 0 && updateInfo.sex != null) {
            param.sex = updateInfo.sex;
        }
        if (updateInfo.birthday != "" && updateInfo.birthday != null) {
            param.birthday = updateInfo.birthday;
        }
        // if (updateInfo.address != "" && updateInfo.address != null) {
            param.address = updateInfo.address;
        // }
        if (updateInfo.email != "" && updateInfo.email != null) {
            param.email = updateInfo.email;
        }
        if (
            updateInfo.mobile_contact_number != "" &&
            updateInfo.mobile_contact_number != null
        ) {
            param.mobile_contact_number = updateInfo.mobile_contact_number;
            param.mobile_contact_type = 0;
        }
        this.backData = await this.http.post<UserInfo>(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            //请求成功
            if (updateInfo.nickname != "" && updateInfo.nickname != null) {
                this.userInfo.nickname = updateInfo.nickname;
            }
            if (updateInfo.birthday != "" && updateInfo.birthday != null) {
                this.userInfo.birthday = updateInfo.birthday;
            }
            if (updateInfo.sex != 0) {
                if (updateInfo.sex == 1) {
                    this.userInfo.sex = "帅哥";
                } else if (updateInfo.sex == 2) {
                    this.userInfo.sex = "美女";
                }
            }
            if (updateInfo.user_url != "" && updateInfo.user_url != null) {
                this.userInfo.avatar = this.imageHeadUrl + updateInfo.user_url;
                this.userInfo.avatar_new = this.imageHeadUrl + updateInfo.user_url;
            }
            if (updateInfo.address != "" && updateInfo.address != null) {
                this.userInfo.address = updateInfo.address;
            }
            if (
                updateInfo.mobile_contact_number != "" &&
                updateInfo.mobile_contact_number != null
            ) {
                this.userInfo.mobile_contact_number = updateInfo.mobile_contact_number;
            }
            if (updateInfo.email != "" && updateInfo.email != null) {
                this.userInfo.email = updateInfo.email;
            }
            UserInfo.updateUserInfo(this.userInfo);
            this.onSaveUserInfosSuccess();
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            //token过期
            this.tokenExpired();
        } else {
            //请求失败
            this.onSaveUserInfosError(this.backData);
        }
    }

    /**
     * TODO... 需要重写此方法
     * 批量修改用户信息成功
     */
    onSaveUserInfosSuccess() {
    }

    /**
     * TODO... 需要重写此方法
     * 批量修改用户信息失败
     * @param backData
     */
    onSaveUserInfosError(backData) {
    }

    /**
     * 上传头像
     */
    public async uploadAvatar(avatarData: string) {
        this.isLoading = true;
        const token = LocalStorageUtil.getUserToken().account_token;
        const url = HttpClient.URL_USER_UPLOAD;
        let param = new UploadAvatarRequestModel();
        param.account_token = token;
        param.filename = avatarData;
        //
        this.backData = await this.http.post<any>(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            const file_path: string = this.backData.data.file_path;
            this.editAvatarVisible = false;
            this.userInfo.avatar = this.imageHeadUrl + file_path;
            this.updateInfos.user_url = this.imageHeadUrl + file_path;
            //更新缓存数据
            LocalStorageUtil.addUserInfo(this.userInfo);
            let newParam = new UpdateInfos();
            newParam.user_url = file_path;
            newParam.address = this.updateInfos.address;
            if (this.updateInfos.nickname != "")
                newParam.nickname = this.updateInfos.nickname;
            if (this.updateInfos.sex) newParam.sex = this.updateInfos.sex;
            if (this.updateInfos.birthday != "")
                newParam.birthday = this.updateInfos.birthday;
            this.saveUserInfo(newParam);
            this.uploadAvatarSuccess();
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.uploadAvatarFail(this.backData);
        }
    }

    /**
     * 退出登录
     */
    public async onLoginOut() {
        this.isLoading = true;
        const tokenInfo = LocalStorageUtil.getUserToken();
        const url = HttpClient.URL_AUTH_LOGOUT;
        const param = {
            account_token: tokenInfo.account_token
        };
        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (
            this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE ||
            this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE
        ) {
            LocalStorageUtil.loginOut();
            JumpWebUtil.backHome();
        } else {
            //退出登录失败
        }
    }

    /**
     * TODO... 需要重写此方法
     * 上传头像成功
     */
    public uploadAvatarSuccess() {
    }

    /**
     * TODO... 需要重写此方法
     * 上传头像失败
     */
    public uploadAvatarFail(data) {
    }

    /**
     * 充值卡充值
     */
    public async onCardFee(param: CardfeeModel) {
        try {
            this.isLoading = true;
            const url = HttpClient.URL_USER_CARDFEE;
            this.backData = await this.http.post(url, param);
            this.isLoading = false;
            //
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.onCardFeeSuccess(this.backData);
            } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
                this.tokenExpired();
            } else {
                this.onCardFeeError(this.backData);
            }
        } catch (e) {
            //   alert('网络错误')
        }
    }
    /**
     * CDKEY 码体验
     */
    public  async onPayCDKey(){
        this.isLoading = true;
        // 验证CD-Key码的格式,后续可以增加
        //充值
        const url = HttpClient.URL_USER_CDKey;
        let param = new CDKeyModel();
        param.account_token =Util.getUrlParam('account_token') ||LocalStorageUtil.getUserToken().account_token;
        param.cd_key = this.cd_key;
        this.backData = await this.http.post<CDKeyResult>(url, param);
        this.isLoading = false;
        if(this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE){
            if(this.backData.data.card_type.toString()=='2'){
                //如果充值卡的类型为可以暂停的充值卡，提示到期时间和有效期
                let lang=Util.getUrlParam('language')||LocalStorageUtil.getLanguage();
                this.cd_key_min=this.backData.data.experience_minutes;
                this.cd_key_time=Util.minToDay(this.cd_key_min,lang);
                this.cdKeySuceess(this.$i18n.t('user.b67_5').toString(),this.backData.data.experience_expiry_time)
            }else{
                this.cdKeySuceess(this.$i18n.t('user.b67_5').toString())
            }
        }else if(this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE){
            //token失效
            LocalStorageUtil.loginOut();
            JumpWebUtil.backLogin();
        }else{
            this.cdKeyError(this.backData.msg)
        }
    }
    /**
     * 充值卡充值成功
     * TODO... 需要重写此方法
     */
    public onCardFeeSuccess(data) {
    }
    /**
     * CDKEy充值成功
     * TODO... 需要重写此方法
     */
    public cdKeySuceess(msg:String,expiry_time?:String){

    }
    /**
     * CDKEy充值失败
     * TODO... 需要重写此方法
     */
    public cdKeyError(msg:String) {
    }
    /**
     * 充值卡充值失败
     * TODO... 需要重写此方法
     */
    public onCardFeeError(backData) {
    }

    /**
     * 暂停计时
     */
    public async onTimeSuspended() {
        try {
            this.isLoading = true;
            const url = HttpClient.URL_USER_PAUSE;
            let param = new TimeSuspendedRequestModel();
            param.account_token = LocalStorageUtil.getUserToken().account_token;
            this.backData = await this.http.post(url, param);
            this.isLoading = false;
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.getUserInfo();
                this.onTimeSuspendedSuccess();
            } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
                this.tokenExpired();
            } else {
                this.onTimeSuspendedFaild(this.backData);
            }
        } catch (e) {
        }
    }

    /**
     * 暂停计时成功
     * TODO... 需要重写此方法
     */
    public onTimeSuspendedSuccess() {
    }

    /**
     * 暂停计时失败
     * TODO... 需要重写此方法
     */
    public onTimeSuspendedFaild(data: any) {
    }

    /**
     * 恢复计时
     */
    public async onTimeRestore() {
        try {
            this.isLoading = true;
            const url = HttpClient.URL_USER_RECOVER;
            let param = new TimeSuspendedRequestModel();
            param.account_token = LocalStorageUtil.getUserToken().account_token;
            this.backData = await this.http.post(url, param);
            this.isLoading = false;
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.getUserInfo();
                this.onTimeRestoreSuccess();
            } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
                this.tokenExpired();
            } else {
                this.onTimeRestoreFaild(this.backData);
            }
        } catch (e) {
        }
    }

    /**
     * 恢复计时成功
     * TODO... 需要重写此方法
     */
    public onTimeRestoreSuccess() {
    }

    /**
     * 恢复计时失败
     * TODO... 需要重写此方法
     */
    public onTimeRestoreFaild(data: any) {
    }

    /**
     * 获取用户暂停日志
     */
    public async onPauseLogs() {
        try {
            this.isLoading = true;
            const url = HttpClient.URL_USER_PAUSELOG;
            let param = new pauseLogRequestModel();
            let account_token = Util.getUrlParam("account_token");
            if (account_token == "" || account_token == null) {
                account_token = LocalStorageUtil.getUserToken().account_token;
            }
            param.account_token = account_token;
            param.size = 15;
            this.backData = await this.http.post(url, param);
            this.isLoading = false;
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.onPauseLogSuccess(this.backData);
            } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
                this.tokenExpired();
            } else {
                this.onPauseLogFaild(this.backData);
            }
        } catch (e) {
        }
    }

    /**
     * 获取用户暂停日志成功
     */
    onPauseLogSuccess(data) {
    }

    /**
     * 获取用户暂停日志失败
     */
    onPauseLogFaild(data) {
    }

    /**
     * 第三方登陆解除绑定
     */
    public async onRemoveBing() {
        try {
            this.isLoading = true;
            const url = HttpClient.URL_REMOVEBIND;
            let param = new removeBindRequestModel();
            let account_token = Util.getUrlParam("account_token");
            if (account_token == "" || account_token == null) {
                account_token = LocalStorageUtil.getUserToken().account_token;
            }
            param.account_token = account_token;
            param.open_type = 2;
            this.backData = await this.http.post(url, param);
            this.isLoading = false;
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.onRemoveBindSuccess(this.backData);
            } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
                this.tokenExpired();
            } else {
                this.onRemoveBindFaild(this.backData);
            }
        } catch (e) {
        }
    }

    /**
     * 解除绑定成功
     * @param data
     */
    onRemoveBindSuccess(data) {
    };

    /**
     * 解除绑定失败
     * @param data
     */

    onRemoveBindFaild(data) {
    };
}
