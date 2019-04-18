<template>
	<div>
		<ul class="three_bind flex_row_center">
			<li class="three_bind_item">
				<img src="../images/wechat.png" alt class="three_bind_icon">
				<p class="three_bind_type">{{$t("user.b44")}}</p>
				<div class="three_bind_btn" v-show="!thirdBindState.wechat" style="display:none;">
					<a class="public_btn three_bind_btn_pd" @click="clickThirdBind(2)"
					>{{$t("public.share8")}}</a>
				</div>
				<div class="three_bind_btn" v-show="thirdBindState.wechat"  style="display:none;">
					<a class="public_btn three_bind_btn_pd" @click="thirdUntied(2)">{{$t("user.b39")}}</a>
				</div>
			</li>
			<li class="three_bind_item">
				<img src="../images/qq.png" alt class="three_bind_icon">
				<p class="three_bind_type">{{$t("user.b45")}}</p>
				<div class="three_bind_btn" v-show="!thirdBindState.QQ"  style="display:none;">
					<a @click="clickThirdBind(1)" class="public_btn three_bind_btn_pd"
					>{{$t("public.share8")}}</a>
				</div>
				<div class="three_bind_btn" v-show="thirdBindState.QQ"  style="display:none;">
					<a class="public_btn three_bind_btn_pd" @click="thirdUntied(3)">{{$t("user.b39")}}</a>
				</div>
			</li>
			<li class="three_bind_item" :class="{'border_none': appParam.region_code == 1}">
				<img src="../images/weibo.png" alt class="three_bind_icon">
				<p class="three_bind_type">{{$t("user.b46")}}</p>
				<div class="three_bind_btn" v-show="!thirdBindState.weibo"  style="display:none;">
					<a @click="clickThirdBind(3)" class="public_btn three_bind_btn_pd">{{$t("public.share8")}}</a>
				</div>
				<div class="three_bind_btn" v-show="thirdBindState.weibo"  style="display:none;">
					<a class="public_btn three_bind_btn_pd" @click="thirdUntied(4)">{{$t("user.b39")}}</a>
				</div>
			</li>
			<!-- <li class="three_bind_item" v-show="appParam.region_code == 0" style="display:none;">
				<img src="../images/facebook.png" alt class="three_bind_icon">
				<p class="three_bind_type">{{$t("user.b47")}}</p>
				<div class="three_bind_btn" v-show="!thirdBindState.facebook" style="display:none;">
					<a class="public_btn three_bind_btn_pd">{{$t("public.share8")}}</a>
				</div>
				<div class="three_bind_btn" v-show="thirdBindState.facebook" style="display:none;">
					<a class="public_btn three_bind_btn_pd" @click="thirdUntied(7)">{{$t("user.b39")}}</a>
				</div>
			</li>
			<li class="three_bind_item" v-show="appParam.region_code == 0" style="display:none;">
				<img src="../images/twitter.png" alt class="three_bind_icon">
				<p class="three_bind_type">{{$t("user.b48")}}</p>
				<div class="three_bind_btn" v-show="!thirdBindState.twitter" style="display:none;">
					<a class="public_btn three_bind_btn_pd">{{$t("public.share8")}}</a>
				</div>
				<div class="three_bind_btn" v-show="thirdBindState.twitter" style="display:none;">
					<a class="public_btn three_bind_btn_pd" @click="thirdUntied(6)">{{$t("user.b39")}}</a>
				</div>
			</li>
			<li
				class="three_bind_item"
				:class="{'border_none': appParam.region_code == 0}"
				v-show="appParam.region_code == 0" style="display:none;"
			>
				<img src="../images/google.png" alt class="three_bind_icon">
				<p class="three_bind_type">{{$t("user.b49")}}</p>
				<div class="three_bind_btn" v-show="!thirdBindState.google" style="display:none;">
					<a class="public_btn three_bind_btn_pd">{{$t("public.share8")}}</a>
				</div>
				<div class="three_bind_btn" v-show="thirdBindState.google" style="display:none;">
					<a class="public_btn three_bind_btn_pd" @click="thirdUntied(5)">{{$t("user.b39")}}</a>
				</div>
			</li> -->
		</ul>
		<div class="btn_control">
			<a class="white_btn" @click="closeService">{{$t("public.share13")}}</a>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppParamModel from "@/ts/models/AppModel";
import { IProxy } from "@/ts/interface/IProxy";
import { BindingProxy } from "@/ts/proxy/BindingProxy";
import GlobalConfig from "@/pages/leishen_pc/global.config";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import Util from "@/ts/utils/Util";
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import { ExtrnalFactory } from '@/ts/factory/ExtrnalFactory';

@Component
export default class ThreeBind extends BindingProxy implements IProxy {
	public appParam: AppParamModel = AppParamModel.getInstace();
	public languageType: string = "";

	public created() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.languageType = Util.getLanguageType(this.appParam.language);
		this.getThirdBindState();
	}

	/**
	 * 关闭下拉框
	 */
	public closeService() {
		this.$emit("closeservice");
	}

	/**
	 * 解绑第三方账号
	 */
	public thirdUntied(type: number) {
		this.$confirm(
			TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_REMOVEBIND_NOTIFY),
			"提示",
			{
				confirmButtonText: TipsMsgUtil.getTipsMsg(
					TipsMsgUtil.KEY_NOTIF_YES
				),
				cancelButtonText: TipsMsgUtil.getTipsMsg(
					TipsMsgUtil.KEY_NOTIF_NO
				),
				type: "warning"
			}
		)
			.then(() => {
				this.onThirdUntied(type);
			})
			.catch(() => {});
	}

	/**
	 * 用户解绑第三方账号成功
	 */
	public onThirdUntiedSuccess(type) {
		this.$message({
			message: TipsMsgUtil.getTipsMsg(
				TipsMsgUtil.KEY_WEIXIN_REMOVEBING_SUCCEED
			),
			type: "success"
		});
		switch (type) {
			case 2:
				this.thirdBindState.wechat = false;
				break;
			case 3:
				this.thirdBindState.QQ = false;
				break;
			case 4:
				this.thirdBindState.weibo = false;
				break;
			case 5:
				this.thirdBindState.google = false;
				break;
			case 6:
				this.thirdBindState.twitter = false;
				break;
			case 7:
				this.thirdBindState.facebook = false;
			default:
				break;
		}
	}

	/**
	 * 用户解绑第三方账号失败
	 */
	public onThirdUntiedFaild(data: any) {
		this.$message({
			message: data.msg,
			type: "warning"
		});
    }

    /**
     * 唤起第三方绑定
     */
    public clickThirdBind(type: number){
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        this.setBindUrlType();
        factory.bindAccount(type,'')
    }
    
    /**
     * 设置第三方绑定来源页面
     */
    public setBindUrlType(){
        localStorage.setItem(LocalStorageUtil.STORAGES_THIRDBIND_URL_TYPE,'0');
    }
}
</script>

