<template>
    <div class="center_auto">
        <div class="dialog_box">
            <!--top-->
            <i class="bind_title_msg">第一次使用请绑定已注册账号</i>
            <i class="iconfont icon-cha"></i>
            <!--center-->
            <div class="clear_fix login_tab_box">
                <div class="f_left login_tab_item" @click="changeTab(0)" :class="{'login_tab_active': tabIndex == 0}">
                    绑定手机
                    <i class="tag"></i>
                </div>
                <div class="f_right login_tab_item" @click="changeTab(1)"  :class="{'login_tab_active': tabIndex == 1}">
                    绑定邮箱
                    <i class="tag"></i>
                </div>
            </div>
            <!--手机-->
            <div style="display: none;" v-show="tabIndex == 0">
                <div class="mar_t30 public_enter_ipt">
                    <div class="f_left">+86</div>
                    <div class="f_left mar_h20">|</div>
                    <input class="f_left transparent_ipt" type="text" placeholder="手机号">
                </div>
                <!--图形验证码-->
                <div class="mar_t25" style="position: relative;">
                    <input class="public_enter_ipt" type="text" placeholder="图形验证码">
                    <span class="verify_post_img"></span>
                </div>
                <div class="mar_t25" style="position: relative;">
                    <input class="public_enter_ipt" type="text" placeholder="短信验证码">
                    <span class="reg_post_msg">发短信</span>
                </div>
                <!--设置密码-->
                <div class="mar_t25">
                    <input class="public_enter_ipt" type="text" placeholder="设置登录密码 (6-20位数字+字母组合)">
                </div>
            </div>
            <!--邮箱-->
            <div style="display: none;" v-show="tabIndex == 1">
                <input class="mar_t30 public_enter_ipt" type="text" placeholder="邮箱号/账号">
                <!--图形验证码-->
                <div class="mar_t25" style="position: relative;">
                    <input class="public_enter_ipt" type="text" placeholder="图形验证码">
                    <span class="verify_post_img"></span>
                </div>
                <div class="mar_t25" style="position: relative;">
                    <input class="public_enter_ipt" type="text" placeholder="短信验证码">
                    <span class="reg_post_msg">发邮箱</span>
                </div>
                <!--设置密码-->
                <div class="mar_t25">
                    <input class="public_enter_ipt" type="text" placeholder="设置登录密码 (6-20位数字+字母组合)">
                </div>
            </div>
            <!--说明-->
            <div class="mar_t20 clear_fix bind_warning_tip">
                <i class="iconfont icon-chaobiao f_left"></i>
                <p class="f_left mar_l5">雷神老用户不能使用第三方登录功能, 请在会员 <br>中心绑定手机后再使用</p>
            </div>
            <!--绑定按钮-->
            <div>
                <div class="mar_t20 public_enter_btn hide">
                    提交
                </div>
                <div class="mar_t20 public_enter_btn">
                    注册并绑定
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./bindingdialog.ts">
</script>