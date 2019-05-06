<!--授权登录-->
<template>
    <div>
        <div class="third_login_head">
            <p class="third_login_title">{{$t('login.l26')}}</p>
        </div>
        <p class="third_login_msg">{{$t('login.l27')}}</p>
        <ul class="third_login">
            <li class="third_login_type">
                <a :href="'https://open.weixin.qq.com/connect/qrconnect?appid=wxa2f4d7b57bb97e5a&redirect_uri=https://api.bohe.com/api/auth/open/wx&response_type=code&scope=snsapi_login&state='+webParam.region_code+'_0_'+languageType+'_1&connect_redirect=1#wechat_redirect'">
                    <i class="third_login_wechat third_login_icon"></i>
                </a>
            </li>
            <li class="third_login_type">
                <a :href="'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101502267&redirect_uri=https://api.bohe.com/api/auth/open/qq&state='+webParam.region_code+'_0_'+languageType+'_1&scope=get_user_info'">
                    <i class="third_login_qq third_login_icon"></i>
                </a>
            </li>
            <li class="third_login_type">
                <a :href="'https://api.weibo.com/oauth2/authorize?client_id=1072947333&response_type=code&state='+webParam.region_code+'_0_'+languageType+'_1&redirect_uri=https://api.bohe.com/api/auth/open/sina'">
                    <i class="third_login_weibo third_login_icon"></i>
                </a>
            </li>
            <li class="third_login_type" v-if="webParam.region_code == 0">
                <a @click="onClickOpenFacebook">
                    <i class="third_login_facebook third_login_icon"></i>
                </a>
            </li>
            <!-- <li class="third_login_type" v-if="webParam.region_code == 0">
                <a>
                    <i class="third_login_twitter third_login_icon"></i>
                </a>
            </li> -->
            <li class="third_login_type" v-if="webParam.region_code == 0">
                <a id="googleBtn">
                    <i class="third_login_google third_login_icon"></i>
                </a>
            </li>
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

    @Component
    export default class HeadNav extends OauthProxy {

        public webParam = WebParamModel.getInstace();
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
                this.initFaceBookSdk(this.facebook_appId);
                this.initTwitterSdk(this.twitter_appId, this.twitter_secret);
                this.initGoogleSdk(this.google_appId);
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
            param.state = this.webParam.region_code + '_0' + this.languageType;
            let url = GlobalConfig.getBaseUrl() + HttpClient.URL_AUTH_FOREIGN_LOGIN;
            this.autoForeignlogin(url,param);
        }
    }
</script>