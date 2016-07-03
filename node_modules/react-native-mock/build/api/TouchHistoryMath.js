var TouchHistoryMath={
/**
   * This code is optimized and not intended to look beautiful. This allows
   * computing of touch centroids that have moved after `touchesChangedAfter`
   * timeStamp. You can compute the current centroid involving all touches
   * moves after `touchesChangedAfter`, or you can compute the previous
   * centroid of all touches that were moved after `touchesChangedAfter`.
   *
   * @param {TouchHistoryMath} touchHistory Standard Responder touch track
   * data.
   * @param {number} touchesChangedAfter timeStamp after which moved touches
   * are considered "actively moving" - not just "active".
   * @param {boolean} isXAxis Consider `x` dimension vs. `y` dimension.
   * @param {boolean} ofCurrent Compute current centroid for actively moving
   * touches vs. previous centroid of now actively moving touches.
   * @return {number} value of centroid in specified dimension.
   */
centroidDimension:function(){function centroidDimension(touchHistory,touchesChangedAfter,isXAxis,ofCurrent){
var touchBank=touchHistory.touchBank;
var total=0;
var count=0;

var oneTouchData=touchHistory.numberActiveTouches===1?
touchHistory.touchBank[touchHistory.indexOfSingleActiveTouch]:null;

if(oneTouchData!==null){
if(oneTouchData.touchActive&&oneTouchData.currentTimeStamp>touchesChangedAfter){
// FIXME: DONT USE TERNARIES!!!!
total+=
ofCurrent&&isXAxis?oneTouchData.currentPageX: // eslint-disable-line
ofCurrent&&!isXAxis?oneTouchData.currentPageY: // eslint-disable-line
!ofCurrent&&isXAxis?oneTouchData.previousPageX:
oneTouchData.previousPageY;
count=1;}}else 

{
for(var i=0;i<touchBank.length;i++){
var touchTrack=touchBank[i];
if(touchTrack!==null&&
touchTrack!==undefined&&
touchTrack.touchActive&&
touchTrack.currentTimeStamp>=touchesChangedAfter){
var toAdd=void 0; // Yuck, program temporarily in invalid state.
if(ofCurrent&&isXAxis){
toAdd=touchTrack.currentPageX;}else 
if(ofCurrent&&!isXAxis){
toAdd=touchTrack.currentPageY;}else 
if(!ofCurrent&&isXAxis){
toAdd=touchTrack.previousPageX;}else 
{
toAdd=touchTrack.previousPageY;}

total+=toAdd;
count++;}}}



return count>0?total/count:TouchHistoryMath.noCentroid;}return centroidDimension;}(),


currentCentroidXOfTouchesChangedAfter:function(){function currentCentroidXOfTouchesChangedAfter(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
true, // isXAxis
true // ofCurrent
);}return currentCentroidXOfTouchesChangedAfter;}(),


currentCentroidYOfTouchesChangedAfter:function(){function currentCentroidYOfTouchesChangedAfter(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
false, // isXAxis
true // ofCurrent
);}return currentCentroidYOfTouchesChangedAfter;}(),


previousCentroidXOfTouchesChangedAfter:function(){function previousCentroidXOfTouchesChangedAfter(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
true, // isXAxis
false // ofCurrent
);}return previousCentroidXOfTouchesChangedAfter;}(),


previousCentroidYOfTouchesChangedAfter:function(){function previousCentroidYOfTouchesChangedAfter(touchHistory,touchesChangedAfter){
return TouchHistoryMath.centroidDimension(
touchHistory,
touchesChangedAfter,
false, // isXAxis
false // ofCurrent
);}return previousCentroidYOfTouchesChangedAfter;}(),


currentCentroidX:function(){function currentCentroidX(touchHistory){
return TouchHistoryMath.centroidDimension(
touchHistory,
0, // touchesChangedAfter
true, // isXAxis
true // ofCurrent
);}return currentCentroidX;}(),


currentCentroidY:function(){function currentCentroidY(touchHistory){
return TouchHistoryMath.centroidDimension(
touchHistory,
0, // touchesChangedAfter
false, // isXAxis
true // ofCurrent
);}return currentCentroidY;}(),


noCentroid:-1};


module.exports=TouchHistoryMath;