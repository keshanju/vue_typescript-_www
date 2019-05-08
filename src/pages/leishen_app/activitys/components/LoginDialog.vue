<template>
    <div class="login_app">
        <div class="mui-content regBox newregBox">
            <van-tabs type="card" color="#6F839B" :swipeable=true animated @change="changeLoginType">
                <van-tab title="手机">
                    <form class="mui-input-group nobg">
                        <div class="login">
                            <div class="mui-input-row login_user">

                                <div @click="changeAreaCode" class="leigod_flex_left areaCode" style="width:110px;">
                                    <img :src="country.ico" alt="">
                                    +<span v-text="country.code"></span>
                                    <img src="../../images/weixinjt.png" width="18" alt="">
                                </div>

                                <input type="text" class="mui-input-clear" name="mini_username" placeholder="请输入手机号"
                                       v-model="phone"/>
                            </div>
                            <div class="mui-input-row login_user mui-password">
                                <input type="password" class="leigod_pl15" name="mini_password" placeholder="请输入密码"
                                       v-model="phonePassword"
                                       @input="passwordInput(0)"/>
                            </div>
                        </div>
                    </form>
                </van-tab>
                <van-tab title="邮箱/账号">
                    <form class="mui-input-group nobg">
                        <div class="login">
                            <div class="mui-input-row login_user">
                                <input type="text" class="mui-input-clear" name="mini_username" placeholder="请输入邮箱或账号"
                                       v-model="email"/>
                            </div>
                            <div class="mui-input-row login_user mui-password">
                                <input type="password" class="mui-input-password" name="mini_password"
                                       placeholder="请输入密码" v-model="emailPassword"
                                       @input="passwordInput(1)"/>
                            </div>
                        </div>
                    </form>
                </van-tab>
            </van-tabs>

            <div class="login_forget leigod_flex_between" v-show="platform==4">
                <van-checkbox v-model="bangding" class="leigod_ml5">绑定微信账号</van-checkbox>
                <a @click="goForgetPwd" class=" login_forget_link">忘记密码</a>
            </div>

            <button class="btn login_btn" type="button" @click="onLogin">登录</button>

            <div>
                <a @click="goRegister" class="login_reg_link">没有雷神账号? 立即注册</a>
                <a @click="goForgetPwd" class="login_reg_link" v-show="platform!=4">忘记密码</a>
            </div>

            <van-popup v-model="AreaCodeshow" position="right" :lazy-render="false" style="width: 100%;height: 100%;">
                <country-item @getcountry="getcountry"></country-item>
            </van-popup>

        </div>
        <!-- loading -->
        <load :isloading="isLoading"></load>
    </div>
</template>

<script lang="ts" src="./LoginDialog.ts">
</script>
