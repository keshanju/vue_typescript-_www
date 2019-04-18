<template>
    <div class="kefu_download">
        <div class="kefu_icon cursor">
            <a  href="http://wpa.qq.com/msgrd?v=3&uin=78800&site=qq&menu=yes" target="_blank">
                <img src="../images/kefu_fixed.gif" style="height:auto;" class="img_filter newmodal" alt="">
                <p class="kefu_time">9:00-24:00</p>    
            </a>
        </div>
        <div class="download_icon leigod_flex_between">
            <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content">
                    <img src="../images/weixin.png" alt="">
                </div>
                <div class="wechat_icon cursor"></div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" placement="bottom">
                <div slot="content">
                    <img src="../images/weibo.png" alt="">
                </div>
                <div class="weibo_icon"></div>
            </el-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import { Tooltip } from "element-ui";

    @Component({
        components:{
            "el-tooltip": Tooltip
        }
    })
    export default class DownloadBox extends Vue {

    }

</script>

