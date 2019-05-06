<template>
    <div class="mui-content orderBox">
        <div class="orderList" v-show="!showNopic" >
            <div id="slider" class="mui-slider">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadList" :offset="0">

                    <div class="mui-table-view-cell leigod_mb15" style="background:#fff;"
                         v-for="(item,index) in showOrderList" :key="index">
                        <div class="orderList_tit">
                            <h5>付款金额</h5>
                            <h4>¥ {{item.invoice_money}}</h4>
                        </div>
                        <ul class="orderList_con">
                            <li class="orderList_con_cell">
                                <h5>订单号</h5>
                                <h6>{{item.invoice_no}}</h6>
                            </li>
                            <li class="orderList_con_cell">
                                <h5>订单信息</h5>
                                <h6 class="payid">{{item.package_name}}</h6>
                            </li>
                            <li class="orderList_con_cell">
                                <h5>支付/开通时间</h5>
                                <h6>{{item.invoice_date}}</h6>
                            </li>
                            <li class="orderList_con_cell">
                                <h5>订单状态</h5>
                                <h6 class="state">{{item.invoice_status_title}}</h6>
                            </li>
                        </ul>
                    </div>
                </van-list>
            </div>
        </div>
        <div v-show="showNopic" class="leigod_flex" style="flex-direction: column;height: 85vh;">
            <img src="../images/nodingdan.png" width="67" alt="">
            <h5 class="noorderTit">您暂无订单</h5>
            <a class="gotorecharge" @click="gotoRecharge">去充值</a>
        </div>
    </div>

</template>
<script lang="ts">
    import UserOrder from "./UserOrderControl";

    export default UserOrder;
</script>