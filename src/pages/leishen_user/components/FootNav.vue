<template>
    <div class="foot">
        <div class="foot_content">
            <!--foot-one-->
            <div class="flex_col_item_left pos_foot_txt1">
                <div class="cursor">
                    <img src="../images/foot_logo.png" alt="" width="200">
                </div>
                <div>
                    <ul class="flex_column_around">
                        <li>
                            <a class="h5_font_no_hover pos_foot_txt0">{{$t("nav.navlist10")}}</a>
                        </li>
                        <li>
                            <a class="list_font pos_foot_txt3" @click="goRecharge">{{$t("nav.navlist11")}}</a>
                        </li>
                        <li>
                            <a class="list_font pos_foot_txt3" @click="goActivity">{{$t("nav.navlist12")}}</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul class="flex_column_around">
                        <li>
                            <a class="h5_font_no_hover pos_foot_txt0">{{$t("nav.navlist13")}}</a>
                        </li>
                        <li>
                            <a class="list_font pos_foot_txt3" @click="goHelp">{{$t("nav.navlist14")}}</a>
                        </li>
                        <li>
                            <a class="list_font pos_foot_txt3" @click="goUserServer">{{$t("nav.navlist15")}}</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul class="flex_column_around">
                        <li>
                            <a class="h5_font_no_hover pos_foot_txt0">{{$t("nav.navlist16")}}</a>
                        </li>
                        <li>
                            <el-tooltip class="item" effect="dark" placement="left">
                                <div slot="content">
                                    <img src="../images/weixin.png" alt="">
                                </div>
                                <a class="list_font pos_foot_txt3">{{$t("nav.navlist17")}}</a>
                            </el-tooltip>
                        </li>
                        <li>
                            <el-tooltip class="item" effect="dark" placement="left">
                                <div slot="content">
                                    <img src="../images/weibo.png" alt="">
                                </div>
                                <a class="list_font pos_foot_txt3" href="https://weibo.com/p/1006066443936086?is_hot=1"
                                   target="_blank">
                                    {{$t("nav.navlist18")}}</a>
                            </el-tooltip>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul v-if="webParam.region_code == 1" class="flex_column_center">
                        <li class="newmodal kefu_box">
                            <img src="../images/qq_kfu@2x.png" alt="" width="16">
                            <a>{{$t("nav.navlist19")}}</a>
                        </li>
                        <!--<li class="web_phone_number pos_banner_txt0">-->
                        <!--021-80270833-->
                        <!--</li>-->
                        <li style="margin-top: 10px;" class="product_font">
                            {{$t("nav.navlist20")}}
                        </li>
                    </ul>
                    <div v-if="webParam.region_code == 0" class="flex_column_center">
                        <img src="../images/email_icon.png" alt="" width="28">
                        <p class="email_font pos_warm_txt">kf@leigod.com</p>
                        <p class="connect_email_font">{{$t("nav.navlist26")}}</p>
                    </div>
                </div>
            </div>
            <div class="solid_line"></div>
            <!--foot-two-->
            <div class="flex_row_between pos_foot_txt2">
                <div>
                    <ul>
                        <!--<li class="pos_foot_txt3">-->
                        <!--<span class="h5_font12_white">{{$t("nav.navlist21")}}</span>-->
                        <!--<span class="product_font">{{$t("nav.navlist22")}}</span>-->
                        <!--</li>-->
                        <li class="pos_foot_txt3">
                            <p class="product_font">{{$t("nav.navlist23")}}
                            </p>
                        </li>
                        <li>
                            <p class="product_font">{{$t("nav.navlist24")}}</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul class="flex_row_between">
                        <li class="pos_foot_img">
                            <a id="_pingansec_bottomimagesmall_brand"
                               href="http://si.trustutn.org/info?sn=544171218031154034526&certType=1">
                                <img src="https://v.trustutn.org/images/cert/brand_bottom_small.jpg">
                            </a>
                        </li>
                        <li class="pos_foot_img">
                            <a
                                    key="5a15257a0c909623245ac96b"
                                    href="http://www.cn-ecusc.org.cn/cert/aqkx/site/?site=www.leigod.com">
                                <img src="//static.anquan.org/static/outer/image/aqkx_124x47.png?id=www.leigod.com?t=79">
                            </a>
                        </li>
                        <li class="pos_foot_img">
                            <a
                                    key="5a15257a0c909623245ac96b"
                                    logo_size="124x47"
                                    logo_type="business"
                                    href="https://v.pinpaibao.com.cn/authenticate/cert/?site=www.leigod.com&at=business">
                                <img src="//static.anquan.org/static/outer/image/hy_124x47.png?id=www.leigod.com?t=79">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import JumpWebUtil from '@/ts/utils/JumpWebUtil';
    import GlobalConfig from '@/pages/leishen_user/global.config';
    import {Tooltip} from "element-ui";
    import AppParamModel from "../../../ts/models/AppModel";

    @Component({
        components: {
            "el-tooltip": Tooltip
        }
    })
    export default class FootNav extends Vue {
        public webParam = AppParamModel.getInstace();

        /**
         * 跳转套餐页面
         */
        public goRecharge() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_RECHARGE);
        }

        /**
         * 跳转活动专区
         */
        public goActivity() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_ACTIVITY);
        }

        /**
         * 跳转客服帮助
         */
        public goHelp() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_HELP);
        }

        /**
         * 跳转会员服务条款
         */
        public goUserServer() {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_USERSERVER);
        }

    }
</script>