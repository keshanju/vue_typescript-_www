/**
 * 主要参考  
 * html 图片解析 包含文件 html-withimg-loader 
 * html 中vue中SEO优化 预编译 prerender-spa-plugin
 */
const config = require("./project.js");
let dir = config.dir;
let dist = config.dist + '/';
let base_url = config.base_url;
let path = require('path');
let glob = require('glob');

console.log('当前项目#####:' + dir);
console.log('输出目录#####:' + dist);
// console.log('当前环境#####:' + config.server_type + '----(1开发环境 2测试 3生产)');
// console.log('是否debug###:' + config.debug);

//
const debug = process.env.NODE_ENV !== 'production';
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath = './src/pages/**/*.html', pathDir = "./src/pages/") {
	let entries = {},
		basename, tmp, pathname, appname;
	glob.sync(globPath).forEach(function (entry) {
		full_path = entry.replace(path.extname(entry), "");
		//排除public文件夹
		if(full_path.indexOf('/public') == -1) {
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
module.exports = {
	baseUrl: base_url,
	pages,
	productionSourceMap: false,
	devServer: {
		index: 'index.html',
		host: 'localhost',
		port: 8088,
		open: false
	},
	filenameHashing: debug,
	runtimeCompiler: true,
	outputDir: dist + "/" + dir,
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
            .tap(options => Object.assign(options, { limit: 1 }));
	}
}