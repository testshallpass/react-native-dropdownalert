let _test = url => true;
const LinkingManger = {
  openURL(url) {
    return Promise.resolve(true);
  },
  canOpenURL(url) {
    return Promise.resolve(_test(url));
  },

  __setCanOpenURLTest(test) {
    _test = test;
  }
};

module.exports = LinkingManger;
