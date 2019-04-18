#!/bin/bash
#同步项目到开发环境 密码: 1q2w3e4r
echo '1q2w3e4r'
/usr/bin/rsync -av \
    --exclude 'Runtime' \
    --exclude '.git' \
    --exclude '.DS_Store' \
    ./bohe_app/ root@192.168.3.235:../data/mbohe/