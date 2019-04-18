export interface IHttp {
    /**
     * 设置请求的根路径
     */
    setBaseUrl(url: string): void;

    get(url: string, params: object): object;

    post(url: string, params: object): object;
}

