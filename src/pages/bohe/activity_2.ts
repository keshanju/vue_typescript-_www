import '@/assets/less/bohe.less';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import { Vue, Component } from 'vue-property-decorator';
import { LanguageConfig } from "@/ts/utils/Language";
import GlobalConfig from "@/pages/bohe/global.config";
import "babel-polyfill";
import HttpClient from '@/ts/net/HttpClient';
import { IdataModel } from '@/ts/models/IdataModel';
import WebParamModel from "@/ts/models/WebModel";
import {Button, Tooltip } from 'element-ui';
import VueI18n from "vue-i18n";
import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
import Clipboard from "clipboard";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import { Notification} from "element-ui";
Vue.config.productionTip = false;

//语言包
Vue.use(VueI18n);
Vue.use(Button);
Vue.prototype.$notify = Notification;
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
class Activdetails extends ActivityProxy {

    public activity_id = 3;
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public imageHeadUrl: string = '';
    public windowsDownloadUrl: string = '';
    public macDownloadUrl: string = '';
    //////////公共参数
    public http = new HttpClient();
    public language:string;
    public clipboard:any
    public isUserLogin:boolean=false
    public globalUrl:string
    public backData: IdataModel<any> | undefined;
    //////////END
    public async created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.globalUrl=GlobalConfig.getWebBaseUrl()
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.language = LocalStorageUtil.getLanguage();
        this.getActivityId();
        this.account_token = LocalStorageUtil.getUserToken().account_token;
        this.getReferActivitys();
        if(this.account_token != '') this.isUserLogin = true;
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
      /**
     * 跳转到登陆界面
     * @param url 
     */
    public goToLogin(){
        window.open(window.location.origin+'/login.html')
    }
    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        GlobalConfig.log('切换语言:' + lang.locale);
        this.language =ln
    }

    /**
     * 跳转活动详情
     */
    public getText() {
        let self=this
        if(this.account_token){
            //@ts-ignore
            if (this.clipboard==undefined) {
                self.clipboard = new Clipboard("#activty_detail_copyBtn", {
                    text: function() {
                       return  document.getElementById('activty_detail_tip').innerText
                    }
                });
              }
           
            //@ts-ignore
            self.clipboard.on("success", function(e) {
                e.clearSelection();
                 //@ts-ignore
                self.$notify({
                    //@ts-ignore
                    title:self.$t('pvideoshow.v8'),
                    //@ts-ignore
                    message:self.$t('notify.y9'),
                    type:'warning'
                })
            });
            if(self.clipboard.e){
                console.log(self.clipboard.e)
               self.clipboard.e.success=[self.clipboard.e.success[0]]
            }
        }else{
            //@ts-ignore
            this.$notify({
                //@ts-ignore
                title:self.$t('pvideoshow.v8'),
                //@ts-ignore
                message:self.$t('pvideoshow.v12'),
                type:'warning'
            })
        }
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
    public goToActivty1(){
        window.open(window.location.origin+'/activity_1.html')
    }
}

//
new Activdetails({
    i18n
}).$mount('#app');