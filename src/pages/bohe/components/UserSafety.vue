<template>
    <div class="user_safety_bh">
        <div class="wrap_of_pwd_list">
            <div class="modify_mobile_pwd_user safety_com flex_bet">
                <div class="flex_bet flex_1">
                    <div class="raduis_div account_ways_com">
                        <img src="../images/resetpassword.png" alt="">
                    </div>
                    <div class="mod_info_pwd">
                        <h3 class="user_safety_title">{{$t("user.z18")}}</h3>
                        <p class="user_safety_msg">{{$t("user.z19")}}</p>
                    </div>
                </div>
                <div class="modify_pwd_click" @click="onEditPw()">
                    {{$t("user.z20")}}
                </div>
            </div>
            <div class="modify_email_pwd_user safety_com flex_bet">
                <div class="flex_bet flex_1">
                    <div class="raduis_div account_ways_com">
                        <img src="../images/resetsecondpassword.png" alt="">
                    </div>
                    <div class="mod_info_pwd">
                        <h3 class="user_safety_title">{{$t("user.z21")}}</h3>
                        <p class="user_safety_msg">{{$t("user.z22")}}</p>
                        <p style="margin-top:5px;">{{$t("user.z35")}}</p>
                    </div>
                </div>
                <div class="modify_pwd_click" @click="onEditSecondPw()">
                    {{userinfo.is_set_admin_pass ? $t("user.z20") : $t("user.z36")}}
                </div>
            </div>
        </div>
        <div>
            <p class="words_col2 tips_safety">{{$t("user.z23")}}</p>
            <p class="words_clo4" v-html="$t('user.z24')"></p>
            <p class="words_clo4">{{$t("user.z25")}}</p>
        </div>
        <!--修改密码-->
        <el-dialog :visible.sync="resetPwdDialogVisible" :title="$t('user.z20')" width="30%">
            <div v-loading="loading" :element-loading-text="loadingMsg">
                <el-form class="demo-ruleForm">
                    <el-form-item>
                        <div class="sendBox">
                            <input maxlength="8" v-model="verificationCode" class="sendInput" type="text" :placeholder="$t('user.z39')">
                            <span @click="sendVerificationCode" class="sendBtn" v-show="countDownNum <= 0">{{$t("user.z40")}}</span>
                            <span class="sendBtn" style="display: none;" v-show="countDownNum > 0">({{countDownNum}}s)</span>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" v-model="newSecPassword" autocomplete="off" :placeholder="$t('user.z27')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" v-model="newSecPasswordTwo" :placeholder="$t('user.z28')"></el-input>
                    </el-form-item>
                </el-form>

                <div>
                    <button class="normal_btn normal_btn_blue" @click="onConfirmEidtPw">{{$t("user.z20")}}</button>
                    <button class="normal_btn m_left" @click="onCloseEidtPw">{{$t("user.z14")}}</button>
                </div>
            </div>
        </el-dialog>
        <!--修改二级密码-->
        <el-dialog :visible.sync="resetSecondPwdDialogVisible" :title="userinfo.is_set_admin_pass ? $t('user.z37') : $t('user.z38')" width="30%">
            <div v-loading="loading" :element-loading-text="loadingMsg">
                <el-form class="demo-ruleForm">
                    <el-form-item>
                        <div class="sendBox">
                            <input maxlength="8" v-model="verificationCode" class="sendInput" type="text" :placeholder="$t('user.z39')">
                            <span @click="sendVerificationCode" class="sendBtn" v-show="countDownNum <= 0">{{$t("user.z40")}}</span>
                            <span class="sendBtn" style="display: none;" v-show="countDownNum > 0">({{countDownNum}}s)</span>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" maxlength="20" v-model="newSecPassword" autocomplete="off" :placeholder="$t('user.z42')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" maxlength="20" v-model="newSecPasswordTwo" :placeholder="$t('user.z28')"></el-input>
                    </el-form-item>
                </el-form>

                <div>
                    <button class="normal_btn normal_btn_blue" @click="onConfirmEidtSecondPw">{{userinfo.is_set_admin_pass ? $t("user.z20") : $t("user.z36")}}</button>
                    <button class="normal_btn m_left" @click="onCloseEidtSecondPw">{{$t("user.z14")}}</button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
    ResetpwdRequestModel,
    UserInfo,
    SendVerificationCodeRequestModel,
    SetSecondPwdRequestModel, NewResetpwdRequestModel
} from "@/ts/models/UserModel";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import CheckUtil from "@/ts/utils/CheckUtil";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import { Md5 } from "ts-md5";
import HttpClient from "@/ts/net/HttpClient";
import { IProxy } from "@/ts/interface/IProxy";
import { IdataModel } from "@/ts/models/IdataModel";
import Util from "@/ts/utils/Util";

