import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import ImageView from './imageview';
import { DEFAULT_IMAGE_DIMENSIONS } from './constants';

export default class CancelButton extends Component {
  static propTypes = {
    style: PropTypes.object,
    onPress: PropTypes.func,
    imageStyle: PropTypes.object,
    imageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  static defaultProps = {
    onPress: () => {},
    style: {
      padding: 8,
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS,
      alignSelf: 'center',
    },
  };
  render() {
    const { style, onPress, imageStyle, imageSrc } = this.props;
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <ImageView style={imageStyle} source={imageSrc} />
      </TouchableOpacity>
    );
  }
}
