import '@/assets/less/leishen.less';
import "babel-polyfill";
import { Vue, Component } from 'vue-property-decorator';
import HeadNav from '../components/HeadNav.vue';
import FootNav from '../components/FootNav.vue';
import DownloadBox from '../components/DownloadBox.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from '../util/LsLanguage';
import GlobalConfig from '../global.config';
import JumpWebUtil from '@/ts/utils/JumpWebUtil';
import NewsConfigModel, { NewsModel } from '@/ts/models/NewsModel';
import ConfigUtil from '@/ts/utils/ConfigUtil';
import Util from "@/ts/utils/Util";

Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        'download-box': DownloadBox
    }
})
class Notice extends Vue {

    public webParam = WebParamModel.getInstace();
    public pre_id: string = '';
    public next_id: string = '';
    public questionList = []; //问答列表
    public windowsDownloadUrl: string = '';//windows客户端下载配置
    public macDownloadUrl: string = '';//mac客户端下载配置

    public created() {
        this.onGetQuestionList();
        this.getDownloadUrl();
        this.pre_id = document.getElementById('pre_id').getAttribute('pre_id');
        this.next_id = document.getElementById('next_id').getAttribute('next_id');
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
     * 获取下载url列表
     */
    public async getDownloadUrl() {
        const jsonConfig = await ConfigUtil.getInstance().download();
        this.windowsDownloadUrl = jsonConfig.leigod.windows.download_url;
        this.macDownloadUrl = jsonConfig.leigod.mac.download_url;
    }

    /**
     *
     */
    public gotoNews() {
        JumpWebUtil.backNews();
    }

    /**
     * 跳转详情页
     * @param type 0上一页 1下一页
     */
    public goNewsdetail(type: number) {
        let cid = 0;
        if (type == 0) {
            cid = parseInt(this.pre_id);
        } else if (type == 1) {
            cid = parseInt(this.next_id);
        }
        JumpWebUtil.gotoNewsDetails(cid);
    }

    /**
     * 相关问答列表
     */
    public async onGetQuestionList() {
        let param = new NewsConfigModel();
        param.baseUrl = GlobalConfig.getStafUrl();
        param.page = 1;
        param.size = 4;
        param.support_type = 1;
        param.region_code = this.webParam.region_code;
        const model: NewsModel = await ConfigUtil.getInstance().getQuestionssList(param);
        this.questionList = model.list;
    }

}

new Notice({
    i18n
}).$mount('#app');