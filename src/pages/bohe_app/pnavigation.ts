import '@/assets/css/bohe_app.css';
import "leigod-lib-flexible";
import "babel-polyfill";
import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import AppParamModel from "@/ts/models/AppModel";
import { ExtrnalFactory } from '@/ts/factory/ExtrnalFactory';

Vue.config.productionTip = false;

@Component
class Pnavigation extends Vue {

    public activeName = 0;
    public linkList = [];
    public appParam: AppParamModel = AppParamModel.getInstace();
    public bgImg: string = 'images/bg_img.jpg';

    public created() {
        this.appParam.getAppParam();
        this.getLinkData();
    }

    public mounted() {
        this.changeBg();
    }

    /**
     * 读取配置
     */
    public getLinkData() {
        let data = require('@/assets/i18n/link.config.json');
        data = data[this.appParam.region_code];
        if(data == null) return;
        this.linkList = data[this.appParam.language];
    }

    /**
     * 动态更换背景
     */
    public changeBg() {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        const img = factory.getbackground(1);
        if (img != '') {
            this.bgImg = img;
        }
    }

    /**
     * 切换标签
     */
    public onAccordionChange(index: number) {
        if(index == this.activeName) {
            this.activeName = -1;
            return;
        }
        this.activeName = index;
    }

    /**
     *
     * @param url
     */
    public jumpUrl(url: string) {
        const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.jumpUrl(url);
    }
}

new Pnavigation({
}).$mount('#app');