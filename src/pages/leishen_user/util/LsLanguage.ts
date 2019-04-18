import {LanguageConfig} from "@/ts/utils/Language";
import Util from "@/ts/utils/Util";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";

export class LsLanguage extends LanguageConfig{

    private static ninstance: LsLanguage | undefined;

    /**
     * 单例模式
     */
    public static getInstance() {
        if(LsLanguage.ninstance == null) LsLanguage.ninstance = new LsLanguage();
        return LsLanguage.ninstance;
    }

    /**
     * 初始化配置
     */
    public initConfig() {
        if(this.messages == null) this.messages = require('@/assets/i18n/ls_i18n_config.json');
        if(this.languageList == null) this.languageList = require('@/assets/i18n/ls_language_config.json');
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
                break;
            case Util.EN:
                this.setEn();
                break;
            default:
                this.setCn();
                break;
        }
        // 保存语言
        if(issave) {
            LocalStorageUtil.addLanguage(ln);
        }
    }
}