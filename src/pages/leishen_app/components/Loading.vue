<template>
  <div
    v-if="isloading"
    style="position:fixed;z-index:9999;width:100%;height:100%; background: rgba(249, 247, 247, .3);left: 0; top:0; display: flex;justify-content: center;align-items: center;"
  >
    <div
      style="background:rgba(0,0,0,.6);padding: 15px;border-radius: 5px; position: relative; top: -10%"
    >
      <van-loading type="spinner" color="#fff"/>
    </div>
  </div>
</template>

<script lang="ts">
import "../css/mui.min0125.css";
import "../css/ls2.css";
import "../css/wap.less";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class LsLoading extends Vue {
  @Prop()
  public isloading!:boolean;

}
</script>


