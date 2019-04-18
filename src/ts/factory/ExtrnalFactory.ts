
import {IExtrnal} from "@/ts/interface/IExtrnal";

/**
 * 内嵌页面调用接口工厂
 */
export class ExtrnalFactory {
    //
    public static instance:ExtrnalFactory;

    public macE: IExtrnal = new ExtrnalMacFactory();
    public winE: IExtrnal = new ExtrnalWindowsFactory();
    public androidE: IExtrnal = new ExtrnalAndroidFactory();
    public iosE: IExtrnal = new ExtrnalIosFactory();
    public winNewE: IExtrnal = new ExtrnalNewWindowsFactory();

    /**
     * 单例获取
     */
    public static getInstance():ExtrnalFactory {
        if(ExtrnalFactory.instance == null) {
            ExtrnalFactory.instance = new ExtrnalFactory();
        }

        return ExtrnalFactory.instance;
    }

    /**
     *
     * @param platform 参考: AppModel类说明 4 微信公众号
     */
    public getFactory(platform: number = 0):IExtrnal {
        let factory: IExtrnal;
        switch (platform) {
            case 0:
                factory = this.winE;
                break;
            case 1:
                factory = this.macE;
                break;
            case 2:
                factory = this.androidE;
                break;
            case 3:
                factory = this.iosE;
                break;
            case 5:
                factory = this.winNewE;
                break;
            default:
                factory = this.winE;
                break;
        }

        return factory;
    }
}

/**
 * windows
 */
export class ExtrnalWindowsFactory implements IExtrnal {

    public getbackground(type:number = 0): string {
        try {
            // @ts-ignore
            const img = 'data:image/png;base64,' + window.external.getbackground(type);
            return img;
        }catch (e) {
            return '';
        }
    }

    public authorizeLoginSuccess(userinfo: string): void {
        // @ts-ignore
        window.external.authorizeLoginSuccess(userinfo);
    }

    public foreignLoginJump(param: string): void {
        // @ts-ignore
        window.external.foreignLoginJump(param);
    }

    public editAvatarUrlSuccess(avatar_url: string): void {
        // @ts-ignore
        window.external.editAvatarUrlSuccess(avatar_url);
    }

    public editNicknameSuccess(nickname: string): void {
        // @ts-ignore
        window.external.editNicknameSuccess(nickname);
    }

    public gotoRecharge(): void {
        // @ts-ignore
        window.external.gotoRecharge();
    }

    public gotoServiceCenter(): void {
        // @ts-ignore
        window.external.gotoServiceCenter();
    }

    public gotoWebHome(): void {
        // @ts-ignore
        window.external.gotoWebHome();
    }

    public jumpUrl(url: string): void {
        // @ts-ignore
        window.external.jumpUrl(url);
    }

    public loginExpire(): void {
        try {
            // @ts-ignore
            window.external.loginExpire();
        }catch (e) {
        }
    }

    public rechargeSuccess(): void {
        // @ts-ignore
        window.external.rechargeSuccess();
    }

    public unSupport(): void {
        // @ts-ignore
        window.external.unSupport();
    }

    public gotoActivity(): void {
        // @ts-ignore
        window.external.gotoActivity();
    }

    public gotoActivityDetails(id: number): void {
        // @ts-ignore
        window.external.gotoActivityDetails(id);
    }

    public gotoNews(): void {
        // @ts-ignore
        window.external.gotoNews();
    }

    public gotoNewsDetails(id: number): void {
        // @ts-ignore
        window.external.gotoNewsDetails(id);
    }

    public gotoNotice(): void {
        // @ts-ignore
        window.external.gotoNotice();
    }

    public gotoNoticeDetails(id: number): void {
        // @ts-ignore
        window.external.gotoNoticeDetails(id);
    }

    public reLoginIn(type: number, username: string): void {
        // @ts-ignore
        window.external.reLoginIn(type,username);
    }

    public openLogin(index?: number): void {
        // @ts-ignore
        window.external.openLogin(index);
    }

    /**
     * 修改密码成功
     */
    public updatepassword(): void {
        // @ts-ignore
        window.external.updatepassword();
    }

