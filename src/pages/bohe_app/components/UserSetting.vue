<template>
	<div class="my_setting_list">
		<!-- 上传头像 -->
		<!-- <ul class="mui-table-view my_center_cell">
			<li class="mui-table-view-cell">
				<a class="mui-navigate-right">
					<i class="kaixin icon-kaixin"></i>
					{{$t('user.z1')}}
					 <input type="file" @change="changeImage" class="uploadImg">
				</a>
			</li>
		</ul> -->

		<ul class="mui-table-view my_center_cell">
			<li class="mui-table-view-cell">
				<a class="mui-navigate-right" @click="gotoforget">
					<i class="ls icon-guojiliuliangbao"></i>
					<!-- 忘记密码 -->
					{{$t('login.l12')}}
				</a>
			</li>
		</ul>
		<!-- 语言 -->
		<!-- <ul class="mui-table-view my_center_cell">
			<li class="mui-table-view-cell">
				<a class="mui-navigate-right" @click="changeLang">
					<i class="ls icon-guojiliuliangbao"></i>
					{{$t('head.a15')}}
				</a>
			</li>
		</ul> -->

		<ul class="mui-table-view my_center_cell">
			<li class="mui-table-view-cell" @click="removebind">
				<a class="mui-text-center">
					<!-- 解除绑定 -->
					{{$t('login.l30')}}
				</a>
			</li>
		</ul>
		<van-actionsheet v-model="show" :actions="actions" @select="onSelectLang"/>
	</div>
</template>
<script lang="ts">
import UserSetting from "./userSettingControl";
export default UserSetting;
</script>