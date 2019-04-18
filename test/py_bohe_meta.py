#coding=utf-8
import sys

sys.path.append('../')
import py_meta

print('#####开始编译 开发环境#####')
print('')
replaceM = py_meta.ReplaceMeta()
metaDir = '../bohe_meta.json'
langDir = '../src/assets/i18n/bohe_i18n_config.json'
baseDir = '../test'
copyDir = baseDir + '/bohe'
replaceM.onReplace(metaDir,langDir,baseDir,copyDir,py_meta.CopyPriject(),py_meta.ParseMeta())
print('')
print('#####版本编译完成#####')