export interface IExtrnal {

    /**
     * 获取背景
     */
    getbackground(type:number): string;

    /**
     * 返回首页
     */
    gotoWebHome(): void;

    /**
     * 联系客服
     */
    gotoServiceCenter(): void;

    /**
     * 提示本功能未开放
     */
    unSupport(): void;

    /**
     * 跳转充值页面
     */
    gotoRecharge(): void;

    /**
     * 充值成功
     */
    rechargeSuccess(): void;

    /**
     * 重新登录
     */
    reLoginIn(type: number, username: string): void;

    /**
     * 唤起登录窗
     */
    openLogin?(index?: number): void;

    /**
     * 修改头像成功
     */
    editAvatarUrlSuccess(avatar_url: string): void;

    /**
     * 修改昵称成功
     */
    editNicknameSuccess(nickname: string): void;

    /**
     * 修改密码成功
     */
    updatepassword(): void;
    /**
     * 登录过期
     */
    loginExpire(): void;

    /**
     * 第三方登录成功
     * userinfo:{code:''}
     */
    authorizeLoginSuccess(userinfo: string): void;

    /**
     * 第三方登录跳转
     */
    foreignLoginJump(param: string): void;

    /**
     * 跳转网址
     * @param url
     */
    jumpUrl(url: string): void;

    /**
     * 跳转到活动页面
     */
    gotoActivity(): void;

    /**
     * 跳转到活动详情页面
     */
    gotoActivityDetails(id:number): void;

    /**
     * 跳转到公告页面
     */
    gotoNotice(): void;

    /**
     * 跳转到公告详情页面
     */
    gotoNoticeDetails(id:number): void;

    /**
     * 跳转到资讯页面
     */
    gotoNews(): void;

    /**
     * 跳转到资讯详情页面
     */
    gotoNewsDetails(id:number): void;

    /**
     * 绑定账号
     * @param type 1qq 2微信 3微博
     * @param url
     */
    bindAccount?(type:number,url: string) :void;

    /**
     * 绑定账号
     * @param param json字符串，可不传
     */
    bindAccountSuccess?(param: string) :void;

    /**
     * 检查版本号
     * @param param
     */
    checkversion?(param: string):number;

    /**
     * 获取本地壁纸
     */
    bizhigetLocalWall?();

    /**
     * 下载壁纸
     * @param url 下载链接
     * @param id  壁纸id
     */
    bizhibeginDownload?(url: string,id: number):void;

    /**
     * 更换壁纸
     */
    bizhichangeWall?(id: number):void;

    /**
     * 删除壁纸
     */
    bizhideleteWall?(id: number):void;

    /**
     * 播放壁纸
     */
    bizhionPlayWall?():void;

    /**
     * 暂停壁纸
     */
    bizhionStopWall?():void;

    /**
     * 获取壁纸音量
     */
    getVolume?(): number;

    /**
     * 设置音量
     */
    bizhisetVolume?(value: string):void;

    /**
     * 取消下载
     */
    AbortDownLoad?(id: number):void;

    /**
     * 客户端置顶
     */
    MainBringToFront?(): void;
}