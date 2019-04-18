<template>
    <div class="login_nav_box">
        <ul class="flex_row_center">
            <li class="h5_font14_white pos_login_nav" @click="goHome">{{$t("nav.navlist1")}}</li>
            <li class="h5_font14_white pos_login_nav" @click="goRecharge">{{$t("nav.navlist3")}}</li>
            <li class="h5_font14_white pos_login_nav" @click="goNotify">{{$t("nav.navlist4")}}</li>
            <li class="h5_font14_white pos_login_nav" @click="goActivity">{{$t("nav.navlist5")}}</li>
            <li class="h5_font14_white pos_login_nav" @click="goNews">{{$t("nav.navlist7")}}</li>
            <li class="h5_font14_white pos_login_nav" @click="goWangBa">{{$t("nav.navlist2")}}</li>
        </ul>
        <p class="list_font">{{$t("nav.navlist25")}}</p>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import JumpWebUtil from '@/ts/utils/JumpWebUtil';
    import GlobalConfig from '@/pages/leishen_user/global.config';
    @Component
    export default class FootNavTwo extends Vue{
        /**
         * 跳转首页
         */
        public goHome() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_INDEX);
        }

        /**
         * 跳转充值
         */
        public goRecharge() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_RECHARGE);
        }

        /**
         * 跳转公告
         */
        public goNotify() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_NOTIFY);
        }

        /**
         * 跳转活动
         */
        public goActivity() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_ACTIVITY);
        }

        /**
         * 跳转资讯
         */
        public goNews() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_NEWS);
        }

        /**
         * 跳转网吧专题页
         */
        public goWangBa() {
            window.open(JumpWebUtil.HTML_NAME_WANGBA)
        }
    }
</script>