    /**
     * 绑定账号
     * @param url
     */
    public bindAccount(type: number = 1,url: string = '') :void {
        // @ts-ignore
        window.external.bindAccount(type,url);
    }

    /**
     * 绑定账号
     * @param param json字符串，可不传
     */
    public bindAccountSuccess(param: string) :void {
        // @ts-ignore
        window.external.bindAccountSuccess(param);
    }

    /**
     * check版本号
     * @param param
     */
    public checkversion(param: string):number {
        let v = 0;
        try {
            // @ts-ignore
            v = window.external.checkversion(param);
        }catch (e) {
            v = 0;
        }
        return v;
    }

    /**
     * 客户端置顶
     */
    public MainBringToFront() :void {
        // @ts-ignore
        window.external.MainBringToFront();
    }

    /******** 壁纸相关 **********/
    /**
     * 获取本地已下载壁纸列表
     */
    public bizhigetLocalWall() {
        let arr = [];
        try {
            // @ts-ignore
            arr = json.parse(window.external.bizhigetLocalWall());
        }catch (e){
            arr = [];
        }

        return arr;
    }

    /**
     * 下载壁纸
     * @param url 下载链接
     * @param id  壁纸id
     */
    public bizhibeginDownload(url: string,id: number) :void {
        // @ts-ignore
        window.external.bizhibeginDownload(url,id);
    }

    /**
     * 更换壁纸
     */
    public bizhichangeWall(id: number) {
        // @ts-ignore
        window.external.bizhichangeWall(id);
    }

    /**
     * 删除壁纸
     */
    public bizhideleteWall(id: number) {
        // @ts-ignore
        window.external.bizhideleteWall(id);
    }

    /**
     * 获取壁纸音量
     */
    public getVolume(): number{
        let arr = 0;
        try {
            // @ts-ignore
            arr = window.external.getVolume();
        }catch (e){
            arr = 0;
        }

        return arr;
    };

    /**
     * 播放壁纸
     */
    public bizhionPlayWall(id?: number) {
        // @ts-ignore
        window.external.bizhionPlayWall(id);
    }

    /**
     * 暂停壁纸
     */
    public bizhionStopWall(id?: number) {
        // @ts-ignore
        window.external.bizhionStopWall(id);
    }

    /**
     * 设置音量
     */
    public bizhisetVolume(value: string) {
        // @ts-ignore
        window.external.bizhisetVolume(value);
    }

    /**
     * 取消下载
     */
    public AbortDownLoad(id: number){
        // @ts-ignore
        window.external.AbortDownLoad(id);
    }
}

/**
 * mac
 */
export class ExtrnalMacFactory implements IExtrnal {

    /**
     * mac不需要
     */
    public getbackground(type:number = 0): string {
        return "";
    }

    public authorizeLoginSuccess(userinfo: string): void {
        // @ts-ignore
        window.webkit.messageHandlers.authorizeLoginSuccess.postMessage(userinfo);
    }

    public foreignLoginJump(param: string): void {
        // @ts-ignore
        window.webkit.messageHandlers.foreignLoginJump.postMessage(param);
    }

    public editAvatarUrlSuccess(avatar_url: string): void {
        // @ts-ignore
        window.webkit.messageHandlers.editAvatarUrlSuccess.postMessage(avatar_url);
    }

    public editNicknameSuccess(nickname: string): void {
        // @ts-ignore
        window.webkit.messageHandlers.editNicknameSuccess.postMessage(nickname);
    }

    public gotoRecharge(): void {
        // @ts-ignore
        window.webkit.messageHandlers.gotoRecharge.postMessage('a');
    }

    public gotoServiceCenter(): void {
        // @ts-ignore
        window.webkit.messageHandlers.gotoServiceCenter.postMessage('a');
    }

    public gotoWebHome(): void {
        // @ts-ignore
        window.webkit.messageHandlers.gotoWebHome.postMessage('a');
    }

    public jumpUrl(url: string): void {
        // @ts-ignore
        window.webkit.messageHandlers.jumpUrl.postMessage(url);
    }

