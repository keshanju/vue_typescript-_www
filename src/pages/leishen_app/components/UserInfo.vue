<template>
    <div class="mui-content userInfo" >
        <form>
            <div class="userInfo_mail">
                <van-cell-group>
                    <van-field
                            v-model="nickname"
                            clearable
                            label="昵称"
                            placeholder="请输入您的昵称(大于两个字符)"
                    />

                    <van-field
                            v-model="mobile"
                            label="手机号"
                            placeholder="暂无信息"
                            disabled
                    />
                </van-cell-group>
            </div>

            <div class="userInfo_mail">
                <van-cell-group>
                    <van-field
                            v-model="qq"
                            clearable
                            label="QQ号"
                            placeholder="请输入您的qq号"
                    />

                    <van-field
                            v-model="email"
                            label="邮箱"
                            placeholder="暂无信息"
                            disabled
                    />
                </van-cell-group>
            </div>
            <h5 class="userInfo_Tit">请完善地址信息</h5>
            <div class="userInfo_bot">
                <div class="userInfo_adress">
                    <textarea v-model="address"  rows="6" cols="" placeholder="请输入详细地址"></textarea>
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