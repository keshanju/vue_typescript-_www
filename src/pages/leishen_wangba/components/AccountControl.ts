import { Vue, Component } from "vue-property-decorator";
import XmlHttpClient from "@/ts/net/XmlHttpClient";
import { XmlDataModel } from "@/ts/models/IdataModel";
import { UserUtil } from "../UserUtil";
import GlobalConfig from "../global_config";
import { OnlineModel, OnlineListModel } from "../model/userModel";
@Component({})
export default class AccountManage extends UserUtil {
  //////////公共参数
  // loading
  public isLoading: boolean = false;
  public loadingMsg: string = ""; // loading的说明文字
  //
  public xmlHttp: XmlHttpClient = new XmlHttpClient();
  public backData: XmlDataModel;
  //////////END

  public total = 0; //在线总数
  public onlineList: OnlineListModel[] = [];
  public search = "";
  public a = [];

  created() {
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.init();
  }

  async init() {
    await this.onGetOnlineList();
  }
  /**
   * 获取在线列表成功
   * @param data
   */
  public getOnlineSuccess(data: OnlineModel) {
    this.total = data.onlinecount;
    if (this.total == 0) {
      this.onlineList = [];
    } else {
      if (!Array.isArray(data.onlines.item)) {
        this.onlineList.push(data.onlines.item);
      } else {
        this.onlineList= data.onlines.item;
      }
    }
  }

  /**
   * 踢下线
   * @param index 索引
   * @param row 当前行的内容
   * @param tab 整个table
   */
  public async kickoff(index, row, tab) {
    let sessionId = row.id;
    this.$confirm("确定踢下线?", "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        //删除当前行
        tab.splice(index, 1);
        this.onOffLine(sessionId);
      })
      .catch(() => {});
  }

  /**
   * 踢下线成功
   * @param data
   */
  public offLineSuccess(data: OnlineModel) {
    this.total--;
    this.$alert(data.msg, "温馨提示", {
      confirmButtonText: "确定",
      callback: action => {}
    });
  }
  /**
   * 踢用户下线失败
   * @param data
   */
  public offlineFail(data: OnlineModel) {
    this.$alert(data.msg, "温馨提示", {
      confirmButtonText: "确定",
      callback: action => {}
    });
  }
}
