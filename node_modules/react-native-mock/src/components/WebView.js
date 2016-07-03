import EdgeInsetsPropType from '../propTypes/EdgeInsetsPropType';
import React from 'react';
import View from './View';
import ScrollView from './ScrollView';
import WebViewManager from '../NativeModules/WebViewManager';

const { PropTypes } = React;

const RCT_WEBVIEW_REF = 'webview';

const NavigationType = {
  click: WebViewManager.NavigationType.LinkClicked,
  formsubmit: WebViewManager.NavigationType.FormSubmitted,
  backforward: WebViewManager.NavigationType.BackForward,
  reload: WebViewManager.NavigationType.Reload,
  formresubmit: WebViewManager.NavigationType.FormResubmitted,
  other: WebViewManager.NavigationType.Other,
};

const JSNavigationScheme = WebViewManager.JSNavigationScheme;

const WebView = React.createClass({
  propTypes: {
    ...View.propTypes,
    url: PropTypes.string,
    html: PropTypes.string,
    /**
     * Function that returns a view to show if there's an error.
     */
    renderError: PropTypes.func, // view to show if there's an error
    /**
     * Function that returns a loading indicator.
     */
    renderLoading: PropTypes.func,
    /**
     * Invoked when load finish
     */
    onLoad: PropTypes.func,
    /**
     * Invoked when load either succeeds or fails
     */
    onLoadEnd: PropTypes.func,
    /**
     * Invoked on load start
     */
    onLoadStart: PropTypes.func,
    /**
     * Invoked when load fails
     */
    onError: PropTypes.func,
    /**
     * @platform ios
     */
    bounces: PropTypes.bool,
    /**
     * A floating-point number that determines how quickly the scroll view
     * decelerates after the user lifts their finger. You may also use string
     * shortcuts `"normal"` and `"fast"` which match the underlying iOS settings
     * for `UIScrollViewDecelerationRateNormal` and
     * `UIScrollViewDecelerationRateFast` respectively.
     *   - Normal: 0.998
     *   - Fast: 0.9 (the default for iOS WebView)
     * @platform ios
     */
    decelerationRate: ScrollView.propTypes.decelerationRate,
    /**
     * @platform ios
     */
    scrollEnabled: PropTypes.bool,
    automaticallyAdjustContentInsets: PropTypes.bool,
    contentInset: EdgeInsetsPropType,
    onNavigationStateChange: PropTypes.func,
    startInLoadingState: PropTypes.bool, // force WebView to show loadingView on first load
    style: View.propTypes.style,

    /**
     * Used on Android only, JS is enabled by default for WebView on iOS
     * @platform android
     */
    javaScriptEnabled: PropTypes.bool,

    /**
     * Used on Android only, controls whether DOM Storage is enabled or not
     * @platform android
     */
    domStorageEnabled: PropTypes.bool,

    /**
     * Sets the JS to be injected when the webpage loads.
     */
    injectedJavaScript: PropTypes.string,

    /**
     * Sets whether the webpage scales to fit the view and the user can change the scale.
     * @platform ios
     */
    scalesPageToFit: PropTypes.bool,

    /**
     * Allows custom handling of any webview requests by a JS handler. Return true
     * or false from this method to continue loading the request.
     * @platform ios
     */
    onShouldStartLoadWithRequest: PropTypes.func,

    /**
     * Determines whether HTML5 videos play inline or use the native full-screen
     * controller.
     * default value `false`
     * **NOTE** : "In order for video to play inline, not only does this
     * property need to be set to true, but the video element in the HTML
     * document must also include the webkit-playsinline attribute."
     * @platform ios
     */
    allowsInlineMediaPlayback: PropTypes.bool,
  },

  statics: {
    JSNavigationScheme,
    NavigationType,
  },

  getWebViewHandle() {
    // TODO(lmr): React.findNodeHandle
    return React.findNodeHandle(this.refs[RCT_WEBVIEW_REF]);
  },

  reload() {
    // do nothing
  },

  goForward() {
    // do nothing
  },

  goBack() {
    // do nothing
  },

  render() {
    return null;
  },
});

module.exports = WebView;
