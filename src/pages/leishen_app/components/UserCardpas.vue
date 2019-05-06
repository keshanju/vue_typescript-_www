<template>
  <div>
    <div class="mui-content loginBox" id="usercardRecharge">
      <van-tabs color="#6F839B" :swipeable=true animated type="card" :line-height="40">
        <van-tab title="CDKEY兑换">
          <form class="mui-input-group nobg" style="margin-top:32px;">
            <div class="login" style="border-bottom: none;">
              <div class="mui-input-row login_user">
                <input type="text" v-model="cd_key" class="mui-input-clear" style="padding-left: 15px;" placeholder="请输入CDKEY码">
              </div>
            </div>
            <button class="btn login_btn" type="button" @click="payCDKey">确定</button>
          </form>
          <!--温馨提示-->
          <div class="kami_tips">
            <div class="fee_tit">温馨提示</div>
            <ul class="vip_mind">
              <li>
                <span class="fee_dot"></span>
                <p>CDKEY是由16-18位字符组成的序列码，将您获得的序列码，输入到文本框，点击【确定】即可使用。</p>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="卡密充值">
          <form class="mui-input-group nobg" style="margin-top:16px;">
            <div class="login" style="border-bottom: none;">
              <div class="mui-input-row login_user">
                <input type="text" v-model="cardnum" class="mui-input-clear" style="padding-left: 15px;" placeholder="充值卡卡号">
              </div>
              <div class="mui-input-row login_user mui-password">
                <input type="password" v-model="cardpaw" class="mui-input-password" style="padding-left: 15px;" placeholder="请输入密码">
              </div>
            </div>
            <button class="btn login_btn" type="button" @click="oncharge">充值</button>
          </form>
          <!--温馨提示-->
          <div class="kami_tips">
            <div class="fee_tit">温馨提示</div>
            <ul class="vip_mind">
              <li>
                <span class="fee_dot"></span>
                <p>用户在第一次充值账户前须通过账户手机验证，以提高账户安全保障用户权益和作为售后唯一凭证。</p>
              </li>
              <li>
                <span class="fee_dot"></span>
                <p>活动赠送及试用加速器时长卡密请在有效期内充值至用户账户中。</p>
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>

    </div>
    <!-- loading -->
    <load :isloading="isLoading"></load>
  </div>
</template>
<script lang="ts">
import UserCardpas from "./userCardpasControl";
export default UserCardpas;
</script>