    public loginExpire(): void {
        try {
            // @ts-ignore
            window.webkit.messageHandlers.loginExpire.postMessage('a');
        }catch (e) {
        }
    }

    public rechargeSuccess(): void {
        // @ts-ignore
        window.webkit.messageHandlers.rechargeSuccess.postMessage('a');
    }

    public unSupport(): void {
        // @ts-ignore
        window.webkit.messageHandlers.unSupport.postMessage('a');
    }

    public gotoActivity(): void {
        // @ts-ignore
        window.webkit.messageHandlers.gotoActivity.postMessage('a');
    }

    public gotoActivityDetails(id: number): void {
        // @ts-ignore
        window.webkit.messageHandlers.gotoActivityDetails.postMessage(id);
    }

    public gotoNews(): void {
        // @ts-ignore
        window.webkit.messageHandlers.gotoNews.postMessage('a');
    }

    public gotoNewsDetails(id: number): void {
        // @ts-ignore
        window.webkit.messageHandlers.gotoNewsDetails.postMessage(id);
    }

    public gotoNotice(): void {
        // @ts-ignore
        window.webkit.messageHandlers.gotoNotice.postMessage('a');
    }

    public gotoNoticeDetails(id: number): void {
        // @ts-ignore
        window.webkit.messageHandlers.gotoNoticeDetails.postMessage(id);
    }

    public reLoginIn(type: number, username: string): void {
        // @ts-ignore
        window.webkit.messageHandlers.reLoginIn.postMessage(type,username);
    }

    public openLogin(): void {
        // @ts-ignore
        window.webkit.messageHandlers.openLogin.postMessage();
    }

    /**
     * 修改密码成功
     */
    public updatepassword(): void {
        // @ts-ignore
        window.webkit.messageHandlers.updatepassword.postMessage();
    }

    /**
     * 绑定账号
     * @param url
     */
    public bindAccount(type: number = 1, url: string = ''): void {
        // @ts-ignore
        window.webkit.messageHandlers.bindAccount.postMessage(type, url);
    }

    /**
     * 绑定账号
     * @param param json字符串，可不传
     */
    public bindAccountSuccess(param: string): void {
        // @ts-ignore
        window.webkit.messageHandlers.bindAccountSuccess.postMessage(param);
    }

    /**
     * check版本号
     * @param param
     */
    public checkversion(param: string): number {
        let v = 0;
        try {
            // @ts-ignore
            v = window.webkit.messageHandlers.checkversion.postMessage(param);
        } catch (e) {
            v = 2;
        }
        return v;
    }
}

/**
 * ios
 */
export class ExtrnalIosFactory implements IExtrnal {

    public getbackground(type:number = 0): string {
        return '';
    }

    public authorizeLoginSuccess(userinfo: string): void {
        // @ts-ignore
        authorizeLoginSuccess(userinfo);
    }

    public foreignLoginJump(param: string): void {
        // @ts-ignore
        foreignLoginJump(param);
    }

    public editAvatarUrlSuccess(avatar_url: string): void {
        // @ts-ignore
        editAvatarUrlSuccess(avatar_url);
    }

    public editNicknameSuccess(nickname: string): void {
        // @ts-ignore
        editNicknameSuccess(nickname);
    }

    public gotoRecharge(): void {
        // @ts-ignore
        gotoRecharge();
    }

    public gotoServiceCenter(): void {
        // @ts-ignore
        gotoServiceCenter();
    }

    public gotoWebHome(): void {
        // @ts-ignore
        gotoWebHome();
    }

    public jumpUrl(url: string): void {
        // @ts-ignore
        jumpUrl(url);
    }

    public loginExpire(): void {
        try {
            // @ts-ignore
            loginExpire();
        }catch (e) {
        }
    }

    public rechargeSuccess(): void {
        // @ts-ignore
        rechargeSuccess();
    }

    public unSupport(): void {
        // @ts-ignore
        unSupport();
    }

    public gotoActivity(): void {
        // @ts-ignore
        gotoActivity();
    }

