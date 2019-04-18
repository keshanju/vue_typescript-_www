
export default class UchatUtil {
    // var WEBCHAT_BASE_URL = "http://uchat.im-cc.com/webchat_new/static/";
    public WEBCHAT_BASE_URL = document.location.protocol +"//uchat.im-cc.com/webchat_new/static/";
    public WEBCHAT_PC_URL = '';
    public WEBCHAT_IE_URL = '';
    public WEBCHAT_MOBILE_URL = '';
    public WEBCHAT_WX_URL = '';

    public imnumber;
    public isstatic;
    public hastab;
    public openid;
    public params;
    public box;

    constructor() {
        this.WEBCHAT_PC_URL = this.WEBCHAT_BASE_URL + "google/index.html";
        this.WEBCHAT_IE_URL = this.WEBCHAT_BASE_URL + "ie8/index.html";
        this.WEBCHAT_MOBILE_URL = this.WEBCHAT_BASE_URL + "moblie/index.html";
        this.WEBCHAT_WX_URL = this.WEBCHAT_BASE_URL + "wx/index.html";
    }

    public pop(mod: UchatModels) {
        this.imnumber = mod.imnumber;
        this.isstatic = mod.isstatic;
        this.hastab = mod.hastab;
        this.openid = mod.openid;
        this.params = mod.params;
        this.box = mod.box;
    }

    public getReferrer () {
        var relUrl =''
        var referrer = ''
        try {
            referrer = window.top.document.referrer
        } catch (e) {
            referrer = ''
        }
        if (referrer === '') {
            relUrl = referrer
        }else{
            var arrUrl = referrer.split('//')
            var start = arrUrl[1].indexOf('/')
            relUrl = arrUrl[1].substring(0, start)
        }
        return relUrl
    }

    public show() {
        document.getElementById("adaptation").style.display = "block";
    }

    public ready(callback) {
        var sourceURL = this.getReferrer ()
        var win_w = 600;
        var win_h = 450;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var ua = window.navigator.userAgent.toLowerCase();
            // @ts-ignore
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                var url = this.WEBCHAT_WX_URL;
            } else {
                url = this.WEBCHAT_MOBILE_URL;
            }
            url += "?ht=" + this.imnumber;
            if (this.openid && this.openid !== '0') {
                url += "&openid=" + this.openid;
            }
            if (this.params) {
                url += "&params=" + this.params;
            }
            url += "&timestamp=" + new Date().getTime();
            url += "&sourceURL=" + sourceURL;
            window.location.href = url;
        } else {
            if (!this.box) {
                var mydiv = document.createElement('div');
                mydiv.style.display = "none";
                mydiv.style.width = "600px";
                mydiv.style.height = "450px";
                mydiv.style.overflow = "hidden";
                mydiv.style.margin = "1% auto";
                mydiv.id = "adaptation";
                var iframe = document.createElement('iframe');
                iframe.src = "";
                iframe.id = "mainiframe";
                iframe.width = "100%";
                iframe.height = "100%";
                iframe.frameBorder = '0';
                mydiv.appendChild(iframe);
                document.body.appendChild(mydiv)
            }
            var url = this.WEBCHAT_PC_URL;
            if ((navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") || (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") || navigator.userAgent.indexOf("Firefox") > 0) {
                url = this.WEBCHAT_IE_URL;
            }
            url += "?ht=" + this.imnumber;
            if (this.openid && this.openid !== '0') {
                url += "&openid=" + this.openid;
            }
            if (this.hastab) {
                if (!this.box) {
                    document.getElementById("adaptation").style.width = '900px';
                    document.getElementById("adaptation").style.height = '600px';
                }
                win_w = 900;
                win_h = 600;
                url += "&hastab=" + this.hastab;
            }
            if (this.params) {
                url += "&params=" + this.params;
            }
            url += "&timestamp=" + new Date().getTime();
            url += "&sourceURL=" + sourceURL;
            if (this.isstatic && this.isstatic == "true") {
                window.location.href = url;
            } else if (this.box) {
                var params_str = "height=" + win_h + ",width=" + win_w + ",toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,top=50,left=200";
                window.open(url, '_blank', params_str)
            } else {
                // @ts-ignore
                document.getElementById("mainiframe").src = url;
            }
        }
        if(callback != null) callback(this);
    }

    /**
     * 打开网页聊天
     */
    public openWeb(isOpen: boolean = false) {
        let sourceURL = this.getReferrer ()
        let url = this.WEBCHAT_PC_URL;
        url += "?ht=" + this.imnumber;
        url += "&openid=" + this.openid;
        url += "&timestamp=" + new Date().getTime();
        if (this.openid && this.openid !== '0') {
            url += "&openid=" + this.openid;
        }
        if (this.params) {
            url += "&params=" + this.params;
        }
        url += "&sourceURL=" + sourceURL;
        if(isOpen) {
            window.open(url);
        }
        return url;
    }
}

/**
 * @param imnumber
 * @param hastab true=存在右侧标签页,不存在则没有该参数
 * @param isstatic true=弹出框不可隐藏,false弹出框可隐藏
 * @param openid 访问者唯一标识(可选参数，默认为0或者为空)
 * @param params 自定义参数, JSON字符串格式UTF8编码经base64转码
 * @param box true为弹窗，false为不弹窗
 */
export class UchatModels {
    public imnumber = '0';
    public hastab = true;
    public isstatic = false;
    public openid = '0';
    public params = '';
    public box = true;
}