import {Vue, Component} from "vue-property-decorator";
import OrderProxy from "@/ts/proxy/OrderProxy";
import GlobalConfig from "../global.config";
import {OrderModel} from "@/ts/models/UserModel";
import {List, Cell} from "vant";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import Util from "@/ts/utils/Util";
import {LsLanguage} from "../util/LsLanguage";
import JumpWeiXin from "@/pages/leishen_app/util/jump";

Vue.use(List);
Vue.use(Cell);

//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(
    Util.REGION_CODE_1,
    Util.ZH_CN
);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);
@Component({})
export default class UserOrder extends OrderProxy {
    public loading: boolean = false;
    public finished: boolean = false;
    public count: number = 0;
    public showOrderList: Array<OrderModel> = [];
    private showNopic=false;//无订单时出现

    created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        // this.getUserOrderList();
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
        //若无数据  显示无订单图片
        if(this.showOrderList.length==0){
            this.showNopic=true;
        }

    }

    public loadList() {
        // 异步更新数据
        setTimeout(() => {
            this.count++;
            this.getUserOrderList(this.count, 6);
        }, 500);
    }


    //跳转

    /**
     * 去充值
     *  */

    public gotoRecharge() {
        let param = "platform=" + appParam.platform;
        JumpWeiXin.gotoRecharge(param);
    }
}
