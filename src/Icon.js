import React, {Component, PropTypes} from 'react'
import {Image} from 'react-native'
const DEFAULT_IMAGE_DIMENSIONS = 36

export default class Icon extends Component {
  static propTypes = {
    style: Image.propTypes.style,
    source: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }
  static defaultProps = {
    style: {
      padding: 8,
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS,
      alignSelf: 'center'
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      // ...
    }
  }
  render() {
    const {source, style} = this.props
    if (source != null) {
      if (typeof source === 'number') {
        return (
          <Image style={style} source={source} />
        )
      } else if (typeof source === 'string') {
        if (style['width'] == false) {
          style['width'] = DEFAULT_IMAGE_DIMENSIONS
        }
        if (style['height'] == false) {
          style['height'] = DEFAULT_IMAGE_DIMENSIONS
        }
        return (
          <Image style={style} source={{uri: source}} />
        )
      }
    }
    return null
  }
}
