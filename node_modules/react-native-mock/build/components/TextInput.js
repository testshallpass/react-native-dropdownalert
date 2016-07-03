var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);
var _TextInputState=require('../api/TextInputState');var _TextInputState2=_interopRequireDefault(_TextInputState);
var _reactTimerMixin=require('react-timer-mixin');var _reactTimerMixin2=_interopRequireDefault(_reactTimerMixin);
var _NativeMethodsMixin=require('../mixins/NativeMethodsMixin');var _NativeMethodsMixin2=_interopRequireDefault(_NativeMethodsMixin);
var _View=require('./View');var _View2=_interopRequireDefault(_View);
var _Text=require('./Text');var _Text2=_interopRequireDefault(_Text);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var 

PropTypes=_react2['default'].PropTypes;

var TextInput=_react2['default'].createClass({displayName:'TextInput',
propTypes:_extends({},
_View2['default'].propTypes,{
/**
     * Can tell TextInput to automatically capitalize certain characters.
     *
     * - characters: all characters,
     * - words: first letter of each word
     * - sentences: first letter of each sentence (default)
     * - none: don't auto capitalize anything
     */
autoCapitalize:PropTypes.oneOf([
'none',
'sentences',
'words',
'characters']),

/**
     * If false, disables auto-correct. The default value is true.
     */
autoCorrect:PropTypes.bool,
/**
     * If true, focuses the input on componentDidMount.
     * The default value is false.
     */
autoFocus:PropTypes.bool,
/**
     * If false, text is not editable. The default value is true.
     */
editable:PropTypes.bool,
/**
     * Determines which keyboard to open, e.g.`numeric`.
     *
     * The following values work across platforms:
     * - default
     * - numeric
     * - email-address
     */
keyboardType:PropTypes.oneOf([
// Cross-platform
'default',
'email-address',
'numeric',
'phone-pad',
// iOS-only
'ascii-capable',
'numbers-and-punctuation',
'url',
'number-pad',
'name-phone-pad',
'decimal-pad',
'twitter',
'web-search']),

/**
     * Determines the color of the keyboard.
     * @platform ios
     */
keyboardAppearance:PropTypes.oneOf([
'default',
'light',
'dark']),

/**
     * Determines how the return key should look.
     * @platform ios
     */
returnKeyType:PropTypes.oneOf([
'default',
'go',
'google',
'join',
'next',
'route',
'search',
'send',
'yahoo',
'done',
'emergency-call']),

/**
     * Limits the maximum number of characters that can be entered. Use this
     * instead of implementing the logic in JS to avoid flicker.
     */
maxLength:PropTypes.number,
/**
     * Sets the number of lines for a TextInput. Use it with multiline set to
     * true to be able to fill the lines.
     * @platform android
     */
numberOfLines:PropTypes.number,
/**
     * If true, the keyboard disables the return key when there is no text and
     * automatically enables it when there is text. The default value is false.
     * @platform ios
     */
enablesReturnKeyAutomatically:PropTypes.bool,
/**
     * If true, the text input can be multiple lines.
     * The default value is false.
     */
multiline:PropTypes.bool,
/**
     * Callback that is called when the text input is blurred
     */
onBlur:PropTypes.func,
/**
     * Callback that is called when the text input is focused
     */
onFocus:PropTypes.func,
/**
     * Callback that is called when the text input's text changes.
     */
onChange:PropTypes.func,
/**
     * Callback that is called when the text input's text changes.
     * Changed text is passed as an argument to the callback handler.
     */
onChangeText:PropTypes.func,
/**
     * Callback that is called when text input ends.
     */
onEndEditing:PropTypes.func,
/**
     * Callback that is called when the text input selection is changed
     */
onSelectionChange:PropTypes.func,
/**
     * Callback that is called when the text input's submit button is pressed.
     * Invalid if multiline={true} is specified.
     */
onSubmitEditing:PropTypes.func,
/**
     * Callback that is called when a key is pressed.
     * Pressed key value is passed as an argument to the callback handler.
     * Fires before onChange callbacks.
     * @platform ios
     */
onKeyPress:PropTypes.func,
/**
     * Invoked on mount and layout changes with `{x, y, width, height}`.
     */
onLayout:PropTypes.func,
/**
     * The string that will be rendered before text input has been entered
     */
placeholder:PropTypes.string,
/**
     * The text color of the placeholder string
     */
placeholderTextColor:PropTypes.string,
/**
     * If true, the text input obscures the text entered so that sensitive text
     * like passwords stay secure. The default value is false.
     */
secureTextEntry:PropTypes.bool,
/**
     * See DocumentSelectionState.js, some state that is responsible for
     * maintaining selection information for a document
     * @platform ios
     */
// TODO(lmr): requireLibrary
// selectionState: PropTypes.instanceOf(DocumentSelectionState),
/**
     * The value to show for the text input. TextInput is a controlled
     * component, which means the native value will be forced to match this
     * value prop if provided. For most uses this works great, but in some
     * cases this may cause flickering - one common cause is preventing edits
     * by keeping value the same. In addition to simply setting the same value,
     * either set `editable={false}`, or set/update `maxLength` to prevent
     * unwanted edits without flicker.
     */
value:PropTypes.string,
/**
     * Provides an initial value that will change when the user starts typing.
     * Useful for simple use-cases where you don't want to deal with listening
     * to events and updating the value prop to keep the controlled state in sync.
     */
defaultValue:PropTypes.string,
/**
     * When the clear button should appear on the right side of the text view
     * @platform ios
     */
clearButtonMode:PropTypes.oneOf([
'never',
'while-editing',
'unless-editing',
'always']),

/**
     * If true, clears the text field automatically when editing begins
     * @platform ios
     */
clearTextOnFocus:PropTypes.bool,
/**
     * If true, all text will automatically be selected on focus
     * @platform ios
     */
selectTextOnFocus:PropTypes.bool,
/**
     * If true, the text field will blur when submitted.
     * The default value is true for single-line fields and false for
     * multiline fields. Note that for multiline fields, setting blurOnSubmit
     * to true means that pressing return will blur the field and trigger the
     * onSubmitEditing event instead of inserting a newline into the field.
     * @platform ios
     */
blurOnSubmit:PropTypes.bool,
/**
     * Styles
     */
style:_Text2['default'].propTypes.style,
/**
     * Used to locate this view in end-to-end tests
     */
testID:PropTypes.string,
/**
     * The color of the textInput underline.
     * @platform android
     */
underlineColorAndroid:PropTypes.string}),

mixins:[_NativeMethodsMixin2['default'],_reactTimerMixin2['default']],
statics:{
State:_TextInputState2['default']},

isFocused:function(){function isFocused(){
// TODO(lmr): React.findNodeHandle
return _TextInputState2['default'].currentlyFocusedField()===
_react2['default'].findNodeHandle(this.refs.input);}return isFocused;}(),

clear:function(){function clear(){}return clear;}(),


render:function(){function render(){
return null;}return render;}()});



module.exports=TextInput;