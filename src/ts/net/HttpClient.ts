import {IHttp} from "@/ts/interface/IHttp";
import axios from "axios";
import {DataModel, IdataModel} from "@/ts/models/IdataModel";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

export default class HttpClient implements IHttp {
    // 成功请求
    public static HTTP_SUCCESS_NET_CODE = 0; // 成功的请求
    // 错误code
    public static HTTP_ERROR_NEW_CODE = -50000; // 网络错误
    public static HTTP_TOKEN_EXPIRE = 400006; // token过期
    public static HTTP_ERROR_NOT_PAY = 400877; // 非付费用户下载壁纸
    public static HTTP_ERROR_WX_NOBIND = 400617; // 微信用户未绑定

    // auth
    public static URL_AUTH_LOGIN = "/api/auth/login";
    public static URL_LOGIN_BIND = "/wap/login/bind"; //微信公众号登录
    public static URL_AUTH_REGISTER = "/api/auth/register";
    public static URL_AUTH_REGISTER_PACKAGE = "/api/auth/register/package";
    public static URL_AUTH_RETRIEVE = "/api/auth/retrieve";
    public static URL_AUTH_LOGOUT = "/api/auth/logout";
    public static URL_AUTH_BIND_PLAT = "/api/auth/open/bind";
    public static URL_AUTH_FOREIGN_LOGIN = "/api/auth/open/foreign";
    // tools
    public static URL_CODE_CAPTCHA = "/tools/captcha";
    public static URL_CODE_IS_CAPTCHA = "/tools/is_captcha";
    public static URL_CODE_SMSCODE = "/tools/smscode";
    public static URL_CODE_VOICE = "/tools/smscode/voice";
    public static URL_CODE_MAIL = "/tools/mailcode";
    public static URL_GONGGAO_LIST = "/tools/news";
    public static URL_AUTH_COUNTRY = "/tools/auth_country";
    public static URL_TOOL_COUNTRY_CODES = "/tools/country_codes";//获取国家地区代码
    public static URL_IS_CAPTCHA_LIST = "/tools/is_captcha/list";
    public static URL_TOOL_SYSTEM_TIME = "/tools/system_time"; //获取系统时间



