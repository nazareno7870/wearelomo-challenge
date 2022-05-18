module.exports = {
    roots: ["<rootDir>/src"],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
        '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/jest/transforms/fileTransform.js',
    },
    coveragePathIgnorePatterns: [
        "/node_modules/"
    ],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",
    },
    "testEnvironment": "jsdom"
};