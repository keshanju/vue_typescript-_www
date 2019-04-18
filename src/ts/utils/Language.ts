import VueI18n from 'vue-i18n';
import Util from "@/ts/utils/Util";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";

export class LanguageConfig {

    private static instance: LanguageConfig | undefined;
    /**
     * 多国语言配置
     */
    public messages: VueI18n.LocaleMessages | undefined;
    public locale:string = '';
    public languageList: any | undefined;
    public isInit: boolean = false;

    /**
     * 单例模式
     */
    public static getInstance() {
        if(LanguageConfig.instance == null) LanguageConfig.instance = new LanguageConfig();
        return LanguageConfig.instance;
    }

    public init() {
        //用户选择的语言
        this.initConfig();
        const ln = LocalStorageUtil.getLanguage();
        this.changeLanguage(ln);
    }

    /**
     * 不用刷新页面的接口
     */
    public initNoRefresh() {
        this.initConfig();
        const ln = LocalStorageUtil.getLanguage();
        this.changeLanguage(ln,false);
    }

    /**
     * 初始化配置
     * TODO... 为了兼容bohe项目，此处默认加载bohe的语言配置文件，其它项目都必须继承此类，并重写此方法
     */
    public initConfig() {
        if(this.messages == null) this.messages = require('@/assets/i18n/bohe_i18n_config.json');
        if(this.languageList == null) this.languageList = require('@/assets/i18n/bohe_language_config.json');
    }

    /**
     * 切换中文
     */
    public setCn() {
        this.locale = Util.ZH_CN;
    }

    /**
     * 切换英文
     */
    public setEn() {
        this.locale = Util.EN;
    }

    /**
     * 根据不同地区获取语言的配置
     * @param areaCode 地区code
     */
    public getLanguageList(): LanguageInfo[] {
        const areaCode = LocalStorageUtil.getRegionCodes();
        const list: LanguageInfo[] = this.languageList[areaCode];

        return list;
    }

    /**
     *
     * @param ln 语言
     */
    public getLanguageInfo(ln: string, laglist: LanguageInfo[]): LanguageInfo {
        let info = null;
        for(let value of laglist) {
            if(value.code == ln) {
                info = value;
            }
        }
        if(info == null) info = new LanguageInfo();

        return info;
    }

    /**
     * 切换语言
     * @param ln 语言编码
     * @param isRefresh 是否刷新当前页
     * @param issave 是否保存语言到本地
     */
    public changeLanguage(ln: string,isRefresh: boolean = true,issave: boolean = true) {
        switch (ln) {
            case Util.ZH_CN:
                this.setCn();
                if(isRefresh) {
                    JumpWebUtil.changeCn();
                }
                break;
            case Util.EN:
                this.setEn();
                if(isRefresh) JumpWebUtil.changeEn();
                break;
            default:
                this.setEn();
                if(isRefresh) JumpWebUtil.changeEn();
                break;
        }
        // 保存语言
        if(issave) {
            LocalStorageUtil.addLanguage(ln);
        }
    }
}

/**
 * 语言配置
 */
export class LanguageInfo {
    public code: string = '';
    public name: string = '';
}