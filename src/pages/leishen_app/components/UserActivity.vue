<template>
    <div>
        <div class="mui-content orderBox" v-show="!isNeedUserAddress">
            <div class="orderList" v-show="!showNopic">
                <div id="slider" class="mui-slider">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadList" :offset="0">

                        <div class="mui-table-view-cell leigod_mb15" style="background:#fff;"
                             v-for="(item,index) in showActiveRecordList" :key="index">
                            <div class="orderList_tit">
                                <h5 style="font-size:16px;font-weight:600;">{{item.activity_title}}</h5>
                            </div>
                            <ul class="orderList_con">
                                <li class="orderList_con_cell" style="margin-top:10px;">
                                    <h5>抽奖时间</h5>
                                    <h6>{{item.create_time}}</h6>
                                </li>
                                <li class="orderList_con_cell">
                                    <h5>中奖礼品</h5>
                                    <h6 class="payid">{{item.present_title}}</h6>
                                </li>
                                <li class="orderList_con_cell">
                                    <h5>状态</h5>
                                    <h6 class="state">{{item.status_title}}</h6>
                                </li>
                                <li class="orderList_con_cell" style="padding: 8px 16px;">
                                    <a @click="onChooseOrderPayType(item)" class="activity-btn"
                                       v-show="item.status == 0">立即兑奖</a>
                                    <a @click="onChooseOrderPayType(item)" class="activity-btn"
                                       v-show="item.status != 0">查看详情</a>
                                </li>
                            </ul>
                        </div>
                    </van-list>
                </div>
            </div>
            <div v-show="showNopic" class="leigod_flex" style="flex-direction: column;height: 85vh;">
                <img src="../images/nodingdan.png" width="67" alt="">
                <h5 class="noorderTit">您暂无活动记录</h5>
            </div>
            <van-dialog v-model="payTypeDialogVisible" show-cancel-button :showCancelButton="false"
                        :confirmButtonText="'朕知道了'" :lazy-render="false" @close="getAreaCodeList">
                <div v-show="dialogType=='2'" style="text-align:center;">
                    <!-- 客服尽快为你发出奖品，请注意查收 -->
                    <img src="../images/huowu.png">
                    <p>奖品发放中，请耐心等待！</p>
                </div>
                <div v-show="dialogType=='3'">
                    <p class="cardpass-title">详情</p>
                    <!-- 第三方充值卡 -->
                    <p class="cardpass-tip">{{otherCard}}</p>
                    <div class="cardpass-box">
                        <!--密码为空，就显示CDKEY码 -->
                        <p v-show="cardInfo.card_password==''">CDKEY码：{{cardInfo.card_no}}</p>
                        <!--密码不为空，就显示卡号和密码 -->
                        <p v-show="cardInfo.card_password!=''">卡号：{{cardInfo.card_no}}</p>
                        <p v-show="cardInfo.card_password!=''">密码：{{cardInfo.card_password}}</p>
                    </div>
                </div>
                <div v-show="dialogType=='4'">
                    <!-- 卡密充值 -->
                    <p class="cardpass-title">详情</p>
                    <p class="cardpass-tip">系统已自动为您充值到账户, 请查看您的加速时间如未充值成功, 请您手动输入卡密进行充值</p>
                    <div class="cardpass-box">
                        <!--密码为空，就显示CDKEY码 -->
                        <p v-show="cardInfo.card_password==''">
                            <span>CDKEY码：</span>
                            {{cardInfo.card_no}}
                        </p>
                        <!--密码不为空，就显示卡号和密码 -->
                        <p v-show="cardInfo.card_password!=''">
                            <span>卡号：</span>
                            {{cardInfo.card_no}}
                        </p>
                        <p v-show="cardInfo.card_password!=''">
                            <span>密码：</span>
                            {{cardInfo.card_password}}
                        </p>
                    </div>
                </div>
                <div v-show="dialogType=='5'">
                    <!-- 卡密充值 -->
                    <p class="cardpass-title">详情</p>
                    <!-- 第三方充值卡 -->
                    <p class="cardpass-tip">{{otherCard}}</p>
                    <div class="cardpass-box">
                        <!--密码为空，就显示CDKEY码 -->
                        <p class="chongzhi flex_row_start" style="align-items: flex-start;text-align: left">
                            <span style="width: 35%;text-align: center">{{$t('user.b67_16')}}:</span>
                            <span style="width: 65%;">{{discount_title}}</span>
                        </p>
                        <p class="chongzhi flex_row_start" style="align-items: flex-start;text-align: left">
                            <span style="width: 35%;text-align: center">{{$t('user.b67_14')}}:</span>
                            <span style="width: 65%;">{{discount}}</span>
                        </p>
                        <p class="chongzhi flex_row_start" style="align-items: flex-start;text-align: left">
                            <span style="width: 35%;text-align: center">{{$t('user.b67_15')}}:</span>
                            <span style="width: 65%;">{{desc}}</span>
                        </p>
                        <p class="chongzhi">
                            {{details}}
                        </p>
                    </div>
                </div>
            </van-dialog>
        </div>
        <div id="userPrizeInfo" v-show="isNeedUserAddress">
            <van-nav-bar title="填写兑奖信息" left-text="返回" style="margin-bottom: 6px;margin-top:56px;background: #f2f2f2;" left-arrow
                         @click-left="cancellSubmit"/>
            <van-cell-group style="background-color:#F2F2F2 !important; margin:8px 16px;">
                <van-field v-model="username" required label="用户名" placeholder="请输入"/>
                <van-field v-model="phone" style="margin-top:2px;" required placeholder="请输入">
                        <span slot="left-icon" @click="AreaCodeshow=true" style="cursor:pointer; ">
                            <span style="line-height: 24px;vertical-align: text-bottom;">
                           手机号 +{{country_code}}   </span>
                            <van-icon name="arrow-down" style="display: inline-block;"/>
                        </span>
                </van-field>
                <van-field v-model="address" label="支付宝账号" style="margin-top:2px;" required placeholder="请输入"/>
                <van-field v-model="email" label="邮箱" required style="margin-top:2px;" placeholder="请输入"/>
            </van-cell-group>
            <p style="color:#FF750E; padding:12px 12px 24px;">温馨提示: 请填写真实有效的收货/收款信息, 如填写无效信息, 导致未收到奖品, 本公司概不负责</p>
            <div style="text-align: center;padding: 0px 16px;">
                <button class="btn login_btn" type="button" @click="sendUserInfo">提交</button>
            </div>
            <div style="text-align: center; padding: 0px 16px;">
                <button class="btn login_btn" style="background: #fff;" type="button" @click="cancellSubmit">取消</button>
            </div>
            <van-popup v-model="AreaCodeshow" position="right" :lazy-render="false" style="width: 100%;">
                <country-item @getcountry="getcountry"></country-item>
            </van-popup>
        </div>
    </div>

</template>
<script lang="ts">
    import userActivity from "./userActivityControl";

    export default userActivity;
</script>
