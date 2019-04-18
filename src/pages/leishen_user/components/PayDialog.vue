<template>
        <div style="height:100%">
            <div class="flex_row_around" v-show="!paySuccessShow" style="height:90%">
                <div class="flex_column_center">
                    <div class="pay_icon_box">
                        <img v-show="payobj.payType == 1" src="../images/wechat_logo@2x.png" alt="" class="img_filter">
                        <img v-show="payobj.payType == 3" src="../images/qqqianbao_logo@2x.png" alt="" class="img_filter">
                        <img v-show="payobj.payType == 2" src="../images/alipay_logo@2x.png" alt="" class="img_filter">
                    </div>
                    <div class="erweima_box">
                        <iframe frameborder="0" height="156px;" width="156px;" scrolling="no" :src="payobj.pay_url"></iframe>
                    </div>
                    <p class="">{{$t("recharge.c7")}}</p>
                </div>
                <div class="flex_column_around" style="height:100%;text-align:center;">
                    <p>
                        <span>{{$t("recharge.c8")}}</span>
                        <span>{{payobj.order_no}}</span>
                    </p>
                    <div class="pay_price">
                        <span style="font-size:16px;">￥</span>
                        <span>{{payobj.amount}}</span>
                    </div>
                    <div class="flex_row_center">
                        <div class="saoyisao_box">
                            <img class="img_filter" src="../images/saoyisao.png" alt="">
                        </div>
                        <div>
                            <p v-show="payobj.payType == 1">
                                {{$t("recharge.c9")}}
                            </p>
                            <p v-show="payobj.payType == 2">
                                {{$t("recharge.c10")}}
                            </p>
                            <p v-show="payobj.payType == 3">
                                {{$t("recharge.c11")}}
                            </p>
                            <p>
                                {{$t("recharge.c12")}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex_column_between" v-show="paySuccessShow" style="height: 90%;">
                <div class="flex_column_center">
                    <div class="pay_result_box"></div>
                    <p>{{$t("recharge.c13")}}</p>
                </div>
                <div class="pay_order_info" style="margin:20px 0;">
                    <div class="flex_row_between" style="padding:5px 10px;">
                        <p>{{$t("recharge.c14")}}</p>
                        <p>{{payobj.amount}}</p>
                    </div>
                    <div class="flex_row_between" style="padding:5px 10px;">
                        <p>{{$t("recharge.c15")}}</p>
                        <p>{{payobj.order_no}}</p>
                    </div>
                    <div class="flex_row_between" style="padding:5px 10px;">
                        <p>{{$t("recharge.c16")}}</p>
                        <p>{{$t("recharge.c17")}}</p>
                    </div>
                </div>
                <p>
                    {{$t("recharge.c18")}}
                </p>
            </div>
        </div>
</template>
<script lang="ts">
    import { Component, Prop } from "vue-property-decorator";
    import CheckPayStatusProxy from "../../../ts/proxy/CheckPayStatusProxy";
    import GlobalConfig from "../global.config";
    import { PayModel } from '@/ts/models/UserModel';

    @Component
    export default class PayDialog extends CheckPayStatusProxy {
        public paySuccessShow: boolean = false;//是否支付成功

        /**
         *
         */
        public created() {
            this.setBaseUrl(GlobalConfig.getBaseUrl());
        }

        /**
         * 支付成功
         */
        public paySuccess() {
            this.onClose();
            this.paySuccessShow = true;
        }

        /**
         * 关闭
         */
        public onClose() {
            this.paySuccessShow = false;
            this.onCleanInvoiceState();
        }
    }
</script>