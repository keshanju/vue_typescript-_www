<template>
  <div class="leigod_account_manage editInfo">
    <div class="leigod_user_tit">修改信息</div>
    <div class="leigod_flex_vertify">
      <div class="leigod_editPortrial">
        <el-upload
          class="avatar-uploader"
          :action="uploadLogoImgurl"
          :show-file-list="false"
          :data="usertoken"
          :on-success="logoSuccess"
          :before-upload="beforelogoUpload"
        >
          <img v-if="improveLogoPic" :src="improveLogoPic" class="avatar">
        </el-upload>
        <h5 class="leigod_portrial_editbtn">点击修改</h5>
        <div class="leigod_mask"></div>
      </div>
      <div class="leigod_flex">
        <h5 class="leigod_user_username leigod_mt20" v-text="userInfoForm.title"></h5>
      </div>
    </div>

    <div class="leigod_dashedbottom leigod_mt20"></div>

    <div class="leigod_user_tit leigod_mt20">基本信息</div>
    <div class="leigod_user_infoBox">
      <el-form label-position="right" label-width="80px" :model="userInfoForm">
        <el-form-item label="网吧名称:">
          <el-input v-model="userInfoForm.title" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="userInfoForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="绑定IP:">
          <el-input type="textarea" :autosize="{ minRows: 6 }" v-model="userInfoForm.locked_ip"></el-input>
          <h6 class="leigod_ml20 leigod_mt10" style="color:orange">注:多个ip用<b style="color:red">英文逗号</b>分割，例如192.168.1.1, 192.168.1.2 
          </h6>
        </el-form-item>
        <el-form-item label="QQ:">
          <el-input v-model="userInfoForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="userInfoForm.mail"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="changeInfo">提交</el-button>
        </el-form-item>
      </el-form>

      <div class="leigod_dashedbottom leigod_mt20"></div>

      <div class="leigod_user_tit leigod_mt20">账号安全</div>
      <div class="leigod_mt20 leigod_ml15">
        密码丢失不再是事, 短信帮您轻松找回!
        <a href="forget.html" class="findPsw">找回密码</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import EditInfo from "./EditInfoControl";
export default EditInfo;
</script>

