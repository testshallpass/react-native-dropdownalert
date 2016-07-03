var _createMockComponent=require('../createMockComponent');var _createMockComponent2=_interopRequireDefault(_createMockComponent);
var _Transform=require('./Transform');var _Transform2=_interopRequireDefault(_Transform);
var _Path=require('./Path');var _Path2=_interopRequireDefault(_Path);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var LINEAR_GRADIENT=1;
var RADIAL_GRADIENT=2;
var PATTERN=3;

function CSSBackgroundPattern(){
// TODO(lmr):
return {};}


function Pattern(url,width,height,left,top){
this._brush=[PATTERN,url,+left||0,+top||0,+width,+height];}


function LinearGradient(stops,x1,y1,x2,y2){
this._brush=[LINEAR_GRADIENT,+x1,+y1,+x2,+y2];}


function RadialGradient(stops,fx,fy,rx,ry,cx,cy){
this._brush=[RADIAL_GRADIENT,+fx,+fy,+rx*2,+ry*2,+cx,+cy];}


var ReactART={
LinearGradient:LinearGradient,
RadialGradient:RadialGradient,
Pattern:Pattern,
Transform:_Transform2['default'],
Path:_Path2['default'],
Surface:(0,_createMockComponent2['default'])('Surface'),
Group:(0,_createMockComponent2['default'])('Group'),
ClippingRectangle:(0,_createMockComponent2['default'])('ClippingRectangle'),
Shape:(0,_createMockComponent2['default'])('Shape'),
Text:(0,_createMockComponent2['default'])('Text'),
CSSBackgroundPattern:CSSBackgroundPattern};


module.exports=ReactART;