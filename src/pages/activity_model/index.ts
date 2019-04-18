import './css/index.less';
import { Component, Vue } from 'vue-property-decorator';
import $ from 'jquery';
import { Dialog } from "element-ui";

@Component({
    components:{
        'el-dialog': Dialog
    }
})
class Index extends Vue {
    public bannerImgUrl: string = './activity_banner_2.png';//banner图地址
    public title: string = '';//活动标题
    public linkUrl: string = '';//banner图点击跳转地址
    public addBannerVisible: boolean = false;//banner配置弹窗
    public addBannerType: number = 0;//0 添加banner模块  1修改banner模块配置
    public addModelBoxVisible: boolean = false;//布局配置弹窗
    public addModelBoxType: number = 0;//0:12  1:8 4  2:6 6 3:4 8 4:4 4 4  
    public baseElement = null;
    public addModelVisible: boolean = false;
    public addModelType: number = 0;

    public addBannerShow(type: number = 0){
        this.baseElement = $('#model_box');
        this.addBannerVisible = true;
        this.addBannerType = type;
    }

    public addBannerClose(){
        this.addBannerVisible = false;
        this.bannerImgUrl = '';
        this.title = '';
        this.linkUrl = '';
    }

    public addModelBoxShow(){
        this.baseElement = $('#model_box');
        this.addModelBoxVisible = true;
    }

    public addModelBoxClose() {
        this.addModelBoxVisible = false;
        this.addModelBoxType = 0;
    }

    // public changeBannerImg(e){
    //     var self = this;
    //     let files = e.target.files || e.dataTransfer.files;
    //     if (!files.length) return;
    //     var file = files[0];
    //     // 确认选择的文件是图片
    //     if (file.type.indexOf("image") == 0) {
    //         var reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = function (e) {
    //             // 图片base64化
    //             const base64: any = this.result;
    //             self.bannerImgUrl = base64;
    //         };
    //     }
    // }

    public addBanner(){
        if(this.bannerImgUrl == '') return;
        var self = this;
        this.baseElement.append(`<div id="banner">
                        <span class="remove_icon">X</span>
                        <span class="reset_icon" id="reset_banner">操作</span>
                        <a href="${self.linkUrl == '' ? 'Javascript:;' : self.linkUrl}" target="_blank">
                        <img id="bannerImg" src="${self.bannerImgUrl}"  alt="">
                        <h3 id="bannerTitle" class="banner_title">${self.title}</h3>
                        </a>
                    </div>`);
        $('.remove_icon').on('click', this.removeElement)
        $('#reset_banner').on('click', this.resetBannerShow)
        this.bannerImgUrl = '';
        this.title = '';
        this.linkUrl = '';
        this.addBannerVisible = false;
    }

    public addModelBox(){
        switch (this.addModelBoxType*1) {
            case 0:
                this.baseElement.append(`
                    <div class="model">
                        <span class="remove_icon">X</span>
                        <div class="model_box_12">
                            <span class="reset_icon add_model">操作</span>
                        </div>
                    </div>
                `);
                break;
            case 1:
                this.baseElement.append(`
                    <div class="model">
                        <span class="remove_icon">X</span>
                        <div class="model_box_8">
                            <span class="reset_icon add_model">操作</span>
                        </div>
                        <div class="model_box_4">
                            <span class="reset_icon add_model">操作</span>
                        </div>
                    </div>
                `);
                break;
            case 2:
                this.baseElement.append(`
                    <div class="model">
                        <span class="remove_icon">X</span>
                        <div class="model_box_6">
                            <span class="reset_icon add_model">操作</span>
                        </div>
                        <div class="model_box_6">
                            <span class="reset_icon add_model">操作</span>
                        </div>
                    </div>
                `);
                console.log(1)
                break;
            case 3:
                this.baseElement.append(`
                    <div class="model">
                        <span class="remove_icon">X</span>
                        <div class="model_box_4">
                            <span class="reset_icon add_model">操作</span>
                        </div>
                        <div class="model_box_8">
                            <span class="reset_icon add_model">操作</span>
                        </div>
                    </div>
                `);
                break;
            case 4:
                this.baseElement.append(`
                    <div class="model">
                        <span class="remove_icon">X</span>
                        <div class="model_box_4">
                            <span class="reset_icon add_model">操作</span>
                        </div>
                        <div class="model_box_4">
                            <span class="reset_icon add_model">操作</span>
                        </div>
                        <div class="model_box_4">
                            <span class="reset_icon add_model">操作</span>
                        </div>
                    </div>
                `);
                break;
            default:
                break;
        }
        $('.remove_icon').on('click', this.removeElement);
        $('.add_model').on('click', this.addModelShow);
        this.addModelBoxVisible = false;
        this.addModelBoxType = 0;
    }

    public addModelShow(e){
        this.baseElement = e.target.parentNode;
        console.log(this.baseElement)
        this.addModelVisible = true;
    }

    public addModelClose(){
        this.addModelVisible = false;
    }

    public addModel(){
        switch (this.addModelType * 1) {
            case 0:
                this.addBanner();
                break;
            case 1:
                this.addModelBox();
                break;
            default:
                break;
        }
    }

    public removeElement(e){
        let model = e.target.parentNode;
        model.remove();
    }

    public resetBannerShow(){
        this.addBannerShow(1);
    }

    public resetBanner(){
        if(this.linkUrl != ''){
            $('#banner a').attr('href', this.linkUrl);
        }
        if (this.bannerImgUrl != ''){
            $('#banner #bannerImg').attr('src', this.bannerImgUrl);
        }
        if (this.title != ''){
            $('#banner #bannerTitle').html(this.title);
        }
        this.bannerImgUrl = '';
        this.title = '';
        this.linkUrl = '';
        this.addBannerVisible = false;
    }

    public saveHtml(){
        let html1 = $('#model_box').clone()
        html1.children().children('.remove_icon').remove();
        html1.children().children('.reset_icon').remove();
        console.log(html1[0].innerHTML)
    }
}

new Index().$mount("#app");