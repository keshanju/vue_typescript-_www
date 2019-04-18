import { UserUtil } from './UserUtil';
import { Vue, Component } from 'vue-property-decorator';
import "babel-polyfill";
import Header from './components/Headnav.vue';
import Footer from './components/Footer.vue';
import Shopinfo from './components/Shopinfo.vue';
import Wallpaper from './components/Wallpaper.vue';
import EditInfo from './components/EditInfo.vue';
import AccountManage from './components/AccountManage.vue';
import { Input, Checkbox, Row, Col, Steps, Step,Dialog, Tag, Table, TableColumn, Button, Pagination, MessageBox,Alert,Form,FormItem } from "element-ui";
import './less/leigodwangba.less';
import GlobalConfig from './global_config';
import XmlHttpClient from '@/ts/net/XmlHttpClient';
import { UserInfoModel, UploadAvatarRequestModel } from './model/userModel';


Vue.use(Input);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tag);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Pagination);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
@Component({
    components: {
        'header-nav': Header,
        'footer-nav': Footer,
        'shopinfo': Shopinfo,
        'wallpaper': Wallpaper,
        'accountmanage': AccountManage,
        'editinfo': EditInfo,
    }
})
export default class User extends UserUtil {
    public xmlHttp: XmlHttpClient = new XmlHttpClient();
    public isLoading: boolean;//
    public backData: any;
    public userInfo: UserInfoModel = new UserInfoModel();
    public localUserInfo: UserInfoModel;
    public face_image_url: string = '';//默认头像
    public username = "";//用户名
    public curNavIndex: number = 1;
    public editAvatarVisible: boolean = false; //修改头像

    async created() {
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        await this.getUserInfo();
        this.init();
    }



    /**
     * 改变导航index
    */
    changeIndex(n) {
        this.curNavIndex = n
    }


    /**
     * 退出
     */
    public onloginout() {
        this.$confirm('确认退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.LoginOut()

        }).catch(() => {
        });
    }

    

 

   

}

new User({

}).$mount('#user');