    public gotoActivityDetails(id: number): void {
        // @ts-ignore
        gotoActivityDetails(id);
    }

    public gotoNews(): void {
        // @ts-ignore
        gotoNews();
    }

    public gotoNewsDetails(id: number): void {
        // @ts-ignore
        gotoNewsDetails(id);
    }

    public gotoNotice(): void {
        // @ts-ignore
        gotoNotice();
    }

    public gotoNoticeDetails(id: number): void {
        // @ts-ignore
        gotoNoticeDetails(id);
    }

    /**
     * 修改密码成功
     */
    public updatepassword(): void {
        // @ts-ignore
        updatepassword();
    }

    public reLoginIn(type: number, username: string): void {
        // @ts-ignore
        reLoginIn(type,username);
    }
}

/**
 * android
 */
export class ExtrnalAndroidFactory implements IExtrnal {

    public getbackground(type:number = 0): string {
        return '';
    }

    public authorizeLoginSuccess(userinfo: string): void {
        // @ts-ignore
        window.android.authorizeLoginSuccess(userinfo);
    }

    public foreignLoginJump(param: string): void {
        // @ts-ignore
        window.android.foreignLoginJump(param);
    }

    public editAvatarUrlSuccess(avatar_url: string): void {
        // @ts-ignore
        window.android.editAvatarUrlSuccess(avatar_url);
    }

    public editNicknameSuccess(nickname: string): void {
        // @ts-ignore
        window.android.editNicknameSuccess(nickname);
    }

    public gotoRecharge(): void {
        // @ts-ignore
        window.android.gotoRecharge();
    }

    public gotoServiceCenter(): void {
        // @ts-ignore
        window.android.gotoServiceCenter();
    }

    public gotoWebHome(): void {
        // @ts-ignore
        window.android.gotoWebHome();
    }

    public jumpUrl(url: string): void {
        // @ts-ignore
        window.android.jumpUrl(url);
    }

    public loginExpire(): void {
        try {
            // @ts-ignore
            window.android.loginExpire();
        }catch (e) {
        }
    }

    public rechargeSuccess(): void {
        // @ts-ignore
        window.android.rechargeSuccess();
    }

    public unSupport(): void {
        // @ts-ignore
        window.android.unSupport();
    }

    public gotoActivity(): void {
        // @ts-ignore
        window.android.gotoActivity();
    }

    public gotoActivityDetails(id: number): void {
        // @ts-ignore
        window.android.gotoActivityDetails(id);
    }

    public gotoNews(): void {
        // @ts-ignore
        window.android.gotoNews();
    }

    public gotoNewsDetails(id: number): void {
        // @ts-ignore
        window.android.gotoNewsDetails(id);
    }

    public gotoNotice(): void {
        // @ts-ignore
        window.android.gotoNotice();
    }

    public gotoNoticeDetails(id: number): void {
        // @ts-ignore
        window.android.gotoNoticeDetails(id);
    }

    public reLoginIn(type: number, username: string): void {
        // @ts-ignore
        window.android.reLoginIn(type,username);
    }

    /**
     * 修改密码成功
     */
    public updatepassword(): void {
        // @ts-ignore
        window.android.updatepassword();
    }
}

/**
 * 新版带内核windows
 */
export class ExtrnalNewWindowsFactory implements IExtrnal {

    public getbackground(type:number = 0): string {
        try {
            // @ts-ignore
            const img = 'data:image/png;base64,' + getbackground(type);
            return img;
        }catch (e) {
            return '';
        }
    }

    public authorizeLoginSuccess(userinfo: string): void {
        // @ts-ignore
        authorizeLoginSuccess(userinfo);
    }

    public foreignLoginJump(param: string): void {
        // @ts-ignore
        foreignLoginJump(param);
    }

    public editAvatarUrlSuccess(avatar_url: string): void {
        // @ts-ignore
        editAvatarUrlSuccess(avatar_url);
    }

    public editNicknameSuccess(nickname: string): void {
        // @ts-ignore
        editNicknameSuccess(nickname);
    }

