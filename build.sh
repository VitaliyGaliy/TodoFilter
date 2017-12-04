#!/bin/sh

date "+%m/%d %H:%M:%S"
npm install
npm run robocss
npm run bootstrap
npm run deploy:prod
#Date "+%m/%d %H:%M:%S"
#export ARTIFACT_VERSION=`grep "^ARTIFACT_VERSION=" version.properties | awk -F  "=" '{print $2}'`
tar -czvf univer-io-www.$ARTIFACT_VERSION.tar.gz ./dist
#Date "+%m/%d %H:%M:%S"
#npm run lint
#npm run test
