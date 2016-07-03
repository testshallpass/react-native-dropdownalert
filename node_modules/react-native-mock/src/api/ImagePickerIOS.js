
import ImagePicker from '../NativeModules/ImagePickerIOS';

const ImagePickerIOS = {
  canRecordVideos(callback) {
    return ImagePicker.canRecordVideos(callback);
  },
  canUseCamera(callback) {
    return ImagePicker.canUseCamera(callback);
  },
  openCameraDialog(config, successCallback, cancelCallback) {
    const newConfig = {
      videoMode: false,
      ...config,
    };
    return ImagePicker.openCameraDialog(newConfig, successCallback, cancelCallback);
  },
  openSelectDialog(config, successCallback, cancelCallback) {
    const newConfig = {
      showImages: true,
      showVideos: false,
      ...config,
    };
    return ImagePicker.openSelectDialog(newConfig, successCallback, cancelCallback);
  },
};

module.exports = ImagePickerIOS;
