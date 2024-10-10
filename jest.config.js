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
      "app/**/*.ts",
      "app/**/*.js",
      "assets/**/*.tsx",
      "assets/**/*.jsx",
      "assets/**/*.ts",
      "assets/**/*.js",
      "src/components/*.tsx",
      "src/components/*.jsx",
      "src/components/*.ts",
      "src/components/*.js",
    ]
}