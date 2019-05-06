<template>
      <div class="my_setting_list">
          <div style="position: relative;">
              <van-cell title="上传头像" is-link value="(不超过500K)" />
              <input type="file" @change="changeImage" class="uploadImg">
          </div>
          <van-cell title="忘记密码" is-link @click="gotoforget" />
          

          <van-button size="large"  @click="removebind">解除绑定</van-button>

          	<!-- loading -->
		   <load :isloading="isLoading" ></load>
         
        </div>
</template>
<script lang="ts">
    import UserSetting from './userSettingControl';
    export default UserSetting;
</script>