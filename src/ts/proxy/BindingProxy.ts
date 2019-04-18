import { RegisterProxy } from './RegisterProxy';
import HttpClient from '../net/HttpClient';
import { IdataModel } from '../models/IdataModel';
import {CaptchaRequestModel, CaptchaModel, areaCodeCaptchaModel} from '../models/CaptchaModel';
import {Component} from "vue-property-decorator";
import LocalStorageUtil from '../utils/LocalStorageUtil';
import { BindEmailRequestModel, BindPhoneRequestModel, VerifyCodeValidateRequestModel, modifyEmailRequestModel, modifyPhoneRequestModel, ThirdbindStateModel, ThirdbindStateListModel, removeBindRequestModel } from '../models/UserModel';

/**
 * 绑定手机号proxy
 */
@Component
export class BindingProxy extends RegisterProxy {
    // http
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    public verify_key: string = '';//验证码key
    public verify_code: string = '';//用户输入的验证码
    public isPw: boolean = false; //是否需要输入密码
    public verifyCountDownNum: number = 0; // 验证码倒计时
    public thirdBindState: ThirdbindStateModel = new ThirdbindStateModel();//用户第三方账号绑定状态

    /**
     * 绑定邮箱
     */
    public async bindEmail(){
        this.isLoading = true;
        const token = LocalStorageUtil.getUserToken().account_token;
        let url = HttpClient.URL_USER_BIND_EMAIL;
        let param = new BindEmailRequestModel();
        param.account_token = token;
        param.email = this.email;
        param.mailcode = this.emailcode;
        param.mailcode_key = this.emailCapchaM.emailcode_key;

        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.bindEmailSuccess()
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        }else{
            this.bindEmailFaild(this.backData)
        }
    }

    /**
     * 绑定邮箱成功ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public bindEmailSuccess(){

    }

    /**
     * 绑定邮箱失败ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public bindEmailFaild(data: any) {

    }

    /**
     * 绑定手机
     */
    public async bindPhone() {
        this.isLoading = true;
        const token = LocalStorageUtil.getUserToken().account_token;
        let url = HttpClient.URL_USER_BIND_PHONE;
        let param = new BindPhoneRequestModel();
        param.account_token = token;
        param.phone = this.phone;
        param.smscode = this.smscode;
        param.smscode_key = this.smsCapchaM.smscode_key;
        param.country_code = this.countryCode;

        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.bindPhoneSuccess()
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.bindPhoneFaild(this.backData)
        }
    }

    /**
     * 绑定手机成功ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public bindPhoneSuccess() {

    }

    /**
     * 绑定手机失败ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public bindPhoneFaild(data: any) {

    }

    /**
     * TODO... 需要重写此方法
     * token过期处理
     * @param param
     */
    public tokenExpired(param: string = ''): void {

    }

    /**
     * 修改账号第一步验证验证码
     */
    public async verifyCodeValidate(){
        this.isLoading = true;
        const token = LocalStorageUtil.getUserToken().account_token;
        const url = HttpClient.URL_USER_VERIFY_CODE_VALIDATE;
        let param = new VerifyCodeValidateRequestModel();
        param.account_token = token;
        param.verify_code = this.verify_code;
        param.verify_key = this.verify_key;

        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.verifyCodeValidateSuccess()
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.verifyCodeValidateFaild(this.backData)
        }
    }

    /**
     * 验证验证码成功ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public verifyCodeValidateSuccess() {

    }

    /**
     * 验证验证码失败ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public verifyCodeValidateFaild(data: any) {

    }

    /**
     * 解绑邮箱
     */
    public async unbindEmail(){
        this.isLoading = true;
        const token = LocalStorageUtil.getUserToken().account_token;
        const url = HttpClient.URL_USER_CLEAR_EMAIL;
        let param = {
            account_token: token
        }

        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.unbindEmailSuccess()
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.unbindEmailFaild(this.backData)
        }
    }

    /**
     * 解绑邮箱成功ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public unbindEmailSuccess() {

    }

    /**
     * 解绑邮箱失败ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public unbindEmailFaild(data: any) {

    }

    /**
     * 解绑手机号
     */
    public async unbindPhone() {
        this.isLoading = true;
        const token = LocalStorageUtil.getUserToken().account_token;
        const url = HttpClient.URL_USER_CLEAR_PHONE;
        let param = {
            account_token: token
        }

        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.unbindPhoneSuccess()
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.unbindPhoneFaild(this.backData)
        }
    }

    /**
     * 解绑手机号成功ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public unbindPhoneSuccess() {

    }

    /**
     * 解绑手机号失败ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public unbindPhoneFaild(data: any) {

    }

    /**
     * 修改邮箱账号
     */
    public async onModifyEmail() {
        this.isLoading = true;
        const token = LocalStorageUtil.getUserToken().account_token;
        const url = HttpClient.URL_USER_MODIFY_EMAIL;
        let param = new modifyEmailRequestModel();
        param.account_token = token;
        param.email = this.email;
        param.mailcode = this.emailcode;
        param.mailcode_key = this.emailCapchaM.emailcode_key;
        param.verify_code = this.verify_code;
        param.verify_key = this.verify_key;

        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.onModifyEmailSuccess()
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.onModifyEmailFaild(this.backData)
        }
    }

    /**
     * 修改邮箱账号成功ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public onModifyEmailSuccess() {

    }

    /**
     * 修改邮箱账号失败ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public onModifyEmailFaild(data: any) {

    }

    /**
     * 修改手机账号
     */
    public async onModifyPhone() {
        this.isLoading = true;
        const token = LocalStorageUtil.getUserToken().account_token;
        const url = HttpClient.URL_USER_MODIFY_PHONE;
        let param = new modifyPhoneRequestModel();
        param.account_token = token;
        param.phone = this.phone;
        param.smscode = this.smscode;
        param.smscode_key = this.smsCapchaM.smscode_key;
        param.country_code = this.countryCode;
        param.verify_code = this.verify_code;
        param.verify_key = this.verify_key;

        this.backData = await this.http.post(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.onModifyPhoneSuccess()
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.onModifyPhoneFaild(this.backData)
        }
    }

    /**
     * 修改手机账号成功ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public onModifyPhoneSuccess() {

    }

    /**
     * 修改手机账号失败ui逻辑
     * todo 此方法需在UI逻辑文件中重写
     */
    public onModifyPhoneFaild(data: any) {

    }

    /**
     * 获取用户第三方登录已绑定列表
     */
    public async getThirdBindState (){
        const url = HttpClient.URL_AUTH_OPEN_LIST;
        let token = LocalStorageUtil.getUserToken().account_token;
        let param = {
            account_token: token
        }
        this.backData = await this.http.post<Array<ThirdbindStateListModel>>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            for (var i = 0; i < this.backData.data.length ; i++){
                switch (this.backData.data[i].open_type){
                    case 2:
                        this.thirdBindState.wechat = true;
                        break;
                    case 3:
                        this.thirdBindState.QQ = true; 
                        break;
                    case 4:
                        this.thirdBindState.weibo = true;
                        break;
                    case 5:
                        this.thirdBindState.google = true;
                        break;
                    case 6:
                        this.thirdBindState.twitter = true;
                        break;
                    case 7:
                        this.thirdBindState.facebook = true;
                    default:
                        break;
                }
            }
            this.onGetThirdBindStateSuccess(this.backData)
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.onGetThirdBindStateFaild(this.backData)
        }
    }

    /**
     * 获取用户第三方登录已绑定列表成功
     */
    public onGetThirdBindStateSuccess(data: any) {

    }

    /**
     * 获取用户第三方登录已绑定列表失败
     */
    public onGetThirdBindStateFaild(data: any) {

    }

    /**
     * 解绑第三方账号
     */
    public async onThirdUntied(type: number) {
        const url = HttpClient.URL_REMOVEBIND;
        let token = LocalStorageUtil.getUserToken().account_token;
        let param = new removeBindRequestModel();
        param.account_token = token;
        param.open_type = type;

        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.onThirdUntiedSuccess(type)
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.onThirdUntiedFaild(this.backData)
        }
    }

    /**
     * 用户解绑第三方账号成功
     */
    public onThirdUntiedSuccess(type: number) {

    }

    /**
     * 用户解绑第三方账号失败
     */
    public onThirdUntiedFaild(data: any) {

    }
}