import '@/assets/less/leishen.less';
import 'babel-polyfill';
import {Component, Vue} from 'vue-property-decorator';
import $ from "jquery";
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import {LsLanguage} from './util/LsLanguage';
import GlobalConfig from './global.config';
import Util from '@/ts/utils/Util';
import LocalStorageUtil from "@/ts/utils/LocalStorageUtil";
import {Dialog} from "element-ui";
import ActivityProxy from "@/ts/proxy/ActivityProxy";
import JumpWebUtil from "@/ts/utils/JumpWebUtil";
import {IdataModel} from "@/ts/models/IdataModel";

Vue.config.productionTip = false;

//判断是否跳转移动站点
const mUrl = GlobalConfig.getMobWebBaseUrl() + '/' + 'shuangdan.html';
JumpWebUtil.checkMobile(mUrl);

//语言包
Vue.use(VueI18n);
const webParam = WebParamModel.getInstace(Util.REGION_CODE_1, Util.ZH_CN);
let lang = LsLanguage.getInstance();
lang.init();
const i18n = new VueI18n(lang);

@Component({
    components: {
        'head-nav': HeadNav,
        'foot-nav': FootNav,
        'el-dialog': Dialog
    }
})
class ShuangDan extends ActivityProxy {

    // http://localhost:8080/shuangdan.html?id=36&region_code=1&language=zh_CN&account_token=VxHnkvLQZFN1PVvXHgBzuZFZksgKZ0Bk5WcJYox657pvSKgzcgTgUgdb0R3wdL90
    public activity_id = 36;
    public webParam = WebParamModel.getInstace(); // 浏览器参数
    public joinleftfix: Number = 0; //加入我们页面左侧固定 0 不固定  1固定
    //
    public dialog_award: boolean = false;// 中奖纪录
    public dialog_guize: boolean =false;//  默认规则弹框
    public dialog_no_login = false; //未登录弹框
    public dialog_recharge = false; //提示充值
    public dialog_copy_ref_link = false; //复制剪切板
    public dialog_error = false; //错误提示
    public dialog_win = false; //中奖提醒
    //
    public sina_link = 'https://weibo.com/p/1006066443936086/manage?from=page_100606&mod=TAB#place'; //新浪微博
    //
    public dialog_msg: string = ''; // 服务端的msg

    /**
     *
     */
    public mounted() {
        window.onscroll = () => {
            this.pageScroll(930);
        };
        this.snowDown();
        this.getAwardList();
    }

    /**
     *
     */
    public created() {
        this.imageHeadUrl = GlobalConfig.getImgBaseUrl();
        this.account_token = LocalStorageUtil.getUserToken().account_token;
        this.setBaseUrl(GlobalConfig.getBaseUrl());
        this.getActivityId();
        this.getActivityDetail();
        this.getReferActivitys();
    }

    /**
     * 点击查看中奖纪录
     */
    public onClickAward() {
        if (this.account_token == '') {
            //提示登录
            this.dialog_no_login = true;
            return;
        }
        this.dialog_award = true;
        this.getActiveRecordList(1,4);
    }

    /**
     * 点击查看活动详情
     */
    public onClickGuize() {
        this.dialog_guize = true;
    }

    /**
     * 点击抽奖
     */
    public onClickDraw() {
        if(this.isBengin) return;
        if (this.account_token == '') {
            //提示登录
            this.dialog_no_login = true;
            return;
        }
        if (this.aCount <= 0) {
            //提示次数不足
            this.dialog_recharge = true;
            return;
        }
        this.isBengin = true;
        this.onDraw(0,1000);
    }

    /**
     * 中奖
     */
    public onDrawWin(backData: IdataModel<any>) {
        //播放奖品动画
        this.isWin = true;
        //计算次数
        this.points = backData.data.points;
        this.getActivityCount();
        //弹出提示
        const that = this;
        setTimeout(function () {
            that.dialog_win = true;
            that.dialog_msg = backData.data.title;
        }, 2000);
    }

    /**
     * 未中奖
     */
    public onDrawLose(backData: IdataModel<any>) {
        this.isBengin = false;
        this.isWin = false;
        //提示
        this.dialog_error = true;
        this.dialog_msg = backData.msg;
        //计算次数
        this.points = backData.data.points;
        this.getActivityCount();
    }

    /**
     * 继续抽奖
     */
    public continueDraw() {
        this.isBengin = false;
        this.isWin = false;
        this.dialog_win = false;
        this.dialog_msg = '';
    }

