import Component from "vue-class-component";
import {IProxy} from "@/ts/interface/IProxy";
import HttpClient from "@/ts/net/HttpClient";
import {IdataModel} from "@/ts/models/IdataModel";
import {Vue} from "vue-property-decorator";
import {ForeignLoginRequestModel} from "@/ts/models/OauthModel";
import $ from 'jquery';
import ProjectConfig from "../../../project.config";
import TwitterUtil from "@/ts/utils/TwitterUtil";

@Component
export default class OauthProxy extends Vue implements IProxy {

    public facebookIsInit: boolean = false; //facebook是否初始化完成
    public googleIsInit: boolean = false; //google是否初始化完成
    public googleAuth2;
    public twitterUtil: TwitterUtil = null;
    //////////公共参数
    public http = new HttpClient();
    public backData: IdataModel<any> | undefined;
    public isLoading: boolean = false;

    execute(): void {
    }

    setBaseUrl(url: string): void {
        this.http.setBaseUrl(url);
    }

    init(): void {
    }

    /*****************************facebook login*****************************/
    /**
     * 初始化facebook sdk
     */
    public initFaceBookSdk(appId: string) {
        ProjectConfig.log('facebook初始化...');
        const self = this;
        $(document).ready(function() {
            $.ajaxSetup({ cache: true });
            $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
                // @ts-ignore
                FB.init({
                    appId: appId,
                    version: 'v3.2'
                });
                ProjectConfig.log('facebook初始化完成!');
                self.facebookIsInit = true;
                self.sdkInitSuccess(ForeignLoginRequestModel.OPEN_TYPE_FACEBOOK);
            });
        });
    }

    /**
     * 打开facebook登录
     */
    public onOpenFacebook() {
        if(!this.facebookIsInit) return;
        const self = this;
        // @ts-ignore
        FB.login(function(response) {
            if(response.authResponse) {
                ProjectConfig.log('face登录成功!',response);
                self.loginSuccess(response.authResponse.userID, ForeignLoginRequestModel.OPEN_TYPE_FACEBOOK);
            }else {
                alert('login error!');
            }
        });
    }

    /*****************************facebook end*****************************/

    /*****************************twitter login*****************************/
    public initTwitterSdk(appId:string,appSecret: string) {
        if(this.twitterUtil == null) this.twitterUtil = new TwitterUtil();
        this.twitterUtil.init(appId,appSecret);

        // var xhr = new XMLHttpRequest();
        // const url = 'https://api.twitter.com/oauth/request_token';
        // const a3 = {
        //     'oauth_callback': 'https://www.bohe.com',
        //     'oauth_consumer_key': 'Y0PQupczDeUEm68pFo1zdjpmj',
        //     'oauth_nonce': 'ea9ec8429b68d6b77cd5600adbbb0456',
        //     'oauth_signature_method': 'HMAC-SHA1',
        //     'oauth_timestamp': '1542356905',
        //     'oauth_version': '1.0',
        //     'oauth_signature': 'XzRjdpvexToiDVD230lbdr7Yy7c%253D'
        // };
        // xhr.onreadystatechange = function () {
        //     console.log(this.response);
        // };
        // xhr.open("POST", url, true);
        // xhr.send();
    }
    /*****************************twitter end*******************************/

    /*****************************google login*****************************/
    public initGoogleSdk(appId:string) {
        ProjectConfig.log('google sdk初始化...');
        const self = this;
        $(document).ready(function() {
            $.ajaxSetup({ cache: true });
            $.getScript('https://apis.google.com/js/api:client.js', function(){
                // @ts-ignore
                gapi.load('auth2',
                    function(){
                        // Retrieve the singleton for the GoogleAuth library and set up the client.
                        // @ts-ignore
                        self.googleAuth2 = gapi.auth2.init({
                            client_id: appId, //客户端ID
                            cookiepolicy: 'single_host_origin',
                            scope: 'profile' //可以请求除了默认的'profile' and 'email'之外的数据
                        });
                        self.onOpenGoogle(document.getElementById('googleBtn'));
                        ProjectConfig.log('google初始化完成!');
                        self.googleIsInit = true;
                        self.sdkInitSuccess(ForeignLoginRequestModel.OPEN_TYPE_GOOGLE);
                    })
            })
        });
    }

    /**
     * 初始化成功
     * TODO... 重写此方法
     */
    public sdkInitSuccess(type: number) {
    }

    /**
     * 打开google登录
     * @param appId
     */
    public onOpenGoogle(element) {
        const self = this;
        this.googleAuth2.attachClickHandler(element, {},
            function(googleUser) {
                var profile = self.googleAuth2.currentUser.get().getBasicProfile();
                ProjectConfig.log('google登录成功!',profile);
                self.loginSuccess(profile.getId(),ForeignLoginRequestModel.OPEN_TYPE_GOOGLE);
            }, function(error) {
                console.log(error);
            });
    }
    /*****************************google end*****************************/

    /**
     * 登录成功
     * TODO...重写此方法
     */
    public loginSuccess(userId: string,type: number) {
    }

    /**
     * 请求授权登录
     */
    public async autoForeignlogin(url: string, param: ForeignLoginRequestModel) {
        let jumpUrl = url;
        jumpUrl += '?open_id=' + param.open_id;
        jumpUrl += '&state=' + param.state;
        jumpUrl += '&open_type=' + param.open_type;
        window.location.href = jumpUrl;
    }
}