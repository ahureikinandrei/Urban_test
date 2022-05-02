import type { InitialOptionsTsJest } from 'ts-jest';

const config: InitialOptionsTsJest = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/**/*.test.ts'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    collectCoverage: true,
    coverageDirectory: './test/coverage',
    forceExit: true,
    clearMocks: true,
    modulePaths: ['node_modules', '<rootDir>/src'],
};

export default config;
