import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

export default class Label extends Component {
  static propTypes = {
    text: PropTypes.string,
    style: Text.propTypes.style,
    numberOfLines: PropTypes.number,
  }
  static defaultProps = {
    numberOfLines: 1,
    style: {
      fontSize: 16,
      textAlign: 'left',
      fontWeight: 'normal',
      color: 'white',
      backgroundColor: 'transparent'
    },
  }
  constructor(props) {
    super(props)
    this.state = {
      // ...
    }
  }
  render() {
    const {text, style, numberOfLines} = this.props
    if (text !== null && text.length > 0) {
      return (
        <Text style={style} numberOfLines={numberOfLines}>{text}</Text>
      )
    }
    return null
  }
}
