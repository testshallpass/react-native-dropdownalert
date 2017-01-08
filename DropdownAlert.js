import React, { Component, PropTypes } from 'react'
import {
  View, Text, StyleSheet,
  TouchableHighlight, Animated, StatusBar,
  Platform, Dimensions, Image, PanResponder, Easing
} from "react-native"
import ClassicAlert from './ClassicAlert'
import IOSAlert from './IOSAlert'
import AndroidAlert from './AndroidAlert'

var closeTimeoutId = null
var panResponder
const DEFAULT_IMAGE_DIMENSIONS = 36
const WINDOW = Dimensions.get('window')

export default class DropdownAlert extends Component {
  static propTypes = {
    alertStyle: PropTypes.string, // Available styles: classic, ios or android
    closeInterval: PropTypes.number,
    startDelta: PropTypes.number,
    endDelta: PropTypes.number,
    customStyles: PropTypes.object,
    userInteractionEnabled: PropTypes.bool
  }
  static defaultProps =  {
    alertStyle: 'classic',
    closeInterval: 4000,
    startDelta: -100,
    endDelta: 0,
    customStyles: {},
    userInteractionEnabled: false
  }
  constructor(props) {
    super(props)
    this.state = {
      animationValue: new Animated.Value(0),
      duration: 450,
      isOpen: false,
      startDelta: props.startDelta,
      endDelta: props.endDelta,
      topValue: 0,
      data: null,
      callback: null,
      renderAlert: null
    }
    // Action
    this.alertWithData = this.alertWithData.bind(this)
    this.dismiss = this.dismiss.bind(this)
    // Util
    this.animateToValue = this.animateToValue.bind(this)
    // Pan Responder
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
    this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this)
    this.handleMoveShouldSetPanResponder = this.handleMoveShouldSetPanResponder.bind(this)
    this.handleStartShouldSetPanResponder = this.handleMoveShouldSetPanResponder.bind(this)
  }
  componentWillMount() {
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    })
  }
  alertWithData(data, callback) {
    if (data == undefined || data == null) {
      console.warn('Warning DropdownAlert:  Detected data parameter is null or undefined.')
      return
    }
    if (typeof title !== 'string') {
      title = title.toString()
      console.warn('DropdownAlert: Title is not a string.')
    }
    if (typeof message !== 'string') {
      message = message.toString()
      console.warn('DropdownAlert: Message is not a string.')
    }
    if (this.state.isOpen) {
      this.dismiss()
      return
    }
    if (this.state.isOpen == false) {
      var renderAlert = null
      switch (this.props.alertStyle) {
        case 'classic':
          renderAlert = <ClassicAlert data={data} customStyles={this.props.customStyles} userInteractionEnabled={this.props.userInteractionEnabled} callback={() => this.dismiss(callback)} />
          break;
        case 'ios':
          renderAlert = <IOSAlert data={data} customStyles={this.props.customStyles} />
          break;
        case 'android':
          renderAlert = <AndroidAlert data={data} customStyles={this.props.customStyles} callback={(cb) => this.dismiss(cb)} />
          break;
      }
      this.setState({
        data: data,
        isOpen: true,
        topValue: 0,
        callback: callback,
        renderAlert: renderAlert
      })
    }
    this.animateToValue(1)
     if (this.props.closeInterval > 1) {
      closeTimeoutId = setTimeout(function() {
        this.dismiss(callback)
      }.bind(this), this.props.closeInterval)
    }
  }
  dismiss(onDismiss) {
    if (this.state.isOpen) {
      if (closeTimeoutId != null) {
        clearTimeout(closeTimeoutId)
      }
      this.animateToValue(0)
      setTimeout(function() {
        if (this.state.isOpen) {
          this.setState({
            isOpen: false
          })
          if (onDismiss) {
            onDismiss(this.state.data)
          }
        }
      }.bind(this), (this.state.duration))
    }
  }
  animateToValue(value) {
    Animated.spring (
      this.state.animationValue, {
        toValue: value,
        duration: this.state.duration,
        friction: 9,
        easing: Easing.inout
      }
    ).start()
  }
  onLayoutEvent(event) { // FIXME fired twice and deltas change
    var {x, y, width, height} = event.nativeEvent.layout
    var actualStartDelta = this.state.startDelta
    var actualEndDelta = this.state.endDelta
    // Prevent it from going off screen.
    if (this.props.startDelta < 0) {
      var delta = 0 - height
      if (delta != this.props.startDelta) {
        actualStartDelta = delta
      }
    } else if (this.props.startDelta > WINDOW.height) {
      actualStartDelta = WINDOW.height + height
    }
    if (this.props.endDelta < 0) {
      actualEndDelta = 0
    } else if (this.props.endDelta > WINDOW.height) {
      actualEndDelta = WINDOW.height - height
    }
    var heightDelta = WINDOW.height - this.props.endDelta - height
    if (heightDelta < 0) {
      actualEndDelta = this.props.endDelta + heightDelta
    }
    console.log(actualStartDelta);
    console.log(actualEndDelta);
    if (actualStartDelta != this.state.startDelta || actualEndDelta != this.state.endDelta) {
      this.setState({
        startDelta: actualStartDelta,
        endDelta: actualEndDelta
      })
    }
  }
  handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return this.props.userInteractionEnabled
  }
  handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    return gestureState.dx !== 0 && gestureState.dy !== 0 && this.props.userInteractionEnabled
  }
  handlePanResponderMove(e: Object, gestureState: Object) {
    if (gestureState.dy < 0 && this.state.callback != null) {
      this.setState({
        topValue: gestureState.dy
      })
    }
  }
  handlePanResponderEnd(e: Object, gestureState: Object) {
    const delta = this.state.startDelta / 5
    if (gestureState.dy < delta) {
      if (this.state.callback != null) {
        this.dismiss(this.state.callback)
    }
  }
  render() {
    return (
      <Animated.View
       ref={(ref) => this.mainView = ref}
       {...panResponder.panHandlers}
       style={{
          transform: [{
            translateY: this.state.animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [this.state.startDelta, this.state.endDelta]
            }),
          }],
          position: 'absolute',
          top: this.state.topValue,
          left: 0,
          right: 0
        }}>
        <StatusBar hidden={(this.props.alertStyle == 'classic' || Platform.OS === 'android') ? false : true} />
        <TouchableHighlight
            onPress={() => (this.state.callback != null) ? this.dismiss(this.state.callback) : null}
            underlayColor={'lightgray'}
            disabled={!this.props.userInteractionEnabled}
            onLayout={(event) => this.onLayoutEvent(event)}>
            <View>
              {this.state.renderAlert}
            </View>
        </TouchableHighlight>
      </Animated.View>
    )
  }
}

var styles = StyleSheet.create({
  // ..
})
