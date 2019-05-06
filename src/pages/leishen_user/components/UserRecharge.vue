<template>
    <div>
        <div class="components_cell" style="background: #ebebeb;min-height:400px;"  v-loading="isLoading">
            <div class="wrap_package">
                <ul class="webpackage_box_fa" style="box-shadow: none;">
                    <li class="webpackage_user_box" @click="onChoosePrice(index)" v-for="(item,index) in priceList" :key="index"
                        :class="{user_webpackage_active:priceIndex == index}">
                        <img class="xianshi_activity" :src="jiaobiao_obj.jiaobiao_url" alt="" v-show="jiaobiao_obj.is_show && item.price_is_recommend == 1">
                        <p style="position: absolute;top: 20px;text-align: center;width: 100%;left: 0;" v-if="jiaobiao_obj.is_show && item.price_is_recommend == 1">{{jiaobiao_obj.jiaobiao_msg}}</p>
                        <div class="webpackage_top_cell">
                            <!--圆周动画的小icon-->
                            <b class="web_icon_anim"></b>
                            <p class="userpak_title_font" v-text="item.price_title"></p>
                            <p class="package_time_font">{{$t("recharge.c19")}}</p>
                        </div>
                        <div class="flex_row_start">
                            <span class="package_symbol_font" :class="{'package_activity_font':is_change_price == 1 && item.price_is_recommend == 1}">¥</span>
                            <span class="package_amount_font" :class="{'package_activity_font':is_change_price == 1 && item.price_is_recommend == 1}">{{item.price_num}}</span>
                            <s style="font-size:12px;margin-left: 8px;color: #999;" v-if="is_change_price == 1 && item.price_is_recommend == 1">原价50</s>
                        </div>
                        <div class="flex_row_around" style="text-align: center;height: 20px;color: #999;">
                            <span v-if="is_change_price != 1 || item.price_is_recommend != 1" v-text="item.price_short_desc" :class="{'font_red':index == 3}"></span>
                            <p v-if="is_change_price == 1 && item.price_is_recommend == 1" style="font-size: 14px;">
                                参与人数:
                                <span style="color:#FE6637;">{{payUserNum}}</span>
                            </p>
                        </div>
                        <div class="user_choose_icon"></div>
                    </li>
                </ul>
            </div>
            <div class="flex_sbe" style="background-color: #EBEBEB;">
                <div class="web_wrap_box">
                    <div class="web_left_box">
                        <p class="user_check_font">{{$t("recharge.c1")}}</p>
                        <div class="flex_al_center">
                            <p class="coin_font">¥</p>
                            <p class="pay_font">{{choosePrice}}</p>
                        </div>
                    </div>
                    <div class="web_center_box">
                        <p class="user_check_font">{{$t("recharge.c2")}}</p>
                        <div class="flex_row_around" style="width: 100%;">
                            <el-tooltip class="item" effect="light" placement="bottom">
                                <div slot="content">{{$t("user.b91")}}</div>
                                <a class="web_a_alipay" :class="{'web_ali_hover':payType == 2}" @click="onChoosePayType(2)"></a>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" placement="bottom">
                                <div slot="content">{{$t("user.b90")}}</div>
                                <a class="web_wechat" :class="{'web_wechat_hover':payType == 1}" @click="onChoosePayType(1)"></a>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" placement="bottom">
                                <div slot="content">{{$t("user.b92")}}</div>
                                <a class="web_a_qqpay" :class="{'web_qqpay_hover':payType == 3}" @click="onChoosePayType(3)"></a>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="web_right_box">
                        <img src="../images/off_5.png" alt="" v-if="userinfo.first_invoice_discount == 1">
                        <p class="user_check_font" v-if="userinfo.first_invoice_discount != 1">{{$t("recharge.c29")}}</p>
                        <el-autocomplete
                                class="inline-input"
                                v-model="zheCode"
                                :fetch-suggestions="querySearch"
                                :placeholder="$t('recharge.c30')"
                                @select="checkDiscount"
                                v-if="userinfo.first_invoice_discount != 1"
                        ></el-autocomplete>
                        <!--<input style="width: 110%;" v-model="zheCode" class="cart_input_box" type="text" :placeholder="$t('recharge.c30')" v-if="userinfo.first_invoice_discount != 1">-->
                    </div>
                </div>
                <div class="web_check_box">
                    <a class="public_btn checkbtn_font"  style="padding: 12px 45px;" @click="clickPay">
                        {{$t("recharge.c3")}}
                    </a>
                    <div class="web_protocol_box">
                        <div class="web_ipt_box pos_download_list" :class="{'web_service_agreen': serviceAgreen}">
                            <input type="checkbox" v-model="serviceAgreen" style="opacity: 0;">
                        </div>
                        <span class="pos_download_list warm_detail_font" @click="serviceAgreen = !serviceAgreen">
                            {{$t("recharge.c4")}}
                            <a class="warm_detail_font">{{$t("recharge.c5")}}</a>
                        </span>                        
                    </div>
                </div>
            </div>
        </div>
        <div class="components_cell">
            <div class="web_zanting_box">
                <p class="zanting_logo_font pos_zanting">{{$t('index.a1')}}</p>
                <p class="zanting_title_font pos_zanting">{{$t('index.a3')}}</p>
                <p class="zanting_buy_font pos_zanting">{{$t('index.a4')}}</p>
                <p class="zanting_detail_font">{{$t('recharge.c31')}}</p>
                <p class="zanting_detail_font">{{$t('index.a15')}}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import RechargeProxy from "@/ts/proxy/RechargeProxy";
    import {TipsMsgUtil} from "../../../ts/utils/TipsMsgUtil";
    import GlobalConfig from "@/pages/leishen_user/global.config";
    import {PayConfigModel, UserInfo} from '@/ts/models/UserModel';
    import LocalStorageUtil from "../../../ts/utils/LocalStorageUtil";
    import JumpWebUtil from "../../../ts/utils/JumpWebUtil";
    import AppParamModel from '@/ts/models/AppModel';
    import Util from "../../../ts/utils/Util";
    import ConfigUtil from "../../../ts/utils/ConfigUtil";
    import {Autocomplete} from "element-ui";

    @Component({
        components:{
            'el-autocomplete': Autocomplete
        }
    })
    export default class UserRecharge extends RechargeProxy {
        public isInit: boolean = false;
        public serviceAgreen: boolean = false;//是否勾选会员服务条款
        public webParam = AppParamModel.getInstace(); // 浏览器参数
        public payUserNum: number = 0;
        @Prop() public payshowobj: PayConfigModel;//支付方式显示配置
        @Prop() public xianshiactivityinfo: any;//是否显示限时活动标题
        @Prop() public userinfo!: UserInfo;
        public start_time: string = '';//首单特惠开始时间
        public end_time: string = '';//首单特惠结束时间
        public sc_timer = null;//首冲用户定时器
        public jiaobiao_obj = {};//角标显示配置

        /**
         * 初始化
         */
        public created() {
            this.setBaseUrl(GlobalConfig.getBaseUrl());
            this.getDownloadUrl();
            this.payType = 2;
        }

        public mounted(){

        }

        /**
         * 获取首冲特惠时间
         * @param url
         */
        public async getDownloadUrl() {
            const jsonConfig = await ConfigUtil.getInstance().download();
            const downConfig = jsonConfig.leigod.is_show_xianshi_activity;
            this.jiaobiao_obj = jsonConfig.leigod.jiaobiao_is_show;
            this.start_time = downConfig.start_time;
            this.end_time = downConfig.end_time;
            this.getSystemTime();
        }

        /**
         * 获取系统时间成功
         */
        public getSystemTimeSuccess(){
            /*** 首冲特惠倒计时 ****/
            let startDate = new Date(this.start_time).getTime();
            let endDate = new Date(this.end_time).getTime();
            let nowDate = new Date(this.now_time).getTime();
            if(nowDate < startDate || nowDate > endDate) return;
            this.payUserNum = Util.getPayUserNum(this.start_time,this.now_time,15);
            const that = this;
            this.sc_timer = setInterval(()=>{
                let num = Math.round((Math.random()*90 + 30)/60);
                that.payUserNum += num;
                let end = new Date(that.end_time).getTime();
                let now = new Date().getTime();
                if(now >= end) {
                    clearInterval(that.sc_timer)
                }
            },6000)
        }

        /**
         * 处理要显示的折扣码列表
         */
        public querySearch(queryString, cb) {
            let restaurants = this.discountList;
            // let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(restaurants);
        }

        /**
         * 筛选折扣码方法
         */
        public createFilter(queryString: string) {
            return (restaurant) => {
                return (restaurant.discount_code.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        }

        /**
         * 选择折扣码
         */
        public checkDiscount(item){
            console.log(item);
            this.zheCode = item.discount_code;
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
         *
         */
        public initA() {
            // 这里做缓存处理，不用每次点击都发送请求
            if (this.isInit) {
                this.getUserDiscount();
                return;
            }
            this.isInit = true;
            this.init();
        }

        /**
         * 点击支付
         */
        public clickPay() {
            if(!this.serviceAgreen){
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SERVICE_AGREEN),
                    type: 'warning'
                });
                return;
            }
            this.onPay();
        }

        /**
         * 获取套餐成功
         */
        public getUserPackageSuccess() {
            if(this.userInfo.is_switch_package == 0){
                this.onChoosePackageTypeA(null);
            }else {
                for(var i = 0; i<this.packageList.length;i++){
                    if (this.packageList[i].include_region_codes == this.webParam.region_code+''){
                        this.onChoosePackageType(i); 
                    }
                }
            }
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
         * 获取套餐成功
         */
        public getUserDiscountSuccess() {
            this.onChoosePrice(this.priceIndex);
        }

    }
</script>

