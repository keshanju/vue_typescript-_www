<template>
    <div class="leigod_flex_vertify">
        <div class="leigod_flex" style="width: 300px;height: 300px;">
            <vue-cropper style="width: 300px;height: 300px;" ref="cropper" v-if="option.img != null" :img="option.img" :info="true" :fixedBox="false" :high="true" :original="true" :autoCrop="true" :full="true" :fixed="true">
            </vue-cropper>
            <img style="margin-top: 60px;" v-if="option.img == null" src="../images/wangbaavater.png" />
        </div>

        <div style="margin-bottom: 10px;">
            <div class="normal_btn_box">
                <button class="normal_btn">上传头像</button>
                <input class="update_input" @change="onChooseImage" ref="imageUpInput" id="imageUpBtn" type="file" accept="image/*">
            </div>
            <button @click="saveImage" style="margin-left: 20px;" class="normal_btn">确定</button>
        </div>
    </div>
</template>

<script lang="ts">
import { VueCropper } from "vue-cropper";
import { Component, Vue } from "vue-property-decorator";
import { Message } from "element-ui";

Vue.prototype.$message = Message;

@Component({
    components: {
        "vue-cropper": VueCropper
    }
})
export default class UserAvatarEditB extends Vue {
    public option = {
        img: null,
        outputType: "png"
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
        if (file.size > 500 * 1024) {
            this.$message({
                message: "图片大小限制500k(Image size limit 500k)!",
                type: "warning",
                center: true
            });
            return;
        }

        // 确认选择的文件是图片
        if (file.type.indexOf("image") == 0) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
             
            reader.onload = function(e) {
            //     // 图片base64化
               self.option.img = this.result;
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
        (this.$refs.cropper as any).getCropData(data => {
            self.$emit("on-upload-avatar", data);
        });

    }
}
</script>


