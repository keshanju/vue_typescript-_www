<template>
    <!--登录-->
    <div id="app" class="center_auto">
        <div class="dialog_box">
            <div class="clear_fix login_tab_box">
                <div class="f_left login_tab_item" @click="changeLoginType(0)"
                     :class="{'login_tab_active': loginType == 0}">
                    <span class="txt">手机号</span>
                    <i class="tag"></i>
                </div>
                <div class="f_right login_tab_item" @click="changeLoginType(1)"
                     :class="{'login_tab_active': loginType == 1}">
                    <span class="txt">邮箱/账号</span>
                    <i class="tag"></i>
                </div>
            </div>
            <!--手机-->
            <div style="display: none;" v-show="loginType == 0">
                <div class="mar_t30 public_enter_ipt">
                    <div class="f_left select_box">
                        <img :src="countryCode.ico" alt="">
                        <el-select @change="onSelectCountryCode" value="" placeholder="">
                            <el-option-group v-for="group in country_code_list" :key="group.label" :label="group.label">
                                <el-option v-for="(val,index) in group.options" :key="index" :value="val">
                                    <img :src="val.ico" alt="">
                                    <span style="color:#666;">{{val.name}}</span>
                                </el-option>
                            </el-option-group>
                        </el-select>
                        <span class="countryCode_cell">{{countryCode.code}}</span>
                    </div>
                    <div class="f_left">|</div>
                    <input class="f_left transparent_ipt" type="text" v-model="phone" placeholder="手机号">
                </div>
                <input class="mar_t25 public_enter_ipt" type="password" v-model="phonePassword"
                       @change="passwordInput(0)" placeholder="密码">
            </div>
            <!--邮箱/账号-->
            <div style="display: none;" v-show="loginType == 1">
                <input class="mar_t30 public_enter_ipt" type="text" v-model="email" placeholder="邮箱号/账号">
                <input class="mar_t25 public_enter_ipt" type="password" placeholder="密码" v-model="emailPassword"
                       @change="passwordInput(1)">
            </div>
            <div class="clear_fix mar_t25">
                <label for="" class="f_left" @click="isKeepPw = !isKeepPw">
                    <div class="check_is_rem f_left" :class="{'is_rem_pwd': isKeepPw}">
                        <input class="vertical_middle mar_r5" v-model="isKeepPw" type="checkbox" style="opacity: 0;">
                    </div>
                    <div class="f_left mar_l5 cursor">记住我</div>
                </label>
                <a class="f_right" @click="goForgetPwd">忘记密码</a>
            </div>
            <div class="mar_t20 public_enter_btn" @click="clickLogin">
                立即登录
            </div>
            <div class="mar_t15 public_white_btn" @click="goRegister">
                注册雷神, 免费体验3小时
            </div>
            <div class="mar_t25 third_party">
                <p>第三方登录</p>
                <div class="mar_t10">
                    <i class="iconfont icon-weixin"></i>
                    <i class="iconfont icon-QQ mar_l20"></i>
                    <i class="iconfont icon-weibo mar_l20"></i>
                    <i class="iconfont icon-Facebook mar_l20"></i>
                    <i class="iconfont icon-Twitter mar_l20"></i>
                    <i class="iconfont icon-google mar_l20"></i>
                </div>
            </div>
            <i class="iconfont icon-cha"></i>
        </div>
    </div>
</template>
<script lang="ts" src="./logindialog.ts"></script>
