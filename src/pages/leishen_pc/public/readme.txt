config.json中配置项解释:
    head_default_img_url:推荐头像图片地址
    down_platform:{ 渠道下载配置
        "baidu":{
            windows:{
                download_url:windows客户端下载地址
            }
            mac:{
                download_url:mac客户端下载地址(暂无)
            }
        },
        "360":{
            同上
        },
        "guanwang":{
            同上
        }
    }
    "0": {国际版专属配置
        "register": {
            "is_email": 1  是否显示邮箱注册
        },
        "zh_CN": {  国际中文版登录注册banner图片地址和链接地址
            "index_news":{
                "new_url":"https://www.leigod.com/index.html?region_code=0&language=zh_CN",   登录注册banner图链接地址
                "img_url":"/images/avatar_07.png"  登录注册banner图片地址
            }
        },
        "en": {    国际英文版登录注册banner图片地址和链接地址
            "index_news":{
                "new_url":"https://www.leigod.com/index.html?region_code=0&language=en",
                "img_url":"/images/avatar_07.png"
            }
        }
    }
    "1": {国内版专属配置
        "register": {
            "is_email": 0    是否显示邮箱注册
        },
        "zh_CN": {  国内中文版登录注册banner图片地址和链接地址
            "index_news":{
                "new_url":"https://www.leigod.com/index.html?region_code=1&language=zh_CN",  登录注册banner图链接地址
                "img_url":"/images/avatar_07.png"   登录注册banner图片地址
            }
        },
        "en": {  国内英文版登录注册banner图片地址和链接地址
            "index_news":{
                "new_url":"https://www.leigod.com/index.html?region_code=1&language=en",
                "img_url":"/images/avatar_07.png"
            }
        }
    },

    "timer_step": 300000,   pc内嵌首页公告获取间隔时间

    "login_banner":{   客户端登录背景页面
        "img_url":"/images/login_banner.png",客户端登录背景页面图片地址
        "link_url":""   客户端登录背景页面链接地址
    },

    "is_show_xianshi_activity":{  限时特惠活动配置
        "is_show":true,  是否显示特惠ui
        "show_msg":"APEX英雄限时特惠",  特惠简介
        "start_time":"2019-3-22 09:00:00",  开始时间
        "end_time":"2019-3-31 23:59:59"   结束时间
    },

    "jiaobiao_is_show":{   配合活动展示角标和活动简介等
        "is_show":true,  是否显示角标
        "start_time":"", 开始时间
        "end_time":"",  结束时间
        "jiaobiao_msg":"限时:4.12-4.23"   活动时间范围
    }