    public gotoRecharge(): void {
        // @ts-ignore
        gotoRecharge();
    }

    public gotoServiceCenter(): void {
        // @ts-ignore
        gotoServiceCenter();
    }

    public gotoWebHome(): void {
        // @ts-ignore
        gotoWebHome();
    }

    public jumpUrl(url: string): void {
        // @ts-ignore
        jumpUrl(url);
    }

    public loginExpire(): void {
        try {
            // @ts-ignore
            loginExpire();
        }catch (e) {
        }
    }

    public rechargeSuccess(): void {
        // @ts-ignore
        rechargeSuccess();
    }

    public unSupport(): void {
        // @ts-ignore
        unSupport();
    }

    public gotoActivity(): void {
        // @ts-ignore
        gotoActivity();
    }

    public gotoActivityDetails(id: number): void {
        // @ts-ignore
        gotoActivityDetails(id);
    }

    public gotoNews(): void {
        // @ts-ignore
        gotoNews();
    }

    public gotoNewsDetails(id: number): void {
        // @ts-ignore
        gotoNewsDetails(id);
    }

    public gotoNotice(): void {
        // @ts-ignore
        gotoNotice();
    }

    public gotoNoticeDetails(id: number): void {
        // @ts-ignore
        gotoNoticeDetails(id);
    }

    public reLoginIn(type: number, username: string): void {
        // @ts-ignore
        reLoginIn(type,username);
    }

    public openLogin(index?: number): void {
        // @ts-ignore
        openLogin(index);
    }

    /**
     * 修改密码成功
     */
    public updatepassword(): void {
        // @ts-ignore
        updatepassword();
    }

    /**
     * 绑定账号
     * @param url
     */
    public bindAccount(type: number = 1,url: string = '') :void {
        // @ts-ignore
        bindAccount(type,url);
    }

    /**
     * 绑定账号
     * @param param json字符串，可不传
     */
    public bindAccountSuccess(param: string) :void {
        // @ts-ignore
        bindAccountSuccess(param);
    }

    /**
     * check版本号
     * @param param
     */
    public checkversion(param: string):number {
        let v = 0;
        try {
            // @ts-ignore
            v = checkversion(param);
        }catch (e) {
            v = 0;
        }
        return v;
    }

    /**
     * 客户端置顶
     */
    public MainBringToFront() :void {
        // @ts-ignore
        MainBringToFront();
    }

    /******** 壁纸相关 **********/
    /**
     * 获取本地已下载壁纸列表
     */
    public bizhigetLocalWall() {
        let arr = [];
        try {
            // @ts-ignore
            arr = JSON.parse(bizhigetLocalWall());
        }catch (e){
            arr = [];
        }

        return arr;
    }

    /**
     * 下载壁纸
     * @param url 下载链接
     * @param id  壁纸id
     */
    public bizhibeginDownload(url: string,id: number) :void {
        // @ts-ignore
        bizhibeginDownload(url,id);
    }

    /**
     * 更换壁纸
     */
    public bizhichangeWall(id: number) {
        // @ts-ignore
        bizhichangeWall(id);
    }

    /**
     * 删除壁纸
     */
    public bizhideleteWall(id: number) {
        // @ts-ignore
        bizhideleteWall(id);
    }

    /**
     * 获取壁纸音量
     */
    public getVolume(): number{
        let arr = 0;
        try {
            // @ts-ignore
            arr = getVolume();
        }catch (e){
            arr = 0;
        }

        return arr;
    };

    /**
     * 播放壁纸
     */
    public bizhionPlayWall(id?: number) {
        // @ts-ignore
        bizhionPlayWall(id);
    }

    /**
     * 暂停壁纸
     */
    public bizhionStopWall(id?: number) {
        // @ts-ignore
        bizhionStopWall(id);
    }

    /**
     * 设置音量
     */
    public bizhisetVolume(value: string) {
        // @ts-ignore
        bizhisetVolume(value);
    }

    /**
     * 取消下载
     */
    public AbortDownLoad(id: number){
        // @ts-ignore
        AbortDownLoad(id);
    }
}