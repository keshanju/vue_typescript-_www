/**
 * 浏览器地址跳转
 */
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import Util from "@/ts/utils/Util";
import {IParam} from "@/ts/interface/IParam";
import ProjectConfig from "../../../project.config";
import {TdappModel} from "@/ts/models/TdappModel";

export default class JumpWebUtil {

    public static HTML_NAME_INDEX = 'index.html'; // 首页
    public static HTML_NAME_LOGIN = 'login.html'; // 登录
    public static HTML_NAME_REGISTER = 'register.html'; // 注册
    public static HTML_NAME_FORGETPWD = 'forgetpwd.html'; // 忘记密码
    public static HTML_NAME_PROTOCOL = 'protocol.html'; // 用户协议
    public static HTML_NAME_USER = 'user.html'; // 个人中心
    public static HTML_NAME_DOWNLOAD = 'https://xiazai.leigod.com'; // 下载站
    public static HTML_NAME_NEWS = 'news.html'; // 资讯
    public static HTML_NAME_NOTIFY = 'notify.html'; // 公告
    public static HTML_NAME_ACTIVITY = 'activity.html'; // 活动
    public static HTML_NAME_RECHARGE = 'recharge.html'; // 套餐
    public static HTML_NAME_ABOUT = 'about.html'; // 关于我们
    public static HTML_NAME_HELP = 'help.html'; // 帮助
    public static HTML_NAME_WANGBA = 'https://netbar.leigod.com/'; // 网吧
    public static HTML_NAME_USERSERVER = 'userserver.html'; // 会员服务条款

    public static HTML_NAME_DETAILS_NEWS = 'news_'; // 资讯详情页 + id
    public static HTML_NAME_DETAILS_NOTICE = 'notice_'; // 公告详情页 + id
    public static HTML_NAME_DETAILS_ACTIVITY = 'activity_'; // 活动详情页 + id
    public static HTML_NAME_DETAILS_HELPS = 'helps_'; // 相关问答详情页 + id
    public static HTML_NAME_DETAILS_ACTIVITY_NEW = 'activdetails.html'; // 新的活动详情?id=

    /**
     * 跳转到记录的页面
     */
    public static backTargetPage() {
        let targetUrl = localStorage.getItem(LocalStorageUtil.STORAGES_URL_TARGET);
        if (targetUrl != null && targetUrl != "") {
            window.location.href = targetUrl;
        } else {
            localStorage.removeItem(LocalStorageUtil.STORAGES_URL_TARGET);
            window.location.href = "index.html";
        }
    }

    /**
     * 返回到首页
     */
    public static backHome() {
        window.location.href = JumpWebUtil.HTML_NAME_INDEX;
    }

    /**
     * 返回到登录页
     * @param targetUrl 记录跳回的路径
     */
    public static backLogin(targetUrl: any = null) {
        if (targetUrl != null && targetUrl != "") {
            localStorage.setItem(LocalStorageUtil.STORAGES_URL_TARGET, targetUrl);
        }
        window.location.href = JumpWebUtil.HTML_NAME_LOGIN;
    }

    /**
     * 返回注册页
     */
    public static backRegister() {
        window.location.href = JumpWebUtil.HTML_NAME_REGISTER;
    }

    /**
     * 返回用户协议
     */
    public static backAgreement() {
        window.location.href = JumpWebUtil.HTML_NAME_PROTOCOL;
    }

    /**
     * 返回个人中心
     */
    public static backUser() {
        window.location.href = JumpWebUtil.HTML_NAME_USER;
    }

    /**
     * 返回到资讯
     */
    public static backNews() {
        window.location.href = JumpWebUtil.HTML_NAME_NEWS + window.location.search;
    }

    /**
     * 返回到公告
     */
    public static backNotice() {
        window.location.href = JumpWebUtil.HTML_NAME_NOTIFY + window.location.search;
    }

    /**
     * 返回到活动
     */
    public static backActivity() {
        window.location.href = JumpWebUtil.HTML_NAME_ACTIVITY + window.location.search;
    }

    /**
     * 返回到帮助
     */
    public static backHelp() {
        window.location.href = JumpWebUtil.HTML_NAME_HELP + window.location.search;
    }

