<template>
    <div>
        <div class="reset_userinfo flex_row_center" style="align-items: flex-start">
            <div class="form_box flex_column_around" style="width:50%">
                <!--昵称-->
                <div class="form_item flex_row_start" style="margin-top:0;">
                    <span class="form_title">{{$t("user.b11")}}</span>
                    <div class="form_input_box">
                        <input v-model="nickname" class="form_input" maxlength="20" type="text" name=""
                               @change="onResetInfo">
                    </div>
                </div>
                <!--性别-->
                <div class="form_item flex_row_start">
                    <span class="form_title">{{$t("user.b12")}}</span>
                    <div class="form_input_box flex_row_start">
                        <input type="radio" id="man" v-model="sex" name="sex" value="1" @change="onResetInfo">
                        <label for="man">{{$t("user.b13")}}</label>
                        <input type="radio" id="woman" v-model="sex" name="sex" value="2" style="margin-left:0.2rem;"
                               @change="onResetInfo">
                        <label for="woman">{{$t("user.b14")}}</label>
                    </div>
                </div>
                <!--年龄-->
                <div class="form_item flex_row_start">
                    <span class="form_title">{{$t("user.b15")}}</span>
                    <div class="form_input_box">
                        <el-date-picker v-model="bornDate" type="date" :placeholder="$t('user.b76')"
                                        @change="onResetInfo" :picker-options="pickerOption"></el-date-picker>
                    </div>
                </div>
                <!--地址-->
                <div class="form_item flex_row_start">
                    <span class="form_title">{{$t("user.b16")}}</span>
                    <div class="form_input_box">
                        <input v-model="address" class="form_input" maxlength="25" type="text" name=""
                               @change="onResetInfo">
                    </div>
                </div>
            </div>
            <!--头像上传部分-->
            <div class="update_avtar flex_row_center">
                <div class="avtar_box">
                    <ul class="update_type_nav flex_row_center">
                        <li class="update_type_li_left" :class="{'update_type_li_active':updateTypeIndex == 0}"
                            @click="chooseUpdateType(0)">{{$t("user.b17")}}
                        </li>
                        <li class="update_type_li_right" :class="{'update_type_li_active':updateTypeIndex == 1}"
                            @click="chooseUpdateType(1)">{{$t("user.b18")}}
                        </li>
                    </ul>
                    <div class="update_type_upload" v-show="updateTypeIndex == 0" @mouseover="cameraShow = !cameraShow"
                         @mouseout="cameraShow = !cameraShow">
                        <vue-cropper style="width: 1.42rem;height: 1.42rem;" ref="cropper" v-if="option.img != ''"
                                     :img="option.img" :info="false" :fixedBox="!fixedBox" :high="true"
                                     :original="false"
                                     :autoCrop="true" :full="true" :fixed="true" :autoCropWidth="140"
                                     :autoCropHeight="140">
                        </vue-cropper>
                        <img v-show="option.img == ''" :src="userinfo.avatar"
                             onerror="javascript:this.src='./images/default_avatar.png'" class="img_filter"/>
                        <div v-show="cameraShow && !userChoose"
                             style="position:absolute;left:0;top:0;right:0;bottom:0;cursor:pointer;">
                            <img src="../images/huantouxiang@2x.png" alt="" class="img_filter">
                            <input class="update_input" @change="onChooseImage" ref="imageUpInput" id="imageUpBtn"
                                   type="file" accept="image/*">
                        </div>
                    </div>
                    <ul class="update_type_preview flex_row_start" v-show="updateTypeIndex == 1"
                        style="flex-wrap: wrap;align-items: flex-start;align-content: start;">
                        <li class="preview_img" v-for="(item,index) in imgUrlList" :key="index">
                            <img :src="item" class="img_filter" style="border-radius: 50%;"
                                 @click="chooseImage(item)">
                        </li>
                    </ul>
                </div>
                <!--图像预览部分-->
                <div class="avtar_preview">
                    <div class="avtar_preview_img">
                        <img :src="previewImg" onerror="javascript:this.src='./images/default_avatar.png'" alt=""
                             class="img_filter" style="height:100%">
                    </div>
                    <p class="preview_msg">{{$t("user.b19")}}</p>
                    <div class="upload_btn" v-show="userChoose && updateTypeIndex == 0">
                        {{$t("user.b20")}}
                        <input class="update_input" @change="onChooseImage" ref="imageUpInput" id="imageUpBtn"
                               type="file" accept="image/*">
                    </div>
                    <div class="scale_btn" v-show="userChoose && updateTypeIndex == 0">
                        <span class="suoxiao_icon" style="margin-right:0.05rem;" @click="scaleSmall"></span>
                        <span class="fangda_icon" @click="scaleBig"></span>
                    </div>
                </div>
            </div>
        </div>
        <!--保存和取消按钮-->
        <div class="btn_control">
            <a class="public_btn" style="margin-right: 0.2rem;" @click="saveImage">{{$t("public.share14")}}</a>
            <a class="white_btn" @click="closeService">{{$t("public.share13")}}</a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import {DatePicker} from 'element-ui';
    import {UpdateInfos, UserInfo} from '@/ts/models/UserModel';
    import {VueCropper} from "vue-cropper";
    import Util from '@/ts/utils/Util';
    import "babel-polyfill";
    import AppParamModel from '@/ts/models/AppModel';
    import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';
    import GlobalConfig from '@/pages/leishen_pc/global.config';
    import ConfigUtil from '@/ts/utils/ConfigUtil';
    import {IProxy} from '@/ts/interface/IProxy';
    import {TipsMsgUtil} from '@/ts/utils/TipsMsgUtil';
    import {ExtrnalFactory} from '@/ts/factory/ExtrnalFactory';

    @Component({
        watch: {
            userinfocount: {
                handler(newVal, oldVal) {
                    this.init();
                },
                immediate: false,
                deep: true
            }
        },
        components: {
            'el-date-picker': DatePicker,
            "vue-cropper": VueCropper
        }
    })
    export default class ResetUserinfo extends Vue implements IProxy {
        @Prop() public userinfo!: UserInfo;
        @Prop() public userinfocount!: number;

        public appParam: AppParamModel = AppParamModel.getInstace();
        public nickname: string = '';//昵称
        public bornDate: string = '';//出生年月日
        public sex: number = 0;//性别 0保密 1小哥哥 2小姐姐
        public address: string = '';//地址
        public avatar_str: string = '';//头像文件base64
        public updateTypeIndex: number = 0;//0上传图片 1选择推荐图片
        public previewImg: string = '';//预览图片
        public imageHeadUrl = GlobalConfig.getImgBaseUrl();
        public imgUrlList: object = [];
        public isResetInfo: boolean = false;//是否修改了用户信息
        public cameraShow: boolean = false;
        public userChoose: boolean = false;//是否用户自己上传的图片
        public fixedBox: boolean = false;//裁剪框是否可以调整

        public option = {
            img: '',
            outputType: "png"
        };

        public pickerOption = {
            disabledDate(time) {
                return time.getTime() > Date.now();
            }
        }

        public created() {
            this.getDownloadUrl();
        }

        public init() {
            this.nickname = this.userinfo.nickname;
            if (this.userinfo.birthday != '') {
                this.bornDate = this.userinfo.birthday;
            }else {
                this.bornDate = null;
            }
            this.address = this.userinfo.address;
            this.previewImg = this.userinfo.avatar;
            if (this.userinfo.sex == 'Male' || this.userinfo.sex == '帅哥') {
                this.sex = 1;
            } else if (this.userinfo.sex == 'Female' || this.userinfo.sex == '美女') {
                this.sex = 2;
            }
            ;
        }

        public execute() {

        };

        public setBaseUrl() {

        }

        /**
         * 获取推荐头像列表
         * @param url
         */
        public async getDownloadUrl() {
            const jsonConfig = await ConfigUtil.getInstance().download();
            this.imgUrlList = jsonConfig.leigod.head_default_img_url;
        }

        /**
         * 选择头像方式
         */
        public chooseUpdateType(index: number) {
            this.updateTypeIndex = index;
        }

        /**
         * 选择推荐头像
         */
        public chooseImage(item) {
            this.option.img = item;
            this.previewImg = item;
            this.chooseUpdateType(0);
            this.userChoose = false;
            this.fixedBox = false;
        }

        /**
         * 修改用户信息触发
         */
        public onResetInfo() {
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
                this.$message({
                    message: "图片大小限制500k(Image size limit 500k)!",
                    type: "warning",
                    center: true
                });
                return;
            }
            // 确认选择的文件是图片
            if (file.type.indexOf("image") == 0) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    // 图片base64化
                    let base64: any = this.result;
                    self.previewImg = base64;
                    self.option.img = base64;
                    self.userChoose = true;
                    self.fixedBox = true;
                };
            }
            e.target.value = '';
            const factory = ExtrnalFactory.getInstance().getFactory(this.appParam.platform);
            factory.MainBringToFront();
        }

        /**
         * 保存头像
         */
        saveImage() {
            if (this.option.img == '') {
                if (this.isResetInfo) {
                    this.resetUserinfo();
                }
                return;
            }
            // 获取截图的base64 数据
            const self = this;
            let scale = (this.$refs.cropper as any).scale;
            console.log(scale)
            if(scale <= 0.03){
                this.$message({
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_IMGSCALE_SMALL),
                    type: 'warning'
                });
                return;
            }
            (this.$refs.cropper as any).getCropData((data) => {
                self.avatar_str = data;
                self.resetUserinfo();
            });
        }

        /**
         * 修改用户信息
         */
        public resetUserinfo() {
            if (!this.option.img) {
                this.avatar_str = '';
            }
            ;
            let param = new UpdateInfos();
            if(this.nickname.length > 0){
                param.nickname = this.nickname;
            }else if (this.nickname == '' && this.nickname != this.userinfo.nickname){
                this.$message({
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_NICKNAME_SETEMPTY),
                    type: 'warning'
                });
                return;
            }
            if(this.address.length > 0){
                param.address = this.address;
            }else if (this.address == '' && this.address != this.userinfo.address){
                this.$message({
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_ADDRESS_SETEMPTY),
                    type: 'warning'
                });
                return;
            }
            param.sex = this.sex;
            if (this.bornDate != null) {
                let date = new Date(this.bornDate);
                let time = date.getTime();
                param.birthday = (Util.formatDateTime(time)).substring(0, 10);
            }else if (this.bornDate == null && this.userinfo.birthday != null){
                this.$message({
                    message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_BIRTHDAY_SETEMPTY),
                    type: 'warning'
                });
                return;
            }
            param.user_url = this.avatar_str;
            this.$emit('on-upload-userinfo', param);
        }

        /**
         * 修改用户信息成功
         */
        public resetInfoSuccess() {
            this.isResetInfo = false;
            this.$message({
                message: TipsMsgUtil.getTipsMsg(TipsMsgUtil.KEY_NOTIF_RESETNICKNAME_SUCCESS),
                type: 'success'
            })
        }

        /**
         * 缩小图片
         */
        public scaleSmall() {
            (this.$refs.cropper as any).changeScale(-1)
        }

        /**
         * 放大图片
         */
        public scaleBig() {
            (this.$refs.cropper as any).changeScale(1)
        }

        /**
         * 关闭下拉框
         */
        public closeService() {
            this.$emit('closeservice');
        }

    }
</script>

