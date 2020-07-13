// Reference: https://jestjs.io/docs/en/configuration.html
module.exports = {
  displayName: 'test',
  clearMocks: true,
  coverageDirectory: 'coverage',
  preset: 'react-native',
  setupFiles: ['<rootDir>/setupTests.js'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['/Example', '/__tests__/__mocks__'],
  collectCoverage: true,
};
