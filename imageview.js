import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { DEFAULT_IMAGE_DIMENSIONS } from './constants';

export default class ImageView extends Component {
  static propTypes = {
    style: PropTypes.object,
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageProps: PropTypes.object,
  };
  static defaultProps = {
    style: {
      padding: 8,
      width: DEFAULT_IMAGE_DIMENSIONS,
      height: DEFAULT_IMAGE_DIMENSIONS,
      alignSelf: 'center',
    },
    source: null,
    imageProps: {},
  };
  render() {
    const { source, style, imageProps } = this.props;
    if (source == null) {
      return null;
    }
    const isRemote = typeof source === 'string';
    if (!style['width']) {
      style['width'] = DEFAULT_IMAGE_DIMENSIONS;
    }
    if (!style['height']) {
      style['height'] = DEFAULT_IMAGE_DIMENSIONS;
    }
    const src = isRemote ? { uri: source } : source;
    return <Image {...imageProps} style={style} source={src} />;
  }
}
