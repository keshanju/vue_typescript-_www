<template>
  <div>
    <ul class="navBottom">
      <li :class="{wxnavcur:pageName=='index.html'}">
        <a @click="gotoindex">
          <div class="weixinhome"></div>
          <span class="wxnavTit">首页</span>
        </a>
      </li>
      <li :class="{wxnavcur:pageName=='recharge.html'}">
        <a @click="gotoRecharge">
          <div class="weixinfee"></div>
          <span class="wxnavTit">充值</span>
        </a>
      </li>
      <li :class="{wxnavcur:pageName=='mpause.html'}">
        <a @click="gotopause">
          <div class="weixinpause"></div>
          <span class="wxnavTit">暂停</span>
        </a>
      </li>
      <li :class="{wxnavcur:pageName=='mcenterList.html'||pageName=='mmy_center.html'}">
        <a @click="gotonavlist">
          <div class="weixincenter"></div>
          <span class="wxnavTit">我的</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import NavListControl from "./NavListControl";
export default NavListControl;
</script>

