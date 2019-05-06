import '@/assets/less/leishen_pc.less';
import "leigod-lib-flexible";
import {Component, Vue} from "vue-property-decorator";
import HttpClient from '@/ts/net/HttpClient';
import AppParamModel from '@/ts/models/AppModel';
import {IdataModel} from '@/ts/models/IdataModel';
import "babel-polyfill";
import VueI18n from "vue-i18n";
import $ from "jquery";
import VueLazyload from 'vue-lazyload'
import {LsLanguage} from "@/pages/leishen_pc/util/LsLanguage";
import Util from "@/ts/utils/Util";
import {Menu,Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownItem, DropdownMenu, Slider, Dialog, Message, Loading} from "element-ui";
import GlobalConfig from "@/pages/leishen_pc/global.config";
import {WallDownloadRequestModel, WallListModel, WallListRequestModel, WallTypeListModel} from "@/ts/models/WallsModel";
import {ExtrnalFactory} from "@/ts/factory/ExtrnalFactory";
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {UserInfo} from "@/ts/models/UserModel";
import {TipsMsgUtil} from "@/ts/utils/TipsMsgUtil";
Vue.config.productionTip = false;

Vue.use(Loading);
Vue.use(VueLazyload,{
    loading:'./images/default_bizhi.png'
});
Vue.prototype.$message = Message;
//语言包
Vue.use(VueI18n);
const appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.initNoRefresh();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'el-menu': Menu,
        'el-menu-item': MenuItem,
        'el-menu-item-group': MenuItemGroup,
        'el-submenu': Submenu,
        'el-dropdown': Dropdown,
        'el-dropdown-item': DropdownItem,
        'el-dropdown-menu': DropdownMenu,
        'el-slider': Slider,
        'el-dialog': Dialog
    }
})
class Bizhi extends Vue {
    public appParam: AppParamModel = AppParamModel.getInstace();
    public imageHeadUrl: string = '';// 图片根地址
    public wallTypeList: Array<WallTypeListModel> = [];//壁纸分类列表
    public wallList: Array<WallListModel> = [];//壁纸列表
    public LocalWallList = [];//本地壁纸列表(已下载完)
    public LocalHalfWallList = [];//本地壁纸列表(下载部分完成)
    public wallDownloadLog: Array<WallListModel> = [];// 用户下载壁纸记录
    public downloading_wall_list = [];//下载中的壁纸的id集合
    public is_hot: string = '0'; //是否最热
    public search: string = '';// 搜索关键字
    public pixel: string = '';// 选择的分辨率
    public slider: number = 0; //音量
    public older_slider: number = 0;//静音之前的音量
    public download_url: string = '';// 壁纸下载链接
    public downloadingList = [];// 下载中的壁纸
    public wall_id_now: number = 0;//当前使用的壁纸id
    public typeIndex: number = -1;// 选择的壁纸类型index
    public tabIndex: number = 0;// tab页index值
    public questionIndex: number = 0;//常见问题页tabindex
    public is_onplay: boolean = false;//壁纸播放状态
    public is_jingyin: boolean = false;//是否静音
    public manyouDialogVisible: boolean = false;//漫游弹窗
    public manyou_check: boolean = false;//是否开启漫游
    public userInfo: UserInfo = new UserInfo();
    public LoadingShow: boolean = true;//加载动画
    public timer = null;//加载定时器
    public count:number = 0;//加载读秒
    public not_pay_ntice: boolean = false; // 非付费用户下载付费壁纸提示弹窗
    public delete_wall: boolean = false;//是否点击了删除壁纸
    public scrollAble: boolean = true;//壁纸列表滚动事件是否能触发
    public wallListEmpty: boolean = false;//搜索值为空
    public is_loading: boolean = false;
    public nav_active: string = '1';

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    //////////END

