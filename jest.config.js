module.exports = {
    preset: "jest-expo",
    moduleFileExtensions: ['js', 'jsx', 'json', 'tsx', 'node', 'web.jsx'],
    setupFiles: ['./jest-setup.js'],
    transform: {
        "^.+\\.(js||jsx)$": "babel-jest"
    }
}