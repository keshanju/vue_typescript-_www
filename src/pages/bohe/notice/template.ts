import '@/assets/less/bohe.less';
import HeadNav from '../components/HeadNav.vue';
import FootNav from '../components/FootNav.vue';
import DetailsNews from '../components/DetailsNews.vue';
import {Component, Vue} from 'vue-property-decorator';
import {LanguageConfig} from "@/ts/utils/Language";
import "babel-polyfill";
import HttpClient from '@/ts/net/HttpClient';
import {IdataModel} from '@/ts/models/IdataModel';
import AppParamModel from '@/ts/models/AppModel';
import {NoticeDetailModel, NoticeDetailRequestModel} from '@/ts/models/NewsModel';
import GlobalConfig from "@/pages/bohe/global.config";
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import WebParamModel from "@/ts/models/WebModel";
import VueI18n from "vue-i18n";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace();
let lang = LanguageConfig.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        "details-news": DetailsNews
    }
})
class Notice extends Vue {

    public webParam = WebParamModel.getInstace();
    public pre_id: string = '';
    public next_id: string = '';

    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    //////////END

    public created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.pre_id = document.getElementById('pre_id').getAttribute('pre_id');
        this.next_id = document.getElementById('next_id').getAttribute('next_id');
    }

    /**
     * 设置根路径
     * @param url
     */
    public setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        GlobalConfig.log('切换语言:' + lang.locale);
    }

    /**
     *
     */
    public gotoNews() {
        JumpWebUtil.backNotice();
    }

    /**
     * 跳转详情页
     * @param type 0上一页 1下一页
     */
    public goNewsdetail(type: number){
        let cid = 0;
        if(type == 0) {
            cid = parseInt(this.pre_id);
        }else if(type == 1) {
            cid = parseInt(this.next_id);
        }
        JumpWebUtil.gotoNoticeDetails(cid);
    }
}

new Notice({
    i18n
}).$mount('#app');