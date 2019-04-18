/**
 * localstorage类
 */
import Util from "@/ts/utils/Util";
import {UserInfo, UserToken} from "@/ts/models/UserModel";

export default class LocalStorageUtil {
    /**
     * localstorage
     */
    public static STORAGES_PHONE = 'phone';
    public static STORAGES_EMAIL = 'email';
    public static STORAGES_PW = 'password';
    public static STORAGES_USERNAME = 'username';
    public static STORAGES_PHONE_REGION = 'phonerRegion';
    public static STORAGES_PHONE_PW = 'phonePassword';
    public static STORAGES_EMAIL_PW = 'emailPassword';
    public static STORAGES_TOKEN = 'account_token';
    public static STORAGES_USER_INFO = 'user_info';
    public static STORAGES_URL_TARGET = 'url_target'; //记录登录后需要跳转的页面
    public static STORAGES_LANGUAGE_TYPE = 'language_type'; //语言
    public static STORAGES_REGION_CODE = 'region_code'; //地区
    public static SRC_CHANNEL = 'src_channel';
    public static STORAGES_OS_TYPE = 'storages_os_type';
    public static STORAGES_THIRDBIND_URL_TYPE = 'third_bind_url_type';//第三方绑定来源页面 0用户中心  1登录页
    public static STORAGES_TIME_TIP = 'time_tip_show';

    /**
     * cookie
     */
    public static COOKIE_LANGUAGE_TYPE = 'user_lang'; //语言

    /**
     * 存储语言
     */
    public static addLanguage(lng: string) {
        localStorage.setItem(LocalStorageUtil.STORAGES_LANGUAGE_TYPE, lng);
        LocalStorageUtil.setCookie(LocalStorageUtil.STORAGES_LANGUAGE_TYPE, lng, 24 * 7, true);
    }

    /**
     * 获取保存的lange
     */
    public static getLanguage() {
        let ln = localStorage.getItem(LocalStorageUtil.STORAGES_LANGUAGE_TYPE);
        if (ln == null || ln == undefined) {
            //读取cookie
            ln = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_LANGUAGE_TYPE);
        }
        if (ln == '') {
            ln = Util.ZH_CN;
        }

