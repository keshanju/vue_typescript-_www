import {LanguageConfig} from "@/ts/utils/Language";

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
}