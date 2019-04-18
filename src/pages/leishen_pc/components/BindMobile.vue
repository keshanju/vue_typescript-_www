<template>
    <div>
        <div class="bind_mobile">
            <p class="bind_msg">{{$t("public.share12")}}</p>
            <div class="form_box" style="width:60%">
                <div class="form_item flex_row_start">
                    <span class="form_title">{{$t("public.share2")}}</span>
                    <div class="form_input_box">
                        <input v-model="phone" class="form_input" type="text" name="" :placeholder="$t('public.share2')">
                    </div>
                </div>
                <div class="form_input_box flex_row_start" style="margin-top:0.1rem;">
                    <span class="form_title">{{$t("public.share4")}}</span>
                    <div class="form_input_box">
                        <input class="form_input" v-model="verify_code" type="text" name="" :placeholder="$t('public.share4')">
                        <span class="send_code">
                            <span class="send cursor" v-show="countDownNum <= 0">{{$t("public.share6")}}</span>
                            <span style="margin: 0 0.05rem">|</span>
                            <span class="send cursor">{{$t("public.share7")}}</span>
                            <span class="send" v-show="countDownNum > 0">{{countDownNum}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn_control">
            <a class="public_btn" style="margin-right: 0.2rem">{{$t("public.share8")}}</a>
            <a class="white_btn" @click="closeService">{{$t("public.share13")}}</a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue } from "vue-property-decorator";
    import AppParamModel from '@/ts/models/AppModel';
    import { IProxy } from '@/ts/interface/IProxy';

    @Component
    export default class BindMobile extends Vue implements IProxy {
        public appParam: AppParamModel = AppParamModel.getInstace();
        public countDownNum: number = 0;
        public phone: string = '';//用户手机号
        public verify_key: string = '';//验证码key
        public verify_code: string = '';//用户输入的验证码

        public init(){

        }

        public execute(){

        }

        public setBaseUrl(){
            
        }

        /**
         * 关闭下拉框
         */
        public closeService(){
            this.$emit('closeservice');
        }

    }
</script>

