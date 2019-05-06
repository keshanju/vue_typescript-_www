<template>
    <div v-loading="isLoading" :element-loading-text="loadingMsg">
        <el-table :data="orderList" border style="width: 100%">
            <el-table-column prop="invoice_no" :label="$t('userorder.s1')" width="160">
            </el-table-column>
            <el-table-column prop="package_name" :label="$t('userorder.s2')" width="90">
            </el-table-column>
            <el-table-column prop="price_name" :label="$t('userorder.s3')" width="80">
            </el-table-column>
            <el-table-column prop="discount_code" :label="$t('userorder.s4')" width="80">
            </el-table-column>
            <el-table-column prop="pay_date" :label="$t('userorder.s5')" width="140">
            </el-table-column>
            <el-table-column prop="invoice_status_title" :label="$t('userorder.s6')" width="105">
            </el-table-column>
            <el-table-column prop="invoice_money" :label="$t('userorder.s9')" width="100">
            </el-table-column>
            <el-table-column :label="$t('userorder.s7')">
                <template slot-scope="scope">
                    <el-button @click="onChooseOrderPayType(scope.row)" v-show="scope.row.invoice_status == 0" type="text" size="small">{{$t("userorder.s8")}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background @prev-click="onGetUserOrderList" @next-click="onGetUserOrderList" @current-change="onGetUserOrderList" :page-size="6" layout="prev, pager, next" :total="total">
        </el-pagination>
        <el-dialog :title="$t('userorder.s10')" width="30%" :visible.sync="payTypeDialogVisible">
            <ul class="pay_ways clearfix_a">
                <li @click="onConfirmChooseOrderPayType(1)" class="pay_way"  v-show="payshowobj.is_show_wx"><a><i class="pay_wechart_1 pay_icon"></i>
                        <p>{{$t('userorder.s11')}}</p>
                    </a></li>
                <li @click="onConfirmChooseOrderPayType(2)" class="pay_way" v-show="payshowobj.is_show_zfb"><a><i class="pay_zfb pay_icon"></i>
                        <p>{{$t('userorder.s12')}}</p>
                    </a></li>
                <li @click="onConfirmChooseOrderPayType(5)" class="pay_way" v-show="payshowobj.is_show_paypal"><a><i class="pay_paypal pay_icon"></i>
                        <p>{{$t('userorder.s13')}}</p>
                    </a></li>
            </ul>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GlobalConfig from "@/pages/bohe/global.config";
import { Table, TableColumn, Button, Pagination } from 'element-ui';
import OrderProxy from '@/ts/proxy/OrderProxy';
import { PayConfigModel } from '@/ts/models/UserModel';
import LocalStorageUtil from "../../../ts/utils/LocalStorageUtil";
import JumpWebUtil from "../../../ts/utils/JumpWebUtil";

@Component({
    components: {
        "el-table": Table,
        "el-table-column": TableColumn,
        "el-button": Button,
        "el-pagination": Pagination
    }
})
export default class UserOrder extends OrderProxy {
    @Prop() public payshowobj!: PayConfigModel;//支付方式显示配置

    created() {
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
     * 请求支付成功
     */
    onBeginpaySuccess() {
        this.$emit("onbeginpay", this.payObj);
    }

    /**
     * 请求支付成功
     */
    onGetUserOrderList(val: number) {
        this.getUserOrderList(val)
    }
}
</script>



<style scoped lang='less'>
 
  
</style>


