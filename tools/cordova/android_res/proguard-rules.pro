# R8 rules for the Cordova app (release builds, see build-extras.gradle).

# Cordova creates plugins by class name from res/xml/config.xml and calls the
# bridge through reflection and @JavascriptInterface: keep the framework intact.
-keep class org.apache.cordova.** { *; }
-keep public class * extends org.apache.cordova.CordovaPlugin { *; }

# local plugins (tools/cordova/local_plugins)
-keep class ink.atrament.** { *; }

-keepattributes *Annotation*
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
