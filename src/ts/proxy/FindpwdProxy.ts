import { Component } from 'vue-property-decorator';
import {RegisterProxy} from './RegisterProxy';
import HttpClient from '../net/HttpClient';
import {IdataModel} from '../models/IdataModel';
import {EmailFindPwdRequestModel, FindUserIsExistModel, PhoneFindPwdRequestModel} from '../models/UserModel';
import {Md5} from 'ts-md5';
import {TipsMsgUtil} from '../utils/TipsMsgUtil';
import LocalStorageUtil from '../utils/LocalStorageUtil';

/**
 * 找回密码proxy
 */
@Component
export class FindpwdProxy extends RegisterProxy {

    // http
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    // 确认账户存在显示下一步 0 不显示  1显示
    public checkUserValue = 0;

    /**
     * 手机号码找回密码
     */
    public onPhoneFindPassword() {
        const url = HttpClient.URL_AUTH_RETRIEVE;
        let param = new PhoneFindPwdRequestModel();
        param.phone = this.phone;
        param.password = Md5.hashStr(this.phonePassword).toString();
        param.country_code = this.countryCode;
        param.smscode = this.smscode;
        param.smscode_key = this.smsCapchaM.smscode_key;
        param.checkcode = this.imgCaptchaCode;
        param.checkcode_key = this.imgCaptchaM.key
        this.onRetrieve(url, param)
    }

    /**
     * 邮箱找回密码
     */
    public onEmailFindPassword() {
        const url = HttpClient.URL_AUTH_RETRIEVE;
        let param = new EmailFindPwdRequestModel();
        param.email = this.email;
        param.password = Md5.hashStr(this.emailPassword).toString();
        param.mailcode = this.emailcode;
        param.mailcode_key = this.emailCapchaM.emailcode_key;
        param.checkcode = this.imgCaptchaCode;
        param.checkcode_key = this.imgCaptchaM.key;
        this.onRetrieve(url, param)
    }

    /**
     * 请求找回密码
     */
    public async onRetrieve(url: string, param: any) {
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.isLoading = false;
            localStorage.removeItem(LocalStorageUtil.STORAGES_PHONE);
            localStorage.removeItem(LocalStorageUtil.STORAGES_EMAIL);
            localStorage.removeItem(LocalStorageUtil.STORAGES_PHONE_PW);
            localStorage.removeItem(LocalStorageUtil.STORAGES_EMAIL_PW);
            localStorage.removeItem(LocalStorageUtil.STORAGES_PW);
            this.onFindPwdSuccess()
        } else {
            this.isLoading = false;
            // 错误返回
            this.onFindPwdFaild(this.backData);
            this.isimgVerification = 1;
            this.onGetCaptcha();
        }
    }

    /**
     * 密码找回成功
     * TODO... 此方法可以重写，处理成功后的ui逻辑
     */
    onFindPwdSuccess() {
    }

    /**
     * 密码找回失败
     * TODO... 此方法可以重写，处理失败后的ui逻辑
     */
    onFindPwdFaild(data: any) {
    }

    /**
     * 判断账号是否存在 0 不存在 1存在
     * @param account 账号
     */
    public async FindUserIsExist(account: string) {
        const url = HttpClient.URL_USER_CHECK_PSW_ISEXIST;
        const param = {
            account: account,
        };
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            let dd: FindUserIsExistModel = this.backData.data;
            return dd.is_exist
        }
    }
}