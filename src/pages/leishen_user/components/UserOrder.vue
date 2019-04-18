<template>
    <div style="margin-bottom:50px;" v-loading="isLoading">
        <div style="color: #000;padding:15px;" class="components_cell">
            <p class="web_news_title web_safty_font">{{$t("user.b79")}}</p>
            <el-table :data="orderList" border style="width: 100%">
                <el-table-column prop="invoice_no" :label="$t('user.b80')" width="220">
                </el-table-column>
                <el-table-column prop="package_name" :label="$t('user.b81')" width="80">
                </el-table-column>
                <el-table-column prop="price_name" :label="$t('user.b82')" width="75">
                </el-table-column>
                <el-table-column prop="discount_code" :label="$t('user.b83')" width="75">
                </el-table-column>
                <el-table-column prop="pay_date" :label="$t('user.b84')" width="125">
                </el-table-column>
                <el-table-column prop="invoice_status_title" :label="$t('user.b85')" width="115">
                </el-table-column>
                <el-table-column prop="invoice_money" :label="$t('user.b86')" width="90">
                </el-table-column>
                <el-table-column :label="$t('user.b87')">
                    <template slot-scope="scope">
                        <a @click="onChooseOrderPayType(scope.row)" v-show="scope.row.invoice_status == 0"
                           class="public_btn">{{$t("user.b88")}}</a>
                        <span v-show="scope.row.invoice_status != 0">{{scope.row.invoice_status_title}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="text-align:center;">
            <el-pagination class="user_pag" background @prev-click="onGetUserOrderList" @next-click="onGetUserOrderList"
                           @current-change="onGetUserOrderList" :page-size="11" layout="prev, pager, next"
                           :total="total">
            </el-pagination>
        </div>
        <el-dialog width="30%" :visible.sync="payTypeDialogVisible">
            <p style="text-align:center;margin-bottom:5px;">{{$t("user.b89")}}</p>
            <ul class="flex_row_around">
                <li @click="onConfirmChooseOrderPayType(1)" class="pay_way">
                    <i class="pay_wechat pay_icon"></i>
                    <p>{{$t("user.b90")}}</p>
                </li>
                <li @click="onConfirmChooseOrderPayType(2)" class="pay_way">
                    <i class="pay_zfb pay_icon"></i>
                    <p>{{$t("user.b91")}}</p>
                </li>
                <li @click="onConfirmChooseOrderPayType(3)" class="pay_way" v-show="webParam.region_code == 1">
                    <i class="pay_qq pay_icon"></i>
                    <p>{{$t("user.b92")}}</p>
                </li>
                <li @click="onConfirmChooseOrderPayType(5)" class="pay_way" v-show="webParam.region_code == 0">
                    <i class="pay_paypal pay_icon"></i>
                    <p>{{$t("user.b93")}}</p>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import {Table, TableColumn, Button, Pagination} from 'element-ui';
    import OrderProxy from '@/ts/proxy/OrderProxy';
    import GlobalConfig from '@/pages/leishen_user/global.config';
    import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
    import JumpWebUtil from '@/ts/utils/JumpWebUtil';
    import WebParamModel from '@/ts/models/WebModel';
    import AppParamModel from "../../../ts/models/AppModel";

    @Component({
        components: {
            "el-table": Table,
            "el-table-column": TableColumn,
            "el-button": Button,
            "el-pagination": Pagination
        }
    })
    export default class UserOrder extends OrderProxy {
        public webParam = AppParamModel.getInstace(); // 浏览器参数

        created() {
            this.setBaseUrl(GlobalConfig.getBaseUrl());
        }

        public initA() {
            this.getUserOrderList(1, 11);
        }

        /**
         * token过期的处理
         */
        public tokenExpired() {
            LocalStorageUtil.loginOut();
            let param = window.location.search;
            JumpWebUtil.wapJump(GlobalConfig.getUserBaseUrl(), JumpWebUtil.HTML_NAME_LOGIN, param);
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
            this.getUserOrderList(val, 11)
        }
    }
</script>