        return ln;
    }

    /**
     * 保存地区信息
     */
    public static addRegionCode(code) {
        localStorage.setItem(LocalStorageUtil.STORAGES_REGION_CODE, code + '');
        LocalStorageUtil.setCookie(LocalStorageUtil.STORAGES_REGION_CODE, code + '', 24 * 7, true);
    }

    /**
     * 获取地区信息
     */
    public static getRegionCodes() {
        let code: any = localStorage.getItem(LocalStorageUtil.STORAGES_REGION_CODE);
        if (code == '' || code == null) {
            //读取cookie
            code = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_REGION_CODE);
        }
        if (code == '' || code == null) {
            code = Util.REGION_CODE_0;
        }
        return parseInt(code);
    }

    /**
     * 保存用户信息
     * @param userInfo
     */
    public static addUserInfo(userInfo: UserInfo) {
        localStorage.setItem(LocalStorageUtil.STORAGES_USER_INFO, JSON.stringify(userInfo));
        LocalStorageUtil.setCookie(LocalStorageUtil.STORAGES_USER_INFO, JSON.stringify(userInfo), -1, true);
    }

    /**
     * 获取保存的userInfo
     */
    public static getUserInfo(): UserInfo {
        let info: any = localStorage.getItem(LocalStorageUtil.STORAGES_USER_INFO);
        if (info == null || info == undefined) {
            //从cookie里获取
            info = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_USER_INFO);
        }
        if (info == '') return null;
        let userInfo: UserInfo = JSON.parse(info) as UserInfo;
        UserInfo.getUserName(userInfo);
        return userInfo;
    }

    /**
     * 保存用户token
     */
    public static addUserToken(token: UserToken) {
        if (token.account_token == '') return;
        if (token.account_token == null || token.account_token == undefined) throw new Error('保存的token错误!');
        const origin = window.location.hostname;
        if(origin.indexOf('www') == -1) {
            //www站不需要存localStorage
            localStorage.setItem(LocalStorageUtil.STORAGES_TOKEN, JSON.stringify(token));
        }
        LocalStorageUtil.setCookie(LocalStorageUtil.STORAGES_TOKEN, JSON.stringify(token), 2, true);
    }

    /**
     * 获取用户的token
     */
    public static getUserToken(): UserToken {
        // let token: any = localStorage.getItem(LocalStorageUtil.STORAGES_TOKEN);
        // if (token == null || token == undefined) {
            //从cookie里获取
           let token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
        // }
        if (token == '') return new UserToken();
        let userToken: UserToken = JSON.parse(token) as UserToken;

        return userToken;
    }

    /**
     * 保存来源
     */
    public static addSrcChannel(src_channel: string) {
        if (src_channel == '') throw new Error('保存的src_channel错误!');
        const temp = LocalStorageUtil.getSrcChannel();
        if(temp == '') {
            LocalStorageUtil.setCookie(LocalStorageUtil.SRC_CHANNEL, src_channel, -1, true);
        }
    }

    /**
     * 获取来源
     */
    public static getSrcChannel(): string {
        const src_channel = LocalStorageUtil.getCookie(LocalStorageUtil.SRC_CHANNEL);

        return src_channel;
    }

    /**
     * 保存浏览器参数
     */
    public static saveParam() {
        const toHtml = Util.getUrlParam('to');
        const page = parseInt(Util.getUrlParam('page'));
        const tid = parseInt(Util.getUrlParam('id'));
        if(toHtml != '') localStorage.setItem('param_to',toHtml);
        if(!isNaN(page)) localStorage.setItem('param_page',page + '');
        if(!isNaN(tid)) localStorage.setItem('param_id',tid + '');
    }

    /**
     * 返回保存的参数
     * @param isRemove 是否删除
     * @return [toHtml,page,tid]
     */
    public static getParam(isRemove: boolean = false) {
        let toHtml: string = localStorage.getItem('param_to');
        if(toHtml == null) toHtml = '';
        const page = parseInt(localStorage.getItem('param_page'));
        const tid = parseInt(localStorage.getItem('param_id'));
        if(isRemove) {
            localStorage.removeItem('param_to');
            localStorage.removeItem('param_page');
            localStorage.removeItem('param_id');
        }

        return [toHtml,page,tid];
    }

    /**
     * 退出登录
     */
    public static loginOut() {
        localStorage.removeItem(LocalStorageUtil.STORAGES_USER_INFO);
        localStorage.removeItem(LocalStorageUtil.STORAGES_TOKEN);
        LocalStorageUtil.removeCookie(LocalStorageUtil.STORAGES_USER_INFO,true);
        LocalStorageUtil.removeCookie(LocalStorageUtil.STORAGES_TOKEN,true);
    }

    /**
     * 设置cookie
     * @param key
     * @param cvalue
     * @param value 单位小时
     * @param isDomain 是否设置domain，解决跨域访问
     */
    public static setCookie(key: string, value: string, exdays = -1, isDomain: boolean = false) {
        let cstr = key + "=" + value;
        // 时间
        if (exdays > 0) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
            const expires = "; expires=" + d.toUTCString();
            cstr = cstr + expires;
        }
        // 域名
        if (isDomain) {
            const domain = Util.getDomain();
            // ProjectConfig.log('cookie设置的域名:' + domain);
            cstr = cstr + '; domain=' + domain;
        }
        //path
        cstr = cstr + '; path=/';
        document.cookie = cstr;
    }

    /**
     * 读取cookie
     * @param key
     * @param isDomain 是否读取跨域cookie
     */
    public static getCookie(key: string, isDomain: boolean = false) {
        var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        }
        return '';
    }

    /**
     * 删除cookie
     * @param name
     */
    public static removeCookie(key: string,isDomain: boolean = false) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = LocalStorageUtil.getCookie(key);
        if (cval != null && cval != '') {
            let cstr = key + "=" + cval + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            // 域名
            if (isDomain) {
                const domain = Util.getDomain();
                cstr = cstr + '; domain=' + domain;
            }
            cstr = cstr + '; path=/';
            document.cookie = cstr;
        }
    }
}
