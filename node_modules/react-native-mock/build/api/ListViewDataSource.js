var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var 

ListViewDataSource=function(){
function ListViewDataSource(){_classCallCheck(this,ListViewDataSource);
this._dataBlob=null;}_createClass(ListViewDataSource,[{key:"getRowCount",value:function(){function getRowCount()


{}return getRowCount;}()},{key:"cloneWithRows",value:function(){function cloneWithRows(



data){
var newSource=new ListViewDataSource();
newSource._dataBlob=data;

return newSource;}return cloneWithRows;}()},{key:"cloneWithRowsAndSections",value:function(){function cloneWithRowsAndSections(


data){
var newSource=new ListViewDataSource();
newSource._dataBlob=data;

return newSource;}return cloneWithRowsAndSections;}()}]);return ListViewDataSource;}();



module.exports=ListViewDataSource;