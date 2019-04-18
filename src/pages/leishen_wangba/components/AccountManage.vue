<template>
  <div class="leigod_account_manage">
    <div class="leigod_flex_between">
      <div class="leigod_user_tit">当前在线电脑
        <span v-text="total"></span>台
      </div>
      <el-input v-model="search" size="mini" style="width:300px;" placeholder="输入关键字搜索"/>
    </div>

    <div class="leigod_dashedbottom leigod_mt20"></div>

    <el-table class="leigod_mt20"
      :data="onlineList.filter(data=>!search || data.id.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      max-height="580"
      border
      align="center">
      <el-table-column label="公网IP" prop="public_ip" align="center"></el-table-column>
      <el-table-column label="硬件id" prop="hardid" align="center"></el-table-column>
      <el-table-column label="最后登录时间" prop="lastcomm" align="center"></el-table-column>
      <el-table-column label="活跃时间" prop="lastlogin" align="center"></el-table-column>
      <el-table-column label="接受流量" prop="recvx" align="center"></el-table-column>
      <el-table-column label="发送流量" prop="sendx" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click.native.prevent="kickoff(scope.$index, scope.row,onlineList)">踢下线</el-button>  
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script lang="ts">
    import AccountManage from './AccountControl';
    export default AccountManage;
</script>

