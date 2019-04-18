<template>
    <div class="pay_shadow">
        <div class="pop">
            <div class="pay_main">
                <span><a><img @click="onClosePay" style="cursor:pointer;" src="../images/cancel1.png" /></a></span>
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
                        <p class="shixiao" style="margin-bottom: 20px;">{{$t("precharge.m26")}}</p>
                    </div>
                    <!--paypal-->
                    <div v-if="payobj.payType==5" style="width: 156px;height: 290px;text-align: center;">
                        <img style="margin-top: 50px;" src="../images/paypal_logo.png" />
                        <div style="margin-top: 40px;" class="btn_common btn_z_blue_type">
                            <a :href="payobj.pay_url">{{$t("precharge.m27")}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import CheckPayStatusProxy from "@/ts/proxy/CheckPayStatusProxy";
import GlobalConfig from "../global.config";
import { PayModel } from '@/ts/models/UserModel';
import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';
import AppParamModel from '@/ts/models/AppModel';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";

@Component
export default class PayDialog extends CheckPayStatusProxy {
    @Prop() public payobj: PayModel;
    public appParam: AppParamModel = AppParamModel.getInstace();
    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
    }

    /**
     * 支付成功
     */
    public paySuccess() {
        this.onClose();
        this.$emit("paysuccess");
    }

    /**
     * token过期的处理
     */
    public tokenExpired() {
        LocalStorageUtil.loginOut();
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.loginExpire();
        JumpWebUtil.backHome();
    }

    /**
     * 关闭
     */
    public onClose() {
        this.onCleanInvoiceState();
    }

    /**
     * 关闭弹窗
     */
    public onClosePay() {
        this.onCleanInvoiceState();
        this.$emit("closepaydialog");
    }
}
</script>

<style>
.pop {
    position: absolute;
    margin-left: -120px;
    left: 50%;
    top: 50px;
}
.pay_main {
    display: block;
    background-color: #fff;
    border-radius: 4px;
    width: 100%;
    overflow: hidden;
}

.pay_main span {
    position: absolute;
    right: 8px;
    top: 10px;
    display: block;
    width: 20px;
    height: 20px;
}

.pay_main span img {
    width: 70%;
}

.pay_main {
    left: 40%;
    background-color: #eee;
}

.pay_main_left {
    display: block;
    margin: 0 auto;
    color: #3e474f;
    text-align: center;
    padding: 0 50px;
    float: left;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
}

.pay_main_left img.pay_main_code {
    display: block;
    width: 150px;
    height: 150px;
    overflow: hidden;
}

.pay_main_tit {
    font-size: 14px;
    display: table;
    margin: 10px auto;
    height: 30px;
    line-height: 30px;
}

.pay_main_tit i {
    display: block;
    width: 30px;
    height: 30px;
    float: left;
}

.pay_main_tit i img {
    width: 90%;
}

.sao {
    margin-bottom: 20px;
    margin-top: 20px;
}

.sao img {
    display: block;
    float: left;
    margin-right: 6px;
    margin-left: 5px;
    margin-top: 4px;
}
</style>




