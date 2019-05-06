import '@/assets/less/bohe_pc.less';
import "leigod-lib-flexible";
import OauthProxy from '@/ts/proxy/OauthProxy';
import { Component } from "vue-property-decorator";
import GlobalConfig from './global.config';
import { ForeignLoginRequestModel } from '@/ts/models/OauthModel';
import ProjectConfig from '../../../project.config';
import AppParamModel from '@/ts/models/AppModel';
import Util from "@/ts/utils/Util";
import {ExtrnalFactory} from "@/ts/factory/ExtrnalFactory";
import "babel-polyfill";

@Component
export default class Threelogin extends OauthProxy {

    public appParam: AppParamModel = AppParamModel.getInstace();
    public languageType: string = '';
    /**
     * facebook的appId
     */
    public facebook_appId: string = '182452479351836';
    /**
     * twiter
     */
    public twitter_appId: string = '15926672';
    public twitter_secret: string = 'MVA4G99tUJ1FRpierp3I5KLmknBTxQqMMXv5FhV7hLOKf';
    /**
     * google
     */
    public google_appId: string = '356035932087-e3rp0iottdavj4b09sgjo9kmc3887ov8.apps.googleusercontent.com';

    /**
     *
     */
    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        //
        const open_type = parseInt(Util.getUrlParam('open_type'));
        switch (open_type) {
            case ForeignLoginRequestModel.OPEN_TYPE_GOOGLE:
                this.initGoogleSdk(this.google_appId);
                break;
            case ForeignLoginRequestModel.OPEN_TYPE_TWITTER:
                this.initTwitterSdk(this.twitter_appId, this.twitter_secret);
                break;
            case ForeignLoginRequestModel.OPEN_TYPE_FACEBOOK:
                this.initFaceBookSdk(this.facebook_appId);
                break;
            default:
                break;
        }
        this.languageType = Util.getLanguageType(this.appParam.language)
    }

    /**
     * 初始化成功
     */
    public sdkInitSuccess(type: number) {
        switch (type) {
            case ForeignLoginRequestModel.OPEN_TYPE_GOOGLE:
                this.onClickOpenGoogle();
                break;
            case ForeignLoginRequestModel.OPEN_TYPE_TWITTER:
                break;
            case ForeignLoginRequestModel.OPEN_TYPE_FACEBOOK:
                this.onOpenFacebook();
                break;
            default:
                break;
        }
    }

    /**
     * 打开facebook登录
     */
    public onClickOpenFacebook() {
        if (!this.facebookIsInit) return;
        this.onOpenFacebook();
    }

    /**
     * 打开google登录
     */
    public onClickOpenGoogle() {
        if (!this.googleIsInit) return;
        document.getElementById('googleBtn').click();
    }

    /**
     * 第三方登录成功
     */
    public loginSuccess(userId: string,type: number) {
        if(userId == '' || userId == null) return;
        ProjectConfig.log('授权userId:' + userId);
        let param: ForeignLoginRequestModel = new ForeignLoginRequestModel();
        param.open_id = userId;
        param.open_type = type;
        param.state = this.appParam.region_code + '_1_'+this.languageType;
        //
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        const param1 = JSON.stringify(param);
        factory.foreignLoginJump(param1);
    }
}

new Threelogin().$mount('#app');