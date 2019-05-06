<template>
    <div class="dialog">
        <div class="shadow"></div>
        <div class="pop" style="top:0.3rem;">
            <div class="flex_sbe">
                <span>{{$t("recharge.c6")}}</span>
                <a class="cancel_icon" @click="closePayDialog"></a>
            </div>
            <div class="flex_row_around" v-show="!paySuccessShow" style="height:90%">
                <div class="flex_column_center" style="width:156px;">
                    <div class="pay_icon_box">
                        <img v-show="payobj.payType == 1" src="../images/wechat_logo@2x.png" alt="" class="img_filter">
                        <img v-show="payobj.payType == 3" src="../images/qqqianbao_logo@2x.png" alt="" class="img_filter">
                        <img v-show="payobj.payType == 2" src="../images/alipay_logo@2x.png" alt="" class="img_filter">
                    </div>
                    <div class="erweima_box">
                        <iframe frameborder="0" height="166px;" width="166px;" security="restricted" scrolling="no" :src="payobj.pay_url"></iframe>
                    </div>
                    <p class="">{{$t("recharge.c7")}}</p>
                </div>
                <div class="flex_column_around" style="height:100%;text-align:center;">
                    <p>
                        <span>{{$t("recharge.c8")}}</span>
                        <span>{{payobj.order_no}}</span>
                    </p>
                    <div class="pay_price">
                        <span style="font-size:0.16rem;">￥</span>
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
                <div>
                    <div class="pay_result_box"></div>
                    <p>{{$t("recharge.c13")}}</p>
                </div>
                <div class="pay_order_info">
                    <div class="flex_row_between" style="padding:0.05rem 0.1rem;">
                        <p>{{$t("recharge.c14")}}</p>
                        <p>{{payobj.amount}}</p>
                    </div>
                    <div class="flex_row_between" style="padding:0.05rem 0.1rem;">
                        <p>{{$t("recharge.c15")}}</p>
                        <p>{{payobj.order_no}}</p>
                    </div>
                    <div class="flex_row_between" style="padding:0.05rem 0.1rem;">
                        <p>{{$t("recharge.c16")}}</p>
                        <p>{{$t("recharge.c17")}}</p>
                    </div>
                </div>
                <p>
                    {{$t("recharge.c18")}}
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Prop } from "vue-property-decorator";
    import CheckPayStatusProxy from "../../../ts/proxy/CheckPayStatusProxy";
    import GlobalConfig from "../global.config";
    import { PayModel } from '@/ts/models/UserModel';
    import AppParamModel from '@/ts/models/AppModel';
import { ExtrnalFactory } from '@/ts/factory/ExtrnalFactory';

    @Component
    export default class PayDialog extends CheckPayStatusProxy {
        @Prop() public payobj!: PayModel;
        public paySuccessShow: boolean = false;//是否支付成功
        public appParam: AppParamModel = AppParamModel.getInstace();

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
            const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
            factory.rechargeSuccess();
        }

        /**
         * 关闭刷新
         */
        public onClose() {
            this.onCleanInvoiceState();
        }

        /**
         * 关闭支付弹窗
         */
        public closePayDialog(){
            this.paySuccessShow = false;
            this.onClose();
            this.$emit('closepaydialog')
        }
    }
</script>