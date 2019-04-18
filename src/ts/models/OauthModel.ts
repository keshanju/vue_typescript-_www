/**
 * 请求参数
 */
export class ForeignLoginRequestModel {
    /**
     * openId
     */
    public open_id: string = '';

    /**
     * PC客户端传pc，网页不传
     */
    public state: string = '';

    /**
     * 8谷歌第三方登录
     * 9tiwtter第三方登录
     * 10:facebook第三方登录
     */
    public open_type: number = 0;

    public static OPEN_TYPE_GOOGLE = 8;
    public static OPEN_TYPE_TWITTER = 9;
    public static OPEN_TYPE_FACEBOOK = 10;
}

/**
 * 返回参数
 */
export class ForeignLoginModel {

}