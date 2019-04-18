import { IProxy } from "@/ts/interface/IProxy";
import { Vue, Prop,Component } from "vue-property-decorator";
import { InvoiceModel, InvoiceRequestModel, PayModel } from "@/ts/models/UserModel";
import HttpClient from "@/ts/net/HttpClient";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import {IdataModel} from "@/ts/models/IdataModel";

@Component
export default class CheckPayStatusProxy extends Vue implements IProxy {

    @Prop() public payobj!: PayModel;

    public updateInvoiceTimer: any = null; //
    public isUpdateInvoice: boolean = false; //是否可以刷新订单
    public invoiceNum = 2; //间隔时间，单位: 秒

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    public isLoading: boolean = false; //loading

    public init(): void {
        this.timingUpdateInvoiceState();
        console.log(this.payobj)
    }

    public execute(): void {
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * TODO... 需要重写此方法
     * token过期处理
     * @param param
     */
    public tokenExpired(param: string = ''): void {
    }

    /**
     * 定时刷新，检测订单状态
     */
    public timingUpdateInvoiceState() {
        this.isUpdateInvoice = true;
        const sefl = this;
        this.updateInvoiceTimer = setInterval(function () {
            sefl.startUpdateInvoiceState();
        }, this.invoiceNum * 1000);
    }

    /**
     * 开始执行
     */
    public startUpdateInvoiceState() {
        if (!this.isUpdateInvoice) return;
        this.updateInvoiceState();
    }

    /**
     * 查询订单状态
     */
    public async updateInvoiceState() {
        const url = HttpClient.URL_USER_INVOICE_STATE;
        const token = LocalStorageUtil.getUserToken().account_token;
        let param = new InvoiceRequestModel();
        param.account_token = token;
        param.invoice_id = this.payobj.invoice_id;
        let backData = await this.http.post<InvoiceModel>(url, param);
        //
        if (backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            // console.log('订单定时器', backData);
            //支付成功
            if (backData.data.status == 1) {
                this.onCleanInvoiceState();
                this.paySuccess();
            }
        } else if (backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        }
    }

    /**
     * 支付成功
     */
    paySuccess() {
    }

    /**
     * 停止计时器
     */
    public onCleanInvoiceState() {
        // console.log('删除订单定时器');
        this.isUpdateInvoice = false;
        clearInterval(this.updateInvoiceTimer);
    }
}