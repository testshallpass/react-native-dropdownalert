import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, TouchableHighlight, Image, LayoutAnimation, View} from 'react-native'
import Functions from './Functions'

export default class AndroidAlert extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    customStyles: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired
  }
  static defaultProps = {
    // ...
  }
  constructor(props) {
    super(props)
    this.state = {
      isDrawerOpen: true,
      arrow: require('./assets/arrowdown.png')
    }
  }
  setNativeProps(nativeProps) {
    this.androidAlert.setNativeProps(nativeProps);
  }
  handleAction(callback) {
    if (this.props.callback) {
      this.props.callback(callback)
    }
  }
  // data = {
  //   smallImage: '',
  //   bigImage: '',
  //   header: 'Something',
  //   timestamp: '59s',
  //   title: 'Error',
  //   message: '...',
  //   footer: '...',
  //   author: '...',
  //   actionsWithCallbacks: [],
  //   isDrawerOpen: true
  // }
  //
  // android_styles = {
  //   topBackgroundColor: '',
  //   drawerBackgroundColor: '',
  //   fontFamily: 'Futura',
  //   actionColor: 'white',
  //   textColor: 'black'
  // }
  handleArrowAction() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      isDrawerOpen: (this.state.isDrawerOpen) ? false : true,
      arrow: (this.state.isDrawerOpen) ? require('./assets/arrowdown.png') : require('./assets/arrowup.png')
    })
  }
  renderDrawer(isOpen, customStyles, actions) {
    if (isOpen == true && actions && actions.length > 0) {
      return (
        <View style={[styles.drawerContainer, customStyles.drawerContainer]}>
          {actions}
        </View>
      )
    }
    return null
  }
  renderUsername(styles, username) {
    if (username && username.length > 0) {
      return (
        <Text style={styles}>{' \u2022 '}{username}</Text>
      )
    }
    return null
  }
  renderTimestamp(styles, timestamp) {
    if (timestamp != null && timestamp.length > 0) {
      return (
        <Text style={styles}>{' \u2022 '}{timestamp}</Text>
      )
    }
    return null
  }
  renderDrawerArrow(actionColor) {
    return (
      <TouchableHighlight onPress={() => this.handleArrowAction()} underlayColor={'lightgray'}>
        <Image style={{tintColor: actionColor}} source={this.state.arrow} />
      </TouchableHighlight>
    )
  }
  render() {
    const data = this.props.data
    const customStyles = this.props.customStyles
    var actionColor = styles.header.color
    if (customStyles.header != null) {
      if (customStyles.header.color != null) {
        actionColor = customStyles.header.color
      }
    }
    var renderActions = []
    var actions = data.actions
    if (actions && actions.length > 0) {
      for (var i = 0; i < actions.length; i++) {
        var action = actions[i]
        renderActions.push(
          <Text key={i} style={[styles.actionText, this.props.customStyles.actionText]} onPress={() => this.handleAction(action.callback)}>{action.text.toUpperCase()}</Text>
        )
      }
    }
    return (
        <View ref={component => this.androidAlert = component} {...this.props} style={[styles.container, customStyles.container]}>
          <View style={[styles.topContainer, customStyles.topContainer]}>
            {Functions.renderImage(data.smallImage, [styles.smallImage, customStyles.smallImage])}
            {Functions.renderText(data.header, [styles.header, customStyles.header], 1)}
            {this.renderUsername([styles.username, customStyles.username], data.username)}
            {this.renderTimestamp([styles.timestamp, customStyles.timestamp], data.timestamp)}
            {(renderActions && renderActions.length > 0) ? this.renderDrawerArrow(actionColor) : null}
          </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={[styles.title, customStyles.title]}>{data.title}</Text>
            <Text style={[styles.message, customStyles.message]}>{data.message}</Text>
          </View>
            {Functions.renderImage(data.bigImage, [styles.bigImage, customStyles.bigImage])}
        </View>
        {this.renderDrawer(this.state.isDrawerOpen, customStyles, renderActions)}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#FEFEFE',
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: 1,
  },
  topContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 4,
    padding: 16,
    paddingBottom: 4
  },
  drawerContainer: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B8B8B8',
    padding: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 0,
    paddingBottom: 8
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    flexWrap: 'wrap'
  },
  smallImage: {
    width: 15,
    height: 15,
    padding: 2,
    borderRadius: 3
  },
  bigImage: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  header: {
    fontSize: 12,
    color: '#1F89C7',
    fontWeight: '400',
    padding: 2,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '100',
    color: 'black'
  },
  username: {
    fontSize: 12,
    fontWeight: '100',
    color: 'black'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black'
  },
  message: {
    fontSize: 14,
    fontWeight: '100',
    color: 'black'
  },
  actionText: {
    fontSize: 14,
    color: '#1F89C7',
    fontWeight: '600',
    padding: 8
  }
})
