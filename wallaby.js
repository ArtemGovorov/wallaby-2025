module.exports = function (wallaby) {
  const testPathExpTSX = 'src/**/*.test.tsx'
  const testPathExpTS = 'src/**/*.test.ts'
  const testPathExp = 'src/**/*.test.js'
  const babelConfig = JSON.parse(require('fs').readFileSync('./.babelrc'))

  return {

    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
      'src/**/*.js',
      'src/setupTests.js',
      'package.json',
      'scripts/**/*.ts',
      'public/**/*.json',
      'src/**/*.json',
      'babel.config.js',
      `!${testPathExpTS}`,
      `!${testPathExpTSX}`,
      `!${testPathExp}`,
    ],

    tests: [
      testPathExpTS,
      testPathExpTSX,
      testPathExp,
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      'src/**/*.js': wallaby.compilers.babel(babelConfig),
      'src/**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        jsx: 'React',
      }),
    },

    setup: (wallaby) => {
      var jestConfig = require('./package.json').jest
      jestConfig.setupFiles = ['<rootDir>/src/setupTests.js']
      wallaby.testFramework.configure(jestConfig)
    },

    testFramework: 'jest',
  }
}
