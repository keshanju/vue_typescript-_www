<template>
    <div class="header_nav" :class="{head_style:styleType == 1}">
        <!-- 官网logo -->
        <div class="img_frame_bh left_bh">
            <a style="margin-left: 10px;" class="show_bh" @click="goHome">
                <img v-show="styleType == 0" src="../images/logo_nav.png" alt="" class="img_filter">
                <img v-show="styleType == 1" src="../images/logo_nav2.png" alt="" class="img_filter">
            </a>
        </div>
        <!-- 官网导航 -->
        <div class="main_nav_website_bh">
            <ul class="header_items_fa clearfix_a">
                <li class="com_lis">
                    <a @click="goHome" class="words_col0"
                       :class="{'hover_item': pageName == 'index.html' }">{{$t("head.a1")}}</a>
                </li>
                <li class="com_lis" v-show="webParam.region_code == 0">
                    <a @click="goRecharge" class="words_col0" :class="{'hover_item': pageName == 'recharge.html'}">{{$t("head.a2")}}</a>
                </li>
                <li class="com_lis">
                    <a @click="goNotify" :class="{'hover_item': pageName == 'notify.html'}" class="words_col0">{{$t("head.a3")}}</a>
                </li>
                <li class="com_lis" v-show="webParam.region_code==0">
                    <a @click="goActivity" :class="{'hover_item': pageName == 'activity.html'}" class="words_col0">{{$t("head.a4")}}</a>
                </li>
                <li class="com_lis">
                    <a @click="goNews" class="words_col0" :class="{'hover_item': pageName == 'news.html'}">{{$t("head.a5")}}</a>
                </li>
                <li class="com_lis">
                    <a @click="goAbout" class="words_col0" :class="{'hover_item': pageName == 'about.html'}">{{$t("head.a7")}}</a>
                </li>
            </ul>
        </div>
        <!-- 登录注册导航 -->
        <div class="register_login_nav_bh">
            <div class="language_change left_bh">
                <el-select style="width: 100px;" @change="onSelectLang" size="small" v-model="seleteCode"
                           :placeholder="$t('head.a8')">
                    <el-option v-for="item in languageList" :key="item.code" :label="item.name" :value="item.code">
                    </el-option>
                </el-select>
            </div>

            <div class="wrap_of_reg_login_bh right_bh">
                <!--未登录-->
                <ul style="display: none;" v-show="!isLogin" class="list_login_res clearfix_a">
                    <li @click="gotoLoginIn" class="item_login_res cursor_pointer">
                        <a :class="pageName == 'about.html' || pageName == 'index.html' || pageName == 'user.html' || pageName == 'protocol.html' ? 'words_col0' : 'words_clo4'">{{$t("head.a9")}}</a>
                    </li>
                    <li @click="gotoRegister" class="item_login_res cursor_pointer hover_btn">
                        <a class="words_col0">{{$t("head.a10")}}</a>
                    </li>
                </ul>
                <!--已登录-->
                <ul style="display: none;" v-show="isLogin" class="m_t3">
                    <li class="clearfix_a">
                        <img class="head_avatar left_bh" v-if="userInfo.avatar!=='./images/default_avatar.png'" :src="userInfo.avatar"/>
                        <img class="head_avatar left_bh" v-else src="../images/default_avatar.png"/>
                        <el-dropdown class="right_bh" trigger="click" @command="onClickAvatarHand">
                            <span :class="pageName == 'about.html' || pageName == 'index.html' || pageName == 'user.html' ? 'words_col0' : 'words_clo4'"
                                  style="cursor: pointer;">
                                {{userInfo.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="userCentre">{{$t("head.a11")}}</el-dropdown-item>
                                <el-dropdown-item divided command="loginOut">{{$t("head.a12")}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import {Dropdown, DropdownItem, DropdownMenu, Option, Select} from "element-ui";
    import GlobalConfig from "../global.config";
    import JumpWebUtil from "@/ts/utils/JumpWebUtil";
    import WebParamModel from '@/ts/models/WebModel';
    import HeadProxy from "../../../ts/proxy/HeadProxy";
    import "babel-polyfill";
    import {LanguageConfig} from "../../../ts/utils/Language";
    import LocalStorageUtil from "../../../ts/utils/LocalStorageUtil";
    import UchatUtil, {UchatModels} from "../../../ts/utils/UchatUtil";

    @Component({
        components: {
            "el-select": Select,
            "el-option": Option,
            "el-dropdown": Dropdown,
            "el-dropdown-menu": DropdownMenu,
            "el-dropdown-item": DropdownItem
        }
    })
    export default class HeadNav extends HeadProxy {

        public webParam = WebParamModel.getInstace(); // 浏览器参数
        public region_code = 0;

        /**
         *初始化
         */
        public created() {
            this.region_code = LocalStorageUtil.getRegionCodes();
            /******** 注意 *******/
            // 注意：copy代码的时候这个类一定要改成对应项目的语言配置类
            this.lanConfig = LanguageConfig.getInstance();
            /******** end *******/
            this.setBaseUrl(GlobalConfig.getBaseUrl());
            this.getPageIndex();
            this.init();
            if(this.seleteCode!=LocalStorageUtil.getLanguage()){
                this.onChangeLanguage(this.seleteCode)
            }
             this.$emit("changelanguage", this.seleteLng.code);
        }
        /**
         * 选择语言
         */
        public onSelectLang(value: string) {
            this.onChangeLanguage(value);
        }

        /**
         * 打开登录
         */
        public gotoLoginIn() {
            JumpWebUtil.backLogin();
            // JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_LOGIN);
        }

        /**
         * 打开注册
         */
        public gotoRegister() {
            JumpWebUtil.backRegister();
            // JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_REGISTER);
        }

        /**
         * 个人中心
         */
        public gotouserCentre() {
            JumpWebUtil.backUser();
            // JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER);
        }

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
         * 跳转公告页
         */
        public goActivity() {
            JumpWebUtil.backActivity();
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

        /**
         * 切换语言
         */
        public onChangeLanguage(ln: string = "") {
            this.onSetLanguage(ln);
            // 抛出自定义事件
            this.$emit("changelanguage", this.seleteLng.code);
        }

        /**
         * 点击用户头像菜单
         */
        public onClickAvatarHand(command: string) {
            switch (command) {
                case "userCentre":
                    //个人中心
                    this.gotouserCentre();
                    break;
                case "loginOut":
                    //退出登录
                    this.onLoginOut();
                    break;
            }
        }
    }
</script>
