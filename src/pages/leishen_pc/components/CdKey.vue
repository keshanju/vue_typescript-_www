<template>
    <div>
        <div class="cdkey_box" v-show="!cdkey_pay_success">
            <p class="cdkey_title">{{$t("user.b67")}}</p>
            <input class="cdkey_input" type="text" v-model="cd_key" :placeholder="$t('user.b67_1')">
            <p class="cdkey_msg">{{$t("user.b67_11")}}</p>
            <a class="cdkey_btn" @click="closeCdkey" style="margin-right: 0.12rem;">{{$t("public.share13")}}</a>
            <a class="cdkey_btn_bg" @click="cdKeyPay">{{$t("user.b60")}}</a>
        </div>
        <div class="cdkey_box" v-show="cdkey_pay_success">
            <p class="cdkey_title">{{$t("user.b67_5")}}</p>
            <p class="cdkey_pay_msg" v-if="experience_expiry_time == ''">{{$t("user.b67_12")}}</p>
            <p class="cdkey_pay_msg" v-if="experience_expiry_time != ''">{{$t("user.b67_6")}}{{cd_key_time}}{{$t("user.b67_7")}}</p>
            <p class="cdkey_pay_msg" v-if="experience_expiry_time != ''">{{$t("user.b67_8")}}{{experience_expiry_time}}</p>
            <a class="cdkey_btn cdkey_btn_bg" @click="closeCdkey">{{$t("user.b60")}}</a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue } from "vue-property-decorator";
    import AppParamModel from '@/ts/models/AppModel';
    import UserProxy from "../../../ts/proxy/UserProxy";
    import GlobalConfig from "@/pages/leishen_pc/global.config";
    import {ExtrnalFactory} from "../../../ts/factory/ExtrnalFactory";

    @Component
    export default class CdKey extends UserProxy {
        public appParam: AppParamModel = AppParamModel.getInstace();
        public cdkey_pay_success: boolean = false;//cdkey充值成功
        public experience_expiry_time: string = '';//体验卡到期时间

        public init(){

        }

        public execute(){

        }

        public created(){
            this.setBaseUrl(GlobalConfig.getBaseUrl());
        }

        /**
         * cdkey充值
         */
        public cdKeyPay(){
            if(this.cd_key == '') {
                this.$message({
                    message: this.$i18n.t('user.b67_2').toString(),
                    type: 'warning'
                });
                return;
            };
            this.onPayCDKey()
        }

        /**
         * cdkey支付成功
         */
        public cdKeySuceess(msg: string,time?: string){
            this.cdkey_pay_success = true;
            this.experience_expiry_time = (time ? time : '');
            const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
            factory.rechargeSuccess();
        }

        /**
         * cdkey支付失败
         */
        public cdKeyError(msg: string){
            this.$message({
                message: msg,
                type: 'warning'
            });
        }

        /**
         * 关闭cdkey弹窗
         */
        public closeCdkey(){
            this.$emit('closecdkey');
        }

        /**
         * 重置数据
         */
        public closeCdkeyReset() {
            this.cd_key = '';
            this.cdkey_pay_success = false;
        }

    }
</script>