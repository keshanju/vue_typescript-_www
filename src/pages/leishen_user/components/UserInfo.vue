<template>
    <div class="components_cell pos_safty_box" style="height: 651px;" v-loading="isLoading">
        <p class="web_safty_font" style="width: 90%;margin: 0 auto;">{{$t("user.b66")}}</p>
        <div class="flex_column_center" style="width: 90%;margin: 0 auto;">
            <div class="web_userinfo_box">
                <div class="form_box flex_column_around" style="margin-right: 80px;">
                    <div class="web_form_item">
                        <span class="web_form_title">{{$t("user.b11")}}</span>
                        <div class="web_form_iptbox">
                            <input v-model="nickname" @change="onResetInfo" maxlength="20" class="web_form_iptcell" type="text" name="">
                        </div>
                    </div>
                    <div class="web_form_item">
                        <span class="web_form_title">{{$t("user.b12")}}</span>
                        <div class="web_form_iptbox flex_row_start">
                            <input type="radio" id="man" v-model="sex" name="sex" value="1" @change="onResetInfo">
                            <label for="man">{{$t("user.b13")}}</label>
                            <input type="radio" id="woman" v-model="sex" name="sex" value="2" style="margin-left:20px;" @change="onResetInfo">
                            <label for="woman">{{$t("user.b14")}}</label>
                        </div>
                    </div>
                    <div class="web_form_item">
                        <span class="web_form_title">{{$t("user.b15")}}</span>
                        <div class="web_form_iptbox">
                            <el-date-picker style="width: 100%;" v-model="bornDate" type="date" :value="$t('user.b76')" value-format="yyyy-MM-dd" @change="onResetInfo" :picker-options="pickerOption"></el-date-picker>
                        </div>
                    </div>
                    <div class="web_form_item">
                        <span class="web_form_title">{{$t("user.b16")}}</span>
                        <div class="web_form_iptbox">
                            <input v-model="address" @change="onResetInfo" maxlength="25" class="web_form_iptcell" type="text" name="">
                        </div>
                    </div>
                </div>
                <div class="flex_row_center">
                    <div class="web_avtar_box">
                        <ul class="update_type_nav flex_row_center">
                            <li class="update_type_li_left type_li_font" :class="{'web_type_li_active':updateTypeIndex == 0}"
                                @click="chooseUpdateType(0)">{{$t("user.b77")}}
                            </li>
                            <li class="update_type_li_right type_li_font" :class="{'web_type_li_active':updateTypeIndex == 1}"
                                @click="chooseUpdateType(1)">{{$t("user.b78")}}
                            </li>
                        </ul>
                        <div class="web_type_upload_box" v-show="updateTypeIndex == 0" @mouseover="cameraShow = !cameraShow"
                             style="width: 197px;height: 197px;" @mouseout="cameraShow = !cameraShow">
                            <!--<vue-cropper style="width: 197px;height: 197px;" ref="cropper" v-if="option.img != null"-->
                                         <!--:img="option.img" :info="false" :fixedBox="!fixedBox" :high="true" :original="false"-->
                                         <!--:autoCrop="true" :full="true" :fixed="true" :autoCropWidth="148" :autoCropHeight="148">-->
                            <!--</vue-cropper>-->
                            <img id="image" :src="url" alt="Picture">
                            <!--<img v-if="option.img == null" :src="userinfo.avatar_new" onerror="javascript:this.src='./images/default_avatar.png'" class="img_filter"/>-->
                            <div  v-show="cameraShow && !userChoose" style="position:absolute;left:0;top:0;right:0;bottom:0;cursor:pointer;">
                                <img src="../images/huantouxiang@2x.png" alt="" class="img_filter">
                                <input class="update_input" @change="onChooseImage" ref="imageUpInput"
                                       type="file" accept="image/*">
                            </div>
                        </div>
                        <ul class="web_update_type_box" v-show="updateTypeIndex == 1">
                            <li class="web_preview_img cursor" v-for="(item,index) in imgUrlList" :key="index">
                                <img :src="item" class="img_filter" style="border-radius: 50%;" @click="chooseImage(item)">
                            </li>
                        </ul>
                    </div>
                    <div class="web_avtar_preview">
                        <div class="avtar_preview_img">
                            <img :src="previewImg" onerror="javascript:this.src='./images/default_avatar.png'" class="img_filter">
                        </div>
                        <p class="preview_msg type_li_font">{{$t("user.b19")}}</p>
                        <div class="web_upload_btn cursor" v-show="userChoose && updateTypeIndex == 0">
                            {{$t("user.b20")}}
                            <input class="update_input" @change="onChooseImage" ref="imageUpInput"
                                   type="file" accept="image/*">
                        </div>
                        <!--隐藏放大缩小-->
                        <!--<div class="scale_btn" v-show="userChoose && updateTypeIndex == 0">-->
                            <!--<span class="suoxiao_icon" style="margin-right:5px;" @click="scaleSmall"></span>-->
                            <!--<span class="fangda_icon" @click="scaleBig"></span>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
            <div class="btn_control">
                <a class="public_btn" style="margin-top: 80px;padding: 10px 40px;" @click="saveImage">{{$t("public.share14")}}</a>
                <!-- <a class="white_btn" @click="closeService">取消</a> -->
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import {DatePicker, Loading} from 'element-ui';
    import {UpdateInfos, UserInfo} from '@/ts/models/UserModel';
    import Util from '@/ts/utils/Util';
    import AppParamModel from '@/ts/models/AppModel';
    import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
    import GlobalConfig from '@/pages/leishen_pc/global.config';
    import ConfigUtil from '@/ts/utils/ConfigUtil';
    import { TipsMsgUtil } from '@/ts/utils/TipsMsgUtil';
    import Cropper from 'cropperjs'
    import '@/assets/css/cropper.min.css'

    @Component({
        components: {
            'el-date-picker': DatePicker
        }
    })
    export default class ResetUserinfo extends Vue {
        @Prop() public userinfo!: UserInfo;

        public appParam: AppParamModel = AppParamModel.getInstace()
        public nickname: string = '';//昵称
        public bornDate: string = null;//出生年月日
        public sex: number = 0;//性别 0保密 1帅哥 2美女
        public address: string = '';//地址
        public avatar_str: string = '';//头像文件base64
        public updateTypeIndex: number = 0;//0上传图片 1选择推荐图片
        public previewImg: string = '';//预览图片
        public imageHeadUrl = GlobalConfig.getImgBaseUrl();
        public imgUrlList: object = [];
        public isLoading: boolean = false;//loading显示
        public isResetInfo: boolean = false;//是否修改了用户信息
        public cameraShow:boolean = false;
        public userChoose: boolean = false;//是否用户自己上传的图片
        public fixedBox: boolean = false;//裁剪框是否可以调整
        public cropper: any;
        public url: string = '/images/default_avatar.png';
        public is_resetavatar = false;//是否更换了头像
        public is_init: boolean = false;

        public created(){
            this.getPreviewImg();
            this.cropperImg(this.url)
        }

        public pickerOption = {
            disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }

        public init() {
            if(this.is_init) return;
            this.nickname = this.userinfo.nickname;
            if (this.userinfo.birthday != '' && this.userinfo.birthday != '1970-01-01') {
                this.bornDate = this.userinfo.birthday;
            }
            this.address = this.userinfo.address;
            if(this.userinfo.avatar_new != ''){
                this.cropper.replace(this.userinfo.avatar_new);
                this.previewImg = this.userinfo.avatar_new;
            }
            if (this.userinfo.sex == 'Male' || this.userinfo.sex == '帅哥') {
                this.sex = 1;
            } else if (this.userinfo.sex == 'Female' || this.userinfo.sex == '美女') {
                this.sex = 2;
            }
            this.is_init = true;
        }

        // 将默认头像放到裁剪区域
        cropperImg(imgUrl) {
            //初始化这个裁剪框
            var self = this;
            this.url = imgUrl;
            this.$nextTick(() => {
                const image = document.getElementById('image');
                var minAspectRatio = 0.5;
                var maxAspectRatio = 1.5;
                //@ts-ignore
                this.cropper = new Cropper(image, {
                    checkCrossOrigin: false,
                    minContainerWidth: 197,
                    minContainerHeight: 197,
                    ready: function () {
                        var cropper = this.cropper;
                        var containerData = cropper.getContainerData();
                        var cropBoxData = cropper.getCropBoxData();
                        cropBoxData.width = containerData.width;
                        cropBoxData.height = containerData.height;
                        var newCropBoxWidth = cropBoxData.width * ((minAspectRatio + maxAspectRatio) / 2);
                        var newCropBoxHeight = cropBoxData.height * ((minAspectRatio + maxAspectRatio) / 2);

                        cropper.setCropBoxData({
                            left: 0,
                            top: 0,
                            width: newCropBoxWidth,
                            height:newCropBoxHeight
                        });
                    },
                    cropmove: function () {
                        var cropper = this.cropper;
                        var cropBoxData = cropper.getCropBoxData();
                        var aspectRatio = cropBoxData.width / cropBoxData.height;

                        if (aspectRatio < minAspectRatio) {
                            cropper.setCropBoxData({
                                width: cropBoxData.height * minAspectRatio
                            });
                        } else if (aspectRatio > maxAspectRatio) {
                            cropper.setCropBoxData({
                                width: cropBoxData.height * maxAspectRatio
                            });
                        }
                        self.isResetInfo = true;
                    },
                });
            });
        }

        /**
         * 选择头像方式
         */
        public chooseUpdateType(index: number) {
            this.updateTypeIndex = index;
        }

        /**
         * 获取推荐头像列表
         * @param url
         */
        public async getPreviewImg() {
            const jsonConfig = await ConfigUtil.getInstance().download();
            this.imgUrlList = jsonConfig.leigod.head_default_img_url;
        }

        /**
         * 选择推荐头像
         */
        public chooseImage(item){
            this.chooseUpdateType(0);
            this.cropper.replace(item);
            this.previewImg = item;
            this.is_resetavatar = true;
            this.userChoose = false;
            this.fixedBox = false;
            this.isResetInfo = true;
        }

        /**
         * 修改用户信息触发
         */
        public onResetInfo(){
            this.isResetInfo = true;
        }

        /**
         * 选择图片
         * @param e
         */
        onChooseImage(e: any) {
            var self = this;
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            var file = files[0];
            // 限制500k大小
            if (file.size > 500 * 1024) {
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: "图片大小限制500k(Image size limit 500k)!",
                    type: "warning"
                });
                return;
            }
            // 确认选择的文件是图片
            if (file.type.indexOf("image") == 0) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    // 图片base64化
                    const base64: any = this.result;
                    self.cropper.replace(base64);
                    self.isResetInfo = true;
                    self.is_resetavatar = true;
                    self.previewImg = base64;
                    self.userChoose = true;
                    self.fixedBox = true;
                };
            };
            e.target.value = '';
        }

        /**
         * 保存头像
         */
        saveImage() {
            if(this.isResetInfo){
                this.resetUserinfo();
            }
        }

        /**
         * 修改用户信息
         */
        public resetUserinfo() {
            let param = new UpdateInfos();
            if(this.nickname.length > 0){
                param.nickname = this.nickname;
            }else if (this.nickname == '' && this.nickname != this.userinfo.nickname){
                this.$notify({
                    title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_NICKNAME_SETEMPTY),
                    type: 'warning'
                });
                return;
            }
            // if(this.address.length > 0){
                param.address = this.address;
            // }else if (this.address == '' && this.address != this.userinfo.address){
            //     this.$notify({
            //         title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
            //         message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ADDRESS_SETEMPTY),
            //         type: 'warning'
            //     });
            //     return;
            // }
            param.sex = this.sex;
            if (this.bornDate != null) {
                let date = new Date(this.bornDate);
                let time = date.getTime();
                param.birthday = (Util.formatDateTime(time)).substring(0, 10);
            }else {
                param.birthday = '1970-01-01';
            }
            // if (this.bornDate == null && this.userinfo.birthday != '' && this.userinfo.birthday != null){
            //     this.$notify({
            //         title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ERROR_TITLE),
            //         message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BIRTHDAY_SETEMPTY),
            //         type: 'warning'
            //     });
            //     return;
            // };
            if(this.is_resetavatar) {
                this.avatar_str = this.cropper.getCroppedCanvas().toDataURL().toString();
            }
            param.user_url = this.avatar_str;
            this.$emit('on-upload-userinfo', param)
            this.isLoading = true;
        }

        /**
         * 修改用户信息成功
         */
        public resetInfoSuccess() {
            this.isLoading = false;
            this.isResetInfo = false;
            this.userChoose = false;
            this.$notify({
                title: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_SUCCESS_TITLE),
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_RESETNICKNAME_SUCCESS),
                type: 'success'
            });
        }

        /**
         * 关闭下拉框
         */
        public closeService() {
            this.$emit('closeservice');
        }

    }
</script>

