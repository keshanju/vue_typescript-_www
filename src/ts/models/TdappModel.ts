

export class TdappModel {

    public from: string = '官网';//操作来源
    public browser: string = '';//操作浏览器
    public browser_version: number = 0;//浏览器版本
    public ip?: string;//操作用户IP
    public pay_type?: number;//支付方式 1微信  2支付宝  3QQ  5paypal
    public package_name?: string;//套餐名

    /**
     *
     */
    public constructor() {
        this.getBrowser();
    }
    
    public getBrowser(){
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let strStart;
        let strStop;
        let temp;
        let isOpera = userAgent.indexOf("Opera") > -1;
        //判断是否Opera浏览器
        if (isOpera) {
            this.browser = "Opera"
        };
        //判断是否Firefox浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            this.browser = "FF";
        }
        //判断是否Safari浏览器
        if (userAgent.indexOf("Safari") > -1) {
            this.browser = "Safari";
        }
        //判断是否chorme浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            this.browser = "Chrome";
        }
        //判断是否IE浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            this.browser = "IE";
            strStart = userAgent.indexOf('MSIE');
            strStop = userAgent.indexOf(' Windows');
            temp = userAgent.substring(strStart, strStop);
            this.browser_version = Math.abs(temp.split(' ')[1].split(';')[0]);
        }else if (userAgent.indexOf("Trident") > -1) {
            //判断是否Edge浏览器
            this.browser = "Edge";
        };
    }

    /**
     * 是否低版本
     */
    public isLowVersion() {
        if(this.browser == "IE" && this.browser_version < 10) {
            return true;
        }
        return false;
    }
}