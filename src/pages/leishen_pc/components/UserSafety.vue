<template>
    <div>
        <div class="safety">
            <!--手机主账号-->
            <div class="phone_account" v-if="userinfo.master_account == 0">
                <!--手机账号-->
                <div class="safety_item flex_row_between">
                    <div class="safety_title">{{$t("user.b21")}}</div>
                    <p class="safety_msg">
                        {{$t("user.b22")}}
                        <span>{{userinfo.mobile}}</span>{{$t("user.b23")}}</p>
                    <div class="safety_btn">
                        <a class="reset_bind flex_row_center" @click="onResetPhoneShow">
                            <i class="reset_icon"></i>
                            <span>{{$t("public.share9")}}</span>
                        </a>
                    </div>
                </div>
                <!--邮箱账号-->
                <div class="safety_item flex_row_between">
                    <div class="safety_title">{{$t("user.b24")}}</div>
                    <p class="safety_msg">{{$t("user.b25")}}</p>
                    <div class="safety_btn">
                        <a class="reset_bind flex_row_center" v-show="userinfo.email == ''" @click="onbindEmailShow">
                            <i class="bind_icon"></i>
                            <span>{{$t("public.share8")}}</span>
                        </a>
                        <a class="reset_bind flex_row_center" v-show="userinfo.email != ''" @click="unbindEmail">
                            <i class="unbind_icon"></i>
                            <span>{{$t("user.b39")}}</span>
                        </a>
                    </div>
                </div>
            </div>
            <!--邮箱主账号-->
            <div class="email_account" v-if="userinfo.master_account == 1">
                <div class="safety_item flex_row_between">
                    <div class="safety_title">{{$t("user.b24")}}</div>
                    <p class="safety_msg">
                        {{$t("user.b22")}}
                        <span>{{userinfo.email}}</span>
                        {{$t("user.b23")}}</p>
                    <div class="safety_btn">
                        <a class="reset_bind" @click="onResetEmailShow">
                            <i class="reset_icon"></i>
                            <span>{{$t("public.share9")}}</span>
                        </a>
                    </div>
                </div>
                <div class="safety_item flex_row_between">
                    <div class="safety_title">{{$t("user.b21")}}</div>
                    <p class="safety_msg">{{$t("user.b50")}}</p>
                    <div class="safety_btn">
                        <a class="reset_bind" v-show="userinfo.mobile == ''" @click="onbindPhoneShow">
                            <i class="bind_icon"></i>
                            <span>{{$t("public.share8")}}</span>
                        </a>
                        <a class="reset_bind" v-show="userinfo.mobile != ''" @click="unbindPhone">
                            <i class="unbind_icon"></i>
                            <span>{{$t("user.b39")}}</span>
                        </a>
                    </div>
                </div>
            </div>
            <!--登录密码部分-->
            <div class="safety_item flex_row_between">
                <div class="safety_title">{{$t("user.b26")}}</div>
                <p class="safety_msg">{{$t("user.b27")}}</p>
                <div class="safety_btn">
                    <a class="reset_bind flex_row_center" @click="onResetPasswordShow">
                        <i class="reset_icon"></i>
                        <span>{{$t("public.share9")}}</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="btn_control">
            <a class="white_btn" @click="closeService">{{$t("public.share13")}}</a>
        </div>

        <!-- 修改登录密码弹窗 -->
        <el-dialog :visible.sync="resetPasswordShow" :title="$t('user.b98')" @close="onResetPasswordClose"
                   append-to-body>
            <div class="dialog_form">
                <div class="form_input_box" style="margin-top:0.1rem;">
                    <input class="form_input" v-model="verify_code" type="text" name=""
                           :placeholder="$t('public.share4')">
                    <span class="send_code">
                        <!--发送验证码-->
                        <span class="send cursor" @click="sendVerifyCode" v-show="verifyCountDownNum <= 0">{{$t("public.share21")}}</span>
                        <span class="send" v-show="verifyCountDownNum > 0">{{verifyCountDownNum}}</span>
                    </span>
                </div>
                <div class="form_input_box" style="margin-top:0.15rem;">
                    <input class="form_input" v-model="newPassword" type="password" name=""
                           :placeholder="$t('user.b51')">
                </div>
                <div class="form_input_box" style="margin-top:0.15rem;">
                    <input class="form_input" v-model="confirmPassword" type="password" name=""
                           :placeholder="$t('user.b52')">
                </div>
            </div>
            <div class="btn_control" style="margin-top: 0.4rem;">
                <a class="dialog_btn" style="margin-right: 0.2rem" @click="resetPassword">{{$t("public.share9")}}</a>
            </div>
        </el-dialog>

        <!-- 绑定邮箱 -->
        <el-dialog :visible.sync="bindEmailShow" :title="$t('user.b99')" @close="onbindEmailClose" width="60%" append-to-body>
            <div class="dialog_form">
                <div class="form_input_box" style="margin-top:0.15rem;">
                    <input class="form_input" v-model="email" type="text" name="" :placeholder="$t('public.share3')">
                </div>
                <div class="form_input_box" style="margin-top:0.1rem;" v-show="isimgVerification == 1">
                    <input class="form_input" v-model="imgCaptchaCode" type="text" name=""
                           :placeholder="$t('public.share5')">
                    <span class="verificatioPic" @click="onGetCaptcha">
                        <img v-show="imgCaptchaM.img != null" :src="imgCaptchaM.img" alt="" class="img_filter">
                    </span>
                </div>
                <div class="form_input_box" style="margin-top:0.15rem;">
                    <input class="form_input" v-model="emailcode" type="text" name=""
                           :placeholder="$t('public.share4')">
                    <span class="send_code">
                        <span class="send cursor" @click="getEmailcode" v-show="emailCountDownNum <= 0">{{$t("public.share21")}}</span>
                        <span class="send" v-show="emailCountDownNum > 0">{{emailCountDownNum}}</span>
                    </span>
                </div>
            </div>
            <div class="btn_control" style="margin-top: 0.4rem;">
                <a class="dialog_btn" style="margin-right: 0.2rem" @click="bindEmail">{{$t("public.share8")}}</a>
            </div>
        </el-dialog>

        <!-- 绑定手机 -->
        <el-dialog :visible.sync="bindPhoneShow" :title="$t('user.b100')" @close="onbindPhoneClose" width="60%" append-to-body>
            <div class="dialog_form">
                <div class="form_input_box flex_row_between" style="margin-top:0.15rem;">
                    <div class="select_box" style="width:40%;border: 1px solid #dcdfe6;">
                        <img :src="country_code.ico" alt="" style="margin-left: .1rem;">
                        <el-select @change="onSelectCountryCode" value=""
                                   :placeholder="$t('public.share25')" style="width:.2rem;margin-left: .1rem;vertical-align: middle;">
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
                        <span style="font-size: 14px;display: inline-block;width: 30%;vertical-align: middle;">{{'+' + country_code.code}}</span>
                    </div>
                    <div class="form_input_box" style="width:55%">
                        <input v-model="phone" class="form_input" type="text" name=""
                               :placeholder="$t('public.share2')">
                    </div>
                </div>
                <div class="form_input_box" style="margin-top:0.1rem;" v-show="isimgVerification == 1">
                    <input class="form_input" v-model="imgCaptchaCode" type="text" name=""
                           :placeholder="$t('public.share5')">
                    <span class="verificatioPic" @click="onGetCaptcha">
                        <img v-show="imgCaptchaM.img != null" :src="imgCaptchaM.img" alt="" class="img_filter">
                    </span>
                </div>
                <div class="form_input_box" style="margin-top:0.15rem;">
                    <input class="form_input" v-model="smscode" type="text" name="" :placeholder="$t('public.share4')">
                    <span class="send_code">
                        <span class="send cursor" @click="getSmscode(0)" v-show="smsCountDownNum <= 0">{{$t("public.share6")}}</span>
                        <span v-show="smsCountDownNum <= 0">|</span>
                        <span class="send cursor" v-show="smsCountDownNum <= 0" @click="getSmscode(1)">{{$t("public.share7")}}</span>
                        <span class="send" v-show="smsCountDownNum > 0">{{smsCountDownNum}}</span>
                    </span>
                </div>
            </div>
            <div class="btn_control" style="margin-top: 0.4rem;">
                <a class="dialog_btn" style="margin-right: 0.2rem" @click="bindPhone">{{$t("public.share8")}}</a>
            </div>
        </el-dialog>

        <!-- 修改手机号 -->
        <el-dialog :visible.sync="resetPhoneShow" :title="$t('user.b101')" @close="onResetPhoneClose" width="65%"
                   append-to-body>
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
                                   :placeholder="$t('public.share25')" style="width:20px;margin-left: 10px;vertical-align: middle">
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
                        <span style="font-size: 14px;display: inline-block;width: 30%;vertical-align: middle;">{{'+' + country_code.code}}</span>
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
                <a class="dialog_btn" v-show="stepCount == 1" @click="oVerifyCodeValidate">{{$t("user.b58")}}</a>
                <a class="dialog_btn" v-show="stepCount == 2" style="margin-right:20px;" @click="goPreviousStep">{{$t("user.b59")}}</a>
                <a class="dialog_btn" v-show="stepCount == 2" @click="onModifyPhone">{{$t("user.b60")}}</a>
                <a class="dialog_btn" v-show="stepCount == 3"  @click="reLoginIn">{{$t("public.share20")}}</a>
            </div>
        </el-dialog>

        <!-- 修改邮箱 -->
        <el-dialog :visible.sync="resetEmailShow" :title="$t('user.b102')" @close="onResetEmailClose" width="65%"
                   append-to-body>
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
                        <span class="send cursor" @click="sendVerifyCode" v-show="smsCountDownNum <= 0">{{$t("public.share21")}}</span>
                        <span class="send" v-show="smsCountDownNum > 0">{{smsCountDownNum}}</span>
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
                <a class="dialog_btn" v-show="stepCount == 1" @click="oVerifyCodeValidate">{{$t("user.b58")}}</a>
                <a class="dialog_btn" v-show="stepCount == 2" style="margin-right:20px;" @click="goPreviousStep">{{$t("user.b59")}}</a>
                <a class="dialog_btn" v-show="stepCount == 2" @click="onModifyEmail">{{$t("user.b60")}}</a>
                <a class="dialog_btn" v-show="stepCount == 3" @click="reLoginIn">{{$t("public.share20")}}</a>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import CheckUtil from '@/ts/utils/CheckUtil';
    import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
    import {NewResetpwdRequestModel, UserInfo} from '@/ts/models/UserModel';
    import {Md5} from "ts-md5";
    import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
    import {Message, Dialog, Select, Option, OptionGroup} from 'element-ui';
    import HttpClient from '@/ts/net/HttpClient';
    import Util from '@/ts/utils/Util';
    import {BindingProxy} from '@/ts/proxy/BindingProxy';
    import GlobalConfig from '../global.config';
    import AppParamModel from '@/ts/models/AppModel';
    import { ExtrnalFactory } from '@/ts/factory/ExtrnalFactory';

    Vue.prototype.$message = Message;

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

        public resetPasswordShow: boolean = false;//修改密码弹窗是否显示
        public bindEmailShow: boolean = false;//绑定邮箱弹窗是否显示
        public bindPhoneShow: boolean = false;//绑定手机弹窗是否显示
        public resetPhoneShow: boolean = false;//修改手机号弹窗是否显示
        public resetEmailShow: boolean = false;//修改邮箱号弹窗是否显示
        public newPassword: string = '';//用户新密码
        public confirmPassword: string = '';//用户确认密码
        public stepCount: number = 1;//修改账号步骤
        public appParam: AppParamModel = AppParamModel.getInstace();

        /**
         * 初始化
         */
        public created() {
            this.setBaseUrl(GlobalConfig.getBaseUrl());
            this.getAreaCodeList();
            this.getAreaCodeInfoList(GlobalConfig.getWebBaseUrl());
        }

        /**
         * 改变手机区号
         */
        public onSelectCountryCode(value) {
            this.country_code = value;
            this.countryCode = value.code;
        }

        /**
         * 关闭下拉框
         */
        public closeService() {
            this.$emit('closeservice');
        }

        /**
         * 打开绑定账号弹窗
         */
        public bindAccountShow(){
            let region_code = LocalStorageUtil.getRegionCodes();
            if(region_code == 1 && this.userinfo.email == ''){
                this.onbindPhoneShow();
            }else if(region_code == 0 && this.userinfo.mobile == ''){
                this.onbindEmailShow();
            }
        }

        /**
         * 打开修改密码弹窗
         */
        public onResetPasswordShow() {
            this.resetPasswordShow = true;
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
            this.$message({
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
                    this.$message({
                        message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_EMPTY),
                        type: 'warning'
                    });
                    return;
                }
                this.$message({
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_ERROR),
                    type: 'warning'
                });
                return;
            }
            this.onGetEmailcode(2);
        }

        /**
         * 获取邮箱验证码成功
         */
        public onGetEmailcodeSuccess() {
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL),
                type: 'success'
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
            this.$message({
                message: data.msg,
                type: 'warning'
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
                        this.$message({
                            message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_EMPTY),
                            type: 'warning'
                        });
                        return;
                    }
                    this.$message({
                        message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_ERROR),
                        type: 'warning'
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
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS),
                type: 'success'
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
            this.$message({
                message: data.msg,
                type: 'warning'
            });
        }

        /**
         * 关闭修改密码弹窗
         */
        public onResetPasswordClose() {
            this.resetPasswordShow = false;
            this.newPassword = "";
            this.confirmPassword = "";
            this.verify_code = "";
        }

        /**
         * 关闭绑定邮箱弹窗
         */
        public onbindEmailClose() {
            this.bindEmailShow = false;
            this.email = "";
            this.emailcode = "";
            this.imgCaptchaCode = '';
        }

        /**
         * 关闭绑定手机弹窗
         */
        public onbindPhoneClose() {
            this.bindPhoneShow = false;
            this.phone = "";
            this.smscode = "";
            this.imgCaptchaCode = '';
        }

        /**
         * 关闭修改手机弹窗
         */
        public onResetPhoneClose() {
            this.resetPhoneShow = false;
            this.phone = "";
            this.smscode = "";
            this.verify_code = "";
            this.stepCount = 1;
            this.imgCaptchaCode = '';
        }

        /**
         * 关闭修改邮箱弹窗
         */
        public onResetEmailClose() {
            this.resetEmailShow = false;
            this.email = "";
            this.emailcode = "";
            this.verify_code = "";
            this.stepCount = 1;
            this.imgCaptchaCode = '';
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
                this.$message({
                    message: tipMsg,
                    type: 'warning'
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
         * 修改密码结果ui处理
         */
        public resetPwdBack(data: any) {
            this.newPassword = "";
            this.confirmPassword = "";
            this.verify_code = "";
            this.resetPasswordShow = false;
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_RESETPWD_SUCCESS),
                type: 'success'
            });
        }

        /**
         * 修改密码失败结果ui处理
         */
        public resetPwdFaild(data: any) {
            this.$message({
                message: data.msg,
                type: 'warning'
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
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_EMAIL),
                type: 'success'
            });
        }

        /**
         * 绑定邮箱失败ui逻辑
         * todo 此方法需在UI逻辑文件中重写
         */
        public bindEmailFaild(data: any) {
            this.$message({
                message: data.msg,
                type: 'warning'
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
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BINDING_MOBILE),
                type: 'success'
            });
        }

        /**
         * 绑定手机失败ui逻辑
         */
        public bindPhoneFaild(data: any) {
            this.$message({
                message: data.msg,
                type: 'warning'
            });
        }

        /**
         * 验证修改账号第一步验证码
         */
        public oVerifyCodeValidate() {
            if(!CheckUtil.checkSmscode(this.verify_code) || this.verify_code == '') {
                this.$message({
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMPTY_ERROR),
                    type: 'warning'
                });
                return;
            }
            this.verifyCodeValidate()
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
            this.$message({
                message: data.msg,
                type: 'warning'
            });
        }

        /**
         * 返回上一步
         */
        public goPreviousStep() {
            this.stepCount = 1;
        }

        /**
         * 重新登录
         */
        public reLoginIn(){
            const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
            if(this.userinfo.master_account == 0){
                factory.reLoginIn(this.userinfo.master_account,this.phone);
            } else if(this.userinfo.master_account == 1) {
                factory.reLoginIn(this.userinfo.master_account,this.email);
            }
        }

        /**
         * 解绑邮箱成功ui逻辑
         */
        public unbindEmailSuccess() {
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL_UNBIND),
                type: 'success'
            });
            this.$emit('refreshuserinfo')
        }

        /**
         * 解绑邮箱失败ui逻辑
         */
        public unbindEmailFaild(data: any) {
            this.$message({
                message: data.msg,
                type: 'warning'
            });
        }

        /**
         * 解绑手机号成功ui逻辑
         */
        public unbindPhoneSuccess() {
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PHONE_UNBIND),
                type: 'success'
            });
            this.$emit('refreshuserinfo')
        }

        /**
         * 解绑手机号失败ui逻辑
         */
        public unbindPhoneFaild(data: any) {
            this.$message({
                message: data.msg,
                type: 'warning'
            });
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
            this.$message({
                message: data.msg,
                type: 'warning'
            });
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
            this.$message({
                message: data.msg,
                type: 'warning'
            });
        }
    }
</script>

