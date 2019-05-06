<template>
    <div>
        <p class="free_title">{{$t("user.z33")}}</p>
        <p class="free_msg">{{$t("user.z34")}}</p>
        <div class="user_down_content" style="margin-top: 20px;">
            <div @click="downloadWindowsClient" class="user_down_cell_content_1">
                <div class="user_down_centen_content" style="margin-left: 20px;">
                    <img class="user_down_img" src="../images/d_windows_icon.png"/>
                    <p class="user_down_txt_1" style="margin-left: 5px">Windows</p>
                </div>
                <div class="user_down_btn" style="margin-top: 30px;"></div>
            </div>

            <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                    <download-box :phonetype="'android'"></download-box>
                </div>
                <div class="user_down_cell_content_1" style="margin-left: 20px">
                    <div class="user_down_centen_content" style="margin-left: 20px;">
                        <img class="user_down_img" src="../images/d_android_icon.png"/>
                        <p class="user_down_txt_1" style="margin-left: 5px">Android</p>
                    </div>
                    <div class="user_down_btn_qr" style="margin-top: 30px;"></div>
                </div>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">
                    <download-box :phonetype="'ios'"></download-box>
                </div>
                <div class="user_down_cell_content_1" style="margin-left: 20px">
                    <div class="user_down_centen_content" style="margin-left: 20px;">
                        <img class="user_down_img" src="../images/d_apple_icon.png"/>
                        <p class="user_down_txt_1" style="margin-left: 5px">iOS</p>
                    </div>
                    <div class="user_down_btn_qr" style="margin-top: 30px;"></div>
                </div>
            </el-tooltip>
        </div>

        <div class="user_down_cell_content_2" style="margin-top: 20px;padding: 20px;color: #666666;width:800px;">

            <div class="user_down_content" style="align-items: center;justify-content: flex-start;">
                <img style="width: 30px;height: 30px;" src="../images/free_5.png" alt="">
                <p style="margin: 0px 15px;font-size: 14px;font-weight: bold;">{{$t("about.ab1")}}</p>
                <p style="font-size: 12px;">{{$t("about.ab5")}}</p>
            </div>

            <div class="user_down_content" style="align-items: center;justify-content: flex-start;margin-top: 20px;">
                <img style="width: 30px;height: 30px;" src="../images/free_6.png" alt="">
                <p style="margin: 0px 15px;font-size: 14px;font-weight: bold;">{{$t("about.ab2")}}</p>
                <p style="font-size: 12px;">{{$t("about.ab6")}}</p>
            </div>

            <div class="user_down_content" style="align-items: center;justify-content: flex-start;margin-top: 20px;">
                <img style="width: 30px;height: 30px;" src="../images/free_7.png" alt="">
                <p style="margin: 0px 15px;font-size: 14px;font-weight: bold;">{{$t("about.ab3")}}</p>
                <p style="font-size: 12px;">{{$t("about.ab7")}}</p>
            </div>

            <div class="user_down_content" style="align-items: center;justify-content: flex-start;margin-top: 20px;">
                <img style="width: 30px;height: 30px;" src="../images/free_8.png" alt="">
                <p style="margin: 0px 15px;font-size: 14px;font-weight: bold;">{{$t("about.ab4")}}</p>
                <p style="font-size: 12px;">{{$t("about.ab8")}}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import WebParamModel from "../../../ts/models/WebModel";
    import DownloadBox from './DownloadBox.vue';
    import ConfigUtil from "../../../ts/utils/ConfigUtil";

    @Component({
        components: {
            'download-box': DownloadBox,
        }
    })
    export default class UserRecharge extends Vue {

        public webParam = WebParamModel.getInstace(); // 浏览器参数
        public windowsDownloadUrl: string = "";
        public macDownloadUrl: string = "";

        /**
         * 初始化
         */
        public created() {
            this.getDownloadUrl();
        }

        /**
         * 获取下载url
         * @param url
         */
        public async getDownloadUrl() {
            const jsonConfig = await ConfigUtil.getInstance().download();
            const downConfig = jsonConfig.bohe.down_platform[this.webParam.from];
            this.windowsDownloadUrl = downConfig.windows.download_url;
            this.macDownloadUrl = downConfig.mac.download_url;
        }

        /**
         * 下载windows客户端
         */
        public downloadWindowsClient() {
            window.location.href = this.windowsDownloadUrl;
        }
    }
</script>