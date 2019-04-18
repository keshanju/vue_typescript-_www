<template>
  <div class="leigod_header">
    <div class="leigod_wrap leigod_flex_between">
      <div class="leigod_left">
        <a href="/" >
          <img src="../images/leigodwangbalogo.png" alt>
        </a>
      </div>
      <div class="leigod_right leigod_flex_right">
        <ul class="leigod_nav">
          <li class="leigod_navcell"  :class="{'active': pageName == 'index.html'}">
            <a href="/" class="leigod_navcell_link">首页</a>
          </li>
          <li class="leigod_navcell" :class="{'active': pageName == 'useragreement.html'}">
            <a href="../useragreement.html" class="leigod_navcell_link">用户协议</a>
          </li>
          <li class="leigod_navcell" :class="{'active': pageName == 'help.html'}">
            <a href="../help.html" class="leigod_navcell_link">帮助</a>
          </li>
        </ul>
        <div class="leigod_login">
          <!-- 登录前 -->
          <div class="leigod_flex" v-if="!isLogin">
            <div class="leigod_navcell leigod_reg_active">
              <a href="../reg.html" class="leigod_navcell_link">注册</a>
            </div>
            <div class="leigod_navcell">
              <a href="../login.html" class="leigod_navcell_link">登录</a>
            </div>
          </div>
          <!-- 登陆后 -->
          <el-dropdown v-if="isLogin" @command="onClickAvatarHand">
            <a class="leigod_flex el-dropdown-link">
              <img v-if="faceImg" :src="faceImg" class="leigod_portraitsImg" alt>
              <h5 class="leigod_portraitsName leigod_ml10" >{{username}}</h5>
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userCentre">用户中心</el-dropdown-item>
              <el-dropdown-item command="onloginout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Dropdown, DropdownItem, DropdownMenu,Message,MessageBox } from "element-ui";
import LocalStorageUtil from "../LocalStorageUtil";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import XmlHttpClient from "@/ts/net/XmlHttpClient";
import { constants } from "http2";
import GlobalConfig from "../global_config";
import { UserUtil } from "../UserUtil";
import { UserInfoModel, ImproveRequestModel } from "../model/userModel";
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
@Component({
  components: {
    "el-dropdown": Dropdown,
    "el-dropdown-menu": DropdownMenu,
    "el-dropdown-item": DropdownItem
  }
})
export default class HeadNav extends UserUtil {
  public isLogin: boolean = false; //是否登陆
  public xmlHttp: XmlHttpClient = new XmlHttpClient();
  public isLoading: boolean; //
  public backData: any;
  public faceImg = "";
  public username="";
  public pageName='';
  created() {
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.init()
    this.getPageIndex();
  }
  public setBaseUrl(url: string): void {
    this.xmlHttp.setBaseUrl(url);
  }

  init(){
    this.checklogin(); 
    this.changePortraitInfo();
  }
    /**
     * 通过地址栏获取当前页面
     */
    public getPageIndex() {
        const href = window.location.href;
        const arr = href.split("/");
        this.pageName = arr[arr.length - 1].split('?')[0];
        if (this.pageName == '') {
            this.pageName = 'index.html'
        }
    }
  /**
   * 判断是否登录
   */
  public async checklogin() {
    let token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
    if (token != null && token != "" && token != undefined) {
      this.isLogin = true;
    }
  }

  public changePortraitInfo(){
    let userInfo: UserInfoModel = JSON.parse(localStorage.getItem(LocalStorageUtil.STORAGES_USER_INFO)) as UserInfoModel;
    if(userInfo){
       this.faceImg=userInfo.face_image_url;
       this.username=userInfo.title||userInfo.username;
    }
  }

  /**
   * 退出
   */
  onloginout() {
    this.$confirm("确认退出?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.LoginOut();
      })
      .catch(() => {});
  }

  /**
   * 点击用户头像菜单
   */
  public onClickAvatarHand(command: string) {
    switch (command) {
      case "userCentre":
        //个人中心
        window.location.href = "user.html";
        break;
      case "onloginout":
        //退出登录
        this.onloginout();
        break;
    }
  }
}
</script>

