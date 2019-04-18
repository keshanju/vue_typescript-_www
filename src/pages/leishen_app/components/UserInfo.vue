<template>
    <div class="mui-content userInfo">
        <form>
            <div class="userInfo_mail">
                <div class="mui-input-row">
                    <label>昵称</label>
                    <input type="text" v-model="nickname" maxlength="20" name="title" placeholder="请输入您的昵称" value="" />
                </div>
                <div class="mui-input-row">
                    <label>手机号</label>
                    <input type="text" v-model="mobile" disabled="disabled" name="tel" placeholder="暂无信息" value="" />
                </div>
            </div>

            <div class="userInfo_mail">
                <div class="mui-input-row">
                    <label>QQ号</label>
                    <input type="text" v-model="qq" placeholder="请输入" value="" name="qq">
                </div>
                <div class="mui-input-row">
                    <label>邮箱</label>
                    <input type="text" v-model="email" disabled placeholder="暂无信息" name="mail" id="mail" value="">
                </div>
            </div>
            <h5 style="margin: 10px 15px;">请完善地址信息</h5>
            <div class="userInfo_bot">
                <div class="mui-input-row userInfo_adress">
                    <label style="display: none;">详细地址</label>
                    <textarea v-model="address"  rows="3" cols="" placeholder="请输入详细地址"></textarea>
                </div>
            </div>
            <button class="userInfo_btn" type="button" @click="onSaveUserInfo">提交</button>
        </form>
         <!-- loading -->
        <load :isloading="isLoading"></load>
    </div>
</template>
<script lang="ts">
    import UserInfo from './UserInfoControl';
    export default UserInfo;
</script>