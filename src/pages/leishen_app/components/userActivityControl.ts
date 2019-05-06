import {Vue, Component} from "vue-property-decorator";
import ActiveRecordProxy from "@/ts/proxy/ActiveRecordProxy";
import GlobalConfig from "../global.config";
import {List, Cell,Dialog,Toast,NavBar,Field,Actionsheet,Picker,Popup,Icon } from "vant";
import VueI18n from "vue-i18n";
import AppParamModel from "@/ts/models/AppModel";
import Util from "@/ts/utils/Util";
import {LsLanguage} from "../util/LsLanguage";
import HttpClient from '@/ts/net/HttpClient';
import Countries from './Country.vue';

Vue.use(List);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Field);
Vue.use(Actionsheet);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(NavBar);
//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(
    Util.REGION_CODE_1,
    Util.ZH_CN
);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);
@Component({
    components: {
        'country-item': Countries
    }
})
export default class userActivity extends ActiveRecordProxy {
    public loading: boolean = false;
    public finished: boolean = false;
    public showActiveRecordList=[];
    public pageSize:number=6; //每次请求的数量
    public count: number = 0;
    private showNopic=false;//无订单时出现
    public isNeedUserAddress:boolean=false;
    public dialogTitle: string = ""; //弹出框的title
    public dialogType: string = "1"; //弹出框的类型
    AreaCodeshow:boolean=false
    created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getAreaCodeList()
    }

    //获取列表成功
    getActiveRecordListSuccess() {
        // 数据全部加载完成
        if (this.ActiveRecordList.length == 0) {
            this.finished = true;
        }
        for (const item of this.ActiveRecordList) {
            let isRepeat=false;
            let repeatIndex=-1;
            let repeatObj={}
            for(let pp=0;pp<this.showActiveRecordList.length;pp++){
                if(item.id==this.showActiveRecordList[pp].id){
                    isRepeat=true;
                    repeatIndex=pp;
                    repeatObj=Object.assign({},item)
                }
            }
            if(!isRepeat){
                this.showActiveRecordList.push(item);
            }else{
                this.showActiveRecordList[repeatIndex]=repeatObj
            }
        }
        this.loading = false;
        //若无数据  显示无订单图片
        if(this.showActiveRecordList.length==0){
            this.showNopic=true;
        }

    }

    public loadList() {
        // 异步更新数据
        setTimeout(() => {
            this.count++;
            this.getActiveRecordList(this.count, this.pageSize);
        }, 500);
    }
    //点击立即兑奖和查看详情的时候
    onChooseOrderPayType(row){
        if(row.status.toString()=='-1'){
			Toast.fail('活动已过期');
		}else{
			this.payTypeDialogVisible = true;
			//@ts-ignore
			switch (row.award_type) {
				case 0:
					// 是充值卡
					this.dialogType = "4";
					this.dialogTitle = '详情';
                    this.details = row.details;
					if (row.status == 0) {
						// 如果是待领取状态
						this.chargeCard(row);
					} else {
						// 用processMsg处理row.message里面的卡号和密码
						this.processMsg(row.message);
					}
					break;
				case 1:
					// 现金红包
					break;
				case 2:
					// 实物
					//@ts-ignore
					if (row.status === 0) {
                        // 如果是待兑换状态填写信息，否则提示
                        this.isNeedUserAddress=true
                        this.currentActiveRecordModel = row;
					} else {
						this.dialogType = "2";
						this.dialogTitle = '';
					}
					break;
				case 3:
					// 第三方充值卡
					this.dialogTitle ='详情';
					this.otherCard = row.present_title;
					this.dialogType = "3";
                    this.details = row.details;
					if (row.status == 0) {
						// 如果是待领取状态
						this.chargeCard(row);
					} else {
						// 用processMsg处理row.message里面的卡号和密码
						this.processMsg(row.message);
					}
					break;
                case 4:
                    // 优惠券/折扣码
                    if (row.status == 0) {
                        // 如果是待领取状态
                        this.getDiscount(row);
                    }
                    this.dialogTitle = '详情';
                    this.discount_title = row.present_title;
                    this.discount=row.message;
                    this.details = row.details;
                    this.desc = row.desc;
                    this.dialogType = "5";
                    this.payTypeDialogVisible = true;
                    break;
			}
		}
    }
    //第三方卡如爱奇艺的卡号和密码获取成功
    getOtherCardSuccess(msg:string,row:any){
        let pageIndex=-1
        for(let qq=1;qq<=this.showActiveRecordList.length;qq++){
            //@ts-ignore
            if(row.id==this.showActiveRecordList[qq-1].id){
                pageIndex=Math.ceil(qq/this.pageSize)
            }
        }
        if(pageIndex!=-1){
            this.getActiveRecordList(pageIndex, 6)
        }
        Toast.success('领取成功');
    }
    //雷神充值卡充值成功
    chargeCardSuccess(msg:string,row:any){
        let pageIndex=-1
        for(let qq=1;qq<=this.showActiveRecordList.length;qq++){
            //@ts-ignore
            if(row.id==this.showActiveRecordList[qq-1].id){
                pageIndex=Math.ceil(qq/this.pageSize)
            }
        }
        if(pageIndex!=-1){
            this.getActiveRecordList(pageIndex, 6)
        }
        Toast.success('领取成功');
    }
    /**
     *优惠券领取成功
     */
    public getDiscountSuccess(msg: string,row:any) {
        let pageIndex=-1
        for(let qq=1;qq<=this.showActiveRecordList.length;qq++){
            //@ts-ignore
            if(row.id==this.showActiveRecordList[qq-1].id){
                pageIndex=Math.ceil(qq/this.pageSize)
            }
        }
        if(pageIndex!=-1){
            this.getActiveRecordList(pageIndex, 6)
        }
        Toast.success('领取成功');
    }
    //取消填写收货人的信息
    cancellSubmit(){
      this.isNeedUserAddress=false;
      this.payTypeDialogVisible=false
    }
    //提交收货人的信息
    sendUserInfo(){
        this.confirmUserInfo();
    }
    //更新当前行的数据,将当前行的数据状态更新为1
    UpdateCurentData(id:number){
        for(let qq=0;qq<this.showActiveRecordList.length;qq++){
            //@ts-ignore
            if(id==this.showActiveRecordList[qq].id){
                this.showActiveRecordList[qq].status=1
            }
        }
    }
    //提示用户输入的信息的错误
    validateInfoFaild(title:string,msg:string){
        Toast.fail(msg);
    }
    /**
     * 提交用户信息成功提示
     */
    userInfoOk(title:string,msg:string){
        Toast.success(msg);
    }
    /**
     * 充值卡自动充值失败
     * @param msg
     */
    public chargeCardFail(msg: string) {
        Toast.fail(msg);
    }

    /**
     * 提交用户快递信息失败
     * @param msg
     */
    public confirmUserInfoFail(msg: string) {
        Toast.fail(msg);
    }
    // 点击某个电话区号以后
    getcountry(data){
        this.country_code = data.code;
        this.AreaCodeshow = false;
    }
}

