// console.log(process.env);
var dist = 'dev/';
var dir = 'leishen';
var base_url = '/';
//解析命令参数
var configParam = process.env.npm_lifecycle_event;

var configParamArr = configParam.split('-');
console.log(configParamArr);
if (configParamArr.length >= 2) {
    dir = configParamArr[0];
    dist = configParamArr[1] + '/';
    // leishen_pc读取相对目录
    if (dir == 'leishen_pc') {
        base_url = './';
    }
    if (dist == 'debug/') {
        dist = 'dev/';
        /**
         * 1开发环境 2测试 3生产 4预发布
         */
        process.env.VUE_APP_SERVER_TYPE = 1; //注意：debug可以随意改，但是不允许提交
    } else if (dist == 'dev/') {
        //不允许修改
        process.env.VUE_APP_SERVER_TYPE = 1;
    } else if (dist == 'test/') {
        //不允许修改
        process.env.VUE_APP_SERVER_TYPE = 2;
    } else if (dist == 'vfbuild/') {
        //不允许修改
        process.env.VUE_APP_SERVER_TYPE = 4;
    } else if (dist == 'tbuild/') {
        //不允许修改
        process.env.VUE_APP_SERVER_TYPE = 3;
    }
}
console.log('【当前命令】' + configParam + "【当前环境:】" + process.env.VUE_APP_SERVER_TYPE + "（1开发环境 2测试 3生产 4预发布）");
console.log('【当前项目:】' + dir + " 【打包目录:】" + dist + ' 【base_url:】' + base_url);

/**
 * 主要参考
 * html 图片解析 包含文件 html-withimg-loader
 * html 中vue中SEO优化 预编译 prerender-spa-plugin
 */
let path = require('path');
let glob = require('glob');
const debug = process.env.NODE_ENV !== 'production';

/**
 * 配置pages多页面获取当前文件夹下的html和js
 * @param globPath
 * @param pathDir
 */
function getEntry(globPath = './src/pages/**/*.html', pathDir = "./src/pages/") {
    let entries = {}, basename, tmp, pathname, appname;
    glob.sync(globPath).forEach(function (entry) {
        full_path = entry.replace(path.extname(entry), "");
        //排除public文件夹
        if (full_path.indexOf('/public') == -1) {
            pathname = entry.substring(pathDir.length);
            basename = pathname.replace("/", "_").replace(".html", "");
            entries[basename] = {
                entry: full_path + '.ts',
                template: entry,
                filename: pathname,
            };
        }
    });
    return entries;
}

let pages = getEntry('./src/pages/' + dir + '/**/!(_*).html', "./src/pages_" + dir + "/");

/**
 *
 */
module.exports = {
    baseUrl: base_url,
    pages,
    productionSourceMap: false,
    devServer: {
        index: 'index.html',
    },
    filenameHashing: debug,
    runtimeCompiler: true,
    outputDir: dist + "/" + dir,

    /**
     * webpack配置
     * @param config
     */
    chainWebpack: config => {
        //不压缩html
        for (const key in pages) {
            config
                .plugin('html-' + key)
                .tap(args => {
                    //是否最小化html 压缩html
                    args[0].minify = false
                    return args
                });
        }
        //注册插件
        config.module
            .rule('html')
            .test(/\.(htm|html)$/i)
            .use('html-withimg-loader')
            .loader('html-withimg-loader');
        //copy
        config
            .plugin('copy')
            .tap(args => {
                args[0][0].from = './src/pages/' + dir + '/public';
                args[0][0].to = './';
                // console.log(args);
                return args;
            });
        //image
        config.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap(options => Object.assign(options, {limit: 1}));
    }
}
