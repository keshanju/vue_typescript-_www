<template>
    <!-- 遮罩层 -->
    <div>
        <div><img id="image" :src="url" crossorigin alt="Picture"></div>
        <div style="margin-bottom: 10px;margin-top:20px;">
            <div class="normal_btn_box">
                <button class="normal_btn">{{$t("user.z17")}}</button>
                <input class="update_input" @change="onChooseImage" ref="imageUpInput" id="imageUpBtn" type="file"
                       accept="image/*">
            </div>
            <button @click="saveImage" style="margin-left: 20px;" class="normal_btn">{{$t("user.z13")}}</button>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Cropper from 'cropperjs'
    import '@/assets/css/cropper.min.css'
    import {Message} from "element-ui";

    Vue.prototype.$message = Message;

    @Component
    export default class UserAvatarEditB extends Vue {
        public cropper: any;
        public url: string = '../images/avatar.png';

        // 将默认头像放到裁剪区域
        cropperImg(imgUrl) {
            //初始化这个裁剪框
            var self = this;
            //如果运维做好了，图片的跨域问题，可把该句代码取消注释
            // this.url = imgUrl
            this.$nextTick(() => {
                const image = document.getElementById('image');
                var minAspectRatio = 0.5;
                var maxAspectRatio = 1.5;
                //@ts-ignore
                this.cropper = new Cropper(image, {
                    checkCrossOrigin: false,
                    ready: function () {
                        var cropper = this.cropper;
                        var containerData = cropper.getContainerData();
                        var cropBoxData = cropper.getCropBoxData();
                        var aspectRatio = cropBoxData.width / cropBoxData.height;
                        var newCropBoxWidth;

                        if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
                            newCropBoxWidth = cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);

                            cropper.setCropBoxData({
                                left: (containerData.width - newCropBoxWidth) / 2,
                                width: newCropBoxWidth
                            });
                        }
                    },
                    cropmove: function () {
                        var cropper = this.cropper;
                        var cropBoxData = cropper.getCropBoxData();
                        var aspectRatio = cropBoxData.width / cropBoxData.height;

                        if (aspectRatio < minAspectRatio) {
                            cropper.setCropBoxData({
                                width: cropBoxData.height * minAspectRatio
                            });
                        } else if (aspectRatio > maxAspectRatio) {
                            cropper.setCropBoxData({
                                width: cropBoxData.height * maxAspectRatio
                            });
                        }
                    },
                });
            })
        }

        onChooseImage(e: any) {
            let self = this
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            let file = files[0];
            let fileSize = file.size
            // 判断图片的大小
            if (fileSize > 500 * 1024) {
                this.$message({
                    message: "图片大小限制500k(Image size limit 500k)!",
                    type: "warning",
                    center: true
                });
                return;
            }
            // 读取图片的url
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                // 图片base64化
                const base64: any = this.result;
                self.cropper.replace(base64);
            }
        }

        saveImage() {
            //@ts-ignore
            let dataURL = this.cropper.getCroppedCanvas().toDataURL().toString();
            this.$emit("on-upload-avatar", dataURL);
        }

        destroyCropper() {
            if (this.cropper) {
                this.cropper.destroy()
            }
        }
    }
</script>
<style>

</style>