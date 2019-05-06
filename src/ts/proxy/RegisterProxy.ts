import { Vue,Component } from 'vue-property-decorator';
import { IProxy } from "@/ts/interface/IProxy";
import HttpClient from "@/ts/net/HttpClient";
import {
    CaptchaModel,
    CaptchaRequestModel,
    ImgCaptchaModel,
    ImgCaptchaRequestModel,
    SmsCaptchaModel, SmsCaptchaRequestModel, EmailCaptchaModel, EmailCaptchaRequestModel, areaCodeCaptchaModel
} from "@/ts/models/CaptchaModel";
import { IdataModel } from "@/ts/models/IdataModel";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import Util from "@/ts/utils/Util";
import { PhoneRegisterRequestModel, EmailRegisterRequestModel, BindRequestModel, LoginModel, SendVerificationCodeRequestModel, SendVerificationCodeModel } from "@/ts/models/UserModel";
import { Md5 } from 'ts-md5';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {GetRegincodeModel} from "@/ts/models/NewsModel";
import ConfigUtil from "@/ts/utils/ConfigUtil";

/**
 * 注册proxy
 */
@Component
export class RegisterProxy extends Vue implements IProxy {

    public agreementChceked: boolean = false;//是否勾选用户协议
    public resignType: number = 0; // 0手机注册 1邮箱注册 || 2手机找回密码 3邮箱找回密码 || 4 第三方登录绑定手机号  5 第三方登录绑定邮箱 || 6 绑定邮箱  7绑定手机号
    public bind_status: string = '';//绑定方式
    public countryCode:string = ''; // 手机号前缀
    public country_code = {
        code: '',
        group: "",
        ico: "",
        iso_code: "",
        name: "",
    };//手机区号
    public country_code_list = [];//手机区号
    public areaCodeList = []; // 手机区号list
    public areaCodeListArr = []; // 手机区号list数组
    public phone: string = '';
    public email: string = '';
    public username: string = '';//账号  雷神海外会员注册需要的
    public nickname: string = '';// 昵称
    public smscode: string = ''; // 短信code
    public emailcode: string = ''; // 邮箱code
    public phonePassword: string = ''; // 手机密码
    public phonePasswordTwo: string = ''; // 确认手机密码
    public emailPassword: string = ''; // 邮箱密码
    public emailPasswordTwo: string = ''; // 确认邮箱密码
    public imgCaptchaCode: string = ''; // 输入的图形验证码
    public imgCaptchaM: ImgCaptchaModel = new ImgCaptchaModel(); // 图形验证码model
    public isimgVerification: number = 0; // 是否需要图片验证
    public smsCapchaM: SmsCaptchaModel = new SmsCaptchaModel(); // 短信验证码
    public emailCapchaM: EmailCaptchaModel = new EmailCaptchaModel(); // 邮箱验证码
    public package_id: any = 0; // 选择的活动套餐
    public price_id: any = 0; // 选择的活动套餐
    public packageIndex: number = -1;
    public packageList: Array<object> = []; // 套餐list
    public smsCountDownNum: number = 0; // 短信倒计时
    public emailCountDownNum: number = 0; //邮件发送倒计时
    public verifyCountDownNum: number = 0;//已登录账号验证码发送倒计时
    public referCode: string = '';//推荐码
    public isShowEmail: number = 0; // 是否显示邮箱注册 0否 1是
    public verify_code: string = ''; // 用户输入的已登录账号code
    public verify_key: string = ''; // 已登录账号code的key
    public token: string = '';//用户token

