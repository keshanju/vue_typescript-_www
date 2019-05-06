import HttpClient from '../net/HttpClient';
import {IdataModel} from '../models/IdataModel';
import {IProxy} from '../interface/IProxy';
import {areaCodeCaptchaModel} from '../models/CaptchaModel';
import {Vue, Component} from 'vue-property-decorator';
import LocalStorageUtil from '../utils/LocalStorageUtil';
import {LoginModel, LoginRequestModel} from '../models/UserModel';
import {TipsMsgUtil} from '../utils/TipsMsgUtil';
import Md5 from 'md5';
import Util from "@/ts/utils/Util";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import {GetRegincodeModel} from "@/ts/models/NewsModel";

/**
 * 登录proxy
 */
@Component
export class LoginProxy extends Vue implements IProxy {

    public errorMsg: string = "";
    public loginType: number = 0; //0手机登录 1邮箱登录
    public country_code_list = [];//手机区号
    public countryCode = {
        code: "",
        group: "",
        ico: "",
        iso_code: "",
        name: "",
    };//手机号前缀
    public country_code:string = '';
    public phone: string = '';//手机号
    public email: string = '';//邮箱号
    public phonePassword: any = ''; // 手机号密码
    public emailPassword: any = ''; // 邮箱密码
    public isKeepPw: boolean = false;//是否保存密码
    public isPwMd5: boolean = false;//密码是否md5
    public areaCodeList = [];// 手机区号list
    public areaCodeListArr = []; // 手机区号list数组
    public username: string = '';//用户名
    public commonPsaaword: string = '';//密码(可以是手机 也可以是邮箱)

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
    public notifNum: number = 0;//提示次数
    ///////公共参数 END

