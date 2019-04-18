
import "leigod-lib-flexible";
import {Component, Vue} from "vue-property-decorator";
import "babel-polyfill";
import {ExtrnalFactory} from "@/ts/factory/ExtrnalFactory";
import AppParamModel from "@/ts/models/AppModel";
import GlobalConfig from "@/pages/leishen_pc/global.config";
import ProjectConfig from "../../../project.config";
import Util from "@/ts/utils/Util";

Vue.config.productionTip = false;

class Index {

    public appParam: AppParamModel = AppParamModel.getInstace(Util.REGION_CODE_1,Util.ZH_CN);

    constructor() {
        this.debugInfo();
        //登录过期
        let factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
        factory.loginExpire();
    }

    /**
     * 打印环境信息
     */
    public debugInfo() {
        if(ProjectConfig.server_type != 3) {
            let txt = '';
            txt += 'bohe_app' + '##';
            txt += '当前环境:' + ProjectConfig.server_type + '##';
            txt += '服务器地址:' + GlobalConfig.getBaseUrl() + '##';
            txt += '图片地址:' + GlobalConfig.getImgBaseUrl() + '##';
            txt += '网站地址' + GlobalConfig.getWebBaseUrl();
            console.log(txt);
        }
    }
}
//
new Index();

