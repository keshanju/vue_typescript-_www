import { Vue, Component } from "vue-property-decorator";
import { IProxy } from "@/ts/interface/IProxy";
import HttpClient from "../net/HttpClient";
import { IdataModel } from "../models/IdataModel";
import LocalStorageUtil from "../utils/LocalStorageUtil";
import {
  OrderRequestModel,
  OrderListModel,
  OrderModel,
  PayRequestModel,
  PayModel
} from "../models/UserModel";

@Component
export default class OrderProxy extends Vue implements IProxy {
  public orderObj: OrderListModel = new OrderListModel(); //订单集合
  public orderList: Array<OrderModel> = []; //订单列表
  public orderPageInit: boolean = false;
  public chooseOrder: any = null;
  public payTypeDialogVisible: boolean = false;
  public payObj: PayModel = new PayModel();
  public total: number = 0; //订单信息总条目数

  //////////公共参数
  public http = new HttpClient();
  public backData: IdataModel<any> | undefined;
  //loading
  public isLoading: boolean = false;
  public loadingMsg: string = ""; // loading的说明文字
  //////////END

  public init(): void {
    this.getUserOrderList();
  }

  public execute(): void {}

  public setBaseUrl(url: string): void {
    this.http.setBaseUrl(url);
  }

  /**
   * TODO... 需要重写此方法
   * token过期处理
   * @param param
   */
  public tokenExpired(param: string = ""): void {}

  /**
   * 获取订单列表
   */
  public async getUserOrderList(page: number = 1, size: number = 6) {
    this.isLoading = true;
    if (page == null) page = 1;
    const url = HttpClient.URL_USER_INVOICE;
    const token = LocalStorageUtil.getUserToken().account_token;
    let param = new OrderRequestModel();
    param.account_token = token;
    param.page = page;
    param.size = size;
    this.backData = await this.http.post<OrderListModel>(url, param);
    this.isLoading = false;
    if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
      this.orderObj = this.backData.data;
      this.orderList = this.backData.data.list;
      this.total = this.orderObj.total;
      this.getUserOrderListSuccess();
    } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
      this.tokenExpired();
    } else {
      this.getUserOrderListFail();
    }
  }
  // 获取订单列表成功
  public getUserOrderListSuccess() {}

  // 获取订单列表失败
  public getUserOrderListFail() {}

  /**
   * 待支付订单选择支付方式
   */
  onChooseOrderPayType(order: OrderModel) {
    this.chooseOrder = order;
    this.payTypeDialogVisible = true;
  }

  /**
   * 确定选择支付类型
   */
  public async onConfirmChooseOrderPayType(type: number) {
    this.isLoading = true;
    if (this.chooseOrder == null) return;
    this.payTypeDialogVisible = false;
    const url = HttpClient.URL_USER_INVOICE_BUY;
    const token = LocalStorageUtil.getUserToken().account_token;
    let param = new PayRequestModel();
    param.account_token = token;
    param.invoice_id = this.chooseOrder.invoice_id;
    param.pay_type = type;
    this.backData = await this.http.post<PayModel>(url, param);
    this.isLoading = false;
    //
    if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
      this.isLoading = false;
      this.payObj = this.backData.data;
      this.payObj.payType = type;
      this.onBeginpaySuccess();
    } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
      this.tokenExpired();
    } else {
      this.onBeginpayError();
    }
  }

  /**
   * 请求支付成功
   * TODO... 此方法可以重写，处理请求支付成功后的ui逻辑
   */
  public onBeginpaySuccess() {}

  /**
   * 请求支付失败
   * TODO... 此方法可以重写，处理请求支付成功后的ui逻辑
   */
  public onBeginpayError() {}
}
