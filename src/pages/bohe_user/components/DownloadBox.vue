<template>
    <div class="download_ewm_box">
        <p class="download_title">{{messages.downloadbox.e1}}</p>
        <div class="all_app_load">
            <div class="app" v-show="phonetype == 'android'">
                <img src="../images/anzhuo01.png" alt="">
                <p>Android</p>
            </div>
            <div class="app" v-show="phonetype == 'ios'">
                <img src="../images/apple01.png" alt="">
                <p>iOS</p>
            </div>
        </div>
        <img v-if="webParam.region_code == 0" v-show="webParam.language == 'zh_CN'" class="download_ewm" src="../images/code_0_cn.png"/>
        <img v-if="webParam.region_code == 1" v-show="webParam.language == 'zh_CN'" class="download_ewm" src="../images/code_1_cn.png"/>
        <img v-if="webParam.region_code == 0" v-show="webParam.language == 'en'" class="download_ewm" src="../images/code_0_en.png"/>
        <img v-if="webParam.region_code == 1" v-show="webParam.language == 'en'" class="download_ewm" src="../images/code_1_en.png"/>
        <p class="download_msg">{{messages.downloadbox.e2}}</p>
    </div>
</template>

<script lang="ts">

    import {Component, Vue, Prop} from "vue-property-decorator";
    import {LanguageConfig} from "../../../ts/utils/Language";
    import WebParamModel from '@/ts/models/WebModel';

    @Component
    export default class DownloadBox extends Vue {
        @Prop() phonetype!: string; 

        public messages: any | undefined = null;
        public webParam = WebParamModel.getInstace(); // 浏览器参数
        public lang = LanguageConfig.getInstance();

        public created() {
            this.lang.changeLanguage(this.webParam.language,false,false);
            if(this.lang.messages != null) {
                this.messages = this.lang.messages[this.webParam.language];
                if(this.messages == null) {
                    this.messages = {};
                    this.messages.downloadbox = {};
                    this.messages.downloadbox.e1 = '';
                    this.messages.downloadbox.e2 = '';
                }
            }
        }
    }
</script>
