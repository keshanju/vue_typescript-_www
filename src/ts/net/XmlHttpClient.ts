import {IHttp} from "@/ts/interface/IHttp";
import axios from "axios";
import XmlToJsonUtil from "@/ts/utils/XmlToJsonUtil";

export default class XmlHttpClient implements IHttp {
    public static HTTP_ERROR_NEW_CODE = -50000; // 网络错误
    public static HTTP_SUCCESS_NET_CODE = 0; // 成功
    public static HTTP_TOKEN_EXPIRE = 400006; // 过期

    //登陆注册
    public static URL_WBOP_DO_LOGIN = "do_login"; //登录
    public static URL_WBOP_DO_REG = "do_reg"; //注册
    public static GETCHECK_CODE = "get_checkcode"; //获取图片验证码
    public static DOSENDREGSMS = "dosendregsms"; //注册账号的时候发送短信验证码
    public static DOCHANGEPASAWORD = "dochangepasswordsms"; //找回密码
    public static DOSENDPWDSMS = "dosendpwdsms"; //找回密码发送短信验证码
    public static DO_LOGINOUT = "do_logout"; //退出

    //user
    public static URL_WBOP_GETUSERINFO = "get_userinfo"; //获取用户信息
    public static URL_WBOP_GETONLINE_LIST = "get_online_list"; //获取当前在线列表
    public static URL_DO_OFFLINE = "do_offline"; //踢下线

    public static DO_SERVEFACE = "do_saveuserface"; //上传头像
    public static DO_MODI = "do_modi"; //修改用户资料
    public static DO_SAVE_BUSINESSLICENCE = "do_save_businesslicense"; //上传营业执照

    //壁纸
    public static GET_WALLPAPER_LIST = "get_wallpaper_list"; //2.2.1获取壁纸列表
    public static GET_WALLPAPER = "get_wallpaper"; //2.2.1获取壁纸下载链接

    protected BASE_URL = "";
    protected xmlParse = new XmlToJsonUtil();

    public setBaseUrl(url: string): void {
        this.BASE_URL = url;
    }

    /**
     * get请求
     * @param url
     * @param params
     */
    public async get<T>(url: string, params: any) {
        url = this.BASE_URL + "api.aspx?op=" + url;
        params = {params};
        try {
            // url = 'http://sandboxie-user.leigod.com/api.aspx?op=do_login&mini_username=shamo1&mini_password=shamo1';
            // url = 'http://sandboxie-user.leigod.com/api.aspx?op=get_online_list&token=MjE5LjE0MC4xNTIuMjM4fDExNTE0MzA4NHwyMDE4LzEyLzMgMTY6MDA6MDB8ZGRmNTA1OTM1NzJiMjQxMGJjZGRlOGQyY2RmOWI2Mjg=';
            const backData = await axios.get(url, params);
            let xml = backData.data;
            xml = this.xmlParse.parseXML(xml);
            let backData1 = xml.xml.items;
            backData1.dcode = backData1.code;
            backData1.code = backData1.result;
            backData1.msg = backData1.message;
            delete backData1.message;
            delete backData1.result;

            return backData1 as T;
        } catch (e) {
            const errorData: any = {
                code: XmlHttpClient.HTTP_ERROR_NEW_CODE,
                msg: "网络错误"
            };

            return errorData as T;
        }
    }

    /**
     * post请求
     * @param url
     * @param params
     */
    public async post<T>(url: string, params: any) {
        console.log(url, params);
        url = this.BASE_URL + "api.aspx?op=" + url;
        // params["lang"] = LocalStorageUtil.getLanguage();
        try {
            let t = typeof params;
            let post_args = "";
            if (t.toLowerCase() == "object") {
                let p = [];
                for (const key in params) {
                    p.push(key + "=" + params[key]);
                }
                post_args = p.join("&");
            } else {
                post_args = params;
            }
            const backData = await axios.post(url, post_args);
            let xml = backData.data;
            xml = this.xmlParse.parseXML(xml);
            let backData1 = xml.xml.items;
            backData1.dcode = backData1.code;
            backData1.code = backData1.result;
            backData1.msg = backData1.message;
            delete backData1.message;
            delete backData1.result;

            return backData1 as T;
        } catch (e) {
            const errorData: any = {
                code: XmlHttpClient.HTTP_ERROR_NEW_CODE,
                msg: "网络错误"
            };

            return errorData as T;
        }
    }
}
