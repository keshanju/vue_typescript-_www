export interface IParam {

    /**
     * 语言
     */
    language: string;
    /**
     * 地区
     */
    region_code: number;
    /**
     * token
     */
    account_token: string;
    /**
     * 资讯/活动等 id
     */
    id: number;
    /**
     * 平台 0window 1mac 2android 3ios
     */
    platform?: number;
}
