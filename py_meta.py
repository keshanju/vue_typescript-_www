#!/usr/bin/python
#coding=utf-8
import re,os,shutil,json,sys

#copy目录
class CopyPriject:
	def copy(self,copy_dir,to_dir):
		#目录是否存在
		if os.path.exists(to_dir) == True:
			shutil.rmtree(to_dir,True)
		#复制指定目录
		shutil.copytree(copy_dir,to_dir)
		print(to_dir + '目录创建成功!')
	def test(self,dd):
		print("test hello")
#解析html<meta>标签
class ParseMeta:
	#path路径 metalist配置文件 langList语言配置文件
	def onParse(self,path,metalist,langList):
		list = os.listdir(path)
		for j in range(0,len(list)):
			if list[j].find('.html') > 0:
				pathName = list[j]
				newPath = path + '/' + list[j]
				#解析
				with open(newPath, 'r+') as fp:
					for line in fp:
						line = line.rstrip()
						#替换title标签
						pattern = re.compile(r'<title>.*?</title>')
						match_list = pattern.findall(line)
						for i in range(0, len(match_list)):
							metaStr = match_list[i]
							if metaStr.find('title') > 0:
								#匹配更换的字符
								for reValue in metalist:
									if reValue['name'] == pathName:
										line = line.replace(metaStr, reValue['title'])
						#替换meta标签			
						pattern = re.compile(r'<meta.*?>')
						match_list = pattern.findall(line)
						for i in range(0, len(match_list)):
							metaStr = match_list[i]
							if metaStr.find('keywords') > 0:
								#匹配更换的字符
								for reValue in metalist:
									if reValue['name'] == pathName:
										line = line.replace(metaStr, reValue['keywords'])
							if metaStr.find('description') > 0:
								#匹配更换的字符
								for reValue in metalist:
									if reValue['name'] == pathName:
										line = line.replace(metaStr, reValue['description'])
						#替换$t{{}}翻译内容
						pattern = re.compile(r'{{\$t.*?}}')
						match_list = pattern.findall(line)
						for i in range(0, len(match_list)):
							metaStr = match_list[i]
							tempStr = match_list[i]
							tempStr = tempStr.strip()
							tempStr = tempStr.replace('{{$t(', '')
							tempStr = tempStr.replace(')}}', '')
							tempStr = eval(tempStr)
							templist = tempStr.split('.')
							langJson = ''
							key = ''
							if len(templist) >= 1:
								key = templist[0]
								langJson = langList[key]
							if len(templist) >= 2:
								key = templist[1]
								langJson = langJson[key]
							if langJson != '':
								line = line.replace(metaStr, langJson)
					#保存文件
					if line != '</html>' and line != '</script>':
	#					fp.flush()
	#					fp.seek(0)
	#					fp.write(line)
						fp.close()
						new_fb = open(newPath, 'w')
						new_fb.write(line)
						new_fb.close()
						print(newPath + ' 更新成功!')
						print('-------------------------------')

#replace
#默认国际版
class ReplaceMeta:
	def onReplace(self,meatDir,langDir,baseDir,copyDir,copyP,parseM):
		#读取meat配置文件
		json_file = open(meatDir)
		meta_json = json.load(json_file)
		#读取language配置文件
		if langDir != '':
			json_file = open(langDir)
			lang_json = json.load(json_file)
		else:
			lang_json = []
			lang_json['en'] = []
			lang_json['zh_CN'] = []

		print('环境:' + baseDir)
		if os.path.exists(copyDir + '/cn') == False:
			#国际英文版本
			dir0_en = baseDir + '/temp_copy'
			copyP.copy(copyDir,dir0_en)
			parseM.onParse(dir0_en,meta_json['0']['en'],lang_json['en'])
			#国际中文版本
			dir0_cn = baseDir + '/temp_copy/cn'
			copyP.copy(copyDir,dir0_cn)
			parseM.onParse(dir0_cn,meta_json['0']['cn'],lang_json['zh_CN'])
			#国内英文版本
			dir1_en = baseDir + '/temp_copy/1'
			copyP.copy(copyDir,dir1_en)
			parseM.onParse(dir1_en,meta_json['1']['en'],lang_json['en'])
			#国内中文版本
			dir1_cn = baseDir + '/temp_copy/1/cn'
			copyP.copy(copyDir,dir1_cn)
			parseM.onParse(dir1_cn,meta_json['1']['cn'],lang_json['zh_CN'])
			#删除bohe目录，并将bohe_copy目录更名为bohe
			shutil.rmtree(copyDir,True)
			os.rename(dir0_en,copyDir)
		else:
			print(copyDir + '目录已创建')
			
#replace
#默认国内版
class ReplaceMeta2:
	def onReplace(self,meatDir,langDir,baseDir,copyDir,copyP,parseM):
		#读取meat配置文件
		json_file = open(meatDir)
		meta_json = json.load(json_file)
		#读取language配置文件
		if langDir != '':
			json_file = open(langDir)
			lang_json = json.load(json_file)
		else:
			lang_json = []
			lang_json['en'] = []
			lang_json['zh_CN'] = []

		print('环境:' + baseDir)
		if os.path.exists(copyDir + '/en') == False:
			#国内中文版
			dir0_en = baseDir + '/temp_copy'
			copyP.copy(copyDir,dir0_en)
			parseM.onParse(dir0_en,meta_json['1']['cn'],lang_json['zh_CN'])
			#国内英文版
			dir0_cn = baseDir + '/temp_copy/en'
			copyP.copy(copyDir,dir0_cn)
			parseM.onParse(dir0_cn,meta_json['1']['en'],lang_json['en'])
			#国际中文版
			dir1_en = baseDir + '/temp_copy/0/'
			copyP.copy(copyDir,dir1_en)
			parseM.onParse(dir1_en,meta_json['0']['cn'],lang_json['zh_CN'])
			#国际英文版本
			dir1_cn = baseDir + '/temp_copy/0/en'
			copyP.copy(copyDir,dir1_cn)
			parseM.onParse(dir1_cn,meta_json['0']['en'],lang_json['en'])
			#删除原目录，并将temp_copy目录更名为原目录
			shutil.rmtree(copyDir,True)
			os.rename(dir0_en,copyDir)
		else:
			print(copyDir + '目录已创建')


class ReplaceMetaTest:
	def onReplace(self,meatDir,langDir,baseDir,copyDir,copyP,parseM):
		#读取meat配置文件
		json_file = open(meatDir)
		meta_json = json.load(json_file)
		#读取language配置文件
		json_file = open(langDir)
		lang_json = json.load(json_file)
		#
		dir0_test = baseDir + '/test_copy'
		copyP.copy(copyDir,dir0_test)
		parseM.onParse(dir0_test,meta_json['1']['cn'],lang_json['zh_CN'])
		