    public async created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.getWallTypeList();
        await this.getUserInfo();
        await this.getWallList();
        await this.getWallDownloadLog();
        this.getLocalWallList();
        this.getVolume();
        if(this.appParam.account_token != '' && this.userInfo.wall_log_switch == 1 && this.userInfo.expiry_time_samp > 0 && this.userInfo.is_pay_user == 1){
            this.manyou_check = true;
        };
    }

    public async init() {
        await this.getUserInfo();
        await this.getWallDownloadLog();
        this.getLocalWallList();
    }

    public mounted(){
        const that = this;
        this.timer = setInterval(()=>{
            that.count+=2;
            if(that.count >= 10) {
                clearInterval(that.timer);
                that.LoadingShow = false;
            };
        },300)
    }

    /**
     * 设置根地址
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 获取用户详细信息
     */
    public async getUserInfo() {
        try {
            let token = Util.getUrlParam("account_token");
            const url = HttpClient.URL_USER_INFO;
            const param = {
                account_token: token
            };
            this.backData = await this.http.post<UserInfo>(url, param);
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.userInfo = this.backData.data;
                if(this.userInfo.wall_log_switch == 1 && this.userInfo.is_pay_user == 1) {
                    this.manyou_check = true;
                };
                UserInfo.getUserName(this.userInfo);
                UserInfo.getUserAvatar(this.userInfo);
                UserInfo.updateUserInfo(this.userInfo);
            } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
                this.tokenExpired();
            } else {
            }
        } catch (e) {
        }
    }

    /**
     * 切换tabindex
     */
    public changeTabindex(index: number){
        this.tabIndex = index;
        this.nav_active = (index +1) + '';
        if(index != 1) {
            this.typeIndex = -1;
        }
    }

    /**
     * 壁纸列表滚动事件
     */
    public scrollBizhi(e){
        if(!this.scrollAble) return;
        this.scrollAble = false;
        let top = e.wheelDeltaY;
        let ul = document.querySelector('.bizhi_list');
        // @ts-ignore
        let h = document.querySelector('.bizhi_list').offsetHeight;
        let n = Math.ceil(ul.scrollTop/h);
        let total = Math.floor(ul.scrollHeight/h);
        let timer = null;
        if(top < 0) {
            n++;
            //滚动到下一屏
            if(n >= total) {
                timer = setInterval(()=>{
                    if((ul.scrollHeight - h) - ul.scrollTop <= 30) {
                        ul.scrollTop = ul.scrollHeight - h;
                    }else {
                        ul.scrollTop+=30;
                    }
                    if(ul.scrollTop >= ul.scrollHeight - h - 1) {
                        this.scrollAble = true;
                        ul.scrollTop = ul.scrollHeight - h;
                        clearInterval(timer);
                    }
                },1)
            } else {
                timer = setInterval(()=>{
                    ul.scrollTop+=30;
                    if(ul.scrollTop >= n*h - 1) {
                        this.scrollAble = true;
                        ul.scrollTop = n*h;
                        clearInterval(timer);
                    }
                },1)
            }

        }else {
            n--;
            if(n<0){
                n=0;
            }
            //滚动到上一屏
            timer = setInterval(()=>{
                ul.scrollTop-=30;
                if(ul.scrollTop <= n*h) {
                    this.scrollAble = true;
                    ul.scrollTop = n*h;
                    clearInterval(timer);
                }
            },1)
        }

    }

    /**
     * 切换壁纸分类
     */
    public async changeWallType(index: number,num: string = '0') {
        // this.is_hot = '0';
        await this.getWallList(index,this.search,this.pixel);
        this.typeIndex = index;
        this.tabIndex = 1;
        this.nav_active = num;
    }

    /**
     * 搜索返回
     */
    public goBack(){
        this.search = '';
        this.is_hot = '0';
        this.changeWallType(this.typeIndex);
    }

    /**
     * 打开漫游弹窗
     */
    public openManyou() {
        this.manyouDialogVisible = true;
    }

    /**
     * 前往充值
     */
    public goRecharge(){
        this.not_pay_ntice = false;
        this.manyouDialogVisible = false;
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.gotoRecharge();
    }

    /**
     * 选择壁纸分辨率
     */
    public checkWallpixel(command: string) {
        this.pixel = command;
        this.getWallList(this.typeIndex,this.search,command);
    }

    /**
     * 选择最新壁纸
     */
    public checkNewWall() {
        this.is_hot = '0';
        this.changeWallType(this.typeIndex);
    }

    /**
     * 选择最热壁纸
     */
    public checkHotWall() {
        this.is_hot = '1';
        this.changeWallType(this.typeIndex);
    }

    /**
     * 切换壁纸
     */
    public onChangeWall(id: number) {
        this.wall_id_now = id;
        this.is_onplay = true;
        if(id == -1) {
            this.is_onplay = false;
            this.wall_id_now = 0;
        }
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.bizhichangeWall(id);
    }

    /**
     * 删除壁纸
     */
    public onDeleteWall(data) {
        this.delete_wall = true;
        let index1 = -1;
        let index2 = -1;
        let index3 = -1;
        this.wallDownloadLog.forEach((item,index)=>{
            if(item.id == data.id){
                index1 = index;
                return;
            }
        });
        this.LocalWallList.forEach((item,index)=>{
            if(item.id == data.id){
                index2 = index;
                return;
            }
        });
        this.downloadingList.forEach((item,index)=>{
            if(item.id == data.id){
                index3 = index;
                return;
            }
        });
        //删除当前使用的壁纸时隐藏壁纸操作按钮
        if(data.id == this.wall_id_now) {
            this.wall_id_now = 0;
        }
        this.downloadingList.splice(index3, 1);
        this.LocalWallList.splice(index2,1);
        this.wallDownloadLog.splice(index1,1);
        $('.bizhi_load'+data.id).each(function(){
            $(this).removeClass('show');
        });
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.bizhideleteWall(data.id);
    }

    /**
     * 点击静音
     */
    public clickJingYin() {
        if(this.is_jingyin) {
            this.is_jingyin = false;
            this.slider = this.older_slider;
            this.onSetVolume(this.slider);
        }else {
            this.older_slider = this.slider;
            this.is_jingyin = true;
            this.slider = 0;
            this.onSetVolume(this.slider);
        }
    }

    /**
     * 设置音量
     */
    public onSetVolume(value) {
        this.slider = value;
        if(value == 0) {
            this.is_jingyin = true;
        }else {
            this.is_jingyin = false;
        }
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.bizhisetVolume(value)
    }

    /**
     * 播放壁纸
     */
    public onPlayWall() {
        this.is_onplay = !this.is_onplay;
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        if(this.is_onplay){
            factory.bizhionPlayWall();
        } else {
            factory.bizhionStopWall();
        }
    }

    /**
     * 获取本地壁纸
     */
    public getLocalWallList() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let arr = factory.bizhigetLocalWall();
        let idarr = [];
        let idarrHalf = [];
        for(let i=0;i<arr.length;i++){
            if(arr[i].TotalSize == arr[i].DownSize){
                idarr.push(arr[i].ID);
            }
        };
        for(let i=0;i<arr.length;i++){
            if(arr[i].TotalSize > arr[i].DownSize){
                idarrHalf.push(arr[i].ID);
            }
        };
        this.LocalWallList = this.wallList.filter(function(item){
            return idarr.indexOf(item.id) != -1;
        });
        this.LocalWallList.forEach((item)=>{
            this.downloadingList.push(item);
        })
        this.LocalHalfWallList = this.wallList.filter(function(item){
            return idarrHalf.indexOf(item.id) != -1;
        });
        const that = this;
        this.LocalWallList.forEach(function(item,index){
            let flag = false;
            that.wallDownloadLog.forEach((log)=> {
                if(log.id == item.id){
                    flag = true;
                }
            })
            if(!flag) {
                that.wallDownloadLog.push(item);
            }
        });
        this.LocalHalfWallList.forEach(function(item,index){
            let flag = false;
            that.wallDownloadLog.forEach((log)=> {
                if(log.id == item.id){
                    flag = true;
                }
            })
            if(!flag) {
                that.wallDownloadLog.push(item);
            }
        });
    }

    /**
     * 获取当前壁纸音量
     */
    public getVolume(){
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        let volume = factory.getVolume();
        this.slider = volume;
    }

    /**
     * 改变漫游状态
     */
    public async changeWalLogSwitch(){
        let url = HttpClient.URL_WALL_LOG_SWITCH;
        let walllogswitch = 0;
        if(this.manyou_check) {
            walllogswitch = 1;
        }
        let param = {};
        param['account_token'] = this.appParam.account_token;
        param['wall_log_switch'] = walllogswitch;
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.changeWalLogSwitchSuccess(walllogswitch);
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else {
            this.changeWalLogSwitchFaild(this.backData.data);
        }
    }

    /**
     * 修改漫游状态成功
     */
    public changeWalLogSwitchSuccess(manyouType: number){
        if(manyouType == 1){
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_MANYOU_OPEN),
                type: 'success',
                duration: 1500
            });
        }else {
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_MANYOU_CLOSE),
                type: 'success',
                duration: 1500
            });
        };
        this.init();
        this.manyouDialogVisible = false;
    }

    /**
     * 修改漫游状态失败
     */
    public changeWalLogSwitchFaild(data){
        this.$message({
            message: data.msg,
            type: 'warning',
            duration: 1500
        });
    }

    /**
     * 客户端操作壁纸时同步壁纸显示状态
     * ID=-1时候，表示没有壁纸
     * state=0的时候表示没有播放壁纸，1表示正在播放，2表示暂停,3表示停止
     */
    public PaperStateChange(id: number, state: number,volume: number) {
        if(id == -1 || state == 3) {
            this.is_onplay = false;
            this.wall_id_now = 0;
        }else {
            this.wall_id_now = id;
            if(state == 1) {
                this.is_onplay = true;
            }else if(state == 2 || state == 0){
                this.is_onplay = false;
            }
        }
        this.slider = volume;
    }

    /**
     * 检测壁纸是否已下载,返回布尔值
     */
    public checkDownloadWall(id){
        let flag = false;
        this.LocalWallList.forEach(function(item,index){
            if(item.id == id) {
                flag = true;
            }
        })
        return flag;
    }

    /**
     * 获取壁纸分类列表
     */
    public async getWallTypeList() {
        let url = HttpClient.URL_WALL_CATE;
        let param = {};
        this.backData = await this.http.post<Array<WallTypeListModel>>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.wallTypeList = this.backData.data;
        } else {
        }
    }

    /**
     * 点击蒙板层下载或切换壁纸
     */
    public clickDownorSet(data) {
        let flag;
        this.LocalWallList.forEach((item)=>{
            if(item.id == data.id){
                flag = true;
            }
        })
        if(flag){
            this.onChangeWall(data.id)
        }else {
            if(this.delete_wall){
                this.delete_wall = false;
            }else {
                this.getWallDownload(data);
            }
        }
    }

    /**
     * 获取壁纸列表
     */
    public async getWallList(cateid?: number,search?: string,pixel?: string) {
        this.is_loading = true;
        let url = HttpClient.URL_WALL;
        let param = new WallListRequestModel();
        if(cateid != 0){
            param.cate_id = cateid;
        };
        if(search != ''){
            param.search = search;
        };
        param.is_hot = this.is_hot;
        if(pixel != ''){
            param.pixel = pixel;
        }
        param.region_code = this.appParam.region_code + '';
        this.backData = await this.http.post(url, param);
        this.is_loading = false;
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            if(!cateid || cateid == 0){
                this.wallList = this.backData.data.list;
            }else {
                this.wallTypeList.forEach((item)=>{
                    if(item.id == cateid) {
                        item.list = this.backData.data.list;
                    }
                });
                this.$forceUpdate()
            };
            if(cateid == 0 && this.wallList.length == 0){
                this.wallListEmpty = true;
            }else if(cateid != 0){
                this.wallListEmpty = false;
                this.wallTypeList.forEach((item)=>{
                    if(item.id == cateid && item.list.length == 0){
                        this.wallListEmpty = true;
                    }
                })
            }else {
                this.wallListEmpty = false;
            }
        } else {
        }
    }

    /**
     * 获用户下载壁纸链接
     */
    public async getWallDownload(data) {
        if(this.downloading_wall_list.indexOf(data.id) != -1) return;
        if(Util.getUrlParam("account_token") == '' || Util.getUrlParam("account_token") == undefined) {
            this.onOpenLogin();
            return;
        };
        if(this.downloading_wall_list.length >= 3){
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_DOWNLOAD_DOUBLE_ERROR),
                type: 'warning',
                duration: 1500
            });
            return;
        };
        let url = HttpClient.URL_WALL_DOWNLOAD;
        let param = new WallDownloadRequestModel();
        param.wall_id = data.id;
        param.account_token = Util.getUrlParam("account_token");
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.download_url = this.backData.data.download_url;
            this.onBeginDownload(data);
        } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
            this.tokenExpired();
        } else if(this.backData.code == HttpClient.HTTP_ERROR_NOT_PAY){
            this.notifToRecharge();
        } else {

        }
    }

    /**
     * 打开登录
     */
    public onOpenLogin() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.openLogin();
    };

    /**
     * 提示充值
     */
    public notifToRecharge(){
        this.not_pay_ntice = true;
    }

    /**
     * 获取下载链接失败
     */
    public tokenExpired() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.loginExpire();
    }

    /**
     * 调用客户端下载方法
     */
    public onBeginDownload(data) {
        this.downloading_wall_list.push(data.id);
        let logFlag = true;
        this.wallDownloadLog.forEach((item,index)=>{
            if(item.id == data.id){
                logFlag = false;
            }
        });
        if(logFlag) {
            this.wallDownloadLog.push(data);
        };
        $('.bizhi_error'+data.id).each(function(){
            $(this).removeClass('show');
        });
        $('.bizhi_undown'+ data.id).each(function(){
            $(this).removeClass('hide');
        });
        $('.bizhi_redown'+ data.id).each(function(){
            $(this).addClass('hide');
        });
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.bizhibeginDownload(this.download_url,data.id);
    }

    /**
     *壁纸下载完成
     */
    public onDownloadOver(id: number){
        let index = this.downloading_wall_list.indexOf(id);
        this.downloading_wall_list.splice(index,1);
        let flag = true;
        this.LocalWallList.forEach((item,index)=>{
            if(item.id == id){
                flag = false;
            }
        });
        let data = this.wallDownloadLog.filter((item)=>{
            return item.id == id;
        })[0];
        if(flag) {
            this.LocalWallList.push(data);
        };
        this.wall_id_now = id;
        this.is_onplay = true;
    }

    /**
     * 取消下载
     */
    public unDownload(id){
        this.delete_wall = true;
        let index = this.downloading_wall_list.indexOf(id);
        this.downloading_wall_list.splice(index,1);
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.AbortDownLoad(id);
    }

    /**
     * 获用户下载壁纸记录
     */
    public async getWallDownloadLog() {
        //登录并且开启漫游时才获取漫游数据
        if(Util.getUrlParam("account_token") == '') return;
        if(this.userInfo.wall_log_switch == 0) {
            this.wallDownloadLog = [];
            return;
        };
        let url = HttpClient.URL_WALL_DOWNLOAD_LOG;
        let param = {};
        param['account_token'] = this.appParam.account_token;
        this.backData = await this.http.post(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            this.wallDownloadLog = this.backData.data.list;
        } else {
        }
    }

    public bizhiTest(){
        alert(1);
    }
}

(window as any).bizhi = new Bizhi({
    i18n
}).$mount("#app");


