<template>
      <div class="my_setting_list">
          <div>
              <ul class="mui-table-view my_center_cell">
                <li class="mui-table-view-cell">
                    
                    <a class="mui-navigate-right">
                        <i class="kaixin icon-kaixin"></i>
                        上传头像(不超过500K)
                        <input type="file" @change="changeImage" class="uploadImg">
                    </a>
                </li>
            </ul>

            <ul class="mui-table-view my_center_cell">
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" @click="gotoforget">
                        <i class="ls icon-guojiliuliangbao"></i>
                        忘记密码
                    </a>
                </li>
            </ul>

            <ul class="mui-table-view my_center_cell">
                <li class="mui-table-view-cell" @click="removebind">
                    <a class="mui-text-center">
                        解除绑定
                    </a>
                </li>
            </ul>   
          </div>

          	<!-- loading -->
		   <load :isloading="isLoading" ></load>
         
        </div>
</template>
<script lang="ts">
    import UserSetting from './userSettingControl';
    export default UserSetting;
</script>