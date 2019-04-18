<template>
  <div class="leigod_footerBox">
    <div class="leigod_foot leigod_wrap">
      <div class="leigod_foot_top">
        <div class="leigod_foot_top_left">
          <a href="/">
            <img src="../images/logonew0117.png" width="200" alt>
          </a>
        </div>
        <div class="leigod_foot_top_mid leigod_flex_between">
          <dl>
            <dt>帮助中心</dt>
            <dd>
              <a href='../help.html'>常见问题</a>
            </dd>
            <dd>
              <a href='../useragreement.html'>用户协议</a>
            </dd>
          </dl>
          <dl>
            <dt>关注我们</dt>
            <dd class="leigod_weixin">
              <span>微信公众号</span>
              <img src="../images/weixin.png" alt=""> 
            </dd>
            <dd class="leigod_weibo">
              <span>官方微博</span>
              <img src="../images/weibo.png" alt=""> 
            </dd>
          </dl>
        </div>
        <div class="leigod_foot_top_right">
          <a  href="http://wpa.qq.com/msgrd?v=3&uin=55000&site=qq&menu=yes" target="_blank" class="leigod_foot_contacts_phone">商务合作</a>
          <h6 class="leigod_foot_contacts_kefu">每天9：00-24：00技术在线（全年无休）</h6>
        </div>
      </div>
      <div class="leigod_foot_bot">
        <div class="leigod_foot_bot_left">
          <!-- <h5 class="leigod_footbot_kefuInfo leigod_foot_fontstyle">客服热线:021-80270833
            <em style="margin-left:3px">8:00-24:00</em>
            <b>（全年无休）</b>
            <span style="display: inline-block;">业务合作电话:021-51647026</span>
          </h5> -->
          <h5 class="leigod_footbot_records leigod_foot_fontstyle">
            <a class="leigod_footbot_recordsNumber" href="http://www.miibeian.gov.cn/" target="_blank">沪ICP备18007431号-1</a>
            <span class="leigod_footbot_company"> 2016年-2036年 上海雷神网络科技有限公司版权所有 并保留所有权利</span>
            <p class="leigod_footbot_wangwen">沪网文(2018)8355-502号 ICP证编号:沪B2-20180795</p>
          </h5>
        </div>
        <div class="leigod_foot_bot_right">
          <ul class="leigod_qualify leigod_flex_around">
            <li class="leigod_qualifyCell">
              <a
                id="_pingansec_bottomimagesmall_brand"
                href="http://si.trustutn.org/info?sn=544171218031154034526&certType=1"
              >
                <img src="https://v.trustutn.org/images/cert/brand_bottom_small.jpg">
              </a>
            </li>
            <li class="leigod_qualifyCell">
              <a
                key="5a15257a0c909623245ac96b"
                href="http://www.cn-ecusc.org.cn/cert/aqkx/site/?site=www.leigod.com"
              >
                <img
                  src="//static.anquan.org/static/outer/image/aqkx_124x47.png?id=www.leigod.com?t=79"
                >
              </a>
            </li>
            <li class="leigod_qualifyCell">
              <a
                key="5a15257a0c909623245ac96b"
                logo_size="124x47"
                logo_type="business"
                href="https://v.pinpaibao.com.cn/authenticate/cert/?site=www.leigod.com&at=business"
              >
                <img
                  src="//static.anquan.org/static/outer/image/hy_124x47.png?id=www.leigod.com?t=79"
                >
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <kefu></kefu>
  </div>
</template>
<script lang="ts">
 import {Vue, Component} from "vue-property-decorator";
 import DownloadBox from "./DownloadBox.vue";

    @Component({
        components:{
            "kefu": DownloadBox
        }
    })
  export default class footers extends Vue {

    }
</script>
