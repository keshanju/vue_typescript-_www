import {Vue} from "vue-property-decorator";
import {UserInfo} from "@/ts/models/UserModel";
import {LanguageConfig, LanguageInfo} from "@/ts/utils/Language";
import HttpClient from "@/ts/net/HttpClient";
import {IdataModel} from "@/ts/models/IdataModel";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {IProxy} from "@/ts/interface/IProxy";
import Component from "vue-class-component";

@Component
export default class HeadProxy extends Vue implements IProxy {

    public isLogin: boolean = false; //是否登录
    public userInfo: UserInfo = new UserInfo();
    public pageName: string = ''; // 当前的页面
    public seleteLng: LanguageInfo = new LanguageInfo(); //选择的语言
    public seleteCode: string = '';
    public selectPage: string = '更多';
    public languageList: LanguageInfo[] = [];
    private _lanConfig: LanguageConfig = null;
    public styleType: number = 0; //0默认透明 1白色

    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    public init(): void {
        this.onSetLanguage();
        this.checkLogin();
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    public execute(): void {
    }

    /**
     * 设置语言类，每个项目都有一个语言类，切勿搞错
     * @param value
     */
    public set lanConfig(value: LanguageConfig) {
        this._lanConfig = value;
        this.languageList = this.lanConfig.getLanguageList();
    }

    public get lanConfig() {
        return this._lanConfig;
    }

    /**
     * 退出登录
     */
    public async onLoginOut() {
        const tokenInfo = LocalStorageUtil.getUserToken();
        const url = HttpClient.URL_AUTH_LOGOUT;
        const param = {
            account_token: tokenInfo.account_token,
        };

        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE
            || this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            LocalStorageUtil.loginOut();
            JumpWebUtil.backHome();
            this.onLoginOutSuccess();
        } else {
            //退出登录失败
            this.onLoginOutError();
        }
    }

    /**
     * 退出登录成功
     * TODO...可以重写此方法
     */
    public onLoginOutSuccess() {
    }

    /**
     * 退出登录错误
     * TODO...可以重写此方法
     */
    public onLoginOutError() {
    }

    /**
     * 检测是否登录
     */
    public checkLogin() {
        const info = LocalStorageUtil.getUserInfo();
        if (info != null) {
            this.userInfo = info;
            this.isLogin = true;
        }
    }

    /**
     * 通过地址栏获取当前页面
     */
    public getPageIndex() {
        const href = window.location.href;
        const arr = href.split("/");
        this.pageName = arr[arr.length - 1].split('?')[0];
        if (this.pageName == '') {
            this.pageName = 'index.html'
        }
        this.setStyleType();
    }

    /**
     *
     */
    public setStyleType() {
        switch (this.pageName) {
            case 'index.html':
            case 'about.html':
            case 'user.html':
            case 'protocol.html':
                this.styleType = 0;
                break;
            default:
                this.styleType = 1;
                break;
        }
    }

    /**
     * 切换页面状态
     */
    public changeIndex(pageIndex: number) {
    }

    /**
     * 切换语言
     */
    onSetLanguage(ln: string = '') {
        if (ln == '' || ln == null) {
            ln = LocalStorageUtil.getLanguage();
        }
        this.seleteLng = this.lanConfig.getLanguageInfo(ln, this.languageList);
        this.seleteCode = this.seleteLng.code;
    }
}
