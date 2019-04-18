<template>
     <div class="mui-content loginBox white">
        <img src="../images/kamitop.png" width="44" style="margin:0px auto 20px;display: block;" />
        <form class="mui-input-group nobg">
            <div class="login" style="border-bottom: none;">
                <div class="mui-input-row login_user">
                    <i class="kami icon-qiami"></i>
                    <input type="text" v-model="cardnum" class="mui-input-clear" placeholder="充值卡卡号">
                </div>
                <div class="mui-input-row login_user mui-password">
                    <i class="ls icon-mima"></i>
                    <input type="password" v-model="cardpaw" class="mui-input-password" placeholder="请输入密码">
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
    </div>
</template>
<script lang="ts">
    import UserCardpas from './userCardpasControl';
    export default UserCardpas;
</script>