<template>
    <div class="ls_shadow">
        <div class="ls_loading">
            <van-loading type="spinner" color="#666"/>
        </div>
    </div>
</template>

<script lang="ts">
import "../css/mui.min0125.css";
import "../css/ls2.css";
import "../css/wap.less";
import { Vue, Component } from "vue-property-decorator";
import { Loading } from 'vant';
Vue.use(Loading)
// import 'vant/lib/loading/style';
@Component
export default class LsLoading extends Vue {

}
</script>

