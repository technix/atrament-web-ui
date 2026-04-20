#!/bin/bash
DNAME="CN=${ORGNAME}"
cd /app
cordova platform add android
keytool -genkey -v \
    -keystore atrament_app.keystore \
    -alias atrament_app \
    -validity 10000 \
    -storepass atrament_store_passwd \
    -keyalg RSA \
    -dname $DNAME \
    -noprompt
cordova build android --buildConfig --${BUILDCONFIG} -- --packageType=apk
cordova build android --buildConfig --${BUILDCONFIG} -- --packageType=bundle