    /**
     * 返回套餐
     */
    public static backRecharge() {
        window.location.href = JumpWebUtil.HTML_NAME_RECHARGE + window.location.search;
    }

    /**
     * 返回关于我们
     */
    public static backAbout() {
        window.location.href = JumpWebUtil.HTML_NAME_ABOUT;
    }

    /**
     * 跳转资讯详情
     */
    public static gotoNewsDetails(id: number) {
        if (id == 0 || id == null) return;
        // window.location.href = JumpWebUtil.HTML_NAME_DETAILS_NEWS + id + '.html';
        window.open(JumpWebUtil.HTML_NAME_DETAILS_NEWS + id + '.html');
    }

    /**
     * 跳转公告详情
     */
    public static gotoNoticeDetails(id: number) {
        if (id == 0 || id == null) return;
        // window.location.href = JumpWebUtil.HTML_NAME_DETAILS_NOTICE + id + '.html';
        window.open(JumpWebUtil.HTML_NAME_DETAILS_NOTICE + id + '.html');
    }

    /**
     * 跳转活动详情
     * TODO... 现在活动没有做成模板，按地址跳转
     */
    public static gotoActivityDetails(id: number) {
        if (id == 0 || id == null) return;
        // window.location.href = JumpWebUtil.HTML_NAME_DETAILS_ACTIVITY + id + '.html';
        // window.location.href = JumpWebUtil.HTML_NAME_DETAILS_ACTIVITY_NEW + '?id=' + id;
        window.open(JumpWebUtil.HTML_NAME_DETAILS_ACTIVITY_NEW + '?id=' + id);
    }

    /**
     * 跳转相关问答详情
     */
    public static gotoHelpDetails(id: number) {
        if (id == 0 || id == null) return;
        // window.location.href = JumpWebUtil.HTML_NAME_DETAILS_HELPS + id + '.html';
        window.open(JumpWebUtil.HTML_NAME_DETAILS_HELPS + id + '.html');
    }

    /**
     * 跳转到指定的
     * @page page
     * @param id 新增id支持
     */
    public static toPage(html: string, page = -1, id = -1) {
        if (html == null) return;
        if (html.indexOf('.html') == -1) {
            //为了保证以前的版本跳转，此处必须加上
            html = html + ".html";
        }
        var s_page = '';
        if (page != -1 && !isNaN(page)) {
            s_page = 'page=' + page;
            html += '?' + s_page;
        }
        var s_id = '';
        if (id != -1 && !isNaN(id)) {
            s_id = 'id=' + id;
            if (html.indexOf('?') == -1) {
                html += '?' + s_id;
            } else {
                html += '&' + s_id;
            }
        }
        window.location.href = html;
    }

    /**
     * 从官网跳转到个人中心
     * @param userHost 在global.config中配置
     * @param param ?后面带的参数(不要带?，多个参数用&连接)
     */
    public static webGotoUser(userHost: string, htmlName: string, param: string = '') {
        let url = userHost + '/' + htmlName;
        let search = window.location.search;
        const sysParam = 'region_code=' + LocalStorageUtil.getRegionCodes() + '&language=' + LocalStorageUtil.getLanguage();
        if (search == null || search == '') {
            // if(Util.getUrlParam('region_code') == '') {
            url = url + '?' + sysParam;
            // }
        } else {
            if (Util.getUrlParam('region_code') == '') {
                url = url + search + '&' + sysParam;
            } else {
                url = url + search;
            }
        }
        if (param != '') {
            url = url + '&' + param;
        }
        window.location.href = url;
    }

    /**
     * 从移动端官网跳转到个人中心
     * @param userHost 在global.config中配置
     * @param param ?后面带的参数(不要带?，多个参数用&连接)
     */
    public static mobileGotoUser(userHost: string, htmlName: string, param: string = '') {
        let url = userHost + '/' + htmlName;
        const sysParam = 'region_code=' + LocalStorageUtil.getRegionCodes() + '&language=' + LocalStorageUtil.getLanguage();
        url = url + '?' + sysParam + '&' + param;
        ;
        window.location.href = url;
    }

