<template>
    <div class="check_pop_box">
        <p class="app_main_font">请选择支付方式</p>
        <div class="app_payment_box" style="justify-content: space-around;">
            <div class="flex_column_center" @click="onChooseAndPay(2)">
                <img src="../../images/alipay@2x.png" alt="" width="30"/>
                <p>支付宝</p>
            </div>
            <div class="flex_column_center" @click="onChooseAndPay(1)">
                <img src="../../images/wechat@2x.png" alt="" width="30"/>
                <p>微信支付</p>
            </div>
            <!-- <div class="flex_column_center" @click="onChooseAndPay(3)">
                    <img src="../../images/qq@2x.png" alt="" width="30" />
                    <p>QQ钱包</p>
                </div> -->
        </div>
    </div>
</template>

<script src="./RechargeDialog.ts" lang="ts">
</script>
