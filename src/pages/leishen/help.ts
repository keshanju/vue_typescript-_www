import '@/assets/less/leishen.less';
import 'babel-polyfill';
import 'swiper/dist/css/swiper.css';
import { Vue, Component } from 'vue-property-decorator';
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';
import DownloadBox from './components/DownloadBox.vue';
import VueI18n from 'vue-i18n';
import WebParamModel from '@/ts/models/WebModel';
import { LsLanguage } from './util/LsLanguage';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import NewsConfigModel, { NewsModel, NoticeDetailRequestModel, NoticeDetailModel } from '@/ts/models/NewsModel';
import GlobalConfig from './global.config';
import ConfigUtil from '@/ts/utils/ConfigUtil';
import HttpClient from '@/ts/net/HttpClient';
import { IdataModel } from '@/ts/models/IdataModel';
import Util from '@/ts/utils/Util';

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
		swiper,
        swiperSlide,
        'download-box': DownloadBox        
	}
})
class Help extends Vue {
	public tabIndex: number = 0; //帮助页tabindex
	public dialogVisible: boolean = false; //帮助弹窗是否显示
	public webParam = WebParamModel.getInstace(); // 浏览器参数
	public questionList = []; //问答列表
	public questionDetail: NoticeDetailModel = new NoticeDetailModel(); //相关问答详情
	public firstHelpId: number = 0; //帮助详情
	public secondHelpId: number = 0; //帮助详情
	public firstHelpDetail: NoticeDetailModel = new NoticeDetailModel(); //帮助详情
	public secondHelpDetail: NoticeDetailModel = new NoticeDetailModel(); //帮助详情
	public joinleftfix: Number = 0; //加入我们页面左侧固定 0 不固定  1固定
	public joinDatas = [
		{
			title: 'OpenWRT开发工程师',
			id: 'a1',
			link: 'b1'
		},
		{
			title: '运营总监',
			id: 'a2',
			link: 'b2'
		},
		{
			title: '新媒体运营',
			id: 'a3',
			link: 'b3'
		},
		{
			title: 'SEO主管',
			id: 'a4',
			link: 'b4'
		},
		{
			title: '官网客服',
			id: 'a5',
			link: 'b5'
		},
		{
			title: '网络推广',
			id: 'a6',
			link: 'b6'
		},
		{
			title: 'Web前端开发工程师',
			id: 'a7',
			link: 'b7'
		}
	];

	public created() {
		this.setBaseUrl(GlobalConfig.getBaseUrl());
		this.onGetQuestionList();
		this.onDownloadConfig();
	}

	public mounted() {
		window.onscroll = () => {
			this.pageScroll(770, this.joinDatas.length +1 );
		};
	}

	//////////公共参数
	public http = new HttpClient();
	public backData: IdataModel<any> | undefined;
	//////////END

	/**
     * 配置滑动的配置
     */
	public swiperOption = {
		effect: 'fade',
		noSwiping: true,
		fade: {
			crossFade: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
    };
    
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
     * 获取展示帮助id
     * @param url 
     */
	public async onDownloadConfig() {
		const jsonConfig = await ConfigUtil.getInstance().download();
		this.firstHelpId = jsonConfig.leigod.help.first_id;
		this.secondHelpId = jsonConfig.leigod.help.second_id;
		if (this.firstHelpId != 0) {
			this.firstHelpDetail = await this.onGetHelpDetail(this.firstHelpId);
		}
		if (this.secondHelpId != 0) {
			this.secondHelpDetail = await this.onGetHelpDetail(this.secondHelpId);
		}
	}

	/**
     * 设置根路径
     * @param url 
     */
	public setBaseUrl(url: string): void {
		this.http.setBaseUrl(url);
	}

	/**
     * 呼出客服页面的弹窗，并跳到与其对应的弹窗内容
     * @param n 跳到弹窗的位置
     */
	public openSlide(n) {
		this.swiper.slideTo(n, 1000, false);
		this.dialogVisible = true;
	}

	/**
     * 拿到myswiper 这个插件进行操作
     */
	get swiper() {
		return (this.$refs.mySwiper as any).swiper;
	}

	/**
     * 隐藏客服弹窗
     */
	public hideSlide() {
		this.dialogVisible = false;
	}

    /**
     * 切换tabindex
     */
	public changeTabIndex(index: number) {
        this.tabIndex = index;     
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
		if (this.questionList.length > 0) {
            this.onGetQuestionDetail(this.questionList[0].id);
		}
	}

	/**
     * 获取相关问答详情
     */
	public async onGetQuestionDetail(id: number) {
		const url = HttpClient.URL_NEWS_DETAIL + id;
		let param = new NoticeDetailRequestModel();
		param.id = id;
		param.class_type = 3;
		param.support_type = 1;
		this.backData = await this.http.get<NoticeDetailModel>(url, param);
		let detail: NoticeDetailModel = this.backData.data;
        this.questionDetail = detail;
	}

	/**
     * 获取帮助详情
     */
	public async onGetHelpDetail(id: number) {
		const url = HttpClient.URL_NEWS_DETAIL + id;
		let param = new NoticeDetailRequestModel();
		param.id = id;
		param.class_type = 1;
		param.support_type = 1;
		this.backData = await this.http.get<NoticeDetailModel>(url, param);
		let detail: NoticeDetailModel = this.backData.data;
		return detail;
	}

	/**
     * 实现右侧内容滚动 左侧随着高亮
     * @param h 小于这个高度 左侧成绝对定位  否则为固定定位
     * @param num 左侧列表内容数量+1
     */
	public pageScroll(h, num) {
		let scrT = Util.scroll().top;
		if (scrT < h) {
			this.joinleftfix = 0;
		} else {
			this.joinleftfix = 1;
		}
		for (let i = 1; i < num; i++) {
			if (document.getElementById('b' + i).offsetTop - 250 < scrT) {
				for (let j = 1; j < num; j++) {
					document.getElementById('a' + j).classList.remove('join_cur');
				}
				document.getElementById('a' + i).classList.add('join_cur');
			}
		}
	}
}

new Help({
	i18n
}).$mount('#app');
