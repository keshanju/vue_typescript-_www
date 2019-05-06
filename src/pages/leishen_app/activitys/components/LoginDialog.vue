<template>
    <div class="login_app">
        <van-field v-model="phone" right-icon="question-o" label="用户名：" type="text" placeholder="请输入用户名"/>
        <van-field v-model="phonePassword" label="密码：" @input="passwordInput(0)" type="password" placeholder="请输入密码"/>
        <div class="text_center pad_v15">
            <van-button type="primary" @click="onLogin">登录</van-button>
        </div>
    </div>
</template>

<script lang="ts" src="./LoginDialog.ts">
</script>
