var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[typeof Symbol==="function"?Symbol.iterator:"@@iterator"](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally {try{if(!_n&&_i["return"])_i["return"]();}finally {if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((typeof Symbol==="function"?Symbol.iterator:"@@iterator") in Object(arr)){return sliceIterator(arr,i);}else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}; /**
 * https://github.com/facebook/react-native/blob/master/Libraries/Storage/AsyncStorage.js
 */

function wrap(value,callback){
return Promise.resolve(value).then(
function(obj){
if(callback){
callback(null,obj);}

return obj;},

function(err){
if(callback){
callback(err);}

throw err;});}




var db={};

var AsyncStorage={
getItem:function(){function getItem(key,callback){
return wrap(db[key],callback);}return getItem;}(),


setItem:function(){function setItem(key,value,callback){
db[key]=value;
return wrap(null,callback);}return setItem;}(),


removeItem:function(){function removeItem(key,callback){
delete db[key];
return wrap(null,callback);}return removeItem;}(),


mergeItem:function(){function mergeItem(key,value,callback){
db[key]=_extends({},db[key]||{},value);
return wrap(null,callback);}return mergeItem;}(),


clear:function(){function clear(callback){
db={};
return wrap(null,callback);}return clear;}(),


getAllKeys:function(){function getAllKeys(callback){
return wrap(Object.keys(db),callback);}return getAllKeys;}(),


flushGetRequests:function(){function flushGetRequests(){}return flushGetRequests;}(),



multiGet:function(){function multiGet(keys,callback){
return wrap(keys.map(function(k){return [k,db[k]];}),callback);}return multiGet;}(),


multiSet:function(){function multiSet(keyValuePairs,callback){
keyValuePairs.forEach(function(_ref){var _ref2=_slicedToArray(_ref,2);var key=_ref2[0];var value=_ref2[1];
db[key]=value;});

return wrap(null,callback);}return multiSet;}(),


multiRemove:function(){function multiRemove(keys,callback){
keys.forEach(function(key){return delete db[key];});
return wrap(null,callback);}return multiRemove;}(),


multiMerge:function(){function multiMerge(keyValuePairs,callback){
keyValuePairs.forEach(function(_ref3){var _ref4=_slicedToArray(_ref3,2);var key=_ref4[0];var value=_ref4[1];
db[key]=Object.asign({},db[key]||{},value);});

return wrap(null,callback);}return multiMerge;}()};



module.exports=AsyncStorage;