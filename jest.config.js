// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/build/', '/dist/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
  transform: { '\\.[jt]sx?$': '@sucrase/jest-plugin' },
  transformIgnorePatterns: ['/node_modules/(?!(lodash-es)/)'],
};
