/**
 * app参数
 */
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {UserToken} from "@/ts/models/UserModel";
import {IParam} from "@/ts/interface/IParam";
import ProjectConfig from "../../../project.config";
import {isNull} from "util";

export default class WebParamModel implements IParam {

    public static instace: WebParamModel;
    public language: string = ''; // 语言
    public region_code: number = 0; // 地区code
    public account_token: string = ''; // token
    public id: number = 0; // 详情id
    public infrom: number = 0; // 0默认 1 ios（给苹果审核用的官网)
    public from: string = ''; //来源
    public domainList = ['cn.leigod.com'];

    public static getInstace(region_code: number = Util.REGION_CODE_0,language: string = Util.EN) {
        if(WebParamModel.instace == null) WebParamModel.instace = new WebParamModel(region_code,language);

        return WebParamModel.instace;
    }

    constructor(region_code: number,language: string) {
        this.region_code = region_code;
        this.language = language;
        this.getAppParam();
    }

    /**
     * app端页面参数
     */
    public getAppParam() {
        //兼容IE10问题
        if (!window.location.origin) {
            // @ts-ignore
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }

        this.id = parseInt(Util.getUrlParam('id'));
        if(isNaN(this.id)) {
            this.id = 0;
        }

        const href = window.location.href;
        const arr = href.split("/");
        let isLang = false; //是否找到
        let isRegion = false; //是否找到地址
        for(let v of arr) {
            // 语言
            if(!isLang) {
                switch (v) {
                    case Util.EN:
                        this.language = Util.EN;
                        isLang = true;
                        break;
                    case Util.CN:
                        this.language = Util.ZH_CN;
                        isLang = true;
                        break;
                }
            }
            // 地区
            if(!isRegion) {
                switch (parseInt(v)) {
                    case Util.REGION_CODE_0:
                        this.region_code = Util.REGION_CODE_0;
                        isRegion = true;
                        break;
                    case Util.REGION_CODE_1:
                        this.region_code = Util.REGION_CODE_1;
                        isRegion = true;
                        break;
                }
            }
            //地区 用英文别称
            if(!isRegion) {
                switch (v) {
                    case Util.REGION_CODE_INTL:
                        this.region_code = Util.REGION_CODE_0;
                        isRegion = true;
                        break;
                }
            }
            //通过判断域名
            var domain = 'abcdefghijk';
            for(var ki = 0;ki < this.domainList.length;ki++) {
                domain = this.domainList[ki];
                if (!isLang) {
                    if (v.indexOf(domain) != -1) {
                        this.language = Util.ZH_CN;
                    }
                }
                if (!isRegion) {
                    if (v.indexOf(domain) != -1) {
                        this.region_code = Util.REGION_CODE_1;
                        isRegion = true;
                    }
                }
            }
        }
        //如果地址栏中没有
        // if(this.language == '') {
        //     // 读取保存的数据
        //     let lng: any = localStorage.getItem(LocalStorageUtil.STORAGES_LANGUAGE_TYPE);
        //     ProjectConfig.log('选择的语言:' + lng);
        //     if (lng == '' || lng == null || lng == 'undefined') {
        //         // 读取浏览器的语言
        //         lng = Util.getExplorerbLang();
        //         console.log('浏览器的语言:' + lng);
        //     }
        //     if (lng == '' || lng == null || lng == 'undefined' || lng == 'null') {
        //         //设置默认语言
        //         lng = Util.EN;
        //     }
        //     this.language = lng;
        // }
        //调试模式地址获取
        if(window.location.host.indexOf('localhost') != -1) {
            this.region_code = parseInt(Util.getUrlParam('region_code'));
            if(isNaN(this.region_code)) {
                this.region_code = 0;
            }
            this.language = Util.getUrlParam('language');
            if(this.language == '') this.language = Util.ZH_CN;
        }
        //是否是ios地址
        let hostname = window.location.hostname;
        if(hostname.indexOf('ios.') != -1) {
            this.language = Util.EN;
            this.region_code = Util.REGION_CODE_1;
            this.infrom = 1;
        }
        //来源
        this.from = Util.getUrlParam('from');
        if(this.from == '') this.from = Util.FROM_GUANWANG;
        //保存来源
        LocalStorageUtil.addSrcChannel(this.from);
        //token
        this.account_token = Util.getUrlParam('account_token');
        if(this.account_token == '') {
            this.account_token = LocalStorageUtil.getUserToken().account_token;
        }
        //保存token
        const userInfo = new UserToken();
        userInfo.account_token = this.account_token;
        LocalStorageUtil.addUserToken(userInfo);
        //保存语言
        LocalStorageUtil.addLanguage(this.language);
        //保存地区
        LocalStorageUtil.addRegionCode(this.region_code);
        ProjectConfig.log("webModel");
        ProjectConfig.log(this);
    }
}
