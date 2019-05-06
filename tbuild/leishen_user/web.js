window.onload = function () {

    /**
     *
     */
    if(isLowVersion()) {
        var pathname = window.location.pathname;
        window.location.href = 'https://suser.leigod.com' + pathname;

    }

    function getBrowser(){
        var browser = '';
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var strStart;
        var strStop;
        var temp;
        var isOpera = userAgent.indexOf("Opera") > -1;
        //判断是否Opera浏览器
        if (isOpera) {
            browser = "Opera";
        }
        //判断是否Firefox浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            browser = "FF";
        }
        //判断是否Safari浏览器
        if (userAgent.indexOf("Safari") > -1) {
            browser = "Safari";
        }
        //判断是否chorme浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            browser = "Chrome";
        }
        //判断是否IE浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            browser = "IE";
            strStart = userAgent.indexOf('MSIE');
            strStop = userAgent.indexOf(' Windows');
            temp = userAgent.substring(strStart, strStop);
            browser_version = Math.abs(temp.split(' ')[1].split(';')[0]);
        }else if (userAgent.indexOf("Trident") > -1) {
            //判断是否Edge浏览器
            browser = "Edge";
        };

        return browser;
    }

    /**
     * 是否低版本
     */
    function isLowVersion() {
        var browser = getBrowser();
        if(browser == "IE" && browser_version < 10) {
            return true;
        }
        return false;
    }
}