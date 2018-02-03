const MAIN_INFO_COLOR = '#2B73B6';
const MAIN_WARN_COLOR = '#cd853f';
const MAIN_ERROR_COLOR = '#cc3232';
const MAIN_SUCCESS_COLOR = '#32A54A';
const MAIN_CUSTOM_COLOR = '#6441A4';
const MAIN_DISMISS_COLOR = '#748182';
const items = [
  {
    backgroundColor: MAIN_INFO_COLOR,
    type: 'info',
    message: "System is going down at 12 AM tonight for routine maintenance. We'll notify you when the system is back online.",
  },
  {
    backgroundColor: MAIN_WARN_COLOR,
    type: 'warn',
    message: 'Your cloud drive is about to reach capacity. Please consider upgrading to premium plan.',
  },
  {
    backgroundColor: MAIN_ERROR_COLOR,
    type: 'error',
    message: "Sorry, we're having some technical difficulties. Our team will get this fixed for you ASAP.",
  },
  {
    backgroundColor: MAIN_SUCCESS_COLOR,
    type: 'success',
    message: "Thank you for your order. We will email and charge you when it's on it's way.",
  },
  {
    backgroundColor: MAIN_CUSTOM_COLOR,
    type: 'custom',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  { backgroundColor: MAIN_DISMISS_COLOR, type: 'close', title: 'close' },
];

module.exports = {
  items,
  MAIN_CUSTOM_COLOR,
};
