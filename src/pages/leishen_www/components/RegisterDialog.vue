<template>
    <!--注册-->
    <div class="center_auto">
        <div class="dialog_box">
            <div class="clear_fix login_tab_box">
                <div class="f_left login_tab_item" @click="changeResignType(0)"
                     :class="{'login_tab_active': resignType == 0}">
                    <span class="txt">手机注册</span>
                    <i class="tag"></i>
                </div>
                <div class="f_right login_tab_item" @click="changeResignType(1)"
                     :class="{'login_tab_active': resignType == 1}">
                    <span class="txt">邮箱注册</span>
                    <i class="tag"></i>
                </div>
            </div>
            <!--手机-->
            <div v-show="resignType == 0">
                <div class="mar_t30 public_enter_ipt">
                    <div class="f_left select_box">
                        <img :src="country_code.ico" alt="">
                        <el-select @change="onSelectCountryCode" value="" placeholder="">
                            <el-option-group v-for="group in country_code_list" :key="group.label" :label="group.label">
                                <el-option v-for="(val,index) in group.options" :key="index" :value="val">
                                    <img :src="val.ico" alt="">
                                    <span style="color:#666;">{{val.name}}</span>
                                </el-option>
                            </el-option-group>
                        </el-select>
                        <span class="countryCode_cell">{{country_code.code}}</span>
                    </div>
                    <div class="f_left">|</div>
                    <input class="f_left transparent_ipt" v-model="phone" type="text" placeholder="手机号">
                </div>
                <!--图形验证码-->
                <div class="mar_t25" style="position: relative;" v-show="isimgVerification">
                    <input class="public_enter_ipt" v-model="imgCaptchaCode" type="text" placeholder="图形验证码">
                    <div class="verify_post_img" @click="getCaptcha">
                        <img :src="imgCaptchaM.img" class="img_filter" alt="">
                    </div>
                </div>
                <!--短信验证码-->
                <div class="mar_t25" style="position: relative;">
                    <input class="public_enter_ipt" v-model="smscode" type="text" placeholder="短信验证码">
                    <span class="reg_post_msg" @click="onSmsCode" style="display: none;" v-show="smsCountDownNum <= 0">发短信</span>
                    <span style="display: none;" class="reg_post_msg" v-show="smsCountDownNum > 0">{{smsCountDownNum}}s</span>
                </div>
                <!--密码输入-->
                <input class="mar_t25 public_enter_ipt" v-model="phonePassword" type="password" placeholder="密码 (6-20位数字+字母组合)">
                <input class="mar_t25 public_enter_ipt" v-model="phonePasswordTwo" type="password" placeholder="确认密码">
            </div>
            <!--邮箱-->
            <div v-show="resignType == 1">
                <input class="mar_t30 public_enter_ipt" v-model="email" type="text" placeholder="邮箱号">
                <!--图形验证码-->
                <div class="mar_t25" style="position: relative;" v-show="isimgVerification">
                    <input class="public_enter_ipt" v-model="imgCaptchaCode" type="text" placeholder="图形验证码">
                    <div class="verify_post_img" @click="getCaptcha">
                        <img :src="imgCaptchaM.img" class="img_filter" alt="">
                    </div>
                </div>
                <!--邮箱验证码-->
                <div class="mar_t25" style="position: relative;">
                    <input class="public_enter_ipt" type="text" v-model="emailcode" placeholder="邮箱验证码">
                    <span style="display: none;" class="reg_post_msg" @click="onEmailCode" v-show="emailCountDownNum <= 0">发邮件</span>
                    <span style="display: none;" class="reg_post_msg" v-show="emailCountDownNum > 0">{{emailCountDownNum}}s</span>
                </div>
                <!--密码-->
                <input class="mar_t25 public_enter_ipt" v-model="emailPassword" type="password" placeholder="密码 (6-20位数字+字母组合)">
                <input class="mar_t25 public_enter_ipt" v-model="emailPasswordTwo" type="password" placeholder="确认密码">
            </div>
            <!--推荐码-->
            <div class="mar_t30 clear_fix">
                <label style="height: 40px;" for="" class="f_left mar_t10" @click="checkReferCode = !checkReferCode">
                    <div class="check_is_rem f_left" :class="{'is_rem_pwd': checkReferCode}">
                        <input class="vertical_middle mar_r5" type="checkbox" style="opacity: 0;">
                    </div>
                    <div class="f_left mar_l5 cursor">推荐码(选填)</div>
                </label>
                <input class="f_right public_enter_ipt" style="width: 180px;display: none;" v-show="checkReferCode" v-model="referCode" type="text" placeholder="请输入">
            </div>
            <!--服务条款-->
            <div class="mar_t30">
                <label class="clear_fix mar_t10" for="" @click="agreementChceked = !agreementChceked">
                    <div class="check_is_rem f_left" :class="{'is_rem_pwd': agreementChceked}">
                        <input class="vertical_middle mar_r5" v-model="agreementChceked" type="checkbox" style="opacity: 0;">
                    </div>
                    <div class="f_left mar_l5 cursor">我已阅读并同意</div>
                    <a class="f_left">《会员服务条款》</a>
                </label>
            </div>
            <div class="mar_t20 public_enter_btn" :class="{notAgreementChceked:!agreementChceked}" @click="clickRegister">
                立即注册
            </div>
            <div class="mar_t15 text_center clear_fix">
                <a @click="goLogin">已有雷神账号? 去登录</a>
            </div>
            <i class="iconfont icon-cha"></i>
        </div>
    </div>
</template>

<script src="./registerdialog.ts">
</script>