    /**
     * 登录
     */
    public gotoLogin() {
        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(),JumpWebUtil.HTML_NAME_LOGIN);
    }

    /**
     * 充值
     */
    public gotoRecharge() {
        JumpWebUtil.webGotoUser(GlobalConfig.getUserBaseUrl(),JumpWebUtil.HTML_NAME_USER,'page=1');
    }

    /**
     * 生成链接
     */
    public generateRefercodeLink(refer_code: string) {
        this.refer_code = GlobalConfig.getUserBaseUrl() + '/' +JumpWebUtil.HTML_NAME_REGISTER + '?refer_code=' + refer_code;
    }

    /**
     * 复制链接
     */
    public copyRefercodeLink() {
        if (this.account_token == '') {
            //提示登录
            this.dialog_no_login = true;
            return;
        }
        if(this.refer_code == '' || this.refer_code == null) {
            this.dialog_error = true;
            this.dialog_msg = '活动可能还未开始，请稍后复制！';
            return;
        }
        Util.copyToClipboard(this.refer_code);
        this.dialog_copy_ref_link = true;
    }

    /**
     * 关闭dialog
     */
    public closeDialog() {
        this.dialog_msg = '';
        this.dialog_error = false;
        this.dialog_copy_ref_link = false;
    }

    /**
     * token过期
     * @param param
     */
    public tokenExpired(param: string = null): void {
        LocalStorageUtil.loginOut();
        this.account_token = '';
    }

    /**
     * 切换语言
     */
    public onChangeLanguage(ln: string) {
        lang.changeLanguage(ln);
        i18n.locale = lang.locale;
        this.webParam.language = ln;
    }

    /**
     * 获取中奖列表成功
     */
    public getAwardListSuccess() {
        this.initAwardList();
    }

    /**
     * 初始化中奖列表名单
     */
    public initAwardList() {
        if(this.awardList.length <= 14) return;
        $(function () {
            setInterval(function () {
                var $ul = $("#jilu_box ul");
                $ul.animate({
                    marginTop: "-18px"
                }, 400, function () {
                    $ul.find("li").eq(0).appendTo($ul)
                    $ul.css("margin-top", "0")
                })
            }, 2000);
        });
    }

    /**
     * 实现右侧内容滚动 左侧随着高亮
     * @param h 小于这个高度 左侧成绝对定位  否则为固定定位
     * @param num 左侧列表内容数量+1
     */
    public pageScroll(h) {
        let scrT = Util.scroll().top;
        if (scrT < h) {
            this.joinleftfix = 0;
        } else {
            this.joinleftfix = 1;
        }
    }

    /**
     * canvas雪花动效
     */
    public snowDown() {
        //canvas init
        var canvas = document.getElementById("canvas");
        // @ts-ignore
        var ctx = canvas.getContext("2d");

        //canvas dimensions
        var W = window.innerWidth;
        var H = window.innerHeight;
        // @ts-ignore
        canvas.width = W;
        // @ts-ignore
        canvas.height = H;

        //snowflake particles
        var mp = 100; //max particles
        var particles = [];
        for (var i = 0; i < mp; i++) {
            particles.push({
                x: Math.random() * W, //x-coordinate
                y: Math.random() * H, //y-coordinate
                r: Math.random() * 5 + 1, //radius 雪花半径大小
                d: Math.random() * mp //density
            })
        }

        //Lets draw the flakes
        function draw() {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            for (var i = 0; i < mp; i++) {
                var p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            }
            ctx.fill();
            update();
        }

        //Function to move the snowflakes
        //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
        var angle = 0;

        function update() {
            angle += 0.01;
            for (var i = 0; i < mp; i++) {
                var p = particles[i];
                //Updating X and Y coordinates
                //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
                //Every particle has its own density which can be used to make the downward movement different for each flake
                //Lets make it more random by adding in the radius
                p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
                p.x += Math.sin(angle) * 2;

                //Sending flakes back from the top when it exits
                //Lets make it a bit more organic and let flakes enter from the left and right also.
                if (p.x > W + 5 || p.x < -5 || p.y > H) {
                    if (i % 3 > 0) //66.67% of the flakes
                    {
                        particles[i] = {
                            x: Math.random() * W,
                            y: -10,
                            r: p.r,
                            d: p.d
                        };
                    } else {
                        //If the flake is exitting from the right
                        if (Math.sin(angle) > 0) {
                            //Enter from the left
                            particles[i] = {
                                x: -5,
                                y: Math.random() * H,
                                r: p.r,
                                d: p.d
                            };
                        } else {
                            //Enter from the right
                            particles[i] = {
                                x: W + 5,
                                y: Math.random() * H,
                                r: p.r,
                                d: p.d
                            };
                        }
                    }
                }
            }
        }
        //animation loop
        setInterval(draw, 20);
    }
}

new ShuangDan({i18n}).$mount('#app')