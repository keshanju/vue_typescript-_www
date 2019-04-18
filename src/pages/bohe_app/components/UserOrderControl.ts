import { Vue, Component } from "vue-property-decorator";
import OrderProxy from "@/ts/proxy/OrderProxy";
import GlobalConfig from "../global.config";
import { OrderModel } from "@/ts/models/UserModel";
import { List, Cell } from "vant";

Vue.use(List);
Vue.use(Cell);
@Component({})
export default class UserOrder extends OrderProxy {
  public loading: boolean = false;
  public finished: boolean = false;
  public count: number = 0;
  public showOrderList: Array<OrderModel> = [];

  async created() {
    this.setBaseUrl(GlobalConfig.getBaseUrl());
  }

  //获取列表成功
  getUserOrderListSuccess() {
    // 数据全部加载完成
    if (this.orderList.length == 0) {
      this.finished = true;
    }
    for (const item of this.orderList) {
      this.showOrderList.push(item);
    }
    this.loading = false;
  }

  public loadList() {
    // 异步更新数据
    setTimeout(() => {
      this.count++;
      this.getUserOrderList(this.count, 6);
    }, 500);
  }
}
