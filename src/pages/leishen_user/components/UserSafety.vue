<template>
    <div class="components_cell">
        <div class="safety_box">
            <div class="web_tab_box">
                <li class="web_tab_cell" :class="{'tab_cell_hover': tabIndex == 0}" @click="changeTabIndex(0)">
                    {{$t("user.b9")}}
                </li>
                <li class="web_tab_cell" :class="{'tab_cell_hover': tabIndex == 1}" @click="changeTabIndex(1)">
                    {{$t("user.b10")}}
                </li>
            </div>
            <div class="web_list_box">
                <ul v-show="tabIndex == 0">
                    <!-- 主账号为手机时显示 -->
                    <li class="web_list_cell" v-if="userinfo.master_account == 0">
                        <div class="flex_row_start" style="width:80%">
                            <p class="safty_font14_black pos_safty_title" style="width:15%">{{$t("user.b21")}}</p>
                            <p class="safty_font14_huise">
                                <span>{{$t("user.b22")}}</span>
                                <span>{{userinfo.mobile}}</span>
                                <span>{{$t("user.b23")}}</span>
                            </p>
                        </div>
                        <div class="flex_sbe web_binding_box" @click="onResetPhoneShow">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("public.share9")}}</a>
                        </div>
                    </li>
                    <li class="web_list_cell" v-if="userinfo.master_account == 0">
                        <div class="flex_row_start" style="width:80%">
                            <p class="safty_font14_black pos_safty_title" style="width:15%">{{$t("user.b24")}}</p>
                            <p class="safty_font14_huise">{{$t("user.b25")}}</p>
                        </div>
                        <div class="flex_sbe web_binding_box" v-if="userinfo.email == ''" @click="onbindEmailShow">
                            <div class="binding_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("public.share8")}}</a>
                        </div>
                        <div class="flex_sbe web_binding_box" v-if="userinfo.email != ''" @click="onUnbindEmail">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("user.b39")}}</a>
                        </div>
                    </li>
                    <!-- 主账号为邮箱时显示 -->
                    <li class="web_list_cell" v-if="userinfo.master_account == 1">
                        <div class="flex_row_start" style="width:80%">
                            <p class="safty_font14_black pos_safty_title" style="width:15%">{{$t("user.b24")}}</p>
                            <p class="safty_font14_huise">
                                <span>{{$t("user.b22")}}</span>
                                <span>{{userinfo.email}}</span>
                                <span>{{$t("user.b23")}}</span>
                            </p>
                        </div>
                        <div class="flex_sbe web_binding_box" @click="onResetEmailShow">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("public.share9")}}</a>
                        </div>
                    </li>
                    <li class="web_list_cell" v-if="userinfo.master_account == 1">
                        <div class="flex_row_start" style="width:80%">
                            <p class="safty_font14_black pos_safty_title" style="width:15%">{{$t("user.b21")}}</p>
                            <p class="safty_font14_huise">{{$t("user.b50")}}</p>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="userinfo.mobile == ''" @click="onbindPhoneShow">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("public.share8")}}</a>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="userinfo.mobile != ''" @click="onUnbindPhone">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("user.b39")}}</a>
                        </div>
                    </li>
                    <li class="web_list_cell">
                        <div class="flex_row_start" style="width:80%">
                            <p class="safty_font14_black pos_safty_title" style="width:15%">{{$t("user.b105")}}</p>
                            <p class="safty_font14_huise" style="width:80%">
                                {{$t("user.b106")}}
                            </p>
                        </div>
                        <div class="flex_sbe web_binding_box">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black" @click="onResetPasswordShow">{{$t("public.share9")}}</a>
                        </div>
                    </li>
                    <li class="web_list_cell">
                        <div class="flex_row_start" style="width:80%">
                            <p class="safty_font14_black pos_safty_title" style="width:15%">{{$t("user.b107")}}</p>
                            <p style="width: 100%;" class="safty_font14_huise">{{$t("user.b134")}}</p>
                        </div>
                        <div class="flex_sbe web_binding_box">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black" @click="onResetSecondPasswordShow">{{userinfo.is_set_admin_pass ? $t("public.share9") : $t("public.share58")}}</a>
                        </div>
                    </li>
                </ul>
                <!-- 第三方账号绑定 -->
                <ul class="flex_sbe_wrap" style="width: 706px" v-show="tabIndex == 1">
                    <li class="satety_cell">
                        <div class="flex_sbe">
                            <img src="../images/bind_wechat.png" alt="" width="45px">
                            <p class="safty_font16_black pos_binding_icon">{{$t("user.b90")}}</p>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="!thirdBindState.wechat"  @click="setBindUrlTYype">
                            <div class="binding_cell pos_safty_bind"></div>
                            <a :href="'https://open.weixin.qq.com/connect/qrconnect?appid=wx99a90917c0647828&redirect_uri=https://webapi.leigod.com/api/auth/open/wx&response_type=code&scope=snsapi_login&state='+webParam.region_code+'_0_'+languageType+'_2'+'&connect_redirect=1#wechat_redirect'" class="safty_font16_black">{{$t("public.share8")}}</a>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="thirdBindState.wechat" @click="thirdUntied(2)">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("user.b39")}}</a>
                        </div>
                    </li>
                    <!-- <li class="satety_cell" v-show="webParam.region_code == 0">
                        <div class="flex_sbe">
                            <img src="../images/bind_facebook.png" alt="" width="45px">
                            <p class="safty_font16_black pos_binding_icon">{{$t("user.b94")}}</p>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="!thirdBindState.facebook" @click="setBindUrlTYype">
                            <div class="binding_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("public.share8")}}</a>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="thirdBindState.facebook" @click="thirdUntied(7)">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("user.b39")}}</a>
                        </div>
                    </li> -->
                    <li class="satety_cell">
                        <div class="flex_sbe">
                            <img src="../images/bind_qq.png" alt="" width="45px">
                            <p class="safty_font16_black pos_binding_icon">{{$t("user.b92")}}</p>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="!thirdBindState.QQ" @click="setBindUrlTYype">
                            <div class="binding_cell pos_safty_bind"></div>
                            <a :href="'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101523719&redirect_uri=https://webapi.leigod.com/api/auth/open/qq&state='+webParam.region_code+'_0_'+languageType+'_2'+'&scope=get_user_info'" class="safty_font16_black">{{$t("public.share8")}}</a>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="thirdBindState.QQ" @click="thirdUntied(3)">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("user.b39")}}</a>
                        </div>
                    </li>
                    <!-- <li class="satety_cell" v-show="webParam.region_code == 0">
                        <div class="flex_sbe">
                            <img src="../images/bind_twitter.png" alt="" width="45px">
                            <p class="safty_font16_black pos_binding_icon">{{$t("user.b95")}}</p>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="!thirdBindState.twitter" @click="setBindUrlTYype">
                            <div class="binding_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("public.share8")}}</a>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="thirdBindState.twitter" @click="thirdUntied(6)">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("user.b39")}}</a>
                        </div>
                    </li> -->
                    <li class="satety_cell">
                        <div class="flex_sbe">
                            <img src="../images/bind_weibo.png" alt="" width="45px">
                            <p class="safty_font16_black pos_binding_icon">{{$t("user.b96")}}</p>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="!thirdBindState.weibo" @click="setBindUrlTYype">
                            <div class="binding_cell pos_safty_bind"></div>
                            <a :href="'https://api.weibo.com/oauth2/authorize?client_id=825933425&response_type=code&redirect_uri=https://webapi.leigod.com/api/auth/open/sina&state='+webParam.region_code+'_0_'+languageType+'_2'" class="safty_font16_black">{{$t("public.share8")}}</a>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="thirdBindState.weibo" @click="thirdUntied(4)">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("user.b39")}}</a>
                        </div>
                    </li>
                    <!-- <li class="satety_cell" v-show="webParam.region_code == 0">
                        <div class="flex_sbe">
                            <img src="../images/bind_google.png" alt="" width="45px">
                            <p class="safty_font16_black pos_binding_icon">{{$t("user.b97")}}</p>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="!thirdBindState.google" @click="setBindUrlTYype">
                            <div class="binding_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("public.share8")}}</a>
                        </div>
                        <div class="flex_sbe web_binding_box" v-show="thirdBindState.google" @click="thirdUntied(5)">
                            <div class="edit_cell pos_safty_bind"></div>
                            <a class="safty_font16_black">{{$t("user.b39")}}</a>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>

        <!-- 修改登录密码弹窗 -->
        <el-dialog :visible.sync="resetPasswordShow" :title="$t('user.b98')" width="30%" @close="onResetPasswordClose"
                    append-to-body>
            <div v-loading="isLoading">
                <div class="dialog_form">
                    <div class="form_input_box" style="margin-top:10px;">
                        <input class="form_input" v-model="verify_code" type="text" name=""
                            :placeholder="$t('public.share4')">
                        <span class="send_code">
                            <span class="send cursor" @click="sendVerifyCode" v-show="verifyCountDownNum <= 0">{{$t("public.share21")}}</span>
                            <span class="send" v-show="verifyCountDownNum > 0">{{verifyCountDownNum}}s</span>
                        </span>
                    </div>
                    <div class="form_input_box" style="margin-top:15px;">
                        <input class="form_input" v-model="newPassword" type="password" name=""
                            :placeholder="$t('public.share40')">
                    </div>
                    <div class="form_input_box" style="margin-top:15px;">
                        <input class="form_input" v-model="confirmPassword" type="password" name=""
                            :placeholder="$t('user.b52')">
                    </div>
                </div>
                <div class="btn_control" style="margin-top: 40px;">
                    <a class="dialog_btn" style="margin-right: 20px" @click="resetPassword">{{$t("public.share9")}}</a>
                </div>
            </div>
        </el-dialog>

        <!-- 创建/修改二级密码 -->
        <el-dialog :visible.sync="resetSecondPasswordShow" :title="userinfo.is_set_admin_pass ? $t('user.b108') : $t('user.b109')" width="30%" @close="onResetPasswordClose"
                append-to-body>
            <div v-loading="isLoading">
                <div class="dialog_form">
                    <div class="form_input_box" style="margin-top:10px;">
                        <input class="form_input" v-model="verify_code" type="text" name=""
                            :placeholder="$t('public.share4')">
                        <span class="send_code">
                            <span class="send cursor" @click="sendVerifyCode" v-show="verifyCountDownNum <= 0">{{$t("public.share21")}}</span>
                            <span class="send" v-show="verifyCountDownNum > 0">{{verifyCountDownNum}}s</span>
                        </span>
                    </div>
                    <div class="form_input_box" style="margin-top:15px;">
                        <input class="form_input" v-model="newSecondPassword" type="password" name=""
                            :placeholder="$t('public.share64')">
                    </div>
                    <div class="form_input_box" style="margin-top:15px;">
                        <input class="form_input" v-model="confirmSecondPassword" type="password" name=""
                            :placeholder="$t('user.b52')">
                    </div>
                </div>
                <div class="btn_control" style="margin-top: 40px;">
                    <a class="dialog_btn" style="margin-right: 20px" @click="onConfirmEidtSecondPw">{{userinfo.is_set_admin_pass ? $t("public.share9") : $t("public.share58")}}</a>
                </div>
            </div>
        </el-dialog>

        <!-- 绑定邮箱 -->
        <el-dialog :visible.sync="bindEmailShow" :title="$t('user.b99')" @close="onbindEmailClose" width="30%" append-to-body>
            <div v-loading="isLoading">
                <div class="dialog_form">
                    <p style="text-align:left;">{{$t("user.b103")}}</p>
                    <p style="text-align:left;">{{$t("user.b104")}}</p>
                    <div class="form_input_box" style="margin-top:15px;">
                        <input class="form_input" v-model="email" type="text" name="" :placeholder="$t('public.share3')">
                    </div>
                    <div class="form_input_box" style="margin-top:10px;" v-show="isimgVerification == 1">
                        <input class="form_input" v-model="imgCaptchaCode" type="text" name=""
                            :placeholder="$t('public.share5')">
                        <span class="verificatioPic" @click="onGetCaptcha">
                            <img v-show="imgCaptchaM.img != null" :src="imgCaptchaM.img" alt="" class="img_filter">
                        </span>
                    </div>
                    <div class="form_input_box" style="margin-top:15px;">
                        <input class="form_input" v-model="emailcode" type="text" name=""
                            :placeholder="$t('public.share4')">
                        <span class="send_code">
                            <span class="send cursor" @click="getEmailcode" v-show="emailCountDownNum <= 0">{{$t("public.share21")}}</span>
                            <span class="send" v-show="emailCountDownNum > 0">{{emailCountDownNum}}</span>
                        </span>
                    </div>
                </div>
                <div class="btn_control" style="margin-top: 40px;">
                    <a class="dialog_btn" style="margin-right: 20px" @click="bindEmail">{{$t("public.share8")}}</a>
                </div>
            </div>
        </el-dialog>

        <!-- 绑定手机 -->
        <el-dialog :visible.sync="bindPhoneShow" :title="$t('user.b100')" @close="onbindPhoneClose" width="30%" append-to-body>
            <div v-loading="isLoading">
                <div class="dialog_form">
                    <p style="text-align:left;">{{$t("user.b113")}}</p>
                    <p style="text-align:left;">{{$t("user.b104")}}</p>
                    <div class="form_input_box flex_row_between" style="margin-top:15px;">
                        <div class="select_box" style="width:40%;border: 1px solid #dcdfe6;">
                            <img :src="country_code.ico" alt="" style="margin-left: 10px;">
                            <el-select @change="onSelectCountryCode" value=""
                                       :placeholder="$t('public.share25')" style="width:20px;margin-left: 10px;">
                                <el-option-group
                                        v-for="group in country_code_list"
                                        :key="group.label"
                                        :label="group.label">
                                    <el-option v-for="(val,index) in group.options" :key="index"
                                               :value="val">
                                        <img :src="val.ico" alt="">
                                        <span style="color:#666;">{{val.name}}</span>
                                    </el-option>
                                </el-option-group>
                            </el-select>
                            <span style="font-size: 14px;">{{'+' + country_code.code}}</span>
                        </div>
                        <div class="form_input_box" style="width:55%">
                            <input v-model="phone" class="form_input" type="text" name=""
                                :placeholder="$t('public.share2')">
                        </div>
                    </div>
                    <div class="form_input_box" style="margin-top:10px;" v-show="isimgVerification == 1">
                        <input class="form_input" v-model="imgCaptchaCode" type="text" name=""
                            :placeholder="$t('public.share5')">
                        <span class="verificatioPic" @click="onGetCaptcha">
                            <img v-show="imgCaptchaM.img != null" :src="imgCaptchaM.img" alt="" class="img_filter">
                        </span>
                    </div>
                    <div class="form_input_box" style="margin-top:15px;">
                        <input class="form_input" v-model="smscode" type="text" name="" :placeholder="$t('public.share4')">
                        <span class="send_code">
                            <span class="send cursor" @click="getSmscode(0)" v-show="smsCountDownNum <= 0">{{$t("public.share6")}}</span>
                            <span v-show="smsCountDownNum <= 0">|</span>
                            <span class="send cursor" v-show="smsCountDownNum <= 0" @click="getSmscode(1)">{{$t("public.share7")}}</span>
                            <span class="send" v-show="smsCountDownNum > 0">{{smsCountDownNum}}</span>
                        </span>
                    </div>
                </div>
                <div class="btn_control" style="margin-top: 40px;">
                    <a class="dialog_btn" style="margin-right: 20px" @click="bindPhone">{{$t("public.share8")}}</a>
                </div>
            </div>
        </el-dialog>

        <!-- 修改手机号 -->
        <el-dialog :visible.sync="resetPhoneShow" :title="$t('user.b101')" @close="onModifycClose" width="35%" append-to-body>
            <div v-loading="isLoading">
                <ul class="flex_row_between">
                    <li class="step_box">
                        <p class="step_count" :class="{'step_count_active': stepCount == 1}">1</p>
                        <p class="step_msg" :class="{'step_msg_active': stepCount == 1}">{{$t("user.b30")}}</p>
                    </li>
                    <li class="step_line"></li>
                    <li class="step_box">
                        <p class="step_count" :class="{'step_count_active': stepCount == 2}">2</p>
                        <p class="step_msg" :class="{'step_msg_active': stepCount == 2}">{{$t("user.b31")}}</p>
                    </li>
                    <li class="step_line"></li>
                    <li class="step_box">
                        <p class="step_count" :class="{'step_count_active': stepCount == 3}">3</p>
                        <p class="step_msg" :class="{'step_msg_active': stepCount == 3}">{{$t("user.b32")}}</p>
                    </li>
                </ul>
                <div class="dialog_form">
                    <p style="text-align:left;padding-top:20px;" v-show="stepCount == 1">{{$t("user.b57")}}{{'+' +
                        userinfo.country_code + userinfo.mobile}}</p>
                    <div class="form_input_box flex_row_between" style="margin-top:15px;" v-show="stepCount == 2">
                        <div class="select_box" style="width:35%;border: 1px solid #dcdfe6;">
                            <img :src="country_code.ico" alt="" style="margin-left: 10px;">
                            <el-select @change="onSelectCountryCode" value=""
                                       :placeholder="$t('public.share25')" style="width:20px;margin-left: 10px;">
                                <el-option-group
                                        v-for="group in country_code_list"
                                        :key="group.label"
                                        :label="group.label">
                                    <el-option v-for="(val,index) in group.options" :key="index"
                                               :value="val">
                                        <img :src="val.ico" alt="">
                                        <span style="color:#666;">{{val.name}}</span>
                                    </el-option>
                                </el-option-group>
                            </el-select>
                            <span style="font-size: 14px;">{{'+' + country_code.code}}</span>
                        </div>
                        <div class="form_input_box" style="width:60%">
                            <input v-model="phone" class="form_input" type="text" name="" :placeholder="$t('user.b55')">
                        </div>
                    </div>
                    <div class="form_input_box" style="margin-top:10px;" v-show="stepCount == 1">
                        <input v-model="verify_code" class="form_input" type="text" name=""
                            :placeholder="$t('public.share4')">
                        <span class="send_code">
                            <span class="send cursor" @click="sendVerifyCode" v-show="verifyCountDownNum <= 0">{{$t("public.share21")}}</span>
                            <span class="send" v-show="verifyCountDownNum > 0">{{verifyCountDownNum}}</span>
                        </span>
                    </div>
                    <div class="form_input_box" style="margin-top:15px;" v-show="isimgVerification == 1 && stepCount == 2">
                        <input class="form_input" type="text" v-model="imgCaptchaCode" name=""
                            :placeholder="$t('public.share5')">
                        <span class="verificatioPic" @click="onGetCaptcha">
                            <img :src="imgCaptchaM.img" alt="" v-show="imgCaptchaM.img != null" class="img_filter">
                        </span>
                    </div>
                    <div class="form_input_box" style="margin-top:10px;" v-show="stepCount == 2">
                        <input v-model="smscode" class="form_input" type="text" name="" :placeholder="$t('public.share4')">
                        <span class="send_code">
                            <span class="send cursor" @click="getSmscode(0)" v-show="smsCountDownNum <= 0">{{$t("public.share6")}}</span>
                            <span v-show="smsCountDownNum <= 0">|</span>
                            <span class="send cursor" v-show="smsCountDownNum <= 0" @click="getSmscode(1)">{{$t("public.share7")}}</span>
                            <span class="send" v-show="smsCountDownNum > 0">{{smsCountDownNum}}</span>
                        </span>
                    </div>
                    <div v-show="stepCount == 3">
                        <div class="dialog_tip_img" style="width:60px;">
                            <img class="img_filter" src="../images/success_tip.png" alt="">
                        </div>
                        <p class="dialog_msg">{{$t("user.b33")}}</p>
                        <p class="dialog_msg">{{$t("user.b34")}}</p>
                    </div>
                </div>
                <div class="btn_control">
                    <a class="dialog_btn" v-show="stepCount == 1" @click="verifyCodeValidate">{{$t("user.b58")}}</a>
                    <a class="dialog_btn" v-show="stepCount == 2" style="margin-right:20px;" @click="goPreviousStep">{{$t("user.b59")}}</a>
                    <a class="dialog_btn" v-show="stepCount == 2" @click="modifyPhone">{{$t("user.b60")}}</a>
                    <a class="dialog_btn" v-show="stepCount == 3" @click="goLogin">{{$t("public.share20")}}</a>
                </div>
                </div>
        </el-dialog>

        <!-- 修改邮箱 -->
        <el-dialog :visible.sync="resetEmailShow" :title="$t('user.b102')" width="35%" @close="onModifycClose" append-to-body>
            <div v-loading="isLoading">
                <ul class="flex_row_between">
                    <li class="step_box">
                        <p class="step_count" :class="{'step_count_active': stepCount == 1}">1</p>
                        <p class="step_msg" :class="{'step_msg_active': stepCount == 1}">{{$t("user.b53")}}</p>
                    </li>
                    <li class="step_line"></li>
                    <li class="step_box">
                        <p class="step_count" :class="{'step_count_active': stepCount == 2}">2</p>
                        <p class="step_msg" :class="{'step_msg_active': stepCount == 2}">{{$t("user.b54")}}</p>
                    </li>
                    <li class="step_line"></li>
                    <li class="step_box">
                        <p class="step_count" :class="{'step_count_active': stepCount == 3}">3</p>
                        <p class="step_msg" :class="{'step_msg_active': stepCount == 3}">{{$t("user.b32")}}</p>
                    </li>
                </ul>
                <div class="dialog_form">
                    <p style="text-align:left;padding-top:20px;" v-show="stepCount == 1">
                        {{$t("user.b57")}}{{userinfo.email}}</p>
                    <div class="form_input_box flex_row_between" style="margin-top:15px;" v-show="stepCount == 2">
                        <div class="form_input_box">
                            <input v-model="email" class="form_input" type="text" name="" :placeholder="$t('user.b56')">
                        </div>
                    </div>
                    <div class="form_input_box" style="margin-top:10px;" v-show="stepCount == 1">
                        <input class="form_input" v-model="verify_code" type="text" name=""
                            :placeholder="$t('public.share4')">
                        <span class="send_code">
                            <span class="send cursor" @click="sendVerifyCode" v-show="verifyCountDownNum <= 0">{{$t("public.share21")}}</span>
                            <span class="send" v-show="verifyCountDownNum > 0">{{verifyCountDownNum}}</span>
                        </span>
                    </div>
                    <div class="form_input_box" style="margin-top:15px;" v-show="isimgVerification == 1 && stepCount == 2">
                        <input class="form_input" v-model="imgCaptchaCode" type="text" name=""
                            :placeholder="$t('public.share5')">
                        <span class="verificatioPic" @click="onGetCaptcha">
                            <img :src="imgCaptchaM.img" alt="" v-show="imgCaptchaM.img != null" class="img_filter">
                        </span>
                    </div>
                    <div class="form_input_box" style="margin-top:10px;" v-show="stepCount == 2">
                        <input v-model="emailcode" class="form_input" type="text" name=""
                            :placeholder="$t('public.share4')">
                        <span class="send_code">
                            <span class="send cursor" @click="getEmailcode" v-show="emailCountDownNum <= 0">{{$t("public.share21")}}</span>
                            <span class="send" v-show="emailCountDownNum > 0">{{emailCountDownNum}}</span>
                        </span>
                    </div>
                    <div v-show="stepCount == 3">
                        <div class="dialog_tip_img" style="width:60px;">
                            <img class="img_filter" src="../images/success_tip.png" alt="">
                        </div>
                        <p class="dialog_msg">{{$t("user.b33")}}</p>
                        <p class="dialog_msg">{{$t("user.b34")}}</p>
                    </div>
                </div>
                <div class="btn_control">
                    <a class="dialog_btn" v-show="stepCount == 1" @click="verifyCodeValidate">{{$t("user.b58")}}</a>
                    <a class="dialog_btn" v-show="stepCount == 2" style="margin-right:20px;" @click="goPreviousStep">{{$t("user.b59")}}</a>
                    <a class="dialog_btn" v-show="stepCount == 2" @click="modifyEmail">{{$t("user.b60")}}</a>
                    <a class="dialog_btn" v-show="stepCount == 3" @click="goLogin">{{$t("public.share20")}}</a>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator";
    import {BindingProxy} from '@/ts/proxy/BindingProxy';
    import {Message, Dialog, Select, Option, OptionGroup} from 'element-ui';
    import {UserInfo, NewResetpwdRequestModel, SetSecondPwdRequestModel } from '@/ts/models/UserModel';
    import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
    import Util from '@/ts/utils/Util';
    import CheckUtil from '@/ts/utils/CheckUtil';
    import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
    import HttpClient from '@/ts/net/HttpClient';
    import {Md5} from "ts-md5";
    import GlobalConfig from '@/pages/leishen_user/global.config';
    import JumpWebUtil from '@/ts/utils/JumpWebUtil';
    import AppParamModel from '@/ts/models/AppModel';

    @Component({
        components: {
            'el-dialog': Dialog,
            'el-select': Select,
            'el-option': Option,
            'el-option-group': OptionGroup
        }
    })
    export default class UserSafety extends BindingProxy {
        @Prop() public userinfo!: UserInfo;

        public tabIndex: number = 0;//tab索引
        public resetPasswordShow: boolean = false;//修改登录密码弹窗是否显示
        public resetSecondPasswordShow: boolean = false;//修改二级密码弹窗是否显示
        public bindEmailShow: boolean = false;//绑定邮箱弹窗是否显示
        public bindPhoneShow: boolean = false;//绑定手机弹窗是否显示
        public resetPhoneShow: boolean = false;//修改手机号弹窗是否显示
        public resetEmailShow: boolean = false;//修改邮箱号弹窗是否显示
        public newPassword: string = '';//用户新密码
        public confirmPassword: string = '';//用户确认密码
        public newSecondPassword: string = '';//用户新二级密码
        public confirmSecondPassword: string = '';//用户确认二级密码
        public stepCount: number = 1;//修改账号步骤
        public webParam = AppParamModel.getInstace(); // 浏览器参数
        public languageType: string = '';

        public changeTabIndex(index: number) {
            this.tabIndex = index;
        }

        /**
         * 初始化
         */
        public created() {
            this.setBaseUrl(GlobalConfig.getBaseUrl());
            this.getAreaCodeList();
            this.getAreaCodeInfoList(GlobalConfig.getWebBaseUrl());
            this.languageType = Util.getLanguageType(this.webParam.language);
            this.getThirdBindState();
        }

        /**
         * 打开绑定账号弹窗
         */
        public bindAccountShow(){
            let region_code = LocalStorageUtil.getRegionCodes();
            if(region_code == 1 && this.userinfo.mobile == ''){
                this.onbindPhoneShow();
            }else if(region_code == 0 && this.userinfo.email == ''){
                this.onbindEmailShow();
            }
        }

        /**
         * 改变手机区号
         */
        public onSelectCountryCode(value) {
            this.country_code = value;
            this.countryCode = value.code;
        }

        /**
         * 前往登录
         */
        public goLogin(){
            let param = window.location.search;
            JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_LOGIN, param);
        }

        /**
         * 打开修改密码弹窗
         */
        public onResetPasswordShow() {
            this.resetPasswordShow = true;
        }

        /**
         * 打开修二级改密码弹窗
         */
        public onResetSecondPasswordShow() {
            this.resetSecondPasswordShow = true;
        }

        /**
         * 打开绑定邮箱弹窗
         */
        public onbindEmailShow() {
            this.onChangeRegisterType(6);
            this.bindEmailShow = true;
        }

        /**
         * 打开绑定手机弹窗
         */
        public onbindPhoneShow() {
            this.onChangeRegisterType(7);
            this.bindPhoneShow = true;
        }

        /**
         * 打开修改邮箱弹窗
         */
        public onResetEmailShow() {
            this.resetEmailShow = true;
        }

        /**
         * 打开修改手机弹窗
         */
        public onResetPhoneShow() {
            this.resetPhoneShow = true;
        }

        /**
         * 发送验证码
         */
        public sendVerifyCode() {
            this.$emit('sendverifycode');
        }

        /**
         * 发送验证码成功
         */
        public sendVerifySuccessBack(data: any) {
            this.verify_key = data.data.verify_key;
            let msg = "";
            this.newPassword = '';
            this.confirmPassword = '';
            if (data.data.code_type == 1) {
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS);
            } else if (data.data.code_type == 2) {
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL);
            }
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
                message: msg,
                type: "success"
            });
            //倒计时
            this.verifyCountDownNum = 60;
            const sefl = this;
            Util.countDown(this.verifyCountDownNum, 1, (n: number) => {
                sefl.verifyCountDownNum = n;
            });
        }

        /**
         * 获取邮箱验证码
         */
        public getEmailcode() {
            //验证邮箱格式
            if (!CheckUtil.checkEmail(this.email)) {
                if (this.email == "") {
                    this.$notify({
                        title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                        message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY),
                        type: "warning"
                    });
                    return;
                }
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR),
                    type: "warning"
                });
                return;
            }
            this.onGetEmailcode(2);
        }

        /**
         * 获取邮箱验证码成功
         */
        public onGetEmailcodeSuccess() {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL),
                type: "success"
            });
            //倒计时
            this.emailCountDownNum = 60;
            const sefl = this;
            Util.countDown(this.emailCountDownNum, 1, (n: number) => {
                sefl.emailCountDownNum = n;
            });
        }

        /**
         * 获取邮箱验证码失败
         */
        public onGetEmailcodeFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 获取手机验证码
         */
        public getSmscode(type: number) {
            //验手机格式
            if (this.countryCode == '86') {
                if (!CheckUtil.checkPhone(this.phone)) {
                    if (this.phone == "") {
                        this.$notify({
                            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                            message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY),
                            type: "warning"
                        });
                        return;
                    }
                    this.$notify({
                        title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                        message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR),
                        type: "warning"
                    });
                    return;
                }
            }

            this.onGetSmscode(type, 2);
        }

        /**
         * 获取短信验证码成功
         */
        public onGetSmscodeSuccess() {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS),
                type: "success"
            });
            //倒计时
            this.smsCountDownNum = 60;
            const sefl = this;
            Util.countDown(this.smsCountDownNum, 1, (n: number) => {
                sefl.smsCountDownNum = n;
            });
        }

        /**
         * 获取短信验证码失败
         */
        public onGetSmscodeFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 关闭修改密码弹窗
         */
        public onResetPasswordClose() {
            this.resetPasswordShow = false;
            this.newPassword = "";
            this.confirmPassword = "";
        }

        /**
         * 关闭修改密码弹窗
         */
        public onSecondResetPasswordClose() {
            this.resetSecondPasswordShow = false;
            this.newSecondPassword = "";
            this.confirmSecondPassword = "";
        }

        /**
         * 关闭绑定邮箱弹窗
         */
        public onbindEmailClose() {
            this.bindEmailShow = false;
            this.email = "";
            this.emailcode = "";
        }

        /**
         * 关闭绑定手机弹窗
         */
        public onbindPhoneClose() {
            this.bindPhoneShow = false;
            this.phone = "";
            this.smscode = "";
        }

        /**
         *
         */
        public onModifycClose() {
            this.resetPhoneShow = false;
            this.resetEmailShow = false;
            this.phone = '';
            this.email = '';
            this.imgCaptchaCode = '';
            this.smscode = '';
            this.emailcode = '';
            this.verify_code = '';
            this.stepCount = 1;
        }


        /**
         * 修改登录密码
         */
        public resetPassword() {
            let flag = true;
            let tipMsg = '';
            //验证验证码格式
            if (!CheckUtil.checkSmscode(this.verify_code) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMPTY_ERROR);
                flag = false;
                if (this.newPassword == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMPTY_ERROR);
                    flag = false;
                }
            }
            //验证新密码
            if (!CheckUtil.checkPwd(this.newPassword) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
                flag = false;
                if (this.newPassword == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                    flag = false;
                }
            }
            //验证确认密码
            if (!CheckUtil.checkPwdTwo(this.confirmPassword, this.newPassword) && flag) {
                tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
                flag = false;
                if (this.confirmPassword == "") {
                    tipMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_EMPTY);
                    flag = false;
                }
            }
            if (!flag) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: tipMsg,
                    type: "warning"
                });
                return;
            }
            const token = LocalStorageUtil.getUserToken().account_token;
            let param = new NewResetpwdRequestModel();
            param.account_token = token;
            param.verify_key = this.verify_key;
            param.verify_code = this.verify_code;
            param.new_password = Md5.hashStr(this.newPassword).toString();
            param.new_password_confirmation = Md5.hashStr(
                this.confirmPassword
            ).toString();

            this.$emit('resetpassword', param);
        }

        /**
         * 修改密码成功结果ui处理
         */
        public resetPwdSuccess(data: any) {
            this.newPassword = "";
            this.confirmPassword = "";
            this.verify_code = "";
            this.resetPasswordShow = false;
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_RESETPWD_SUCCESS
                ),
                type: "success"
            });
        }

        /**
         * 修改密码失败结果ui处理
         */
        public resetPwdFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 确定修改二级密码
         */
        public onConfirmEidtSecondPw() {
            // 判断
            let isNotif = false;
            let msg = '';
            if(!isNotif && this.verify_code == '') {
                isNotif = true;
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMPTY_ERROR);
            }
            if(!isNotif && (!CheckUtil.checkSecondPwd(this.newSecondPassword) || !CheckUtil.checkSecondPwd(this.confirmSecondPassword))) {
                isNotif = true;
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
            }
            if(!isNotif && this.newSecondPassword != this.confirmSecondPassword) {
                isNotif = true;
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORDTWO_ERROR);
            }
            if(isNotif) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: msg,
                    type: "warning"
                });
                return;
            }
            const token = LocalStorageUtil.getUserToken().account_token;
            let param = new SetSecondPwdRequestModel();
            param.account_token = token;
            param.verify_code = this.verify_code;
            param.verify_key = this.verify_key;
            param.new_password = this.newSecondPassword;
            param.new_password_confirmation = this.confirmSecondPassword;
            this.$emit("setsecondpwd", param);
        }

        /**
         * 修改二级密码成功
         */
        public setSecondPwdSuccessBack(data: any) {
            this.newSecondPassword = "";
            this.confirmSecondPassword = "";
            this.verify_code = "";
            this.resetSecondPasswordShow = false;
            if(this.userinfo.is_set_admin_pass) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: TipsMsgUtil.getTipsMsg(
                        TipsMsgUtil.KEY_NOTIF_RESETPWD_SET_SUCCESS
                    ),
                    type: "success"
                });
            }else {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: TipsMsgUtil.getTipsMsg(
                        TipsMsgUtil.KEY_NOTIF_RESETPWD_SUCCESS
                    ),
                    type: "success"
                });
            }
        }

        /**
         * 修改二级密码失败
         */
        public setSecondPwdFaildBack(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 绑定邮箱成功ui逻辑
         */
        public bindEmailSuccess() {
            this.userinfo.email = this.email;
            this.email = '';
            this.emailcode = '';
            this.imgCaptchaCode = '';
            this.bindEmailShow = false;
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_EMAIL),
                type: "success"
            });
            this.$emit('refreshuserinfo');
        }

        /**
         * 绑定邮箱失败ui逻辑
         * todo 此方法需在UI逻辑文件中重写
         */
        public bindEmailFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 绑定手机成功ui逻辑
         */
        public bindPhoneSuccess() {
            this.userinfo.mobile = this.phone;
            this.phone = '';
            this.smscode = '';
            this.imgCaptchaCode = '';
            this.bindPhoneShow = false;
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_MOBILE),
                type: "success"
            });
            this.$emit('refreshuserinfo');
        }

        /**
         * 绑定手机失败ui逻辑
         */
        public bindPhoneFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 验证验证码成功ui逻辑
         * todo 此方法需在UI逻辑文件中重写
         */
        public verifyCodeValidateSuccess() {
            this.stepCount = 2;
            if (this.userinfo.master_account == 0) {
                this.onChangeRegisterType(0)
            } else if (this.userinfo.master_account == 1) {
                this.onChangeRegisterType(1)
            }

        }

        /**
         * 验证验证码失败ui逻辑
         * todo 此方法需在UI逻辑文件中重写
         */
        public verifyCodeValidateFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 返回上一步
         */
        public goPreviousStep() {
            this.stepCount = 1;
        }

        /**
         * 解绑邮箱
         */
        public onUnbindEmail (){
            this.$confirm(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_REMOVEBIND_NOTIFY), '提示', {
                confirmButtonText: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_YES),
                cancelButtonText: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_NO)
            }).then(() => {
                this.unbindEmail();
            }).catch(() => {

            });
        }

        /**
         * 解绑邮箱成功ui逻辑
         */
        public unbindEmailSuccess() {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
                message: '邮箱解绑成功!!',
                type: "success"
            });
            this.$emit('refreshuserinfo');
        }

        /**
         * 解绑邮箱失败ui逻辑
         */
        public unbindEmailFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 解绑手机号
         */
        public onUnbindPhone (){
            this.$confirm(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_REMOVEBIND_NOTIFY), '提示', {
                confirmButtonText: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_YES),
                cancelButtonText: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_NO)
            }).then(() => {
                this.unbindPhone();
            }).catch(() => {

            });
        }

        /**
         * 解绑手机号成功ui逻辑
         */
        public unbindPhoneSuccess() {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
                message: '手机号解绑成功!!',
                type: "success"
            });
            this.$emit('refreshuserinfo');
        }

        /**
         * 解绑手机号失败ui逻辑
         */
        public unbindPhoneFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 修改邮箱账号
         */
        public modifyEmail() {
            // 判断
            let isNotif = false;
            let msg = '';
            if(!isNotif && !CheckUtil.checkEmail(this.email)) {
                isNotif = true;
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR);
                if(this.email == ''){
                    msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY);
                }
            }
            if(!isNotif && !CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && this.isimgVerification == 1) {
                isNotif = true;
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
                if(this.imgCaptchaCode == ''){
                    msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
                }
            }
            if(!isNotif && !CheckUtil.checkMailcode(this.emailcode)) {
                isNotif = true;
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_ERROR);
                if(this.emailcode == ''){
                    msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAILCODE_EMPTY);
                }
            }
            if(isNotif) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: msg,
                    type: "warning"
                });
                return;
            }
            this.onModifyEmail();
        }

        /**
         * 修改邮箱账号成功ui逻辑
         * todo 此方法需在UI逻辑文件中重写
         */
        public onModifyEmailSuccess() {
            this.stepCount = 3;
        }

        /**
         * 修改邮箱账号失败ui逻辑
         * todo 此方法需在UI逻辑文件中重写
         */
        public onModifyEmailFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 修改手机账号
         */
        public modifyPhone() {
            // 判断
            let isNotif = false;
            let msg = '';
            if(!isNotif && !CheckUtil.checkPhone(this.phone)) {
                isNotif = true;
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR);
                if(this.phone == ''){
                    msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY);
                }
            }
            if(!isNotif && !CheckUtil.checkimgVerificatioCode(this.imgCaptchaCode) && this.isimgVerification == 1) {
                isNotif = true;
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_ERROR);
                if(this.imgCaptchaCode == ''){
                    msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGCAPTCHACODE_EMPTY);
                }
            }
            if(!isNotif && !CheckUtil.checkSmscode(this.smscode)) {
                isNotif = true;
                msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_ERROR);
                if(this.smscode == ''){
                    msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMSCODE_EMPTY);
                }
            }
            if(isNotif) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: msg,
                    type: "warning"
                });
                return;
            }
            this.onModifyPhone();
        }

        /**
         * 修改手机账号成功ui逻辑
         * todo 此方法需在UI逻辑文件中重写
         */
        public onModifyPhoneSuccess() {
            this.stepCount = 3;
        }

        /**
         * 修改手机账号失败ui逻辑
         * todo 此方法需在UI逻辑文件中重写
         */
        public onModifyPhoneFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 解绑第三方账号
         */
        public thirdUntied(type: number){
            this.$confirm(TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_REMOVEBIND_NOTIFY), TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF), {
                confirmButtonText: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_YES),
                cancelButtonText: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_NO)
            }).then(() => {
                this.onThirdUntied(type);
            }).catch(() => {

            });

        }

        /**
         * 用户解绑第三方账号成功
         */
        public onThirdUntiedSuccess(type) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_WEIXIN_REMOVEBING_SUCCEED),
                type: "success"
            });
            switch (type){
                    case 2:
                        this.thirdBindState.wechat = false;
                        break;
                    case 3:
                        this.thirdBindState.QQ = false;
                        break;
                    case 4:
                        this.thirdBindState.weibo = false;
                        break;
                    case 5:
                        this.thirdBindState.google = false;
                        break;
                    case 6:
                        this.thirdBindState.twitter = false;
                        break;
                    case 7:
                        this.thirdBindState.facebook = false;
                    default:
                        break;
                }
        }

        /**
         * 用户解绑第三方账号失败
         */
        public onThirdUntiedFaild(data: any) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: data.msg,
                type: "warning"
            });
        }

        /**
         * 设置第三方绑定来源类型
         */
        public setBindUrlTYype (){
            localStorage.setItem(LocalStorageUtil.STORAGES_THIRDBIND_URL_TYPE,'0')
        }
    }
</script>
