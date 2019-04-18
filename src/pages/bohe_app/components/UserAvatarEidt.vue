<template>
    <div class="flex_center">
        <div class="top_s1">
            <p style="margin-top: 5px;" class="nickname_title">{{$t("puser.r12")}}</p>
            <a class="cancel_s1">
                <img @click="onClose" class="img_filter" src="../images/cancel1.png" alt="" style="width: 10px">
            </a>
        </div>
        <div class="flex_center" style="width: 260px;height: 260px;display: inline-block;">
            <vue-cropper style="width: 260px;height: 260px;" ref="cropper" v-if="option.img != null" :img="option.img" :info="true" :fixedBox="false" :high="true" :original="true" :autoCrop="true" :full="true" :fixed="true">
            </vue-cropper>

            <img style="margin-top: 60px;" v-if="option.img == null" src="../images/head_edit.png" />
        </div>

        <div style="margin-bottom: 10px;position:relative;">
            <button class="normal_btn">{{$t("puser.r11")}}</button>
            <input class="update_input" @change="onChooseImage" ref="imageUpInput" id="imageUpBtn" type="file" accept="image/*">
            <button @click="saveImage" style="margin-left: 20px;" class="normal_btn">{{$t("puser.r3")}}</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { VueCropper } from 'vue-cropper';
    import {Component, Vue} from "vue-property-decorator";
    import {Toast} from 'vant';

    @Component ({
        components: {
            "vue-cropper": VueCropper,
        }
    })
    export default class UserAvatarEditB extends Vue {
        public option = {
            img: null,
            outputType: 'png'
        };

        /**
         * 选择图片
         * @param e
         */
        onChooseImage(e: any) {
            var self = this;
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            var file = files[0];
            // 限制500k大小
            if(file.size > 500*1024) {
                Toast('图片大小限制500k(Image size limit 500k)!');
                return;
            }
            // 确认选择的文件是图片
            if (file.type.indexOf("image") == 0) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    // 图片base64化
                    const base64: any = this.result;
                    self.option.img = base64;
                };
            }
        }

        /**
         * 保存头像
         */
        saveImage() {
            if (this.option.img == null) return;
            // 获取截图的base64 数据
            const self = this;
            (this.$refs.cropper as any).getCropData((data) => {
                self.$emit('on-upload-avatar', data);
            })
        }

        /**
         * 关闭窗口
         */
        onClose() {
            this.$emit('on-close');
        }
    }
</script>


