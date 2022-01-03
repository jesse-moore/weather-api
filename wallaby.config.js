module.exports = function (wallaby) {
    const path = require('path')
    process.env.NODE_PATH +=
        path.delimiter +
        path.join(wallaby.localProjectDir, 'node_modules')
    return {
        files: ['src/**/*.*', './test/data/*.*'],

        tests: ['./test/**/*.test.ts'],
        env: {
            type: 'node',
            runner: 'node',
        },
        setup: (wallaby) => {
            const chai = require('chai')
            chai.should()
            chai.use(require('sinon-chai'))
            // chai.use(require('chai-like'));

            global.expect = require('chai').expect
        },
        testFramework: 'mocha',
        filesWithNoCoverageCalculated: [],
        runMode: 'onsave',
        trace: true,
    }
}
