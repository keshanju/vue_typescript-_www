<template>
    <div v-loading="isLoading" :element-loading-text="loadingMsg" class="user_recharge_bh">
        <div class="l_list_info_package m_right_com_user">
            <ul class="clearfix_a">
                <li class="flex_s cate_package_bh ">
                    <p class="package_bh com_list_info">{{$t("precharge.m35")}}</p>
                    <!-- 1 -->
                    <div class="clearfix_a">
                        <div @click="onChoosePackageTypeA(index)"
                             class="mouth_plan_bh left_bh com_pac_prc m_right_com_user"
                             :class="{active_pac_prc_pay_bh:czTypeIndex == index,cannot_buy:czTypeUserIndex != index  && userInfo.is_switch_package == 0}"
                             v-for="(item,index) in packageList" :key="index">
                            <span v-text="item.package_title"></span>
                        </div>
                    </div>
                </li>
                <li class="flex_s cate_price_bh" style="margin-bottom: 10px;">
                    <p class="price_bh com_list_info">{{$t("precharge.m2")}}</p>
                    <!-- 2 -->
                    <div class="pak_width">
                        <div style="margin-bottom: 20px" @click="onChoosePrice(index)" v-for="(item,index) in priceList"
                             :key="index" :class="{active_pac_prc_pay_bh:priceIndex == index}"
                             class="left_bh com_pac_prc m_right_com_user mouth_plan_bh">
                            <p class="get_time" v-text="item.price_title"></p>
                            <div class="flex_cen">
                                <span class="get_rmb_yen" v-text="region_code == 0? '$' : '¥'">￥</span>
                                <p class="get_amount_cash" v-text="item.price_num"></p>
                            </div>
                            <i v-text="item.price_short_desc" class="price_icon"></i>
                        </div>
                    </div>
                </li>
                <li class="flex_s coupon_code_bh" style="margin-bottom: 10px;">
                    <p class="coupon_bh com_list_info">{{$t("precharge.m3")}}</p>
                    <!-- 3 -->
                    <div class="">
                        <input v-model="zheCode" class="ple_input" type="text" :placeholder="$t('precharge.m20')">
                        <span class="options_to_choose">{{$t("precharge.m4")}}</span>
                    </div>
                </li>
                <li class="flex_s amount_mon_bh" style="margin-bottom: 10px;">
                    <p class="amount_bh com_list_info">{{$t("precharge.m5")}}</p>
                    <!-- 4 -->
                    <div class=" flex_s">
                        <span class="get_rmb_yen dep_amount" v-text="region_code == 0? '$' : '¥'"></span>
                        <p class="get_amount_cash dep_amount" v-text="choosePrice"></p>
                    </div>
                </li>
                <li class="flex_s payment_list_bh" style="margin-bottom: 20px;">
                    <p class="pay_bh com_list_info">{{$t("precharge.m6")}}</p>
                    <!-- 5 -->
                    <div class="clearfix_a">
                        <div @click="onChoosePayType(1)" class="left_bh com_pac_prc m_right_com_user mouth_plan_bh"
                             :class="{active_pac_prc_pay_bh:payType == 1}" v-show="payshowobj.is_show_wx">
                            {{$t("precharge.m7")}}
                        </div>
                        <div @click="onChoosePayType(2)" class="f_pay left_bh com_pac_prc m_right_com_user"
                             :class="{active_pac_prc_pay_bh:payType == 2}" v-show="payshowobj.is_show_zfb">
                            {{$t("precharge.m8")}}
                        </div>
                        <div @click="onChoosePayType(5)" class="f_pay left_bh com_pac_prc m_right_com_user"
                             :class="{active_pac_prc_pay_bh:payType == 5}" v-show="payshowobj.is_show_paypal">
                            {{$t("precharge.m9")}}
                        </div>
                    </div>
                </li>
                <li class="flex_s pay_instance_bh" style="margin-bottom: 10px;">
                    <!-- 7 -->
                    <div class="m_right_com_user">
                        <a @click="clickPay"
                           class="payinstace_btn cursor_pointer words_col0">{{$t("precharge.m10")}}</a>
                    </div>
                    <!--<div class="flex_bet">-->
                    <!--<input type="checkbox" class="input_choose_auto">-->
                    <!--<p class="auto_recharge">到期自动续费</p>-->
                    <!--</div>-->
                </li>
                <li class="flex_s">
                    <!-- 8 -->
                    <p class="click_to_agree">{{$t('precharge.m36')}}</p>
                </li>
                <!--下载-->
                <div class="user_down_div">
                    <p class="user_down_txt" style="margin:20px 0px;">{{$t("user.z33")}}</p>
                    <div class="user_down_content">
                        <div @click="downloadWindowsClient" class="user_down_cell_content">
                            <div class="user_down_centen_content" style="margin-left: 20px;">
                                <img class="user_down_img" src="../images/d_windows_icon.png"/>
                                <p class="user_down_txt_1" style="margin-left: 5px">Windows</p>
                            </div>
                            <div></div>
                            <div style="margin-right: 20px;">
                                <div class="user_down_btn"></div>
                            </div>
                        </div>

                        <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">
                                <download-box :phonetype="'android'"></download-box>
                            </div>
                            <div class="user_down_cell_content" style="margin-left: 20px">
                                <div class="user_down_centen_content" style="margin-left: 20px;">
                                    <img class="user_down_img" src="../images/d_android_icon.png"/>
                                    <p class="user_down_txt_1" style="margin-left: 5px">Android</p>
                                </div>
                                <div></div>
                                <div style="margin-right: 20px;">
                                    <div class="user_down_btn_qr"></div>
                                </div>
                            </div>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">
                                <download-box :phonetype="'ios'"></download-box>
                            </div>
                            <div class="user_down_cell_content" style="margin-left: 20px">
                                <div class="user_down_centen_content" style="margin-left: 20px;">
                                    <img class="user_down_img" src="../images/d_apple_icon.png"/>
                                    <p class="user_down_txt_1" style="margin-left: 5px">iOS</p>
                                </div>
                                <div></div>
                                <div style="margin-right: 20px;">
                                    <div class="user_down_btn_qr"></div>
                                </div>
                            </div>
                        </el-tooltip>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import RechargeProxy from "@/ts/proxy/RechargeProxy";
    import {TipsMsgUtil} from "../../../ts/utils/TipsMsgUtil";
    import GlobalConfig from "@/pages/bohe/global.config";
    import {PayConfigModel} from '@/ts/models/UserModel';
    import LocalStorageUtil from "../../../ts/utils/LocalStorageUtil";
    import JumpWebUtil from "../../../ts/utils/JumpWebUtil";
    import DownloadBox from './DownloadBox.vue';
    import ConfigUtil from "../../../ts/utils/ConfigUtil";
    import WebParamModel from "../../../ts/models/WebModel";

    @Component({
        components: {
            'download-box': DownloadBox,
        }
    })
    export default class UserRecharge extends RechargeProxy {

        public webParam = WebParamModel.getInstace(); // 浏览器参数
        public isInit: boolean = false;
        public windowsDownloadUrl: string = "";
        public macDownloadUrl: string = "";
        @Prop() public payshowobj: PayConfigModel;//支付方式显示配置

        /**
         * 初始化
         */
        public created() {
            this.setBaseUrl(GlobalConfig.getBaseUrl());
            this.getDownloadUrl();
        }

        /**
         * token过期的处理
         */
        public tokenExpired() {
            LocalStorageUtil.loginOut();
            JumpWebUtil.backLogin();
        }

        /**
         *
         */
        public initA() {
            // 这里做缓存处理，不用每次点击都发送请求
            if (this.isInit) return;
            this.isInit = true;
            this.init();
        }

        /**
         * 点击支付
         */
        public clickPay() {
            this.onPay();
        }

        /**
         * 获取套餐成功
         */
        public getUserPackageSuccess() {
            this.onChoosePackageTypeA(null);
        }

        /**
         * 选择套餐
         */
        public onChoosePackageTypeA(type: any) {
            if (this.packageList.length <= 0) return;
            if (type == this.czTypeIndex) return;
            if (this.czTypeUserIndex != type && type != null && this.userInfo.is_switch_package == 0) {
                return;
            }
            this.onChoosePackageType(type);
        }

        /**
         * 请求支付成功
         */
        public onBeginpaySuccess() {
            // paypal支付自动刷新页面
            if (this.payType == 5) {
                //打开支付页面
                window.location.href = this.payObj.pay_url;
            }
            this.payObj.payType = this.payType;
            this.$emit("onbeginpay", this.payObj);
        }

        /**
         * 请求支付失败
         */
        public onBeginpayError(msg: string) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: msg,
                type: "warning"
            });
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