    public init(): void {
        let phone = localStorage.getItem(LocalStorageUtil.STORAGES_PHONE);
        if (phone != null && phone != 'undefined') {
            this.phone = phone;
            this.username = phone;
        }
        let email = localStorage.getItem(LocalStorageUtil.STORAGES_EMAIL);
        if (email != null && email != 'undefined') {
            this.email = email;
            this.username = email;
        }
        // this.getAreaCodeList();
        this.changeLoginType(0);
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
            this.country_code = this.backData.data.now_country;
            let country_code = localStorage.getItem(LocalStorageUtil.STORAGES_PHONE_REGION);
            if(country_code != null && country_code != undefined) {
                this.country_code = country_code;
            }
            for(const key in this.backData.data.list_country){
                this.areaCodeList.push(this.backData.data.list_country[key]);
            }
        }
    }

    /**
     * 获取手机区号
     */
    // public async getAreaCodeInfoList() {
    //     const url = HttpClient.URL_TOOL_COUNTRY_CODES;
    //     const param = {};
    //     this.backData = await this.http.get<areaCodeCaptchaModel>(url, param);
    //     if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
    //         this.countryCode = this.backData.data.now_country;
    //         let country_code = localStorage.getItem(LocalStorageUtil.STORAGES_PHONE_REGION);
    //         if (country_code != null && country_code != 'undefined') {
    //             this.countryCode = this.backData.data.list_country.filter((item)=>{
    //                 return item.code == country_code;
    //             })[0];
    //         };
    //         this.areaCodeListArr = this.backData.data.list_country;
    //         let n = 0;
    //         let list = [];
    //         let arr = {
    //             label:"",
    //             options:[]
    //         };
    //         for(let i=0; i< this.areaCodeListArr.length ; i++){
    //             if(i == this.areaCodeListArr.length - 1) {
    //                 let arr = {
    //                     label:"",
    //                     options:[]
    //                 };
    //                 arr.label = this.areaCodeListArr[i].group;
    //                 arr.options = this.areaCodeListArr.slice(n,i+1);
    //                 list.push(arr);
    //             } else if(this.areaCodeListArr[i].group != this.areaCodeListArr[i+1].group){
    //                 let arr = {
    //                     label:"",
    //                     options:[]
    //                 };
    //                 arr.label = this.areaCodeListArr[i].group;
    //                 arr.options = this.areaCodeListArr.slice(n,i+1);
    //                 list.push(arr);
    //                 n = i+1;
    //             }
    //         }
    //         arr.options = this.backData.data.top_country;
    //         list.unshift(arr);
    //         this.country_code_list = list;
    //     }
    // }


    /**
     * 获取手机区号
     * @param webUrl 官网路径
     */
    public async getAreaCodeInfoList(webUrl:string) {
        let regionInfos:GetRegincodeModel =await ConfigUtil.getInstance().getRegincode(webUrl);
        this.backData = await ConfigUtil.getInstance().getCounteyCode(webUrl);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.countryCode = this.backData.data.list_country.filter((item)=>{
                return item.code == regionInfos.mobile_code;
            })[0];

            let country_code = localStorage.getItem(LocalStorageUtil.STORAGES_PHONE_REGION);
            if (country_code != null && country_code != 'undefined') {
                this.countryCode = this.backData.data.list_country.filter((item)=>{
                    return item.code == country_code;
                })[0];
            };
            this.country_code = this.countryCode.code;
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
     * 切换登录方式
     */
    public changeLoginType(type: number) {
        this.loginType = type;
        //读取loaclStorage
        let password = null;
        if (type == 0 && !this.isPwMd5) {
            password = localStorage.getItem(LocalStorageUtil.STORAGES_PHONE_PW);
            if (password == null) password = '';
        }
        if (type == 1 && !this.isPwMd5) {
            password = localStorage.getItem(LocalStorageUtil.STORAGES_EMAIL_PW);
            if (password == null) password = '';
        }
        if (password != '') {
            this.isKeepPw = true;
        } else {
            this.isKeepPw = false;
        }
        this.isPwMd5 = false;
        if (type == 0) {
            this.phonePassword = password;
        }
        if (type == 1) {
            this.emailPassword = password;
        }
    }

    /**
     * 密码修改
     */
    public onPasswordInput(type: number) {
        if (type == 0) {
            let password = localStorage.getItem(LocalStorageUtil.STORAGES_PHONE_PW);
            if (this.phonePassword == password) return;
        }
        if (type == 1) {
            let password = localStorage.getItem(LocalStorageUtil.STORAGES_EMAIL_PW);
            if (this.emailPassword == password) return;
        }
        this.isPwMd5 = true;
    }

    /**
     * 手机登录
     */
    public onPhoneLogin() {
        const url = HttpClient.URL_AUTH_LOGIN;
        let password = this.phonePassword;
        if (this.isPwMd5) {
            password = Md5(this.phonePassword).toString();
        }
        ;
        let param = new LoginRequestModel();
        param.country_code = this.country_code;
        param.username = this.phone;
        param.password = password;
        param.src_channel = LocalStorageUtil.getSrcChannel();
        localStorage.setItem(LocalStorageUtil.STORAGES_PHONE, this.phone);
        localStorage.setItem(LocalStorageUtil.STORAGES_USERNAME, this.phone);
        localStorage.setItem(LocalStorageUtil.STORAGES_PHONE_REGION, this.country_code);
        if (this.isKeepPw) {
            localStorage.setItem(LocalStorageUtil.STORAGES_PHONE_PW, password);
            localStorage.setItem(LocalStorageUtil.STORAGES_PW, password);
        } else {
            localStorage.removeItem(LocalStorageUtil.STORAGES_PHONE_PW);
            localStorage.removeItem(LocalStorageUtil.STORAGES_PHONE_REGION);
        }
        this.loginIn(url, param);
    }

    /**
     * 邮箱登录
     */
    public onEmaillLogin() {
        const url = HttpClient.URL_AUTH_LOGIN;
        let password = this.emailPassword;
        if (this.isPwMd5) {
            password = Md5(this.emailPassword).toString();
        }
        let param = new LoginRequestModel();
        param.username = this.email;
        param.password = password;
        param.src_channel = LocalStorageUtil.getSrcChannel();
        localStorage.setItem(LocalStorageUtil.STORAGES_EMAIL, this.email);
        localStorage.setItem(LocalStorageUtil.STORAGES_USERNAME, this.email);
        if (this.isKeepPw) {
            localStorage.setItem(LocalStorageUtil.STORAGES_EMAIL_PW, password);
            localStorage.setItem(LocalStorageUtil.STORAGES_PW, password);
        } else {
            localStorage.removeItem(LocalStorageUtil.STORAGES_EMAIL_PW);
        }
        this.loginIn(url, param);
    }

    /**
     * 登录
     */
    public async loginIn(url: string, param: any) {
        this.isLoading = true;
        this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);

        this.backData = await this.http.post<LoginModel>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.isLoading = false;
            const loginM: LoginModel = this.backData.data;
            LocalStorageUtil.addUserToken(loginM.login_info);
            LocalStorageUtil.addUserInfo(loginM.user_info);
            this.onLoginSuccess();
        } else {
            this.isLoading = false;
            this.onLoginFaild(this.backData)
        }
    }

    /**
     * 登录成功
     * TODO... 此方法可以重写，处理登录成功后的ui逻辑
     */
    onLoginSuccess() {
    }

    /**
     * 登录失败
     * TODO... 此方法可以重写，处理登录失败后的ui逻辑
     */
    onLoginFaild(data: any) {
    }
}
