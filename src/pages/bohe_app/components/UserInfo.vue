<template>
	<div class="mui-content userInfo">
		<form>
			<div class="userInfo_mail">
				<div class="mui-input-row">
					<!-- 昵称 -->
					<label>{{$t("user.z12")}}</label>
					<input type="text" v-model="nickname" name="title" :placeholder="$t('user.z16')" value>
				</div>
				<div class="mui-input-row" style="background:rgba(204, 204, 204, 0.5);cursor:not-allowd;">
					<!-- 手机号 -->
					<label>{{$t("login.l4")}}</label>
					<input type="text" v-model="mobile" disabled="disabled" name="tel" :placeholder="$t('login.l4')" value>
				</div>
			</div>

			<div class="userInfo_mail">
				<div class="mui-input-row">
					<label>{{$t("user.z44")}}</label>
					<input type="text" v-model="qq" placeholder value name="qq">
				</div>
				<div class="mui-input-row" style="background:rgba(204, 204, 204, 0.5);cursor:not-allowd;">
					<label>{{$t("login.l9")}}</label>
					<input type="text" v-model="email" disabled name="mail" id="mail" value>
				</div>
			</div>
			<h5 style="margin: 10px 15px;">{{$t('user.z45')}}</h5>
			<div class="userInfo_bot">
				<div class="mui-input-row userInfo_adress">
					<label style="display: none;">{{$t('user.z45')}}</label>
					<textarea v-model="address" rows="3" cols :placeholder="$t('user.z45')"></textarea>
				</div>
			</div>
			<button class="userInfo_btn" type="button" @click="onSaveUserInfo">{{$t('userprize.up9')}}</button>
		</form>
	</div>
</template>
<script lang="ts">
import UserInfo from "./UserInfoControl";
export default UserInfo;
</script>