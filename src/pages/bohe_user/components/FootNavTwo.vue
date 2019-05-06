<template>
    <div class="wrap_of_lognav">
            <ul class="com_uls_s3">
                <li @click="goHome" class="com_lis_s3"><a class="font_s25">{{$t("head.a1")}}</a></li>
                <li @click="goRecharge" v-show="webParam.region_code == 0" class="com_lis_s3"><a class="font_s25">{{$t("head.a2")}}</a></li>
                <li @click="goNotify" class="com_lis_s3"><a class="font_s25">{{$t("head.a3")}}</a></li>
                <!-- <li class="com_lis_s3"><a class="font_s25">{{$t("head.a4")}}</a></li> -->
                <li @click="goNews" class="com_lis_s3"><a class="font_s25">{{$t("head.a5")}}</a></li>
                <li @click="goAbout" class="com_lis_s3"><a class="font_s25">{{$t("head.a7")}}</a></li>
            </ul>
            <p class="font_s26">{{$t("head.a13")}}<a href="mailto:customer@bohe.com" class="font_s27">customer@bohe.com</a></p><br>
            <p class="font_s26">@2018 BOHE</p>
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import WebParamModel from '@/ts/models/WebModel';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';

@Component
export default class FootNavTwo extends Vue {
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    /**
         * 跳转首页
         */
        public goHome() {
            JumpWebUtil.backHome();
        }

        /**
         * 跳转套餐页
         */
        public goRecharge() {
            JumpWebUtil.backRecharge();
        }

        /**
         * 跳转公告页
         */
        public goNotify() {
            JumpWebUtil.backNotice();
        }

        /**
         * 跳转资讯页
         */
        public goNews() {
            JumpWebUtil.backNews();
        }

        /**
         * 跳转关于薄荷页
         */
        public goAbout() {
            JumpWebUtil.backAbout();
        }
}
</script>

