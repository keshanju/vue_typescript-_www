<template>
    <div class="head">
        <div class="user_head_content flex_sbe">
            <div class="flex_row_center">
                <img src="../images/logo_2@2x.png" alt="" width="180">
                <span class="webnav_font pos_line_member" style="color: #7e7e7e;">|</span>
                <a class="webnav_font">{{$t("nav.navlist0")}}</a>
            </div>
            <ul class="user_webnav_box flex_row_between">
                <li class="webnav_font" @click="goHome">{{$t("nav.navlist1")}}</li>
                <li class="webnav_font" @click="goRecharge">{{$t("nav.navlist3")}}</li>
                <li class="webnav_font" @click="goNotify">{{$t("nav.navlist4")}}</li>
                <li class="webnav_font" @click="goActivity">{{$t("nav.navlist5")}}</li>

                <!--<li class="webnav_font" @click="goApex" style="position: relative;padding: 25px 10px;overflow: visible;">-->
                <!--{{$t("nav.navlist28")}}-->
                <!--<img src="../images/nav_up_icon.png" alt="" class="nav_newest_icon">-->
                <!--</li>-->
                <!---->
                <!--<li class="webnav_font" style="margin-left: 20px;">-->
                <!--<el-select style="width: 75px;text-align: left;" size="small" v-model="selectPage" @change="onSelectPage" :placeholder="$t('nav.navlist27')">-->
                <!--<el-option :label="$t('nav.navlist7')" value="news.html">-->
                <!--</el-option>-->
                <!--<el-option :label="$t('nav.navlist6')" value="help.html">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</li>-->
                <li class="webnav_font" @click="goNews">{{$t("nav.navlist7")}}</li>
                <li class="webnav_font" @click="goHelp">{{$t("nav.navlist6")}}</li>
                <li class="webnav_font">
                    <el-select style="width: 65px;text-align: left;" size="small" v-model="seleteCode" @change="onSelectLang" :placeholder="$t('public.share25')">
                        <el-option v-for="item in languageList" :key="item.code" :label="item.name" :value="item.code">
                        </el-option>
                    </el-select>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import HeadProxy from "@/ts/proxy/HeadProxy";
    import { Vue, Component } from "vue-property-decorator";
    import {
        Dropdown,
        DropdownItem,
        DropdownMenu,
        Option,
        Select
    } from "element-ui";
    import JumpWebUtil from "../../../ts/utils/JumpWebUtil";
    import GlobalConfig from '@/pages/leishen_user/global.config';
    import { LsLanguage } from '@/pages/leishen_user/util/LsLanguage';
    import WebParamModel from '@/ts/models/WebModel';
    import Util from '@/ts/utils/Util';
    import AppParamModel from "../../../ts/models/AppModel";
    import LocalStorageUtil from "../../../ts/utils/LocalStorageUtil";

    @Component({
        components: {
            "el-select": Select,
            "el-option": Option,
            "el-dropdown": Dropdown,
            "el-dropdown-menu": DropdownMenu,
            "el-dropdown-item": DropdownItem
        }
    })
    export default class HeadNavTwo extends HeadProxy {

        /**
         *初始化
         */
        public created() {
            /******** 注意 *******/
            // 注意：copy代码的时候这个类一定要改成对应项目的语言配置类
            this.lanConfig = LsLanguage.getInstance();
            /******** end *******/
            this.setBaseUrl(GlobalConfig.getBaseUrl());
            this.getPageIndex();
            this.init();
        }

        /**
         * 选择语言
         */
        public onSelectLang(value: string) {
            this.onChangeLanguage(value);
        }

        /**
         * 选择页面
         */
        public onSelectPage(value: string) {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), value);
        }


        /**
         * 切换语言
         */
        public onChangeLanguage(ln: string = "") {
            this.onSetLanguage(ln);
            // 抛出自定义事件
            this.$emit("changelanguage", this.seleteLng.code);
        }

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
            this.$emit('changepage',1)
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
         * 跳转下载站
         */
        public goApex() {
            window.open(JumpWebUtil.HTML_NAME_DOWNLOAD);
        }

        /**
         * 跳转帮助
         */
        public goHelp() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_HELP);
        }
        /**
         * 跳转帮助
         */
        public goNews() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_NEWS);
        }
    }
</script>
