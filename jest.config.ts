import type { InitialOptionsTsJest } from 'ts-jest';

const config: InitialOptionsTsJest = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/**/*.test.ts'],
    collectCoverage: true,
    coverageDirectory: './test/coverage',
    coveragePathIgnorePatterns: ['/dist/', '/node_modules/'],
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
};

export default config;
