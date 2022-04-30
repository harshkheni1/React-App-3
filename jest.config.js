module.exports = {
  verbose: true,
  //collectCoverageFrom: ['/**/*.{js,jsx,mjs,ts,tsx}'],
  testMatch: ['<rootDir>/**/*.(spec|test).{js,jsx,mjs,ts,tsx}'],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/(build|docs|node_modules)/'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|mjs)$'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs', 'ts', 'tsx'],
};