@Component
export default class UserSafety extends Vue implements IProxy {
    @Prop() public userinfo!: UserInfo;
    @Prop() public loading!: boolean;

    created() {}

    public resetPwdDialogVisible: boolean = false;
    public loadingMsg: string = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING); // loading的说明文字
    public resetSecondPwdDialogVisible: boolean = false;
    public countDownNum: number = 0;
    //修改密码/修改二级密码
    public newSecPassword: string = "";
    public newSecPasswordTwo: string = "";
    public verificationCode: string = ""; //用户输入的验证码
    public verify_key: string = ""; //验证码key
    //
    public token: string = "";

    public init(): void {
        this.token = LocalStorageUtil.getUserToken().account_token;
    }

    public execute(): void {}

    public setBaseUrl(url: string): void {}

    /**
     * 修改密码
     */
    public onEditPw() {
        this.newSecPassword = '';
        this.newSecPasswordTwo = '';
        this.verificationCode = '';
        this.resetPwdDialogVisible = true;
    }

    /**
     * 修改二级密码
     */
    public onEditSecondPw() {
        this.newSecPassword = '';
        this.newSecPasswordTwo = '';
        this.verificationCode = '';
        this.resetSecondPwdDialogVisible = true;
    }

    /**
     * 确定修改密码
     */
    public onConfirmEidtPw() {
        // 判断
        let isNotif = false;
        let msg = '';
        if(!isNotif && this.verificationCode == '') {
            isNotif = true;
            msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMPTY_ERROR);
        }
        if(!isNotif && (!CheckUtil.checkPwd(this.newSecPassword) || !CheckUtil.checkPwd(this.newSecPasswordTwo))) {
            isNotif = true;
            msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
        }
        if(!isNotif && this.newSecPassword != this.newSecPasswordTwo) {
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
        let param = new SetSecondPwdRequestModel();
        param.account_token = this.token;
        param.verify_code = this.verificationCode;
        param.verify_key = this.verify_key;
        param.new_password = Md5.hashStr(this.newSecPassword).toString();
        param.new_password_confirmation = Md5.hashStr(this.newSecPasswordTwo).toString();
        this.$emit("resetpassword", param);
    }

    /**
     * 修改密码结果ui处理
     */
    public resetPwdBack(data: any) {
        if (data.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE
                ),
                message: TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_RESETPWD_SUCCESS
                ),
                type: "success"
            });
            this.resetPwdDialogVisible = false;
        } else {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(
                    TipsMsgUtil.KEY_NOTIF_ERROR_TITLE
                ),
                message: data.msg,
                type: "warning"
            });
        }
    }

    /**
     * 发送验证码
     */
    public async sendVerificationCode() {
        let param = new SendVerificationCodeRequestModel();
        param.account_token = this.token;
        this.$emit("sendverificationcode", param);
    }

    /**
     * 发送验证码成功
     */
    public sendVerifySuccessBack(data: any) {
        this.verify_key = data.data.verify_key;
        let msg = "";
        this.newSecPassword = '';
        this.newSecPasswordTwo = '';
        if (data.data.code_type == 1) {
            msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SMS);
        } else if(data.data.code_type == 2) {
            msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMAIL);
        }
        this.$notify({
            title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
            message: msg,
            type: "success"
        });
        //倒计时
        this.countDownNum = 60;
        const sefl = this;
        Util.countDown(this.countDownNum, 1, (n: number) => {
            sefl.countDownNum = n;
        });
    }

    /**
     * 发送验证码失败
     */
    public sendVerifyFaildBack(data: any) {
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
        if(!isNotif && this.verificationCode == '') {
            isNotif = true;
            msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_EMPTY_ERROR);
        }
        if(!isNotif && (!CheckUtil.checkSecondPwd(this.newSecPassword) || !CheckUtil.checkSecondPwd(this.newSecPasswordTwo))) {
            isNotif = true;
            msg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_PASSWORD_ERROR);
        }
        if(!isNotif && this.newSecPassword != this.newSecPasswordTwo) {
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
        let param = new SetSecondPwdRequestModel();
        param.account_token = this.token;
        param.verify_code = this.verificationCode;
        param.verify_key = this.verify_key;
        param.new_password = this.newSecPassword;
        param.new_password_confirmation = this.newSecPasswordTwo;
        this.$emit("setsecondpwd", param);
    }

    /**
     * 修改二级密码成功
     */
    public setSecondPwdSuccessBack(data: any) {
        this.verificationCode = "";
        this.resetSecondPwdDialogVisible = false;
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

    //关闭修改密码弹窗
    public onCloseEidtPw() {
        this.resetPwdDialogVisible = false;
    }

    //关闭修改二级密码弹窗
    public onCloseEidtSecondPw() {
        this.resetSecondPwdDialogVisible = false;
    }
}
</script>