    /**
     * 移动内嵌端地址跳转
     * @param userHost 在global.config中配置
     * @param param ?后面带的参数(不要带?，多个参数用&连接)
     */
    public static wapJump(host: string, htmlName: string, param: string = '') {
        JumpWebUtil.webGotoUser(host, htmlName, param);
    }

    /**
     * 从个人中心跳转到官网
     * @param webHost 在global.config中配置
     * @htmlName html名称
     * @param param ?后面带的参数(不要带?，多个参数用&连接)
     * TODO... /0 /cn 默认目录不一样，需要修改
     */
    public static userGotoWeb(webHost: string, htmlName: string, param: string = '') {
        //
        const region_code = LocalStorageUtil.getRegionCodes();
        switch (region_code) {
            case Util.REGION_CODE_0:
                // webHost = webHost + '/0';
                break;
            case Util.REGION_CODE_1:
                break;
        }
        //
        const language = LocalStorageUtil.getLanguage();
        switch (language) {
            case Util.EN:
                // webHost = webHost + '/en';
                break;
            case Util.ZH_CN:
                break;
        }
        let url = webHost + '/' + htmlName;
        let search = window.location.search;
        search = '';
        if (search == null || search == '') {
            if (param != '') url = url + '?' + param;
        } else {
            url = url + search;
            if (param != '') url = url + '&' + param;
        }
        window.location.href = url;
    }

    /**
     * 切换到中文 默认页面是英文调用此方法
     * TODO... 这个方法需要优化
     */
    public static changeCn() {
        if (Util.ZH_CN == LocalStorageUtil.getLanguage()) return;
        const origin = window.location.origin;
        let pathname = window.location.pathname;
        let search = window.location.search;
        if (search == null) search = '';
        //
        if (window.location.host.indexOf('localhost') != -1) {
            return;
        }
        //
        let url = '';
        if (origin.indexOf('cn.') != -1 && pathname.indexOf('/en') != -1) {
            //如果是国内的网站,且找到en
            url = origin + pathname.replace('/en', '')
            LocalStorageUtil.setCookie(LocalStorageUtil.COOKIE_LANGUAGE_TYPE, Util.ZH_CN);
            window.location.href = url + search;
        } else if (origin.indexOf('www.') != -1 && pathname.indexOf('/cn') == -1) {
            //如果是www的国外网站,且没有找到/cn
            url = origin + '/cn' + pathname
            LocalStorageUtil.setCookie(LocalStorageUtil.COOKIE_LANGUAGE_TYPE, Util.ZH_CN);
            window.location.href = url + search;
        }
    }

    /**
     * 切换到英文 默认页面是英文调用此方法
     */
    public static changeEn() {
        if (Util.EN == LocalStorageUtil.getLanguage()) return;
        const origin = window.location.origin;
        let pathname = window.location.pathname;
        let search = window.location.search;
        if (search == null) search = '';
        if (window.location.host.indexOf('localhost') != -1) {
            return;
        }
        let url = ''
        if (origin.indexOf('cn.') != -1 && pathname.indexOf('/en') == -1) {
            //如果是国内的网站,且没有找到/en
            url = origin + '/en' + pathname
            LocalStorageUtil.setCookie(LocalStorageUtil.COOKIE_LANGUAGE_TYPE, Util.EN);
            window.location.href = url + search;
        } else if (origin.indexOf('www.') != -1 && pathname.indexOf('/cn') !== -1) {
            //如果是www的国外网站,且找到/cn
            url = origin + pathname.replace('/cn', '')
            LocalStorageUtil.setCookie(LocalStorageUtil.COOKIE_LANGUAGE_TYPE, Util.EN);
            window.location.href = url + search;
        }
    }

    /**
     * 切换到中文 默认页面是中文调用此方法
     */
    public static changeCn_0() {
        if (Util.ZH_CN == LocalStorageUtil.getLanguage()) return;
        const origin = window.location.origin;
        let pathname = window.location.pathname;
        let search = window.location.search;
        if (search == null) search = '';
        //
        let url = '';
        pathname = pathname.replace('/en', '');
        if (origin != undefined) url = url + origin;
        url = url + pathname;
        //设置cookie，防止语言跳转
        LocalStorageUtil.setCookie(LocalStorageUtil.COOKIE_LANGUAGE_TYPE, Util.CN);
        window.location.href = url + search;
    }

