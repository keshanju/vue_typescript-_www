<template>
	<div class="head">
		<div class="head_content flex_row_center">
			<ul class="webnav_box flex_row_between">
				<li
					class="webnav_font"
					:class="{'webnav_font_active': pageName == 'index.html' }"
					@click="goHome"
				><a>{{$t("nav.navlist1")}}</a></li>
				<li class="webnav_font" @click="goWangBa" :class="{'webnav_font_active': pageName == 'wangba.html' }">
                    {{$t("nav.navlist2")}}
                </li>
				<li
					class="webnav_font"
					:class="{'webnav_font_active': pageName == 'recharge.html' }"
					@click="goRecharge"
				><a>{{$t("nav.navlist3")}}</a></li>
				<li
					class="webnav_font"
					:class="{'webnav_font_active': pageName == 'notify.html' }"
					@click="goNotify"
				><a>{{$t("nav.navlist4")}}</a></li>
				<li
					class="webnav_font"
					:class="{'webnav_font_active': pageName == 'activity.html' }"
					@click="goActivity"
				><a>{{$t("nav.navlist5")}}</a></li>
			</ul>
			<div class="web_logo_box">
				<div class="logo" @click="goHome">
					<img src="../images/nav_logo.png" alt class="nav_logo">
				</div>
			</div>
			<ul class="webnav_box flex_row_between">
				<li class="webnav_font"
					:class="{'webnav_font_active': pageName == 'help.html' }"
					@click="goHelp"
				><a>{{$t("nav.navlist6")}}</a></li>
				<li class="webnav_font"
					:class="{'webnav_font_active': pageName == 'news.html' }"
					@click="goNews"
				><a>{{$t("nav.navlist7")}}</a></li>
				<li class="webnav_font" style="margin-right: -70px;">
					<el-select style="width: 65px" size="small" v-model="seleteCode"  @change="onSelectLang" :placeholder="$t('public.share25')">
						<el-option
							v-for="item in languageList"
							:key="item.code"
							:label="item.name"
							:value="item.code"
						></el-option>
					</el-select>
				</li>
				<!--登录注册按钮-->
				<li>
					<div class="login_register">
						<!--未登录-->
						<ul style="display: none;" v-show="!isLogin" class="flex_row_start">
							<li @click="goRegister">
								<a class="register_font web_public_btn">{{$t("public.share26")}}</a>
							</li>
							<li @click="goLogin" style="margin-left:10px;">
								<a class="login_font">{{$t("public.share27")}}</a>
							</li>
						</ul>
						<!--已登录-->
						<div style="display: none;" v-show="isLogin" class="flex_row_start">
							<div class="flex_row_between">
								<img class="head_avatar" :src="userInfo.avatar" onerror="javascript:this.src='./images/default_avatar.png'"/>
								<el-dropdown trigger="click" @command="onClickAvatarHand">
									<span class="cursor" style="color:#fff;">
										<span class="head_nickname">{{userInfo.nickname}}</span>  
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
				</li>
			</ul>
            <div class="nav_guang"></div>
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
		window.open(JumpWebUtil.HTML_NAME_WANGBA)
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

