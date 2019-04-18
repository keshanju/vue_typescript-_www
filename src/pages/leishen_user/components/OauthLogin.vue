<!--授权登录-->
<template>
    <div class="flex_column_center" style="z-index: 999;">
        <p class="list_font pos_warm_txt">{{$t("public.share37")}}</p>
        <ul class="flex_row_around" style="width: 240px;margin: 0 auto;">
            <li @click="setbindurltype">
                <a :href="'https://open.weixin.qq.com/connect/qrconnect?appid=wx99a90917c0647828&redirect_uri=https://webapi.leigod.com/api/auth/open/wx&response_type=code&scope=snsapi_login&state='+webParam.region_code+'_0_'+languageType+'_2'+'&connect_redirect=1#wechat_redirect'" class="binding_wechat"></a>
            </li>
            <li @click="setbindurltype">
                <a :href="'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101523719&redirect_uri=https://webapi.leigod.com/api/auth/open/qq&state='+webParam.region_code+'_0_'+languageType+'_2'+'&scope=get_user_info'" class="binding_qq"></a>
            </li>
            <li @click="setbindurltype">
                <a :href="'https://api.weibo.com/oauth2/authorize?client_id=825933425&response_type=code&redirect_uri=https://webapi.leigod.com/api/auth/open/sina&state='+webParam.region_code+'_0_'+languageType+'_2'" class="binding_weibo"></a>
            </li>
            <!-- <li v-if="webParam.region_code == 0" @click="setbindurltype">
                <a class="binding_facebook" @click="onClickOpenFacebook"></a>
            </li> -->
            <!-- twitter -->
            <!-- <li>
                <a class="binding_twitter"></a>
            </li> -->
            <!-- <li v-if="webParam.region_code == 0" @click="setbindurltype">
                <a id="googleBtn" class="binding_google"></a>
            </li> -->
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import WebParamModel from "../../../ts/models/WebModel";
    import {ForeignLoginRequestModel} from "../../../ts/models/OauthModel";
    import OauthProxy from "../../../ts/proxy/OauthProxy";
    import GlobalConfig from "../global.config";
    import HttpClient from "../../../ts/net/HttpClient";
    import ProjectConfig from "../../../../project.config";
    import Util from "../../../ts/utils/Util";
    import AppParamModel from "../../../ts/models/AppModel";

    @Component
    export default class OauthLogin extends OauthProxy {

        public webParam = AppParamModel.getInstace(); // 浏览器参数
        public base_url: string = '';
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
            this.languageType = Util.getLanguageType(this.webParam.language)
            this.setBaseUrl(GlobalConfig.getBaseUrl());
            this.base_url = GlobalConfig.getBaseUrl();
            
            //
            if(this.webParam.region_code == Util.REGION_CODE_0) {
                // this.initFaceBookSdk(this.facebook_appId);
                // this.initTwitterSdk(this.twitter_appId, this.twitter_secret);
                // this.initGoogleSdk(this.google_appId);
            }
        }

        /**
         * 打开facebook登录
         */
        public onClickOpenFacebook() {
            if(!this.facebookIsInit) return;
            // this.$emit("set-loading-statuas", true);
            this.onOpenFacebook();
        }

        /**
         * google登录
         */
        public onClickOpenGoogle() {
        }

        /**
         * 第三方登录成功
         */
        public loginSuccess(userId: string,type: number) {
            if(userId == '' || userId == null) {
                alert('authorization failed!!');
                return;
            }
            ProjectConfig.log('授权userId:' + userId);
            // this.$emit("set-loading-statuas", false);
            let param: ForeignLoginRequestModel = new ForeignLoginRequestModel();
            param.open_id = userId;
            param.open_type = type;
            param.state = this.webParam.region_code + '_0'
            let url = GlobalConfig.getBaseUrl() + HttpClient.URL_AUTH_FOREIGN_LOGIN;
            this.autoForeignlogin(url,param);
        }

        /**
         * 设置第三方绑定来源页面
         */
        public setbindurltype() {
            this.$emit('setbindurltype')
        }
    }
</script>