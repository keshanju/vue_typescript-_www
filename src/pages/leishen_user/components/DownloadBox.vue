<template>
    <div class="kefu_download">
        <div class="kefu_icon cursor">
            <!--<a href="http://q.url.cn/cdmsbl?_type=wpa&qidian=true" target="_blank">-->
                <!--<img src="../images/kefu_fixed.gif" style="height:auto;" class="img_filter" alt="">-->
            <!--</a>-->
            <a class="newmodal" target="_blank">
                <img src="../images/kefu_fixed.gif" style="height:auto;" class="img_filter" alt="">
            </a>
            <p class="kefu_time">8:00-24:00</p>
        </div>
        <div class="download_icon flex_row_between">
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

