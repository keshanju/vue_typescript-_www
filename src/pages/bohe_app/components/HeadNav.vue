<template>
	<div style="text-align:right;padding:8px;">
		<!-- 登录注册导航 -->
		<van-button type="default" style="height:30px;line-height:30px;" v-if="false" @click="showVant">{{$t('head.a15')}}</van-button>
		<van-actionsheet v-model="show" :actions="actions" @select="onSelectLang"/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeadProxy from "@/ts/proxy/HeadProxy";
import { Button, Actionsheet } from "vant";
import "babel-polyfill";
import { LanguageConfig } from "@/ts/utils/Language";
Vue.use(Button);
Vue.use(Actionsheet);
@Component
export default class HeadNav extends HeadProxy {
	public actions: Array<Object> = [];
	public show: boolean = false;
	/**
	 *初始化
	 */
	public created() {
		/******** 注意 *******/
		// 注意：copy代码的时候这个类一定要改成对应项目的语言配置类
		this.lanConfig = LanguageConfig.getInstance();
		/******** end *******/
		this.getPageIndex();
		this.init();
		this.actions = this.languageList;
	}

	/**
	 * 选择语言
	 */
	public onSelectLang(value: object) {
		//@ts-ignore
		this.onChangeLanguage(value.code);
	}
	/**
	 * 点击语言按钮的时候
	 */
	public showVant() {
		this.show = true;
	}
	/**
	 * 切换语言
	 */
	public onChangeLanguage(ln: string = "") {
		try {
			this.onSetLanguage(ln);
			// 抛出自定义事件
			this.$emit("changelanguage", this.seleteLng.code);
			this.show = false;
		} catch (e) {}
	}
}
</script>
