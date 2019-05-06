import '@/assets/less/bohe.less';
import "babel-polyfill";
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import { Vue, Component } from 'vue-property-decorator';
import { LanguageConfig } from "@/ts/utils/Language";
import GlobalConfig from "@/pages/bohe/global.config";
import HttpClient from '@/ts/net/HttpClient';
import { ActivityRequestModel, ActivityModel, NewModel, NewRequestModel, NewsModel } from '@/ts/models/NewsModel';
import { IdataModel } from '@/ts/models/IdataModel';
import WebParamModel from "@/ts/models/WebModel";
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import { Pagination,Button, Tooltip } from 'element-ui';
import VueI18n from "vue-i18n";
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import Util from '@/ts/utils/Util';
import $ from 'jquery'
Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
Vue.use(Button);
let lang = LanguageConfig.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        'el-tooltip': Tooltip
    }
})
class Activdetails extends Vue {

    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public imageHeadUrl: string = '';
    //////////公共参数
    public http = new HttpClient();
    public language:string;
    public backData: IdataModel<any> | undefined;
    //////////END
    public huodongId:number=1
    public windowsDownloadUrl: string = '';
    public macDownloadUrl: string = '';
    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.language = LocalStorageUtil.getLanguage();
    }
    mounted(){
        this.$nextTick(()=>{
        //@ts-ignore
        this.$refs.headerNav.pageName='activity.html'
        })
    }
    /**
     * 设置根路径
     * @param url 
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }
    // 跳转到注册界面
    gotoRegister(){
        JumpWebUtil.backRegister()
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        this.language =ln
    }
    // 跳转到另外一个活动页面
    goToActivity(){
       window.open(window.location.href.replace('activity_1.html','activity_2.html'))
    }
    /**
     * 获取下载url
     * @param url
     */
    public onDownloadConfig(jsonConfig: any) {
        const downConfig = jsonConfig.bohe.down_platform[this.webParam.from];
        this.windowsDownloadUrl = downConfig.windows.download_url;
        this.macDownloadUrl = downConfig.mac.download_url;
    }
}

//
new Activdetails({
    i18n
}).$mount('#app');