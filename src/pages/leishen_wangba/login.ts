import { Vue, Component } from "vue-property-decorator";
import "babel-polyfill";
import Header from "./components/Headnav.vue";
import Footer from "./components/Footer.vue";
import { Input, Checkbox, Row, Col, Message, Loading } from "element-ui";
import "./less/leigodwangba.less";
import GlobalConfig from "./global_config";
import XmlHttpClient from "@/ts/net/XmlHttpClient";
import LocalStorageUtil from "./LocalStorageUtil";
import { LoginRequestModel, LoginModel } from "./model/userModel";
import { TipsMsgUtil } from "@/ts/utils/TipsMsgUtil";
import { XmlDataModel } from "@/ts/models/IdataModel";
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.use(Loading);
Vue.prototype.$message = Message;
@Component({
  components: {
    "header-nav": Header,
    "footer-nav": Footer
  }
})
export default class Login extends Vue {
  public username: string = ""; //用户名
  public password: string = ""; //密码
  public isKeepPw: boolean = false; //记住密码
  public isLoading: boolean = false; //登录动画

  // 公共参数
  public xmlHttp: XmlHttpClient = new XmlHttpClient();
  commonPsaaword: string;
  loadingMsg: any;
  backData: XmlDataModel | undefined;
  public setBaseUrl(url: string): void {
    this.xmlHttp.setBaseUrl(url);
  }

  created() {
    console.log("登录log");
    this.setBaseUrl(GlobalConfig.getBaseUrl());
    this.init();
  }
  /**
   * 初始化
   */
  public init(): void {
    let username = localStorage.getItem(LocalStorageUtil.STORAGES_USERNAME);
    if (username != null && username != "undefined") {
      this.username = username;
    }
    let pwd = localStorage.getItem(LocalStorageUtil.STORAGES_PW);
    if (pwd != null && pwd != "undefined") {
      this.password = pwd;
      this.isKeepPw = true;
    }
  }

  public onlogin() {
    const url = XmlHttpClient.URL_WBOP_DO_LOGIN;
    let param = new LoginRequestModel();
    param.mini_username = this.username;
    param.mini_password = this.password;
    localStorage.setItem(LocalStorageUtil.STORAGES_USERNAME, this.username);
    if (this.isKeepPw) {
      localStorage.setItem(LocalStorageUtil.STORAGES_PW, this.password);
    } else {
      localStorage.removeItem(LocalStorageUtil.STORAGES_PW);
    }
    this.loginIn(url, param);
  }

  /**
   * 登录
   */
  public async loginIn(url: string, param: any) {
    this.isLoading = true;
    this.loadingMsg = TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_LOADING);
    this.backData = await this.xmlHttp.post<LoginModel>(url, param);
    if (this.backData.code == XmlHttpClient.HTTP_SUCCESS_NET_CODE) {
      this.isLoading = false;
      const loginM: LoginModel = this.backData;
      let token = loginM.token + "";
      LocalStorageUtil.setCookie(LocalStorageUtil.STORAGES_TOKEN, token);
      this.onLoginSuccess();
    } else {
      this.isLoading = false;
      this.onLoginFaild(this.backData);
    }
  }

  /**
   * 登录成功
   * TODO... 此方法可以重写，处理登录成功后的ui逻辑
   */
  onLoginSuccess() {
    window.location.href = "user.html";
  }

  /**
   * 登录失败
   * TODO... 此方法可以重写，处理登录失败后的ui逻辑
   */
  onLoginFaild(data: any) {
    this.$message({
      message: data.msg,
      type: "error"
    });
  }
}

new Login({}).$mount("#login");
