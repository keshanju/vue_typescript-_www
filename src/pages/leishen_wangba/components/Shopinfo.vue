<template>
  <div class="leigod_shopInfoBox">
    <div class="leigod_modifyBox leigod_flex_left">
      <img :src="face_image_url" alt class="leigod_modify_portrait" width="74">
      <div class="leigod_modify_right leigod_ml15">
        <div class="leigod_flex_left">
          <h5 class="leigod_user_shopname">{{username}}</h5>
          <el-tag class="leigod_ml10 leigod_user_tag">{{qualityStatusInfo}}</el-tag>
          <div class="leigod_editbtn leigod_ml10" v-show="isBohuiStatus==1" @click="gotoApply">重新申请</div>
        </div>
        <div class="leigod_editbtn" @click="gotoEditInfo">编辑信息</div>
      </div>
    </div>
    <div class="leigod_dashedbottom"></div>

    <div class="leigod_qualification_steps">
      <div class="leigod_user_tit">资质认证</div>
      <el-steps
        class="leigod_user_stepbox"
        :align-center="true"
        :space="200"
        :active="qualityStatus"
        finish-status="success"
      >
        <el-step title="注册"></el-step>
        <el-step title="填写信息"></el-step>
        <el-step title="提交"></el-step>
        <el-step title="审核中"></el-step>
        <el-step :title="qualityStatusInfo" :status="qualityCompleteStatus" v-if="isBohuiStatus==0"></el-step>
        <el-step :title="qualityStatusInfo" :status="qualityCompleteStatus" :description="isBohuiInfo"  v-if="isBohuiStatus==1"></el-step>
      </el-steps>
    </div>

    <div class="leigod_dashedbottom"></div>

    <div class="leigod_qualification_steps">
      <div class="leigod_user_tit">加速使用情况</div>
      <h5 class="leigod_cur_count leigod_mt20 leigod_ml15">当前加速使用电脑:
        <span class="leigod_ml15">{{my_onlines}}台</span>
      </h5>
    </div>

    <div class="leigod_dashedbottom"></div>

    <div class="leigod_qualification_steps">
      <div class="leigod_user_tit">提醒次数</div>
      <div class="gotosetpicBox leigod_mt20 leigod_ml15">
        提醒次数:
        <span class="leigod_ml5" style="color:red">{{my_alerts}}次</span>
        <a class="gotosetpic leigod_ml5" @click="gotoSetWallPaper">前往设置壁纸</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Shopinfo from './ShopInfoControl';
export default Shopinfo;
</script>