    /**
     * 切换到英文 默认页面是中文调用此方法
     */
    public static changeEn_0() {
        if (Util.EN == LocalStorageUtil.getLanguage()) return;
        const origin = window.location.origin;
        let pathname = window.location.pathname;
        let search = window.location.search;
        if (search == null) search = '';
        //
        if (window.location.host.indexOf('localhost') != -1) {
            return;
        }
        //
        let url = '';
        if (pathname.indexOf('/' + Util.REGION_CODE_INTL) == -1 && pathname.indexOf('/' + Util.REGION_CODE_0) == -1) {
            if (origin != undefined) url = url + origin;
            url = url + '/en' + pathname;
        } else {
            pathname = pathname.replace('/' + Util.REGION_CODE_0, '');
            pathname = pathname.replace('/' + Util.REGION_CODE_INTL, '');
            if (origin != undefined) url = url + origin;
            url = url + '/' + Util.REGION_CODE_0 + '/en' + pathname;
        }
        //设置cookie，防止语言跳转
        LocalStorageUtil.setCookie(LocalStorageUtil.COOKIE_LANGUAGE_TYPE, Util.EN);
        window.location.href = url + search;
    }

    /**
     * 清除地址栏中的 cn news notice 参数
     */
    public static deletePathname() {
        const origin = window.location.origin;
        let pathname = window.location.pathname;
        pathname = pathname.replace('/news', '');
        pathname = pathname.replace('/notice', '');
        let url = origin + pathname;

        return url;
    }

    /**
     * 跳转到对应的网页
     * @param baseUrl url前缀
     * @param param 参数
     * @htmlName 页面名称
     */
    public static getWebHeadUrl(baseUrl: string, param: IParam) {
        let url = baseUrl + '/';
        if (param.region_code == Util.REGION_CODE_1) {
            url = url + Util.REGION_CODE_1 + '/';
        }
        if (param.language == Util.ZH_CN) {
            url = url + Util.CN + '/';
        }

        return url;
    }

    /**
     * 获取详情页的id 格式:news_id.html
     */
    public static getParamId() {
        let pathname = window.location.pathname;
        pathname = pathname.replace('.html', '');
        const arr = pathname.split('_');
        let id = 0;
        id = parseInt(arr[1]);
        if (arr.length >= 2) {
        }
        if (isNaN(id)) id = 0;
        // console.log('解析详情页的id:' + id);
        return id;
    }

    /**
     * 判断是否移动版
     * @param jumpUrl 跳转地址 ==''不跳转
     */
    public static checkMobile(jumpUrl: string = '') {
        const sUserAgent = navigator.userAgent.toLowerCase();
        let is_mobile = false;
        if ((sUserAgent.match(/(ipod|iphone os|midp|ucweb|android|windows ce|windows mobile)/i))) {
            is_mobile = true;
            if (jumpUrl != '') window.location.href = jumpUrl;
        }

        return is_mobile;
    }

    /**
     * 是否低版本浏览器
     * @param jumpUrl
     */
    public static checkLowBrowser(jumpUrl: string = '') {
        let binfo = new TdappModel();
        if (!binfo.isLowVersion()) return;
        if (jumpUrl != '') {
            window.location.href = jumpUrl;
        }
    }

    /**
     * 自动跳转
     * @param m_url 跳转的移动站点
     * @param low_url 跳转的低版本兼容页面
     */
    public static autoJump(m_url: string, low_url: string = null) {
        const is_mobile = JumpWebUtil.checkMobile(m_url);
        if (is_mobile) return;
        let binfo = new TdappModel();
        if (!binfo.isLowVersion()) return;
        if (low_url != null) {
            window.location.href = low_url;
        } else {
            window.location.href = '/indexs.html';
        }
    }

    /**
     * 是否微信环境
     */
    public static isDeviceWx() {
        let u = navigator.userAgent;
        var ua = window.navigator.userAgent.toLowerCase();
        if ('' + ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }
        return false;
    }

    /**
     * 是否android设备
     */
    public static isDeviceAndroid() {
        let u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        return isAndroid;
    }

    /**
     * 是否ios设备
     */
    public static isDeviceIos() {
        let u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isiOS;
    }
}
