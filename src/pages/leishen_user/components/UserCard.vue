<template>
    <div style="color: #000;" v-loading="isLoading">
        <!--轮播图-->
        <div class="components_cell">
            <el-carousel arrow='always' class="box_radius">
                <el-carousel-item style="width: 100%;height:100%" v-for="(item,index) in activityList" :key="index">
                    <img :src="imageHeadUrl + item.imgUrl" alt="" class="img_filter cursor box_radius"
                         @click="goActivityDetail(item)">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="components_cell pos_safty_box">
            <el-tabs v-model="activeName" id="myTabBar" @tab-click="clickTab">
                <el-tab-pane :label="$t('user.b67')" name="first">
                    <ul class="flex_row_start pos_safty_cell">
                        <li class="flex_row_around">
                            <input type="text" v-model="cd_key" :placeholder="$t('user.b67_1')" class="cart_input_box">
                        </li>
                        <li class="public_btn" style="height: 40px;line-height: 30px;" @click="payCDKey">
                            {{$t("user.b60")}}
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane :label="$t('user.b67_0')" name="second">
                    <ul class="flex_row_start pos_safty_cell">
                        <li class="flex_row_around">
                            <p class="user_check_font">{{$t("user.b110")}}</p>
                            <input type="text" :placeholder="$t('user.b67_9')" v-model="cordNum" class="cart_input_box">
                        </li>
                        <li class="flex_row_around">
                            <p class="user_check_font">{{$t("user.b111")}}</p>
                            <input type="password" :placeholder="$t('user.b67_9')" v-model="cordPwd"
                                   class="cart_input_box">
                        </li>
                        <li class="public_btn" style="height: 40px;line-height: 30px;" @click="onPayByCord">
                            {{$t("user.b60")}}
                        </li>
                    </ul>

                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog :title="$t('user.b67_5')" :visible.sync="centerDialogVisible" width="360px" center>
            <p style="text-align: center;"><span>{{$t('user.b67_6')}}</span><span
                    style="margin:0px 6px 6px;color:#f56c6c;font-size:16px;">{{cd_key_time}}</span><span>{{$t('user.b67_7')}}</span>
            </p>
            <p style="text-align: center;"><span>{{$t('user.b67_8')}}</span><span style="margin-left:6px;">{{expiryDate}}</span>
            </p>
            <p style="text-align: center;margin-top:8px;">
                <el-button @click="centerDialogVisible=false" style="background: #ffd33e;">{{$t("user.b60")}}
                </el-button>
            </p>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import {Carousel, CarouselItem, Tabs, TabPane, Dialog, Button} from 'element-ui';
    import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
    import CheckUtil from '@/ts/utils/CheckUtil';
    import HttpClient from '@/ts/net/HttpClient';
    import {CardfeeModel, CDKeyModel} from '@/ts/models/UserModel';
    import {IdataModel} from '@/ts/models/IdataModel';
    import GlobalConfig from '@/pages/leishen_user/global.config';
    import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
    import JumpWebUtil from '@/ts/utils/JumpWebUtil';
    import {
        ActivityRequestModel,
        ActivityModel,
        ActivityRequestPictureModel,
        ActivityPictureModel
    } from '@/ts/models/NewsModel';
    import AppParamModel from '@/ts/models/AppModel';
    import UserProxy from "@/ts/proxy/UserProxy";
    import $ from 'jquery'
    import Util from "@/ts/utils/Util";
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Dialog)
    Vue.use(Button)
    @Component({
        components: {
            'el-carousel': Carousel,
            'el-carousel-item': CarouselItem
        }
    })
    export default class UserCard extends UserProxy {
        public cordNum: string = "";//充值卡号
        public cordPwd: string = ""//充值卡密码
        public token: string = ""//用户token
        public activeName: string = 'first'
        public activityList: Array<ActivityPictureModel> = [];
        public imageHeadUrl: string = '';
        public isLoading: boolean = false;//loading显示
        public webParam = AppParamModel.getInstace(); // 浏览器参数
        public bannerImg: string = ''; //活动banner图片
        public centerDialogVisible: boolean = false
        public expiryDate = ''
        //////////公共参数
        public http = new HttpClient();
        public backData: IdataModel<any> | undefined;

        public created() {
            this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
            this.setBaseUrl(GlobalConfig.getBaseUrl());
            this.token = LocalStorageUtil.getUserToken().account_token;
            this.getActivityInfo();
        }
        public setBaseUrl(url: string): void {
            this.http.setBaseUrl(url);
        }
        public getInit(){
            this.$nextTick(()=>{
                $('#myTabBar .el-tabs__active-bar').css({width:$('#myTabBar .is-active').width()+'px'})
            })
        }
        /**
         * 跳转活动详情
         */
        public goActivityDetail(item: any) {
            if (item.url_type == 1) {
                window.open(item.url);
            } else {
                JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_DETAILS_ACTIVITY + item.id + '.html');
            }
        }

        /**
         * 获取活动banner
         */
        public async getActivityInfo() {
            let url = HttpClient.URL_ACTIVITY_PICTURE_LIST;
            let param = new ActivityRequestPictureModel();
            param.region_code = this.webParam.region_code;
            param.plat_type = 1;
            this.backData = await this.http.post(url, param);
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.activityList = this.backData.data as ActivityPictureModel[];
                for (var i = 0; i < this.activityList.length; i++) {
                    let imgUrl = this.activityList[i].imgs.filter((item) => {
                        return item.key == 4;
                    })[0].img_url;
                    this.activityList[i]['imgUrl'] = imgUrl;
                }
            }
        }

        /**
         * 充值卡充值
         */
        public async onPayByCord() {
            this.isLoading = true;
            //验证充值卡号
            if (this.cordNum == '') {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_CARD_NUM_EMPTY),
                    type: "warning"
                });
                this.isLoading = false;
                return;
            }
            if (!CheckUtil.checkCardNum(this.cordNum)) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_CARD_NUM_ERROR),
                    type: "warning"
                });
                this.isLoading = false;
                return;
            }

            //验证充值卡密码
            if (this.cordPwd == '') {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_CARD_PWD_EMPTY),
                    type: "warning"
                });
                this.isLoading = false;
                return;
            }
            if (!CheckUtil.checkCardNum(this.cordPwd)) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_CARD_PWD_ERROR),
                    type: "warning"
                });
                this.isLoading = false;
                return;
            }

            //充值
            const url = HttpClient.URL_USER_CARDFEE;
            let param = new CardfeeModel();
            param.account_token = this.token;
            param.card_no = this.cordNum;
            param.password = this.cordPwd;

            this.backData = await this.http.post(url, param);
            this.isLoading = false;
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                if(this.backData.data.card_type.toString()=='2'){
                    //可以暂停的体验卡充值成功
                    let lang=Util.getUrlParam('language')||LocalStorageUtil.getLanguage();
                    this.cd_key_min=this.backData.data.experience_minutes;
                    this.cd_key_time=Util.minToDay(this.cd_key_min,lang);
                    this.expiryDate = this.backData.data.experience_expiry_time;
                    this.centerDialogVisible = true;this.backData
                    this.$emit('refreshuserinfo');
                }else{
                    //成功提示
                    this.$confirm(
                        TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_CARD_RECHARGE_SUCCESS),
                        '',
                        {
                            confirmButtonText: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_BUTTON_BACK),
                            type: 'success',
                            showCancelButton: false,
                        }).then(() => {
                        this.$emit('refreshuserinfo');
                    }).catch(() => {
                        this.$emit('refreshuserinfo');
                    });
                }
            } else if (this.backData.code == HttpClient.HTTP_TOKEN_EXPIRE) {
                //token失效
                LocalStorageUtil.loginOut();
                JumpWebUtil.backHome();
            } else {
                //错误提示
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(
                        TipsMsgUtil.KEY_NOTIF_ERROR_TITLE
                    ),
                    message: this.backData.msg,
                    type: "warning"
                });
            }
        }

        //点击确定的时候
        payCDKey() {
            if (this.cd_key == '') {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: this.$i18n.t('user.b67_2').toString(),
                    type: "warning"
                });
            } else {
                this.onPayCDKey()
            }
        }

        //CDKey支付成功
        public cdKeySuceess(msg: string, expiry_time?: string) {
            if (expiry_time) {
                //可以暂停的体验卡充值成功
                this.expiryDate = expiry_time;
                this.centerDialogVisible = true;
                this.$emit('refreshuserinfo');
            } else {
                //不可以暂停的体验卡充值成功
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
                    message: msg,
                    type: "success"
                });
            }
        }

        //CDKey支付失败
        public cdKeyError(msg: string) {
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                message: msg,
                type: "warning"
            });
        }
        //切换tab框
        clickTab(val:any){
            this.$emit('changetab',val.name)
        }
    }
</script>
