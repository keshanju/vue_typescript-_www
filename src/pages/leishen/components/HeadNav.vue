<template>
	<div class="head">
		<div class="head_content">
			<div class="row-fluid" style="position:relative;">
				<div class="webnav_box" style="left: 0;">
					<div class="row-fluid web-nav-cell">
                        <div class="span2" @click="goHome">
                            <a :class="{'webnav_font_active': pageName == 'index.html' }" class="webnav_font">{{$t("nav.navlist1")}}</a>
                        </div>
                        <div class="span2" style="margin: 0 20px;" @click="goWangBa">
                            <a  :class="{'webnav_font_active': pageName == 'wangba.html' }" class="webnav_font">{{$t("nav.navlist2")}}</a>
                        </div>
                        <div class="span2" style="margin-left: 0;" @click="goRecharge">
                            <a :class="{'webnav_font_active': pageName == 'recharge.html' }"  class="webnav_font">{{$t("nav.navlist3")}}</a>
                        </div>
                        <div class="span3" style="margin: 0 5px 0 5px;" @click="goNotify">
                            <a class="webnav_font" :class="{'webnav_font_active': pageName == 'notify.html' }">{{$t("nav.navlist4")}}</a>
                        </div>
                        <div class="span3" style="margin-left: -5px;" @click="goActivity">
							<a :class="{'webnav_font_active': pageName == 'activity.html' }" class="webnav_font">{{$t("nav.navlist5")}}</a>
						</div>
					</div>
				</div>
				<div class="web_logo_box">
					<div class="logo" @click="goHome">
						<img src="../images/nav_logo.png" alt class="nav_logo">
					</div>
				</div>
				<div class="webnav_box" style="right: 0">
					<!--<div class="row-fluid web-nav-cell">-->
                        <!--<div class="span3" style="margin-left: 0;position:relative;">-->
                        <!--<a @click="goApex" target="_blank" :class="{'webnav_font_active': pageName == 'down.html'}" class="webnav_font">{{$t("nav.navlist28")}}</a>-->
                        <!--<img class="nav_newest_icon" src="../images/nav_up_icon.png" alt="雷神下载站">-->
                    <!--</div>-->
					<div class="span3" style="margin-left: -5px;" @click="goHelp">
						<a :class="{'webnav_font_active': pageName == 'help.html' }" class="webnav_font">{{$t("nav.navlist6")}}</a>
					</div>
					<div class="span3" style="margin-left: -5px;" @click="goNews">
						<a :class="{'webnav_font_active': pageName == 'news.html' }" class="webnav_font">{{$t("nav.navlist7")}}</a>
					</div>
					<!--<div class="span3" style="margin-left: 30px;margin-right: -15px;">-->
						<!--<el-dropdown trigger="click" @command="changeUrl">-->
							<!--<span class="cursor" style="color:#fff;font-size: 16px;">-->
								<!--<span>{{$t("nav.navlist27")}}</span>-->
								<!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
							<!--</span>-->
							<!--<el-dropdown-menu slot="dropdown">-->
								<!--<el-dropdown-item  command="help">-->
									<!--{{$t("nav.navlist6")}}-->
								<!--</el-dropdown-item>-->
								<!--<el-dropdown-item command="news">-->
									<!--{{$t("nav.navlist7")}}-->
								<!--</el-dropdown-item>-->
							<!--</el-dropdown-menu>-->
						<!--</el-dropdown>-->
					<!--</div>-->
					<div class="span3" style="margin-left: 0;">
						<div class="webnav_font">
							<el-select style="width: 85px" size="small" v-model="seleteCode"  @change="onSelectLang" :placeholder="$t('public.share25')">
								<el-option
										v-for="item in languageList"
										:key="item.code"
										:label="item.name"
										:value="item.code"
								></el-option>
							</el-select>
						</div>
					</div>
					<div class="span3" style="margin-left: 20px;">
							<!--未登录-->
                        <ul style="margin-top: 20px;width: 155px;display: none" v-show="!isLogin" class="clear_fix">
								<li class="f_left">
									<a  @click="goRegister" class="register_font register_btn">{{$t("public.share26")}}</a>
								</li>
								<li class="f_left" style="margin-left:5px;">
									<a  @click="goLogin" class="login_font">{{$t("public.share27")}}</a>
								</li>
							</ul>
							<!--已登录-->
							<div style="width: 150px;display: none" v-show="isLogin" class="clear_fix">
								<div class="f_left">
									<img class="head_avatar" :src="userInfo.avatar" onerror="javascript:this.src='/images/default_avatar.png'"/>
								</div>
								<el-dropdown class="f_left" trigger="click" @command="onClickAvatarHand">
									<span class="cursor" style="color:#fff;">
										<span class="head_nickname words_flow" style="width: 90px">{{userInfo.nickname}}</span>
										<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item command="userCentre">{{$t("nav.navlist8")}}</el-dropdown-item>
										<el-dropdown-item divided command="loginOut">{{$t("nav.navlist9")}}</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
				<div class="nav_guang"></div>
			</div>
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
import WebParamModel from "../../../ts/models/WebModel";
import LocalStorageUtil from "../../../ts/utils/LocalStorageUtil";
import { LanguageConfig } from "../../../ts/utils/Language";
import GlobalConfig from "../global.config";
import { LsLanguage } from "../util/LsLanguage";

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
	 * 切换语言
	 */
	public onChangeLanguage(ln: string = "") {
		this.onSetLanguage(ln);
		// 抛出自定义事件
		this.$emit("changelanguage", this.seleteLng.code);
	}

	/**
     * 跳转登录
     */
    public goLogin() {
        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_LOGIN);
    }

	/**
     * 跳转注册
     */
    public goRegister() {
        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_REGISTER);
    }

	/**
	 * 个人中心
	 */
	public gotouserCentre() {
        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER);
	}

	/**
	 * 跳转首页
	 */
	public goHome() {
        JumpWebUtil.backHome();
    }

    /**
	 * 跳转网吧专题页
	 */
	public goWangBa() {
		window.open(JumpWebUtil.HTML_NAME_WANGBA + window.location.search)
	}

	/**
	 * 跳转下载站
	 */
	public goApex() {
		window.open(GlobalConfig.goTodownUrl() + window.location.search);
	}


	/**
	 * 跳转套餐页
	 */
	public goRecharge() {
        let token = LocalStorageUtil.getUserToken().account_token;
        if(token) {
            JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_USER,'page=1');
        }else {
		    JumpWebUtil.backRecharge();
        }
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
	 * 跳转活动页
	 */
	public goActivity() {
		JumpWebUtil.backActivity();
	}

	/**
	 * 跳转帮助页
	 */
	public goHelp() {
		JumpWebUtil.backHelp();
	}

	/**
     * 帮助与资讯链接跳转
     */
    public changeUrl(command: string) {
        switch (command) {
            case "help":
                //跳转帮助页面
                this.goHelp();
                break;
            case "news":
                //跳转资讯页面
                this.goNews();
                break;
        }
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

