<template>
    <div>
        <div class="news_title flex_row_between">
            <h5>{{gamename}}</h5>
            <p class="cursor" @click="getMore">更多+</p>
        </div>
        <div class="cursor" @click="goDetail(newWithImg.id)" v-if="newlist.length > 0">
            <div class="new_img_box">
                <img :src="imageHeadUrl + newWithImg.image_url" alt="" class="new_img">
            </div>
            <p class="new_title">{{newWithImg.title}}</p>
        </div>
        <ul style="min-height:97px;" v-if="newlist.length > 1">
            <li class="news_li" v-for="(item,index) in newsList" :key="index" @click="goDetail(item.id)">{{item.title}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator";
    import { NewsInfoModel } from '@/ts/models/NewsModel';
    import GlobalConfig from '@/pages/leishen/global.config';

    @Component
    export default class NewsOneImg extends Vue {
        @Prop() public gamename!: string;
        @Prop() public tabindex!: number;
        @Prop() public newlist!: Array<NewsInfoModel>;

        public newWithImg: NewsInfoModel;
        public newsList: Array<NewsInfoModel>;
        public imageHeadUrl: string = '';

        public created(){
            this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
            this.newWithImg = this.newlist[0];
            this.newsList = this.newlist.slice(1,4);
        }

        /**
         * 进入资讯详情
         */
        public goDetail(id: number){
            this.$emit('gonewsdetail',id)
        }

        /**
         * 查看更多资讯
         */
        public getMore(){
            this.$emit('getmore',this.tabindex);
        }
    }
</script>
