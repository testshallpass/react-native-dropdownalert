const _canRecordVideos = true;
const _canUseCamera = true;

const ImagePickerIOS = {
  canRecordVideos(callback) {
    Promise.resolve(_canRecordVideos).then(callback);
  },
  canUseCamera(callback) {
    Promise.resolve(_canUseCamera).then(callback);
  },
  openCameraDialog(config, success, cancel) {
    // TODO(lmr):
  },
  openSelectDialog(config, success, cancel) {
    // TODO(lmr):
  },
};

module.exports = ImagePickerIOS;