    ///////公共参数
    // http
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    // loading
    public isLoading: boolean = false;
    public loadingMsg: string = ''; // loading的说明文字
    // notif
    public notifTitle: string = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE); //提示信息标题
    public notifMessage: string = ""; //提示信息message
    public notifType: any = "success"; //提示信息类型
    public notifCount: number = 0;//提示次数
    ///////公共参数 END

    public init(): void {
        this.referCode = Util.getUrlParam('refer_code');
        this.onGetPackage();
    }

    public execute(): void {
        // TODO...
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 获取手机区号集合
     */
    public async getAreaCodeList() {
        const url = HttpClient.URL_AUTH_COUNTRY;
        const param = {};

        this.backData = await this.http.get<areaCodeCaptchaModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.countryCode = this.backData.data.now_country;
            let country_code = localStorage.getItem(LocalStorageUtil.STORAGES_PHONE_REGION);
            if(country_code != null && country_code != undefined) {
                this.countryCode = country_code;
            }
            for(const key in this.backData.data.list_country){
                this.areaCodeList.push(this.backData.data.list_country[key]);
            }
        }
    }

    /**
     * 获取手机区号
     * @param webUrl 官网路径
     */
    public async getAreaCodeInfoList(webUrl:string) {
        let regionInfos:GetRegincodeModel =await ConfigUtil.getInstance().getRegincode(webUrl);
        this.backData = await ConfigUtil.getInstance().getCounteyCode(webUrl);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.country_code = this.backData.data.list_country.filter((item)=>{
                return item.code == regionInfos.mobile_code;
            })[0];

            console.log(this.countryCode);

            let country_code = localStorage.getItem(LocalStorageUtil.STORAGES_PHONE_REGION);
            if (country_code != null && country_code != 'undefined') {
                this.country_code = this.backData.data.list_country.filter((item)=>{
                    return item.code == country_code;
                })[0];
            };
            this.countryCode = this.country_code.code;
            this.areaCodeListArr = this.backData.data.list_country;
            let n = 0;
            let list = [];
            let arr = {
                label:"",
                options:[]
            };
            for(let i=0; i< this.areaCodeListArr.length ; i++){
                if(i == this.areaCodeListArr.length - 1) {
                    let arr = {
                        label:"",
                        options:[]
                    };
                    arr.label = this.areaCodeListArr[i].group;
                    arr.options = this.areaCodeListArr.slice(n,i+1);
                    list.push(arr);
                } else if(this.areaCodeListArr[i].group != this.areaCodeListArr[i+1].group){
                    let arr = {
                        label:"",
                        options:[]
                    };
                    arr.label = this.areaCodeListArr[i].group;
                    arr.options = this.areaCodeListArr.slice(n,i+1);
                    list.push(arr);
                    n = i+1;
                }
            }
            arr.options = this.backData.data.top_country;
            list.unshift(arr);
            this.country_code_list = list;
        }
    }

    /**
     * 切换注册方式
     */
    onChangeRegisterType(type: number) {
        this.resignType = type;
        this.isimgVerification = 0; //切换后图形验证码还原
        this.registerIsCaptcha();
    }

    /**
     * 是否需要图形验证码
     */
    public async registerIsCaptcha() {
        const url = HttpClient.URL_IS_CAPTCHA_LIST;
        const param = new CaptchaRequestModel();
        switch (this.resignType){
            //手机注册
            case 0:
                param.path_method = param.getPhoneRegisterPath();
                break;
            //邮箱注册
            case 1:
                param.path_method = param.getEmailRegisterPath();
                break;
            //手机找回密码
            case 2:
                param.path_method = param.getPhoneFindpwdPath();
                break;
            //邮箱找回密码
            case 3:
                param.path_method = param.getEamilFindpwdPath();
                break;
            //第三方登录绑定手机
            case 4:
                param.path_method = param.getBindingPhonePath();
                break;
            //第三方登录绑定邮箱
            case 5:
                param.path_method = param.getBindingEmailPath();
                break;
            //绑定邮箱
            case 6:
                param.path_method = param.getBindEmailPath();
                break;
            //绑定手机
            case 7:
                param.path_method = param.getBindPhonePath();
                break;
        }
        //
        this.backData = await this.http.post<CaptchaModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.isimgVerification = this.backData.data.is_validate as number;
            if (this.isimgVerification == 1) {
                this.onGetCaptcha();
            }
        }
    }

    /**
     * 获取图形验证码
     */
    public async onGetCaptcha() {
        this.isimgVerification = 1;
        const url = HttpClient.URL_CODE_CAPTCHA;
        const param = new ImgCaptchaRequestModel();

        this.backData = await this.http.get<ImgCaptchaModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.imgCaptchaM = this.backData.data;
        }
    }

    /**
     * 获取活动套餐
     */
    public async onGetPackage(billing_type:number=2) {
        let url = HttpClient.URL_AUTH_REGISTER_PACKAGE
        let param = {
            user_type: '0',
            region_code: LocalStorageUtil.getRegionCodes()
        }
        this.backData = await this.http.post(url, param);
        let data = this.backData.data;
        this.packageList = [];
        if (data != null && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].billing_type == billing_type) {
                    this.package_id = data[i].package_id;
                    if (data[i].price != null && data[i].price.length > 0) {
                        this.price_id = data[i].price[0].price_id;
                    }
                }
                if (data[i].price != null && data[i].price.length > 0) {
                    for (let j = 0; j < data[i].price.length; j++) {
                        data[i].price[j].package_id = data[i].package_id;
                        data[i].price[j].price_t_name = '(' + data[i].package_title + ')' + data[i].price[j].price_short_desc;
                        this.packageList.push(data[i].price[j]);
                    }
                }
            }
        }
    }



    /**
     * 获取短信/语音验证码
     * @param type 0短信 1语言
     */
    public async onGetSmscode(type: number, state: number) {
        let url = '';
        if (type == 0) {
            url = HttpClient.URL_CODE_SMSCODE;
        } else if (type == 1) {
            url = HttpClient.URL_CODE_VOICE;
        }
        let param = new SmsCaptchaRequestModel();
        param.phone = this.phone;
        param.country_code = this.countryCode;
        param.state = state;
        param.checkcode = this.imgCaptchaCode;
        param.checkcode_key = this.imgCaptchaM.key;
        if (state == 3){
            param.code = Util.getUrlParam('code');
        }
        //loading
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
        //
        this.backData = await this.http.post<SmsCaptchaModel>(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            // 正确返回
            this.smsCapchaM = this.backData.data;
            this.bind_status = this.backData.data.bind_status;
            console.log(this.bind_status)
            this.onGetSmscodeSuccess();
        } else {
            this.onGetSmscodeFaild(this.backData)
            // 获取图形验证码
            this.onGetCaptcha();
        }
    }

    /**
     * 获取邮箱验证码
     */
    public async onGetEmailcode(state: number) {
        let url = HttpClient.URL_CODE_MAIL;
        let param = new EmailCaptchaRequestModel();
        param.email = this.email;
        param.state = state;
        param.checkcode = this.imgCaptchaCode;
        param.checkcode_key = this.imgCaptchaM.key;
        if (state == 3) {
            param.code = Util.getUrlParam('code');
        }
        //loading
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
        //
        this.backData = await this.http.post<EmailCaptchaModel>(url, param);
        this.isLoading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            // 正确返回
            this.emailCapchaM = this.backData.data;
            this.bind_status = this.backData.data.bind_status;
            this.onGetEmailcodeSuccess();
        } else {
            this.onGetEmailcodeFaild(this.backData)
            // 获取图形验证码
            this.onGetCaptcha();
        }
    }

    /**
     * 获取短信验证码成功
     * TODO... 此方法可以重写，处理短信获取成功后的ui逻辑
     */
    onGetSmscodeSuccess() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE);
        this.notifType = "success";
        this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS);
        this.notifCount++;//触发提示
        //倒计时
        this.smsCountDownNum = 60;
        const sefl = this;
        Util.countDown(this.smsCountDownNum, 1, (n: number) => {
            sefl.smsCountDownNum = n;
        });
    }

    /**
     * 获取短信验证码失败
     * TODO... 此方法可以重写，处理短信获取失败后的ui逻辑
     */
    onGetSmscodeFaild(data: any) {
        // 错误返回
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        this.notifMessage = data.msg;
        this.notifCount++;//触发提示
    }

    /**
     * 获取邮箱验证码成功
     * TODO... 此方法可以重写，处理邮件发送成功后的ui逻辑
     */
    onGetEmailcodeSuccess() {
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE);
        this.notifType = "success";
        this.notifMessage = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL);
        this.notifCount++;//触发提示
        //倒计时
        this.emailCountDownNum = 60;
        const sefl = this;
        Util.countDown(this.emailCountDownNum, 1, (n: number) => {
            sefl.emailCountDownNum = n;
        });
    }

    /**
     * 获取邮箱验证码失败
     * TODO... 此方法可以重写，处理邮件获取失败后的ui逻辑
     */
    onGetEmailcodeFaild(data: any) {
        // 错误返回
        this.notifTitle = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE);
        this.notifType = "warning";
        this.notifMessage = data.msg;
        this.notifCount++;//触发提示
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
     * token过期处理
     * @param param
     */
        public tokenExpired(param: string = ""): void { }

    /**
     * TODO... 需要重写此方法
     * 发送修改二级密码验证码成功
     */
    onSendVerificationSuccess(data: any) { }

    /**
     * TODO... 需要重写此方法
     * 发送修改二级密码验证码失败
     */
    onSendVerificationFaild(data: any) { }

    /**
     * 手机注册
     */
    public onPhoneRegister(os_type:number = 4) {
        const url = HttpClient.URL_AUTH_REGISTER;
        let param = new PhoneRegisterRequestModel();
        param.register_type = '1';
        param.phone = this.phone;
        param.password = Md5.hashStr(this.phonePassword).toString();
        param.country_code = this.countryCode;
        param.nickname = this.nickname;
        param.smscode = this.smscode;
        param.smscode_key = this.smsCapchaM.smscode_key;
        param.checkcode = this.imgCaptchaCode;
        param.checkcode_key = this.imgCaptchaM.key;
        param.package_id = this.package_id;
        param.price_id = this.price_id;
        param.refer_code = this.referCode;
        param.os_type = os_type;
        this.onRegister(url, param);
    }

    /**
     * 邮箱注册
     */
    public onEmaillRegister(os_type:number = 4) {
        const url = HttpClient.URL_AUTH_REGISTER;
        let param = new EmailRegisterRequestModel();
        param.register_type = '2';
        param.email = this.email;
        param.password = Md5.hashStr(this.emailPassword).toString();
        param.mailcode = this.emailcode;
        param.mailcode_key = this.emailCapchaM.emailcode_key;
        param.checkcode = this.imgCaptchaCode;
        param.checkcode_key = this.imgCaptchaM.key;
        param.package_id = this.package_id;
        param.price_id = this.price_id;
        param.nickname = this.nickname;
        param.refer_code = this.referCode;
        param.os_type = os_type;
        this.onRegister(url, param);
    }

    /**
     * 绑定手机号
     */
    public onBindPhone(state: string = '',os_type?: string) {
        const url = HttpClient.URL_AUTH_BIND_PLAT;
        let param = new BindRequestModel();
        param.country_code = this.countryCode;
        param.phone = this.phone;
        param.smscode = this.smscode;
        param.smscode_key = this.smsCapchaM.smscode_key;
        param.checkcode = this.imgCaptchaCode;
        param.checkcode_key = this.imgCaptchaM.key
        param.code = Util.getUrlParam('code');
        param.account_type = '1';
        param.register_type = this.bind_status;
        param.os_type = os_type;
        param.refer_code = this.referCode;
        if (state != ''){
            param.state = state;
        }
        if(this.bind_status == '4'){
            param.password = Md5.hashStr(this.phonePassword).toString();
            param.package_id = this.package_id;
            param.price_id = this.price_id;
        }
        this.onBind(url, param)
    }

    /**
     * 绑定邮箱
     */
    public onBindEmail(state: string = '', os_type?: string) {
        const url = HttpClient.URL_AUTH_BIND_PLAT;
        let param = new BindRequestModel();
        param.email = this.email;
        param.mailcode = this.emailcode;
        param.mailcode_key = this.emailCapchaM.emailcode_key;
        param.checkcode = this.imgCaptchaCode;
        param.checkcode_key = this.imgCaptchaM.key
        param.code = Util.getUrlParam('code');
        param.account_type = '2';
        param.register_type = this.bind_status;
        param.os_type = os_type;
        param.refer_code = this.referCode;
        if (state != '') {
            param.state = state;
        }
        if (this.bind_status == '4') {
            param.password = Md5.hashStr(this.phonePassword).toString();
            param.package_id = this.package_id;
            param.price_id = this.price_id;
        }
        this.onBind(url, param)
    }

    /**
     * 绑定已登录账号
     */
    public onBindDefaultAccount(state: string = '',os_type?: string){
        const url = HttpClient.URL_AUTH_BIND_PLAT;
        let param = new BindRequestModel();
        param.account_token = this.token;
        param.verify_code = this.verify_code;
        param.verify_key = this.verify_key;
        param.register_type = '3';
        param.os_type = os_type;
        param.code = Util.getUrlParam('code');
        if (state != '') {
            param.state = state;
        }
        this.onBind(url, param);
    }

    /**
     * 请求注册
     */
    public async onRegister(url: string, param: any) {
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.isLoading = false;
            this.onRegisterSuccess()
        } else {
            this.isLoading = false;
            this.isimgVerification = 1;
            this.onGetCaptcha();
            this.onRegisterFaild(this.backData)
        }
    }

    /**
     * 注册成功
     * TODO... 此方法可以重写，处理登录成功后的ui逻辑
     */
    onRegisterSuccess() {
    }

    /**
     * 注册失败
     * TODO... 此方法可以重写，处理注册失败后的ui逻辑
     */
    onRegisterFaild(data: any) {
    }

    /**
     * 绑定并注册
     */
    public async onBind(url: string, param: any) {
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.isLoading = false;
            this.onBindingSuccess(this.backData)
        } else {
            this.isLoading = false;
            this.onGetCaptcha();
            this.onBindingFaild(this.backData)
        }
    }

    /**
     * 手机号绑定成功
     * TODO... 此方法可以重写，处理登录成功后的ui逻辑
     */
    onBindingSuccess(data: any) {
    }

    /**
     * 手机号绑定失败
     * TODO... 此方法可以重写，处理手机号绑定失败后的ui逻辑
     */
    onBindingFaild(data: any) {
    }
}

