#!/bin/bash
DNAME="CN=${ORGNAME}"
cd /app
if [[ -n "$CLEARBUILD" ]] then
  echo ">>> Cordova: clean platform cache"
  cordova platform rm android
fi
echo ">>> Cordova: add Android platform"
cordova platform add android
if [[ ! -e ./atrament_app.keystore ]] then
  echo ">>> Cordova: generate keystore"
  keytool -genkey -v \
      -keystore atrament_app.keystore \
      -alias atrament_app \
      -validity 10000 \
      -storepass atrament_store_passwd \
      -keyalg RSA \
      -dname $DNAME \
      -noprompt
fi
echo ">>> Cordova: build APK"
cordova build android --buildConfig --${PACKAGETYPE} -- --packageType=apk
echo ">>> Cordova: build AAB"
cordova build android --buildConfig --${PACKAGETYPE} -- --packageType=bundle
