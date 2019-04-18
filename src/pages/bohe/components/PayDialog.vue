<template>
    <div class="pop">
        <div class="pay_main">
            <div class="pay_main_left">
                <p v-show="payobj.payType == 1" class="pay_main_tit"><i><img src="../images/icon_wechartpay.png" /></i>{{$t("precharge.m7")}}
                </p>
                <p v-show="payobj.payType == 2" class="pay_main_tit"><i><img src="../images/icon_zhifubao.png" /></i>{{$t("precharge.m8")}}
                </p>
                <!--支付宝支付显示-->
                <div v-if="payobj.payType == 1 || payobj.payType == 2">
                    <div>
                        <iframe frameborder="0" height="156px;" width="156px;" scrolling="no" :src="payobj.pay_url"></iframe>
                    </div>
                    <div class="sao">
                        <img src="../images/sao.png" />
                        <p v-show="payobj.payType == 1">{{$t("precharge.m23")}}</p>
                        <p v-show="payobj.payType == 2">{{$t("precharge.m24")}}</p>
                        <p>{{$t("precharge.m25")}}</p>
                    </div>
                    <p class="shixiao">{{$t("precharge.m26")}}</p>
                </div>
                <!--paypal-->
                <div v-if="payobj.payType==5" style="width: 156px;height: 290px;text-align: center;">
                    <img style="margin-top: 50px;" src="../images/paypal_logo.png" />
                    <div style="margin-top: 40px;" class="btn_common btn_z_blue_type"><a :href="payobj.pay_url">{{$t("precharge.m27")}}</a></div>
                </div>
            </div>
            <div class="pay_main_right">
                <p class="pay_right_tit">{{$t("precharge.m28")}}</p>
                <div class="pay_main_order_1">
                    <table style="width: 100%;border-collapse:separate; border-spacing:10px;">
                        <tr>
                            <td align="left">{{$t("precharge.m29")}}</td>
                            <td align="right">{{payobj.order_no}}</td>
                        </tr>
                        <tr style="margin-top: 10px;">
                            <td align="left">{{$t("precharge.m30")}}</td>
                            <td align="right">{{payobj.price_title}}</td>
                        </tr>
                        <tr>
                            <td align="left">{{$t("precharge.m31")}}</td>
                            <td align="right">{{payobj.package_title}}</td>
                        </tr>
                        <tr>
                            <td align="left">{{$t("precharge.m32")}}</td>
                            <td align="right" style="color: #DE394A;font-size: 18px;">
                                {{(region_code == 0? '$' : '¥') + payobj.amount}}
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="wenxin_tips">
                    <p>{{$t("precharge.m33")}}</p>
                    <p>{{$t("precharge.m34")}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import GlobalConfig from "../global.config";
import CheckPayStatusProxy from "../../../ts/proxy/CheckPayStatusProxy";
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import Util from '@/ts/utils/Util';
import JumpWebUtil from "../../../ts/utils/JumpWebUtil";

@Component
export default class PayDialog extends CheckPayStatusProxy {
    public region_code: number = LocalStorageUtil.getRegionCodes();

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
    }

    /**
     * token过期的处理
     */
    public tokenExpired() {
        LocalStorageUtil.loginOut();
        JumpWebUtil.backLogin();
    }

    /**
     * 支付成功
     */
    public paySuccess() {
        this.onClose();
        this.$emit("paysuccess");
    }

    /**
     * 关闭
     */
    public onClose() {
        this.onCleanInvoiceState();
    }
}
</script>



