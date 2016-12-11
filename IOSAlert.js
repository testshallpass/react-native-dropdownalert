import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, Image, View} from 'react-native'
import Functions from './Functions'

export default class IOSAlert extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    customStyles: PropTypes.object.isRequired,
  }
  static defaultProps = {
    // ..
  }
  constructor(props) {
    super(props)
  }
  setNativeProps(nativeProps) {
    this.iosAlert.setNativeProps(nativeProps)
  }
  // data = {
  //   smallImage: '',
  //   bigImage: '',
  //   header: 'Something',
  //   timestamp: '59s ago',
  //   title: 'Error',
  //   message: '...',
  //   footer: '...'
  // }
  //
  // ios_styles = {
  //   topBackgroundColor: '',
  //   bottomBackgroundColor: '',
  //   fontFamily: 'Futura',
  //   textColor: 'white'
  // }
  render() {
    const data = this.props.data
    const customStyles = this.props.customStyles
    return (
      <View ref={component => this.iosAlert = component} {...this.props} style={[styles.container, customStyles.container]}>
        <View style={[styles.topContainer, customStyles.topContainer]}>
          {Functions.renderImage(data.smallImage, [styles.smallImage, customStyles.smallImage])}
          {Functions.renderText(data.header.toUpperCase(), [styles.header, customStyles.header], 1)}
          {Functions.renderText(data.timestamp, [styles.timestamp, customStyles.timestamp], 1)}
        </View>
        <View style={[styles.bottomContainer, customStyles.bottomContainer]}>
          <View style={styles.column}>
            {Functions.renderText(data.title, [styles.title, customStyles.title], 1)}
            {Functions.renderText(data.message, [styles.message, customStyles.message], 0)}
            {Functions.renderText(data.footer, [styles.footer, customStyles.footer], 1)}
          </View>
          {Functions.renderImage(data.bigImage, [styles.bigImage, customStyles.bigImage])}
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden'
  },
  topContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 4,
    backgroundColor: '#DAE3E2'
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingTop: 4,
    backgroundColor: '#C6D0CF'
  },
  column: {
    flexDirection: 'column',
    flex: 0.8,
  },
  header: {
    maxWidth: 200,
    fontSize: 12,
    marginLeft: 4
  },
  timestamp: {
    position: 'absolute',
    right: 8,
    alignSelf: 'center',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '100'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    fontSize: 14,
  },
  footer: {
    fontSize: 12,
    marginBottom: 4,
    marginTop: 4,
    fontWeight: '100'
  },
  smallImage: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  bigImage: {
    alignSelf: 'flex-end',
    width: 30,
    height: 30,
    borderRadius: 3,
    padding: 8
  }
})