    // user
    public static URL_USER_INFO = "/api/user/info";
    public static URL_USER_PACKAGE = "/api/user/package";
    public static URL_USER_DISCOUNT = "/api/user/discount";
    public static URL_USER_PACKAGE_BUY = "/api/user/package/buy";
    public static URL_USER_INVOICE_STATE = "/api/user/invoice/state";
    public static URL_USER_INVOICE = "/api/user/invoice";
    public static URL_USER_PRIZE_LIST = "/api/user/prize_list"; //用户活动 - 奖品列表
    public static URL_USER_RECEIVE = "/api/user/receive"; //用户活动 - 奖品领奖
    public static URL_USER_INVOICE_BUY = "/api/user/invoice/buy";
    public static URL_USER_PACKAGE_SWITCH = "/api/user/package/switch";
    public static URL_USER_PACKAGE_SWITCH_CONFIRM =
        "/api/user/package/switch/confirm";
    public static URL_USER_CDKey='/api/user/card/cdkey';
    public static URL_USER_UPLOAD = "/api/user/upload";
    public static URL_USER_EDIT = "/api/user/edit";
    public static URL_USER_PASSWORD = "/api/user/password";
    public static URL_USER_PASSWORD_CODE = "/api/user/password_code";
    public static URL_USER_CHECK_PSW_ISEXIST = "/api/auth/account";
    public static URL_USER_VERIFY_CODE = "/api/user/verify_code";
    public static URL_USER_MANAGE = "/api/user/manage";
    public static URL_USER_CARDFEE = "/api/user/card/duration"; //充值卡充值
    public static URL_USER_REFER_ACTIVITY = "/api/user/refer/activity"; //获取用户可生成推荐码
    public static URL_USER_REFER = "/api/user/refer"; //用户成推荐码
    public static URL_USER_PAUSE = "/api/user/pause"; //计时用户暂停
    public static URL_USER_RECOVER = "/api/user/recover"; //计时用户恢复
    public static URL_USER_PAUSELOG = "/api/user/pause/lists"; //计时用户暂停恢复日志
    public static URL_AUTH_OPEN_LOGIN = "/api/auth/open/success"; //第三方登录接口
    public static URL_AUTH_OPEN_LIST = "/api/user/open/list"; //用户第三方登录已绑定列表
    public static URL_USER_BIND_EMAIL = "/api/user/bind/email"; //绑定邮箱
    public static URL_USER_BIND_PHONE = "/api/user/bind/phone"; //绑定手机号
    public static URL_USER_VERIFY_CODE_VALIDATE =
        "/api/user/verify_code/validate"; //验证用户验证码
    public static URL_USER_CLEAR_EMAIL = "/api/user/clear/email"; //解绑邮箱
    public static URL_USER_CLEAR_PHONE = "/api/user/clear/phone"; //解绑手机号
    public static URL_USER_MODIFY_EMAIL = "/api/user/modify/email"; //修改邮箱账号
    public static URL_USER_MODIFY_PHONE = "/api/user/modify/phone"; //修改手机账号
    //news
    public static URL_NEWS = "/api/news";
    public static URL_NEWS_DETAIL = "/api/news/";
    // activity list
    public static URL_ACTIVITY_LIST = "/api/activity"; //获取活动列表
    public static URL_ACTIVITY_DETAIL = "/api/activity/"; //获取活动详情+id
    public static URL_ACTIVITY_PRESENT_LIST = "/api/activity/present"; //获取活动已中奖列表
    public static URL_ACTIVITY_PICTURE_LIST = "/api/activity/picture/list"; // 获取活动图片列表
    public static URL_ACTIVITY_REFER_LIST = "/api/user/refer/lists"; // 获取用户已推荐列表
    // 活动
    public static URL_ACTIVITY_DRAW = "/api/activity/draw"; // 用户活动抽奖
    public static URL_PRESENT_INFO = "/api/present"; // 根据活动id获取活动奖品列表
    //支持游戏
    public static URL_GAME = "/api/game";//获取游戏列表

    // 微信相关
    public static URL_WAP_WX_SIGN = "/wap/sign"; //微信sign
    public static URL_REMOVEBIND = "/api/user/open/untied"; //用户第三方登录解绑

    //获取地区regin_code
    public static URL_GET_REGINCode = "geoip2/index.php";

    //壁纸相关
    public static URL_WALL_CATE = "/api/wall/cate"; //壁纸分类列表
    public static URL_WALL = "/api/wall"; //壁纸分类列表
    public static URL_WALL_DOWNLOAD = "/api/wall/download"; //用户壁纸下载链接
    public static URL_WALL_DOWNLOAD_LOG = "/api/wall/download/log"; //用户壁纸下载记录
    public static URL_WALL_LOG_SWITCH = "/api/user/wall/switch";//设置壁纸漫游状态

    //
    protected BASE_URL = "";

    //

    public setBaseUrl(url: string): void {
        this.BASE_URL = url;
    }

    /**
     * get请求
     * @param url
     * @param params
     */
    public async get<T>(url: string, params: any) {
        url = this.BASE_URL + url;
        params["lang"] = LocalStorageUtil.getLanguage();
        params = {params};
        try {
            let backData = await axios.get(url, params);
            let backData1 = backData.data as IdataModel<T>;

            return backData1;
        } catch (e) {
            const errorData = new DataModel();
            errorData.code = HttpClient.HTTP_ERROR_NEW_CODE;
            errorData.msg = "网络错误!";

            return errorData;
        }
    }

    /**
     * post请求
     * @param url
     * @param params
     */
    public async post<T>(url: string, params: any) {
        url = this.BASE_URL + url;
        params["lang"] = LocalStorageUtil.getLanguage();
        try {
            let backData = await axios.post(url, params);
            let backData1 = backData.data as IdataModel<T>;
            return backData1;
        } catch (e) {
            const errorData = new DataModel();
            errorData.code = HttpClient.HTTP_ERROR_NEW_CODE;
            errorData.msg = "网络错误!";

            return errorData;
        }
    }
}
