<template>
  <div class="wallpaperBox">
    <div class="leigod_user_tit">下载雷神壁纸</div>
    <div class="leigod_flex leigod_wallpaper">
      <img :src="showWallpaper" v-show="showWallpaper!=''" width="100%" class="leigod_mt30"  >
      <h5 v-show="showWallpaper==''">暂无数据</h5>
    </div>
    <div class="leigod_wallpaperListBox">
      <h4 class="leigod_wallpaperList_tit">选择屏幕分辨率进行下载</h4>
      <ul class="leigod_flex_left leigod_mt5 leigod_flexwrap">
        <li v-for="(item,index) in WallpaperDates" class="leigod_wallpaper_cell" @click="changedownload(index)" :class="{active:wallpaperselectIndex==index}" :data-link="item.link">{{item.image_size}}</li>
      </ul>
    </div>
    <div class="leigod_flex leigod_mt30 leigod_mb30 ">
        <!-- <a class="download_wallpaper" @click="downlaodWallpaper" >下载</a> -->
        <a class="download_wallpaper" :href="wallpaperdownloadlink" download="bizhi.png">下载</a>
    </div>
    <div class="leigod_dashedbottom"></div>
    <div class="leigod_user_tit leigod_mt20">温馨提示</div>
    <ul class="leigod_user_waringtip leigod_mt10 leigod_mb30">
        <li>1.雷神网吧版加速器提供雷神壁纸供商家使用；</li>
        <li class="leigod_mt10">2.如未及时更换壁纸，雷神会对商户进行提醒。如超过10次提醒未设置壁纸，雷神将不提供免费服务。</li>
    </ul>
  </div>
</template>
<script lang="ts">
import Wallpaper from './WallpaperControl';
export default Wallpaper;
</script>

