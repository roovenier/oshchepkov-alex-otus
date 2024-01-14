module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        './*.js',
        '!./index.js',
        '!./jest.config.js'
    ],
    coverageThreshold: {
        global: {
            'branches': 95,
            'functions': 95,
            'lines': 95,
            'statements': 95,
        },
    },
};
