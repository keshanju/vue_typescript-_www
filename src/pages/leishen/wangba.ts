import '@/assets/less/leishen.less';
import "babel-polyfill";
import { Vue, Component } from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import VueI18n from "vue-i18n";
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from "@/pages/leishen/util/LsLanguage";
import Util from '@/ts/utils/Util';
import ConfigUtil from '@/ts/utils/ConfigUtil';

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
  components: {
    "head-nav": HeadNav,
    "foot-nav": FootNav,
    "download-box": DownloadBox
  }
})
class Wangba extends Vue {
  public webParam = WebParamModel.getInstace(); // 浏览器参数
  private wangbaDownloadUrl = ''; // 网吧版下载链接

  mounted(){
    this.getDownloadUrl();
  }
  /**
   * 切换语言
   */
  public onChangeLanguage(ln: string) {
    lang.changeLanguage(ln);
    i18n.locale = lang.locale;
    this.webParam.language = ln;
    // GlobalConfig.log('切换语言:' + lang.locale);
  }

  /**
   * 获取推荐头像列表
   * @param url
   */
  public async getDownloadUrl() {
    const jsonConfig = await ConfigUtil.getInstance().download();
    this.wangbaDownloadUrl = jsonConfig.leigod.wangba.download_url;
    console.log(this.wangbaDownloadUrl)
  }
}

new Wangba({
  i18n
}).$mount("#market");

