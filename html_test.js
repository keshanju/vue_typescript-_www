var system = require('system');
var fs = require('fs');
var address = system.args[1];//获得命令行第二个参数 接下来会用到
//console.log('Loading a web page');   
var page = require('webpage').create();   
var url = 'https://www.bohe.com/cn/index.html';
//console.log(url);   
page.open(url, function (status) {   
	//Page is loaded!   
	if (status !== 'success') {   
		console.log('error');
	} else {
        fs.write('html_test.html', page.content, 'w');
        fs.close();
	}      
	phantom.exit();
});