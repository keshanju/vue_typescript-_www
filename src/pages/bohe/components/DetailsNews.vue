<template>
    <div>
        <div class="m_bot_100">
            <!-- 标题-->
            <div class="com_zixun_title">
                <b class="r_icon"></b>
                <span>{{$t("detailsnews.d1")}}</span>
            </div>
            <!-- 列表导航-->
            <div class="">
                <ul>
                    <li v-for="(item , index) in hotNewList" :key="index"><a class="l_hover" v-text="item.title" @click="gonewsdetail(item.id)"></a></li>
                </ul>
                <div class="empty_box" v-show="hotNewList.length == 0">
                    <img class="empty_img" src="../images/empty_event.png" alt="" style="width:20%;">
                    <p class="empty_msg">{{$t("pgame.n2")}}</p>
                </div>
            </div>
        </div>
        <div class="m_bot_100">
            <!-- 标题-->
            <div class="com_zixun_title">
                <b class="r_icon"></b>
                <span>{{$t("detailsnews.d2")}}</span>
            </div>
            <!-- 列表导航-->
            <div>
                <ul>
                    <li v-for="(item , index) in mobilNewList" :key="index">
                        <a class="l_hover" v-text="item.title" @click="gonewsdetail(item.id)"></a>
                    </li>
                </ul>
                <div class="empty_box" v-show="mobilNewList.length == 0">
                    <img class="empty_img" src="../images/empty_event.png" style="width:20%;">
                    <p class="empty_msg">{{$t("pgame.n2")}}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { NewModel, NewRequestModel, NewsModel } from "@/ts/models/NewsModel";
import GlobalConfig from "@/pages/bohe/global.config";
import HttpClient from "@/ts/net/HttpClient";
import { IdataModel } from "@/ts/models/IdataModel";
import Util from "@/ts/utils/Util";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import LocalStorageUtil from "../../../ts/utils/LocalStorageUtil";

@Component
export default class DetailsNews extends Vue {
    public hotNewList: Array<NewModel> = [];
    public mobilNewList: Array<NewModel> = [];
    public imageHeadUrl: string = "";

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;

    //////////END

    created() {
        let self = this;
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.onGetNewList(Util.NEWS_HOT, 5, function(data) {
            self.hotNewList = data.data.list;
        });
        this.onGetNewList(Util.NEWS_MOBIL,5, function(data) {
            self.mobilNewList = data.data.list;
        });
    }

    public gonewsdetail(id: number) {
        JumpWebUtil.gotoNewsDetails(id);
    }

    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 获取资讯列表
     */
    public async onGetNewList(type: string, size: number, fn) {
        const url = HttpClient.URL_NEWS;
        let param = new NewRequestModel();
        param.page = 0;
        param.size = size;
        param.support_type = 1;
        param.class_type = 2;
        param.region_code = LocalStorageUtil.getRegionCodes();
        param.label = type;
        this.backData = await this.http.get<Array<NewsModel>>(url, param);
        if (this.backData.code == HttpClient.HTTP_SUCCESS_NET_CODE) {
            fn(this.backData);
        }
    }
}
</script>

