<template>
    <div class="footer_nav">
        <div class="top_footer_nav_bh clearfix_a">
            <div class="about_us_bh left_bh">
                <dl class="listone_ab">
                    <dt><a style="color:#fff;">{{$t("foot.c1")}}</a></dt>
                    <dd class="dd_u hover_txt"><a @click="goAbout">{{$t("foot.c2")}}</a></dd>
                    <dd class="dd_u hover_txt"><a @click="goAgreement">{{$t("foot.c3")}}</a></dd>
                </dl>
                <dl class="listone_ab">
                    <dt><a style="color:#fff;">{{$t("foot.c4")}}</a></dt>
                    <dd class="dd_u hover_txt"><a @click="goNotify">{{$t("foot.c5")}}</a></dd>
                    <dd class="dd_u hover_txt" v-show="webParam.region_code == 0"><a @click="goRecharge">{{$t("foot.c6")}}</a></dd>
                    <!-- <dd class="dd_u hover_txt"><a @click="goActivity">{{$t("foot.c7")}}</a></dd> -->
                    <dd class="dd_u hover_txt"><a @click="goNews">{{$t("foot.c8")}}</a></dd>
                </dl>
            </div>
            <div class="focus_on_bh clearfix_a">
                <div class="wechat_img left_bh" style="margin-right:40px;">
                    <p class="mcf_p">{{$t("foot.c9")}}</p>
                    <img src="../images/wechat.png" alt="" class="mw_90">
                </div>
                <div class="weibo_img left_bh">
                    <p class="mcf_p">{{$t("foot.c10")}}</p>
                    <img src="../images/weibo.png" alt="" class="mw_90">
                </div>
            </div>
            <div class="connect_to_bh right_bh">
                <p class="tips_questions_bh">{{$t("foot.c11")}}<br>{{$t("foot.c14")}}</p>
                <a v-if="webParam.region_code == 0" class="email_of_bh" href="mailto:customer@bohe.com">customer@bohe.com</a>
                <p style="margin-top: 10px"></p>
                <p v-if="webParam.region_code == 0&&webParam.language=='zh_CN'" style="color: #fff;margin-top: -15px;margin-bottom: 8px;">{{$t("foot.c15")}}</p>
                <a v-if="webParam.region_code == 1" class="blue_btn" @click="onUchat">{{$t("head.a14")}}</a>
                <p style="margin-top: 20px"></p>
                <a target="_blank" href="https://weibo.com/u/6713214878"><img style="width: 60px;height: 22px;" src="../images/weibo_gz.png" /></a>
            </div>
        </div>
        <div class="bottom_footer_nav_bh">
            <p class="down_client_bh">{{$t("foot.c12")}}</p>
            <div v-show="webParam.infrom == 0" class="wrap_of_ter_cli_bh clearfix_a">
                <ul class="terminal_app_bh clearfix_a left_bh">
                    <li class="items_termin cursor_pointer">
                        <a @click="downloadWindowsClient">
                            <i class="foot_icon foot_windows_icon"></i><span class="foot_icon_msg">Windows</span>
                        </a>
                    </li>
                    <li class="items_termin cursor_pointer" v-show="macDownloadUrl != ''">
                        <a :href="macDownloadUrl">
                            <i class="foot_icon foot_mac_icon"></i><span class="foot_icon_msg">Mac</span>
                        </a>
                    </li>
                    <li class="items_termin cursor_pointer">
                        <el-tooltip class="item" effect="dark" placement="right">
                            <div slot="content">
                                <download-box :phonetype="'android'"></download-box>
                            </div>
                            <a>
                                <i class="foot_icon foot_android_icon"></i><span class="foot_icon_msg">Android</span>
                            </a>
                        </el-tooltip>
                    </li>
                    <li class="items_termin cursor_pointer">
                        <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">
                                <download-box :phonetype="'ios'"></download-box>
                            </div>
                            <a>
                                <i class="foot_icon foot_ios_icon"></i><span class="foot_icon_msg">iOS</span>
                            </a>
                        </el-tooltip>
                    </li>
                </ul>
                <div class="right_bh">
                    <a target="_blank" style="margin-right: 20px;" :href="'https://v.anquan.org/cert/site/?site='+(webParam.region_code===1?'cn.bohe.com':'www.bohe.com')"><img style="width: 110px;height: 40px;" src="https://static.miandei.com/cloud/images//common/hy_124x47.png"></a>
                    <a target="_blank" :href="'https://v.yunaq.com/certificate?domain='+(webParam.region_code===1?'cn.bohe.com':'www.bohe.com')+'&from=label&code=90030'"><img style="width: 110px;height: 40px;" src="https://aqyzmedia.yunaq.com/labels/label_sm_90030.png"></a>
                    <a style="margin-left: 20px;" target="_blank" id="_pingansec_bottomimagesmall_brand" href="http://si.trustutn.org/info?sn=856181109037266429071&certType=1"><img style="width: 110px;height: 40px;" src="https://v.trustutn.org/images/cert/brand_bottom_small.jpg" /></a>
                </div>
                <div class="beian_num_box right_bh">
                    <div style="width:300px;margin:0 auto; padding-bottom:5px;">
                        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42010602003069" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;" />
                            <img src="../images/beian_icon.png" alt="" style="float:left;">
                            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">鄂公网安备 42010602003069号</p>
                        </a>
                    </div>
                    <p class="beian_num_bh">{{$t("foot.c13")}}</p>
                    <p class="beian_num_bh" v-show="webParam.region_code == 1"><span>{{$t("foot.c16")}}</span><span>027-86951781</span></p>
                    <p class="beian_num_bh" v-show="webParam.region_code == 1"><span>{{$t("foot.c17")}}</span><span>{{$t("foot.c18")}}</span></p>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DownloadBox from "@/pages/bohe/components/DownloadBox.vue";
import { Tooltip } from "element-ui";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import GlobalConfig from "@/pages/bohe/global.config";
import { IdataModel } from "@/ts/models/IdataModel";
import WebParamModel from "@/ts/models/WebModel";
import ConfigUtil from "@/ts/utils/ConfigUtil";
import UchatUtil, {UchatModels} from "@/ts/utils/UchatUtil";

@Component({
    components: {
        "download-box": DownloadBox,
        "el-tooltip": Tooltip
    }
})
export default class FootNav extends Vue {
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public backData: IdataModel<any> | undefined;
    public windowsDownloadUrl: string = "";
    public macDownloadUrl: string = "";

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
        this.$emit("ondownloadconfig", jsonConfig);
    }

    /**
     * 跳转套餐页
     */
    public goRecharge() {
        JumpWebUtil.backRecharge();
    }

    /**
     * 跳转用户协议
     */
    public goAgreement() {
        JumpWebUtil.backAgreement();
    }

    /**
     * 下载windows客户端
     */
    public downloadWindowsClient() {
        window.location.href = this.windowsDownloadUrl;
        this.$emit("download");
    }

    /**
     * 跳转公告页
     */
    public goNotify() {
        JumpWebUtil.backNotice();
    }

    /**
     * 跳转资讯页
     */
    public goNews() {
        JumpWebUtil.backNews();
    }

    /**
     * 跳转关于薄荷页
     */
    public goAbout() {
        JumpWebUtil.backAbout();
    }

    /**
     * 聊天
     */
    public onUchat() {
        const chat = new UchatUtil();
        const mod = new UchatModels();
        mod.imnumber = GlobalConfig.UC_IM_Number;
        mod.box = true;
        chat.pop(mod);
        chat.ready(null);
    }
}
</script>

