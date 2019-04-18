import HttpClient from "@/ts/net/HttpClient";

export interface IProxy {
    /**
     * 初始化
     */
    init(): void;

    /**
     * 此接口处理队列任务
     */
    execute(): void;

    /**
     * 设置网路哦请求的base_url
     * @param url
     */
    setBaseUrl(url: string): void;

    /**
     * 此接口处理网络错误的情况
     */
    netError?(): void;

    /**
     * 此接口处理token过期
     */
    tokenExpired?(param: string): void;

    http?: HttpClient; // http类

    imageHeadUrl?: string; //图片服务器url

    webUrl?: string; //官网url

    userUrl?: string; //个人中心url
}
