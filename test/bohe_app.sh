#!/bin/bash
#同步项目到测试环境 密码: 123456
echo 123456
/usr/bin/rsync -av \
    --exclude 'Runtime' \
    --exclude '.git' \
    --exclude '.DS_Store' \
    --exclude 'config.json' \
    --exclude 'bohe_ios.plist' \
    ./bohe_app/ root@192.168.3.106:../data/mbohe/