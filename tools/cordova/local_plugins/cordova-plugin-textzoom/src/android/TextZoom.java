package ink.atrament.textzoom;

import android.view.View;
import android.webkit.WebView;

import org.apache.cordova.CordovaPlugin;

/**
 * Android WebView scales all text by the system font size
 * (WebSettings.textZoom = fontScale * 100), while Chrome renders
 * the same page at 100%. This plugin sets the zoom from the
 * "TextZoom" preference in config.xml:
 *   - a number (percent): use it, e.g. 100 looks like Chrome;
 *   - "auto": keep the WebView default, which follows the system font size.
 * Without the preference the zoom is 100.
 */
public class TextZoom extends CordovaPlugin {

    private static final int DEFAULT_ZOOM = 100;

    /** text zoom in percent, or 0 to keep the WebView default */
    private int textZoom = DEFAULT_ZOOM;

    @Override
    protected void pluginInitialize() {
        String value = preferences.getString("TextZoom", String.valueOf(DEFAULT_ZOOM)).trim();
        if (value.equalsIgnoreCase("auto")) {
            textZoom = 0;
        } else {
            try {
                textZoom = Integer.parseInt(value);
            } catch (NumberFormatException e) {
                textZoom = DEFAULT_ZOOM;
            }
            if (textZoom <= 0) {
                textZoom = DEFAULT_ZOOM;
            }
        }
        applyTextZoom();
    }

    @Override
    public void onResume(boolean multitasking) {
        applyTextZoom();
    }

    private void applyTextZoom() {
        if (textZoom <= 0) {
            return;
        }
        View view = webView.getView();
        if (view instanceof WebView) {
            ((WebView) view).getSettings().setTextZoom(textZoom);
        }
    }
}
