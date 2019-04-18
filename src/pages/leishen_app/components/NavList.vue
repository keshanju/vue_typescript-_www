<template>
  <div>
    <ul class="navBottom">
      <li :class="{cur:pageName=='index.html'}">
        <a @click="gotoindex">
          <div class="weixinhome"></div>
          <span>首页</span>
        </a>
      </li>
      <li :class="{cur:pageName=='recharge.html'}">
        <a @click="gotoRecharge">
          <div class="weixinpay"></div>
          <span>充值续费</span>
        </a>
      </li>
      <li :class="{cur:pageName=='mpause.html'}">
        <a @click="gotopause">
          <div class="weixincenter"></div>
          <span>暂停恢复</span>
        </a>
      </li>
      <li :class="{cur:pageName=='mcenterList.html'||pageName=='mmy_center.html'}">
        <a @click="gotonavlist">
          <div class="weixinfee"></div>
          <span>会员中心</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import NavListControl from "./NavListControl";
export default NavListControl;
</script>

