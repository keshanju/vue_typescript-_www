<!--授权登录-->
<template>
    <div class="flex_column_center" style="z-index: 999;">
        <p class="pos_warm_txt">{{$t("public.share37")}}</p>
        <div class="mar_t10">
            <a @click="setbindurltype('wechart')" href="javascript:void(0)">
                <i class="iconfont icon-weixin"></i>
            </a>
            <a @click="setbindurltype('qq')" href="javascript:void(0)">
                <i class="iconfont icon-QQ mar_l20"></i>
            </a>
            <a @click="setbindurltype('weibo')" href="javascript:void(0)">
                <i class="iconfont icon-weibo mar_l20"></i>
            </a>
            <!--<i class="iconfont icon-Facebook mar_l20"></i>-->
            <!--<i class="iconfont icon-Twitter mar_l20"></i>-->
            <!--<i class="iconfont icon-google mar_l20"></i>-->
        </div>
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
    </div>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import {ForeignLoginRequestModel} from "../../../ts/models/OauthModel";
    import OauthProxy from "../../../ts/proxy/OauthProxy";
    import GlobalConfig from "../global.config";
    import HttpClient from "../../../ts/net/HttpClient";
    import ProjectConfig from "../../../../project.config";
    import Util from "../../../ts/utils/Util";
    import AppParamModel from "../../../ts/models/AppModel";
    import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';


    @Component
    export default class OauthLogin extends OauthProxy {

        public webParam = AppParamModel.getInstace(); // 浏览器参数
        public base_url: string = '';
        public languageType: string = '';

        public qq_url = '';
        public wechart_url=''
        public weibo_url=''
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
            if (this.webParam.region_code == Util.REGION_CODE_0) {
                // this.initFaceBookSdk(this.facebook_appId);
                // this.initTwitterSdk(this.twitter_appId, this.twitter_secret);
                // this.initGoogleSdk(this.google_appId);
            }
            this.weibo_url='https://api.weibo.com/oauth2/authorize?client_id=825933425&response_type=code&redirect_uri=https://webapi.leigod.com/api/auth/open/sina&state='+this.webParam.region_code+'_0_'+this.languageType+'_2';
            this.wechart_url='https://open.weixin.qq.com/connect/qrconnect?appid=wx99a90917c0647828&redirect_uri=https://webapi.leigod.com/api/auth/open/wx&response_type=code&scope=snsapi_login&state='+this.webParam.region_code+'_0_'+this.languageType+'_2'+'&connect_redirect=1#wechat_redirect';
            this.qq_url = 'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101523719&redirect_uri=' + GlobalConfig.getBaseUrl() + '/api/auth/open/qq&state=' + this.webParam.region_code + '_0_' + this.languageType + '_2' + '&scope=get_user_info';
        }

        /**
         * 打开facebook登录
         */
        public onClickOpenFacebook() {
            if (!this.facebookIsInit) return;
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
        public loginSuccess(userId: string, type: number) {
            if (userId == '' || userId == null) {
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
            this.autoForeignlogin(url, param);
        }

        /**
         * 设置第三方绑定来源页面
         */
        public setbindurltype(type:string) {
            switch (type) {
                case 'qq':
                    window.open(this.qq_url, "leigod_three_login", "height=630, width=460, top=100, left=0,toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no")
                    break;
                case 'wechart':
                    window.open(this.wechart_url, "leigod_three_login", "height=630, width=460, top=100, left=0,toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no")
                    break;
                case 'weibo':
                    window.open(this.weibo_url, "leigod_three_login", "height=630, width=460, top=100, left=0,toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no")
                    break;
            }
            this.$emit('setbindurltype')
        }
    }
</script>
