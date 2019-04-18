import { Vue, Component } from "vue-property-decorator";
import HttpClient from "@/ts/net/HttpClient";
import { WallPaperModel, WallPaperListModel } from "../model/userModel";
import XmlHttpClient from "@/ts/net/XmlHttpClient";
import { XmlDataModel } from "@/ts/models/IdataModel";
import { UserUtil } from "../UserUtil";
import GlobalConfig from "../global_config";
import LocalStorageUtil from "../LocalStorageUtil";
@Component({})
export default class Wallpaper extends UserUtil {
  public WallpaperDates: WallPaperListModel[] = []; //雷神壁纸数组
  public showWallpaper: string = ""; //展示的壁纸
  public wallpaperselectIndex: number = 0; //选中壁纸的索引
  public wallpaperdownloadlink: string = ""; //选中壁纸的链接
  public wallpaperdownloadId: string = ""; //选中壁纸的id

  mounted() {
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.init();
  }

  async init() {
    await this.getWallpaper();
    this.changedownload(0);
  }

  /**
   * index 下载的索引
   * 获取选中壁纸的id
   */
  public changedownload(index) {
    if (this.WallpaperDates.length > 0) {
      this.wallpaperdownloadId = this.WallpaperDates[index].id; //获取选中图片的id
      let token = LocalStorageUtil.getCookie(LocalStorageUtil.STORAGES_TOKEN);
      let url = XmlHttpClient.GET_WALLPAPER;
      this.wallpaperdownloadlink =
        GlobalConfig.getBaseUrl() + "api.aspx?op=" + url + "&token=" + token + "&id=" + this.wallpaperdownloadId;
    } else {
      this.wallpaperdownloadlink = "javascript:;";
    }
    this.wallpaperselectIndex = index; //切换选中的壁纸索引
  }


  /**
   * 获取壁纸配置文件成功
   */
  public getWallpaperSuccess(data: WallPaperModel) {
    if (data.wallpapercount > 0) {
      this.WallpaperDates = data.wallpapers.item as WallPaperListModel[];
      this.showWallpaper = this.WallpaperDates[0].image_src;
    }
  }
}
