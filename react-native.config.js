module.exports = {
  project: {
    ios: {},
    android: {},
  },
  'react-native-vector-icons': {
    platforms: {
      ios: null, // Disable auto-linking for iOS to avoid font duplication issues
    },
  },
  assets: ['./assets/fonts'],
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
};
