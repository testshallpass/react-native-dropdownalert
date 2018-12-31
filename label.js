import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

export default class Label extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
    numberOfLines: PropTypes.number,
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
  };
  render() {
    const { text } = this.props;
    if (text !== null && text.length > 0) {
      return (
        <Text {...this.props}>
          {text}
        </Text>
      );
    }
    return null;
  }
}
