import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

export default class Label extends Component {
  static propTypes = {
    text: PropTypes.string,
    style: PropTypes.object,
    numberOfLines: PropTypes.number,
    textProps: PropTypes.object,
  };
  static defaultProps = {
    numberOfLines: 1,
    style: {
      fontSize: 16,
      textAlign: 'left',
      fontWeight: 'normal',
      color: 'white',
      backgroundColor: 'transparent',
    },
    textProps: {},
  };
  render() {
    const { text, style, numberOfLines, textProps } = this.props;
    if (text !== null && text.length > 0) {
      return (
        <Text {...textProps} style={style} numberOfLines={numberOfLines}>
          {text}
        </Text>
      );
    }
    return null;
  }
}
