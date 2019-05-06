<template>
    <div class="news-share">
        <img src="../images/share/wx.png" class="news-share__img" title="微信" :style="{width:size}" @click="shareToWx"/>
        <img src="../images/share/qq.png" class="news-share__img" title="QQ好友" :style="{width:size}" @click="shareToqq"/>
        <img src="../images/share/xl.png" class="news-share__img" title="新浪微博" :style="{width:size}" @click="shareToSinaWB"/>
        <img src="../images/share/tb.png" class="news-share__img" title="百度贴吧" :style="{width:size}" @click="shareToTieba"/>
        <img src="../images/share/zone.png" class="news-share__img" title="QQ空间" :style="{width:size}" @click="shareToQzone"/>
    </div>
</template>

<script>
    import LocalStorageUtil from '@/ts/utils/LocalStorageUtil';

    // 现在的分享的页面只是存在news和用户中心
    import QRCode from 'qrcode'

    export default {
        props: {
            item: {type: Object, require: false},
            sharePage: String, //只可以为news,user,
            size: String //分享图标的大小，如16px
        },
        data() {
            return {
                urlPrefix: '',
                _pic: '',
                _showcount: 1,
                _site: 'http://www.bohe.com',
                _url: '',
                _title: '',
                wechartImg: ''
            }
        },
        created() {
            if (LocalStorageUtil.getRegionCodes() == 0) {
                // 国际区
                this.urlPrefix = 'https://www.bohe.com'
                if (LocalStorageUtil.getLanguage() == 'zh_CN') {
                    this.urlPrefix += '/cn'
                }
            } else {
                this.urlPrefix = 'https://cn.bohe.com'
                if (LocalStorageUtil.getLanguage() == 'en') {
                    this.urlPrefix += '/en'
                }
            }
        },
        mounted() {
            let self = this

            switch (this.sharePage) {
                case 'news':
                    this._url = this.urlPrefix + '/news_' + this.item.id + '.html';
                    this._title = this.item.title + '- (BOHE)薄荷官网';
                    this._pic = this.item.image_url;
                    this._desc = '薄荷游戏资讯';
                    this._summary = '游戏资讯';
                    break;
                case 'user':
                    if (LocalStorageUtil.getRegionCodes() == 0) {
                        // 国际区
                        this._url = 'https://www.bohe.com'
                        this._title = +'Bohe Accelerator'
                        this._desc = 'Bohe Official Site'
                        this._summary = 'BOHE links the World'
                    } else {
                        this._url = 'https://cn.bohe.com'
                        this._title = '薄荷加速器'
                        this._desc = '薄荷加速器官网'
                        this._summary = '薄荷 连接 世界'
                    }
                    break;
            }
        },
        methods: {
            // 微信
            shareToWx(event) {
                let self = this
                console.log(event)
                QRCode.toDataURL(self._url, function (err, url) {
                    // 242是微信分享框的高度
                    self.$emit('show_code_img', url, event.pageY - 242)
                })
            },
            //新浪微博
            shareToSinaWB() {
                var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?appkey=1343713053"' //真实的appkey，必选参数
                _shareUrl += '&url=' + encodeURIComponent(this._url || document.location) //参数url设置分享的内容链接|默认当前页location，可选参数
                _shareUrl += '&title=' + encodeURIComponent(this._title || document.title) //参数title设置分享的标题|默认当前页标题，可选参数
                _shareUrl += '&content=' + 'utf-8' //参数content设置页面编码gb2312|utf-8，可选参数
                window.open(_shareUrl, '_blank')
            },
            //QQ空间
            shareToQzone() {
                var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'
                _shareUrl += 'url=' + encodeURIComponent(this._url || document.location) //参数url设置分享的内容链接|默认当前页location
                _shareUrl += '&showcount=' + this._showcount || 0 //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
                _shareUrl += '&desc=' + encodeURIComponent(this._desc) //参数desc设置分享的描述，可选参数
                _shareUrl += '&summary=' + encodeURIComponent(this._summary) //参数summary设置分享摘要，可选参数
                _shareUrl += '&title=' + encodeURIComponent(this._title || document.title) //参数title设置分享标题，可选参数
                _shareUrl += '&site=' + encodeURIComponent(this._site || '') //参数site设置分享来源，可选参数
                window.open(_shareUrl, '_blank')
            },
            //百度贴吧
            shareToTieba() {
                var _shareUrl = 'http://tieba.baidu.com/f/commit/share/openShareApi?'
                _shareUrl += 'title=' + encodeURIComponent(this._title || document.title) //分享的标题
                _shareUrl += '&url=' + encodeURIComponent(this._url || document.location) //分享的链接
                // _shareUrl += '&pic=' + encodeURIComponent(this._pic||'');
                window.open(_shareUrl, '_blank')
            },
            //qq
            shareToqq() {
                var _shareUrl = 'https://connect.qq.com/widget/shareqq/index.html?'
                _shareUrl += 'url=' + encodeURIComponent(this._url || location.href) //分享的链接
                _shareUrl += '&title=' + encodeURIComponent(this._title || document.title) //分享的标题
                window.open(_shareUrl, '_blank')
            }
        }
    }
</script>