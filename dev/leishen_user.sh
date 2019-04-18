#!/bin/bash
#同步项目到开发环境 密码: 1q2w3e4r
echo 'Leishen@vfth123'
/usr/bin/rsync -av \
    --exclude 'Runtime' \
    --exclude '.git' \
    --exclude '.DS_Store' \
    ./leishen_user/ root@47.100.191.71:../data/dev/user