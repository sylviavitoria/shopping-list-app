module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo|@expo|react-navigation|@react-navigation|native-base|react-native-svg|firebase)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
    '<rootDir>/assets/',
    '<rootDir>/.expo/',
  ],
  
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    'src/pages/**/*.{ts,tsx}',
    'src/service/**/*.{ts,tsx}',

    '!src/service/config/firebase.ts',        
    '!src/models/**',                         
    '!src/app/_layout.tsx',                  
    '!src/app/index.tsx',                  
    '!**/__tests__/**',                    
    '!**/*.test.{ts,tsx}',                    
    '!**/coverage/**',                        
    '!**/node_modules/**',                   
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '^@/(.*)$': '<rootDir>/$1',
  },
  globals: {
    __DEV__: true,
  },
};