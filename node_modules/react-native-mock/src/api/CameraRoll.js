import invariant from 'invariant';
import React from 'react';
import CameraRollManager from '../NativeModules/CameraRollManager';

const { PropTypes } = React;

const GROUP_TYPES_OPTIONS = [
  'Album',
  'All',
  'Event',
  'Faces',
  'Library',
  'PhotoStream',
  'SavedPhotos', // default
];

const ASSET_TYPE_OPTIONS = [
  'All',
  'Videos',
  'Photos', // default
];

/**
 * Shape of the param arg for the `getPhotos` function.
 */
const getPhotosParamChecker = PropTypes.shape({
  /**
   * The number of photos wanted in reverse order of the photo application
   * (i.e. most recent first for SavedPhotos).
   */
  first: PropTypes.number.isRequired,

  /**
   * A cursor that matches `page_info { end_cursor }` returned from a previous
   * call to `getPhotos`
   */
  after: PropTypes.string,

  /**
   * Specifies which group types to filter the results to.
   */
  groupTypes: PropTypes.oneOf(GROUP_TYPES_OPTIONS),

  /**
   * Specifies filter on group names, like 'Recent Photos' or custom album
   * titles.
   */
  groupName: PropTypes.string,

  /**
   * Specifies filter on asset type
   */
  assetType: PropTypes.oneOf(ASSET_TYPE_OPTIONS),

  /**
   * Filter by mimetype (e.g. image/jpeg).
   */
  mimeTypes: PropTypes.arrayOf(PropTypes.string),
});

class CameraRoll {

  /**
   * Saves the image to the camera roll / gallery.
   *
   * On Android, the tag is a local URI, such as `"file:///sdcard/img.png"`.
   *
   * On iOS, the tag can be one of the following:
   *
   *   - local URI
   *   - assets-library tag
   *   - a tag not matching any of the above, which means the image data will
   * be stored in memory (and consume memory as long as the process is alive)
   *
   * Returns a Promise which when resolved will be passed the new URI.
   */
  static saveImageWithTag(tag) {
    invariant(
      typeof tag === 'string',
      'CameraRoll.saveImageWithTag tag must be a valid string.'
    );
    // TODO(lmr):
    return CameraRollManager.saveImageWithTag(tag);
  }

  /**
   * Returns a Promise with photo identifier objects from the local camera
   * roll of the device matching shape defined by `getPhotosReturnChecker`.
   *
   * @param {object} params See `getPhotosParamChecker`.
   *
   * Returns a Promise which when resolved will be of shape `getPhotosReturnChecker`.
   */
  static getPhotos(params) {
    if (process.env.NODE_ENV === 'development') {
      getPhotosParamChecker({ params }, 'params', 'CameraRoll.getPhotos');
    }
    // TODO(lmr):
    // TODO: Add the __DEV__ check back in to verify the Promise result
    return CameraRollManager.getPhotos(params);
  }
}

CameraRoll.GroupTypesOptions = GROUP_TYPES_OPTIONS;
CameraRoll.AssetTypeOptions = ASSET_TYPE_OPTIONS;

module.exports = CameraRoll;
