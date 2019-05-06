<template>
    <div style="color: #000;">
        <!--轮播图-->
        <div class="components_cell">
            <el-carousel arrow='always' class="box_radius">
                <el-carousel-item style="width: 100%;height:100%" v-for="(item,index) in activityList" :key="index">
                    <img :src="imageHeadUrl + item.imgUrl" class="img_filter cursor box_radius" @click="goActivityDetail(item)">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!--链接按钮-->
        <div class="components_cell flex_row_between" style="padding:0 20px;">
            <ul class="flex_row_between" style="height: 120px;">
                <li class="web_white_btn" :class="{web_choose_active:chooseBtn == 0}" @mouseover="changeCheckBtn(0)" @click="changePage(1)">
                    {{$t("user.b65")}}
                </li>
                <li class="web_white_btn" :class="{web_choose_active:chooseBtn == 1}" @mouseover="changeCheckBtn(1)" style="margin-left:15px;" @click="bindAccount" v-show="userinfo.master_account == 0 && userinfo.mobile == ''">
                    {{webParam.region_code == 1 ? $t("public.share10") : $t("user.b29") }}
                </li>
                <li class="web_white_btn" :class="{web_choose_active:chooseBtn == 2}" @mouseover="changeCheckBtn(2)" style="margin-left:15px;" @click="changePage(2)" v-show="(userinfo.master_account == 0 && userinfo.mobile != '') || userinfo.master_account == 1">
                    {{$t("user.b71")}}
                </li>
                <li class="web_white_btn" :class="{web_choose_active:chooseBtn == 3}" @mouseover="changeCheckBtn(3)" style="margin-left:15px;" @click="changePage(2)" v-show="(userinfo.master_account == 0 && userinfo.mobile != '') || userinfo.master_account == 1">
                    {{$t("user.b72")}}
                </li>
                <li class="web_white_btn" :class="{web_choose_active:chooseBtn == 4}" @mouseover="changeCheckBtn(4)" style="margin-left:15px;" @click="changePage(5)" v-show="(userinfo.master_account == 0 && userinfo.mobile != '') || userinfo.master_account == 1">
                    {{$t("user.b73")}}
                </li>
                <li class="web_white_btn" :class="{web_choose_active:chooseBtn == 5}" @mouseover="changeCheckBtn(5)" style="margin-left:15px;" @click="changePage(4)">
                    {{$t("user.b74")}}
                </li>
            </ul>
            <div class="log_out_btn" @click="loginOut">
                {{$t("user.b75")}}
            </div>
        </div>
        <!--公告列表-->
        <div class="components_cell" style="padding:20px;">
            <div class="notice_title pos_foot_txt3">{{$t("public.share22")}}</div>
            <div>
                <ul>
                    <li class="user_notice_box" v-for="(item , index) in notifyList" :key="index" @click="goNotifyDetail(item.id)">
                        <div class="user_notice_cell pos_safty_title">
                            <p class="user_logo_font">{{item.publish_time_month + '/' + item.publish_time_day}}</p>
                            <p class="list_font">{{item.publish_time_year}}</p>
                        </div>
                        <div style="width: 830px" class="flex_content_left">
                            <p class="user_webnav_font">{{item.title}}</p>
                            <p class="list_font" style="width: 100%; color: #999999">{{item.summary}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator";
    import {Carousel, CarouselItem} from 'element-ui';
    import WebParamModel from '@/ts/models/WebModel';
    import {LsLanguage} from "@/pages/leishen/util/LsLanguage";
    import VueI18n from "vue-i18n";
    import NewsConfigModel,{ NewModel,ActivityRequestModel,NewRequestModel, NewsModel, ActivityModel, ActivityRequestPictureModel, ActivityPictureModel } from '@/ts/models/NewsModel';
    import {UserToken, UserInfo} from '@/ts/models/UserModel';
    import HttpClient from '@/ts/net/HttpClient';
    import {TdappModel} from '@/ts/models/TdappModel';
    import Util from '@/ts/utils/Util';
    import {IdataModel} from '@/ts/models/IdataModel';
    import GlobalConfig from '../../leishen_user/global.config';
    import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
    import ProjectConfig from '../../../../project.config';
    import AppParamModel from "../../../ts/models/AppModel";
    import JumpWebUtil from '@/ts/utils/JumpWebUtil';
    import ConfigUtil from '@/ts/utils/ConfigUtil';

    @Component({
        components: {
            'el-carousel': Carousel,
            'el-carousel-item': CarouselItem
        }
    })
    export default class UserCenter extends Vue {
        @Prop() public userinfo: UserInfo;

        public webParam = AppParamModel.getInstace(); // 浏览器参数
        public hotNewsList: Array<NewModel> = [];
        public lastNewsList: Array<NewModel> = [];
        public notifyList: Array<NewModel> = [];
        public activityList: Array<ActivityPictureModel> = [];
        public imageHeadUrl: string = '';
        public token: UserToken = new UserToken();
        public windowsDownloadUrl: string = '';
        public macDownloadUrl: string = '';
        public checkBtn: number = 0;
        public browserTipShow: boolean = false;
        public chooseBtn: number = 0;   //按钮移动默认选中
        public bannerImg: string = ''; //活动banner图片

        //////////公共参数
        public http = new HttpClient();
        public backData: IdataModel<any> | undefined;

        //////////END

        public created() {
            this.setBaseUrl(GlobalConfig.getBaseUrl());
            this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
            this.getNotifyList();
            this.getActivityInfo();
            this.token = LocalStorageUtil.getUserToken();
            this.checkBrowserVersion();
        }
        /**
         * 改变选中按钮
         */
        public changeCheckBtn(index: number) {
            this.chooseBtn = index;
        }

        /**
         * 老用户绑定账号
         */
        public bindAccount(){
            this.$emit('bindaccount')
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
         * 跳转公告详情
         */
        public goNotifyDetail(id: number) {
            JumpWebUtil.userGotoWeb(GlobalConfig.getWebBaseUrl(), JumpWebUtil.HTML_NAME_DETAILS_NOTICE + id + '.html');
        }

        /**
         * 检测用户浏览器版本
         */
        public checkBrowserVersion() {
            let browserInfo = new TdappModel();
            browserInfo.getBrowser();
            if (browserInfo.browser_version == 9) {
                this.browserTipShow = true;
            }
        }

        /**
         * 关闭浏览器版本过低提示
         */
        public closeBrowserTip() {
            this.browserTipShow = false;
        }

        /**
         * 设置根路径
         * @param url
         */
        public setBaseUrl(url: string): void {
            this.http.setBaseUrl(url);
        }

        /**
         * 获取下载url
         * @param url
         */
        public onDownloadConfig(jsonConfig: any) {
            this.windowsDownloadUrl = jsonConfig.bohe.windows.download_url;
            this.macDownloadUrl = jsonConfig.bohe.mac.download_url;
        }

        /**
         * 下载windows客户端
         * @param ln
         */
        public windowsDownload() {
            let tdModel = new TdappModel();
            tdModel.getBrowser();
            window.location.href = this.windowsDownloadUrl;
        }

        /**
         * 跳转page页
         */
        public changePage(index: number){
            this.$emit('changepage',index)
        }

        /**
         * 获取公告列表
         */
        public async getNotifyList(page: number = 1) {
            let url = HttpClient.URL_NEWS;
            let param = new NewRequestModel();
            param.page = page;
            param.size = 6;
            param.support_type = 1;
            param.region_code = this.webParam.region_code;
            this.backData = await this.http.get<Array<NewModel>>(url, param);
            if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
                this.notifyList = this.backData.data.list;
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
                for(var i=0;i<this.activityList.length;i++){
                    let imgUrl = this.activityList[i].imgs.filter((item)=>{
                        return item.key == 4;
                    })[0].img_url;
                    this.activityList[i]['imgUrl'] = imgUrl;
                }
            }
        }
        
        /**
         * 退出登录
         */
        public loginOut(){
            this.$emit('loginout')
        }
    }
</script>