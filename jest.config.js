module.exports = {
    preset: "jest-expo",
    moduleFileExtensions: ['js', 'jsx', 'json', 'tsx', 'ts', 'node', 'web.jsx'],
    setupFiles: ['./jest-setup.js'],
    transform: {
        "^.+\\.(js||jsx)$": "babel-jest"
    },
    "transformIgnorePatterns": [
      "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic|(?!double-metaphone))"
    ],
    collectCoverage: true,
    collectCoverageFrom: [
      "app/**/*.tsx",
      "app/**/*.jsx",
      "assets/**/*.tsx",
      "assets/**/*.jsx",
      "src/components/*.tsx",
      "src/components/*.jsx"
    ]
}